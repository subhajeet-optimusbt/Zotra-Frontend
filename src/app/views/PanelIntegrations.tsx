import React, {
  useState,
  useEffect,
  type ReactNode,
  type ChangeEvent,
} from "react";
import { baseUrl, apiFetch } from "../utils/utils";

// ─── CSS ──────────────────────────────────────────────────────────────────────
export const INT_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');

.int-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 5px;
  font-family: 'Geist', sans-serif; font-weight: 500; letter-spacing: -.01em;
  border-radius: var(--r3); border: 1px solid var(--brd2);
  background: var(--bg2); color: var(--ink3); cursor: pointer;
  transition: all var(--t); white-space: nowrap; user-select: none;
  font-size: 11.5px; height: 27px; padding: 0 10px; line-height: 1;
}
.int-btn:hover { background: var(--bg3); border-color: var(--brd3); color: var(--ink2); }
.int-btn.pri  { background: var(--p); border-color: var(--p); color: #fff; font-weight: 600; }
.int-btn.pri:hover { background: var(--pl); border-color: var(--pl); }
.int-btn.sm   { height: 24px; font-size: 10.5px; padding: 0 9px; }
.int-btn.xs   { height: 21px; font-size: 10px; padding: 0 7px; border-radius: 4px; }
.int-btn.ghost { background: transparent; border-color: transparent; color: var(--ink4); }
.int-btn.ghost:hover { background: var(--bg3); border-color: var(--brd); color: var(--ink2); }
.int-btn.danger { color: var(--ri); }
.int-btn.danger:hover { background: var(--rib); border-color: rgba(220,38,38,.2); }

.int-tog { position: relative; display: inline-block; width: 34px; height: 19px; cursor: pointer; flex-shrink: 0; }
.int-tog input { opacity: 0; width: 0; height: 0; position: absolute; pointer-events: none; }
.int-tog-track {
  position: absolute; inset: 0; border-radius: 20px;
  background: var(--brd2); border: 1px solid var(--brd2);
  transition: all var(--t); pointer-events: none;
}
.int-tog input:checked + .int-tog-track { background: var(--p); border-color: var(--p); }
.int-tog-thumb {
  position: absolute; top: 2.5px; left: 2.5px;
  width: 14px; height: 14px; border-radius: 50%;
  background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,.2);
  transition: transform var(--t); pointer-events: none;
}
.int-tog input:checked ~ .int-tog-thumb { transform: translateX(15px); }

.int-hdr { background: var(--bg2); border: 1px solid var(--brd); border-radius: var(--r); margin-bottom: 14px; box-shadow: var(--sh); overflow: hidden; }
.int-hdr-top { display: flex; align-items: center; gap: 12px; padding: 16px 18px 14px; }
.int-hdr-icon { width: 36px; height: 36px; border-radius: 9px; background: var(--pp); border: 1px solid rgba(232,87,42,.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--p); }
.int-hdr-title { font-size: 15px; font-weight: 700; color: var(--ink); letter-spacing: -.03em; font-family: 'Geist', sans-serif; }
.int-hdr-sub { font-size: 11.5px; color: var(--ink4); margin-top: 1px; }
.int-hdr-sub strong { color: var(--p); font-weight: 600; }
.int-kpi-strip { display: grid; grid-template-columns: repeat(3,1fr); border-top: 1px solid var(--brd); }
.int-kpi { padding: 12px 18px; border-right: 1px solid var(--brd); }
.int-kpi:last-child { border-right: none; }
.int-kpi-val { font-size: 20px; font-weight: 700; letter-spacing: -.04em; line-height: 1; margin-bottom: 3px; font-family: 'Geist', sans-serif; }
.int-kpi-val.c-acc { color: var(--p); }
.int-kpi-val.c-ok  { color: var(--ok); }
.int-kpi-val.c-vi  { color: var(--p); }
.int-kpi-lbl { font-size: 10.5px; color: var(--ink5); font-weight: 500; letter-spacing: .05em; text-transform: uppercase; }
.int-hdr-info { display: flex; gap: 8px; align-items: flex-start; padding: 9px 18px; border-top: 1px solid var(--brd); background: var(--bg3); font-size: 11.5px; color: var(--ink4); line-height: 1.6; }
.int-hdr-info strong { color: var(--ink2); font-weight: 600; }

.int-prov { background: var(--bg2); border: 1px solid var(--brd); border-radius: var(--r); margin-bottom: 10px; box-shadow: var(--sh); overflow: hidden; transition: box-shadow var(--t); }
.int-prov:hover { box-shadow: var(--sh2); }
.int-prov-bar { display: flex; position: relative; }
.int-prov-bar::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--p); border-radius: 2px 0 0 2px; opacity: 0; transition: opacity var(--t); }
.int-prov.open .int-prov-bar::before { opacity: 1; }
.int-prov-head { flex: 1; display: flex; align-items: center; gap: 12px; padding: 14px 16px 14px 18px; cursor: pointer; user-select: none; }
.int-prov-logo { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid var(--brd); box-shadow: var(--sh); }
.int-prov-name { font-size: 14px; font-weight: 700; color: var(--ink); letter-spacing: -.025em; font-family: 'Geist', sans-serif; }
.int-prov-desc { font-size: 11px; color: var(--ink5); margin-top: 2px; }
.int-app-badges { display: flex; gap: 4px; margin-top: 6px; flex-wrap: wrap; }
.int-app-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 500; color: var(--ink4); background: var(--bg3); border: 1px solid var(--brd); padding: 2px 7px; border-radius: 20px; }
.int-app-badge.active { color: var(--ok); background: var(--okb); border-color: var(--okbrd); }
.int-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
.int-prov-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; padding-right: 16px; }
.int-conn-pill { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 20px; white-space: nowrap; }
.int-conn-pill.on  { background: var(--okb); color: var(--ok); border: 1px solid var(--okbrd); }
.int-conn-pill.off { background: var(--bg3); color: var(--ink4); border: 1px solid var(--brd); }
.int-prov-chev { width: 15px; height: 15px; color: var(--ink5); transition: transform .2s; flex-shrink: 0; cursor: pointer; }
.int-prov.open .int-prov-chev { transform: rotate(90deg); }
.int-prov-body { border-top: 1px solid var(--brd); }

