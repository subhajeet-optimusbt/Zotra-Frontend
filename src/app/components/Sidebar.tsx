import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";
import type { ViewType } from "../types";
import type { UserProfile } from "../types/userProfile";
import { getAvatarInitials } from "../types/userProfile";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../services/api";

// ─── Org Branding Context ─────────────────────────────────────────────────────
export interface OrgBranding {
  logoUrl: string;
  orgName: string;
  orgPlan?: string;
}
const OrgBrandingContext = createContext<OrgBranding>({
  logoUrl: "",
  orgName: "",
  orgPlan: "",
});
export const OrgBrandingProvider: React.FC<{
  value: OrgBranding;
  children: React.ReactNode;
}> = ({ value, children }) => (
  <OrgBrandingContext.Provider value={value}>
    {children}
  </OrgBrandingContext.Provider>
);
export function useOrgBranding(): OrgBranding {
  return useContext(OrgBrandingContext);
}

interface SidebarProps {
  view: ViewType;
  setView: (v: ViewType) => void;
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;
  profile?: UserProfile | null;
  profileLoading?: boolean;
  orgBranding?: OrgBranding;
  navCounts?: Record<string, number>;
  onProfileClick?: () => void;
}

interface IcProps {
  active?: boolean;
}

const ic = (active?: boolean) => ({
  stroke: active ? "var(--sb-ic-active)" : "var(--sb-ic-stroke)",
  fill: active ? "var(--sb-ic-fill)" : "none",
  faint: active ? "var(--sb-ic-faint)" : "none",
  dot: active ? "var(--sb-ic-active)" : "var(--sb-ic-stroke)",
  w: "1.5" as const,
  cap: "round" as const,
  join: "round" as const,
});

