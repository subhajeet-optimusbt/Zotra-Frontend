import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { baseUrl, apiFetch } from "../utils/utils";
import { useAuth } from "../../context/AuthContext";

// ─── Avatar preset palette ────────────────────────────────────────────────────
const AVATAR_PRESETS = [
  { id: "av-indigo", bg: "#EEF2FF", ring: "#4338CA", color: "#4338CA" },
  { id: "av-violet", bg: "#F5F3FF", ring: "#7C3AED", color: "#7C3AED" },
  { id: "av-rose", bg: "#FFF1F2", ring: "#BE123C", color: "#BE123C" },
  { id: "av-amber", bg: "#FFFBEB", ring: "#B45309", color: "#B45309" },
  { id: "av-green", bg: "#F0FDF4", ring: "#15803D", color: "#15803D" },
  { id: "av-cyan", bg: "#ECFEFF", ring: "#0E7490", color: "#0E7490" },
  { id: "av-slate", bg: "#F1F5F9", ring: "#475569", color: "#475569" },
  { id: "av-fuchsia", bg: "#FDF4FF", ring: "#A21CAF", color: "#A21CAF" },
];

const TIMEZONES = [
  "Asia/Kolkata (IST +5:30)",
  "America/New_York (EST)",
  "Europe/London (GMT)",
  "America/Los_Angeles (PST)",
];
const LANGUAGES = ["English (US)", "English (UK)", "Hindi"];

const MAX_PHOTO_SIZE = 2 * 1024 * 1024;

// ─── Types ────────────────────────────────────────────────────────────────────
interface ProfileForm {
  fullName: string;
  email: string;
  jobRole: string;
  timezone: string;
  language: string;
  avatarPreset: string;
}

