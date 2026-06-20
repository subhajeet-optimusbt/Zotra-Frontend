import React, { useState, useEffect, useCallback, useRef } from "react";
import { baseUrl, apiFetch } from "../utils/utils";

// ─── Styles ───────────────────────────────────────────────────────────────────
export const RUBRIC_STYLES = `

/* ── Root overrides for this panel ── */
.rp-root {
  --rp-font: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
  --rp-mono: 'IBM Plex Mono', 'JetBrains Mono', ui-monospace, monospace;
  --rp-radius: 12px;
  --rp-radius-sm: 8px;
  --rp-radius-xs: 6px;
  --rp-shadow-sm: 0 1px 2px rgba(0,0,0,.05), 0 0 0 1px rgba(0,0,0,.04);
  --rp-shadow-md: 0 4px 12px rgba(0,0,0,.08), 0 0 0 1px rgba(0,0,0,.04);
  --rp-shadow-focus: 0 0 0 3px color-mix(in srgb, var(--p) 18%, transparent);
  --rp-transition: all .16s cubic-bezier(.4,0,.2,1);
  font-family: var(--rp-font);
}

/* ── Card container ── */
.rp-card {
  background: var(--bg);
  border: 1px solid var(--brd);
  border-radius: var(--rp-radius);
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: var(--rp-shadow-sm);
  transition: box-shadow .2s;
}
.rp-card:hover {
  box-shadow: var(--rp-shadow-md);
}

/* ── Card header ── */
.rp-card-hdr {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--brd);
  background: var(--bg2);
}
.rp-card-icon {
  width: 34px;
  height: 34px;
  border-radius: var(--rp-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.12), 0 1px 2px rgba(0,0,0,.1);
}
.rp-card-title {
  font-size: 13.5px;
  font-weight: 650;
  color: var(--ink);
  letter-spacing: -.01em;
  line-height: 1.3;
}
.rp-card-api {
  font-family: var(--rp-mono);
  font-size: 10px;
  color: var(--ink5);
  background: var(--bg3);
  border: 0.5px solid var(--brd2);
  padding: 1px 7px;
  border-radius: 4px;
  margin-top: 3px;
  display: inline-block;
  letter-spacing: .01em;
}
.rp-card-desc {
  padding: 11px 20px 14px;
  font-size: 12px;
  color: var(--ink4);
  line-height: 1.6;
  border-bottom: 1px solid var(--brd);
  background: linear-gradient(to bottom, var(--bg2), var(--bg));
}

/* ── Section stripe label ── */
.rp-section-label {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 20px;
  background: var(--bg2);
  border-bottom: 1px solid var(--brd);
}
.rp-section-label-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--p);
  flex-shrink: 0;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--p) 20%, transparent);
}
.rp-section-label-text {
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--p);
  font-family: var(--rp-mono);
}

/* ── Table column header row ── */
.rp-col-hdr {
  display: flex;
  align-items: center;
  padding: 8px 20px;
  background: var(--bg3);
  border-bottom: 1px solid var(--brd);
  gap: 10px;
}
.rp-col-hdr-cell {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--ink5);
  user-select: none;
}

/* ── Band rows ── */
.rb-row {
  display: grid;
  grid-template-columns: 148px 70px 1fr 1fr;
  gap: 12px;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid var(--brd);
  transition: background .12s;
  position: relative;
}
.rb-row::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: transparent;
  transition: background .16s;
  border-radius: 0 2px 2px 0;
}
.rb-row:hover {
  background: color-mix(in srgb, var(--p) 2.5%, transparent);
}
.rb-row:hover::before {
  background: color-mix(in srgb, var(--p) 35%, transparent);
}
.rb-row-hd {
  background: var(--bg3) !important;
  padding: 8px 20px !important;
}
.rb-row-hd::before { display: none; }

/* ── Dimension rows ── */
.rub-dim-row {
  display: grid;
  grid-template-columns: 1fr 96px 96px 42px;
  gap: 12px;
  align-items: center;
  padding: 13px 20px;
  border-bottom: 1px solid var(--brd);
  transition: background .12s;
  position: relative;
}
.rub-dim-row::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: transparent;
  transition: background .16s;
  border-radius: 0 2px 2px 0;
}
.rub-dim-row:hover {
  background: color-mix(in srgb, var(--p) 2.5%, transparent);
}
.rub-dim-row:hover::before {
  background: color-mix(in srgb, var(--p) 35%, transparent);
}
.rub-dim-row-hd {
  background: var(--bg3) !important;
  padding: 8px 20px !important;
}
.rub-dim-row-hd::before { display: none; }
.rub-dim-row.disabled {
  opacity: .45;
}
.rub-dim-row.disabled .rub-dim-name {
  text-decoration: line-through;
  text-decoration-color: color-mix(in srgb, var(--ink) 30%, transparent);
}

/* ── Numeric input ── */
.rub-num-input {
  width: 52px;
  height: 32px;
  border: 1px solid var(--brd2) !important;
  border-radius: var(--rp-radius-sm);
  background: var(--bg) !important;
  color: var(--ink);
  font-family: var(--rp-mono);
  font-size: 12.5px;
  font-weight: 600;
  text-align: center;
  outline: none;
  transition: var(--rp-transition);
  -moz-appearance: textfield;
  box-shadow: var(--rp-shadow-sm);
}
.rub-num-input::-webkit-outer-spin-button,
.rub-num-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
.rub-num-input:hover {
  border-color: color-mix(in srgb, var(--p) 40%, transparent) !important;
}
.rub-num-input:focus {
  border-color: var(--p) !important;
  box-shadow: var(--rp-shadow-focus);
}
.rub-num-input.err {
  border-color: var(--ri) !important;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--ri) 14%, transparent);
}
.rub-pct {
  font-family: var(--rp-mono);
  font-size: 10.5px;
  font-weight: 600;
  color: var(--ink5);
}

/* ── Text inputs (band description/guidance) ── */
.rc-edit-input {
  height: 32px;
  border: 1px solid var(--brd2) !important;
  border-radius: var(--rp-radius-sm);
  background: var(--bg) !important;
  color: var(--ink);
  font-size: 12px;
  padding: 0 10px;
  outline: none;
  transition: var(--rp-transition);
  box-shadow: var(--rp-shadow-sm);
  font-family: var(--rp-font);
}
.rc-edit-input:hover {
  border-color: color-mix(in srgb, var(--p) 40%, transparent) !important;
}
.rc-edit-input:focus {
  border-color: var(--p) !important;
  box-shadow: var(--rp-shadow-focus);
}

/* ── Band name pill ── */
.rb-band-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px 4px 8px;
  border-radius: 20px;
  font-family: var(--rp-mono);
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: .01em;
  white-space: nowrap;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.25), 0 1px 2px rgba(0,0,0,.07);
}
.rb-band-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  opacity: .7;
  flex-shrink: 0;
}

/* ── Total / weight bar ── */
.rub-total-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 20px;
  border-top: 1px solid var(--brd);
  background: var(--bg2);
  flex-wrap: wrap;
}
.rub-total-summary { display: flex; align-items: center; gap: 10px; margin-right: auto; flex-wrap: wrap; }
.rub-total-label {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--ink4);
}
.rub-total-val {
  font-family: var(--rp-mono);
  font-size: 14px;
  font-weight: 700;
  transition: color .2s;
  letter-spacing: -.02em;
}
.rub-total-val.ok { color: var(--ok); }
.rub-total-val.err { color: var(--ri); }
.rub-total-val.warn { color: var(--wa); }
.rub-prog-track {
  height: 5px;
  border-radius: 99px;
  background: var(--brd2);
  width: 120px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: inset 0 1px 2px rgba(0,0,0,.06);
}
.rub-prog-fill {
  height: 100%;
  border-radius: 99px;
  transition: width .28s cubic-bezier(.4,0,.2,1), background .2s;
}
.rub-ready-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10.5px;
  color: var(--okf);
  background: var(--okb);
  padding: 3px 9px;
  border-radius: 20px;
  font-weight: 600;
  border: 0.5px solid color-mix(in srgb, var(--ok) 25%, transparent);
}

/* ── Warning banner ── */
.rub-warn-banner {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin: 0 20px;
  padding: 11px 14px;
  border-radius: var(--rp-radius-sm);
  animation: rub-banner-in .2s ease;
  border: 1px solid transparent;
}
@keyframes rub-banner-in { from { opacity:0; transform:translateY(-4px) } to { opacity:1; transform:translateY(0) } }
.rub-warn-icon {
  width: 30px; height: 30px;
  border-radius: var(--rp-radius-xs);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; flex-shrink: 0;
  font-weight: 700;
}
.rub-warn-body { flex: 1; min-width: 0; }
.rub-warn-title { font-size: 12.5px; font-weight: 650; margin-bottom: 2px; }
.rub-warn-sub { font-size: 11.5px; color: var(--ink3); line-height: 1.5; }
.rub-warn-val { font-family: var(--rp-mono); font-weight: 700; }
.rub-warn-banner.over {
  background: color-mix(in srgb, var(--ri) 8%, transparent);
  border-color: color-mix(in srgb, var(--ri) 20%, transparent);
}
.rub-warn-banner.over .rub-warn-icon { background: color-mix(in srgb, var(--ri) 14%, transparent); color: var(--ri); }
.rub-warn-banner.over .rub-warn-title { color: var(--ri); }
.rub-warn-banner.over .rub-warn-val { color: var(--ri); }
.rub-warn-banner.under {
  background: color-mix(in srgb, var(--wa) 8%, transparent);
  border-color: color-mix(in srgb, var(--wa) 20%, transparent);
}
.rub-warn-banner.under .rub-warn-icon { background: color-mix(in srgb, var(--wa) 14%, transparent); color: var(--wa); }
.rub-warn-banner.under .rub-warn-title { color: var(--wa); }
.rub-warn-banner.under .rub-warn-val { color: var(--wa); }

/* ── Save footer ── */
.rp-save-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 13px 20px;
  border-top: 1px solid var(--brd);
  background: var(--bg2);
}

/* ── Buttons (reset / primary) ── */
.rp-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 14px;
  height: 32px;
  border-radius: var(--rp-radius-sm);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid var(--brd2);
  background: var(--bg);
  color: var(--ink3);
  transition: var(--rp-transition);
  white-space: nowrap;
  font-family: var(--rp-font);
  letter-spacing: -.005em;
  box-shadow: var(--rp-shadow-sm);
}
.rp-btn:hover {
  background: var(--bg2);
  color: var(--ink);
  border-color: var(--brd);
}
.rp-btn:active { transform: translateY(1px); }
.rp-btn:disabled { opacity: .45; cursor: not-allowed; pointer-events: none; }
.rp-btn.pri {
  background: var(--p);
  color: #fff;
  border-color: var(--p);
  box-shadow: 0 1px 3px color-mix(in srgb, var(--p) 40%, transparent), inset 0 1px 0 rgba(255,255,255,.15);
}
.rp-btn.pri:hover {
  background: color-mix(in srgb, var(--p) 88%, #000);
  border-color: color-mix(in srgb, var(--p) 88%, #000);
}
.rp-btn.pri:disabled {
  opacity: .38;
}

/* ── Toast ── */
.rp-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: var(--rp-radius-sm);
  font-size: 12.5px;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(0,0,0,.15), 0 0 0 1px rgba(0,0,0,.06);
  animation: rp-toast-in .22s cubic-bezier(.34,1.56,.64,1);
  pointer-events: none;
  font-family: var(--rp-font);
  letter-spacing: -.005em;
}
@keyframes rp-toast-in { from { opacity:0; transform:translateY(8px) scale(.95) } to { opacity:1; transform:none } }
.rp-toast.ok { background: var(--bg); color: var(--okf); border: 1px solid color-mix(in srgb, var(--ok) 25%, transparent); }
.rp-toast.ok .rp-toast-icon { background: var(--okb); color: var(--okf); }
.rp-toast.err { background: var(--bg); color: var(--ri); border: 1px solid color-mix(in srgb, var(--ri) 25%, transparent); }
.rp-toast.err .rp-toast-icon { background: color-mix(in srgb, var(--ri) 12%, transparent); color: var(--ri); }
.rp-toast-icon {
  width: 22px; height: 22px; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; flex-shrink: 0;
}

/* ── Toggle switch ── */
.rp-tg {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
}
.rp-tg input { position: absolute; opacity: 0; width: 0; height: 0; }
.rp-tg-track {
  width: 34px; height: 19px;
  border-radius: 99px;
  background: var(--brd2);
  border: 1px solid var(--brd);
  transition: background .18s, border-color .18s;
  box-shadow: inset 0 1px 2px rgba(0,0,0,.06);
}
.rp-tg input:checked ~ .rp-tg-track {
  background: var(--p);
  border-color: var(--p);
  box-shadow: inset 0 1px 2px rgba(0,0,0,.08);
}
.rp-tg-thumb {
  position: absolute;
  left: 3px; top: 50%;
  transform: translateY(-50%);
  width: 13px; height: 13px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,.18), 0 0 0 0.5px rgba(0,0,0,.06);
  transition: left .18s cubic-bezier(.34,1.2,.64,1);
  pointer-events: none;
}
.rp-tg input:checked ~ .rp-tg-thumb { left: 18px; }
.rp-tg input:disabled ~ .rp-tg-track { opacity: .5; cursor: not-allowed; }

/* ── Skeleton shimmer ── */
.rp-skel {
  background: linear-gradient(90deg, var(--bg2) 25%, var(--bg3) 50%, var(--bg2) 75%);
  background-size: 200% 100%;
  animation: rp-skel-wave 1.6s ease-in-out infinite;
  border-radius: 6px;
}
@keyframes rp-skel-wave { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }

/* ── Error banner ── */
.rp-err-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  font-size: 12px;
  color: var(--ri);
  background: color-mix(in srgb, var(--ri) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--ri) 22%, transparent);
  border-radius: var(--rp-radius-sm);
  margin-bottom: 14px;
}

/* ══════════════════════════════════════════════
   EXPLAINER — "How rubric scoring works"
   Uses Zotra CSS variables throughout
══════════════════════════════════════════════ */

/* ── Collapsed trigger row ── */
.rp-explainer {
  border-top: 1px solid var(--brd);
  overflow: hidden;
}
.rp-exp-trigger {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 20px;
  cursor: pointer;
  user-select: none;
  transition: background .14s;
  background: var(--bg2);
}
.rp-exp-trigger:hover {
  background: color-mix(in srgb, var(--wa) 5%, var(--bg2));
}
.rp-exp-trigger-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}
.rp-exp-trigger-icon {
  width: 34px; height: 34px;
  border-radius: 9px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  position: relative;
  transition: var(--rp-transition);
}
.rp-exp-trigger-icon-open {
  background: var(--wab);
  border: 1px solid color-mix(in srgb, var(--wa) 30%, transparent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--wa) 12%, transparent);
}
.rp-exp-trigger-icon-closed {
  background: var(--bg3);
  border: 1px solid var(--brd2);
}
.rp-exp-trigger-text {
  font-size: 13px;
  font-weight: 650;
  letter-spacing: -.015em;
  line-height: 1.25;
}
.rp-exp-trigger-sub {
  font-size: 11px;
  margin-top: 1px;
  line-height: 1.3;
}
.rp-exp-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .05em;
  text-transform: uppercase;
  white-space: nowrap;
  flex-shrink: 0;
}
.rp-exp-chevron-wrap {
  width: 26px; height: 26px;
  border-radius: 7px;
  border: 1px solid var(--brd2);
  background: var(--bg);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  transition: var(--rp-transition);
  font-size: 10px;
  color: var(--ink4);
}
.rp-exp-chevron-wrap.open {
  background: var(--wab);
  border-color: color-mix(in srgb, var(--wa) 30%, transparent);
  color: var(--wa);
}
.rp-exp-chevron-wrap svg {
  transition: transform .22s cubic-bezier(.4,0,.2,1);
}
.rp-exp-chevron-wrap.open svg {
  transform: rotate(180deg);
}

/* ── Body container ── */
.rp-exp-body {
  border-top: 1px solid color-mix(in srgb, var(--wa) 20%, transparent);
  background: color-mix(in srgb, var(--wa) 3%, var(--bg));
  animation: rp-exp-in .2s ease;
}
@keyframes rp-exp-in { from { opacity: 0; transform: translateY(-4px) } to { opacity: 1; transform: none } }

/* ── Section divider inside body ── */
.rp-exp-section {
  padding: 18px 20px;
  border-bottom: 1px solid color-mix(in srgb, var(--wa) 12%, transparent);
}
.rp-exp-section:last-child { border-bottom: none; }
.rp-exp-section-label {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 13px;
}
.rp-exp-section-label-text {
  font-family: var(--rp-mono);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--wa);
}
.rp-exp-section-label-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, color-mix(in srgb, var(--wa) 25%, transparent), transparent);
}

/* ── 3-step pipeline row ── */
.rp-pipeline {
  display: grid;
  grid-template-columns: 1fr 24px 1fr 24px 1fr;
  align-items: start;
  gap: 0;
}
.rp-pipeline-step {
  background: var(--bg2);
  border: 0.5px solid color-mix(in srgb, var(--wa) 20%, transparent);
  border-radius: 10px;
  padding: 13px 14px 14px;
  position: relative;
}
.rp-pipeline-step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px; height: 20px;
  border-radius: 6px;
  background: var(--wab);
  border: 0.5px solid color-mix(in srgb, var(--wa) 25%, transparent);
  font-family: var(--rp-mono);
  font-size: 9px; font-weight: 800;
  color: var(--waf);
  margin-bottom: 9px;
  letter-spacing: 0;
}
.rp-pipeline-step-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 5px;
  letter-spacing: -.01em;
}
.rp-pipeline-step-body {
  font-size: 11px;
  color: var(--ink4);
  line-height: 1.55;
}
.rp-pipeline-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 22px;
  color: var(--wa);
  font-size: 14px;
}

/* ── Formula block ── */
.rp-formula-block {
  display: flex;
  align-items: center;
  gap: 0;
  border-radius: 9px;
  border: 0.5px solid color-mix(in srgb, var(--wa) 25%, transparent);
  overflow: hidden;
}
.rp-formula-label-cell {
  padding: 10px 14px;
  background: var(--wab);
  border-right: 0.5px solid color-mix(in srgb, var(--wa) 25%, transparent);
  font-family: var(--rp-mono);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--waf);
  white-space: nowrap;
  flex-shrink: 0;
}
.rp-formula-expr {
  flex: 1;
  padding: 10px 16px;
  background: color-mix(in srgb, var(--wa) 4%, var(--bg2));
  font-family: var(--rp-mono);
  font-size: 13px;
  font-weight: 600;
  color: var(--ink2);
  letter-spacing: -.01em;
}
.rp-formula-note {
  padding: 10px 14px;
  font-size: 11px;
  color: var(--wa);
  border-left: 0.5px solid color-mix(in srgb, var(--wa) 25%, transparent);
  background: var(--wab);
  white-space: nowrap;
  flex-shrink: 0;
}

/* ── Live example table ── */
.rp-ex-wrap {
  border: 0.5px solid color-mix(in srgb, var(--wa) 25%, transparent);
  border-radius: 9px;
  overflow: hidden;
}
.rp-ex-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: var(--wab);
  border-bottom: 0.5px solid color-mix(in srgb, var(--wa) 20%, transparent);
}
.rp-ex-header-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--wa);
  flex-shrink: 0;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--wa) 20%, transparent);
}
.rp-ex-header-label {
  font-family: var(--rp-mono);
  font-size: 9px; font-weight: 700;
  letter-spacing: .12em; text-transform: uppercase;
  color: var(--waf);
}
.rp-ex-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--bg2);
}
.rp-ex-table th {
  padding: 7px 14px;
  text-align: left;
  font-size: 9.5px; font-weight: 600;
  letter-spacing: .05em; text-transform: uppercase;
  color: var(--ink4);
  border-bottom: 0.5px solid color-mix(in srgb, var(--wa) 15%, transparent);
  background: color-mix(in srgb, var(--wa) 4%, var(--bg3));
}
.rp-ex-table td {
  padding: 9px 14px;
  font-size: 12px;
  color: var(--ink2);
  border-bottom: 0.5px solid var(--brd);
  vertical-align: middle;
}
.rp-ex-table tr:last-child td { border-bottom: none; }
.rp-ex-table tbody tr:hover td {
  background: color-mix(in srgb, var(--wa) 4%, var(--bg2));
}
/* composite total row */
.rp-ex-table .rp-ex-total td {
  background: var(--wab) !important;
  border-top: 1px solid color-mix(in srgb, var(--wa) 20%, transparent);
  border-bottom: none;
}
.rp-ex-score-big {
  font-family: var(--rp-mono);
  font-size: 18px;
  font-weight: 800;
  color: var(--wa);
  letter-spacing: -.02em;
}
.rp-ex-score-denom {
  font-family: var(--rp-mono);
  font-size: 11px;
  color: var(--waf);
  margin-left: 3px;
}
.rp-ex-band-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 20px;
  font-family: var(--rp-mono);
  font-size: 10.5px;
  font-weight: 700;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.25);
}
.rp-ex-arrow {
  color: var(--wa);
  font-size: 13px;
  font-weight: 700;
  margin-right: 7px;
}

/* ── Legacy compat aliases (referenced by rest of app) ── */
.sv-card { /* alias → rp-card */ }
.sv-card-hdr { /* alias → rp-card-hdr */ }
.sv-save { display:flex;align-items:center;justify-content:flex-end;gap:8px;padding:13px 20px;border-top:1px solid var(--brd);background:var(--bg2); }
`;