const IcSunrise = ({ active }: IcProps) => {
  const s = ic(active);
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 2v1.5M3.2 4.2l1.1 1.1M1.5 9h1.5M12 9h1.5M11.7 4.2l-1.1 1.1"
        stroke={s.stroke}
        strokeWidth={s.w}
        strokeLinecap={s.cap}
      />
      <path
        d="M4 9a4 4 0 0 1 8 0"
        stroke={s.stroke}
        strokeWidth={s.w}
        strokeLinecap={s.cap}
      />
      <line
        x1="2"
        y1="11.5"
        x2="14"
        y2="11.5"
        stroke={s.stroke}
        strokeWidth={s.w}
        strokeLinecap={s.cap}
      />
    </svg>
  );
};
const IcActivity = ({ active }: IcProps) => {
  const s = ic(active);
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <polyline
        points="1,10 3.5,6.5 6,10.5 9,4.5 12,8 15,5.5"
        stroke={s.stroke}
        strokeWidth={s.w}
        strokeLinecap={s.cap}
        strokeLinejoin={s.join}
        fill="none"
      />
    </svg>
  );
};
const IcInbox = ({ active }: IcProps) => {
  const s = ic(active);
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M1.5 9h3l1.5 2.5h4L11.5 9h3"
        stroke={s.stroke}
        strokeWidth={s.w}
        strokeLinecap={s.cap}
        strokeLinejoin={s.join}
      />
      <path
        d="M2.5 4.5h11a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1Z"
        stroke={s.stroke}
        strokeWidth={s.w}
        fill={s.fill}
      />
      <path
        d="M1.5 9h13"
        stroke={s.stroke}
        strokeWidth={s.w}
        strokeLinecap={s.cap}
      />
    </svg>
  );
};
const IcBuilding = ({ active }: IcProps) => {
  const s = ic(active);
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect
        x="2"
        y="4"
        width="8"
        height="11"
        rx="1"
        stroke={s.stroke}
        strokeWidth={s.w}
        fill={s.fill}
      />
      <path
        d="M10 7h3a1 1 0 0 1 1 1v7H10"
        stroke={s.stroke}
        strokeWidth={s.w}
        strokeLinejoin={s.join}
      />
      <rect
        x="4"
        y="6.5"
        width="1.8"
        height="1.8"
        rx="0.4"
        fill={s.dot}
        opacity="0.7"
      />
      <rect
        x="7.2"
        y="6.5"
        width="1.8"
        height="1.8"
        rx="0.4"
        fill={s.dot}
        opacity="0.7"
      />
      <rect
        x="4"
        y="10"
        width="1.8"
        height="1.8"
        rx="0.4"
        fill={s.dot}
        opacity="0.7"
      />
      <rect
        x="7.2"
        y="10"
        width="1.8"
        height="1.8"
        rx="0.4"
        fill={s.dot}
        opacity="0.5"
      />
      <rect
        x="5"
        y="13"
        width="2.5"
        height="2"
        rx="0.4"
        fill={s.dot}
        opacity="0.8"
      />
    </svg>
  );
};
const IcTarget = ({ active }: IcProps) => {
  const s = ic(active);
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle
        cx="8"
        cy="8"
        r="6.5"
        stroke={s.stroke}
        strokeWidth={s.w}
        opacity="0.35"
      />
      <circle
        cx="8"
        cy="8"
        r="4"
        stroke={s.stroke}
        strokeWidth={s.w}
        opacity="0.65"
      />
      <circle cx="8" cy="8" r="1.8" fill={s.dot} />
    </svg>
  );
};
const IcKanban = ({ active }: IcProps) => {
  const s = ic(active);
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect
        x="1.5"
        y="1.5"
        width="13"
        height="13"
        rx="2"
        stroke={s.stroke}
        strokeWidth={s.w}
        fill={s.fill}
      />
      <rect
        x="3.5"
        y="4"
        width="2.5"
        height="6"
        rx="0.8"
        fill={s.dot}
        opacity={active ? 0.9 : 0.5}
      />
      <rect
        x="6.75"
        y="4"
        width="2.5"
        height="4.5"
        rx="0.8"
        fill={s.dot}
        opacity={active ? 0.7 : 0.4}
      />
      <rect
        x="10"
        y="4"
        width="2.5"
        height="3"
        rx="0.8"
        fill={s.dot}
        opacity={active ? 0.5 : 0.3}
      />
    </svg>
  );
};
const IcReceipt = ({ active }: IcProps) => {
  const s = ic(active);
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3.5 1.5h9v13l-1.5-1-1.5 1-1.5-1-1.5 1-1.5-1-1.5 1Z"
        stroke={s.stroke}
        strokeWidth={s.w}
        strokeLinejoin={s.join}
        fill={s.fill}
      />
      <line
        x1="5.5"
        y1="5.5"
        x2="10.5"
        y2="5.5"
        stroke={s.stroke}
        strokeWidth={s.w}
        strokeLinecap={s.cap}
      />
      <line
        x1="5.5"
        y1="8"
        x2="10.5"
        y2="8"
        stroke={s.stroke}
        strokeWidth={s.w}
        strokeLinecap={s.cap}
      />
      <line
        x1="5.5"
        y1="10.5"
        x2="8.5"
        y2="10.5"
        stroke={s.stroke}
        strokeWidth={s.w}
        strokeLinecap={s.cap}
      />
    </svg>
  );
};
const IcRefresh = ({ active }: IcProps) => {
  const s = ic(active);
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M13 2.5v3.5h-3.5"
        stroke={s.stroke}
        strokeWidth={s.w}
        strokeLinecap={s.cap}
        strokeLinejoin={s.join}
      />
      <path
        d="M3 13.5v-3.5h3.5"
        stroke={s.stroke}
        strokeWidth={s.w}
        strokeLinecap={s.cap}
        strokeLinejoin={s.join}
      />
      <path
        d="M12.5 6.5A5.5 5.5 0 1 0 13 9.5"
        stroke={s.stroke}
        strokeWidth={s.w}
        strokeLinecap={s.cap}
      />
    </svg>
  );
};
const IcDashboard = ({ active }: IcProps) => {
  const s = ic(active);
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect
        x="1.5"
        y="1.5"
        width="5.5"
        height="7"
        rx="1.2"
        stroke={s.stroke}
        strokeWidth={s.w}
        fill={s.fill}
      />
      <rect
        x="9"
        y="1.5"
        width="5.5"
        height="3.5"
        rx="1.2"
        stroke={s.stroke}
        strokeWidth={s.w}
        fill={s.fill}
      />
      <rect
        x="9"
        y="7"
        width="5.5"
        height="7.5"
        rx="1.2"
        stroke={s.stroke}
        strokeWidth={s.w}
        fill={s.fill}
      />
      <rect
        x="1.5"
        y="10.5"
        width="5.5"
        height="4"
        rx="1.2"
        stroke={s.stroke}
        strokeWidth={s.w}
        fill={s.fill}
      />
    </svg>
  );
};
const IcBarChart = ({ active }: IcProps) => {
  const s = ic(active);
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect
        x="2"
        y="9"
        width="3"
        height="5.5"
        rx="0.8"
        stroke={s.stroke}
        strokeWidth={s.w}
        fill={s.fill}
      />
      <rect
        x="6.5"
        y="5.5"
        width="3"
        height="9"
        rx="0.8"
        stroke={s.stroke}
        strokeWidth={s.w}
        fill={s.fill}
      />
      <rect
        x="11"
        y="2.5"
        width="3"
        height="12"
        rx="0.8"
        stroke={s.stroke}
        strokeWidth={s.w}
        fill={s.fill}
      />
      <line
        x1="1"
        y1="15"
        x2="15"
        y2="15"
        stroke={s.stroke}
        strokeWidth={s.w}
        strokeLinecap={s.cap}
      />
    </svg>
  );
};
const IcBell = ({ active }: IcProps) => {
  const s = ic(active);
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1.5A4.5 4.5 0 0 0 3.5 6v3.5l-1 1.5h11l-1-1.5V6A4.5 4.5 0 0 0 8 1.5Z"
        stroke={s.stroke}
        strokeWidth={s.w}
        strokeLinejoin={s.join}
        fill={s.fill}
      />
      <path
        d="M6.5 11.5a1.5 1.5 0 0 0 3 0"
        stroke={s.stroke}
        strokeWidth={s.w}
        strokeLinecap={s.cap}
      />
    </svg>
  );
};
const IcCpu = ({ active }: IcProps) => {
  const s = ic(active);
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect
        x="4"
        y="4"
        width="8"
        height="8"
        rx="1.5"
        stroke={s.stroke}
        strokeWidth={s.w}
        fill={s.fill}
      />
      <rect
        x="5.8"
        y="5.8"
        width="4.4"
        height="4.4"
        rx="0.8"
        stroke={s.stroke}
        strokeWidth="1"
        fill={s.faint}
      />
      <path
        d="M6 1.5V4M8 1.5V4M10 1.5V4M6 12v2.5M8 12v2.5M10 12v2.5M1.5 6H4M1.5 8H4M1.5 10H4M12 6h2.5M12 8h2.5M12 10h2.5"
        stroke={s.stroke}
        strokeWidth="1.3"
        strokeLinecap={s.cap}
      />
    </svg>
  );
};
const IcRocket = ({ active }: IcProps) => {
  const s = ic(active);
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1.5C5.5 3.5 4.5 7 4.5 9l2.5 2.5c2 0 5.5-1 7.5-3.5C15 3 13 1 8 1.5Z"
        stroke={s.stroke}
        strokeWidth={s.w}
        strokeLinejoin={s.join}
        fill={s.fill}
      />
      <path
        d="M4.5 9L2.5 11l.8 2.2L5.5 12.5 7 11"
        stroke={s.stroke}
        strokeWidth={s.w}
        strokeLinecap={s.cap}
        strokeLinejoin={s.join}
      />
      <circle cx="9.5" cy="6.5" r="1.3" stroke={s.stroke} strokeWidth="1.3" />
    </svg>
  );
};
const IcMap = ({ active }: IcProps) => {
  const s = ic(active);
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M1.5 4l4.5-2 4.5 2 4.5-2v10l-4.5 2-4.5-2-4.5 2Z"
        stroke={s.stroke}
        strokeWidth={s.w}
        strokeLinejoin={s.join}
        fill={s.fill}
      />
      <line
        x1="6"
        y1="2"
        x2="6"
        y2="14"
        stroke={s.stroke}
        strokeWidth="1"
        strokeLinecap={s.cap}
        opacity="0.45"
      />
      <line
        x1="10.5"
        y1="2"
        x2="10.5"
        y2="14"
        stroke={s.stroke}
        strokeWidth="1"
        strokeLinecap={s.cap}
        opacity="0.45"
      />
    </svg>
  );
};
const IcConfigure = ({ active }: IcProps) => {
  const s = ic(active);
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="2" stroke={s.stroke} strokeWidth={s.w} />
      <path
        d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41"
        stroke={s.stroke}
        strokeWidth="1.4"
        strokeLinecap={s.cap}
      />
    </svg>
  );
};
const IcChevronLeft = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path
      d="M9 11L5 7l4-4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IcChevronRight = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path
      d="M5 11l4-4-4-4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IcChevronsUpDown = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path
      d="M4.5 5.5L7 3l2.5 2.5M4.5 8.5L7 11l2.5-2.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IcSliders = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path
      d="M2 4.5h8M12 4.5h2"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <circle cx="11" cy="4.5" r="1.5" stroke="currentColor" strokeWidth="1.3" />
    <path
      d="M2 11.5h2M6 11.5h8"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <circle
      cx="4.5"
      cy="11.5"
      r="1.5"
      stroke="currentColor"
      strokeWidth="1.3"
    />
  </svg>
);
const IcLogOut = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path
      d="M6.5 3H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M11 5.5L13.5 8 11 10.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="7"
      y1="8"
      x2="13.5"
      y2="8"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);
