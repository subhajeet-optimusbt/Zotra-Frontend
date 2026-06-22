import React, { useState, useEffect, useCallback } from "react";
import { baseUrl, apiFetch } from "../utils/utils";
import { getToken } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

// ─── CSS ──────────────────────────────────────────────────────────────────────
const NAP_CSS = `
@keyframes nap-slide-in  { from { opacity:0; transform:translateX(32px); } to { opacity:1; transform:translateX(0); } }
@keyframes nap-fade-up   { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
@keyframes nap-ping      { 0%,100%{ transform:scale(1); opacity:1; } 50%{ transform:scale(1.18); opacity:.7; } }
@keyframes nap-bounce-in { 0%{ transform:scale(.55); opacity:0; } 65%{ transform:scale(1.08); } 100%{ transform:scale(1); opacity:1; } }

.nap-shell { display:flex; flex-direction:column; height:100%; font-family:"Sora",sans-serif; background:var(--bg2); animation:nap-slide-in .28s cubic-bezier(.22,1,.36,1) both; }

.nap-hdr { padding:18px 20px 14px; border-bottom:0.5px solid var(--brd); display:flex; align-items:flex-start; gap:13px; flex-shrink:0; background:var(--bg2); position:relative; overflow:hidden; }
.nap-hdr::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,var(--pu) 0%,transparent 70%); pointer-events:none; }
.nap-hdr-icon { width:40px; height:40px; border-radius:12px; flex-shrink:0; background:var(--pg); display:flex; align-items:center; justify-content:center; box-shadow:0 4px 14px rgba(85,82,201,.30); position:relative; z-index:1; }
.nap-hdr-title { font-size:16px; font-weight:700; color:var(--ink); letter-spacing:-.025em; margin-bottom:2px; }
.nap-hdr-sub   { font-size:11px; color:var(--ink5); font-family:"DM Mono",monospace; }
.nap-close { margin-left:auto; width:28px; height:28px; border-radius:8px; border:none; background:#4B48C8; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#fff; font-size:16px; line-height:1; transition:filter .15s; flex-shrink:0; z-index:1; box-shadow:0 1px 3px rgba(75,72,200,.30); }
.nap-close:hover { filter:brightness(.88); }

.nap-steps { display:flex; align-items:center; padding:13px 20px; border-bottom:0.5px solid var(--brd); flex-shrink:0; background:var(--bg2); gap:0; }
.nap-step { display:flex; align-items:center; gap:6px; flex:1; position:relative; }
.nap-step:not(:last-child)::after { content:''; position:absolute; left:calc(50% + 16px); right:calc(-50% + 16px); top:11px; height:1.5px; background:var(--brd); z-index:0; transition:background .3s; }
.nap-step.done:not(:last-child)::after { background:var(--p); }
.nap-step-dot { width:23px; height:23px; border-radius:50%; border:1.5px solid var(--brd); display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; color:var(--ink5); background:var(--bg2); transition:all .2s; flex-shrink:0; z-index:1; }
.nap-step.active .nap-step-dot { border-color:var(--p); background:var(--p); color:#fff; box-shadow:0 0 0 3px var(--pu); animation:nap-ping 1.6s ease-in-out infinite; }
.nap-step.done   .nap-step-dot { border-color:var(--p); background:var(--p); color:#fff; animation:none; box-shadow:none; }
.nap-step-lbl { font-size:10px; font-weight:600; color:var(--ink5); letter-spacing:.04em; text-transform:uppercase; white-space:nowrap; }
.nap-step.active .nap-step-lbl { color:var(--p); }
.nap-step.done   .nap-step-lbl { color:var(--ink3); }

.nap-body { flex:1; overflow-y:auto; padding:18px 20px; display:flex; flex-direction:column; gap:16px; }
.nap-body::-webkit-scrollbar { width:4px; }
.nap-body::-webkit-scrollbar-thumb { background:rgba(0,0,0,.10); border-radius:99px; }

.nap-sec { font-size:9.5px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--ink5); margin-bottom:2px; display:flex; align-items:center; gap:6px; }
.nap-sec::after { content:''; flex:1; height:0.5px; background:var(--brd); }

.nap-field { display:flex; flex-direction:column; gap:5px; animation:nap-fade-up .22s ease both; }
.nap-label { font-size:11px; font-weight:600; color:var(--ink3); letter-spacing:.01em; display:flex; align-items:center; gap:4px; }
.nap-req  { color:#e5566c; font-size:10px; }
.nap-hint { font-size:10.5px; color:var(--ink5); margin-top:1px; }

.nap-input, .nap-select, .nap-textarea {
  width:100%; padding:9px 12px; border-radius:10px;
  border:1px solid var(--brd2); background:var(--bg2);
  font-family:"Sora",sans-serif; font-size:12.5px; color:var(--ink);
  outline:none; transition:border-color .15s, box-shadow .15s; box-sizing:border-box; appearance:none;
}
.nap-input::placeholder, .nap-textarea::placeholder { color:var(--ink5); }
.nap-input:focus, .nap-select:focus, .nap-textarea:focus { border-color:var(--p); box-shadow:0 0 0 3px var(--pu); }
.nap-select {
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%2394a3b8' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat:no-repeat; background-position:right 10px center; padding-right:30px; cursor:pointer;
}
.nap-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:11px; }
.nap-prefix-wrap { position:relative; }
.nap-prefix { position:absolute; left:12px; top:50%; transform:translateY(-50%); font-family:"DM Mono",monospace; font-size:12px; color:var(--ink5); pointer-events:none; }
.nap-prefix-wrap .nap-input { padding-left:24px; font-family:"DM Mono",monospace; }

/* Heat selector */
.nap-heat-row { display:flex; gap:8px; }
.nap-heat-opt { flex:1; padding:9px 10px; border-radius:10px; border:1px solid var(--brd); background:var(--bg2); cursor:pointer; display:flex; align-items:center; gap:7px; font-size:11.5px; font-weight:600; color:var(--ink3); transition:all .15s; }
.nap-heat-opt:hover { border-color:var(--brd3); }
.nap-heat-opt.sel-hot  { border-color:#e5566c; background:rgba(229,86,108,.07); color:#b83045; }
.nap-heat-opt.sel-warm { border-color:#d97757; background:rgba(217,119,87,.07); color:#a04e2a; }
.nap-heat-opt.sel-cool { border-color:#4b6fdb; background:rgba(75,111,219,.07); color:#2e48a0; }
.nap-hdot { width:9px; height:9px; border-radius:50%; flex-shrink:0; }
.nap-hdot.hot  { background:#e5566c; box-shadow:0 0 0 2.5px rgba(229,86,108,.22); }
.nap-hdot.warm { background:#d97757; box-shadow:0 0 0 2.5px rgba(217,119,87,.22); }
.nap-hdot.cool { background:#4b6fdb; box-shadow:0 0 0 2.5px rgba(75,111,219,.22); }

/* Industry chips */
.nap-chips { display:flex; gap:7px; flex-wrap:wrap; }
.nap-chip { padding:6px 12px; border-radius:99px; border:1px solid var(--brd); font-size:11px; font-weight:600; color:var(--ink4); cursor:pointer; transition:all .15s; background:var(--bg2); user-select:none; }
.nap-chip:hover { border-color:var(--p); color:var(--p); }
.nap-chip.sel  { border-color:var(--p); background:var(--pu); color:var(--p); }

/* Review card */
.nap-review { border-radius:13px; border:1px solid var(--brd); overflow:hidden; animation:nap-fade-up .3s ease both; }
.nap-review-head { padding:13px 15px; display:flex; align-items:center; gap:11px; background:var(--bg3); border-bottom:1px solid var(--brd); }
.nap-review-av { width:40px; height:40px; border-radius:11px; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; color:#fff; flex-shrink:0; background:var(--pg); }
.nap-review-name   { font-size:14px; font-weight:700; color:var(--ink); letter-spacing:-.015em; }
.nap-review-domain { font-size:11px; color:var(--ink5); font-family:"DM Mono",monospace; margin-top:1px; }
.nap-review-rows   { padding:8px 15px; }
.nap-review-row    { display:flex; align-items:baseline; gap:8px; padding:7px 0; border-bottom:0.5px solid var(--brd); }
.nap-review-row:last-child { border-bottom:0; }
.nap-review-key { font-size:11px; color:var(--ink5); min-width:110px; flex-shrink:0; }
.nap-review-val { font-size:12px; font-weight:600; color:var(--ink); flex:1; }
.nap-review-heat { display:inline-flex; align-items:center; gap:5px; }

/* AI banner */
.nap-ai { padding:11px 13px; border-radius:11px; background:linear-gradient(135deg,var(--pu) 0%,var(--bg2) 90%); border:1px solid var(--brd2); display:flex; align-items:flex-start; gap:9px; animation:nap-fade-up .3s .1s ease both; }
.nap-ai-icon { width:26px; height:26px; border-radius:8px; background:var(--pg); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.nap-ai-text { font-size:11.5px; color:var(--ink3); line-height:1.55; }
.nap-ai-text strong { color:var(--p); font-weight:600; }

/* Error */
.nap-err { padding:10px 13px; border-radius:9px; background:var(--rib); border:1px solid rgba(220,38,38,.2); font-size:12px; color:var(--ri); display:flex; align-items:center; gap:7px; }

/* Footer */
.nap-footer { padding:13px 20px; border-top:0.5px solid var(--brd); display:flex; align-items:center; gap:8px; flex-shrink:0; background:var(--bg2); }
.nap-btn-pri { flex:1; padding:10px 18px; border-radius:10px; background:var(--pg); color:#fff; font-family:"Sora",sans-serif; font-size:13px; font-weight:700; border:0; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:7px; box-shadow:0 4px 14px rgba(85,82,201,.28); transition:opacity .15s, transform .1s; letter-spacing:-.01em; }
.nap-btn-pri:hover { opacity:.9; transform:translateY(-1px); }
.nap-btn-pri:active { transform:translateY(0); }
.nap-btn-pri:disabled { opacity:.38; cursor:not-allowed; transform:none; }
.nap-btn-sec { padding:10px 16px; border-radius:10px; background:transparent; color:var(--ink3); font-family:"Sora",sans-serif; font-size:13px; font-weight:600; border:1px solid var(--brd); cursor:pointer; transition:all .15s; }
.nap-btn-sec:hover { border-color:var(--brd3); color:var(--ink); }

/* Success */
.nap-success { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; padding:40px 28px; text-align:center; animation:nap-fade-up .4s ease both; }
.nap-success-ring { width:72px; height:72px; border-radius:50%; background:linear-gradient(135deg,var(--pu),rgba(26,158,124,.12)); display:flex; align-items:center; justify-content:center; border:1.5px solid rgba(26,158,124,.3); }
.nap-success-check { width:44px; height:44px; border-radius:50%; background:linear-gradient(135deg,#16a34a,#22c55e); display:flex; align-items:center; justify-content:center; box-shadow:0 6px 20px rgba(22,163,74,.35); animation:nap-bounce-in .5s .1s cubic-bezier(.22,1,.36,1) both; }
.nap-success-title { font-size:20px; font-weight:700; color:var(--ink); letter-spacing:-.025em; }
.nap-success-sub   { font-size:13px; color:var(--ink5); line-height:1.6; max-width:280px; }
.nap-success-card  { padding:12px 20px; border-radius:13px; border:1px solid var(--brd); background:var(--bg3); text-align:left; width:100%; animation:nap-fade-up .4s .15s ease both; }
.nap-success-card-name { font-size:14px; font-weight:700; color:var(--ink); margin-bottom:3px; }
.nap-success-card-meta { font-size:11.5px; color:var(--ink5); font-family:"DM Mono",monospace; }

/* Spinner */
.nap-spinner { width:16px; height:16px; border:2px solid rgba(255,255,255,.4); border-top-color:#fff; border-radius:50%; animation:nap-spin .6s linear infinite; flex-shrink:0; }
@keyframes nap-spin { to { transform:rotate(360deg); } }
`;