// ─── API shapes ───────────────────────────────────────────────────────────────
interface ApiBand {
  partitionKey: string;
  rowKey: string;
  score: number;
  band: string;
  description: string;
  evaluationGuidance: string;
  sortOrder: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  eTag: string;
  timestamp: string;
}

interface ApiDimension {
  partitionKey: string;
  rowKey: string;
  dimensionKey: string;
  displayName: string;
  description: string;
  weight: number;
  flagBelowScore: number;
  enabled: boolean;
  sortOrder: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  eTag: string;
  timestamp: string;
}

interface ApiRubricResponse {
  scoreBands: ApiBand[];
  dimensions: ApiDimension[];
}

interface BandPatchItem {
  rowKey: string;
  score: number;
  band: string;
  description: string;
  evaluationGuidance: string;
  sortOrder: number;
}

interface DimPatchItem {
  dimensionKey: string;
  displayName: string;
  description: string;
  weight: number;
  flagBelowScore: number;
  enabled: boolean;
  sortOrder: number;
}

export interface ScoreBand {
  rowKey: string;
  sortOrder: number;
  score: number;
  band: string;
  description: string;
  evaluationGuidance: string;
  badge: { bg: string; color: string; label: string };
}

export interface RubricDimension {
  rowKey: string;
  dimensionKey: string;
  sortOrder: number;
  displayName: string;
  description: string;
  weight: number;
  flagBelowScore: number;
  enabled: boolean;
}

