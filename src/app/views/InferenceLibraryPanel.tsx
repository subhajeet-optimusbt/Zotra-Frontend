import React, { useState, useEffect, useCallback, type ReactNode } from "react";
import { baseUrl, apiFetch } from "../utils/utils";

// ── Types ─────────────────────────────────────────────────────────────────────
interface InferenceDef {
  partitionKey?: string;
  rowKey?: string;
  timestamp?: string;
  eTag?: string;
  inferenceType: string;
  inferenceName: string;
  inferenceDefinition: string;
  primaryForce: string;
  thresholdScore: number;
  weight: number;
  positiveEvidenceGuidance: string;
  negativeEvidenceGuidance: string;
  isGateInference: boolean;
  phase: string;
  defaultQuestion: string;
  softQuestion: string;
  directQuestion: string;
  executiveQuestion: string;
  procurementQuestion: string;
  renewalQuestion: string;
  sortOrder: number;
  enabled: boolean;
  _isNew?: boolean;
}

interface ToastState {
  msg: string;
  type: "ok" | "err";
}

const STYLES_EXTRA = `
.il-toast{position:fixed;bottom:24px;right:24px;padding:10px 16px;border-radius:10px;font-size:12.5px;font-weight:500;color:#fff;z-index:9999;display:flex;align-items:center;gap:8px;box-shadow:0 4px 20px rgba(0,0,0,.18);animation:toastIn .2s ease}
.il-toast-ok{background:#1B6B4A}
.il-toast-err{background:#B91C1C}
@keyframes toastIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

/* Edit drawer section badges */
.il-section-ro {
  display: flex; align-items: center; gap: 6px;
  margin: 16px 0 10px;
  padding: 7px 12px;
  border-radius: 7px;
  background: var(--bg3);
  border: 0.5px solid var(--brd);
  font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
  color: var(--ink5);
}
.il-section-ro .il-section-badge {
  font-size: 9px; padding: 2px 6px; border-radius: 4px;
  background: var(--bg3); border: 0.5px solid var(--brd2);
  color: var(--ink5); font-weight: 600; letter-spacing: .05em;
  margin-left: auto;
}
.il-section-edit {
  display: flex; align-items: center; gap: 6px;
  margin: 16px 0 10px;
  padding: 7px 12px;
  border-radius: 7px;
  background: var(--pp,#f0edff);
  border: 0.5px solid var(--p);
  font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
  color: var(--p);
}
.il-section-edit .il-edit-dot {
  width: 6px; height: 6px; border-radius: 50%; background: var(--p); flex-shrink: 0;
}
.il-section-edit .il-section-badge-edit {
  font-size: 9px; padding: 2px 7px; border-radius: 4px;
  background: var(--p); color: #fff; font-weight: 700; letter-spacing: .04em;
  margin-left: auto;
}

/* Field label styles */
.il-field-lbl-ro {
  font-size: 9.5px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
  color: var(--ink5); margin-bottom: 4px;
}
.il-field-lbl-edit {
  font-size: 9.5px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
  color: var(--p); margin-bottom: 4px; display: flex; align-items: center; gap: 4px;
}
.il-field-lbl-edit::before {
  content: ''; display: inline-block; width: 3px; height: 3px;
  border-radius: 50%; background: var(--p); flex-shrink: 0;
}

/* Editable input highlight */
.il-edit-input {
  width: 100%; min-width: 0; box-sizing: border-box;
  border: 1px solid var(--p) !important;
  background: var(--bg) !important;
}
.il-edit-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--pp, rgba(91,79,212,.15));
}
.il-edit-ta {
  width: 100%; min-width: 0; box-sizing: border-box;
  height: 52px; resize: vertical; padding: 7px 10px;
  line-height: 1.45; font-family: inherit;
  border: 1px solid var(--p) !important;
  background: var(--bg) !important;
}
.il-edit-ta:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--pp, rgba(91,79,212,.15));
}
`;

function ILToast({ msg, type }: ToastState) {
  return (
    <div className={`il-toast il-toast-${type}`}>
      {type === "ok" ? "✓" : "✕"} {msg}
    </div>
  );
}

const FORCE_STYLE: Record<string, { bg: string; color: string }> = {
  Artha: { bg: "#FAEEDA", color: "#854F0B" },
  Laya: { bg: "#DBEAFE", color: "#1D4ED8" },
  Kriya: { bg: "#DCFCE7", color: "#166534" },
  Gati: { bg: "#EEEEF9", color: "#4B48C8" },
  Rasa: { bg: "#FEE2E2", color: "#991B1B" },
};

