import React, { useState, useEffect, useRef, useCallback } from "react";
import Icon from "../components/Icon";
import { baseUrl, apiFetch } from "../utils/utils";
import { getToken } from "../../services/api";

// ── Types ─────────────────────────────────────────────────────────────────────
type EntryId = "thread" | "upload" | "empty" | "tour" | "connect";

interface QuickStartViewProps {
  setView?: (v: string) => void;
  setTenantAge?: (age: string) => void;
  setOpenAcc?: (id: string | null) => void;
}

function parseName(text: string): string {
  const first = text
    .trim()
    .split(/[,\-\u2013\u2014.]/)[0]
    .trim();
  return first.charAt(0).toUpperCase() + first.slice(1) || "New Customer";
}

// ── All styles in one block ───────────────────────────────────────────────────
const QS_STYLES = `
@keyframes qs-blink  { 0%,100%{opacity:1}  50%{opacity:.3} }
@keyframes qs-fadein { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
@keyframes qs-spin   { to{transform:rotate(360deg)} }

.qs-shell {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  background: var(--bg);
}
.qs-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 32px 28px 64px;
}
.qs-inner {
  max-width: 680px;
  margin: 0 auto;
}

/* Hero */
.qs-hero {
  background: var(--p);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 20px;
  position: relative;
}
.qs-hero-body {
  position: relative;
  z-index: 2;
  padding: 22px 24px 18px;
}
.qs-hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "DM Mono", monospace;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(255,255,255,.55);
  margin-bottom: 10px;
}
.qs-hero-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #fff;
  opacity: .9;
  flex-shrink: 0;
  animation: qs-blink 2s ease-in-out infinite;
}
.qs-hero-title {
  font-family: "Sora", sans-serif;
  font-size: 24px;
  font-weight: 650;
  letter-spacing: -.03em;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 14px;
}
.qs-hero-pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.qs-hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 11px;
  background: rgba(255,255,255,.15);
  border: .5px solid rgba(255,255,255,.25);
  border-radius: 20px;
  font-size: 11.5px;
  color: rgba(255,255,255,.9);
  font-weight: 500;
}
.qs-hero-orb1 {
  position: absolute; top: -60px; right: -40px;
  width: 240px; height: 240px; border-radius: 50%;
  background: rgba(255,255,255,.06); pointer-events: none;
}
.qs-hero-orb2 {
  position: absolute; bottom: -70px; left: 15%;
  width: 180px; height: 180px; border-radius: 50%;
  background: rgba(255,255,255,.04); pointer-events: none;
}

/* Entry cards */
.qs-cards {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}
.qs-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 18px;
  background: var(--bg2);
  border-radius: 14px;
  cursor: pointer;
  transition: background .13s, border-color .13s;
  position: relative;
}
.qs-card:hover { background: var(--pu); }
.qs-card-recommended {
  border: 1.5px solid var(--p) !important;
  box-shadow: 0 0 0 3px rgba(75,72,200,.07), var(--sh-s) !important;
}
.qs-recommended-badge {
  position: absolute;
  top: -1px; left: -1px;
  font-size: 9px;
  font-family: "DM Mono", monospace;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 13px 0 8px 0;
  background: var(--p);
  color: #fff;
  letter-spacing: .06em;
  text-transform: uppercase;
}
.qs-card-ic {
  width: 38px; height: 38px;
  border-radius: 11px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}
.qs-card-body { flex: 1; min-width: 0; }
.qs-card-title {
  font-size: 13.5px;
  font-weight: 650;
  color: var(--ink);
  letter-spacing: -.01em;
  margin-bottom: 3px;
}
.qs-card-desc {
  font-size: 12px;
  color: var(--ink3);
  margin-bottom: 8px;
}
.qs-card-bullets {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.qs-card-bullet {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 11.5px;
  color: var(--ink4);
}
.qs-card-bullet-dot {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: var(--ink5);
  flex-shrink: 0;
}
.qs-card-chev {
  display: flex;
  align-items: center;
  color: var(--ink4);
  flex-shrink: 0;
  margin-top: 10px;
}
.qs-footer-links {
  text-align: center;
  font-size: 12px;
  color: var(--ink5);
}
.qs-footer-link {
  color: var(--p);
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.qs-footer-sep {
  color: var(--ink6);
  margin: 0 6px;
}

/* Step header */
.qs-step-back {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}
.qs-step-label { font-size: 12px; color: var(--ink4); }

/* Eyebrow */
.qs-eyebrow {
  display: flex;
  align-items: center;
  gap: 7px;
  font-family: "DM Mono", monospace;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--p);
  margin-bottom: 8px;
}
.qs-eyebrow-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--p);
  display: inline-block;
  animation: qs-blink 2s ease-in-out infinite;
}
.qs-step-title {
  font-family: "Sora", sans-serif;
  font-size: 24px;
  font-weight: 650;
  letter-spacing: -.03em;
  color: var(--ink);
  line-height: 1.1;
  margin-bottom: 8px;
}
.qs-step-sub {
  font-size: 14px;
  color: var(--ink3);
  line-height: 1.6;
  max-width: 520px;
  margin-bottom: 24px;
}

/* Input card */
.qs-input-card {
  background: var(--bg2);
  border: .5px solid var(--brd);
  border-radius: 18px;
  box-shadow: var(--sh-s);
  overflow: hidden;
  margin-bottom: 12px;
}
.qs-input-pad { padding: 24px 28px; }

/* Drop area */
.qs-drop-area {
  border: 1.5px dashed var(--brd2);
  border-radius: 13px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all .15s;
  margin-bottom: 12px;
}
.qs-drop-area:hover, .qs-drop-area.over {
  border-color: var(--p);
  background: var(--pu);
}

/* Sample thread / doc rows */
.qs-sample-lbl {
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--ink5);
  margin-bottom: 10px;
  margin-top: 16px;
}
.qs-sample-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  cursor: pointer;
  transition: all .15s;
}
.qs-sample-row-ic {
  width: 28px; height: 28px;
  border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  transition: all .15s;
}
.qs-sample-body { flex: 1; min-width: 0; }
.qs-sample-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.qs-sample-sub { font-size: 11px; color: var(--ink4); }
.qs-sample-preview-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 500;
  flex-shrink: 0;
}

/* Progress checklist */
.qs-checklist {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.qs-check-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: var(--bg2);
  border: .5px solid var(--brd);
  border-radius: 11px;
}
.qs-check-ic {
  width: 26px; height: 26px;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.qs-spin {
  width: 14px; height: 14px;
  border-radius: 50%;
  border: 2px solid var(--brd2);
  border-top-color: var(--p);
  margin-left: auto;
  animation: qs-spin .7s linear infinite;
}

/* Tour cards */
.qs-tour-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--bg2);
  border: .5px solid var(--brd);
  border-radius: 13px;
  box-shadow: var(--sh-s);
  cursor: pointer;
  transition: background .13s;
  margin-bottom: 8px;
}
.qs-tour-card:hover { background: var(--pu); }
.qs-tour-ic {
  width: 34px; height: 34px;
  border-radius: 10px;
  background: var(--pp);
  color: var(--p);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

/* Connect card */
.qs-connect-card {
  background: linear-gradient(135deg, var(--p) 0%, #7A78E0 100%);
  border-radius: 16px;
  padding: 22px 24px;
  margin-bottom: 12px;
  color: #fff;
}
.qs-connect-title {
  font-family: "Sora", sans-serif;
  font-size: 18px;
  font-weight: 650;
  letter-spacing: -.025em;
  margin-bottom: 6px;
}
.qs-connect-sub {
  font-size: 13px;
  opacity: .84;
  line-height: 1.55;
  margin-bottom: 16px;
}
.qs-connect-btns {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.qs-connect-btn-pri {
  height: 34px; padding: 0 16px;
  border-radius: 9px;
  font-size: 12.5px; font-weight: 600;
  font-family: inherit; cursor: pointer;
  border: none;
  display: flex; align-items: center; gap: 7px;
  background: #fff; color: var(--p);
  transition: all .15s;
}
.qs-connect-btn-ghost {
  height: 34px; padding: 0 16px;
  border-radius: 9px;
  font-size: 12.5px; font-weight: 600;
  font-family: inherit; cursor: pointer;
  display: flex; align-items: center; gap: 7px;
  background: rgba(255,255,255,.18);
  color: #fff;
  border: .5px solid rgba(255,255,255,.3);
  transition: all .15s;
}
.qs-trust-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.qs-trust-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  opacity: .78;
  color: #fff;
}

/* Other options */
.qs-opt-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: var(--bg2);
  border: .5px solid var(--brd);
  border-radius: 11px;
  cursor: pointer;
  margin-bottom: 6px;
  transition: background .12s;
}
.qs-opt-row:hover { background: var(--pu); }
.qs-opt-ic {
  width: 30px; height: 30px;
  border-radius: 9px;
  background: var(--bg3);
  border: .5px solid var(--brd2);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  color: var(--ink3);
}

/* Health cards */
.qs-health-wrap {
  background: linear-gradient(135deg, var(--pp) 0%, var(--bg2) 70%);
  border-top: .5px solid var(--brd);
  padding: 20px 28px;
}
.qs-health-name {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Sora", sans-serif;
  font-size: 16px;
  font-weight: 650;
  letter-spacing: -.02em;
  color: var(--ink);
  margin-bottom: 4px;
}
.qs-health-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}
.qs-health-card {
  flex: 1;
  min-width: 110px;
  padding: 10px 13px;
  background: var(--bg2);
  border: .5px solid var(--brd);
  border-radius: 11px;
}

/* Workspace live preview */
.qs-ws-preview-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.qs-ws-health-row {
  display: flex;
  gap: 7px;
  margin-bottom: 10px;
}
.qs-ws-health-card {
  flex: 1;
  padding: 9px 11px;
  background: var(--bg2);
  border: .5px solid var(--brd);
  border-radius: 10px;
}
.qs-gap-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 9px;
  border-radius: 8px;
  margin-bottom: 5px;
  transition: all .35s ease-out;
}

/* Submitted state */
.qs-submitted-hero {
  text-align: center;
  padding: 48px 0 32px;
}
.qs-submitted-ic {
  width: 56px; height: 56px;
  border-radius: 18px;
  background: linear-gradient(135deg, var(--p), var(--t));
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 18px;
  box-shadow: 0 8px 24px -4px rgba(75,72,200,.35);
}
`;

