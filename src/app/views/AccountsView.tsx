import React from "react";
import Icon from "../components/Icon";
import { Sparkline } from "../components/Shared";
import { STAGES, avBg, initials, fmt$ } from "../data";
import type { Account } from "../types";
import { baseUrl, apiFetch } from "../utils/utils";
import NewAccountPanel from "./NewAccountPanel";
import { getToken } from "../../services/api";

// ─── API types ────────────────────────────────────────────────────────────────
interface ApiAccount {
  accountId: string;
  accountName: string;
  domain: string;
  accountType: string;
  confidence: number;
  researchStatus: string;
  industry: string;
  healthScore: number | null;
  healthStatus?: string;
  stage?: string;
  heat?: string | null;
  value?: number;
  arr?: number;
  dealValue?: number;
  cycle?: number;
  lastTouchAt?: string;
  lastTouch?: string;
  lastInteractionAt?: string | null;
  intent?: string;
  signals?: number[];
  size?: string;
  employeeCount?: string;
  temp?: number;
  temperature?: number;
  owner?: string;
  ownerName?: string;
  primaryContactId?: string | null;
  primaryContactName?: string | null;
}

interface ApiContact {
  accountcontactId?: string;
  rowKey?: string;
  accountId: string;
  fullName: string;
  email: string;
  title: string;
  createdAt: string;
}

interface ApiOpportunity {
  rowKey: string;
  workspaceName: string;
  currentPhase: string;
  status: string;
  stage: string;
  dealValue: number | null;
  billingModel: string;
  currencyCode: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiIntake {
  rowKey: string;
  title: string;
  summary: string;
  sourceType: string;
  provider: string;
  commercialIntent: string;
  confidence: number;
  processingStatus: string;
  createdAt: string;
}

interface AccountProfile {
  account: {
    accountId?: string;
    rowKey?: string;
    accountName: string;
    domain: string;
    accountType: string;
    industry: string;
    healthScore: number | null;
    healthStatus: string;
    stage: string;
    heat: string;
    arr: number;
    lastTouchAt: string | null;
    researchStatus: string;
    primaryContactName: string | null;
    createdAt: string;
    source: string;
  };
  contacts: ApiContact[];
  opportunities: ApiOpportunity[];
  intakes: ApiIntake[];
}

const SESSION_KEY = "zotra_saved_session";

function getTenantId(): string {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return "";
    const s = JSON.parse(raw);
    if (Date.now() - (s.savedAt ?? 0) > 30 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(SESSION_KEY);
      return "";
    }
    return s.tenantId ?? "";
  } catch {
    return "";
  }
}

function mapAccount(a: ApiAccount): Account {
  let heat: "hot" | "warm" | "cool" = "cool";
  const heatRaw = (a.heat ?? "").toLowerCase().trim();
  if (heatRaw === "hot") heat = "hot";
  else if (heatRaw === "warm") heat = "warm";
  else if (heatRaw === "cold" || heatRaw === "cool") heat = "cool";
  else {
    const score =
      a.healthScore !== null && a.healthScore !== undefined
        ? a.healthScore
        : (a.confidence ?? 0) * 100;
    heat = score >= 70 ? "hot" : score >= 40 ? "warm" : "cool";
  }

  const stage = (a.stage ?? a.researchStatus ?? "prospect")
    .toLowerCase()
    .trim();

  const temp =
    a.temp !== undefined && a.temp !== null
      ? a.temp
      : a.temperature !== undefined && a.temperature !== null
        ? a.temperature
        : a.healthScore !== null && a.healthScore !== undefined
          ? a.healthScore
          : Math.round((a.confidence ?? 0) * 100);

  const intentRaw = a.intent ?? null;
  const statusValues = new Set([
    "pending",
    "new",
    "active",
    "closing",
    "closed",
    "researching",
    "qualified",
    "inprogress",
    "in progress",
    "prospect",
    "renewal",
  ]);
  const intent =
    intentRaw && !statusValues.has(intentRaw.toLowerCase()) ? intentRaw : "—";

  const rawDate = a.lastTouch ?? a.lastTouchAt ?? null;
  let lastTouch = "—";
  if (rawDate) {
    try {
      const d = new Date(rawDate);
      const now = new Date();
      const diffMs = now.getTime() - d.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);
      if (diffMins < 60) lastTouch = `${diffMins}m ago`;
      else if (diffHours < 24) lastTouch = `${diffHours}h ago`;
      else if (diffDays === 1) lastTouch = "yesterday";
      else if (diffDays < 30) lastTouch = `${diffDays}d ago`;
      else
        lastTouch = d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
    } catch {
      lastTouch = rawDate;
    }
  }

  const signals: number[] = a.signals?.length
    ? a.signals
    : Array.from({ length: 14 }, (_, i) =>
        Math.max(
          1,
          Math.round(
            (temp / 100) * 9 * (0.55 + 0.45 * Math.sin(i * 0.85 + temp * 0.1)),
          ),
        ),
      );

  return {
    id: a.accountId,
    name: a.accountName || a.domain || a.accountId,
    domain: a.domain ?? "",
    stage,
    value: a.value ?? a.arr ?? a.dealValue ?? 0,
    heat,
    cycle: a.cycle ?? 0,
    lastTouch,
    intent,
    signals,
    size: a.size ?? a.employeeCount ?? "—",
    industry: a.industry ?? "—",
    temp,
    owner: a.owner ?? a.ownerName ?? a.primaryContactName ?? "—",
  };
}

