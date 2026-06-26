/**
 * IngressFlowDiagram — LLM response / ingress unmask flow
 *
 * Shows: LLM Provider → Gateway → [optional token recovery from Vault]
 *        → unmasked response delivered to User / Client
 *        with redaction / recovery path clearly labeled.
 */
export default function IngressFlowDiagram() {
  return (
    <figure className="w-full overflow-x-auto">
      <svg
        role="img"
        aria-labelledby="ingress-title ingress-desc"
        viewBox="0 0 900 400"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full min-w-[600px]"
        style={{ fontFamily: 'var(--font-mono, ui-monospace, monospace)' }}
      >
        <title id="ingress-title">LLM Response Ingress and Unmask Flow Diagram</title>
        <desc id="ingress-desc">
          A data-flow diagram showing how an LLM response is processed on the way back to the user.
          The LLM Provider sends a response containing masked tokens to the NeutralAI Gateway. Inside
          the gateway boundary, the stream unmasker checks each token. If a token is present, it
          performs a governed vault lookup against the AES-256-GCM encrypted Token Vault using the
          tenant-bound context and TTL check. If recovery is authorised, the original PII value is
          re-inserted and the unmasked response is streamed back to the User. If recovery is not
          authorised or the token has expired, the masked placeholder is preserved and delivered as-is.
          The audit trail records all unmask events.
        </desc>

        {/* ── Background ─────────────────────────────────────────────── */}
        <rect width="900" height="400" fill="#030712" rx="12" />

        <defs>
          <pattern id="in-grid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(6,182,212,0.04)" strokeWidth="1" />
          </pattern>
          <marker id="in-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#06B6D4" />
          </marker>
          <marker id="in-arrow-vault" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#8B5CF6" />
          </marker>
          <marker id="in-arrow-vault-up" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#10B981" />
          </marker>
          <marker id="in-arrow-audit" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#F97316" />
          </marker>
        </defs>
        <rect width="900" height="400" fill="url(#in-grid)" />

        {/* ── Gateway boundary ─────────────────────────────────────── */}
        <rect x="210" y="40" width="480" height="220" rx="10"
          fill="rgba(6,182,212,0.03)" stroke="#06B6D4" strokeWidth="1.5"
          strokeDasharray="6 4" opacity="0.7" />
        <text x="450" y="58" textAnchor="middle" fill="#22D3EE" fontSize="10" letterSpacing="3" opacity="0.9">
          NEUTRALAI GATEWAY BOUNDARY
        </text>

        {/* ── Node: LLM Provider ─────────────────────────────────────── */}
        <rect x="20" y="110" width="148" height="60" rx="8"
          fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
        <text x="94" y="134" textAnchor="middle" fill="#F8FAFC" fontSize="12" fontWeight="600">LLM Provider</text>
        <text x="94" y="152" textAnchor="middle" fill="#94A3B8" fontSize="10">OpenRouter / BYOK</text>

        {/* Arrow: LLM → Gateway */}
        <line x1="168" y1="140" x2="226" y2="140"
          stroke="#06B6D4" strokeWidth="1.5" markerEnd="url(#in-arrow)" />
        <text x="197" y="132" textAnchor="middle" fill="#22D3EE" fontSize="9">response</text>
        <text x="197" y="143" textAnchor="middle" fill="#475569" fontSize="8">(masked tokens)</text>

        {/* ── Node: Stream Unmasker ─────────────────────────────────── */}
        <rect x="230" y="110" width="148" height="60" rx="8"
          fill="#0F172A" stroke="#22D3EE" strokeWidth="1.5" />
        <text x="304" y="132" textAnchor="middle" fill="#F8FAFC" fontSize="12" fontWeight="600">Stream Unmasker</text>
        <text x="304" y="150" textAnchor="middle" fill="#94A3B8" fontSize="9">Token detection</text>
        <text x="304" y="162" textAnchor="middle" fill="#94A3B8" fontSize="9">Authorisation check</text>

        {/* Arrow: Unmasker → Vault lookup */}
        <line x1="378" y1="140" x2="414" y2="140"
          stroke="#06B6D4" strokeWidth="1.5" markerEnd="url(#in-arrow)" />

        {/* ── Node: Vault Lookup ────────────────────────────────────── */}
        <rect x="416" y="110" width="148" height="60" rx="8"
          fill="#0F172A" stroke="#22D3EE" strokeWidth="1.5" />
        <text x="490" y="132" textAnchor="middle" fill="#F8FAFC" fontSize="12" fontWeight="600">Vault Lookup</text>
        <text x="490" y="150" textAnchor="middle" fill="#94A3B8" fontSize="9">Tenant-bound context</text>
        <text x="490" y="162" textAnchor="middle" fill="#94A3B8" fontSize="9">TTL + authz check</text>

        {/* Arrow: Vault Lookup → Response delivery */}
        <line x1="564" y1="140" x2="724" y2="140"
          stroke="#06B6D4" strokeWidth="1.5" markerEnd="url(#in-arrow)" />

        {/* ── Node: User / Client ─────────────────────────────────────── */}
        <rect x="726" y="110" width="148" height="60" rx="8"
          fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
        <text x="800" y="132" textAnchor="middle" fill="#F8FAFC" fontSize="12" fontWeight="600">User / Client</text>
        <text x="800" y="150" textAnchor="middle" fill="#94A3B8" fontSize="10">Unmasked response</text>
        <text x="800" y="162" textAnchor="middle" fill="#94A3B8" fontSize="10">streamed back</text>

        {/* ── Token Vault side panel ─────────────────────────────────── */}
        <rect x="390" y="220" width="200" height="68" rx="8"
          fill="#130D2B" stroke="#8B5CF6" strokeWidth="1.5" />
        <text x="404" y="241" fill="#8B5CF6" fontSize="12">🔐</text>
        <text x="422" y="241" fill="#A78BFA" fontSize="11" fontWeight="600">Token Vault</text>
        <text x="398" y="256" fill="#94A3B8" fontSize="9">AES-256-GCM encrypted</text>
        <text x="398" y="269" fill="#94A3B8" fontSize="9">Tenant-bound · TTL 15 min</text>
        <text x="398" y="282" fill="#94A3B8" fontSize="9">Auto-expire on TTL</text>

        {/* Arrow: Vault Lookup ↓ query */}
        <line x1="490" y1="170" x2="490" y2="218"
          stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#in-arrow-vault)" />
        <text x="497" y="198" fill="#8B5CF6" fontSize="9">query token</text>

        {/* Arrow: Vault ↑ recover (offset slightly) */}
        <line x1="474" y1="218" x2="474" y2="172"
          stroke="#10B981" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#in-arrow-vault-up)" />
        <text x="432" y="202" fill="#10B981" fontSize="9">recover value</text>

        {/* ── Redaction path label ─────────────────────────────────── */}
        {/* "if NOT authorised / TTL expired → preserve masked" path */}
        <rect x="596" y="220" width="168" height="68" rx="8"
          fill="#050F0A" stroke="#10B981" strokeWidth="1.5" />
        <text x="610" y="241" fill="#10B981" fontSize="12">✓</text>
        <text x="628" y="241" fill="#10B981" fontSize="11" fontWeight="600">If authorised</text>
        <text x="606" y="256" fill="#94A3B8" fontSize="9">Original value re-inserted</text>
        <text x="606" y="269" fill="#94A3B8" fontSize="9">Audit event written</text>
        <text x="606" y="282" fill="#94A3B8" fontSize="9">Streamed to client</text>

        {/* ── Redaction-kept note ───────────────────────────────────── */}
        <rect x="216" y="220" width="168" height="68" rx="8"
          fill="#12080A" stroke="#F97316" strokeWidth="1.5" />
        <text x="230" y="241" fill="#F97316" fontSize="12">🛡</text>
        <text x="248" y="241" fill="#FB923C" fontSize="11" fontWeight="600">If NOT authorised</text>
        <text x="224" y="256" fill="#94A3B8" fontSize="9">Token TTL expired, or</text>
        <text x="224" y="269" fill="#94A3B8" fontSize="9">authz check failed</text>
        <text x="224" y="282" fill="#94A3B8" fontSize="9">Masked placeholder kept</text>

        {/* Arrow: Unmasker ↓ to NOT-authorised box */}
        <line x1="304" y1="170" x2="304" y2="218"
          stroke="#F97316" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#in-arrow-audit)" />
        <text x="312" y="198" fill="#F97316" fontSize="9">authz fail</text>

        {/* ── Legend ────────────────────────────────────────────────── */}
        <line x1="40" y1="350" x2="80" y2="350" stroke="#06B6D4" strokeWidth="1.5" markerEnd="url(#in-arrow)" />
        <text x="86" y="354" fill="#94A3B8" fontSize="10">Main flow</text>
        <line x1="170" y1="350" x2="210" y2="350" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#in-arrow-vault)" />
        <text x="216" y="354" fill="#94A3B8" fontSize="10">Vault query</text>
        <line x1="310" y1="350" x2="350" y2="350" stroke="#10B981" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#in-arrow-vault-up)" />
        <text x="356" y="354" fill="#94A3B8" fontSize="10">Token recovery</text>
        <line x1="460" y1="350" x2="500" y2="350" stroke="#F97316" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#in-arrow-audit)" />
        <text x="506" y="354" fill="#94A3B8" fontSize="10">Authz fail / redact</text>

        {/* ── Caption ───────────────────────────────────────────────── */}
        <text x="450" y="388" textAnchor="middle" fill="#475569" fontSize="10">
          Fig 2 — NeutralAI response ingress: tokens recovered only via governed vault lookup; expired or unauthorised tokens remain masked.
        </text>
      </svg>
    </figure>
  )
}
