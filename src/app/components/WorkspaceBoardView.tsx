import React, { useState, useEffect } from "react";
import Icon from "../components/Icon";
import AccountDetailPanel from "./AccountDetailPanel";
import { ACCOUNTS } from "../data";
// ─── Styles injected once ─────────────────────────────────────────────────────
const WBV_STYLES = `
.wbv-root {
  flex: 1; display: flex; flex-direction: column;
   min-height: 0; height: 100%;
  background: var(--bg, #ffffff);
  font-family: "DM Sans", system-ui, sans-serif;
}
.wbv-hdr {
  padding: 14px 24px 12px;
  background: var(--bg2, #f8fafc);
  border-bottom: 0.5px solid var(--brd, #e2e8f0);
  display: flex; align-items: center; gap: 12px; flex-shrink: 0;
}
.wbv-hdr-h {
  font-family: "Sora", sans-serif;
  font-size: 18px; font-weight: 600; letter-spacing: -0.02em;
  color: var(--ink);
}
.wbv-hdr-meta {
  font-family: "DM Mono", monospace;
  font-size: 11px; color: var(--ink5);
  padding: 2px 8px; border-radius: 6px;
  background: var(--bg3); border: 0.5px solid var(--brd);
}
.wbv-toggle {
  display: flex; align-items: center;
  background: var(--bg3); border: 0.5px solid var(--brd2);
  border-radius: 9px; padding: 2px; gap: 2px;
  margin-left: 14px;
}
.wbv-toggle-it {
  height: 24px; padding: 0 10px; border-radius: 7px;
  font-size: 11px; cursor: pointer;
  display: flex; align-items: center; gap: 5px;
  color: var(--ink4); font-weight: 500;
  border: 0; background: transparent; font-family: inherit;
  transition: color .15s, background .15s, box-shadow .15s;
  white-space: nowrap;
}
.wbv-toggle-it:hover { color: var(--ink); }
.wbv-toggle-it.on {
  background: var(--bg2); color: var(--p);
  box-shadow: var(--sh-s); font-weight: 600;
}
.wbv-tools {
  margin-left: auto; display: flex; align-items: center; gap: 7px;
}
.wbv-axisbtn {
  display: flex; align-items: center; gap: 5px;
  font-size: 11px; color: var(--ink4);
  padding: 4px 8px; border: 0.5px solid var(--brd2);
  border-radius: 7px; background: var(--bg2);
  cursor: pointer; font-family: inherit;
  transition: color .15s, border-color .15s;
}
.wbv-axisbtn:hover { color: var(--p); border-color: var(--brd3); }
.wbv-area { display: flex; flex-direction: column; flex: 1; overflow: hidden; }
.wbv-area.bv-list  .wbv-board-scroll { display: none; }
.wbv-area.bv-list  .wbv-listview     { display: block; }
.wbv-area.bv-board .wbv-board-scroll { display: block; flex: 1; overflow-x: auto; }
.wbv-area.bv-board .wbv-listview     { display: none; }
.wbv-board-scroll { padding: 16px 20px 20px; overflow-x: auto; overflow-y: hidden; }
.wbv-board-cols {
  display: flex; gap: 13px; height: 100%;
  min-width: max-content;
  animation: wbv-cols-in .3s ease both;
}
@keyframes wbv-cols-in {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.wbv-col {
  display: flex; flex-direction: column;
  width: 252px; flex-shrink: 0;
  border-radius: 14px;
  background: rgba(255,255,255,0.78);
  border: 1px solid rgba(0,0,0,0.06);
  overflow: hidden;
  transition: box-shadow .2s, opacity .2s, border-color .2s;
  box-shadow: 0 1px 4px rgba(15,23,42,0.05);
}
.wbv-col.can-drop {
  box-shadow: 0 0 0 1.5px rgba(99,102,241,0.35), 0 6px 24px rgba(99,102,241,0.10);
  border-color: rgba(99,102,241,0.20);
}
.wbv-col.no-drop { opacity: 0.38; filter: saturate(0.45); }
.wbv-col-head {
  display: flex; align-items: center; gap: 8px;
  padding: 11px 13px 10px;
  border-bottom: 1px solid rgba(0,0,0,0.055);
  background: rgba(255,255,255,0.88);
  position: relative;
}
.wbv-col-head::after {
  content: ''; position: absolute; left: 0; top: 0; right: 0; height: 2.5px;
  background: var(--col-accent, #94a3b8);
  border-radius: 0 0 2px 2px; opacity: .88;
}
.wbv-col-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--col-accent, #94a3b8); flex-shrink: 0;
  box-shadow: 0 0 0 2.5px var(--col-dot-ring, rgba(148,163,184,0.18));
}
.wbv-col-title {
  font-size: 10.5px; font-weight: 700;
  letter-spacing: .07em; text-transform: uppercase;
  color: #334155; flex: 1; white-space: nowrap;
  overflow: hidden; text-overflow: ellipsis;
}
.wbv-col-count {
  font-size: 10px; font-weight: 600;
  color: var(--col-accent, #94a3b8);
  background: var(--col-badge-bg, rgba(148,163,184,.10));
  border: 1px solid var(--col-badge-brd, rgba(148,163,184,.28));
  border-radius: 20px; padding: 1.5px 8px;
  font-family: "DM Mono", monospace; flex-shrink: 0;
}
.wbv-col-sum {
  font-size: 9.5px; font-family: "DM Mono", monospace;
  color: var(--ink5); flex-shrink: 0; margin-left: 2px;
}
.wbv-cards {
  flex: 1; padding: 9px 8px 11px;
  display: flex; flex-direction: column; gap: 7px;
  overflow-y: auto; min-height: 420px;
  transition: background .2s; position: relative;
}
.wbv-cards.drop-active { background: rgba(99,102,241,0.045); border-radius: 0 0 12px 12px; }
.wbv-drop-indicator {
  display: none; align-items: center; justify-content: center;
  border: 1.5px dashed rgba(99,102,241,.42); border-radius: 9px;
  height: 50px; color: rgba(99,102,241,.7);
  font-size: 10.5px; font-weight: 500; gap: 5px;
  animation: wbv-pulse-drop 1.4s ease-in-out infinite;
  background: rgba(99,102,241,.025); flex-shrink: 0;
}
.wbv-cards.drop-active .wbv-drop-indicator { display: flex; }
@keyframes wbv-pulse-drop {
  0%,100% { opacity: .5; border-color: rgba(99,102,241,.28); }
  50%      { opacity: 1;  border-color: rgba(99,102,241,.65); }
}
.wbv-empty {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 6px; padding: 26px 8px; opacity: .3; user-select: none;
}
.wbv-empty-icon {
  width: 26px; height: 26px;
  border: 1.5px dashed #cbd5e1; border-radius: 8px;
  display: flex; align-items: center; justify-content: center; color: #94a3b8;
}
.wbv-empty-txt { font-size: 10.5px; color: #94a3b8; font-family: "DM Mono", monospace; letter-spacing: .02em; }
.wbv-card {
  background: #fff; border: 1px solid rgba(15,23,42,0.07);
  border-radius: 10px; padding: 11px 12px 10px;
  cursor: pointer; user-select: none;
  transition: box-shadow .15s, transform .15s, border-color .15s, opacity .15s;
  position: relative;
  box-shadow: 0 1px 3px rgba(15,23,42,0.07);
  animation: wbv-card-in .22s ease both;
}
@keyframes wbv-card-in {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}
.wbv-card:hover { box-shadow: 0 8px 24px rgba(15,23,42,0.10); transform: translateY(-2px); border-color: rgba(15,23,42,0.11); }
.wbv-card.on {
  border-color: rgba(99,102,241,.36);
  box-shadow: 0 0 0 2px rgba(99,102,241,.22), 0 4px 16px rgba(99,102,241,.12);
  background: rgba(99,102,241,.013);
}
.wbv-card.on::before {
  content: ''; position: absolute; left: -1px; top: 50%;
  transform: translateY(-50%); width: 3px; height: 32px;
  background: #6366f1; border-radius: 0 3px 3px 0; opacity: .8;
}
.wbv-card.dragging { opacity: .25; transform: scale(0.95) rotate(-.5deg); box-shadow: none; }
.wbv-drag-handle {
  position: absolute; top: 9px; right: 9px;
  display: flex; flex-direction: column; gap: 2.5px;
  opacity: 0; transition: opacity .15s; cursor: grab; padding: 2px;
}
.wbv-drag-handle span { display: block; width: 12px; height: 1.5px; background: #cbd5e1; border-radius: 99px; }
.wbv-card:hover .wbv-drag-handle { opacity: 1; }
.wbv-card-name { font-size: 12.5px; font-weight: 600; color: #0f172a; margin-bottom: 3px; padding-right: 18px; line-height: 1.35; letter-spacing: -.01em; }
.wbv-card-desc { font-size: 11px; color: #94a3b8; line-height: 1.5; margin-bottom: 9px; }
.wbv-card-foot { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
.wbv-card-val  { font-size: 12px; font-weight: 600; font-family: "DM Mono", monospace; color: #475569; }
.wbv-tag     { font-size: 9.5px; font-weight: 600; letter-spacing: .05em; padding: 2.5px 8px; border-radius: 20px; text-transform: uppercase; font-family: "DM Mono", monospace; }
.wbv-tag-ok  { background: #dcfce7; color: #166534; }
.wbv-tag-wa  { background: #fef9c3; color: #854d0e; }
.wbv-tag-ri  { background: #fee2e2; color: #991b1b; }
.wbv-tag-te  { background: #ede9fe; color: #5b21b6; }
.wbv-tag-mu  { background: #f1f5f9; color: #64748b; }
.wbv-sbar  { height: 3px; background: rgba(0,0,0,0.06); border-radius: 99px; margin-top: 9px; overflow: hidden; }
.wbv-sfill { height: 100%; border-radius: 99px; transition: width .5s cubic-bezier(.4,0,.2,1); }
.wbv-listview { flex: 1; overflow-y: auto; }
.wbv-mgrid   { display: grid; gap: 10px; margin-bottom: 14px; }
.wbv-metric  { background: var(--bg2, #f8fafc); border: 1px solid rgba(0,0,0,0.06); border-radius: 10px; padding: 12px 14px; }
.wbv-metric-l { font-size: 10.5px; color: #94a3b8; font-weight: 500; margin-bottom: 4px; letter-spacing: .02em; }
.wbv-metric-v { font-size: 20px; font-weight: 700; color: #0f172a; letter-spacing: -.03em; line-height: 1.1; }
.wbv-metric-s { font-size: 10px; color: #94a3b8; margin-top: 2px; }
.wbv-ltable-wrap  { background: var(--bg2, #f8fafc); border: 1px solid rgba(0,0,0,0.06); border-radius: 10px; overflow: hidden; }
.wbv-ltable-head  { display: flex; align-items: center; padding: 12px 14px; border-bottom: 0.5px solid var(--brd, #e2e8f0); gap: 8px; }
.wbv-ltable-title { font-size: 11px; font-weight: 600; color: var(--ink6, #475569); letter-spacing: .04em; }
.wbv-board-scroll::-webkit-scrollbar,.wbv-cards::-webkit-scrollbar { width: 4px; height: 4px; }
.wbv-board-scroll::-webkit-scrollbar-thumb,.wbv-cards::-webkit-scrollbar-thumb { background: rgba(0,0,0,.10); border-radius: 99px; }
.wbv-board-scroll::-webkit-scrollbar-track,.wbv-cards::-webkit-scrollbar-track { background: transparent; }
`;

