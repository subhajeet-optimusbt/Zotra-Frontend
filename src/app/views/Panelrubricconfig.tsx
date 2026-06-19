import React, { useState, useEffect, useCallback, useRef } from "react";
import { baseUrl, apiFetch } from "../utils/utils";

// ─── Exported styles ──────────────────────────────────────────────────────────
export const RUBRIC_STYLES = `
/* ── Score Bands table ── */
.rb-row{
  display:grid;
  grid-template-columns:80px 58px 100px 1fr 1fr;
  gap:8px;align-items:center;
  padding:11px 18px;
  border-bottom:0.5px solid var(--brd);
  transition:background .12s;
}
.rb-row:hover{background:color-mix(in srgb,var(--p) 2%,transparent)}
.rb-row-hd{background:var(--bg3)!important;padding:7px 18px}
.rb-id{font-family:"DM Mono",monospace;font-size:9.5px;color:var(--ink5);letter-spacing:.02em}
.rb-score-badge{
  font-size:9.5px;padding:2px 9px;border-radius:20px;
  font-weight:700;white-space:nowrap;display:inline-block;letter-spacing:.02em;
}

/* ── Dimension rows ── */
.rub-dim-row{
  display:grid;
  grid-template-columns:1fr 90px 88px 36px;
  gap:10px;align-items:center;
  padding:12px 18px;
  border-bottom:0.5px solid var(--brd);
  transition:background .12s;
}
.rub-dim-row:hover{background:color-mix(in srgb,var(--p) 2%,transparent)}
.rub-dim-row-hd{background:var(--bg3)!important;padding:7px 18px}
.rub-dim-row.disabled{opacity:.5}

/* ── Weight cell ── */
.rub-weight-cell{display:flex;align-items:center;gap:4px}
.rub-num-input{
  width:48px;height:28px;
  border:0.5px solid var(--brd2);border-radius:7px;
  background:var(--bg3);color:var(--ink);
  font-family:"DM Mono",monospace;font-size:12px;font-weight:600;
  text-align:center;outline:none;
  transition:border-color .12s,background .12s,box-shadow .12s;
  -moz-appearance:textfield;
}
.rub-num-input::-webkit-outer-spin-button,
.rub-num-input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
.rub-num-input:focus{
  border-color:var(--p);background:var(--bg2);
  box-shadow:0 0 0 2.5px color-mix(in srgb,var(--p) 12%,transparent);
}
.rub-num-input.err{
  border-color:var(--ri);
  box-shadow:0 0 0 2px color-mix(in srgb,var(--ri) 12%,transparent);
}
.rub-pct{font-family:"DM Mono",monospace;font-size:10px;color:var(--ink5)}

/* ── Progress & total bar ── */
.rub-total-bar{
  display:flex;align-items:center;gap:10px;
  padding:12px 18px;border-top:0.5px solid var(--brd);
  background:var(--bg2);flex-wrap:wrap;
}
.rub-total-summary{display:flex;align-items:center;gap:10px;margin-right:auto;flex-wrap:wrap}
.rub-total-label{font-size:12px;color:var(--ink4)}
.rub-total-val{
  font-family:"DM Mono",monospace;font-size:14px;font-weight:700;
  transition:color .2s;letter-spacing:-0.02em;
}
.rub-total-val.ok{color:var(--ok)}
.rub-total-val.err{color:var(--ri)}
.rub-total-val.warn{color:var(--wa)}
.rub-prog-wrap{height:4px;border-radius:99px;background:var(--brd2);width:110px;overflow:hidden;flex-shrink:0}
.rub-prog-fill{height:100%;border-radius:99px;transition:width .25s cubic-bezier(.4,0,.2,1),background .2s}

/* ── Warning banner ── */
.rub-warn-banner{
  display:flex;align-items:flex-start;gap:10px;
  margin:0 18px;padding:10px 14px;border-radius:10px;
  animation:rub-banner-in .2s ease;border:0.5px solid transparent;
}
@keyframes rub-banner-in{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
.rub-warn-icon{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0}
.rub-warn-body{flex:1;min-width:0}
.rub-warn-title{font-size:12.5px;font-weight:600;margin-bottom:2px}
.rub-warn-sub{font-size:11.5px;color:var(--ink3);line-height:1.5}
.rub-warn-val{font-family:"DM Mono",monospace;font-weight:700}
.rub-warn-banner.over{background:color-mix(in srgb,var(--ri) 8%,transparent);border-color:color-mix(in srgb,var(--ri) 22%,transparent)}
.rub-warn-banner.over .rub-warn-icon{background:color-mix(in srgb,var(--ri) 14%,transparent);color:var(--ri)}
.rub-warn-banner.over .rub-warn-title{color:var(--ri)}
.rub-warn-banner.over .rub-warn-val{color:var(--ri)}
.rub-warn-banner.under{background:color-mix(in srgb,var(--wa) 8%,transparent);border-color:color-mix(in srgb,var(--wa) 22%,transparent)}
.rub-warn-banner.under .rub-warn-icon{background:color-mix(in srgb,var(--wa) 14%,transparent);color:var(--wa)}
.rub-warn-banner.under .rub-warn-title{color:var(--wa)}
.rub-warn-banner.under .rub-warn-val{color:var(--wa)}

/* ── Explainer section ── */
.rub-explainer{border-top:0.5px solid var(--brd);overflow:hidden}
.rub-explainer-toggle{
  display:flex;align-items:center;gap:10px;padding:10px 16px;cursor:pointer;
  transition:background .12s;user-select:none;background:var(--bg);
}
.rub-explainer-toggle:hover{background:color-mix(in srgb,var(--p) 4%,transparent)}
.rub-exp-icon{
  width:28px;height:28px;border-radius:8px;flex-shrink:0;
  background:var(--bg3);border:0.5px solid var(--brd2);
  display:flex;align-items:center;justify-content:center;
  font-size:13px;color:var(--ink4);transition:background .12s,color .12s;
}
.rub-explainer-toggle:hover .rub-exp-icon{
  background:color-mix(in srgb,var(--p) 10%,transparent);color:var(--p);
  border-color:color-mix(in srgb,var(--p) 20%,transparent);
}
.rub-exp-title{font-size:12.5px;font-weight:600;color:var(--ink)}
.rub-exp-sub{font-size:11px;color:var(--ink4);margin-top:1px}
.rub-exp-chev{margin-left:auto;color:var(--ink5);font-size:11px;transition:transform .2s;flex-shrink:0}
.rub-exp-chev.open{transform:rotate(180deg)}
.rub-explainer-body{
  padding:16px 18px 20px;border-top:0.5px solid var(--brd);
  background:var(--bg);animation:rub-exp-body-in .18s ease;
}
@keyframes rub-exp-body-in{from{opacity:0}to{opacity:1}}
.rub-exp-prose{font-size:12.5px;color:var(--ink3);line-height:1.65;margin-bottom:16px}
.rub-exp-prose strong{color:var(--ink);font-weight:600}
.rub-exp-prose em{font-style:normal;font-family:"DM Mono",monospace;font-size:11.5px;color:var(--p)}
.rub-example-wrap{border:0.5px solid var(--brd2);border-radius:10px;overflow:hidden}
.rub-example-label{
  padding:7px 14px;font-size:9px;font-weight:700;letter-spacing:.1em;
  text-transform:uppercase;color:var(--ink5);
  background:var(--bg3);border-bottom:0.5px solid var(--brd2);
  font-family:"DM Mono",monospace;
}
.rub-ex-table{width:100%;border-collapse:collapse}
.rub-ex-table th{
  padding:7px 14px;text-align:left;font-size:9.5px;font-weight:600;
  letter-spacing:.05em;text-transform:uppercase;color:var(--ink5);
  border-bottom:0.5px solid var(--brd2);background:var(--bg3);
}
.rub-ex-table td{
  padding:9px 14px;font-size:12px;color:var(--ink2);
  border-bottom:0.5px solid var(--brd2);vertical-align:middle;
}
.rub-ex-table tr:last-child td{border-bottom:none}
.rub-ex-table tr:hover td{background:color-mix(in srgb,var(--p) 3%,transparent)}
.rub-ex-contrib{font-family:"DM Mono",monospace;font-size:11.5px;color:var(--ink3)}
.rub-ex-contrib strong{color:var(--ink);font-weight:700}
.rub-ex-composite-row td{
  padding:10px 14px;
  background:color-mix(in srgb,var(--p) 5%,transparent)!important;
  border-top:0.5px solid color-mix(in srgb,var(--p) 15%,transparent);
}
.rub-ex-composite-score{font-family:"DM Mono",monospace;font-size:15px;font-weight:700;color:var(--p)}
.rub-ex-band-pill{font-size:10.5px;font-weight:600;padding:3px 10px;border-radius:20px;display:inline-block;letter-spacing:.02em}
.rub-ex-arrow{color:var(--ink5);margin:0 4px}
`;

