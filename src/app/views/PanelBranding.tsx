import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { baseUrl, apiFetch } from "../utils/utils";
import { ThemeContext } from "./SettingsView";
import { useAuth } from "../../context/AuthContext";

// ─── Shared colour-scheme map ─────────────────────────────────────────────────
const SCHEME_COLOURS: Record<string, string> = {
  default: "#6366f1",
  warm: "#cb6e50",
  dark: "#1e1e2e",
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface OrgData {
  partitionKey?: string;
  rowKey?: string;
  timestamp?: string;
  eTag?: string;
  orgName: string;
  domain: string;
  email: string;
  plan: number | string;
  status: number | string;
  maxUsers: number;
  maxWorkspaces: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  verificationOtp: string | null;
  verificationOtpExpiresAt: string | null;
  isEmailVerified: boolean;
  region: string;
  companySize: string;
  companyType: string;
  edition: string;
  isOnboardingCompleted: boolean;
  logoURL: string;
  primarycolour: string;
  replysignature: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function isValidHex(v: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(v);
}

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem("zotra_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function authHeadersNoContent(): Record<string, string> {
  const token = localStorage.getItem("zotra_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function formatBytes(bytes: number): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function resolveLogoUrl(url: string): string {
  if (!url) return "";
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:")
  ) {
    return url;
  }
  return `${baseUrl()}/${url.replace(/^\//, "")}`;
}

function schemeFromColour(colour: string): string {
  if (!colour) return "default";
  const lower = colour.toLowerCase();
  return (
    Object.entries(SCHEME_COLOURS).find(
      ([, hex]) => hex.toLowerCase() === lower,
    )?.[0] ?? "default"
  );
}

/**
 * Fetches a remote image URL via the Zotra API proxy (with auth headers)
 * and returns a local blob: object URL. This sidesteps CORS restrictions
 * on Azure Blob Storage when loading images directly in the browser.
 *
 * Falls back to the original URL string if the fetch fails, so the
 * component still renders something rather than silently breaking.
 */
async function fetchLogoAsObjectUrl(remoteUrl: string): Promise<string> {
  if (!remoteUrl) return "";
  // If it's already a data URI or blob URL, pass through unchanged
  if (remoteUrl.startsWith("data:") || remoteUrl.startsWith("blob:")) {
    return remoteUrl;
  }
  try {
    const token = localStorage.getItem("zotra_token");
    const res = await fetch(remoteUrl, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error(`${res.status}`);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch {
    // Fall back to direct URL — may still fail due to CORS but won't throw
    return remoteUrl;
  }
}

const MAX_LOGO_SIZE = 2 * 1024 * 1024;

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, type }: { msg: string; type: "ok" | "err" }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        background: type === "ok" ? "var(--ok)" : "var(--ri)",
        color: "#fff",
        fontSize: 12,
        padding: "8px 16px",
        borderRadius: 8,
        zIndex: 9999,
        whiteSpace: "nowrap",
        fontFamily: "DM Sans,sans-serif",
        fontWeight: 500,
        boxShadow: "0 4px 16px rgba(0,0,0,.18)",
        animation: "toast-in .2s ease",
      }}
    >
      {type === "ok" ? "✓ " : "✕ "}
      {msg}
    </div>
  );
}

// ─── CardHdr ──────────────────────────────────────────────────────────────────
function CardHdr({
  icon,
  title,
  api,
}: {
  icon: string;
  title: string;
  api?: string;
}) {
  return (
    <div className="sv-card-hdr">
      <div className="sv-card-icon">{icon}</div>
      <div>
        <div className="sv-card-title">{title}</div>
        {api && <span className="sv-card-api">{api}</span>}
      </div>
    </div>
  );
}

// ─── Row ──────────────────────────────────────────────────────────────────────
function Row({
  label,
  sub,
  children,
}: {
  label: React.ReactNode;
  sub?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="sv-row">
      <div className="sv-row-lbl">
        <div className="sv-row-t">{label}</div>
        {sub && <div className="sv-row-s">{sub}</div>}
      </div>
      {children && <div className="sv-ctrl">{children}</div>}
    </div>
  );
}