// ── Data ──────────────────────────────────────────────────────────────────────
const DEMO_NAMES = [
  "Hartwell Ortho",
  "Peak Studio",
  "Northwind Trading",
  "Clearview Digital",
  "Proval Consulting",
];
const EXAMPLE_CHIPS = [
  { name: "Hartwell Ortho", industry: "Healthcare", size: "30" },
  { name: "Peak Studio", industry: "Design", size: "22" },
  { name: "Northwind Trading", industry: "Logistics", size: "180" },
  { name: "Clearview Digital", industry: "Digital Agency", size: "65" },
  { name: "Proval Consulting", industry: "Consulting", size: "120" },
];
const SAMPLE_THREADS = [
  {
    id: "hartwell",
    label: "New inquiry — digital marketing",
    from: "Dr. James Whitfield",
    fromEmail: "j.whitfield@hartwellortho.com",
    to: "Elena Marsh <elena@acme.agency>",
    subject: "Digital marketing inquiry — Hartwell Orthopaedics",
    date: "Mon, 19 May 2026 09:14",
    co: "Hartwell Orthopaedics",
    body: "Hi Elena,\n\nWe are looking for help with our online presence. Not sure exactly what we need but want to grow our patient base. Happy to have a call.\n\nWe are currently reviewing our digital marketing setup and assessing a few agencies. Interested in learning more about your SEO and content capabilities. Can we arrange a call this week?\n\nBest,\nDr. James Whitfield\nClinical Director, Hartwell Orthopaedics",
  },
  {
    id: "canpango",
    label: "Inbound — SEO and content services",
    from: "Mike Alvarez",
    fromEmail: "mike@canpango.com",
    to: "Elena Marsh <elena@acme.agency>",
    subject: "Inquiry re: SEO and content services",
    date: "Mon, 19 May 2026 08:02",
    co: "Canpango",
    body: "Hi Elena,\n\nI came across your agency online and we are looking for support with SEO and content. We are a 45-person SaaS company and have not had any dedicated marketing support until now.\n\nBudget is roughly set — we are looking to make a decision in the next few weeks. Would love to hear more about how you work.\n\nMike Alvarez\nHead of Growth, Canpango",
  },
  {
    id: "proval",
    label: "Referral intro — content and paid search",
    from: "Jane Crawford",
    fromEmail: "jane@provalconsulting.com",
    to: "Elena Marsh <elena@acme.agency>",
    subject: "Introduction — referred by David at Marketwake",
    date: "Sun, 18 May 2026 17:33",
    co: "Proval Consulting",
    body: "Hi Elena,\n\nDavid Chen suggested I reach out. We are a 120-person consulting firm and are looking to revamp our content strategy and explore paid search for the first time.\n\nWe have a defined budget and are looking to move quickly — ideally starting next month. Would a call later this week work?\n\nJane Crawford\nMarketing Director, Proval Consulting",
  },
];
const DOC_SAMPLES = [
  {
    id: "marketwake",
    label: "SEO retainer proposal",
    co: "Marketwake",
    type: "Proposal",
    value: "$96K",
    accentColor: "#5552C9",
    accentBg: "#EEEDF9",
    from: "Acme Agency",
    to: "Marketwake",
    contact: "David Chen, Head of Marketing",
    date: "19 May 2026",
    ref: "PROP-2026-042",
    term: "12 months",
    start: "1 June 2026",
    intro:
      "Following our initial discovery call, we are pleased to submit this proposal for a 12-month SEO and content retainer. Marketwake has strong domain authority and a clear brief — we believe this programme will drive measurable pipeline within 90 days.",
    scope: [
      {
        item: "Technical SEO audit and remediation",
        detail: "Full crawl, Core Web Vitals, schema markup",
      },
      {
        item: "Monthly content production",
        detail: "8 long-form articles targeting high-intent terms",
      },
      { item: "Link building", detail: "6–8 quality placements per month" },
      {
        item: "Reporting and strategy review",
        detail: "Monthly dashboard + quarterly QBR",
      },
    ],
    pricing: [
      {
        line: "SEO retainer",
        qty: "12 months",
        rate: "$7,200/mo",
        total: "$86,400",
      },
      {
        line: "Content top-up",
        qty: "12 articles",
        rate: "$450 each",
        total: "$5,400",
      },
      {
        line: "Technical audit",
        qty: "1 project",
        rate: "fixed",
        total: "$4,200",
      },
    ],
    total: "$96,000",
    note: "Audit invoiced at project start. Monthly retainer from month 1.",
  },
  {
    id: "canpango",
    label: "Content and SEO proposal",
    co: "Canpango",
    type: "Proposal",
    value: "$27.9K",
    accentColor: "#7A4EDB",
    accentBg: "#F0EBFB",
    from: "Acme Agency",
    to: "Canpango",
    contact: "Mike Alvarez, Head of Growth",
    date: "17 May 2026",
    ref: "PROP-2026-043",
    term: "6 months",
    start: "1 July 2026",
    intro:
      "Following your enquiry, we are pleased to submit this proposal for SEO and content services. Canpango is entering a competitive SaaS search landscape and we believe a focused 6-month programme will establish clear organic authority in your category.",
    scope: [
      {
        item: "Keyword research and opportunity mapping",
        detail: "Category analysis, competitor gap, priority keyword set",
      },
      {
        item: "On-page SEO",
        detail:
          "Title tags, meta, heading structure, internal linking across site",
      },
      {
        item: "Content production",
        detail: "8 long-form articles per month targeting high-intent terms",
      },
      {
        item: "Weekly performance reporting",
        detail: "Keyword rankings, organic sessions, conversion tracking",
      },
    ],
    pricing: [
      {
        line: "SEO and content retainer",
        qty: "6 months",
        rate: "$3,800/mo",
        total: "$22,800",
      },
      {
        line: "Onboarding and site audit",
        qty: "1 project",
        rate: "fixed",
        total: "$2,400",
      },
      {
        line: "Content top-up",
        qty: "12 articles",
        rate: "$225 each",
        total: "$2,700",
      },
    ],
    total: "$27,900",
    note: "Onboarding invoiced at project start. Retainer monthly.",
  },
  {
    id: "proval",
    label: "Content and paid search proposal",
    co: "Proval Consulting",
    type: "Proposal",
    value: "$54K",
    accentColor: "var(--ink2)",
    accentBg: "#EFEFF7",
    from: "Acme Agency",
    to: "Proval Consulting",
    contact: "Jane Crawford, Marketing Director",
    date: "18 May 2026",
    ref: "PROP-2026-044",
    term: "12 months",
    start: "1 June 2026",
    intro:
      "Referred by David Chen at Marketwake, we are delighted to submit this proposal. Proval Consulting is looking to build brand authority through thought leadership content and generate qualified leads through paid search.",
    scope: [
      {
        item: "Thought leadership content",
        detail: "2 long-form articles and 1 case study per month",
      },
      {
        item: "Google Ads management",
        detail:
          "Campaign setup, keyword bidding, ad copy, monthly optimisation",
      },
      {
        item: "LinkedIn Ads",
        detail: "Sponsored content targeting finance and operations leaders",
      },
      {
        item: "Monthly reporting and strategy review",
        detail: "Lead volume, cost per lead, content performance",
      },
    ],
    pricing: [
      {
        line: "Content retainer",
        qty: "12 months",
        rate: "$2,200/mo",
        total: "$26,400",
      },
      {
        line: "Google Ads management",
        qty: "12 months",
        rate: "$1,800/mo",
        total: "$21,600",
      },
      {
        line: "LinkedIn Ads management",
        qty: "12 months",
        rate: "$500/mo",
        total: "$6,000",
      },
    ],
    total: "$54,000",
    note: "Ad spend billed directly to client. Management fees only.",
  },
];

interface EntryCard {
  id: EntryId;
  ic: string;
  icBg: string;
  icFg: string;
  label: string;
  desc: string;
  bullets: string[];
  recommended: boolean;
  cta: string;
  dashed?: boolean;
}

// ── API inbox type ────────────────────────────────────────────────────────────
interface ApiInboxItem {
  partitionKey: string;
  rowKey: string;
  subject: string | null;
  content: string | null;
  from: string | null;
  fromName: string | null;
  to: string | null;
  provider: string | null;
  receivedAt: string;
}
const CARDS: EntryCard[] = [
  {
    id: "thread",
    ic: "mail",
    icBg: "var(--pp)",
    icFg: "var(--p)",
    label: "Analyse one thread",
    desc: "Paste or forward one email conversation",
    bullets: [
      "Finds gaps, risks, and next actions instantly",
      "No connection needed · takes 30 seconds",
    ],
    recommended: true,
    cta: "Paste a thread",
  },
  {
    id: "upload",
    ic: "file-text",
    icBg: "var(--tp)",
    icFg: "var(--td)",
    label: "Upload a document",
    desc: "Drop a proposal, SOW, invoice, or contract",
    bullets: [
      "Extracts scope, pricing, stakeholders, timeline",
      "No connection needed · takes 60 seconds",
    ],
    recommended: false,
    cta: "Upload a file",
  },
  {
    id: "empty",
    ic: "plus-circle",
    icBg: "var(--bg3)",
    icFg: "var(--ink3)",
    label: "Start empty",
    desc: "Name a customer and open a blank workspace",
    bullets: [
      "Add notes, logs, and context as you go",
      "Zero setup · always available",
    ],
    recommended: false,
    cta: "Name a customer",
  },
  {
    id: "tour",
    ic: "compass",
    icBg: "var(--amberp)",
    icFg: "var(--amber)",
    label: "Quick tour",
    desc: "Browse a live workspace with sample data",
    bullets: [
      "See Pulse, Opportunities, Renewals, Finance at maturity",
      "No setup · sample data only",
    ],
    recommended: false,
    cta: "Start tour",
    dashed: true,
  },
];