// ─── Constants matching API enum values ──────────────────────────────────────
const ACCOUNT_TYPES = [
  { value: "customer", label: "Customer" },
  { value: "prospect", label: "Prospect" },
  { value: "partner", label: "Partner" },
  { value: "vendor", label: "Vendor" },
  { value: "reseller", label: "Reseller" },
  { value: "other", label: "Other" },
];

const STAGES = [
  { value: "prospect", label: "Prospect" },
  { value: "qualified", label: "Qualified" },
  { value: "discovery", label: "Discovery" },
  { value: "evaluation", label: "Evaluation" },
  { value: "negotiation", label: "Negotiation" },
  { value: "closing", label: "Closing" },
];

const SOURCES = [
  "Inbound",
  "Outbound",
  "Referral",
  "Partner",
  "Event",
  "Cold outreach",
  "Social",
  "Other",
];

const INDUSTRY_OPTS = [
  "Technology",
  "SaaS",
  "FinTech",
  "Healthcare",
  "Legal",
  "Manufacturing",
  "Retail",
  "Real Estate",
  "Education",
  "Media",
  "Logistics",
  "Consulting",
  "AI / ML",
  "Other",
];

const STEPS = ["Account", "Pipeline", "Review"];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function napInitials(name: string): string {
  return (
    name
      .split(/\s+/)
      .map((w) => w[0] ?? "")
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?"
  );
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ─── API payload — matches spec exactly ──────────────────────────────────────
interface AccountPayload {
  accountName: string;
  domain: string;
  industry: string;
  accountType: string;
  source: string;
  stage: string;
  heat: string;
  arr: number;
  createdBy: string;
}

interface NewAccountPanelProps {
  onClose: () => void;
  onCreated?: (accountId: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
const NewAccountPanel: React.FC<NewAccountPanelProps> = ({
  onClose,
  onCreated,
}) => {
  const { fullName } = useAuth();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Form — field names mirror API keys ──────────────────────────────────
  const [form, setForm] = useState<AccountPayload>({
    accountName: "",
    domain: "",
    industry: "",
    accountType: "customer",
    source: "",
    stage: "prospect",
    heat: "warm",
    arr: 0,
    createdBy: "",
  });
  const [arrRaw, setArrRaw] = useState(""); // controlled string for the ARR input

  useEffect(() => {
    if (!document.getElementById("nap-styles")) {
      const s = document.createElement("style");
      s.id = "nap-styles";
      s.textContent = NAP_CSS;
      document.head.appendChild(s);
    }
  }, []);

  const set = <K extends keyof AccountPayload>(k: K, v: AccountPayload[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  // ── Per-step validation ──────────────────────────────────────────────────
  const canNext = (): boolean => {
    if (step === 0)
      return (
        form.accountName.trim().length > 0 && form.domain.trim().length > 0
      );
    if (step === 1) return form.stage.length > 0 && form.accountType.length > 0;
    return true;
  };

  // ── API call ─────────────────────────────────────────────────────────────
  const handleCreate = useCallback(async () => {
    setSaving(true);
    setError(null);
    try {
      const payload: AccountPayload = {
        accountName: form.accountName.trim(),
        domain: form.domain.trim(),
        industry: form.industry,
        accountType: form.accountType,
        source: form.source,
        stage: form.stage,
        heat: form.heat,
        arr: Number(arrRaw.replace(/[^0-9.]/g, "")) || 0,
        createdBy: fullName ?? "",
      };
      const res = await apiFetch(`${baseUrl()}/accounts`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const created = await res.json();
      setDone(true);
      onCreated?.(created?.accountId ?? "");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }, [form, arrRaw, onCreated]);

  const next = () => {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else handleCreate();
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const resetAll = () => {
    setDone(false);
    setStep(0);
    setError(null);
    setArrRaw("");
    setForm({
      accountName: "",
      domain: "",
      industry: "",
      accountType: "customer",
      source: "",
      stage: "prospect",
      heat: "warm",
      arr: 0,
      createdBy: "",
    });
  };

  // ── Stage label helper ───────────────────────────────────────────────────
  const stageLabel =
    STAGES.find((s) => s.value === form.stage)?.label ?? form.stage;
  const typeLabel =
    ACCOUNT_TYPES.find((t) => t.value === form.accountType)?.label ??
    form.accountType;

  // ── Success ──────────────────────────────────────────────────────────────
  if (done)
    return (
      <div className="nap-shell">
        <div className="nap-hdr">
          <div className="nap-hdr-icon" style={{ zIndex: 1 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 2l1.8 3.6L15 6.3l-3 2.9.7 4.1L9 11.3 5.3 13.3l.7-4.1-3-2.9 4.2-.7L9 2z"
                fill="#fff"
              />
            </svg>
          </div>
          <div style={{ zIndex: 1 }}>
            <div className="nap-hdr-title">New Account</div>
            <div className="nap-hdr-sub">created successfully</div>
          </div>
          <button className="nap-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="nap-success">
          <div className="nap-success-ring">
            <div className="nap-success-check">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M5 10.5l3.5 3.5L15 7"
                  stroke="#fff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="nap-success-title">Account Created! 🎉</div>
          <div className="nap-success-sub">
            <strong>{form.accountName}</strong> is now live in your pipeline.
          </div>
          <div className="nap-success-card">
            <div className="nap-success-card-name">{form.accountName}</div>
            <div className="nap-success-card-meta">
              {form.domain} · {form.industry || "—"} · {typeLabel} ·{" "}
              {stageLabel}
              {arrRaw ? ` · $${Number(arrRaw).toLocaleString()} ARR` : ""}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, width: "100%" }}>
            <button
              className="nap-btn-sec"
              style={{ flex: 1 }}
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="nap-btn-pri"
              style={{ flex: 1 }}
              onClick={resetAll}
            >
              + Add Another
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="nap-shell">
      {/* Header */}
      <div className="nap-hdr">
        <div className="nap-hdr-icon" style={{ zIndex: 1 }}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <div style={{ zIndex: 1 }}>
          <div className="nap-hdr-title">New Account</div>
          <div className="nap-hdr-sub">
            step {step + 1} of {STEPS.length} · {STEPS[step].toLowerCase()}
          </div>
        </div>
        <button className="nap-close" onClick={onClose}>
          ×
        </button>
      </div>

      {/* Steps */}
      <div className="nap-steps">
        {STEPS.map((label, i) => (
          <div
            key={i}
            className={`nap-step${i === step ? " active" : ""}${i < step ? " done" : ""}`}
            style={{ cursor: i < step ? "pointer" : "default" }}
            onClick={() => i < step && setStep(i)}
          >
            <div className="nap-step-dot">
              {i < step ? (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M2 5.2l2.2 2.2L8 3"
                    stroke="#fff"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span className="nap-step-lbl">{label}</span>
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="nap-body">
        {/* ── STEP 0: Account basics ── */}
        {step === 0 && (
          <>
            <div className="nap-sec">Company</div>

            <div className="nap-field" style={{ animationDelay: "0ms" }}>
              <label className="nap-label">
                Account name <span className="nap-req">*</span>
              </label>
              <input
                className="nap-input"
                placeholder="e.g. Harmon & Associates"
                value={form.accountName}
                onChange={(e) => set("accountName", e.target.value)}
                autoFocus
              />
            </div>

            <div className="nap-field" style={{ animationDelay: "50ms" }}>
              <label className="nap-label">
                Domain <span className="nap-req">*</span>
              </label>
              <input
                className="nap-input"
                placeholder="harmonlaw.com"
                value={form.domain}
                onChange={(e) => set("domain", e.target.value)}
              />
              <div className="nap-hint">
                Used to match emails and track web intent signals
              </div>
            </div>

            <div className="nap-sec" style={{ marginTop: 4 }}>
              Industry
            </div>

            <div className="nap-field" style={{ animationDelay: "80ms" }}>
              <label className="nap-label">Industry</label>
              <div className="nap-chips">
                {INDUSTRY_OPTS.map((ind) => (
                  <button
                    key={ind}
                    className={`nap-chip${form.industry === ind ? " sel" : ""}`}
                    onClick={() =>
                      set("industry", form.industry === ind ? "" : ind)
                    }
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>

            <div className="nap-grid2">
              <div className="nap-field" style={{ animationDelay: "100ms" }}>
                <label className="nap-label">Account type</label>
                <select
                  className="nap-select"
                  value={form.accountType}
                  onChange={(e) => set("accountType", e.target.value)}
                >
                  {ACCOUNT_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="nap-field" style={{ animationDelay: "110ms" }}>
                <label className="nap-label">Source</label>
                <select
                  className="nap-select"
                  value={form.source}
                  onChange={(e) => set("source", e.target.value)}
                >
                  <option value="">Select…</option>
                  {SOURCES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

        {/* ── STEP 1: Pipeline ── */}
        {step === 1 && (
          <>
            <div className="nap-sec">Pipeline</div>

            <div className="nap-field" style={{ animationDelay: "0ms" }}>
              <label className="nap-label">
                Stage <span className="nap-req">*</span>
              </label>
              <select
                className="nap-select"
                value={form.stage}
                onChange={(e) => set("stage", e.target.value)}
              >
                {STAGES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="nap-field" style={{ animationDelay: "50ms" }}>
              <label className="nap-label">ARR</label>
              <div className="nap-prefix-wrap">
                <span className="nap-prefix">$</span>
                <input
                  className="nap-input"
                  placeholder="80,000"
                  value={arrRaw}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^0-9]/g, "");
                    setArrRaw(v);
                    set("arr", Number(v) || 0);
                  }}
                />
              </div>
              <div className="nap-hint">
                Annual recurring revenue — enter 0 if unknown
              </div>
            </div>

            <div className="nap-sec" style={{ marginTop: 4 }}>
              Heat signal
            </div>

            <div className="nap-field" style={{ animationDelay: "80ms" }}>
              <label className="nap-label">Relationship temperature</label>
              <div className="nap-heat-row">
                {(["hot", "warm", "cool"] as const).map((h) => (
                  <button
                    key={h}
                    className={`nap-heat-opt${form.heat === h ? ` sel-${h}` : ""}`}
                    onClick={() => set("heat", h)}
                  >
                    <span className={`nap-hdot ${h}`} />
                    {h.charAt(0).toUpperCase() + h.slice(1)}
                  </button>
                ))}
              </div>
              <div className="nap-hint">
                Hot: active buying signals · Warm: engaged · Cool: early-stage
              </div>
            </div>

            <div className="nap-ai" style={{ animationDelay: "110ms" }}>
              <div className="nap-ai-icon">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M6.5 1.2l1.1 2.2 2.5.37-1.8 1.75.42 2.46L6.5 6.8 4.28 8l.42-2.46L2.9 3.79l2.5-.37L6.5 1.2z"
                    fill="#fff"
                  />
                </svg>
              </div>
              <div className="nap-ai-text">
                {form.heat === "hot" ? (
                  <>
                    <strong>Hot account</strong> — Zotra will flag this for a
                    same-day morning brief and monitor{" "}
                    {form.domain || "the domain"} for active signals.
                  </>
                ) : form.heat === "warm" ? (
                  <>
                    Zotra will monitor{" "}
                    <strong>{form.domain || "the domain"}</strong> overnight and
                    surface engagement signals in your morning brief.
                  </>
                ) : (
                  <>
                    Early-stage account. Zotra will track{" "}
                    <strong>{form.domain || "the domain"}</strong> passively and
                    notify you when signals pick up.
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {/* ── STEP 2: Review ── */}
        {step === 2 && (
          <>
            <div className="nap-sec">Review & Create</div>

            <div className="nap-review">
              <div className="nap-review-head">
                <div className="nap-review-av">
                  {napInitials(form.accountName || "?")}
                </div>
                <div>
                  <div className="nap-review-name">
                    {form.accountName || "—"}
                  </div>
                  <div className="nap-review-domain">{form.domain || "—"}</div>
                </div>
              </div>
              <div className="nap-review-rows">
                {(
                  [
                    ["Industry", form.industry || "—"],
                    ["Account type", typeLabel],
                    ["Source", form.source || "—"],
                    ["Stage", stageLabel],
                    [
                      "ARR",
                      arrRaw ? `$${Number(arrRaw).toLocaleString()}` : "—",
                    ],
                    [
                      "Heat",
                      form.heat.charAt(0).toUpperCase() + form.heat.slice(1),
                    ],
                  ] as [string, string][]
                ).map(([k, v]) => (
                  <div key={k} className="nap-review-row">
                    <span className="nap-review-key">{k}</span>
                    <span className="nap-review-val">
                      {k === "Heat" ? (
                        <span className="nap-review-heat">
                          <span className={`nap-hdot ${form.heat}`} /> {v}
                        </span>
                      ) : (
                        v
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="nap-err">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                API error: {error}. Check your connection and try again.
              </div>
            )}

            <div className="nap-ai">
              <div className="nap-ai-icon">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M6.5 1.2l1.1 2.2 2.5.37-1.8 1.75.42 2.46L6.5 6.8 4.28 8l.42-2.46L2.9 3.79l2.5-.37L6.5 1.2z"
                    fill="#fff"
                  />
                </svg>
              </div>
              <div className="nap-ai-text">
                Ready to create. Zotra will start monitoring{" "}
                <strong>{form.domain || "this domain"}</strong> and surface the
                first signals in your next morning brief.
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="nap-footer">
        {step > 0 && (
          <button className="nap-btn-sec" onClick={back} disabled={saving}>
            ← Back
          </button>
        )}
        <button
          className="nap-btn-pri"
          onClick={next}
          disabled={!canNext() || saving}
        >
          {saving ? (
            <>
              <div className="nap-spinner" /> Creating…
            </>
          ) : step < STEPS.length - 1 ? (
            <>
              Continue
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7h8M7 3l4 4-4 4"
                  stroke="#fff"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7.2l2.8 2.8L11 4"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Create Account
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default NewAccountPanel;
