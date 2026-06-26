/**
 * EgressFlowDiagram — Prompt egress / outbound data-flow
 *
 * Shows: User/Client → Gateway → [Detect] → [Mask/Tokenize] → forward sanitized prompt → LLM Provider
 * with Token Vault (encrypted, TTL) and Audit Trail as connected side components.
 * Raw PII never leaves the gateway boundary.
 */
export default function EgressFlowDiagram() {
  return (
    <figure className="w-full overflow-x-auto">
      <svg
        role="img"
        aria-labelledby="egress-title egress-desc"
        viewBox="0 0 900 480"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full min-w-[600px]"
        style={{ fontFamily: 'var(--font-mono, ui-monospace, monospace)' }}
      >
        <title id="egress-title">Prompt Egress Data-Flow Diagram</title>
        <desc id="egress-desc">
          A data-flow diagram showing how a user prompt passes through the NeutralAI Gateway. The flow
          is: User / Client sends a prompt to the Gateway; within the gateway boundary, Presidio NER
          and pattern matching detect PII entities; detected entities are masked or tokenized and the
          tokens are stored in an AES-256-GCM encrypted Token Vault with a TTL; an immutable Audit
          Trail records every detection event; and only the sanitized prompt (with no raw PII) is
          forwarded to the external LLM Provider.
        </desc>

        {/* ── Background ─────────────────────────────────────────────── */}
        <rect width="900" height="480" fill="#030712" rx="12" />

        {/* Subtle grid */}
        <defs>
          <pattern id="eg-grid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(6,182,212,0.04)" strokeWidth="1" />
          </pattern>
          <marker id="eg-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#06B6D4" />
          </marker>
          <marker id="eg-arrow-vault" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#8B5CF6" />
          </marker>
          <marker id="eg-arrow-audit" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#F97316" />
          </marker>
          <linearGradient id="eg-boundary-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(6,182,212,0.18)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0.04)" />
          </linearGradient>
        </defs>
        <rect width="900" height="480" fill="url(#eg-grid)" />

        {/* ── Gateway boundary box ───────────────────────────────────── */}
        {/* x=210 to x=720, y=40 to y=310 */}
        <rect x="210" y="40" width="510" height="270" rx="10"
          fill="rgba(6,182,212,0.03)" stroke="#06B6D4" strokeWidth="1.5"
          strokeDasharray="6 4" opacity="0.7" />
        <text x="460" y="58" textAnchor="middle" fill="#22D3EE" fontSize="10" letterSpacing="3" opacity="0.9">
          NEUTRALAI GATEWAY BOUNDARY — RAW PII DOES NOT CROSS THIS LINE
        </text>

        {/* ── Node: User / Client ────────────────────────────────────── */}
        <rect x="20" y="130" width="140" height="60" rx="8"
          fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
        <text x="90" y="152" textAnchor="middle" fill="#F8FAFC" fontSize="12" fontWeight="600">User / Client</text>
        <text x="90" y="170" textAnchor="middle" fill="#94A3B8" fontSize="10">App or extension</text>

        {/* ── Arrow: Client → Gateway ────────────────────────────────── */}
        <line x1="160" y1="160" x2="226" y2="160"
          stroke="#06B6D4" strokeWidth="1.5" markerEnd="url(#eg-arrow)" />
        <text x="193" y="152" textAnchor="middle" fill="#22D3EE" fontSize="9">prompt</text>

        {/* ── Node: Detect (Presidio + NER) ─────────────────────────── */}
        <rect x="234" y="130" width="148" height="60" rx="8"
          fill="#0F172A" stroke="#22D3EE" strokeWidth="1.5" />
        <text x="308" y="152" textAnchor="middle" fill="#F8FAFC" fontSize="12" fontWeight="600">Detect</text>
        <text x="308" y="168" textAnchor="middle" fill="#94A3B8" fontSize="9">Presidio NER</text>
        <text x="308" y="180" textAnchor="middle" fill="#94A3B8" fontSize="9">+ Pattern match</text>

        {/* ── Arrow: Detect → Mask ─────────────────────────────────── */}
        <line x1="382" y1="160" x2="418" y2="160"
          stroke="#06B6D4" strokeWidth="1.5" markerEnd="url(#eg-arrow)" />

        {/* ── Node: Mask / Tokenize ─────────────────────────────────── */}
        <rect x="420" y="130" width="148" height="60" rx="8"
          fill="#0F172A" stroke="#22D3EE" strokeWidth="1.5" />
        <text x="494" y="152" textAnchor="middle" fill="#F8FAFC" fontSize="12" fontWeight="600">Mask / Tokenize</text>
        <text x="494" y="168" textAnchor="middle" fill="#94A3B8" fontSize="9">AES-256-GCM vault</text>
        <text x="494" y="180" textAnchor="middle" fill="#94A3B8" fontSize="9">Reversible token</text>

        {/* ── Arrow: Mask → LLM ─────────────────────────────────────── */}
        <line x1="568" y1="160" x2="724" y2="160"
          stroke="#06B6D4" strokeWidth="1.5" markerEnd="url(#eg-arrow)" />
        <text x="646" y="148" textAnchor="middle" fill="#10B981" fontSize="9">sanitized only</text>

        {/* ── Node: LLM Provider ────────────────────────────────────── */}
        <rect x="726" y="130" width="140" height="60" rx="8"
          fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
        <text x="796" y="152" textAnchor="middle" fill="#F8FAFC" fontSize="12" fontWeight="600">LLM Provider</text>
        <text x="796" y="170" textAnchor="middle" fill="#94A3B8" fontSize="10">OpenRouter / BYOK</text>

        {/* ── Token Vault side-panel ──────────────────────────────────── */}
        <rect x="390" y="260" width="208" height="70" rx="8"
          fill="#130D2B" stroke="#8B5CF6" strokeWidth="1.5" />
        {/* vault icon row */}
        <text x="404" y="283" fill="#8B5CF6" fontSize="12">🔐</text>
        <text x="422" y="280" fill="#A78BFA" fontSize="11" fontWeight="600">Token Vault</text>
        <text x="398" y="296" fill="#94A3B8" fontSize="9">AES-256-GCM encrypted</text>
        <text x="398" y="310" fill="#94A3B8" fontSize="9">Tenant-bound · TTL 15 min</text>
        <text x="398" y="322" fill="#94A3B8" fontSize="9">Governed restore path only</text>

        {/* Arrow: Mask → Vault (store) */}
        <line x1="494" y1="190" x2="494" y2="258"
          stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#eg-arrow-vault)" />
        <text x="500" y="228" fill="#8B5CF6" fontSize="9">store token</text>

        {/* ── Audit Trail side-panel ────────────────────────────────── */}
        <rect x="230" y="260" width="150" height="70" rx="8"
          fill="#120A00" stroke="#F97316" strokeWidth="1.5" />
        <text x="244" y="283" fill="#F97316" fontSize="12">📋</text>
        <text x="262" y="280" fill="#FB923C" fontSize="11" fontWeight="600">Audit Trail</text>
        <text x="238" y="296" fill="#94A3B8" fontSize="9">Detection events</text>
        <text x="238" y="310" fill="#94A3B8" fontSize="9">Entity types logged</text>
        <text x="238" y="322" fill="#94A3B8" fontSize="9">Immutable append-only</text>

        {/* Arrow: Detect → Audit */}
        <line x1="308" y1="190" x2="308" y2="258"
          stroke="#F97316" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#eg-arrow-audit)" />
        <text x="316" y="228" fill="#F97316" fontSize="9">log event</text>

        {/* ── PII-blocked label ─────────────────────────────────────── */}
        <rect x="588" y="260" width="130" height="70" rx="8"
          fill="#050F0A" stroke="#10B981" strokeWidth="1.5" />
        <text x="602" y="280" fill="#10B981" fontSize="12">🚫</text>
        <text x="620" y="280" fill="#10B981" fontSize="11" fontWeight="600">Raw PII</text>
        <text x="598" y="295" fill="#94A3B8" fontSize="9">never crosses boundary</text>
        <text x="598" y="308" fill="#94A3B8" fontSize="9">masked before egress</text>
        <text x="598" y="321" fill="#94A3B8" fontSize="9">zero retention default</text>

        {/* ── Legend ────────────────────────────────────────────────── */}
        <line x1="40" y1="410" x2="80" y2="410" stroke="#06B6D4" strokeWidth="1.5" markerEnd="url(#eg-arrow)" />
        <text x="86" y="414" fill="#94A3B8" fontSize="10">Main flow</text>
        <line x1="170" y1="410" x2="210" y2="410" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#eg-arrow-vault)" />
        <text x="216" y="414" fill="#94A3B8" fontSize="10">Token store</text>
        <line x1="310" y1="410" x2="350" y2="410" stroke="#F97316" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#eg-arrow-audit)" />
        <text x="356" y="414" fill="#94A3B8" fontSize="10">Audit event</text>
        <rect x="454" y="404" width="12" height="12" rx="2" fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="472" y="414" fill="#94A3B8" fontSize="10">Gateway boundary</text>

        {/* ── Caption ───────────────────────────────────────────────── */}
        <text x="450" y="460" textAnchor="middle" fill="#475569" fontSize="10">
          Fig 1 — NeutralAI prompt egress: PII detected, tokenized, and audited inside the gateway boundary before LLM forwarding.
        </text>
      </svg>
    </figure>
  )
}