// ─── API raw shapes ───────────────────────────────────────────────────────────
interface ApiBand {
  partitionKey: string;
  rowKey: string;
  score: number;
  band: string; // "Low" | "Medium" | "High" etc.
  description: string;
  evaluationGuidance: string;
  sortOrder: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  eTag: string;
  timestamp: string;
}

interface ApiDimension {
  partitionKey: string;
  rowKey: string;
  dimensionKey: string;
  displayName: string;
  description: string;
  weight: number;
  flagBelowScore: number;
  enabled: boolean;
  sortOrder: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  eTag: string;
  timestamp: string;
}

interface ApiRubricResponse {
  scoreBands: ApiBand[];
  dimensions: ApiDimension[];
}

// ─── PATCH payload shapes ─────────────────────────────────────────────────────
interface BandPatchItem {
  rowKey: string;
  score: number;
  band: string;
  description: string;
  evaluationGuidance: string;
  sortOrder: number;
}

interface DimPatchItem {
  dimensionKey: string;
  displayName: string;
  description: string;
  weight: number;
  flagBelowScore: number;
  enabled: boolean;
  sortOrder: number;
}

// ─── Internal UI shapes ───────────────────────────────────────────────────────
export interface ScoreBand {
  // identity
  rowKey: string;
  sortOrder: number;
  // editable
  score: number;
  band: string;
  description: string;
  evaluationGuidance: string;
  // display only (badge derived from score)
  badge: { bg: string; color: string; label: string };
}