// ─── Types ────────────────────────────────────────────────────────────────────
type WorkspaceKind = "project" | "finance" | "renewal";

const PILL_MAP: Record<string, [string, string]> = {
  ok: ["#dcfce7", "#166534"],
  wa: ["#fef9c3", "#854d0e"],
  ri: ["#fee2e2", "#991b1b"],
  te: ["#ede9fe", "#5b21b6"],
  mu: ["#f1f5f9", "#64748b"],
};
const pill = (tc: string): [string, string] =>
  PILL_MAP[tc] ?? ["#ede9fe", "#5b21b6"];

const COL_ACCENTS: { dot: string; badge: string; brd: string }[] = [
  {
    dot: "#9CA3AF",
    badge: "rgba(156,163,175,0.12)",
    brd: "rgba(156,163,175,0.35)",
  },
  {
    dot: "#0369A1",
    badge: "rgba(37,99,235,0.12)",
    brd: "rgba(37,99,235,0.35)",
  },
  {
    dot: "#4F46E5",
    badge: "rgba(79,70,229,0.12)",
    brd: "rgba(79,70,229,0.35)",
  },
  {
    dot: "#D97706",
    badge: "rgba(217,119,6,0.12)",
    brd: "rgba(217,119,6,0.35)",
  },
  {
    dot: "#0891B2",
    badge: "rgba(8,145,178,0.12)",
    brd: "rgba(8,145,178,0.35)",
  },
  {
    dot: "#16A34A",
    badge: "rgba(22,163,74,0.12)",
    brd: "rgba(22,163,74,0.35)",
  },
];