// ─── Badge derived purely from score value ────────────────────────────────────
function badgeForScore(score: number): {
  bg: string;
  color: string;
  label: string;
} {
  if (score >= 10) return { bg: "#5552C9", color: "#fff", label: "Confirmed" };
  if (score >= 8) return { bg: "#DCFCE7", color: "#166534", label: "Strong" };
  if (score >= 6) return { bg: "#DBEAFE", color: "#1E40AF", label: "Partial" };
  if (score >= 3) return { bg: "#FEF9C3", color: "#854D0E", label: "Weak" };
  return { bg: "#F1F5F9", color: "#475569", label: "Absent" };
}

function mapApiBand(r: ApiBand): ScoreBand {
  return {
    rowKey: r.rowKey,
    sortOrder: r.sortOrder,
    score: r.score,
    band: r.band,
    description: r.description,
    evaluationGuidance: r.evaluationGuidance,
    badge: badgeForScore(r.score),
  };
}

function mapApiDimension(r: ApiDimension): RubricDimension {
  return {
    rowKey: r.rowKey,
    dimensionKey: r.dimensionKey,
    sortOrder: r.sortOrder,
    displayName: r.displayName,
    description: r.description,
    weight: r.weight,
    flagBelowScore: r.flagBelowScore,
    enabled: r.enabled,
  };
}

