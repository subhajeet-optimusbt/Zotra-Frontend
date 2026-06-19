/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  login,
  googleLogin,
  ApiError,
  setTokens,
  clearTokens,
  type LoginResponse,
} from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

// ── Session key ────────────────────────────────────────────────────────────
export const SESSION_KEY = "zotra_saved_session";

export interface SavedSession {
  userId: string;
  tenantId: string;
  email: string;
  fullName: string;
  role: string;
  orgName: string;
  savedAt: number;
}

function getSavedSession(): SavedSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s: SavedSession = JSON.parse(raw);
    if (Date.now() - s.savedAt > 30 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return s;
  } catch {
    return null;
  }
}

function saveSession(s: Omit<SavedSession, "savedAt">) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ ...s, savedAt: Date.now() }),
  );
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  clearTokens();
}

function initials(fullName: string, email: string): string {
  if (fullName?.trim()) {
    const parts = fullName.trim().split(" ");
    return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
  }
  return email.slice(0, 2).toUpperCase();
}

// ── Agent Status Board ─────────────────────────────────────────────────────
type AgentStatus = "running" | "idle" | "done";
interface Agent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  lastAction: string;
  metric: string;
  metricLabel: string;
  color: string;
}

const AGENTS: Agent[] = [
  {
    id: "pulse",
    name: "Pulse",
    role: "Morning Briefing",
    status: "done",
    lastAction: "Briefing sent · 7:02 am",
    metric: "12",
    metricLabel: "tasks surfaced",
    color: "#5552C9",
  },
  {
    id: "scout",
    name: "Scout",
    role: "Signal Detection",
    status: "running",
    lastAction: "Scanning inboxes…",
    metric: "4",
    metricLabel: "signals found",
    color: "#1dc4a0",
  },
  {
    id: "closer",
    name: "Closer",
    role: "Deal Acceleration",
    status: "running",
    lastAction: "Drafting follow-up · Acme",
    metric: "2",
    metricLabel: "drafts queued",
    color: "#7b5ea7",
  },
  {
    id: "scribe",
    name: "Scribe",
    role: "CRM Auto-logging",
    status: "done",
    lastAction: "3 calls logged · 9:41 am",
    metric: "3",
    metricLabel: "records updated",
    color: "#c17b2a",
  },
  {
    id: "radar",
    name: "Radar",
    role: "Risk & Churn Watch",
    status: "idle",
    lastAction: "Next scan · 2:00 pm",
    metric: "1",
    metricLabel: "flag raised",
    color: "#d7384f",
  },
];