interface UserRecord {
  partitionKey: string;
  rowKey: string;
  userId: string;
  email: string;
  fullName: string;
  role: string;
  status: "Active" | "Invited" | string;
  invitedAt: string;
  acceptedAt: string | null;
  lastActiveAt: string | null;
  createdBy: string | null;
  isEmailVerified: boolean;
  jobRole: string;
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const STYLES = `
/* ── Root ── */
.pp-root {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg);
}

/* ── Page header — slim, professional ── */
.pp-hd {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 28px 18px;
  background: var(--bg2);
  border-bottom: 0.5px solid var(--brd);
  flex-shrink: 0;
  background: var(--pp);
}
.pp-hd-avatar {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  font-weight: 800;
  color: #fff;
  flex-shrink: 0;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(85,82,201,0.22);
  font-family: "Sora", sans-serif;
  letter-spacing: -0.02em;
  position: relative;
}
.pp-hd-avatar img { width: 100%; height: 100%; object-fit: cover; }
.pp-hd-avatar-dot {
  position: absolute;
  bottom: 1px;
  right: 1px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #22c55e;
  border: 1.5px solid var(--bg2);
}
.pp-hd-info { flex: 1; min-width: 0; }
.pp-hd-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--ink);
  font-family: "Sora", sans-serif;
  letter-spacing: -0.02em;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pp-hd-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 3px;
  flex-wrap: wrap;
}
.pp-hd-badge {
  font-size: 10.5px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
  background: var(--pp);
  color: var(--p);
  letter-spacing: 0.01em;
}
.pp-hd-email {
  font-size: 11px;
  color: var(--ink4);
  font-family: "DM Mono", monospace;
}
.pp-hd-sep {
  width: 1px;
  height: 32px;
  background: var(--brd);
  flex-shrink: 0;
  margin: 0 4px;
}
.pp-hd-stat {
  text-align: center;
  padding: 0 12px;
  flex-shrink: 0;
}
.pp-hd-stat-val {
  font-size: 16px;
  font-weight: 800;
  color: var(--p);
  font-family: "Sora", sans-serif;
  letter-spacing: -0.03em;
  line-height: 1;
}
.pp-hd-stat-lbl {
  font-size: 10px;
  color: var(--ink5);
  font-weight: 500;
  margin-top: 1px;
  white-space: nowrap;
}

/* ── Body: two-column grid ── */
.pp-body {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 316px;
  gap: 20px;
  padding: 20px 28px;
  overflow-y: auto;
  align-items: start;
  scrollbar-width: thin;
  scrollbar-color: var(--brd2) transparent;
  min-height: 0;
}
.pp-body::-webkit-scrollbar { width: 4px; }
.pp-body::-webkit-scrollbar-thumb { background: var(--brd2); border-radius: 4px; }

.pp-col-left  { display: flex; flex-direction: column; gap: 16px; }
.pp-col-right { display: flex; flex-direction: column; gap: 16px; }

/* ── Card ── */
.pp-card {
  background: var(--bg2);
  border: 0.5px solid var(--brd);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(40,40,80,0.05);
}
.pp-card-hdr {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border-bottom: 0.5px solid var(--brd);
}
.pp-card-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  flex-shrink: 0;
  background: var(--pp);
  color: var(--p);
}
.pp-card-title {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--ink);
  font-family: "Sora", sans-serif;
  letter-spacing: -0.01em;
}
.pp-card-sub {
  font-size: 11px;
  color: var(--ink4);
  margin-top: 1px;
}

/* ── Form fields ── */
.pp-fields-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  padding: 16px 18px;
  border-bottom: 0.5px solid var(--brd);
}
.pp-fields-2col:last-of-type { border-bottom: none; }
.pp-fields-1col {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px 18px;
  border-bottom: 0.5px solid var(--brd);
}
.pp-fields-1col:last-of-type { border-bottom: none; }

.pp-field-group { display: flex; flex-direction: column; gap: 5px; }
.pp-label {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: 0.01em;
}
.pp-label-sub {
  font-size: 10.5px;
  color: var(--ink4);
  line-height: 1.4;
  margin-top: -3px;
  margin-bottom: 2px;
}
.pp-input {
  height: 32px;
  padding: 0 11px;
  border-radius: 8px;
  border: 0.5px solid var(--brd2);
  background: var(--bg3);
  font-size: 12px;
  color: var(--ink);
  font-family: "DM Sans", sans-serif;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  transition: border-color .12s, box-shadow .12s;
}
.pp-input:focus {
  border-color: var(--p);
  background: var(--bg2);
  box-shadow: 0 0 0 2.5px rgba(85,82,201,0.09);
}
.pp-select {
  height: 32px;
  padding: 0 30px 0 11px;
  border-radius: 8px;
  border: 0.5px solid var(--brd2);
  background: var(--bg3);
  font-size: 12px;
  color: var(--ink);
  font-family: "DM Sans", sans-serif;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2388889A'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 9px center;
  transition: border-color .12s, box-shadow .12s;
}
.pp-select:focus {
  border-color: var(--p);
  background-color: var(--bg2);
  box-shadow: 0 0 0 2.5px rgba(85,82,201,0.09);
}

/* ── Avatar preset picker ── */
.pp-presets {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 2px;
}
.pp-preset-swatch {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10.5px;
  font-weight: 800;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color .12s, transform .1s, box-shadow .12s;
  user-select: none;
  flex-shrink: 0;
  font-family: "Sora", sans-serif;
}
.pp-preset-swatch:hover { transform: scale(1.1); }
.pp-preset-swatch.pp-active { box-shadow: 0 0 0 2.5px rgba(85,82,201,0.18); }

/* ── Photo upload ── */
.pp-photo-preview {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 10px 12px;
  background: var(--bg3);
  border-radius: 9px;
  border: 0.5px solid var(--brd2);
  margin-top: 6px;
}
.pp-photo-thumb {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 0.5px solid var(--brd2);
  overflow: hidden;
  flex-shrink: 0;
}
.pp-photo-thumb img { width: 100%; height: 100%; object-fit: cover; }
.pp-photo-name { font-size: 12px; font-weight: 600; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pp-photo-meta { font-size: 10.5px; color: var(--ink5); margin-top: 1px; }
.pp-dropzone {
  position: relative;
  border: 1.5px dashed var(--brd3);
  border-radius: 10px;
  padding: 16px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: border-color .15s, background .15s;
  background: var(--bg3);
  margin-top: 6px;
}
.pp-dropzone.pp-drag {
  border-color: var(--p);
  background: color-mix(in srgb, var(--p) 5%, transparent);
}
.pp-dropzone-icon {
  width: 36px; height: 36px;
  border-radius: 9px;
  background: var(--bg2);
  border: 0.5px solid var(--brd2);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; flex-shrink: 0;
}
.pp-dropzone-browse {
  pointer-events: none;
  flex-shrink: 0;
  padding: 6px 12px;
  border-radius: 7px;
  border: 0.5px solid var(--brd2);
  background: var(--bg2);
  font-size: 11.5px;
  font-weight: 600;
  color: var(--ink);
  white-space: nowrap;
}
.pp-photo-action-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.pp-photo-btn-row { display: flex; gap: 6px; flex-shrink: 0; }

/* ── Save footer ── */
.pp-save {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 18px;
  border-top: 0.5px solid var(--brd);
  background: var(--bg2);
}

/* ── Right column: stat chips ── */
.pp-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 14px 18px;
}
.pp-stat {
  background: var(--bg3);
  border: 0.5px solid var(--brd);
  border-radius: 10px;
  padding: 11px 12px;
  text-align: center;
}
.pp-stat-val {
  font-size: 18px;
  font-weight: 800;
  color: var(--p);
  font-family: "Sora", sans-serif;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 3px;
}
.pp-stat-lbl {
  font-size: 10px;
  color: var(--ink4);
  font-weight: 500;
}

/* ── Right column: security & activity rows ── */
.pp-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 18px;
  border-bottom: 0.5px solid var(--brd);
  gap: 10px;
}
.pp-row:last-child { border-bottom: none; }
.pp-row-lbl { font-size: 12px; font-weight: 500; color: var(--ink); }
.pp-row-sub { font-size: 10.5px; color: var(--ink4); margin-top: 1px; }

.pp-act-row {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  padding: 9px 18px;
  border-bottom: 0.5px solid var(--brd);
}
.pp-act-row:last-child { border-bottom: none; }
.pp-act-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--p);
  flex-shrink: 0;
  margin-top: 4px;
  opacity: 0.55;
}
.pp-act-text { font-size: 11.5px; color: var(--ink3); line-height: 1.4; flex: 1; }
.pp-act-time { font-size: 10.5px; color: var(--ink5); flex-shrink: 0; font-family: "DM Mono", monospace; white-space: nowrap; }

/* ── Toggle ── */
.pp-tg{position:relative;display:inline-block;width:34px;height:19px;min-width:34px;cursor:pointer}
.pp-tg input{opacity:0;width:0;height:0;position:absolute}
.pp-tg-track{position:absolute;inset:0;border-radius:20px;background:var(--ink6);transition:background .2s}
.pp-tg input:checked+.pp-tg-track{background:var(--p)}
.pp-tg-thumb{position:absolute;top:2.5px;left:2.5px;width:14px;height:14px;border-radius:50%;background:#fff;transition:transform .2s;box-shadow:0 1px 4px rgba(0,0,0,.18)}
.pp-tg input:checked~.pp-tg-thumb{transform:translateX(15px)}

/* ── Buttons ── */
.pp-btn {
  height: 30px;
  padding: 0 12px;
  border-radius: 8px;
  border: 0.5px solid var(--brd2);
  background: var(--bg2);
  font-size: 11.5px;
  color: var(--ink2);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: inherit;
  transition: all .12s;
  white-space: nowrap;
  flex-shrink: 0;
}
.pp-btn:hover { background: var(--pu); border-color: var(--brd3); color: var(--p); }
.pp-btn.pp-pri { background: var(--p); border-color: var(--p); color: #fff; font-weight: 600; }
.pp-btn.pp-pri:hover { opacity: 0.88; }
.pp-btn.pp-sm { height: 26px; padding: 0 10px; font-size: 11px; border-radius: 7px; }
.pp-btn.pp-xs { height: 22px; padding: 0 8px; font-size: 10.5px; border-radius: 6px; }
.pp-btn:disabled { opacity: .5; cursor: not-allowed; pointer-events: none; }

/* ── Error ── */
.pp-api-error {
  display: flex; gap: 8px; align-items: center;
  padding: 9px 14px;
  font-size: 11.5px; color: var(--wa);
  background: var(--wab); border-radius: 9px;
  border: 0.5px solid rgba(185,28,28,0.15);
  margin-bottom: 12px;
}

/* ── Toast ── */
.pp-toast {
  position: fixed; bottom: 22px; right: 22px;
  padding: 10px 16px; border-radius: 10px;
  font-size: 12.5px; font-weight: 500; color: #fff;
  z-index: 9999; display: flex; align-items: center; gap: 7px;
  box-shadow: 0 4px 20px rgba(0,0,0,.18);
  animation: ppToastIn .2s ease;
}
.pp-toast.ok { background: #1B6B4A; }
.pp-toast.err { background: #B91C1C; }
@keyframes ppToastIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

/* ── Skeleton ── */
.pp-skel { background:linear-gradient(90deg,var(--bg3) 25%,var(--brd) 50%,var(--bg3) 75%); background-size:200% 100%; animation:ppShimmer 1.4s infinite; border-radius:6px; }
@keyframes ppShimmer { to{background-position:-200% 0} }
`;

// ─── Primitives ───────────────────────────────────────────────────────────────
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
    <label className="pp-tg">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="pp-tg-track" />
      <span className="pp-tg-thumb" />
    </label>
  );
}