.int-acct-card { border: 1px solid var(--brd); border-radius: var(--r2); overflow: hidden; background: var(--bg2); transition: border-color var(--t); }
.int-acct-card:hover { border-color: var(--brd3); }
.int-acct-card.open { border-color: var(--p); }
.int-acct-head { display: flex; align-items: center; gap: 10px; padding: 10px 12px; cursor: pointer; user-select: none; background: var(--bg3); transition: background var(--t); }
.int-acct-card.open .int-acct-head { background: var(--pu); }
.int-acct-head:hover { background: var(--pu); }
.int-acct-av { width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: #fff; flex-shrink: 0; font-family: 'Geist Mono', monospace; box-shadow: 0 1px 4px rgba(0,0,0,.15); }
.int-acct-email { font-size: 12px; font-weight: 600; color: var(--ink); letter-spacing: -.01em; }
.int-acct-meta { font-size: 10.5px; color: var(--ink5); margin-top: 1px; font-family: 'Geist Mono', monospace; }
.int-acct-pill { font-size: 9.5px; font-weight: 600; padding: 2px 8px; border-radius: 20px; white-space: nowrap; letter-spacing: .02em; font-family: 'Geist Mono', monospace; }
.int-acct-pill.on   { background: var(--okb); color: var(--ok); border: 1px solid var(--okbrd); }
.int-acct-pill.part { background: var(--wab); color: var(--wa); border: 1px solid rgba(217,119,6,.2); }

.int-app-tbl { width: 100%; border-collapse: collapse; }
.int-app-tr { border-top: 1px solid var(--brd); transition: background var(--t); }
.int-app-tr:hover { background: var(--bg3); }
.int-app-tr.off { opacity: .5; }
.int-app-td { padding: 9px 12px; vertical-align: middle; }
.int-app-td:first-child { padding-left: 14px; width: 1%; }
.int-app-td:last-child  { padding-right: 12px; width: 1%; white-space: nowrap; }
.int-app-ico { width: 26px; height: 26px; border-radius: 7px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid var(--brd); }
.int-app-nm  { font-size: 12px; font-weight: 600; color: var(--ink2); letter-spacing: -.01em; }
.int-scope-tag { font-size: 9.5px; font-family: 'Geist Mono', monospace; color: var(--ink5); background: var(--bg3); border: 1px solid var(--brd); padding: 1px 5px; border-radius: 3px; margin-left: 5px; vertical-align: middle; display: inline-block; }
.int-app-status { font-size: 11px; color: var(--ink5); display: flex; align-items: center; gap: 5px; margin-top: 2px; }
.int-sdot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.int-sdot.ok   { background: var(--ok); box-shadow: 0 0 0 2px var(--okb); }
.int-sdot.off  { background: var(--ink6); }
.int-sdot.warn { background: var(--wa); box-shadow: 0 0 0 2px var(--wab); }
.int-app-ctrl  { display: flex; align-items: center; gap: 7px; justify-content: flex-end; }

.int-add-row { display: flex; align-items: center; gap: 6px; padding: 10px 16px; cursor: pointer; color: var(--p); font-size: 11.5px; font-weight: 600; border-top: 1px solid var(--brd); background: var(--bg3); transition: background var(--t); }
.int-add-row:hover { background: var(--pu); }

.int-empty { display: flex; align-items: center; gap: 14px; padding: 22px 18px; }
.int-empty-ico { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px dashed var(--brd2); }
.int-empty-t { font-size: 13px; font-weight: 600; color: var(--ink2); margin-bottom: 3px; font-family: 'Geist', sans-serif; }
.int-empty-d { font-size: 11.5px; color: var(--ink5); line-height: 1.6; }

.int-drw-overlay { position: fixed; inset: 0; z-index: 900; background: rgba(17,24,39,.25); backdrop-filter: blur(2px); opacity: 0; pointer-events: none; transition: opacity .2s; }
.int-drw-overlay.open { opacity: 1; pointer-events: auto; }
.int-drw { position: fixed; top: 0; right: 0; bottom: 0; width: 400px; max-width: 96vw; background: var(--bg2); border-left: 1px solid var(--brd); box-shadow: -8px 0 40px rgba(0,0,0,.1); z-index: 901; display: flex; flex-direction: column; transform: translateX(105%); transition: transform .24s cubic-bezier(.4,0,.2,1); }
.int-drw.open { transform: translateX(0); }
.int-drw-head { padding: 15px 18px; border-bottom: 1px solid var(--brd); display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
.int-drw-icon { width: 30px; height: 30px; border-radius: 7px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.int-drw-title { font-size: 13px; font-weight: 700; color: var(--ink); letter-spacing: -.02em; flex: 1; font-family: 'Geist', sans-serif; }
.int-drw-close { width: 26px; height: 26px; border-radius: 6px; cursor: pointer; border: none; background: #4B48C8; display: flex; align-items: center; justify-content: center; color: #fff; transition: filter var(--t); box-shadow: 0 1px 3px rgba(75,72,200,.30); }
.int-drw-close:hover { filter: brightness(.88); }
.int-drw-body { flex: 1; overflow-y: auto; padding: 18px; scrollbar-width: thin; scrollbar-color: var(--brd) transparent; }
.int-drw-foot { padding: 12px 18px; border-top: 1px solid var(--brd); display: flex; gap: 7px; justify-content: flex-end; }

.int-df-div { font-size: 9.5px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--ink5); padding: 12px 0 7px; border-bottom: 1px solid var(--brd); margin-bottom: 10px; }
.int-df-field { margin-bottom: 11px; }
.int-df-field label { display: block; font-size: 11px; font-weight: 600; color: var(--ink3); margin-bottom: 4px; letter-spacing: .01em; }
.int-df-field input,
.int-df-field select { width: 100%; height: 32px; padding: 0 10px; border-radius: 6px; border: 1px solid var(--brd2); background: var(--bg2); font-size: 12px; color: var(--ink); font-family: 'Geist', sans-serif; outline: none; transition: border-color var(--t), box-shadow var(--t); box-sizing: border-box; }
.int-df-field input:focus,
.int-df-field select:focus { border-color: var(--p); box-shadow: 0 0 0 3px var(--pu); }
.int-df-field .hint { font-size: 10.5px; color: var(--ink5); margin-top: 3px; }
.int-df-app-row { display: flex; align-items: center; gap: 9px; padding: 9px 0; border-bottom: 1px solid var(--brd); }
.int-df-app-row:last-child { border-bottom: none; }
.int-df-acct-tag { font-size: 11px; color: var(--ink3); font-family: 'Geist Mono', monospace; padding: 6px 10px; background: var(--bg3); border-radius: 6px; border: 1px solid var(--brd); margin-bottom: 14px; }
.int-banner { padding: 10px 13px; border-radius: 7px; font-size: 12px; line-height: 1.6; margin-bottom: 14px; border: 1px solid; }
.int-banner.blue  { background: var(--pu); color: var(--p); border-color: var(--brd3); }
.int-banner.amber { background: var(--wab); color: var(--wa); border-color: rgba(217,119,6,.2); }
.int-banner.red   { background: var(--rib); color: var(--ri); border-color: rgba(220,38,38,.2); }

.int-toast { position: fixed; bottom: 20px; right: 20px; padding: 10px 14px; border-radius: 8px; font-size: 12.5px; font-weight: 500; z-index: 9999; display: flex; align-items: center; gap: 8px; pointer-events: none; animation: intToastIn .18s ease; box-shadow: 0 4px 20px rgba(0,0,0,.12); border: 1px solid; font-family: 'Geist', sans-serif; }
.int-toast.ok   { background: #ECFDF5; color: var(--ok); border-color: var(--okbrd); }
.int-toast.err  { background: #FEF2F2; color: var(--ri); border-color: rgba(220,38,38,.2); }
.int-toast.info { background: var(--pu); color: var(--p); border-color: var(--brd3); }
@keyframes intToastIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }

.int-accts-list { padding: 10px 14px; display: flex; flex-direction: column; gap: 8px; }

/* Skeleton */
.int-skel { background: var(--bg3); border-radius: 5px; animation: skelPulse 1.4s ease-in-out infinite; }
@keyframes skelPulse { 0%,100% { opacity:1; } 50% { opacity:.45; } }
`;

// ─── API Types ────────────────────────────────────────────────────────────────
interface ApiAppConfig {
  syncIntervalMinutes?: number;
  mailboxScope?: string;
  calendars?: string;
  autoCreateBriefs?: boolean;
  [key: string]: unknown;
}

interface ApiApp {
  appInstanceId: string;
  appType: string; // "gmail" | "google_calendar" | "outlook" | "microsoft_calendar" | "teams"
  enabled: boolean;
  syncStatus: string; // "active" | "string" | etc.
  lastSyncAt: string | null;
  nextSyncAt: string | null;
  config: ApiAppConfig;
  updatedAt: string;
}

interface ApiConnection {
  connectionId: string;
  provider: string; // "google" | "microsoft"
  label: string; // email address
  status: string; // "active"
  lastAuthAt: string;
  scopes: string[];
  apps: ApiApp[];
}

interface ApiIntegrationsResponse {
  google?: ApiConnection[];
  microsoft?: ApiConnection[];
}

// ─── UI types (same shape as static but derived from API) ─────────────────────
type SyncDot = "ok" | "off" | "warn";

interface UiApp {
  appInstanceId: string;
  appType: string;
  name: string;
  scope: string;
  iconBg: string;
  icon: ReactNode;
  enabled: boolean;
  syncDot: SyncDot;
  activeDesc: string;
  disabledDesc: string;
  config: ApiAppConfig;
}

interface UiConnection {
  connectionId: string;
  provider: string;
  label: string;
  status: string;
  lastAuthAt: string;
  initials: string;
  avatarGrad: string;
  apps: UiApp[];
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const ICONS = {
  gmail: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        fill="#EA4335"
        opacity=".15"
      />
      <polyline
        points="22,6 12,13 2,6"
        stroke="#EA4335"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),
  gcal: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4285F4"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  outlook: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        fill="#0078D4"
        opacity=".15"
      />
      <polyline
        points="22,6 12,13 2,6"
        stroke="#0078D4"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),
  mcal: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0078D4"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  teams: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4B53BC"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  link: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  close: (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  plus: (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  check: (
    <svg
      width="8"
      height="8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  info: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  warn: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  google: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  ),
  ms: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="1" y="1" width="10" height="10" fill="#F35325" />
      <rect x="13" y="1" width="10" height="10" fill="#81BC06" />
      <rect x="1" y="13" width="10" height="10" fill="#05A6F0" />
      <rect x="13" y="13" width="10" height="10" fill="#FFBA08" />
    </svg>
  ),
  lockIcon: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  msEmptyIcon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="1" y="1" width="10" height="10" fill="#F35325" opacity=".4" />
      <rect x="13" y="1" width="10" height="10" fill="#81BC06" opacity=".4" />
      <rect x="1" y="13" width="10" height="10" fill="#05A6F0" opacity=".4" />
      <rect x="13" y="13" width="10" height="10" fill="#FFBA08" opacity=".4" />
    </svg>
  ),
};

// ─── App metadata lookup (appType → display info) ─────────────────────────────
interface AppDisplayMeta {
  name: string;
  icon: ReactNode;
  iconBg: string;
  scope: string;
  disabledDesc: string;
}

const APP_DISPLAY_META: Record<string, AppDisplayMeta> = {
  gmail: {
    name: "Gmail",
    icon: ICONS.gmail,
    iconBg: "rgba(234,67,53,.07)",
    scope: "gmail.readonly",
    disabledDesc: "inbox & sent",
  },
  google_calendar: {
    name: "Google Calendar",
    icon: ICONS.gcal,
    iconBg: "rgba(66,133,244,.07)",
    scope: "calendar.readonly",
    disabledDesc: "meeting imports",
  },
  outlook: {
    name: "Outlook Mail",
    icon: ICONS.outlook,
    iconBg: "rgba(0,120,212,.07)",
    scope: "mail.read",
    disabledDesc: "inbox & sent",
  },
  microsoft_calendar: {
    name: "Microsoft Calendar",
    icon: ICONS.mcal,
    iconBg: "rgba(0,120,212,.07)",
    scope: "calendars.read",
    disabledDesc: "meeting imports",
  },
  teams: {
    name: "Microsoft Teams",
    icon: ICONS.teams,
    iconBg: "rgba(75,83,188,.07)",
    scope: "teams.notify",
    disabledDesc: "agent notifications",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function authHeaders(): Record<string, string> {
  const token = localStorage.getItem("zotra_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function getInitials(email: string): string {
  const parts = email.split("@")[0].split(/[._-]/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return email.slice(0, 2).toUpperCase();
}

function getAvatarGrad(provider: string, index: number): string {
  const googleGrads = ["#4285F4,#34A853", "#1DC4A0,#3DD9B8", "#F4B400,#EA4335"];
  const msGrads = ["#0078D4,#4B53BC", "#00BCF2,#0078D4"];
  if (provider === "google") return googleGrads[index % googleGrads.length];
  return msGrads[index % msGrads.length];
}

function formatSyncDesc(app: ApiApp): string {
  if (!app.enabled) return "";
  if (app.lastSyncAt) {
    const diff = Math.round(
      (Date.now() - new Date(app.lastSyncAt).getTime()) / 60000,
    );
    const ago = diff < 2 ? "just now" : `${diff} min ago`;
    const meta = APP_DISPLAY_META[app.appType];
    return `Syncing · ${ago} · ${meta?.disabledDesc ?? ""}`;
  }
  return app.syncStatus === "active"
    ? "Active · watching for changes"
    : "Pending first sync";
}

function apiSyncDot(syncStatus: string, enabled: boolean): SyncDot {
  if (!enabled) return "off";
  if (syncStatus === "active") return "ok";
  if (syncStatus === "error") return "warn";
  return "ok";
}

// ─── Transform API response → UI connections ──────────────────────────────────
function transformConnections(
  apiConns: ApiConnection[],
  provider: string,
): UiConnection[] {
  return apiConns.map((conn, idx) => ({
    connectionId: conn.connectionId,
    provider,
    label: conn.label,
    status: conn.status,
    lastAuthAt: conn.lastAuthAt,
    initials: getInitials(conn.label),
    avatarGrad: getAvatarGrad(provider, idx),
    apps: conn.apps.map((app): UiApp => {
      const meta = APP_DISPLAY_META[app.appType] ?? {
        name: app.appType,
        icon: ICONS.link,
        iconBg: "var(--bg3)",
        scope: app.appType,
        disabledDesc: app.appType,
      };
      return {
        appInstanceId: app.appInstanceId,
        appType: app.appType,
        name: meta.name,
        scope: meta.scope,
        iconBg: meta.iconBg,
        icon: meta.icon,
        enabled: app.enabled,
        syncDot: apiSyncDot(app.syncStatus, app.enabled),
        activeDesc: formatSyncDesc(app),
        disabledDesc: meta.disabledDesc,
        config: app.config,
      };
    }),
  }));
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
function Tog({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="int-tog">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.checked)
        }
      />
      <span className="int-tog-track" />
      <span className="int-tog-thumb" />
    </label>
  );
}

// ─── Drawer field ─────────────────────────────────────────────────────────────
function DField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="int-df-field">
      <label>{label}</label>
      {children}
      {hint && <div className="hint">{hint}</div>}
    </div>
  );
}

// ─── Drawer mode ──────────────────────────────────────────────────────────────
type DrawerMode =
  | { type: "add-account"; provider: "google" | "microsoft" }
  | { type: "reauth"; connLabel: string; connId: string }
  | { type: "revoke"; connLabel: string; connId: string; appNames: string[] }
  | {
      type: "app-settings";
      appName: string;
      connLabel: string;
      appInstanceId: string;
      appType: string;
      config: ApiAppConfig;
    };

// ─── Settings forms ───────────────────────────────────────────────────────────
function GmailSettings({
  connLabel,
  config,
}: {
  connLabel: string;
  config: ApiAppConfig;
}) {
  return (
    <>
      <div className="int-df-div">Account</div>
      <div className="int-df-acct-tag">{connLabel}</div>
      <div className="int-df-div">Sync</div>
      <DField label="Sync interval" hint="Minutes between polls">
        <select
          defaultValue={String(config.syncIntervalMinutes ?? 10) + " min"}
        >
          {["5 min", "10 min", "15 min", "30 min"].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </DField>
      <DField label="Mailbox scope">
        <select
          defaultValue={
            config.mailboxScope === "all" ? "All mail" : "Inbox + Sent"
          }
        >
          <option>Inbox</option>
          <option>Inbox + Sent</option>
          <option>All mail</option>
        </select>
      </DField>
      <DField label="Label filter" hint="Comma-separated labels (blank = all)">
        <input
          type="text"
          defaultValue={
            (config.labelFilter as string[] | undefined)?.join(", ") ?? ""
          }
          placeholder="e.g. deals, prospects"
        />
      </DField>
      <div className="int-df-div">On error</div>
      <DField label="If sync fails">
        <select
          defaultValue={config.onError === "retry" ? "Retry" : "Log and alert"}
        >
          <option>Log and alert</option>
          <option>Retry</option>
          <option>Pause sync</option>
          <option>Ignore</option>
        </select>
      </DField>
    </>
  );
}

function CalendarSettings({
  connLabel,
  config,
}: {
  connLabel: string;
  config: ApiAppConfig;
}) {
  return (
    <>
      <div className="int-df-div">Account</div>
      <div className="int-df-acct-tag">{connLabel}</div>
      <div className="int-df-div">Sync</div>
      <DField label="Sync interval">
        <select
          defaultValue={String(config.syncIntervalMinutes ?? 10) + " min"}
        >
          {["5 min", "10 min", "15 min", "30 min"].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </DField>
      <DField label="Calendars">
        <select
          defaultValue={
            config.calendars === "all" ? "All calendars" : "Primary"
          }
        >
          <option>Primary</option>
          <option>All calendars</option>
          <option>Work only</option>
        </select>
      </DField>
      <DField label="Auto-create pre-call briefs">
        <select defaultValue={config.autoCreateBriefs ? "Yes" : "No"}>
          <option>Yes</option>
          <option>No</option>
        </select>
      </DField>
    </>
  );
}

function OutlookSettings({
  connLabel,
  config,
}: {
  connLabel: string;
  config: ApiAppConfig;
}) {
  return (
    <>
      <div className="int-df-div">Account</div>
      <div className="int-df-acct-tag">{connLabel}</div>
      <div className="int-df-div">Sync</div>
      <DField label="Sync interval">
        <select
          defaultValue={String(config.syncIntervalMinutes ?? 10) + " min"}
        >
          {["5 min", "10 min", "15 min", "30 min"].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </DField>
      <DField label="Folder scope">
        <select
          defaultValue={
            config.mailboxScope === "inbox" ? "Inbox" : "Inbox + Sent"
          }
        >
          <option>Inbox</option>
          <option>Inbox + Sent</option>
          <option>All folders</option>
        </select>
      </DField>
    </>
  );
}

function TeamsSettings({ connLabel }: { connLabel: string }) {
  return (
    <>
      <div className="int-df-div">Account</div>
      <div className="int-df-acct-tag">{connLabel}</div>
      <div className="int-df-div">Notifications</div>
      <DField label="Default channel" hint="e.g. General or deal-updates">
        <input type="text" placeholder="#deal-updates" />
      </DField>
      <DField label="Notify on">
        <select defaultValue="All events">
          <option>Deal signals only</option>
          <option>Agent actions only</option>
          <option>All events</option>
        </select>
      </DField>
    </>
  );
}

// ─── Add account form ─────────────────────────────────────────────────────────
function AddAccountForm({ provider }: { provider: "google" | "microsoft" }) {
  const [appStates, setAppStates] = useState<Record<string, boolean>>({
    gmail: true,
    gcal: true,
    outlook: true,
    mcal: true,
    teams: true,
  });
  const keys =
    provider === "google" ? ["gmail", "gcal"] : ["outlook", "mcal", "teams"];
  const label = provider === "google" ? "Google" : "Microsoft";
  return (
    <>
      <div className="int-banner blue">
        <strong>OAuth 2.0 connection.</strong> A secure {label} sign-in window
        will open. No passwords stored.
      </div>
      <DField label="Account email" hint={`The ${label} account to authorise`}>
        <input
          type="text"
          placeholder={
            provider === "google" ? "you@gmail.com" : "you@company.com"
          }
        />
      </DField>
      <div className="int-df-div">Apps to activate</div>
      <div style={{ fontSize: 11, color: "var(--ink5)", marginBottom: 10 }}>
        All apps share this account's OAuth token.
      </div>
      {keys.map((k) => {
        const m = APP_DISPLAY_META[k];
        if (!m) return null;
        return (
          <div key={k} className="int-df-app-row">
            <div
              style={{
                width: 26,
                height: 26,
                background: m.iconBg,
                borderRadius: 7,
                border: "1px solid var(--brd)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {m.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{ fontSize: 12, fontWeight: 600, color: "var(--ink2)" }}
              >
                {m.name}
              </div>
              <div style={{ fontSize: 10.5, color: "var(--ink5)" }}>
                {m.disabledDesc}
              </div>
            </div>
            <Tog
              checked={appStates[k] ?? true}
              onChange={(v) => setAppStates((s) => ({ ...s, [k]: v }))}
            />
          </div>
        );
      })}
    </>
  );
}

// ─── Drawer ───────────────────────────────────────────────────────────────────
function Drawer({
  mode,
  onClose,
  onConfirm,
}: {
  mode: DrawerMode | null;
  onClose: () => void;
  onConfirm: (mode: DrawerMode) => void;
}) {
  if (!mode) return null;

  const cfgMap: Record<
    DrawerMode["type"],
    {
      title: string;
      iconBg: string;
      iconColor: string;
      icon: ReactNode;
      saveLabel: string;
      saveCls: string;
    }
  > = {
    "add-account": {
      title: `Connect · ${mode.type === "add-account" ? (mode.provider === "google" ? "Google" : "Microsoft") : ""}`,
      iconBg: "var(--pp)",
      iconColor: "var(--p)",
      icon: ICONS.link,
      saveLabel: "Authorise & connect",
      saveCls: "int-btn pri",
    },
    reauth: {
      title: `Re-authorise · ${mode.type === "reauth" ? mode.connLabel : ""}`,
      iconBg: "var(--wab)",
      iconColor: "var(--wa)",
      icon: ICONS.link,
      saveLabel: "Re-authorise",
      saveCls: "int-btn",
    },
    revoke: {
      title: `Revoke · ${mode.type === "revoke" ? mode.connLabel : ""}`,
      iconBg: "var(--rib)",
      iconColor: "var(--ri)",
      icon: ICONS.warn,
      saveLabel: "Confirm revoke",
      saveCls: "int-btn danger",
    },
    "app-settings": {
      title: `${mode.type === "app-settings" ? mode.appName : ""} · Settings`,
      iconBg: "var(--pu)",
      iconColor: "var(--p)",
      icon: ICONS.link,
      saveLabel: "Save settings",
      saveCls: "int-btn pri",
    },
  };
  const cfg = cfgMap[mode.type];

  function renderBody(): ReactNode {
    if (mode?.type === "add-account")
      return <AddAccountForm provider={mode.provider} />;
    if (mode?.type === "reauth")
      return (
        <>
          <div className="int-banner amber">
            Re-authorising refreshes the OAuth token without changing enabled
            apps or configurations.
          </div>
          <DField
            label="Confirm account email"
            hint="Must match the connected account"
          >
            <input type="text" placeholder={mode.connLabel} />
          </DField>
        </>
      );
    if (mode?.type === "revoke")
      return (
        <>
          <div className="int-banner red">
            <strong>Revoke {mode.connLabel}?</strong>
            <br />
            These apps will stop syncing immediately:{" "}
            <strong>{mode.appNames.join(", ")}</strong>.<br />
            Imported data is preserved. Other accounts are unaffected.
          </div>
          <DField label="Type the account email to confirm">
            <input type="text" placeholder={mode.connLabel} />
          </DField>
        </>
      );
    if (mode?.type === "app-settings") {
      if (mode.appType === "gmail")
        return (
          <GmailSettings connLabel={mode.connLabel} config={mode.config} />
        );
      if (
        mode.appType === "google_calendar" ||
        mode.appType === "microsoft_calendar"
      )
        return (
          <CalendarSettings connLabel={mode.connLabel} config={mode.config} />
        );
      if (mode.appType === "outlook")
        return (
          <OutlookSettings connLabel={mode.connLabel} config={mode.config} />
        );
      if (mode.appType === "teams")
        return <TeamsSettings connLabel={mode.connLabel} />;
    }
    return null;
  }

  return (
    <>
      <div className="int-drw-overlay open" onClick={onClose} />
      <div className="int-drw open">
        <div className="int-drw-head">
          <div
            className="int-drw-icon"
            style={{ background: cfg.iconBg, color: cfg.iconColor }}
          >
            {cfg.icon}
          </div>
          <div className="int-drw-title">{cfg.title}</div>
          <button className="int-drw-close" onClick={onClose}>
            {ICONS.close}
          </button>
        </div>
        <div className="int-drw-body">{renderBody()}</div>
        <div className="int-drw-foot">
          <button className="int-btn" onClick={onClose}>
            Cancel
          </button>
          <button className={cfg.saveCls} onClick={() => onConfirm(mode)}>
            {cfg.saveLabel}
          </button>
        </div>
      </div>
    </>
  );
}

// ─── App Row ──────────────────────────────────────────────────────────────────
function AppRow({
  app,
  connLabel,
  onSettings,
  onToggle,
}: {
  app: UiApp;
  connLabel: string;
  onSettings: (app: UiApp, connLabel: string) => void;
  onToggle: (appInstanceId: string, enabled: boolean) => void;
}) {
  const [on, setOn] = useState(app.enabled);
  const [toggling, setToggling] = useState(false);

  async function handleToggle(val: boolean) {
    setToggling(true);
    try {
      const res = await apiFetch(
        `${baseUrl()}/integrations/apps/${app.appInstanceId}`,
        {
          method: "PATCH",
          headers: authHeaders(),
          body: JSON.stringify({ enabled: val }),
        },
      );
      if (!res.ok) throw new Error(`${res.status}`);
      setOn(val);
      onToggle(app.appInstanceId, val);
    } catch {
      // revert on failure — on stays unchanged
    } finally {
      setToggling(false);
    }
  }

  return (
    <tr className={`int-app-tr${!on ? " off" : ""}`}>
      <td className="int-app-td">
        <div className="int-app-ico" style={{ background: app.iconBg }}>
          {app.icon}
        </div>
      </td>
      <td className="int-app-td">
        <div className="int-app-nm">
          {app.name}
          <span className="int-scope-tag">{app.scope}</span>
        </div>
        <div className="int-app-status">
          <span className={`int-sdot ${on ? app.syncDot : "off"}`} />
          {on ? app.activeDesc : `Paused · ${app.disabledDesc}`}
        </div>
      </td>
      <td className="int-app-td">
        <div className="int-app-ctrl">
          {on && (
            <button
              className="int-btn xs ghost"
              onClick={() => onSettings(app, connLabel)}
            >
              Settings
            </button>
          )}
          <Tog checked={on} onChange={handleToggle} />
          {toggling && (
            <span style={{ fontSize: 10, color: "var(--ink5)" }}>…</span>
          )}
        </div>
      </td>
    </tr>
  );
}

// ─── Connection Card ──────────────────────────────────────────────────────────
function ConnCard({
  conn,
  onReauth,
  onRevoke,
  onAppSettings,
  onToggle,
}: {
  conn: UiConnection;
  onReauth: (conn: UiConnection) => void;
  onRevoke: (conn: UiConnection) => void;
  onAppSettings: (app: UiApp, connLabel: string) => void;
  onToggle: (appInstanceId: string, enabled: boolean) => void;
}) {
  const [open, setOpen] = useState(true);
  const activeCount = conn.apps.filter((a) => a.enabled).length;
  const chipLabel =
    conn.status === "active"
      ? activeCount === conn.apps.length
        ? "Active"
        : `${activeCount} of ${conn.apps.length} enabled`
      : "Needs re-auth";
  const chipType = conn.status === "active" ? "on" : "part";

  const authDate = new Date(conn.lastAuthAt).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
  const metaLine = `OAuth 2.0 · connected ${authDate} · ${activeCount} app${activeCount !== 1 ? "s" : ""} active`;

  return (
    <div className={`int-acct-card${open ? " open" : ""}`}>
      <div className="int-acct-head" onClick={() => setOpen((o) => !o)}>
        <div
          className="int-acct-av"
          style={{ background: `linear-gradient(135deg,${conn.avatarGrad})` }}
        >
          {conn.initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="int-acct-email">{conn.label}</div>
          <div className="int-acct-meta">{metaLine}</div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexShrink: 0,
          }}
        >
          <span className={`int-acct-pill ${chipType}`}>
            {chipType === "on" && ICONS.check} {chipLabel}
          </span>
          <button
            className="int-btn xs"
            onClick={(e) => {
              e.stopPropagation();
              onReauth(conn);
            }}
          >
            Re-auth
          </button>
          <button
            className="int-btn xs danger"
            onClick={(e) => {
              e.stopPropagation();
              onRevoke(conn);
            }}
          >
            Revoke
          </button>
          <svg
            style={{
              width: 12,
              height: 12,
              color: "var(--ink5)",
              flexShrink: 0,
              transition: "transform .18s",
              transform: open ? "rotate(90deg)" : undefined,
            }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
      {open && (
        <table className="int-app-tbl">
          <tbody>
            {conn.apps.map((app) => (
              <AppRow
                key={app.appInstanceId}
                app={app}
                connLabel={conn.label}
                onSettings={onAppSettings}
                onToggle={onToggle}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ─── Provider Section ─────────────────────────────────────────────────────────
interface ProviderMeta {
  id: "google" | "microsoft";
  name: string;
  logoBg: string;
  logo: ReactNode;
  appsLabel: string;
  emptyIconBg: string;
  emptyIcon: ReactNode;
  emptyTitle: string;
  emptyDesc: string;
}

const PROVIDER_META: Record<string, ProviderMeta> = {
  google: {
    id: "google",
    name: "Google",
    logoBg: "#F8F9FF",
    logo: ICONS.google,
    appsLabel: "Gmail · Calendar · Drive · Contacts",
    emptyIconBg: "#F8F9FF",
    emptyIcon: ICONS.lockIcon,
    emptyTitle: "No Google accounts connected",
    emptyDesc: "Connect to enable Gmail, Calendar, Drive, and Contacts.",
  },
  microsoft: {
    id: "microsoft",
    name: "Microsoft",
    logoBg: "#F6F8FF",
    logo: ICONS.ms,
    appsLabel: "Outlook · Calendar · Teams",
    emptyIconBg: "#F6F8FF",
    emptyIcon: ICONS.msEmptyIcon,
    emptyTitle: "No Microsoft accounts connected",
    emptyDesc:
      "Connect to enable Outlook Mail, Calendar, and Teams notifications.",
  },
};

function ProvSection({
  meta,
  connections,
  onAdd,
  onReauth,
  onRevoke,
  onSettings,
  onToggle,
  defaultOpen,
}: {
  meta: ProviderMeta;
  connections: UiConnection[];
  onAdd: (p: ProviderMeta) => void;
  onReauth: (conn: UiConnection) => void;
  onRevoke: (conn: UiConnection) => void;
  onSettings: (app: UiApp, connLabel: string) => void;
  onToggle: (appInstanceId: string, enabled: boolean) => void;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const count = connections.length;

  const seenNames = new Set<string>();
  const activeBadges = connections
    .flatMap((c) => c.apps)
    .filter(
      (ap) =>
        ap.enabled && !seenNames.has(ap.name) && (seenNames.add(ap.name), true),
    );

  return (
    <div className={`int-prov${open ? " open" : ""}`}>
      <div className="int-prov-bar">
        <div className="int-prov-head" onClick={() => setOpen((o) => !o)}>
          <div className="int-prov-logo" style={{ background: meta.logoBg }}>
            {meta.logo}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="int-prov-name">{meta.name}</div>
            {activeBadges.length > 0 ? (
              <div className="int-app-badges">
                {activeBadges.map((ap) => (
                  <span key={ap.appInstanceId} className="int-app-badge active">
                    <span className="int-badge-dot" />
                    {ap.name}
                  </span>
                ))}
              </div>
            ) : (
              <div className="int-prov-desc">{meta.appsLabel}</div>
            )}
          </div>
        </div>
        <div className="int-prov-right">
          <span className={`int-conn-pill ${count > 0 ? "on" : "off"}`}>
            {count > 0 && ICONS.check}
            {count > 0
              ? `${count} account${count > 1 ? "s" : ""}`
              : "Not connected"}
          </span>
          <button
            className="int-btn sm pri"
            onClick={(e) => {
              e.stopPropagation();
              onAdd(meta);
            }}
          >
            {count > 0 ? "+ Add account" : "Connect"}
          </button>
          <svg
            className="int-prov-chev"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => setOpen((o) => !o)}
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>

      {open && (
        <div className="int-prov-body">
          {connections.length === 0 ? (
            <div className="int-empty">
              <div
                className="int-empty-ico"
                style={{ background: meta.emptyIconBg, color: "var(--ink5)" }}
              >
                {meta.emptyIcon}
              </div>
              <div style={{ flex: 1 }}>
                <div className="int-empty-t">{meta.emptyTitle}</div>
                <div className="int-empty-d">{meta.emptyDesc}</div>
              </div>
              <button className="int-btn sm pri" onClick={() => onAdd(meta)}>
                Connect
              </button>
            </div>
          ) : (
            <>
              <div className="int-accts-list">
                {connections.map((conn) => (
                  <ConnCard
                    key={conn.connectionId}
                    conn={conn}
                    onReauth={onReauth}
                    onRevoke={onRevoke}
                    onAppSettings={onSettings}
                    onToggle={onToggle}
                  />
                ))}
              </div>
              <div className="int-add-row" onClick={() => onAdd(meta)}>
                {ICONS.plus} Add another {meta.name} account
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
type ToastKind = "ok" | "err" | "info";
function useToast() {
  const [toast, setToast] = useState<{ msg: string; kind: ToastKind } | null>(
    null,
  );
  function show(msg: string, kind: ToastKind = "ok") {
    setToast({ msg, kind });
    setTimeout(() => setToast(null), 3000);
  }
  return { toast, show };
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div>
      {/* Header skel */}
      <div
        style={{
          background: "var(--bg2)",
          border: "1px solid var(--brd)",
          borderRadius: "var(--r)",
          marginBottom: 14,
          padding: 18,
        }}
      >
        <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
          <div
            className="int-skel"
            style={{ width: 36, height: 36, borderRadius: 9 }}
          />
          <div style={{ flex: 1 }}>
            <div
              className="int-skel"
              style={{
                height: 14,
                width: 120,
                marginBottom: 7,
                borderRadius: 4,
              }}
            />
            <div
              className="int-skel"
              style={{ height: 11, width: 200, borderRadius: 4 }}
            />
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            borderTop: "1px solid var(--brd)",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                padding: "12px 18px",
                borderRight: i < 2 ? "1px solid var(--brd)" : "none",
              }}
            >
              <div
                className="int-skel"
                style={{
                  height: 20,
                  width: 32,
                  marginBottom: 6,
                  borderRadius: 4,
                }}
              />
              <div
                className="int-skel"
                style={{ height: 10, width: 70, borderRadius: 4 }}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Provider skels */}
      {[0, 1].map((i) => (
        <div
          key={i}
          style={{
            background: "var(--bg2)",
            border: "1px solid var(--brd)",
            borderRadius: "var(--r)",
            marginBottom: 10,
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            className="int-skel"
            style={{ width: 40, height: 40, borderRadius: 10 }}
          />
          <div style={{ flex: 1 }}>
            <div
              className="int-skel"
              style={{
                height: 13,
                width: 100,
                marginBottom: 7,
                borderRadius: 4,
              }}
            />
            <div
              className="int-skel"
              style={{ height: 10, width: 180, borderRadius: 4 }}
            />
          </div>
          <div
            className="int-skel"
            style={{ height: 24, width: 80, borderRadius: 20 }}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function PanelIntegrations() {
  const [googleConns, setGoogleConns] = useState<UiConnection[]>([]);
  const [msConns, setMsConns] = useState<UiConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [drawer, setDrawer] = useState<DrawerMode | null>(null);
  const { toast, show } = useToast();

  // ── Fetch on mount ──
  useEffect(() => {
    setLoading(true);
    apiFetch(`${baseUrl()}/integrations`, { headers: authHeaders() })
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json() as Promise<ApiIntegrationsResponse>;
      })
      .then((data) => {
        setGoogleConns(transformConnections(data.google ?? [], "google"));
        setMsConns(transformConnections(data.microsoft ?? [], "microsoft"));
        setApiError(null);
      })
      .catch((err: Error) => setApiError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // ── KPI counts ──
  const allConns = [...googleConns, ...msConns];
  const totalApps = allConns.reduce(
    (s, c) => s + c.apps.filter((a) => a.enabled).length,
    0,
  );
  const totalAccts = allConns.length;
  const totalProvs = [googleConns, msConns].filter((g) => g.length > 0).length;

  // ── Toggle app enabled state locally after API call ──
  function handleToggle(appInstanceId: string, enabled: boolean) {
    const update = (conns: UiConnection[]) =>
      conns.map((c) => ({
        ...c,
        apps: c.apps.map((a) =>
          a.appInstanceId === appInstanceId ? { ...a, enabled } : a,
        ),
      }));
    setGoogleConns(update);
    setMsConns(update);
    show(enabled ? "App enabled" : "App paused", "info");
  }

  // ── Drawer confirm ──
  function handleConfirm(mode: DrawerMode) {
    if (mode.type === "add-account") {
      show(
        `${mode.provider === "google" ? "Google" : "Microsoft"} account connected`,
        "ok",
      );
    } else if (mode.type === "reauth") {
      show("Token refreshed", "info");
    } else if (mode.type === "revoke") {
      setGoogleConns((cs) => cs.filter((c) => c.connectionId !== mode.connId));
      setMsConns((cs) => cs.filter((c) => c.connectionId !== mode.connId));
      show(`${mode.connLabel} revoked`, "err");
    } else if (mode.type === "app-settings") {
      show("Settings saved", "ok");
    }
    setDrawer(null);
  }

  if (loading)
    return (
      <>
        <style>{INT_STYLES}</style>
        <Skeleton />
      </>
    );

  return (
    <>
      <style>{INT_STYLES}</style>

      {toast && (
        <div className={`int-toast ${toast.kind}`}>
          {toast.kind === "ok" ? "✓" : toast.kind === "err" ? "✕" : "·"}{" "}
          {toast.msg}
        </div>
      )}

      <Drawer
        mode={drawer}
        onClose={() => setDrawer(null)}
        onConfirm={handleConfirm}
      />

      {/* API error banner */}
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
          ⚠ Could not load integrations ({apiError}) — showing cached state.
        </div>
      )}

      {/* Header KPI card */}
      <div className="int-hdr">
        <div className="int-hdr-top">
          <div className="int-hdr-icon">{ICONS.link}</div>
          <div>
            <div className="int-hdr-title">Integrations</div>
            <div className="int-hdr-sub">
              <strong>{totalApps} apps active</strong> · {totalAccts} accounts
              connected
            </div>
          </div>
        </div>
        <div className="int-kpi-strip">
          <div className="int-kpi">
            <div className="int-kpi-val c-acc">{totalApps}</div>
            <div className="int-kpi-lbl">Apps active</div>
          </div>
          <div className="int-kpi">
            <div className="int-kpi-val c-ok">{totalAccts}</div>
            <div className="int-kpi-lbl">Accounts</div>
          </div>
          <div className="int-kpi">
            <div className="int-kpi-val c-vi">{totalProvs}</div>
            <div className="int-kpi-lbl">Providers</div>
          </div>
        </div>
        <div className="int-hdr-info">
          <span style={{ color: "var(--ink4)", flexShrink: 0, marginTop: 1 }}>
            {ICONS.info}
          </span>
          <span>
            <strong>Multiple accounts per provider.</strong> Gmail and Drive on
            the same Google account share one OAuth token. Connect a second
            Google account to get an independent set of apps with separate
            credentials and settings.
          </span>
        </div>
      </div>

      {/* Provider sections */}
      {(["google", "microsoft"] as const).map((provId, i) => {
        const meta = PROVIDER_META[provId];
        const conns = provId === "google" ? googleConns : msConns;
        return (
          <ProvSection
            key={provId}
            meta={meta}
            connections={conns}
            defaultOpen={i === 0}
            onAdd={(p) => setDrawer({ type: "add-account", provider: p.id })}
            onReauth={(conn) =>
              setDrawer({
                type: "reauth",
                connLabel: conn.label,
                connId: conn.connectionId,
              })
            }
            onRevoke={(conn) =>
              setDrawer({
                type: "revoke",
                connLabel: conn.label,
                connId: conn.connectionId,
                appNames: conn.apps.filter((a) => a.enabled).map((a) => a.name),
              })
            }
            onSettings={(app, connLabel) =>
              setDrawer({
                type: "app-settings",
                appName: app.name,
                connLabel,
                appInstanceId: app.appInstanceId,
                appType: app.appType,
                config: app.config,
              })
            }
            onToggle={handleToggle}
          />
        );
      })}
    </>
  );
}
