import React from "react";
import Icon from "../components/Icon";
import { Sparkline } from "../components/Shared";
import { STAGES, avBg, initials, fmt$ } from "../data";
import NewOpportunityPanel from "../components/NewOpportunity";
import AccountDetailPanel from "../components/AccountDetailPanel";
import OpportunityDetailPanel from "./OpportunityDetailPanel";
import { baseUrl, apiFetch } from "../utils/utils";
import { getToken } from "../../services/api";
import { createPortal } from "react-dom";

// ─── API types ────────────────────────────────────────────────────────────────
interface ApiOpportunity {
  partitionKey: string;
  rowKey: string;
  timestamp: string;
  workspaceName: string;
  currentPhase: string;
  status: string;
  workspaceType: string;
  stage: string;
  accountId: string;
  ownerId: string | null;
  dealType: string;
  dealValue: number | null;
  billingModel: string;
  currencyCode: string;
  panchashaktiScore: number;
  arthaScore: number;
  layaScore: number;
  kriyaScore: number;
  gatiScore: number;
  rasaScore: number;
  opportunityHealth: number;
  readinessScore: number;
  engagementScore: number;
  stageEnteredAt: string;
  lastTouchAt: string;
  qualifyDays: number | null;
  shapingDays: number | null;
  developmentDays: number | null;
  closingDays: number | null;
  totalCycleDays: number | null;
  isDeleted: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
}

// ─── Internal opportunity shape used by views ────────────────────────────────
interface Opportunity {
  id: string;
  name: string;
  accountId: string;
  stage: string;
  phase: string;
  heat: "hot" | "warm" | "cool";
  value: number;
  cycle: number;
  lastTouch: string;
  intent: string;
  signals: number[];
  status: string;
  dealType: string;
  panchashaktiScore: number;
  health: number;
}