function mapBandToPatch(b: ScoreBand): BandPatchItem {
  return {
    rowKey: b.rowKey,
    score: b.score,
    band: b.band,
    description: b.description,
    evaluationGuidance: b.evaluationGuidance,
    sortOrder: b.sortOrder,
  };
}

function mapDimToPatch(d: RubricDimension): DimPatchItem {
  return {
    dimensionKey: d.dimensionKey,
    displayName: d.displayName,
    description: d.description,
    weight: d.weight,
    flagBelowScore: d.flagBelowScore,
    enabled: d.enabled,
    sortOrder: d.sortOrder,
  };
}

// ─── Static band names in sortOrder (0→4) ────────────────────────────────────
const BAND_NAMES = [
  "no_evidence",
  "weak_implied",
  "partial_unconfirmed",
  "strong_evidence",
  "explicit_confirmed",
] as const;

const EXAMPLE_SCORES: Record<string, number> = {
  evidence_strength: 8,
  coverage: 7,
  consistency: 6,
  freshness: 9,
  confidence: 7.2,
};

// ─── Primitives ───────────────────────────────────────────────────────────────
function Toast({ msg, type }: { msg: string; type: "ok" | "err" }) {
  return (
    <div className={`rp-toast ${type}`}>
      <div className="rp-toast-icon">{type === "ok" ? "✓" : "✕"}</div>
      {msg}
    </div>
  );
}

