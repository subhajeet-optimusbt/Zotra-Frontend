import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { setTokens } from "../services/api";
import { SESSION_KEY } from "./Login";

function saveSession(s: {
  userId: string;
  tenantId: string;
  email: string;
  fullName: string;
  role: string;
  orgName: string;
}) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ ...s, savedAt: Date.now() }),
  );
}

// Sends postMessage to the parent window targeting ALL allowed origins
function postToParent(message: object) {
  const allowedOrigins = [
    "https://zotra-app.azurewebsites.net",
    "http://localhost:5173",
    "http://localhost:5174",
  ];

  if (window.opener) {
    // Try to use document.referrer origin first, fallback to broadcasting all allowed
    let parentOrigin: string | null = null;
    try {
      // If same origin this works; if cross-origin it throws
      parentOrigin = window.opener.location.origin;
    } catch {
      parentOrigin = null;
    }

    if (parentOrigin) {
      window.opener.postMessage(message, parentOrigin);
    } else {
      // Cross-origin: send to all known allowed origins
      allowedOrigins.forEach((origin) => {
        window.opener.postMessage(message, origin);
      });
    }
  }
}

export default function GoogleCallback() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get("success");
    const message = params.get("message");

    if (success === "false") {
      if (window.opener) {
        postToParent({
          type: "GOOGLE_AUTH_ERROR",
          payload: message || "Google sign-in was unsuccessful.",
        });
        window.close();
        return;
      }
      setError(message || "Google sign-in was unsuccessful. Please try again.");
      return;
    }

    // Backend sends "organizationId" — fall back to "tenantId" for safety
    const userId = params.get("userId") ?? "";
    const tenantId =
      params.get("organizationId") ?? params.get("tenantId") ?? "";
    const email = params.get("email") ?? "";
    const fullName = params.get("fullName") ?? "";
    const role = params.get("role") ?? "";
    const orgName = params.get("orgName") ?? "";
    const token = params.get("token") ?? "";
    const refreshToken = params.get("refreshToken") ?? "";
    const isNew = params.get("isNew") === "true";

    if (!userId || !tenantId || !token) {
      const errMsg =
        "Google sign-in failed — no session returned. Please try again.";
      if (window.opener) {
        postToParent({ type: "GOOGLE_AUTH_ERROR", payload: errMsg });
        window.close();
        return;
      }
      setError(errMsg);
      return;
    }

    // ── POPUP mode ────────────────────────────────────────────────────────
    if (window.opener) {
      postToParent({
        type: "GOOGLE_AUTH_SUCCESS",
        payload: {
          token,
          refreshToken,
          userId,
          tenantId,
          email,
          fullName,
          role,
          orgName,
          isNew,
          success: true,
        },
      });
      window.close();
      return;
    }

    // ── FULL-PAGE fallback ────────────────────────────────────────────────
    setTokens(token, refreshToken);
    setAuth(userId, tenantId, email, fullName, role, orgName);
    if (!isNew) {
      saveSession({ userId, tenantId, email, fullName, role, orgName });
    }
    navigate(isNew ? "/onboarding" : "/app/pulse", { replace: true });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f0f11",
          color: "#fff",
          fontFamily: "sans-serif",
          gap: 16,
        }}
      >
        <div style={{ fontSize: 32 }}>⚠</div>
        <div
          style={{
            fontSize: 15,
            color: "#fc8181",
            maxWidth: 360,
            textAlign: "center",
          }}
        >
          {error}
        </div>
        <a
          href="/login"
          style={{ fontSize: 13, color: "#7b79e0", marginTop: 8 }}
        >
          ← Back to login
        </a>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f0f11",
        color: "#fff",
        fontFamily: "sans-serif",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "3px solid rgba(123,121,224,0.2)",
          borderTopColor: "#7b79e0",
          animation: "spin 0.7s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ fontSize: 14, color: "#88889a" }}>
        Signing you in with Google…
      </div>
    </div>
  );
}