const IcMessageCircle = ({ active }: IcProps) => {
  const s = ic(active);
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M14 7.5a6 6 0 0 1-6 6 5.97 5.97 0 0 1-3.07-.84L2 13.5l.84-2.93A5.97 5.97 0 0 1 2 7.5a6 6 0 0 1 12 0Z"
        stroke={s.stroke}
        strokeWidth={s.w}
        strokeLinejoin={s.join}
        fill={s.fill}
      />
      <circle cx="5.5" cy="7.5" r="0.8" fill={s.dot} />
      <circle cx="8" cy="7.5" r="0.8" fill={s.dot} />
      <circle cx="10.5" cy="7.5" r="0.8" fill={s.dot} />
    </svg>
  );
};
const IcBot = ({ active }: IcProps) => {
  const s = ic(active);
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect
        x="2"
        y="5.5"
        width="12"
        height="8"
        rx="2"
        stroke={s.stroke}
        strokeWidth={s.w}
        fill={s.fill}
      />
      <circle cx="5.5" cy="9.5" r="1.2" fill={s.dot} />
      <circle cx="10.5" cy="9.5" r="1.2" fill={s.dot} />
      <path
        d="M6 12.5h4"
        stroke={s.stroke}
        strokeWidth="1.2"
        strokeLinecap={s.cap}
        opacity="0.6"
      />
      <path
        d="M8 5.5V3"
        stroke={s.stroke}
        strokeWidth={s.w}
        strokeLinecap={s.cap}
      />
      <circle cx="8" cy="2.5" r="0.8" fill={s.dot} />
      <path
        d="M1 8.5H2M14 8.5h1"
        stroke={s.stroke}
        strokeWidth={s.w}
        strokeLinecap={s.cap}
        opacity="0.5"
      />
    </svg>
  );
};
const IcPackage = ({ active }: IcProps) => {
  const s = ic(active);
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M13.5 5L8 2 2.5 5v6L8 14l5.5-3V5Z"
        stroke={s.stroke}
        strokeWidth={s.w}
        strokeLinejoin={s.join}
        fill={s.fill}
      />
      <path
        d="M8 2v12"
        stroke={s.stroke}
        strokeWidth="1"
        strokeLinecap={s.cap}
        opacity="0.4"
      />
      <path
        d="M2.5 5L8 8l5.5-3"
        stroke={s.stroke}
        strokeWidth="1"
        strokeLinecap={s.cap}
        opacity="0.5"
      />
      <path
        d="M5.25 3.5L10.75 6.5"
        stroke={s.dot}
        strokeWidth="1.1"
        strokeLinecap={s.cap}
        opacity={active ? 0.7 : 0.35}
      />
    </svg>
  );
};

const IcProfile = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle
      cx="8"
      cy="5.5"
      r="2.8"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M2.5 13.5c0-3 2.5-4.5 5.5-4.5s5.5 1.5 5.5 4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ICONS: Record<string, React.FC<IcProps>> = {
  sunrise: IcSunrise,
  activity: IcActivity,
  inbox: IcInbox,
  "building-2": IcBuilding,
  target: IcTarget,
  "kanban-square": IcKanban,
  receipt: IcReceipt,
  "refresh-cw": IcRefresh,
  "layout-dashboard": IcDashboard,
  "bar-chart-3": IcBarChart,
  bell: IcBell,
  cpu: IcCpu,
  rocket: IcRocket,
  map: IcMap,
  configure: IcConfigure,
  "chevron-left": IcChevronLeft,
  "chevron-right": IcChevronRight,
  "chevrons-up-down": IcChevronsUpDown,
  "sliders-horizontal": IcSliders,
  "log-out": IcLogOut,
  "message-circle": IcMessageCircle,
  bot: IcBot,
  package: IcPackage,
};

const NavIcon: React.FC<{ name: string; active?: boolean }> = ({
  name,
  active,
}) => {
  const Comp = ICONS[name];
  return Comp ? <Comp active={active} /> : null;
};

