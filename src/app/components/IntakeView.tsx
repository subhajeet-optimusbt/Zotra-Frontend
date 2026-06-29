import React, { useState, useEffect, useCallback, useRef } from "react";
import Icon from "./Icon";
import { baseUrl,apiFetch } from "../utils/utils";
import { useAuth } from "../../context/AuthContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface IntakeItem {
  partitionKey?: string;
  rowKey?: string;
  id?: string;
  sourceType: string;
  integrationConnectionId?: string;
  provider: string | null;
  providerId?: string;
  integrationAccountId?: string;
  providerAccount?: string | null;
  content: string;
  title: string;
  summary: string;
  contentBlobUrl: string;
  mailBlobUrl: string | null;
  fileUrl?: string | null;
  accountId: string | null;
  accountName?: string | null;
  opportunityId: string | null;
  opportunityName?: string | null;
  commercialIntent: boolean;
  confidence: number;
  processingStatus: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  receivedAt?: string;
  attachments?: { name: string; url: string }[];
  _contentType?: "email" | "calendar" | "upload" | "log";
  _subject?: string;
  _sender?: string;
}

type SortKey = "newest" | "oldest" | "commercial" | "confidence";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getToken(): string | null {
  return localStorage.getItem("zotra_token");
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d === 1) return "Yesterday";
  return `${d}d ago`;
}

function parseContent(content: string): {
  _contentType: "email" | "calendar" | "upload" | "log";
  _subject: string;
  _sender: string;
} {
  if (content.startsWith("[Calendar]")) {
    const body = content.replace("[Calendar]", "").trim();
    const parts = body.split(" | ");
    return {
      _contentType: "calendar",
      _subject: parts[0]?.trim() ?? body,
      _sender: parts[parts.length - 1]?.replace(/^by\s+/, "").trim() ?? "",
    };
  }
  if (content.startsWith("[inbound]")) {
    const body = content.replace("[inbound]", "").trim();
    const fromIdx = body.indexOf(" — from ");
    const subject = fromIdx > -1 ? body.slice(0, fromIdx).trim() : body;
    const senderRaw = fromIdx > -1 ? body.slice(fromIdx + 8).trim() : "";
    const emailMatch = senderRaw.match(/<([^>]+)>/);
    const sender = emailMatch ? emailMatch[1] : senderRaw;
    return { _contentType: "email", _subject: subject, _sender: sender };
  }
  if (content.startsWith("[upload]")) {
    return {
      _contentType: "upload",
      _subject: content.replace("[upload]", "").trim(),
      _sender: "",
    };
  }
  return { _contentType: "log", _subject: content, _sender: "" };
}

function blobFilename(path: string): string {
  if (!path) return "";
  const parts = path.split("/");
  return parts[parts.length - 1] ?? path;
}

// ─── Normalise processingStatus to lowercase for consistent lookup ────────────

function toLabel(s: string): string {
  if (!s) return "Unknown";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function normalise(raw: IntakeItem): IntakeItem {
  const intakeId = raw.rowKey ?? raw.id ?? raw.partitionKey ?? "";
  const parsed = parseContent(raw.content ?? "");
  const fileUrl = raw.fileUrl?.trim() ?? "";
  return {
    ...raw,
    id: intakeId,
    providerAccount: raw.providerAccount ?? raw.integrationAccountId ?? null,
    receivedAt: raw.createdAt ? timeAgo(raw.createdAt) : "—",
    attachments:
      raw.attachments ??
      (fileUrl ? [{ name: blobFilename(fileUrl), url: fileUrl }] : []),
    accountId: raw.accountId?.trim() || null,
    opportunityId: raw.opportunityId?.trim() || null,
    ...parsed,
    _subject: raw.title?.trim() || parsed._subject,
    // ✅ Normalise to lowercase so STATUS_META lookups always work
    processingStatus: (raw.processingStatus ?? "").toLowerCase().trim(),
  };
}

// ─── Status / source maps ─────────────────────────────────────────────────────

const STATUS_META: Record<string, { label: string; cls: string; dot: string }> =
  {
    processed: { label: "Processed", cls: "ok", dot: "#1d9e75" },
    new: { label: "New", cls: "br", dot: "#4B48C8" },
    processing: { label: "Processing", cls: "wa", dot: "#c17b2a" },
    ignored: { label: "Ignored", cls: "mu", dot: "#8b8fa8" },
    failed: { label: "Failed", cls: "ri", dot: "#d94040" },
  };

// ✅ Dynamic fallback for any status not in STATUS_META (e.g. "hold", "newa", future values)
function getStatusMeta(status: string): {
  label: string;
  cls: string;
  dot: string;
} {
  return (
    STATUS_META[status] ?? {
      label: toLabel(status),
      cls: "mu",
      dot: "#8b8fa8",
    }
  );
}

const PROVIDER_LABEL: Record<string, string> = {
  gmail: "Gmail",
  outlook: "Outlook",
  google: "Google",
};

function getSourceIcon(item: IntakeItem): string {
  if (item._contentType === "calendar") return "calendar";
  if (item._contentType === "upload") return "upload";
  if (item._contentType === "log") return "pencil-line";
  return "mail";
}

function getProviderDisplay(item: IntakeItem): string {
  if (!item.provider) return "";
  const label = PROVIDER_LABEL[item.provider] ?? item.provider;
  if (item._contentType === "calendar") return `${label} Calendar`;
  return label;
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const SkeletonRow = () => (
  <div
    style={{
      padding: "12px 16px",
      marginBottom: 6,
      borderRadius: 10,
      background: "var(--bg2)",
      border: "0.5px solid var(--brd)",
    }}
  >
    <div
      style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 8,
          background: "var(--bg3)",
          animation: "sk-pulse 1.4s ease-in-out infinite",
          flexShrink: 0,
        }}
      />
      <div
        style={{
          flex: 1,
          height: 9,
          borderRadius: 4,
          background: "var(--bg3)",
          animation: "sk-pulse 1.4s ease-in-out infinite",
        }}
      />
      <div
        style={{
          width: 32,
          height: 9,
          borderRadius: 4,
          background: "var(--bg3)",
          animation: "sk-pulse 1.4s ease-in-out infinite",
          flexShrink: 0,
        }}
      />
    </div>
    <div
      style={{
        height: 10,
        borderRadius: 4,
        background: "var(--bg3)",
        marginBottom: 5,
        animation: "sk-pulse 1.4s ease-in-out infinite",
      }}
    />
    <div
      style={{
        height: 10,
        borderRadius: 4,
        background: "var(--bg3)",
        width: "65%",
        marginBottom: 8,
        animation: "sk-pulse 1.4s ease-in-out infinite",
      }}
    />
    <div style={{ display: "flex", gap: 5 }}>
      <div
        style={{
          width: 44,
          height: 17,
          borderRadius: 5,
          background: "var(--bg3)",
          animation: "sk-pulse 1.4s ease-in-out infinite",
        }}
      />
      <div
        style={{
          width: 80,
          height: 17,
          borderRadius: 5,
          background: "var(--bg3)",
          animation: "sk-pulse 1.4s ease-in-out infinite",
        }}
      />
    </div>
  </div>
);

