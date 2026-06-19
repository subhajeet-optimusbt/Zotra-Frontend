import React, { useState, useRef, useEffect } from "react";
import Icon from "./Icon";
import type { ViewType } from "../types";
import { SUGGESTIONS } from "../data";
import { baseUrl, apiFetch } from "../utils/utils";
import { getToken } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const omnibarStyles = `
.tb{flex-shrink:0;background:var(--bg2);border-top:0.5px solid var(--brd);display:flex;align-items:center;justify-content:center;padding:10px 16px;gap:12px;position:relative;z-index:40}
.tb-omni{flex:1;max-width:720px;min-width:160px;position:relative}
.tb-omni-wrap{height:40px;border:1px solid var(--brd2);border-radius:12px;background:var(--bg);display:flex;align-items:center;padding:0 12px 0 14px;gap:10px;cursor:text;transition:border-color .12s,background .12s,box-shadow .12s}
.tb-omni-wrap:hover{border-color:var(--brd3)}
.tb-omni-wrap.focused{border-color:var(--p);background:var(--bg2);box-shadow:0 0 0 3px rgba(75,72,200,0.10)}
.tb-omni-ic{color:var(--ink4);flex-shrink:0}
.tb-omni-wrap.focused .tb-omni-ic{color:var(--p)}
.tb-omni-input{flex:1;background:transparent;border:0;outline:0;font-family:inherit;font-size:13px;color:var(--ink);min-width:0;font-weight:500}
.tb-omni-input::placeholder{color:var(--ink4);font-weight:400}
.tb-omni-kbd{font-family:"DM Mono",monospace;font-size:9.5px;color:var(--ink5);background:var(--bg2);border:0.5px solid var(--brd2);padding:1px 6px;border-radius:4px;flex-shrink:0;font-weight:500}
.tb-omni-mode{display:flex;align-items:center;gap:5px;height:26px;padding:0 10px;border-radius:7px;background:var(--pp);color:var(--p);font-size:10.5px;font-weight:600;font-family:"DM Mono",monospace;letter-spacing:.04em;text-transform:uppercase;flex-shrink:0;cursor:pointer;border:0.5px solid var(--brd2)}
.tb-omni-mode:hover{background:var(--p);color:#fff}
.tb-omni-attach{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:7px;background:var(--bg2);color:var(--ink4);cursor:pointer;flex-shrink:0;border:0.5px solid var(--brd2);transition:all .12s}
.tb-omni-attach:hover{border-color:var(--p);color:var(--p);background:var(--pp)}
.tb-omni-attach.has-file{border-color:var(--p);color:var(--p);background:var(--pp)}
.tb-omni-file-pill{max-width:132px;display:flex;align-items:center;gap:5px;height:24px;padding:0 8px;border-radius:7px;background:var(--pp);color:var(--p);border:0.5px solid var(--brd2);font-size:10.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex-shrink:0}
.tb-omni-file-pill span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tb-omni-send{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:7px;background:var(--p);color:#fff;cursor:pointer;flex-shrink:0;border:0;transition:background .12s}
.tb-omni-send:hover{background:var(--pd)}
.tb-omni-send:disabled{background:var(--bg3);color:var(--ink5);cursor:default}
.omni-dd{position:absolute;bottom:calc(100% + 8px);left:0;right:0;background:var(--bg2);border:0.5px solid var(--brd2);border-radius:14px;box-shadow:0 -12px 36px -8px rgba(60,50,150,.18),0 0 0 0.5px var(--brd2);z-index:200;overflow:hidden;animation:omni-fade-up .14s ease-out;max-height:60vh;display:flex;flex-direction:column}
.omni-dd-scroll{overflow-y:auto;flex:1;min-height:0}
.omni-dd-modes{display:flex;gap:6px;padding:10px 12px;border-bottom:0.5px solid var(--brd);background:var(--bg3);flex-shrink:0}
.omni-mode-pill{flex:1;display:flex;align-items:center;gap:6px;padding:7px 10px;border-radius:8px;background:var(--bg2);border:0.5px solid var(--brd2);cursor:pointer;font-size:11px;font-weight:600;color:var(--ink3);text-transform:uppercase;font-family:"DM Mono",monospace;letter-spacing:.05em;transition:all .12s;min-width:0}
.omni-mode-pill:hover{border-color:var(--brd3);color:var(--ink2)}
.omni-mode-pill.on{background:var(--p);border-color:var(--p);color:#fff}
.omni-mode-pill-hint{font-family:"DM Sans",sans-serif;font-weight:500;font-size:10px;color:var(--ink5);text-transform:none;letter-spacing:0;margin-left:auto;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.omni-mode-pill.on .omni-mode-pill-hint{color:rgba(255,255,255,.85)}
.omni-dd-sect{padding:6px 0}
.omni-dd-sect+.omni-dd-sect{border-top:0.5px solid var(--brd)}
.omni-dd-lbl{font-size:9px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--ink5);padding:7px 14px 4px;display:flex;align-items:center;gap:6px}
.omni-dd-it{display:flex;align-items:center;gap:10px;padding:8px 14px;cursor:pointer;font-size:12.5px;color:var(--ink2);transition:background .1s}
.omni-dd-it:hover,.omni-dd-it.active{background:var(--pu);color:var(--p)}
.omni-dd-it .omni-dd-ic{width:24px;height:24px;border-radius:7px;background:var(--bg3);display:flex;align-items:center;justify-content:center;color:var(--ink4);flex-shrink:0;border:0.5px solid var(--brd2)}
.omni-dd-it.active .omni-dd-ic{background:var(--pp);color:var(--p);border-color:var(--brd2)}
.omni-dd-it .omni-dd-kind{font-family:"DM Mono",monospace;font-size:9px;text-transform:uppercase;letter-spacing:.05em;color:var(--ink5);margin-left:auto;flex-shrink:0}
.omni-dd-footer{padding:8px 14px;background:var(--bg3);border-top:0.5px solid var(--brd);display:flex;align-items:center;gap:14px;font-size:10.5px;color:var(--ink5);font-family:"DM Mono",monospace;flex-shrink:0}
.omni-dd-footer .legend{display:flex;align-items:center;gap:4px}
.omni-toast{position:fixed;bottom:84px;left:50%;transform:translateX(-50%);background:var(--ink);color:#fff;padding:10px 16px;border-radius:10px;font-size:12.5px;box-shadow:0 12px 32px -8px rgba(0,0,0,.4);z-index:300;display:flex;align-items:center;gap:9px;max-width:540px;animation:omni-toast-in .2s ease-out}
.omni-toast-ic{width:22px;height:22px;border-radius:6px;background:var(--ok);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.omni-toast-ic.err{background:#e5566c}
.omni-toast-body{flex:1;min-width:0;line-height:1.4}
.omni-toast-body b{font-weight:600}
.omni-toast-body small{display:block;font-family:"DM Mono",monospace;font-size:10.5px;opacity:.65;margin-top:1px}
.omni-sending{opacity:.6;pointer-events:none}
`;