// ─── Auth headers ─────────────────────────────────────────────────────────────
function authHeaders(): Record<string, string> {
  const token = getToken();
  return {
    accept: "*/*",
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ─── Relative time helper ─────────────────────────────────────────────────────
function relativeTime(iso: string): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    const diffMs = Date.now() - d.getTime();
    const mins = Math.floor(diffMs / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return "yesterday";
    if (days < 30) return `${days}d ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return iso;
  }
}

// ─── Days since a date ────────────────────────────────────────────────────────
function daysSince(iso: string | null): number {
  if (!iso) return 0;
  try {
    return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  } catch {
    return 0;
  }
}

// ─── Heat from scores ─────────────────────────────────────────────────────────
function heatFromScores(
  health: number,
  panchashakti: number,
): "hot" | "warm" | "cool" {
  const score = health > 0 ? health : panchashakti;
  if (score >= 70) return "hot";
  if (score >= 35) return "warm";
  return "cool";
}

function normaliseStage(raw: string): string {
  if (!raw) return "prospect";
  const s = raw.toLowerCase().trim();
  const map: Record<string, string> = {
    prospect: "prospect",
    qualification: "qualify",
    qualify: "qualify",
    shaping: "shaping",
    shape: "shaping",
    development: "development",
    develop: "development",
    closing: "closing",
    close: "closing",
    active: "active",
    qualified: "qualified",
    renewal: "renewal",
    closed: "closed",
  };
  return map[s] ?? s;
}

// ─── Map API → internal Opportunity ──────────────────────────────────────────
function mapOpportunity(o: ApiOpportunity): Opportunity {
  const cycle =
    (o.totalCycleDays ??
      (o.qualifyDays ?? 0) +
        (o.shapingDays ?? 0) +
        (o.developmentDays ?? 0) +
        (o.closingDays ?? 0)) ||
    daysSince(o.stageEnteredAt);

  const health = o.opportunityHealth ?? 0;
  const pScore = o.panchashaktiScore ?? 0;

  const seed = health > 0 ? health : pScore;
  const signals = Array.from({ length: 14 }, (_, i) =>
    Math.max(
      1,
      Math.round(
        (seed / 100) * 9 * (0.55 + 0.45 * Math.sin(i * 0.85 + seed * 0.1)),
      ),
    ),
  );

  return {
    id: o.rowKey,
    name: o.workspaceName,
    accountId: o.accountId,
    stage: normaliseStage(o.currentPhase ?? o.stage),
    phase: o.currentPhase,
    heat: heatFromScores(health, pScore),
    value: o.dealValue ?? 0,
    cycle,
    lastTouch: relativeTime(o.lastTouchAt),
    intent: o.dealType?.replace(/([A-Z])/g, " $1").trim() ?? "—",
    signals,
    status: o.status,
    dealType: o.dealType ?? "—",
    panchashaktiScore: pScore,
    health,
  };
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const constStyles = `
@keyframes slideInRight{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes bdIn{from{opacity:0}to{opacity:1}}
.cv{flex:1;display:flex;flex-direction:column;overflow:hidden;min-height:0;height:100%;background:var(--bg,#ffffff)}
.cv-hdr{padding:14px 24px 12px;background:var(--bg2,#f8fafc);border-bottom:0.5px solid var(--brd,#e2e8f0);display:flex;align-items:center;gap:12px;flex-shrink:0;flex-wrap:wrap;min-width:0}
.cv-hdr-h{font-family:"Sora",sans-serif;font-size:18px;font-weight:600;letter-spacing:-0.02em;color:var(--ink);white-space:nowrap;flex-shrink:0}
.cv-hdr-meta{font-family:"DM Mono",monospace;font-size:11px;color:var(--ink5);padding:2px 8px;border-radius:6px;background:var(--bg3);border:0.5px solid var(--brd);white-space:nowrap;flex-shrink:0}
.cv-toggle{display:flex;align-items:center;background:var(--bg3);border:0.5px solid var(--brd2);border-radius:9px;padding:2px;gap:2px;margin-left:14px;flex-shrink:0}
.cv-toggle-it{height:24px;padding:0 10px;border-radius:7px;font-size:11px;cursor:pointer;display:flex;align-items:center;gap:5px;color:var(--ink4);font-weight:500;border:0;background:transparent;font-family:inherit}
.cv-toggle-it:hover{color:var(--ink)}
.cv-toggle-it.on{background:var(--bg2);color:var(--p);box-shadow:var(--sh-s);font-weight:600}
.cv-tools{margin-left:auto;display:flex;align-items:center;gap:7px;flex-wrap:wrap;flex-shrink:1;min-width:0}
.cv-axisbtn{display:flex;align-items:center;gap:5px;font-size:11px;color:var(--ink4);padding:4px 8px;border:0.5px solid var(--brd2);border-radius:7px;background:var(--bg2);cursor:pointer;font-family:inherit}
.cv-axisbtn:hover{color:var(--p);border-color:var(--brd3)}
/* list-view toolbar */
.cv-list-bar{display:flex;align-items:center;gap:7px;flex-wrap:wrap}
.cv-srch-wrap{position:relative;display:flex;align-items:center}
.cv-srch-wrap .ic{position:absolute;left:9px;display:flex;align-items:center;color:var(--ink5);pointer-events:none}
.cv-srch{height:30px;padding:0 12px 0 30px;border-radius:8px;border:0.5px solid var(--brd2);background:var(--bg3);font-size:12px;color:var(--ink);font-family:inherit;outline:none;width:210px;max-width:100%;min-width:120px;transition:border-color .12s,background .12s}
.cv-srch:focus{border-color:var(--p);background:var(--bg2)}
.cv-srch::placeholder{color:var(--ink5)}

/* Constellation canvas */
.cv-canvas-full{flex:1;min-height:0;position:relative;overflow:hidden;
  background:
    linear-gradient(rgba(75,72,200,0.025) 1px,transparent 1px) 0 0/100% 24px,
    linear-gradient(90deg,rgba(75,72,200,0.025) 1px,transparent 1px) 0 0/60px 100%,
    radial-gradient(circle at 30% 20%,rgba(75,72,200,0.04),transparent 60%),
    radial-gradient(circle at 80% 70%,rgba(29,196,160,0.04),transparent 50%);
  background-color:var(--bg)}
.cv-stage-row{position:absolute;left:0;right:0;height:1px;background:var(--brd)}
.cv-stage-lbl{position:absolute;left:18px;font-size:9.5px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--ink5);background:var(--bg);padding:2px 8px;border-radius:6px;border:0.5px solid var(--brd);font-family:"DM Sans",sans-serif;transform:translateY(-50%);z-index:2}
.cv-stage-rail{position:absolute;left:0;width:4px;border-radius:0 2px 2px 0}
.cv-axis-x{position:absolute;left:0;right:0;bottom:0;height:30px;border-top:0.5px solid var(--brd);background:var(--bg2);display:flex;align-items:center;justify-content:space-between;padding:0 110px;font-family:"DM Mono",monospace;font-size:10px;color:var(--ink5);letter-spacing:0.04em}
.cv-deal{position:absolute;transform:translate(-50%,-50%);cursor:pointer;transition:transform .15s ease-out;animation:fade-up .3s ease-out backwards}
.cv-deal:hover{transform:translate(-50%,-50%) scale(1.06);z-index:5}
.cv-deal.on{z-index:10}
.cv-deal-orb{border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:700;font-family:"Sora",sans-serif;position:relative;overflow:hidden}
.cv-deal-orb::after{content:"";position:absolute;inset:0;border-radius:50%;background:linear-gradient(135deg,rgba(255,255,255,0.30),transparent 60%);pointer-events:none}
.cv-deal-orb.hot{background:radial-gradient(circle at 35% 30%,#FF6F87 0%,#E5566C 50%,#B83045 100%);box-shadow:0 0 0 1.5px rgba(229,86,108,0.30),0 4px 14px rgba(229,86,108,0.30)}
.cv-deal-orb.warm{background:radial-gradient(circle at 35% 30%,#EFA177 0%,#D97757 60%,#A04E2A 100%);box-shadow:0 0 0 1.5px rgba(217,119,87,0.28),0 4px 14px rgba(217,119,87,0.26)}
.cv-deal-orb.cool{background:radial-gradient(circle at 35% 30%,#7B9FE8 0%,#4B6FDB 60%,#2E48A0 100%);box-shadow:0 0 0 1.5px rgba(63,117,220,0.25),0 4px 12px rgba(63,117,220,0.22)}
.cv-deal-label{position:absolute;left:50%;top:calc(100% + 6px);transform:translateX(-50%);font-family:"Sora",sans-serif;font-size:11px;font-weight:600;color:var(--ink2);white-space:nowrap;letter-spacing:-0.01em;pointer-events:none;opacity:0;transition:opacity .12s}
.cv-deal:hover .cv-deal-label,.cv-deal.on .cv-deal-label{opacity:1}
.cv-deal-amt{position:absolute;left:50%;bottom:calc(100% + 6px);transform:translateX(-50%);font-family:"DM Mono",monospace;font-size:10px;color:var(--ink4);white-space:nowrap;pointer-events:none;font-weight:500;opacity:0;transition:opacity .12s}
.cv-deal:hover .cv-deal-amt,.cv-deal.on .cv-deal-amt{opacity:1}
.cv-float-legend{position:absolute;left:14px;bottom:42px;background:var(--bg2);border:0.5px solid var(--brd2);border-radius:12px;padding:10px 13px;box-shadow:var(--sh-m,0 4px 24px rgba(0,0,0,0.12));z-index:20;min-width:220px}
.cv-float-legend-h{font-size:9px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--ink5);margin-bottom:8px}
.cv-leg-row{display:flex;align-items:center;gap:8px;font-size:11px;color:var(--ink2);margin-bottom:5px}
.cv-leg-row:last-child{margin-bottom:0}
.cv-leg-row .o{width:12px;height:12px;border-radius:50%;flex-shrink:0;box-shadow:0 1px 2px rgba(0,0,0,0.08)}
.cv-float-inspector{position:absolute;right:14px;top:14px;bottom:42px;width:288px;background:var(--bg2);border:0.5px solid var(--brd2);border-radius:14px;box-shadow:var(--sh-m,0 4px 24px rgba(0,0,0,0.14));z-index:20;overflow-y:auto;display:flex;flex-direction:column;animation:inspector-in .2s ease-out}
@keyframes inspector-in{from{opacity:0;transform:translateX(12px)}to{opacity:1;transform:translateX(0)}}
.cv-float-inspector-head{padding:13px 14px 12px;border-bottom:0.5px solid var(--brd);display:flex;gap:10px;align-items:center;flex-shrink:0}
.cv-float-inspector-close{margin-left:auto;width:22px;height:22px;display:flex;align-items:center;justify-content:center;border-radius:6px;background:transparent;border:0;cursor:pointer;color:var(--ink5);font-size:14px;line-height:1}
.cv-float-inspector-close:hover{background:var(--bg3);color:var(--ink)}
.cv-card-h{font-family:"Sora",sans-serif;font-size:14px;font-weight:600;letter-spacing:-0.015em;color:var(--ink)}
.cv-kv{display:flex;align-items:center;gap:8px;font-size:11.5px;padding:5px 0;border-bottom:0.5px solid var(--brd)}
.cv-kv:last-child{border-bottom:0}
.cv-kv-l{color:var(--ink5);min-width:80px}
.cv-kv-v{color:var(--ink);font-weight:500}
.cv-hint{position:absolute;left:50%;top:14px;transform:translateX(-50%);background:var(--pu,rgba(99,102,241,0.08));border:0.5px solid var(--brd2);border-radius:10px;padding:8px 14px;font-size:11.5px;color:var(--ink2);display:flex;gap:8px;align-items:center;z-index:15;white-space:nowrap;box-shadow:var(--sh-s)}
.cv-hint-ic{color:var(--p);flex-shrink:0}

/* Kanban */
.kb-wrap{flex:1;display:flex;flex-direction:column;overflow:hidden;background:var(--bg,#f8fafc);height:100%}

.kb-scroll{flex:1;overflow:hidden;padding:16px 20px 20px;width:100%;box-sizing:border-box;display:flex;flex-direction:column}
.kb-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:13px;flex:1;min-height:0;width:100%;box-sizing:border-box}
.kb-col{display:flex;flex-direction:column;min-width:0;border-radius:14px;background:rgba(255,255,255,0.78);border:1px solid rgba(0,0,0,0.06);overflow:hidden;transition:box-shadow .2s,opacity .2s,border-color .2s;box-shadow:0 1px 4px rgba(15,23,42,0.05)}
.kb-col.can-drop{box-shadow:0 0 0 1.5px rgba(99,102,241,0.35),0 6px 24px rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.20)}
.kb-col.no-drop{opacity:0.38;filter:saturate(0.45)}
.kb-col-head{display:flex;align-items:center;gap:8px;padding:11px 13px 10px;border-bottom:1px solid rgba(0,0,0,0.055);background:rgba(255,255,255,0.88);position:relative}
.kb-col-head::after{content:'';position:absolute;left:0;top:0;right:0;height:2.5px;background:var(--col-accent,#94a3b8);border-radius:0 0 2px 2px;opacity:.88}
.kb-col-dot{width:7px;height:7px;border-radius:50%;background:var(--col-accent,#94a3b8);flex-shrink:0;box-shadow:0 0 0 2.5px var(--col-dot-ring,rgba(148,163,184,0.18))}
.kb-col-title{font-size:10.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#334155;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.kb-col-count{font-size:10px;font-weight:600;color:var(--col-accent,#94a3b8);background:var(--col-badge-bg,rgba(148,163,184,.10));border:1px solid var(--col-badge-brd,rgba(148,163,184,.28));border-radius:20px;padding:1.5px 8px;font-family:"DM Mono",monospace;flex-shrink:0}
.kb-col-sum{font-size:9.5px;font-family:"DM Mono",monospace;color:var(--ink5);flex-shrink:0;margin-left:2px}
.kb-cards{flex:1;padding:9px 8px 11px;display:flex;flex-direction:column;gap:7px;overflow-y:auto;min-height:0;transition:background .2s;position:relative}
.kb-cards.drop-active{background:rgba(99,102,241,0.045);border-radius:0 0 12px 12px}
.kb-drop-indicator{display:none;align-items:center;justify-content:center;border:1.5px dashed rgba(99,102,241,.42);border-radius:9px;height:50px;color:rgba(99,102,241,.7);font-size:10.5px;font-weight:500;gap:5px;animation:pulse-drop 1.4s ease-in-out infinite;background:rgba(99,102,241,.025);flex-shrink:0}
.kb-cards.drop-active .kb-drop-indicator{display:flex}
@keyframes pulse-drop{0%,100%{opacity:.5;border-color:rgba(99,102,241,.28)}50%{opacity:1;border-color:rgba(99,102,241,.65)}}
.kb-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:6px 8px;opacity:.3;user-select:none}
.kb-empty-icon{width:26px;height:26px;border:1.5px dashed #cbd5e1;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#94a3b8}
.kb-empty-txt{font-size:10.5px;color:#94a3b8;font-family:"DM Mono",monospace;letter-spacing:.02em}
.kb-card{background:#fff;border:1px solid rgba(15,23,42,0.07);border-radius:10px;padding:11px 12px 10px;cursor:pointer;user-select:none;transition:box-shadow .15s,transform .15s,border-color .15s,opacity .15s;position:relative;box-shadow:0 1px 3px rgba(15,23,42,0.07);animation:card-in .22s ease both}
@keyframes card-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
.kb-card:hover{box-shadow:0 8px 24px rgba(15,23,42,0.10);transform:translateY(-2px);border-color:rgba(15,23,42,0.11)}
.kb-card.on{border-color:rgba(99,102,241,.36);box-shadow:0 0 0 2px rgba(99,102,241,.22),0 4px 16px rgba(99,102,241,.12);background:rgba(99,102,241,.013)}
.kb-card.on::before{content:'';position:absolute;left:-1px;top:50%;transform:translateY(-50%);width:3px;height:32px;background:#6366f1;border-radius:0 3px 3px 0;opacity:.8}
.kb-card.dragging{opacity:.25;transform:scale(0.95) rotate(-.5deg);box-shadow:none}
.kb-drag-handle{position:absolute;top:9px;right:9px;display:flex;flex-direction:column;gap:2.5px;opacity:0;transition:opacity .15s;cursor:grab;padding:2px}
.kb-drag-handle span{display:block;width:12px;height:1.5px;background:#cbd5e1;border-radius:99px}
.kb-card:hover .kb-drag-handle{opacity:1}
.kb-card-name{font-size:12.5px;font-weight:600;color:#0f172a;margin-bottom:3px;padding-right:18px;line-height:1.35;letter-spacing:-.01em}
.kb-card-intent{font-size:11px;color:#94a3b8;line-height:1.5;margin-bottom:9px}
.kb-card-foot{display:flex;align-items:center;gap:7px}
.kb-card-arr{font-size:12px;font-weight:600;font-family:"DM Mono",monospace;color:#475569}
.kb-card-spark{margin-left:auto}
.kb-card-heat{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.kb-card-heat.hot{background:#E5566C;box-shadow:0 0 0 2px rgba(229,86,108,.2)}
.kb-card-heat.warm{background:#D97757;box-shadow:0 0 0 2px rgba(217,119,87,.2)}
.kb-card-heat.cool{background:#4B6FDB;box-shadow:0 0 0 2px rgba(75,111,219,.2)}

/* Stage chips */
.stage-chip{display:inline-flex;align-items:center;padding:3px 9px;border-radius:6px;font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;line-height:1.4;white-space:nowrap}
.stage-chip.prospect{background:#fef9e0;color:#9a7c0a;border:0.5px solid #e8d87a}
.stage-chip.qualify{background:#fef9e0;color:#9a7c0a;border:0.5px solid #e8d87a}
.stage-chip.qualified{background:#ddeeff;color:#1a5fa8;border:0.5px solid #90c4f5}
.stage-chip.shaping{background:#ddeeff;color:#1a5fa8;border:0.5px solid #90c4f5}
.stage-chip.development{background:#ede8fe;color:#6b3ec7;border:0.5px solid #c4aafc}
.stage-chip.closing{background:#d6f5e8;color:#1a7a4a;border:0.5px solid #7adbb0}
.stage-chip.active{background:#d6f5e8;color:#1a7a4a;border:0.5px solid #7adbb0}
.stage-chip.renewal{background:#e8f4fd;color:#1565c0;border:0.5px solid #90caf9}
.stage-chip.closed{background:#f0f0f0;color:#666;border:0.5px solid #ccc}

/* Heat */
.heat-bub{display:inline-flex;align-items:center;gap:5px;padding:3px 10px 3px 8px;border-radius:999px;font-size:11.5px;font-weight:600;line-height:1;white-space:nowrap}
.heat-bub.heat-hot{background:#fde8e8;color:#c0392b}
.heat-bub.heat-warm{background:#fef0e0;color:#b7621a}
.heat-bub.heat-cool{background:#e8f0fe;color:#3b5bdb}
.heat-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;display:inline-block}
.heat-dot.hot{background:#e74c3c}
.heat-dot.warm{background:#e67e22}
.heat-dot.cool{background:#4c6ef5}

/* Skeleton */
.cv-sk{border-radius:5px;background:var(--bg3);animation:cv-sk-pulse 1.4s ease-in-out infinite}
@keyframes cv-sk-pulse{0%,100%{opacity:.45}50%{opacity:.9}}

/* Scrollbar */
.kb-scroll::-webkit-scrollbar,.kb-cards::-webkit-scrollbar{width:4px;height:4px}
.kb-scroll::-webkit-scrollbar-thumb,.kb-cards::-webkit-scrollbar-thumb{background:rgba(0,0,0,.10);border-radius:99px}
.kb-scroll::-webkit-scrollbar-track,.kb-cards::-webkit-scrollbar-track{background:transparent}
@keyframes fade-up{from{opacity:0;transform:translate(-50%,-46%)}to{opacity:1;transform:translate(-50%,-50%)}}

/* smm styles are injected by StageMoveModal itself via a portal <style> tag */
`;

// ─── Kanban skeleton ──────────────────────────────────────────────────────────
const KanbanSkeleton: React.FC = () => (
  <div className="kb-wrap">
    <div className="kb-scroll">
      <div className="kb-cols">
        {[0, 1, 2, 3].map((ci) => (
          <div key={ci} className="kb-col" style={{ opacity: 0.6 }}>
            <div className="kb-col-head">
              <span
                className="cv-sk"
                style={{ width: 7, height: 7, borderRadius: "50%" }}
              />
              <span
                className="cv-sk"
                style={{ width: 80, height: 10, flex: 1 }}
              />
              <span
                className="cv-sk"
                style={{ width: 24, height: 16, borderRadius: 20 }}
              />
            </div>
            <div className="kb-cards">
              {[0, 1, 2].map((i) => (
                <div key={i} className="kb-card" style={{ cursor: "default" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      marginBottom: 8,
                    }}
                  >
                    <span
                      className="cv-sk"
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 6,
                        flexShrink: 0,
                      }}
                    />
                    <span className="cv-sk" style={{ flex: 1, height: 11 }} />
                  </div>
                  <span
                    className="cv-sk"
                    style={{
                      width: "70%",
                      height: 9,
                      display: "block",
                      marginBottom: 10,
                    }}
                  />
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 7 }}
                  >
                    <span className="cv-sk" style={{ width: 52, height: 11 }} />
                    <span
                      className="cv-sk"
                      style={{ marginLeft: "auto", width: 50, height: 14 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Stage Move Modal styles (self-contained, injected via portal) ─────────────
const SMM_CSS = `
.smm-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;}
.smm-backdrop{position:absolute;inset:0;background:rgba(10,12,20,0.52);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);animation:bdIn 0.15s ease;}
.smm-card{position:relative;z-index:1;width:100%;max-width:448px;background:var(--bg2,#ffffff);border:1px solid var(--brd,#e5e8ef);border-radius:14px;box-shadow:0 0 0 1px rgba(0,0,0,0.04),0 8px 24px -4px rgba(0,0,0,0.12),0 32px 64px -8px rgba(0,0,0,0.10);overflow:hidden;animation:smm-slide-up 0.2s cubic-bezier(0.22,1,0.36,1);}
.smm-header{padding:22px 24px 0;}
.smm-eyebrow{font-size:10.5px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--p,#6366f1);margin-bottom:4px;}
.smm-title{margin:0;font-size:17px;font-weight:700;color:var(--ink,#0f1117);letter-spacing:-0.02em;line-height:1.3;}
.smm-meta{padding:14px 24px 0;display:flex;flex-direction:column;gap:10px;}
.smm-opp-name{font-size:13.5px;font-weight:600;color:var(--ink,#0f1117);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.smm-stage-row{display:flex;align-items:center;gap:8px;}
.smm-chip{display:inline-flex;align-items:center;padding:3px 10px 3px 8px;border-radius:6px;font-size:11.5px;font-weight:600;letter-spacing:0.01em;border:1px solid transparent;}
.smm-chip--from{opacity:0.72;}
.smm-chip--prospect,.smm-chip--qualify{background:#fef9e0;color:#9a7c0a;border-color:#e8d87a;}
.smm-chip--qualified,.smm-chip--shaping{background:#ddeeff;color:#1a5fa8;border-color:#90c4f5;}
.smm-chip--development{background:#ede8fe;color:#6b3ec7;border-color:#c4aafc;}
.smm-chip--closing,.smm-chip--active{background:#d6f5e8;color:#1a7a4a;border-color:#7adbb0;}
.smm-chip--renewal{background:#e8f4fd;color:#1565c0;border-color:#90caf9;}
.smm-chip--closed{background:#f0f0f0;color:#666;border-color:#ccc;}
.smm-arrow-track{color:var(--ink5,#9399a8);display:flex;align-items:center;flex-shrink:0;}
.smm-divider{height:1px;background:var(--brd,#e5e8ef);margin:18px 0 0;}
.smm-field{padding:18px 24px 0;display:flex;flex-direction:column;gap:6px;}
.smm-label{display:flex;align-items:baseline;gap:6px;font-size:12px;font-weight:600;color:var(--ink,#0f1117);letter-spacing:0.01em;}
.smm-label-hint{font-size:11px;font-weight:400;color:var(--ink5,#9399a8);}
.smm-textarea{width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid var(--brd,#e5e8ef);border-radius:8px;background:var(--bg3,#f8f9fb);font-size:13px;line-height:1.55;color:var(--ink,#0f1117);resize:vertical;min-height:96px;transition:border-color .15s,box-shadow .15s;font-family:inherit;outline:none;}
.smm-textarea::placeholder{color:var(--ink5,#b2b8c8);}
.smm-textarea:focus{border-color:var(--p,#6366f1);box-shadow:0 0 0 3px rgba(99,102,241,0.12);background:var(--bg2,#ffffff);}
.smm-textarea:disabled{opacity:0.5;cursor:not-allowed;}
.smm-char-count{font-size:11px;color:var(--ink5,#9399a8);text-align:right;margin-top:-2px;}
.smm-footer{padding:16px 24px 22px;display:flex;flex-direction:column;gap:12px;}
.smm-actions{display:flex;justify-content:flex-end;gap:8px;}
.smm-error{display:flex;align-items:center;gap:6px;font-size:12px;color:#be123c;background:#fff1f2;border:1px solid #fecdd3;border-radius:6px;padding:7px 11px;}
.smm-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:36px;padding:0 16px;border-radius:8px;font-size:13px;font-weight:600;letter-spacing:-0.01em;cursor:pointer;transition:background .13s,box-shadow .13s,opacity .13s,transform .1s;border:none;outline:none;font-family:inherit;}
.smm-btn:disabled{opacity:0.48;cursor:not-allowed;pointer-events:none;}
.smm-btn--ghost{background:transparent;color:var(--ink4,#6b7280);border:1px solid var(--brd,#e5e8ef);min-width:80px;}
.smm-btn--ghost:hover:not(:disabled){background:var(--bg3,#f3f4f6);border-color:#d1d5db;}
.smm-btn--primary{background:var(--p,#6366f1);color:#ffffff;min-width:130px;box-shadow:0 1px 2px rgba(99,102,241,0.18),0 4px 12px rgba(99,102,241,0.22);}
.smm-btn--primary:hover:not(:disabled){filter:brightness(0.92);box-shadow:0 1px 2px rgba(99,102,241,0.24),0 6px 16px rgba(99,102,241,0.28);}
.smm-btn--primary:active:not(:disabled){transform:translateY(1px);}
.smm-spinner{animation:smm-spin 0.7s linear infinite;}
@keyframes smm-slide-up{from{opacity:0;transform:translateY(12px) scale(0.98);}to{opacity:1;transform:translateY(0) scale(1);}}
@keyframes smm-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@media(prefers-reduced-motion:reduce){.smm-backdrop,.smm-card{animation:none;}}
`;

// ─── Stage Move Modal ─────────────────────────────────────────────────────────
interface StageMoveModalProps {
  opportunity: Opportunity;
  fromStage: string;
  toStage: string;
  onConfirm: (notes: string) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
  error: string | null;
}

const StageMoveModal: React.FC<StageMoveModalProps> = ({
  opportunity,
  fromStage,
  toStage,
  onConfirm,
  onCancel,
  loading,
  error,
}) => {
  const [notes, setNotes] = React.useState("");

  const fromLabel = STAGES.find((s) => s.id === fromStage)?.name ?? fromStage;
  const toLabel = STAGES.find((s) => s.id === toStage)?.name ?? toStage;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && !loading) onCancel();
  };

  return createPortal(
    <>
      <style>{SMM_CSS}</style>
      <div className="smm-overlay" onKeyDown={handleKeyDown} tabIndex={-1}>
        {/* Backdrop – click outside to cancel */}
        <div
          className="smm-backdrop"
          onClick={!loading ? onCancel : undefined}
        />

        <div
          className="smm-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="smm-title"
        >
          {/* ── Header ── */}
          <div className="smm-header">
            <div className="smm-eyebrow">Stage transition</div>
            <h2 className="smm-title" id="smm-title">
              Move opportunity
            </h2>
          </div>

          {/* ── Opportunity + stage strip ── */}
          <div className="smm-meta">
            <span className="smm-opp-name">{opportunity.name}</span>
            <div className="smm-stage-row">
              <span
                className={`smm-chip smm-chip--from smm-chip--${fromStage}`}
              >
                {fromLabel}
              </span>
              <span className="smm-arrow-track">
                <svg
                  width="28"
                  height="10"
                  viewBox="0 0 28 10"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 5h22M19 1l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className={`smm-chip smm-chip--to smm-chip--${toStage}`}>
                {toLabel}
              </span>
            </div>
          </div>

          <div className="smm-divider" />

          {/* ── Notes ── */}
          <div className="smm-field">
            <label className="smm-label" htmlFor="smm-notes">
              Notes
            </label>
            <textarea
              id="smm-notes"
              className="smm-textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={`Why is ${opportunity.name} moving to ${toLabel}? Add context, next steps, or conditions…`}
              disabled={loading}
              autoFocus
              rows={4}
              maxLength={500}
            />
            <div className="smm-char-count">{notes.length} / 500</div>
          </div>

          {/* ── Footer ── */}
          <div className="smm-footer">
            {error && (
              <div className="smm-error" role="alert">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="6" cy="6" r="5.5" stroke="currentColor" />
                  <path
                    d="M6 3.5v3M6 8v.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                {error}
              </div>
            )}
            <div className="smm-actions">
              <button
                className="smm-btn smm-btn--ghost"
                onClick={onCancel}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="smm-btn smm-btn--primary"
                onClick={() => onConfirm(notes)}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="smm-spinner"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray="31.4"
                        strokeDashoffset="10"
                        strokeLinecap="round"
                      />
                    </svg>
                    Moving…
                  </>
                ) : (
                  <>
                    Confirm move
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

// ─── Kanban board ─────────────────────────────────────────────────────────────
const KanbanBoard: React.FC<{
  opportunities: Opportunity[];
  onSelect: (id: string) => void;
}> = ({ opportunities, onSelect }) => {
  const colAccents = [
    {
      dot: "#9CA3AF",
      badge: "rgba(156,163,175,0.12)",
      brd: "rgba(156,163,175,0.35)",
    },
    {
      dot: "#0369A1",
      badge: "rgba(37,99,235,0.12)",
      brd: "rgba(37,99,235,0.35)",
    },
    {
      dot: "#4F46E5",
      badge: "rgba(79,70,229,0.12)",
      brd: "rgba(79,70,229,0.35)",
    },
    {
      dot: "#D97706",
      badge: "rgba(217,119,6,0.12)",
      brd: "rgba(217,119,6,0.35)",
    },
    {
      dot: "#0891B2",
      badge: "rgba(8,145,178,0.12)",
      brd: "rgba(8,145,178,0.35)",
    },
    {
      dot: "#16A34A",
      badge: "rgba(22,163,74,0.12)",
      brd: "rgba(22,163,74,0.35)",
    },
  ];

  const buildCols = () =>
    STAGES.map((st) => ({
      stageId: st.id,
      title: st.name,
      color: st.color,
      items: opportunities.filter((o) => o.stage === st.id),
    }));

  const [cols, setCols] = React.useState(buildCols);
  const [sel, setSel] = React.useState<string | null>(null);
  const [dragging, setDragging] = React.useState<{
    colIdx: number;
    cardIdx: number;
  } | null>(null);
  const [dragOverCol, setDragOverCol] = React.useState<number | null>(null);

  // ── Move-modal state ──────────────────────────────────────────────────────
  const [pendingMove, setPendingMove] = React.useState<{
    srcCi: number;
    ki: number;
    targetCi: number;
    opp: Opportunity;
    fromStage: string;
    toStage: string;
  } | null>(null);
  const [moveLoading, setMoveLoading] = React.useState(false);
  const [moveError, setMoveError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setCols(buildCols());
  }, [opportunities]);

  // ── Drag handlers ─────────────────────────────────────────────────────────
  const handleDragStart = (e: React.DragEvent, ci: number, ki: number) => {
    setDragging({ colIdx: ci, cardIdx: ki });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", JSON.stringify({ ci, ki }));
    setTimeout(() => (e.target as HTMLElement).classList.add("dragging"), 0);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    (e.target as HTMLElement).classList.remove("dragging");
    setDragging(null);
    setDragOverCol(null);
  };

  const handleDragOver = (e: React.DragEvent, ci: number) => {
    if (dragging && ci > dragging.colIdx) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setDragOverCol(ci);
    } else {
      e.dataTransfer.dropEffect = "none";
      setDragOverCol(null);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node))
      setDragOverCol(null);
  };

  // Drop → open confirmation modal
  const handleDrop = (e: React.DragEvent, targetCi: number) => {
    e.preventDefault();
    setDragOverCol(null);
    setDragging(null);
    const { ci: srcCi, ki } = JSON.parse(e.dataTransfer.getData("text/plain"));
    if (targetCi <= srcCi) return;

    const opp = cols[srcCi].items[ki];
    setMoveError(null);
    setPendingMove({
      srcCi,
      ki,
      targetCi,
      opp,
      fromStage: cols[srcCi].stageId,
      toStage: cols[targetCi].stageId,
    });
  };

  // Confirm modal → PATCH API → optimistic board update
  const handleConfirmMove = async (notes: string) => {
    if (!pendingMove) return;
    const { srcCi, ki, targetCi, opp, toStage } = pendingMove;
    const newPhase = STAGES.find((s) => s.id === toStage)?.name ?? toStage;

    setMoveLoading(true);
    setMoveError(null);

    try {
      const res = await apiFetch(`${baseUrl()}/opportunities/${opp.id}/move`, {
        method: "PATCH",
        headers: { ...authHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ newPhase, notes }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
      }

      const next = cols.map((c) => ({ ...c, items: [...c.items] }));
      const [moved] = next[srcCi].items.splice(ki, 1);
      moved.stage = toStage;
      moved.phase = newPhase;
      next[targetCi].items.push(moved);
      setCols(next);
      setPendingMove(null);
    } catch (err: any) {
      setMoveError(err?.message ?? "Move failed. Please try again.");
    } finally {
      setMoveLoading(false);
    }
  };

  const isDragging = dragging !== null;

  return (
    <>
      {pendingMove && (
        <StageMoveModal
          opportunity={pendingMove.opp}
          fromStage={pendingMove.fromStage}
          toStage={pendingMove.toStage}
          onConfirm={handleConfirmMove}
          onCancel={() => {
            setPendingMove(null);
            setMoveError(null);
          }}
          loading={moveLoading}
          error={moveError}
        />
      )}

      <div className="kb-wrap">
        <div className="kb-scroll">
          <div className="kb-cols">
            {cols.map((col, ci) => {
              const accent = colAccents[ci % colAccents.length];
              const isOver = dragOverCol === ci;
              const canDrop = isDragging && ci > dragging!.colIdx;
              const noDrop = isDragging && ci <= dragging!.colIdx;
              const sum = col.items.reduce((s, o) => s + o.value, 0);

              return (
                <div
                  key={col.stageId}
                  className={`kb-col${canDrop ? " can-drop" : ""}${noDrop ? " no-drop" : ""}`}
                  style={
                    {
                      "--col-accent": accent.dot,
                      "--col-badge-bg": accent.badge,
                      "--col-badge-brd": accent.brd,
                      "--col-dot-ring": accent.badge,
                    } as React.CSSProperties
                  }
                >
                  <div className="kb-col-head">
                    <div className="kb-col-dot" />
                    <div className="kb-col-title">{col.title}</div>
                    <div className="kb-col-count">{col.items.length}</div>
                    <div className="kb-col-sum">{sum > 0 ? fmt$(sum) : ""}</div>
                  </div>

                  <div
                    className={`kb-cards${isOver && canDrop ? " drop-active" : ""}`}
                    onDrop={(e) => handleDrop(e, ci)}
                    onDragOver={(e) => handleDragOver(e, ci)}
                    onDragLeave={handleDragLeave}
                  >
                    <div className="kb-drop-indicator">
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M6 1v10M1 6h10"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      Drop here
                    </div>

                    {col.items.length === 0 && !isOver && (
                      <div className="kb-empty">
                        <div className="kb-empty-icon">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M6 2v8M2 6h8"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <span className="kb-empty-txt">empty</span>
                      </div>
                    )}

                    {col.items.map((o, ki) => (
                      <div
                        key={o.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, ci, ki)}
                        onDragEnd={handleDragEnd}
                        className={`kb-card${sel === o.id ? " on" : ""}`}
                        onClick={() => {
                          setSel(sel === o.id ? null : o.id);
                          onSelect(o.id);
                        }}
                      >
                        <div className="kb-drag-handle" aria-hidden="true">
                          <span />
                          <span />
                          <span />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 7,
                            marginBottom: 4,
                          }}
                        >
                          <span
                            className={"av " + avBg(o.name)}
                            style={{
                              width: 22,
                              height: 22,
                              borderRadius: 6,
                              fontSize: 9,
                              flexShrink: 0,
                            }}
                          >
                            {initials(o.name)}
                          </span>
                          <div
                            className="kb-card-name"
                            style={{ marginBottom: 0, paddingRight: 0 }}
                          >
                            {o.name}
                          </div>
                          <div
                            className={`kb-card-heat ${o.heat}`}
                            style={{ marginLeft: "auto", flexShrink: 0 }}
                          />
                        </div>
                        <div className="kb-card-intent">{o.intent}</div>
                        <div className="kb-card-foot">
                          <span className="kb-card-arr">
                            {o.value > 0 ? (
                              fmt$(o.value)
                            ) : (
                              <span style={{ color: "var(--ink5)" }}>—</span>
                            )}
                          </span>
                          <span className="kb-card-spark">
                            <Sparkline
                              data={o.signals.slice(-7)}
                              width={50}
                              height={14}
                              color="var(--p)"
                            />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

// ─── Constellation full view ──────────────────────────────────────────────────
const ConstellationFull: React.FC<{
  opportunities: Opportunity[];
  onSelect: (id: string) => void;
}> = ({ opportunities, onSelect }) => {
  const [sel, setSel] = React.useState<string | null>(null);
  const selOpp = sel ? opportunities.find((o) => o.id === sel) : null;

  const positionFor = (o: Opportunity) => {
    const stageIdx = STAGES.findIndex((s) => s.id === o.stage);
    const idx = stageIdx >= 0 ? stageIdx : 0;
    const y = 10 + (idx / Math.max(STAGES.length - 1, 1)) * 78;
    const x = 8 + Math.min((o.cycle / 70) * 84, 84);
    return { x, y };
  };

  const sizeFor = (o: Opportunity) =>
    22 + Math.min(34, (o.value / 510000) * 34);

  return (
    <div className="cv-canvas-full">
      {STAGES.map((s, i) => {
        const y = 10 + (i / (STAGES.length - 1)) * 78;
        return (
          <React.Fragment key={s.id}>
            <div className="cv-stage-row" style={{ top: y + "%" }} />
            <div className="cv-stage-lbl" style={{ top: y + "%" }}>
              {s.name}
            </div>
            <div
              className="cv-stage-rail"
              style={{
                top: `calc(${y}% - 10px)`,
                height: "20px",
                background: s.color,
                opacity: 0.45,
              }}
            />
          </React.Fragment>
        );
      })}

      {opportunities.map((o, i) => {
        const { x, y } = positionFor(o);
        const size = sizeFor(o);
        return (
          <div
            key={o.id}
            className={"cv-deal" + (sel === o.id ? " on" : "")}
            style={{
              left: x + "%",
              top: y + "%",
              animationDelay: i * 30 + "ms",
            }}
            onClick={() => {
              setSel(sel === o.id ? null : o.id);
              onSelect(o.id);
            }}
          >
            <div
              className={"cv-deal-orb " + o.heat}
              style={{
                width: size,
                height: size,
                fontSize: Math.max(8, size * 0.28),
              }}
            >
              {initials(o.name)}
            </div>
            <div className="cv-deal-amt">
              {o.value > 0 ? fmt$(o.value) : ""}
            </div>
            <div className="cv-deal-label">{o.name}</div>
          </div>
        );
      })}

      <div className="cv-axis-x">
        <span>0d in stage</span>
        <span>30d</span>
        <span>60d</span>
        <span>90d+ (stale)</span>
      </div>

      {!sel && (
        <div className="cv-hint">
          <span className="cv-hint-ic">
            <Icon name="info" size={13} />
          </span>
          Vertical = stage · Horizontal = time-in-stage · Size = deal value ·
          Color = heat — tap an orb to inspect
        </div>
      )}

      <div className="cv-float-legend">
        <div className="cv-float-legend-h">Heat</div>
        <div className="cv-leg-row">
          <span
            className="o"
            style={{
              background:
                "radial-gradient(circle at 35% 30%,#FF6F87,#E5566C 60%,#B83045)",
            }}
          />
          Hot — active intent & momentum
        </div>
        <div className="cv-leg-row">
          <span
            className="o"
            style={{
              background:
                "radial-gradient(circle at 35% 30%,#EFA177,#D97757 60%,#A04E2A)",
            }}
          />
          Warm — engaged, steady
        </div>
        <div className="cv-leg-row">
          <span
            className="o"
            style={{
              background:
                "radial-gradient(circle at 35% 30%,#7B9FE8,#4B6FDB 60%,#2E48A0)",
            }}
          />
          Cool — quiet, may drift
        </div>
      </div>

      {selOpp && (
        <div className="cv-float-inspector">
          <div className="cv-float-inspector-head">
            <span
              className={"av " + avBg(selOpp.name)}
              style={{ width: 30, height: 30, borderRadius: 8, fontSize: 11 }}
            >
              {initials(selOpp.name)}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="cv-card-h">{selOpp.name}</div>
              <div
                className="mono"
                style={{ fontSize: 11, color: "var(--ink4)" }}
              >
                {selOpp.phase}
              </div>
            </div>
            <button
              className="cv-float-inspector-close"
              onClick={() => setSel(null)}
            >
              ×
            </button>
          </div>
          <div style={{ padding: "12px 14px", flex: 1 }}>
            <div className="cv-kv">
              <span className="cv-kv-l">Stage</span>
              <span className="cv-kv-v">
                <span className={"stage-chip " + selOpp.stage}>
                  {STAGES.find((s) => s.id === selOpp.stage)?.name ??
                    selOpp.phase}
                </span>
              </span>
            </div>
            <div className="cv-kv">
              <span className="cv-kv-l">Deal value</span>
              <span className="cv-kv-v num">
                {selOpp.value > 0 ? fmt$(selOpp.value) : "—"}
              </span>
            </div>
            <div className="cv-kv">
              <span className="cv-kv-l">Days in stage</span>
              <span className="cv-kv-v">
                {selOpp.cycle > 0 ? `${selOpp.cycle}d` : "—"}
              </span>
            </div>
            <div className="cv-kv">
              <span className="cv-kv-l">Heat</span>
              <span className="cv-kv-v">
                <span className={"heat-bub heat-" + selOpp.heat}>
                  <span className={"heat-dot " + selOpp.heat} />
                  {selOpp.heat === "hot"
                    ? "Hot"
                    : selOpp.heat === "warm"
                      ? "Warm"
                      : "Cool"}
                </span>
              </span>
            </div>
            <div className="cv-kv">
              <span className="cv-kv-l">Last touch</span>
              <span className="cv-kv-v">{selOpp.lastTouch}</span>
            </div>
            <div className="cv-kv">
              <span className="cv-kv-l">Deal type</span>
              <span className="cv-kv-v">{selOpp.intent}</span>
            </div>
            <div className="cv-kv">
              <span className="cv-kv-l">Health</span>
              <span className="cv-kv-v">{selOpp.health}</span>
            </div>
            <div className="cv-kv">
              <span className="cv-kv-l">Signals 14d</span>
              <span className="cv-kv-v">
                <Sparkline
                  data={selOpp.signals}
                  width={120}
                  height={18}
                  color="var(--p)"
                />
              </span>
            </div>
          </div>
          <div
            style={{
              padding: 12,
              borderTop: "0.5px solid var(--brd)",
              display: "flex",
              gap: 5,
              flexWrap: "wrap",
              flexShrink: 0,
            }}
          >
            <button className="btn sm pri">
              <Icon name="mail" size={12} /> Email
            </button>
            <button className="btn sm">
              <Icon name="calendar" size={12} /> Meeting
            </button>
            <button className="btn sm">
              <Icon name="sparkles" size={12} /> Plan next step
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── List view ────────────────────────────────────────────────────────────────
const ConstellationListView: React.FC<{
  opportunities: Opportunity[];
  onSelect: (id: string) => void;
}> = ({ opportunities, onSelect }) => (
  <div className="blv" style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
    <div className="card" style={{ overflow: "hidden", margin: 16 }}>
      <div style={{ overflowX: "auto" }}>
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}
        >
          <thead>
            <tr>
              {[
                "Opportunity",
                "Phase",
                "Deal value",
                "Heat",
                "Days in Stage",
                "Deal type",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "9px 14px",
                    color: "var(--ink5)",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: ".07em",
                    borderBottom: "0.5px solid var(--brd)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {opportunities.map((o) => (
              <tr
                key={o.id}
                style={{ cursor: "pointer" }}
                onClick={() => onSelect(o.id)}
              >
                <td
                  style={{
                    padding: "12px 14px",
                    borderBottom: "0.5px solid var(--brd)",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      className={"av " + avBg(o.name)}
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 9,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {initials(o.name)}
                    </div>
                    <div>
                      <div className="fz13 fw6 t-ink">{o.name}</div>
                      <div className="fz11 t-ink5">{o.intent}</div>
                    </div>
                  </div>
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    borderBottom: "0.5px solid var(--brd)",
                  }}
                >
                  <span className={"stage-chip " + o.stage}>
                    {STAGES.find((s) => s.id === o.stage)?.name ?? o.phase}
                  </span>
                </td>
                <td
                  className="mono"
                  style={{
                    padding: "12px 14px",
                    borderBottom: "0.5px solid var(--brd)",
                  }}
                >
                  {o.value > 0 ? fmt$(o.value) : "—"}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    borderBottom: "0.5px solid var(--brd)",
                  }}
                >
                  <span className={"heat-bub heat-" + o.heat}>
                    <span className={"heat-dot " + o.heat} />
                    {o.heat === "hot"
                      ? "Hot"
                      : o.heat === "warm"
                        ? "Warm"
                        : "Cool"}
                  </span>
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    borderBottom: "0.5px solid var(--brd)",
                  }}
                >
                  {o.cycle > 0 ? `${o.cycle}d` : "—"}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    borderBottom: "0.5px solid var(--brd)",
                    color: "var(--ink4)",
                  }}
                >
                  {o.intent}
                </td>
              </tr>
            ))}
            {opportunities.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    padding: "40px 14px",
                    textAlign: "center",
                    color: "var(--ink5)",
                    fontSize: 13,
                  }}
                >
                  No opportunities found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
type CvModeLocal = "constellation" | "kanban" | "list";

const ConstellationView: React.FC = () => {
  const [mode, setMode] = React.useState<CvModeLocal>("kanban");
  const [showOpportunityPanel, setShowOpportunityPanel] = React.useState(false);
  const [openAcc, setOpenAcc] = React.useState<string | null>(null);
  const [openOpp, setOpenOpp] = React.useState<Opportunity | null>(null);
  const [oppPanelWidth, setOppPanelWidth] = React.useState(540);

  const [opportunities, setOpportunities] = React.useState<Opportunity[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Inject styles — always overwrite so hot-reloads pick up changes
  React.useEffect(() => {
    let s = document.getElementById("cv-styles") as HTMLStyleElement | null;
    if (!s) {
      s = document.createElement("style");
      s.id = "cv-styles";
      document.head.appendChild(s);
    }
    s.textContent = constStyles;
  }, []);

  // Fetch opportunities
  React.useEffect(() => {
    setLoading(true);
    setError(null);
    apiFetch(`${baseUrl()}/opportunities`, { headers: authHeaders() })
      .then(
        (r: {
          ok: any;
          status: any;
          json: () => Promise<ApiOpportunity[]>;
        }) => {
          if (!r.ok) throw new Error(`${r.status}`);
          return r.json() as Promise<ApiOpportunity[]>;
        },
      )
      .then((data: any) => {
        const list = (Array.isArray(data) ? data : [data])
          .filter((o) => !o.isDeleted)
          .map(mapOpportunity);
        setOpportunities(list);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const totalValue = opportunities.reduce((s, o) => s + o.value, 0);

  return (
    <>
      <div className="cv">
        {/* Header */}
        <div className="cv-hdr">
          <div className="cv-hdr-h">Opportunity</div>
          <div className="cv-hdr-meta">
            {loading
              ? "Loading…"
              : error
                ? "Error loading"
                : `${opportunities.length} active${totalValue > 0 ? ` · ${fmt$(totalValue)}` : ""}`}
          </div>

          {!loading &&
            (error ? (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontFamily: '"DM Mono",monospace',
                  fontSize: 9,
                  color: "var(--ink5)",
                  background: "var(--bg3)",
                  border: "0.5px solid var(--brd)",
                  borderRadius: 5,
                  padding: "2px 7px",
                }}
                title={error}
              >
                <Icon name="wifi-off" size={9} /> offline
              </div>
            ) : (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontFamily: '"DM Mono",monospace',
                  fontSize: 9,
                  color: "#1A9E7C",
                  background: "rgba(29,196,160,0.07)",
                  border: "0.5px solid #1A9E7C",
                  borderRadius: 5,
                  padding: "2px 7px",
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "#1A9E7C",
                    animation: "api-pulse 1.8s ease-in-out infinite",
                    display: "inline-block",
                  }}
                />{" "}
                live
              </div>
            ))}

          <div className="cv-toggle">
            <button
              className={"cv-toggle-it" + (mode === "kanban" ? " on" : "")}
              onClick={() => setMode("kanban")}
            >
              <Icon name="columns-3" size={12} /> Board
            </button>
            <button
              className={"cv-toggle-it" + (mode === "list" ? " on" : "")}
              onClick={() => setMode("list")}
            >
              <Icon name="list" size={12} /> List
            </button>
            <button
              className={
                "cv-toggle-it" + (mode === "constellation" ? " on" : "")
              }
              onClick={() => setMode("constellation")}
            >
              <Icon name="orbit" size={12} /> Constellation
            </button>
          </div>

          <div className="cv-tools">
            <button className="cv-axisbtn">
              <Icon name="circle" size={11} /> Size: Value
            </button>
            <button className="cv-axisbtn">
              <Icon name="palette" size={11} /> Color: Heat
            </button>
            <button className="cv-axisbtn">
              <Icon name="filter" size={11} /> All owners
            </button>
            <button
              className="btn sm pri"
              onClick={() => setShowOpportunityPanel(true)}
            >
              <Icon name="plus" size={12} /> New deal
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <KanbanSkeleton />
        ) : error ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              color: "var(--ink4)",
              fontSize: 13,
            }}
          >
            <Icon name="wifi-off" size={32} />
            <div
              style={{ fontWeight: 600, color: "var(--ink3)", fontSize: 14 }}
            >
              Could not load opportunities
            </div>
            <div
              style={{
                fontSize: 12,
                color: "var(--ink5)",
                maxWidth: 280,
                textAlign: "center",
              }}
            >
              {error}
            </div>
            <button className="btn sm" onClick={() => window.location.reload()}>
              <Icon name="refresh-cw" size={12} /> Retry
            </button>
          </div>
        ) : (
          <>
            {mode === "constellation" && (
              <ConstellationFull
                opportunities={opportunities}
                onSelect={(id) =>
                  setOpenOpp(opportunities.find((o) => o.id === id) || null)
                }
              />
            )}
            {mode === "kanban" && (
              <KanbanBoard
                opportunities={opportunities}
                onSelect={(id) =>
                  setOpenOpp(opportunities.find((o) => o.id === id) || null)
                }
              />
            )}
            {mode === "list" && (
              <ConstellationListView
                opportunities={opportunities}
                onSelect={(id) =>
                  setOpenOpp(opportunities.find((o) => o.id === id) || null)
                }
              />
            )}
          </>
        )}

        {showOpportunityPanel && (
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "480px",
              height: "100vh",
              background: "var(--bg)",
              boxShadow: "-8px 0 30px rgba(0,0,0,0.12)",
              zIndex: 9999,
              animation: "slideInRight 0.25s ease",
              overflowY: "auto",
            }}
          >
            <NewOpportunityPanel
              onClose={() => setShowOpportunityPanel(false)}
              open={false}
            />
          </div>
        )}

        <AccountDetailPanel
          accountId={openAcc}
          onClose={() => setOpenAcc(null)}
        />

        {/* ── Opportunity Detail Drawer ── */}
        {openOpp && (
          <OpportunityDetailPanel
            opp={openOpp}
            onClose={() => setOpenOpp(null)}
            panelWidth={oppPanelWidth}
            onResizeStart={(e) => {
              e.preventDefault();
              const startX = e.clientX;
              const startW = oppPanelWidth;
              const onMove = (mv: MouseEvent) =>
                setOppPanelWidth(
                  Math.max(
                    320,
                    Math.min(
                      window.innerWidth * 0.9,
                      startW + (startX - mv.clientX),
                    ),
                  ),
                );
              const onUp = () => {
                window.removeEventListener("mousemove", onMove);
                window.removeEventListener("mouseup", onUp);
              };
              window.addEventListener("mousemove", onMove);
              window.addEventListener("mouseup", onUp);
            }}
          />
        )}
      </div>
    </>
  );
};

export default ConstellationView;