const PHASE_META: Record<string, { label: string; bg: string; color: string }> =
  {
    qualification: { label: "Qual", bg: "#EEEEF9", color: "#4B48C8" },
    shaping: { label: "Shape", bg: "#FAEEDA", color: "#854F0B" },
    shape: { label: "Shape", bg: "#FAEEDA", color: "#854F0B" },
    development: { label: "Dev", bg: "#DCFCE7", color: "#166534" },
    closing: { label: "Close", bg: "#FEE2E2", color: "#991B1B" },
    close: { label: "Close", bg: "#FEE2E2", color: "#991B1B" },
  };

const PHASE_ORDER = [
  "qualification",
  "shaping",
  "shape",
  "development",
  "closing",
  "close",
];

function canonicalPhase(p: string): string {
  if (p === "shape") return "shaping";
  if (p === "close") return "closing";
  return p;
}

// ── Editable field row ────────────────────────────────────────────────────────
function EditFieldRow({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div style={{ marginTop: 10 }}>
      <div className="il-field-lbl-edit">{label}</div>
      {children}
      {hint && (
        <div style={{ fontSize: 10.5, color: "var(--ink5)", marginTop: 3 }}>
          {hint}
        </div>
      )}
    </div>
  );
}

// ── Read-only field row ───────────────────────────────────────────────────────
function ROFieldRow({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div style={{ marginTop: 10 }}>
      <div className="il-field-lbl-ro">{label}</div>
      {children}
      {hint && (
        <div style={{ fontSize: 10.5, color: "var(--ink5)", marginTop: 3 }}>
          {hint}
        </div>
      )}
    </div>
  );
}

// ── Read-only field style ─────────────────────────────────────────────────────
const roStyle: React.CSSProperties = {
  width: "100%",
  minWidth: 0,
  boxSizing: "border-box",
  background: "var(--bg3)",
  color: "var(--ink4)",
  cursor: "default",
  border: "0.5px solid var(--brd)",
};
const roTaStyle: React.CSSProperties = {
  ...roStyle,
  height: 60,
  resize: "none",
  padding: "6px 10px",
  lineHeight: 1.45,
  fontFamily: "inherit",
};

// ── Section Header ─────────────────────────────────────────────────────────────
function ROSection({ label }: { label: string }) {
  return (
    <div className="il-section-ro">
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
      {label}
      <span className="il-section-badge">Read-only</span>
    </div>
  );
}

function EditSection({ label }: { label: string }) {
  return (
    <div className="il-section-edit">
      <span className="il-edit-dot" />
      {label}
    </div>
  );
}

