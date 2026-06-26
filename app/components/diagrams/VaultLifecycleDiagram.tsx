/**
 * VaultLifecycleDiagram — Token vault lifecycle panel
 *
 * Shows: Tokenize → Store encrypted (AES-256-GCM, TTL) → Recover (governed) → Expire
 */
export default function VaultLifecycleDiagram() {
  return (
    <figure className="w-full overflow-x-auto">
      <svg
        role="img"
        aria-labelledby="vault-title vault-desc"
        viewBox="0 0 900 260"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full min-w-[560px]"
        style={{ fontFamily: 'var(--font-mono, ui-monospace, monospace)' }}
      >
        <title id="vault-title">Token Vault Lifecycle Diagram</title>
        <desc id="vault-desc">
          A four-stage lifecycle diagram for tokens in the NeutralAI Token Vault. Stage one:
          Tokenize — a PII entity is detected and replaced with a reversible token. Stage two:
          Store Encrypted — the token and its original value are stored in the AES-256-GCM vault
          with a fifteen-minute TTL and tenant-bound context. Stage three: Recover — only an
          authorised governed restore call can retrieve the original value before TTL expiry.
          Stage four: Expire — after TTL elapses the token and value are automatically purged;
          no recovery is possible after expiry.
        </desc>

        {/* ── Background ─────────────────────────────────────────────── */}
        <rect width="900" height="260" fill="#030712" rx="12" />

        <defs>
          <pattern id="vl-grid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(139,92,246,0.04)" strokeWidth="1" />
          </pattern>
          <marker id="vl-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#8B5CF6" />
          </marker>
          <marker id="vl-arrow-expire" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#334155" />
          </marker>
        </defs>
        <rect width="900" height="260" fill="url(#vl-grid)" />

        {/* ── Stage labels row ──────────────────────────────────────── */}
        {/* Stage 1 — Tokenize */}
        <rect x="30" y="60" width="168" height="100" rx="8"
          fill="#0F172A" stroke="#8B5CF6" strokeWidth="1.5" />
        <text x="114" y="84" textAnchor="middle" fill="#A78BFA" fontSize="10" letterSpacing="2">01 / TOKENIZE</text>
        <text x="114" y="108" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="600">PII detected</text>
        <text x="114" y="126" textAnchor="middle" fill="#94A3B8" fontSize="9">Entity replaced with</text>
        <text x="114" y="139" textAnchor="middle" fill="#94A3B8" fontSize="9">reversible token ID</text>
        <text x="114" y="152" textAnchor="middle" fill="#A78BFA" fontSize="9">e.g. &lt;EMAIL_abc12&gt;</text>

        {/* Arrow 1→2 */}
        <line x1="198" y1="110" x2="234" y2="110"
          stroke="#8B5CF6" strokeWidth="1.5" markerEnd="url(#vl-arrow)" />

        {/* Stage 2 — Store Encrypted */}
        <rect x="236" y="60" width="168" height="100" rx="8"
          fill="#130D2B" stroke="#8B5CF6" strokeWidth="2" />
        <text x="320" y="84" textAnchor="middle" fill="#A78BFA" fontSize="10" letterSpacing="2">02 / STORE</text>
        <text x="320" y="108" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="600">AES-256-GCM</text>
        <text x="320" y="126" textAnchor="middle" fill="#94A3B8" fontSize="9">Tenant-bound context</text>
        <text x="320" y="139" textAnchor="middle" fill="#94A3B8" fontSize="9">TTL: 15 min default</text>
        <text x="320" y="152" textAnchor="middle" fill="#A78BFA" fontSize="9">Redis w/ key rotation</text>

        {/* Arrow 2→3 */}
        <line x1="404" y1="110" x2="440" y2="110"
          stroke="#8B5CF6" strokeWidth="1.5" markerEnd="url(#vl-arrow)" />

        {/* Stage 3 — Recover */}
        <rect x="442" y="60" width="168" height="100" rx="8"
          fill="#0A1F0F" stroke="#10B981" strokeWidth="1.5" />
        <text x="526" y="84" textAnchor="middle" fill="#10B981" fontSize="10" letterSpacing="2">03 / RECOVER</text>
        <text x="526" y="108" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="600">Governed restore</text>
        <text x="526" y="126" textAnchor="middle" fill="#94A3B8" fontSize="9">Authorised path only</text>
        <text x="526" y="139" textAnchor="middle" fill="#94A3B8" fontSize="9">Before TTL expiry</text>
        <text x="526" y="152" textAnchor="middle" fill="#10B981" fontSize="9">Original value re-inserted</text>

        {/* Arrow 3→4 */}
        <line x1="610" y1="110" x2="646" y2="110"
          stroke="#334155" strokeWidth="1.5" markerEnd="url(#vl-arrow-expire)" />

        {/* Stage 4 — Expire */}
        <rect x="648" y="60" width="208" height="100" rx="8"
          fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
        <text x="752" y="84" textAnchor="middle" fill="#475569" fontSize="10" letterSpacing="2">04 / EXPIRE</text>
        <text x="752" y="108" textAnchor="middle" fill="#94A3B8" fontSize="13" fontWeight="600">Auto-purge</text>
        <text x="752" y="126" textAnchor="middle" fill="#94A3B8" fontSize="9">TTL elapses → token deleted</text>
        <text x="752" y="139" textAnchor="middle" fill="#94A3B8" fontSize="9">No recovery after expiry</text>
        <text x="752" y="152" textAnchor="middle" fill="#475569" fontSize="9">Zero-retention by default</text>

        {/* ── Caption ───────────────────────────────────────────────── */}
        <text x="450" y="210" textAnchor="middle" fill="#475569" fontSize="10">
          Fig 3 — Token vault lifecycle: tokenize → store encrypted with TTL → governed recovery → automatic expiry and purge.
        </text>

        {/* ── Key detail strip ──────────────────────────────────────── */}
        <rect x="30" y="222" width="840" height="26" rx="5"
          fill="rgba(139,92,246,0.06)" stroke="rgba(139,92,246,0.2)" strokeWidth="1" />
        <text x="450" y="239" textAnchor="middle" fill="#94A3B8" fontSize="9" letterSpacing="1">
          VAULT KEY ROTATION SUPPORTED · LEGACY KEY DECRYPTION VIA VAULT_LEGACY_ENCRYPTION_KEYS · FAKEREDIS IN LOCAL DEV MODE
        </text>
      </svg>
    </figure>
  )
}
