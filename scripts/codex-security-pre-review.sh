#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

die() { echo "ERROR: $*" >&2; exit 1; }
warn() { echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] WARN: $*" >&2; }
need_cmd() { command -v "$1" >/dev/null 2>&1 || die "Missing required command: $1"; }
run_with_timeout() {
  local seconds="$1"
  shift
  perl -e 'alarm shift; exec @ARGV' "$seconds" "$@"
}

MODEL_HIGH="${CODEX_MODEL_HIGH:-gpt-5.4}"
MODEL_REASONING_HIGH="${CODEX_MODEL_REASONING_HIGH:-high}"
CODEX_SECURITY_TIMEOUT_SEC="${CODEX_SECURITY_TIMEOUT_SEC:-1200}"
CODEX_ISOLATE_FROM_USER_CONFIG="${CODEX_ISOLATE_FROM_USER_CONFIG:-true}"

run_codex_checked() {
  local expected_model="$1"
  local expected_effort="$2"
  shift
  shift
  local args=("$@")

  if [[ "$CODEX_ISOLATE_FROM_USER_CONFIG" == "true" ]]; then
    for i in "${!args[@]}"; do
      if [[ "${args[$i]}" == "exec" ]]; then
        args=("${args[@]:0:$((i+1))}" --ignore-user-config --ephemeral "${args[@]:$((i+1))}")
        break
      fi
    done
  fi

  args=(-c "model_reasoning_effort=\"${expected_effort}\"" "${args[@]}")

  local tmp
  tmp="$(mktemp)"
  set +e
  run_with_timeout "$CODEX_SECURITY_TIMEOUT_SEC" env RUST_LOG=error codex "${args[@]}" 2>&1 | tee "$tmp"
  local status=${PIPESTATUS[0]}
  set -e

  local detected_model
  detected_model="$(rg -m1 '^model:[[:space:]]*' "$tmp" | sed -E 's/^model:[[:space:]]*//' || true)"
  if [[ -n "$detected_model" && "$detected_model" != "$expected_model" ]]; then
    die "Model guard failed: expected '${expected_model}', detected '${detected_model}'."
  fi
  if [[ -z "$detected_model" ]]; then
    warn "Model guard: model line not found in codex output; continuing with command success."
  fi

  local detected_effort
  detected_effort="$(rg -m1 '^reasoning effort:[[:space:]]*' "$tmp" | sed -E 's/^reasoning effort:[[:space:]]*//' || true)"
  if [[ -n "$detected_effort" && "$detected_effort" != "$expected_effort" ]]; then
    die "Reasoning guard failed: expected '${expected_effort}', detected '${detected_effort}'."
  fi
  if [[ -z "$detected_effort" ]]; then
    warn "Reasoning guard: reasoning-effort line not found in codex output; continuing with command success."
  fi

  rm -f "$tmp"
  [[ $status -eq 0 ]] || die "Codex pre-review security check failed."
}

main() {
  need_cmd git
  need_cmd codex
  need_cmd rg

  git rev-parse --is-inside-work-tree >/dev/null 2>&1 || die "Not inside a git repository."
  [[ -f ".codex/workflows/post-ticket-security-check.md" ]] || die "Missing workflow prompt: .codex/workflows/post-ticket-security-check.md"

  # Include untracked files in the reviewed diff.
  git add -N --all >/dev/null 2>&1 || true

  local diff_content
  diff_content="$(git diff --no-color origin/main)"
  [[ -n "$diff_content" ]] || die "No diff vs origin/main. Create changes before running security pre-review."

  warn "MEMORY: Mandatory HIGH security pre-review is running before PR review."

  local prompt
  prompt="$(cat <<EOF
$(cat .codex/workflows/post-ticket-security-check.md)

DIFF (origin/main):
${diff_content}
EOF
)"

  run_codex_checked "$MODEL_HIGH" "$MODEL_REASONING_HIGH" -m "$MODEL_HIGH" -a never -s danger-full-access exec -C "$ROOT_DIR" "$prompt"
}

main "$@"