// ── DocPreview ────────────────────────────────────────────────────────────────
const DocPreview: React.FC<{ doc: (typeof DOC_SAMPLES)[number] }> = ({
  doc,
}) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 6,
      boxShadow: "0 1px 6px rgba(0,0,0,.09), 0 0 0 .5px rgba(0,0,0,.06)",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        background: doc.accentColor,
        padding: "14px 18px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: '"Sora",sans-serif',
            fontSize: 14,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          Proposal
        </div>
        <div
          style={{
            fontSize: 10.5,
            color: "rgba(255,255,255,.7)",
            marginTop: 2,
          }}
        >
          {doc.type} · {doc.co}
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div
          style={{
            fontSize: 10,
            fontFamily: '"DM Mono",monospace',
            color: "rgba(255,255,255,.6)",
          }}
        >
          {doc.ref}
        </div>
        <div
          style={{ fontSize: 10, color: "rgba(255,255,255,.5)", marginTop: 1 }}
        >
          {doc.date}
        </div>
      </div>
    </div>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        borderBottom: ".5px solid #eee",
      }}
    >
      {[
        { l: "Prepared by", v: doc.from },
        { l: "Prepared for", v: doc.to },
        { l: "Contact", v: doc.contact },
        { l: "Term / Start", v: `${doc.term} · ${doc.start}` },
      ].map((r, ri) => (
        <div
          key={ri}
          style={{
            padding: "10px 18px",
            borderRight: ri % 2 === 0 ? ".5px solid #eee" : "none",
            borderBottom: ri < 2 ? ".5px solid #eee" : "none",
          }}
        >
          <div
            style={{
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: ".09em",
              textTransform: "uppercase",
              color: "#aaa",
              marginBottom: 3,
            }}
          >
            {r.l}
          </div>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: "#111" }}>
            {r.v}
          </div>
        </div>
      ))}
    </div>
    <div style={{ padding: "12px 18px", borderBottom: ".5px solid #eee" }}>
      <div
        style={{
          fontSize: "9px",
          fontWeight: 600,
          letterSpacing: ".09em",
          textTransform: "uppercase",
          color: "#aaa",
          marginBottom: 5,
        }}
      >
        Introduction
      </div>
      <div style={{ fontSize: 11.5, color: "#444", lineHeight: 1.65 }}>
        {doc.intro}
      </div>
    </div>
    <div style={{ padding: "12px 18px", borderBottom: ".5px solid #eee" }}>
      <div
        style={{
          fontSize: "9px",
          fontWeight: 600,
          letterSpacing: ".09em",
          textTransform: "uppercase",
          color: "#aaa",
          marginBottom: 8,
        }}
      >
        Scope of work
      </div>
      {doc.scope.map((s, si) => (
        <div
          key={si}
          style={{
            display: "flex",
            gap: 9,
            padding: "6px 0",
            borderBottom:
              si < doc.scope.length - 1 ? ".5px solid #f0f0f0" : "none",
          }}
        >
          <div
            style={{
              width: 17,
              height: 17,
              borderRadius: 4,
              background: "#EEEDF9",
              color: "#5552C9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: 9,
              fontWeight: 700,
              marginTop: 1,
            }}
          >
            {si + 1}
          </div>
          <div>
            <div
              style={{
                fontSize: 11.5,
                fontWeight: 600,
                color: "#111",
                marginBottom: 1,
              }}
            >
              {s.item}
            </div>
            <div style={{ fontSize: 10.5, color: "#777" }}>{s.detail}</div>
          </div>
        </div>
      ))}
    </div>
    <div style={{ padding: "12px 18px" }}>
      <div
        style={{
          fontSize: "9px",
          fontWeight: 600,
          letterSpacing: ".09em",
          textTransform: "uppercase",
          color: "#aaa",
          marginBottom: 8,
        }}
      >
        Investment
      </div>
      {doc.pricing.map((p, pi) => (
        <div
          key={pi}
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 8,
            fontSize: 11.5,
            padding: "5px 0",
            borderBottom: ".5px solid #f0f0f0",
          }}
        >
          <span style={{ color: "#333", flex: 1 }}>{p.line}</span>
          <span style={{ color: "#888", flexShrink: 0, fontSize: 10.5 }}>
            {p.qty} · {p.rate}
          </span>
          <span style={{ color: "#111", fontWeight: 600, flexShrink: 0 }}>
            {p.total}
          </span>
        </div>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 8,
          paddingTop: 8,
          borderTop: "1.5px solid #ddd",
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 700, color: "#111" }}>
          Total
        </span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#5552C9" }}>
          {doc.total}
        </span>
      </div>
      <div style={{ fontSize: 10.5, color: "#aaa", marginTop: 6 }}>
        {doc.note}
      </div>
    </div>
  </div>
);

