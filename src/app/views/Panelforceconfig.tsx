import React, { useState, useCallback, useRef, useEffect } from "react";
import { baseUrl, apiFetch } from "../utils/utils";

// ─── Exported styles ──────────────────────────────────────────────────────────
export const FORCE_STYLES = `
/* ── Force grid row ── */
.fc-row{
  display:grid;
  grid-template-columns:100px 1fr 80px 72px 110px;
  gap:10px;align-items:center;
  padding:12px 18px;
  border-bottom:0.5px solid var(--brd);
  transition:background .12s;
}
.fc-row:last-of-type{border-bottom:none}
.fc-row:hover{background:color-mix(in srgb,var(--p) 2%,transparent)}
.fc-row-hd{
  background:var(--bg3);border-bottom:0.5px solid var(--brd);
  padding:7px 18px;
}
.fc-row-hd:hover{background:var(--bg3)}

/* ── Force name pill ── */
.force-pill{
  font-size:11px;font-weight:700;
  padding:4px 10px;border-radius:20px;
  white-space:nowrap;display:inline-flex;
  align-items:center;gap:5px;
  letter-spacing:0.01em;
}
.force-pill-dot{
  width:5px;height:5px;border-radius:50%;
  background:currentColor;opacity:0.6;flex-shrink:0;
}

/* ── Custom slider ── */
.sv-slider{
  width:100%;height:4px;border-radius:99px;
  outline:none;-webkit-appearance:none;cursor:pointer;
  background:var(--brd2);
  transition:background .15s;
}
.sv-slider::-webkit-slider-thumb{
  -webkit-appearance:none;
  width:16px;height:16px;border-radius:50%;
  background:var(--bg2);
  border:2px solid var(--p);
  box-shadow:0 1px 6px color-mix(in srgb,var(--p) 30%,transparent);
  cursor:pointer;
  transition:transform .12s,box-shadow .12s;
}
.sv-slider::-webkit-slider-thumb:hover{
  transform:scale(1.15);
  box-shadow:0 2px 10px color-mix(in srgb,var(--p) 40%,transparent);
}
.sv-slider::-moz-range-thumb{
  width:16px;height:16px;border-radius:50%;
  background:var(--bg2);border:2px solid var(--p);
  cursor:pointer;
}

/* ── Weight number input ── */
.fc-weight-cell{display:flex;align-items:center;gap:4px}
.fc-num-input{
  width:46px;height:28px;
  border:0.5px solid var(--brd2);border-radius:7px;
  background:var(--bg3);color:var(--ink);
  font-family:"DM Mono",monospace;
  font-size:12px;font-weight:600;
  text-align:center;outline:none;
  transition:border-color .12s,background .12s,box-shadow .12s;
  -moz-appearance:textfield;
}
.fc-num-input::-webkit-outer-spin-button,
.fc-num-input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
.fc-num-input:focus{
  border-color:var(--p);background:var(--bg2);
  box-shadow:0 0 0 2.5px color-mix(in srgb,var(--p) 12%,transparent);
}
.fc-num-input.err{
  border-color:var(--ri);
  box-shadow:0 0 0 2px color-mix(in srgb,var(--ri) 12%,transparent);
}
.fc-pct-label{font-family:"DM Mono",monospace;font-size:10px;color:var(--ink5)}

/* ── Total bar ── */
.fc-total-bar{
  display:flex;align-items:center;gap:10px;
  padding:12px 18px;
  border-top:0.5px solid var(--brd);
  background:var(--bg2);flex-wrap:wrap;
}
.fc-total-summary{display:flex;align-items:center;gap:10px;margin-right:auto;flex-wrap:wrap}
.fc-total-label{font-size:12px;color:var(--ink4)}
.fc-total-val{
  font-family:"DM Mono",monospace;
  font-size:14px;font-weight:700;
  transition:color .2s;letter-spacing:-0.02em;
}
.fc-total-val.ok{color:var(--ok)}
.fc-total-val.err{color:var(--ri)}
.fc-total-val.warn{color:var(--wa)}

/* ── Progress bar ── */
.fc-prog-wrap{
  height:4px;border-radius:99px;
  background:var(--brd2);width:120px;overflow:hidden;flex-shrink:0;
}
.fc-prog-fill{
  height:100%;border-radius:99px;
  transition:width .25s cubic-bezier(.4,0,.2,1),background .2s;
}

/* ── Warning banner ── */
.fc-warn-banner{
  display:flex;align-items:flex-start;gap:10px;
  margin:0 18px 0;
  padding:10px 14px;
  border-radius:10px;
  animation:fc-banner-in .2s ease;
  border:0.5px solid transparent;
}
@keyframes fc-banner-in{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
.fc-warn-icon{
  width:28px;height:28px;border-radius:8px;
  display:flex;align-items:center;justify-content:center;
  font-size:13px;flex-shrink:0;
}
.fc-warn-body{flex:1;min-width:0}
.fc-warn-title{font-size:12.5px;font-weight:600;margin-bottom:2px}
.fc-warn-sub{font-size:11.5px;color:var(--ink3);line-height:1.5}
.fc-warn-val{font-family:"DM Mono",monospace;font-weight:700}
.fc-warn-banner.over{
  background:color-mix(in srgb,var(--ri) 8%,transparent);
  border-color:color-mix(in srgb,var(--ri) 22%,transparent);
}
.fc-warn-banner.over .fc-warn-icon{background:color-mix(in srgb,var(--ri) 14%,transparent);color:var(--ri)}
.fc-warn-banner.over .fc-warn-title{color:var(--ri)}
.fc-warn-banner.over .fc-warn-val{color:var(--ri)}
.fc-warn-banner.under{
  background:color-mix(in srgb,var(--wa) 8%,transparent);
  border-color:color-mix(in srgb,var(--wa) 22%,transparent);
}
.fc-warn-banner.under .fc-warn-icon{background:color-mix(in srgb,var(--wa) 14%,transparent);color:var(--wa)}
.fc-warn-banner.under .fc-warn-title{color:var(--wa)}
.fc-warn-banner.under .fc-warn-val{color:var(--wa)}
`;