// ─── Styles — unified with ConstellationView's card aesthetic ─────────────────
const accountsStyles = `
@keyframes slideInPanel{from{transform:translateX(100%)}to{transform:translateX(0)}}
@keyframes bdIn{from{opacity:0}to{opacity:1}}
@keyframes card-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
@keyframes sk-pulse{0%,100%{opacity:.45}50%{opacity:.9}}
@keyframes api-pulse{0%,100%{opacity:.5}50%{opacity:1}}

/* ── shell ──────────────────────────────────────────────────────────────── */
.acc-view{flex:1;display:flex;flex-direction:column;overflow:hidden;min-height:0;height:100%;background:var(--bg)}

/* ── header ─────────────────────────────────────────────────────────────── */
.acc-hdr{padding:14px 24px 12px;background:var(--bg2);border-bottom:0.5px solid var(--brd);display:flex;align-items:center;gap:12px;flex-shrink:0;flex-wrap:wrap}
.acc-hdr-h{font-family:"Sora",sans-serif;font-size:18px;font-weight:600;letter-spacing:-0.02em;color:var(--ink);white-space:nowrap;flex-shrink:0}
.acc-hdr-meta{font-family:"DM Mono",monospace;font-size:11px;color:var(--ink5);padding:2px 8px;border-radius:6px;background:var(--bg3);border:0.5px solid var(--brd);white-space:nowrap;flex-shrink:0}
.acc-hdr-tools{margin-left:auto;display:flex;align-items:center;gap:7px;flex-wrap:wrap}
.acc-srch-wrap{position:relative;display:flex;align-items:center}
.acc-srch-wrap .ic{position:absolute;left:9px;display:flex;align-items:center;color:var(--ink5);pointer-events:none}
.acc-srch{height:30px;padding:0 12px 0 30px;border-radius:8px;border:0.5px solid var(--brd2);background:var(--bg3);font-size:12px;color:var(--ink);font-family:inherit;outline:none;width:210px;transition:border-color .12s,background .12s}
.acc-srch:focus{border-color:var(--p);background:var(--bg2)}
.acc-srch::placeholder{color:var(--ink5)}

/* ── live badge ─────────────────────────────────────────────────────────── */
.acc-api-badge{display:inline-flex;align-items:center;gap:4px;font-family:"DM Mono",monospace;font-size:9px;color:var(--ink5);background:var(--bg3);border:0.5px solid var(--brd);border-radius:5px;padding:2px 7px}
.acc-api-badge.live{color:#1A9E7C;border-color:#1A9E7C;background:rgba(29,196,160,0.07)}
.acc-api-dot{width:5px;height:5px;border-radius:50%;background:#1A9E7C;animation:api-pulse 1.8s ease-in-out infinite;display:inline-block}

/* ── scroll container — mirrors ConstellationView's .blv wrapper ─────── */
.acc-scroll{flex:1;overflow-y:auto;overflow-x:auto;padding:16px 20px 24px;min-height:0}

/* ── card container — mirrors .card in ConstellationView ─────────────── */
.acc-card-wrap{background:#fff;border:1px solid rgba(15,23,42,0.07);border-radius:14px;overflow:hidden;box-shadow:0 1px 4px rgba(15,23,42,0.05);min-width:700px}

/* ── column header row ───────────────────────────────────────────────── */
.acc-col-head{display:grid;grid-template-columns:minmax(140px,1fr) 100px 150px 130px 80px 90px 52px;gap:0;border-bottom:1px solid rgba(15,23,42,0.07);background:rgba(248,250,252,0.88)}
.acc-col-head>div{padding:9px 14px;font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8;display:flex;align-items:center;gap:4px;user-select:none;white-space:nowrap}
.acc-col-head>div:hover{color:#475569;cursor:pointer}

/* ── account card row — mirrors .kb-card ────────────────────────────── */
.acc-card-row{display:grid;grid-template-columns:minmax(140px,1fr) 100px 150px 130px 80px 90px 52px;gap:0;border-bottom:1px solid rgba(15,23,42,0.055);cursor:pointer;transition:background .12s,box-shadow .12s;animation:card-in .22s ease both;position:relative}
.acc-card-row:last-child{border-bottom:none}
.acc-card-row:hover{background:rgba(99,102,241,0.025)}
.acc-card-row.on{background:rgba(99,102,241,0.013)}
.acc-card-row.on::before{content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);width:3px;height:40px;background:var(--p,#6366f1);border-radius:0 3px 3px 0;opacity:.8}
.acc-card-row>div{padding:12px 14px;display:flex;align-items:center;font-size:12.5px;color:#475569;min-width:0}

/* ── name cell ───────────────────────────────────────────────────────── */
.acc-name-cell{display:flex;align-items:center;gap:10px;min-width:0;width:100%}
.acc-name-info{min-width:0;flex:1}
.acc-name-nm{font-size:13px;font-weight:600;color:#0f172a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:-.01em}
.acc-name-dm{font-size:10.5px;color:#94a3b8;font-family:"DM Mono",monospace;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}

/* ── heat bubble ─────────────────────────────────────────────────────── */
.heat-bub{display:inline-flex;align-items:center;gap:5px;padding:3px 10px 3px 8px;border-radius:999px;font-size:11.5px;font-weight:600;line-height:1;white-space:nowrap}
.heat-bub.heat-hot{background:#fde8e8;color:#c0392b}
.heat-bub.heat-warm{background:#fef0e0;color:#b7621a}
.heat-bub.heat-cool{background:#e8f0fe;color:#3b5bdb}
.heat-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;display:inline-block}
.heat-dot.hot{background:#e74c3c}
.heat-dot.warm{background:#e67e22}
.heat-dot.cool{background:#4c6ef5}

/* ── stage chip — identical to ConstellationView ─────────────────────── */
.stage-chip{display:inline-flex;align-items:center;padding:3px 9px;border-radius:6px;font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;line-height:1.4;white-space:nowrap}
.stage-chip.negotiation{background:#fff0dc;color:#c07a10;border:0.5px solid #f5c97a}
.stage-chip.closing,.stage-chip.active{background:#d6f5e8;color:#1a7a4a;border:0.5px solid #7adbb0}
.stage-chip.evaluation,.stage-chip.development{background:#ede8fe;color:#6b3ec7;border:0.5px solid #c4aafc}
.stage-chip.discovery,.stage-chip.shaping,.stage-chip.qualified{background:#ddeeff;color:#1a5fa8;border:0.5px solid #90c4f5}
.stage-chip.qualify,.stage-chip.prospect{background:#fef9e0;color:#9a7c0a;border:0.5px solid #e8d87a}
.stage-chip.renewal{background:#e8f4fd;color:#1565c0;border:0.5px solid #90caf9}
.stage-chip.churned{background:#fde8e8;color:#c0392b;border:0.5px solid #f5a0a0}
.stage-chip.closed{background:#f0f0f0;color:#666;border:0.5px solid #ccc}

/* ── sort arrow ──────────────────────────────────────────────────────── */
.sort-arrow{opacity:.35;transition:opacity .1s}
.sort-arrow.active{opacity:1;color:var(--p,#6366f1)}

/* ── skeleton rows ───────────────────────────────────────────────────── */
.acc-sk{border-radius:5px;background:var(--bg3,#f1f5f9);animation:sk-pulse 1.4s ease-in-out infinite}
.acc-sk-row{display:grid;grid-template-columns:minmax(140px,1fr) 100px 150px 130px 80px 90px 52px;gap:0;border-bottom:1px solid rgba(15,23,42,0.055)}
.acc-sk-row>div{padding:12px 14px;display:flex;align-items:center}

/* ── empty / error states ────────────────────────────────────────────── */
.acc-state{display:flex;flex-direction:column;align-items:center;justify-content:center;flex:1;gap:10px;color:var(--ink4);font-size:13px;padding:60px 20px}
.acc-state svg{opacity:.35}
.acc-state-title{font-weight:600;color:var(--ink3);font-size:14px}
.acc-state-sub{font-size:12px;color:var(--ink5);text-align:center;max-width:280px;line-height:1.6}

/* ── slide-in detail panel (unchanged) ──────────────────────────────── */
.acc-backdrop{position:absolute;inset:0;background:rgba(20,18,40,.32);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);z-index:19;animation:bdIn .18s ease}
.acc-detail{position:absolute;right:0;top:0;bottom:0;width:520px;min-width:320px;max-width:90%;background:var(--bg2);border-left:0.5px solid var(--brd);display:flex;flex-direction:column;overflow:hidden;z-index:20;box-shadow:-8px 0 40px rgba(60,50,150,.16);animation:slideInPanel .2s cubic-bezier(.4,0,.2,1)}
.acc-d-bar{height:46px;display:flex;align-items:center;gap:8px;padding:0 14px;border-bottom:0.5px solid var(--brd);flex-shrink:0;background:var(--bg2)}
.acc-d-hero-wrap{padding:14px 16px 12px;border-bottom:0.5px solid var(--brd);flex-shrink:0;background:var(--bg2)}
.acc-d-tabs{display:flex;flex-direction:row;border-bottom:0.5px solid var(--brd);flex-shrink:0;padding:0 12px;background:var(--bg2);overflow-x:auto;scrollbar-width:none;gap:1px}
.acc-d-tabs::-webkit-scrollbar{display:none}
.acc-d-tab{display:inline-flex;flex-direction:row;align-items:center;gap:6px;height:40px;padding:0 10px;font-size:11.5px;font-weight:500;color:var(--ink4);cursor:pointer;border:none;background:transparent;border-bottom:2.5px solid transparent;position:relative;top:0.5px;transition:color .12s,background .12s;white-space:nowrap;user-select:none;flex-shrink:0;line-height:1;font-family:inherit;border-radius:6px 6px 0 0}
.acc-d-tab:hover{color:var(--ink);background:rgba(75,72,200,0.05)}
.acc-d-tab.on{color:#4B48C8;font-weight:700;border-bottom-color:#4B48C8;background:rgba(75,72,200,0.07)}
.acc-d-tab-icon{display:flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:5px;background:transparent;transition:background .12s;flex-shrink:0}
.acc-d-tab:hover .acc-d-tab-icon{background:rgba(75,72,200,0.08)}
.acc-d-tab.on .acc-d-tab-icon{background:rgba(75,72,200,0.14)}
.acc-d-scroll{flex:1;overflow-y:auto;overflow-x:hidden;padding:14px 14px 24px;min-height:0;overscroll-behavior:contain}
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const heatLabel = (h: string) =>
  h === "hot" ? "Hot" : h === "warm" ? "Warm" : "Cool";
const stageLabel = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1).replace(/[-_]/g, " ");

function authHeaders(): Record<string, string> {
  const token = getToken();
  return {
    accept: "*/*",
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ─── Skeleton rows ────────────────────────────────────────────────────────────
const SkeletonRows: React.FC<{ n?: number }> = ({ n = 8 }) => (
  <>
    {Array.from({ length: n }).map((_, i) => (
      <div key={i} className="acc-sk-row">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              className="acc-sk"
              style={{ width: 32, height: 32, borderRadius: 9, flexShrink: 0 }}
            />
            <div>
              <span
                className="acc-sk"
                style={{
                  width: 120 + (i % 3) * 30,
                  height: 11,
                  display: "block",
                  marginBottom: 5,
                }}
              />
              <span
                className="acc-sk"
                style={{
                  width: 80 + (i % 2) * 20,
                  height: 9,
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
        <div>
          <span
            className="acc-sk"
            style={{ width: 55, height: 22, borderRadius: 999 }}
          />
        </div>
        <div>
          <span
            className="acc-sk"
            style={{ width: 80, height: 20, borderRadius: 6 }}
          />
        </div>
        <div>
          <span
            className="acc-sk"
            style={{ width: 110, height: 24, borderRadius: 4 }}
          />
        </div>
        <div>
          <span className="acc-sk" style={{ width: 44, height: 11 }} />
        </div>
        <div>
          <span className="acc-sk" style={{ width: 50, height: 11 }} />
        </div>
        <div style={{ justifyContent: "center" }}>
          <span
            className="acc-sk"
            style={{ width: 26, height: 26, borderRadius: 8 }}
          />
        </div>
      </div>
    ))}
  </>
);

// ─── Relative time helper ─────────────────────────────────────────────────────
function relTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    const diffMs = Date.now() - d.getTime();
    const mins = Math.floor(diffMs / 60000);
    const hrs = Math.floor(mins / 60);
    const days = Math.floor(hrs / 24);
    if (mins < 60) return `${mins}m ago`;
    if (hrs < 24) return `${hrs}h ago`;
    if (days === 1) return "yesterday";
    if (days < 30) return `${days}d ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return iso ?? "—";
  }
}

