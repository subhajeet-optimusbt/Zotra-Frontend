import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { baseUrl, apiFetch } from "../utils/utils";
import PanelBranding from "./PanelBranding";
import PanelInferenceLibrary from "./InferenceLibraryPanel";
import PanelProfile from "./PanelProfile";
import type { ColorScheme } from "../types";

import PanelIntegrations, { INT_STYLES } from "./PanelIntegrations";
import PanelPersonaPrompt from "./Panelpersonaprompt";
import PanelChannels from "./Panelchannels";
import PanelInventoryConfig from "./Panelinventoryconfig";
import PanelEscalationRules from "./Panelescalationrules";
import PanelRelationshipStages from "./Panelrelationshipstages";

// ── New extracted panels ──────────────────────────────────────────────────────
import PanelForceConfig, { FORCE_STYLES } from "./Panelforceconfig";
import PanelRubricConfig, { RUBRIC_STYLES } from "./Panelrubricconfig";

// ─── Color Scheme Context ─────────────────────────────────────────────────────
interface ThemeCtx {
  colorScheme: ColorScheme;
  onColorSchemeChange: (v: ColorScheme) => void;
}
export const ThemeContext = createContext<ThemeCtx>({
  colorScheme: "default",
  onColorSchemeChange: () => {},
});

// ─── Styles ───────────────────────────────────────────────────────────────────
// NOTE: fc-row / rb-row / force-pill / sv-slider / fc-val / rub-dim-row are
//       now owned by PanelForceConfig and PanelRubricConfig respectively.
//       They are injected via FORCE_STYLES / RUBRIC_STYLES below.
const STYLES =
  `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

.sv{flex:1;display:flex;flex-direction:column;overflow:hidden;height:100%;background:var(--bg);font-family:"DM Sans",system-ui,sans-serif}
.sv-hd{padding:17px 24px 14px;border-bottom:0.5px solid var(--brd);background:var(--bg2);flex-shrink:0;display:flex;align-items:center;gap:12px}
.sv-hd-title{font-family:"Sora",sans-serif;font-size:17px;font-weight:650;letter-spacing:-.025em;color:var(--ink)}
.sv-hd-sub{font-size:12px;color:var(--ink4);margin-top:1px}
.sv-body{flex:1;display:grid;grid-template-columns:210px 1fr;overflow:hidden;min-height:0}
.sv-nav{background:var(--bg2);border-right:0.5px solid var(--brd);overflow-y:auto;padding:10px 8px;scrollbar-width:none}
.sv-nav::-webkit-scrollbar{display:none}
.sv-nav-grp{font-size:9px;font-weight:700;letter-spacing:.11em;text-transform:uppercase;color:var(--ink5);padding:12px 10px 4px;margin-top:2px}
.sv-nav-sep{height:0.5px;background:var(--brd);margin:6px 2px}
.sv-nav-item{display:flex;align-items:center;gap:9px;padding:7px 10px;border-radius:8px;cursor:pointer;transition:background .12s,color .12s;margin-bottom:1px;font-size:12.5px;color:var(--ink3);user-select:none;position:relative}
.sv-nav-item:hover{background:var(--pu);color:var(--ink)}
.sv-nav-item.on{background:var(--pp);color:var(--p);font-weight:600}
.sv-nav-item.on::before{content:'';position:absolute;left:0;top:20%;height:60%;width:2.5px;background:var(--p);border-radius:0 3px 3px 0}
.sv-nav-ic{width:18px;text-align:center;flex-shrink:0;font-size:13px;line-height:1}
.sv-nav-item.danger{color:var(--ri)}
.sv-nav-item.danger:hover{background:var(--rib)}
.sv-content{overflow-y:auto;padding:20px 22px 80px;background:var(--bg);scrollbar-width:thin;scrollbar-color:var(--brd2) transparent}
.sv-content::-webkit-scrollbar{width:4px}
.sv-content::-webkit-scrollbar-thumb{background:var(--brd2);border-radius:4px}
.sv-card{background:var(--bg2);border:0.5px solid var(--brd);border-radius:14px;box-shadow:0 1px 3px rgba(40,40,80,.05);margin-bottom:14px;overflow:hidden}
.sv-card-hdr{padding:13px 18px;border-bottom:0.5px solid var(--brd);display:flex;align-items:center;gap:10px}
.sv-card-icon{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;background:var(--pp);color:var(--p)}
.sv-card-title{font-size:13px;font-weight:650;color:var(--ink);font-family:"Sora",sans-serif;letter-spacing:-.01em}
.sv-card-api{font-family:"DM Mono",monospace;font-size:9.5px;color:var(--ink5);margin-top:1px;display:block}
.sv-card-desc{padding:9px 18px 10px;font-size:11.5px;color:var(--ink4);border-bottom:0.5px solid var(--brd);line-height:1.5}
.sv-row{display:flex;align-items:center;justify-content:space-between;padding:12px 18px;border-bottom:0.5px solid var(--brd);gap:12px}
.sv-row:last-child{border-bottom:none}
.sv-row-lbl{flex:1;min-width:0}
.sv-row-t{font-size:12.5px;font-weight:500;color:var(--ink);margin-bottom:2px;line-height:1.3}
.sv-row-s{font-size:11.5px;color:var(--ink4);line-height:1.4;font-weight:300}
.sv-ctrl{flex-shrink:0}
.sv-sublbl{padding:8px 18px;font-size:9.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--ink5);border-top:0.5px solid var(--brd);border-bottom:0.5px solid var(--brd);background:var(--bg)}
.sv-av-row{display:flex;align-items:center;gap:14px;padding:14px 18px}
.sv-av-big{width:52px;height:52px;border-radius:12px;background:linear-gradient(135deg,var(--p),var(--pl));display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:#fff;flex-shrink:0;box-shadow:0 4px 14px rgba(75,72,200,.25)}
.sv-av-name{font-size:14px;font-weight:650;color:var(--ink);font-family:"Sora",sans-serif;letter-spacing:-.02em;margin-bottom:2px}
.sv-av-role{font-size:11.5px;color:var(--ink4)}
.sv-av-plan{font-size:10px;padding:2px 8px;border-radius:20px;background:var(--pp);color:var(--p);font-weight:600;margin-top:4px;display:inline-block}
.sv-input,.sv-select{height:30px;padding:0 10px;border-radius:7px;border:0.5px solid var(--brd2);background:var(--bg3);font-size:12px;color:var(--ink);font-family:"DM Sans",sans-serif;outline:none;min-width:200px;transition:border-color .12s,background .12s}
.sv-input:focus,.sv-select:focus{border-color:var(--p);background:var(--bg2);box-shadow:0 0 0 2.5px rgba(75,72,200,.09)}
.sv-select{cursor:pointer;min-width:170px;appearance:none;padding-right:28px;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2388889A'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 9px center}
.sv-tg{position:relative;display:inline-block;width:36px;height:20px;min-width:36px;cursor:pointer}
.sv-tg input{opacity:0;width:0;height:0;position:absolute}
.sv-tg-track{position:absolute;inset:0;border-radius:20px;background:var(--ink6);transition:background .2s}
.sv-tg input:checked+.sv-tg-track{background:var(--p)}
.sv-tg-thumb{position:absolute;top:3px;left:3px;width:14px;height:14px;border-radius:50%;background:#fff;transition:transform .2s;box-shadow:0 1px 4px rgba(0,0,0,.18)}
.sv-tg input:checked~.sv-tg-thumb{transform:translateX(16px)}
.btn{height:30px;padding:0 12px;border-radius:8px;border:0.5px solid var(--brd2);background:var(--bg2);font-size:12px;color:var(--ink2);cursor:pointer;display:inline-flex;align-items:center;gap:6px;font-family:inherit;transition:all .12s;white-space:nowrap}
.btn:hover{background:var(--pu);border-color:var(--brd3);color:var(--p)}
.btn.pri{background:var(--p);border-color:var(--p);color:#fff;font-weight:500}
.btn.pri:hover{background:var(--pl);border-color:var(--pl);color:#fff}
.btn.sm{height:25px;padding:0 10px;font-size:11px;border-radius:6px}
.btn.xs{height:21px;padding:0 8px;font-size:10.5px;border-radius:5px}
.btn.danger{color:var(--ri);border-color:var(--rib)}
.btn.danger:hover{background:var(--rib);color:var(--ri)}
.btn:disabled{opacity:.5;cursor:not-allowed;pointer-events:none}
.sr-row{display:flex;align-items:flex-start;gap:10px;padding:11px 18px;border-bottom:0.5px solid var(--brd)}
.sr-row:last-of-type{border-bottom:none}
.sr-row.disabled{opacity:.55}
.sr-body{flex:1;min-width:0}
.sr-title{font-size:12.5px;font-weight:600;color:var(--ink);margin-bottom:3px}
.sr-sub{font-size:11.5px;color:var(--ink4);margin-bottom:5px;line-height:1.4}
.sr-meta{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.sr-actions{display:flex;align-items:center;gap:6px;flex-shrink:0;padding-top:2px}
.rule-id{font-family:"DM Mono",monospace;font-size:9.5px;padding:2px 7px;border-radius:4px;background:var(--pp);color:var(--p);font-weight:500;letter-spacing:.02em}
.tag{font-size:9.5px;font-family:"DM Mono",monospace;font-weight:600;padding:1.5px 7px;border-radius:5px;letter-spacing:.04em;display:inline-block}
.tag-ok{background:var(--okb);color:var(--okf)}
.tag-wa{background:var(--wab);color:var(--waf)}
.tag-ri{background:var(--rib);color:var(--rif)}
.tag-mu{background:var(--bg3);color:var(--ink4);border:0.5px solid var(--brd2)}
.tag-te{background:var(--tp);color:var(--td)}
.mk{font-family:"DM Mono",monospace;font-size:9.5px;color:var(--ink5);background:var(--bg3);padding:1px 5px;border-radius:4px;margin-left:4px}
.int-card{display:flex;align-items:center;gap:12px;padding:12px 18px;border-bottom:0.5px solid var(--brd)}
.int-card:last-child{border-bottom:none}
.int-logo{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0;border:0.5px solid var(--brd);font-size:18px}
.int-name{font-size:12.5px;font-weight:600;color:var(--ink);margin-bottom:2px}
.int-desc{font-size:11.5px;color:var(--ink4)}
.int-status{font-size:10px;padding:2px 8px;border-radius:20px;font-weight:600;white-space:nowrap}
.int-on{background:var(--okb);color:var(--okf)}
.int-off{background:var(--bg3);color:var(--ink4);border:0.5px solid var(--brd2)}
.int-section{padding:7px 18px;font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink5);background:var(--bg);border-bottom:0.5px solid var(--brd)}
.rm-row{display:flex;align-items:flex-start;gap:12px;padding:12px 18px;border-bottom:0.5px solid var(--brd)}
.rm-row:last-of-type{border-bottom:none}
.rm-icon{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}
.rm-name{font-size:12.5px;font-weight:600;color:var(--ink);margin-bottom:2px}
.rm-desc{font-size:11.5px;color:var(--ink4);line-height:1.4;margin-bottom:3px}
.rm-fields{font-family:"DM Mono",monospace;font-size:9.5px;color:var(--ink5)}
.rm-ctrl{display:flex;align-items:center;gap:8px;margin-left:auto;flex-shrink:0}
.inf-card{border:0.5px solid var(--brd);border-radius:10px;margin-bottom:8px;overflow:hidden}
.inf-head{display:flex;align-items:center;gap:10px;padding:10px 14px;cursor:pointer;background:var(--bg2);transition:background .12s;user-select:none}
.inf-head:hover{background:var(--pu)}
.inf-id{font-family:"DM Mono",monospace;font-size:10px;color:var(--ink5);min-width:160px}
.inf-title{font-size:12.5px;font-weight:500;color:var(--ink);flex:1}
.inf-meta{display:flex;align-items:center;gap:5px;flex-shrink:0}
.inf-body{padding:12px 14px;background:var(--bg);border-top:0.5px solid var(--brd);display:none}
.inf-body.open{display:block}
.inf-field{display:flex;gap:12px;padding:6px 0;border-bottom:0.5px solid var(--brd);font-size:12px;align-items:flex-start}
.inf-field:last-child{border-bottom:none}
.inf-fl{color:var(--ink5);font-weight:500;min-width:130px;font-size:11.5px}
.inf-fv{color:var(--ink);flex:1}
.sig-row{display:flex;align-items:flex-start;gap:6px;margin-bottom:4px;font-size:11.5px;color:var(--ink3)}
.sig-band{font-size:9px;font-weight:700;padding:1.5px 6px;border-radius:4px;flex-shrink:0;margin-top:1px;letter-spacing:.04em}
.sig-a{background:var(--okb);color:var(--okf)}
.sig-b{background:var(--pp);color:var(--p)}
.sig-c{background:var(--wab);color:var(--waf)}
.ph-chip{padding:4px 11px;border-radius:20px;font-size:11.5px;cursor:pointer;border:0.5px solid var(--brd2);background:var(--bg3);color:var(--ink4);transition:all .12s;user-select:none}
.ph-chip.on{background:var(--pp);color:var(--p);border-color:var(--p);font-weight:600}
.sv-save{display:flex;justify-content:flex-end;gap:8px;padding:12px 18px;border-top:0.5px solid var(--brd);background:var(--bg2)}
.bill-bar{height:5px;background:var(--bg3);border-radius:3px;overflow:hidden;width:130px}
.bill-fill{height:100%;background:var(--p);border-radius:3px}
.ci-row{display:flex;align-items:center;padding:10px 18px;border-bottom:0.5px solid var(--brd);gap:12px}
.ci-row:last-child{border-bottom:none}
.ci-key{font-family:"DM Mono",monospace;font-size:11.5px;color:var(--ink);flex:1}
.ci-desc{font-size:11.5px;color:var(--ink4);flex:2}
.ci-badge{font-size:9px;padding:1px 6px;border-radius:10px;background:var(--bg3);color:var(--ink5);border:.5px solid var(--brd2);white-space:nowrap}
.toast{position:fixed;bottom:24px;right:24px;padding:10px 16px;border-radius:10px;font-size:12.5px;font-weight:500;color:#fff;z-index:9999;display:flex;align-items:center;gap:8px;box-shadow:0 4px 20px rgba(0,0,0,.18);animation:toastIn .2s ease}
.toast-ok{background:#1B6B4A}
.toast-err{background:#B91C1C}
@keyframes toastIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.skel{background:linear-gradient(90deg,var(--bg3) 25%,var(--brd) 50%,var(--bg3) 75%);background-size:200% 100%;animation:shimmer 1.4s infinite;border-radius:6px}
@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
.ca-wrap{display:flex;flex-direction:column;gap:16px;max-width:1100px}
.ca-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,var(--bg2) 0%,var(--pu) 100%);border:0.5px solid var(--brd);border-radius:18px;box-shadow:0 1px 4px rgba(40,40,80,.07);padding:18px;display:grid;grid-template-columns:1fr 300px;gap:16px;align-items:stretch}
.ca-hero::after{content:"";position:absolute;right:-70px;top:-90px;width:220px;height:220px;border-radius:50%;background:var(--pp);opacity:.75;pointer-events:none}
.ca-kicker{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--p);margin-bottom:5px}
.ca-title{font-family:"Sora",sans-serif;font-size:22px;font-weight:700;color:var(--ink);letter-spacing:-.03em;margin-bottom:4px}
.ca-desc{font-size:12.5px;color:var(--ink3);line-height:1.55;margin-bottom:2px}
.ca-hero-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
.ca-live-card{position:relative;z-index:1;background:rgba(255,255,255,.62);border:0.5px solid var(--brd2);border-radius:16px;padding:12px;box-shadow:0 1px 6px rgba(40,40,80,.07)}
[data-theme="dark"] .ca-live-card{background:rgba(20,20,32,.62)}
.ca-live-top{display:flex;align-items:center;gap:10px;margin-bottom:9px}
.ca-bot-ic{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,var(--p),var(--pl));display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.ca-live-name{font-family:"Sora",sans-serif;font-size:13px;font-weight:650;color:var(--ink);letter-spacing:-.01em}
.ca-live-sub{font-size:11px;color:var(--ink4);margin-top:1px}
.ca-status{font-size:10px;padding:2px 8px;border-radius:20px;font-weight:600;white-space:nowrap}
.ca-status.ok{background:var(--okb);color:var(--okf)}
.ca-status.muted{background:var(--bg3);color:var(--ink4);border:0.5px solid var(--brd2)}
.ca-status.phase{background:var(--wab);color:var(--waf)}
.ca-preview-msg{font-size:12.5px;color:var(--ink3);line-height:1.5;padding:9px 10px;background:var(--bg3);border-radius:9px;border:0.5px solid var(--brd)}
.ca-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:14px}
.ca-panel{background:var(--bg2);border:0.5px solid var(--brd);border-radius:16px;box-shadow:0 1px 3px rgba(40,40,80,.05);overflow:hidden}
.ca-panel-head{padding:14px 16px;border-bottom:0.5px solid var(--brd);display:flex;align-items:flex-start;gap:10px}
.ca-panel-icon{width:31px;height:31px;border-radius:10px;background:var(--pp);color:var(--p);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:15px}
.ca-panel-title{font-family:"Sora",sans-serif;font-size:13.5px;font-weight:650;color:var(--ink);letter-spacing:-.015em}
.ca-panel-sub{font-size:11.5px;color:var(--ink4);margin-top:2px;line-height:1.45}
.ca-panel-actions{margin-left:auto;display:flex;gap:6px}
.ca-form{padding:14px 16px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.ca-field{min-width:0}
.ca-field.full{grid-column:1/-1}
.ca-label{font-size:11px;font-weight:600;color:var(--ink4);margin-bottom:5px;letter-spacing:.02em}
.ca-input,.ca-select,.ca-textarea{width:100%;border:0.5px solid var(--brd2);background:var(--bg3);color:var(--ink);border-radius:9px;font-family:"DM Sans",sans-serif;font-size:12.5px;outline:none;transition:border-color .12s,background .12s;box-sizing:border-box}
.ca-input,.ca-select{height:34px;padding:0 10px}
.ca-textarea{min-height:158px;padding:11px 12px;line-height:1.65;font-family:"DM Mono",monospace;font-size:11.5px;resize:vertical}
.ca-input:focus,.ca-select:focus,.ca-textarea:focus{border-color:var(--p);background:var(--bg2);box-shadow:0 0 0 2.5px rgba(75,72,200,.09)}
.ca-chip-row{display:flex;gap:6px;flex-wrap:wrap}
.ca-chip{font-size:11px;padding:4px 9px;border-radius:999px;background:var(--pp);color:var(--p);border:0.5px solid var(--brd2);font-weight:600}
.ca-rule-list{display:flex;flex-direction:column}
.ca-rule{display:flex;align-items:center;gap:12px;padding:14px 16px;border-bottom:0.5px solid var(--brd);transition:background .1s}
.ca-rule:last-child{border-bottom:none}
.ca-rule:hover{background:var(--pu)}
.ca-rule-num{width:27px;height:27px;border-radius:9px;background:var(--pp);color:var(--p);display:flex;align-items:center;justify-content:center;font-family:"DM Mono",monospace;font-size:11px;font-weight:700;flex-shrink:0}
.ca-rule-name{font-size:12.5px;font-weight:600;color:var(--ink);margin-bottom:2px}
.ca-rule-sub{font-size:11.5px;color:var(--ink4)}
.ca-channel-list{display:flex;flex-direction:column}
.ca-channel{display:flex;align-items:center;gap:12px;padding:14px 16px;border-bottom:0.5px solid var(--brd);transition:background .1s}
.ca-channel:last-child{border-bottom:none}
.ca-channel:hover{background:var(--pu)}
.ca-channel.active .ca-ch-ic{background:var(--pp);color:var(--p);border-color:var(--brd2)}
.ca-channel.muted{opacity:.65}
.ca-ch-ic{width:39px;height:39px;border-radius:12px;background:var(--bg3);border:0.5px solid var(--brd);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.ca-ch-name{font-size:13px;font-weight:600;color:var(--ink);margin-bottom:2px}
.ca-ch-sub{font-size:11.5px;color:var(--ink4);margin-bottom:4px;line-height:1.4}
.ca-ch-code{font-family:"DM Mono",monospace;font-size:10.5px;color:var(--ink5);background:var(--bg3);border:0.5px solid var(--brd);border-radius:5px;padding:3px 7px;display:inline-block;margin-top:2px;word-break:break-all}
.ca-ch-right{margin-left:auto;display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0}
.ca-inv-head{display:grid;grid-template-columns:1fr 120px 92px 84px;gap:10px;padding:8px 16px;background:var(--bg3);border-bottom:0.5px solid var(--brd);font-size:9.5px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:var(--ink5)}
.ca-inv-list{display:flex;flex-direction:column}
.ca-inv-row{display:grid;grid-template-columns:1fr 120px 92px 84px;gap:10px;align-items:center;padding:14px 16px;border-bottom:0.5px solid var(--brd);transition:background .1s}
.ca-inv-row:last-child{border-bottom:none}
.ca-inv-row:hover{background:var(--pu)}
.ca-inv-name{font-size:12.5px;font-weight:600;color:var(--ink);margin-bottom:2px}
.ca-inv-sub{font-size:11.5px;color:var(--ink4)}
.ca-meter{height:4px;border-radius:2px;background:var(--bg3);overflow:hidden;width:100%}
.ca-meter-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--p),var(--pl));transition:width .3s}
.ca-message-box{margin:14px 16px 16px;padding:12px 13px;background:var(--bg3);border:0.5px solid var(--brd);border-radius:12px;font-size:12.5px;color:var(--ink3);line-height:1.6;font-style:italic}
.rs-table{width:100%;border-collapse:collapse}
.rs-table th{text-align:left;padding:9px 16px;font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--ink5);border-bottom:0.5px solid var(--brd);background:var(--bg3)}
.rs-table td{padding:12px 16px;border-bottom:0.5px solid var(--brd);font-size:12.5px;color:var(--ink2);vertical-align:middle}
.rs-table tr:last-child td{border-bottom:none}
.rs-table tr:hover td{background:var(--pu)}
.rs-badge{font-size:10.5px;padding:2px 10px;border-radius:20px;font-weight:600;white-space:nowrap}
.rs-swatch{width:20px;height:20px;border-radius:5px;border:0.5px solid var(--brd)}
.rs-rule{font-size:11.5px;color:var(--ink4)}
.rs-section-desc{padding:0 18px 14px;font-size:12.5px;color:var(--ink4);line-height:1.55}
@media(max-width:1100px){.ca-hero,.ca-grid{grid-template-columns:1fr}.ca-live-card{max-width:460px}.ca-form{grid-template-columns:1fr}}
` +
  INT_STYLES +
  FORCE_STYLES +
  RUBRIC_STYLES;