// ── Edit Drawer ───────────────────────────────────────────────────────────────
function EditDrawer({
  inf,
  saving,
  onSave,
  onClose,
}: {
  inf: InferenceDef;
  saving: boolean;
  onSave: (updated: InferenceDef) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<InferenceDef>({ ...inf });
  const set = <K extends keyof InferenceDef>(k: K, v: InferenceDef[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const inputCls = "sv-input";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(15,15,25,.42)",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: 520,
          height: "100%",
          background: "var(--bg)",
          borderLeft: "0.5px solid var(--brd2)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-12px 0 40px rgba(0,0,0,.18)",
          pointerEvents: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "14px 18px 12px",
            borderBottom: "0.5px solid var(--brd)",
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            flexShrink: 0,
            background: "var(--bg2)",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 9,
              background: "var(--pp,#f0edff)",
              color: "var(--p)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginTop: 1,
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 13.5,
                fontWeight: 650,
                color: "var(--ink)",
                fontFamily: '"Sora",sans-serif',
                lineHeight: 1.3,
              }}
            >
              {inf._isNew ? "New Inference" : "Edit Inference"}
            </div>
            <div
              style={{
                fontSize: 10.5,
                color: "var(--p)",
                fontFamily: '"DM Mono",monospace',
                marginTop: 3,
                background: "var(--pp,#f0edff)",
                display: "inline-block",
                padding: "1px 8px",
                borderRadius: 5,
              }}
            >
              {form.inferenceType || "—"}
            </div>
          </div>

          {/* Edit/RO count pills */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 4,
            }}
          >
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span
                style={{
                  fontSize: 9.5,
                  padding: "2px 7px",
                  borderRadius: 5,
                  fontWeight: 600,
                  background: "var(--pp,#f0edff)",
                  color: "var(--p)",
                  border: "0.5px solid var(--p)",
                }}
              >
                {inf._isNew ? "All fields editable" : "4 editable fields"}
              </span>
              <button className="btn sm" onClick={onClose}>
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "4px 18px 32px",
            scrollbarWidth: "thin",
          }}
        >
          {/* ── IDENTITY: read-only when editing, fully editable when new ── */}
          {inf._isNew ? (
            <EditSection label="Identity · define the new inference" />
          ) : (
            <ROSection label="Identity · semantic key fields used by the LLM" />
          )}

          {inf._isNew ? (
            <>
              <div style={{ marginTop: 10 }}>
                <div className="il-field-lbl-edit">InferenceName</div>
                <input
                  className={`${inputCls} il-edit-input`}
                  value={form.inferenceName}
                  placeholder="e.g. Budget Confirmed"
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "_")
                      .replace(/^_|_$/g, "");
                    setForm((p) => ({
                      ...p,
                      inferenceName: name,
                      inferenceType: slug,
                    }));
                  }}
                />
              </div>
              <div style={{ marginTop: 10 }}>
                <div className="il-field-lbl-ro">
                  InferenceType{" "}
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 500,
                      color: "var(--ink5)",
                      marginLeft: 4,
                    }}
                  >
                    · auto-generated from name · API rowKey
                  </span>
                </div>
                <input
                  className={inputCls}
                  style={{
                    ...roStyle,
                    fontFamily: '"DM Mono",monospace',
                    fontSize: 11,
                    color: "var(--p)",
                    background: "var(--pp,#f0edff)",
                  }}
                  value={form.inferenceType}
                  readOnly
                  tabIndex={-1}
                />
              </div>
              <div style={{ marginTop: 10 }}>
                <div className="il-field-lbl-edit">
                  InferenceDefinition{" "}
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 500,
                      color: "var(--ink5)",
                      marginLeft: 4,
                    }}
                  >
                    · sent to the LLM
                  </span>
                </div>
                <textarea
                  className="il-edit-ta"
                  style={{ height: 68 }}
                  value={form.inferenceDefinition}
                  placeholder="Describe what this inference detects…"
                  onChange={(e) => set("inferenceDefinition", e.target.value)}
                />
              </div>
              {/* Phase / Force / SortOrder — editable for new */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 80px",
                  gap: 10,
                  marginTop: 10,
                }}
              >
                <div>
                  <div className="il-field-lbl-edit">Phase</div>
                  <select
                    className="sv-select il-edit-input"
                    style={{ width: "100%", minWidth: 0 }}
                    value={form.phase}
                    onChange={(e) => set("phase", e.target.value)}
                  >
                    <option value="qualification">qualification</option>
                    <option value="shaping">shaping</option>
                    <option value="development">development</option>
                    <option value="closing">closing</option>
                  </select>
                </div>
                <div>
                  <div className="il-field-lbl-edit">PrimaryForce</div>
                  <select
                    className="sv-select il-edit-input"
                    style={{ width: "100%", minWidth: 0 }}
                    value={form.primaryForce}
                    onChange={(e) => set("primaryForce", e.target.value)}
                  >
                    {["Artha", "Laya", "Kriya", "Gati", "Rasa"].map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="il-field-lbl-edit">SortOrder</div>
                  <input
                    className={`${inputCls} il-edit-input`}
                    type="number"
                    style={{ textAlign: "center" }}
                    value={form.sortOrder}
                    onChange={(e) => set("sortOrder", Number(e.target.value))}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <ROFieldRow
                label="InferenceType"
                hint="API rowKey — cannot be changed"
              >
                <input
                  className={inputCls}
                  style={roStyle}
                  value={form.inferenceType}
                  readOnly
                />
              </ROFieldRow>
              <ROFieldRow label="InferenceName">
                <input
                  className={inputCls}
                  style={roStyle}
                  value={form.inferenceName}
                  readOnly
                />
              </ROFieldRow>
              <ROFieldRow
                label="InferenceDefinition"
                hint="Semantic definition sent to the LLM"
              >
                <textarea
                  className={inputCls}
                  style={roTaStyle}
                  value={form.inferenceDefinition}
                  readOnly
                />
              </ROFieldRow>
              {/* Phase / Force / SortOrder row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 80px",
                  gap: 10,
                  marginTop: 10,
                }}
              >
                {[
                  { lbl: "Phase", val: form.phase },
                  { lbl: "PrimaryForce", val: form.primaryForce },
                  { lbl: "SortOrder", val: String(form.sortOrder) },
                ].map(({ lbl, val }) => (
                  <div key={lbl}>
                    <div className="il-field-lbl-ro">{lbl}</div>
                    <input
                      className={inputCls}
                      style={{
                        ...roStyle,
                        textAlign: lbl === "SortOrder" ? "center" : "left",
                      }}
                      value={val}
                      readOnly
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── EDITABLE: Scoring ── */}
          <EditSection label="Scoring · adjust thresholds, weights and flags" />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: 10,
            }}
          >
            <div>
              <div className="il-field-lbl-edit">ThresholdScore</div>
              <input
                className={`${inputCls} il-edit-input`}
                type="number"
                style={{ textAlign: "center" }}
                value={form.thresholdScore}
                onChange={(e) => set("thresholdScore", Number(e.target.value))}
              />
              <div
                style={{ fontSize: 10.5, color: "var(--ink5)", marginTop: 3 }}
              >
                0–10
              </div>
            </div>
            <div>
              <div className="il-field-lbl-edit">Weight</div>
              <input
                className={`${inputCls} il-edit-input`}
                type="number"
                step="0.1"
                style={{ textAlign: "center" }}
                value={form.weight}
                onChange={(e) => set("weight", Number(e.target.value))}
              />
              <div
                style={{ fontSize: 10.5, color: "var(--ink5)", marginTop: 3 }}
              >
                multiplier
              </div>
            </div>
            <div>
              <div className="il-field-lbl-edit">IsGateInference</div>
              <select
                className="sv-select il-edit-input"
                style={{ width: "100%", minWidth: 0 }}
                value={form.isGateInference ? "yes" : "no"}
                onChange={(e) =>
                  set("isGateInference", e.target.value === "yes")
                }
              >
                <option value="no">no</option>
                <option value="yes">yes</option>
              </select>
            </div>
            <div>
              <div className="il-field-lbl-edit">Enabled</div>
              <select
                className="sv-select il-edit-input"
                style={{
                  width: "100%",
                  minWidth: 0,
                  fontWeight: 700,
                  color: form.enabled
                    ? "var(--ok, #166534)"
                    : "var(--wa, #B91C1C)",
                }}
                value={form.enabled ? "yes" : "no"}
                onChange={(e) => set("enabled", e.target.value === "yes")}
              >
                <option value="yes">✓ enabled</option>
                <option value="no">✕ disabled</option>
              </select>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 10,
                  padding: "2px 7px",
                  borderRadius: 5,
                  textAlign: "center",
                  fontWeight: 600,
                  background: form.enabled ? "#DCFCE7" : "#FEE2E2",
                  color: form.enabled ? "#166534" : "#991B1B",
                }}
              >
                Currently {form.enabled ? "active" : "inactive"}
              </div>
            </div>
          </div>

          {/* ── EVIDENCE GUIDANCE: editable for new, read-only for edit ── */}
          {inf._isNew ? (
            <EditSection label="Evidence guidance · used by the LLM at scoring time" />
          ) : (
            <ROSection label="Evidence guidance · used by the LLM at scoring time" />
          )}

          {inf._isNew ? (
            <>
              <div style={{ marginTop: 10 }}>
                <div className="il-field-lbl-edit">
                  PositiveEvidenceGuidance
                </div>
                <textarea
                  className="il-edit-ta"
                  style={{ height: 60 }}
                  value={form.positiveEvidenceGuidance}
                  placeholder="Signals that confirm this inference is true…"
                  onChange={(e) =>
                    set("positiveEvidenceGuidance", e.target.value)
                  }
                />
              </div>
              <div style={{ marginTop: 10 }}>
                <div className="il-field-lbl-edit">
                  NegativeEvidenceGuidance
                </div>
                <textarea
                  className="il-edit-ta"
                  style={{ height: 60 }}
                  value={form.negativeEvidenceGuidance}
                  placeholder="Signals that contradict or weaken this inference…"
                  onChange={(e) =>
                    set("negativeEvidenceGuidance", e.target.value)
                  }
                />
              </div>
            </>
          ) : (
            <>
              <ROFieldRow label="PositiveEvidenceGuidance">
                <textarea
                  className={inputCls}
                  style={roTaStyle}
                  value={form.positiveEvidenceGuidance}
                  readOnly
                />
              </ROFieldRow>
              <ROFieldRow label="NegativeEvidenceGuidance">
                <textarea
                  className={inputCls}
                  style={roTaStyle}
                  value={form.negativeEvidenceGuidance}
                  readOnly
                />
              </ROFieldRow>
            </>
          )}

          {/* ── EDITABLE: Question variants ── */}
          <EditSection label="Question variants · selected at runtime via QuestionStrategy" />

          {(
            [
              { key: "defaultQuestion", label: "DefaultQuestion" },
              { key: "softQuestion", label: "SoftQuestion" },
              { key: "directQuestion", label: "DirectQuestion" },
              { key: "executiveQuestion", label: "ExecutiveQuestion" },
              { key: "procurementQuestion", label: "ProcurementQuestion" },
              { key: "renewalQuestion", label: "RenewalQuestion" },
            ] as { key: keyof InferenceDef; label: string }[]
          ).map(({ key, label }) => (
            <div key={key} style={{ marginTop: 10 }}>
              <div className="il-field-lbl-edit">{label}</div>
              <textarea
                className="il-edit-ta"
                value={form[key] as string}
                onChange={(e) => set(key, e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "12px 18px",
            borderTop: "0.5px solid var(--brd)",
            display: "flex",
            gap: 8,
            justifyContent: "space-between",
            alignItems: "center",
            background: "var(--bg2)",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 10.5, color: "var(--ink5)" }}>
            {inf._isNew
              ? "Fill in all fields to create this inference"
              : "Scoring + Question variants are editable"}
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button
              className="btn pri"
              onClick={() => onSave(form)}
              disabled={saving}
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Inference row ─────────────────────────────────────────────────────────────
function InfRow({
  inf,
  onEdit,
  onToggleEnabled,
  toggling,
}: {
  inf: InferenceDef;
  onEdit: (inf: InferenceDef) => void;
  onToggleEnabled: (inf: InferenceDef) => void;
  toggling: boolean;
}) {
  const pm = PHASE_META[inf.phase] ?? PHASE_META.qualification;
  const fs = FORCE_STYLE[inf.primaryForce] ?? FORCE_STYLE.Artha;
  const disabled = !inf.enabled;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 80px 72px 52px 52px 52px 96px",
        gap: 8,
        alignItems: "center",
        padding: "10px 18px",
        borderBottom: "0.5px solid var(--brd)",
        background: "transparent",
        transition: "background .12s",
        opacity: disabled ? 0.5 : 1,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg2)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 0,
        }}
      >
        <div
          style={{
            fontFamily: '"DM Mono",monospace',
            fontSize: 10.5,
            color: "var(--p)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textDecoration: disabled ? "line-through" : "none",
          }}
        >
          {inf.inferenceType}
        </div>
        <div
          style={{
            fontSize: 12,
            color: disabled ? "var(--ink5)" : "var(--ink)",
            lineHeight: 1.35,
            textDecoration: disabled ? "line-through" : "none",
          }}
        >
          {inf.inferenceName}
        </div>
      </div>
      <div>
        <span
          style={{
            fontSize: 10,
            padding: "2px 7px",
            borderRadius: 10,
            fontWeight: 500,
            whiteSpace: "nowrap",
            background: fs.bg,
            color: fs.color,
          }}
        >
          {inf.primaryForce}
        </span>
      </div>
      <div>
        <span
          style={{
            fontSize: "9.5px",
            padding: "2px 6px",
            borderRadius: 4,
            fontWeight: 600,
            background: pm.bg,
            color: pm.color,
          }}
        >
          {pm.label}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span
          style={{
            fontSize: 10,
            width: 18,
            height: 18,
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            background: inf.isGateInference ? "#FAEEDA" : "transparent",
            color: inf.isGateInference ? "#854F0B" : "var(--ink5)",
          }}
        >
          {inf.isGateInference ? "G" : "—"}
        </span>
      </div>
      <div
        style={{
          fontFamily: '"DM Mono",monospace',
          fontSize: 11,
          color: "var(--ink3)",
          textAlign: "center",
        }}
      >
        {inf.thresholdScore ?? "—"}
      </div>
      <div
        style={{
          fontFamily: '"DM Mono",monospace',
          fontSize: 11,
          color: "var(--ink3)",
          textAlign: "center",
        }}
      >
        {inf.weight}×
      </div>
      <div style={{ display: "flex", gap: 4, justifyContent: "flex-end" }}>
        <button
          style={{
            height: 26,
            padding: "0 9px",
            borderRadius: 6,
            border: "0.5px solid var(--brd2)",
            background: "transparent",
            fontSize: 11,
            color: "var(--ink4)",
            cursor: "pointer",
            fontFamily: '"DM Sans",sans-serif',
            transition: "background .12s,color .12s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "var(--pu)";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--p)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--ink4)";
          }}
          onClick={() => onEdit(inf)}
        >
          Edit
        </button>
        <button
          style={{
            height: 26,
            padding: "0 9px",
            borderRadius: 6,
            border: "0.5px solid var(--brd2)",
            background: "transparent",
            fontSize: 11,
            color: disabled ? "var(--ok)" : "var(--ink4)",
            cursor: toggling ? "not-allowed" : "pointer",
            fontFamily: '"DM Sans",sans-serif',
            transition: "background .12s,color .12s",
            opacity: toggling ? 0.5 : 1,
          }}
          onMouseEnter={(e) => {
            if (!toggling)
              (e.currentTarget as HTMLButtonElement).style.background =
                "var(--pu)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
          }}
          disabled={toggling}
          onClick={() => onToggleEnabled(inf)}
        >
          {toggling ? "…" : disabled ? "Enable" : "Disable"}
        </button>
      </div>
    </div>
  );
}