function Toast({ msg, type }: { msg: string; type: "ok" | "err" }) {
  return (
    <div className={`pp-toast ${type}`}>
      {type === "ok" ? "✓" : "✕"} {msg}
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function Card({
  icon,
  iconBg,
  iconColor,
  title,
  sub,
  children,
}: {
  icon: ReactNode;
  iconBg?: string;
  iconColor?: string;
  title: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="pp-card">
      <div className="pp-card-hdr">
        <div
          className="pp-card-icon"
          style={{
            background: iconBg ?? "var(--pp)",
            color: iconColor ?? "var(--p)",
          }}
        >
          {icon}
        </div>
        <div>
          <div className="pp-card-title">{title}</div>
          {sub && <div className="pp-card-sub">{sub}</div>}
        </div>
      </div>
      {children}
    </div>
  );
}

// ─── Avatar preset picker ─────────────────────────────────────────────────────
function AvatarPresetPicker({
  value,
  initials,
  onChange,
}: {
  value: string;
  initials: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="pp-presets">
      {AVATAR_PRESETS.map((preset) => {
        const active = value === preset.id;
        return (
          <div
            key={preset.id}
            onClick={() => onChange(active ? "" : preset.id)}
            title={preset.id.replace("av-", "")}
            className={"pp-preset-swatch" + (active ? " pp-active" : "")}
            style={{
              background: preset.bg,
              color: preset.color,
              borderColor: active ? preset.ring : "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform =
                "scale(1.12)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
            }}
          >
            {initials || "??"}
          </div>
        );
      })}
      {value && (
        <button className="pp-btn pp-xs" onClick={() => onChange("")}>
          Clear
        </button>
      )}
    </div>
  );
}

// ─── Photo upload ─────────────────────────────────────────────────────────────
const PhotoUpload: React.FC<{
  currentDisplayUrl: string;
  currentRemoteUrl: string;
  onFileChange: (file: File | null, dataUrl: string) => void;
}> = ({ currentDisplayUrl, currentRemoteUrl, onFileChange }) => {
  const [preview, setPreview] = useState(currentDisplayUrl);
  const [fileName, setFileName] = useState(
    currentDisplayUrl
      ? currentRemoteUrl
        ? (currentRemoteUrl.split("/").pop()?.split("?")[0] ?? "Current photo")
        : "Current photo"
      : "",
  );
  const [fileSize, setFileSize] = useState(0);
  const [isRemote, setIsRemote] = useState(!!currentRemoteUrl);
  const [dragging, setDragging] = useState(false);
  const zoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPreview(currentDisplayUrl);
    if (currentDisplayUrl && !currentDisplayUrl.startsWith("data:")) {
      setFileName(
        currentRemoteUrl
          ? (currentRemoteUrl.split("/").pop()?.split("?")[0] ?? "photo.jpg")
          : "photo.jpg",
      );
      setIsRemote(true);
    }
    setFileSize(0);
  }, [currentDisplayUrl, currentRemoteUrl]);

  const processFile = useCallback(
    (file: File) => {
      if (file.size > MAX_PHOTO_SIZE) {
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
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div className="pp-photo-action-row">
        <div>
          <div className="pp-label">Profile photo</div>
          <div className="pp-label-sub">
            JPEG, PNG or WebP · max 2 MB · first priority over avatar
          </div>
        </div>
        {preview && (
          <div className="pp-photo-btn-row">
            <button className="pp-btn pp-sm" onClick={handleRemove}>
              Remove
            </button>
            <label
              className="pp-btn pp-sm pp-pri"
              style={{ cursor: "pointer" }}
            >
              Replace
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
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
      {preview && (
        <div className="pp-photo-preview">
          <div className="pp-photo-thumb">
            <img src={preview} alt="profile" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="pp-photo-name">{fileName || "photo.jpg"}</div>
            {fileSize > 0 && (
              <div className="pp-photo-meta">{formatBytes(fileSize)}</div>
            )}
            {isRemote && fileSize === 0 && (
              <div className="pp-photo-meta">Saved to cloud storage</div>
            )}
          </div>
        </div>
      )}
      {!preview && (
        <div
          ref={zoneRef}
          className={"pp-dropzone" + (dragging ? " pp-drag" : "")}
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
            accept="image/png,image/jpeg,image/webp"
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
          <div className="pp-dropzone-icon">🧑‍💼</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 12,
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
            <div style={{ fontSize: 11, color: "var(--ink5)" }}>
              JPEG, PNG or WebP · max 2 MB
            </div>
          </div>
          <div className="pp-dropzone-browse">Browse file</div>
        </div>
      )}
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function PanelProfile() {
  const { setProfileImage } = useAuth();

  const [form, setForm] = useState<ProfileForm>({
    fullName: "",
    email: "",
    jobRole: "",
    timezone: "Asia/Kolkata (IST +5:30)",
    language: "English (US)",
    avatarPreset: "",
  });
  const [original, setOriginal] = useState<ProfileForm | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [on2fa, setOn2fa] = useState(true);
  const [toast, setToast] = useState<{
    msg: string;
    type: "ok" | "err";
  } | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoRemoteUrl, setPhotoRemoteUrl] = useState("");
  const [photoDisplayUrl, setPhotoDisplayUrl] = useState("");
  const objectUrlsRef = useRef<string[]>([]);

  function registerObjectUrl(url: string) {
    if (url.startsWith("blob:")) objectUrlsRef.current.push(url);
  }
  useEffect(
    () => () => {
      objectUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    },
    [],
  );
  function showToast(msg: string, type: "ok" | "err" = "ok") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }
  function authHeaders(): Record<string, string> {
    const t = localStorage.getItem("zotra_token");
    return {
      "Content-Type": "application/json",
      ...(t ? { Authorization: `Bearer ${t}` } : {}),
    };
  }
  function authHeadersNoContent(): Record<string, string> {
    const t = localStorage.getItem("zotra_token");
    return t ? { Authorization: `Bearer ${t}` } : {};
  }
  function getInitials(name: string): string {
    return (
      name
        .split(" ")
        .filter(Boolean)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "??"
    );
  }
  function getUserIdFromJwt(): string | null {
    try {
      const t = localStorage.getItem("zotra_token");
      if (!t) return null;
      const p = t.split(".")[1];
      if (!p) return null;
      const d = JSON.parse(
        atob(p.replace(/-/g, "+").replace(/_/g, "/")),
      ) as Record<string, unknown>;
      return (
        (d.userId as string) ||
        (d.user_id as string) ||
        (d.sub as string) ||
        (d.id as string) ||
        null
      );
    } catch {
      return null;
    }
  }
  async function fetchPhotoAsObjectUrl(remoteUrl: string): Promise<string> {
    if (!remoteUrl) return "";
    if (remoteUrl.startsWith("data:") || remoteUrl.startsWith("blob:"))
      return remoteUrl;
    try {
      const t = localStorage.getItem("zotra_token");
      const res = await fetch(remoteUrl, {
        headers: t ? { Authorization: `Bearer ${t}` } : {},
      });
      if (!res.ok) throw new Error(`${res.status}`);
      return URL.createObjectURL(await res.blob());
    } catch {
      return remoteUrl;
    }
  }

  useEffect(() => {
    setLoading(true);
    const storedId =
      localStorage.getItem("zotra_userId") ||
      localStorage.getItem("zotra_user_id") ||
      localStorage.getItem("userId") ||
      localStorage.getItem("user_id") ||
      getUserIdFromJwt();
    if (storedId) {
      fetchProfile(storedId);
      return;
    }
    const storedEmail =
      localStorage.getItem("zotra_email") ||
      localStorage.getItem("email") ||
      "";
    apiFetch(`${baseUrl()}/users`, { headers: authHeaders() })
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json() as Promise<UserRecord[]>;
      })
      .then((list) => {
        const match = storedEmail
          ? list.find(
              (u) => u.email.toLowerCase() === storedEmail.toLowerCase(),
            )
          : list[0];
        if (!match) throw new Error("Current user not found in /users list");
        fetchProfile(match.userId);
      })
      .catch((err: Error) => {
        setApiError(err.message);
        setLoading(false);
      });
  }, []);

  async function fetchProfile(uid: string) {
    setUserId(uid);
    try {
      const r = await apiFetch(`${baseUrl()}/users/${uid}`, {
        headers: authHeaders(),
      });
      if (!r.ok) throw new Error(`${r.status}`);
      const data = (await r.json()) as Record<string, unknown>;
      const loaded: ProfileForm = {
        fullName: (data.fullName as string) ?? "",
        email: (data.email as string) ?? "",
        jobRole: (data.jobRole as string) ?? (data.role as string) ?? "",
        timezone: (data.timezone as string) || "Asia/Kolkata (IST +5:30)",
        language: (data.language as string) || "English (US)",
        avatarPreset: (data.avatarPreset as string) ?? "",
      };
      setForm(loaded);
      setOriginal(loaded);
      setRole((data.role as string) ?? "");
      setApiError(null);
      const lsProfileUrl = localStorage.getItem("zotra_profileUrl") ?? "";
      const lsAvatar = localStorage.getItem("zotra_avatar") ?? "";
      const apiProfileUrl = (data.profileUrl as string) ?? "";
      const apiAvatar = (data.avatar as string) ?? "";
      const resolvedRemote =
        lsProfileUrl || apiProfileUrl || lsAvatar || apiAvatar || "";
      setPhotoRemoteUrl(resolvedRemote);
      if (resolvedRemote) {
        const d = await fetchPhotoAsObjectUrl(resolvedRemote);
        registerObjectUrl(d);
        setPhotoDisplayUrl(d);
      } else setPhotoDisplayUrl("");
    } catch (err: unknown) {
      setApiError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function setField<K extends keyof ProfileForm>(key: K, val: ProfileForm[K]) {
    setForm((p) => ({ ...p, [key]: val }));
  }

  async function handleSave() {
    if (!userId) {
      showToast("User ID not resolved — cannot save", "err");
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("FullName", form.fullName);
      fd.append("Email", form.email);
      fd.append("JobRole", form.jobRole);
      fd.append("Timezone", form.timezone);
      fd.append("Language", form.language);
      if (form.avatarPreset) fd.append("AvatarPreset", form.avatarPreset);
      if (photoFile) fd.append("ProfileImage", photoFile);
      else if (
        photoRemoteUrl &&
        (photoRemoteUrl.startsWith("http://") ||
          photoRemoteUrl.startsWith("https://"))
      )
        fd.append("ProfileUrl", photoRemoteUrl);
      const res = await apiFetch(`${baseUrl()}/users/${userId}`, {
        method: "PATCH",
        headers: authHeadersNoContent(),
        body: fd,
      });
      if (!res.ok) throw new Error(`${res.status}`);
      const getRes = await apiFetch(`${baseUrl()}/users/${userId}`, {
        headers: authHeaders(),
      });
      let updatedRemoteUrl = photoRemoteUrl;
      if (getRes.ok) {
        const d = (await getRes.json()) as Record<string, unknown>;
        const f = (d.profileUrl as string) ?? (d.avatar as string) ?? "";
        if (f) updatedRemoteUrl = f;
      }
      let updatedDisplayUrl = "";
      if (updatedRemoteUrl) {
        updatedDisplayUrl = await fetchPhotoAsObjectUrl(updatedRemoteUrl);
        registerObjectUrl(updatedDisplayUrl);
      } else if (photoFile && !updatedRemoteUrl)
        updatedDisplayUrl = photoDisplayUrl;
      setPhotoRemoteUrl(updatedRemoteUrl);
      setPhotoDisplayUrl(updatedDisplayUrl);
      setPhotoFile(null);
      setOriginal({ ...form });
      localStorage.setItem("zotra_profileUrl", updatedRemoteUrl);
      localStorage.setItem("zotra_avatar", "");
      setProfileImage(updatedRemoteUrl, "");
      window.dispatchEvent(
        new CustomEvent("zotra:profile-updated", {
          detail: { profileUrl: updatedRemoteUrl },
        }),
      );
      showToast("Profile saved successfully");
    } catch (err) {
      showToast(`Save failed: ${(err as Error).message}`, "err");
    } finally {
      setSaving(false);
    }
  }

  const activePreset = AVATAR_PRESETS.find((p) => p.id === form.avatarPreset);
  const initials = getInitials(form.fullName);
  const avatarGrad: React.CSSProperties = activePreset
    ? { background: activePreset.bg, color: activePreset.color }
    : {
        background: "linear-gradient(135deg,var(--p),var(--pl))",
        color: "#fff",
      };

  // ── Skeleton ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <>
        <style>{STYLES}</style>
        <div className="pp-root">
          <div className="pp-hd">
            <div
              className="pp-skel"
              style={{ width: 48, height: 48, borderRadius: 14, flexShrink: 0 }}
            />
            <div style={{ flex: 1 }}>
              <div
                className="pp-skel"
                style={{ height: 14, width: 140, marginBottom: 8 }}
              />
              <div className="pp-skel" style={{ height: 11, width: 200 }} />
            </div>
          </div>
          <div className="pp-body">
            <div className="pp-col-left">
              <div className="pp-card">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="pp-fields-2col"
                    style={{
                      borderBottom: i < 2 ? "0.5px solid var(--brd)" : "none",
                    }}
                  >
                    {[0, 1].map((j) => (
                      <div key={j} className="pp-field-group">
                        <div
                          className="pp-skel"
                          style={{ height: 11, width: 80, marginBottom: 4 }}
                        />
                        <div
                          className="pp-skel"
                          style={{ height: 32, borderRadius: 8 }}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="pp-col-right">
              <div className="pp-card">
                <div className="pp-card-hdr">
                  <div
                    className="pp-skel"
                    style={{ width: 28, height: 28, borderRadius: 8 }}
                  />
                  <div className="pp-skel" style={{ height: 12, width: 100 }} />
                </div>
                <div className="pp-stats">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="pp-skel"
                      style={{ height: 56, borderRadius: 10 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{STYLES}</style>
      {toast && <Toast msg={toast.msg} type={toast.type} />}

      <div className="pp-root">
        {/* ── Slim header ── */}
        <div className="pp-hd">
          {/* Avatar */}
          <div
            className="pp-hd-avatar"
            style={photoDisplayUrl ? {} : avatarGrad}
          >
            {photoDisplayUrl ? (
              <img src={photoDisplayUrl} alt={form.fullName} />
            ) : (
              initials
            )}
            <div className="pp-hd-avatar-dot" />
          </div>

          {/* Name + role + email */}
          <div className="pp-hd-info">
            <div className="pp-hd-name">{form.fullName || "—"}</div>
            <div className="pp-hd-meta">
              {role && <span className="pp-hd-badge">{role}</span>}
              {form.jobRole && form.jobRole !== role && (
                <span
                  className="pp-hd-badge"
                  style={{
                    background: "var(--bg3)",
                    color: "var(--ink3)",
                    border: "0.5px solid var(--brd2)",
                  }}
                >
                  {form.jobRole}
                </span>
              )}
              {form.email && <span className="pp-hd-email">{form.email}</span>}
            </div>
          </div>

          {/* Quick stat chips in header */}
          <div className="pp-hd-sep" />
          <div className="pp-hd-stat">
            <div className="pp-hd-stat-val">7</div>
            <div className="pp-hd-stat-lbl">Accounts</div>
          </div>
          <div className="pp-hd-stat">
            <div className="pp-hd-stat-val">14</div>
            <div className="pp-hd-stat-lbl">Opps</div>
          </div>
          <div className="pp-hd-stat">
            <div className="pp-hd-stat-val">13</div>
            <div className="pp-hd-stat-lbl">Intakes</div>
          </div>
        </div>

        {/* ── Two-column body ── */}
        <div className="pp-body">
          {/* ── Left column ── */}
          <div className="pp-col-left">
            {apiError && (
              <div className="pp-api-error">
                <span>⚠</span>
                <span>
                  Could not reach API ({apiError}). Some fields may be empty.
                </span>
              </div>
            )}

            {/* Identity */}
            <Card
              icon="👤"
              title="Identity"
              sub="How you appear across the platform"
            >
              <div className="pp-fields-2col">
                <div className="pp-field-group">
                  <label className="pp-label">Full name</label>
                  <div className="pp-label-sub">
                    Displayed across the app and in exports
                  </div>
                  <input
                    className="pp-input"
                    value={form.fullName}
                    onChange={(e) => setField("fullName", e.target.value)}
                  />
                </div>
                <div className="pp-field-group">
                  <label className="pp-label">Email address</label>
                  <div className="pp-label-sub">
                    Used for login and notifications
                  </div>
                  <input
                    className="pp-input"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                  />
                </div>
              </div>
              <div className="pp-fields-2col">
                <div className="pp-field-group">
                  <label className="pp-label">Role / Title</label>
                  <div className="pp-label-sub">
                    Shown on opportunity reports
                  </div>
                  <input
                    className="pp-input"
                    value={form.jobRole}
                    onChange={(e) => setField("jobRole", e.target.value)}
                  />
                </div>
                <div className="pp-field-group">
                  <label className="pp-label">Timezone</label>
                  <div className="pp-label-sub">&nbsp;</div>
                  <select
                    className="pp-select"
                    value={form.timezone}
                    onChange={(e) => setField("timezone", e.target.value)}
                  >
                    {TIMEZONES.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="pp-fields-2col" style={{ borderBottom: "none" }}>
                <div className="pp-field-group">
                  <label className="pp-label">Language</label>
                  <div className="pp-label-sub">Interface display language</div>
                  <select
                    className="pp-select"
                    value={form.language}
                    onChange={(e) => setField("language", e.target.value)}
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
                <div />
              </div>
            </Card>

            {/* Appearance */}
            <Card
              icon="🎨"
              title="Appearance"
              sub="Avatar colour and profile photo"
            >
              <div className="pp-fields-1col">
                <div className="pp-field-group">
                  <label className="pp-label">Avatar colour</label>
                  <div className="pp-label-sub">
                    {photoDisplayUrl
                      ? "Remove your photo above to use an initials avatar instead."
                      : "Pick a colour for your initials avatar. Uploading a photo overrides this."}
                  </div>
                  <AvatarPresetPicker
                    value={form.avatarPreset}
                    initials={initials}
                    onChange={(id) => setField("avatarPreset", id)}
                  />
                </div>
                <PhotoUpload
                  currentDisplayUrl={photoDisplayUrl}
                  currentRemoteUrl={photoRemoteUrl}
                  onFileChange={(file, dataUrl) => {
                    setPhotoFile(file);
                    setPhotoDisplayUrl(dataUrl);
                    if (!file) setPhotoRemoteUrl("");
                  }}
                />
              </div>
              <div className="pp-save">
                <button
                  className="pp-btn"
                  onClick={async () => {
                    if (original) {
                      setForm({ ...original });
                      const d = photoRemoteUrl
                        ? await fetchPhotoAsObjectUrl(photoRemoteUrl)
                        : "";
                      if (d) registerObjectUrl(d);
                      setPhotoDisplayUrl(d);
                      setPhotoFile(null);
                    }
                  }}
                >
                  Reset to loaded
                </button>
                <button
                  className="pp-btn pp-pri"
                  onClick={handleSave}
                  disabled={saving || !userId}
                >
                  {saving ? "Saving…" : "Save changes"}
                </button>
              </div>
            </Card>
          </div>

          {/* ── Right column ── */}
          <div className="pp-col-right">
            {/* Stats */}

            {/* Security */}
            <Card icon="🔑" title="Security" sub="Password and active sessions">
              <div className="pp-row">
                <div>
                  <div className="pp-row-lbl">Password</div>
                  <div className="pp-row-sub">Update your account password</div>
                </div>
                <button className="pp-btn pp-sm">Change</button>
              </div>
              <div className="pp-row">
                <div>
                  <div className="pp-row-lbl">Two-factor auth</div>
                  <div className="pp-row-sub">Authenticator app enabled</div>
                </div>
                <Toggle checked={on2fa} onChange={setOn2fa} />
              </div>
              <div className="pp-row">
                <div>
                  <div className="pp-row-lbl">Active sessions</div>
                  <div className="pp-row-sub">2 devices signed in</div>
                </div>
                <button className="pp-btn pp-sm">Sign out others</button>
              </div>
            </Card>

            {/* Activity */}
            <Card icon="⚡" title="Recent activity" sub="Last 4 actions">
              <div className="pp-act-row">
                <div className="pp-act-dot" />
                <div className="pp-act-text">Signed in via web browser</div>
                <div className="pp-act-time">Today</div>
              </div>
              <div className="pp-act-row">
                <div className="pp-act-dot" style={{ opacity: 0.4 }} />
                <div className="pp-act-text">Updated account profile</div>
                <div className="pp-act-time">2d ago</div>
              </div>
              <div className="pp-act-row">
                <div className="pp-act-dot" style={{ opacity: 0.3 }} />
                <div className="pp-act-text">Added new intake record</div>
                <div className="pp-act-time">4d ago</div>
              </div>
              <div className="pp-act-row">
                <div className="pp-act-dot" style={{ opacity: 0.2 }} />
                <div className="pp-act-text">Moved opportunity to Proposal</div>
                <div className="pp-act-time">1w ago</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