const MODE_CONF: Record<string, { ic: string; placeholder: string }> = {
  ask: {
    ic: "sparkles",
    placeholder:
      "Ask anything \u2014 e.g. \u201cwhich accounts are cooling off this week?\u201d",
  },
  go: {
    ic: "arrow-right",
    placeholder:
      "Jump to anything \u2014 e.g. \u201cAcme Robotics\u201d or \u201cInbox\u201d",
  },
  do: {
    ic: "wand-2",
    placeholder:
      "Do anything \u2014 e.g. \u201cdraft a follow-up for Sasha at Northwind\u201d",
  },
  log: {
    ic: "pencil-line",
    placeholder:
      "Log a note \u2014 e.g. \u201cMet Priya 3pm \u2014 she\u2019s the new champion at Kairo\u201d",
  },
};
const MODE_ORDER = ["log", "do", "ask", "go"];
const MODE_EXAMPLES: Record<string, string[]> = {
  ask: [
    "Which accounts are cooling off?",
    "What needs my attention today?",
    "Show overdue invoices > 30 days",
  ],
  go: ["Acme Robotics", "Inbox", "Pulse"],
  do: [
    "Draft a follow-up for Sasha at Northwind",
    "Schedule a check-in with Kairo Health next week",
    "Create a renewal opportunity for Hartwell Ortho",
  ],
  log: [
    "Met Priya 3pm \u2014 she\u2019s the new champion at Kairo",
    "Call w/ Acme: VP Eng confirmed budget Q1",
    "Northwind signed MSA Thursday \u2014 kickoff next week",
  ],
};

