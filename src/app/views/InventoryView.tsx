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
      // Load org name — adjust endpoint to match your existing org endpoint
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

  // ── Save persona & prompt ─────────────────────────────────────────────────
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
        showMsg("✅ Config saved successfully!");
        setShowPersona(false);
        loadAll();
      } else {
        showMsg("❌ Save failed. Try again.", "error");
      }
    } catch {
      showMsg("❌ Error saving config", "error");
    }
    setSaving(false);
  }

  // ── Import CSV ────────────────────────────────────────────────────────────
  async function handleCsv(
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    setImporting(true);
    showMsg("⏳ Uploading and processing with AI...", "info");
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
        showMsg(`✅ Saved ${res.items_saved} items from CSV!`);
        loadAll();
      } else {
        showMsg(`❌ ${res?.message || "Import failed"}`, "error");
      }
    } catch {
      showMsg("❌ Upload error. Is VAK Python running?", "error");
    }
    setImporting(false);
  }

  // ── Sync external system ──────────────────────────────────────────────────
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
        showMsg("✅ External system connected!");
        setShowSync(false);
        loadAll();
      } else {
        showMsg("❌ Connection failed", "error");
      }
    } catch {
      showMsg("❌ Error connecting", "error");
    }
    setSaving(false);
  }

  const featured = items.filter((i) => i.featuredItem);
  const hidden = items.filter((i) => i.status === "inactive");
  const source = config?.inventorySource || "manual";
  const chatUrl = config?.chatUrl || "";

  if (loading)
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#6b7280" }}>
        Loading...
      </div>
    );

  return (
    <div style={S.page}>
      {/* Toast */}
      {toast && (
        <div
          style={{
            ...S.toast,
            background:
              toast.type === "error"
                ? "#fef2f2"
                : toast.type === "info"
                  ? "#eff6ff"
                  : "#f0fdf4",
            color:
              toast.type === "error"
                ? "#dc2626"
                : toast.type === "info"
                  ? "#1d4ed8"
                  : "#15803d",
            borderColor:
              toast.type === "error"
                ? "#fca5a5"
                : toast.type === "info"
                  ? "#93c5fd"
                  : "#86efac",
          }}
        >
          {toast.msg}
        </div>
      )}

      {/* ── Page header ─────────────────────────────────────────────── */}
      <div style={S.headerRow}>
        <div>
          <div style={S.eyebrow}>INVENTORY-AWARE ANSWERS</div>
          <h2 style={S.pageTitle}>Inventory config</h2>
          <p style={S.pageSub}>
            Control which inventory the assistant can recommend and how
            unmatched demand is captured for your team.
          </p>
        </div>

        {/* Status card */}
        <div style={S.statusCard}>
          <div style={S.statusTop}>
            <div style={S.statusIcon}>🏢</div>
            <div style={{ flex: 1 }}>
              <div style={S.statusName}>
                {config ? orgName || config.companyName : "Not configured"}
              </div>
              <div style={S.statusSub}>
                {config
                  ? `${config.domain} · ${items.length} items`
                  : "— · 0 items"}
              </div>
            </div>
            <span
              style={{
                ...S.badge,
                background: config ? "#d1fae5" : "#fef3c7",
                color: config ? "#065f46" : "#92400e",
              }}
            >
              {config ? "Synced" : "Not set"}
            </span>
          </div>

          <p style={S.statusNote}>
            Featured units appear first. Hidden units are never shown in
            customer recommendations.
          </p>

          {/* Test chat — only when configured */}
          {chatUrl && (
            <a
              href={chatUrl}
              target="_blank"
              rel="noreferrer"
              style={S.testChatLink}
            >
              🧪 Test chat →
            </a>
          )}
        </div>
      </div>

      {/* ── Action buttons ──────────────────────────────────────────── */}
      <div style={S.btnRow}>
        <button
          style={S.btnPrimary}
          onClick={() => (window.location.href = "/app/inventory")}
        >
          Manage inventory
        </button>

        {/* Hidden file input */}
        <input
          ref={csvRef}
          type="file"
          accept=".csv,.txt,.tsv"
          style={{ display: "none" }}
          onChange={handleCsv}
        />
        <button
          style={S.btnSecondary}
          onClick={() => csvRef.current?.click()}
          disabled={importing}
        >
          {importing ? "⏳ Processing..." : "Import CSV"}
        </button>

        <button style={S.btnSecondary} onClick={() => setShowSync(true)}>
          Sync external system
        </button>

        <button style={S.btnSecondary} onClick={() => setShowPersona(true)}>
          ✏️ Persona & Prompt
        </button>
      </div>

      {/* Embed + Test chat row */}
      {chatUrl && (
        <div style={S.embedRow}>
          <span style={S.embedLabel}>Chat URL:</span>
          <code style={S.embedCode}>{chatUrl}</code>
          <button
            style={S.copyBtn}
            onClick={() => {
              navigator.clipboard.writeText(
                `<script src="https://vak.ai/static/widget.js?company=${config?.companyId}"></script>`,
              );
              showMsg("Embed code copied!");
            }}
          >
            Copy embed
          </button>
          <a href={chatUrl} target="_blank" rel="noreferrer" style={S.testBtn}>
            Test chat ↗
          </a>
        </div>
      )}

      {/* ── Recommendation controls ─────────────────────────────────── */}
      <div style={S.card}>
        <div style={S.cardHead}>
          <span style={{ fontSize: 22 }}>🎯</span>
          <div>
            <div style={S.cardTitle}>Recommendation controls</div>
            <div style={S.cardSub}>
              Simple rules for surfacing, hiding, and logging inventory-related
              demand.
            </div>
          </div>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#fafafa" }}>
              {["SETTING", "STATUS", "DETAIL", ""].map((h) => (
                <th key={h} style={S.th}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <Row
              name="Active vertical"
              desc={
                config?.domain
                  ? `${config.domain} — units, rent, amenities, availability`
                  : "Not configured"
              }
              pill={config ? "Active" : "Not set"}
              pillBg={config ? "#d1fae5" : "#fef3c7"}
              pillColor={config ? "#065f46" : "#92400e"}
              detail={config?.domain || "—"}
              actionLabel="Change"
              onAction={() => setShowPersona(true)}
            />

            <Row
              name="Featured items"
              desc={
                featured.length > 0
                  ? `${featured.map((i) => i.itemName).join(", ")} pinned first`
                  : "No featured items set"
              }
              pill={featured.length > 0 ? "Featured" : "None"}
              pillBg={featured.length > 0 ? "#fef3c7" : "#f3f4f6"}
              pillColor={featured.length > 0 ? "#92400e" : "#6b7280"}
              detail={`${featured.length} items`}
              actionLabel="Edit"
              onAction={() => (window.location.href = "/app/inventory")}
            />

            <Row
              name="Hidden items"
              desc={
                hidden.length > 0
                  ? hidden.map((i) => i.itemName).join(", ")
                  : "No items are currently hidden"
              }
              pill={hidden.length > 0 ? `${hidden.length} hidden` : "None"}
              pillBg="#f3f4f6"
              pillColor="#6b7280"
              detail={`${hidden.length} items`}
              actionLabel="Edit"
              onAction={() => (window.location.href = "/app/inventory")}
            />

            <Row
              name="Inventory source"
              desc={
                source === "api"
                  ? "Connected to external API — always real-time"
                  : source === "webhook"
                    ? "Webhook — company pushes updates"
                    : "Manual — admin manages in Inventory tab"
              }
              pill={source}
              pillBg={source === "api" ? "#eff6ff" : "#f3f4f6"}
              pillColor={source === "api" ? "#1d4ed8" : "#6b7280"}
              detail={source === "api" ? config?.inventoryApiUrl || "—" : "—"}
              actionLabel="Change"
              onAction={() => setShowSync(true)}
            />
          </tbody>
        </table>
      </div>

      {/* ── Persona & Prompt Modal ──────────────────────────────────── */}
      {showPersona && (
        <Modal title="Persona & Prompt" onClose={() => setShowPersona(false)}>
          {/* Company name — read only */}
          <div style={S.readOnlyRow}>
            <span style={S.readOnlyLabel}>Company</span>
            <span style={S.readOnlyValue}>{orgName || "Your Company"}</span>
            <span style={S.readOnlyHint}>From your organization settings</span>
          </div>

          <div style={S.grid2}>
            <Field label="Domain / Vertical">
              <select
                style={S.input}
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
            </Field>

            <Field label="Brand Color">
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="color"
                  value={form.brandColor}
                  onChange={(e) =>
                    setForm({ ...form, brandColor: e.target.value })
                  }
                  style={S.colorPicker}
                />
                <input
                  style={{ ...S.input, flex: 1 }}
                  value={form.brandColor}
                  onChange={(e) =>
                    setForm({ ...form, brandColor: e.target.value })
                  }
                />
              </div>
            </Field>

            <Field label="Inventory Source">
              <select
                style={S.input}
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
            </Field>

            <Field label="Welcome Message">
              <input
                style={S.input}
                value={form.welcomeMessage}
                onChange={(e) =>
                  setForm({ ...form, welcomeMessage: e.target.value })
                }
                placeholder="Hi! I'm Vak 👋 How can I help?"
              />
            </Field>

            <Field label="System Prompt" full>
              <textarea
                style={{ ...S.input, height: 90, resize: "vertical" }}
                value={form.systemPrompt}
                onChange={(e) =>
                  setForm({ ...form, systemPrompt: e.target.value })
                }
                placeholder={`You are Vak, the AI assistant for ${orgName || "[Company]"}. Help customers find the right option. Ask ONE question at a time.`}
              />
            </Field>

            <Field label="Opportunity Signals (comma separated)" full>
              <input
                style={S.input}
                value={form.opportunitySignals}
                onChange={(e) =>
                  setForm({ ...form, opportunitySignals: e.target.value })
                }
                placeholder="book a viewing, I want to rent, schedule a visit"
              />
              <p style={S.hint}>
                These phrases trigger an opportunity in Zotra when a customer
                says them.
              </p>
            </Field>
          </div>

          <div style={S.modalFoot}>
            <button
              style={S.btnSecondary}
              onClick={() => setShowPersona(false)}
            >
              Cancel
            </button>
            <button
              style={S.btnPrimary}
              onClick={savePersona}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Config"}
            </button>
          </div>
        </Modal>
      )}

      {/* ── Sync External System Modal ──────────────────────────────── */}
      {showSync && (
        <Modal title="Sync External System" onClose={() => setShowSync(false)}>
          <p
            style={{
              color: "#6b7280",
              fontSize: 14,
              marginBottom: 20,
              lineHeight: 1.6,
            }}
          >
            Connect your booking system API. VAK will call it on every chat
            message for real-time inventory — no CSV upload needed.
          </p>

          <Field label="Your API URL">
            <input
              style={S.input}
              value={syncUrl}
              onChange={(e) => setSyncUrl(e.target.value)}
              placeholder="https://your-system.com/api/inventory"
            />
            <p style={S.hint}>
              VAK calls this on every message to get live inventory.
            </p>
          </Field>

          <Field label="API Key (optional)">
            <input
              style={{ ...S.input, marginTop: 12 }}
              value={syncKey}
              onChange={(e) => setSyncKey(e.target.value)}
              placeholder="Bearer your-secret-key"
            />
            <p style={S.hint}>Leave empty if your API is public.</p>
          </Field>

          <div style={{ ...S.modalFoot, marginTop: 24 }}>
            <button style={S.btnSecondary} onClick={() => setShowSync(false)}>
              Cancel
            </button>
            <button style={S.btnPrimary} onClick={handleSync} disabled={saving}>
              {saving ? "Connecting..." : "Connect System"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Row component ─────────────────────────────────────────────────────────────
interface RowProps {
  name: string;
  desc: string;
  pill: string;
  pillBg: string;
  pillColor: string;
  detail: string;
  actionLabel: string;
  onAction: () => void;
}

function Row({
  name,
  desc,
  pill,
  pillBg,
  pillColor,
  detail,
  actionLabel,
  onAction,
}: RowProps) {
  return (
    <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
      <td style={S.td}>
        <div style={{ fontWeight: 600, color: "#111827", marginBottom: 2 }}>
          {name}
        </div>
        <div style={{ fontSize: 13, color: "#6b7280" }}>{desc}</div>
      </td>
      <td style={S.td}>
        <span
          style={{
            padding: "3px 12px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 700,
            background: pillBg,
            color: pillColor,
          }}
        >
          {pill}
        </span>
      </td>
      <td style={{ ...S.td, color: "#9ca3af", fontSize: 13 }}>{detail}</td>
      <td style={S.td}>
        <button style={S.actionBtn} onClick={onAction}>
          {actionLabel}
        </button>
      </td>
    </tr>
  );
}

// ── Modal component ───────────────────────────────────────────────────────────
interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ title, onClose, children }: ModalProps) {
  return (
    <div style={S.overlay}>
      <div style={S.modal}>
        <div style={S.modalHead}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{title}</h3>
          <button onClick={onClose} style={S.closeBtn}>
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Field component ───────────────────────────────────────────────────────────
interface FieldProps {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}

function Field({ label, children, full }: FieldProps) {
  return (
    <div style={{ gridColumn: full ? "1/-1" : "auto" }}>
      <label style={S.fieldLbl}>{label}</label>
      {children}
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const S: Record<string, React.CSSProperties> = {
  page: {
    padding: "28px 32px",
    maxWidth: 1100,
    fontFamily: "Inter,system-ui,Arial,sans-serif",
  },
  toast: {
    position: "fixed",
    top: 20,
    right: 20,
    padding: "12px 20px",
    borderRadius: 10,
    border: "1px solid",
    fontSize: 14,
    fontWeight: 600,
    zIndex: 2000,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: 700,
    color: "#6366f1",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: 800,
    color: "#111827",
    margin: "4px 0 8px",
  },
  pageSub: { fontSize: 14, color: "#6b7280", maxWidth: 560, lineHeight: 1.6 },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 24,
    marginBottom: 24,
    flexWrap: "wrap",
  },
  statusCard: {
    background: "#fafafa",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: "16px 20px",
    minWidth: 280,
    maxWidth: 360,
  },
  statusTop: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  statusIcon: {
    fontSize: 28,
    background: "#ede9fe",
    borderRadius: 10,
    padding: "6px 10px",
    lineHeight: 1,
  },
  statusName: { fontWeight: 700, fontSize: 15, color: "#111827" },
  statusSub: { fontSize: 12, color: "#6b7280", marginTop: 2 },
  badge: {
    padding: "3px 12px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 700,
  },
  statusNote: {
    fontSize: 12,
    color: "#6b7280",
    margin: "0 0 12px",
    lineHeight: 1.5,
  },
  testChatLink: {
    display: "inline-block",
    fontSize: 13,
    color: "#6366f1",
    fontWeight: 700,
    textDecoration: "none",
    padding: "6px 14px",
    background: "#eff6ff",
    borderRadius: 8,
  },
  btnRow: { display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" },
  btnPrimary: {
    padding: "9px 20px",
    background: "#6366f1",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
  },
  btnSecondary: {
    padding: "9px 20px",
    background: "#fff",
    color: "#374151",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
  },
  embedRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: "10px 16px",
    marginBottom: 20,
    flexWrap: "wrap",
  },
  embedLabel: {
    fontSize: 13,
    color: "#6b7280",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  embedCode: {
    fontSize: 12,
    color: "#374151",
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  copyBtn: {
    padding: "5px 14px",
    background: "#ede9fe",
    color: "#6366f1",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
  },
  testBtn: {
    padding: "5px 14px",
    background: "#d1fae5",
    color: "#065f46",
    borderRadius: 6,
    textDecoration: "none",
    fontSize: 13,
    fontWeight: 600,
  },
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
  },
  cardHead: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "16px 20px",
    borderBottom: "1px solid #e5e7eb",
    background: "#fafafa",
  },
  cardTitle: { fontWeight: 700, fontSize: 15, color: "#111827" },
  cardSub: { fontSize: 13, color: "#6b7280", marginTop: 2 },
  th: {
    padding: "10px 20px",
    fontSize: 11,
    fontWeight: 700,
    color: "#9ca3af",
    textAlign: "left",
    borderBottom: "1px solid #e5e7eb",
  },
  td: { padding: "16px 20px" },
  actionBtn: {
    padding: "5px 14px",
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
    color: "#374151",
    fontWeight: 500,
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    borderRadius: 14,
    padding: "28px 32px",
    width: 580,
    maxHeight: "88vh",
    overflowY: "auto",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
  },
  modalHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalFoot: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 20,
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: 20,
    cursor: "pointer",
    color: "#9ca3af",
    lineHeight: 1,
  },
  readOnlyRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: "10px 16px",
    marginBottom: 20,
  },
  readOnlyLabel: { fontSize: 12, fontWeight: 700, color: "#6b7280", width: 70 },
  readOnlyValue: { fontSize: 15, fontWeight: 700, color: "#111827", flex: 1 },
  readOnlyHint: { fontSize: 12, color: "#9ca3af" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  fieldLbl: {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    padding: "9px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    fontSize: 14,
    boxSizing: "border-box",
    outline: "none",
    fontFamily: "inherit",
  },
  colorPicker: {
    width: 48,
    height: 38,
    border: "1px solid #d1d5db",
    borderRadius: 6,
    cursor: "pointer",
    padding: 2,
  },
  hint: { fontSize: 12, color: "#9ca3af", marginTop: 5, marginBottom: 0 },
};
