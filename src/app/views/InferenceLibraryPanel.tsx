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

function FieldRow({
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
      <div
        style={{
          fontSize: "9.5px",
          fontWeight: 700,
          letterSpacing: ".07em",
          textTransform: "uppercase",
          color: "var(--ink5)",
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      {children}
      {hint && (
        <div style={{ fontSize: 10.5, color: "var(--ink5)", marginTop: 3 }}>
          {hint}
        </div>
      )}
    </div>
  );
}

function Divider({ label, editable }: { label: string; editable?: boolean }) {
  return (
    <div
      style={{
        marginTop: 14,
        marginBottom: 2,
        paddingTop: 12,
        borderTop: "0.5px solid var(--brd)",
        fontSize: "9.5px",
        fontWeight: 700,
        letterSpacing: ".08em",
        textTransform: "uppercase",
        color: editable ? "var(--p)" : "var(--ink5)",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      {editable && (
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "var(--p)",
            display: "inline-block",
            flexShrink: 0,
          }}
        />
      )}
      {label}
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
};
const roTaStyle: React.CSSProperties = {
  ...roStyle,
  height: 60,
  resize: "none",
  padding: "6px 10px",
  lineHeight: 1.45,
  fontFamily: "inherit",
};

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
  const editInputStyle: React.CSSProperties = {
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box",
  };
  const editTaStyle: React.CSSProperties = {
    ...editInputStyle,
    height: 60,
    resize: "vertical",
    padding: "6px 10px",
    lineHeight: 1.45,
    fontFamily: "inherit",
  };
  const editTaSmStyle: React.CSSProperties = {
    ...editInputStyle,
    height: 44,
    resize: "vertical",
    padding: "6px 10px",
    lineHeight: 1.45,
    fontFamily: "inherit",
  };

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
          width: 500,
          height: "100%",
          background: "var(--bg2)",
          borderLeft: "0.5px solid var(--brd2)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 32px rgba(0,0,0,.12)",
          pointerEvents: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "14px 18px",
            borderBottom: "0.5px solid var(--brd)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
            background: "var(--bg2)",
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 650,
                color: "var(--ink)",
                fontFamily: '"Sora",sans-serif',
              }}
            >
              {inf._isNew ? "New Inference" : "Edit Inference"}
            </div>
            <div
              style={{
                fontSize: 10.5,
                color: "var(--ink5)",
                fontFamily: '"DM Mono",monospace',
                marginTop: 2,
              }}
            >
              {form.inferenceType || "—"}
            </div>
          </div>
          <button className="btn sm" onClick={onClose}>
            ✕ Close
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "4px 18px 24px",
            scrollbarWidth: "thin",
          }}
        >
          {/* ── READ-ONLY: Identity ── */}
          <FieldRow label="InferenceType" hint="Read-only · API rowKey">
            <input
              className={inputCls}
              style={roStyle}
              value={form.inferenceType}
              readOnly
            />
          </FieldRow>
          <FieldRow label="InferenceName">
            <input
              className={inputCls}
              style={roStyle}
              value={form.inferenceName}
              readOnly
            />
          </FieldRow>
          <FieldRow
            label="InferenceDefinition"
            hint="Read-only · semantic definition used by LLM"
          >
            <textarea
              className={inputCls}
              style={roTaStyle}
              value={form.inferenceDefinition}
              readOnly
            />
          </FieldRow>

          {/* ── READ-ONLY: Phase / Force / SortOrder ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 80px",
              gap: 10,
              marginTop: 10,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "9.5px",
                  fontWeight: 700,
                  letterSpacing: ".07em",
                  textTransform: "uppercase",
                  color: "var(--ink5)",
                  marginBottom: 4,
                }}
              >
                Phase
              </div>
              <input
                className={inputCls}
                style={roStyle}
                value={form.phase}
                readOnly
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: "9.5px",
                  fontWeight: 700,
                  letterSpacing: ".07em",
                  textTransform: "uppercase",
                  color: "var(--ink5)",
                  marginBottom: 4,
                }}
              >
                PrimaryForce
              </div>
              <input
                className={inputCls}
                style={roStyle}
                value={form.primaryForce}
                readOnly
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: "9.5px",
                  fontWeight: 700,
                  letterSpacing: ".07em",
                  textTransform: "uppercase",
                  color: "var(--ink5)",
                  marginBottom: 4,
                }}
              >
                SortOrder
              </div>
              <input
                className={inputCls}
                style={{ ...roStyle, textAlign: "center" }}
                value={form.sortOrder}
                readOnly
              />
            </div>
          </div>

          {/* ── EDITABLE: Scoring ── */}
          <Divider
            label="Scoring · ThresholdScore · Weight · IsGateInference · Enabled"
            editable
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: 10,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "9.5px",
                  fontWeight: 700,
                  letterSpacing: ".07em",
                  textTransform: "uppercase",
                  color: "var(--ink5)",
                  marginBottom: 4,
                }}
              >
                ThresholdScore
              </div>
              <input
                className={inputCls}
                style={{ width: "100%", minWidth: 0, textAlign: "center" }}
                type="number"
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
              <div
                style={{
                  fontSize: "9.5px",
                  fontWeight: 700,
                  letterSpacing: ".07em",
                  textTransform: "uppercase",
                  color: "var(--ink5)",
                  marginBottom: 4,
                }}
              >
                Weight
              </div>
              <input
                className={inputCls}
                style={{ width: "100%", minWidth: 0, textAlign: "center" }}
                type="number"
                step="0.1"
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
              <div
                style={{
                  fontSize: "9.5px",
                  fontWeight: 700,
                  letterSpacing: ".07em",
                  textTransform: "uppercase",
                  color: "var(--ink5)",
                  marginBottom: 4,
                }}
              >
                IsGateInference
              </div>
              <select
                className="sv-select"
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
              <div
                style={{
                  fontSize: "9.5px",
                  fontWeight: 700,
                  letterSpacing: ".07em",
                  textTransform: "uppercase",
                  color: "var(--ink5)",
                  marginBottom: 4,
                }}
              >
                Enabled
              </div>
              <select
                className="sv-select"
                style={{ width: "100%", minWidth: 0 }}
                value={form.enabled ? "yes" : "no"}
                onChange={(e) => set("enabled", e.target.value === "yes")}
              >
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>
            </div>
          </div>

          {/* ── READ-ONLY: Evidence guidance ── */}
          <Divider label="Evidence guidance · used by LLM" />
          <FieldRow label="PositiveEvidenceGuidance" hint="Read-only">
            <textarea
              className={inputCls}
              style={roTaStyle}
              value={form.positiveEvidenceGuidance}
              readOnly
            />
          </FieldRow>
          <FieldRow label="NegativeEvidenceGuidance" hint="Read-only">
            <textarea
              className={inputCls}
              style={roTaStyle}
              value={form.negativeEvidenceGuidance}
              readOnly
            />
          </FieldRow>

          {/* ── EDITABLE: Question variants ── */}
          <Divider
            label="Question variants · selected at runtime via QuestionStrategy"
            editable
          />
          <FieldRow label="DefaultQuestion">
            <textarea
              className={inputCls}
              style={editTaSmStyle}
              value={form.defaultQuestion}
              onChange={(e) => set("defaultQuestion", e.target.value)}
            />
          </FieldRow>
          <FieldRow label="SoftQuestion">
            <textarea
              className={inputCls}
              style={editTaSmStyle}
              value={form.softQuestion}
              onChange={(e) => set("softQuestion", e.target.value)}
            />
          </FieldRow>
          <FieldRow label="DirectQuestion">
            <textarea
              className={inputCls}
              style={editTaSmStyle}
              value={form.directQuestion}
              onChange={(e) => set("directQuestion", e.target.value)}
            />
          </FieldRow>
          <FieldRow label="ExecutiveQuestion">
            <textarea
              className={inputCls}
              style={editTaSmStyle}
              value={form.executiveQuestion}
              onChange={(e) => set("executiveQuestion", e.target.value)}
            />
          </FieldRow>
          <FieldRow label="ProcurementQuestion">
            <textarea
              className={inputCls}
              style={editTaSmStyle}
              value={form.procurementQuestion}
              onChange={(e) => set("procurementQuestion", e.target.value)}
            />
          </FieldRow>
          <FieldRow label="RenewalQuestion">
            <textarea
              className={inputCls}
              style={editTaSmStyle}
              value={form.renewalQuestion}
              onChange={(e) => set("renewalQuestion", e.target.value)}
            />
          </FieldRow>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "10px 18px",
            borderTop: "0.5px solid var(--brd)",
            display: "flex",
            gap: 8,
            justifyContent: "flex-end",
            background: "var(--bg2)",
            flexShrink: 0,
          }}
        >
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