const SkeletonDetail = () => (
  <div
    style={{
      flex: 1,
      overflowY: "auto",
      padding: "20px 24px",
      background: "var(--bg)",
    }}
  >
    <div
      style={{
        maxWidth: 680,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {[100, 130, 180, 110].map((h, i) => (
        <div
          key={i}
          style={{
            background: "var(--bg2)",
            border: "0.5px solid var(--brd)",
            borderRadius: 12,
            padding: "16px",
            height: h,
            animation: "sk-pulse 1.4s ease-in-out infinite",
          }}
        />
      ))}
    </div>
  </div>
);

// ─── Confidence Bar ───────────────────────────────────────────────────────────

const ConfidenceBar: React.FC<{ value: number }> = ({ value }) => {
  const pct = Math.round(value);
  const color =
    pct >= 75
      ? "var(--ok)"
      : pct >= 50
        ? "var(--wa)"
        : pct > 0
          ? "var(--ri)"
          : "var(--brd3)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span
          style={{
            fontFamily: "Sora,sans-serif",
            fontSize: 20,
            fontWeight: 700,
            color: pct === 0 ? "var(--ink4)" : "var(--ink)",
            lineHeight: 1,
          }}
        >
          {pct}%
        </span>
        {pct === 0 && (
          <span
            style={{
              fontSize: 10,
              color: "var(--ink5)",
              fontFamily: "DM Mono",
            }}
          >
            pending
          </span>
        )}
      </div>
      <div
        style={{
          height: 3,
          borderRadius: 3,
          background: "var(--bg4,var(--bg3))",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 3,
            width: pct === 0 ? "100%" : `${pct}%`,
            background:
              pct === 0
                ? "repeating-linear-gradient(90deg, var(--brd2) 0px, var(--brd2) 4px, transparent 4px, transparent 8px)"
                : color,
            transition: "width .5s ease",
          }}
        />
      </div>
    </div>
  );
};

// ─── Empty State ──────────────────────────────────────────────────────────────

const SummaryEmpty: React.FC<{ contentType: string }> = ({ contentType }) => {
  const msgs: Record<string, { icon: string; title: string; sub: string }> = {
    calendar: {
      icon: "📅",
      title: "Calendar event",
      sub: "This is a calendar notification — AI summarisation is not applied to event items.",
    },
    email: {
      icon: "🔄",
      title: "Processing queued",
      sub: "The AI agent hasn't summarised this item yet. It will appear here once processing completes.",
    },
    upload: {
      icon: "📄",
      title: "File upload",
      sub: "Summary will be generated after the document is processed by the AI pipeline.",
    },
    log: {
      icon: "📝",
      title: "Manual log",
      sub: "No automated summary for manually logged items.",
    },
  };
  const m = msgs[contentType] ?? msgs.email;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "4px 0",
      }}
    >
      <span
        style={{ fontSize: 20, flexShrink: 0, lineHeight: 1, marginTop: 2 }}
      >
        {m.icon}
      </span>
      <div>
        <div
          style={{
            fontSize: 12.5,
            fontWeight: 600,
            color: "var(--ink3)",
            marginBottom: 3,
          }}
        >
          {m.title}
        </div>
        <div style={{ fontSize: 12, color: "var(--ink5)", lineHeight: 1.6 }}>
          {m.sub}
        </div>
      </div>
    </div>
  );
};