function CardHdr({
  icon,
  iconBg = "var(--pp)",
  iconColor = "var(--p)",
  title,
  api,
  sub,
}: {
  icon: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
  title: React.ReactNode;
  api?: string;
  sub?: React.ReactNode;
}) {
  return (
    <div className="rp-card-hdr">
      <div
        className="rp-card-icon"
        style={{ background: iconBg, color: iconColor }}
      >
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="rp-card-title">{title}</div>
        {api && <span className="rp-card-api">{api}</span>}
      </div>
      {sub && <div style={{ marginLeft: "auto", flexShrink: 0 }}>{sub}</div>}
    </div>
  );
}

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
    <label className="rp-tg">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="rp-tg-track" />
      <span className="rp-tg-thumb" />
    </label>
  );
}

function NumInput({
  value,
  isErr = false,
  min = 0,
  max = 100,
  step = 1,
  style,
  onChange,
}: {
  value: number;
  isErr?: boolean;
  min?: number;
  max?: number;
  step?: number;
  style?: React.CSSProperties;
  onChange: (v: number) => void;
}) {
  const [draft, setDraft] = useState(String(value));
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  function commit(raw: string) {
    const n = step < 1 ? parseFloat(raw) : parseInt(raw, 10);
    if (!isNaN(n) && n >= min && n <= max) {
      onChange(n);
      setDraft(String(n));
    } else setDraft(String(value));
  }

  return (
    <input
      ref={ref}
      type="number"
      min={min}
      max={max}
      step={step}
      className={`rub-num-input${isErr ? " err" : ""}`}
      style={style}
      value={draft}
      onChange={(e) => {
        setDraft(e.target.value);
        const n =
          step < 1 ? parseFloat(e.target.value) : parseInt(e.target.value, 10);
        if (!isNaN(n) && n >= min && n <= max) onChange(n);
      }}
      onBlur={(e) => commit(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          commit((e.target as HTMLInputElement).value);
          ref.current?.blur();
        }
        if (e.key === "Escape") {
          setDraft(String(value));
          ref.current?.blur();
        }
      }}
    />
  );
}