// ─── Types ────────────────────────────────────────────────────────────────────
interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}
interface RowProps {
  label: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
}
interface CardHdrProps {
  icon: ReactNode;
  iconBg?: string;
  iconColor?: string;
  title: ReactNode;
  api?: string;
  sub?: ReactNode;
  children?: ReactNode;
}
interface MkProps {
  children: ReactNode;
}
interface SubLblProps {
  children: ReactNode;
}
interface ToastProps {
  msg: string;
  type: "ok" | "err";
}
interface SimpleRuleRowProps {
  id: string;
  title: string;
  sub: string;
  tagClass: string;
  tagLabel: string;
}
interface AgentCardProps {
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  sub: string;
  children?: ReactNode;
}
interface InfCardProps {
  id: string;
  title: string;
  phase: string;
  gate: boolean;
  force: string;
  signals: [string, string][];
  threshold?: string;
  decay?: string;
}
interface TenantCfg {
  defaultTone: string;
  defaultDealType: number;
  defaultResearchPolicy: number;
  researchStaleAfterDays: number;
  minResearchConfidence: number;
  maxReplyQuestions: number;
  timezone: string;
  language: string;
  currency: number;
  enableAccountResearch: boolean;
  enableReplyValidation: boolean;
  enablePanchashakti: boolean;
  enableProjection: boolean;
  enableStateDeltas: boolean;
  enableAgentActivity: boolean;
  enableFinancialTracking: boolean;
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

// ─── Primitives ───────────────────────────────────────────────────────────────
function Toggle({ checked, onChange, disabled = false }: ToggleProps) {
  return (
    <label className="sv-tg">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="sv-tg-track" />
      <span className="sv-tg-thumb" />
    </label>
  );
}
function Row({ label, sub, children }: RowProps) {
  return (
    <div className="sv-row">
      <div className="sv-row-lbl">
        <div className="sv-row-t">{label}</div>
        {sub && <div className="sv-row-s">{sub}</div>}
      </div>
      <div className="sv-ctrl">{children}</div>
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
  children,
}: CardHdrProps) {
  return (
    <div className="sv-card-hdr">
      <div
        className="sv-card-icon"
        style={{ background: iconBg, color: iconColor }}
      >
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="sv-card-title">{title}</div>
        {api && <span className="sv-card-api">{api}</span>}
      </div>
      {sub && <div style={{ marginLeft: "auto", flexShrink: 0 }}>{sub}</div>}
      {children}
    </div>
  );
}
function Mk({ children }: MkProps) {
  return <span className="mk">{children}</span>;
}
function SubLbl({ children }: SubLblProps) {
  return <div className="sv-sublbl">{children}</div>;
}
function Toast({ msg, type }: ToastProps) {
  return (
    <div className={`toast toast-${type}`}>
      {type === "ok" ? "✓" : "✕"} {msg}
    </div>
  );
}
function SimpleRuleRow({
  id,
  title,
  sub,
  tagClass,
  tagLabel,
}: SimpleRuleRowProps) {
  return (
    <div className="sr-row">
      <div className="sr-body">
        <div className="sr-title">{title}</div>
        <div className="sr-sub">{sub}</div>
        <div className="sr-meta">
          <span className="rule-id">{id}</span>
          <span className={`tag ${tagClass}`}>{tagLabel}</span>
        </div>
      </div>
      <div className="sr-actions">
        <button className="btn xs">Edit</button>
        <button className="btn xs">Disable</button>
      </div>
    </div>
  );
}

// ─── Enum maps ────────────────────────────────────────────────────────────────
const TONES = ["helpful", "direct", "soft", "executive_ready", "concise"];
const DEAL_TYPES = [
  "services_project",
  "product_sale",
  "retainer",
  "saas",
  "consulting",
  "other",
];
const RESEARCH_POLICIES = [
  "always",
  "never",
  "new_only",
  "new_or_stale",
  "stale_only",
];
const CURRENCIES = ["USD", "INR", "EUR", "GBP", "CAD", "AUD"];
const TIMEZONES = [
  "Asia/Kolkata (IST +5:30)",
  "America/New_York (EST)",
  "Europe/London (GMT)",
  "America/Los_Angeles (PST)",
];
const LANGUAGES = ["English (US)", "English (UK)", "Hindi"];

function enumIdx(arr: string[], val: string | number): number {
  if (typeof val === "number")
    return Math.max(0, Math.min(val, arr.length - 1));
  const i = arr.indexOf(val);
  return i >= 0 ? i : 0;
}

// ─── Tenant normalise / serialise ─────────────────────────────────────────────
const TENANT_DEFAULTS: TenantCfg = {
  defaultTone: "helpful",
  defaultDealType: 0,
  defaultResearchPolicy: 0,
  researchStaleAfterDays: 30,
  minResearchConfidence: 0.6,
  maxReplyQuestions: 3,
  timezone: "Asia/Kolkata (IST +5:30)",
  language: "English (US)",
  currency: 0,
  enableAccountResearch: true,
  enableReplyValidation: true,
  enablePanchashakti: true,
  enableProjection: true,
  enableStateDeltas: true,
  enableAgentActivity: true,
  enableFinancialTracking: false,
};
function normaliseTenant(raw: Record<string, unknown>): TenantCfg {
  return {
    defaultTone: (raw.defaultTone as string) || "helpful",
    defaultDealType: enumIdx(
      DEAL_TYPES,
      raw.defaultDealType as string | number,
    ),
    defaultResearchPolicy: enumIdx(
      RESEARCH_POLICIES,
      raw.defaultResearchPolicy as string | number,
    ),
    researchStaleAfterDays: (raw.researchStaleAfterDays as number) ?? 30,
    minResearchConfidence: (raw.minResearchConfidence as number) ?? 0.6,
    maxReplyQuestions: (raw.maxReplyQuestions as number) ?? 3,
    timezone: (raw.timezone as string) || "Asia/Kolkata (IST +5:30)",
    language: (raw.language as string) || "English (US)",
    currency: enumIdx(CURRENCIES, raw.currency as string | number),
    enableAccountResearch: (raw.enableAccountResearch as boolean) ?? true,
    enableReplyValidation: (raw.enableReplyValidation as boolean) ?? true,
    enablePanchashakti: (raw.enablePanchashakti as boolean) ?? true,
    enableProjection: (raw.enableProjection as boolean) ?? true,
    enableStateDeltas: (raw.enableStateDeltas as boolean) ?? true,
    enableAgentActivity: (raw.enableAgentActivity as boolean) ?? true,
    enableFinancialTracking: (raw.enableFinancialTracking as boolean) ?? false,
  };
}
function serialiseTenant(c: TenantCfg): Record<string, unknown> {
  return {
    defaultTone: c.defaultTone,
    defaultDealType: Number(c.defaultDealType),
    defaultResearchPolicy: Number(c.defaultResearchPolicy),
    researchStaleAfterDays: Number(c.researchStaleAfterDays),
    minResearchConfidence: Number(c.minResearchConfidence),
    maxReplyQuestions: Number(c.maxReplyQuestions),
    timezone: c.timezone,
    language: c.language,
    currency: Number(c.currency),
    enableAccountResearch: c.enableAccountResearch,
    enableReplyValidation: c.enableReplyValidation,
    enablePanchashakti: c.enablePanchashakti,
    enableProjection: c.enableProjection,
    enableStateDeltas: c.enableStateDeltas,
    enableAgentActivity: c.enableAgentActivity,
    enableFinancialTracking: c.enableFinancialTracking,
  };
}

const FEATURE_TOGGLES: [string, keyof TenantCfg, string][] = [
  [
    "Account Research",
    "enableAccountResearch",
    "Allow Forager to enrich account-level data automatically",
  ],
  [
    "Reply Validation",
    "enableReplyValidation",
    "Validate generated replies against rules before presenting to user",
  ],
  [
    "Panchashakti Scoring",
    "enablePanchashakti",
    "Score opportunities across five commercial forces",
  ],
  [
    "Projection Engine",
    "enableProjection",
    "Generate outcome branches and risk scenario projections",
  ],
  [
    "State Deltas",
    "enableStateDeltas",
    "Track and surface visible state changes on workspaces",
  ],
  [
    "Agent Activity Feed",
    "enableAgentActivity",
    "Show what each agent is doing in the activity log",
  ],
  [
    "Financial Tracking",
    "enableFinancialTracking",
    "Enable invoice, payment, and margin tracking across workspaces",
  ],
];

// ─── Panel: Tenant Settings ───────────────────────────────────────────────────
function PanelTenantSettings() {
  const [cfg, setCfg] = useState<TenantCfg | null>(null);
  const [original, setOrig] = useState<TenantCfg | null>(null);
  const [rowKey, setRowKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiErr] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    msg: string;
    type: "ok" | "err";
  } | null>(null);

