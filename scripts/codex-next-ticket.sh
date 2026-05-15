#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

die() { echo "ERROR: $*" >&2; exit 1; }
log() { echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $*"; }
warn() { echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] WARN: $*" >&2; }
need_cmd() { command -v "$1" >/dev/null 2>&1 || die "Missing required command: $1"; }

ensure_local_path_tools() {
  export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
}

bootstrap_dirty_paths_only() {
  local status="$1"
  local line path
  while IFS= read -r line; do
    [[ -z "$line" ]] && continue
    path="${line:3}"
    case "$path" in
      scripts/codex-next-ticket.sh|scripts/codex-review-loop.sh|.codex/workflows/*)
        ;;
      *)
        return 1
        ;;
    esac
  done <<< "$status"
  return 0
}

acquire_lock() {
  local lock_root="$ROOT_DIR/.codex/.locks"
  local lock_dir="$lock_root/next-ticket.lock"
  LOCK_DIR="$lock_dir"
  mkdir -p "$lock_root"
  if mkdir "$LOCK_DIR" 2>/dev/null; then
    echo "$$" > "$LOCK_DIR/pid"
    trap 'rm -rf "$LOCK_DIR"' EXIT INT TERM
    return 0
  fi

  local existing_pid=""
  if [[ -f "$LOCK_DIR/pid" ]]; then
    existing_pid="$(cat "$LOCK_DIR/pid" 2>/dev/null || true)"
  fi
  if [[ -n "$existing_pid" ]] && kill -0 "$existing_pid" >/dev/null 2>&1; then
    die "Another codex-next-ticket run is active (pid=$existing_pid)."
  fi

  warn "Detected stale next-ticket lock; clearing it."
  rm -rf "$LOCK_DIR"
  mkdir "$LOCK_DIR" || die "Failed to acquire workflow lock."
  echo "$$" > "$LOCK_DIR/pid"
  trap 'rm -rf "$LOCK_DIR"' EXIT INT TERM
}

slugify() {
  local input="$1"
  echo "$input" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g; s/-{2,}/-/g' \
    | cut -c1-60
}

choose_branch_type() {
  local title_lc
  title_lc="$(echo "$1" | tr '[:upper:]' '[:lower:]')"
  case "$title_lc" in
    fix*|bug*) echo "fix"; return ;;
    chore*|docs*) echo "chore"; return ;;
  esac
  echo "feature"
}

csv_to_json_array() {
  echo "$1" | tr ',' '\n' | sed '/^$/d' | jq -R -s 'split("\n")[:-1]'
}

open_pr_linked_issue_numbers() {
  gh pr list --repo "${DEFAULT_OWNER}/${DEFAULT_REPO}" --state open --limit "$PR_LIMIT" --json title,body,headRefName \
    | jq -r '.[] | [(.title // ""), (.body // ""), (.headRefName // "")] | @tsv' \
    | while IFS=$'\t' read -r title body branch; do
        printf '%s\n' "$title $body" \
          | rg -oi '(close|closes|closed|fix|fixes|fixed|resolve|resolves|resolved)[[:space:]]+#[0-9]+' \
          | rg -o '[0-9]+' || true
        printf '%s\n' "$title" | rg -o '\(#[0-9]+\)' | rg -o '[0-9]+' || true
        if [[ "$branch" =~ ^[^/]+/([0-9]+)- ]]; then
          echo "${BASH_REMATCH[1]}"
        elif [[ "$branch" =~ -([0-9]+)$ ]]; then
          echo "${BASH_REMATCH[1]}"
        fi
      done \
    | sort -u
}

is_linked_to_open_pr() {
  local number="$1"
  [[ " ${OPEN_PR_ISSUES} " == *" ${number} "* ]]
}

filter_candidate_json_lines() {
  local skip_labels_json ready_labels_json
  skip_labels_json="$(csv_to_json_array "$SKIP_LABELS_CSV")"
  ready_labels_json="$(csv_to_json_array "$READY_LABELS_CSV")"

  jq -c \
    --argjson skipLabels "$skip_labels_json" \
    --argjson readyLabels "$ready_labels_json" \
    --arg skipTitleRegex "$SKIP_TITLE_REGEX" \
    --arg requireReadyLabels "$REQUIRE_READY_LABELS" '
      def normalized_labels:
        [(.labels // [])[] | if type == "object" then (.name // empty) else tostring end];
      select(.number != null)
      | select((.title // "") | test($skipTitleRegex; "i") | not)
      | select((normalized_labels) as $labels | all($skipLabels[]; . as $skip | ($labels | index($skip)) == null))
      | select(
          ($requireReadyLabels != "true")
          or ((normalized_labels) as $labels | any($readyLabels[]; . as $ready | ($labels | index($ready)) != null))
        )
    '
}

pick_ticket_from_project() {
  [[ -n "$PROJECT_NUMBER" ]] || return 1

  local statuses_json
  statuses_json="$(csv_to_json_array "$READY_PROJECT_STATUSES_CSV")"

  gh project item-list "$PROJECT_NUMBER" --owner "$DEFAULT_OWNER" --limit "$PROJECT_ITEM_LIMIT" --format json \
    | jq -c --arg repo "${DEFAULT_OWNER}/${DEFAULT_REPO}" --argjson statuses "$statuses_json" '
        .items[]
        | select(.content.number != null)
        | select((.content.repository // "") == $repo)
        | select((.status // "") as $status | any($statuses[]; . == $status))
        | {
            number: .content.number,
            title: (.title // .content.title // ""),
            body: (.content.body // ""),
            labels: (.labels // [])
          }
      ' \
    | filter_candidate_json_lines \
    | while IFS= read -r item; do
        [[ -z "$item" ]] && continue
        local number
        number="$(echo "$item" | jq -r '.number')"
        if is_linked_to_open_pr "$number"; then
          continue
        fi
        local issue_state
        issue_state="$(gh issue view "$number" --repo "${DEFAULT_OWNER}/${DEFAULT_REPO}" --json state --jq '.state' 2>/dev/null || true)"
        [[ "$issue_state" == "OPEN" ]] || continue
        echo "$item"
        return 0
      done
}

pick_ticket_from_issues() {
  gh issue list --repo "${DEFAULT_OWNER}/${DEFAULT_REPO}" --state open --limit "$ISSUE_LIMIT" --json number,title,body,labels,updatedAt,url \
    | jq -c '.[]' \
    | filter_candidate_json_lines \
    | while IFS= read -r item; do
        [[ -z "$item" ]] && continue
        local number
        number="$(echo "$item" | jq -r '.number')"
        if is_linked_to_open_pr "$number"; then
          continue
        fi
        echo "$item"
        return 0
      done
}

get_ticket() {
  local ticket_json=""

  if [[ -n "$PROJECT_NUMBER" ]]; then
    ticket_json="$(pick_ticket_from_project || true)"
    if [[ -n "$ticket_json" ]]; then
      echo "$ticket_json"
      return 0
    fi
    warn "No actionable project item found for project #${PROJECT_NUMBER}; falling back to open repo issues."
  fi

  ticket_json="$(pick_ticket_from_issues || true)"
  if [[ -n "$ticket_json" ]]; then
    echo "$ticket_json"
    return 0
  fi

  die "Could not detect an actionable open issue for ${DEFAULT_OWNER}/${DEFAULT_REPO}."
}

sync_main() {
  [[ "$SYNC_MAIN" == "true" ]] || return 0
  if [[ "$BOOTSTRAP_DIRTY" == "true" ]]; then
    local current_branch
    current_branch="$(git branch --show-current)"
    [[ "$current_branch" == "main" ]] || die "Automation bootstrap changes can only skip sync from main; current branch is '$current_branch'."
    warn "Skipping main sync because local automation bootstrap changes are being carried into the ticket branch."
    return 0
  fi
  git switch main >/dev/null 2>&1 || die "Failed to switch to main."
  git pull --ff-only origin main >/dev/null 2>&1 || die "Failed to fast-forward main from origin/main."
}

create_branch_for_ticket() {
  local number="$1"
  local title="$2"
  local branch_type slug branch
  branch_type="$(choose_branch_type "$title")"
  slug="$(slugify "$title")"
  branch="${branch_type}/${number}-${slug}"

  if git show-ref --verify --quiet "refs/heads/$branch"; then
    die "Branch already exists locally: $branch"
  fi

  git switch -c "$branch" >/dev/null 2>&1 || die "Failed to create branch: $branch"
  echo "$branch"
}

main() {
  ensure_local_path_tools
  need_cmd git
  need_cmd gh
  need_cmd jq
  need_cmd rg
  need_cmd sed
  need_cmd tr

  git rev-parse --is-inside-work-tree >/dev/null 2>&1 || die "Not inside a git repository."
  local dirty_status
  dirty_status="$(git status --porcelain=v1)"
  if [[ "$ALLOW_DIRTY" != "true" && -n "$dirty_status" ]]; then
    if [[ "$ALLOW_BOOTSTRAP_DIRTY" == "true" ]] && bootstrap_dirty_paths_only "$dirty_status"; then
      BOOTSTRAP_DIRTY="true"
      warn "Continuing with local automation bootstrap changes; they will be included on the ticket branch."
    else
      die "Working tree is not clean. Commit/stash your changes before running this automation."
    fi
  fi
  acquire_lock

  OPEN_PR_ISSUES="$(open_pr_linked_issue_numbers | tr '\n' ' ')"

  log "starting next-ticket workflow for ${DEFAULT_OWNER}/${DEFAULT_REPO}"
  if [[ -n "${OPEN_PR_ISSUES// }" ]]; then
    log "skipping issues already linked to open PRs: ${OPEN_PR_ISSUES}"
  fi

  local ticket_json number title body url branch
  ticket_json="$(get_ticket)"
  number="$(echo "$ticket_json" | jq -r '.number')"
  title="$(echo "$ticket_json" | jq -r '.title')"
  body="$(echo "$ticket_json" | jq -r '.body // ""')"
  url="$(echo "$ticket_json" | jq -r '.url // "https://github.com/'"${DEFAULT_OWNER}"'/'"${DEFAULT_REPO}"'/issues/'"$number"'"')"

  [[ -n "$number" && "$number" != "null" ]] || die "Ticket selection failed."
  log "selected ticket #${number}: ${title}"

  if [[ "$DRY_RUN" == "true" ]]; then
    branch="$(choose_branch_type "$title")/${number}-$(slugify "$title")"
    log "dry run enabled; not syncing main or creating branch."
  else
    sync_main
    branch="$(create_branch_for_ticket "$number" "$title")"
    log "branch created: $branch"
  fi

  cat <<EOF
NEXT_TICKET_NUMBER=${number}
NEXT_TICKET_TITLE=${title}
NEXT_TICKET_URL=${url}
NEXT_TICKET_BRANCH=${branch}

NEXT_TICKET_BODY:
${body}

NEXT_TICKET_PRE_REVIEW_SECURITY:
./scripts/codex-security-pre-review.sh
EOF
}

DEFAULT_OWNER="${CODEX_GH_OWNER:-nazifsohtaoglu}"
DEFAULT_REPO="${CODEX_GH_REPO:-neutralai-website}"
PROJECT_NUMBER="${CODEX_GH_PROJECT_NUMBER:-}"
PROJECT_ITEM_LIMIT="${CODEX_GH_PROJECT_ITEM_LIMIT:-500}"
ISSUE_LIMIT="${CODEX_GH_ISSUE_LIMIT:-200}"
PR_LIMIT="${CODEX_GH_PR_LIMIT:-100}"
READY_PROJECT_STATUSES_CSV="${CODEX_READY_PROJECT_STATUSES:-Todo,Ready}"
READY_LABELS_CSV="${CODEX_ISSUE_READY_LABELS:-}"
REQUIRE_READY_LABELS="${CODEX_REQUIRE_READY_LABELS:-false}"
SKIP_LABELS_CSV="${CODEX_ISSUE_SKIP_LABELS:-type/epic,epic}"
SKIP_TITLE_REGEX="${CODEX_ISSUE_SKIP_TITLE_REGEX:-^\\[EPIC\\]|^EPIC\\b}"
SYNC_MAIN="${CODEX_SYNC_MAIN:-true}"
DRY_RUN="${CODEX_NEXT_TICKET_DRY_RUN:-false}"
ALLOW_DIRTY="${CODEX_NEXT_TICKET_ALLOW_DIRTY:-false}"
ALLOW_BOOTSTRAP_DIRTY="${CODEX_NEXT_TICKET_ALLOW_BOOTSTRAP_DIRTY:-true}"
BOOTSTRAP_DIRTY="false"
OPEN_PR_ISSUES=""

main "$@"