// ─── API shape (raw from server) ─────────────────────────────────────────────
interface ForceApiRecord {
  partitionKey: string;
  rowKey: string;
  forceKey: string;
  displayName: string;
  weight: number;
  directionMultiplier: number;
  trend: string;
  sortOrder: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  eTag: string;
  timestamp: string;
}

// ─── Internal UI shape ────────────────────────────────────────────────────────
export interface ForceItem {
  // identity (needed for PATCH)
  partitionKey: string;
  rowKey: string;
  // display
  key: string;
  name: string;
  bg: string;
  color: string;
  // editable fields
  weight: number;
  directionMultiplier: number; // numeric, matches API field name exactly
  trend: string;
  sortOrder: number;
}

// ─── Per-force visual tokens (stable, not from API) ──────────────────────────
const FORCE_VISUALS: Record<string, { bg: string; color: string }> = {
  artha: { bg: "#FAEEDA", color: "#854F0B" },
  laya: { bg: "#DBEAFE", color: "#1D4ED8" },
  kriya: { bg: "#DCFCE7", color: "#166534" },
  gati: { bg: "#EEEEF9", color: "#4B48C8" },
  rasa: { bg: "#FEE2E2", color: "#991B1B" },
};
const DEFAULT_VISUAL = { bg: "var(--bg3)", color: "var(--ink)" };

// ─── Map API record → UI ForceItem ───────────────────────────────────────────
function mapApiToForce(r: ForceApiRecord): ForceItem {
  const vis = FORCE_VISUALS[r.forceKey] ?? DEFAULT_VISUAL;
  return {
    partitionKey: r.partitionKey,
    rowKey: r.rowKey,
    key: r.forceKey,
    name: r.displayName,
    bg: vis.bg,
    color: vis.color,
    weight: r.weight,
    directionMultiplier: r.directionMultiplier,
    trend: r.trend,
    sortOrder: r.sortOrder,
  };
}

// ─── Map UI ForceItem → one element of the bulk PATCH body ───────────────────
// Shape matches exactly: { forceKey, weight, directionMultiplier, trend, sortOrder }
interface ForcePatchItem {
  forceKey: string;
  weight: number;
  directionMultiplier: number;
  trend: string;
  sortOrder: number;
}
function mapForceToPatch(f: ForceItem): ForcePatchItem {
  return {
    forceKey: f.key,
    weight: f.weight,
    directionMultiplier: f.directionMultiplier,
    trend: f.trend,
    sortOrder: f.sortOrder,
  };
}

const TRENDS = ["improving", "stable", "declining"];

const TREND_META: Record<string, { icon: string; color: string }> = {
  improving: { icon: "↑", color: "var(--ok)" },
  stable: { icon: "→", color: "var(--ink4)" },
  declining: { icon: "↓", color: "var(--ri)" },
};