export interface RubricDimension {
  // identity
  rowKey: string;
  dimensionKey: string;
  sortOrder: number;
  // editable
  displayName: string;
  description: string;
  weight: number;
  flagBelowScore: number;
  enabled: boolean;
}

// ─── Visual badge tokens per score (client-side only) ─────────────────────────
function badgeForScore(score: number): {
  bg: string;
  color: string;
  label: string;
} {
  if (score >= 10) return { bg: "#5552C9", color: "#fff", label: "Confirmed" };
  if (score >= 8) return { bg: "#DCFCE7", color: "#166534", label: "Strong" };
  if (score >= 6) return { bg: "#DBEAFE", color: "#1E40AF", label: "Partial" };
  if (score >= 3) return { bg: "#FEF9C3", color: "#854D0E", label: "Weak" };
  return { bg: "#F1F5F9", color: "#475569", label: "Absent" };
}

// ─── Mapping helpers ──────────────────────────────────────────────────────────
function mapApiBand(r: ApiBand): ScoreBand {
  return {
    rowKey: r.rowKey,
    sortOrder: r.sortOrder,
    score: r.score,
    band: r.band,
    description: r.description,
    evaluationGuidance: r.evaluationGuidance,
    badge: badgeForScore(r.score),
  };
}

function mapApiDimension(r: ApiDimension): RubricDimension {
  return {
    rowKey: r.rowKey,
    dimensionKey: r.dimensionKey,
    sortOrder: r.sortOrder,
    displayName: r.displayName,
    description: r.description,
    weight: r.weight,
    flagBelowScore: r.flagBelowScore,
    enabled: r.enabled,
  };
}

function mapBandToPatch(b: ScoreBand): BandPatchItem {
  return {
    rowKey: b.rowKey,
    score: b.score,
    band: b.band,
    description: b.description,
    evaluationGuidance: b.evaluationGuidance,
    sortOrder: b.sortOrder,
  };
}

function mapDimToPatch(d: RubricDimension): DimPatchItem {
  return {
    dimensionKey: d.dimensionKey,
    displayName: d.displayName,
    description: d.description,
    weight: d.weight,
    flagBelowScore: d.flagBelowScore,
    enabled: d.enabled,
    sortOrder: d.sortOrder,
  };
}