  function showToast(msg: string, type: "ok" | "err" = "ok") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }
  function authHeaders(): Record<string, string> {
    const token = localStorage.getItem("zotra_token");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  useEffect(() => {
    setLoading(true);
    apiFetch(`${baseUrl()}/config`, { headers: authHeaders() })
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json() as Promise<Record<string, unknown>>;
      })
      .then((raw) => {
        setRowKey((raw.rowKey as string) ?? null);
        const n = normaliseTenant(raw);
        setCfg(n);
        setOrig(n);
        setApiErr(null);
      })
      .catch((err: Error) => {
        setApiErr(err.message);
        setCfg({ ...TENANT_DEFAULTS });
        setOrig({ ...TENANT_DEFAULTS });
      })
      .finally(() => setLoading(false));
  }, []);

  const set = useCallback(
    <K extends keyof TenantCfg>(key: K, val: TenantCfg[K]) => {
      setCfg((p) => (p ? { ...p, [key]: val } : p));
    },
    [],
  );

  async function handleSave() {
    if (!cfg || !rowKey) {
      showToast("Cannot save: config not loaded yet", "err");
      return;
    }
    setSaving(true);
    try {
      const res = await apiFetch(`${baseUrl()}/config/${rowKey}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(serialiseTenant(cfg)),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      const updated = (await res.json()) as Record<string, unknown>;
      setOrig({ ...cfg });
      showToast((updated.message as string) || "Tenant settings saved");
    } catch (err) {
      showToast(`Save failed: ${(err as Error).message}`, "err");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !cfg)
    return (
      <div className="sv-card">
        <CardHdr
          icon="⚙"
          title="Tenant Settings"
          api="PUT /api/config/{rowKey} · admin or owner only"
        />
        {[...Array(9)].map((_, i) => (
          <div key={i} className="sv-row" style={{ gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div
                className="skel"
                style={{ height: 12, width: 160, marginBottom: 6 }}
              />
              <div className="skel" style={{ height: 10, width: 240 }} />
            </div>
            <div
              className="skel"
              style={{ height: 30, width: 170, borderRadius: 7 }}
            />
          </div>
        ))}
      </div>
    );

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
          icon="⚙"
          title="Tenant Settings"
          api="PUT /api/config/{rowKey} · admin or owner only"
        />
        <SubLbl>Defaults &amp; Policies</SubLbl>
        <Row
          label={
            <span>
              Default tone <Mk>defaultTone</Mk>
            </span>
          }
          sub="Tone applied when no specific tone is selected for a reply draft"
        >
          <select
            className="sv-select"
            value={cfg.defaultTone}
            onChange={(e) => set("defaultTone", e.target.value)}
          >
            {TONES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Row>
        <Row
          label={
            <span>
              Default deal type <Mk>defaultDealType</Mk>
            </span>
          }
        >
          <select
            className="sv-select"
            value={cfg.defaultDealType}
            onChange={(e) => set("defaultDealType", Number(e.target.value))}
          >
            {DEAL_TYPES.map((t, i) => (
              <option key={t} value={i}>
                {t}
              </option>
            ))}
          </select>
        </Row>
        <Row
          label={
            <span>
              Research policy <Mk>defaultResearchPolicy</Mk>
            </span>
          }
          sub="When the Forager agent triggers enrichment automatically"
        >
          <select
            className="sv-select"
            value={cfg.defaultResearchPolicy}
            onChange={(e) =>
              set("defaultResearchPolicy", Number(e.target.value))
            }
          >
            {RESEARCH_POLICIES.map((p, i) => (
              <option key={p} value={i}>
                {p}
              </option>
            ))}
          </select>
        </Row>
        <Row
          label={
            <span>
              Research stale after <Mk>researchStaleAfterDays</Mk>
            </span>
          }
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              className="sv-input"
              style={{ width: 60, minWidth: 60, textAlign: "center" }}
              value={cfg.researchStaleAfterDays}
              onChange={(e) =>
                set("researchStaleAfterDays", Number(e.target.value))
              }
            />
            <span style={{ fontSize: 12, color: "var(--ink4)" }}>days</span>
          </div>
        </Row>
        <Row
          label={
            <span>
              Min research confidence <Mk>minResearchConfidence</Mk>
            </span>
          }
          sub="Minimum confidence score (0.0–1.0) to surface a research finding"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              className="sv-input"
              style={{ width: 60, minWidth: 60, textAlign: "center" }}
              value={cfg.minResearchConfidence}
              onChange={(e) =>
                set("minResearchConfidence", Number(e.target.value))
              }
            />
            <span style={{ fontSize: 12, color: "var(--ink4)" }}>0.0–1.0</span>
          </div>
        </Row>
        <Row
          label={
            <span>
              Max reply questions <Mk>maxReplyQuestions</Mk>
            </span>
          }
          sub="Maximum clarifying questions included in a generated reply"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              className="sv-input"
              style={{ width: 60, minWidth: 60, textAlign: "center" }}
              value={cfg.maxReplyQuestions}
              onChange={(e) => set("maxReplyQuestions", Number(e.target.value))}
            />
            <span style={{ fontSize: 12, color: "var(--ink4)" }}>
              questions
            </span>
          </div>
        </Row>
        <SubLbl>Localisation</SubLbl>
        <Row
          label={
            <span>
              Timezone <Mk>timezone</Mk>
            </span>
          }
        >
          <select
            className="sv-select"
            value={cfg.timezone}
            onChange={(e) => set("timezone", e.target.value)}
          >
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </Row>
        <Row
          label={
            <span>
              Language <Mk>language</Mk>
            </span>
          }
        >
          <select
            className="sv-select"
            value={cfg.language}
            onChange={(e) => set("language", e.target.value)}
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </Row>
        <Row
          label={
            <span>
              Currency <Mk>currency</Mk>
            </span>
          }
          sub="Used in financial tracking and proposal values"
        >
          <select
            className="sv-select"
            value={cfg.currency}
            onChange={(e) => set("currency", Number(e.target.value))}
          >
            {CURRENCIES.map((c, i) => (
              <option key={c} value={i}>
                {c}
              </option>
            ))}
          </select>
        </Row>
        <SubLbl>Feature Toggles</SubLbl>
        {FEATURE_TOGGLES.map(([label, key, sub]) => (
          <Row
            key={key}
            label={
              <span>
                {label} <Mk>{key}</Mk>
              </span>
            }
            sub={sub}
          >
            <Toggle
              checked={cfg[key] as boolean}
              onChange={(v) => set(key, v as TenantCfg[typeof key])}
            />
          </Row>
        ))}
        <div className="sv-save">
          <button
            className="btn"
            onClick={() => original && setCfg({ ...original })}
          >
            Reset to loaded
          </button>
          <button
            className="btn pri"
            onClick={handleSave}
            disabled={saving || !rowKey}
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Panel: Preferences ───────────────────────────────────────────────────────
function PanelPreferences() {
  const [s, setS] = useState({
    sidebarCollapsed: false,
    emailNotif: true,
    inAppNotif: true,
    slackNotif: false,
  });
  const set = (k: string, v: boolean) => setS((p) => ({ ...p, [k]: v }));
  return (
    <div className="sv-card">
      <CardHdr
        icon="🎨"
        title="User Preferences"
        api="PATCH /api/config/settings/user · current user only"
      />
      <Row
        label={
          <span>
            Theme <Mk>theme</Mk>
          </span>
        }
        sub="Applies immediately across all views"
      >
        <select className="sv-select">
          <option>light</option>
          <option>dark</option>
          <option>system</option>
        </select>
      </Row>
      <Row
        label={
          <span>
            Default view <Mk>default_view</Mk>
          </span>
        }
        sub="The view that opens when you launch Zotra"
      >
        <select className="sv-select">
          <option>pulse</option>
          <option>pipeline</option>
          <option>accounts</option>
          <option>inbox</option>
        </select>
      </Row>
      <Row
        label={
          <span>
            Dashboard layout <Mk>dashboard_layout</Mk>
          </span>
        }
      >
        <select className="sv-select">
          <option>default</option>
          <option>compact</option>
          <option>expanded</option>
        </select>
      </Row>
      <Row
        label={
          <span>
            Sidebar collapsed <Mk>sidebar_collapsed</Mk>
          </span>
        }
        sub="Start with navigation sidebar collapsed"
      >
        <Toggle
          checked={s.sidebarCollapsed}
          onChange={(v) => set("sidebarCollapsed", v)}
        />
      </Row>
      <SubLbl>Notifications</SubLbl>
      <Row
        label={
          <span>
            Email notifications <Mk>notifications.email</Mk>
          </span>
        }
      >
        <Toggle checked={s.emailNotif} onChange={(v) => set("emailNotif", v)} />
      </Row>
      <Row
        label={
          <span>
            In-app notifications <Mk>notifications.in_app</Mk>
          </span>
        }
      >
        <Toggle checked={s.inAppNotif} onChange={(v) => set("inAppNotif", v)} />
      </Row>
      <Row
        label={
          <span>
            Slack notifications <Mk>notifications.slack</Mk>
          </span>
        }
        sub="Requires Slack integration to be connected"
      >
        <Toggle checked={s.slackNotif} onChange={(v) => set("slackNotif", v)} />
      </Row>
      <div className="sv-save">
        <button className="btn pri">Save preferences</button>
      </div>
    </div>
  );
}

// ─── AgentCard ────────────────────────────────────────────────────────────────
function AgentCard({
  icon,
  iconBg,
  iconColor,
  title,
  sub,
  children,
}: AgentCardProps) {
  const [on, setOn] = useState(true);
  return (
    <div className="sv-card">
      <div className="sv-card-hdr">
        <div
          className="sv-card-icon"
          style={{ background: iconBg, color: iconColor }}
        >
          {icon}
        </div>
        <div>
          <div className="sv-card-title">{title}</div>
          <div style={{ fontSize: 11, color: "var(--ink4)", marginTop: 1 }}>
            {sub}
          </div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <Toggle checked={on} onChange={setOn} />
        </div>
      </div>
      {children}
    </div>
  );
}

function PanelAgents() {
  const AUTONOMY = [
    "Assists — recommend only",
    "Acts — execute + log",
    "Leads — manage end-to-end",
  ];
  function Sel({ opts }: { opts: string[] }) {
    return (
      <select className="sv-select">
        {opts.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    );
  }
  return (
    <>
      <div className="sv-card">
        <CardHdr icon="◙" title="Automation" />
        <Row label="Agents enabled" sub="All 9 agents are active.">
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ok)" }}>
            9 / 9
          </span>
        </Row>
        <Row
          label="Default autonomy mode"
          sub="Override for all agents at once"
        >
          <Sel opts={AUTONOMY} />
        </Row>
      </div>
      <AgentCard
        iconBg="var(--pp)"
        iconColor="var(--p)"
        icon="👁"
        title="Watcher"
        sub="Signal detection · account silence · gap monitoring"
      >
        <Row label="Autonomy mode">
          <Sel opts={AUTONOMY} />
        </Row>
        <Row
          label="Silence threshold"
          sub="Days without customer contact before flagging"
        >
          <Sel opts={["5 days", "7 days", "10 days", "14 days"]} />
        </Row>
      </AgentCard>
      <AgentCard
        iconBg="var(--pp)"
        iconColor="var(--p)"
        icon="🎯"
        title="Opportunity"
        sub="Pipeline gaps · qualification · proposal drafts"
      >
        <Row label="Autonomy mode">
          <Sel opts={AUTONOMY.slice(0, 2)} />
        </Row>
        <Row label="Stall detection" sub="Days after proposal before flagging">
          <Sel opts={["5 days", "7 days", "10 days"]} />
        </Row>
      </AgentCard>
      <AgentCard
        iconBg="var(--amberp)"
        iconColor="var(--amber)"
        icon="💰"
        title="Financial"
        sub="Invoice aging · margin watch · payment alerts"
      >
        <Row label="Autonomy mode">
          <Sel opts={AUTONOMY} />
        </Row>
        <Row label="Invoice watch threshold">
          <Sel opts={["7 days", "10 days", "14 days", "21 days"]} />
        </Row>
        <Row label="Margin alert below">
          <Sel opts={["10%", "20%", "25%", "30%"]} />
        </Row>
      </AgentCard>
      <AgentCard
        iconBg="#E8F5E9"
        iconColor="#2E7D32"
        icon="📋"
        title="Project"
        sub="Effort variance · delivery health · scope events"
      >
        <Row label="Autonomy mode">
          <Sel opts={AUTONOMY.slice(0, 2)} />
        </Row>
        <Row label="Scope drift alert">
          <Sel opts={["10%", "20%", "25%", "30%"]} />
        </Row>
      </AgentCard>
      <AgentCard
        iconBg="var(--tp)"
        iconColor="var(--td)"
        icon="🔄"
        title="Renewal"
        sub="Renewal probability · expansion signals · 90-day watch"
      >
        <Row label="Autonomy mode">
          <Sel opts={AUTONOMY.slice(0, 2)} />
        </Row>
        <Row label="Activation window">
          <Sel opts={["60 days", "90 days", "120 days"]} />
        </Row>
      </AgentCard>
    </>
  );
}

// ─── Panel: Agent Autonomy ────────────────────────────────────────────────────
function PanelAgentAutonomy() {
  const [s, setS] = useState({
    autoClassify: true,
    autoWorkspace: true,
    autoResearch: true,
    autoDraft: true,
    autoSend: false,
    stageChange: false,
    requireHumanReview: true,
  });
  const set = (k: string, v: boolean) => setS((p) => ({ ...p, [k]: v }));
  return (
    <div className="sv-card">
      <CardHdr
        icon="🎛"
        title="Agent Autonomy"
        api="PATCH /api/config/agent-autonomy"
      />
      <SubLbl>Automatic Actions</SubLbl>
      <Row
        label={
          <span>
            Auto-classify emails <Mk>allow_auto_classification</Mk>
          </span>
        }
        sub="Automatically classify inbound emails by intent and opportunity"
      >
        <Toggle
          checked={s.autoClassify}
          onChange={(v) => set("autoClassify", v)}
        />
      </Row>
      <Row
        label={
          <span>
            Auto-create workspaces <Mk>allow_auto_workspace_creation</Mk>
          </span>
        }
        sub="Create opportunity workspaces automatically on detection"
      >
        <Toggle
          checked={s.autoWorkspace}
          onChange={(v) => set("autoWorkspace", v)}
        />
      </Row>
      <Row
        label={
          <span>
            Auto-run research <Mk>allow_auto_research</Mk>
          </span>
        }
        sub="Trigger Forager enrichment without manual request"
      >
        <Toggle
          checked={s.autoResearch}
          onChange={(v) => set("autoResearch", v)}
        />
      </Row>
      <Row
        label={
          <span>
            Auto-draft replies <Mk>allow_auto_draft</Mk>
          </span>
        }
        sub="Generate reply drafts without explicit request"
      >
        <Toggle checked={s.autoDraft} onChange={(v) => set("autoDraft", v)} />
      </Row>
      <Row
        label={
          <span>
            Auto-send replies <Mk>allow_auto_send</Mk>
          </span>
        }
        sub="Send drafted replies automatically after approval window expires"
      >
        <Toggle checked={s.autoSend} onChange={(v) => set("autoSend", v)} />
      </Row>
      <Row
        label={
          <span>
            Auto stage changes <Mk>allow_stage_change</Mk>
          </span>
        }
        sub="Allow agents to advance workspace stages based on readiness rules"
      >
        <Toggle
          checked={s.stageChange}
          onChange={(v) => set("stageChange", v)}
        />
      </Row>
      <SubLbl>Limits &amp; Review</SubLbl>
      <Row
        label={
          <span>
            Require human review for external replies{" "}
            <Mk>require_human_review_for_external_reply</Mk>
          </span>
        }
      >
        <Toggle
          checked={s.requireHumanReview}
          onChange={(v) => set("requireHumanReview", v)}
        />
      </Row>
      <Row
        label={
          <span>
            Max autonomous actions/day <Mk>max_autonomous_actions_per_day</Mk>
          </span>
        }
        sub="Hard cap on agent actions that execute without approval"
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input
            className="sv-input"
            style={{ width: 70, minWidth: 70, textAlign: "center" }}
            defaultValue="50"
          />
          <span style={{ fontSize: 12, color: "var(--ink4)" }}>actions</span>
        </div>
      </Row>
      <div className="sv-save">
        <button className="btn pri">Save autonomy settings</button>
      </div>
    </div>
  );
}

// ─── InfCard ──────────────────────────────────────────────────────────────────
function InfCard({
  id,
  title,
  phase,
  gate,
  force,
  signals,
  threshold,
  decay,
}: InfCardProps) {
  const [open, setOpen] = useState(false);
  const phaseColors: Record<string, [string, string]> = {
    Qualification: ["#dcfce7", "#166534"],
    Shaping: ["#dbeafe", "#1e40af"],
    Development: ["#ede9fe", "#5b21b6"],
    Closing: ["#fef3c7", "#92400e"],
  };
  const [bg, c] = phaseColors[phase] ?? ["var(--bg3)", "var(--ink4)"];
  return (
    <div className="inf-card">
      <div className="inf-head" onClick={() => setOpen((o) => !o)}>
        <div className="inf-id">{id}</div>
        <div className="inf-title">{title}</div>
        <div className="inf-meta">
          <span
            style={{
              fontSize: 10,
              padding: "1.5px 8px",
              borderRadius: 20,
              background: bg,
              color: c,
              fontWeight: 600,
            }}
          >
            {phase}
          </span>
          {gate && (
            <span className="tag tag-te" style={{ fontSize: 9 }}>
              Gate
            </span>
          )}
          <span style={{ fontSize: 11, color: "var(--ink5)", marginLeft: 4 }}>
            {open ? "▲" : "▾"}
          </span>
        </div>
      </div>
      <div className={`inf-body${open ? " open" : ""}`}>
        <div className="inf-field">
          <div className="inf-fl">Force attribution</div>
          <div className="inf-fv">{force}</div>
        </div>
        <div className="inf-field">
          <div className="inf-fl">Gate inference</div>
          <div className="inf-fv">
            {gate ? "Yes — blocks phase advancement" : "No — informational"}
          </div>
        </div>
        <div className="inf-field">
          <div className="inf-fl">Extraction signals</div>
          <div className="inf-fv">
            {signals.map(([band, text], i) => (
              <div key={i} className="sig-row">
                <span className={`sig-band sig-${band.toLowerCase()}`}>
                  {band}
                </span>
                {text}
              </div>
            ))}
          </div>
        </div>
        {threshold && (
          <div className="inf-field">
            <div className="inf-fl">Threshold score</div>
            <div className="inf-fv">
              <input
                className="sv-input"
                style={{ minWidth: 70, width: 70 }}
                defaultValue={threshold}
              />
            </div>
          </div>
        )}
        {decay && (
          <div className="inf-field">
            <div className="inf-fl">Decay (days)</div>
            <div className="inf-fv">
              <input
                className="sv-input"
                style={{ minWidth: 70, width: 70 }}
                defaultValue={decay}
              />
            </div>
          </div>
        )}
        <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
          <button className="btn sm pri">Save changes</button>
          <button className="btn sm">Duplicate</button>
        </div>
      </div>
    </div>
  );
}

// ─── Static rule panels ───────────────────────────────────────────────────────
function PanelReadinessRules() {
  return (
    <div className="sv-card">
      <CardHdr
        iconBg="var(--okb)"
        iconColor="var(--okf)"
        icon="✓"
        title="Readiness Rules"
        api="GET · POST · PATCH /api/config/readiness-rules"
        sub={<button className="btn sm pri">＋ New rule</button>}
      />
      <div className="sv-card-desc">
        Rules that control stage advancement gates.
      </div>
      <SimpleRuleRow
        id="qualify_to_discovery"
        title="Qualify → Discovery"
        sub="Account researched · Budget signal present"
        tagClass="tag-ok"
        tagLabel="active"
      />
      <SimpleRuleRow
        id="discovery_to_proposal"
        title="Discovery → Proposal"
        sub="Decision maker identified · Pain confirmed"
        tagClass="tag-ok"
        tagLabel="active"
      />
      <SimpleRuleRow
        id="proposal_to_negotiation"
        title="Proposal → Negotiation"
        sub="Proposal sent · Value confirmed by sponsor"
        tagClass="tag-ok"
        tagLabel="active"
      />
      <SimpleRuleRow
        id="negotiation_to_close"
        title="Negotiation → Close"
        sub="Legal review done · Pricing agreed"
        tagClass="tag-ok"
        tagLabel="active"
      />
    </div>
  );
}

function PanelGapRules() {
  return (
    <div className="sv-card">
      <CardHdr
        iconBg="var(--wab)"
        iconColor="var(--wa)"
        icon="⚠"
        title="Gap Rules"
        api="GET · POST · PATCH /api/config/gap-rules"
        sub={<button className="btn sm pri">＋ New rule</button>}
      />
      <div className="sv-card-desc">
        Define conditions for missing, weak, stale, risky, or conflicting
        intelligence.
      </div>
      <SimpleRuleRow
        id="missing_decision_maker"
        title="Missing decision maker"
        sub="No DM identified after 14 days in Discovery"
        tagClass="tag-wa"
        tagLabel="missing"
      />
      <SimpleRuleRow
        id="stale_research"
        title="Stale research"
        sub="Research not refreshed within staleness threshold"
        tagClass="tag-wa"
        tagLabel="stale"
      />
      <SimpleRuleRow
        id="weak_budget_signal"
        title="Weak budget signal"
        sub="Budget score below 0.4 in Proposal stage"
        tagClass="tag-wa"
        tagLabel="weak"
      />
      <SimpleRuleRow
        id="conflicting_stakeholders"
        title="Conflicting stakeholder signals"
        sub="Two contacts show opposing intent signals"
        tagClass="tag-ri"
        tagLabel="conflict"
      />
    </div>
  );
}

function PanelProjectionRules() {
  const [branchConfirm, setBranchConfirm] = useState(false);
  const [notifyManager, setNotifyManager] = useState(true);
  return (
    <>
      <div className="sv-card">
        <CardHdr
          icon="◐"
          title="Projection Rules"
          api="GET · POST · PATCH /api/config/projection-rules"
          sub={<button className="btn sm pri">＋ New rule</button>}
        />
        <div className="sv-card-desc">
          Rules that define outcome branches, probability weights, and risk
          scenarios.
        </div>
        <SimpleRuleRow
          id="high_force_fast_close"
          title="High force → fast close"
          sub="All Panchashakti forces ≥ 0.7 → project 80% close within 30 days"
          tagClass="tag-ok"
          tagLabel="optimistic"
        />
        <SimpleRuleRow
          id="silent_after_proposal"
          title="Silent after proposal"
          sub="No reply 10 days post-proposal → project 40% ghost risk"
          tagClass="tag-wa"
          tagLabel="risk"
        />
        <SimpleRuleRow
          id="budget_mismatch"
          title="Budget mismatch"
          sub="Quoted value > 2× budget signal → project stall or discount scenario"
          tagClass="tag-ri"
          tagLabel="pessimistic"
        />
      </div>
      <div className="sv-card">
        <CardHdr icon="🔀" title="Branch Transition Controls" />
        <Row
          label="Require rep confirmation for branch shifts"
          sub="System proposes the branch change and waits for rep approval"
        >
          <Toggle checked={branchConfirm} onChange={setBranchConfirm} />
        </Row>
        <Row
          label="Auto-notify manager on at-risk branch shift"
          sub="Send notification when a deal enters an at-risk projection branch"
        >
          <Toggle checked={notifyManager} onChange={setNotifyManager} />
        </Row>
        <div className="sv-save">
          <button className="btn pri">Save</button>
        </div>
      </div>
    </>
  );
}

function PanelReplyValidation() {
  return (
    <div className="sv-card">
      <CardHdr
        iconBg="var(--tp)"
        iconColor="var(--td)"
        icon="✉"
        title="Reply Validation Rules"
        api="GET · POST · PATCH /api/config/reply-validation-rules"
        sub={<button className="btn sm pri">＋ New rule</button>}
      />
      <div className="sv-card-desc">
        Rules that validate generated replies before they are presented to the
        user.
      </div>
      <SimpleRuleRow
        id="no_unverified_claims"
        title="No unverified claims"
        sub="Reject drafts that make claims not backed by workspace intelligence"
        tagClass="tag-ri"
        tagLabel="block"
      />
      <SimpleRuleRow
        id="tone_check"
        title="Tone match"
        sub="Flag drafts whose detected tone differs from the selected tone setting"
        tagClass="tag-wa"
        tagLabel="flag"
      />
      <SimpleRuleRow
        id="no_pricing_in_early_stage"
        title="No pricing in early stage"
        sub="Block price mentions before Proposal stage"
        tagClass="tag-ri"
        tagLabel="block"
      />
      <SimpleRuleRow
        id="max_length"
        title="Reply length limit"
        sub="Flag replies over 400 words as potentially too long"
        tagClass="tag-wa"
        tagLabel="flag"
      />
    </div>
  );
}

// ─── Panel: Research Rules ────────────────────────────────────────────────────
function PanelResearchRules() {
  const [s, setS] = useState({
    newCustomer: true,
    stageAdvance: false,
    staleProfile: true,
    gapFlag: true,
    blockLowConf: false,
  });
  const set = (k: string, v: boolean) => setS((p) => ({ ...p, [k]: v }));
  return (
    <div className="sv-card">
      <CardHdr
        iconBg="var(--amberp)"
        iconColor="var(--amber)"
        icon="🔍"
        title="Research Rules"
        api="GET · POST · PATCH /api/config/research-rules"
      />
      <Row
        label={
          <span>
            Run for new customers <Mk>run_for_new_customer</Mk>
          </span>
        }
        sub="Trigger research pipeline when a new customer is resolved from an inbound email"
      >
        <Toggle
          checked={s.newCustomer}
          onChange={(v) => set("newCustomer", v)}
        />
      </Row>
      <Row
        label={
          <span>
            Run on stage advance <Mk>run_on_stage_advance</Mk>
          </span>
        }
        sub="Re-trigger research whenever a workspace advances to a new stage"
      >
        <Toggle
          checked={s.stageAdvance}
          onChange={(v) => set("stageAdvance", v)}
        />
      </Row>
      <Row
        label={
          <span>
            Run on stale profile <Mk>run_on_stale</Mk>
          </span>
        }
        sub="Automatically re-enrich when staleness threshold is exceeded"
      >
        <Toggle
          checked={s.staleProfile}
          onChange={(v) => set("staleProfile", v)}
        />
      </Row>
      <Row
        label={
          <span>
            Run on gap flag <Mk>run_on_gap_flag</Mk>
          </span>
        }
        sub="Trigger a focused research pass when a critical intelligence gap is flagged"
      >
        <Toggle checked={s.gapFlag} onChange={(v) => set("gapFlag", v)} />
      </Row>
      <Row
        label={
          <span>
            Research stale after <Mk>stale_after_days</Mk>
          </span>
        }
        sub="Days since last research run before eligible for re-enrichment"
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input
            className="sv-input"
            style={{ width: 60, minWidth: 60, textAlign: "center" }}
            defaultValue="30"
          />
          <span style={{ fontSize: 12, color: "var(--ink4)" }}>days</span>
        </div>
      </Row>
      <Row
        label={
          <span>
            Block agent actions on low confidence{" "}
            <Mk>block_on_low_confidence</Mk>
          </span>
        }
        sub="Prevent agents from acting on workspaces where research confidence is below threshold"
      >
        <Toggle
          checked={s.blockLowConf}
          onChange={(v) => set("blockLowConf", v)}
        />
      </Row>
      <div className="sv-save">
        <button className="btn">Reset defaults</button>
        <button className="btn pri">Save rules</button>
      </div>
    </div>
  );
}

// ─── Panel: Signal Types ──────────────────────────────────────────────────────
interface SignalTypeDef {
  id: string;
  title: string;
  sub: string;
  sens: string;
  tagClass: string;
  on: boolean;
}
const SIGNAL_TYPES_DATA: SignalTypeDef[] = [
  {
    id: "buying_intent",
    title: "Buying intent",
    sub: "Keywords and phrases that indicate purchase readiness",
    sens: "high",
    tagClass: "tag-ri",
    on: true,
  },
  {
    id: "churn_risk",
    title: "Churn risk",
    sub: "Signals of dissatisfaction, silence, or competitive evaluation",
    sens: "high",
    tagClass: "tag-ri",
    on: true,
  },
  {
    id: "expansion_trigger",
    title: "Expansion trigger",
    sub: "Indicators of upsell or cross-sell opportunity",
    sens: "medium",
    tagClass: "tag-wa",
    on: true,
  },
  {
    id: "payment_hesitation",
    title: "Payment hesitation",
    sub: "Language around billing, delays, disputes",
    sens: "medium",
    tagClass: "tag-wa",
    on: true,
  },
  {
    id: "stakeholder_change",
    title: "Stakeholder change",
    sub: "New contacts, org changes, role shifts",
    sens: "low",
    tagClass: "tag-mu",
    on: true,
  },
  {
    id: "competitive_mention",
    title: "Competitor mention",
    sub: "Named competitor references in comms or research",
    sens: "medium",
    tagClass: "tag-wa",
    on: false,
  },
];
function PanelSignalTypes() {
  const [ons, setOns] = useState<boolean[]>(SIGNAL_TYPES_DATA.map((s) => s.on));
  const toggleOn = (i: number, v: boolean) =>
    setOns((a) => {
      const n = [...a];
      n[i] = v;
      return n;
    });
  return (
    <div className="sv-card">
      <CardHdr
        icon="📡"
        title="Signal Types"
        api="PATCH /api/config/signal-types/{signalType}"
      />
      <div className="sv-card-desc">
        Configure which signal types are extracted from emails, meetings, and
        research.
      </div>
      {SIGNAL_TYPES_DATA.map((s, i) => (
        <div key={s.id} className={`sr-row${!ons[i] ? " disabled" : ""}`}>
          <div className="sr-body">
            <div className="sr-title">{s.title}</div>
            <div className="sr-sub">{s.sub}</div>
            <div className="sr-meta">
              <span className="rule-id">{s.id}</span>
              <span className={`tag ${s.tagClass}`}>{s.sens}</span>
            </div>
          </div>
          <div className="sr-actions">
            <select
              className="sv-select"
              style={{ minWidth: 90, height: 26, fontSize: 11 }}
            >
              <option>high</option>
              <option>medium</option>
              <option>low</option>
            </select>
            <button className="btn xs">Edit</button>
            <Toggle checked={ons[i]} onChange={(v) => toggleOn(i, v)} />
          </div>
        </div>
      ))}
      <div className="sv-save">
        <button className="btn pri">Save signal config</button>
      </div>
    </div>
  );
}

// ─── Panel: State Delta Rules ─────────────────────────────────────────────────
const STATE_DELTA_DATA = [
  {
    id: "force_score_drop",
    title: "Force score drop",
    sub: "Surface when any Panchashakti force drops by ≥ 0.2",
    on: true,
  },
  {
    id: "stage_advance",
    title: "Stage advance",
    sub: "Show state delta whenever a workspace advances to next stage",
    on: true,
  },
  {
    id: "contact_added",
    title: "Key contact added",
    sub: "Surface when decision maker or sponsor is added to workspace",
    on: true,
  },
  {
    id: "research_refresh",
    title: "Research refreshed",
    sub: "Show delta when Forager completes a re-enrichment run",
    on: false,
  },
  {
    id: "gap_cleared",
    title: "Gap cleared",
    sub: "Surface when a previously flagged intelligence gap is resolved",
    on: true,
  },
];
function PanelStateDeltaRules() {
  const [ons, setOns] = useState<boolean[]>(STATE_DELTA_DATA.map((r) => r.on));
  const toggleOn = (i: number, v: boolean) =>
    setOns((a) => {
      const n = [...a];
      n[i] = v;
      return n;
    });
  return (
    <div className="sv-card">
      <CardHdr
        iconBg="var(--tp)"
        iconColor="var(--td)"
        icon="↻"
        title="State Delta Rules"
        api="PATCH /api/config/state-delta-rules/{ruleId}"
      />
      <div className="sv-card-desc">
        Define which workspace field changes are surfaced as visible state
        deltas.
      </div>
      {STATE_DELTA_DATA.map((r, i) => (
        <Row
          key={r.id}
          label={
            <span>
              {r.title} <Mk>{r.id}</Mk>
            </span>
          }
          sub={r.sub}
        >
          <Toggle checked={ons[i]} onChange={(v) => toggleOn(i, v)} />
        </Row>
      ))}
      <div className="sv-save">
        <button className="btn pri">Save delta rules</button>
      </div>
    </div>
  );
}

// ─── Panel: Action Rules ──────────────────────────────────────────────────────
interface ActionRuleDef {
  n: number;
  name: string;
  desc: string;
  trigger: string;
  action: string;
  pri: number;
  danger?: boolean;
}
const ACTION_RULES_DATA: ActionRuleDef[] = [
  {
    n: 1,
    name: "ask_gap_questions",
    desc: "Ask top qualification gaps in reply.",
    trigger: "high_severity_gaps_present",
    action: "ask_question",
    pri: 1,
  },
  {
    n: 2,
    name: "suggest_discovery_call",
    desc: "Suggest a short discovery call.",
    trigger: "urgency_and_authority_present",
    action: "schedule_meeting",
    pri: 2,
  },
  {
    n: 3,
    name: "request_budget_range",
    desc: "Ask for budget range or commercial expectation.",
    trigger: "budget_missing",
    action: "ask_question",
    pri: 3,
  },
  {
    n: 4,
    name: "confirm_authority_path",
    desc: "Ask who will evaluate or approve.",
    trigger: "authority_missing",
    action: "ask_question",
    pri: 4,
  },
  {
    n: 5,
    name: "send_soft_qualification_reply",
    desc: "Respond helpfully while qualifying fit.",
    trigger: "overall_score_medium",
    action: "reply",
    pri: 5,
  },
  {
    n: 6,
    name: "route_to_manager",
    desc: "Route to manager for review.",
    trigger: "enterprise_or_high_risk",
    action: "route",
    pri: 6,
    danger: true,
  },
  {
    n: 7,
    name: "nurture",
    desc: "Send light reply and avoid heavy sales motion.",
    trigger: "overall_score_low",
    action: "nurture",
    pri: 7,
  },
];
function PanelActionRules() {
  const [ons, setOns] = useState<boolean[]>(ACTION_RULES_DATA.map(() => true));
  const toggleOn = (i: number, v: boolean) =>
    setOns((a) => {
      const n = [...a];
      n[i] = v;
      return n;
    });
  return (
    <div className="sv-card">
      <CardHdr
        icon="⚡"
        title="Agent Rules"
        api="GET · POST · PATCH /api/config/agent-rules"
        sub={
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "var(--ink5)" }}>
              7 rules · priority order
            </span>
            <button className="btn sm pri">＋ New rule</button>
          </div>
        }
      />
      <div className="sv-card-desc">
        Agent rules fire in priority order when their trigger condition is
        satisfied.
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "24px 1fr 160px 120px 48px 44px",
          gap: 8,
          padding: "8px 14px",
          background: "var(--bg)",
          borderBottom: "0.5px solid var(--brd)",
        }}
      >
        {[
          "#",
          "Rule name · Description",
          "Trigger condition",
          "Action type",
          "Pri.",
          "Active",
        ].map((h) => (
          <div
            key={h}
            style={{
              fontSize: "9.5px",
              fontWeight: 700,
              letterSpacing: ".07em",
              textTransform: "uppercase",
              color: "var(--ink5)",
            }}
          >
            {h}
          </div>
        ))}
      </div>
      {ACTION_RULES_DATA.map((r, i) => (
        <div
          key={r.n}
          style={{
            display: "grid",
            gridTemplateColumns: "24px 1fr 160px 120px 48px 44px",
            gap: 8,
            alignItems: "start",
            padding: "11px 14px",
            borderBottom: "0.5px solid var(--brd)",
          }}
        >
          <div
            style={{
              fontFamily: '"DM Mono",monospace',
              fontSize: 11,
              color: "var(--ink5)",
              paddingTop: 4,
            }}
          >
            {r.n}
          </div>
          <div>
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 500,
                color: "var(--ink)",
                fontFamily: '"DM Mono",monospace',
                marginBottom: 2,
              }}
            >
              {r.name}
            </div>
            <div style={{ fontSize: 11.5, color: "var(--ink4)" }}>{r.desc}</div>
            <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
              <button className="btn xs">Edit</button>
              <button className="btn xs">Duplicate</button>
            </div>
          </div>
          <input
            className="sv-input"
            style={{
              width: "100%",
              minWidth: 0,
              fontFamily: '"DM Mono",monospace',
              fontSize: 11,
            }}
            defaultValue={r.trigger}
          />
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 600,
              padding: "3px 9px",
              borderRadius: 4,
              background: r.danger ? "#FEE2E2" : "var(--pp)",
              color: r.danger ? "#991B1B" : "var(--p)",
              marginTop: 4,
              display: "inline-block",
            }}
          >
            {r.action}
          </span>
          <input
            className="sv-input"
            style={{ width: 38, minWidth: 38, textAlign: "center" }}
            defaultValue={r.pri}
          />
          <div style={{ paddingTop: 4 }}>
            <Toggle checked={ons[i]} onChange={(v) => toggleOn(i, v)} />
          </div>
        </div>
      ))}
      <div className="sv-save">
        <button className="btn">Reset to seed defaults</button>
        <button className="btn pri">Save rules</button>
      </div>
    </div>
  );
}

// ─── Panel: Research Modules ──────────────────────────────────────────────────
interface ResearchModuleDef {
  icon: string;
  bg: string;
  name: string;
  id: string;
  desc: string;
  fields: string;
  providers: string[];
  on: boolean;
}
const RESEARCH_MODULES_DATA: ResearchModuleDef[] = [
  {
    icon: "🏢",
    bg: "#E3F9F4",
    name: "Company Enrichment",
    id: "company_enrichment",
    desc: "Company size, revenue band, HQ, industry, business model.",
    fields: "company_size · revenue_band · hq · industry · business_model",
    providers: ["llm", "clearbit", "apollo"],
    on: true,
  },
  {
    icon: "💰",
    bg: "#FFFBEB",
    name: "Funding & Growth",
    id: "funding_growth",
    desc: "Funding stage, growth indicators, investors, and valuation signals.",
    fields: "funding_stage · total_raised · investors · growth_stage",
    providers: ["llm", "crunchbase"],
    on: true,
  },
  {
    icon: "🛠",
    bg: "#F5F3FF",
    name: "Tech Stack",
    id: "tech_stack",
    desc: "Known CRM, marketing stack, data tools, and software environment.",
    fields: "crm · marketing_stack · data_tools · current_systems",
    providers: ["llm"],
    on: true,
  },
  {
    icon: "📰",
    bg: "#EFF6FF",
    name: "Company News",
    id: "company_news",
    desc: "Recent launches, executive changes, partnerships, M&A events.",
    fields: "recent_news · launches · exec_changes · partnerships",
    providers: ["llm"],
    on: true,
  },
  {
    icon: "👤",
    bg: "#F0FDF4",
    name: "Sender Profile",
    id: "sender_profile",
    desc: "Sender role, seniority, likely responsibility, and buyer relevance.",
    fields: "sender_role · seniority · function · buyer_relevance",
    providers: ["llm", "linkedin"],
    on: true,
  },
  {
    icon: "📋",
    bg: "#FFF1F2",
    name: "Job Posting Signals",
    id: "job_signals",
    desc: "Hiring activity and roles that indicate business priorities.",
    fields: "active_roles · hiring_areas · team_growth",
    providers: ["llm", "linkedin"],
    on: false,
  },
];
function PanelResearchModules() {
  const [ons, setOns] = useState<boolean[]>(
    RESEARCH_MODULES_DATA.map((m) => m.on),
  );
  const toggleOn = (i: number, v: boolean) =>
    setOns((a) => {
      const n = [...a];
      n[i] = v;
      return n;
    });
  return (
    <div className="sv-card">
      <CardHdr
        iconBg="var(--amberp)"
        iconColor="var(--amber)"
        icon="🔬"
        title="Research Modules"
        api="PATCH /api/config/research-modules/{moduleId} · 6 modules"
      />
      <div className="sv-card-desc">
        Each module defines what the research pipeline collects for a workspace.
      </div>
      {RESEARCH_MODULES_DATA.map((m, i) => (
        <div key={m.id} className="rm-row">
          <div className="rm-icon" style={{ background: m.bg }}>
            {m.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="rm-name">
              {m.name} <Mk>{m.id}</Mk>
            </div>
            <div className="rm-desc">{m.desc}</div>
            <div className="rm-fields">{m.fields}</div>
          </div>
          <div className="rm-ctrl">
            <select className="sv-select" style={{ minWidth: 100 }}>
              {m.providers.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
            <Toggle checked={ons[i]} onChange={(v) => toggleOn(i, v)} />
          </div>
        </div>
      ))}
      <div className="sv-save">
        <button className="btn pri">Save modules</button>
      </div>
    </div>
  );
}

// ─── Panel: Notification Rules ────────────────────────────────────────────────
const NOTIF_RULES_DATA = [
  {
    id: "deal_stalled_7d",
    title: "Deal stalled 7 days",
    sub: "Notify owner when an active workspace has no activity for 7 days",
    ch: "in-app + email",
    on: true,
  },
  {
    id: "high_risk_gap",
    title: "High-risk intelligence gap",
    sub: "Notify owner when a risky or conflicting signal is flagged",
    ch: "in-app",
    on: true,
  },
  {
    id: "stage_blocked",
    title: "Stage advance blocked",
    sub: "Notify when readiness rules block a stage advancement",
    ch: "in-app",
    on: true,
  },
  {
    id: "reply_draft_ready",
    title: "Reply draft ready",
    sub: "Notify when Comms agent finishes a reply draft",
    ch: "in-app + slack",
    on: true,
  },
  {
    id: "invoice_overdue",
    title: "Invoice overdue",
    sub: "Notify finance contact when invoice passes watch threshold",
    ch: "email",
    on: false,
  },
];
function PanelNotificationRules() {
  const [ons, setOns] = useState<boolean[]>(NOTIF_RULES_DATA.map((r) => r.on));
  const toggleOn = (i: number, v: boolean) =>
    setOns((a) => {
      const n = [...a];
      n[i] = v;
      return n;
    });
  return (
    <div className="sv-card">
      <CardHdr
        icon="📣"
        title="Notification Rules"
        api="GET · POST · PATCH /api/config/notification-rules · tenant-level"
        sub={<button className="btn sm pri">＋ New rule</button>}
      />
      <div className="sv-card-desc">
        Tenant-level rules that define when notifications are triggered, who
        receives them, and via which channel.
      </div>
      {NOTIF_RULES_DATA.map((r, i) => (
        <div key={r.id} className="sr-row">
          <div className="sr-body">
            <div className="sr-title">{r.title}</div>
            <div className="sr-sub">{r.sub}</div>
            <div className="sr-meta">
              <span className="rule-id">{r.id}</span>
              <span
                style={{
                  fontSize: 9.5,
                  padding: "1.5px 7px",
                  borderRadius: 10,
                  background: "var(--bg3)",
                  color: "var(--ink4)",
                  border: ".5px solid var(--brd2)",
                  fontFamily: '"DM Mono",monospace',
                }}
              >
                {r.ch}
              </span>
            </div>
          </div>
          <div className="sr-actions">
            <button className="btn xs">Edit</button>
            <Toggle checked={ons[i]} onChange={(v) => toggleOn(i, v)} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Panel: Config Items ──────────────────────────────────────────────────────
function PanelConfigItems() {
  const tones = [
    { key: "helpful", desc: "Warm, supportive, solution-oriented" },
    { key: "direct", desc: "Concise, no fluff, confident" },
    { key: "soft", desc: "Empathetic, gentle, relationship-first" },
    { key: "executive_ready", desc: "Formal, polished, boardroom-appropriate" },
    { key: "concise", desc: "Minimum words, maximum clarity" },
  ];
  const categories: { key: string; desc: string; system?: boolean }[] = [
    {
      key: "commercial_inquiry",
      desc: "Inbound email expressing business interest → signals_extract",
    },
    {
      key: "meeting_request",
      desc: "Meeting / demo / discovery request → workspace_create",
    },
    {
      key: "pricing_request",
      desc: "Pricing / commercial discussion → commercial_push",
    },
    {
      key: "partnership_inquiry",
      desc: "Partnership / channel discussion → signals_extract",
    },
    {
      key: "renewal_discussion",
      desc: "Renewal / retention conversation → renewal_protection",
    },
    {
      key: "support_request",
      desc: "Operational / support request → disposition only",
    },
    {
      key: "non_commercial",
      desc: "Non-commercial communication → NonCommercialDisposition",
      system: true,
    },
  ];
  const dealTypes = [
    {
      key: "services_project",
      desc: "Project-based engagement with defined scope, timelines, and deliverables.",
    },
    {
      key: "product_sale",
      desc: "One-time sale of a physical or digital product to the customer.",
    },
    {
      key: "retainer",
      desc: "Ongoing service agreement with recurring billing and continuous support.",
    },
    {
      key: "saas",
      desc: "Subscription-based software service delivered and managed through the cloud.",
    },
    {
      key: "consulting",
      desc: "Advisory or strategic expertise provided to solve business or technical challenges.",
    },
    {
      key: "other",
      desc: "Custom or non-standard deal structure that does not fit predefined categories.",
    },
  ];
  const MonoLabel = ({ children }: { children: ReactNode }) => (
    <span
      style={{
        fontFamily: '"DM Mono",monospace',
        fontSize: 10,
        color: "var(--ink5)",
        fontWeight: 400,
      }}
    >
      {children}
    </span>
  );
  return (
    <>
      <div
        className="sv-card"
        style={{ marginBottom: 8, padding: "12px 18px" }}
      >
        <div
          style={{
            fontSize: 12.5,
            fontWeight: 600,
            color: "var(--ink)",
            marginBottom: 2,
          }}
        >
          Config Items
        </div>
        <div style={{ fontSize: 11.5, color: "var(--ink4)" }}>
          Lightweight configurable lists used across Zotra ·{" "}
          <span
            style={{
              fontFamily: '"DM Mono",monospace',
              fontSize: 10.5,
              color: "var(--p)",
            }}
          >
            GET / POST / PATCH /api/config/items
          </span>
        </div>
      </div>
      <div className="sv-card">
        <CardHdr
          icon="💬"
          title={
            <span>
              Tones <MonoLabel>tones</MonoLabel>
            </span>
          }
          sub={<button className="btn sm pri">＋ Add</button>}
        />
        {tones.map((t) => (
          <div key={t.key} className="ci-row">
            <div className="ci-key">{t.key}</div>
            <div className="ci-desc">{t.desc}</div>
            <span className="ci-badge">system</span>
            <div style={{ display: "flex", gap: 5 }}>
              <button className="btn xs">Edit</button>
              <button className="btn xs" disabled style={{ opacity: 0.4 }}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="sv-card">
        <CardHdr
          icon="◈"
          title={
            <span>
              Commercial Categories <MonoLabel>commercial_categories</MonoLabel>
            </span>
          }
          sub={<button className="btn sm pri">＋ Add</button>}
        />
        {categories.map((c) => (
          <div key={c.key} className="ci-row">
            <div className="ci-key">{c.key}</div>
            <div className="ci-desc">{c.desc}</div>
            {c.system && <span className="ci-badge">system</span>}
            <div style={{ display: "flex", gap: 5 }}>
              <button className="btn xs">Edit</button>
              {!c.system && <button className="btn xs">Remove</button>}
            </div>
          </div>
        ))}
      </div>
      <div className="sv-card">
        <CardHdr
          icon="◈"
          title={
            <span>
              Deal Types <MonoLabel>deal_types</MonoLabel>
            </span>
          }
          sub={<button className="btn sm pri">＋ Add</button>}
        />
        {dealTypes.map((d) => (
          <div key={d.key} className="ci-row">
            <div className="ci-key">{d.key}</div>
            <div className="ci-desc">{d.desc}</div>
            <div style={{ display: "flex", gap: 5 }}>
              <button className="btn xs">Edit</button>
              <button className="btn xs">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Panel: Outcome Learning ──────────────────────────────────────────────────
function PanelOutcomeLearning() {
  return (
    <div className="sv-card">
      <CardHdr
        icon="↻"
        title="Outcome Learning"
        api="Configure how the system learns from deal outcomes"
      />
      <Row
        label={
          <span>
            Learning trigger <Mk>outcome_trigger</Mk>
          </span>
        }
        sub="When does outcome logging fire?"
      >
        <select className="sv-select">
          <option>reply_sent</option>
          <option>workspace_closed</option>
          <option>stage_advanced</option>
          <option>manual</option>
        </select>
      </Row>
      <Row
        label={
          <span>
            Learning target <Mk>learning_target</Mk>
          </span>
        }
        sub="What does the learning loop update?"
      >
        <select className="sv-select">
          <option>action_scoring_model</option>
          <option>inference_library_weights</option>
          <option>rubric_thresholds</option>
          <option>all_targets</option>
        </select>
      </Row>
      <Row
        label="Minimum outcomes before learning"
        sub="Minimum closed deals required before the model updates."
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input
            className="sv-input"
            style={{ width: 60, minWidth: 60, textAlign: "center" }}
            defaultValue="5"
          />
          <span style={{ fontSize: 12, color: "var(--ink4)" }}>deals</span>
        </div>
      </Row>
      <Row
        label="Learning cadence"
        sub="How frequently the model re-evaluates outcomes and updates targets."
      >
        <select className="sv-select">
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </Row>
      <div className="sv-save">
        <button className="btn">Reset defaults</button>
        <button className="btn pri">Save changes</button>
      </div>
    </div>
  );
}

// ─── Panel: Team ──────────────────────────────────────────────────────────────
const USER_ROLES = ["Owner", "Admin", "Manager", "Member", "Viewer", "Partner"];
function PanelTeam() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    msg: string;
    type: "ok" | "err";
  } | null>(null);
  const [managerView, setManagerView] = useState(true);

  function showToast(msg: string, type: "ok" | "err" = "ok") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }
  function authHeaders(): Record<string, string> {
    const token = localStorage.getItem("zotra_token");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  useEffect(() => {
    setLoading(true);
    apiFetch(`${baseUrl()}/users`, { headers: authHeaders() })
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json() as Promise<UserRecord[]>;
      })
      .then((data) => {
        setUsers(data);
        setApiError(null);
      })
      .catch((err: Error) => setApiError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleRoleChange(userId: string, newRole: string) {
    setSaving(userId);
    try {
      const res = await apiFetch(`${baseUrl()}/users/${userId}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({ role: newRole }),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      setUsers((prev) =>
        prev.map((u) => (u.userId === userId ? { ...u, role: newRole } : u)),
      );
      showToast("Role updated successfully");
    } catch (err) {
      showToast(`Failed: ${(err as Error).message}`, "err");
    } finally {
      setSaving(null);
    }
  }

  async function handleRemove(userId: string, name: string) {
    setSaving(userId);
    setConfirmId(null);
    try {
      const res = await apiFetch(`${baseUrl()}/users/${userId}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      setUsers((prev) => prev.filter((u) => u.userId !== userId));
      showToast(`${name} has been removed`);
    } catch (err) {
      showToast(`Failed: ${(err as Error).message}`, "err");
    } finally {
      setSaving(null);
    }
  }

  async function handleResend(userId: string, email: string) {
    setSaving(userId);
    try {
      const res = await apiFetch(`${baseUrl()}/users/${userId}/resend-invite`, {
        method: "POST",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      showToast(`Invite resent to ${email}`);
    } catch (err) {
      showToast(`Failed: ${(err as Error).message}`, "err");
    } finally {
      setSaving(null);
    }
  }

  const AV_COLORS = [
    { bg: "#EEF2FF", color: "#4338CA" },
    { bg: "#F0FDF4", color: "#15803D" },
    { bg: "#FFF7ED", color: "#C2410C" },
    { bg: "#FDF4FF", color: "#9333EA" },
    { bg: "#FFF1F2", color: "#BE123C" },
    { bg: "#F0F9FF", color: "#0369A1" },
  ];
  const roleColors: Record<string, { bg: string; color: string }> = {
    Owner: { bg: "#EEF2FF", color: "#4338CA" },
    Admin: { bg: "#FFF7ED", color: "#C2410C" },
    Manager: { bg: "#F0FDF4", color: "#15803D" },
    Member: { bg: "#F0F9FF", color: "#0369A1" },
    Viewer: { bg: "#F5F5F5", color: "#525252" },
    Partner: { bg: "#FDF4FF", color: "#9333EA" },
  };
  const currentUserEmail = localStorage.getItem("zotra_email") ?? "";
  const activeCount = users.filter((u) => u.status === "Active").length;

  if (loading) {
    return (
      <div className="sv-card">
        <CardHdr
          icon="👥"
          title="Team members"
          sub={
            <button className="btn sm pri" disabled>
              ＋ Invite member
            </button>
          }
        />
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 18px",
              borderBottom: "0.5px solid var(--brd)",
            }}
          >
            <div
              className="skel"
              style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0 }}
            />
            <div style={{ flex: 1 }}>
              <div
                className="skel"
                style={{ height: 12, width: 140, marginBottom: 7 }}
              />
              <div className="skel" style={{ height: 10, width: 200 }} />
            </div>
            <div
              className="skel"
              style={{ height: 30, width: 130, borderRadius: 7 }}
            />
            <div
              className="skel"
              style={{ height: 30, width: 80, borderRadius: 7 }}
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
            alignItems: "center",
          }}
        >
          <span>⚠</span>
          <span>Could not reach API ({apiError}). Showing cached data.</span>
        </div>
      )}
      {confirmId &&
        (() => {
          const target = users.find((u) => u.userId === confirmId);
          if (!target) return null;
          return (
            <div
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 1000,
                background: "rgba(15,15,25,.45)",
                backdropFilter: "blur(2px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  background: "var(--bg2)",
                  borderRadius: 16,
                  border: "0.5px solid var(--brd2)",
                  boxShadow: "0 8px 40px rgba(0,0,0,.18)",
                  padding: "28px 28px 22px",
                  width: 360,
                  maxWidth: "90vw",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "var(--rib)",
                    color: "var(--ri)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    marginBottom: 16,
                  }}
                >
                  ⚠
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 650,
                    color: "var(--ink)",
                    fontFamily: '"Sora",sans-serif',
                    marginBottom: 6,
                  }}
                >
                  Remove team member?
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    color: "var(--ink4)",
                    lineHeight: 1.6,
                    marginBottom: 22,
                  }}
                >
                  <strong style={{ color: "var(--ink)" }}>
                    {target.fullName || target.email}
                  </strong>{" "}
                  will immediately lose access to all workspaces and data. This
                  cannot be undone.
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    justifyContent: "flex-end",
                  }}
                >
                  <button className="btn" onClick={() => setConfirmId(null)}>
                    Cancel
                  </button>
                  <button
                    className="btn pri"
                    style={{
                      background: "var(--ri)",
                      borderColor: "var(--ri)",
                    }}
                    onClick={() =>
                      handleRemove(
                        target.userId,
                        target.fullName || target.email,
                      )
                    }
                  >
                    Yes, remove
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      <div className="sv-card">
        <CardHdr
          icon="👥"
          title="Team members"
          sub={
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  fontSize: 11,
                  color: "var(--ink5)",
                  background: "var(--bg3)",
                  border: "0.5px solid var(--brd2)",
                  padding: "2px 9px",
                  borderRadius: 20,
                  fontFamily: '"DM Mono",monospace',
                }}
              >
                {activeCount} active · {users.length} total
              </span>
              <button className="btn sm pri">＋ Invite member</button>
            </div>
          }
        />
        {users.length === 0 && (
          <div
            style={{
              padding: "36px 18px",
              textAlign: "center",
              color: "var(--ink4)",
              fontSize: 13,
            }}
          >
            No team members found.
          </div>
        )}
        {users.map((user, idx) => {
          const isActive = user.status === "Active";
          const isInvited = user.status === "Invited";
          const isYou =
            user.email.toLowerCase() === currentUserEmail.toLowerCase();
          const isBusy = saving === user.userId;
          const av = AV_COLORS[idx % AV_COLORS.length];
          const rc = roleColors[user.role] ?? {
            bg: "var(--pp)",
            color: "var(--p)",
          };
          const initials = (user.fullName || user.email)
            .split(" ")
            .map((w) => w[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
          return (
            <div
              key={user.userId}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "13px 18px",
                borderBottom: "0.5px solid var(--brd)",
                opacity: isBusy ? 0.6 : 1,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  flexShrink: 0,
                  background: av.bg,
                  color: av.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  border: `1.5px solid ${av.color}22`,
                }}
              >
                {initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 3,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    {user.fullName || user.email}
                  </span>
                  {isYou && (
                    <span
                      style={{
                        fontSize: 9.5,
                        background: "var(--pp)",
                        color: "var(--p)",
                        padding: "1.5px 7px",
                        borderRadius: 20,
                        fontWeight: 700,
                      }}
                    >
                      You
                    </span>
                  )}
                  <span
                    style={{
                      fontSize: 9.5,
                      padding: "1.5px 7px",
                      borderRadius: 20,
                      fontWeight: 700,
                      background: isActive
                        ? "var(--okb)"
                        : isInvited
                          ? "var(--wab)"
                          : "var(--bg3)",
                      color: isActive
                        ? "var(--okf)"
                        : isInvited
                          ? "var(--waf)"
                          : "var(--ink4)",
                    }}
                  >
                    {user.status}
                  </span>
                  <span
                    style={{
                      fontSize: 9.5,
                      padding: "1.5px 7px",
                      borderRadius: 20,
                      fontWeight: 600,
                      background: rc.bg,
                      color: rc.color,
                    }}
                  >
                    {user.role}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    color: "var(--ink4)",
                    display: "flex",
                    gap: 8,
                  }}
                >
                  <span>{user.email}</span>
                  {user.jobRole && (
                    <>
                      <span style={{ color: "var(--ink6)" }}>·</span>
                      <span>{user.jobRole}</span>
                    </>
                  )}
                </div>
              </div>
              <select
                className="sv-select"
                value={user.role}
                disabled={isBusy || isYou}
                style={{ minWidth: 120 }}
                onChange={(e) => handleRoleChange(user.userId, e.target.value)}
              >
                {USER_ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {isActive ? (
                <button
                  className="btn"
                  disabled={isBusy || isYou}
                  style={{
                    color: "var(--ri)",
                    borderColor: "var(--rib)",
                    minWidth: 76,
                    opacity: isYou ? 0.35 : 1,
                  }}
                  onClick={() => setConfirmId(user.userId)}
                >
                  {isBusy ? "…" : "Remove"}
                </button>
              ) : (
                <button
                  className="btn"
                  disabled={isBusy}
                  style={{ minWidth: 76 }}
                  onClick={() => handleResend(user.userId, user.email)}
                >
                  {isBusy ? "Sending…" : "Resend"}
                </button>
              )}
            </div>
          );
        })}
      </div>
      <div className="sv-card">
        <CardHdr icon="🔒" title="Workspace sharing" />
        <Row
          label="Default opportunity visibility"
          sub="Who can see new opportunities by default"
        >
          <select className="sv-select">
            <option>Private (only me)</option>
            <option>Team (all members)</option>
            <option>Custom</option>
          </select>
        </Row>
        <Row label="Allow managers to view all deals">
          <Toggle checked={managerView} onChange={setManagerView} />
        </Row>
      </div>
    </>
  );
}

function PanelBilling() {
  return (
    <>
      <div className="sv-card">
        <CardHdr
          icon="⭐"
          title="Current plan"
          sub={
            <span
              style={{
                background: "var(--pp)",
                color: "var(--p)",
                fontSize: 10.5,
                fontWeight: 700,
                padding: "2px 9px",
                borderRadius: 20,
              }}
            >
              Pro
            </span>
          }
        />
        <Row
          label={
            <span>
              Zotra Pro <Mk>Plan: premium</Mk>
            </span>
          }
          sub="$79/month · billed monthly · renews Jun 4, 2026"
        >
          <button className="btn pri">Upgrade plan</button>
        </Row>
        <Row label="Opportunities used" sub="12 of 25 active opportunities">
          <div>
            <div className="bill-bar">
              <div className="bill-fill" style={{ width: "48%" }} />
            </div>
            <div
              style={{
                fontSize: 10.5,
                color: "var(--ink5)",
                marginTop: 3,
                textAlign: "right",
                fontFamily: '"DM Mono",monospace',
              }}
            >
              12 / 25
            </div>
          </div>
        </Row>
        <Row label="Billing email">
          <input className="sv-input" defaultValue="finance@acme.com" />
        </Row>
        <Row label="Payment method" sub="Visa ending 4242 · expires 09/27">
          <button className="btn">Update card</button>
        </Row>
      </div>
      <div className="sv-card">
        <CardHdr icon="📄" title="Invoices" />
        {(["May 2026", "April 2026", "March 2026"] as string[]).map((m) => (
          <Row key={m} label={m} sub="$79.00 · Paid">
            <button className="btn sm">Download PDF</button>
          </Row>
        ))}
      </div>
    </>
  );
}

function PanelDanger() {
  return (
    <div className="sv-card">
      <CardHdr
        iconBg="var(--rib)"
        iconColor="var(--ri)"
        icon="⚠"
        title={<span style={{ color: "var(--ri)" }}>Danger zone</span>}
      />
      <Row
        label="Export all data"
        sub="Download a full archive of your opportunities, signals, and settings"
      >
        <button className="btn">Request export</button>
      </Row>
      <Row
        label="Clear all opportunities"
        sub="Permanently delete all opportunity data. Cannot be undone."
      >
        <button className="btn danger">Clear opportunities</button>
      </Row>
      <Row
        label="Reset all agent settings"
        sub="All agent configurations will revert to factory defaults."
      >
        <button className="btn danger">Reset agents</button>
      </Row>
      <Row
        label="Delete account"
        sub="Permanently remove your account, data, and all associated opportunities"
      >
        <button className="btn danger">Delete account</button>
      </Row>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
interface NavItem {
  id: string;
  icon: string;
  label: string;
  danger?: boolean;
}
interface NavGroup {
  section: string | null;
  items: NavItem[];
}

const NAV: NavGroup[] = [
  {
    section: "Tenant",
    items: [
      { id: "tenant-settings", icon: "⚙", label: "Tenant Settings" },
      { id: "branding", icon: "🏷", label: "Branding" },
      { id: "team", icon: "👥", label: "Team" },
    ],
  },
  {
    section: "Agents & Autonomy",
    items: [
      { id: "agents", icon: "◙", label: "Agents" },
      { id: "agent-autonomy", icon: "🎛", label: "Agent Autonomy" },
      { id: "outcome-learning", icon: "↻", label: "Outcome Learning" },
    ],
  },
  {
    section: "Intelligence Config",
    items: [
      { id: "inference-library", icon: "📚", label: "Inference Library" },
      { id: "force-config", icon: "◐", label: "Panchashakti" },
      { id: "rubric-config", icon: "◈", label: "Rubrics" },
      { id: "readiness-rules", icon: "✓", label: "Readiness Rules" },
      { id: "gap-rules", icon: "⚠", label: "Gap Rules" },
      { id: "projection-rules", icon: "◐", label: "Projection Rules" },
      { id: "reply-validation", icon: "✉", label: "Reply Validation" },
      { id: "action-rules", icon: "⚡", label: "Agent Rules" },
    ],
  },
  {
    section: "Research & Signals",
    items: [
      { id: "research-modules", icon: "🔬", label: "Research Modules" },
      { id: "research-rules", icon: "🔍", label: "Research Rules" },
      { id: "signal-types", icon: "📡", label: "Signal Types" },
      { id: "state-delta-rules", icon: "↻", label: "State Delta Rules" },
      { id: "notification-rules", icon: "📣", label: "Notification Rules" },
    ],
  },
  {
    section: "Config Lists",
    items: [{ id: "config-items", icon: "■", label: "Config Items" }],
  },
  {
    section: "Integrations & Billing",
    items: [
      { id: "integrations", icon: "🔗", label: "Integrations" },
      { id: "billing", icon: "💳", label: "Billing" },
    ],
  },
  {
    section: "Conversation Assistant",
    items: [
      { id: "assistant-persona", icon: "🤖", label: "Persona & Prompt" },
      { id: "assistant-channels", icon: "📡", label: "Channels" },
      { id: "assistant-inventory", icon: "📦", label: "Inventory Config" },
      { id: "assistant-escalation", icon: "🔀", label: "Escalation Rules" },
      { id: "rel-stages", icon: "🔗", label: "Relationship Stages" },
    ],
  },
  {
    section: null,
    items: [{ id: "danger", icon: "⚠", label: "Danger zone", danger: true }],
  },
];

const PANEL_MAP: Record<string, React.ComponentType> = {
  profile: PanelProfile,
  preferences: PanelPreferences,
  "tenant-settings": PanelTenantSettings,
  branding: PanelBranding,
  team: PanelTeam,
  agents: PanelAgents,
  "agent-autonomy": PanelAgentAutonomy,
  "outcome-learning": PanelOutcomeLearning,
  "inference-library": PanelInferenceLibrary,
  // ── Extracted panels ───────────────────────────────────────────────────────
  "force-config": PanelForceConfig,
  "rubric-config": PanelRubricConfig,
  // ──────────────────────────────────────────────────────────────────────────
  "readiness-rules": PanelReadinessRules,
  "gap-rules": PanelGapRules,
  "projection-rules": PanelProjectionRules,
  "reply-validation": PanelReplyValidation,
  "action-rules": PanelActionRules,
  "research-modules": PanelResearchModules,
  "research-rules": PanelResearchRules,
  "signal-types": PanelSignalTypes,
  "state-delta-rules": PanelStateDeltaRules,
  "notification-rules": PanelNotificationRules,
  "config-items": PanelConfigItems,
  integrations: PanelIntegrations,
  billing: PanelBilling,
  danger: PanelDanger,
  "assistant-persona": PanelPersonaPrompt,
  "assistant-channels": PanelChannels,
  "assistant-inventory": PanelInventoryConfig,
  "assistant-escalation": PanelEscalationRules,
  "rel-stages": PanelRelationshipStages,
};

// ─── Root ─────────────────────────────────────────────────────────────────────
interface SettingsViewProps {
  colorScheme?: ColorScheme;
  onColorSchemeChange?: (v: ColorScheme) => void;
  initialPanel?: string;
}
export default function SettingsView({
  colorScheme = "default",
  onColorSchemeChange = () => {},
  initialPanel,
}: SettingsViewProps) {
  const [active, setActive] = useState<string>(
    initialPanel ?? "tenant-settings",
  );

  useEffect(() => {
    if (initialPanel) setActive(initialPanel);
  }, [initialPanel]);
  const PanelComponent = PANEL_MAP[active] ?? null;

  return (
    <ThemeContext.Provider value={{ colorScheme, onColorSchemeChange }}>
      <style>{STYLES}</style>
      <div className="sv">
        <div className="sv-hd">
          <div>
            <div className="sv-hd-title">Settings</div>
            <div className="sv-hd-sub">
              Manage your account, preferences, integrations and team
            </div>
          </div>
        </div>
        <div className="sv-body">
          <nav className="sv-nav">
            {NAV.map((group, gi) => (
              <React.Fragment key={gi}>
                {group.section && (
                  <div className="sv-nav-grp">{group.section}</div>
                )}
                {group.items.map((item) => (
                  <div
                    key={item.id}
                    className={`sv-nav-item${active === item.id ? " on" : ""}${item.danger ? " danger" : ""}`}
                    onClick={() => setActive(item.id)}
                  >
                    <span className="sv-nav-ic">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
                {gi < NAV.length - 2 && <div className="sv-nav-sep" />}
              </React.Fragment>
            ))}
          </nav>
          <div className="sv-content">
            {PanelComponent ? (
              <PanelComponent key={active} />
            ) : (
              <div className="sv-card">
                <CardHdr icon="⚙" title={active.replace(/-/g, " ")} />
                <div
                  style={{
                    padding: "40px 18px",
                    textAlign: "center",
                    color: "var(--ink4)",
                    fontSize: 13,
                  }}
                >
                  Configuration panel coming soon.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