function WeightWarnBanner({
  variant,
  total,
}: {
  variant: "over" | "under";
  total: number;
}) {
  const isOver = variant === "over";
  const diff = isOver ? total - 100 : 100 - total;
  return (
    <div className={`rub-warn-banner ${variant}`}>
      <div className="rub-warn-icon">{isOver ? "⚠" : "◑"}</div>
      <div className="rub-warn-body">
        <div className="rub-warn-title">
          {isOver ? "Weights exceed 100%" : "Weights below 100%"}
        </div>
        <div className="rub-warn-sub">
          Total is <span className="rub-warn-val">{total}%</span>
          {isOver ? (
            <>
              {" "}
              — reduce by <span className="rub-warn-val">+{diff}%</span> to
              save.
            </>
          ) : (
            <>
              {" "}
              — add <span className="rub-warn-val">{diff}%</span> more to reach
              exactly 100%.
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ErrBanner({ msg, onRetry }: { msg: string; onRetry: () => void }) {
  return (
    <div className="rp-err-banner">
      <span style={{ flexShrink: 0 }}>⚠</span>
      <span style={{ flex: 1 }}>Could not load rubric config ({msg}).</span>
      <button className="rp-btn" onClick={onRetry} style={{ fontSize: 11.5 }}>
        Retry
      </button>
    </div>
  );
}

function RubricExplainer({
  dims,
  bands,
}: {
  dims: RubricDimension[];
  bands: ScoreBand[];
}) {
  const [open, setOpen] = useState(false);
  const activeDims = dims.filter((d) => d.enabled);
  const rows = activeDims.map((d) => {
    const rawScore = EXAMPLE_SCORES[d.dimensionKey] ?? 7;
    const weightFrac = d.weight / 100;
    const contrib = +(rawScore * weightFrac).toFixed(2);
    return { dim: d, rawScore, weightFrac, contrib };
  });
  const composite = +rows.reduce((s, r) => s + r.contrib, 0).toFixed(2);
  const sortedBands = [...bands].sort((a, b) => b.score - a.score);
  const matchedBand = sortedBands.find((b) => composite >= b.score) ?? bands[0];
  const bandAbove = bands.find((b) => b.score > (matchedBand?.score ?? 0));
  const rangeLabel = matchedBand
    ? bandAbove
      ? `score ${matchedBand.score}.0–${bandAbove.score - 1 + 0.9}`
      : `score ${matchedBand.score}.0–10`
    : "";

  return (
    <div className="rp-explainer">
      {/* ── Trigger row ── */}
      <div className="rp-exp-trigger" onClick={() => setOpen((v) => !v)}>
        <div className="rp-exp-trigger-left">
          <div
            className={`rp-exp-trigger-icon ${open ? "rp-exp-trigger-icon-open" : "rp-exp-trigger-icon-closed"}`}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke={open ? "var(--wa)" : "var(--ink4)"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <div>
            <div
              className="rp-exp-trigger-text"
              style={{ color: open ? "var(--wa)" : "var(--ink)" }}
            >
              How rubric scoring works
            </div>
            <div
              className="rp-exp-trigger-sub"
              style={{ color: open ? "var(--wa)" : "var(--ink5)" }}
            >
              Weighted composite · score bands · rep guidance
            </div>
          </div>
        </div>

        <span
          className="rp-exp-pill"
          style={{
            background: "var(--wab)",
            color: "var(--waf)",
            border:
              "0.5px solid color-mix(in srgb, var(--wa) 25%, transparent)",
          }}
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--wa)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          Scoring model
        </span>

        <div className={`rp-exp-chevron-wrap${open ? " open" : ""}`}>
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* ── Expanded body ── */}
      {open && (
        <div className="rp-exp-body">
          {/* Section 1 — Pipeline */}
          <div className="rp-exp-section">
            <div className="rp-exp-section-label">
              <span className="rp-exp-section-label-text">
                Scoring pipeline
              </span>
              <span className="rp-exp-section-label-line" />
            </div>

            <div className="rp-pipeline">
              {[
                {
                  n: "1",
                  title: "Dimension scores",
                  body: "Each active dimension evaluates inference evidence and produces a raw score from 0–10.",
                },
                null, // arrow
                {
                  n: "2",
                  title: "Weighted average",
                  body: "Each score is multiplied by its weight%. The sum of all contributions gives the composite.",
                },
                null, // arrow
                {
                  n: "3",
                  title: "Band mapping",
                  body: "The composite score maps to a score band that controls rep guidance and agent actions.",
                },
              ].map((item, idx) =>
                item === null ? (
                  <div key={idx} className="rp-pipeline-arrow">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--wa)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                ) : (
                  <div key={item.n} className="rp-pipeline-step">
                    <div className="rp-pipeline-step-num">{item.n}</div>
                    <div className="rp-pipeline-step-title">{item.title}</div>
                    <div className="rp-pipeline-step-body">{item.body}</div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Section 2 — Formula */}
          <div className="rp-exp-section">
            <div className="rp-exp-section-label">
              <span className="rp-exp-section-label-text">Formula</span>
              <span className="rp-exp-section-label-line" />
            </div>
            <div className="rp-formula-block">
              <span className="rp-formula-label-cell">Σ</span>
              <span className="rp-formula-expr">
                composite_score = Σ ( dimension_score
                <sub style={{ fontSize: 9 }}>i</sub> × weight
                <sub style={{ fontSize: 9 }}>i</sub> )
              </span>
              <span className="rp-formula-note">→ maps to a score band</span>
            </div>
          </div>

          {/* Section 3 — Live example table */}
          <div className="rp-exp-section" style={{ paddingBottom: 20 }}>
            <div className="rp-exp-section-label">
              <span className="rp-exp-section-label-text">Live example</span>
              <span className="rp-exp-section-label-line" />
            </div>

            <div className="rp-ex-wrap">
              <div className="rp-ex-header">
                <span className="rp-ex-header-dot" />
                <span className="rp-ex-header-label">
                  budget_presence inference · active dimensions
                </span>
              </div>
              <table className="rp-ex-table">
                <thead>
                  <tr>
                    {["Dimension", "Raw score", "Weight", "Contribution"].map(
                      (h) => (
                        <th key={h}>{h}</th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.dim.dimensionKey}>
                      <td>
                        <span style={{ fontWeight: 600, color: "var(--ink)" }}>
                          {r.dim.displayName}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--rp-mono)",
                            fontSize: 9.5,
                            color: "var(--ink5)",
                            marginLeft: 7,
                            background: "var(--bg3)",
                            border: "0.5px solid var(--brd2)",
                            padding: "1px 5px",
                            borderRadius: 4,
                          }}
                        >
                          {r.dim.dimensionKey}
                        </span>
                      </td>
                      <td>
                        <span
                          style={{
                            fontFamily: "var(--rp-mono)",
                            fontSize: 13,
                            fontWeight: 700,
                            color: "var(--wa)",
                          }}
                        >
                          {r.rawScore}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            color: "var(--ink5)",
                            marginLeft: 3,
                          }}
                        >
                          /10
                        </span>
                      </td>
                      <td>
                        <span
                          style={{
                            fontFamily: "var(--rp-mono)",
                            fontSize: 12,
                            color: "var(--ink3)",
                          }}
                        >
                          {r.dim.weight}%
                        </span>
                      </td>
                      <td>
                        <span
                          style={{
                            fontFamily: "var(--rp-mono)",
                            fontSize: 11.5,
                            color: "var(--ink3)",
                          }}
                        >
                          {r.rawScore} × {r.weightFrac.toFixed(2)}{" "}
                          <span
                            style={{ color: "var(--ink6)", margin: "0 3px" }}
                          >
                            =
                          </span>
                          <strong
                            style={{ color: "var(--ink2)", fontWeight: 700 }}
                          >
                            {r.contrib.toFixed(2)}
                          </strong>
                        </span>
                      </td>
                    </tr>
                  ))}

                  {/* Composite total row */}
                  <tr className="rp-ex-total">
                    <td style={{ padding: "11px 14px" }}>
                      <span
                        style={{
                          fontSize: 11.5,
                          fontWeight: 700,
                          color: "var(--waf)",
                          letterSpacing: "-.01em",
                        }}
                      >
                        Composite score
                      </span>
                    </td>
                    <td style={{ padding: "11px 14px" }} colSpan={2}>
                      <span className="rp-ex-score-big">{composite}</span>
                      <span className="rp-ex-score-denom">/ 10</span>
                    </td>
                    <td style={{ padding: "11px 14px" }}>
                      <span className="rp-ex-arrow">→</span>
                      {matchedBand && (
                        <span
                          className="rp-ex-band-chip"
                          style={{
                            background: matchedBand.badge.bg,
                            color: matchedBand.badge.color,
                          }}
                        >
                          {BAND_NAMES[bands.indexOf(matchedBand)] ??
                            matchedBand.rowKey}
                        </span>
                      )}
                      <span
                        style={{
                          fontSize: 10.5,
                          color: "var(--ink4)",
                          marginLeft: 7,
                        }}
                      >
                        {rangeLabel}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BandSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "148px 70px 1fr 1fr",
            gap: 12,
            padding: "13px 20px",
            borderBottom: "1px solid var(--brd)",
          }}
        >
          {[1, 1, 1, 1].map((_x, j) => (
            <div
              key={j}
              className="rp-skel"
              style={{ height: 30, borderRadius: 8 }}
            />
          ))}
        </div>
      ))}
    </>
  );
}

function DimSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 96px 96px 42px",
            gap: 12,
            padding: "14px 20px",
            borderBottom: "1px solid var(--brd)",
          }}
        >
          <div>
            <div
              className="rp-skel"
              style={{ height: 13, width: 140, marginBottom: 7 }}
            />
            <div className="rp-skel" style={{ height: 10, width: 260 }} />
          </div>
          <div className="rp-skel" style={{ height: 30, borderRadius: 8 }} />
          <div className="rp-skel" style={{ height: 30, borderRadius: 8 }} />
          <div
            className="rp-skel"
            style={{ height: 19, width: 34, borderRadius: 10 }}
          />
        </div>
      ))}
    </>
  );
}

