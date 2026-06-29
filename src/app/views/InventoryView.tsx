import { useState, useEffect, useRef } from "react";

const API = "";

interface Config {
  companyId: string;
  companyName: string;
  domain: string;
  brandColor: string;
  contextIcon: string;
  systemPrompt: string;
  welcomeMessage: string;
  opportunitySignals: string[];
  inventorySource: string;
  isLive: boolean;
  embedCode: string;
  chatUrl: string;
  inventoryApiUrl?: string;
}

interface InventoryItem {
  id: string;
  itemName: string;
  category: string;
  status: string;
  priceFrom: string;
  location: string;
  availability: string;
  featuredItem: boolean;
  tags: string[];
}

interface Toast {
  msg: string;
  type: "success" | "error" | "info";
}

interface FormState {
  domain: string;
  brandColor: string;
  systemPrompt: string;
  welcomeMessage: string;
  opportunitySignals: string;
  inventorySource: string;
}

async function callApi(
  method: string,
  path: string,
  body?: object | FormData,
  isForm = false,
): Promise<any> {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token") || "";

  const opts: RequestInit = {
    method,
    headers: { Authorization: `Bearer ${token}` } as Record<string, string>,
  };

  if (body && !isForm) {
    (opts.headers as Record<string, string>)["Content-Type"] =
      "application/json";
    opts.body = JSON.stringify(body);
  }
  if (isForm) opts.body = body as FormData;

  const res = await fetch(`${API}${path}`, opts);
  return res.json();
}