// ─── Classification Panel ─────────────────────────────────────────────────────
const ClassificationPanel: React.FC<{ item: IntakeItem }> = ({ item }) => {
  const isPending = !item.commercialIntent && item.confidence === 0;
  const pct = Math.round(item.confidence);
  if (isPending) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 10px",
          borderRadius: 8,
          background: "var(--bg3)",
          border: "0.5px solid var(--brd)",
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--wa)",
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: 11.5, color: "var(--ink4)" }}>
          Classification pending — AI pipeline processing
        </span>
      </div>
    );
  }
  const confColor =
    pct >= 75 ? "var(--ok)" : pct >= 50 ? "var(--wa)" : "var(--ri)";
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <div
        style={{
          flex: 1,
          padding: "10px 12px",
          borderRadius: 9,
          background: item.commercialIntent
            ? "color-mix(in srgb,var(--ok) 8%,transparent)"
            : "var(--bg3)",
          border: `0.5px solid ${item.commercialIntent ? "color-mix(in srgb,var(--ok) 22%,transparent)" : "var(--brd)"}`,
        }}
      >
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.09em",
            textTransform: "uppercase",
            color: "var(--ink5)",
            marginBottom: 6,
          }}
        >
          Intent
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: item.commercialIntent ? "var(--ok)" : "var(--ink4)",
              flexShrink: 0,
              boxShadow: item.commercialIntent
                ? "0 0 0 2px color-mix(in srgb,var(--ok) 20%,transparent)"
                : "none",
            }}
          />
          <span
            style={{
              fontFamily: "Sora,sans-serif",
              fontSize: 17,
              fontWeight: 700,
              color: item.commercialIntent ? "var(--ok)" : "var(--ink3)",
            }}
          >
            {item.commercialIntent ? "Commercial" : "Non-commercial"}
          </span>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          padding: "10px 12px",
          borderRadius: 9,
          background: "var(--bg3)",
          border: "0.5px solid var(--brd)",
        }}
      >
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.09em",
            textTransform: "uppercase",
            color: "var(--ink5)",
            marginBottom: 6,
          }}
        >
          Confidence
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 4,
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontFamily: "Sora,sans-serif",
              fontSize: 17,
              fontWeight: 700,
              color: confColor,
              lineHeight: 1,
            }}
          >
            {pct}%
          </span>
        </div>
        <div
          style={{
            height: 3,
            borderRadius: 3,
            background: "var(--bg4,var(--brd))",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${pct}%`,
              borderRadius: 3,
              background: confColor,
              transition: "width .5s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
};

// ─── Source Section ───────────────────────────────────────────────────────────

const SourceSection: React.FC<{ item: IntakeItem }> = ({ item }) => {
  const rows: [string, React.ReactNode][] = [
    [
      "Intake ID",
      <span
        style={{
          fontFamily: "DM Mono",
          fontSize: 11,
          color: "var(--ink3)",
          userSelect: "all",
        }}
      >
        {item.id ?? item.rowKey ?? "—"}
      </span>,
    ],
    [
      "Source Type",
      <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
        <Icon name={getSourceIcon(item)} size={11} color="var(--ink4)" />
        <span
          style={{
            fontSize: 12,
            color: "var(--ink2)",
            textTransform: "capitalize",
          }}
        >
          {item._contentType === "calendar"
            ? "Calendar event"
            : item.sourceType}
        </span>
      </span>,
    ],
    [
      "Provider",
      <span style={{ fontSize: 12, color: "var(--ink2)" }}>
        {getProviderDisplay(item) || "—"}
      </span>,
    ],
    [
      "Account",
      <span
        style={{ fontFamily: "DM Mono", fontSize: 11, color: "var(--ink3)" }}
      >
        {item.providerAccount ?? "—"}
      </span>,
    ],
    [
      "Received",
      <span style={{ fontSize: 12, color: "var(--ink2)" }}>
        {item.receivedAt ?? "—"}
      </span>,
    ],
    [
      "Created By",
      <span
        style={{ fontFamily: "DM Mono", fontSize: 11, color: "var(--ink3)" }}
      >
        {item.createdBy ?? "—"}
      </span>,
    ],
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {rows.map(([k, v], i) => (
        <div
          key={k as string}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "9px 0",
            borderBottom:
              i < rows.length - 1 ? "0.5px solid var(--brd)" : "none",
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontFamily: "DM Mono",
              color: "var(--ink5)",
              width: 100,
              flexShrink: 0,
            }}
          >
            {k}
          </span>
          <span style={{ flex: 1, minWidth: 0 }}>{v}</span>
        </div>
      ))}
      {item.contentBlobUrl && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "9px 0",
            borderTop: "0.5px solid var(--brd)",
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontFamily: "DM Mono",
              color: "var(--ink5)",
              width: 100,
              flexShrink: 0,
            }}
          >
            Content Blob
          </span>
          <BlobLink
            href={`https://storage.zotra.io/${item.contentBlobUrl}`}
            name={blobFilename(item.contentBlobUrl)}
            icon="file-text"
          />
        </div>
      )}
      {item.mailBlobUrl && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "9px 0",
            borderTop: "0.5px solid var(--brd)",
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontFamily: "DM Mono",
              color: "var(--ink5)",
              width: 100,
              flexShrink: 0,
            }}
          >
            {item._contentType === "calendar" ? "Event Blob" : "Mail Blob"}
          </span>
          <BlobLink
            href={`https://storage.zotra.io/${item.mailBlobUrl}`}
            name={blobFilename(item.mailBlobUrl)}
            icon={item._contentType === "calendar" ? "calendar" : "mail"}
          />
        </div>
      )}
      {(item.attachments?.length ?? 0) > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            padding: "9px 0",
            borderTop: "0.5px solid var(--brd)",
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontFamily: "DM Mono",
              color: "var(--ink5)",
              width: 100,
              flexShrink: 0,
              paddingTop: 4,
            }}
          >
            Attachments
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, flex: 1 }}>
            {item.attachments!.map((att, ai) => {
              const ext = att.name.split(".").pop()?.toLowerCase() ?? "";
              const extMeta: Record<string, [string, string]> = {
                pdf: ["var(--ri)", "var(--rib,#fde8e8)"],
                xlsx: ["var(--ok)", "var(--okb,#e6f7f1)"],
                docx: ["var(--p)", "var(--pp,#eeeeff)"],
                json: ["var(--t,#6366f1)", "var(--tp,#f0f0ff)"],
              };
              const [extColor, extBg] = extMeta[ext] ?? [
                "var(--ink4)",
                "var(--bg3)",
              ];
              return (
                <a
                  key={ai}
                  href={`https://storage.zotra.io/${att.url}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    textDecoration: "none",
                    padding: "5px 10px",
                    borderRadius: 7,
                    background: "var(--bg2)",
                    border: "0.5px solid var(--brd2)",
                    transition: "all .12s",
                    maxWidth: 260,
                  }}
                >
                  <span
                    style={{
                      fontSize: 8,
                      fontWeight: 800,
                      fontFamily: "DM Mono",
                      padding: "2px 5px",
                      borderRadius: 3,
                      background: extBg,
                      color: extColor,
                      textTransform: "uppercase",
                      flexShrink: 0,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {ext || "file"}
                  </span>
                  <span
                    style={{
                      fontSize: 11.5,
                      fontFamily: "DM Mono",
                      color: "var(--ink2)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {att.name}
                  </span>
                  <Icon name="download" size={10} color="var(--ink4)" />
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const BlobLink: React.FC<{ href: string; name: string; icon: string }> = ({
  href,
  name,
  icon,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 11.5,
      fontFamily: "DM Mono",
      color: "var(--p)",
      textDecoration: "none",
      padding: "3px 9px",
      borderRadius: 6,
      background: "var(--pp)",
      border: "0.5px solid var(--brd2)",
      transition: "all .12s",
      maxWidth: 300,
      overflow: "hidden",
    }}
  >
    <Icon name={icon} size={11} color="var(--p)" />
    <span
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {name}
    </span>
    <Icon name="external-link" size={9} color="var(--p)" />
  </a>
);

// ─── List Row ─────────────────────────────────────────────────────────────────

const ListRow: React.FC<{
  item: IntakeItem;
  selected: boolean;
  onClick: () => void;
}> = ({ item, selected, onClick }) => {
  // ✅ Uses getStatusMeta — handles known + unknown statuses
  const sm = getStatusMeta(item.processingStatus);
  const isPending = !item.commercialIntent && item.confidence === 0;
  const isCalendar = item._contentType === "calendar";
  const isCommercial = item.commercialIntent;
  return (
    <div onClick={onClick} className={`itk-row${selected ? " sel" : ""}`}>
      <div className="itk-row-card">
        <div className="itk-row-left">
          <span
            className="itk-row-icon"
            style={{
              background: isCalendar
                ? "color-mix(in srgb,var(--t,#6366f1) 10%,transparent)"
                : isCommercial
                  ? "var(--pp)"
                  : "var(--bg3)",
            }}
          >
            <Icon
              name={getSourceIcon(item)}
              size={13}
              color={
                isCalendar
                  ? "var(--t,#6366f1)"
                  : isCommercial
                    ? "var(--p)"
                    : "var(--ink4)"
              }
            />
          </span>
          <div className="itk-row-main">
            <div className="itk-row-from">
              {item.providerAccount ??
                (item.sourceType === "upload" ? "File upload" : "Manual log")}
            </div>
            <div className="itk-row-subject">
              {item._subject || item.content}
            </div>
            {item.content && item._subject && (
              <div className="itk-row-body">{item.content}</div>
            )}
          </div>
        </div>
        <div className="itk-row-right">
          <span className="itk-row-time">{item.receivedAt}</span>
          <div className="itk-row-tags">
            <span className="itk-tag itk-tag-status">
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: sm.dot,
                  flexShrink: 0,
                  display: "inline-block",
                }}
              />
              {sm.label}
            </span>
            {isCalendar && (
              <span className="itk-tag itk-tag-calendar">Calendar</span>
            )}
            {!isPending && isCommercial && (
              <span className="itk-tag itk-tag-commercial">Commercial</span>
            )}
            {isPending && (
              <span className="itk-tag itk-tag-classifying">Classifying…</span>
            )}
            {(item.attachments?.length ?? 0) > 0 && (
              <span className="itk-tag itk-tag-status">
                <Icon name="paperclip" size={8} color="var(--ink4)" />
                {item.attachments!.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Detail Header ────────────────────────────────────────────────────────────

const DetailHeader: React.FC<{
  item: IntakeItem;
  onIgnore: () => void;
  onConvert: () => void;
}> = ({ item, onIgnore, onConvert }) => {
  // ✅ Uses getStatusMeta
  const sm = getStatusMeta(item.processingStatus);
  const providerDisplay = getProviderDisplay(item);
  return (
    <div className="itk-slidein-hero">
      <div className="itk-slidein-hero-top">
        <span
          className="itk-slidein-hero-icon"
          style={{
            background:
              item._contentType === "calendar"
                ? "color-mix(in srgb,var(--t,#6366f1) 12%,transparent)"
                : item.commercialIntent
                  ? "var(--pp)"
                  : "var(--bg3)",
          }}
        >
          <Icon
            name={getSourceIcon(item)}
            size={20}
            color={
              item._contentType === "calendar"
                ? "var(--t,#6366f1)"
                : item.commercialIntent
                  ? "var(--p)"
                  : "var(--ink4)"
            }
          />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="itk-slidein-hero-title">
            {item._subject || item.content}
          </div>
          <div className="itk-slidein-hero-meta">
            <span className="itk-tag itk-tag-status">
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: sm.dot,
                  flexShrink: 0,
                  display: "inline-block",
                }}
              />
              {sm.label}
            </span>
            {item._contentType === "calendar" && (
              <span className="itk-tag itk-tag-calendar">Calendar</span>
            )}
            {item.commercialIntent && (
              <span className="itk-tag itk-tag-commercial">Commercial</span>
            )}
            {providerDisplay && (
              <span
                style={{
                  fontSize: 10.5,
                  fontFamily: "DM Mono",
                  color: "var(--ink4)",
                }}
              >
                {providerDisplay}
              </span>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 12,
          paddingLeft: 57,
        }}
      >
        {item._sender && (
          <span
            style={{
              fontSize: 11,
              fontFamily: "DM Mono",
              color: "var(--ink4)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: 1,
            }}
          >
            {item._sender}
          </span>
        )}
        <span
          style={{
            fontSize: 10.5,
            fontFamily: "DM Mono",
            color: "var(--ink5)",
            flexShrink: 0,
          }}
        >
          {item.receivedAt}
        </span>
      </div>
      <div className="itk-slidein-hero-actions" style={{ paddingLeft: 57 }}>
        {item.commercialIntent && !item.opportunityId && (
          <button
            className="btn sm pri"
            onClick={onConvert}
            style={{ display: "inline-flex", alignItems: "center", gap: 5 }}
          >
            <Icon name="zap" size={11} /> Convert to Opportunity
          </button>
        )}
        {item.processingStatus !== "ignored" && (
          <button
            className="btn sm"
            onClick={onIgnore}
            style={{ display: "inline-flex", alignItems: "center", gap: 5 }}
          >
            <Icon name="eye-off" size={11} /> Ignore
          </button>
        )}
        <button
          className="btn sm"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            marginLeft: "auto",
          }}
        >
          <Icon name="sparkles" size={11} /> Ask Zotra
        </button>
      </div>
    </div>
  );
};

// ─── Section Card ─────────────────────────────────────────────────────────────

const SectionCard: React.FC<{
  icon: string;
  iconBg?: string;
  iconColor?: string;
  label: string;
  children: React.ReactNode;
}> = ({
  icon,
  iconBg = "var(--bg3)",
  iconColor = "var(--ink4)",
  label,
  children,
}) => (
  <div className="itk-sc">
    <div className="itk-sc-head">
      <span className="itk-sc-icon" style={{ background: iconBg }}>
        <Icon name={icon} size={10} color={iconColor} />
      </span>
      <span className="itk-sc-label">{label}</span>
    </div>
    <div className="itk-sc-body">{children}</div>
  </div>
);

// ─── Filter Dropdown ──────────────────────────────────────────────────────────

const FILTER_OPTIONS: {
  value: "all" | "commercial" | "review";
  label: string;
  icon: string;
  desc: string;
}[] = [
  { value: "all", label: "All", icon: "inbox", desc: "Show all intake items" },
  {
    value: "commercial",
    label: "Commercial",
    icon: "trending-up",
    desc: "Has commercial intent",
  },
  {
    value: "review",
    label: "Needs review",
    icon: "alert-circle",
    desc: "Processed but unlinked",
  },
];

const FilterDropdown: React.FC<{
  filter: "all" | "commercial" | "review";
  onFilter: (v: "all" | "commercial" | "review") => void;
}> = ({ filter, onFilter }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const active = FILTER_OPTIONS.find((f) => f.value === filter)!;
  const isFiltered = filter !== "all";
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          height: 28,
          padding: "0 9px 0 8px",
          borderRadius: 7,
          border: `0.5px solid ${isFiltered ? "var(--p)" : "var(--brd2)"}`,
          background: isFiltered
            ? "color-mix(in srgb,var(--p) 8%,transparent)"
            : "var(--bg2)",
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          fontSize: 12,
          fontWeight: 500,
          cursor: "pointer",
          color: isFiltered ? "var(--p)" : "var(--ink3)",
          fontFamily: "inherit",
          transition: "all .12s",
        }}
      >
        <Icon
          name="filter"
          size={11}
          color={isFiltered ? "var(--p)" : "var(--ink4)"}
        />
        {isFiltered ? active.label : "Filter"}
        {isFiltered && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onFilter("all");
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 14,
              height: 14,
              borderRadius: 3,
              background: "color-mix(in srgb,var(--p) 18%,transparent)",
              cursor: "pointer",
            }}
          >
            <Icon name="x" size={8} color="var(--p)" />
          </span>
        )}
        {!isFiltered && (
          <Icon name="chevron-down" size={10} color="var(--ink4)" />
        )}
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 5px)",
            left: 0,
            background: "var(--bg2)",
            border: "0.5px solid var(--brd2)",
            borderRadius: 10,
            boxShadow: "0 8px 28px rgba(30,20,80,.14)",
            minWidth: 210,
            zIndex: 50,
            overflow: "hidden",
            animation: "fadeUp .15s ease",
          }}
        >
          <div
            style={{
              padding: "8px 12px 5px",
              fontSize: 9.5,
              fontWeight: 700,
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              color: "var(--ink5)",
            }}
          >
            Filter by
          </div>
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onFilter(opt.value);
                setOpen(false);
              }}
              style={{
                width: "100%",
                padding: "8px 12px",
                display: "flex",
                alignItems: "center",
                gap: 9,
                background:
                  filter === opt.value
                    ? "color-mix(in srgb,var(--p) 7%,transparent)"
                    : "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                textAlign: "left",
                transition: "background .1s",
              }}
            >
              <span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  background:
                    filter === opt.value
                      ? "color-mix(in srgb,var(--p) 12%,transparent)"
                      : "var(--bg3)",
                  border: `0.5px solid ${filter === opt.value ? "color-mix(in srgb,var(--p) 25%,transparent)" : "var(--brd)"}`,
                }}
              >
                <Icon
                  name={opt.icon}
                  size={12}
                  color={filter === opt.value ? "var(--p)" : "var(--ink4)"}
                />
              </span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 12.5,
                    fontWeight: filter === opt.value ? 600 : 400,
                    color: filter === opt.value ? "var(--p)" : "var(--ink)",
                    lineHeight: 1.3,
                  }}
                >
                  {opt.label}
                </div>
                <div
                  style={{ fontSize: 10.5, color: "var(--ink5)", marginTop: 1 }}
                >
                  {opt.desc}
                </div>
              </div>
              {filter === opt.value && (
                <Icon name="check" size={12} color="var(--p)" />
              )}
            </button>
          ))}
          <div style={{ height: 6 }} />
        </div>
      )}
    </div>
  );
};

// ─── Sort Dropdown ────────────────────────────────────────────────────────────

const SORT_OPTIONS: { value: SortKey; label: string; icon: string }[] = [
  { value: "newest", label: "Newest first", icon: "arrow-down" },
  { value: "oldest", label: "Oldest first", icon: "arrow-up" },
  { value: "commercial", label: "Commercial first", icon: "trending-up" },
  { value: "confidence", label: "By confidence", icon: "bar-chart-2" },
];

const SortDropdown: React.FC<{
  sort: SortKey;
  onSort: (v: SortKey) => void;
}> = ({ sort, onSort }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const active = SORT_OPTIONS.find((s) => s.value === sort)!;
  const isCustomSort = sort !== "newest";
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          height: 28,
          padding: "0 9px 0 8px",
          borderRadius: 7,
          border: `0.5px solid ${isCustomSort ? "var(--p)" : "var(--brd2)"}`,
          background: isCustomSort
            ? "color-mix(in srgb,var(--p) 8%,transparent)"
            : "var(--bg2)",
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          fontSize: 12,
          fontWeight: 500,
          cursor: "pointer",
          color: isCustomSort ? "var(--p)" : "var(--ink3)",
          fontFamily: "inherit",
          transition: "all .12s",
        }}
      >
        <Icon
          name="arrow-up-down"
          size={11}
          color={isCustomSort ? "var(--p)" : "var(--ink4)"}
        />
        {isCustomSort ? active.label : "Sort"}
        {isCustomSort && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onSort("newest");
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 14,
              height: 14,
              borderRadius: 3,
              background: "color-mix(in srgb,var(--p) 18%,transparent)",
              cursor: "pointer",
            }}
          >
            <Icon name="x" size={8} color="var(--p)" />
          </span>
        )}
        {!isCustomSort && (
          <Icon name="chevron-down" size={10} color="var(--ink4)" />
        )}
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 5px)",
            left: 0,
            background: "var(--bg2)",
            border: "0.5px solid var(--brd2)",
            borderRadius: 10,
            boxShadow: "0 8px 28px rgba(30,20,80,.14)",
            minWidth: 185,
            zIndex: 50,
            overflow: "hidden",
            animation: "fadeUp .15s ease",
          }}
        >
          <div
            style={{
              padding: "8px 12px 5px",
              fontSize: 9.5,
              fontWeight: 700,
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              color: "var(--ink5)",
            }}
          >
            Sort by
          </div>
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onSort(opt.value);
                setOpen(false);
              }}
              style={{
                width: "100%",
                padding: "7px 12px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background:
                  sort === opt.value
                    ? "color-mix(in srgb,var(--p) 7%,transparent)"
                    : "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                textAlign: "left",
                transition: "background .1s",
              }}
            >
              <Icon
                name={opt.icon}
                size={12}
                color={sort === opt.value ? "var(--p)" : "var(--ink4)"}
              />
              <span
                style={{
                  fontSize: 12.5,
                  fontWeight: sort === opt.value ? 600 : 400,
                  color: sort === opt.value ? "var(--p)" : "var(--ink2)",
                  flex: 1,
                }}
              >
                {opt.label}
              </span>
              {sort === opt.value && (
                <Icon name="check" size={12} color="var(--p)" />
              )}
            </button>
          ))}
          <div style={{ height: 6 }} />
        </div>
      )}
    </div>
  );
};

// ─── Linked Object Row ────────────────────────────────────────────────────────

const LinkedObject: React.FC<{
  icon: string;
  iconBg: string;
  iconColor: string;
  type: string;
  name: string;
  id: string;
  accentColor: string;
}> = ({ icon, iconBg, iconColor, type, name, id, accentColor }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 12px",
      borderRadius: 10,
      background: "var(--bg3)",
      border: "0.5px solid var(--brd)",
    }}
  >
    <span
      style={{
        width: 30,
        height: 30,
        borderRadius: 8,
        background: iconBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Icon name={icon} size={13} color={iconColor} />
    </span>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div
        style={{
          fontSize: 9.5,
          fontWeight: 700,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: "var(--ink5)",
          marginBottom: 2,
        }}
      >
        {type}
      </div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "var(--ink)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontSize: 10,
          fontFamily: "DM Mono",
          color: "var(--ink5)",
          marginTop: 1,
        }}
      >
        {id}
      </div>
    </div>
    <div
      style={{ display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}
    >
      <span className="tag ok">Resolved</span>
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          height: 26,
          padding: "0 10px",
          borderRadius: 7,
          background: "var(--bg2)",
          border: "0.5px solid var(--brd2)",
          fontSize: 11,
          fontWeight: 600,
          color: accentColor,
          textDecoration: "none",
          transition: "all .12s",
        }}
      >
        Open <Icon name="arrow-right" size={10} color={accentColor} />
      </a>
    </div>
  </div>
);

// ─── Intake Detail Slide-In Panel ─────────────────────────────────────────────

const IntakeDetailPanel: React.FC<{
  selId: string;
  onClose: () => void;
  actorName: string;
}> = ({ selId, onClose, actorName }) => {
  const [detail, setDetail] = useState<IntakeItem | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [panelWidth, setPanelWidth] = useState(520);
  const [tab, setTab] = useState<"content" | "source" | "linked">("content");

  useEffect(() => {
    let cancelled = false;
    const fetchDetail = async () => {
      setDetailLoading(true);
      setDetailError(null);
      setDetail(null);
      setTab("content");
      try {
        const res = await apiFetch(`${baseUrl()}/intakes/${selId}`, {
          headers: authHeaders(),
        });
        if (!res.ok)
          throw new Error(`Failed to load intake detail (${res.status})`);
        const raw: IntakeItem = await res.json();
        if (!cancelled) setDetail(normalise(raw));
      } catch (e: unknown) {
        if (!cancelled)
          setDetailError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (!cancelled) setDetailLoading(false);
      }
    };
    fetchDetail();
    return () => {
      cancelled = true;
    };
  }, [selId]);

  const handleIgnore = async () => {
    if (!detail) return;
    try {
      await apiFetch(`${baseUrl()}/intakes/${selId}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({
          processingStatus: "ignored",
          updatedBy: actorName,
        }),
      });
      setDetail((prev) =>
        prev ? { ...prev, processingStatus: "ignored" } : prev,
      );
    } catch (e) {
      console.error("[IntakeView] ignore failed:", e);
    }
  };

  const handleConvert = async () => {
    if (!detail) return;
    try {
      await apiFetch(`${baseUrl()}/opportunities`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          intakeId: selId,
          accountId: detail.accountId,
          name: detail._subject || detail.content,
          createdBy: actorName,
        }),
      });
      setDetail((prev) =>
        prev ? { ...prev, opportunityId: "pending" } : prev,
      );
    } catch (e) {
      console.error("[IntakeView] convert failed:", e);
    }
  };

  const onResizeMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX,
        startW = panelWidth;
      const onMove = (mv: MouseEvent) =>
        setPanelWidth(
          Math.max(
            360,
            Math.min(window.innerWidth * 0.9, startW + (startX - mv.clientX)),
          ),
        );
      const onUp = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [panelWidth],
  );

  // ✅ Uses getStatusMeta for the detail panel too
  const sm = detail
    ? getStatusMeta(detail.processingStatus)
    : getStatusMeta("processed");

  const linkedCount =
    (detail?.accountId ? 1 : 0) + (detail?.opportunityId ? 1 : 0);

  return (
    <>
      <div className="itk-backdrop" onClick={onClose} />
      <div className="itk-slidein on" style={{ width: panelWidth }}>
        <div className="odp-resize" onMouseDown={onResizeMouseDown}>
          <div className="odp-resize-grip">
            <div className="odp-resize-dot" />
            <div className="odp-resize-dot" />
            <div className="odp-resize-dot" />
          </div>
          <span className="odp-resize-hint">Drag to resize</span>
        </div>

        {/* ── Top bar ── */}
        <div className="itk-slidein-bar">
          <button
            className="ic-btn sm"
            onClick={onClose}
            title="Close"
            style={{
              background: "#4B48C8",
              color: "#fff",
              border: "none",
              boxShadow: "0 1px 3px rgba(75,72,200,.30)",
            }}
          >
            <Icon name="x" size={13} />
          </button>
          <span
            style={{
              fontFamily: "DM Mono",
              fontSize: 10,
              color: "var(--ink5)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: 1,
            }}
          >
            {selId}
          </span>
          <button
            className="ic-btn sm"
            title="Open full page"
            style={{ marginLeft: "auto" }}
          >
            <Icon name="external-link" size={12} />
          </button>
        </div>

        {/* ── Hero ── */}
        {detailLoading || !detail ? (
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "0.5px solid var(--brd)",
              background: "var(--bg2)",
            }}
          >
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  background: "var(--bg3)",
                  animation: "sk-pulse 1.4s ease-in-out infinite",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    height: 13,
                    borderRadius: 4,
                    background: "var(--bg3)",
                    width: "65%",
                    marginBottom: 7,
                    animation: "sk-pulse 1.4s ease-in-out infinite",
                  }}
                />
                <div
                  style={{
                    height: 9,
                    borderRadius: 4,
                    background: "var(--bg3)",
                    width: "40%",
                    animation: "sk-pulse 1.4s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              padding: "14px 18px 12px",
              borderBottom: "0.5px solid var(--brd)",
              background: "var(--bg2)",
              flexShrink: 0,
            }}
          >
            {/* Title row */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "0.5px solid var(--brd)",
                  background:
                    detail._contentType === "calendar"
                      ? "color-mix(in srgb,var(--t,#6366f1) 10%,transparent)"
                      : detail.commercialIntent
                        ? "var(--pp)"
                        : "var(--bg3)",
                }}
              >
                <Icon
                  name={getSourceIcon(detail)}
                  size={15}
                  color={
                    detail._contentType === "calendar"
                      ? "var(--t,#6366f1)"
                      : detail.commercialIntent
                        ? "var(--p)"
                        : "var(--ink4)"
                  }
                />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "Sora,sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--ink)",
                    lineHeight: 1.35,
                    marginBottom: 5,
                  }}
                >
                  {detail._subject || detail.content}
                </div>
                {/* Meta chips row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    flexWrap: "wrap",
                  }}
                >
                  <span className="itk-tag itk-tag-status">
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: sm.dot,
                        display: "inline-block",
                      }}
                    />
                    {sm.label}
                  </span>
                  {detail.commercialIntent && (
                    <span className="itk-tag itk-tag-commercial">
                      Commercial
                    </span>
                  )}
                  {detail._contentType === "calendar" && (
                    <span className="itk-tag itk-tag-calendar">Calendar</span>
                  )}
                  {detail.provider && (
                    <span
                      style={{
                        fontSize: 10,
                        fontFamily: "DM Mono",
                        color: "var(--ink5)",
                      }}
                    >
                      {getProviderDisplay(detail)}
                    </span>
                  )}
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: "DM Mono",
                      color: "var(--ink5)",
                      marginLeft: "auto",
                    }}
                  >
                    {detail.receivedAt}
                  </span>
                </div>
                {detail._sender && (
                  <div
                    style={{
                      fontSize: 10.5,
                      fontFamily: "DM Mono",
                      color: "var(--ink4)",
                      marginTop: 4,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {detail._sender}
                  </div>
                )}
              </div>
            </div>

            {/* Classification inline */}
            <ClassificationPanel item={detail} />

            {/* Action row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginTop: 10,
              }}
            >
              {detail.commercialIntent && !detail.opportunityId && (
                <button
                  className="btn sm pri"
                  onClick={handleConvert}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Icon name="zap" size={11} /> Convert
                </button>
              )}
              {detail.processingStatus !== "ignored" && (
                <button
                  className="btn sm"
                  onClick={handleIgnore}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Icon name="eye-off" size={11} /> Ignore
                </button>
              )}
              <button
                className="btn sm"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  marginLeft: "auto",
                }}
              >
                <Icon name="sparkles" size={11} /> Ask Zotra
              </button>
            </div>
          </div>
        )}

        {/* ── Tabs ── */}
        {!detailLoading && detail && (
          <div
            style={{
              display: "flex",
              gap: 1,
              padding: "0 12px",
              borderBottom: "0.5px solid var(--brd)",
              background: "var(--bg2)",
              flexShrink: 0,
            }}
          >
            {(
              [
                { id: "content", label: "Content", icon: "file-text" },
                { id: "source", label: "Source", icon: "link" },
                {
                  id: "linked",
                  label: `Linked Objects (${linkedCount})`,
                  icon: "git-branch",
                },
              ] as const
            ).map((t) => {
              const on = tab === (t.id as typeof tab);
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id as typeof tab)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    height: 40,
                    padding: "0 10px",
                    fontSize: 11.5,
                    fontWeight: on ? 700 : 500,
                    color: on ? "#4B48C8" : "var(--ink4)",
                    background: on ? "rgba(75,72,200,0.07)" : "transparent",
                    border: "none",
                    borderBottom: `2.5px solid ${on ? "#4B48C8" : "transparent"}`,
                    borderRadius: "6px 6px 0 0",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "color .12s, background .12s",
                    position: "relative",
                    top: "0.5px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 18,
                      height: 18,
                      borderRadius: 5,
                      flexShrink: 0,
                      background: on ? "rgba(75,72,200,0.14)" : "transparent",
                      transition: "background .12s",
                    }}
                  >
                    <Icon name={t.icon} size={12} />
                  </span>
                  {t.label}
                </button>
              );
            })}
          </div>
        )}

        {/* ── Tab content ── */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            background: "var(--bg)",
            minHeight: 0,
          }}
        >
          {detailError ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                paddingTop: 40,
              }}
            >
              <div style={{ fontSize: 12, color: "var(--ri)" }}>
                {detailError}
              </div>
            </div>
          ) : detailLoading || !detail ? (
            <SkeletonDetail />
          ) : (
            <div
              style={{ padding: "14px 18px", animation: "fadeUp .18s ease" }}
            >
              {/* ── CONTENT TAB ── */}
              {tab === "content" && (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <div
                    style={{
                      borderRadius: 10,
                      background: "var(--bg2)",
                      border: "0.5px solid var(--brd)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                        padding: "9px 13px",
                        borderBottom: "0.5px solid var(--brd)",
                      }}
                    >
                      <span
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 5,
                          background: "var(--bg3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon
                          name={getSourceIcon(detail)}
                          size={9}
                          color="var(--ink4)"
                        />
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--ink4)",
                        }}
                      >
                        Content
                      </span>
                    </div>
                    <div style={{ padding: "14px 16px" }}>
                      {detail.content?.trim() ? (
                        <p
                          style={{
                            fontSize: 13,
                            color: "var(--ink2)",
                            lineHeight: 1.75,
                            margin: 0,
                            whiteSpace: "pre-wrap",
                            fontFamily: "inherit",
                            wordBreak: "break-word",
                          }}
                        >
                          {detail.content}
                        </p>
                      ) : (
                        <div
                          style={{
                            fontSize: 12.5,
                            color: "var(--ink5)",
                            fontStyle: "italic",
                          }}
                        >
                          No content available.
                        </div>
                      )}
                    </div>
                  </div>

                  {(detail.attachments?.length ?? 0) > 0 && (
                    <div
                      style={{
                        borderRadius: 10,
                        background: "var(--bg2)",
                        border: "0.5px solid var(--brd)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 7,
                          padding: "9px 13px",
                          borderBottom: "0.5px solid var(--brd)",
                        }}
                      >
                        <span
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: 5,
                            background: "var(--bg3)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Icon name="paperclip" size={9} color="var(--ink4)" />
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "var(--ink4)",
                          }}
                        >
                          Attachments · {detail.attachments!.length}
                        </span>
                      </div>
                      <div
                        style={{
                          padding: "10px 13px",
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 6,
                        }}
                      >
                        {detail.attachments!.map((att, ai) => {
                          const ext =
                            att.name.split(".").pop()?.toLowerCase() ?? "";
                          const extMeta: Record<string, [string, string]> = {
                            pdf: ["var(--ri)", "var(--rib,#fde8e8)"],
                            xlsx: ["var(--ok)", "var(--okb,#e6f7f1)"],
                            docx: ["var(--p)", "var(--pp,#eeeeff)"],
                            json: ["var(--t,#6366f1)", "var(--tp,#f0f0ff)"],
                          };
                          const [extColor, extBg] = extMeta[ext] ?? [
                            "var(--ink4)",
                            "var(--bg3)",
                          ];
                          return (
                            <a
                              key={ai}
                              href={`https://storage.zotra.io/${att.url}`}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                textDecoration: "none",
                                padding: "4px 9px",
                                borderRadius: 7,
                                background: "var(--bg3)",
                                border: "0.5px solid var(--brd2)",
                                maxWidth: 220,
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 7.5,
                                  fontWeight: 800,
                                  fontFamily: "DM Mono",
                                  padding: "1.5px 4px",
                                  borderRadius: 3,
                                  background: extBg,
                                  color: extColor,
                                  textTransform: "uppercase",
                                  flexShrink: 0,
                                }}
                              >
                                {ext || "file"}
                              </span>
                              <span
                                style={{
                                  fontSize: 11,
                                  fontFamily: "DM Mono",
                                  color: "var(--ink2)",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {att.name}
                              </span>
                              <Icon
                                name="download"
                                size={9}
                                color="var(--ink4)"
                              />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── SOURCE TAB ── */}
              {tab === "source" && (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 8,
                    }}
                  >
                    {[
                      [
                        "Intake ID",
                        <span
                          style={{
                            fontFamily: "DM Mono",
                            fontSize: 10.5,
                            color: "var(--ink3)",
                            userSelect: "all" as const,
                          }}
                        >
                          {detail.id ?? "—"}
                        </span>,
                      ],
                      [
                        "Source",
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                          }}
                        >
                          <Icon
                            name={getSourceIcon(detail)}
                            size={10}
                            color="var(--ink4)"
                          />
                          <span
                            style={{
                              fontSize: 11.5,
                              color: "var(--ink2)",
                              textTransform: "capitalize",
                            }}
                          >
                            {detail._contentType === "calendar"
                              ? "Calendar"
                              : detail.sourceType}
                          </span>
                        </span>,
                      ],
                      [
                        "Provider",
                        <span style={{ fontSize: 11.5, color: "var(--ink2)" }}>
                          {getProviderDisplay(detail) || "—"}
                        </span>,
                      ],
                      [
                        "Account",
                        <span
                          style={{
                            fontFamily: "DM Mono",
                            fontSize: 10.5,
                            color: "var(--ink3)",
                          }}
                        >
                          {detail.providerAccount ?? "—"}
                        </span>,
                      ],
                      [
                        "Received",
                        <span style={{ fontSize: 11.5, color: "var(--ink2)" }}>
                          {detail.receivedAt ?? "—"}
                        </span>,
                      ],
                      [
                        "Created by",
                        <span
                          style={{
                            fontFamily: "DM Mono",
                            fontSize: 10.5,
                            color: "var(--ink3)",
                          }}
                        >
                          {detail.createdBy ?? "—"}
                        </span>,
                      ],
                    ].map(([k, v], i) => (
                      <div
                        key={i as number}
                        style={{
                          padding: "10px 12px",
                          borderRadius: 9,
                          background: "var(--bg2)",
                          border: "0.5px solid var(--brd)",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            letterSpacing: "0.09em",
                            textTransform: "uppercase",
                            color: "var(--ink5)",
                            marginBottom: 5,
                          }}
                        >
                          {k as string}
                        </div>
                        <div>{v as React.ReactNode}</div>
                      </div>
                    ))}
                  </div>

                  {(detail.contentBlobUrl || detail.mailBlobUrl) && (
                    <div
                      style={{
                        borderRadius: 10,
                        background: "var(--bg2)",
                        border: "0.5px solid var(--brd)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          padding: "9px 13px",
                          borderBottom: "0.5px solid var(--brd)",
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--ink4)",
                        }}
                      >
                        Raw Blobs
                      </div>
                      <div
                        style={{
                          padding: "10px 13px",
                          display: "flex",
                          flexDirection: "column",
                          gap: 7,
                        }}
                      >
                        {detail.contentBlobUrl && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 10,
                                fontFamily: "DM Mono",
                                color: "var(--ink5)",
                                width: 80,
                                flexShrink: 0,
                              }}
                            >
                              content
                            </span>
                            <BlobLink
                              href={`https://storage.zotra.io/${detail.contentBlobUrl}`}
                              name={blobFilename(detail.contentBlobUrl)}
                              icon="file-text"
                            />
                          </div>
                        )}
                        {detail.mailBlobUrl && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 10,
                                fontFamily: "DM Mono",
                                color: "var(--ink5)",
                                width: 80,
                                flexShrink: 0,
                              }}
                            >
                              {detail._contentType === "calendar"
                                ? "event"
                                : "mail"}
                            </span>
                            <BlobLink
                              href={`https://storage.zotra.io/${detail.mailBlobUrl}`}
                              name={blobFilename(detail.mailBlobUrl)}
                              icon={
                                detail._contentType === "calendar"
                                  ? "calendar"
                                  : "mail"
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── LINKED TAB ── */}
              {tab === "linked" && (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  {detail.accountId || detail.opportunityId ? (
                    <>
                      {detail.accountId && (
                        <LinkedObject
                          icon="building-2"
                          iconBg="var(--pp)"
                          iconColor="var(--p)"
                          type="Account"
                          name={detail.accountName ?? detail.accountId}
                          id={detail.accountId}
                          accentColor="var(--p)"
                        />
                      )}
                      {detail.opportunityId && (
                        <LinkedObject
                          icon="briefcase"
                          iconBg="var(--tp,#f0f0ff)"
                          iconColor="var(--t,#6366f1)"
                          type="Opportunity"
                          name={detail.opportunityName ?? detail.opportunityId}
                          id={detail.opportunityId}
                          accentColor="var(--t,#6366f1)"
                        />
                      )}
                    </>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 10,
                        padding: "32px 20px",
                        textAlign: "center",
                      }}
                    >
                      <span
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 12,
                          background: "var(--bg3)",
                          border: "0.5px solid var(--brd)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon name="link-2-off" size={16} color="var(--ink4)" />
                      </span>
                      <div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "var(--ink3)",
                            marginBottom: 4,
                          }}
                        >
                          No linked objects
                        </div>
                        <div
                          style={{
                            fontSize: 11.5,
                            color: "var(--ink5)",
                            lineHeight: 1.6,
                          }}
                        >
                          {detail.commercialIntent
                            ? "Convert this item to create an opportunity."
                            : "Non-commercial items are not linked to CRM records."}
                        </div>
                      </div>
                      {detail.commercialIntent && !detail.opportunityId && (
                        <button
                          className="btn sm pri"
                          onClick={handleConvert}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            marginTop: 4,
                          }}
                        >
                          <Icon name="zap" size={11} /> Convert to Opportunity
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const IntakeView: React.FC = () => {
  const { fullName } = useAuth();
  const actorName = fullName ?? "";

  const [items, setItems] = useState<IntakeItem[]>([]);
  const [selId, setSelId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "commercial" | "review">("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const fetchList = useCallback(async () => {
    setListLoading(true);
    setListError(null);
    try {
      const res = await fetch(`${baseUrl()}/intakes`, {
        headers: authHeaders(),
      });
      if (res.status === 401) {
        localStorage.removeItem("zotra_token");
        window.location.href = "/login";
        return;
      }
      if (!res.ok) throw new Error(`Failed to load intakes (${res.status})`);
      const raw = await res.json();
      const arr: IntakeItem[] = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.data)
          ? raw.data
          : Array.isArray(raw?.items)
            ? raw.items
            : [];
      setItems(arr.map(normalise));
    } catch (e: unknown) {
      setListError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setListLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const q = search.trim().toLowerCase();
  const filtered = items
    .filter((it) => {
      if (filter === "commercial") return it.commercialIntent;
      if (filter === "review")
        return (
          it.processingStatus === "processed" &&
          it.commercialIntent &&
          !it.opportunityId
        );
      return true;
    })
    .filter((it) => {
      if (!q) return true;
      return (
        (it._subject ?? "").toLowerCase().includes(q) ||
        (it._sender ?? "").toLowerCase().includes(q) ||
        (it.content ?? "").toLowerCase().includes(q) ||
        (it.summary ?? "").toLowerCase().includes(q) ||
        (it.providerAccount ?? "").toLowerCase().includes(q) ||
        (it.accountName ?? "").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sort === "oldest")
        return (
          new Date(a.createdAt ?? 0).getTime() -
          new Date(b.createdAt ?? 0).getTime()
        );
      if (sort === "commercial")
        return (b.commercialIntent ? 1 : 0) - (a.commercialIntent ? 1 : 0);
      if (sort === "confidence") return b.confidence - a.confidence;
      return (
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime()
      );
    });

  const newCount = items.filter((i) => i.processingStatus === "new").length;
  const hasActiveControls = filter !== "all" || sort !== "newest" || !!q;

  return (
    <>
      <style>{`
        @keyframes sk-pulse { 0%,100%{opacity:.4} 50%{opacity:.85} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
        @keyframes bdIn     { from{opacity:0} to{opacity:1} }

        .itk-backdrop{position:fixed;inset:0;background:rgba(20,18,40,.28);backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);z-index:19;animation:bdIn .18s ease}
        .itk-slidein{position:fixed;right:0;top:0;bottom:0;height:100vh;width:560px;min-width:360px;max-width:90vw;background:var(--bg2);border-left:0.5px solid var(--brd);display:flex;flex-direction:column;overflow:hidden;transform:translateX(100%);transition:transform .22s cubic-bezier(.4,0,.2,1);z-index:20;box-shadow:-12px 0 48px rgba(60,50,150,.18);max-height:100vh}
        .itk-slidein.on{transform:translateX(0)}
        .itk-resize-handle{position:absolute;left:0;top:0;bottom:0;width:5px;cursor:ew-resize;z-index:21;background:transparent}
        .itk-resize-handle:hover,.itk-resize-handle:active{background:var(--p);opacity:.25}
        .itk-slidein-bar{height:48px;display:flex;align-items:center;gap:8px;padding:0 14px;border-bottom:0.5px solid var(--brd);flex-shrink:0;background:var(--bg2)}

        .itk-search{flex:1;min-width:0;height:28px;border-radius:7px;border:0.5px solid var(--brd2);background:var(--bg3);padding:0 8px 0 30px;font-size:12px;color:var(--ink);font-family:inherit;outline:none;transition:border-color .15s,background .15s;box-shadow:none}
        .itk-search::placeholder{color:var(--ink5)}
        .itk-search:focus{border-color:var(--p);background:var(--bg2);box-shadow:0 0 0 2.5px color-mix(in srgb,var(--p) 14%,transparent)}
        .itk-search-wrap{position:relative;flex:1;min-width:0;display:flex;align-items:center}
        .itk-search-icon{position:absolute;left:9px;top:50%;transform:translateY(-50%);pointer-events:none;display:flex;align-items:center;color:var(--ink4)}
        .itk-search-clear{position:absolute;right:6px;top:50%;transform:translateY(-50%);display:flex;align-items:center;cursor:pointer;color:var(--ink4);background:none;border:none;padding:2px;border-radius:4px;line-height:1}
        .itk-search-clear:hover{background:var(--bg3);color:var(--ink2)}

        .itk-list-body{flex:1;overflow-y:auto;background:var(--bg);padding:8px}
        .itk-row{margin-bottom:6px;cursor:pointer;border-radius:10px;border:0.5px solid var(--brd);overflow:hidden;transition:box-shadow .12s,border-color .12s}
        .itk-row:hover .itk-row-card{background:color-mix(in srgb,var(--bg2) 96%,var(--p))}
        .itk-row.sel{border-color:var(--p);box-shadow:0 0 0 2px color-mix(in srgb,var(--p) 18%,transparent)}
        .itk-row.sel .itk-row-card{background:color-mix(in srgb,var(--bg2) 92%,var(--p))}
        .itk-row-card{background:var(--bg2);padding:10px 14px 10px 16px;display:flex;align-items:center;gap:0;border-left:3px solid transparent;transition:background .1s}
        .itk-row.sel .itk-row-card{border-left-color:var(--p)}
        .itk-row-left{flex:1;min-width:0;display:flex;align-items:center;gap:10px;padding-right:12px}
        .itk-row-icon{width:30px;height:30px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;border:0.5px solid var(--brd)}
        .itk-row-main{flex:1;min-width:0}
        .itk-row-from{font-size:10.5px;font-family:'DM Mono',monospace;color:var(--ink4);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:2px}
        .itk-row-subject{font-size:13px;font-weight:600;color:var(--ink);line-height:1.35;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:2px}
        .itk-row-body{font-size:11.5px;color:var(--ink4);line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .itk-row-right{width:148px;flex-shrink:0;display:flex;flex-direction:column;align-items:flex-end;gap:5px;padding-left:12px}
        .itk-row-time{font-size:10px;font-family:'DM Mono',monospace;color:var(--ink5);white-space:nowrap}
        .itk-row-tags{display:flex;align-items:center;gap:4px;flex-wrap:wrap;justify-content:flex-end}

        .itk-tag{display:inline-flex;align-items:center;gap:3px;font-size:9.5px;font-weight:600;padding:1.5px 6px;border-radius:4px;line-height:1.5;white-space:nowrap}
        .itk-tag-status{background:var(--bg3);border:0.5px solid var(--brd2);color:var(--ink3)}
        .itk-tag-calendar{background:color-mix(in srgb,var(--t,#6366f1) 10%,transparent);border:0.5px solid color-mix(in srgb,var(--t,#6366f1) 22%,transparent);color:var(--t,#6366f1)}
        .itk-tag-commercial{background:color-mix(in srgb,var(--ok,#1a9e7c) 10%,transparent);border:0.5px solid color-mix(in srgb,var(--ok,#1a9e7c) 22%,transparent);color:var(--ok,#1a9e7c)}
        .itk-tag-noncommercial{background:var(--bg3);border:0.5px solid var(--brd2);color:var(--ink4)}
        .itk-tag-classifying{background:color-mix(in srgb,#c17b2a 10%,transparent);border:0.5px solid rgba(193,123,42,.22);color:var(--wa,#c17b2a)}

        .itk-slidein-hero{padding:20px 22px 16px;border-bottom:0.5px solid var(--brd);background:var(--bg2);flex-shrink:0}
        .itk-slidein-hero-top{display:flex;align-items:flex-start;gap:13px;margin-bottom:14px}
        .itk-slidein-hero-icon{width:44px;height:44px;border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;border:0.5px solid var(--brd)}
        .itk-slidein-hero-title{font-family:'Sora',sans-serif;font-size:15px;font-weight:700;color:var(--ink);line-height:1.35;margin-bottom:5px}
        .itk-slidein-hero-meta{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
        .itk-slidein-hero-actions{display:flex;align-items:center;gap:6px;padding-top:2px}

        .itk-sc{background:var(--bg2);border:0.5px solid var(--brd);border-radius:10px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04)}
        .itk-sc-head{display:flex;align-items:center;gap:8px;padding:10px 14px 9px;border-bottom:0.5px solid var(--brd);background:color-mix(in srgb,var(--bg3) 60%,transparent)}
        .itk-sc-icon{width:20px;height:20px;border-radius:5px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .itk-sc-label{font-size:10px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--ink4)}
        .itk-sc-body{padding:13px 14px}
      `}</style>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          minHeight: 0,
          background: "var(--bg)",
          position: "relative",
        }}
      >
        {/* ══ Header ══ */}
        <div
          style={{
            padding: "13px 19px 10px",
            borderBottom: "0.5px solid var(--brd)",
            background: "var(--bg2)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 2,
            }}
          >
            <div
              style={{
                fontFamily: "Sora,sans-serif",
                fontSize: 19,
                fontWeight: 600,
                color: "var(--ink)",
                flex: 1,
              }}
            >
              Intake
            </div>
            {newCount > 0 && (
              <span
                style={{
                  fontSize: 9.5,
                  padding: "2px 8px",
                  borderRadius: 6,
                  background: "var(--p)",
                  color: "#fff",
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                }}
              >
                {newCount} new
              </span>
            )}
            <div className="itk-search-wrap">
              <span className="itk-search-icon">
                <Icon
                  name="search"
                  size={12}
                  color={searchFocused ? "var(--p)" : "var(--ink5)"}
                />
              </span>
              <input
                ref={searchRef}
                className="itk-search"
                placeholder="Search subject, sender, account…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              {search && (
                <button
                  className="itk-search-clear"
                  onClick={() => {
                    setSearch("");
                    searchRef.current?.focus();
                  }}
                >
                  <Icon name="x" size={10} color="var(--ink4)" />
                </button>
              )}
            </div>
            <FilterDropdown filter={filter} onFilter={setFilter} />
            <SortDropdown sort={sort} onSort={setSort} />
            <button
              onClick={fetchList}
              disabled={listLoading}
              title="Refresh"
              style={{
                width: 28,
                height: 28,
                border: "0.5px solid var(--brd2)",
                borderRadius: 7,
                background: "var(--bg3)",
                cursor: listLoading ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--ink4)",
                transition: "all .12s",
                padding: 0,
                flexShrink: 0,
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                style={{
                  transition: "transform .5s",
                  transform: listLoading ? "rotate(180deg)" : "none",
                }}
              >
                <path
                  d="M13 2.5v3.5h-3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 13.5v-3.5h3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.5 6.5A5.5 5.5 0 1 0 13 9.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {hasActiveControls && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                marginTop: 8,
                flexWrap: "wrap",
              }}
            >
              {q && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 11,
                    fontWeight: 500,
                    color: "var(--ink3)",
                    background: "var(--bg3)",
                    border: "0.5px solid var(--brd2)",
                    borderRadius: 5,
                    padding: "2px 7px",
                  }}
                >
                  <Icon name="search" size={9} color="var(--ink4)" />"{q}"
                  <button
                    onClick={() => setSearch("")}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      display: "flex",
                      lineHeight: 1,
                    }}
                  >
                    <Icon name="x" size={9} color="var(--ink4)" />
                  </button>
                </span>
              )}
              {filter !== "all" && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 11,
                    fontWeight: 500,
                    color: "var(--p)",
                    background: "color-mix(in srgb,var(--p) 8%,transparent)",
                    border:
                      "0.5px solid color-mix(in srgb,var(--p) 22%,transparent)",
                    borderRadius: 5,
                    padding: "2px 7px",
                  }}
                >
                  <Icon name="filter" size={9} color="var(--p)" />
                  {FILTER_OPTIONS.find((f) => f.value === filter)?.label}
                  <button
                    onClick={() => setFilter("all")}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      display: "flex",
                      lineHeight: 1,
                    }}
                  >
                    <Icon name="x" size={9} color="var(--p)" />
                  </button>
                </span>
              )}
              {sort !== "newest" && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 11,
                    fontWeight: 500,
                    color: "var(--ink4)",
                    background: "var(--bg3)",
                    border: "0.5px solid var(--brd2)",
                    borderRadius: 5,
                    padding: "2px 7px",
                  }}
                >
                  <Icon name="arrow-up-down" size={9} color="var(--ink4)" />
                  {SORT_OPTIONS.find((s) => s.value === sort)?.label}
                  <button
                    onClick={() => setSort("newest")}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      display: "flex",
                      lineHeight: 1,
                    }}
                  >
                    <Icon name="x" size={9} color="var(--ink4)" />
                  </button>
                </span>
              )}
              <span
                style={{
                  fontSize: 10.5,
                  color: "var(--ink5)",
                  marginLeft: "auto",
                }}
              >
                {filtered.length} item{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        {/* ══ List body ══ */}
        <div className="itk-list-body">
          {listLoading ? (
            Array.from({ length: 7 }).map((_, i) => <SkeletonRow key={i} />)
          ) : listError ? (
            <div style={{ padding: "28px 16px", textAlign: "center" }}>
              <div
                style={{ fontSize: 12, color: "var(--ri)", marginBottom: 10 }}
              >
                {listError}
              </div>
              <button className="btn sm" onClick={fetchList}>
                Retry
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: "48px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>
                {q ? "🔍" : "📭"}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--ink3)",
                  marginBottom: 4,
                }}
              >
                {q ? "No results found" : "No intake items"}
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  color: "var(--ink5)",
                  lineHeight: 1.6,
                }}
              >
                {q
                  ? `No items match "${q}"${filter !== "all" ? ` in ${FILTER_OPTIONS.find((f) => f.value === filter)?.label}` : ""}`
                  : filter !== "all"
                    ? `No items match the current filter`
                    : ""}
              </div>
              {(q || filter !== "all") && (
                <button
                  className="btn sm"
                  style={{ marginTop: 12 }}
                  onClick={() => {
                    setSearch("");
                    setFilter("all");
                  }}
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            filtered.map((it) => (
              <ListRow
                key={it.id}
                item={it}
                selected={it.id === selId}
                onClick={() => setSelId(it.id ?? null)}
              />
            ))
          )}
        </div>

        {selId && (
          <IntakeDetailPanel
            selId={selId}
            onClose={() => setSelId(null)}
            actorName={actorName}
          />
        )}
      </div>
    </>
  );
};

export default IntakeView;