function PhaseHeader({ phase }: { phase: string }) {
  const pm = PHASE_META[phase] ?? PHASE_META.qualification;
  return (
    <div
      style={{
        padding: "6px 18px",
        fontSize: "9.5px",
        fontWeight: 700,
        letterSpacing: ".09em",
        textTransform: "uppercase",
        color: pm.color,
        background: `${pm.bg}88`,
        borderBottom: "0.5px solid var(--brd)",
        borderTop: "0.5px solid var(--brd)",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: 2,
          background: pm.color,
          display: "inline-block",
        }}
      />
      {phase}
    </div>
  );
}

function SkeletonRows() {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 80px 72px 52px 52px 52px 96px",
            gap: 8,
            padding: "12px 18px",
            borderBottom: "0.5px solid var(--brd)",
            alignItems: "center",
          }}
        >
          <div>
            <div
              className="skel"
              style={{ height: 10, width: 140, marginBottom: 5 }}
            />
            <div className="skel" style={{ height: 12, width: 180 }} />
          </div>
          <div
            className="skel"
            style={{ height: 20, width: 52, borderRadius: 10 }}
          />
          <div
            className="skel"
            style={{ height: 18, width: 44, borderRadius: 4 }}
          />
          <div
            className="skel"
            style={{ height: 18, width: 18, borderRadius: 4 }}
          />
          <div
            className="skel"
            style={{ height: 14, width: 20, margin: "0 auto" }}
          />
          <div
            className="skel"
            style={{ height: 14, width: 24, margin: "0 auto" }}
          />
          <div style={{ display: "flex", gap: 4, justifyContent: "flex-end" }}>
            <div
              className="skel"
              style={{ height: 26, width: 40, borderRadius: 6 }}
            />
            <div
              className="skel"
              style={{ height: 26, width: 52, borderRadius: 6 }}
            />
          </div>
        </div>
      ))}
    </>
  );
}