// ── Injected styles ───────────────────────────────────────────────────────────
const STYLES = `
.iv{flex:1;display:flex;flex-direction:column;overflow:hidden;height:100%;background:var(--bg);font-family:"Outfit",system-ui,sans-serif}
.iv-hd{padding:16px 24px 13px;border-bottom:0.5px solid var(--brd);background:var(--bg2);flex-shrink:0;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.iv-hd-left{}
.iv-eyebrow{font-size:9.5px;font-weight:700;letter-spacing:.11em;text-transform:uppercase;color:var(--p);margin-bottom:3px}
.iv-hd-title{font-size:16px;font-weight:650;letter-spacing:-.02em;color:var(--ink);line-height:1.2}
.iv-hd-sub{font-size:11.5px;color:var(--ink4);margin-top:2px}
.iv-hd-right{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.iv-body{flex:1;overflow-y:auto;padding:20px 24px 60px;background:var(--bg);scrollbar-width:thin;scrollbar-color:var(--brd2) transparent}
.iv-body::-webkit-scrollbar{width:4px}.iv-body::-webkit-scrollbar-thumb{background:var(--brd2);border-radius:4px}

.iv-status-card{background:var(--bg2);border:0.5px solid var(--brd);border-radius:var(--r-l);padding:14px 18px;display:flex;align-items:center;gap:12px;margin-bottom:18px;box-shadow:var(--sh-s)}
.iv-status-icon{width:38px;height:38px;border-radius:10px;background:var(--pp);color:var(--p);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0}
.iv-status-name{font-size:13.5px;font-weight:650;color:var(--ink);letter-spacing:-.01em}
.iv-status-sub{font-size:11px;color:var(--ink4);margin-top:1px}
.iv-status-note{font-size:11.5px;color:var(--ink4);flex:1;line-height:1.5}

.iv-pill{display:inline-flex;align-items:center;padding:2px 10px;border-radius:20px;font-size:10.5px;font-weight:650;letter-spacing:.01em}
.iv-pill-ok{background:var(--okb);color:var(--ok)}
.iv-pill-wa{background:var(--wab);color:var(--wa)}
.iv-pill-p{background:var(--pp);color:var(--p)}
.iv-pill-muted{background:var(--bg3);color:var(--ink4)}

.iv-btn-row{display:flex;gap:8px;margin-bottom:18px;flex-wrap:wrap}
.iv-btn-primary{padding:7px 16px;background:var(--p);color:#fff;border:none;border-radius:var(--r-m);cursor:pointer;font-size:12.5px;font-weight:600;font-family:inherit;transition:opacity .12s;letter-spacing:-.01em}
.iv-btn-primary:hover{opacity:.88}
.iv-btn-secondary{padding:7px 16px;background:var(--bg2);color:var(--ink3);border:0.5px solid var(--brd2);border-radius:var(--r-m);cursor:pointer;font-size:12.5px;font-weight:500;font-family:inherit;transition:background .12s}
.iv-btn-secondary:hover{background:var(--pu);color:var(--ink)}
.iv-btn-secondary:disabled{opacity:.5;cursor:default}
.iv-btn-ghost{padding:5px 12px;background:var(--pp);color:var(--p);border:none;border-radius:var(--r-s);cursor:pointer;font-size:11.5px;font-weight:600;font-family:inherit;transition:opacity .12s}
.iv-btn-ghost:hover{opacity:.8}

.iv-embed-bar{display:flex;align-items:center;gap:10px;background:var(--bg2);border:0.5px solid var(--brd);border-radius:var(--r-m);padding:9px 14px;margin-bottom:18px;flex-wrap:wrap}
.iv-embed-label{font-size:11px;font-weight:700;color:var(--ink4);white-space:nowrap;letter-spacing:.04em;text-transform:uppercase}
.iv-embed-code{font-family:"IBM Plex Mono",monospace;font-size:11.5px;color:var(--ink3);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

.iv-card{background:var(--bg2);border:0.5px solid var(--brd);border-radius:var(--r-l);overflow:hidden;margin-bottom:16px;box-shadow:var(--sh-s)}
.iv-card-hdr{padding:12px 18px;border-bottom:0.5px solid var(--brd);display:flex;align-items:center;gap:10px;background:var(--bg2)}
.iv-card-icon{width:26px;height:26px;border-radius:8px;background:var(--pp);color:var(--p);display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0}
.iv-card-title{font-size:12.5px;font-weight:650;color:var(--ink);letter-spacing:-.01em}
.iv-card-sub{font-size:11px;color:var(--ink4);margin-top:1px}

.iv-table{width:100%;border-collapse:collapse}
.iv-th{padding:8px 18px;font-size:9.5px;font-weight:700;color:var(--ink5);text-align:left;border-bottom:0.5px solid var(--brd);letter-spacing:.08em;text-transform:uppercase;background:var(--bg)}
.iv-td{padding:13px 18px;border-bottom:0.5px solid var(--brd)}
.iv-td-name{font-size:12.5px;font-weight:600;color:var(--ink);margin-bottom:2px;letter-spacing:-.01em}
.iv-td-desc{font-size:11.5px;color:var(--ink4);line-height:1.4}
.iv-td-detail{font-size:11.5px;color:var(--ink4);font-family:"IBM Plex Mono",monospace}
.iv-action-btn{padding:4px 12px;background:var(--bg2);border:0.5px solid var(--brd2);border-radius:var(--r-s);cursor:pointer;font-size:11.5px;color:var(--ink3);font-weight:500;font-family:inherit;transition:background .1s,color .1s}
.iv-action-btn:hover{background:var(--pp);color:var(--p);border-color:transparent}

.iv-overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;z-index:1000;backdrop-filter:blur(2px)}
.iv-modal{background:var(--bg2);border:0.5px solid var(--brd);border-radius:var(--r-xl);padding:24px 28px;width:560px;max-height:88vh;overflow-y:auto;box-shadow:var(--sh-l)}
.iv-modal-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
.iv-modal-title{font-size:15px;font-weight:700;color:var(--ink);letter-spacing:-.02em}
.iv-modal-close{background:none;border:none;font-size:18px;cursor:pointer;color:var(--ink4);line-height:1;padding:2px 6px;border-radius:6px;transition:background .1s}
.iv-modal-close:hover{background:var(--bg3);color:var(--ink)}
.iv-modal-ft{display:flex;justify-content:flex-end;gap:8px;margin-top:20px;padding-top:16px;border-top:0.5px solid var(--brd)}

.iv-readonly-row{display:flex;align-items:center;gap:10px;background:var(--bg);border:0.5px solid var(--brd);border-radius:var(--r-m);padding:9px 14px;margin-bottom:16px}
.iv-readonly-label{font-size:10.5px;font-weight:700;color:var(--ink5);width:66px;text-transform:uppercase;letter-spacing:.04em}
.iv-readonly-val{font-size:13px;font-weight:650;color:var(--ink);flex:1;letter-spacing:-.01em}
.iv-readonly-hint{font-size:10.5px;color:var(--ink5)}

.iv-grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.iv-field-lbl{display:block;font-size:11px;font-weight:600;color:var(--ink3);margin-bottom:5px;letter-spacing:.02em;text-transform:uppercase}
.iv-input{width:100%;padding:8px 11px;background:var(--bg);border:0.5px solid var(--brd2);border-radius:var(--r-m);font-size:13px;color:var(--ink);font-family:inherit;box-sizing:border-box;outline:none;transition:border-color .15s}
.iv-input:focus{border-color:var(--p);box-shadow:0 0 0 2px var(--pp)}
.iv-hint{font-size:11px;color:var(--ink5);margin-top:4px;margin-bottom:0;line-height:1.5}
.iv-color-picker{width:42px;height:34px;border:0.5px solid var(--brd2);border-radius:var(--r-s);cursor:pointer;padding:2px;background:var(--bg)}

.iv-toast{position:fixed;top:18px;right:18px;padding:10px 18px;border-radius:var(--r-m);border:0.5px solid;font-size:12.5px;font-weight:600;z-index:2000;box-shadow:var(--sh-m);font-family:inherit}
.iv-toast-ok{background:var(--okb);color:var(--ok);border-color:var(--ok)}
.iv-toast-err{background:var(--rib);color:var(--ri);border-color:var(--ri)}
.iv-toast-info{background:var(--pp);color:var(--p);border-color:var(--p)}

.iv-loading{flex:1;display:flex;align-items:center;justify-content:center;gap:10px;color:var(--ink4);font-size:13px}
.iv-loading-spin{width:20px;height:20px;border:2px solid var(--brd2);border-top-color:var(--p);border-radius:50%;animation:iv-spin .7s linear infinite}
@keyframes iv-spin{to{transform:rotate(360deg)}}
`;

