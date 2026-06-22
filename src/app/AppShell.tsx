import "./styles/globals.css";
import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Omnibar from "./components/Omnibar";
import ZotraTweaks from "./components/ZotraTweaks";
import { SimpleView } from "./views/OtherViews";
import { useUserProfile } from "./types/userProfile";
import type { ViewType, Tweaks, ColorScheme } from "./types";
import { baseUrl } from "./utils/utils";
import { startTokenRefreshTimer } from "../services/api";
import { useAuth } from "../context/AuthContext";
import ZotraChatbot from "./components/ZotraChatbot";
// ─── Lazy-loaded views ────────────────────────────────────────────────────────
const RhythmView = lazy(() => import("./views/TodayView"));
const PulseView = lazy(() => import("./views/PulseView"));
const AccountsView = lazy(() => import("./views/AccountsView"));
const ConstellationView = lazy(() => import("./views/ConstellationView"));
const IntakeView = lazy(() => import("./components/IntakeView"));
const NotificationsView = lazy(() =>
  import("./views/OtherViews").then((m) => ({ default: m.NotificationsView })),
);
const WorkspaceBoardView = lazy(
  () => import("./components/WorkspaceBoardView"),
);
const DashboardView = lazy(() => import("./views/DashboardView"));
const ReportsView = lazy(() => import("./views/ReportsView"));
const SettingsView = lazy(() => import("./views/SettingsView"));
const ProfileView = lazy(() => import("./views/ProfileView"));
const JourneyView = lazy(() => import("./views/JourneyView"));
const AutomationView = lazy(() => import("./views/AutomationView"));
const QuickStartView = lazy(() => import("./views/QuickStartView"));
// ── Conversation Assistant views ──────────────────────────────────────────────
const ConversationsView = lazy(() => import("./views/ConversationsView"));
const AssistantPreviewView = lazy(() => import("./views/AssistantpreviewView"));
const InventoryView = lazy(() => import("./views/InventoryView"));