// ─── FIX 1: CARD_TO_ACC_ID defined at MODULE level — outside component, outside loop ───
const CARD_TO_ACC_ID: Record<string, string> = {
  // Projects
  "Hartwell SEO Retainer": "a5", // Ember Systems → hot, shaping
  "Hartwell Tech Audit": "a8", // Harbour Cloud → hot, development
  "Hartwell Tech Retainer": "a11", // Kindred Systems → hot, development
  "Hartwell Ortho": "a12", // Luma Ventures → hot, closing
  "Acme SEO + Paid Growth": "a9", // Iris Dynamics → warm, development
  "Acme Dental": "a13", // Mosaic Health → hot, closing
  "Metro Content": "a4", // Dune Analytics → warm, shaping
  "Metro Physio": "a6", // Fluxpoint AI → warm, shaping
  "Northside Paid Ads": "a10", // Juno Software → warm, development
  "Northside Dental": "a14", // Novu Platforms → warm, closing
  "Clearview Physio": "a3", // Cortex Labs → cool, qualify
  "Clearview Physio Site": "a7", // Grayscale IO → cool, shaping
  "Coastal Website": "a1", // Acme Corp → cool, qualify
  "Coastal Website Care": "a2", // Blue Ridge Tech → warm, qualify
};

// ─── Card & Column types ──────────────────────────────────────────────────────
interface BoardCard {
  title: string;
  desc: string;
  tag: string;
  tagCls: string;
  val: string;
  score?: number;
  scoreColor?: string;
  selected?: boolean;
}
interface BoardCol {
  title: string;
  cards: BoardCard[];
}

// ─── WorkspaceList ────────────────────────────────────────────────────────────
interface WorkspaceListProps {
  kind: WorkspaceKind;
  rows: string[][];
  onRowClick: (title: string) => void;
}