// ── EmptyEntryLive ────────────────────────────────────────────────────────────
const EmptyEntryLive: React.FC<{
  inputText: string;
  setInputText: (v: string) => void;
  handleEmpty: () => void;
}> = ({ inputText, setInputText, handleEmpty }) => {
  const [placeholder, setPlaceholder] = useState("");
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [healthVals, setHealthVals] = useState([0, 0, 0]);
  const [gapVisible, setGapVisible] = useState([false, false, false]);
  const [wsVisible, setWsVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const name = inputText.trim();
  const initials = name
    ? name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0] || "")
        .join("")
        .toUpperCase()
    : "";
  const avColors = ["#5552C9", "#1A9E7C", "#D97757", "#3F75DC", "#7A4EDB"];
  const avColor = name
    ? avColors[name.charCodeAt(0) % avColors.length]
    : avColors[0];

  useEffect(() => {
    if (inputText) return;
    const current = DEMO_NAMES[phaseIdx];
    if (!deleting && charIdx <= current.length) {
      const t = setTimeout(
        () => {
          setPlaceholder(current.slice(0, charIdx));
          setCharIdx((c) => c + 1);
        },
        charIdx === 0 ? 600 : 80,
      );
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx > current.length) {
      const t = setTimeout(() => setDeleting(true), 1400);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => {
        setPlaceholder(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, 40);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhaseIdx((p) => (p + 1) % DEMO_NAMES.length);
    }
  }, [inputText, charIdx, deleting, phaseIdx]);

  useEffect(() => {
    if (name.length >= 2) {
      setWsVisible(true);
      const t1 = setTimeout(
        () =>
          setHealthVals([
            Math.floor(30 + Math.random() * 50),
            Math.floor(20 + Math.random() * 40),
            0,
          ]),
        300,
      );
      const t2 = setTimeout(() => setGapVisible([true, false, false]), 600);
      const t3 = setTimeout(() => setGapVisible([true, true, false]), 900);
      const t4 = setTimeout(() => setGapVisible([true, true, true]), 1200);
      return () => [t1, t2, t3, t4].forEach(clearTimeout);
    } else {
      setWsVisible(false);
      setHealthVals([0, 0, 0]);
      setGapVisible([false, false, false]);
    }
  }, [name]);

  const HEALTH_META = [
    { l: "Relationship", color: "#D97757" },
    { l: "Deal health", color: "#D97757" },
    { l: "Renewal risk", color: "var(--ink4)" },
  ];
  const GAPS = [
    "Budget presence unclear",
    "Decision-maker not confirmed",
    "Timeline not captured",
  ];

  return (
    <div>
      <div className="qs-input-card">
        <div style={{ padding: "20px 22px 16px" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "var(--ink4)",
              marginBottom: 10,
              letterSpacing: ".02em",
            }}
          >
            Customer or company name
          </div>
          <div style={{ position: "relative" }}>
            <input
              ref={inputRef}
              style={{
                width: "100%",
                height: 52,
                padding: "0 52px 0 16px",
                fontSize: 18,
                fontFamily: '"Sora",sans-serif',
                fontWeight: 600,
                letterSpacing: "-.02em",
                border: "1.5px solid var(--brd2)",
                borderRadius: 12,
                background: "var(--bg)",
                color: "var(--ink)",
                outline: "none",
                transition: "border-color .15s, box-shadow .15s",
                boxSizing: "border-box",
              }}
              placeholder={placeholder || "e.g. Acme Corp"}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--p)";
                e.target.style.boxShadow = "0 0 0 3px rgba(75,72,200,.09)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--brd2)";
                e.target.style.boxShadow = "none";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputText.trim()) handleEmpty();
              }}
              autoFocus
            />
            {name && (
              <div
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: avColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {initials}
              </div>
            )}
          </div>
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}
          >
            {EXAMPLE_CHIPS.map((ex, i) => (
              <button
                key={i}
                onClick={() => {
                  setInputText(ex.name);
                  setTimeout(() => inputRef.current?.focus(), 50);
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  height: 28,
                  padding: "0 11px",
                  borderRadius: 20,
                  background:
                    inputText === ex.name ? "var(--pp)" : "var(--bg3)",
                  border:
                    inputText === ex.name
                      ? "1px solid var(--p)"
                      : ".5px solid var(--brd2)",
                  fontSize: 11.5,
                  color: inputText === ex.name ? "var(--p)" : "var(--ink3)",
                  fontFamily: "inherit",
                  cursor: "pointer",
                  transition: "all .12s",
                  fontWeight: inputText === ex.name ? 600 : 400,
                }}
              >
                <span
                  style={{
                    fontSize: 9,
                    fontFamily: '"DM Mono",monospace',
                    color: inputText === ex.name ? "var(--p)" : "var(--ink5)",
                    fontWeight: 600,
                  }}
                >
                  {ex.industry}
                </span>
                {ex.name}
              </button>
            ))}
          </div>
        </div>

        {/* Live preview */}
        <div
          style={{
            borderTop: ".5px solid var(--brd)",
            padding: "14px 22px 16px",
            background: wsVisible
              ? "linear-gradient(135deg,var(--pp) 0%,var(--bg2) 60%)"
              : "var(--bg3)",
            transition: "background .4s",
          }}
        >
          {!wsVisible ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                opacity: 0.5,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: "var(--brd)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name="building-2" size={14} />
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--ink5)",
                  fontStyle: "italic",
                }}
              >
                Your workspace will appear here as you type…
              </div>
            </div>
          ) : (
            <div style={{ animation: "qs-fadein .3s ease-out" }}>
              <div className="qs-ws-preview-row">
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: avColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  {initials}
                </div>
                <div
                  style={{
                    fontFamily: '"Sora",sans-serif',
                    fontSize: 15,
                    fontWeight: 650,
                    color: "var(--ink)",
                    letterSpacing: "-.02em",
                    flex: 1,
                  }}
                >
                  {name}
                </div>
                <span
                  style={{
                    fontSize: 9.5,
                    fontFamily: '"DM Mono",monospace',
                    fontWeight: 600,
                    padding: "2px 8px",
                    borderRadius: 5,
                    background: "var(--p)",
                    color: "#fff",
                    letterSpacing: ".04em",
                    textTransform: "uppercase",
                  }}
                >
                  New workspace
                </span>
              </div>
              <div className="qs-ws-health-row">
                {HEALTH_META.map((h, i) => (
                  <div key={i} className="qs-ws-health-card">
                    <div
                      style={{
                        fontSize: "9px",
                        fontWeight: 600,
                        letterSpacing: ".07em",
                        textTransform: "uppercase",
                        color: "var(--ink5)",
                        marginBottom: 4,
                      }}
                    >
                      {h.l}
                    </div>
                    <div
                      style={{
                        fontFamily: '"Sora",sans-serif',
                        fontSize: 18,
                        fontWeight: 650,
                        color: healthVals[i] > 0 ? h.color : "var(--ink6)",
                        transition: "color .4s",
                        letterSpacing: "-.02em",
                      }}
                    >
                      {healthVals[i] > 0 ? healthVals[i] : "—"}
                    </div>
                    <div
                      style={{
                        height: 3,
                        background: "var(--bg3)",
                        borderRadius: 2,
                        overflow: "hidden",
                        marginTop: 5,
                      }}
                    >
                      <div
                        style={{
                          width: healthVals[i] + "%",
                          height: "100%",
                          background: h.color,
                          borderRadius: 2,
                          transition: "width .6s ease-out",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  color: "var(--ink5)",
                  marginBottom: 6,
                }}
              >
                Open gaps — Zotra is asking
              </div>
              {GAPS.map((g, i) => (
                <div
                  key={i}
                  className="qs-gap-row"
                  style={{
                    background: gapVisible[i] ? "var(--wab)" : "var(--bg3)",
                    border: gapVisible[i]
                      ? ".5px solid rgba(193,123,42,.2)"
                      : ".5px solid var(--brd)",
                    opacity: gapVisible[i] ? 1 : 0.3,
                    transform: gapVisible[i]
                      ? "translateX(0)"
                      : "translateX(-8px)",
                  }}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 4,
                      background: gapVisible[i] ? "var(--wa)" : "var(--ink6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "background .3s",
                    }}
                  >
                    <Icon name="circle-alert" size={9} />
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      fontWeight: 500,
                      color: gapVisible[i] ? "var(--ink)" : "var(--ink5)",
                    }}
                  >
                    {g}
                  </div>
                  <div
                    style={{
                      marginLeft: "auto",
                      fontSize: 10,
                      fontFamily: '"DM Mono",monospace',
                      color: "var(--wa)",
                      fontWeight: 600,
                      opacity: gapVisible[i] ? 1 : 0,
                    }}
                  >
                    gap
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          style={{
            padding: "12px 22px",
            borderTop: ".5px solid var(--brd)",
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <button
            className="btn pri"
            style={{
              height: 36,
              flex: 1,
              justifyContent: "center",
              opacity: name ? 1 : 0.45,
              transition: "opacity .2s",
            }}
            disabled={!name}
            onClick={handleEmpty}
          >
            <Icon name="arrow-right" size={13} /> Open {name || "workspace"}
          </button>
        </div>
      </div>
      <div
        style={{
          fontSize: 11.5,
          color: "var(--ink5)",
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        Zotra starts with zero data and builds commercial memory as you log
        interactions.
      </div>
    </div>
  );
};

// ── HealthCards ───────────────────────────────────────────────────────────────
const HealthCards: React.FC<{
  parsed: string;
  health: { l: string; v: string; color: string; fill: number }[];
  gaps: { t: string; s: string }[];
}> = ({ parsed, health, gaps }) => (
  <div className="qs-health-wrap">
    <div className="qs-health-name">
      {parsed}
      <span
        style={{
          fontSize: 10,
          fontFamily: '"DM Mono",monospace',
          fontWeight: 600,
          padding: "2px 8px",
          borderRadius: 5,
          background: "var(--p)",
          color: "#fff",
          letterSpacing: ".04em",
          textTransform: "uppercase",
        }}
      >
        New workspace
      </span>
    </div>
    <div style={{ fontSize: 12, color: "var(--ink4)" }}>
      Zotra is filling gaps in the background
    </div>
    <div className="qs-health-cards">
      {health.map((h, i) => (
        <div key={i} className="qs-health-card">
          <div
            style={{
              fontSize: "9.5px",
              fontWeight: 600,
              letterSpacing: ".07em",
              textTransform: "uppercase",
              color: "var(--ink5)",
              marginBottom: 5,
            }}
          >
            {h.l}
          </div>
          <div
            style={{
              fontFamily: '"Sora",sans-serif',
              fontSize: 20,
              fontWeight: 650,
              letterSpacing: "-.02em",
              color: h.color,
            }}
          >
            {h.v}
          </div>
          <div
            style={{
              height: 3,
              background: "var(--bg3)",
              borderRadius: 2,
              overflow: "hidden",
              marginTop: 5,
            }}
          >
            <div
              style={{
                width: `${h.fill}%`,
                height: "100%",
                borderRadius: 2,
                background: h.color,
                transition: "width .7s ease-out",
              }}
            />
          </div>
        </div>
      ))}
    </div>
    {gaps.length > 0 && (
      <div style={{ marginTop: 14 }}>
        <div
          style={{
            fontSize: "9.5px",
            fontWeight: 600,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: "var(--ink5)",
            marginBottom: 6,
          }}
        >
          Open gaps
        </div>
        {gaps.map((g, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 9,
              padding: "9px 12px",
              background: "var(--wab)",
              border: ".5px solid rgba(193,123,42,.2)",
              borderRadius: 9,
              marginBottom: 5,
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 5,
                background: "var(--wa)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              <Icon name="circle-alert" size={11} />
            </div>
            <div>
              <div
                style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}
              >
                {g.t}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--ink4)",
                  marginTop: 1,
                  lineHeight: 1.4,
                }}
              >
                {g.s}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// ── Shell ─────────────────────────────────────────────────────────────────────
const Shell: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="qs-shell">
    <div className="qs-scroll">
      <div className="qs-inner">{children}</div>
    </div>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const QuickStartView: React.FC<QuickStartViewProps> = ({
  setView,
  setTenantAge,
  setOpenAcc,
}) => {
  const [step, setStep] = useState(0);
  const [entry, setEntry] = useState<EntryId | null>(null);
  const [inputText, setInputText] = useState("");
  const [parsed, setParsed] = useState<string | null>(null);
  const [health] = useState([
    { l: "Relationship", v: "—", color: "var(--ink5)", fill: 0 },
    { l: "Deal health", v: "—", color: "var(--ink5)", fill: 0 },
    { l: "Renewal risk", v: "—", color: "var(--ink5)", fill: 0 },
  ]);
  const [gaps] = useState([
    {
      t: "Budget presence unclear",
      s: "Add a deal value or mention budget to resolve this.",
    },
    {
      t: "Decision-maker not confirmed",
      s: "Who has the final say? Log the contact name to close this.",
    },
    { t: "Timeline not captured", s: "When is the decision expected?" },
  ]);
  const [previewThread, setPreviewThread] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<string | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<
    (typeof DOC_SAMPLES)[number] | null
  >(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  // ── Demo inbox API state ──────────────────────────────────────────────────
  const [inboxItems, setInboxItems] = useState<ApiInboxItem[]>([]);
  const [inboxLoading, setInboxLoading] = useState(false);
  const [analyseLoading, setAnalyseLoading] = useState(false);
  const [analyseResult, setAnalyseResult] = useState<{
    success: boolean;
    message: string;
    zotrademoId?: string;
  } | null>(null);
  const [selectedInbox, setSelectedInbox] = useState<ApiInboxItem | null>(null);

  // ── Thread tab state ──────────────────────────────────────────────────────
  const [threadTab, setThreadTab] = useState<"compose" | "sample">("compose");
  const [composeFields, setComposeFields] = useState({ from: "", subject: "" });
  const [composeSalutation, setComposeSalutation] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [composeSent, setComposeSent] = useState(false);
  const [composeLoading, setComposeLoading] = useState(false);
  const [composeResult, setComposeResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const getTenantId = (): string => {
    try {
      const raw = localStorage.getItem("zotra_saved_session");
      if (!raw) return "";
      const s = JSON.parse(raw);
      if (Date.now() - (s.savedAt ?? 0) > 30 * 24 * 60 * 60 * 1000) return "";
      return s.tenantId ?? "";
    } catch {
      return "";
    }
  };

  const fetchInbox = useCallback(async () => {
    setInboxLoading(true);
    try {
      const token = getToken();
      const tenantId = getTenantId();
      const params = new URLSearchParams();
      if (tenantId) params.set("partitionKey", tenantId);
      const qs = params.toString() ? `?${params.toString()}` : "";
      const res = await apiFetch(`${baseUrl()}/demo/inbox${qs}`, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ApiInboxItem[] = await res.json();
      setInboxItems(data);
    } catch {
      setInboxItems([]);
    } finally {
      setInboxLoading(false);
    }
  }, []);

  const handleAnalyseApiForItem = async (item: ApiInboxItem) => {
    setAnalyseLoading(true);
    setAnalyseResult(null);
    try {
      const token = getToken();
      const tenantId = item.partitionKey || getTenantId();
      const params = new URLSearchParams({ inboxId: item.rowKey });
      if (tenantId) params.set("partitionKey", tenantId);

      const res = await apiFetch(
        `${baseUrl()}/demo/intake-email?${params.toString()}`,
        {
          method: "POST",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        },
      );

      let data: { success?: boolean; message?: string; zotrademoId?: string } =
        {};
      try {
        data = await res.json();
      } catch {
        /* non-JSON body */
      }

      const success = data.success ?? res.ok;
      setAnalyseResult({
        success,
        message:
          data.message ??
          (res.ok
            ? "Demo intake queued successfully."
            : `Request failed (${res.status}).`),
        zotrademoId: data.zotrademoId,
      });
      if (success) {
        const n = parseName(
          item.fromName || item.from || item.subject || "Customer",
        );
        setParsed(n);
        setSubmittedName(n);
      }
    } catch (e: unknown) {
      console.error("[handleAnalyseApiForItem]", e);
      setAnalyseResult({
        success: false,
        message: e instanceof Error ? e.message : "Network error",
      });
    } finally {
      setAnalyseLoading(false);
    }
  };

  const handleAnalyseApi = async () => {
    if (!selectedInbox) return;
    await handleAnalyseApiForItem(selectedInbox);
  };

  const handleComposeApi = async () => {
    if (!composeBody.trim()) return;
    setComposeLoading(true);
    setComposeResult(null);
    try {
      const token = getToken();
      const res = await apiFetch(`${baseUrl()}/demo/compose-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          from: composeFields.from,
          to: "info@zotra.com",
          subject: composeFields.subject,
          content: composeBody,
        }),
      });
      let data: { success?: boolean; message?: string } = {};
      try {
        data = await res.json();
      } catch {
        /* non-JSON */
      }
      const success = data.success ?? res.ok;
      setComposeResult({
        success,
        message:
          data.message ??
          (res.ok
            ? "Email sent successfully."
            : `Request failed (${res.status}).`),
      });
      if (success) {
        setComposeSent(true);
        const n = parseName(
          composeFields.from || composeFields.subject || "Customer",
        );
        setParsed(n);
        setSubmittedName(n);
      }
    } catch (e: unknown) {
      setComposeResult({
        success: false,
        message: e instanceof Error ? e.message : "Network error",
      });
    } finally {
      setComposeLoading(false);
    }
  };

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  // Inject styles once
  useEffect(() => {
    if (document.getElementById("qs-styles")) return;
    const s = document.createElement("style");
    s.id = "qs-styles";
    s.textContent = QS_STYLES;
    document.head.appendChild(s);
    return () => {
      document.getElementById("qs-styles")?.remove();
    };
  }, []);

  // Fetch demo inbox when thread entry is opened
  useEffect(() => {
    if ((entry === "thread" || entry === "connect") && step === 1) {
      fetchInbox();
      setAnalyseResult(null);
      setSelectedInbox(null);
    }
  }, [entry, step, fetchInbox]);

  const goToWorkspace = (customerName: string) => {
    setTenantAge?.("week1");
    setView?.("accounts");
    setTimeout(() => setOpenAcc?.(null), 80);
  };
  const handleAnalyse = () => {
    if (!inputText.trim()) return;
    const n = parseName(inputText);
    setParsed(n);
    setSubmittedName(n);
    setSubmitted(true);
  };
  const handleEmpty = () => {
    if (!inputText.trim()) return;
    const n = parseName(inputText);
    setParsed(n);
    setSubmittedName(n);
    setSubmitted(true);
  };

  // ── Step 0: card picker ───────────────────────────────────────────────────
  if (step === 0)
    return (
      <Shell>
        {/* Hero */}
        <div className="qs-hero">
          <div className="qs-hero-orb1" />
          <div className="qs-hero-orb2" />
          <div className="qs-hero-body">
            <div className="qs-hero-eyebrow">
              <span className="qs-hero-dot" />
              {greeting} · Zotra is ready
            </div>
            <div className="qs-hero-title">
              Hi. Pick one customer
              <br />
              <span style={{ opacity: 0.75 }}>
                No connections needed to begin.
              </span>
            </div>
            <div className="qs-hero-pills">
              {[
                { ic: "check", l: "No inbox needed" },
                { ic: "check", l: "Takes 30 seconds" },
                { ic: "check", l: "You approve everything" },
              ].map((p, i) => (
                <span key={i} className="qs-hero-pill">
                  <Icon name={p.ic} size={11} />
                  {p.l}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Entry cards */}
        <div className="qs-cards">
          {CARDS.map((card) => (
            <div
              key={card.id}
              className={`qs-card${card.recommended ? " qs-card-recommended" : ""}`}
              style={{
                border: card.recommended
                  ? undefined
                  : card.dashed
                    ? "1.5px dashed var(--brd2)"
                    : ".5px solid var(--brd)",
                boxShadow: card.dashed ? "none" : "var(--sh-s)",
              }}
              onClick={() => {
                setEntry(card.id);
                setStep(1);
              }}
            >
              {card.recommended && (
                <span className="qs-recommended-badge">Recommended</span>
              )}
              <div
                className="qs-card-ic"
                style={{ background: card.icBg, color: card.icFg }}
              >
                <Icon name={card.ic} size={18} />
              </div>
              <div className="qs-card-body">
                <div className="qs-card-title">{card.label}</div>
                <div className="qs-card-desc">{card.desc}</div>
                <div className="qs-card-bullets">
                  {card.bullets.map((b, i) => (
                    <div key={i} className="qs-card-bullet">
                      <span className="qs-card-bullet-dot" />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
              <div className="qs-card-chev">
                <Icon name="chevron-right" size={16} />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="qs-footer-links">
          Already have data elsewhere?{" "}
          {["Connect CRM", "Import CSV", "Connect inbox"].map((l, i) => (
            <React.Fragment key={l}>
              {i > 0 && <span className="qs-footer-sep">·</span>}
              <span
                className="qs-footer-link"
                onClick={() => {
                  setEntry("connect");
                  setStep(1);
                }}
              >
                {l}
              </span>
            </React.Fragment>
          ))}
        </div>
      </Shell>
    );

  // ── Submitted state ───────────────────────────────────────────────────────
  if (submitted)
    return (
      <Shell>
        <div className="qs-submitted-hero">
          <div className="qs-submitted-ic">
            <Icon name="sparkles" size={24} />
          </div>
          <div
            style={{
              fontFamily: '"Sora",sans-serif',
              fontSize: 22,
              fontWeight: 650,
              letterSpacing: "-.025em",
              color: "var(--ink)",
              marginBottom: 8,
            }}
          >
            Zotra is building your workspace
          </div>
          <div
            style={{
              fontSize: 13.5,
              color: "var(--ink3)",
              lineHeight: 1.6,
              maxWidth: 380,
              margin: "0 auto 28px",
            }}
          >
            Scanning for signals, extracting context, and opening a workspace
            for{" "}
            <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
              {submittedName}
            </strong>
            .
          </div>
          <button
            className="btn pri"
            style={{
              height: 44,
              fontSize: 14,
              padding: "0 28px",
              borderRadius: 12,
            }}
            onClick={() => goToWorkspace(submittedName)}
          >
            <Icon name="arrow-right" size={15} /> Open {submittedName} workspace
          </button>
          <div style={{ marginTop: 14 }}>
            <span
              style={{
                fontSize: 12,
                color: "var(--ink5)",
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
              onClick={() => {
                setSubmitted(false);
                setStep(0);
              }}
            >
              Start over
            </span>
          </div>
        </div>
        <div className="qs-checklist">
          {[
            { ic: "search", t: "Scanning for existing signals", done: true },
            { ic: "user", t: "Customer profile created", done: true },
            { ic: "activity", t: "Health scoring in progress", done: false },
            { ic: "circle-alert", t: "Gap detection running", done: false },
          ].map((item, i) => (
            <div key={i} className="qs-check-item">
              <div
                className="qs-check-ic"
                style={{ background: item.done ? "var(--okb)" : "var(--bg3)" }}
              >
                <Icon name={item.done ? "check" : item.ic} size={13} />
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  color: item.done ? "var(--ink)" : "var(--ink4)",
                  fontWeight: item.done ? 500 : 400,
                }}
              >
                {item.t}
              </div>
              {!item.done && <div className="qs-spin" />}
            </div>
          ))}
        </div>
      </Shell>
    );

  // ── Step 1 ────────────────────────────────────────────────────────────────
  const card = CARDS.find((c) => c.id === entry) || CARDS[0];

  if (step === 1)
    return (
      <Shell>
        {entry !== "thread" && entry !== "connect" && (
          <div className="qs-step-back">
            <button
              className="btn ghost sm"
              onClick={() => {
                setStep(0);
                setEntry(null);
                setInputText("");
                setSelectedDoc(null);
                setPreviewThread(null);
                setPreviewDoc(null);
                setThreadTab("compose");
                setComposeFields({ from: "", subject: "" });
                setComposeSalutation("");
                setComposeBody("");
                setComposeSent(false);
                setSelectedInbox(null);
                setAnalyseResult(null);
              }}
            >
              <Icon name="arrow-left" size={12} /> Back
            </button>
            <span className="qs-step-label">{card.label}</span>
          </div>
        )}

        {/* Thread */}
        {(entry === "thread" || entry === "connect") && (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <div className="qs-eyebrow" style={{ marginBottom: 0 }}>
                <span className="qs-eyebrow-dot" /> Send a thread
              </div>
              <button
                className="btn ghost sm"
                onClick={() => {
                  setStep(0);
                  setEntry(null);
                  setInputText("");
                  setSelectedDoc(null);
                  setPreviewThread(null);
                  setPreviewDoc(null);
                  setThreadTab("compose");
                  setComposeFields({ from: "", subject: "" });
                  setComposeSalutation("");
                  setComposeBody("");
                  setComposeSent(false);
                  setSelectedInbox(null);
                  setAnalyseResult(null);
                }}
              >
                <Icon name="arrow-left" size={12} /> Back
              </button>
            </div>
            <div className="qs-step-title">Send an email thread</div>
            <div className="qs-step-sub">
              Compose your own email or pick a sample thread. Zotra will find
              the customer, extract context, and surface gaps and next actions.
            </div>

            {/* ── Tabs ── */}
            <div
              style={{
                display: "flex",
                gap: 0,
                marginBottom: 0,
                borderBottom: ".5px solid var(--brd)",
              }}
            >
              {[
                { id: "compose", label: "Compose", icon: "pencil" },
                { id: "sample", label: "Sample thread", icon: "mail" },
              ].map((tab) => {
                const isActive = threadTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setThreadTab(tab.id as "compose" | "sample");
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "10px 18px",
                      fontSize: 12.5,
                      fontWeight: isActive ? 600 : 500,
                      fontFamily: "inherit",
                      color: isActive ? "var(--p)" : "var(--ink4)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      borderBottom: isActive
                        ? "2px solid var(--p)"
                        : "2px solid transparent",
                      marginBottom: -1,
                      transition: "color .13s",
                    }}
                  >
                    <Icon name={tab.icon} size={12} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div
              className="qs-input-card"
              style={{
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderTop: "none",
              }}
            >
              <div className="qs-input-pad">
                {/* ── Tab 1: Compose — user writes their own email ── */}
                {threadTab === "compose" && (
                  <>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--ink4)",
                        marginBottom: 14,
                        lineHeight: 1.5,
                      }}
                    >
                      Write your email below. Zotra reads it and surfaces gaps
                      and next actions.
                    </div>

                    {/* ── Sent confirmation state ── */}
                    {composeSent ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: "28px 0 20px",
                          gap: 12,
                          animation: "qs-fadein .3s ease-out",
                        }}
                      >
                        <div
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: 14,
                            background: "var(--okb)",
                            border: ".5px solid rgba(29,158,117,.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Icon
                            name="check-circle"
                            size={24}
                            style={{ color: "var(--ok)" }}
                          />
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: "var(--ink)",
                              marginBottom: 4,
                            }}
                          >
                            Thread sent
                          </div>
                          <div
                            style={{
                              fontSize: 12,
                              color: "var(--ink4)",
                              lineHeight: 1.5,
                            }}
                          >
                            Zotra received your email and is building the
                            workspace.
                          </div>
                        </div>
                        <button
                          className="btn pri"
                          style={{ height: 34, fontSize: 12, marginTop: 4 }}
                          onClick={() => setSubmitted(true)}
                        >
                          <Icon name="arrow-right" size={12} /> Open workspace
                        </button>
                        <span
                          style={{
                            fontSize: 11,
                            color: "var(--ink5)",
                            cursor: "pointer",
                            textDecoration: "underline",
                            textUnderlineOffset: 3,
                          }}
                          onClick={() => {
                            setComposeSent(false);
                            setComposeFields({ from: "", subject: "" });
                            setComposeBody("");
                            setComposeResult(null);
                          }}
                        >
                          Send another
                        </span>
                      </div>
                    ) : (
                      <>
                        {/* Fields: From, To (locked), Subject */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            marginBottom: 12,
                          }}
                        >
                          {/* From — editable */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 11,
                                fontWeight: 600,
                                color: "var(--ink4)",
                                width: 52,
                                flexShrink: 0,
                                fontFamily: '"DM Mono",monospace',
                                letterSpacing: ".03em",
                              }}
                            >
                              From
                            </span>
                            <input
                              style={{
                                flex: 1,
                                height: 32,
                                padding: "0 12px",
                                fontSize: 12.5,
                                fontFamily: "inherit",
                                border: ".5px solid var(--brd2)",
                                borderRadius: 8,
                                background: "var(--bg)",
                                color: "var(--ink)",
                                outline: "none",
                                transition: "border-color .15s",
                              }}
                              placeholder="client@example.com"
                              value={composeFields.from}
                              onChange={(e) =>
                                setComposeFields((prev) => ({
                                  ...prev,
                                  from: e.target.value,
                                }))
                              }
                              onFocus={(e) => {
                                e.target.style.borderColor = "var(--p)";
                                e.target.style.boxShadow =
                                  "0 0 0 2px rgba(75,72,200,.08)";
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = "var(--brd2)";
                                e.target.style.boxShadow = "none";
                              }}
                            />
                          </div>

                          {/* To — fixed, read-only */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 11,
                                fontWeight: 600,
                                color: "var(--ink4)",
                                width: 52,
                                flexShrink: 0,
                                fontFamily: '"DM Mono",monospace',
                                letterSpacing: ".03em",
                              }}
                            >
                              To
                            </span>
                            <div
                              style={{
                                flex: 1,
                                height: 32,
                                padding: "0 12px",
                                fontSize: 12.5,
                                fontFamily: "inherit",
                                border: ".5px solid var(--brd)",
                                borderRadius: 8,
                                background: "var(--bg3)",
                                color: "var(--ink4)",
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                              }}
                            >
                              <Icon
                                name="lock"
                                size={11}
                                style={{ color: "var(--ink5)", flexShrink: 0 }}
                              />
                              info@zotra.com
                            </div>
                          </div>

                          {/* Subject — editable */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 11,
                                fontWeight: 600,
                                color: "var(--ink4)",
                                width: 52,
                                flexShrink: 0,
                                fontFamily: '"DM Mono",monospace',
                                letterSpacing: ".03em",
                              }}
                            >
                              Subject
                            </span>
                            <input
                              style={{
                                flex: 1,
                                height: 32,
                                padding: "0 12px",
                                fontSize: 12.5,
                                fontFamily: "inherit",
                                border: ".5px solid var(--brd2)",
                                borderRadius: 8,
                                background: "var(--bg)",
                                color: "var(--ink)",
                                outline: "none",
                                transition: "border-color .15s",
                              }}
                              placeholder="Digital marketing inquiry"
                              value={composeFields.subject}
                              onChange={(e) =>
                                setComposeFields((prev) => ({
                                  ...prev,
                                  subject: e.target.value,
                                }))
                              }
                              onFocus={(e) => {
                                e.target.style.borderColor = "var(--p)";
                                e.target.style.boxShadow =
                                  "0 0 0 2px rgba(75,72,200,.08)";
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = "var(--brd2)";
                                e.target.style.boxShadow = "none";
                              }}
                            />
                          </div>
                        </div>

                        {/* Body textarea */}
                        <div style={{ marginBottom: 12 }}>
                          <textarea
                            style={{
                              width: "100%",
                              padding: "13px 16px",
                              fontSize: 13,
                              fontFamily: '"DM Sans",sans-serif',
                              border: "1.5px solid var(--brd2)",
                              borderRadius: 12,
                              background: "var(--bg)",
                              color: "var(--ink)",
                              outline: "none",
                              resize: "vertical",
                              lineHeight: 1.55,
                              minHeight: 110,
                              transition: "border-color .15s",
                              boxSizing: "border-box",
                            }}
                            placeholder="We are looking for help with our online presence..."
                            value={composeBody}
                            onChange={(e) => setComposeBody(e.target.value)}
                            onFocus={(e) => {
                              e.target.style.borderColor = "var(--p)";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = "var(--brd2)";
                            }}
                          />
                        </div>

                        {/* Send button */}
                        <button
                          className="btn pri"
                          style={{
                            height: 36,
                            opacity:
                              !composeBody.trim() || composeLoading ? 0.45 : 1,
                            transition: "opacity .2s",
                            display: "flex",
                            alignItems: "center",
                            gap: 7,
                          }}
                          disabled={!composeBody.trim() || composeLoading}
                          onClick={handleComposeApi}
                        >
                          {composeLoading ? (
                            <>
                              <div
                                className="qs-spin"
                                style={{
                                  width: 13,
                                  height: 13,
                                  marginLeft: 0,
                                  marginRight: 2,
                                  borderWidth: 1.5,
                                }}
                              />
                              Sending…
                            </>
                          ) : (
                            <>
                              <Icon name="send" size={13} /> Send
                            </>
                          )}
                        </button>

                        {/* Error banner — only show on failure */}
                        {composeResult && !composeResult.success && (
                          <div
                            style={{
                              marginTop: 12,
                              padding: "10px 14px",
                              borderRadius: 9,
                              background: "var(--rib)",
                              border: ".5px solid rgba(196,82,82,.22)",
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              animation: "qs-fadein .25s ease-out",
                            }}
                          >
                            <div
                              style={{
                                width: 20,
                                height: 20,
                                borderRadius: 5,
                                background: "var(--ri)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <Icon
                                name="x"
                                size={11}
                                style={{ color: "#fff" }}
                              />
                            </div>
                            <div
                              style={{
                                fontSize: 12,
                                color: "var(--rif)",
                                fontWeight: 500,
                                flex: 1,
                              }}
                            >
                              {composeResult.message}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}

                {/* ── Tab 2: Sample thread — clicking a row directly fires POST ── */}
                {threadTab === "sample" && (
                  <>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--ink4)",
                        marginBottom: 12,
                        lineHeight: 1.5,
                      }}
                    >
                      Pick a thread from your demo inbox — Zotra will queue it
                      as an intake immediately.
                    </div>

                    {inboxLoading && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "12px",
                          color: "var(--ink5)",
                          fontSize: 12,
                        }}
                      >
                        <div
                          className="qs-spin"
                          style={{
                            width: 13,
                            height: 13,
                            marginLeft: 0,
                            borderWidth: 1.5,
                          }}
                        />
                        Loading inbox…
                      </div>
                    )}

                    {!inboxLoading && inboxItems.length === 0 && (
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--ink5)",
                          padding: "8px 0",
                          fontStyle: "italic",
                        }}
                      >
                        No sample threads available.
                      </div>
                    )}

                    {!inboxLoading &&
                      inboxItems.map((item) => {
                        const isOpen = previewThread === item.rowKey;
                        const isSelected =
                          selectedInbox?.rowKey === item.rowKey;
                        const isSent =
                          isSelected && analyseResult?.success === true;
                        const isSending = isSelected && analyseLoading;
                        const displayFrom =
                          item.fromName || item.from || "Unknown";
                        const domain = item.from
                          ? item.from.split("@")[1]?.split(".")[0]
                          : "";
                        const orgName = domain
                          ? domain.charAt(0).toUpperCase() + domain.slice(1)
                          : "Inbox";

                        return (
                          <div key={item.rowKey} style={{ marginBottom: 7 }}>
                            {/* ── Header row ── */}
                            <div
                              className="qs-sample-row"
                              style={{
                                background: isSent
                                  ? "var(--okb)"
                                  : isOpen
                                    ? "var(--pp)"
                                    : "var(--bg2)",
                                border: isSent
                                  ? ".5px solid rgba(29,158,117,.22)"
                                  : isOpen
                                    ? "1.5px solid var(--p)"
                                    : ".5px solid var(--brd)",
                                borderBottom: isOpen && !isSent ? 0 : undefined,
                                borderRadius:
                                  isOpen && !isSent ? "10px 10px 0 0" : 10,
                                boxShadow: isOpen
                                  ? "none"
                                  : "0 1px 3px rgba(0,0,0,.04)",
                                cursor: isSent ? "default" : "pointer",
                                transition: "all .15s",
                              }}
                              onClick={() => {
                                if (isSent || analyseLoading) return;
                                setPreviewThread(isOpen ? null : item.rowKey);
                              }}
                            >
                              {/* Icon */}
                              <div
                                className="qs-sample-row-ic"
                                style={{
                                  background: isSent
                                    ? "var(--ok)"
                                    : isOpen
                                      ? "var(--p)"
                                      : "var(--pp)",
                                  color: isSent || isOpen ? "#fff" : "var(--p)",
                                }}
                              >
                                {isSending ? (
                                  <div
                                    className="qs-spin"
                                    style={{
                                      width: 11,
                                      height: 11,
                                      marginLeft: 0,
                                      borderWidth: 1.5,
                                    }}
                                  />
                                ) : isSent ? (
                                  <Icon name="check" size={13} />
                                ) : (
                                  <Icon name="mail" size={13} />
                                )}
                              </div>

                              {/* Title + sub */}
                              <div className="qs-sample-body">
                                <div
                                  className="qs-sample-title"
                                  style={{
                                    color: isSent ? "var(--okf)" : undefined,
                                  }}
                                >
                                  {item.subject || "(no subject)"}
                                </div>
                                <div className="qs-sample-sub">
                                  {displayFrom} · {orgName}
                                </div>
                              </div>

                              {/* Right label */}
                              <span
                                className="qs-sample-preview-btn"
                                style={{
                                  color: isSent
                                    ? "var(--okf)"
                                    : isOpen
                                      ? "var(--p)"
                                      : "var(--ink4)",
                                  fontWeight: isSent ? 600 : 500,
                                }}
                              >
                                {isSent ? (
                                  <>
                                    <Icon name="check-circle" size={12} /> Sent
                                  </>
                                ) : isSending ? (
                                  "Sending…"
                                ) : isOpen ? (
                                  <>
                                    Close <Icon name="chevron-up" size={12} />
                                  </>
                                ) : (
                                  <>
                                    Preview{" "}
                                    <Icon name="chevron-down" size={12} />
                                  </>
                                )}
                              </span>
                            </div>

                            {/* ── Expanded preview ── */}
                            {isOpen && !isSent && (
                              <div
                                style={{
                                  border: "1.5px solid var(--p)",
                                  borderTop: "none",
                                  borderRadius: "0 0 10px 10px",
                                  overflow: "hidden",
                                  boxShadow:
                                    "0 4px 16px -4px rgba(75,72,200,.15)",
                                }}
                              >
                                {/* Email preview */}
                                <div
                                  style={{
                                    maxHeight: 260,
                                    overflowY: "auto",
                                    padding: "10px 10px 0",
                                  }}
                                >
                                  <div
                                    style={{
                                      background: "#fff",
                                      borderRadius: 6,
                                      boxShadow:
                                        "0 1px 4px rgba(0,0,0,.08), 0 0 0 .5px rgba(0,0,0,.06)",
                                      overflow: "hidden",
                                    }}
                                  >
                                    <div
                                      style={{
                                        padding: "12px 14px",
                                        borderBottom: ".5px solid #eee",
                                        background: "#fafafa",
                                      }}
                                    >
                                      <div
                                        style={{
                                          fontSize: 12.5,
                                          fontWeight: 600,
                                          color: "#111",
                                          marginBottom: 7,
                                        }}
                                      >
                                        {item.subject || "(no subject)"}
                                      </div>
                                      {[
                                        {
                                          l: "From",
                                          v: item.fromName
                                            ? `${item.fromName} <${item.from}>`
                                            : item.from || "—",
                                        },
                                        { l: "To", v: item.to || "—" },
                                      ].map((row, ri) => (
                                        <div
                                          key={ri}
                                          style={{
                                            display: "flex",
                                            gap: 8,
                                            fontSize: 11,
                                            marginBottom: 2,
                                          }}
                                        >
                                          <span
                                            style={{
                                              color: "#888",
                                              fontWeight: 600,
                                              width: 34,
                                              flexShrink: 0,
                                            }}
                                          >
                                            {row.l}
                                          </span>
                                          <span style={{ color: "#555" }}>
                                            {row.v}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                    <div
                                      style={{
                                        padding: "12px 14px",
                                        fontSize: 12.5,
                                        color: "#333",
                                        lineHeight: 1.7,
                                        whiteSpace: "pre-line",
                                      }}
                                    >
                                      {item.content || "(empty)"}
                                    </div>
                                  </div>
                                </div>

                                {/* Action bar */}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    padding: 10,
                                    background: "var(--bg2)",
                                    borderTop: ".5px solid var(--brd)",
                                  }}
                                >
                                  <button
                                    className="btn pri sm"
                                    style={{ opacity: isSending ? 0.6 : 1 }}
                                    disabled={isSending}
                                    onClick={() => {
                                      setSelectedInbox(item);
                                      setAnalyseResult(null);
                                      setPreviewThread(null);
                                      handleAnalyseApiForItem(item);
                                    }}
                                  >
                                    {isSending ? (
                                      <>
                                        <div
                                          className="qs-spin"
                                          style={{
                                            width: 11,
                                            height: 11,
                                            marginLeft: 0,
                                            marginRight: 4,
                                            borderWidth: 1.5,
                                          }}
                                        />
                                        Sending…
                                      </>
                                    ) : (
                                      <>
                                        <Icon name="send" size={11} /> Send
                                      </>
                                    )}
                                  </button>
                                  <span
                                    style={{
                                      marginLeft: "auto",
                                      fontSize: 10.5,
                                      color: "var(--ink5)",
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 4,
                                    }}
                                  >
                                    <Icon name="sparkles" size={10} /> New
                                    opportunity
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* ── Sent result strip (replaces expand area) ── */}
                            {isSent && analyseResult && (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  padding: "8px 12px",
                                  background: "var(--okb)",
                                  border: ".5px solid rgba(29,158,117,.22)",
                                  borderTop: "none",
                                  borderRadius: "0 0 10px 10px",
                                  animation: "qs-fadein .25s ease-out",
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: 11.5,
                                    color: "var(--okf)",
                                    fontWeight: 500,
                                    flex: 1,
                                  }}
                                >
                                  {analyseResult.message}
                                  {analyseResult.zotrademoId && (
                                    <span
                                      style={{
                                        marginLeft: 8,
                                        fontSize: 10,
                                        fontFamily: '"DM Mono",monospace',
                                        opacity: 0.7,
                                      }}
                                    >
                                      ID: {analyseResult.zotrademoId}
                                    </span>
                                  )}
                                </div>
                                <button
                                  className="btn pri sm"
                                  style={{
                                    fontSize: 11,
                                    flexShrink: 0,
                                    marginLeft: 10,
                                  }}
                                  onClick={() => setSubmitted(true)}
                                >
                                  <Icon name="arrow-right" size={11} /> Open
                                  workspace
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {/* Upload */}
        {entry === "upload" && (
          <>
            <div className="qs-eyebrow">
              <span className="qs-eyebrow-dot" /> Upload a document
            </div>
            <div className="qs-step-title">
              Drop a proposal, SOW, or contract
            </div>
            <div className="qs-step-sub">
              Zotra extracts the customer name, deal value, scope, stakeholders,
              and timeline — and opens a workspace from what it finds.
            </div>
            {!selectedDoc ? (
              <div className="qs-input-card">
                <div className="qs-input-pad">
                  <div
                    className="qs-drop-area"
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.add("over");
                    }}
                    onDragLeave={(e) =>
                      e.currentTarget.classList.remove("over")
                    }
                    onDrop={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove("over");
                      setSelectedDoc(DOC_SAMPLES[0]);
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 11,
                        background: "var(--bg3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 9px",
                        color: "var(--ink4)",
                      }}
                    >
                      <Icon name="upload" size={20} />
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--ink)",
                        marginBottom: 3,
                      }}
                    >
                      Drop your file here
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--ink4)",
                        lineHeight: 1.5,
                      }}
                    >
                      PDF, Word, or plain text · proposals, SOWs, invoices,
                      contracts
                    </div>
                  </div>
                  <div className="qs-sample-lbl">Or pick a sample document</div>
                  {DOC_SAMPLES.map((doc, i) => {
                    const isOpen = previewDoc === doc.id;
                    return (
                      <div key={i} style={{ marginBottom: 7 }}>
                        <div
                          className="qs-sample-row"
                          style={{
                            background: "var(--bg2)",
                            border: isOpen
                              ? "1.5px solid var(--p)"
                              : ".5px solid var(--brd)",
                            borderBottom: isOpen ? 0 : undefined,
                            borderRadius: isOpen ? "10px 10px 0 0" : 10,
                            boxShadow: isOpen
                              ? "none"
                              : "0 1px 3px rgba(0,0,0,.04)",
                          }}
                          onClick={() => setPreviewDoc(isOpen ? null : doc.id)}
                        >
                          <div
                            className="qs-sample-row-ic"
                            style={{
                              background: doc.accentBg,
                              color: doc.accentColor,
                            }}
                          >
                            <Icon name="file-text" size={13} />
                          </div>
                          <div className="qs-sample-body">
                            <div className="qs-sample-title">{doc.label}</div>
                            <div className="qs-sample-sub">
                              {doc.co} · {doc.type} · {doc.value}
                            </div>
                          </div>
                          <span
                            className="qs-sample-preview-btn"
                            style={{
                              color: isOpen ? "var(--p)" : "var(--ink4)",
                            }}
                          >
                            {isOpen ? "Close" : "Preview"}{" "}
                            <Icon
                              name={isOpen ? "chevron-up" : "chevron-down"}
                              size={12}
                            />
                          </span>
                        </div>
                        {isOpen && (
                          <div
                            style={{
                              border: "1.5px solid var(--p)",
                              borderTop: "none",
                              borderRadius: "0 0 10px 10px",
                              overflow: "hidden",
                              boxShadow: "0 4px 16px -4px rgba(75,72,200,.15)",
                            }}
                          >
                            <div
                              style={{
                                maxHeight: 320,
                                overflowY: "auto",
                                padding: "10px 10px 0",
                              }}
                            >
                              <DocPreview doc={doc} />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                padding: 10,
                                background: "var(--bg2)",
                                borderTop: ".5px solid var(--brd)",
                              }}
                            >
                              <button
                                className="btn pri sm"
                                onClick={() => {
                                  setSelectedDoc(doc);
                                  setPreviewDoc(null);
                                }}
                              >
                                <Icon name="check" size={11} /> Use this
                                document
                              </button>
                              <button
                                className="btn sm"
                                onClick={() => setPreviewDoc(null)}
                              >
                                Cancel
                              </button>
                              <span
                                style={{
                                  marginLeft: "auto",
                                  fontSize: 10.5,
                                  color: "var(--ink5)",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 4,
                                }}
                              >
                                <Icon name="sparkles" size={10} /> New
                                opportunity
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                    padding: "8px 12px",
                    background: "var(--okb)",
                    border: ".5px solid rgba(29,158,117,.2)",
                    borderRadius: 9,
                  }}
                >
                  <Icon name="check-circle" size={14} />
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--ink)",
                      flex: 1,
                    }}
                  >
                    {selectedDoc.label} — ready to analyse
                  </div>
                  <button
                    className="btn ghost sm"
                    style={{ fontSize: 11 }}
                    onClick={() => setSelectedDoc(null)}
                  >
                    Change
                  </button>
                </div>
                <div
                  style={{
                    padding: 10,
                    background: "var(--bg2)",
                    border: ".5px solid var(--brd)",
                    borderRadius: 12,
                    marginBottom: 12,
                    maxHeight: 360,
                    overflowY: "auto",
                  }}
                >
                  <DocPreview doc={selectedDoc} />
                </div>
                <button
                  className="btn pri"
                  style={{
                    height: 36,
                    width: "100%",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    const n = selectedDoc.co;
                    setParsed(n);
                    setSubmittedName(n);
                    setSubmitted(true);
                  }}
                >
                  <Icon name="sparkles" size={13} /> Analyse this document
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty */}
        {entry === "empty" && (
          <>
            <div className="qs-eyebrow">
              <span className="qs-eyebrow-dot" /> Start empty
            </div>
            <div className="qs-step-title">Name a customer to begin</div>
            <div className="qs-step-sub">
              Type a name — watch Zotra build the workspace in real time.
            </div>
            <EmptyEntryLive
              inputText={inputText}
              setInputText={setInputText}
              handleEmpty={handleEmpty}
            />
          </>
        )}

        {/* Tour */}
        {entry === "tour" && (
          <>
            <div className="qs-eyebrow">
              <span className="qs-eyebrow-dot" /> Quick tour
            </div>
            <div className="qs-step-title">Browse a live demo workspace</div>
            <div className="qs-step-sub">
              See how Zotra looks at maturity — pulse, opportunities, renewals,
              and finance — without any setup.
            </div>
            {[
              {
                ic: "activity",
                label: "Pulse — Log stream",
                desc: "Live activity feed showing agent actions and customer signals",
                view: "pulse",
              },
              {
                ic: "target",
                label: "Opportunities",
                desc: "Pipeline constellation view with deal health and next actions",
                view: "deals",
              },
              {
                ic: "refresh-cw",
                label: "Renewals",
                desc: "Renewal tracker with contract timeline and risk indicators",
                view: "renewal",
              },
              {
                ic: "receipt",
                label: "Finance",
                desc: "Invoice tracker and cash flow across all active accounts",
                view: "finance",
              },
              {
                ic: "layout-dashboard",
                label: "Dashboard",
                desc: "Portfolio health at a glance — revenue, churn risk, pipeline",
                view: "dashboard",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="qs-tour-card"
                onClick={() => {
                  setTenantAge?.("established");
                  setView?.(t.view);
                }}
              >
                <div className="qs-tour-ic">
                  <Icon name={t.ic} size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: 2,
                    }}
                  >
                    {t.label}
                  </div>
                  <div style={{ fontSize: 11.5, color: "var(--ink4)" }}>
                    {t.desc}
                  </div>
                </div>
                <Icon
                  name="chevron-right"
                  size={14}
                  style={{ color: "var(--ink5)", flexShrink: 0 }}
                />
              </div>
            ))}
          </>
        )}
      </Shell>
    );

  // ── Step 2: workspace preview ─────────────────────────────────────────────
  if (step === 2)
    return (
      <Shell>
        <div className="qs-eyebrow">
          <span className="qs-eyebrow-dot" /> Workspace ready
        </div>
        <div className="qs-step-title">Here's what Zotra found</div>
        <div className="qs-step-sub">
          From one {entry === "upload" ? "document" : "thread"}, Zotra built a
          workspace and identified open gaps.
        </div>
        <div
          style={{
            background: "var(--bg2)",
            border: ".5px solid var(--brd)",
            borderRadius: 18,
            boxShadow: "var(--sh-s)",
            overflow: "hidden",
            marginBottom: 12,
          }}
        >
          {parsed && (
            <HealthCards parsed={parsed} health={health} gaps={gaps} />
          )}
          <div
            style={{ padding: "16px 28px", borderTop: ".5px solid var(--brd)" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: "9.5px",
                fontWeight: 600,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "var(--p)",
                marginBottom: 6,
              }}
            >
              <Icon name="sparkles" size={11} /> Suggested action
            </div>
            <div
              style={{
                fontSize: 13.5,
                fontWeight: 650,
                color: "var(--ink)",
                marginBottom: 4,
                letterSpacing: "-.01em",
              }}
            >
              Confirm the decision-maker at {parsed}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "var(--ink3)",
                lineHeight: 1.55,
                marginBottom: 12,
              }}
            >
              No confirmed decision-maker means Zotra cannot assess authority
              risk. One name closes this gap and lifts the health score
              immediately.
            </div>
            <div style={{ display: "flex", gap: 7 }}>
              <button className="btn pri sm" onClick={() => setStep(3)}>
                <Icon name="check" size={11} /> Log it now
              </button>
              <button className="btn sm" onClick={() => setStep(3)}>
                Do later
              </button>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 14px",
            background: "var(--bg2)",
            border: ".5px solid var(--brd)",
            borderRadius: 11,
          }}
        >
          <Icon
            name="help-circle"
            size={14}
            style={{ color: "var(--ink4)", flexShrink: 0 }}
          />
          <div
            style={{
              fontSize: "11.5px",
              color: "var(--ink4)",
              lineHeight: 1.5,
            }}
          >
            <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
              Why suggested?
            </strong>{" "}
            No activity logged yet · decision-maker gap blocking health score ·{" "}
            {parsed} has a warm relationship signal
          </div>
        </div>
      </Shell>
    );

  // ── Step 3: inbox nudge ───────────────────────────────────────────────────
  return (
    <Shell>
      <div className="qs-eyebrow">
        <span className="qs-eyebrow-dot" /> One more step — optional
      </div>
      <div className="qs-step-title">Want Zotra to watch your inbox?</div>
      <div className="qs-step-sub">
        You've seen what Zotra does. Connect your inbox and it'll do this
        automatically for every customer.
      </div>
      <div className="qs-connect-card">
        <div className="qs-connect-title">Connect Gmail or Outlook</div>
        <div className="qs-connect-sub">
          Zotra scans the last 90 days, finds every commercial thread, and
          builds workspaces automatically. You confirm before anything is
          imported.
        </div>
        <div className="qs-connect-btns">
          <button
            className="qs-connect-btn-pri"
            onClick={() => goToWorkspace(parsed ?? "")}
          >
            <Icon name="mail" size={14} /> Connect inbox
          </button>
          <button
            className="qs-connect-btn-ghost"
            onClick={() => goToWorkspace(parsed ?? "")}
          >
            Skip for now
          </button>
        </div>
        <div className="qs-trust-row">
          {[
            { ic: "shield-check", l: "Read-only access" },
            { ic: "eye-off", l: "Nothing sends without approval" },
            { ic: "x-circle", l: "Disconnect anytime" },
          ].map((f, i) => (
            <div key={i} className="qs-trust-item">
              <Icon name={f.ic} size={12} /> {f.l}
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 10 }}>
        <div
          style={{ fontSize: "11.5px", color: "var(--ink4)", marginBottom: 10 }}
        >
          Other ways to get data in:
        </div>
        {[
          {
            ic: "database",
            t: "Import CSV",
            s: "Upload accounts and deals from a spreadsheet",
          },
          { ic: "plug", t: "Connect CRM", s: "Salesforce, HubSpot, Pipedrive" },
          {
            ic: "forward",
            t: "Forward emails",
            s: "Forward individual threads to your Zotra address",
          },
        ].map((opt, i) => (
          <div
            key={i}
            className="qs-opt-row"
            onClick={() => goToWorkspace(parsed ?? "")}
          >
            <div className="qs-opt-ic">
              <Icon name={opt.ic} size={14} />
            </div>
            <div>
              <div
                style={{
                  fontSize: "12.5px",
                  fontWeight: 600,
                  color: "var(--ink)",
                }}
              >
                {opt.t}
              </div>
              <div style={{ fontSize: 11, color: "var(--ink4)" }}>{opt.s}</div>
            </div>
            <Icon
              name="chevron-right"
              size={14}
              style={{ marginLeft: "auto", color: "var(--ink5)" }}
            />
          </div>
        ))}
      </div>
    </Shell>
  );
};

export default QuickStartView;