interface OmnibarProps {
  view: ViewType;
  setView: (v: ViewType) => void;
  runQuery: (q: { kind: string; id?: string }) => void;
}

const Omnibar: React.FC<OmnibarProps> = ({ view, setView, runQuery }) => {
  const { fullName } = useAuth();

  const [val, setVal] = useState("");
  const [focused, setFocused] = useState(false);
  const [mode, setMode] = useState("log");
  const [toast, setToast] = useState<{
    title: string;
    sub: string;
    err?: boolean;
  } | null>(null);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (k === "escape" && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ── POST /intakes ────────────────────────────────────────────────────────
  const submit = async () => {
    if (!val.trim() && !attachedFile) return;
    setSending(true);

    try {
      const formData = new FormData();
      // sourceType = uppercase mode (LOG / DO / ASK / GO)
      formData.append("sourceType", mode.toUpperCase());
      // createdBy = fullName from login response
      formData.append("createdBy", fullName ?? "");
      // content = what was typed (if any)
      if (val.trim()) formData.append("content", val.trim());
      // file attachment (if any)
      if (attachedFile) formData.append("file", attachedFile);

      const res = await apiFetch(`${baseUrl()}/intakes`, {
        method: "POST",
        headers: authHeaders(), // no Content-Type — browser sets multipart boundary automatically
        body: formData,
      });

      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

      // success toast
      setToast({
        title:
          mode === "log" ? "Note logged" : `${mode.toUpperCase()} submitted`,
        sub: attachedFile
          ? `${val.trim() ? val.trim().slice(0, 40) + " · " : ""}${attachedFile.name}`
          : val.trim().slice(0, 60),
      });
      setTimeout(() => setToast(null), 3000);

      setVal("");
      setAttachedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      inputRef.current?.blur();
    } catch (err) {
      setToast({
        title: "Failed to submit",
        sub: (err as Error).message,
        err: true,
      });
      setTimeout(() => setToast(null), 4000);
    } finally {
      setSending(false);
    }
  };

  const modeHints: Record<string, string> = {
    log: "Capture any interaction",
    do: "AI takes action",
    ask: "Query your pipeline",
    go: "Navigate anywhere",
  };

  const canSend = (val.trim().length > 0 || !!attachedFile) && !sending;

  return (
    <>
      <style>{omnibarStyles}</style>
      <div className={"tb" + (sending ? " omni-sending" : "")}>
        <div className="tb-omni">
          <div
            className={"tb-omni-wrap" + (focused ? " focused" : "")}
            onClick={() => inputRef.current?.focus()}
          >
            <span className="tb-omni-ic">
              <Icon name={MODE_CONF[mode]?.ic || "pencil-line"} size={16} />
            </span>

            {attachedFile && (
              <div className="tb-omni-file-pill">
                <Icon name="paperclip" size={10} />
                <span>{attachedFile.name}</span>
                <span
                  style={{ cursor: "pointer", marginLeft: 2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setAttachedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                >
                  ×
                </span>
              </div>
            )}

            <input
              ref={inputRef}
              className="tb-omni-input"
              placeholder={MODE_CONF[mode]?.placeholder}
              value={val}
              onChange={(e) => setVal(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
              }}
            />

            {!focused && !val && <span className="tb-omni-kbd">⌘K</span>}

            {focused && (
              <button
                className="tb-omni-mode"
                onMouseDown={(e) => {
                  e.preventDefault();
                  const i = (MODE_ORDER.indexOf(mode) + 1) % MODE_ORDER.length;
                  setMode(MODE_ORDER[i]);
                }}
              >
                <Icon name={MODE_CONF[mode]?.ic} size={11} />
                {mode}
              </button>
            )}

            {/* Attach button — always clickable */}
            <div
              className={"tb-omni-attach" + (attachedFile ? " has-file" : "")}
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              title="Attach a file"
            >
              <Icon name="paperclip" size={14} />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files?.[0]) setAttachedFile(e.target.files[0]);
              }}
            />

            {/* Send button — enabled when text OR file present */}
            <button
              className="tb-omni-send"
              disabled={!canSend}
              onClick={(e) => {
                e.stopPropagation();
                submit();
              }}
              title="Send (↵)"
            >
              {sending ? (
                <Icon name="loader" size={14} />
              ) : (
                <Icon name="arrow-up" size={14} />
              )}
            </button>
          </div>

          {focused && (
            <div className="omni-dd">
              <div className="omni-dd-modes">
                {MODE_ORDER.map((m) => (
                  <button
                    key={m}
                    className={"omni-mode-pill" + (mode === m ? " on" : "")}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setMode(m);
                    }}
                  >
                    <Icon name={MODE_CONF[m].ic} size={12} />
                    {m}
                    <span className="omni-mode-pill-hint">{modeHints[m]}</span>
                  </button>
                ))}
              </div>
              <div className="omni-dd-scroll">
                <div className="omni-dd-sect">
                  <div className="omni-dd-lbl">
                    <Icon name="clock" size={11} /> Try these
                  </div>
                  {MODE_EXAMPLES[mode]?.map((ex, i) => (
                    <div
                      key={i}
                      className={"omni-dd-it" + (i === 0 ? " active" : "")}
                      onMouseDown={() => {
                        setVal(ex);
                        inputRef.current?.focus();
                      }}
                    >
                      <div className="omni-dd-ic">
                        <Icon name={MODE_CONF[mode].ic} size={13} />
                      </div>
                      {ex}
                      <span className="omni-dd-kind">{mode}</span>
                    </div>
                  ))}
                </div>
                <div className="omni-dd-sect">
                  <div className="omni-dd-lbl">
                    <Icon name="sparkles" size={11} /> Suggestions
                  </div>
                  {SUGGESTIONS.slice(0, 4).map((s, i) => (
                    <div
                      key={i}
                      className="omni-dd-it"
                      onMouseDown={() => {
                        setVal(s.label);
                        inputRef.current?.focus();
                      }}
                    >
                      <div className="omni-dd-ic">
                        <Icon
                          name={s.type === "action" ? "wand-2" : "search"}
                          size={13}
                        />
                      </div>
                      {s.label}
                      <span className="omni-dd-kind">{s.type}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="omni-dd-footer">
                <span className="legend">
                  <span
                    style={{
                      fontFamily: "DM Mono",
                      fontSize: 10,
                      background: "var(--bg4)",
                      padding: "1px 5px",
                      borderRadius: 3,
                    }}
                  >
                    ↵
                  </span>{" "}
                  send
                </span>
                <span className="legend">
                  <span
                    style={{
                      fontFamily: "DM Mono",
                      fontSize: 10,
                      background: "var(--bg4)",
                      padding: "1px 5px",
                      borderRadius: 3,
                    }}
                  >
                    Tab
                  </span>{" "}
                  cycle mode
                </span>
                <span className="legend">
                  <span
                    style={{
                      fontFamily: "DM Mono",
                      fontSize: 10,
                      background: "var(--bg4)",
                      padding: "1px 5px",
                      borderRadius: 3,
                    }}
                  >
                    Esc
                  </span>{" "}
                  close
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div className="omni-toast">
          <div className={"omni-toast-ic" + (toast.err ? " err" : "")}>
            <Icon name={toast.err ? "x" : "check"} size={12} color="#fff" />
          </div>
          <div className="omni-toast-body">
            <b>{toast.title}</b>
            <small>{toast.sub}</small>
          </div>
          <button
            className="btn xs ghost"
            onClick={() => setToast(null)}
            style={{ marginLeft: 8 }}
          >
            dismiss
          </button>
        </div>
      )}
    </>
  );
};

export default Omnibar;