// ── Component ──────────────────────────────────────────────────────────────
export default function Login() {
  const { setAuth } = useAuth();

  const [savedSession, setSavedSession] = useState<SavedSession | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [launchLoading, setLaunchLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const s = getSavedSession();
    // If token was cleared by expiry redirect, treat as full logout
    const token = localStorage.getItem("zotra_token");
    if (s && !token) {
      clearSession();
      setSavedSession(null);
    } else {
      setSavedSession(s);
      if (s) setEmail(s.email);
    }
  }, []);

  // ── Continue as (saved session) ──────────────────────────────────────────
  const handleLaunch = () => {
    if (!savedSession) return;

    const token = localStorage.getItem("zotra_token") ?? "";
    // No token = session expired, force fresh sign-in
    if (!token) {
      clearSession();
      setSavedSession(null);
      setEmail("");
      return;
    }

    setLaunchLoading(true);
    const refreshToken = localStorage.getItem("zotra_refresh_token") ?? "";
    setTokens(token, refreshToken);

    setAuth(
      String(savedSession.userId),
      String(savedSession.tenantId),
      String(savedSession.email),
      String(savedSession.fullName),
      String(savedSession.role),
      String(savedSession.orgName),
    );
    window.location.href = "/app/pulse";
  };

  // ── Google login ─────────────────────────────────────────────────────────
  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    setError(null);

    googleLogin(
      (data: LoginResponse) => {
        const userId = String((data as any).userId ?? "");
        const tenantId = String(
          (data as any).organizationId ?? (data as any).tenantId ?? "",
        );
        const fullName = String((data as any).fullName ?? "");
        const userEmail = String((data as any).email ?? "");
        const role = String((data as any).role ?? "");
        const token = String((data as any).token ?? "");
        const refreshToken = String((data as any).refreshToken ?? "");

        // ✅ Support both old `tenant` shape and new `organization` shape
        const orgObj = (data as any).organization ?? (data as any).tenant ?? {};
        const orgName = String(orgObj.orgName ?? "");
        const orgLogoUrl = String(orgObj.organizationLogo ?? "");
        const orgPlan = String(orgObj.plan ?? "");
        const orgColor = String(orgObj.organizationColor ?? "");
        const isNew = Boolean((data as any).isNew);

        setTokens(token, refreshToken);
        setAuth(
          userId,
          tenantId,
          userEmail,
          fullName,
          role,
          orgName,
          orgLogoUrl,
          orgPlan,
          orgColor,
        );

        // Derive and persist color scheme from org color so AppShell mounts with correct theme
        if (orgColor) {
          const SCHEME_COLOURS: Record<string, string> = {
            default: "#6366f1",
            warm: "#cb6e50",
            dark: "#1e1e2e",
          };
          const lc = orgColor.toLowerCase();
          const derivedScheme =
            Object.entries(SCHEME_COLOURS).find(
              ([, hex]) => hex.toLowerCase() === lc,
            )?.[0] ?? null;
          if (derivedScheme) {
            localStorage.setItem("zotra_color_scheme", derivedScheme);
          }
        }

        if (!isNew) {
          saveSession({
            userId,
            tenantId,
            email: userEmail,
            fullName,
            role,
            orgName,
          });
        }

        setGoogleLoading(false);
        setTimeout(() => {
          window.location.href = isNew ? "/onboarding" : "/app/pulse";
        }, 50);
      },
      (errMsg: string) => {
        if (errMsg === "Sign-in cancelled.") {
          setGoogleLoading(false);
          return;
        }
        setGoogleLoading(false);
        setError(errMsg);
      },
    );
  };

  // ── Email / password sign in ─────────────────────────────────────────────
  const handleSubmit = async () => {
    setError(null);
    if (!email.trim()) {
      setError("Please enter your work email.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    try {
      const res = await login({ email: email.trim(), password });

      console.group(
        "%c[Zotra] Login successful",
        "color:#1dc4a0;font-weight:600",
      );
      console.log("userId   :", res.userId);
      console.log("tenantId :", res.tenantId);
      console.log("email    :", res.email);
      console.log("fullName :", res.fullName);
      console.log("role     :", res.role);
      console.log("token    :", res.token);
      console.groupEnd();

      const userId = res.userId ?? "";
      // ✅ New response uses organizationId instead of tenantId
      const tenantId = (res as any).organizationId ?? res.tenantId ?? "";
      const fullName = res.fullName ?? "";
      const userEmail = res.email ?? email.trim();
      const role = res.role ?? "";
      const token = res.token ?? "";
      const refreshToken = res.refreshToken ?? "";

      // ✅ Support both old `tenant` shape and new `organization` shape
      const org = (res as any).organization ?? res.tenant ?? {};
      const orgName = org.orgName ?? "";
      const orgLogoUrl = org.organizationLogo ?? "";
      const orgPlan = org.plan ?? "";
      const orgColor = org.organizationColor ?? "";
      const profileUrl = String((res as any).profileUrl ?? "");
      const avatar = String((res as any).avatar ?? "");

      if (!userId)
        throw new Error("Login succeeded but no userId was returned.");
      if (!token) throw new Error("Login succeeded but no token was returned.");

      // ✅ Step 1 — persist tokens
      setTokens(token, refreshToken);

      // ✅ Step 2 — update auth context with full org branding
      setAuth(
        String(userId),
        String(tenantId),
        String(userEmail),
        String(fullName),
        String(role),
        String(orgName),
        String(orgLogoUrl),
        String(orgPlan),
        String(orgColor),
        profileUrl,
        avatar,
      );

      // ✅ Step 2b — derive and persist color scheme from org color so AppShell
      // reads the correct theme immediately on mount (before branding panel loads)
      if (orgColor) {
        const SCHEME_COLOURS: Record<string, string> = {
          default: "#6366f1",
          warm: "#cb6e50",
          dark: "#1e1e2e",
        };
        const lc = String(orgColor).toLowerCase();
        const derivedScheme =
          Object.entries(SCHEME_COLOURS).find(
            ([, hex]) => hex.toLowerCase() === lc,
          )?.[0] ?? null;
        if (derivedScheme) {
          localStorage.setItem("zotra_color_scheme", derivedScheme);
        }
      }

      // ✅ Step 3 — persist session for "Continue as" UX
      if (remember) {
        saveSession({
          userId,
          tenantId,
          email: userEmail,
          fullName,
          role,
          orgName: String(orgName),
        });
      } else {
        localStorage.removeItem(SESSION_KEY);
      }

      // ✅ Step 4 — navigate
      window.location.href = "/app/pulse";
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        const e = err as ApiError;
        if (e.status === 401)
          setError("Incorrect email or password. Please try again.");
        else if (e.status === 404)
          setError("Account not found. Please check your email or sign up.");
        else setError(e.message || "Something went wrong. Please try again.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const statusRunningCount = AGENTS.filter(
    (a) => a.status === "running",
  ).length;
  const avatarAbbr = savedSession
    ? initials(savedSession.fullName, savedSession.email)
    : "";
  const continueAsName =
    savedSession?.fullName?.trim() || savedSession?.email?.split("@")[0] || "";

  return (
    <div className="login-root">
      {/* ── LEFT PANEL ── */}
      <aside className="left-panel">
        <div className="left-inner">
          <Link to="/" className="flex items-center gap-2.5">
            <div
              className="w-[34px] h-[34px] rounded-[8px] bg-center bg-cover shadow-[0_1px_3px_rgba(75,72,200,0.2)]"
              style={{ backgroundImage: "url('/logo-website.png')" }}
            />
            <div>
              <div className="font-serif font-bold text-[17px] text-[#18181C] tracking-[-0.02em]">
                Zotra
              </div>
              <div className="font-mono text-[10px] text-[#88889A] uppercase tracking-[0.12em] mt-0.5">
                AI commercial team
              </div>
            </div>
          </Link>

          <div className="hero-block">
            <div className="eyebrow">Daily Operating Rhythm</div>
            <h2 className="hero-headline">
              CRMs ask you to log the work.
              <br />
              <em>Zotra does the work,</em>
              <br />
              then logs it.
            </h2>
            <p className="hero-sub">— Five agents · one rhythm</p>
          </div>

          {/* Agent Status Board */}
          <div className="agent-board">
            <div className="agent-board-header">
              <div className="agent-board-header-left">
                <div className="live-dot" />
                Agent fleet · live
              </div>
              <div className="badge-running">{statusRunningCount} RUNNING</div>
            </div>
            <div className="agent-list">
              {AGENTS.map((agent, i) => (
                <div
                  key={agent.id}
                  className={`agent-row status-${agent.status}`}
                  style={
                    {
                      animationDelay: `${i * 0.07}s`,
                      "--agent-color": agent.color,
                    } as React.CSSProperties
                  }
                >
                  <div className="agent-dot-wrap">
                    <div className="agent-status-dot" />
                  </div>
                  <div className="agent-info">
                    <div className="agent-name-row">
                      <span className="agent-name">{agent.name}</span>
                      <span className="agent-role">{agent.role}</span>
                    </div>
                    <div className="agent-last-action">{agent.lastAction}</div>
                  </div>
                  <div className="agent-metric">
                    <div className="agent-metric-num">{agent.metric}</div>
                    <div className="agent-metric-label">
                      {agent.metricLabel}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="trust-list">
            {[
              "SOC 2 Type II · ISO 27001",
              "SSO · SAML · SCIM available on every plan",
              "Session encryption · device-bound tokens",
            ].map((t) => (
              <div key={t} className="trust-item">
                <div className="trust-check">✓</div>
                {t}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* ── RIGHT PANEL ── */}
      <main className="right-panel">
        <div className="form-wrap">
          <div className="form-eyebrow">Sign in · zotra workspace</div>
          <h1 className="form-title">Welcome back.</h1>
          <p className="form-subtitle">
            Your morning Pulse is ready. Pick up where the day left off.
          </p>

          {/* ── Continue As ── */}
          {savedSession && (
            <>
              <div className="divider">Continue as</div>
              <div className="continue-as-card">
                <div className="ca-avatar">{avatarAbbr}</div>
                <div className="ca-info">
                  <div className="ca-name">{continueAsName}</div>
                  {savedSession?.email && (
                    <div
                      style={{
                        fontSize: "10px",
                        color: "var(--ink5)",
                        marginTop: 2,
                        fontFamily: "'IBM Plex Mono',monospace",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {savedSession.email}
                    </div>
                  )}
                </div>
                <button
                  className="ca-launch-btn"
                  onClick={handleLaunch}
                  disabled={launchLoading}
                >
                  {launchLoading ? (
                    <div className="spinner" />
                  ) : (
                    <>
                      Launch <span className="cta-arrow">→</span>
                    </>
                  )}
                </button>
              </div>
              <button
                className="ca-not-you"
                onClick={() => {
                  clearSession();
                  setSavedSession(null);
                  setEmail("");
                }}
              >
                Not you? Sign in with a different account
              </button>
              <div className="divider">or sign in with</div>
            </>
          )}
          {!savedSession && <div className="divider">sign in with</div>}

          {/* SSO */}
          <div className="sso-stack">
            {/* Google */}
            <button
              className="sso-btn"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
            >
              {googleLoading ? (
                <>
                  <div
                    className="spinner"
                    style={{
                      borderColor: "rgba(100,70,40,0.2)",
                      borderTopColor: "#5552C9",
                    }}
                  />{" "}
                  Signing in…
                </>
              ) : (
                <>
                  <span className="sso-icon">
                    <svg
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
                        fill="#34A853"
                      />
                      <path
                        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"
                        fill="#EA4335"
                      />
                    </svg>
                  </span>
                  Continue with Google
                  <span className="sso-pill">GMAIL</span>
                </>
              )}
            </button>
            {/* Microsoft */}
            <button
              className="sso-btn"
              onClick={undefined}
              disabled={googleLoading}
            >
              <span className="sso-icon">
                <svg
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h8.571v8.571H0V0Z" fill="#F25022" />
                  <path d="M9.429 0H18v8.571H9.429V0Z" fill="#7FBA00" />
                  <path d="M0 9.429h8.571V18H0V9.429Z" fill="#00A4EF" />
                  <path d="M9.429 9.429H18V18H9.429V9.429Z" fill="#FFB900" />
                </svg>
              </span>
              Continue with Microsoft
              <span className="sso-pill">OUTLOOK</span>
            </button>
          </div>

          <div className="divider">or with email</div>

          {/* Fields */}
          <div className="field-group">
            <div className="field">
              <label className="field-label">Work email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                onKeyDown={handleKeyDown}
                placeholder="you@company.com"
                className={error && !email ? "error" : ""}
              />
            </div>
            <div className="field">
              <div className="field-label-row">
                <label className="field-label">Password</label>
                <a href="#" className="field-link">
                  Forgot password?
                </a>
              </div>
              <div className="input-wrap">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Your password"
                  className={error && !password ? "error" : ""}
                />
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => setShowPw(!showPw)}
                >
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Keep me signed in on this device for 30 days.
          </label>

          {error && (
            <div className="error-banner">
              <span>⚠</span> {error}
            </div>
          )}

          <button className="cta-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <div className="spinner" /> Signing in…
              </>
            ) : (
              <>
                Sign in <span className="cta-arrow">→</span>
              </>
            )}
          </button>

          <p className="form-footer-text">
            New to Zotra? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