// ─── Example scores for the live explainer (static) ──────────────────────────
const EXAMPLE_SCORES: Record<string, number> = {
  evidence_strength: 8,
  coverage: 7,
  consistency: 6,
  freshness: 9,
  confidence: 7.2,
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

function Toggle({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label className="sv-tg">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="sv-tg-track" />
      <span className="sv-tg-thumb" />
    </label>
  );
}

// ─── Reusable numeric input that lets user type freely ────────────────────────
function NumInput({
  value,
  isErr = false,
  min = 0,
  max = 100,
  step = 1,
  style,
  onChange,
}: {
  value: number;
  isErr?: boolean;
  min?: number;
  max?: number;
  step?: number;
  style?: React.CSSProperties;
  onChange: (v: number) => void;
}) {
  const [draft, setDraft] = useState(String(value));
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  function commit(raw: string) {
    const n = step < 1 ? parseFloat(raw) : parseInt(raw, 10);
    if (!isNaN(n) && n >= min && n <= max) {
      onChange(n);
      setDraft(String(n));
    } else setDraft(String(value));
  }

  return (
    <input
      ref={ref}
      type="number"
      min={min}
      max={max}
      step={step}
      className={`rub-num-input${isErr ? " err" : ""}`}
      style={style}
      value={draft}
      onChange={(e) => {
        setDraft(e.target.value);
        const n =
          step < 1 ? parseFloat(e.target.value) : parseInt(e.target.value, 10);
        if (!isNaN(n) && n >= min && n <= max) onChange(n);
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

// ─── Weight warning banner ────────────────────────────────────────────────────
function WeightWarnBanner({
  variant,
  total,
}: {
  variant: "over" | "under";
  total: number;
}) {
  const isOver = variant === "over";
  const diff = isOver ? total - 100 : 100 - total;
  return (
    <div className={`rub-warn-banner ${variant}`}>
      <div className="rub-warn-icon">{isOver ? "⚠" : "◑"}</div>
      <div className="rub-warn-body">
        <div className="rub-warn-title">
          {isOver ? "Weights exceed 100%" : "Weights below 100%"}
        </div>
        <div className="rub-warn-sub">
          Total is <span className="rub-warn-val">{total}%</span>
          {isOver ? (
            <>
              {" "}
              — reduce by <span className="rub-warn-val">+{diff}%</span> to
              save.
            </>
          ) : (
            <>
              {" "}
              — add <span className="rub-warn-val">{diff}%</span> more to reach
              exactly 100%.
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Error banner with retry ──────────────────────────────────────────────────
function ErrBanner({ msg, onRetry }: { msg: string; onRetry: () => void }) {
  return (
    <div
      style={{
        padding: "10px 14px",
        fontSize: 11.5,
        color: "var(--ri)",
        background: "color-mix(in srgb,var(--ri) 8%,transparent)",
        border: "0.5px solid color-mix(in srgb,var(--ri) 22%,transparent)",
        borderRadius: 10,
        marginBottom: 12,
        display: "flex",
        gap: 10,
        alignItems: "center",
      }}
    >
      <span style={{ flexShrink: 0 }}>⚠</span>
      <span style={{ flex: 1 }}>Could not load rubric config ({msg}).</span>
      <button className="btn sm" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}

// ─── "How rubric scoring works" explainer ────────────────────────────────────
function RubricExplainer({
  dims,
  bands,
}: {
  dims: RubricDimension[];
  bands: ScoreBand[];
}) {
  const [open, setOpen] = useState(false);

  const activeDims = dims.filter((d) => d.enabled);
  const rows = activeDims.map((d) => {
    const rawScore = EXAMPLE_SCORES[d.dimensionKey] ?? 7;
    const weightFrac = d.weight / 100;
    const contrib = +(rawScore * weightFrac).toFixed(2);
    return { dim: d, rawScore, weightFrac, contrib };
  });
  const composite = +rows.reduce((s, r) => s + r.contrib, 0).toFixed(2);

  // Match composite against live bands
  const sortedBands = [...bands].sort((a, b) => b.score - a.score);
  const matchedBand = sortedBands.find((b) => composite >= b.score) ?? bands[0];
  const bandAbove = bands.find((b) => b.score > (matchedBand?.score ?? 0));
  const rangeLabel = matchedBand
    ? bandAbove
      ? `score ${matchedBand.score}.0–${bandAbove.score - 1 + 0.9}`
      : `score ${matchedBand.score}.0–10`
    : "";

  return (
    <div className="rub-explainer">
      <div className="rub-explainer-toggle" onClick={() => setOpen((v) => !v)}>
        <div className="rub-exp-icon">◉</div>
        <div style={{ flex: 1 }}>
          <div className="rub-exp-title">How rubric scoring works</div>
          <div className="rub-exp-sub">
            Scoring model explanation · click to {open ? "collapse" : "expand"}
          </div>
        </div>
        <span className={`rub-exp-chev${open ? " open" : ""}`}>▾</span>
      </div>

      {open && (
        <div className="rub-explainer-body">
          <p className="rub-exp-prose">
            For each inference (e.g. <em>budget_presence</em>), Zotra scores it
            across the {activeDims.length} active dimensions. Each dimension
            produces a score of <strong>0–10</strong>. The weighted average
            gives a <strong>composite score (0–10)</strong> which maps to a
            score band controlling rep guidance and agent actions.
          </p>

          <div className="rub-example-wrap">
            <div className="rub-example-label">
              Example · budget_presence inference
            </div>
            <table className="rub-ex-table">
              <thead>
                <tr>
                  <th>Dimension</th>
                  <th>Score</th>
                  <th>Weight</th>
                  <th>Contribution</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.dim.dimensionKey}>
                    <td>{r.dim.displayName}</td>
                    <td
                      style={{
                        fontFamily: '"DM Mono",monospace',
                        fontWeight: 600,
                        color: "var(--p)",
                      }}
                    >
                      {r.dim.dimensionKey === "confidence"
                        ? `${r.rawScore} (${(r.rawScore / 10).toFixed(2)} → ${r.rawScore})`
                        : r.rawScore}
                    </td>
                    <td
                      style={{
                        fontFamily: '"DM Mono",monospace',
                        color: "var(--ink3)",
                      }}
                    >
                      {r.dim.weight}%
                    </td>
                    <td className="rub-ex-contrib">
                      {r.rawScore} × {r.weightFrac.toFixed(2)} ={" "}
                      <strong>{r.contrib.toFixed(2)}</strong>
                    </td>
                  </tr>
                ))}
                <tr className="rub-ex-composite-row">
                  <td>
                    <strong>Composite</strong>
                  </td>
                  <td>
                    <span className="rub-ex-composite-score">{composite}</span>
                  </td>
                  <td />
                  <td>
                    <span className="rub-ex-arrow">→</span>
                    {matchedBand && (
                      <span
                        className="rub-ex-band-pill"
                        style={{
                          background: matchedBand.badge.bg,
                          color: matchedBand.badge.color,
                          marginRight: 6,
                        }}
                      >
                        {matchedBand.band}
                      </span>
                    )}
                    <span style={{ fontSize: 11.5, color: "var(--ink4)" }}>
                      ({rangeLabel})
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Shared loading skeleton rows ─────────────────────────────────────────────
function BandSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "80px 58px 100px 1fr 1fr",
            gap: 8,
            padding: "12px 18px",
            borderBottom: "0.5px solid var(--brd)",
          }}
        >
          {[1, 1, 1, 1, 1].map((_x, j) => (
            <div
              key={j}
              className="skel"
              style={{ height: 28, borderRadius: 7 }}
            />
          ))}
        </div>
      ))}
    </>
  );
}

function DimSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 90px 88px 36px",
            gap: 10,
            padding: "13px 18px",
            borderBottom: "0.5px solid var(--brd)",
          }}
        >
          <div>
            <div
              className="skel"
              style={{ height: 12, width: 140, marginBottom: 6 }}
            />
            <div className="skel" style={{ height: 10, width: 260 }} />
          </div>
          <div className="skel" style={{ height: 28, borderRadius: 7 }} />
          <div className="skel" style={{ height: 28, borderRadius: 7 }} />
          <div
            className="skel"
            style={{ height: 20, width: 36, borderRadius: 10 }}
          />
        </div>
      ))}
    </>
  );
}

