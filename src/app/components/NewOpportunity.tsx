import React, { useState, useEffect } from "react";

// ─── Inline styles injected once ─────────────────────────────────────────────
const PANEL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(32px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes nop-fade-up {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes nop-shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes nop-ping {
  0%,100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(1.18); opacity: .7; }
}

/* Panel shell */
.nop-shell {
  display: flex; flex-direction: column; height: 100%;
  font-family: "Sora", sans-serif;
  background: var(--bg, #ffffff);
  --nop-p: #6366f1; --nop-p2: #4f46e5;
  --nop-g: linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#06b6d4 100%);
  --nop-ink: #0f172a; --nop-ink3: #475569; --nop-ink5: #94a3b8;
  --nop-brd: #e2e8f0; --nop-bg2: #f8fafc; --nop-bg3: #f1f5f9;
  --nop-radius: 12px;
  animation: slideInRight .28s cubic-bezier(.22,1,.36,1) both;
}

/* Header */
.nop-header {
  padding: 20px 22px 16px;
  border-bottom: 0.5px solid var(--nop-brd);
  display: flex; align-items: flex-start; gap: 14px;
  flex-shrink: 0;
  background: var(--bg2, #f8fafc);
  position: relative; overflow: hidden;
}
.nop-header::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg,rgba(99,102,241,.055) 0%,rgba(139,92,246,.03) 60%,transparent 100%);
  pointer-events: none;
}
.nop-header-icon {
  width: 40px; height: 40px; border-radius: 11px; flex-shrink: 0;
  background: var(--nop-g); display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 14px rgba(99,102,241,.35); position: relative;
}
.nop-header-icon svg { filter: drop-shadow(0 1px 2px rgba(0,0,0,.18)); }
.nop-header-title { font-size: 16px; font-weight: 700; color: var(--nop-ink); letter-spacing: -.025em; margin-bottom: 2px; }
.nop-header-sub { font-size: 11.5px; color: var(--nop-ink5); font-family: "DM Mono",monospace; }
.nop-close {
  margin-left: auto; width: 28px; height: 28px; border-radius: 8px;
  border: 0.5px solid var(--nop-brd); background: var(--bg,#fff);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  color: var(--nop-ink5); font-size: 16px; line-height: 1; transition: all .15s; flex-shrink: 0;
}
.nop-close:hover { background: var(--nop-bg3); color: var(--nop-ink); border-color: var(--nop-ink5); }

/* Progress steps */
.nop-steps {
  display: flex; align-items: center; gap: 0;
  padding: 14px 22px; border-bottom: 0.5px solid var(--nop-brd);
  flex-shrink: 0; background: var(--bg,#fff);
}
.nop-step {
  display: flex; align-items: center; gap: 6px; flex: 1;
  position: relative;
}
.nop-step:not(:last-child)::after {
  content: ''; position: absolute; left: calc(50% + 16px); right: calc(-50% + 16px);
  top: 12px; height: 1.5px;
  background: var(--nop-brd); z-index: 0;
  transition: background .3s;
}
.nop-step.done:not(:last-child)::after { background: var(--nop-p); }
.nop-step-circle {
  width: 24px; height: 24px; border-radius: 50%; border: 1.5px solid var(--nop-brd);
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 700; color: var(--nop-ink5);
  background: var(--bg,#fff); transition: all .2s; flex-shrink: 0; z-index: 1;
}
.nop-step.active .nop-step-circle {
  border-color: var(--nop-p); background: var(--nop-p); color: #fff;
  box-shadow: 0 0 0 3px rgba(99,102,241,.18);
  animation: nop-ping 1.4s ease-in-out infinite;
}
.nop-step.done .nop-step-circle {
  border-color: var(--nop-p); background: var(--nop-p); color: #fff;
  animation: none; box-shadow: none;
}
.nop-step-label { font-size: 10px; font-weight: 600; color: var(--nop-ink5); letter-spacing: .04em; text-transform: uppercase; white-space: nowrap; }
.nop-step.active .nop-step-label { color: var(--nop-p); }
.nop-step.done .nop-step-label { color: var(--nop-ink3); }

/* Scrollable body */
.nop-body {
  flex: 1; overflow-y: auto; padding: 20px 22px;
  display: flex; flex-direction: column; gap: 18px;
}
.nop-body::-webkit-scrollbar { width: 4px; }
.nop-body::-webkit-scrollbar-thumb { background: rgba(0,0,0,.10); border-radius: 99px; }

/* Section heading */
.nop-section-label {
  font-size: 9.5px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
  color: var(--nop-ink5); margin-bottom: 10px; display: flex; align-items: center; gap: 6px;
}
.nop-section-label::after { content:''; flex:1; height:0.5px; background:var(--nop-brd); }

/* Field */
.nop-field { display: flex; flex-direction: column; gap: 5px; animation: nop-fade-up .25s ease both; }
.nop-label {
  font-size: 11px; font-weight: 600; color: var(--nop-ink3); letter-spacing: .01em;
  display: flex; align-items: center; gap: 4px;
}
.nop-required { color: #e5566c; font-size: 10px; }
.nop-input, .nop-select, .nop-textarea {
  width: 100%; padding: 9px 12px; border-radius: var(--nop-radius);
  border: 1px solid var(--nop-brd); background: var(--bg,#fff);
  font-family: "Sora",sans-serif; font-size: 12.5px; color: var(--nop-ink);
  outline: none; transition: border-color .15s, box-shadow .15s;
  box-sizing: border-box; appearance: none;
}
.nop-input::placeholder, .nop-textarea::placeholder { color: var(--nop-ink5); }
.nop-input:focus, .nop-select:focus, .nop-textarea:focus {
  border-color: var(--nop-p); box-shadow: 0 0 0 3px rgba(99,102,241,.14);
}
.nop-textarea { resize: vertical; min-height: 70px; font-size: 12px; line-height: 1.55; }
.nop-select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%2394a3b8' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; padding-right: 30px; cursor: pointer; }

/* 2-col grid */
.nop-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

/* Value input with $ prefix */
.nop-value-wrap { position: relative; }
.nop-value-prefix { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-family: "DM Mono",monospace; font-size: 12px; color: var(--nop-ink5); pointer-events: none; }
.nop-value-wrap .nop-input { padding-left: 24px; font-family: "DM Mono",monospace; }

/* Heat selector */
.nop-heat-row { display: flex; gap: 8px; }
.nop-heat-opt {
  flex: 1; padding: 8px 10px; border-radius: 10px; border: 1px solid var(--nop-brd);
  background: var(--bg,#fff); cursor: pointer; display: flex; align-items: center; gap: 7px;
  font-size: 11.5px; font-weight: 600; color: var(--nop-ink3); transition: all .15s;
}
.nop-heat-opt:hover { border-color: var(--nop-ink5); }
.nop-heat-opt.selected-hot { border-color: #e5566c; background: rgba(229,86,108,.07); color: #b83045; }
.nop-heat-opt.selected-warm { border-color: #d97757; background: rgba(217,119,87,.07); color: #a04e2a; }
.nop-heat-opt.selected-cool { border-color: #4b6fdb; background: rgba(75,111,219,.07); color: #2e48a0; }
.nop-heat-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
.nop-heat-dot.hot { background: #e5566c; box-shadow: 0 0 0 2.5px rgba(229,86,108,.22); }
.nop-heat-dot.warm { background: #d97757; box-shadow: 0 0 0 2.5px rgba(217,119,87,.22); }
.nop-heat-dot.cool { background: #4b6fdb; box-shadow: 0 0 0 2.5px rgba(75,111,219,.22); }

/* Owner avatar chip */
.nop-owner-row { display: flex; gap: 7px; flex-wrap: wrap; }
.nop-owner-chip {
  display: flex; align-items: center; gap: 6px; padding: 5px 10px 5px 6px;
  border-radius: 99px; border: 1px solid var(--nop-brd); background: var(--bg,#fff);
  font-size: 11.5px; font-weight: 600; color: var(--nop-ink3); cursor: pointer;
  transition: all .15s;
}
.nop-owner-chip:hover { border-color: var(--nop-p); color: var(--nop-p); }
.nop-owner-chip.selected { border-color: var(--nop-p); background: rgba(99,102,241,.07); color: var(--nop-p); }
.nop-owner-av {
  width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center;
  justify-content: center; font-size: 8px; font-weight: 700; color: #fff; flex-shrink: 0;
}

/* AI suggestion banner */
.nop-ai-banner {
  padding: 10px 13px; border-radius: 11px;
  background: linear-gradient(135deg,rgba(99,102,241,.07),rgba(139,92,246,.05));
  border: 1px solid rgba(99,102,241,.18);
  display: flex; align-items: flex-start; gap: 9px;
  animation: nop-fade-up .3s .1s ease both;
}
.nop-ai-icon { width: 26px; height: 26px; border-radius: 8px; background: var(--nop-g); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.nop-ai-text { font-size: 11.5px; color: var(--nop-ink3); line-height: 1.55; }
.nop-ai-text strong { color: var(--nop-p); font-weight: 600; }

/* Summary card (step 3) */
.nop-summary-card {
  border-radius: 13px; border: 1px solid var(--nop-brd);
  overflow: hidden; animation: nop-fade-up .3s ease both;
}
.nop-summary-head {
  padding: 13px 15px; display: flex; align-items: center; gap: 11px;
  background: var(--nop-bg2); border-bottom: 1px solid var(--nop-brd);
}
.nop-summary-av {
  width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center;
  justify-content: center; font-size: 13px; font-weight: 700; color: #fff; flex-shrink: 0;
  background: var(--nop-g);
}
.nop-summary-name { font-size: 14px; font-weight: 700; color: var(--nop-ink); letter-spacing: -.015em; }
.nop-summary-domain { font-size: 11px; color: var(--nop-ink5); font-family: "DM Mono",monospace; }
.nop-summary-rows { padding: 10px 15px; display: flex; flex-direction: column; gap: 0; }
.nop-summary-row { display: flex; align-items: center; gap: 8px; padding: 7px 0; border-bottom: 0.5px solid var(--nop-brd); }
.nop-summary-row:last-child { border-bottom: 0; }
.nop-summary-key { font-size: 11px; color: var(--nop-ink5); min-width: 90px; }
.nop-summary-val { font-size: 12px; font-weight: 600; color: var(--nop-ink); }

/* Footer */
.nop-footer {
  padding: 14px 22px; border-top: 0.5px solid var(--nop-brd);
  display: flex; align-items: center; gap: 8px; flex-shrink: 0;
  background: var(--bg2, #f8fafc);
}
.nop-btn-pri {
  flex: 1; padding: 10px 18px; border-radius: var(--nop-radius);
  background: var(--nop-g); color: #fff; font-family: "Sora",sans-serif;
  font-size: 13px; font-weight: 700; border: 0; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 7px;
  box-shadow: 0 4px 14px rgba(99,102,241,.35); transition: opacity .15s, transform .1s;
  letter-spacing: -.01em;
}
.nop-btn-pri:hover { opacity: .9; transform: translateY(-1px); }
.nop-btn-pri:active { transform: translateY(0); }
.nop-btn-sec {
  padding: 10px 16px; border-radius: var(--nop-radius);
  background: transparent; color: var(--nop-ink3); font-family: "Sora",sans-serif;
  font-size: 13px; font-weight: 600; border: 1px solid var(--nop-brd); cursor: pointer;
  transition: all .15s;
}
.nop-btn-sec:hover { border-color: var(--nop-ink5); color: var(--nop-ink); }

/* Success screen */
.nop-success {
  flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 16px; padding: 40px 28px; text-align: center;
  animation: nop-fade-up .4s ease both;
}
.nop-success-ring {
  width: 72px; height: 72px; border-radius: 50%;
  background: linear-gradient(135deg,rgba(99,102,241,.12),rgba(22,163,74,.12));
  display: flex; align-items: center; justify-content: center;
  border: 1.5px solid rgba(22,163,74,.35);
}
.nop-success-check {
  width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg,#16a34a,#22c55e);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 20px rgba(22,163,74,.35);
}
.nop-success-title { font-size: 20px; font-weight: 700; color: var(--nop-ink); letter-spacing: -.025em; }
.nop-success-sub { font-size: 13px; color: var(--nop-ink5); line-height: 1.6; max-width: 280px; }
.nop-success-deal {
  padding: 12px 20px; border-radius: 13px; border: 1px solid var(--nop-brd);
  background: var(--nop-bg2); text-align: left; width: 100%;
}
.nop-success-deal-name { font-size: 14px; font-weight: 700; color: var(--nop-ink); margin-bottom: 3px; }
.nop-success-deal-meta { font-size: 11.5px; color: var(--nop-ink5); font-family: "DM Mono",monospace; }
`;

// ─── Types ────────────────────────────────────────────────────────────────────
interface NewOpportunityPanelProps {
  onClose: () => void;
  open: boolean;
}

const STAGES_LIST = [
  { id: "prospect", name: "Prospect" },
  { id: "qualified", name: "Qualified" },
  { id: "proposal", name: "Proposal" },
  { id: "negotiation", name: "Negotiation" },
  { id: "contract", name: "Contract Sent" },
  { id: "closed", name: "Closed Won" },
];

const OWNERS = [
  { id: "1", name: "Alex R.", color: "#6366f1" },
  { id: "2", name: "Sam T.", color: "#0891b2" },
  { id: "3", name: "Jordan K.", color: "#16a34a" },
  { id: "4", name: "Morgan L.", color: "#d97706" },
];

const STEPS = ["Details", "Context", "Review"];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// ─── Component ────────────────────────────────────────────────────────────────
const NewOpportunityPanel: React.FC<NewOpportunityPanelProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  // Form state
  const [form, setForm] = useState({
    name: "",
    domain: "",
    stage: "prospect",
    value: "",
    heat: "warm" as "hot" | "warm" | "cool",
    owner: "1",
    closeDate: "",
    intent: "",
    notes: "",
  });

  // Inject styles once
  useEffect(() => {
    if (!document.getElementById("nop-styles")) {
      const s = document.createElement("style");
      s.id = "nop-styles";
      s.textContent = PANEL_CSS;
      document.head.appendChild(s);
    }
  }, []);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const canNext = () => {
    if (step === 0) return form.name.trim().length > 0 && form.value.trim().length > 0;
    if (step === 1) return form.intent.trim().length > 0;
    return true;
  };

  const next = () => {
    if (step < 2) setStep((s) => s + 1);
    else {
      setDone(true);
    }
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const selectedOwner = OWNERS.find((o) => o.id === form.owner)!;
  const stageLabel = STAGES_LIST.find((s) => s.id === form.stage)?.name ?? "";

  // ── Success screen ─────────────────────────────────────────────────────────
  if (done) {
    return (
      <div className="nop-shell" >
        {/* Header */}
        <div className="nop-header" >
          <div className="nop-header-icon" >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2l1.8 3.6L15 6.3l-3 2.9.7 4.1L9 11.3 5.3 13.3l.7-4.1-3-2.9 4.2-.7L9 2z" fill="#fff" />
            </svg>
          </div>
          <div>
            <div className="nop-header-title" >New Deal</div>
            <div className="nop-header-sub" >deal created successfully</div>
          </div>
          <button className="nop-close"  onClick={onClose}>×</button>
        </div>

        <div className="nop-success" >
          <div className="nop-success-ring" >
            <div className="nop-success-check" >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 10.5l3.5 3.5L15 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="nop-success-title" >Deal Created! 🎉</div>
          <div className="nop-success-sub" >
            <strong>{form.name}</strong> has been added to your pipeline and is now visible on the board.
          </div>
          <div className="nop-success-deal" >
            <div className="nop-success-deal-name" >{form.name}</div>
            <div className="nop-success-deal-meta" >
              {form.domain || "—"} · ${Number(form.value || 0).toLocaleString()} ARR · {stageLabel}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, width: "100%" }}>
            <button className="nop-btn-sec"  style={{ flex: 1 }} onClick={onClose}>
              Close
            </button>
            <button
              className="nop-btn-pri" 
              style={{ flex: 1 }}
              onClick={() => {
                setDone(false);
                setStep(0);
                setForm({ name: "", domain: "", stage: "prospect", value: "", heat: "warm", owner: "1", closeDate: "", intent: "", notes: "" });
              }}
            >
              + Add Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="nop-shell" >
      {/* ── Header ── */}
      <div className="nop-header" >
      
        <div>
          <div className="nop-header-title" >New Deal</div>
          <div className="nop-header-sub" >add to pipeline · {STAGES_LIST.length} stages</div>
        </div>
        <button className="nop-close"  onClick={onClose}>×</button>
      </div>

      {/* ── Progress steps ── */}
      <div className="nop-steps" >
        {STEPS.map((label, i) => (
          <div
            key={i}
            className={`nop-step${i === step ? " active" : ""}${i < step ? " done" : ""}`}
            style={{ cursor: i < step ? "pointer" : "default" }}
            onClick={() => i < step && setStep(i)}
          >
            <div className="nop-step-circle" >
              {i < step ? (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5.2l2.2 2.2L8 3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span className="nop-step-label" >{label}</span>
          </div>
        ))}
      </div>

      {/* ── Body ── */}
      <div className="nop-body" >

        {/* STEP 0: Details */}
        {step === 0 && (
          <>
            <div className="nop-section-label" >Account</div>

            <div className="nop-field"  style={{ animationDelay: "0ms" }}>
              <label className="nop-label" >
                Company Name <span className="nop-required" >*</span>
              </label>
              <input
                className="nop-input" 
                placeholder="e.g. Acme Corp"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </div>

            <div className="nop-field"  style={{ animationDelay: "50ms" }}>
              <label className="nop-label" >Domain</label>
              <input
                className="nop-input" 
                placeholder="acmecorp.com"
                value={form.domain}
                onChange={(e) => set("domain", e.target.value)}
              />
            </div>

            <div className="nop-grid2" >
              <div className="nop-field"  style={{ animationDelay: "80ms" }}>
                <label className="nop-label" >
                  ARR Value <span className="nop-required" >*</span>
                </label>
                <div className="nop-value-wrap" >
                  <span className="nop-value-prefix" >$</span>
                  <input
                    className="nop-input" 
                    placeholder="120,000"
                    value={form.value}
                    onChange={(e) => set("value", e.target.value.replace(/[^0-9]/g, ""))}
                  />
                </div>
              </div>

              <div className="nop-field"  style={{ animationDelay: "100ms" }}>
                <label className="nop-label" >Close Date</label>
                <input
                  className="nop-input" 
                  type="date"
                  value={form.closeDate}
                  onChange={(e) => set("closeDate", e.target.value)}
                />
              </div>
            </div>

            <div className="nop-section-label"  style={{ marginTop: 4 }}>Pipeline</div>

            <div className="nop-field"  style={{ animationDelay: "110ms" }}>
              <label className="nop-label" >Stage</label>
              <select className="nop-select"  value={form.stage} onChange={(e) => set("stage", e.target.value)}>
                {STAGES_LIST.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="nop-field"  style={{ animationDelay: "130ms" }}>
              <label className="nop-label" >Heat Signal</label>
              <div className="nop-heat-row" >
                {(["hot", "warm", "cool"] as const).map((h) => (
                  <button
                    key={h}
                    className={`nop-heat-opt${form.heat === h ? ` selected-${h}` : ""}`}
                    onClick={() => set("heat", h)}
                  >
                    <span className={`nop-heat-dot ${h}`} />
                    {h.charAt(0).toUpperCase() + h.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* STEP 1: Context */}
        {step === 1 && (
          <>
            <div className="nop-section-label" >Intent & Context</div>

            <div className="nop-field"  style={{ animationDelay: "0ms" }}>
              <label className="nop-label" >
                Deal Intent <span className="nop-required" >*</span>
              </label>
              <input
                className="nop-input" 
                placeholder="e.g. Expand from 50 → 200 seats"
                value={form.intent}
                onChange={(e) => set("intent", e.target.value)}
              />
            </div>

            <div className="nop-field"  style={{ animationDelay: "60ms" }}>
              <label className="nop-label" >Internal Notes</label>
              <textarea
                className="nop-textarea" 
                placeholder="Key context, blockers, next steps…"
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
              />
            </div>

            <div className="nop-section-label"  style={{ marginTop: 4 }}>Owner</div>

            <div className="nop-field"  style={{ animationDelay: "80ms" }}>
              <label className="nop-label" >Assign to</label>
              <div className="nop-owner-row" >
                {OWNERS.map((o) => (
                  <button
                    key={o.id}
                    className={`nop-owner-chip${form.owner === o.id ? " selected" : ""}`}
                    onClick={() => set("owner", o.id)}
                  >
                    <div className="nop-owner-av"  style={{ background: o.color }}>
                      {initials(o.name)}
                    </div>
                    {o.name}
                  </button>
                ))}
              </div>
            </div>

            {/* AI suggestion banner */}
            <div className="nop-ai-banner"  style={{ animationDelay: "100ms" }}>
              <div className="nop-ai-icon" >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 1.2l1.1 2.2 2.5.37-1.8 1.75.42 2.46L6.5 6.8 4.28 8l.42-2.46L2.9 3.79l2.5-.37L6.5 1.2z" fill="#fff"/>
                </svg>
              </div>
              <div className="nop-ai-text" >
                <strong>AI Insight:</strong> Based on similar deals in <strong>{stageLabel}</strong>, 
                the avg close time is <strong>34 days</strong>. 
                {form.heat === "hot" ? " Hot deals in this stage close 2× faster — prioritize!" 
                  : form.heat === "cool" ? " Consider a re-engagement sequence to warm this up." 
                  : " Steady engagement is key — schedule a touch within 7 days."}
              </div>
            </div>
          </>
        )}

        {/* STEP 2: Review */}
        {step === 2 && (
          <>
            <div className="nop-section-label" >Review Deal</div>

            <div className="nop-summary-card" >
              <div className="nop-summary-head" >
                <div className="nop-summary-av" >
                  {initials(form.name || "?")}
                </div>
                <div>
                  <div className="nop-summary-name" >{form.name || "—"}</div>
                  <div className="nop-summary-domain" >{form.domain || "—"}</div>
                </div>
              </div>
              <div className="nop-summary-rows" >
                {[
                  ["ARR", form.value ? `$${Number(form.value).toLocaleString()}` : "—"],
                  ["Stage", stageLabel],
                  ["Heat", form.heat.charAt(0).toUpperCase() + form.heat.slice(1)],
                  ["Close Date", form.closeDate || "—"],
                  ["Intent", form.intent || "—"],
                  ["Owner", selectedOwner.name],
                  ["Notes", form.notes || "—"],
                ].map(([k, v]) => (
                  <div key={k} className="nop-summary-row" >
                    <span className="nop-summary-key" >{k}</span>
                    <span className="nop-summary-val"  style={{ flex: 1 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="nop-ai-banner" >
              <div className="nop-ai-icon" >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 1.2l1.1 2.2 2.5.37-1.8 1.75.42 2.46L6.5 6.8 4.28 8l.42-2.46L2.9 3.79l2.5-.37L6.5 1.2z" fill="#fff"/>
                </svg>
              </div>
              <div className="nop-ai-text" >
                Everything looks good! This deal will appear in your <strong>{stageLabel}</strong> column with a <strong>{form.heat}</strong> heat signal.
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="nop-footer" >
        {step > 0 && (
          <button className="nop-btn-sec"  onClick={back}>
            ← Back
          </button>
        )}
        <button className="nop-btn-pri"  onClick={next} disabled={!canNext()} style={{ opacity: canNext() ? 1 : 0.45 }}>
          {step < 2 ? (
            <>
              Continue
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7.2l2.8 2.8L11 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Create Deal
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default NewOpportunityPanel;