// ─── Detail panel (unchanged logic, kept intact) ──────────────────────────────
const AccountDetail: React.FC<{ accountId: string; onClose: () => void }> = ({
  accountId,
  onClose,
}) => {
  const [profile, setProfile] = React.useState<AccountProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [tab, setTab] = React.useState<
    "stakeholders" | "intake" | "opportunities" | "activities"
  >("stakeholders");
  const [panelWidth, setPanelWidth] = React.useState(520);

  React.useEffect(() => {
    setProfile(null);
    setLoading(true);
    setError(null);
    setTab("stakeholders");
    apiFetch(`${baseUrl()}/accounts/${accountId}/profile`, {
      headers: authHeaders(),
    })
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json() as Promise<AccountProfile>;
      })
      .then((data) => setProfile(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [accountId]);

  const onResizeMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX,
        startW = panelWidth;
      const onMove = (mv: MouseEvent) =>
        setPanelWidth(
          Math.max(
            360,
            Math.min(window.innerWidth * 0.9, startW + (startX - mv.clientX)),
          ),
        );
      const onUp = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [panelWidth],
  );

  const acc = profile?.account;
  const contacts = profile?.contacts ?? [];
  const opps = profile?.opportunities ?? [];
  const intakes = profile?.intakes ?? [];

  const heatRaw = (acc?.heat ?? "cool").toLowerCase().trim();
  const heatStr = (
    heatRaw === "hot" ? "hot" : heatRaw === "warm" ? "warm" : "cool"
  ) as "hot" | "warm" | "cool";
  const stageName = acc
    ? stageLabel(acc.stage ?? acc.researchStatus ?? "")
    : "";
  const tempVal = acc?.healthScore != null ? Math.round(acc.healthScore) : null;

  const stageChipStyle = (s: string): React.CSSProperties => {
    const m: Record<string, { bg: string; color: string; brd: string }> = {
      prospect: { bg: "#fef9e0", color: "#9a7c0a", brd: "#e8d87a" },
      qualified: { bg: "#ddeeff", color: "#1a5fa8", brd: "#90c4f5" },
      shaping: { bg: "#ddeeff", color: "#1a5fa8", brd: "#90c4f5" },
      development: { bg: "#ede8fe", color: "#6b3ec7", brd: "#c4aafc" },
      closing: { bg: "#d6f5e8", color: "#1a7a4a", brd: "#7adbb0" },
      active: { bg: "#d6f5e8", color: "#1a7a4a", brd: "#7adbb0" },
      renewal: { bg: "#e8f4fd", color: "#1565c0", brd: "#90caf9" },
      churned: { bg: "#fde8e8", color: "#c0392b", brd: "#f5a0a0" },
      closed: { bg: "#f0f0f0", color: "#666", brd: "#ccc" },
    };
    const c = m[s.toLowerCase()] ?? {
      bg: "#fef9e0",
      color: "#9a7c0a",
      brd: "#e8d87a",
    };
    return {
      display: "inline-flex",
      alignItems: "center",
      padding: "3px 9px",
      borderRadius: 6,
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      lineHeight: 1.4,
      whiteSpace: "nowrap",
      background: c.bg,
      color: c.color,
      border: `0.5px solid ${c.brd}`,
    };
  };

  const Skeleton = () => (
    <div
      style={{
        flex: 1,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <span
          className="acc-sk"
          style={{
            width: 46,
            height: 46,
            borderRadius: 12,
            flexShrink: 0,
            display: "block",
          }}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 7,
            paddingTop: 4,
          }}
        >
          <span
            className="acc-sk"
            style={{ width: "65%", height: 14, display: "block" }}
          />
          <div style={{ display: "flex", gap: 6 }}>
            <span
              className="acc-sk"
              style={{
                width: 64,
                height: 22,
                borderRadius: 6,
                display: "block",
              }}
            />
            <span
              className="acc-sk"
              style={{
                width: 52,
                height: 22,
                borderRadius: 999,
                display: "block",
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <span
          className="acc-sk"
          style={{ height: 56, borderRadius: 10, display: "block" }}
        />
        <span
          className="acc-sk"
          style={{ height: 56, borderRadius: 10, display: "block" }}
        />
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {[78, 68, 90, 70].map((w, i) => (
          <span
            key={i}
            className="acc-sk"
            style={{ width: w, height: 32, borderRadius: 5, display: "block" }}
          />
        ))}
      </div>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "11px 12px",
            borderRadius: 10,
            border: "0.5px solid var(--brd)",
          }}
        >
          <span
            className="acc-sk"
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              flexShrink: 0,
              display: "block",
            }}
          />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <span
              className="acc-sk"
              style={{ width: `${55 + i * 12}%`, height: 11, display: "block" }}
            />
            <span
              className="acc-sk"
              style={{ width: "40%", height: 9, display: "block" }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const Empty = ({ icon, text }: { icon: string; text: string }) => (
    <div
      style={{
        padding: "24px 14px",
        borderRadius: 10,
        background: "var(--bg3)",
        border: "0.5px solid var(--brd)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        fontSize: 12,
        color: "var(--ink5)",
        textAlign: "center",
      }}
    >
      <Icon name={icon as Parameters<typeof Icon>[0]["name"]} size={26} />
      <span>{text}</span>
    </div>
  );

  const TABS: Array<{
    id: typeof tab;
    label: string;
    icon: string;
    count?: number;
  }> = [
    {
      id: "stakeholders",
      label: "Stakeholders",
      icon: "users",
      count: contacts.length,
    },
    { id: "intake", label: "Intake", icon: "mail", count: intakes.length },
    {
      id: "opportunities",
      label: "Opportunities",
      icon: "briefcase",
      count: opps.length,
    },
    { id: "activities", label: "Activities", icon: "clock" },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(20,18,40,.35)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 19,
        }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: panelWidth,
          minWidth: 360,
          maxWidth: "92%",
          background: "var(--bg2)",
          borderLeft: "0.5px solid var(--brd)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 20,
          boxShadow: "-8px 0 48px rgba(60,50,150,.18)",
          animation: "slideInPanel .2s cubic-bezier(.4,0,.2,1)",
        }}
      >
        {/* Resize handle — ODP-style visible grip */}
        <div className="odp-resize" onMouseDown={onResizeMouseDown}>
          <div className="odp-resize-grip">
            <div className="odp-resize-dot" />
            <div className="odp-resize-dot" />
            <div className="odp-resize-dot" />
          </div>
          <span className="odp-resize-hint">Drag to resize</span>
        </div>

        {/* Action bar */}
        <div
          style={{
            height: 46,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 14px",
            borderBottom: "0.5px solid var(--brd)",
            flexShrink: 0,
            background: "var(--bg2)",
          }}
        >
          <button
            className="ic-btn sm"
            onClick={onClose}
            style={{
              background: "#4B48C8",
              color: "#fff",
              border: "none",
              boxShadow: "0 1px 3px rgba(75,72,200,.30)",
            }}
          >
            <Icon name="x" size={13} />
          </button>
          <span
            style={{
              fontSize: 11,
              color: "var(--ink4)",
              fontFamily: '"DM Mono",monospace',
            }}
          >
            {acc?.domain ?? "…"}
          </span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
            <button className="btn sm">
              <Icon name="sparkles" size={12} /> Ask Zotra
            </button>
            <button className="btn sm">
              <Icon name="mail" size={12} /> Email
            </button>
            <button className="btn sm">
              <Icon name="calendar" size={12} /> Schedule
            </button>
            <button className="ic-btn sm">
              <Icon name="more-horizontal" size={13} />
            </button>
          </div>
        </div>

        {loading && <Skeleton />}
        {!loading && error && (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              color: "var(--ink4)",
              padding: "40px 20px",
            }}
          >
            <Icon name="alert-triangle" size={28} />
            <div style={{ fontWeight: 600, color: "var(--ink3)" }}>
              Could not load profile
            </div>
            <div style={{ fontSize: 11.5, color: "var(--ink5)" }}>{error}</div>
          </div>
        )}

        {!loading && !error && acc && (
          <>
            {/* Hero */}
            <div
              style={{
                padding: "14px 16px 12px",
                borderBottom: "0.5px solid var(--brd)",
                flexShrink: 0,
                background: "var(--bg2)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <span
                  className={"av " + avBg(acc.accountName)}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 12,
                    fontSize: 15,
                    flexShrink: 0,
                  }}
                >
                  {initials(acc.accountName)}
                </span>
                <div
                  style={{
                    fontFamily: '"Sora",sans-serif',
                    fontSize: 17,
                    fontWeight: 700,
                    letterSpacing: "-0.015em",
                    color: "var(--ink)",
                    lineHeight: 1.2,
                    flex: 1,
                    minWidth: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {acc.accountName}
                </div>
                <span
                  style={{ ...stageChipStyle(acc.stage ?? ""), flexShrink: 0 }}
                >
                  {stageName}
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    background: "var(--bg3)",
                    border: "0.5px solid var(--brd)",
                    borderRadius: 10,
                    padding: "11px 14px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: ".09em",
                      color: "var(--ink5)",
                      marginBottom: 5,
                    }}
                  >
                    ARR
                  </div>
                  <div
                    style={{
                      fontFamily: '"Sora",sans-serif',
                      fontSize: 18,
                      fontWeight: 700,
                      color: "var(--ink)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {acc.arr > 0 ? (
                      fmt$(acc.arr)
                    ) : (
                      <span style={{ fontSize: 15, color: "var(--ink5)" }}>
                        —
                      </span>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    background: "var(--bg3)",
                    border: "0.5px solid var(--brd)",
                    borderRadius: 10,
                    padding: "11px 14px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: ".09em",
                      color: "var(--ink5)",
                      marginBottom: 5,
                    }}
                  >
                    Health score
                  </div>
                  <div
                    style={{
                      fontFamily: '"Sora",sans-serif',
                      fontSize: 18,
                      fontWeight: 700,
                      color: "var(--ink)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {tempVal != null ? (
                      <>
                        {tempVal}
                        <span
                          style={{
                            fontSize: 11,
                            color: "var(--ink4)",
                            fontFamily: '"DM Mono",monospace',
                            marginLeft: 2,
                          }}
                        >
                          /100
                        </span>
                      </>
                    ) : (
                      <span style={{ fontSize: 15, color: "var(--ink5)" }}>
                        —
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tab strip */}
            <div className="acc-d-tabs">
              {TABS.map((t) => {
                const on = tab === t.id;
                return (
                  <div
                    key={t.id}
                    className={"acc-d-tab" + (on ? " on" : "")}
                    onClick={() => setTab(t.id)}
                  >
                    <span className="acc-d-tab-icon">
                      <Icon
                        name={t.icon as Parameters<typeof Icon>[0]["name"]}
                        size={12}
                      />
                    </span>
                    {t.label}
                    {t.count !== undefined && t.count > 0 && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minWidth: 15,
                          height: 15,
                          padding: "0 4px",
                          fontSize: 8,
                          fontFamily: '"DM Mono",monospace',
                          fontWeight: 700,
                          background: on ? "#4B48C8" : "rgba(75,72,200,0.12)",
                          color: on ? "#fff" : "#4B48C8",
                          borderRadius: 99,
                          lineHeight: 1,
                        }}
                      >
                        {t.count}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Tab body */}
            <div className="acc-d-scroll">
              {tab === "stakeholders" && (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      color: "var(--ink5)",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      marginBottom: 4,
                    }}
                  >
                    <Icon name="users" size={12} />
                    Contacts
                    {contacts.length > 0 && (
                      <span
                        style={{
                          fontSize: 9,
                          fontFamily: '"DM Mono",monospace',
                          fontWeight: 700,
                          background: "var(--pp)",
                          color: "var(--p)",
                          padding: "1px 7px",
                          borderRadius: 8,
                        }}
                      >
                        {contacts.length}
                      </span>
                    )}
                    <span
                      style={{
                        marginLeft: "auto",
                        fontWeight: 500,
                        color: "var(--ink4)",
                        fontSize: 11,
                        textTransform: "none",
                        letterSpacing: 0,
                        cursor: "pointer",
                      }}
                    >
                      view org map
                    </span>
                  </div>
                  {contacts.length === 0 ? (
                    <Empty
                      icon="users"
                      text="No contacts for this account yet."
                    />
                  ) : (
                    contacts.map((c) => {
                      const key = c.accountcontactId ?? c.rowKey ?? c.email;
                      return (
                        <div
                          key={key}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "11px 12px",
                            borderRadius: 10,
                            border: "0.5px solid var(--brd)",
                            background: "var(--bg2)",
                          }}
                        >
                          <span
                            className={"av " + avBg(c.fullName)}
                            style={{
                              width: 34,
                              height: 34,
                              borderRadius: 10,
                              fontSize: 11,
                              flexShrink: 0,
                            }}
                          >
                            {initials(c.fullName)}
                          </span>
                          <div
                            style={{ flex: 1, minWidth: 0, lineHeight: 1.3 }}
                          >
                            <div
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: "var(--ink)",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {c.fullName}
                            </div>
                            <div
                              style={{
                                fontSize: 11,
                                color: "var(--ink4)",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                marginTop: 1,
                              }}
                            >
                              {c.title}
                            </div>
                            <div
                              style={{
                                fontSize: 10,
                                color: "var(--ink5)",
                                fontFamily: '"DM Mono",monospace',
                                marginTop: 2,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {c.email}
                            </div>
                          </div>
                          <button
                            className="btn xs"
                            style={{ flexShrink: 0 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = `mailto:${c.email}`;
                            }}
                          >
                            <Icon name="mail" size={11} />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {tab === "intake" && (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      color: "var(--ink5)",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      marginBottom: 4,
                    }}
                  >
                    <Icon name="mail" size={12} />
                    Intake signals
                    {intakes.length > 0 && (
                      <span
                        style={{
                          fontSize: 9,
                          fontFamily: '"DM Mono",monospace',
                          fontWeight: 700,
                          background: "var(--pp)",
                          color: "var(--p)",
                          padding: "1px 7px",
                          borderRadius: 8,
                        }}
                      >
                        {intakes.length}
                      </span>
                    )}
                  </div>
                  {intakes.length === 0 ? (
                    <Empty
                      icon="mail"
                      text="No intake signals for this account yet."
                    />
                  ) : (
                    intakes.map((item) => {
                      const isIntent = item.commercialIntent === "Yes";
                      const provIcon =
                        item.provider === "outlook" ||
                        item.provider === "gmail" ||
                        item.sourceType === "inbox"
                          ? "mail"
                          : "file-text";
                      return (
                        <div
                          key={item.rowKey}
                          style={{
                            padding: "12px 13px",
                            borderRadius: 10,
                            border: "0.5px solid var(--brd)",
                            background: "var(--bg2)",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 9,
                              marginBottom: 6,
                            }}
                          >
                            <div
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: 9,
                                background: "var(--bg3)",
                                border: "0.5px solid var(--brd)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "var(--ink4)",
                                flexShrink: 0,
                              }}
                            >
                              <Icon
                                name={
                                  provIcon as Parameters<typeof Icon>[0]["name"]
                                }
                                size={13}
                              />
                            </div>
                            <div
                              style={{
                                fontSize: 12.5,
                                fontWeight: 600,
                                color: "var(--ink)",
                                lineHeight: 1.35,
                                flex: 1,
                              }}
                            >
                              {item.title}
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 5,
                              flexWrap: "wrap",
                              fontSize: 10.5,
                              color: "var(--ink5)",
                              fontFamily: '"DM Mono",monospace',
                              marginBottom: 5,
                            }}
                          >
                            <span style={{ textTransform: "capitalize" }}>
                              {item.provider ?? item.sourceType}
                            </span>
                            <span
                              style={{
                                width: 3,
                                height: 3,
                                borderRadius: "50%",
                                background: "var(--brd2)",
                                display: "inline-block",
                              }}
                            />
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 3,
                                fontSize: 9.5,
                                fontWeight: 700,
                                padding: "2px 7px",
                                borderRadius: 6,
                                background: isIntent
                                  ? "rgba(29,196,160,.12)"
                                  : "var(--bg3)",
                                color: isIntent
                                  ? "var(--t,#1A9E7C)"
                                  : "var(--ink5)",
                              }}
                            >
                              {isIntent ? "● commercial" : "no intent"}
                            </span>
                            <span
                              style={{
                                width: 3,
                                height: 3,
                                borderRadius: "50%",
                                background: "var(--brd2)",
                                display: "inline-block",
                              }}
                            />
                            <span>{item.confidence}% conf</span>
                            <span style={{ marginLeft: "auto" }}>
                              {relTime(item.createdAt)}
                            </span>
                          </div>
                          {item.summary && (
                            <div
                              style={
                                {
                                  fontSize: 11.5,
                                  color: "var(--ink3)",
                                  lineHeight: 1.55,
                                  display: "-webkit-box",
                                  WebkitLineClamp: 3,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                } as React.CSSProperties
                              }
                            >
                              {item.summary}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {tab === "opportunities" && (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      color: "var(--ink5)",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      marginBottom: 4,
                    }}
                  >
                    <Icon name="briefcase" size={12} />
                    Opportunities
                    {opps.length > 0 && (
                      <span
                        style={{
                          fontSize: 9,
                          fontFamily: '"DM Mono",monospace',
                          fontWeight: 700,
                          background: "var(--pp)",
                          color: "var(--p)",
                          padding: "1px 7px",
                          borderRadius: 8,
                        }}
                      >
                        {opps.length}
                      </span>
                    )}
                  </div>
                  {opps.length === 0 ? (
                    <Empty
                      icon="briefcase"
                      text="No opportunities linked yet."
                    />
                  ) : (
                    opps.map((o) => {
                      const phaseColors: Record<
                        string,
                        { bg: string; color: string; brd: string }
                      > = {
                        Qualification: {
                          bg: "#fef9e0",
                          color: "#9a7c0a",
                          brd: "#e8d87a",
                        },
                        Shaping: {
                          bg: "#ddeeff",
                          color: "#1a5fa8",
                          brd: "#90c4f5",
                        },
                        Development: {
                          bg: "#ede8fe",
                          color: "#6b3ec7",
                          brd: "#c4aafc",
                        },
                        Closing: {
                          bg: "#d6f5e8",
                          color: "#1a7a4a",
                          brd: "#7adbb0",
                        },
                      };
                      const pc = phaseColors[o.currentPhase ?? ""] ?? {
                        bg: "var(--bg3)",
                        color: "var(--ink4)",
                        brd: "var(--brd)",
                      };
                      return (
                        <div
                          key={o.rowKey}
                          style={{
                            padding: "12px 13px",
                            borderRadius: 10,
                            border: "0.5px solid var(--brd)",
                            background: "var(--bg2)",
                            display: "flex",
                            flexDirection: "column",
                            gap: 6,
                          }}
                        >
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: "var(--ink)",
                              lineHeight: 1.3,
                            }}
                          >
                            {o.workspaceName ?? "Unnamed opportunity"}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              flexWrap: "wrap",
                            }}
                          >
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                fontSize: 10,
                                fontWeight: 700,
                                letterSpacing: ".06em",
                                textTransform: "uppercase",
                                padding: "3px 8px",
                                borderRadius: 6,
                                background: pc.bg,
                                color: pc.color,
                                border: `0.5px solid ${pc.brd}`,
                                lineHeight: 1.4,
                              }}
                            >
                              {o.currentPhase}
                            </span>
                            <span
                              style={{
                                fontSize: 10.5,
                                color: "var(--ink5)",
                                fontFamily: '"DM Mono",monospace',
                              }}
                            >
                              {o.status}
                            </span>
                            {o.dealValue != null && o.dealValue > 0 && (
                              <span
                                style={{
                                  fontSize: 13,
                                  fontWeight: 700,
                                  color: "var(--ink)",
                                  fontFamily: '"Sora",sans-serif',
                                  marginLeft: "auto",
                                }}
                              >
                                {fmt$(o.dealValue)}
                              </span>
                            )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: 10.5,
                              color: "var(--ink5)",
                              fontFamily: '"DM Mono",monospace',
                              gap: 4,
                            }}
                          >
                            <span>
                              {(o.billingModel ?? "").replace(/_/g, " ")}
                            </span>
                            <span style={{ opacity: 0.4 }}>·</span>
                            <span>updated {relTime(o.updatedAt)}</span>
                            <span
                              style={{
                                marginLeft: "auto",
                                fontSize: 10,
                                fontWeight: 700,
                                letterSpacing: ".06em",
                                textTransform: "uppercase",
                                padding: "2px 7px",
                                borderRadius: 5,
                                background: "var(--bg3)",
                                color: "var(--ink4)",
                                border: "0.5px solid var(--brd)",
                              }}
                            >
                              {o.stage}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {tab === "activities" &&
                (() => {
                  // Build a unified sorted feed
                  type FeedItem = {
                    key: string;
                    type:
                      | "account_created"
                      | "last_touch"
                      | "opportunity"
                      | "intake";
                    title: string;
                    desc?: string;
                    time?: string;
                    chips?: { label: string; cls: string }[];
                    iconName: string;
                    iconCls: string;
                  };

                  const feed: FeedItem[] = [];

                  if (acc.createdAt) {
                    feed.push({
                      key: "acc-created",
                      type: "account_created",
                      title: "Account created",
                      desc: [acc.source, acc.accountType]
                        .filter(Boolean)
                        .join(" · "),
                      time: acc.createdAt,
                      chips: acc.source
                        ? [{ label: acc.source, cls: "source" }]
                        : [],
                      iconName: "building-2",
                      iconCls: "green",
                    });
                  }

                  opps.forEach((o: any) => {
                    feed.push({
                      key: o.rowKey ?? o.id ?? Math.random().toString(),
                      type: "opportunity",
                      title: "Opportunity opened",
                      desc: [o.workspaceName, o.currentPhase]
                        .filter(Boolean)
                        .join(" · "),
                      time: o.createdAt,
                      chips: [
                        o.currentPhase
                          ? { label: o.currentPhase, cls: "" }
                          : null,
                        o.stage ? { label: o.stage, cls: "source" } : null,
                      ].filter(Boolean) as { label: string; cls: string }[],
                      iconName: "briefcase",
                      iconCls: "purple",
                    });
                    if (o.updatedAt && o.updatedAt !== o.createdAt) {
                      feed.push({
                        key: (o.rowKey ?? o.id ?? "") + "-upd",
                        type: "opportunity",
                        title: "Opportunity updated",
                        desc: o.workspaceName,
                        time: o.updatedAt,
                        chips: o.currentPhase
                          ? [{ label: o.currentPhase, cls: "" }]
                          : [],
                        iconName: "refresh-cw",
                        iconCls: "blue",
                      });
                    }
                  });

                  intakes.forEach((item: any) => {
                    feed.push({
                      key: item.rowKey ?? item.id ?? Math.random().toString(),
                      type: "intake",
                      title: "Intake signal",
                      desc: item.title ?? item.subject,
                      time: item.createdAt,
                      chips: [
                        item.intakeType
                          ? {
                              label: item.intakeType.replace(/_/g, " "),
                              cls: "agent",
                            }
                          : null,
                        item.confidenceLevel
                          ? { label: item.confidenceLevel, cls: "" }
                          : null,
                      ].filter(Boolean) as { label: string; cls: string }[],
                      iconName: "mail",
                      iconCls: "blue",
                    });
                  });

                  if (acc.lastTouchAt) {
                    feed.push({
                      key: "last-touch",
                      type: "last_touch",
                      title: "Last touch recorded",
                      time: acc.lastTouchAt,
                      chips: [],
                      iconName: "hand",
                      iconCls: "",
                    });
                  }

                  // Sort newest-first
                  feed.sort((a, b) => {
                    if (!a.time) return 1;
                    if (!b.time) return -1;
                    return (
                      new Date(b.time).getTime() - new Date(a.time).getTime()
                    );
                  });

                  const totalItems = feed.length;

                  return (
                    <div
                      style={{
                        border: "0.5px solid var(--brd)",
                        borderRadius: 10,
                        overflow: "hidden",
                        background: "var(--bg)",
                      }}
                    >
                      {/* Header */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "13px 16px",
                          borderBottom: "0.5px solid var(--brd)",
                          background: "var(--bg2)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            fontSize: 14,
                            fontWeight: 700,
                            color: "var(--ink)",
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <circle
                              cx="8"
                              cy="8"
                              r="6.5"
                              stroke="currentColor"
                              strokeWidth="1.4"
                            />
                            <path
                              d="M8 5v3.5l2 1.5"
                              stroke="currentColor"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                            />
                          </svg>
                          Account Activity
                        </div>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "2px 9px",
                            borderRadius: 20,
                            fontSize: 10.5,
                            fontWeight: 600,
                            color: "var(--ink4)",
                            background: "var(--bg3)",
                            border: "0.5px solid var(--brd2)",
                          }}
                        >
                          {totalItems > 0
                            ? `${totalItems} event${totalItems !== 1 ? "s" : ""}`
                            : "No events"}
                        </span>
                      </div>

                      {/* Feed */}
                      {feed.length > 0 ? (
                        <div style={{ padding: "8px 0" }}>
                          {feed.map((item, i) => {
                            const iconBgMap: Record<string, string> = {
                              green: "rgba(21,128,61,0.09)",
                              purple: "rgba(109,40,217,0.10)",
                              blue: "rgba(29,78,216,0.09)",
                              red: "rgba(185,28,28,0.09)",
                            };
                            const iconClrMap: Record<string, string> = {
                              green: "#15803d",
                              purple: "#6d28d9",
                              blue: "#1d4ed8",
                              red: "#b91c1c",
                            };
                            const iconBrdMap: Record<string, string> = {
                              green: "rgba(21,128,61,0.18)",
                              purple: "rgba(109,40,217,0.20)",
                              blue: "rgba(29,78,216,0.18)",
                              red: "rgba(185,28,28,0.18)",
                            };
                            const chipBgMap: Record<string, string> = {
                              source: "rgba(75,72,200,0.07)",
                              agent: "rgba(21,128,61,0.07)",
                            };
                            const chipClrMap: Record<string, string> = {
                              source: "#4B48C8",
                              agent: "#15803d",
                            };
                            const chipBrdMap: Record<string, string> = {
                              source: "rgba(75,72,200,0.18)",
                              agent: "rgba(21,128,61,0.18)",
                            };
                            const cls = item.iconCls;
                            const isLast = i === feed.length - 1;

                            return (
                              <div
                                key={item.key}
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: 12,
                                  padding: "11px 16px",
                                  position: "relative",
                                  transition: "background .12s",
                                }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.background =
                                    "var(--bg3)")
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.background =
                                    "transparent")
                                }
                              >
                                {/* Timeline spine */}
                                {!isLast && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      left: 40,
                                      top: 44,
                                      bottom: -2,
                                      width: 1.5,
                                      background:
                                        "linear-gradient(180deg,var(--brd2) 60%,transparent 100%)",
                                    }}
                                  />
                                )}

                                {/* Icon */}
                                <div
                                  style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 9,
                                    flexShrink: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    position: "relative",
                                    zIndex: 1,
                                    background: cls
                                      ? iconBgMap[cls]
                                      : "var(--bg3)",
                                    border: `0.5px solid ${cls ? iconBrdMap[cls] : "var(--brd2)"}`,
                                    color: cls
                                      ? iconClrMap[cls]
                                      : "var(--ink4)",
                                  }}
                                >
                                  <Icon
                                    name={
                                      item.iconName as Parameters<
                                        typeof Icon
                                      >[0]["name"]
                                    }
                                    size={13}
                                  />
                                </div>

                                {/* Body */}
                                <div
                                  style={{
                                    flex: 1,
                                    minWidth: 0,
                                    paddingTop: 3,
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 8,
                                      marginBottom: 3,
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: 12.5,
                                        fontWeight: 700,
                                        color: "var(--ink)",
                                        lineHeight: 1.3,
                                        flex: 1,
                                        minWidth: 0,
                                      }}
                                    >
                                      {item.title}
                                    </span>
                                    {item.time && (
                                      <span
                                        style={{
                                          fontSize: 10,
                                          color: "var(--ink5)",
                                          fontWeight: 400,
                                          flexShrink: 0,
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        {relTime(item.time)}
                                      </span>
                                    )}
                                  </div>
                                  {item.desc && (
                                    <div
                                      style={{
                                        fontSize: 11.5,
                                        color: "var(--ink4)",
                                        lineHeight: 1.45,
                                        marginBottom: 5,
                                      }}
                                    >
                                      {item.desc}
                                    </div>
                                  )}
                                  {item.chips && item.chips.length > 0 && (
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 5,
                                        flexWrap: "wrap",
                                      }}
                                    >
                                      {item.chips.map((chip, ci) => (
                                        <span
                                          key={ci}
                                          style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            padding: "2px 7px",
                                            borderRadius: 4,
                                            fontFamily: '"DM Mono",monospace',
                                            fontSize: 9.5,
                                            fontWeight: 600,
                                            background: chip.cls
                                              ? (chipBgMap[chip.cls] ??
                                                "var(--bg3)")
                                              : "var(--bg3)",
                                            border: `0.5px solid ${chip.cls ? (chipBrdMap[chip.cls] ?? "var(--brd2)") : "var(--brd2)"}`,
                                            color: chip.cls
                                              ? (chipClrMap[chip.cls] ??
                                                "var(--ink5)")
                                              : "var(--ink5)",
                                            textTransform: "uppercase",
                                            letterSpacing: ".04em",
                                            whiteSpace: "nowrap",
                                          }}
                                        >
                                          {chip.label}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div
                          style={{
                            padding: "40px 16px",
                            textAlign: "center",
                            color: "var(--ink5)",
                            fontSize: 13,
                          }}
                        >
                          No activity recorded yet.
                        </div>
                      )}
                    </div>
                  );
                })()}
            </div>
          </>
        )}
      </div>
    </>
  );
};

// ─── Column definitions ───────────────────────────────────────────────────────
const COLS = [
  { key: "name", label: "Account", sortable: true },
  { key: "heat", label: "Heat", sortable: true },
  { key: "stage", label: "Stage", sortable: true },
  { key: "signals", label: "Signals · 14d", sortable: false },
  { key: "value", label: "ARR", sortable: true },
  { key: "lastTouch", label: "Last touch", sortable: false },
  { key: "owner", label: "Owner", sortable: false },
];

// ─── Main component ───────────────────────────────────────────────────────────
interface AccountsViewProps {
  openAcc: string | null;
  setOpenAcc: (id: string | null) => void;
}

const AccountsView: React.FC<AccountsViewProps> = ({ openAcc, setOpenAcc }) => {
  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isLive, setIsLive] = React.useState(false);
  const [sort, setSort] = React.useState<string>("temp");
  const [sortDir, setSortDir] = React.useState<1 | -1>(1);
  const [q, setQ] = React.useState("");
  const [newPanelOpen, setNewPanelOpen] = React.useState(false);
  const [newPanelWidth, setNewPanelWidth] = React.useState(480);

  React.useEffect(() => {
    let el = document.getElementById("acc-styles");
    if (!el) {
      el = document.createElement("style");
      el.id = "acc-styles";
      document.head.appendChild(el);
    }
    el.textContent = accountsStyles;
  }, []);

  React.useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiFetch(`${baseUrl()}/accounts`, {
          headers: authHeaders(),
        });
        if (!res.ok)
          throw new Error(`API error ${res.status}: ${res.statusText}`);
        const data: ApiAccount[] = await res.json();
        setAccounts((Array.isArray(data) ? data : [data]).map(mapAccount));
        setIsLive(true);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Failed to load accounts",
        );
        setIsLive(false);
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  const handleSort = (key: string) => {
    if (sort === key) setSortDir((d) => (d === 1 ? -1 : 1) as 1 | -1);
    else {
      setSort(key);
      setSortDir(1);
    }
  };

  const sorted = React.useMemo(() => {
    const list = [...accounts].filter(
      (a) =>
        !q ||
        a.name.toLowerCase().includes(q.toLowerCase()) ||
        a.domain.toLowerCase().includes(q.toLowerCase()) ||
        a.industry.toLowerCase().includes(q.toLowerCase()),
    );
    const dir = sortDir;
    if (sort === "temp") list.sort((a, b) => (b.temp - a.temp) * dir);
    if (sort === "value") list.sort((a, b) => (b.value - a.value) * dir);
    if (sort === "name")
      list.sort((a, b) => a.name.localeCompare(b.name) * dir);
    if (sort === "heat")
      list.sort(
        (a, b) =>
          (["hot", "warm", "cool"].indexOf(a.heat) -
            ["hot", "warm", "cool"].indexOf(b.heat)) *
          dir,
      );
    if (sort === "stage")
      list.sort((a, b) => a.stage.localeCompare(b.stage) * dir);
    return list;
  }, [sort, sortDir, q, accounts]);

  return (
    <div className="acc-view">
      {/* ── Header ── */}
      <div className="acc-hdr">
        <div className="acc-hdr-h">Accounts</div>
        <div className="acc-hdr-meta">
          {loading ? "…" : `${sorted.length} of ${accounts.length}`}
        </div>

        {!loading &&
          (isLive ? (
            <div className="acc-api-badge live">
              <span className="acc-api-dot" /> live
            </div>
          ) : error ? (
            <div className="acc-api-badge" title={error}>
              <Icon name="wifi-off" size={9} /> offline
            </div>
          ) : null)}

        <div className="acc-hdr-tools">
          <div className="acc-srch-wrap">
            <span className="ic">
              <Icon name="search" size={13} />
            </span>
            <input
              className="acc-srch"
              placeholder="Search accounts, domains, industries…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <button className="btn sm">
            <Icon name="filter" size={12} /> Filter
          </button>
          <button className="btn sm" onClick={() => handleSort(sort)}>
            <Icon name="arrow-up-down" size={12} /> Sort: {sort}
          </button>
          <button className="btn sm pri" onClick={() => setNewPanelOpen(true)}>
            <Icon name="plus" size={12} /> New
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      {error && !loading && accounts.length === 0 ? (
        <div className="acc-state">
          <Icon name="wifi-off" size={32} />
          <div className="acc-state-title">Could not load accounts</div>
          <div className="acc-state-sub">{error}</div>
          <button className="btn sm" onClick={() => window.location.reload()}>
            <Icon name="refresh-cw" size={12} /> Retry
          </button>
        </div>
      ) : (
        /* ── Scroll area + card container — matches ConstellationView's .blv + .card ── */
        <div className="acc-scroll">
          <div className="acc-card-wrap">
            {/* Column headers */}
            <div className="acc-col-head">
              {COLS.map((col) => (
                <div
                  key={col.key}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  style={col.sortable ? { cursor: "pointer" } : {}}
                >
                  {col.label}
                  {col.sortable && (
                    <span
                      className={
                        "sort-arrow" + (sort === col.key ? " active" : "")
                      }
                    >
                      {sort === col.key ? (sortDir === 1 ? " ↑" : " ↓") : " ↕"}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Skeleton */}
            {loading && <SkeletonRows n={8} />}

            {/* Account rows */}
            {!loading &&
              sorted.map((a, rowIdx) => {
                const stageMeta = STAGES.find((s) => s.id === a.stage);
                return (
                  <div
                    key={a.id}
                    className={"acc-card-row" + (openAcc === a.id ? " on" : "")}
                    style={{ animationDelay: `${rowIdx * 18}ms` }}
                    onClick={() => setOpenAcc(a.id)}
                  >
                    {/* Account name + domain */}
                    <div>
                      <div className="acc-name-cell">
                        <span
                          className={"av " + avBg(a.name)}
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: 9,
                            fontSize: 11,
                            flexShrink: 0,
                          }}
                        >
                          {initials(a.name)}
                        </span>
                        <div className="acc-name-info">
                          <div className="acc-name-nm">{a.name}</div>
                          <div className="acc-name-dm">
                            {a.domain}
                            {a.industry && a.industry !== "—"
                              ? ` · ${a.industry}`
                              : ""}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Heat */}
                    <div>
                      <span className={"heat-bub heat-" + a.heat}>
                        <span className={"heat-dot " + a.heat} />
                        {heatLabel(a.heat)}
                      </span>
                    </div>

                    {/* Stage */}
                    <div>
                      <span className={"stage-chip " + a.stage}>
                        {stageMeta ? stageMeta.name : stageLabel(a.stage)}
                      </span>
                    </div>

                    {/* Sparkline */}
                    <div>
                      <Sparkline
                        data={a.signals}
                        width={110}
                        height={24}
                        color="var(--p)"
                        fill="var(--p)"
                      />
                    </div>

                    {/* ARR */}
                    <div>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#0f172a",
                          fontFamily: '"DM Mono",monospace',
                        }}
                      >
                        {a.value > 0 ? (
                          fmt$(a.value)
                        ) : (
                          <span style={{ color: "#94a3b8" }}>—</span>
                        )}
                      </span>
                    </div>

                    {/* Last touch */}
                    <div>
                      <span
                        style={{
                          fontSize: 11,
                          color: "#94a3b8",
                          fontFamily: '"DM Mono",monospace',
                        }}
                      >
                        {a.lastTouch}
                      </span>
                    </div>

                    {/* Owner avatar */}
                    <div style={{ justifyContent: "center" }}>
                      {a.owner && a.owner !== "—" ? (
                        <span
                          className={"av " + avBg(a.owner)}
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 8,
                            fontSize: 9,
                          }}
                          title={a.owner}
                        >
                          {initials(a.owner)}
                        </span>
                      ) : (
                        <span style={{ color: "#94a3b8", fontSize: 11 }}>
                          —
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

            {/* No search results */}
            {!loading && accounts.length > 0 && sorted.length === 0 && (
              <div className="acc-state" style={{ padding: "48px 20px" }}>
                <Icon name="search" size={28} />
                <div className="acc-state-title">No accounts match "{q}"</div>
                <div className="acc-state-sub">
                  Try a different name, domain, or industry.
                </div>
              </div>
            )}

            {/* Empty state */}
            {!loading && accounts.length === 0 && !error && (
              <div className="acc-state" style={{ padding: "64px 20px" }}>
                <Icon name="building-2" size={32} />
                <div className="acc-state-title">No accounts yet</div>
                <div className="acc-state-sub">
                  Add your first account or check your tenant configuration.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Detail panel */}
      {openAcc && (
        <AccountDetail accountId={openAcc} onClose={() => setOpenAcc(null)} />
      )}

      {/* New Account panel */}
      {newPanelOpen && (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(20,18,40,.32)",
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(3px)",
              zIndex: 29,
              animation: "bdIn .18s ease",
            }}
            onClick={() => setNewPanelOpen(false)}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: newPanelWidth,
              minWidth: 360,
              maxWidth: "92%",
              zIndex: 30,
              boxShadow: "-8px 0 40px rgba(60,50,150,.18)",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 5,
                cursor: "ew-resize",
                zIndex: 31,
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                const startX = e.clientX,
                  startW = newPanelWidth;
                const onMove = (mv: MouseEvent) =>
                  setNewPanelWidth(
                    Math.max(
                      360,
                      Math.min(
                        window.innerWidth * 0.92,
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
            <NewAccountPanel
              onClose={() => setNewPanelOpen(false)}
              onCreated={() => {
                setNewPanelOpen(false);
                window.location.reload();
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AccountsView;