// ─── Root panel — owns the single GET fetch, passes data down ────────────────
export default function PanelRubricConfig() {
  const [bands, setBands] = useState<ScoreBand[]>([]);
  const [dims, setDims] = useState<RubricDimension[]>([]);
  const [origBands, setOrigBands] = useState<ScoreBand[]>([]);
  const [origDims, setOrigDims] = useState<RubricDimension[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiErr] = useState<string | null>(null);

  function authHeaders(): Record<string, string> {
    const token = localStorage.getItem("zotra_token");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  // ── GET /inference-rubric ─────────────────────────────────────────────────
  const fetchData = useCallback(() => {
    setLoading(true);
    setApiErr(null);
    apiFetch(`${baseUrl()}/inference-rubric`, { headers: authHeaders() })
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json() as Promise<ApiRubricResponse>;
      })
      .then((data) => {
        const mappedBands = [...data.scoreBands]
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map(mapApiBand);
        const mappedDims = [...data.dimensions]
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map(mapApiDimension);
        setBands(mappedBands);
        setDims(mappedDims);
        setOrigBands(mappedBands.map((b) => ({ ...b })));
        setOrigDims(mappedDims.map((d) => ({ ...d })));
      })
      .catch((err: Error) => setApiErr(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <>
        <div className="sv-card">
          <CardHdr
            icon="◈"
            title="Score Bands"
            api="GET /inference-rubric · PATCH /inference-rubric/bands"
          />
          <BandSkeleton />
        </div>
        <div className="sv-card">
          <CardHdr
            icon="◈"
            title="Rubric Scoring Dimensions"
            api="GET /inference-rubric · PATCH /inference-rubric/dimensions"
          />
          <DimSkeleton />
        </div>
      </>
    );
  }

  return (
    <>
      {apiError && <ErrBanner msg={apiError} onRetry={fetchData} />}
      <ScoreBandsPanel
        bands={bands}
        setBands={setBands}
        origBands={origBands}
        setOrigBands={setOrigBands}
        authHeaders={authHeaders}
      />
      <RubricDimensionsPanel
        dims={dims}
        setDims={setDims}
        origDims={origDims}
        setOrigDims={setOrigDims}
        bands={bands}
        authHeaders={authHeaders}
      />
    </>
  );
}

// ─── Sub-panel A: Score Bands ─────────────────────────────────────────────────
interface BandsPanelProps {
  bands: ScoreBand[];
  setBands: React.Dispatch<React.SetStateAction<ScoreBand[]>>;
  origBands: ScoreBand[];
  setOrigBands: React.Dispatch<React.SetStateAction<ScoreBand[]>>;
  authHeaders: () => Record<string, string>;
}

function ScoreBandsPanel({
  bands,
  setBands,
  origBands,
  setOrigBands,
  authHeaders,
}: BandsPanelProps) {
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "ok" | "err";
  } | null>(null);

  function showToast(msg: string, type: "ok" | "err" = "ok") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function updateBand<K extends keyof ScoreBand>(
    idx: number,
    field: K,
    val: ScoreBand[K],
  ) {
    setBands((prev) =>
      prev.map((b, i) => {
        if (i !== idx) return b;
        const updated = { ...b, [field]: val };
        // recompute badge live if score changes
        if (field === "score") updated.badge = badgeForScore(val as number);
        return updated;
      }),
    );
  }

  // ── PATCH /inference-rubric/bands ────────────────────────────────────────
  // Payload: BandPatchItem[] — full array, all bands
  async function handleSave() {
    setSaving(true);
    try {
      const payload: BandPatchItem[] = bands.map(mapBandToPatch);
      const res = await apiFetch(`${baseUrl()}/inference-rubric/bands`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      setOrigBands(bands.map((b) => ({ ...b })));
      showToast("Score bands saved");
    } catch (err) {
      showToast(`Save failed: ${(err as Error).message}`, "err");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      {toast && <Toast msg={toast.msg} type={toast.type} />}
      <div className="sv-card">
        <CardHdr
          icon="◈"
          title="Score Bands"
          api="PATCH /inference-rubric/bands"
          sub={
            <span
              style={{
                fontSize: 10.5,
                fontFamily: '"DM Mono",monospace',
                fontWeight: 700,
                padding: "2px 9px",
                borderRadius: 20,
                background: "var(--bg3)",
                color: "var(--ink4)",
                border: "0.5px solid var(--brd2)",
              }}
            >
              {bands.length} bands
            </span>
          }
        />
        <div className="sv-card-desc">
          Define score thresholds and the guidance text shown to reps at each
          band level.
        </div>

        {/* Column headers */}
        <div className="rb-row rb-row-hd">
          {["ID", "Score", "Band", "Description", "Evaluation Guidance"].map(
            (h) => (
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
            ),
          )}
        </div>

        {bands.map((b, i) => (
          <div key={b.rowKey} className="rb-row">
            {/* rowKey */}
            <div className="rb-id">{b.rowKey}</div>

            {/* score */}
            <NumInput
              value={b.score}
              min={0}
              max={10}
              style={{
                width: 50,
                minWidth: 50,
                fontFamily: '"DM Mono",monospace',
                fontSize: 12,
                fontWeight: 600,
              }}
              onChange={(v) => updateBand(i, "score", v)}
            />

            {/* band label + live badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <input
                className="sv-input"
                style={{ flex: 1, minWidth: 0, fontSize: 11.5 }}
                value={b.band}
                onChange={(e) => updateBand(i, "band", e.target.value)}
              />
              <span
                className="rb-score-badge"
                style={{
                  background: b.badge.bg,
                  color: b.badge.color,
                  flexShrink: 0,
                }}
              >
                {b.badge.label}
              </span>
            </div>

            {/* description (= interpretation) */}
            <input
              className="sv-input"
              style={{ width: "100%", minWidth: 0 }}
              value={b.description}
              onChange={(e) => updateBand(i, "description", e.target.value)}
            />

            {/* evaluationGuidance (= guidance) */}
            <input
              className="sv-input"
              style={{ width: "100%", minWidth: 0 }}
              value={b.evaluationGuidance}
              onChange={(e) =>
                updateBand(i, "evaluationGuidance", e.target.value)
              }
            />
          </div>
        ))}

        <div className="sv-save">
          <button
            className="btn"
            disabled={saving}
            onClick={() => setBands(origBands.map((b) => ({ ...b })))}
          >
            Reset
          </button>
          <button className="btn pri" onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save bands"}
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Sub-panel B: Rubric Dimensions ──────────────────────────────────────────
interface DimsPanelProps {
  dims: RubricDimension[];
  setDims: React.Dispatch<React.SetStateAction<RubricDimension[]>>;
  origDims: RubricDimension[];
  setOrigDims: React.Dispatch<React.SetStateAction<RubricDimension[]>>;
  bands: ScoreBand[];
  authHeaders: () => Record<string, string>;
}

function RubricDimensionsPanel({
  dims,
  setDims,
  origDims,
  setOrigDims,
  bands,
  authHeaders,
}: DimsPanelProps) {
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "ok" | "err";
  } | null>(null);

  function showToast(msg: string, type: "ok" | "err" = "ok") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function updateDim<K extends keyof RubricDimension>(
    idx: number,
    field: K,
    val: RubricDimension[K],
  ) {
    setDims((prev) =>
      prev.map((d, i) => (i === idx ? { ...d, [field]: val } : d)),
    );
  }

  const weightTotal = dims.reduce((s, d) => s + d.weight, 0);
  const isOver = weightTotal > 100;
  const isUnder = weightTotal < 100;
  const isExact = weightTotal === 100;
  const progPct = Math.min((weightTotal / 100) * 100, 100);
  const progColor = isOver ? "var(--ri)" : isExact ? "var(--ok)" : "var(--wa)";

  // ── PATCH /inference-rubric/dimensions ───────────────────────────────────
  // Payload: DimPatchItem[] — full array, all dimensions
  async function handleSave() {
    if (!isExact) return;
    setSaving(true);
    try {
      const payload: DimPatchItem[] = dims.map(mapDimToPatch);
      const res = await apiFetch(`${baseUrl()}/inference-rubric/dimensions`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      setOrigDims(dims.map((d) => ({ ...d })));
      showToast("Rubric dimensions saved");
    } catch (err) {
      showToast(`Save failed: ${(err as Error).message}`, "err");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      {toast && <Toast msg={toast.msg} type={toast.type} />}
      <div className="sv-card">
        <CardHdr
          icon="◈"
          title="Rubric Scoring Dimensions"
          api="PATCH /inference-rubric/dimensions"
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
                border: "0.5px solid",
                borderColor: isExact
                  ? "color-mix(in srgb,var(--ok) 25%,transparent)"
                  : isOver
                    ? "color-mix(in srgb,var(--ri) 22%,transparent)"
                    : "color-mix(in srgb,var(--wa) 22%,transparent)",
                transition: "all .2s",
              }}
            >
              {isExact ? "✓ 100%" : `${weightTotal} / 100%`}
            </span>
          }
        />
        <div className="sv-card-desc">
          Each dimension scores 0–10 and is weighted by the percentage below.
          Weights must total exactly 100% to save.
        </div>

        {/* Column headers */}
        <div className="rub-dim-row rub-dim-row-hd">
          {["Dimension", "Weight", "Flag below", "On"].map((h) => (
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

        {dims.map((d, i) => (
          <div
            key={d.rowKey}
            className={`rub-dim-row${!d.enabled ? " disabled" : ""}`}
          >
            {/* Name + key + description */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 3,
                }}
              >
                <span
                  style={{
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: "var(--ink)",
                  }}
                >
                  {d.displayName}
                </span>
                <span
                  style={{
                    fontFamily: '"DM Mono",monospace',
                    fontSize: "9.5px",
                    color: "var(--ink5)",
                    fontWeight: 400,
                  }}
                >
                  {d.dimensionKey}
                </span>
              </div>
              <div
                style={{ fontSize: 11, color: "var(--ink4)", lineHeight: 1.4 }}
              >
                {d.description}
              </div>
            </div>

            {/* Weight */}
            <div className="rub-weight-cell">
              <NumInput
                value={d.weight}
                isErr={isOver}
                min={0}
                max={100}
                onChange={(v) => updateDim(i, "weight", v)}
              />
              <span className="rub-pct">%</span>
            </div>

            {/* flagBelowScore — numeric 0-10 */}
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <NumInput
                value={d.flagBelowScore}
                min={0}
                max={10}
                step={0.1}
                style={{ width: 44, minWidth: 44 }}
                onChange={(v) => updateDim(i, "flagBelowScore", v)}
              />
              <span style={{ fontSize: 11, color: "var(--ink5)" }}>/ 10</span>
            </div>

            {/* Toggle */}
            <Toggle
              checked={d.enabled}
              onChange={(v) => updateDim(i, "enabled", v)}
            />
          </div>
        ))}

        {/* Warning banners */}
        {(isOver || isUnder) && (
          <>
            <div style={{ height: 12 }} />
            <WeightWarnBanner
              variant={isOver ? "over" : "under"}
              total={weightTotal}
            />
            <div style={{ height: 4 }} />
          </>
        )}

        {/* Save bar */}
        <div className="rub-total-bar">
          <div className="rub-total-summary">
            <span className="rub-total-label">Total</span>
            <div className="rub-prog-wrap">
              <div
                className="rub-prog-fill"
                style={{ width: `${progPct}%`, background: progColor }}
              />
            </div>
            <span
              className={`rub-total-val ${isExact ? "ok" : isOver ? "err" : "warn"}`}
            >
              {weightTotal}%
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
            onClick={() => setDims(origDims.map((d) => ({ ...d })))}
          >
            Reset
          </button>
          <button
            className="btn pri"
            onClick={handleSave}
            disabled={saving || !isExact}
            title={
              isOver
                ? `Reduce by ${weightTotal - 100}% to save`
                : isUnder
                  ? `Add ${100 - weightTotal}% more to save`
                  : undefined
            }
          >
            {saving ? "Saving…" : "Save weights"}
          </button>
        </div>

        {/* Collapsible explainer — uses live data from both panels */}
        <RubricExplainer dims={dims} bands={bands} />
      </div>
    </>
  );
}