function blankInference(): InferenceDef {
  return {
    inferenceType: "new_inference",
    inferenceName: "New Inference",
    inferenceDefinition: "",
    primaryForce: "Artha",
    thresholdScore: 5,
    weight: 1.0,
    positiveEvidenceGuidance: "",
    negativeEvidenceGuidance: "",
    isGateInference: false,
    phase: "qualification",
    defaultQuestion: "",
    softQuestion: "",
    directQuestion: "",
    executiveQuestion: "",
    procurementQuestion: "",
    renewalQuestion: "",
    sortOrder: 99,
    enabled: true,
    _isNew: true,
  };
}

function authHeaders(): Record<string, string> {
  const token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("zotra_token")
      : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export default function PanelInferenceLibrary() {
  const [inferences, setInferences] = useState<InferenceDef[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [phaseFilter, setPhaseFilter] = useState<string>("all");
  const [editTarget, setEditTarget] = useState<InferenceDef | null>(null);
  const [drawerSaving, setDrawerSaving] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  function showToast(msg: string, type: "ok" | "err" = "ok") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  }

  useEffect(() => {
    setLoading(true);
    apiFetch(`${baseUrl()}/inference-library/seed`, {
      method: "POST",
      headers: authHeaders(),
    })
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json() as Promise<{ inferences: InferenceDef[] }>;
      })
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : ((data as any).inferences ?? []);
        list.sort(
          (a: InferenceDef, b: InferenceDef) =>
            (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
        );
        setInferences(list);
        setApiError(null);
      })
      .catch((err: Error) => {
        setApiError(err.message);
        setInferences([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = useCallback(
    async (updated: InferenceDef) => {
      setDrawerSaving(true);
      const { phase, inferenceType } = updated;
      const { _isNew, partitionKey, rowKey, timestamp, eTag, ...payload } =
        updated;

      try {
        const originalPhase = editTarget?.phase ?? phase;
        const originalId = editTarget?.inferenceType ?? inferenceType;
        const res = await apiFetch(
          `${baseUrl()}/inference-library/${encodeURIComponent(originalPhase)}/${encodeURIComponent(originalId)}`,
          {
            method: "PATCH",
            headers: authHeaders(),
            body: JSON.stringify(payload),
          },
        );
        if (!res.ok) throw new Error(`${res.status}`);
        const saved = (await res.json()) as InferenceDef;

        setInferences((prev) => {
          if (_isNew)
            return [...prev, saved].sort(
              (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
            );
          return prev.map((i) =>
            i.inferenceType === (editTarget?.inferenceType ?? inferenceType) &&
            i.phase === (editTarget?.phase ?? phase)
              ? saved
              : i,
          );
        });

        showToast(_isNew ? "Inference created" : "Inference saved");
        setEditTarget(null);
      } catch (err) {
        showToast(`Save failed: ${(err as Error).message}`, "err");
      } finally {
        setDrawerSaving(false);
      }
    },
    [editTarget],
  );

  const handleToggleEnabled = useCallback(async (inf: InferenceDef) => {
    const key = `${inf.phase}::${inf.inferenceType}`;
    setTogglingId(key);
    const { _isNew, partitionKey, rowKey, timestamp, eTag, ...payload } = inf;

    try {
      const res = await apiFetch(
        `${baseUrl()}/inference-library/${encodeURIComponent(inf.phase)}/${encodeURIComponent(inf.inferenceType)}`,
        {
          method: "PATCH",
          headers: authHeaders(),
          body: JSON.stringify({ ...payload, enabled: !inf.enabled }),
        },
      );
      if (!res.ok) throw new Error(`${res.status}`);
      const saved = (await res.json()) as InferenceDef;
      setInferences((prev) =>
        prev.map((i) =>
          i.inferenceType === inf.inferenceType && i.phase === inf.phase
            ? saved
            : i,
        ),
      );
      showToast(
        !inf.enabled
          ? `${inf.inferenceName} enabled`
          : `${inf.inferenceName} disabled`,
      );
    } catch (err) {
      showToast(`Toggle failed: ${(err as Error).message}`, "err");
    } finally {
      setTogglingId(null);
    }
  }, []);

  const uniquePhases = Array.from(
    new Set(inferences.map((i) => canonicalPhase(i.phase))),
  );
  const orderedPhases = PHASE_ORDER.map((p) => canonicalPhase(p)).filter(
    (p, idx, arr) => arr.indexOf(p) === idx && uniquePhases.includes(p),
  );

  const filtered =
    phaseFilter === "all"
      ? inferences
      : inferences.filter((i) => canonicalPhase(i.phase) === phaseFilter);

  const grouped = orderedPhases
    .map((p) => ({
      phase: p,
      items: filtered.filter((i) => canonicalPhase(i.phase) === p),
    }))
    .filter((g) => g.items.length > 0);

  const activeCount = inferences.filter((i) => i.enabled).length;
  const gateCount = inferences.filter(
    (i) => i.isGateInference && i.enabled,
  ).length;

  function phaseCount(p: string) {
    return p === "all"
      ? inferences.length
      : inferences.filter((i) => canonicalPhase(i.phase) === p).length;
  }

  return (
    <>
      <style>{STYLES_EXTRA}</style>
      {toast && <ILToast msg={toast.msg} type={toast.type} />}

      {editTarget && (
        <EditDrawer
          inf={editTarget}
          saving={drawerSaving}
          onSave={handleSave}
          onClose={() => setEditTarget(null)}
        />
      )}

      {apiError && (
        <div
          style={{
            padding: "8px 14px",
            fontSize: 11.5,
            color: "var(--wa)",
            background: "var(--wab)",
            borderRadius: 8,
            marginBottom: 10,
            display: "flex",
            gap: 8,
          }}
        >
          ⚠ Could not reach API ({apiError}). Inference library unavailable.
        </div>
      )}

      <div className="sv-card">
        <div className="sv-card-hdr">
          <div
            className="sv-card-icon"
            style={{ background: "var(--pp)", color: "var(--p)" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="sv-card-title">Inference Library</div>
            <span className="sv-card-api">
              POST /api/inference-library/seed · PATCH
              /api/inference-library/&#123;phase&#125;/&#123;id&#125;
            </span>
          </div>

          {/* ── Restored: + New Inference button ── */}
          <div
            style={{
              marginLeft: "auto",
              flexShrink: 0,
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            {!loading && (
              <span
                style={{
                  fontSize: 11,
                  color: "var(--ink5)",
                  fontFamily: '"DM Mono",monospace',
                }}
              >
                {inferences.length} inferences
              </span>
            )}
            <button
              className="btn pri"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                height: 28,
                padding: "0 11px",
                fontSize: 11.5,
                fontWeight: 600,
              }}
              disabled={loading}
              onClick={() => setEditTarget(blankInference())}
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Inference
            </button>
          </div>
        </div>

        {/* Phase filter tabs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            padding: "0 14px",
            borderBottom: "0.5px solid var(--brd)",
            background: "var(--bg2)",
            flexWrap: "wrap",
          }}
        >
          {["all", ...orderedPhases].map((p) => {
            const pm = p !== "all" ? PHASE_META[p] : null;
            const isActive = phaseFilter === p;
            return (
              <button
                key={p}
                onClick={() => setPhaseFilter(p)}
                style={{
                  padding: "9px 12px",
                  borderRadius: 0,
                  border: "none",
                  background: "none",
                  fontSize: 11.5,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive
                    ? pm
                      ? pm.color
                      : "var(--p)"
                    : "var(--ink4)",
                  cursor: "pointer",
                  borderBottom: isActive
                    ? `2px solid ${pm ? pm.color : "var(--p)"}`
                    : "2px solid transparent",
                  transition: "color .15s",
                  fontFamily: '"DM Sans",sans-serif',
                }}
              >
                {p === "all"
                  ? "All phases"
                  : p.charAt(0).toUpperCase() + p.slice(1)}
                <span
                  style={{
                    fontSize: 10,
                    padding: "1px 5px",
                    borderRadius: 8,
                    background: "var(--bg3)",
                    color: "var(--ink5)",
                    marginLeft: 5,
                    fontWeight: 500,
                  }}
                >
                  {phaseCount(p)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Column headers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 80px 72px 52px 52px 52px 96px",
            gap: 8,
            padding: "7px 18px",
            background: "var(--bg3)",
            borderBottom: "0.5px solid var(--brd)",
          }}
        >
          {[
            "InferenceType · InferenceName",
            "PrimaryForce",
            "Phase",
            "Gate",
            "Score",
            "Weight",
            "",
          ].map((h, i) => (
            <div
              key={i}
              style={{
                fontSize: "9.5px",
                fontWeight: 600,
                letterSpacing: ".07em",
                textTransform: "uppercase",
                color: "var(--ink5)",
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {loading && <SkeletonRows />}

        {!loading &&
          grouped.map(({ phase, items }) => (
            <React.Fragment key={phase}>
              {phaseFilter === "all" && <PhaseHeader phase={phase} />}
              {items.map((inf) => (
                <InfRow
                  key={`${inf.phase}::${inf.inferenceType}`}
                  inf={inf}
                  onEdit={setEditTarget}
                  onToggleEnabled={handleToggleEnabled}
                  toggling={togglingId === `${inf.phase}::${inf.inferenceType}`}
                />
              ))}
            </React.Fragment>
          ))}

        {!loading && filtered.length === 0 && (
          <div
            style={{
              padding: "32px 18px",
              textAlign: "center",
              color: "var(--ink5)",
              fontSize: 12.5,
            }}
          >
            {apiError
              ? "Could not load inferences."
              : "No inferences in this phase."}
          </div>
        )}

        <div
          style={{
            padding: "10px 18px",
            borderTop: "0.5px solid var(--brd)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 11.5, color: "var(--ink5)", flex: 1 }}>
            {loading
              ? "Loading…"
              : `${activeCount} active · ${gateCount} gates`}
          </span>
          <button
            className="btn"
            disabled={loading || inferences.length === 0}
            onClick={() => {
              const blob = new Blob([JSON.stringify(inferences, null, 2)], {
                type: "application/json",
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "inference-library.json";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Export JSON
          </button>
        </div>
      </div>
    </>
  );
}