const WorkspaceList: React.FC<WorkspaceListProps> = ({
  kind,
  rows,
  onRowClick,
}) => {
  const isProject = kind === "project";
  const isFinance = kind === "finance";

  const getStatusPill = (status: string): [string, string] => {
    if (isProject) {
      if (status === "On track") return pill("ok");
      if (status === "Scope drift" || status === "Awaiting Client")
        return pill("wa");
      if (status === "Below target") return pill("ri");
      return pill("te");
    }
    if (isFinance) {
      if (status === "Overdue" || status === "Margin Alert") return pill("ri");
      if (status === "Watch") return pill("wa");
      if (status === "Paid") return pill("te");
      return pill("mu");
    }
    if (status === "Expired" || status === "Cancelled") return pill("ri");
    if (status === "Due Soon" || status === "Pending") return pill("wa");
    if (status === "Active") return pill("ok");
    if (status === "Renewed") return pill("te");
    return pill("mu");
  };

  const metrics: [string, string, string][] = isProject
    ? [
        ["Active projects", "8", "↑ 1 expanded"],
        ["At risk", "1", "Northside Ads"],
        ["Awaiting client", "2", "Assets pending"],
        ["Avg delivery health", "68", "Across active work"],
      ]
    : isFinance
      ? [
          ["Overdue", "1", "$2,200 outstanding"],
          ["Watch", "1", "Day 14"],
          ["Outstanding", "$15k", "4 invoices"],
          ["MRR", "$18.3k", "/mo"],
        ]
      : [
          ["Active", "6", "Renewing this quarter"],
          ["Due soon", "2", "Within 30 days"],
          ["Expired", "1", "Action needed"],
          ["Total ARR", "$52k", "Annual recurring"],
        ];

  const headers = isProject
    ? ["Project", "Status", "Health", "Value"]
    : isFinance
      ? ["Client", "Status", "Amount", "Age"]
      : ["Client", "Status", "Renewal Date", "Value"];

  const sectionLabel = isProject
    ? "Projects"
    : isFinance
      ? "Financial"
      : "Renewals";
  const searchHolder = isProject
    ? "Search projects…"
    : isFinance
      ? "Search invoices…"
      : "Search renewals…";

  return (
    <>
      <div
        className="wbv-mgrid" 
        style={{ gridTemplateColumns: "repeat(4,1fr)" }}
      >
        {metrics.map((m, i) => (
          <div key={i} className="wbv-metric" >
            <div className="wbv-metric-l" >{m[0]}</div>
            <div className="wbv-metric-v" >{m[1]}</div>
            <div className="wbv-metric-s" >{m[2]}</div>
          </div>
        ))}
      </div>

      <div className="wbv-ltable-wrap" >
        <div className="wbv-ltable-head" >
          <div className="wbv-ltable-title" >● {sectionLabel}</div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
            <input
              placeholder={searchHolder}
              style={{
                height: 28,
                width: 190,
                padding: "0 10px",
                background: "var(--bg, #fff)",
                border: "0.5px solid var(--brd, #e2e8f0)",
                borderRadius: 6,
                fontSize: 12,
                color: "var(--ink, #0f172a)",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
            <button className="btn sm" >Filter</button>
            <button className="btn sm" >Sort</button>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 12.5,
            }}
          >
            <thead>
              <tr>
                {headers.map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "9px 14px",
                      color: "var(--ink5, #94a3b8)",
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: ".07em",
                      borderBottom: "0.5px solid var(--brd, #e2e8f0)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const [bg, fg] = getStatusPill(r[2]);
                const avLabel = isProject ? r[6] : r[5];
                const avBg = isProject ? r[7] : r[6];
                const avFg = isProject ? r[8] : r[7];
                return (
                  <tr
                    key={i}
                    style={{ cursor: "pointer" }}
                    onClick={() => onRowClick(r[0])}
                  >
                    <td
                      style={{
                        padding: "12px 14px",
                        borderBottom: "0.5px solid var(--brd, #e2e8f0)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: 9,
                            background: avBg,
                            color: avFg,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 11,
                            fontWeight: 700,
                          }}
                        >
                          {avLabel}
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: "var(--ink, #0f172a)",
                            }}
                          >
                            {r[0]}
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              color: "var(--ink5, #94a3b8)",
                            }}
                          >
                            {r[1]}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td
                      style={{
                        padding: "12px 14px",
                        borderBottom: "0.5px solid var(--brd, #e2e8f0)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10.5,
                          padding: "2px 8px",
                          borderRadius: 20,
                          background: bg,
                          color: fg,
                          fontWeight: 600,
                        }}
                      >
                        {r[2]}
                      </span>
                    </td>

                    {isProject ? (
                      <>
                        <td
                          style={{
                            padding: "12px 14px",
                            borderBottom: "0.5px solid var(--brd, #e2e8f0)",
                          }}
                        >
                          <div
                            style={{
                              height: 4,
                              background: "rgba(0,0,0,0.06)",
                              borderRadius: 3,
                              overflow: "hidden",
                              width: 90,
                            }}
                          >
                            <div
                              style={{
                                width: r[3] + "%",
                                height: "100%",
                                background: r[4],
                              }}
                            />
                          </div>
                          <div
                            style={{
                              fontFamily: '"DM Mono",monospace',
                              fontSize: 10,
                              color: r[4],
                              marginTop: 3,
                            }}
                          >
                            {r[3]}/100
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "12px 14px",
                            borderBottom: "0.5px solid var(--brd, #e2e8f0)",
                            fontFamily: '"DM Mono",monospace',
                            color: "var(--ink, #0f172a)",
                          }}
                        >
                          {r[5]}
                        </td>
                      </>
                    ) : (
                      <>
                        <td
                          style={{
                            padding: "12px 14px",
                            borderBottom: "0.5px solid var(--brd, #e2e8f0)",
                            fontFamily: '"DM Mono",monospace',
                            color: "var(--ink, #0f172a)",
                          }}
                        >
                          {r[3]}
                        </td>
                        <td
                          style={{
                            padding: "12px 14px",
                            borderBottom: "0.5px solid var(--brd, #e2e8f0)",
                            fontSize: 11,
                            color: "var(--ink5, #94a3b8)",
                          }}
                        >
                          {r[4]}
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PROJECT_COLS_INIT: BoardCol[] = [
  {
    title: "In Delivery",
    cards: [
      {
        title: "Hartwell SEO Retainer",
        desc: "Month 4 — 34% margin",
        tag: "On track",
        tagCls: "wbv-tag-ok",
        val: "$4,000/mo",
        score: 82,
        scoreColor: "#16a34a",
      },
      {
        title: "Acme SEO + Paid Growth",
        desc: "Month 3 — leads up 38%",
        tag: "On track",
        tagCls: "wbv-tag-ok",
        val: "$4,000/mo",
        score: 76,
        scoreColor: "#6366f1",
      },
    ],
  },
  {
    title: "Watch",
    cards: [
      {
        title: "Metro Content",
        desc: "Effort +22% above estimate",
        tag: "Scope drift",
        tagCls: "wbv-tag-wa",
        val: "$3,000/mo",
        score: 48,
        scoreColor: "#d97706",
      },
    ],
  },
  {
    title: "At Risk",
    cards: [
      {
        title: "Northside Paid Ads",
        desc: "Results 40% below target",
        tag: "Below target",
        tagCls: "wbv-tag-ri",
        val: "$1,800/mo",
        score: 24,
        scoreColor: "#dc2626",
      },
    ],
  },
  {
    title: "Awaiting Client",
    cards: [
      {
        title: "Coastal Website",
        desc: "Brand assets — 12 days",
        tag: "12 days",
        tagCls: "wbv-tag-wa",
        val: "",
        score: 55,
        scoreColor: "#d97706",
      },
    ],
  },
  {
    title: "Complete",
    cards: [
      {
        title: "Hartwell Tech Audit",
        desc: "Delivered Month 1",
        tag: "Done",
        tagCls: "wbv-tag-te",
        val: "",
        score: 100,
        scoreColor: "#16a34a",
      },
    ],
  },
];

const FINANCE_COLS_INIT: BoardCol[] = [
  {
    title: "Drafted",
    cards: [
      {
        title: "Clearview Physio",
        desc: "Invoice month 1 — not sent",
        tag: "$1,800",
        tagCls: "wbv-tag-mu",
        val: "",
      },
    ],
  },
  {
    title: "Sent",
    cards: [
      {
        title: "Hartwell Ortho",
        desc: "Invoice #1046 — October",
        tag: "Day 3",
        tagCls: "wbv-tag-mu",
        val: "$4,000",
        score: 82,
        scoreColor: "#16a34a",
      },
      {
        title: "Acme Dental",
        desc: "Invoice #1044 — October",
        tag: "Day 5",
        tagCls: "wbv-tag-mu",
        val: "$4,000",
        score: 78,
        scoreColor: "#16a34a",
      },
    ],
  },
  {
    title: "Watch",
    cards: [
      {
        title: "Metro Physio",
        desc: "Invoice #1045 — Day 14",
        tag: "Day 14",
        tagCls: "wbv-tag-wa",
        val: "$3,000",
        score: 50,
        scoreColor: "#d97706",
      },
    ],
  },
  {
    title: "Overdue",
    cards: [
      {
        title: "Northside Dental",
        desc: "Invoice #1041 — Day 22, no reply",
        tag: "Day 22",
        tagCls: "wbv-tag-ri",
        val: "$2,200",
        score: 20,
        scoreColor: "#dc2626",
        selected: true,
      },
    ],
  },
  {
    title: "Margin Alert",
    cards: [
      {
        title: "Metro Content",
        desc: "Effort +22% — margin 16%",
        tag: "16%",
        tagCls: "wbv-tag-ri",
        val: "—",
        score: 38,
        scoreColor: "#dc2626",
      },
    ],
  },
];

const RENEWAL_COLS_INIT: BoardCol[] = [
  {
    title: "Active",
    cards: [
      {
        title: "Hartwell SEO Retainer",
        desc: "Renews Dec 2024 — 34% margin",
        tag: "Active",
        tagCls: "wbv-tag-ok",
        val: "$4,000/mo",
        score: 90,
        scoreColor: "#16a34a",
      },
      {
        title: "Acme SEO + Paid Growth",
        desc: "Renews Jan 2025 — strong ROI",
        tag: "Active",
        tagCls: "wbv-tag-ok",
        val: "$4,000/mo",
        score: 85,
        scoreColor: "#6366f1",
      },
      {
        title: "Hartwell Ortho",
        desc: "Renews Feb 2025 — Month 8",
        tag: "Active",
        tagCls: "wbv-tag-ok",
        val: "$4,000/mo",
        score: 88,
        scoreColor: "#16a34a",
      },
    ],
  },
  {
    title: "Due Soon",
    cards: [
      {
        title: "Metro Content",
        desc: "Renews in 18 days — scope issues",
        tag: "Due Soon",
        tagCls: "wbv-tag-wa",
        val: "$3,000/mo",
        score: 55,
        scoreColor: "#d97706",
      },
      {
        title: "Coastal Website Care",
        desc: "Renews in 28 days — healthy",
        tag: "Due Soon",
        tagCls: "wbv-tag-wa",
        val: "$1,200/mo",
        score: 72,
        scoreColor: "#6366f1",
      },
    ],
  },
  {
    title: "Pending Decision",
    cards: [
      {
        title: "Northside Paid Ads",
        desc: "Awaiting client decision",
        tag: "Pending",
        tagCls: "wbv-tag-wa",
        val: "$1,800/mo",
        score: 30,
        scoreColor: "#dc2626",
      },
    ],
  },
  {
    title: "Expired",
    cards: [
      {
        title: "Clearview Physio Site",
        desc: "Lapsed — no response 30 days",
        tag: "Expired",
        tagCls: "wbv-tag-ri",
        val: "$900/mo",
        score: 0,
        scoreColor: "#dc2626",
      },
    ],
  },
  {
    title: "Renewed",
    cards: [
      {
        title: "Hartwell Tech Retainer",
        desc: "Renewed for Q1 2025",
        tag: "Renewed",
        tagCls: "wbv-tag-te",
        val: "$2,200/mo",
        score: 100,
        scoreColor: "#16a34a",
      },
    ],
  },
];

const PROJECT_ROWS: string[][] = [
  [
    "Hartwell SEO Retainer",
    "Month 4 — 34% margin",
    "On track",
    "82",
    "#16a34a",
    "$4,000/mo",
    "HO",
    "#E8F5E9",
    "#2E7D32",
  ],
  [
    "Acme SEO + Paid Growth",
    "Leads up 38%",
    "On track",
    "76",
    "#6366f1",
    "$4,000/mo",
    "AD",
    "#EDE7F6",
    "#4527A0",
  ],
  [
    "Metro Content",
    "Effort +22% above estimate",
    "Scope drift",
    "48",
    "#d97706",
    "$3,000/mo",
    "MP",
    "#FFF3E0",
    "#BF360C",
  ],
  [
    "Northside Paid Ads",
    "Results 40% below target",
    "Below target",
    "24",
    "#dc2626",
    "$1,800/mo",
    "ND",
    "#FDECEA",
    "#C62828",
  ],
  [
    "Coastal Website",
    "Awaiting brand assets",
    "Awaiting Client",
    "55",
    "#d97706",
    "—",
    "CA",
    "#E3F2FD",
    "#1565C0",
  ],
  [
    "Hartwell Tech Audit",
    "Delivered Month 1",
    "Complete",
    "100",
    "#16a34a",
    "—",
    "HO",
    "#E8F5E9",
    "#2E7D32",
  ],
];

const FINANCE_ROWS: string[][] = [
  [
    "Northside Dental",
    "Invoice #1041 — Day 22",
    "Overdue",
    "$2,200",
    "Day 22",
    "ND",
    "#FDECEA",
    "#C62828",
  ],
  [
    "Metro Physio",
    "Invoice #1045 — Day 14",
    "Watch",
    "$3,000",
    "Day 14",
    "MP",
    "#FFF3E0",
    "#BF360C",
  ],
  [
    "Metro Content",
    "Effort +22% — margin 16%",
    "Margin Alert",
    "—",
    "—",
    "MP",
    "#FFF3E0",
    "#BF360C",
  ],
  [
    "Hartwell Ortho",
    "Invoice #1046 — October",
    "Sent",
    "$4,000",
    "Day 3",
    "HO",
    "#E8F5E9",
    "#2E7D32",
  ],
  [
    "Acme Dental",
    "Invoice #1044 — October",
    "Sent",
    "$4,000",
    "Day 5",
    "AD",
    "#EDE7F6",
    "#4527A0",
  ],
  [
    "Clearview Physio",
    "Invoice month 1 — not sent",
    "Draft",
    "$1,800",
    "—",
    "CP",
    "#FFF9C4",
    "#F57F17",
  ],
  [
    "Hartwell Ortho",
    "Invoice #1042 — paid via portal",
    "Paid",
    "$4,000",
    "D24",
    "HO",
    "#E8F5E9",
    "#2E7D32",
  ],
];

const RENEWAL_ROWS: string[][] = [
  [
    "Hartwell SEO Retainer",
    "Renews Dec 2024 — 34% margin",
    "Active",
    "$4,000/mo",
    "Dec 1, 2024",
    "HO",
    "#E8F5E9",
    "#2E7D32",
  ],
  [
    "Acme SEO + Paid Growth",
    "Renews Jan 2025 — strong ROI",
    "Active",
    "$4,000/mo",
    "Jan 15, 2025",
    "AD",
    "#EDE7F6",
    "#4527A0",
  ],
  [
    "Hartwell Ortho",
    "Renews Feb 2025 — Month 8",
    "Active",
    "$4,000/mo",
    "Feb 3, 2025",
    "HO",
    "#E8F5E9",
    "#2E7D32",
  ],
  [
    "Metro Content",
    "Renews in 18 days — scope issues",
    "Due Soon",
    "$3,000/mo",
    "Nov 18, 2024",
    "MP",
    "#FFF3E0",
    "#BF360C",
  ],
  [
    "Coastal Website Care",
    "Renews in 28 days — good health",
    "Due Soon",
    "$1,200/mo",
    "Nov 28, 2024",
    "CW",
    "#E3F2FD",
    "#1565C0",
  ],
  [
    "Northside Paid Ads",
    "Awaiting client decision",
    "Pending",
    "$1,800/mo",
    "Nov 1, 2024",
    "ND",
    "#FDECEA",
    "#C62828",
  ],
  [
    "Clearview Physio Site",
    "Lapsed — no response",
    "Expired",
    "$900/mo",
    "Oct 1, 2024",
    "CP",
    "#FFF9C4",
    "#F57F17",
  ],
];

const HDR_CONFIG: Record<
  WorkspaceKind,
  { title: string; meta: string; size: string; color: string; newBtn: string }
> = {
  project: {
    title: "Projects",
    meta: "8 active · 1 at risk",
    size: "Size: MRR",
    color: "Color: Health",
    newBtn: "New Project",
  },
  finance: {
    title: "Financial",
    meta: "2 overdue · $18.3k MRR",
    size: "Size: Amount",
    color: "Color: Aging",
    newBtn: "New Invoice",
  },
  renewal: {
    title: "Renewals",
    meta: "2 due soon · $52k ARR",
    size: "Size: ARR",
    color: "Color: Health",
    newBtn: "New Renewal",
  },
};

interface DragState {
  ci: number;
  ki: number;
}
interface WorkspaceBoardViewProps {
  kind?: WorkspaceKind;
}

// ─── Main component ───────────────────────────────────────────────────────────
const WorkspaceBoardView: React.FC<WorkspaceBoardViewProps> = ({
  kind = "project",
}) => {
  const isProject = kind === "project";
  const isFinance = kind === "finance";

  const [mode, setMode] = useState<"board" | "list">("list");
  const [openAcc, setOpenAcc] = useState<string | null>(null); // ← panel state
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [dragging, setDragging] = useState<DragState | null>(null);
  const [dragOverCol, setDragOverCol] = useState<number | null>(null);

  // ─── FIX 2: removed findAccId (unused) and findAccByName (referenced missing CARD_TO_ACC_NAME)
  // We now use CARD_TO_ACC_ID directly in onClick below ───────────────────────

  useEffect(() => {
    const id = "wbv-styles-v3";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = WBV_STYLES;
      document.head.appendChild(s);
    }
  }, []);

  const getInitCols = (): BoardCol[] => {
    if (isProject)
      return PROJECT_COLS_INIT.map((c) => ({ ...c, cards: [...c.cards] }));
    if (isFinance)
      return FINANCE_COLS_INIT.map((c) => ({ ...c, cards: [...c.cards] }));
    return RENEWAL_COLS_INIT.map((c) => ({ ...c, cards: [...c.cards] }));
  };

  const [boardCols, setBoardCols] = useState<BoardCol[]>(getInitCols);

  useEffect(() => {
    setBoardCols(getInitCols());
    setSelectedCard(null);
    setOpenAcc(null); // ← close panel when switching kind
  }, [kind]);

  const onDragStart = (e: React.DragEvent, ci: number, ki: number) => {
    setDragging({ ci, ki });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", JSON.stringify({ ci, ki }));
    setTimeout(() => (e.target as HTMLElement).classList.add("dragging"), 0);
  };
  const onDragEnd = (e: React.DragEvent) => {
    (e.target as HTMLElement).classList.remove("dragging");
    setDragging(null);
    setDragOverCol(null);
  };
  const onDragOver = (e: React.DragEvent, ci: number) => {
    if (dragging && ci > dragging.ci) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setDragOverCol(ci);
    } else {
      e.dataTransfer.dropEffect = "none";
      setDragOverCol(null);
    }
  };
  const onDragLeave = (e: React.DragEvent) => {
    if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node))
      setDragOverCol(null);
  };
  const onDrop = (e: React.DragEvent, targetCi: number) => {
    e.preventDefault();
    setDragOverCol(null);
    setDragging(null);
    const { ci: srcCi, ki } = JSON.parse(
      e.dataTransfer.getData("text/plain"),
    ) as DragState;
    if (targetCi <= srcCi) return;
    const next = boardCols.map((c) => ({ ...c, cards: [...c.cards] }));
    const [moved] = next[srcCi].cards.splice(ki, 1);
    next[targetCi].cards.push(moved);
    setBoardCols(next);
  };

  const isDragging = dragging !== null;
  const hc = HDR_CONFIG[kind];
  const listRows = isProject
    ? PROJECT_ROWS
    : isFinance
      ? FINANCE_ROWS
      : RENEWAL_ROWS;

  return (
    // ─── FIX 3: position:relative so AccountDetailPanel (position:absolute) overlays correctly
    <div className="wbv-root"  style={{ position: "relative" }}>
      {/* Header */}
      <div className="wbv-hdr" >
        <div className="wbv-hdr-h" >{hc.title}</div>
        <div className="wbv-hdr-meta" >{hc.meta}</div>
        <div className="wbv-toggle" >
          <button
            className={`wbv-toggle-it${mode === "board" ? " on" : ""}`}
            onClick={() => setMode("board")}
          >
            <Icon name="columns-3" size={12} /> Board
          </button>
          <button
            className={`wbv-toggle-it${mode === "list" ? " on" : ""}`}
            onClick={() => setMode("list")}
          >
            <Icon name="list" size={12} /> List
          </button>
        </div>
        <div className="wbv-tools" >
          <button className="wbv-axisbtn" >
            <Icon name="circle" size={11} /> {hc.size}
          </button>
          <button className="wbv-axisbtn" >
            <Icon name="palette" size={11} /> {hc.color}
          </button>
          <button className="wbv-axisbtn" >
            <Icon name="filter" size={11} /> All owners
          </button>
          <button className="btn sm pri" >
            <Icon name="plus" size={12} /> {hc.newBtn}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={`wbv-area ${mode === "list" ? "bv-list" : "bv-board"}`}>
        {/* Board */}
        <div className="wbv-board-scroll" >
          <div className="wbv-board-cols" >
            {boardCols.map((col, ci) => {
              const accent = COL_ACCENTS[ci % COL_ACCENTS.length];
              const isOver = dragOverCol === ci;
              const canDrop = isDragging && ci > dragging!.ci;
              const noDrop = isDragging && ci <= dragging!.ci;
              const colSum = col.cards.reduce((s, c) => {
                const n = parseFloat((c.val || "").replace(/[$,/moa-z]/g, ""));
                return s + (isNaN(n) ? 0 : n);
              }, 0);

              return (
                <div
                  key={ci}
                  className={`wbv-col${canDrop ? " can-drop" : ""}${noDrop ? " no-drop" : ""}`}
                  style={
                    {
                      "--col-accent": accent.dot,
                      "--col-badge-bg": accent.badge,
                      "--col-badge-brd": accent.brd,
                      "--col-dot-ring": accent.badge,
                    } as React.CSSProperties
                  }
                >
                  {/* Column header */}
                  <div className="wbv-col-head" >
                    <div className="wbv-col-dot"  />
                    <div className="wbv-col-title" >{col.title}</div>
                    <div className="wbv-col-count" >{col.cards.length}</div>
                    {colSum > 0 && (
                      <div className="wbv-col-sum" >
                        $
                        {colSum >= 1000
                          ? (colSum / 1000).toFixed(1) + "k"
                          : colSum}
                      </div>
                    )}
                  </div>

                  {/* Drop zone */}
                  <div
                    className={`wbv-cards${isOver && canDrop ? " drop-active" : ""}`}
                    onDrop={(e) => onDrop(e, ci)}
                    onDragOver={(e) => onDragOver(e, ci)}
                    onDragLeave={onDragLeave}
                  >
                    <div className="wbv-drop-indicator" >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M6 1v10M1 6h10"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      Drop here
                    </div>

                    {col.cards.length === 0 && !isOver && (
                      <div className="wbv-empty" >
                        <div className="wbv-empty-icon" >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M6 2v8M2 6h8"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <span className="wbv-empty-txt" >empty</span>
                      </div>
                    )}

                    {/* Cards */}
                    {col.cards.map((card, ki) => {
                      const cardKey = `${ci}-${ki}-${card.title}`;
                      const isOn = selectedCard === cardKey || card.selected;

                      return (
                        <div
                          key={ki}
                          draggable
                          onDragStart={(e) => onDragStart(e, ci, ki)}
                          onDragEnd={onDragEnd}
                          className={`wbv-card${isOn ? " on" : ""}`}
                          onClick={() => {
                            setSelectedCard(
                              selectedCard === cardKey ? null : cardKey,
                            );
                            // ─── FIX 4: use CARD_TO_ACC_ID directly — no more findAccByName ───
                            setOpenAcc(CARD_TO_ACC_ID[card.title] ?? null);
                          }}
                        >
                          <div className="wbv-drag-handle"  aria-hidden="true">
                            <span />
                            <span />
                            <span />
                          </div>

                          <div className="wbv-card-name" >{card.title}</div>
                          <div className="wbv-card-desc" >{card.desc}</div>

                          <div className="wbv-card-foot" >
                            <span className={`wbv-tag ${card.tagCls}`}>
                              {card.tag}
                            </span>
                            <span className="wbv-card-val" >{card.val}</span>
                          </div>

                          {card.score !== undefined && (
                            <div className="wbv-sbar" >
                              <div
                                className="wbv-sfill" 
                                style={{
                                  width: `${card.score}%`,
                                  background: card.scoreColor ?? "#6366f1",
                                }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* List */}
        <div className="wbv-listview" >
          <div style={{ padding: "16px 18px 24px" }}>
            <WorkspaceList
              kind={kind}
              rows={listRows}
              onRowClick={(title) => {
                setOpenAcc(CARD_TO_ACC_ID[title] ?? null);
              }}
            />
          </div>
        </div>
      </div>

      {/* ─── FIX 5: Panel is OUTSIDE wbv-area (avoids overflow:hidden clipping) ─── */}
      <AccountDetailPanel
        accountId={openAcc}
        onClose={() => setOpenAcc(null)}
      />
    </div>
  );
};

export default WorkspaceBoardView;