// ─── Colour scheme swatch dot ─────────────────────────────────────────────────
function ColourSchemeSwatch() {
  const [scheme, setScheme] = useState(
    localStorage.getItem("zotra_color_scheme") ?? "default",
  );
  useEffect(() => {
    const handler = () =>
      setScheme(localStorage.getItem("zotra_color_scheme") ?? "default");
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);
  return (
    <span
      style={{
        position: "absolute",
        left: 10,
        width: 13,
        height: 13,
        borderRadius: "50%",
        background: SCHEME_COLOURS[scheme] ?? SCHEME_COLOURS.default,
        border: "1.5px solid rgba(0,0,0,0.12)",
        flexShrink: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}

// ─── Logo Upload Widget ───────────────────────────────────────────────────────
interface LogoUploadProps {
  /** Resolved display URL — may be a blob: objectURL, data URI, or https:// */
  currentUrl: string;
  /** Original remote URL string (for display label only) */
  currentRemoteUrl: string;
  onFileChange: (file: File | null, dataUrl: string) => void;
}

const LogoUpload: React.FC<LogoUploadProps> = ({
  currentUrl,
  currentRemoteUrl,
  onFileChange,
}) => {
  const [preview, setPreview] = useState<string>(currentUrl);
  const [fileName, setFileName] = useState<string>(
    currentUrl
      ? currentRemoteUrl
        ? (currentRemoteUrl.split("/").pop()?.split("?")[0] ?? "Current logo")
        : "Current logo"
      : "",
  );
  const [fileSize, setFileSize] = useState<number>(0);
  const [isRemote, setIsRemote] = useState<boolean>(!!currentRemoteUrl);
  const [dragging, setDragging] = useState(false);
  const zoneRef = useRef<HTMLDivElement>(null);

  // Sync when parent resolves the blob URL
  useEffect(() => {
    setPreview(currentUrl);
    if (currentUrl && !currentUrl.startsWith("data:")) {
      setFileName(
        currentRemoteUrl
          ? (currentRemoteUrl.split("/").pop()?.split("?")[0] ?? "logo.png")
          : "logo.png",
      );
      setIsRemote(true);
    }
    setFileSize(0);
  }, [currentUrl, currentRemoteUrl]);

  const processFile = useCallback(
    (file: File) => {
      if (file.size > MAX_LOGO_SIZE) {
        alert("File exceeds 2 MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setPreview(dataUrl);
        setFileName(file.name);
        setFileSize(file.size);
        setIsRemote(false);
        onFileChange(file, dataUrl);
      };
      reader.readAsDataURL(file);
    },
    [onFileChange],
  );

  const handleRemove = () => {
    setPreview("");
    setFileName("");
    setFileSize(0);
    setIsRemote(false);
    onFileChange(null, "");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: "100%",
      }}
    >
      {/* Label + action buttons */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div className="sv-row-t">Organisation logo</div>
          <div className="sv-row-s" style={{ marginTop: 2 }}>
            PNG, SVG or JPEG · recommended 200×60 px · max 2 MB
          </div>
        </div>
        {preview && (
          <div style={{ display: "flex", gap: 6, flexShrink: 0, marginTop: 2 }}>
            <button className="btn sm" onClick={handleRemove}>
              Remove
            </button>
            <label className="btn sm pri" style={{ cursor: "pointer" }}>
              Replace
              <input
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                style={{ display: "none" }}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) processFile(f);
                  e.target.value = "";
                }}
              />
            </label>
          </div>
        )}
      </div>

      {/* Preview card */}
      {preview && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 14px",
            background: "var(--bg3)",
            borderRadius: 9,
            border: "0.5px solid var(--brd2)",
          }}
        >
          {/* Thumbnail */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 8,
              border: "0.5px solid var(--brd2)",
              background: "var(--bg2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src={preview}
              alt="logo"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Meta */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                color: "var(--ink)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {fileName || "logo.png"}
            </div>
            {fileSize > 0 && (
              <div style={{ fontSize: 11, color: "var(--ink5)", marginTop: 2 }}>
                {formatBytes(fileSize)}
              </div>
            )}
            {isRemote && fileSize === 0 && (
              <div style={{ fontSize: 11, color: "var(--ink5)", marginTop: 2 }}>
                Saved to cloud storage
              </div>
            )}
          </div>
        </div>
      )}

      {/* Drop zone */}
      {!preview && (
        <div
          ref={zoneRef}
          style={{
            position: "relative",
            border: `1.5px dashed ${dragging ? "var(--p)" : "var(--brd3)"}`,
            borderRadius: 12,
            padding: "20px 20px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            cursor: "pointer",
            transition: "border-color .15s, background .15s",
            background: dragging
              ? "color-mix(in srgb,var(--p) 5%,transparent)"
              : "var(--bg3)",
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const f = e.dataTransfer.files?.[0];
            if (f) processFile(f);
          }}
        >
          <input
            type="file"
            accept="image/png,image/jpeg,image/svg+xml,image/webp"
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0,
              cursor: "pointer",
              width: "100%",
              height: "100%",
            }}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) processFile(f);
              e.target.value = "";
            }}
          />
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "var(--bg2)",
              border: "0.5px solid var(--brd2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: 20,
            }}
          >
            🖼
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--ink)",
                marginBottom: 2,
              }}
            >
              Click to upload&nbsp;
              <span style={{ fontWeight: 400, color: "var(--ink5)" }}>
                or drag &amp; drop
              </span>
            </div>
            <div style={{ fontSize: 11.5, color: "var(--ink5)" }}>
              PNG, SVG or JPEG · recommended 200×60 px
            </div>
          </div>
          <div
            style={{
              pointerEvents: "none",
              flexShrink: 0,
              padding: "7px 14px",
              borderRadius: 7,
              border: "0.5px solid var(--brd2)",
              background: "var(--bg2)",
              fontSize: 12,
              fontWeight: 600,
              color: "var(--ink)",
              whiteSpace: "nowrap",
            }}
          >
            Browse file
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Live preview bar ─────────────────────────────────────────────────────────
const LivePreview: React.FC<{
  orgName: string;
  logoDataUrl: string;
  primaryColour: string;
}> = ({ orgName, logoDataUrl, primaryColour }) => {
  const col = isValidHex(primaryColour) ? primaryColour : "#4B48C8";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: "100%",
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: ".08em",
          color: "var(--ink5)",
        }}
      >
        Live preview
      </div>
      <div
        style={{
          border: "0.5px solid var(--brd2)",
          borderRadius: 10,
          overflow: "hidden",
          background: "var(--bg3)",
        }}
      >
        {/* Topbar */}
        <div
          style={{
            height: 42,
            display: "flex",
            alignItems: "center",
            gap: 9,
            padding: "0 13px",
            background: "var(--bg2)",
            borderBottom: "0.5px solid var(--brd)",
          }}
        >
          <span
            style={{
              width: 26,
              height: 26,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 6,
              background: "linear-gradient(135deg,#4B48C8,#7A78E0)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 13,
              flexShrink: 0,
            }}
          >
            z
          </span>
          {logoDataUrl && (
            <>
              <span
                style={{
                  width: "0.5px",
                  height: 16,
                  background: "var(--brd2)",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  height: 22,
                  maxWidth: 80,
                  overflow: "hidden",
                }}
              >
                <img
                  src={logoDataUrl}
                  alt="org"
                  style={{
                    maxHeight: 22,
                    maxWidth: 80,
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </span>
            </>
          )}
          {!logoDataUrl && (
            <span style={{ fontSize: 13, fontWeight: 700, color: col }}>
              {orgName || "zotra"}
            </span>
          )}
          <span style={{ flex: 1 }} />
          <span style={{ fontSize: 10, color: "var(--ink5)" }}>
            Sidebar · Proposal PDF
          </span>
        </div>
        {/* Body */}
        <div
          style={{
            padding: 16,
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              flex: 1,
              background: "var(--bg2)",
              border: "0.5px solid var(--brd)",
              borderRadius: 9,
              padding: "14px 16px",
            }}
          >
            <div
              style={{
                width: 80,
                height: 28,
                borderRadius: 5,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              {logoDataUrl ? (
                <img
                  src={logoDataUrl}
                  alt="logo"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <span style={{ fontWeight: 700, fontSize: 11, color: col }}>
                  zotra
                </span>
              )}
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--ink)",
                marginBottom: 4,
              }}
            >
              Proposal · {orgName || "Optimus BT"}
            </div>
            <div
              style={{
                height: 7,
                borderRadius: 3,
                background: "var(--bg3)",
                marginBottom: 5,
              }}
            />
            <div
              style={{
                height: 7,
                borderRadius: 3,
                background: "var(--bg3)",
                width: "60%",
                marginBottom: 5,
              }}
            />
            <div
              style={{
                height: 7,
                borderRadius: 3,
                background: "var(--bg3)",
                width: "80%",
                marginBottom: 10,
              }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  height: 22,
                  width: 60,
                  borderRadius: 5,
                  background: col,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 9, fontWeight: 700, color: "#fff" }}>
                  Send →
                </span>
              </div>
              <div
                style={{
                  height: 22,
                  width: 50,
                  borderRadius: 5,
                  background: "var(--bg3)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main panel ───────────────────────────────────────────────────────────────
export default function PanelBranding() {
  const { colorScheme, onColorSchemeChange } = useContext(ThemeContext);
  const { setOrgBranding } = useAuth();
  const [org, setOrg] = useState<OrgData | null>(null);
  const [original, setOriginal] = useState<OrgData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    msg: string;
    type: "ok" | "err";
  } | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // logoRemoteUrl  — the raw https:// string from the API (for sending back on PATCH)
  const [logoRemoteUrl, setLogoRemoteUrl] = useState<string>("");
  // logoDisplayUrl — blob: objectURL (or data URI for newly picked files) used in <img src>
  const [logoDisplayUrl, setLogoDisplayUrl] = useState<string>("");

  // Track object URLs we create so we can revoke them on unmount / replacement
  const objectUrlsRef = useRef<string[]>([]);

  function registerObjectUrl(url: string) {
    if (url.startsWith("blob:")) objectUrlsRef.current.push(url);
  }

  useEffect(() => {
    return () => {
      // Clean up any blob: URLs we created
      objectUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  function showToast(msg: string, type: "ok" | "err" = "ok") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  // ── Load org on mount ──
  useEffect(() => {
    setLoading(true);
    apiFetch(`${baseUrl()}/organizations`, { headers: authHeaders() })
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json() as Promise<OrgData>;
      })
      .then(async (data) => {
        setOrg(data);
        setOriginal(data);
        setApiError(null);

        // Store the raw remote URL for use in PATCH payload
        const rawUrl = resolveLogoUrl(data.logoURL ?? "");
        setLogoRemoteUrl(rawUrl);

        // Fetch it through our auth headers → blob: URL to bypass CORS
        if (rawUrl) {
          const displayUrl = await fetchLogoAsObjectUrl(rawUrl);
          registerObjectUrl(displayUrl);
          setLogoDisplayUrl(displayUrl);
        } else {
          setLogoDisplayUrl("");
        }

        // Sync colour scheme from API primarycolour
        const schemeKey = schemeFromColour(data.primarycolour ?? "");
        localStorage.setItem("zotra_color_scheme", schemeKey);
        onColorSchemeChange(schemeKey as import("../types").ColorScheme);
        window.dispatchEvent(new Event("storage"));
      })
      .catch((err: Error) => {
        setApiError(err.message);
        const blank: OrgData = {
          orgName: "",
          domain: "",
          email: "",
          plan: 0,
          status: 0,
          maxUsers: 0,
          maxWorkspaces: 0,
          createdAt: new Date().toISOString(),
          createdBy: "",
          updatedAt: new Date().toISOString(),
          updatedBy: "",
          verificationOtp: null,
          verificationOtpExpiresAt: null,
          isEmailVerified: false,
          region: "",
          companySize: "",
          companyType: "",
          edition: "",
          isOnboardingCompleted: false,
          logoURL: "",
          primarycolour: "#4B48C8",
          replysignature: "",
        };
        setOrg(blank);
        setOriginal(blank);
      })
      .finally(() => setLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function set<K extends keyof OrgData>(key: K, val: OrgData[K]) {
    setOrg((p) => (p ? { ...p, [key]: val } : p));
  }

  // ── Save ──
  async function handleSave() {
    if (!org) return;
    setSaving(true);
    try {
      const resolvedColour = SCHEME_COLOURS[colorScheme] ?? org.primarycolour;

      const fd = new FormData();
      fd.append("OrgName", org.orgName);
      fd.append("Domain", org.domain);
      fd.append("Primarycolour", resolvedColour);
      fd.append("Replysignature", org.replysignature);

      if (logoFile) {
        fd.append("Logo", logoFile);
      } else if (
        logoRemoteUrl &&
        (logoRemoteUrl.startsWith("http://") ||
          logoRemoteUrl.startsWith("https://"))
      ) {
        fd.append("Logo", logoRemoteUrl);
      }

      const res = await apiFetch(`${baseUrl()}/organizations`, {
        method: "PATCH",
        headers: authHeadersNoContent(),
        body: fd,
      });
      if (!res.ok) throw new Error(`${res.status}`);

      let updatedRemoteUrl = logoRemoteUrl;
      try {
        const resData = (await res.json()) as Partial<OrgData>;
        if (resData.logoURL) updatedRemoteUrl = resolveLogoUrl(resData.logoURL);
      } catch {
        /* empty response — fine */
      }

      // If the server returned a new URL, re-fetch it as a blob
      let updatedDisplayUrl = logoDisplayUrl;
      if (updatedRemoteUrl && updatedRemoteUrl !== logoRemoteUrl) {
        updatedDisplayUrl = await fetchLogoAsObjectUrl(updatedRemoteUrl);
        registerObjectUrl(updatedDisplayUrl);
      }

      const updated = {
        ...org,
        logoURL: updatedRemoteUrl,
        primarycolour: resolvedColour,
      };
      setOrg(updated);
      setOriginal(updated);
      setLogoRemoteUrl(updatedRemoteUrl);
      setLogoDisplayUrl(updatedDisplayUrl);
      setLogoFile(null);

      setOrgBranding({
        orgName: updated.orgName,
        orgLogoUrl: updatedDisplayUrl,
        orgColor: resolvedColour,
      });
      localStorage.setItem("zotra_orgColor", resolvedColour);
      window.dispatchEvent(new Event("storage"));

      showToast("Branding saved successfully");
    } catch (err) {
      showToast(`Save failed: ${(err as Error).message}`, "err");
    } finally {
      setSaving(false);
    }
  }

  // ── Loading skeleton ──
  if (loading || !org) {
    return (
      <div className="sv-card">
        <CardHdr
          icon="🏷"
          title="Branding"
          api="PATCH /organizations · tenant branding & white-labelling"
        />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="sv-row" style={{ gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div
                className="skel"
                style={{ height: 12, width: 140, marginBottom: 6 }}
              />
              <div className="skel" style={{ height: 10, width: 220 }} />
            </div>
            <div
              className="skel"
              style={{ height: 30, width: 200, borderRadius: 7 }}
            />
          </div>
        ))}
      </div>
    );
  }

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
          }}
        >
          ⚠ Could not reach API ({apiError}). Showing defaults — changes will
          submit when saved.
        </div>
      )}

      <div className="sv-card">
        <CardHdr
          icon="🏷"
          title="Branding"
          api="PATCH /organizations · tenant branding & white-labelling"
        />

        {/* Organisation name */}
        <Row
          label="Organization name"
          sub="Displayed in emails and exports generated by Zotra"
        >
          <input
            className="sv-input"
            value={org.orgName}
            placeholder="Your organisation name"
            onChange={(e) => set("orgName", e.target.value)}
          />
        </Row>

        {/* Logo upload */}
        <div
          className="sv-row"
          style={{ flexDirection: "column", alignItems: "stretch", gap: 0 }}
        >
          <LogoUpload
            currentUrl={logoDisplayUrl}
            currentRemoteUrl={logoRemoteUrl}
            onFileChange={(file, dataUrl) => {
              setLogoFile(file);
              setLogoDisplayUrl(dataUrl);
              if (!file) setLogoRemoteUrl(""); // user hit Remove
            }}
          />
        </div>

        {/* Colour scheme */}
        <Row
          label="Colour scheme"
          sub="App-wide colour theme — applies to the entire interface"
        >
          <div
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <ColourSchemeSwatch />
            <select
              className="sv-input"
              value={colorScheme}
              style={{ minWidth: 200, paddingLeft: 32 }}
              onChange={(e) => {
                const val = e.target.value as import("../types").ColorScheme;
                localStorage.setItem("zotra_color_scheme", val);
                onColorSchemeChange(val);
                window.dispatchEvent(new Event("storage"));
              }}
            >
              <option value="default">Default — Indigo &amp; Violet</option>
              <option value="warm">Warm &amp; Light — Terracotta</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </Row>

        {/* Reply signature */}
        <Row
          label="Reply signature"
          sub="Default sign-off appended to Comms agent reply drafts"
        >
          <input
            className="sv-input"
            value={org.replysignature}
            placeholder="Warm regards,"
            onChange={(e) => set("replysignature", e.target.value)}
          />
        </Row>

        {/* Live preview */}
        <div
          className="sv-row"
          style={{ flexDirection: "column", alignItems: "stretch", gap: 0 }}
        >
          <LivePreview
            orgName={org.orgName}
            logoDataUrl={logoDisplayUrl}
            primaryColour={SCHEME_COLOURS[colorScheme] ?? org.primarycolour}
          />
        </div>

        {/* Actions */}
        <div
          className="sv-save"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            padding: "12px 18px",
            borderTop: "0.5px solid var(--brd)",
          }}
        >
          <button
            className="btn"
            onClick={async () => {
              if (original) {
                setOrg({ ...original });
                const rawUrl = resolveLogoUrl(original.logoURL ?? "");
                setLogoRemoteUrl(rawUrl);
                const displayUrl = rawUrl
                  ? await fetchLogoAsObjectUrl(rawUrl)
                  : "";
                if (displayUrl) registerObjectUrl(displayUrl);
                setLogoDisplayUrl(displayUrl);
                setLogoFile(null);
              }
            }}
          >
            Reset to loaded
          </button>
          <button className="btn pri" onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save branding"}
          </button>
        </div>
      </div>
    </>
  );
}
