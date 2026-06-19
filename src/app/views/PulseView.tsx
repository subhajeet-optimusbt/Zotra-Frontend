import React, { useState, useEffect, useCallback } from "react";
import { baseUrl, apiFetch } from "../utils/utils";
import { getToken } from "../../services/api";
import {
  Layers,
  Radar,
  Sparkles,
  Mail,
  TriangleAlert,
  Trophy,
  Filter,
  RotateCw,
  TrendingUp,
  Activity,
  BarChart3,
  Brain,
  MessageCircle,
  Users,
  Clock,
} from "lucide-react";

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  p: "var(--p)",
  pl: "var(--pl)",
  pd: "var(--pd)",
  pp: "var(--pp)",
  pu: "var(--pu)",
  t: "#1A9E7C",
  tp: "#E0F4EF",
  td: "#0F6050",
  amber: "#C4922A",
  amberp: "#FBF3E0",
  ink: "var(--ink)",
  ink2: "var(--ink2)",
  ink3: "var(--ink3)",
  ink4: "var(--ink4)",
  ink5: "var(--ink5)",
  bg: "var(--bg)",
  bg2: "var(--bg2)",
  bg3: "var(--bg3)",
  bg4: "#DDD3BC",
  brd: "var(--brd)",
  brd2: "var(--brd2)",
  brd3: "var(--brd3)",
  ok: "#1A9E7C",
  okb: "#E0F4EF",
  okf: "#0F6050",
  wa: "#C4922A",
  wab: "#FBF3E0",
  waf: "#7C5C10",
  ri: "#C45252",
  rib: "#FAE8E8",
  rif: "#7A2020",
  shS: "0 1px 3px rgba(60,50,150,.06),0 0 0 0.5px rgba(60,50,150,.07)",
  shM: "0 3px 10px rgba(60,50,150,.08),0 0 0 0.5px rgba(60,50,150,.08)",
};

export type TenantAge = "new" | "week1" | "month1" | "month6" | "established";

// ── Helpers ───────────────────────────────────────────────────────────────────
const AV: [string, string][] = [
  ["#5552C9", "#7370E0"],
  ["#1A9E7C", "#2BBF97"],
  ["#C4922A", "#D9AC55"],
  ["#C45252", "#D97777"],
  ["#3F75DC", "#6398F0"],
  ["#7A4EDB", "#9E78EE"],
  ["#1F8A5B", "#34A974"],
];
const avGrad = (n: string) =>
  AV[(n.charCodeAt(0) + (n.charCodeAt(1) || 0)) % 7];
const inits = (n: string) =>
  n
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
const fmt$ = (n: number) =>
  n >= 1e6
    ? "$" + (n / 1e6).toFixed(1) + "M"
    : n >= 1e3
      ? "$" + Math.round(n / 1e3) + "K"
      : "$" + n;