// ─────────────────────────────────────────────────────────────────────────────
export default function InventoryConfig() {
  const [config, setConfig] = useState<Config | null>(null);
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [orgName, setOrgName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [importing, setImporting] = useState<boolean>(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [showPersona, setShowPersona] = useState<boolean>(false);
  const [showSync, setShowSync] = useState<boolean>(false);
  const [syncUrl, setSyncUrl] = useState<string>("");
  const [syncKey, setSyncKey] = useState<string>("");

  const [form, setForm] = useState<FormState>({
    domain: "rental",
    brandColor: "#6366f1",
    systemPrompt: "",
    welcomeMessage: "",
    opportunitySignals: "",
    inventorySource: "manual",
  });

  const csvRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll(): Promise<void> {
    setLoading(true);
    try {
      const orgRes = await callApi("GET", "/api/organization");
      if (orgRes?.orgName) setOrgName(orgRes.orgName as string);

      const [cfgRes, invRes] = await Promise.all([
        callApi("GET", "/api/chatbot/config"),
        callApi("GET", "/api/chatbot/inventory"),
      ]);

      if (cfgRes?.companyId) {
        const cfg = cfgRes as Config;
        setConfig(cfg);
        setForm({
          domain: cfg.domain || "rental",
          brandColor: cfg.brandColor || "#6366f1",
          systemPrompt: cfg.systemPrompt || "",
          welcomeMessage: cfg.welcomeMessage || "",
          opportunitySignals: (cfg.opportunitySignals || []).join(", "),
          inventorySource: cfg.inventorySource || "manual",
        });
        if (cfg.inventoryApiUrl) setSyncUrl(cfg.inventoryApiUrl);
      }

      if (invRes?.items) setItems(invRes.items as InventoryItem[]);
    } catch {
      showMsg("Error loading config", "error");
    }
    setLoading(false);
  }

  function showMsg(msg: string, type: Toast["type"] = "success"): void {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  async function savePersona(): Promise<void> {
    setSaving(true);
    try {
      const signals = form.opportunitySignals
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await callApi("POST", "/api/chatbot/config", {
        companyName: orgName,
        domain: form.domain,
        brandColor: form.brandColor,
        systemPrompt: form.systemPrompt,
        welcomeMessage: form.welcomeMessage,
        opportunitySignals: signals,
        inventorySource: form.inventorySource,
      });

      if (res?.success) {
        showMsg("Config saved successfully");
        setShowPersona(false);
        loadAll();
      } else {
        showMsg("Save failed. Try again.", "error");
      }
    } catch {
      showMsg("Error saving config", "error");
    }
    setSaving(false);
  }

  async function handleCsv(
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    setImporting(true);
    showMsg("Uploading and processing with AI…", "info");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await callApi(
        "POST",
        "/api/chatbot/inventory/import",
        fd,
        true,
      );
      if (res?.success) {
        showMsg(`Saved ${res.items_saved} items from CSV`);
        loadAll();
      } else {
        showMsg(res?.message || "Import failed", "error");
      }
    } catch {
      showMsg("Upload error. Is VAK Python running?", "error");
    }
    setImporting(false);
  }

  async function handleSync(): Promise<void> {
    if (!syncUrl.trim()) {
      showMsg("API URL is required", "error");
      return;
    }
    setSaving(true);
    try {
      const res = await callApi("POST", "/api/chatbot/config", {
        inventorySource: "api",
        inventoryApiUrl: syncUrl,
        inventoryApiKey: syncKey,
      });
      if (res?.success) {
        showMsg("External system connected");
        setShowSync(false);
        loadAll();
      } else {
        showMsg("Connection failed", "error");
      }
    } catch {
      showMsg("Error connecting", "error");
    }
    setSaving(false);
  }

  const featured = items.filter((i) => i.featuredItem);
  const hidden = items.filter((i) => i.status === "inactive");
  const source = config?.inventorySource || "manual";
  const chatUrl = config?.chatUrl || "";

  return (
    <div className="iv">
      <style>{STYLES}</style>

      {/* Toast */}
      {toast && (
        <div
          className={`iv-toast ${
            toast.type === "error"
              ? "iv-toast-err"
              : toast.type === "info"
                ? "iv-toast-info"
                : "iv-toast-ok"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="iv-hd">
        <div className="iv-hd-left">
          <div className="iv-eyebrow">Inventory-aware answers</div>
          <div className="iv-hd-title">Inventory config</div>
          <div className="iv-hd-sub">
            Control which inventory the assistant recommends and how unmatched
            demand is captured.
          </div>
        </div>
        <div className="iv-hd-right">
          <button
            className="iv-btn-secondary"
            onClick={() => setShowPersona(true)}
          >
            ✏️ Persona &amp; Prompt
          </button>
          <button
            className="iv-btn-secondary"
            onClick={() => setShowSync(true)}
          >
            Sync external system
          </button>
          <input
            ref={csvRef}
            type="file"
            accept=".csv,.txt,.tsv"
            style={{ display: "none" }}
            onChange={handleCsv}
          />
          <button
            className="iv-btn-secondary"
            onClick={() => csvRef.current?.click()}
            disabled={importing}
          >
            {importing ? "Processing…" : "Import CSV"}
          </button>
          <button
            className="iv-btn-primary"
            onClick={() => (window.location.href = "/app/inventory")}
          >
            Manage inventory
          </button>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────── */}
      {loading ? (
        <div className="iv-loading">
          <div className="iv-loading-spin" />
          Loading…
        </div>
      ) : (
        <div className="iv-body">

          {/* Status card */}
          <div className="iv-status-card">
            <div className="iv-status-icon">🏢</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="iv-status-name">
                {config ? orgName || config.companyName : "Not configured"}
              </div>
              <div className="iv-status-sub">
                {config
                  ? `${config.domain} · ${items.length} items`
                  : "— · 0 items"}
              </div>
            </div>
            <div className="iv-status-note" style={{ maxWidth: 280 }}>
              Featured units appear first. Hidden units are never shown in
              customer recommendations.
            </div>
            <span
              className={`iv-pill ${config ? "iv-pill-ok" : "iv-pill-wa"}`}
            >
              {config ? "Synced" : "Not set"}
            </span>
            {chatUrl && (
              <a
                href={chatUrl}
                target="_blank"
                rel="noreferrer"
                className="iv-btn-ghost"
                style={{ textDecoration: "none" }}
              >
                Test chat ↗
              </a>
            )}
          </div>

          {/* Embed bar */}
          {chatUrl && (
            <div className="iv-embed-bar">
              <span className="iv-embed-label">Chat URL</span>
              <code className="iv-embed-code">{chatUrl}</code>
              <button
                className="iv-btn-ghost"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `<script src="https://vak.ai/static/widget.js?company=${config?.companyId}"></script>`,
                  );
                  showMsg("Embed code copied");
                }}
              >
                Copy embed
              </button>
              <a
                href={chatUrl}
                target="_blank"
                rel="noreferrer"
                className="iv-btn-ghost"
                style={{ textDecoration: "none" }}
              >
                Open ↗
              </a>
            </div>
          )}

          {/* Recommendation controls card */}
          <div className="iv-card">
            <div className="iv-card-hdr">
              <div className="iv-card-icon">🎯</div>
              <div>
                <div className="iv-card-title">Recommendation controls</div>
                <div className="iv-card-sub">
                  Rules for surfacing, hiding, and logging inventory-related
                  demand.
                </div>
              </div>
            </div>

            <table className="iv-table">
              <thead>
                <tr>
                  {["Setting", "Status", "Detail", ""].map((h) => (
                    <th key={h} className="iv-th">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <IvRow
                  name="Active vertical"
                  desc={
                    config?.domain
                      ? `${config.domain} — units, rent, amenities, availability`
                      : "Not configured"
                  }
                  pillLabel={config ? "Active" : "Not set"}
                  pillClass={config ? "iv-pill-ok" : "iv-pill-wa"}
                  detail={config?.domain || "—"}
                  actionLabel="Change"
                  onAction={() => setShowPersona(true)}
                />

                <IvRow
                  name="Featured items"
                  desc={
                    featured.length > 0
                      ? `${featured.map((i) => i.itemName).join(", ")} pinned first`
                      : "No featured items set"
                  }
                  pillLabel={featured.length > 0 ? "Featured" : "None"}
                  pillClass={
                    featured.length > 0 ? "iv-pill-wa" : "iv-pill-muted"
                  }
                  detail={`${featured.length} items`}
                  actionLabel="Edit"
                  onAction={() => (window.location.href = "/app/inventory")}
                />

                <IvRow
                  name="Hidden items"
                  desc={
                    hidden.length > 0
                      ? hidden.map((i) => i.itemName).join(", ")
                      : "No items are currently hidden"
                  }
                  pillLabel={
                    hidden.length > 0 ? `${hidden.length} hidden` : "None"
                  }
                  pillClass="iv-pill-muted"
                  detail={`${hidden.length} items`}
                  actionLabel="Edit"
                  onAction={() => (window.location.href = "/app/inventory")}
                />

                <IvRow
                  name="Inventory source"
                  desc={
                    source === "api"
                      ? "Connected to external API — always real-time"
                      : source === "webhook"
                        ? "Webhook — company pushes updates"
                        : "Manual — admin manages in Inventory tab"
                  }
                  pillLabel={source}
                  pillClass={source === "api" ? "iv-pill-p" : "iv-pill-muted"}
                  detail={
                    source === "api" ? config?.inventoryApiUrl || "—" : "—"
                  }
                  actionLabel="Change"
                  onAction={() => setShowSync(true)}
                />
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Persona & Prompt Modal ──────────────────────────────────── */}
      {showPersona && (
        <IvModal title="Persona & Prompt" onClose={() => setShowPersona(false)}>
          <div className="iv-readonly-row">
            <span className="iv-readonly-label">Company</span>
            <span className="iv-readonly-val">{orgName || "Your Company"}</span>
            <span className="iv-readonly-hint">From organization settings</span>
          </div>

          <div className="iv-grid2">
            <IvField label="Domain / Vertical">
              <select
                className="iv-input"
                value={form.domain}
                onChange={(e) => setForm({ ...form, domain: e.target.value })}
              >
                <option value="rental">Rental / Real Estate</option>
                <option value="healthcare">Healthcare</option>
                <option value="pharmacy">Pharmacy</option>
                <option value="hotel">Hotel</option>
                <option value="legal">Legal</option>
                <option value="general">General</option>
              </select>
            </IvField>

            <IvField label="Brand Color">
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="color"
                  value={form.brandColor}
                  onChange={(e) =>
                    setForm({ ...form, brandColor: e.target.value })
                  }
                  className="iv-color-picker"
                />
                <input
                  className="iv-input"
                  style={{ flex: 1 }}
                  value={form.brandColor}
                  onChange={(e) =>
                    setForm({ ...form, brandColor: e.target.value })
                  }
                />
              </div>
            </IvField>

            <IvField label="Inventory Source">
              <select
                className="iv-input"
                value={form.inventorySource}
                onChange={(e) =>
                  setForm({ ...form, inventorySource: e.target.value })
                }
              >
                <option value="manual">Manual (admin manages items)</option>
                <option value="api">API (live from company system)</option>
                <option value="webhook">
                  Webhook (company pushes updates)
                </option>
              </select>
            </IvField>

            <IvField label="Welcome Message">
              <input
                className="iv-input"
                value={form.welcomeMessage}
                onChange={(e) =>
                  setForm({ ...form, welcomeMessage: e.target.value })
                }
                placeholder="Hi! I'm Vak 👋 How can I help?"
              />
            </IvField>

            <IvField label="System Prompt" full>
              <textarea
                className="iv-input"
                style={{ height: 88, resize: "vertical" }}
                value={form.systemPrompt}
                onChange={(e) =>
                  setForm({ ...form, systemPrompt: e.target.value })
                }
                placeholder={`You are Vak, the AI assistant for ${orgName || "[Company]"}. Help customers find the right option. Ask ONE question at a time.`}
              />
            </IvField>

            <IvField label="Opportunity Signals (comma separated)" full>
              <input
                className="iv-input"
                value={form.opportunitySignals}
                onChange={(e) =>
                  setForm({ ...form, opportunitySignals: e.target.value })
                }
                placeholder="book a viewing, I want to rent, schedule a visit"
              />
              <p className="iv-hint">
                These phrases trigger an opportunity in Zotra when a customer
                says them.
              </p>
            </IvField>
          </div>

          <div className="iv-modal-ft">
            <button
              className="iv-btn-secondary"
              onClick={() => setShowPersona(false)}
            >
              Cancel
            </button>
            <button
              className="iv-btn-primary"
              onClick={savePersona}
              disabled={saving}
            >
              {saving ? "Saving…" : "Save config"}
            </button>
          </div>
        </IvModal>
      )}

      {/* ── Sync External System Modal ──────────────────────────────── */}
      {showSync && (
        <IvModal
          title="Sync external system"
          onClose={() => setShowSync(false)}
        >
          <p
            style={{
              color: "var(--ink4)",
              fontSize: 13,
              marginBottom: 18,
              lineHeight: 1.6,
            }}
          >
            Connect your booking system API. VAK will call it on every chat
            message for real-time inventory — no CSV upload needed.
          </p>

          <IvField label="Your API URL">
            <input
              className="iv-input"
              value={syncUrl}
              onChange={(e) => setSyncUrl(e.target.value)}
              placeholder="https://your-system.com/api/inventory"
            />
            <p className="iv-hint">
              VAK calls this on every message to get live inventory.
            </p>
          </IvField>

          <div style={{ marginTop: 14 }}>
            <IvField label="API Key (optional)">
              <input
                className="iv-input"
                value={syncKey}
                onChange={(e) => setSyncKey(e.target.value)}
                placeholder="Bearer your-secret-key"
              />
              <p className="iv-hint">Leave empty if your API is public.</p>
            </IvField>
          </div>

          <div className="iv-modal-ft">
            <button
              className="iv-btn-secondary"
              onClick={() => setShowSync(false)}
            >
              Cancel
            </button>
            <button
              className="iv-btn-primary"
              onClick={handleSync}
              disabled={saving}
            >
              {saving ? "Connecting…" : "Connect system"}
            </button>
          </div>
        </IvModal>
      )}
    </div>
  );
}

// ── Row component ─────────────────────────────────────────────────────────────
interface IvRowProps {
  name: string;
  desc: string;
  pillLabel: string;
  pillClass: string;
  detail: string;
  actionLabel: string;
  onAction: () => void;
}

function IvRow({
  name,
  desc,
  pillLabel,
  pillClass,
  detail,
  actionLabel,
  onAction,
}: IvRowProps) {
  return (
    <tr>
      <td className="iv-td">
        <div className="iv-td-name">{name}</div>
        <div className="iv-td-desc">{desc}</div>
      </td>
      <td className="iv-td">
        <span className={`iv-pill ${pillClass}`}>{pillLabel}</span>
      </td>
      <td className="iv-td">
        <span className="iv-td-detail">{detail}</span>
      </td>
      <td className="iv-td">
        <button className="iv-action-btn" onClick={onAction}>
          {actionLabel}
        </button>
      </td>
    </tr>
  );
}

// ── Modal component ───────────────────────────────────────────────────────────
interface IvModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

function IvModal({ title, onClose, children }: IvModalProps) {
  return (
    <div className="iv-overlay">
      <div className="iv-modal">
        <div className="iv-modal-hd">
          <span className="iv-modal-title">{title}</span>
          <button onClick={onClose} className="iv-modal-close">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Field component ───────────────────────────────────────────────────────────
interface IvFieldProps {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}

function IvField({ label, children, full }: IvFieldProps) {
  return (
    <div style={{ gridColumn: full ? "1/-1" : "auto" }}>
      <label className="iv-field-lbl">{label}</label>
      {children}
    </div>
  );
}