const sidebarStyles = `
/* ─── CSS variable wiring for icon colours ─────────────────────────────────── */
.sb-item{
  --sb-ic-stroke: var(--ink4);
  --sb-ic-active: var(--p);
  --sb-ic-fill:   color-mix(in srgb, var(--p) 12%, transparent);
  --sb-ic-faint:  color-mix(in srgb, var(--p)  7%, transparent);
  --sb-ic-dot:    var(--ink4);
  color: var(--ink4);
}
.sb-item.on{
  --sb-ic-stroke: var(--p);
  --sb-ic-active: var(--p);
  --sb-ic-fill:   color-mix(in srgb, var(--p) 15%, transparent);
  --sb-ic-faint:  color-mix(in srgb, var(--p)  8%, transparent);
  --sb-ic-dot:    var(--p);
  color: var(--p);
}
.sb-item:hover:not(.on){
  --sb-ic-stroke: var(--ink2);
  --sb-ic-dot:    var(--ink2);
  color: var(--p);
}

/* ─── Shell ──────────────────────────────────────────────────────────────────── */
.sb{
  width:212px;flex-shrink:0;
  background:var(--bg2);
  border-right:0.5px solid var(--brd2);
  display:flex;flex-direction:column;
  height:100vh;
  transition:width .22s cubic-bezier(.4,0,.2,1);
  overflow:hidden;position:relative;z-index:50;
}
.sb.collapsed{width:54px}

/* ─── Brand ─────────────────────────────────────────────────────────────────── */
.sb-brand{
  height:54px;display:flex;align-items:center;gap:9px;
  padding:0 14px;flex-shrink:0;
  border-bottom:0.5px solid var(--brd2);
  background:linear-gradient(180deg,color-mix(in srgb,var(--p) 3%,var(--bg2)) 0%,var(--bg2) 100%);
}
.sb-brand-name{
  font-weight:700;font-size:23px;color:var(--p);
  letter-spacing:-0.03em;
}
.sb.collapsed .sb-brand{padding:0;justify-content:center}
.sb.collapsed .sb-brand-name{display:none}

/* ─── Nav scroll area ───────────────────────────────────────────────────────── */
.sb-nav{flex:1;overflow-y:auto;overflow-x:hidden;padding:8px 6px;scrollbar-width:none}
.sb-nav::-webkit-scrollbar{display:none}
.sb.collapsed .sb-nav{padding:8px 6px}

/* ─── Section labels ────────────────────────────────────────────────────────── */
.sb-lbl{
  display:flex;align-items:center;gap:6px;
  font-size:9px;font-weight:700;letter-spacing:0.11em;
  text-transform:uppercase;color:var(--ink5);
  padding:14px 8px 5px;
  white-space:nowrap;overflow:hidden;
  font-family:"IBM Plex Mono",monospace;
  opacity:0.75;
}
.sb-lbl::before{
  content:"";
  display:block;width:2px;height:8px;border-radius:2px;
  background:linear-gradient(180deg,var(--p),color-mix(in srgb,var(--p) 40%,transparent));
  flex-shrink:0;opacity:0.55;
}
.sb.collapsed .sb-lbl{opacity:0;height:0;padding:0;pointer-events:none}

/* ─── Nav items ─────────────────────────────────────────────────────────────── */
.sb-item{
  display:flex;align-items:center;gap:10px;
  padding:5px 7px;border-radius:9px;
  cursor:pointer;
  transition:background .13s, color .13s, border-color .13s, box-shadow .13s;
  margin-bottom:1px;
  border:0.5px solid transparent;
  white-space:nowrap;min-width:0;position:relative;
  font-size:12.5px;user-select:none;
  letter-spacing:-0.005em;
}
.sb-item:hover{
  background:color-mix(in srgb,var(--p) 6%,transparent);
}
.sb-item.on{
  background:color-mix(in srgb,var(--p) 10%,transparent);
  border-color:color-mix(in srgb,var(--p) 18%,transparent);
  font-weight:500;
  box-shadow:inset 0 0 0 0.5px color-mix(in srgb,var(--p) 20%,transparent),
             0 1px 3px color-mix(in srgb,var(--p) 8%,transparent);
}

.sb-item .si-ic{
  flex-shrink:0;width:27px;height:27px;
  display:flex;align-items:center;justify-content:center;
  border-radius:7px;
  transition:background .15s, box-shadow .15s;
}
.sb-item:hover .si-ic{
  background:color-mix(in srgb,var(--p) 9%,transparent);
}
.sb-item.on .si-ic{
  background:color-mix(in srgb,var(--p) 14%,transparent);
  box-shadow:0 1px 5px color-mix(in srgb,var(--p) 22%,transparent);
}

.sb-item .si-nm{flex:1;min-width:0;overflow:hidden}

.sb.collapsed .sb-item{
  justify-content:center;padding:0;margin:2px auto;
  width:38px;height:36px;border-radius:9px;gap:0;
}
.sb.collapsed .sb-item .si-nm,.sb.collapsed .sb-item .si-cnt{display:none}
.sb.collapsed .sb-item .si-ic{width:34px;height:34px;border-radius:9px}
.sb.collapsed .sb-item::after{
  content:attr(data-tip);position:absolute;left:calc(100% + 8px);top:50%;
  transform:translateY(-50%);
  background:var(--ink);color:var(--bg2);
  font-size:10.5px;padding:3px 8px;border-radius:6px;
  white-space:nowrap;pointer-events:none;opacity:0;z-index:200;
  transition:opacity .12s;font-weight:500;
}
.sb.collapsed .sb-item:hover::after{opacity:1}

/* ─── Badges ────────────────────────────────────────────────────────────────── */
.si-cnt{
  font-family:"IBM Plex Mono",monospace;font-size:10px;
  color:var(--ink5);background:var(--bg3);
  padding:1px 6px;border-radius:8px;flex-shrink:0;
}
.sb-item.on .si-cnt{
  background:color-mix(in srgb,var(--p) 14%,transparent);
  color:var(--p);
}
.si-cnt.alert{background:var(--p);color:#fff}
.si-cnt.live{background:var(--ok);color:#fff}
.si-cnt.warn{background:var(--wab);color:var(--waf)}
.si-cnt.dot{padding:0;width:7px;height:7px;border-radius:50%;background:var(--ri) !important}

/* ─── Divider ───────────────────────────────────────────────────────────────── */
.sb-div{height:0.5px;background:var(--brd2);margin:8px 6px}
.sb.collapsed .sb-div{margin:8px auto;width:24px}

/* ─── Footer / identity card ────────────────────────────────────────────────── */
.sb-footer{padding:0;flex-shrink:0}

.sb-identity-card{
  border-radius:0;border:none;
  border-top:0.5px solid var(--brd2);
  background:
    linear-gradient(180deg,
      color-mix(in srgb,var(--p) 5%,var(--bg2)) 0%,
      color-mix(in srgb,var(--bg3) 55%,var(--bg2)) 100%
    );
  overflow:hidden;transition:background .15s;
  position:relative;
}
.sb-identity-card::before{
  content:"";
  display:block;height:1px;width:100%;
  background:linear-gradient(90deg,
    transparent 0%,
    color-mix(in srgb,var(--p) 35%,transparent) 30%,
    color-mix(in srgb,var(--p) 35%,transparent) 70%,
    transparent 100%
  );
  position:absolute;top:0;left:0;
}
.sb-identity-card:hover{
  background:
    linear-gradient(180deg,
      color-mix(in srgb,var(--p) 7%,var(--bg2)) 0%,
      color-mix(in srgb,var(--p) 3%,var(--bg3)) 100%
    );
}

.sb.collapsed .sb-footer{padding:0}
.sb.collapsed .sb-identity-card{
  display:flex;flex-direction:column;align-items:center;gap:2px;
  padding:6px 0 8px;border-radius:0;
  border-top:0.5px solid var(--brd2);
}

/* ── Org row ── */
.sb-org{
  display:flex;align-items:center;gap:10px;
  padding:10px 12px 7px;overflow:hidden;cursor:default;
}
.sb-org-mark{
  width:34px;height:34px;min-width:34px;
  border-radius:50%;overflow:hidden;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
  background:var(--bg2);
  border:1.5px solid color-mix(in srgb,var(--p) 22%,var(--brd2));
  box-shadow:0 0 0 2.5px color-mix(in srgb,var(--p) 10%,transparent),
             0 2px 6px color-mix(in srgb,var(--p) 15%,transparent);
}
.sb-org-mark img{width:100%;height:100%;object-fit:cover;display:block}
.sb-org-initials{font-weight:700;font-size:11px;color:var(--p);letter-spacing:-0.02em;font-family:inherit}
.sb-org-text{min-width:0;flex:1;overflow:hidden;line-height:1.25}
.sb-org-label{font-size:8px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--ink5);margin-bottom:1px;opacity:0.7}
.sb-org-name{font-size:12px;font-weight:600;color:var(--ink2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:-0.015em}
.sb-org-plan{
  font-size:8px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;
  color:var(--p);
  background:color-mix(in srgb,var(--p) 12%,transparent);
  border:0.5px solid color-mix(in srgb,var(--p) 22%,transparent);
  border-radius:4px;padding:1px 5px;
  display:inline-block;margin-top:2px;
}
.sb.collapsed .sb-org{justify-content:center;padding:4px 0;width:100%}
.sb.collapsed .sb-org-text{display:none}

/* ── Divider inside card ── */
.sb-card-div{height:0.5px;background:var(--brd2);margin:0 12px;opacity:0.7}
.sb.collapsed .sb-card-div{width:26px;margin:2px auto;opacity:0.5;display:block}

/* ── User row ── */
.sb-user{
  display:flex;align-items:center;gap:10px;
  padding:7px 12px 10px;cursor:pointer;
  border-radius:0 0 14px 14px;
  transition:background .13s;
  overflow:hidden;position:relative;
}
.sb-user:hover{background:color-mix(in srgb,var(--p) 6%,transparent)}
.sb-user.menu-open{background:color-mix(in srgb,var(--p) 8%,transparent)}

.sb-avatar{
  width:34px;height:34px;min-width:34px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:12px;font-weight:700;color:#fff;
  background:var(--pg);
  overflow:hidden;letter-spacing:-0.02em;flex-shrink:0;
  border:1.5px solid color-mix(in srgb,var(--p) 22%,var(--brd2));
  box-shadow:0 0 0 2.5px color-mix(in srgb,var(--p) 10%,transparent);
  transition:box-shadow .15s,border-color .15s;
}
.sb-user:hover .sb-avatar{
  border-color:color-mix(in srgb,var(--p) 38%,transparent);
  box-shadow:0 0 0 3px color-mix(in srgb,var(--p) 16%,transparent);
}
.sb-avatar img{width:100%;height:100%;object-fit:cover;border-radius:50%}
.sb-avatar.pulse{animation:sb-pulse 1.6s ease-in-out infinite}
@keyframes sb-pulse{0%,100%{opacity:.4}50%{opacity:.9}}

.sb-uinfo{min-width:0;flex:1;display:flex;flex-direction:column;gap:0}
.sb-uname{font-size:12px;font-weight:600;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.3;letter-spacing:-0.01em}
.sb-urole{font-size:10px;color:var(--ink4);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.3}
.sb-chev{color:var(--ink5);flex-shrink:0;transition:transform .18s,color .15s}
.sb-chev.open{transform:rotate(180deg)}
.sb-user:hover .sb-chev{color:var(--ink3)}

.sb-sk{border-radius:4px;background:var(--bg3);animation:sb-pulse 1.4s ease-in-out infinite}
.sb-sk.w70{width:70px;height:9px;margin-bottom:5px}
.sb-sk.w44{width:44px;height:8px}

.sb.collapsed .sb-uinfo,.sb.collapsed .sb-chev{display:none}
.sb.collapsed .sb-user{justify-content:center;padding:4px 0;width:100%;border-radius:0 0 14px 14px}
.sb.collapsed .sb-user::after{
  content:attr(data-tip);position:absolute;left:calc(100% + 10px);top:50%;
  transform:translateY(-50%);
  background:var(--ink);color:var(--bg2);
  font-size:10.5px;padding:3px 9px;border-radius:6px;
  white-space:nowrap;pointer-events:none;opacity:0;z-index:200;
  transition:opacity .12s;font-weight:500;
}
.sb.collapsed .sb-user:hover::after{opacity:1}

/* ─── Collapse toggle ───────────────────────────────────────────────────────── */
.sb-collapse-btn{
  position:absolute;top:18px;right:-11px;
  width:22px;height:22px;border-radius:50%;
  background:var(--bg2);border:0.5px solid var(--brd2);
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;color:var(--ink4);z-index:60;
  opacity:0;transition:opacity .12s,background .12s,color .12s;
  box-shadow:var(--sh-s);
}
.sb:hover .sb-collapse-btn{opacity:1}
.sb-collapse-btn:hover{background:var(--p);color:#fff;border-color:var(--p)}

/* ─── Profile popup menu ─────────────────────────────────────────────────────── */
.sb-profile-menu{
  position:fixed;
  background:var(--bg2);
  border:0.5px solid var(--brd2);
  border-radius:16px;
  box-shadow:var(--sh-l), 0 0 0 1px color-mix(in srgb,var(--p) 6%,transparent);
  z-index:999;overflow:hidden;
  animation:pm-in .18s cubic-bezier(.34,1.26,.64,1);
  transform-origin:bottom left;
}
@keyframes pm-in{from{opacity:0;transform:scale(.93) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}

.sb-pm-email-section{
  padding:10px 14px 9px;
  background:color-mix(in srgb,var(--p) 4%,transparent);
  border-bottom:0.5px solid var(--brd);
}
.sb-pm-email-label{
  font-size:8.5px;font-weight:700;letter-spacing:0.1em;
  text-transform:uppercase;color:var(--ink5);
  margin-bottom:3px;opacity:0.7;
}
.sb-pm-email-val{
  font-family:"IBM Plex Mono",monospace;font-size:10.5px;
  color:var(--ink3);letter-spacing:0.01em;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.sb-pm-identity{
  padding:12px 14px 13px;border-bottom:0.5px solid var(--brd);
  display:flex;align-items:center;gap:12px;
}
.sb-pm-avatar{
  width:40px;height:40px;min-width:40px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:15px;font-weight:700;color:#fff;
  background:var(--pg);overflow:hidden;letter-spacing:-0.02em;flex-shrink:0;
  box-shadow:0 3px 12px color-mix(in srgb,var(--p) 30%,transparent);
}
.sb-pm-avatar img{width:100%;height:100%;object-fit:cover;border-radius:50%}
.sb-pm-details{min-width:0;flex:1;display:flex;flex-direction:column;gap:1px}
.sb-pm-name{
  font-size:13.5px;font-weight:650;color:var(--ink);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  line-height:1.35;letter-spacing:-0.015em;
}
.sb-pm-role{font-size:11px;color:var(--ink4);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.35;margin-top:1px}

.sb-pm-actions{padding:5px}
.sb-pm-item{
  display:flex;align-items:center;gap:10px;
  padding:7.5px 10px;border-radius:9px;
  cursor:pointer;font-size:12.5px;font-weight:500;color:var(--ink2);
  transition:background .12s,color .12s;
  border:none;width:100%;background:none;
  text-align:left;letter-spacing:-0.005em;
}
.sb-pm-item:hover{
  background:color-mix(in srgb,var(--p) 7%,transparent);
  color:var(--ink);
}
.sb-pm-item .pm-ic{
  color:var(--ink4);flex-shrink:0;
  width:27px;height:27px;border-radius:8px;
  background:var(--bg3);border:0.5px solid var(--brd2);
  display:flex;align-items:center;justify-content:center;
  transition:background .12s,color .12s,border-color .12s;
}
.sb-pm-item:hover .pm-ic{
  background:color-mix(in srgb,var(--p) 10%,transparent);
  color:var(--p);
  border-color:color-mix(in srgb,var(--p) 20%,transparent);
}
.sb-pm-item .pm-label{flex:1}
.sb-pm-item.danger{color:var(--ri)}
.sb-pm-item.danger .pm-ic{color:var(--ri);background:var(--rib);border-color:color-mix(in srgb,var(--ri) 20%,transparent)}
.sb-pm-item.danger:hover{background:var(--rib);color:var(--ri)}
.sb-pm-div{height:0.5px;background:var(--brd2);margin:3px 4px}

.sb-pm-cfg-arrow{
  display:flex;align-items:center;justify-content:center;
  width:20px;height:20px;border-radius:6px;
  border:0.5px solid var(--brd2);background:var(--bg3);
  color:var(--ink5);cursor:pointer;
  transition:background .12s,color .12s,border-color .12s;
  flex-shrink:0;padding:0;
}
.sb-pm-cfg-arrow:hover{
  background:color-mix(in srgb,var(--p) 10%,transparent);
  color:var(--p);
  border-color:color-mix(in srgb,var(--p) 25%,transparent);
}
.sb-pm-cfg-arrow.open,.sb-pm-cfg-arrow.active{
  background:color-mix(in srgb,var(--p) 14%,transparent);
  color:var(--p);
  border-color:color-mix(in srgb,var(--p) 30%,transparent);
}

/* ── Configure flyout ── */
.sb-configure-flyout{
  position:fixed;
  background:var(--bg2);
  border:0.5px solid var(--brd2);
  border-radius:13px;
  box-shadow:var(--sh-l), 0 0 0 1px color-mix(in srgb,var(--p) 5%,transparent);
  z-index:1000;
  width:196px;
  max-height:calc(100vh - 32px);
  overflow-y:auto;
  animation:cfg-fly-in .16s cubic-bezier(.34,1.26,.64,1);
  transform-origin:left center;
  scrollbar-width:thin;
  scrollbar-color:var(--brd2) transparent;
}
.sb-configure-flyout::-webkit-scrollbar{width:4px}
.sb-configure-flyout::-webkit-scrollbar-thumb{background:var(--brd2);border-radius:4px}
@keyframes cfg-fly-in{from{opacity:0;transform:scale(.92) translateX(-8px)}to{opacity:1;transform:scale(1) translateX(0)}}
.sb-cfg-header{
  font-size:8.5px;font-weight:700;letter-spacing:0.10em;
  text-transform:uppercase;color:var(--ink5);
  padding:10px 14px 7px;border-bottom:0.5px solid var(--brd);
  opacity:0.75;
  position:sticky;top:0;background:var(--bg2);z-index:1;
}
.sb-cfg-item{
  display:flex;align-items:center;gap:10px;
  padding:8px 10px;width:100%;
  background:none;border:none;text-align:left;
  font-size:12.5px;font-weight:400;color:var(--ink2);
  cursor:pointer;transition:background .11s,color .11s;font-family:inherit;
}
.sb-cfg-item:last-child{border-radius:0 0 13px 13px}
.sb-cfg-item:hover{background:color-mix(in srgb,var(--p) 6%,transparent);color:var(--ink)}
.sb-cfg-item.on{background:color-mix(in srgb,var(--p) 10%,transparent);color:var(--p);font-weight:500}
.sb-cfg-item .cfg-ic{
  --sb-ic-stroke:var(--ink4);
  --sb-ic-active:var(--p);
  --sb-ic-fill:color-mix(in srgb,var(--p) 12%,transparent);
  --sb-ic-faint:color-mix(in srgb,var(--p) 7%,transparent);
  --sb-ic-dot:var(--ink4);
  width:26px;height:26px;border-radius:7px;
  background:var(--bg3);border:0.5px solid var(--brd);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
  transition:background .12s;
}
.sb-cfg-item:hover .cfg-ic{
  background:color-mix(in srgb,var(--p) 9%,transparent);
  border-color:color-mix(in srgb,var(--p) 18%,transparent);
}
.sb-cfg-item.on .cfg-ic{
  --sb-ic-stroke:var(--p);--sb-ic-dot:var(--p);
  background:color-mix(in srgb,var(--p) 13%,transparent);
  border-color:color-mix(in srgb,var(--p) 22%,transparent);
}
`;