function Av({
  name,
  size = 22,
  r = 7,
}: {
  name: string;
  size?: number;
  r?: number;
}) {
  const [a, b] = avGrad(name);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: r,
        flexShrink: 0,
        background: `linear-gradient(135deg,${a},${b})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: size * 0.4,
        fontWeight: 700,
        letterSpacing: "-0.01em",
      }}
    >
      {inits(name)}
    </div>
  );
}

// ── Skeleton primitives ───────────────────────────────────────────────────────
function Sk({
  w,
  h,
  r = 6,
  style,
}: {
  w: number | string;
  h: number;
  r?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="skel"
      style={{ width: w, height: h, borderRadius: r, flexShrink: 0, ...style }}
    />
  );
}

// ── Skeleton: one signal card ─────────────────────────────────────────────────
function SignalCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div
      style={{
        border: `0.5px solid ${C.brd}`,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: C.shS,
        marginBottom: 8,
        background: featured
          ? `linear-gradient(160deg,${C.pu} 0%,${C.bg2} 50%)`
          : C.bg2,
        padding: featured ? "14px 16px 15px" : "12px 15px 13px",
      }}
    >
      {/* head row: avatar + tag + time */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 10,
        }}
      >
        <Sk w={18} h={18} r={5} />
        <Sk w={80} h={11} r={5} />
        <Sk w={46} h={18} r={5} />
        <Sk w={40} h={10} r={4} style={{ marginLeft: "auto" }} />
      </div>
      {/* title */}
      <Sk
        w={featured ? "72%" : "60%"}
        h={featured ? 14 : 13}
        r={5}
        style={{ marginBottom: 8 }}
      />
      {/* detail — 2 lines */}
      <Sk w="92%" h={11} r={4} style={{ marginBottom: 5 }} />
      <Sk w="68%" h={11} r={4} style={{ marginBottom: featured ? 14 : 0 }} />
      {/* action buttons — only on featured */}
      {featured && (
        <div style={{ display: "flex", gap: 6 }}>
          <Sk w={72} h={26} r={7} />
          <Sk w={60} h={26} r={7} />
        </div>
      )}
    </div>
  );
}

// ── Skeleton: day divider ─────────────────────────────────────────────────────
function DayDivSkeleton() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "14px 0 8px",
      }}
    >
      <Sk w={36} h={9} r={4} />
      <div style={{ flex: 1, height: 0.5, background: C.brd }} />
    </div>
  );
}

// ── Skeleton: sidebar ─────────────────────────────────────────────────────────
function SidebarSkeleton() {
  return (
    <div
      style={{
        width: 272,
        flexShrink: 0,
        borderLeft: `0.5px solid ${C.brd}`,
        background: C.bg2,
        padding: "16px 16px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {/* pipeline + risk tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[0, 1].map((i) => (
          <div
            key={i}
            style={{
              background: C.bg3,
              borderRadius: 10,
              padding: "13px 14px",
              border: `0.5px solid ${C.brd}`,
              boxShadow: C.shS,
            }}
          >
            <Sk w={44} h={8} r={3} style={{ marginBottom: 8 }} />
            <Sk w={56} h={22} r={5} style={{ marginBottom: 6 }} />
            <Sk w={72} h={10} r={4} />
          </div>
        ))}
      </div>

      {/* forecast block */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 10,
          }}
        >
          <Sk w={10} h={10} r={2} />
          <Sk w={90} h={9} r={4} />
        </div>
        <div
          style={{
            background: C.bg2,
            borderRadius: 10,
            padding: "12px 14px",
            border: `0.5px solid ${C.brd}`,
            boxShadow: C.shS,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <div>
              <Sk w={36} h={9} r={3} style={{ marginBottom: 5 }} />
              <Sk w={50} h={12} r={4} />
            </div>
            <div>
              <Sk w={60} h={9} r={3} style={{ marginBottom: 5 }} />
              <Sk w={44} h={12} r={4} />
            </div>
          </div>
          <Sk w="100%" h={5} r={3} style={{ marginBottom: 6 }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Sk w={72} h={9} r={3} />
            <Sk w={80} h={9} r={3} />
          </div>
          <Sk w="100%" h={26} r={7} style={{ marginTop: 10 }} />
        </div>
      </div>

      {/* hot intent block */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 10,
          }}
        >
          <Sk w={10} h={10} r={2} />
          <Sk w={64} h={9} r={4} />
        </div>
        <div
          style={{
            background: C.bg2,
            borderRadius: 10,
            border: `0.5px solid ${C.brd}`,
            overflow: "hidden",
            boxShadow: C.shS,
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "9px 12px",
                borderBottom: i < 3 ? `0.5px solid ${C.brd}` : "none",
              }}
            >
              <Sk w={24} h={24} r={7} />
              <div style={{ flex: 1 }}>
                <Sk w={80} h={11} r={4} style={{ marginBottom: 5 }} />
                <Sk w={110} h={9} r={3} />
              </div>
              {/* sparkline bars */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 1.5,
                  height: 18,
                  flexShrink: 0,
                }}
              >
                {[40, 55, 45, 70, 60, 75, 80, 65, 85, 90, 100].map((pct, j) => (
                  <div
                    key={j}
                    className="skel"
                    style={{
                      width: 3,
                      height: `${(pct / 100) * 16 + 2}px`,
                      borderRadius: 2,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* agents live block */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 10,
          }}
        >
          <Sk w={10} h={10} r={2} />
          <Sk w={56} h={9} r={4} />
        </div>
        <div
          style={{
            background: C.bg2,
            borderRadius: 10,
            border: `0.5px solid ${C.brd}`,
            overflow: "hidden",
            boxShadow: C.shS,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "9px 12px",
                borderBottom: i < 2 ? `0.5px solid ${C.brd}` : "none",
              }}
            >
              <Sk w={7} h={7} r={10} />
              <div style={{ flex: 1 }}>
                <Sk w={60} h={11} r={4} style={{ marginBottom: 5 }} />
                <Sk w={120} h={9} r={3} />
              </div>
              <Sk w={34} h={18} r={5} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Full feed skeleton ────────────────────────────────────────────────────────
function FeedSkeleton() {
  return (
    <div style={{ padding: "4px 24px 32px" }}>
      <DayDivSkeleton />
      <SignalCardSkeleton featured />
      <SignalCardSkeleton />
      <SignalCardSkeleton />
      <SignalCardSkeleton />
      <DayDivSkeleton />
      <SignalCardSkeleton />
      <SignalCardSkeleton />
      <SignalCardSkeleton />
    </div>
  );
}

// ── Signal data ───────────────────────────────────────────────────────────────
type SigType =
  | "intent"
  | "email"
  | "meeting"
  | "call"
  | "agent"
  | "doc"
  | "alert"
  | "win"
  | "loss"
  | "visit"
  | "hire";
interface Sig {
  id: string;
  time: string;
  ts: number;
  type: SigType;
  account: string;
  title: string;
  detail: string;
  actor?: string | null;
  actions?: string[];
  importance?: string | null;
}

// ── API types ─────────────────────────────────────────────────────────────────
interface ApiPulseStream {
  partitionKey: string;
  rowKey: string;
  intakeId: string | null;
  accountId: string | null;
  workspaceId: string | null;
  workspaceType: string | null;
  pulseGroup: string | null;
  streamType: string | null;
  eventType: string | null;
  authorType: string | null;
  authorName: string | null;
  title: string | null;
  summary: string | null;
  importance: string | null;
  needsAction: boolean;
  actions: string[] | null;
  sourceEntityType: string | null;
  sourceEntityId: string | null;
  status: string | null;
  isDeleted: boolean;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string;
}

// ── Session helpers ───────────────────────────────────────────────────────────
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

function mapSigType(stream: ApiPulseStream): SigType {
  const st = (stream.streamType ?? "").toLowerCase();
  const et = (stream.eventType ?? "").toLowerCase();
  const pg = (stream.pulseGroup ?? "").toLowerCase();
  if (st === "email") return "email";
  if (st === "call") return "call";
  if (st === "meeting") return "meeting";
  if (et === "won") return "win";
  if (et === "lost") return "loss";
  if (et === "hired" || et === "hire") return "hire";
  if (pg === "inbox") return "email";
  if (pg === "sales" && st === "log" && et === "created") return "intent";
  if (stream.authorType === "System" && st === "log") return "agent";
  if (et === "visit" || et === "visited") return "visit";
  if (et === "alert") return "alert";
  return "agent";
}

function relativeTime(iso: string): { label: string; tsMinutes: number } {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diffMs = now - then;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 2) return { label: "just now", tsMinutes: 0 };
  if (mins < 60) return { label: `${mins}m ago`, tsMinutes: mins };
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return { label: `${hrs}h ago`, tsMinutes: mins };
  const days = Math.floor(hrs / 24);
  if (days === 1) return { label: "yesterday", tsMinutes: mins };
  return { label: `${days}d ago`, tsMinutes: mins };
}

function mapPulseStream(raw: ApiPulseStream): Sig {
  const { label, tsMinutes } = relativeTime(raw.createdAt);
  const accountKey = raw.accountId ?? raw.rowKey;
  let actor: string | null = null;
  if (raw.authorType === "System" || raw.createdBy === "system")
    actor = "Zotra";
  if (raw.authorName) actor = raw.authorName;
  return {
    id: raw.rowKey,
    time: label,
    ts: tsMinutes,
    type: mapSigType(raw),
    account: accountKey,
    actor: actor === "api" || actor === "system" ? null : actor,
    title: raw.title ?? "(no title)",
    detail: raw.summary ?? "",
    importance: raw.importance,
    actions: raw.needsAction
      ? (raw.actions ?? ["View", "Dismiss"])
      : (raw.actions ?? undefined),
  };
}

function accountDisplayName(s: Sig, raw: ApiPulseStream): string {
  if (raw.accountId) return raw.accountId;
  const emailMatch = raw.title?.match(/<[^@]+@([^>]+)>/);
  if (emailMatch) {
    const domain = emailMatch[1].split(".").slice(0, -1).join(" ");
    return domain.charAt(0).toUpperCase() + domain.slice(1);
  }
  return s.account;
}

const SIG: {
  [k in SigType]: {
    label: string;
    stripe: string;
    tagBg: string;
    tagFg: string;
  };
} = {
  intent: { label: "Intent", stripe: C.p, tagBg: C.pp, tagFg: C.pd },
  email: { label: "Reply", stripe: C.t, tagBg: C.tp, tagFg: C.td },
  meeting: { label: "Meeting", stripe: C.p, tagBg: C.pp, tagFg: C.pd },
  call: { label: "Call", stripe: C.ok, tagBg: C.okb, tagFg: C.okf },
  agent: { label: "Agent", stripe: C.amber, tagBg: C.amberp, tagFg: "#7C5C10" },
  doc: { label: "Document", stripe: C.ink5, tagBg: C.bg3, tagFg: C.ink4 },
  alert: { label: "Risk", stripe: C.wa, tagBg: C.wab, tagFg: C.waf },
  win: { label: "Won", stripe: C.ok, tagBg: C.okb, tagFg: C.okf },
  loss: { label: "Lost", stripe: C.ri, tagBg: C.rib, tagFg: C.rif },
  visit: { label: "Visit", stripe: C.p, tagBg: C.pp, tagFg: C.pd },
  hire: { label: "Hire", stripe: C.p, tagBg: C.pp, tagFg: C.pd },
};

const FILTERS = [
  { id: "all", name: "All", Ic: Layers, types: null },
  {
    id: "intent",
    name: "Intent",
    Ic: Radar,
    types: ["intent", "visit", "hire"],
  },
  { id: "agent", name: "Agent activity", Ic: Sparkles, types: ["agent"] },
  { id: "email", name: "Replies", Ic: Mail, types: ["email"] },
  { id: "alert", name: "Risks", Ic: TriangleAlert, types: ["alert"] },
  { id: "win", name: "Wins", Ic: Trophy, types: ["win", "loss"] },
];

const PHASE_LABEL: Record<TenantAge, string> = {
  new: "Day 1",
  week1: "Week 1",
  month1: "Month 1",
  month6: "Month 6",
  established: "Live",
};

// ── Signal card ───────────────────────────────────────────────────────────────
function SignalCard({
  s,
  featured,
  accName,
}: {
  s: Sig;
  featured?: boolean;
  accName?: string;
}) {
  const m = SIG[s.type] || SIG.intent;
  return (
    <div
      style={{
        border: `0.5px solid ${featured ? "color-mix(in srgb, var(--p) 30%, transparent)" : C.brd}`,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: featured
          ? `0 4px 16px color-mix(in srgb, var(--p) 10%, transparent),${C.shS}`
          : C.shS,
        cursor: "pointer",
        marginBottom: 8,
        background: featured
          ? `linear-gradient(160deg,${C.pu} 0%,${C.bg2} 50%)`
          : C.bg2,
      }}
    >
      <div style={{ padding: featured ? "14px 16px 15px" : "12px 15px 13px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 6,
            flexWrap: "wrap",
          }}
        >
          {accName && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11.5,
                fontWeight: 600,
                color: C.ink,
              }}
            >
              <Av name={accName} size={18} r={5} />
              {accName}
            </span>
          )}
          {s.actor && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: C.amber,
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                background: C.amberp,
                padding: "2px 7px",
                borderRadius: 6,
                border: `0.5px solid rgba(196,146,42,0.22)`,
              }}
            >
              <Sparkles size={9} />
              {s.actor}
            </span>
          )}
          <span
            style={{
              fontSize: 9,
              fontFamily: "'IBM Plex Mono',monospace",
              fontWeight: 600,
              padding: "2px 7px",
              borderRadius: 5,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: m.tagBg,
              color: m.tagFg,
            }}
          >
            {m.label}
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontFamily: "'IBM Plex Mono',monospace",
              fontSize: 10,
              color: C.ink5,
            }}
          >
            {s.time}
          </span>
        </div>
        <div
          style={{
            fontSize: featured ? 14 : 13,
            fontWeight: 600,
            color: C.ink,
            letterSpacing: "-.012em",
            lineHeight: 1.35,
            marginBottom: 4,
            fontFamily: "'Outfit',sans-serif",
          }}
        >
          {s.title}
        </div>
        <div
          style={{
            fontSize: 12,
            color: C.ink3,
            lineHeight: 1.55,
            marginBottom: s.actions?.length ? 10 : 0,
          }}
        >
          {s.detail}
        </div>
        {s.actions && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            {s.actions.map((a, i) => (
              <button
                key={i}
                style={{
                  fontSize: 11,
                  padding: "4px 11px",
                  borderRadius: 7,
                  background: i === 0 && featured ? C.p : C.bg3,
                  color: i === 0 && featured ? "#fff" : C.ink2,
                  border: `0.5px solid ${i === 0 && featured ? C.p : C.brd2}`,
                  cursor: "pointer",
                  fontWeight: 500,
                  fontFamily: "'Outfit',sans-serif",
                  boxShadow:
                    i === 0 && featured
                      ? `0 1px 5px rgba(85,82,201,0.22)`
                      : "none",
                }}
              >
                {a}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Right sidebar ─────────────────────────────────────────────────────────────
const FORECAST = {
  committed: 412000,
  bestCase: 716000,
  closed: 248000,
  quota: 900000,
};
const HOT = [
  {
    name: "Acme Robotics",
    sub: "4 visitors · /pricing /security",
    bars: [3, 5, 4, 7, 6, 8, 9, 7, 9, 10, 12],
  },
  {
    name: "Northwind",
    sub: "opened MSA 3x · 23min ago",
    bars: [4, 5, 3, 6, 5, 7, 6, 8, 7, 9, 11],
  },
  {
    name: "Orbit Logistics",
    sub: "1 visitor · /case-studies",
    bars: [3, 4, 3, 5, 4, 6, 5, 7, 8, 9, 10],
  },
  {
    name: "Wisp Studios",
    sub: "forwarded brief internally",
    bars: [3, 4, 3, 5, 4, 5, 6, 5, 7, 6, 9],
  },
];

function SbLabel({
  icon: Icon,
  label,
  right,
}: {
  icon: React.ElementType;
  label: string;
  right?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 10,
      }}
    >
      <Icon size={10} color={C.ink5} />
      <span
        style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.13em",
          textTransform: "uppercase",
          color: C.ink5,
          fontFamily: "'IBM Plex Mono',monospace",
        }}
      >
        {label}
      </span>
      {right && <div style={{ marginLeft: "auto" }}>{right}</div>}
    </div>
  );
}

function SbCard({
  children,
  bg,
  border,
}: {
  children: React.ReactNode;
  bg?: string;
  border?: string;
}) {
  return (
    <div
      style={{
        background: bg || C.bg2,
        borderRadius: 10,
        padding: "13px 14px",
        marginBottom: 8,
        border: `0.5px solid ${border || C.brd}`,
        boxShadow: C.shS,
      }}
    >
      {children}
    </div>
  );
}

function Sidebar({
  tenantAge,
  stats,
}: {
  tenantAge: TenantAge;
  stats: {
    pipeline: string;
    pipelineUnit: string;
    risk: number;
    exposure: string;
  };
}) {
  return (
    <div
      style={{
        width: 272,
        flexShrink: 0,
        borderLeft: `0.5px solid ${C.brd}`,
        background: C.bg2,
        overflowY: "auto",
        padding: "16px 16px 28px",
        fontFamily: "'Outfit',sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <SbCard
          bg={C.pp}
          border="color-mix(in srgb, var(--p) 18%, transparent)"
        >
          <div
            style={{
              fontSize: 8.5,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: C.pd,
              marginBottom: 5,
              fontFamily: "'IBM Plex Mono',monospace",
            }}
          >
            Pipeline
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: C.p,
              letterSpacing: "-.03em",
              lineHeight: 1,
            }}
          >
            {stats.pipeline}
            <span style={{ fontSize: 13, fontWeight: 600, marginLeft: 1 }}>
              {stats.pipelineUnit}
            </span>
          </div>
          <div
            style={{
              fontSize: 10.5,
              color: C.pd,
              marginTop: 4,
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <TrendingUp size={10} /> +$184K this week
          </div>
        </SbCard>
        <SbCard bg={C.rib} border="rgba(196,82,82,0.18)">
          <div
            style={{
              fontSize: 8.5,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: C.rif,
              marginBottom: 5,
              fontFamily: "'IBM Plex Mono',monospace",
            }}
          >
            At risk
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: C.ri,
              letterSpacing: "-.03em",
              lineHeight: 1,
            }}
          >
            {stats.risk}
          </div>
          <div
            style={{
              fontSize: 10.5,
              color: C.rif,
              marginTop: 4,
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <TriangleAlert size={10} /> {stats.exposure} exposure
          </div>
        </SbCard>
      </div>

      <div>
        <SbLabel icon={BarChart3} label="Quarter forecast" />
        <div
          style={{
            background: C.bg2,
            borderRadius: 10,
            padding: "12px 14px",
            border: `0.5px solid ${C.brd}`,
            boxShadow: C.shS,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 3,
            }}
          >
            {[
              ["Quota", "$900K"],
              ["Committed", fmt$(FORECAST.committed)],
            ].map(([l, v]) => (
              <div key={l}>
                <div style={{ fontSize: 9.5, color: C.ink5, marginBottom: 1 }}>
                  {l}
                </div>
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono',monospace",
                    fontWeight: 600,
                    fontSize: 12,
                    color: C.ink2,
                  }}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              height: 5,
              background: C.bg3,
              borderRadius: 3,
              overflow: "hidden",
              margin: "10px 0 6px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                height: "100%",
                borderRadius: 3,
                background: `${C.p}35`,
                width: `${(FORECAST.bestCase / FORECAST.quota) * 100}%`,
              }}
            />
            <div
              style={{
                position: "absolute",
                height: "100%",
                borderRadius: 3,
                background: C.p,
                width: `${(FORECAST.committed / FORECAST.quota) * 100}%`,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 9.5,
              color: C.ink5,
            }}
          >
            <span>Closed {fmt$(FORECAST.closed)}</span>
            <span>Best case {fmt$(FORECAST.bestCase)}</span>
          </div>
          <button
            style={{
              width: "100%",
              marginTop: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              height: 26,
              borderRadius: 7,
              border: `0.5px solid ${C.brd2}`,
              background: C.bg,
              color: C.ink3,
              fontSize: 11,
              cursor: "pointer",
              fontFamily: "'Outfit',sans-serif",
            }}
          >
            <Sparkles size={11} />
            Ask Zotra to plan the gap
          </button>
        </div>
      </div>

      <div>
        <SbLabel
          icon={Radar}
          label="Hot intent"
          right={
            <span
              style={{
                fontSize: 10,
                color: C.p,
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              all
            </span>
          }
        />
        <div
          style={{
            background: C.bg2,
            borderRadius: 10,
            border: `0.5px solid ${C.brd}`,
            overflow: "hidden",
            boxShadow: C.shS,
          }}
        >
          {HOT.map((it, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "9px 12px",
                borderBottom: i < 3 ? `0.5px solid ${C.brd}` : "none",
                cursor: "pointer",
                transition: "background .12s",
              }}
            >
              <Av name={it.name} size={24} r={7} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 11.5,
                    fontWeight: 600,
                    color: C.ink,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {it.name}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: C.ink4,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {it.sub}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 1.5,
                  height: 18,
                  flexShrink: 0,
                }}
              >
                {it.bars.map((v, j) => (
                  <div
                    key={j}
                    style={{
                      width: 3,
                      borderRadius: 2,
                      background: `color-mix(in srgb, var(--p) ${Math.round((0.15 + (v / 12) * 0.72) * 100)}%, transparent)`,
                      height: `${(v / 12) * 16 + 2}px`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {tenantAge === "month1" && (
        <div>
          <SbLabel icon={Brain} label="What Zotra has learned" />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              {
                Ic: MessageCircle,
                text: (
                  <>
                    You reply{" "}
                    <strong style={{ color: C.ink, fontWeight: 600 }}>
                      warmer on Tuesdays
                    </strong>{" "}
                    — Zotra adapts tone by weekday.
                  </>
                ),
              },
              {
                Ic: Users,
                text: (
                  <>
                    You always{" "}
                    <strong style={{ color: C.ink, fontWeight: 600 }}>
                      cc Marcus on legal threads
                    </strong>
                    . Zotra now auto-suggests him.
                  </>
                ),
              },
              {
                Ic: Clock,
                text: (
                  <>
                    Customers reply{" "}
                    <strong style={{ color: C.ink, fontWeight: 600 }}>
                      34% faster
                    </strong>{" "}
                    to 2pm sends.
                  </>
                ),
              },
            ].map((it, i) => {
              const Ic = it.Ic;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "flex-start",
                    padding: "8px 10px",
                    borderRadius: 9,
                    background: C.bg,
                    border: `0.5px solid ${C.brd}`,
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      background: C.pp,
                      color: C.p,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Ic size={11} />
                  </div>
                  <div
                    style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.5 }}
                  >
                    {it.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <SbLabel icon={Activity} label="Agents live" />
        <div
          style={{
            background: C.bg2,
            borderRadius: 10,
            border: `0.5px solid ${C.brd}`,
            overflow: "hidden",
            boxShadow: C.shS,
          }}
        >
          {[
            {
              name: "Watcher",
              sub: "Scanning signals continuously",
              color: C.p,
            },
            { name: "Forager", sub: "Enriching 3 new accounts", color: C.t },
            { name: "Composer", sub: "Draft queue: 4 items", color: C.amber },
          ].map((a, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "9px 12px",
                borderBottom: i < 2 ? `0.5px solid ${C.brd}` : "none",
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: a.color,
                  flexShrink: 0,
                  boxShadow: `0 0 0 2.5px ${a.color}28`,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: C.ink }}>
                  {a.name}
                </div>
                <div style={{ fontSize: 10, color: C.ink4 }}>{a.sub}</div>
              </div>
              <span
                style={{
                  fontSize: 9,
                  fontFamily: "'IBM Plex Mono',monospace",
                  fontWeight: 600,
                  background: C.okb,
                  color: C.okf,
                  padding: "2px 7px",
                  borderRadius: 5,
                  letterSpacing: "0.06em",
                }}
              >
                LIVE
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 6-month retro banner ──────────────────────────────────────────────────────
function RetroBanner() {
  return (
    <div
      style={{
        padding: "14px 24px 0",
        background: C.bg2,
        borderBottom: `0.5px solid ${C.brd}`,
      }}
    >
      <div
        style={{
          borderRadius: 14,
          padding: "18px 22px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
          background:
            "linear-gradient(135deg,#3A2A1C 0%,#2A1E10 50%,#2D4A3C 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -40,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(85,82,201,0.20) 0%,transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ flex: 1, minWidth: 0, position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(250,248,243,0.50)",
              marginBottom: 5,
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "'IBM Plex Mono',monospace",
            }}
          >
            <Sparkles size={10} />6 months with Zotra
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "-.02em",
              lineHeight: 1.2,
              marginBottom: 5,
              color: "var(--bg2)",
              fontFamily: "'Playfair Display',serif",
            }}
          >
            47 opportunities closed · $1.2M won · 312 hours saved
          </div>
          <div
            style={{
              fontSize: 12,
              color: "rgba(250,248,243,0.58)",
              lineHeight: 1.55,
              maxWidth: 500,
            }}
          >
            Zotra drafted 1,847 replies — you sent 1,520 of them. Watcher caught
            11 champion shifts before they cost you an opportunity.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 20,
            flexShrink: 0,
            position: "relative",
            zIndex: 1,
          }}
        >
          {[
            ["Win rate", "38%"],
            ["Cycle time", "−18d"],
            ["Reply speed", "−72%"],
          ].map(([l, v]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: "rgba(250,248,243,0.45)",
                  fontFamily: "'IBM Plex Mono',monospace",
                }}
              >
                {l}
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: "-.02em",
                  lineHeight: 1.1,
                  marginTop: 3,
                  color: "var(--bg2)",
                  fontFamily: "'Playfair Display',serif",
                }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Day divider ───────────────────────────────────────────────────────────────
function DayDiv({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "14px 0 8px",
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: C.ink5,
        fontFamily: "'IBM Plex Mono',monospace",
      }}
    >
      {label}
      <div style={{ flex: 1, height: 0.5, background: C.brd }} />
    </div>
  );
}

// ── Main PulseView ────────────────────────────────────────────────────────────
export default function PulseView({
  tenantAge = "established",
}: {
  tenantAge?: TenantAge;
}) {
  const [filter, setFilter] = useState("all");
  const [feed, setFeed] = useState<Sig[]>([]);
  const [accNames, setAccNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStreams = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      const tenantId = getTenantId();
      const url = `${baseUrl()}/pulse-streams${tenantId ? `?partitionKey=${tenantId}` : ""}`;
      const res = await apiFetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ApiPulseStream[] = await res.json();
      const mapped = data
        .filter((r) => !r.isDeleted && r.status !== "Deleted")
        .map(mapPulseStream);
      const names: Record<string, string> = {};
      data.forEach((raw, i) => {
        const sig = mapped[i];
        if (sig) names[sig.id] = accountDisplayName(sig, raw);
      });
      setFeed(mapped);
      setAccNames(names);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load pulse streams");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStreams();
  }, [fetchStreams]);

  const filtered =
    filter === "all"
      ? feed
      : feed.filter((p) => {
          const f = FILTERS.find((x) => x.id === filter);
          return f && f.types && f.types.includes(p.type);
        });
  const todaySigs = filtered.filter((p) => p.ts < 1440);
  const yestSigs = filtered.filter((p) => p.ts >= 1440);

  const counts = FILTERS.reduce(
    (acc, f) => {
      acc[f.id] =
        f.id === "all"
          ? feed.length
          : feed.filter((p) => f.types && f.types.includes(p.type)).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  const stats =
    tenantAge === "month1"
      ? { pipeline: "$412", pipelineUnit: "K", risk: 1, exposure: "$84K" }
      : { pipeline: "$1.36", pipelineUnit: "M", risk: 2, exposure: "$310K" };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        minHeight: 0,
        fontFamily: "'Outfit',sans-serif",
      }}
    >
      {tenantAge === "month6" && <RetroBanner />}

      {/* ── Top bar ── */}
      <div
        style={{
          flexShrink: 0,
          background: C.bg2,
          borderBottom: `0.5px solid ${C.brd}`,
        }}
      >
        <div
          style={{
            height: 54,
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: "-.018em",
                fontFamily: "'Sora',sans-serif",
              }}
            >
              Pulse
            </div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono',monospace",
                fontSize: 10,
                color: C.ink5,
                letterSpacing: "0.04em",
              }}
            >
              {loading
                ? "loading…"
                : `${counts.all} signals · ${PHASE_LABEL[tenantAge] || "Live"}`}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              marginLeft: 8,
              flexWrap: "wrap",
            }}
          >
            {FILTERS.map((f) => {
              const isOn = filter === f.id;
              const Ic = f.Ic;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  style={{
                    height: 28,
                    padding: "0 11px",
                    borderRadius: 20,
                    border: `0.5px solid ${isOn ? C.p : C.brd2}`,
                    background: isOn ? C.p : C.bg3,
                    color: isOn ? "#fff" : C.ink3,
                    fontSize: 11,
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    whiteSpace: "nowrap",
                    fontFamily: "'Outfit',sans-serif",
                    transition: "all .13s",
                    boxShadow: isOn ? `0 1px 6px rgba(85,82,201,0.22)` : "none",
                  }}
                >
                  <Ic size={11} />
                  {f.name}
                  {(counts[f.id] || 0) > 0 && (
                    <span
                      style={{
                        fontFamily: "'IBM Plex Mono',monospace",
                        fontSize: 9,
                        padding: "0 4px",
                        borderRadius: 8,
                        background: isOn
                          ? "rgba(255,255,255,0.22)"
                          : "var(--brd2)",
                      }}
                    >
                      {counts[f.id]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 6,
              flexShrink: 0,
            }}
          >
            <button
              style={{
                height: 30,
                padding: "0 12px",
                borderRadius: 8,
                border: `0.5px solid ${C.brd2}`,
                background: C.bg2,
                color: C.ink3,
                fontSize: 11.5,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "'Outfit',sans-serif",
              }}
            >
              <Filter size={11} />
              Owner: me
            </button>
            <button
              onClick={fetchStreams}
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                border: `0.5px solid ${C.brd2}`,
                background: C.bg2,
                color: C.ink4,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RotateCw
                size={12}
                style={{
                  animation: loading ? "spin 1s linear infinite" : undefined,
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ── Feed + sidebar ── */}
      <div
        style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}
      >
        {/* feed */}
        <div
          style={{ flex: 1, overflowY: "auto", minWidth: 0, background: C.bg }}
        >
          {/* ── SKELETON ── */}
          {loading && (
            <div
              style={{ display: "flex", overflow: "hidden", height: "100%" }}
            >
              <div style={{ flex: 1, padding: "4px 24px 32px", minWidth: 0 }}>
                <FeedSkeleton />
              </div>
              <SidebarSkeleton />
            </div>
          )}

          {/* ── ERROR ── */}
          {!loading && error && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 60,
                gap: 12,
                color: C.ri,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: C.rib,
                  border: `0.5px solid rgba(196,82,82,0.18)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TriangleAlert size={22} />
              </div>
              <div style={{ fontSize: 13 }}>{error}</div>
              <button
                onClick={fetchStreams}
                style={{
                  fontSize: 12,
                  padding: "6px 14px",
                  borderRadius: 8,
                  border: `0.5px solid ${C.brd2}`,
                  background: C.bg2,
                  color: C.ink3,
                  cursor: "pointer",
                  fontFamily: "'Outfit',sans-serif",
                }}
              >
                Retry
              </button>
            </div>
          )}

          {/* ── FEED ── */}
          {!loading && !error && (
            <div style={{ padding: "4px 24px 32px" }}>
              {todaySigs.length > 0 && (
                <>
                  <DayDiv label="Today" />
                  {todaySigs.map((s, i) => (
                    <SignalCard
                      key={s.id}
                      s={s}
                      accName={accNames[s.id]}
                      featured={
                        i === 0 ||
                        (s.type === "email" && s.importance === "High") ||
                        s.ts === 0
                      }
                    />
                  ))}
                </>
              )}
              {yestSigs.length > 0 && (
                <>
                  <DayDiv label="Yesterday" />
                  {yestSigs.map((s) => (
                    <SignalCard key={s.id} s={s} accName={accNames[s.id]} />
                  ))}
                </>
              )}
              {filtered.length === 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 60,
                    color: C.ink4,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      background: C.bg2,
                      border: `0.5px solid ${C.brd}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 12,
                      color: C.ink5,
                    }}
                  >
                    <Layers size={22} />
                  </div>
                  <div style={{ fontSize: 13, color: C.ink4 }}>
                    No signals matching this filter.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* real sidebar — only when loaded */}
        {!loading && <Sidebar tenantAge={tenantAge} stats={stats} />}
      </div>
    </div>
  );
}