// ─── Primitives ───────────────────────────────────────────────────────────────
function Toast({ msg, type }: { msg: string; type: "ok" | "err" }) {
  return (
    <div className={`toast toast-${type}`}>
      {type === "ok" ? "✓" : "✕"} {msg}
    </div>
  );
}

function CardHdr({
  icon,
  iconBg = "var(--pp)",
  iconColor = "var(--p)",
  title,
  api,
  sub,
}: {
  icon: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
  title: React.ReactNode;
  api?: string;
  sub?: React.ReactNode;
}) {
  return (
    <div className="sv-card-hdr">
      <div
        className="sv-card-icon"
        style={{ background: iconBg, color: iconColor }}
      >
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="sv-card-title">{title}</div>
        {api && <span className="sv-card-api">{api}</span>}
      </div>
      {sub && <div style={{ marginLeft: "auto", flexShrink: 0 }}>{sub}</div>}
    </div>
  );
}

// ─── WeightCell: typed number input synced with slider ────────────────────────
function WeightCell({
  value,
  isOver,
  onChange,
}: {
  value: number;
  isOver: boolean;
  onChange: (v: number) => void;
}) {
  const [draft, setDraft] = useState(String(value));
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  function commit(raw: string) {
    const n = parseInt(raw, 10);
    if (!isNaN(n) && n >= 0 && n <= 100) {
      onChange(n);
      setDraft(String(n));
    } else setDraft(String(value));
  }

  return (
    <div className="fc-weight-cell">
      <input
        ref={ref}
        type="number"
        min={0}
        max={100}
        className={`fc-num-input${isOver ? " err" : ""}`}
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value);
          const n = parseInt(e.target.value, 10);
          if (!isNaN(n) && n >= 0 && n <= 100) onChange(n);
        }}
        onBlur={(e) => commit(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            commit((e.target as HTMLInputElement).value);
            ref.current?.blur();
          }
          if (e.key === "Escape") {
            setDraft(String(value));
            ref.current?.blur();
          }
        }}
      />
      <span className="fc-pct-label">%</span>
    </div>
  );
}

// ─── DirMultCell: typed number input for directionMultiplier ─────────────────
function DirMultCell({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [draft, setDraft] = useState(String(value));
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  function commit(raw: string) {
    const n = parseFloat(raw);
    if (!isNaN(n) && n >= 0) {
      onChange(n);
      setDraft(String(n));
    } else setDraft(String(value));
  }

  return (
    <input
      ref={ref}
      type="number"
      min={0}
      step={0.1}
      className="sv-input"
      style={{
        minWidth: 62,
        width: 62,
        textAlign: "center",
        fontFamily: '"DM Mono",monospace',
        fontSize: 11.5,
      }}
      value={draft}
      onChange={(e) => {
        setDraft(e.target.value);
        const n = parseFloat(e.target.value);
        if (!isNaN(n) && n >= 0) onChange(n);
      }}
      onBlur={(e) => commit(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          commit((e.target as HTMLInputElement).value);
          ref.current?.blur();
        }
        if (e.key === "Escape") {
          setDraft(String(value));
          ref.current?.blur();
        }
      }}
    />
  );
}

// ─── Colour-filled slider ─────────────────────────────────────────────────────
function ForceSlider({
  value,
  color,
  onChange,
}: {
  value: number;
  color: string;
  onChange: (v: number) => void;
}) {
  const pct = (value / 100) * 100; // 0-100 range
  return (
    <input
      type="range"
      className="sv-slider"
      min={0}
      max={100}
      value={value}
      style={{
        background: `linear-gradient(to right,${color} 0%,${color} ${pct}%,var(--brd2) ${pct}%,var(--brd2) 100%)`,
      }}
      onChange={(e) => onChange(+e.target.value)}
    />
  );
}