// ─── Loading spinner shown while a view chunk is downloading ─────────────────
function ViewSkeleton() {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        opacity: 0.4,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          border: "2px solid var(--p, #5552C9)",
          borderTopColor: "transparent",
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const STORED_SCHEME = (localStorage.getItem("zotra_color_scheme") ??
  "default") as ColorScheme;

const DEFAULT_TWEAKS: Tweaks = {
  theme: "light",
  accent: "#5552C9",
  density: "comfortable",
  tenantAge: "established",
  proactive: true,
  colorScheme: STORED_SCHEME,
};

const VALID_VIEWS: ViewType[] = [
  "rhythm",
  "pulse",
  "inbox",
  "accounts",
  "deals",
  "projects",
  "finance",
  "renewal",
  "dashboard",
  "reports",
  "notifications",
  "settings",
  "journey",
  "automation",
  "onboarding",
  "conversations",
  "assistant",
  "inventory",
  "profile",
];

const PATH_TO_VIEW: Record<string, ViewType> = {
  "/app/home": "rhythm",
  "/app/pulse": "pulse",
  "/app/inbox": "inbox",
  "/app/accounts": "accounts",
  "/app/deals": "deals",
  "/app/projects": "projects",
  "/app/finance": "finance",
  "/app/renewal": "renewal",
  "/app/dashboard": "dashboard",
  "/app/reports": "reports",
  "/app/notifications": "notifications",
  "/app/settings": "settings",
  "/app/journey": "journey",
  "/app/automation": "automation",
  "/app/quickstart": "onboarding",
  "/app/conversations": "conversations",
  "/app/assistant": "assistant",
  "/app/inventory": "inventory",
  "/app/profile": "profile",
  "/home": "rhythm",
  "/pulse": "pulse",
  "/inbox": "inbox",
  "/accounts": "accounts",
  "/deals": "deals",
  "/projects": "projects",
  "/finance": "finance",
  "/renewal": "renewal",
  "/dashboard": "dashboard",
  "/reports": "reports",
  "/notifications": "notifications",
  "/settings": "settings",
  "/journey": "journey",
  "/automation": "automation",
  "/quickstart": "onboarding",
  "/conversations": "conversations",
  "/assistant": "assistant",
  "/inventory": "inventory",
  "/profile": "profile",
};

const VIEW_TO_PATH: Record<ViewType, string> = {
  rhythm: "/app/home",
  pulse: "/app/pulse",
  inbox: "/app/inbox",
  accounts: "/app/accounts",
  deals: "/app/deals",
  projects: "/app/projects",
  finance: "/app/finance",
  renewal: "/app/renewal",
  dashboard: "/app/dashboard",
  reports: "/app/reports",
  notifications: "/app/notifications",
  settings: "/app/settings",
  journey: "/app/journey",
  automation: "/app/automation",
  onboarding: "/app/quickstart",
  conversations: "/app/conversations",
  assistant: "/app/assistant",
  inventory: "/app/inventory",
  profile: "/app/profile",
};

function getInitialView(): ViewType {
  const path = window.location.pathname;
  if (PATH_TO_VIEW[path]) return PATH_TO_VIEW[path];
  const tab = new URLSearchParams(window.location.search).get(
    "tab",
  ) as ViewType;
  return VALID_VIEWS.includes(tab) ? tab : "rhythm";
}

// ─────────────────────────────────────────────────────────────────────────────
export default function AppShell() {
  const reactNavigate = useNavigate();
  const location = useLocation();

  const [view, setView] = useState<ViewType>(getInitialView);
  const [openAcc, setOpenAcc] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(true);
  const [tweaks, setTweaks] = useState<Tweaks>(DEFAULT_TWEAKS);
  const [tweaksPanelOpen, setTweaksPanelOpen] = useState(false);
  const [navCounts, setNavCounts] = useState<Record<string, number>>({});
  const [settingsPanel, setSettingsPanel] = useState<string | undefined>(
    undefined,
  );

  const { orgName, orgLogoUrl, orgPlan, orgColor } = useAuth();

  useEffect(() => {
    if (!orgColor) return;
    const SCHEME_COLOURS: Record<string, string> = {
      default: "#6366f1",
      warm: "#cb6e50",
      dark: "#1e1e2e",
    };
    const lc = orgColor.toLowerCase();
    const derived = Object.entries(SCHEME_COLOURS).find(
      ([, hex]) => hex.toLowerCase() === lc,
    )?.[0] as ColorScheme | undefined;
    if (!derived) return;
    const stored = localStorage.getItem("zotra_color_scheme");
    if (stored !== derived) {
      localStorage.setItem("zotra_color_scheme", derived);
      setTweaks((prev) => ({ ...prev, colorScheme: derived }));
    }
  }, [orgColor]); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    profile,
    loading: profileLoading,
    error: profileError,
  } = useUserProfile();

  useEffect(() => {
    if (profileError)
      console.error("[App] Failed to load user profile:", profileError);
  }, [profileError]);

  // ── Background token refresh ─────────────────────────────────────────────
  // Silently calls POST /auth/refresh every 30 minutes so the session never
  // expires while the user is actively using the app.
  useEffect(() => {
    const stopRefresh = startTokenRefreshTimer();
    return () => stopRefresh();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("zotra_token");
    const userId =
      localStorage.getItem("zotra_userId") ||
      (() => {
        try {
          const s = localStorage.getItem("zotra_saved_session");
          return s ? JSON.parse(s).userId : null;
        } catch {
          return null;
        }
      })();
    if (!token || !userId) {
      localStorage.removeItem("zotra_token");
      localStorage.removeItem("zotra_refresh_token");
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("zotra_token");
    if (!token) return;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const base = baseUrl();
    Promise.allSettled([
      fetch(`${base}/accounts`, { headers }).then((r) =>
        r.ok ? r.json() : [],
      ),
      fetch(`${base}/opportunities`, { headers }).then((r) =>
        r.ok ? r.json() : [],
      ),
      fetch(`${base}/intakes`, { headers }).then((r) => (r.ok ? r.json() : [])),
    ]).then(([accounts, opps, intakes]) => {
      const count = (res: PromiseSettledResult<unknown>) =>
        res.status === "fulfilled" && Array.isArray(res.value)
          ? res.value.length
          : undefined;
      setNavCounts({
        accounts: count(accounts) ?? 0,
        deals: count(opps) ?? 0,
        inbox: count(intakes) ?? 0,
      });
    });
  }, []);

  const setTweak = useCallback((key: keyof Tweaks, value: unknown) => {
    if (key === "colorScheme")
      localStorage.setItem("zotra_color_scheme", value as string);
    setTweaks((prev) => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    const target = VIEW_TO_PATH[view] ?? "/app/pulse";
    if (location.pathname !== target) reactNavigate(target, { replace: true });
  }, [view]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const v = PATH_TO_VIEW[location.pathname];
    if (v && v !== view) setView(v);
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const scheme = tweaks.colorScheme ?? "default";
    const primaryColor = orgColor ?? "";
    if (scheme === "dark") document.documentElement.dataset.theme = "dark";
    else if (scheme === "default")
      document.documentElement.dataset.theme = "default";
    else document.documentElement.dataset.theme = "light";
    document.documentElement.style.removeProperty("--p");
    document.documentElement.style.removeProperty("--p-rgb");
    if (
      scheme === "default" &&
      primaryColor &&
      /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(primaryColor)
    ) {
      document.documentElement.style.setProperty("--p", primaryColor);
    }
  }, [tweaks.colorScheme, orgColor]);

  useEffect(() => {
    const handleStorage = () => {
      const stored = (localStorage.getItem("zotra_color_scheme") ??
        "default") as ColorScheme;
      setTweaks((prev) =>
        prev.colorScheme === stored ? prev : { ...prev, colorScheme: stored },
      );
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    )
      return;

    const map: Record<string, ViewType> = {
      t: "rhythm",
      p: "pulse",
      a: "accounts",
      d: "deals",
      y: "journey",
      j: "projects",
      f: "finance",
      b: "dashboard",
      r: "reports",
      i: "inbox",
      n: "notifications",
      s: "settings",
      u: "automation",
      q: "onboarding",
    };

    if (e.key === "?") {
      setTweaksPanelOpen((v) => !v);
      return;
    }
    if (
      (window as Window & { __gPressed?: boolean }).__gPressed &&
      map[e.key]
    ) {
      setView(map[e.key]);
      setOpenAcc(null);
      (window as Window & { __gPressed?: boolean }).__gPressed = false;
      return;
    }
    if (e.key === "g") {
      (window as Window & { __gPressed?: boolean }).__gPressed = true;
      setTimeout(() => {
        (window as Window & { __gPressed?: boolean }).__gPressed = false;
      }, 600);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const navigate = useCallback((v: string) => {
    setView(v as ViewType);
    setOpenAcc(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("tab");
    window.history.replaceState(null, "", url.toString());
  }, []);

  // ── View renderer ───────────────────────────────────────────────────────────
  function renderView() {
    switch (view) {
      case "rhythm":
        return <RhythmView />;
      case "pulse":
        return <PulseView tenantAge={tweaks.tenantAge} />;
      case "accounts":
        return <AccountsView openAcc={openAcc} setOpenAcc={setOpenAcc} />;
      case "deals":
        return <ConstellationView />;
      case "inbox":
        return <IntakeView />;
      case "notifications":
        return <NotificationsView />;
      case "projects":
        return <WorkspaceBoardView kind="project" />;
      case "finance":
        return <WorkspaceBoardView kind="finance" />;
      case "renewal":
        return <WorkspaceBoardView kind="renewal" />;
      case "dashboard":
        return <DashboardView setView={navigate} />;
      case "reports":
        return <ReportsView setView={navigate} />;
      case "profile":
        return <ProfileView />;
      case "settings":
        return (
          <SettingsView
            colorScheme={tweaks.colorScheme ?? "default"}
            onColorSchemeChange={(v) => setTweak("colorScheme", v)}
            initialPanel={settingsPanel}
          />
        );
      case "journey":
        return (
          <JourneyView
            setView={navigate}
            setTenantAge={(age: unknown) => setTweak("tenantAge", age)}
          />
        );
      case "automation":
        return <AutomationView setView={navigate} />;
      case "onboarding":
        return (
          <QuickStartView
            setView={navigate}
            setTenantAge={(age: unknown) => setTweak("tenantAge", age)}
            setOpenAcc={setOpenAcc}
          />
        );
      case "conversations":
        return <ConversationsView />;
      case "assistant":
        return <AssistantPreviewView />;
      case "inventory":
        return <InventoryView />;
      default:
        return (
          <SimpleView
            title="Coming Soon"
            icon="sparkles"
            blurb="This feature is on the roadmap."
          />
        );
    }
  }

  // ── Shell ───────────────────────────────────────────────────────────────────
  return (
    <div className="app" data-density={tweaks.density}>
      <Sidebar
        view={view}
        setView={navigate}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        profile={profile}
        profileLoading={profileLoading}
        orgBranding={{
          logoUrl: orgLogoUrl ?? "",
          orgName: orgName ?? "",
          orgPlan: orgPlan ?? "",
        }}
        navCounts={navCounts}
        onProfileClick={() => {
          navigate("profile");
        }}
      />
      <div className="main">
        <div className="content">
          <div className="viewport" style={{ overflowY: "auto" }}>
            <Suspense fallback={<ViewSkeleton />}>{renderView()}</Suspense>
          </div>
        </div>
        <Omnibar view={view} setView={navigate} runQuery={() => {}} />
      </div>
      {/* <ZotraChatbot /> */}
      {tweaksPanelOpen && <ZotraTweaks tweaks={tweaks} setTweak={setTweak} />}
    </div>
  );
}