// ─── Root panel ───────────────────────────────────────────────────────────────
export default function PanelRubricConfig() {
  const [bands, setBands] = useState<ScoreBand[]>([]);
  const [dims, setDims] = useState<RubricDimension[]>([]);
  const [origBands, setOrigBands] = useState<ScoreBand[]>([]);
  const [origDims, setOrigDims] = useState<RubricDimension[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiErr] = useState<string | null>(null);

  function authHeaders(): Record<string, string> {
    const token = localStorage.getItem("zotra_token");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  const fetchData = useCallback(() => {
    setLoading(true);
    setApiErr(null);
    apiFetch(`${baseUrl()}/inference-rubric`, { headers: authHeaders() })
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json() as Promise<ApiRubricResponse>;
      })
      .then((data) => {
        const mappedBands = [...data.scoreBands]
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map(mapApiBand);
        const mappedDims = [...data.dimensions]
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map(mapApiDimension);
        setBands(mappedBands);
        setDims(mappedDims);
        setOrigBands(mappedBands.map((b) => ({ ...b })));
        setOrigDims(mappedDims.map((d) => ({ ...d })));
      })
      .catch((err: Error) => setApiErr(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="rp-root">
        <div className="rp-card">
          <CardHdr
            icon={
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
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            }
            title="Score Bands"
            api="GET /inference-rubric · PATCH /inference-rubric/bands"
          />
          <BandSkeleton />
        </div>
        <div className="rp-card">
          <CardHdr
            icon={
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
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            }
            title="Rubric Scoring Dimensions"
            api="GET /inference-rubric · PATCH /inference-rubric/dimensions"
          />
          <DimSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="rp-root">
      {apiError && <ErrBanner msg={apiError} onRetry={fetchData} />}
      <ScoreBandsPanel
        bands={bands}
        setBands={setBands}
        origBands={origBands}
        setOrigBands={setOrigBands}
        authHeaders={authHeaders}
      />
      <RubricDimensionsPanel
        dims={dims}
        setDims={setDims}
        origDims={origDims}
        setOrigDims={setOrigDims}
        bands={bands}
        authHeaders={authHeaders}
      />
    </div>
  );
}

// ─── Sub-panel A: Score Bands ─────────────────────────────────────────────────
interface BandsPanelProps {
  bands: ScoreBand[];
  setBands: React.Dispatch<React.SetStateAction<ScoreBand[]>>;
  origBands: ScoreBand[];
  setOrigBands: React.Dispatch<React.SetStateAction<ScoreBand[]>>;
  authHeaders: () => Record<string, string>;
}

function ScoreBandsPanel({
  bands,
  setBands,
  origBands,
  setOrigBands,
  authHeaders,
}: BandsPanelProps) {
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "ok" | "err";
  } | null>(null);

  function showToast(msg: string, type: "ok" | "err" = "ok") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function updateBand<K extends keyof ScoreBand>(
    idx: number,
    field: K,
    val: ScoreBand[K],
  ) {
    setBands((prev) =>
      prev.map((b, i) => {
        if (i !== idx) return b;
        const updated = { ...b, [field]: val };
        if (field === "score") updated.badge = badgeForScore(val as number);
        return updated;
      }),
    );
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await apiFetch(`${baseUrl()}/inference-rubric/bands`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify(bands.map(mapBandToPatch)),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      setOrigBands(bands.map((b) => ({ ...b })));
      showToast("Score bands saved");
    } catch (err) {
      showToast(`Save failed: ${(err as Error).message}`, "err");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      {toast && <Toast msg={toast.msg} type={toast.type} />}
      <div className="rp-card">
        <CardHdr
          icon={
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
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          }
          title="Score Bands"
          api="PATCH /inference-rubric/bands"
          sub={
            <span
              style={{
                fontFamily: "var(--rp-mono)",
                fontSize: 10.5,
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: 20,
                background: "var(--bg3)",
                color: "var(--ink4)",
                border: "1px solid var(--brd2)",
                letterSpacing: ".01em",
              }}
            >
              {bands.length} bands
            </span>
          }
        />
        <div className="rp-card-desc">
          Define score thresholds and the guidance text shown to reps at each
          band level.
        </div>

        {/* Column headers */}
        <div
          className="rb-row rb-row-hd"
          style={{
            display: "grid",
            gridTemplateColumns: "148px 70px 1fr 1fr",
            gap: 12,
          }}
        >
          {["Band", "Score ↕", "Description", "Evaluation Guidance"].map(
            (h) => (
              <div key={h} className="rp-col-hdr-cell">
                {h}
              </div>
            ),
          )}
        </div>

        {bands.map((b, i) => (
          <div key={b.rowKey} className="rb-row">
            {/* Band pill */}
            <div>
              <span
                className="rb-band-pill"
                style={{ background: b.badge.bg, color: b.badge.color }}
              >
                <span
                  className="rb-band-dot"
                  style={{ background: b.badge.color }}
                />
                {BAND_NAMES[i] ?? b.rowKey}
              </span>
            </div>

            {/* Score */}
            <div>
              <NumInput
                value={b.score}
                min={0}
                max={10}
                style={{ width: 52, minWidth: 52 }}
                onChange={(v) => updateBand(i, "score", v)}
              />
            </div>

            {/* Description */}
            <input
              className="sv-input rc-edit-input"
              style={{ width: "100%", minWidth: 0 }}
              value={b.description}
              onChange={(e) => updateBand(i, "description", e.target.value)}
            />

            {/* Evaluation Guidance */}
            <input
              className="sv-input rc-edit-input"
              style={{ width: "100%", minWidth: 0 }}
              value={b.evaluationGuidance}
              onChange={(e) =>
                updateBand(i, "evaluationGuidance", e.target.value)
              }
            />
          </div>
        ))}

        {bands.length === 0 && (
          <div
            style={{
              padding: "36px 20px",
              textAlign: "center",
              color: "var(--ink5)",
              fontSize: 12.5,
            }}
          >
            No score bands returned from API.
          </div>
        )}

        {/* Save footer */}
        <div className="rp-save-bar">
          <button
            className="rp-btn"
            disabled={saving}
            onClick={() => setBands(origBands.map((b) => ({ ...b })))}
          >
            Reset
          </button>
          <button className="rp-btn pri" onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Saving…
              </>
            ) : (
              <>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Save bands
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Sub-panel B: Rubric Dimensions ──────────────────────────────────────────
interface DimsPanelProps {
  dims: RubricDimension[];
  setDims: React.Dispatch<React.SetStateAction<RubricDimension[]>>;
  origDims: RubricDimension[];
  setOrigDims: React.Dispatch<React.SetStateAction<RubricDimension[]>>;
  bands: ScoreBand[];
  authHeaders: () => Record<string, string>;
}

function RubricDimensionsPanel({
  dims,
  setDims,
  origDims,
  setOrigDims,
  bands,
  authHeaders,
}: DimsPanelProps) {
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "ok" | "err";
  } | null>(null);

  function showToast(msg: string, type: "ok" | "err" = "ok") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function updateDim<K extends keyof RubricDimension>(
    idx: number,
    field: K,
    val: RubricDimension[K],
  ) {
    setDims((prev) =>
      prev.map((d, i) => (i === idx ? { ...d, [field]: val } : d)),
    );
  }

  const weightTotal = dims.reduce((s, d) => s + d.weight, 0);
  const isOver = weightTotal > 100;
  const isUnder = weightTotal < 100;
  const isExact = weightTotal === 100;
  const progPct = Math.min((weightTotal / 100) * 100, 100);
  const progColor = isOver ? "var(--ri)" : isExact ? "var(--ok)" : "var(--wa)";

  async function handleSave() {
    if (!isExact) return;
    setSaving(true);
    try {
      const res = await apiFetch(`${baseUrl()}/inference-rubric/dimensions`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify(dims.map(mapDimToPatch)),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      setOrigDims(dims.map((d) => ({ ...d })));
      showToast("Rubric dimensions saved");
    } catch (err) {
      showToast(`Save failed: ${(err as Error).message}`, "err");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      {toast && <Toast msg={toast.msg} type={toast.type} />}
      <div className="rp-card">
        <CardHdr
          icon={
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
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          }
          title="Rubric Scoring Dimensions"
          api="PATCH /inference-rubric/dimensions"
          sub={
            <span
              style={{
                fontFamily: "var(--rp-mono)",
                fontSize: 10.5,
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: 20,
                background: isExact
                  ? "var(--okb)"
                  : isOver
                    ? "color-mix(in srgb,var(--ri) 12%,transparent)"
                    : "var(--wab)",
                color: isExact
                  ? "var(--okf)"
                  : isOver
                    ? "var(--ri)"
                    : "var(--waf)",
                border: "1px solid",
                borderColor: isExact
                  ? "color-mix(in srgb,var(--ok) 25%,transparent)"
                  : isOver
                    ? "color-mix(in srgb,var(--ri) 22%,transparent)"
                    : "color-mix(in srgb,var(--wa) 22%,transparent)",
                transition: "all .2s",
              }}
            >
              {isExact ? "✓ 100%" : `${weightTotal} / 100%`}
            </span>
          }
        />

        <div
          className="rub-dim-row rub-dim-row-hd"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 96px 96px 42px",
            gap: 12,
          }}
        >
          {["Dimension", "Weight", "Flag below", "On"].map((h) => (
            <div key={h} className="rp-col-hdr-cell">
              {h}
            </div>
          ))}
        </div>

        {dims.map((d, i) => (
          <div
            key={d.rowKey}
            className={`rub-dim-row${!d.enabled ? " disabled" : ""}`}
          >
            {/* Name + key + description */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  marginBottom: 3,
                }}
              >
                <span
                  className="rub-dim-name"
                  style={{
                    fontSize: 12.5,
                    fontWeight: 650,
                    color: "var(--ink)",
                    letterSpacing: "-.01em",
                  }}
                >
                  {d.displayName}
                </span>
                <span
                  style={{
                    fontFamily: "var(--rp-mono)",
                    fontSize: 9.5,
                    color: "var(--ink5)",
                    background: "var(--bg3)",
                    border: "0.5px solid var(--brd2)",
                    padding: "1px 6px",
                    borderRadius: 4,
                  }}
                >
                  {d.dimensionKey}
                </span>
              </div>
              <div
                style={{ fontSize: 11, color: "var(--ink4)", lineHeight: 1.45 }}
              >
                {d.description}
              </div>
            </div>

            {/* Weight */}
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <NumInput
                value={d.weight}
                isErr={isOver}
                min={0}
                max={100}
                onChange={(v) => updateDim(i, "weight", v)}
              />
              <span className="rub-pct">%</span>
            </div>

            {/* flagBelowScore */}
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <NumInput
                value={d.flagBelowScore}
                min={0}
                max={10}
                step={0.1}
                style={{ width: 48, minWidth: 48 }}
                onChange={(v) => updateDim(i, "flagBelowScore", v)}
              />
              <span
                style={{ fontSize: 11, color: "var(--ink5)", fontWeight: 500 }}
              >
                / 10
              </span>
            </div>

            {/* Toggle */}
            <Toggle
              checked={d.enabled}
              onChange={(v) => updateDim(i, "enabled", v)}
            />
          </div>
        ))}

        {/* Weight warning */}
        {(isOver || isUnder) && (
          <>
            <div style={{ height: 12 }} />
            <WeightWarnBanner
              variant={isOver ? "over" : "under"}
              total={weightTotal}
            />
            <div style={{ height: 4 }} />
          </>
        )}

        {/* Total bar */}
        <div className="rub-total-bar">
          <div className="rub-total-summary">
            <span className="rub-total-label">Total weight</span>
            <div className="rub-prog-track">
              <div
                className="rub-prog-fill"
                style={{ width: `${progPct}%`, background: progColor }}
              />
            </div>
            <span
              className={`rub-total-val ${isExact ? "ok" : isOver ? "err" : "warn"}`}
            >
              {weightTotal}%
            </span>
            {isExact && (
              <span className="rub-ready-chip">
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Ready to save
              </span>
            )}
          </div>
          <button
            className="rp-btn"
            disabled={saving}
            onClick={() => setDims(origDims.map((d) => ({ ...d })))}
          >
            Reset
          </button>
          <button
            className="rp-btn pri"
            onClick={handleSave}
            disabled={saving || !isExact}
            title={
              isOver
                ? `Reduce by ${weightTotal - 100}% to save`
                : isUnder
                  ? `Add ${100 - weightTotal}% more to save`
                  : undefined
            }
          >
            {saving ? (
              <>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Saving…
              </>
            ) : (
              <>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Save weights
              </>
            )}
          </button>
        </div>

        <RubricExplainer dims={dims} bands={bands} />
      </div>
    </>
  );
}