// ─── Warning banner ───────────────────────────────────────────────────────────
function WarnBanner({
  variant,
  total,
}: {
  variant: "over" | "under";
  total: number;
}) {
  const isOver = variant === "over";
  const diff = isOver ? total - 100 : 100 - total;
  return (
    <div className={`fc-warn-banner ${variant}`}>
      <div className="fc-warn-icon">{isOver ? "⚠" : "◑"}</div>
      <div className="fc-warn-body">
        <div className="fc-warn-title">
          {isOver ? "Weights exceed 100%" : "Weights below 100%"}
        </div>
        <div className="fc-warn-sub">
          Total is <span className="fc-warn-val">{total}%</span>
          {isOver ? (
            <>
              {" "}
              — reduce by <span className="fc-warn-val">+{diff}%</span> to save.
            </>
          ) : (
            <>
              {" "}
              — add <span className="fc-warn-val">{diff}%</span> more to reach
              exactly 100%.
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function PanelForceConfig() {
  const [forces, setForces] = useState<ForceItem[]>([]);
  const [original, setOrig] = useState<ForceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiErr] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    msg: string;
    type: "ok" | "err";
  } | null>(null);

  function showToast(msg: string, type: "ok" | "err" = "ok") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function authHeaders(): Record<string, string> {
    const token = localStorage.getItem("zotra_token");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  // ── GET /force ─────────────────────────────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    apiFetch(`${baseUrl()}/force`, { headers: authHeaders() })
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json() as Promise<ForceApiRecord[]>;
      })
      .then((data) => {
        const mapped = [...data]
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map(mapApiToForce);
        setForces(mapped);
        setOrig(mapped.map((f) => ({ ...f })));
        setApiErr(null);
      })
      .catch((err: Error) => setApiErr(err.message))
      .finally(() => setLoading(false));
  }, []);

  const updateForce = useCallback(
    <K extends keyof ForceItem>(idx: number, field: K, val: ForceItem[K]) => {
      setForces((prev) =>
        prev.map((f, i) => (i === idx ? { ...f, [field]: val } : f)),
      );
    },
    [],
  );

  const total = forces.reduce((sum, f) => sum + f.weight, 0);
  const isOver = total > 100;
  const isUnder = total < 100;
  const isExact = total === 100;
  const progPct = Math.min((total / 100) * 100, 100);
  const progColor = isOver ? "var(--ri)" : isExact ? "var(--ok)" : "var(--wa)";

  // ── PATCH /force — bulk array body ────────────────────────────────────────
  // Sends all forces every time (API owns the merge logic).
  // Payload shape: [{ forceKey, weight, directionMultiplier, trend, sortOrder }]
  async function handleSave() {
    if (!isExact) return;
    setSaving(true);
    try {
      const payload: ForcePatchItem[] = forces.map(mapForceToPatch);

      const res = await apiFetch(`${baseUrl()}/force`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`${res.status}`);

      setOrig(forces.map((f) => ({ ...f })));
      showToast("Force weights saved");
    } catch (err) {
      showToast(`Save failed: ${(err as Error).message}`, "err");
    } finally {
      setSaving(false);
    }
  }

  // ── Skeleton ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="sv-card">
        <CardHdr
          icon="◐"
          title="Panchashakti Force Weights"
          api="GET /force · PATCH /force"
        />
        <div className="sv-card-desc">Loading force configuration…</div>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "100px 1fr 80px 72px 110px",
              gap: 10,
              alignItems: "center",
              padding: "13px 18px",
              borderBottom: "0.5px solid var(--brd)",
            }}
          >
            <div className="skel" style={{ height: 26, borderRadius: 20 }} />
            <div className="skel" style={{ height: 4, borderRadius: 4 }} />
            <div className="skel" style={{ height: 28, borderRadius: 7 }} />
            <div className="skel" style={{ height: 28, borderRadius: 7 }} />
            <div className="skel" style={{ height: 28, borderRadius: 7 }} />
          </div>
        ))}
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {toast && <Toast msg={toast.msg} type={toast.type} />}

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
            alignItems: "flex-start",
          }}
        >
          <span style={{ flexShrink: 0 }}>⚠</span>
          <span>
            Could not load force config ({apiError}). Check your connection or
            try refreshing.
          </span>
          <button
            className="btn sm"
            style={{ marginLeft: "auto", flexShrink: 0 }}
            onClick={() => {
              setApiErr(null);
              setLoading(true);
              apiFetch(`${baseUrl()}/force`, { headers: authHeaders() })
                .then((r) => {
                  if (!r.ok) throw new Error(`${r.status}`);
                  return r.json() as Promise<ForceApiRecord[]>;
                })
                .then((data) => {
                  const mapped = [...data]
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map(mapApiToForce);
                  setForces(mapped);
                  setOrig(mapped.map((f) => ({ ...f })));
                  setApiErr(null);
                })
                .catch((err: Error) => setApiErr(err.message))
                .finally(() => setLoading(false));
            }}
          >
            Retry
          </button>
        </div>
      )}

      <div className="sv-card">
        {/* ── Header ── */}
        <CardHdr
          icon="◐"
          title="Panchashakti Force Weights"
          api="GET /force · PATCH /force"
          sub={
            <span
              style={{
                fontFamily: '"DM Mono",monospace',
                fontSize: 10.5,
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: 20,
                background: isExact
                  ? "var(--okb)"
                  : isOver
                    ? "color-mix(in srgb,var(--ri) 12%,transparent)"
                    : "var(--wab)",
                color: isExact
                  ? "var(--okf)"
                  : isOver
                    ? "var(--ri)"
                    : "var(--waf)",
                transition: "all .2s",
                border: "0.5px solid",
                borderColor: isExact
                  ? "color-mix(in srgb,var(--ok) 25%,transparent)"
                  : isOver
                    ? "color-mix(in srgb,var(--ri) 22%,transparent)"
                    : "color-mix(in srgb,var(--wa) 22%,transparent)",
              }}
            >
              {isExact ? "✓ 100%" : `${total} / 100%`}
            </span>
          }
        />

        <div className="sv-card-desc">
          Drag the slider or type a value to set each force's contribution to
          the OHI composite score. All five weights must total exactly 100%.
        </div>

        {/* ── Column headers ── */}
        <div className="fc-row fc-row-hd">
          {["Force", "Slider", "Weight", "Dir. mult.", "Trend"].map((h) => (
            <div
              key={h}
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                color: "var(--ink5)",
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {/* ── Force rows ── */}
        {forces.map((f, i) => {
          const tm = TREND_META[f.trend] ?? TREND_META.stable;
          return (
            <div key={f.rowKey} className="fc-row">
              {/* Pill */}
              <span
                className="force-pill"
                style={{ background: f.bg, color: f.color }}
              >
                <span className="force-pill-dot" />
                {f.name}
              </span>

              {/* Colour-filled slider */}
              <ForceSlider
                value={f.weight}
                color={f.color}
                onChange={(v) => updateForce(i, "weight", v)}
              />

              {/* Typed weight input */}
              <WeightCell
                value={f.weight}
                isOver={isOver}
                onChange={(v) => updateForce(i, "weight", v)}
              />

              {/* Directional multiplier — numeric, matches API field */}
              <DirMultCell
                value={f.directionMultiplier}
                onChange={(v) => updateForce(i, "directionMultiplier", v)}
              />

              {/* Trend */}
              <select
                className="sv-select"
                style={{
                  minWidth: 106,
                  fontSize: 11,
                  color: tm.color,
                  fontWeight: 500,
                }}
                value={f.trend}
                onChange={(e) => updateForce(i, "trend", e.target.value)}
              >
                {TRENDS.map((t) => (
                  <option key={t} value={t}>
                    {TREND_META[t].icon} {t}
                  </option>
                ))}
              </select>
            </div>
          );
        })}

        {/* ── Warning banners ── */}
        {(isOver || isUnder) && (
          <>
            <div style={{ height: 12 }} />
            <WarnBanner variant={isOver ? "over" : "under"} total={total} />
            <div style={{ height: 4 }} />
          </>
        )}

        {/* ── Save bar ── */}
        <div className="fc-total-bar">
          <div className="fc-total-summary">
            <span className="fc-total-label">Total</span>

            <div className="fc-prog-wrap">
              <div
                className="fc-prog-fill"
                style={{ width: `${progPct}%`, background: progColor }}
              />
            </div>

            <span
              className={`fc-total-val ${isExact ? "ok" : isOver ? "err" : "warn"}`}
            >
              {total}%
            </span>

            {isExact && (
              <span
                style={{
                  fontSize: 10.5,
                  color: "var(--okf)",
                  background: "var(--okb)",
                  padding: "2px 8px",
                  borderRadius: 20,
                  fontWeight: 600,
                }}
              >
                ✓ Ready to save
              </span>
            )}
          </div>

          <button
            className="btn"
            disabled={saving}
            onClick={() => setForces(original.map((f) => ({ ...f })))}
          >
            Reset
          </button>

          <button
            className="btn pri"
            onClick={handleSave}
            disabled={saving || !isExact}
            title={
              isOver
                ? `Reduce by ${total - 100}% to save`
                : isUnder
                  ? `Add ${100 - total}% more to save`
                  : undefined
            }
          >
            {saving ? "Saving…" : "Save weights"}
          </button>
        </div>
      </div>
    </>
  );
}