type NavItem = {
  id: ViewType;
  name: string;
  ic: string;
  count?: number;
  kind?: string;
};

const Sidebar: React.FC<SidebarProps> = ({
  view,
  setView,
  collapsed,
  setCollapsed,
  profile,
  profileLoading = false,
  orgBranding,
  navCounts = {},
  onProfileClick,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ bottom: 0, left: 0 });
  // Only track left — top is always 50vh via CSS, no bottom needed
  const flyoutLeftRef = useRef<number>(0);

  const footerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const flyoutRef = useRef<HTMLDivElement>(null);
  const emailRowRef = useRef<HTMLDivElement>(null);

  const ctxBranding = useOrgBranding();
  const { logoUrl, orgName, orgPlan } = orgBranding ?? ctxBranding;

  useEffect(() => {
    if (!menuOpen && !flyoutOpen) return;
    const handler = (e: MouseEvent) => {
      const inMenu = menuRef.current?.contains(e.target as Node);
      const inFlyout = flyoutRef.current?.contains(e.target as Node);
      const inFooter = footerRef.current?.contains(e.target as Node);
      if (!inMenu && !inFlyout && !inFooter) {
        setMenuOpen(false);
        setFlyoutOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen, flyoutOpen]);

  const handleUserClick = () => {
    if (footerRef.current) {
      const rect = footerRef.current.getBoundingClientRect();
      setMenuPos({
        bottom: window.innerHeight - rect.top + 6,
        left: rect.left,
      });
    }
    setMenuOpen((v) => !v);
    setFlyoutOpen(false);
  };

  const handleEmailArrowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (flyoutOpen) {
      setFlyoutOpen(false);
      return;
    }
    // Write to ref synchronously — no state update, no extra render
    if (emailRowRef.current) {
      const rect = emailRowRef.current.getBoundingClientRect();
      flyoutLeftRef.current = rect.right + 6;
    }
    // Single state update triggers exactly one render, ref value already correct
    setFlyoutOpen(true);
  };

  const today: NavItem[] = [
    { id: "pulse", name: "Pulse Stream", ic: "activity", kind: "alert" },
    {
      id: "inbox",
      name: "Intake",
      ic: "inbox",
      count: navCounts["inbox"],
      kind: "alert",
    },
  ];
  const records: NavItem[] = [
    {
      id: "accounts",
      name: "Accounts",
      ic: "building-2",
      count: navCounts["accounts"],
      kind: "alert",
    },
    {
      id: "deals",
      name: "Opportunity",
      ic: "target",
      count: navCounts["deals"],
      kind: "alert",
    },
  ];
  const insights: NavItem[] = [
    { id: "dashboard", name: "Dashboard", ic: "layout-dashboard" },
    { id: "reports", name: "Report", ic: "bar-chart-3" },
  ];
  const conversationItems: NavItem[] = [
    {
      id: "conversations",
      name: "Conversations",
      ic: "message-circle",
      count: 3,
      kind: "alert",
    },
    { id: "inventory", name: "Inventory", ic: "package" },
  ];
  const configureItems: NavItem[] = [
    { id: "rhythm", name: "Today", ic: "sunrise", count: 5, kind: "alert" },
    {
      id: "notifications",
      name: "Notifications",
      ic: "bell",
      count: 3,
      kind: "alert",
    },
    { id: "automation", name: "Automation", ic: "cpu", count: 3, kind: "live" },
    { id: "onboarding", name: "Quick Start", ic: "rocket" },
    { id: "journey", name: "Journey", ic: "map" },
    { id: "projects", name: "Project", ic: "kanban-square" },
    { id: "finance", name: "Finance", ic: "receipt" },
    { id: "renewal", name: "Renewal", ic: "refresh-cw" },
    { id: "testinbox", name: "Test Inbox", ic: "inbox" },
  ];

  const renderItems = (items: NavItem[]) =>
    items.map((it) => {
      const on = view === it.id;
      return (
        <div
          key={it.id}
          className={"sb-item" + (on ? " on" : "")}
          data-tip={it.name}
          onClick={() => setView(it.id)}
        >
          <span className="si-ic">
            <NavIcon name={it.ic} active={on} />
          </span>
          <span className="si-nm">{it.name}</span>
          {it.count != null && (
            <span className={"si-cnt" + (it.kind ? " " + it.kind : "")}>
              {it.count}
            </span>
          )}
        </div>
      );
    });

  const displayName =
    profile?.displayName ||
    (profile?.firstName && profile?.lastName
      ? `${profile.firstName} ${profile.lastName}`
      : "") ||
    profile?.email?.split("@")[0] ||
    "User";
  const displayRole =
    profile?.role || sessionStorage.getItem("zotra_role") || "";
  const displayEmail = profile?.email || "";
  const displayInitials = getAvatarInitials(profile ?? null);
  const tooltipName = profileLoading ? "Loading…" : displayName;
  const { clearAuth } = useAuth();
  const configureActive = configureItems.some((it) => it.id === view);

  const orgInitials = (orgName || "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Flyout is always vertically centred. Only left changes.
  // Guard: only render when flyoutLeft > 0 so it never paints at x=0.
  const flyoutStyle: React.CSSProperties = {
    position: "fixed",
    left: flyoutLeftRef.current,
    top: "50%",
    transform: "translateY(-50%)",
    maxHeight: "calc(100vh - 32px)",
    overflowY: "auto",
  };

  return (
    <>
      <style>{sidebarStyles}</style>
      <aside className={"sb" + (collapsed ? " collapsed" : "")}>
        <div
          className="sb-collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          <NavIcon name={collapsed ? "chevron-right" : "chevron-left"} />
        </div>

        {/* Brand */}
        <div className="sb-brand">
          <img
            src="https://zotra.blob.core.windows.net/content/logo.png"
            alt="Zotra"
            style={{ width: 36, height: 36, borderRadius: 6, flexShrink: 0 }}
          />
          <span className="sb-brand-name">zotra</span>
        </div>

        {/* Nav */}
        <nav className="sb-nav">
          <div className="sb-lbl">Today</div>
          {renderItems(today)}
          <div className="sb-lbl">Records</div>
          {renderItems(records)}
          <div className="sb-lbl">Insights</div>
          {renderItems(insights)}
          <div className="sb-lbl">Conversation Asst.</div>
          {renderItems(conversationItems)}
        </nav>

        {/* Footer — identity container */}
        <div className="sb-footer" ref={footerRef}>
          <div className="sb-identity-card">
            {/* Org row */}
            {(logoUrl || orgName) && (
              <div className="sb-org">
                <span className="sb-org-mark">
                  {logoUrl ? (
                    <img src={logoUrl} alt={orgName} />
                  ) : (
                    <span className="sb-org-initials">{orgInitials}</span>
                  )}
                </span>
                <div className="sb-org-text">
                  <div className="sb-org-label">Organisation</div>
                  <div className="sb-org-name">{orgName}</div>
                  {orgPlan && <div className="sb-org-plan">{orgPlan}</div>}
                </div>
              </div>
            )}

            <div
              className={"sb-user" + (menuOpen ? " menu-open" : "")}
              data-tip={tooltipName}
              onClick={handleUserClick}
            >
              <div className={"sb-avatar" + (profileLoading ? " pulse" : "")}>
                {!profileLoading &&
                  (profile?.avatarUrl ? (
                    <img src={profile.avatarUrl} alt={displayName} />
                  ) : (
                    displayInitials
                  ))}
              </div>
              <div className="sb-uinfo">
                {profileLoading ? (
                  <>
                    <div className="sb-sk w70" />
                    <div className="sb-sk w44" style={{ marginTop: 4 }} />
                  </>
                ) : (
                  <>
                    {displayName && (
                      <div className="sb-uname">{displayName}</div>
                    )}
                    {displayRole && (
                      <div className="sb-urole">{displayRole}</div>
                    )}
                  </>
                )}
              </div>
              <span className={"sb-chev" + (menuOpen ? " open" : "")}>
                <NavIcon name="chevrons-up-down" />
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Profile dropdown */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="sb-profile-menu"
          style={{
            bottom: menuPos.bottom,
            left: menuPos.left,
            width: collapsed ? 228 : 220,
          }}
        >
          {displayEmail && (
            <div className="sb-pm-email-section" ref={emailRowRef}>
              <div className="sb-pm-email-label">Signed in as</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div className="sb-pm-email-val" style={{ flex: 1 }}>
                  {displayEmail}
                </div>
                <button
                  className={
                    "sb-pm-cfg-arrow" +
                    (flyoutOpen ? " open" : "") +
                    (configureActive ? " active" : "")
                  }
                  onClick={handleEmailArrowClick}
                  title="Configure"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M4.5 2.5L8 6l-3.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <div className="sb-pm-identity">
            <div className="sb-pm-avatar">
              {profile?.avatarUrl ? (
                <img src={profile.avatarUrl} alt={displayName} />
              ) : (
                displayInitials
              )}
            </div>
            <div className="sb-pm-details">
              {displayName && <div className="sb-pm-name">{displayName}</div>}
              {displayRole && <div className="sb-pm-role">{displayRole}</div>}
            </div>
          </div>

          {/* My Profile */}
          <div
            className={
              "sb-item sb-profile-nav" + (view === "profile" ? " on" : "")
            }
            data-tip="My Profile"
            onClick={() => {
              onProfileClick?.();
            }}
            style={{ margin: "0 6px 4px" }}
          >
            <span className="si-ic">
              <IcProfile />
            </span>
            <span className="si-nm">My Profile</span>
          </div>

          <div className="sb-pm-actions">
            <button
              className="sb-pm-item"
              onClick={() => {
                setMenuOpen(false);
                setView("settings");
              }}
            >
              <span className="pm-ic">
                <NavIcon name="sliders-horizontal" />
              </span>
              <span className="pm-label">Settings</span>
            </button>
            <div className="sb-pm-div" />
            <button
              className="sb-pm-item danger"
              onClick={async () => {
                setMenuOpen(false);
                setFlyoutOpen(false);
                await logout(); // POST /auth/logout with refreshToken — invalidates server session
                clearAuth(); // clears all localStorage keys (tokens + session + profile)
                sessionStorage.clear();
                window.location.href = "/login";
              }}
            >
              <span className="pm-ic">
                <NavIcon name="log-out" />
              </span>
              <span className="pm-label">Log out</span>
            </button>
          </div>
        </div>
      )}

      {/* Configure flyout — only render when flyoutLeft is measured (> 0)
          so it never paints at position 0 before jumping to the correct spot */}
      {flyoutOpen && flyoutLeftRef.current > 0 && (
        <div
          ref={flyoutRef}
          className="sb-configure-flyout"
          style={flyoutStyle}
        >
          <div className="sb-cfg-header">Configure</div>
          {configureItems.map((it) => {
            const on = view === it.id;
            return (
              <button
                key={it.id}
                className={"sb-cfg-item" + (on ? " on" : "")}
                onClick={() => {
                  setMenuOpen(false);
                  setFlyoutOpen(false);
                  setView(it.id);
                }}
              >
                <span className="cfg-ic">
                  <NavIcon name={it.ic} active={on} />
                </span>
                <span style={{ flex: 1 }}>{it.name}</span>
                {it.count != null && (
                  <span
                    style={{
                      fontFamily: "IBM Plex Mono,monospace",
                      fontSize: 9.5,
                      padding: "1px 6px",
                      borderRadius: 6,
                      background:
                        it.kind === "alert"
                          ? "var(--p)"
                          : it.kind === "live"
                            ? "var(--ok)"
                            : "var(--bg3)",
                      color:
                        it.kind === "alert" || it.kind === "live"
                          ? "#fff"
                          : "var(--ink5)",
                      flexShrink: 0,
                    }}
                  >
                    {it.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Sidebar;
