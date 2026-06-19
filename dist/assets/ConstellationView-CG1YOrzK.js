import{r as W,j as e,d as f,e as Z}from"./vendor-react-DTmZBiFG.js";import{f as L,I as u,S as z,i as R,a as q}from"./AppShell-1WAPhVoa.js";import{S as V}from"./Shared-BmJpXX_S.js";import{A as Q}from"./AccountDetailPanel-DvgUhXJ0.js";import{a as U,b as J,g as ee}from"./api-BV-Sjtc4.js";import"./index-Dra5disE.js";import"./vendor-icons-BGVXKQIZ.js";const ae=`
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(32px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes nop-fade-up {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes nop-shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes nop-ping {
  0%,100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(1.18); opacity: .7; }
}

/* Panel shell */
.nop-shell {
  display: flex; flex-direction: column; height: 100%;
  font-family: "Sora", sans-serif;
  background: var(--bg, #ffffff);
  --nop-p: #6366f1; --nop-p2: #4f46e5;
  --nop-g: linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#06b6d4 100%);
  --nop-ink: #0f172a; --nop-ink3: #475569; --nop-ink5: #94a3b8;
  --nop-brd: #e2e8f0; --nop-bg2: #f8fafc; --nop-bg3: #f1f5f9;
  --nop-radius: 12px;
  animation: slideInRight .28s cubic-bezier(.22,1,.36,1) both;
}

/* Header */
.nop-header {
  padding: 20px 22px 16px;
  border-bottom: 0.5px solid var(--nop-brd);
  display: flex; align-items: flex-start; gap: 14px;
  flex-shrink: 0;
  background: var(--bg2, #f8fafc);
  position: relative; overflow: hidden;
}
.nop-header::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg,rgba(99,102,241,.055) 0%,rgba(139,92,246,.03) 60%,transparent 100%);
  pointer-events: none;
}
.nop-header-icon {
  width: 40px; height: 40px; border-radius: 11px; flex-shrink: 0;
  background: var(--nop-g); display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 14px rgba(99,102,241,.35); position: relative;
}
.nop-header-icon svg { filter: drop-shadow(0 1px 2px rgba(0,0,0,.18)); }
.nop-header-title { font-size: 16px; font-weight: 700; color: var(--nop-ink); letter-spacing: -.025em; margin-bottom: 2px; }
.nop-header-sub { font-size: 11.5px; color: var(--nop-ink5); font-family: "DM Mono",monospace; }
.nop-close {
  margin-left: auto; width: 28px; height: 28px; border-radius: 8px;
  border: 0.5px solid var(--nop-brd); background: var(--bg,#fff);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  color: var(--nop-ink5); font-size: 16px; line-height: 1; transition: all .15s; flex-shrink: 0;
}
.nop-close:hover { background: var(--nop-bg3); color: var(--nop-ink); border-color: var(--nop-ink5); }

/* Progress steps */
.nop-steps {
  display: flex; align-items: center; gap: 0;
  padding: 14px 22px; border-bottom: 0.5px solid var(--nop-brd);
  flex-shrink: 0; background: var(--bg,#fff);
}
.nop-step {
  display: flex; align-items: center; gap: 6px; flex: 1;
  position: relative;
}
.nop-step:not(:last-child)::after {
  content: ''; position: absolute; left: calc(50% + 16px); right: calc(-50% + 16px);
  top: 12px; height: 1.5px;
  background: var(--nop-brd); z-index: 0;
  transition: background .3s;
}
.nop-step.done:not(:last-child)::after { background: var(--nop-p); }
.nop-step-circle {
  width: 24px; height: 24px; border-radius: 50%; border: 1.5px solid var(--nop-brd);
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 700; color: var(--nop-ink5);
  background: var(--bg,#fff); transition: all .2s; flex-shrink: 0; z-index: 1;
}
.nop-step.active .nop-step-circle {
  border-color: var(--nop-p); background: var(--nop-p); color: #fff;
  box-shadow: 0 0 0 3px rgba(99,102,241,.18);
  animation: nop-ping 1.4s ease-in-out infinite;
}
.nop-step.done .nop-step-circle {
  border-color: var(--nop-p); background: var(--nop-p); color: #fff;
  animation: none; box-shadow: none;
}
.nop-step-label { font-size: 10px; font-weight: 600; color: var(--nop-ink5); letter-spacing: .04em; text-transform: uppercase; white-space: nowrap; }
.nop-step.active .nop-step-label { color: var(--nop-p); }
.nop-step.done .nop-step-label { color: var(--nop-ink3); }

/* Scrollable body */
.nop-body {
  flex: 1; overflow-y: auto; padding: 20px 22px;
  display: flex; flex-direction: column; gap: 18px;
}
.nop-body::-webkit-scrollbar { width: 4px; }
.nop-body::-webkit-scrollbar-thumb { background: rgba(0,0,0,.10); border-radius: 99px; }

/* Section heading */
.nop-section-label {
  font-size: 9.5px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
  color: var(--nop-ink5); margin-bottom: 10px; display: flex; align-items: center; gap: 6px;
}
.nop-section-label::after { content:''; flex:1; height:0.5px; background:var(--nop-brd); }

/* Field */
.nop-field { display: flex; flex-direction: column; gap: 5px; animation: nop-fade-up .25s ease both; }
.nop-label {
  font-size: 11px; font-weight: 600; color: var(--nop-ink3); letter-spacing: .01em;
  display: flex; align-items: center; gap: 4px;
}
.nop-required { color: #e5566c; font-size: 10px; }
.nop-input, .nop-select, .nop-textarea {
  width: 100%; padding: 9px 12px; border-radius: var(--nop-radius);
  border: 1px solid var(--nop-brd); background: var(--bg,#fff);
  font-family: "Sora",sans-serif; font-size: 12.5px; color: var(--nop-ink);
  outline: none; transition: border-color .15s, box-shadow .15s;
  box-sizing: border-box; appearance: none;
}
.nop-input::placeholder, .nop-textarea::placeholder { color: var(--nop-ink5); }
.nop-input:focus, .nop-select:focus, .nop-textarea:focus {
  border-color: var(--nop-p); box-shadow: 0 0 0 3px rgba(99,102,241,.14);
}
.nop-textarea { resize: vertical; min-height: 70px; font-size: 12px; line-height: 1.55; }
.nop-select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%2394a3b8' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; padding-right: 30px; cursor: pointer; }

/* 2-col grid */
.nop-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

/* Value input with $ prefix */
.nop-value-wrap { position: relative; }
.nop-value-prefix { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-family: "DM Mono",monospace; font-size: 12px; color: var(--nop-ink5); pointer-events: none; }
.nop-value-wrap .nop-input { padding-left: 24px; font-family: "DM Mono",monospace; }

/* Heat selector */
.nop-heat-row { display: flex; gap: 8px; }
.nop-heat-opt {
  flex: 1; padding: 8px 10px; border-radius: 10px; border: 1px solid var(--nop-brd);
  background: var(--bg,#fff); cursor: pointer; display: flex; align-items: center; gap: 7px;
  font-size: 11.5px; font-weight: 600; color: var(--nop-ink3); transition: all .15s;
}
.nop-heat-opt:hover { border-color: var(--nop-ink5); }
.nop-heat-opt.selected-hot { border-color: #e5566c; background: rgba(229,86,108,.07); color: #b83045; }
.nop-heat-opt.selected-warm { border-color: #d97757; background: rgba(217,119,87,.07); color: #a04e2a; }
.nop-heat-opt.selected-cool { border-color: #4b6fdb; background: rgba(75,111,219,.07); color: #2e48a0; }
.nop-heat-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
.nop-heat-dot.hot { background: #e5566c; box-shadow: 0 0 0 2.5px rgba(229,86,108,.22); }
.nop-heat-dot.warm { background: #d97757; box-shadow: 0 0 0 2.5px rgba(217,119,87,.22); }
.nop-heat-dot.cool { background: #4b6fdb; box-shadow: 0 0 0 2.5px rgba(75,111,219,.22); }

/* Owner avatar chip */
.nop-owner-row { display: flex; gap: 7px; flex-wrap: wrap; }
.nop-owner-chip {
  display: flex; align-items: center; gap: 6px; padding: 5px 10px 5px 6px;
  border-radius: 99px; border: 1px solid var(--nop-brd); background: var(--bg,#fff);
  font-size: 11.5px; font-weight: 600; color: var(--nop-ink3); cursor: pointer;
  transition: all .15s;
}
.nop-owner-chip:hover { border-color: var(--nop-p); color: var(--nop-p); }
.nop-owner-chip.selected { border-color: var(--nop-p); background: rgba(99,102,241,.07); color: var(--nop-p); }
.nop-owner-av {
  width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center;
  justify-content: center; font-size: 8px; font-weight: 700; color: #fff; flex-shrink: 0;
}

/* AI suggestion banner */
.nop-ai-banner {
  padding: 10px 13px; border-radius: 11px;
  background: linear-gradient(135deg,rgba(99,102,241,.07),rgba(139,92,246,.05));
  border: 1px solid rgba(99,102,241,.18);
  display: flex; align-items: flex-start; gap: 9px;
  animation: nop-fade-up .3s .1s ease both;
}
.nop-ai-icon { width: 26px; height: 26px; border-radius: 8px; background: var(--nop-g); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.nop-ai-text { font-size: 11.5px; color: var(--nop-ink3); line-height: 1.55; }
.nop-ai-text strong { color: var(--nop-p); font-weight: 600; }

/* Summary card (step 3) */
.nop-summary-card {
  border-radius: 13px; border: 1px solid var(--nop-brd);
  overflow: hidden; animation: nop-fade-up .3s ease both;
}
.nop-summary-head {
  padding: 13px 15px; display: flex; align-items: center; gap: 11px;
  background: var(--nop-bg2); border-bottom: 1px solid var(--nop-brd);
}
.nop-summary-av {
  width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center;
  justify-content: center; font-size: 13px; font-weight: 700; color: #fff; flex-shrink: 0;
  background: var(--nop-g);
}
.nop-summary-name { font-size: 14px; font-weight: 700; color: var(--nop-ink); letter-spacing: -.015em; }
.nop-summary-domain { font-size: 11px; color: var(--nop-ink5); font-family: "DM Mono",monospace; }
.nop-summary-rows { padding: 10px 15px; display: flex; flex-direction: column; gap: 0; }
.nop-summary-row { display: flex; align-items: center; gap: 8px; padding: 7px 0; border-bottom: 0.5px solid var(--nop-brd); }
.nop-summary-row:last-child { border-bottom: 0; }
.nop-summary-key { font-size: 11px; color: var(--nop-ink5); min-width: 90px; }
.nop-summary-val { font-size: 12px; font-weight: 600; color: var(--nop-ink); }

/* Footer */
.nop-footer {
  padding: 14px 22px; border-top: 0.5px solid var(--nop-brd);
  display: flex; align-items: center; gap: 8px; flex-shrink: 0;
  background: var(--bg2, #f8fafc);
}
.nop-btn-pri {
  flex: 1; padding: 10px 18px; border-radius: var(--nop-radius);
  background: var(--nop-g); color: #fff; font-family: "Sora",sans-serif;
  font-size: 13px; font-weight: 700; border: 0; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 7px;
  box-shadow: 0 4px 14px rgba(99,102,241,.35); transition: opacity .15s, transform .1s;
  letter-spacing: -.01em;
}
.nop-btn-pri:hover { opacity: .9; transform: translateY(-1px); }
.nop-btn-pri:active { transform: translateY(0); }
.nop-btn-sec {
  padding: 10px 16px; border-radius: var(--nop-radius);
  background: transparent; color: var(--nop-ink3); font-family: "Sora",sans-serif;
  font-size: 13px; font-weight: 600; border: 1px solid var(--nop-brd); cursor: pointer;
  transition: all .15s;
}
.nop-btn-sec:hover { border-color: var(--nop-ink5); color: var(--nop-ink); }

/* Success screen */
.nop-success {
  flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 16px; padding: 40px 28px; text-align: center;
  animation: nop-fade-up .4s ease both;
}
.nop-success-ring {
  width: 72px; height: 72px; border-radius: 50%;
  background: linear-gradient(135deg,rgba(99,102,241,.12),rgba(22,163,74,.12));
  display: flex; align-items: center; justify-content: center;
  border: 1.5px solid rgba(22,163,74,.35);
}
.nop-success-check {
  width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg,#16a34a,#22c55e);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 20px rgba(22,163,74,.35);
}
.nop-success-title { font-size: 20px; font-weight: 700; color: var(--nop-ink); letter-spacing: -.025em; }
.nop-success-sub { font-size: 13px; color: var(--nop-ink5); line-height: 1.6; max-width: 280px; }
.nop-success-deal {
  padding: 12px 20px; border-radius: 13px; border: 1px solid var(--nop-brd);
  background: var(--nop-bg2); text-align: left; width: 100%;
}
.nop-success-deal-name { font-size: 14px; font-weight: 700; color: var(--nop-ink); margin-bottom: 3px; }
.nop-success-deal-meta { font-size: 11.5px; color: var(--nop-ink5); font-family: "DM Mono",monospace; }
`,H=[{id:"prospect",name:"Prospect"},{id:"qualified",name:"Qualified"},{id:"proposal",name:"Proposal"},{id:"negotiation",name:"Negotiation"},{id:"contract",name:"Contract Sent"},{id:"closed",name:"Closed Won"}],X=[{id:"1",name:"Alex R.",color:"#6366f1"},{id:"2",name:"Sam T.",color:"#0891b2"},{id:"3",name:"Jordan K.",color:"#16a34a"},{id:"4",name:"Morgan L.",color:"#d97706"}],se=["Details","Context","Review"];function K(s){return s.split(" ").map(t=>t[0]).slice(0,2).join("").toUpperCase()}const ne=({onClose:s})=>{var w;const[t,n]=W.useState(0),[x,r]=W.useState(!1),[o,d]=W.useState({name:"",domain:"",stage:"prospect",value:"",heat:"warm",owner:"1",closeDate:"",intent:"",notes:""});W.useEffect(()=>{if(!document.getElementById("nop-styles")){const a=document.createElement("style");a.id="nop-styles",a.textContent=ae,document.head.appendChild(a)}},[]);const p=(a,v)=>d(C=>({...C,[a]:v})),i=()=>t===0?o.name.trim().length>0&&o.value.trim().length>0:t===1?o.intent.trim().length>0:!0,k=()=>{t<2?n(a=>a+1):r(!0)},h=()=>n(a=>Math.max(0,a-1)),y=X.find(a=>a.id===o.owner),m=((w=H.find(a=>a.id===o.stage))==null?void 0:w.name)??"";return x?e.jsxs("div",{className:"nop-shell",children:[e.jsxs("div",{className:"nop-header",children:[e.jsx("div",{className:"nop-header-icon",children:e.jsx("svg",{width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",children:e.jsx("path",{d:"M9 2l1.8 3.6L15 6.3l-3 2.9.7 4.1L9 11.3 5.3 13.3l.7-4.1-3-2.9 4.2-.7L9 2z",fill:"#fff"})})}),e.jsxs("div",{children:[e.jsx("div",{className:"nop-header-title",children:"New Deal"}),e.jsx("div",{className:"nop-header-sub",children:"deal created successfully"})]}),e.jsx("button",{className:"nop-close",onClick:s,children:"×"})]}),e.jsxs("div",{className:"nop-success",children:[e.jsx("div",{className:"nop-success-ring",children:e.jsx("div",{className:"nop-success-check",children:e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",children:e.jsx("path",{d:"M5 10.5l3.5 3.5L15 7",stroke:"#fff",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round"})})})}),e.jsx("div",{className:"nop-success-title",children:"Deal Created! 🎉"}),e.jsxs("div",{className:"nop-success-sub",children:[e.jsx("strong",{children:o.name})," has been added to your pipeline and is now visible on the board."]}),e.jsxs("div",{className:"nop-success-deal",children:[e.jsx("div",{className:"nop-success-deal-name",children:o.name}),e.jsxs("div",{className:"nop-success-deal-meta",children:[o.domain||"—"," · $",Number(o.value||0).toLocaleString()," ARR · ",m]})]}),e.jsxs("div",{style:{display:"flex",gap:8,width:"100%"},children:[e.jsx("button",{className:"nop-btn-sec",style:{flex:1},onClick:s,children:"Close"}),e.jsx("button",{className:"nop-btn-pri",style:{flex:1},onClick:()=>{r(!1),n(0),d({name:"",domain:"",stage:"prospect",value:"",heat:"warm",owner:"1",closeDate:"",intent:"",notes:""})},children:"+ Add Another"})]})]})]}):e.jsxs("div",{className:"nop-shell",children:[e.jsxs("div",{className:"nop-header",children:[e.jsxs("div",{children:[e.jsx("div",{className:"nop-header-title",children:"New Deal"}),e.jsxs("div",{className:"nop-header-sub",children:["add to pipeline · ",H.length," stages"]})]}),e.jsx("button",{className:"nop-close",onClick:s,children:"×"})]}),e.jsx("div",{className:"nop-steps",children:se.map((a,v)=>e.jsxs("div",{className:`nop-step${v===t?" active":""}${v<t?" done":""}`,style:{cursor:v<t?"pointer":"default"},onClick:()=>v<t&&n(v),children:[e.jsx("div",{className:"nop-step-circle",children:v<t?e.jsx("svg",{width:"10",height:"10",viewBox:"0 0 10 10",fill:"none",children:e.jsx("path",{d:"M2 5.2l2.2 2.2L8 3",stroke:"#fff",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})}):v+1}),e.jsx("span",{className:"nop-step-label",children:a})]},v))}),e.jsxs("div",{className:"nop-body",children:[t===0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"nop-section-label",children:"Account"}),e.jsxs("div",{className:"nop-field",style:{animationDelay:"0ms"},children:[e.jsxs("label",{className:"nop-label",children:["Company Name ",e.jsx("span",{className:"nop-required",children:"*"})]}),e.jsx("input",{className:"nop-input",placeholder:"e.g. Acme Corp",value:o.name,onChange:a=>p("name",a.target.value)})]}),e.jsxs("div",{className:"nop-field",style:{animationDelay:"50ms"},children:[e.jsx("label",{className:"nop-label",children:"Domain"}),e.jsx("input",{className:"nop-input",placeholder:"acmecorp.com",value:o.domain,onChange:a=>p("domain",a.target.value)})]}),e.jsxs("div",{className:"nop-grid2",children:[e.jsxs("div",{className:"nop-field",style:{animationDelay:"80ms"},children:[e.jsxs("label",{className:"nop-label",children:["ARR Value ",e.jsx("span",{className:"nop-required",children:"*"})]}),e.jsxs("div",{className:"nop-value-wrap",children:[e.jsx("span",{className:"nop-value-prefix",children:"$"}),e.jsx("input",{className:"nop-input",placeholder:"120,000",value:o.value,onChange:a=>p("value",a.target.value.replace(/[^0-9]/g,""))})]})]}),e.jsxs("div",{className:"nop-field",style:{animationDelay:"100ms"},children:[e.jsx("label",{className:"nop-label",children:"Close Date"}),e.jsx("input",{className:"nop-input",type:"date",value:o.closeDate,onChange:a=>p("closeDate",a.target.value)})]})]}),e.jsx("div",{className:"nop-section-label",style:{marginTop:4},children:"Pipeline"}),e.jsxs("div",{className:"nop-field",style:{animationDelay:"110ms"},children:[e.jsx("label",{className:"nop-label",children:"Stage"}),e.jsx("select",{className:"nop-select",value:o.stage,onChange:a=>p("stage",a.target.value),children:H.map(a=>e.jsx("option",{value:a.id,children:a.name},a.id))})]}),e.jsxs("div",{className:"nop-field",style:{animationDelay:"130ms"},children:[e.jsx("label",{className:"nop-label",children:"Heat Signal"}),e.jsx("div",{className:"nop-heat-row",children:["hot","warm","cool"].map(a=>e.jsxs("button",{className:`nop-heat-opt${o.heat===a?` selected-${a}`:""}`,onClick:()=>p("heat",a),children:[e.jsx("span",{className:`nop-heat-dot ${a}`}),a.charAt(0).toUpperCase()+a.slice(1)]},a))})]})]}),t===1&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"nop-section-label",children:"Intent & Context"}),e.jsxs("div",{className:"nop-field",style:{animationDelay:"0ms"},children:[e.jsxs("label",{className:"nop-label",children:["Deal Intent ",e.jsx("span",{className:"nop-required",children:"*"})]}),e.jsx("input",{className:"nop-input",placeholder:"e.g. Expand from 50 → 200 seats",value:o.intent,onChange:a=>p("intent",a.target.value)})]}),e.jsxs("div",{className:"nop-field",style:{animationDelay:"60ms"},children:[e.jsx("label",{className:"nop-label",children:"Internal Notes"}),e.jsx("textarea",{className:"nop-textarea",placeholder:"Key context, blockers, next steps…",value:o.notes,onChange:a=>p("notes",a.target.value)})]}),e.jsx("div",{className:"nop-section-label",style:{marginTop:4},children:"Owner"}),e.jsxs("div",{className:"nop-field",style:{animationDelay:"80ms"},children:[e.jsx("label",{className:"nop-label",children:"Assign to"}),e.jsx("div",{className:"nop-owner-row",children:X.map(a=>e.jsxs("button",{className:`nop-owner-chip${o.owner===a.id?" selected":""}`,onClick:()=>p("owner",a.id),children:[e.jsx("div",{className:"nop-owner-av",style:{background:a.color},children:K(a.name)}),a.name]},a.id))})]}),e.jsxs("div",{className:"nop-ai-banner",style:{animationDelay:"100ms"},children:[e.jsx("div",{className:"nop-ai-icon",children:e.jsx("svg",{width:"13",height:"13",viewBox:"0 0 13 13",fill:"none",children:e.jsx("path",{d:"M6.5 1.2l1.1 2.2 2.5.37-1.8 1.75.42 2.46L6.5 6.8 4.28 8l.42-2.46L2.9 3.79l2.5-.37L6.5 1.2z",fill:"#fff"})})}),e.jsxs("div",{className:"nop-ai-text",children:[e.jsx("strong",{children:"AI Insight:"})," Based on similar deals in ",e.jsx("strong",{children:m}),", the avg close time is ",e.jsx("strong",{children:"34 days"}),".",o.heat==="hot"?" Hot deals in this stage close 2× faster — prioritize!":o.heat==="cool"?" Consider a re-engagement sequence to warm this up.":" Steady engagement is key — schedule a touch within 7 days."]})]})]}),t===2&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"nop-section-label",children:"Review Deal"}),e.jsxs("div",{className:"nop-summary-card",children:[e.jsxs("div",{className:"nop-summary-head",children:[e.jsx("div",{className:"nop-summary-av",children:K(o.name||"?")}),e.jsxs("div",{children:[e.jsx("div",{className:"nop-summary-name",children:o.name||"—"}),e.jsx("div",{className:"nop-summary-domain",children:o.domain||"—"})]})]}),e.jsx("div",{className:"nop-summary-rows",children:[["ARR",o.value?`$${Number(o.value).toLocaleString()}`:"—"],["Stage",m],["Heat",o.heat.charAt(0).toUpperCase()+o.heat.slice(1)],["Close Date",o.closeDate||"—"],["Intent",o.intent||"—"],["Owner",y.name],["Notes",o.notes||"—"]].map(([a,v])=>e.jsxs("div",{className:"nop-summary-row",children:[e.jsx("span",{className:"nop-summary-key",children:a}),e.jsx("span",{className:"nop-summary-val",style:{flex:1},children:v})]},a))})]}),e.jsxs("div",{className:"nop-ai-banner",children:[e.jsx("div",{className:"nop-ai-icon",children:e.jsx("svg",{width:"13",height:"13",viewBox:"0 0 13 13",fill:"none",children:e.jsx("path",{d:"M6.5 1.2l1.1 2.2 2.5.37-1.8 1.75.42 2.46L6.5 6.8 4.28 8l.42-2.46L2.9 3.79l2.5-.37L6.5 1.2z",fill:"#fff"})})}),e.jsxs("div",{className:"nop-ai-text",children:["Everything looks good! This deal will appear in your ",e.jsx("strong",{children:m})," column with a ",e.jsx("strong",{children:o.heat})," heat signal."]})]})]})]}),e.jsxs("div",{className:"nop-footer",children:[t>0&&e.jsx("button",{className:"nop-btn-sec",onClick:h,children:"← Back"}),e.jsx("button",{className:"nop-btn-pri",onClick:k,disabled:!i(),style:{opacity:i()?1:.45},children:t<2?e.jsxs(e.Fragment,{children:["Continue",e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",children:e.jsx("path",{d:"M3 7h8M7 3l4 4-4 4",stroke:"#fff",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",children:e.jsx("path",{d:"M3 7.2l2.8 2.8L11 4",stroke:"#fff",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})}),"Create Deal"]})})]})]})};function _(){const s=ee();return{accept:"*/*","Content-Type":"application/json",...s?{Authorization:`Bearer ${s}`}:{}}}function oe(s){if(!s)return"—";try{const t=new Date(s),n=Date.now()-t.getTime(),x=Math.floor(n/6e4),r=Math.floor(x/60),o=Math.floor(r/24);return x<60?`${x}m ago`:r<24?`${r}h ago`:o===1?"yesterday":o<30?`${o}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})}catch{return s}}function re(s){if(!s)return 0;try{return Math.floor((Date.now()-new Date(s).getTime())/864e5)}catch{return 0}}function te(s,t){const n=s>0?s:t;return n>=70?"hot":n>=35?"warm":"cool"}function ie(s){if(!s)return"prospect";const t=s.toLowerCase().trim();return{prospect:"prospect",qualification:"qualify",qualify:"qualify",shaping:"shaping",shape:"shaping",development:"development",develop:"development",closing:"closing",close:"closing",active:"active",qualified:"qualified",renewal:"renewal",closed:"closed"}[t]??t}function le(s){var d;const t=(s.totalCycleDays??(s.qualifyDays??0)+(s.shapingDays??0)+(s.developmentDays??0)+(s.closingDays??0))||re(s.stageEnteredAt),n=s.opportunityHealth??0,x=s.panchashaktiScore??0,r=n>0?n:x,o=Array.from({length:14},(p,i)=>Math.max(1,Math.round(r/100*9*(.55+.45*Math.sin(i*.85+r*.1)))));return{id:s.rowKey,name:s.workspaceName,accountId:s.accountId,stage:ie(s.currentPhase??s.stage),phase:s.currentPhase,heat:te(n,x),value:s.dealValue??0,cycle:t,lastTouch:oe(s.lastTouchAt),intent:((d=s.dealType)==null?void 0:d.replace(/([A-Z])/g," $1").trim())??"—",signals:o,status:s.status,dealType:s.dealType??"—",panchashaktiScore:x,health:n}}const de=`
@keyframes slideInRight{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes bdIn{from{opacity:0}to{opacity:1}}
.cv{flex:1;display:flex;flex-direction:column;overflow:hidden;min-height:0;height:100%;background:var(--bg,#ffffff)}
.cv-hdr{padding:14px 24px 12px;background:var(--bg2,#f8fafc);border-bottom:0.5px solid var(--brd,#e2e8f0);display:flex;align-items:center;gap:12px;flex-shrink:0;flex-wrap:wrap;min-width:0}
.cv-hdr-h{font-family:"Sora",sans-serif;font-size:18px;font-weight:600;letter-spacing:-0.02em;color:var(--ink);white-space:nowrap;flex-shrink:0}
.cv-hdr-meta{font-family:"DM Mono",monospace;font-size:11px;color:var(--ink5);padding:2px 8px;border-radius:6px;background:var(--bg3);border:0.5px solid var(--brd);white-space:nowrap;flex-shrink:0}
.cv-toggle{display:flex;align-items:center;background:var(--bg3);border:0.5px solid var(--brd2);border-radius:9px;padding:2px;gap:2px;margin-left:14px;flex-shrink:0}
.cv-toggle-it{height:24px;padding:0 10px;border-radius:7px;font-size:11px;cursor:pointer;display:flex;align-items:center;gap:5px;color:var(--ink4);font-weight:500;border:0;background:transparent;font-family:inherit}
.cv-toggle-it:hover{color:var(--ink)}
.cv-toggle-it.on{background:var(--bg2);color:var(--p);box-shadow:var(--sh-s);font-weight:600}
.cv-tools{margin-left:auto;display:flex;align-items:center;gap:7px;flex-wrap:wrap;flex-shrink:1;min-width:0}
.cv-axisbtn{display:flex;align-items:center;gap:5px;font-size:11px;color:var(--ink4);padding:4px 8px;border:0.5px solid var(--brd2);border-radius:7px;background:var(--bg2);cursor:pointer;font-family:inherit}
.cv-axisbtn:hover{color:var(--p);border-color:var(--brd3)}
/* list-view toolbar */
.cv-list-bar{display:flex;align-items:center;gap:7px;flex-wrap:wrap}
.cv-srch-wrap{position:relative;display:flex;align-items:center}
.cv-srch-wrap .ic{position:absolute;left:9px;display:flex;align-items:center;color:var(--ink5);pointer-events:none}
.cv-srch{height:30px;padding:0 12px 0 30px;border-radius:8px;border:0.5px solid var(--brd2);background:var(--bg3);font-size:12px;color:var(--ink);font-family:inherit;outline:none;width:210px;max-width:100%;min-width:120px;transition:border-color .12s,background .12s}
.cv-srch:focus{border-color:var(--p);background:var(--bg2)}
.cv-srch::placeholder{color:var(--ink5)}

/* Constellation canvas */
.cv-canvas-full{flex:1;min-height:0;position:relative;overflow:hidden;
  background:
    linear-gradient(rgba(75,72,200,0.025) 1px,transparent 1px) 0 0/100% 24px,
    linear-gradient(90deg,rgba(75,72,200,0.025) 1px,transparent 1px) 0 0/60px 100%,
    radial-gradient(circle at 30% 20%,rgba(75,72,200,0.04),transparent 60%),
    radial-gradient(circle at 80% 70%,rgba(29,196,160,0.04),transparent 50%);
  background-color:var(--bg)}
.cv-stage-row{position:absolute;left:0;right:0;height:1px;background:var(--brd)}
.cv-stage-lbl{position:absolute;left:18px;font-size:9.5px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--ink5);background:var(--bg);padding:2px 8px;border-radius:6px;border:0.5px solid var(--brd);font-family:"DM Sans",sans-serif;transform:translateY(-50%);z-index:2}
.cv-stage-rail{position:absolute;left:0;width:4px;border-radius:0 2px 2px 0}
.cv-axis-x{position:absolute;left:0;right:0;bottom:0;height:30px;border-top:0.5px solid var(--brd);background:var(--bg2);display:flex;align-items:center;justify-content:space-between;padding:0 110px;font-family:"DM Mono",monospace;font-size:10px;color:var(--ink5);letter-spacing:0.04em}
.cv-deal{position:absolute;transform:translate(-50%,-50%);cursor:pointer;transition:transform .15s ease-out;animation:fade-up .3s ease-out backwards}
.cv-deal:hover{transform:translate(-50%,-50%) scale(1.06);z-index:5}
.cv-deal.on{z-index:10}
.cv-deal-orb{border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:700;font-family:"Sora",sans-serif;position:relative;overflow:hidden}
.cv-deal-orb::after{content:"";position:absolute;inset:0;border-radius:50%;background:linear-gradient(135deg,rgba(255,255,255,0.30),transparent 60%);pointer-events:none}
.cv-deal-orb.hot{background:radial-gradient(circle at 35% 30%,#FF6F87 0%,#E5566C 50%,#B83045 100%);box-shadow:0 0 0 1.5px rgba(229,86,108,0.30),0 4px 14px rgba(229,86,108,0.30)}
.cv-deal-orb.warm{background:radial-gradient(circle at 35% 30%,#EFA177 0%,#D97757 60%,#A04E2A 100%);box-shadow:0 0 0 1.5px rgba(217,119,87,0.28),0 4px 14px rgba(217,119,87,0.26)}
.cv-deal-orb.cool{background:radial-gradient(circle at 35% 30%,#7B9FE8 0%,#4B6FDB 60%,#2E48A0 100%);box-shadow:0 0 0 1.5px rgba(63,117,220,0.25),0 4px 12px rgba(63,117,220,0.22)}
.cv-deal-label{position:absolute;left:50%;top:calc(100% + 6px);transform:translateX(-50%);font-family:"Sora",sans-serif;font-size:11px;font-weight:600;color:var(--ink2);white-space:nowrap;letter-spacing:-0.01em;pointer-events:none;opacity:0;transition:opacity .12s}
.cv-deal:hover .cv-deal-label,.cv-deal.on .cv-deal-label{opacity:1}
.cv-deal-amt{position:absolute;left:50%;bottom:calc(100% + 6px);transform:translateX(-50%);font-family:"DM Mono",monospace;font-size:10px;color:var(--ink4);white-space:nowrap;pointer-events:none;font-weight:500;opacity:0;transition:opacity .12s}
.cv-deal:hover .cv-deal-amt,.cv-deal.on .cv-deal-amt{opacity:1}
.cv-float-legend{position:absolute;left:14px;bottom:42px;background:var(--bg2);border:0.5px solid var(--brd2);border-radius:12px;padding:10px 13px;box-shadow:var(--sh-m,0 4px 24px rgba(0,0,0,0.12));z-index:20;min-width:220px}
.cv-float-legend-h{font-size:9px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--ink5);margin-bottom:8px}
.cv-leg-row{display:flex;align-items:center;gap:8px;font-size:11px;color:var(--ink2);margin-bottom:5px}
.cv-leg-row:last-child{margin-bottom:0}
.cv-leg-row .o{width:12px;height:12px;border-radius:50%;flex-shrink:0;box-shadow:0 1px 2px rgba(0,0,0,0.08)}
.cv-float-inspector{position:absolute;right:14px;top:14px;bottom:42px;width:288px;background:var(--bg2);border:0.5px solid var(--brd2);border-radius:14px;box-shadow:var(--sh-m,0 4px 24px rgba(0,0,0,0.14));z-index:20;overflow-y:auto;display:flex;flex-direction:column;animation:inspector-in .2s ease-out}
@keyframes inspector-in{from{opacity:0;transform:translateX(12px)}to{opacity:1;transform:translateX(0)}}
.cv-float-inspector-head{padding:13px 14px 12px;border-bottom:0.5px solid var(--brd);display:flex;gap:10px;align-items:center;flex-shrink:0}
.cv-float-inspector-close{margin-left:auto;width:22px;height:22px;display:flex;align-items:center;justify-content:center;border-radius:6px;background:transparent;border:0;cursor:pointer;color:var(--ink5);font-size:14px;line-height:1}
.cv-float-inspector-close:hover{background:var(--bg3);color:var(--ink)}
.cv-card-h{font-family:"Sora",sans-serif;font-size:14px;font-weight:600;letter-spacing:-0.015em;color:var(--ink)}
.cv-kv{display:flex;align-items:center;gap:8px;font-size:11.5px;padding:5px 0;border-bottom:0.5px solid var(--brd)}
.cv-kv:last-child{border-bottom:0}
.cv-kv-l{color:var(--ink5);min-width:80px}
.cv-kv-v{color:var(--ink);font-weight:500}
.cv-hint{position:absolute;left:50%;top:14px;transform:translateX(-50%);background:var(--pu,rgba(99,102,241,0.08));border:0.5px solid var(--brd2);border-radius:10px;padding:8px 14px;font-size:11.5px;color:var(--ink2);display:flex;gap:8px;align-items:center;z-index:15;white-space:nowrap;box-shadow:var(--sh-s)}
.cv-hint-ic{color:var(--p);flex-shrink:0}

/* Kanban */
.kb-wrap{flex:1;display:flex;flex-direction:column;overflow:hidden;background:var(--bg,#f8fafc)}
.kb-scroll{flex:1;overflow-x:auto;overflow-y:hidden;padding:16px 20px 20px}
.kb-cols{display:flex;gap:13px;height:100%;min-width:max-content}
.kb-col{display:flex;flex-direction:column;width:252px;flex-shrink:0;border-radius:14px;background:rgba(255,255,255,0.78);border:1px solid rgba(0,0,0,0.06);overflow:hidden;transition:box-shadow .2s,opacity .2s,border-color .2s;box-shadow:0 1px 4px rgba(15,23,42,0.05)}
.kb-col.can-drop{box-shadow:0 0 0 1.5px rgba(99,102,241,0.35),0 6px 24px rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.20)}
.kb-col.no-drop{opacity:0.38;filter:saturate(0.45)}
.kb-col-head{display:flex;align-items:center;gap:8px;padding:11px 13px 10px;border-bottom:1px solid rgba(0,0,0,0.055);background:rgba(255,255,255,0.88);position:relative}
.kb-col-head::after{content:'';position:absolute;left:0;top:0;right:0;height:2.5px;background:var(--col-accent,#94a3b8);border-radius:0 0 2px 2px;opacity:.88}
.kb-col-dot{width:7px;height:7px;border-radius:50%;background:var(--col-accent,#94a3b8);flex-shrink:0;box-shadow:0 0 0 2.5px var(--col-dot-ring,rgba(148,163,184,0.18))}
.kb-col-title{font-size:10.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#334155;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.kb-col-count{font-size:10px;font-weight:600;color:var(--col-accent,#94a3b8);background:var(--col-badge-bg,rgba(148,163,184,.10));border:1px solid var(--col-badge-brd,rgba(148,163,184,.28));border-radius:20px;padding:1.5px 8px;font-family:"DM Mono",monospace;flex-shrink:0}
.kb-col-sum{font-size:9.5px;font-family:"DM Mono",monospace;color:var(--ink5);flex-shrink:0;margin-left:2px}
.kb-cards{flex:1;padding:9px 8px 11px;display:flex;flex-direction:column;gap:7px;overflow-y:auto;min-height:420px;transition:background .2s;position:relative}
.kb-cards.drop-active{background:rgba(99,102,241,0.045);border-radius:0 0 12px 12px}
.kb-drop-indicator{display:none;align-items:center;justify-content:center;border:1.5px dashed rgba(99,102,241,.42);border-radius:9px;height:50px;color:rgba(99,102,241,.7);font-size:10.5px;font-weight:500;gap:5px;animation:pulse-drop 1.4s ease-in-out infinite;background:rgba(99,102,241,.025);flex-shrink:0}
.kb-cards.drop-active .kb-drop-indicator{display:flex}
@keyframes pulse-drop{0%,100%{opacity:.5;border-color:rgba(99,102,241,.28)}50%{opacity:1;border-color:rgba(99,102,241,.65)}}
.kb-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:6px 8px;opacity:.3;user-select:none}
.kb-empty-icon{width:26px;height:26px;border:1.5px dashed #cbd5e1;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#94a3b8}
.kb-empty-txt{font-size:10.5px;color:#94a3b8;font-family:"DM Mono",monospace;letter-spacing:.02em}
.kb-card{background:#fff;border:1px solid rgba(15,23,42,0.07);border-radius:10px;padding:11px 12px 10px;cursor:pointer;user-select:none;transition:box-shadow .15s,transform .15s,border-color .15s,opacity .15s;position:relative;box-shadow:0 1px 3px rgba(15,23,42,0.07);animation:card-in .22s ease both}
@keyframes card-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
.kb-card:hover{box-shadow:0 8px 24px rgba(15,23,42,0.10);transform:translateY(-2px);border-color:rgba(15,23,42,0.11)}
.kb-card.on{border-color:rgba(99,102,241,.36);box-shadow:0 0 0 2px rgba(99,102,241,.22),0 4px 16px rgba(99,102,241,.12);background:rgba(99,102,241,.013)}
.kb-card.on::before{content:'';position:absolute;left:-1px;top:50%;transform:translateY(-50%);width:3px;height:32px;background:#6366f1;border-radius:0 3px 3px 0;opacity:.8}
.kb-card.dragging{opacity:.25;transform:scale(0.95) rotate(-.5deg);box-shadow:none}
.kb-drag-handle{position:absolute;top:9px;right:9px;display:flex;flex-direction:column;gap:2.5px;opacity:0;transition:opacity .15s;cursor:grab;padding:2px}
.kb-drag-handle span{display:block;width:12px;height:1.5px;background:#cbd5e1;border-radius:99px}
.kb-card:hover .kb-drag-handle{opacity:1}
.kb-card-name{font-size:12.5px;font-weight:600;color:#0f172a;margin-bottom:3px;padding-right:18px;line-height:1.35;letter-spacing:-.01em}
.kb-card-intent{font-size:11px;color:#94a3b8;line-height:1.5;margin-bottom:9px}
.kb-card-foot{display:flex;align-items:center;gap:7px}
.kb-card-arr{font-size:12px;font-weight:600;font-family:"DM Mono",monospace;color:#475569}
.kb-card-spark{margin-left:auto}
.kb-card-heat{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.kb-card-heat.hot{background:#E5566C;box-shadow:0 0 0 2px rgba(229,86,108,.2)}
.kb-card-heat.warm{background:#D97757;box-shadow:0 0 0 2px rgba(217,119,87,.2)}
.kb-card-heat.cool{background:#4B6FDB;box-shadow:0 0 0 2px rgba(75,111,219,.2)}

/* Stage chips */
.stage-chip{display:inline-flex;align-items:center;padding:3px 9px;border-radius:6px;font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;line-height:1.4;white-space:nowrap}
.stage-chip.prospect{background:#fef9e0;color:#9a7c0a;border:0.5px solid #e8d87a}
.stage-chip.qualify{background:#fef9e0;color:#9a7c0a;border:0.5px solid #e8d87a}
.stage-chip.qualified{background:#ddeeff;color:#1a5fa8;border:0.5px solid #90c4f5}
.stage-chip.shaping{background:#ddeeff;color:#1a5fa8;border:0.5px solid #90c4f5}
.stage-chip.development{background:#ede8fe;color:#6b3ec7;border:0.5px solid #c4aafc}
.stage-chip.closing{background:#d6f5e8;color:#1a7a4a;border:0.5px solid #7adbb0}
.stage-chip.active{background:#d6f5e8;color:#1a7a4a;border:0.5px solid #7adbb0}
.stage-chip.renewal{background:#e8f4fd;color:#1565c0;border:0.5px solid #90caf9}
.stage-chip.closed{background:#f0f0f0;color:#666;border:0.5px solid #ccc}

/* Heat */
.heat-bub{display:inline-flex;align-items:center;gap:5px;padding:3px 10px 3px 8px;border-radius:999px;font-size:11.5px;font-weight:600;line-height:1;white-space:nowrap}
.heat-bub.heat-hot{background:#fde8e8;color:#c0392b}
.heat-bub.heat-warm{background:#fef0e0;color:#b7621a}
.heat-bub.heat-cool{background:#e8f0fe;color:#3b5bdb}
.heat-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;display:inline-block}
.heat-dot.hot{background:#e74c3c}
.heat-dot.warm{background:#e67e22}
.heat-dot.cool{background:#4c6ef5}

/* Skeleton */
.cv-sk{border-radius:5px;background:var(--bg3);animation:cv-sk-pulse 1.4s ease-in-out infinite}
@keyframes cv-sk-pulse{0%,100%{opacity:.45}50%{opacity:.9}}

/* Scrollbar */
.kb-scroll::-webkit-scrollbar,.kb-cards::-webkit-scrollbar{width:4px;height:4px}
.kb-scroll::-webkit-scrollbar-thumb,.kb-cards::-webkit-scrollbar-thumb{background:rgba(0,0,0,.10);border-radius:99px}
.kb-scroll::-webkit-scrollbar-track,.kb-cards::-webkit-scrollbar-track{background:transparent}
@keyframes fade-up{from{opacity:0;transform:translate(-50%,-46%)}to{opacity:1;transform:translate(-50%,-50%)}}

/* smm styles are injected by StageMoveModal itself via a portal <style> tag */
`,ce=()=>e.jsx("div",{className:"kb-wrap",children:e.jsx("div",{className:"kb-scroll",children:e.jsx("div",{className:"kb-cols",children:[0,1,2,3].map(s=>e.jsxs("div",{className:"kb-col",style:{opacity:.6},children:[e.jsxs("div",{className:"kb-col-head",children:[e.jsx("span",{className:"cv-sk",style:{width:7,height:7,borderRadius:"50%"}}),e.jsx("span",{className:"cv-sk",style:{width:80,height:10,flex:1}}),e.jsx("span",{className:"cv-sk",style:{width:24,height:16,borderRadius:20}})]}),e.jsx("div",{className:"kb-cards",children:[0,1,2].map(t=>e.jsxs("div",{className:"kb-card",style:{cursor:"default"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7,marginBottom:8},children:[e.jsx("span",{className:"cv-sk",style:{width:22,height:22,borderRadius:6,flexShrink:0}}),e.jsx("span",{className:"cv-sk",style:{flex:1,height:11}})]}),e.jsx("span",{className:"cv-sk",style:{width:"70%",height:9,display:"block",marginBottom:10}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7},children:[e.jsx("span",{className:"cv-sk",style:{width:52,height:11}}),e.jsx("span",{className:"cv-sk",style:{marginLeft:"auto",width:50,height:14}})]})]},t))})]},s))})})}),pe=`
.smm-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;}
.smm-backdrop{position:absolute;inset:0;background:rgba(10,12,20,0.52);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);animation:bdIn 0.15s ease;}
.smm-card{position:relative;z-index:1;width:100%;max-width:448px;background:var(--bg2,#ffffff);border:1px solid var(--brd,#e5e8ef);border-radius:14px;box-shadow:0 0 0 1px rgba(0,0,0,0.04),0 8px 24px -4px rgba(0,0,0,0.12),0 32px 64px -8px rgba(0,0,0,0.10);overflow:hidden;animation:smm-slide-up 0.2s cubic-bezier(0.22,1,0.36,1);}
.smm-header{padding:22px 24px 0;}
.smm-eyebrow{font-size:10.5px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--p,#6366f1);margin-bottom:4px;}
.smm-title{margin:0;font-size:17px;font-weight:700;color:var(--ink,#0f1117);letter-spacing:-0.02em;line-height:1.3;}
.smm-meta{padding:14px 24px 0;display:flex;flex-direction:column;gap:10px;}
.smm-opp-name{font-size:13.5px;font-weight:600;color:var(--ink,#0f1117);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.smm-stage-row{display:flex;align-items:center;gap:8px;}
.smm-chip{display:inline-flex;align-items:center;padding:3px 10px 3px 8px;border-radius:6px;font-size:11.5px;font-weight:600;letter-spacing:0.01em;border:1px solid transparent;}
.smm-chip--from{opacity:0.72;}
.smm-chip--prospect,.smm-chip--qualify{background:#fef9e0;color:#9a7c0a;border-color:#e8d87a;}
.smm-chip--qualified,.smm-chip--shaping{background:#ddeeff;color:#1a5fa8;border-color:#90c4f5;}
.smm-chip--development{background:#ede8fe;color:#6b3ec7;border-color:#c4aafc;}
.smm-chip--closing,.smm-chip--active{background:#d6f5e8;color:#1a7a4a;border-color:#7adbb0;}
.smm-chip--renewal{background:#e8f4fd;color:#1565c0;border-color:#90caf9;}
.smm-chip--closed{background:#f0f0f0;color:#666;border-color:#ccc;}
.smm-arrow-track{color:var(--ink5,#9399a8);display:flex;align-items:center;flex-shrink:0;}
.smm-divider{height:1px;background:var(--brd,#e5e8ef);margin:18px 0 0;}
.smm-field{padding:18px 24px 0;display:flex;flex-direction:column;gap:6px;}
.smm-label{display:flex;align-items:baseline;gap:6px;font-size:12px;font-weight:600;color:var(--ink,#0f1117);letter-spacing:0.01em;}
.smm-label-hint{font-size:11px;font-weight:400;color:var(--ink5,#9399a8);}
.smm-textarea{width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid var(--brd,#e5e8ef);border-radius:8px;background:var(--bg3,#f8f9fb);font-size:13px;line-height:1.55;color:var(--ink,#0f1117);resize:vertical;min-height:96px;transition:border-color .15s,box-shadow .15s;font-family:inherit;outline:none;}
.smm-textarea::placeholder{color:var(--ink5,#b2b8c8);}
.smm-textarea:focus{border-color:var(--p,#6366f1);box-shadow:0 0 0 3px rgba(99,102,241,0.12);background:var(--bg2,#ffffff);}
.smm-textarea:disabled{opacity:0.5;cursor:not-allowed;}
.smm-char-count{font-size:11px;color:var(--ink5,#9399a8);text-align:right;margin-top:-2px;}
.smm-footer{padding:16px 24px 22px;display:flex;flex-direction:column;gap:12px;}
.smm-actions{display:flex;justify-content:flex-end;gap:8px;}
.smm-error{display:flex;align-items:center;gap:6px;font-size:12px;color:#be123c;background:#fff1f2;border:1px solid #fecdd3;border-radius:6px;padding:7px 11px;}
.smm-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:36px;padding:0 16px;border-radius:8px;font-size:13px;font-weight:600;letter-spacing:-0.01em;cursor:pointer;transition:background .13s,box-shadow .13s,opacity .13s,transform .1s;border:none;outline:none;font-family:inherit;}
.smm-btn:disabled{opacity:0.48;cursor:not-allowed;pointer-events:none;}
.smm-btn--ghost{background:transparent;color:var(--ink4,#6b7280);border:1px solid var(--brd,#e5e8ef);min-width:80px;}
.smm-btn--ghost:hover:not(:disabled){background:var(--bg3,#f3f4f6);border-color:#d1d5db;}
.smm-btn--primary{background:var(--p,#6366f1);color:#ffffff;min-width:130px;box-shadow:0 1px 2px rgba(99,102,241,0.18),0 4px 12px rgba(99,102,241,0.22);}
.smm-btn--primary:hover:not(:disabled){filter:brightness(0.92);box-shadow:0 1px 2px rgba(99,102,241,0.24),0 6px 16px rgba(99,102,241,0.28);}
.smm-btn--primary:active:not(:disabled){transform:translateY(1px);}
.smm-spinner{animation:smm-spin 0.7s linear infinite;}
@keyframes smm-slide-up{from{opacity:0;transform:translateY(12px) scale(0.98);}to{opacity:1;transform:translateY(0) scale(1);}}
@keyframes smm-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@media(prefers-reduced-motion:reduce){.smm-backdrop,.smm-card{animation:none;}}
`,xe=({opportunity:s,fromStage:t,toStage:n,onConfirm:x,onCancel:r,loading:o,error:d})=>{var m,w;const[p,i]=f.useState(""),k=((m=z.find(a=>a.id===t))==null?void 0:m.name)??t,h=((w=z.find(a=>a.id===n))==null?void 0:w.name)??n,y=a=>{a.key==="Escape"&&!o&&r()};return Z.createPortal(e.jsxs(e.Fragment,{children:[e.jsx("style",{children:pe}),e.jsxs("div",{className:"smm-overlay",onKeyDown:y,tabIndex:-1,children:[e.jsx("div",{className:"smm-backdrop",onClick:o?void 0:r}),e.jsxs("div",{className:"smm-card",role:"dialog","aria-modal":"true","aria-labelledby":"smm-title",children:[e.jsxs("div",{className:"smm-header",children:[e.jsx("div",{className:"smm-eyebrow",children:"Stage transition"}),e.jsx("h2",{className:"smm-title",id:"smm-title",children:"Move opportunity"})]}),e.jsxs("div",{className:"smm-meta",children:[e.jsx("span",{className:"smm-opp-name",children:s.name}),e.jsxs("div",{className:"smm-stage-row",children:[e.jsx("span",{className:`smm-chip smm-chip--from smm-chip--${t}`,children:k}),e.jsx("span",{className:"smm-arrow-track",children:e.jsx("svg",{width:"28",height:"10",viewBox:"0 0 28 10",fill:"none","aria-hidden":"true",children:e.jsx("path",{d:"M1 5h22M19 1l4 4-4 4",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx("span",{className:`smm-chip smm-chip--to smm-chip--${n}`,children:h})]})]}),e.jsx("div",{className:"smm-divider"}),e.jsxs("div",{className:"smm-field",children:[e.jsx("label",{className:"smm-label",htmlFor:"smm-notes",children:"Notes"}),e.jsx("textarea",{id:"smm-notes",className:"smm-textarea",value:p,onChange:a=>i(a.target.value),placeholder:`Why is ${s.name} moving to ${h}? Add context, next steps, or conditions…`,disabled:o,autoFocus:!0,rows:4,maxLength:500}),e.jsxs("div",{className:"smm-char-count",children:[p.length," / 500"]})]}),e.jsxs("div",{className:"smm-footer",children:[d&&e.jsxs("div",{className:"smm-error",role:"alert",children:[e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 12 12",fill:"none","aria-hidden":"true",children:[e.jsx("circle",{cx:"6",cy:"6",r:"5.5",stroke:"currentColor"}),e.jsx("path",{d:"M6 3.5v3M6 8v.5",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round"})]}),d]}),e.jsxs("div",{className:"smm-actions",children:[e.jsx("button",{className:"smm-btn smm-btn--ghost",onClick:r,disabled:o,children:"Cancel"}),e.jsx("button",{className:"smm-btn smm-btn--primary",onClick:()=>x(p),disabled:o,children:o?e.jsxs(e.Fragment,{children:[e.jsx("svg",{className:"smm-spinner",width:"13",height:"13",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:e.jsx("circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"3",strokeDasharray:"31.4",strokeDashoffset:"10",strokeLinecap:"round"})}),"Moving…"]}):e.jsxs(e.Fragment,{children:["Confirm move",e.jsx("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":"true",children:e.jsx("path",{d:"M3 8h10M9 4l4 4-4 4",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})]})})]})]})]})]})]}),document.body)},me=({opportunities:s,onSelect:t})=>{const n=[{dot:"#9CA3AF",badge:"rgba(156,163,175,0.12)",brd:"rgba(156,163,175,0.35)"},{dot:"#0369A1",badge:"rgba(37,99,235,0.12)",brd:"rgba(37,99,235,0.35)"},{dot:"#4F46E5",badge:"rgba(79,70,229,0.12)",brd:"rgba(79,70,229,0.35)"},{dot:"#D97706",badge:"rgba(217,119,6,0.12)",brd:"rgba(217,119,6,0.35)"},{dot:"#0891B2",badge:"rgba(8,145,178,0.12)",brd:"rgba(8,145,178,0.35)"},{dot:"#16A34A",badge:"rgba(22,163,74,0.12)",brd:"rgba(22,163,74,0.35)"}],x=()=>z.map(c=>({stageId:c.id,title:c.name,color:c.color,items:s.filter(b=>b.stage===c.id)})),[r,o]=f.useState(x),[d,p]=f.useState(null),[i,k]=f.useState(null),[h,y]=f.useState(null),[m,w]=f.useState(null),[a,v]=f.useState(!1),[C,l]=f.useState(null);f.useEffect(()=>{o(x())},[s]);const j=(c,b,N)=>{k({colIdx:b,cardIdx:N}),c.dataTransfer.effectAllowed="move",c.dataTransfer.setData("text/plain",JSON.stringify({ci:b,ki:N})),setTimeout(()=>c.target.classList.add("dragging"),0)},E=c=>{c.target.classList.remove("dragging"),k(null),y(null)},F=(c,b)=>{i&&b>i.colIdx?(c.preventDefault(),c.dataTransfer.dropEffect="move",y(b)):(c.dataTransfer.dropEffect="none",y(null))},$=c=>{c.currentTarget.contains(c.relatedTarget)||y(null)},O=(c,b)=>{c.preventDefault(),y(null),k(null);const{ci:N,ki:D}=JSON.parse(c.dataTransfer.getData("text/plain"));if(b<=N)return;const M=r[N].items[D];l(null),w({srcCi:N,ki:D,targetCi:b,opp:M,fromStage:r[N].stageId,toStage:r[b].stageId})},G=async c=>{var g;if(!m)return;const{srcCi:b,ki:N,targetCi:D,opp:M,toStage:B}=m,A=((g=z.find(S=>S.id===B))==null?void 0:g.name)??B;v(!0),l(null);try{const S=await U(`${J()}/opportunities/${M.id}/move`,{method:"PATCH",headers:{..._(),"Content-Type":"application/json"},body:JSON.stringify({newPhase:A,notes:c})});if(!S.ok){const T=await S.text().catch(()=>"");throw new Error(T||`HTTP ${S.status}`)}const I=r.map(T=>({...T,items:[...T.items]})),[P]=I[b].items.splice(N,1);P.stage=B,P.phase=A,I[D].items.push(P),o(I),w(null)}catch(S){l((S==null?void 0:S.message)??"Move failed. Please try again.")}finally{v(!1)}},Y=i!==null;return e.jsxs(e.Fragment,{children:[m&&e.jsx(xe,{opportunity:m.opp,fromStage:m.fromStage,toStage:m.toStage,onConfirm:G,onCancel:()=>{w(null),l(null)},loading:a,error:C}),e.jsx("div",{className:"kb-wrap",children:e.jsx("div",{className:"kb-scroll",children:e.jsx("div",{className:"kb-cols",children:r.map((c,b)=>{const N=n[b%n.length],D=h===b,M=Y&&b>i.colIdx,B=Y&&b<=i.colIdx,A=c.items.reduce((g,S)=>g+S.value,0);return e.jsxs("div",{className:`kb-col${M?" can-drop":""}${B?" no-drop":""}`,style:{"--col-accent":N.dot,"--col-badge-bg":N.badge,"--col-badge-brd":N.brd,"--col-dot-ring":N.badge},children:[e.jsxs("div",{className:"kb-col-head",children:[e.jsx("div",{className:"kb-col-dot"}),e.jsx("div",{className:"kb-col-title",children:c.title}),e.jsx("div",{className:"kb-col-count",children:c.items.length}),e.jsx("div",{className:"kb-col-sum",children:A>0?L(A):""})]}),e.jsxs("div",{className:`kb-cards${D&&M?" drop-active":""}`,onDrop:g=>O(g,b),onDragOver:g=>F(g,b),onDragLeave:$,children:[e.jsxs("div",{className:"kb-drop-indicator",children:[e.jsx("svg",{width:"11",height:"11",viewBox:"0 0 12 12",fill:"none",children:e.jsx("path",{d:"M6 1v10M1 6h10",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})}),"Drop here"]}),c.items.length===0&&!D&&e.jsxs("div",{className:"kb-empty",children:[e.jsx("div",{className:"kb-empty-icon",children:e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:e.jsx("path",{d:"M6 2v8M2 6h8",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})}),e.jsx("span",{className:"kb-empty-txt",children:"empty"})]}),c.items.map((g,S)=>e.jsxs("div",{draggable:!0,onDragStart:I=>j(I,b,S),onDragEnd:E,className:`kb-card${d===g.id?" on":""}`,onClick:()=>{p(d===g.id?null:g.id),t(g.id)},children:[e.jsxs("div",{className:"kb-drag-handle","aria-hidden":"true",children:[e.jsx("span",{}),e.jsx("span",{}),e.jsx("span",{})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7,marginBottom:4},children:[e.jsx("span",{className:"av "+q(g.name),style:{width:22,height:22,borderRadius:6,fontSize:9,flexShrink:0},children:R(g.name)}),e.jsx("div",{className:"kb-card-name",style:{marginBottom:0,paddingRight:0},children:g.name}),e.jsx("div",{className:`kb-card-heat ${g.heat}`,style:{marginLeft:"auto",flexShrink:0}})]}),e.jsx("div",{className:"kb-card-intent",children:g.intent}),e.jsxs("div",{className:"kb-card-foot",children:[e.jsx("span",{className:"kb-card-arr",children:g.value>0?L(g.value):e.jsx("span",{style:{color:"var(--ink5)"},children:"—"})}),e.jsx("span",{className:"kb-card-spark",children:e.jsx(V,{data:g.signals.slice(-7),width:50,height:14,color:"var(--p)"})})]})]},g.id))]})]},c.stageId)})})})})]})},he=({opportunities:s,onSelect:t})=>{var p;const[n,x]=f.useState(null),r=n?s.find(i=>i.id===n):null,o=i=>{const k=z.findIndex(w=>w.id===i.stage),y=10+(k>=0?k:0)/Math.max(z.length-1,1)*78;return{x:8+Math.min(i.cycle/70*84,84),y}},d=i=>22+Math.min(34,i.value/51e4*34);return e.jsxs("div",{className:"cv-canvas-full",children:[z.map((i,k)=>{const h=10+k/(z.length-1)*78;return e.jsxs(f.Fragment,{children:[e.jsx("div",{className:"cv-stage-row",style:{top:h+"%"}}),e.jsx("div",{className:"cv-stage-lbl",style:{top:h+"%"},children:i.name}),e.jsx("div",{className:"cv-stage-rail",style:{top:`calc(${h}% - 10px)`,height:"20px",background:i.color,opacity:.45}})]},i.id)}),s.map((i,k)=>{const{x:h,y}=o(i),m=d(i);return e.jsxs("div",{className:"cv-deal"+(n===i.id?" on":""),style:{left:h+"%",top:y+"%",animationDelay:k*30+"ms"},onClick:()=>{x(n===i.id?null:i.id),t(i.id)},children:[e.jsx("div",{className:"cv-deal-orb "+i.heat,style:{width:m,height:m,fontSize:Math.max(8,m*.28)},children:R(i.name)}),e.jsx("div",{className:"cv-deal-amt",children:i.value>0?L(i.value):""}),e.jsx("div",{className:"cv-deal-label",children:i.name})]},i.id)}),e.jsxs("div",{className:"cv-axis-x",children:[e.jsx("span",{children:"0d in stage"}),e.jsx("span",{children:"30d"}),e.jsx("span",{children:"60d"}),e.jsx("span",{children:"90d+ (stale)"})]}),!n&&e.jsxs("div",{className:"cv-hint",children:[e.jsx("span",{className:"cv-hint-ic",children:e.jsx(u,{name:"info",size:13})}),"Vertical = stage · Horizontal = time-in-stage · Size = deal value · Color = heat — tap an orb to inspect"]}),e.jsxs("div",{className:"cv-float-legend",children:[e.jsx("div",{className:"cv-float-legend-h",children:"Heat"}),e.jsxs("div",{className:"cv-leg-row",children:[e.jsx("span",{className:"o",style:{background:"radial-gradient(circle at 35% 30%,#FF6F87,#E5566C 60%,#B83045)"}}),"Hot — active intent & momentum"]}),e.jsxs("div",{className:"cv-leg-row",children:[e.jsx("span",{className:"o",style:{background:"radial-gradient(circle at 35% 30%,#EFA177,#D97757 60%,#A04E2A)"}}),"Warm — engaged, steady"]}),e.jsxs("div",{className:"cv-leg-row",children:[e.jsx("span",{className:"o",style:{background:"radial-gradient(circle at 35% 30%,#7B9FE8,#4B6FDB 60%,#2E48A0)"}}),"Cool — quiet, may drift"]})]}),r&&e.jsxs("div",{className:"cv-float-inspector",children:[e.jsxs("div",{className:"cv-float-inspector-head",children:[e.jsx("span",{className:"av "+q(r.name),style:{width:30,height:30,borderRadius:8,fontSize:11},children:R(r.name)}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{className:"cv-card-h",children:r.name}),e.jsx("div",{className:"mono",style:{fontSize:11,color:"var(--ink4)"},children:r.phase})]}),e.jsx("button",{className:"cv-float-inspector-close",onClick:()=>x(null),children:"×"})]}),e.jsxs("div",{style:{padding:"12px 14px",flex:1},children:[e.jsxs("div",{className:"cv-kv",children:[e.jsx("span",{className:"cv-kv-l",children:"Stage"}),e.jsx("span",{className:"cv-kv-v",children:e.jsx("span",{className:"stage-chip "+r.stage,children:((p=z.find(i=>i.id===r.stage))==null?void 0:p.name)??r.phase})})]}),e.jsxs("div",{className:"cv-kv",children:[e.jsx("span",{className:"cv-kv-l",children:"Deal value"}),e.jsx("span",{className:"cv-kv-v num",children:r.value>0?L(r.value):"—"})]}),e.jsxs("div",{className:"cv-kv",children:[e.jsx("span",{className:"cv-kv-l",children:"Days in stage"}),e.jsx("span",{className:"cv-kv-v",children:r.cycle>0?`${r.cycle}d`:"—"})]}),e.jsxs("div",{className:"cv-kv",children:[e.jsx("span",{className:"cv-kv-l",children:"Heat"}),e.jsx("span",{className:"cv-kv-v",children:e.jsxs("span",{className:"heat-bub heat-"+r.heat,children:[e.jsx("span",{className:"heat-dot "+r.heat}),r.heat==="hot"?"Hot":r.heat==="warm"?"Warm":"Cool"]})})]}),e.jsxs("div",{className:"cv-kv",children:[e.jsx("span",{className:"cv-kv-l",children:"Last touch"}),e.jsx("span",{className:"cv-kv-v",children:r.lastTouch})]}),e.jsxs("div",{className:"cv-kv",children:[e.jsx("span",{className:"cv-kv-l",children:"Deal type"}),e.jsx("span",{className:"cv-kv-v",children:r.intent})]}),e.jsxs("div",{className:"cv-kv",children:[e.jsx("span",{className:"cv-kv-l",children:"Health"}),e.jsx("span",{className:"cv-kv-v",children:r.health})]}),e.jsxs("div",{className:"cv-kv",children:[e.jsx("span",{className:"cv-kv-l",children:"Signals 14d"}),e.jsx("span",{className:"cv-kv-v",children:e.jsx(V,{data:r.signals,width:120,height:18,color:"var(--p)"})})]})]}),e.jsxs("div",{style:{padding:12,borderTop:"0.5px solid var(--brd)",display:"flex",gap:5,flexWrap:"wrap",flexShrink:0},children:[e.jsxs("button",{className:"btn sm pri",children:[e.jsx(u,{name:"mail",size:12})," Email"]}),e.jsxs("button",{className:"btn sm",children:[e.jsx(u,{name:"calendar",size:12})," Meeting"]}),e.jsxs("button",{className:"btn sm",children:[e.jsx(u,{name:"sparkles",size:12})," Plan next step"]})]})]})]})},ge=({opportunities:s,onSelect:t})=>e.jsx("div",{className:"blv",style:{flex:1,overflowY:"auto",minHeight:0},children:e.jsx("div",{className:"card",style:{overflow:"hidden",margin:16},children:e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:12.5},children:[e.jsx("thead",{children:e.jsx("tr",{children:["Opportunity","Phase","Deal value","Heat","Days in Stage","Deal type"].map(n=>e.jsx("th",{style:{textAlign:"left",padding:"9px 14px",color:"var(--ink5)",fontSize:10,textTransform:"uppercase",letterSpacing:".07em",borderBottom:"0.5px solid var(--brd)"},children:n},n))})}),e.jsxs("tbody",{children:[s.map(n=>{var x;return e.jsxs("tr",{style:{cursor:"pointer"},onClick:()=>t(n.id),children:[e.jsx("td",{style:{padding:"12px 14px",borderBottom:"0.5px solid var(--brd)"},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("div",{className:"av "+q(n.name),style:{width:34,height:34,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700},children:R(n.name)}),e.jsxs("div",{children:[e.jsx("div",{className:"fz13 fw6 t-ink",children:n.name}),e.jsx("div",{className:"fz11 t-ink5",children:n.intent})]})]})}),e.jsx("td",{style:{padding:"12px 14px",borderBottom:"0.5px solid var(--brd)"},children:e.jsx("span",{className:"stage-chip "+n.stage,children:((x=z.find(r=>r.id===n.stage))==null?void 0:x.name)??n.phase})}),e.jsx("td",{className:"mono",style:{padding:"12px 14px",borderBottom:"0.5px solid var(--brd)"},children:n.value>0?L(n.value):"—"}),e.jsx("td",{style:{padding:"12px 14px",borderBottom:"0.5px solid var(--brd)"},children:e.jsxs("span",{className:"heat-bub heat-"+n.heat,children:[e.jsx("span",{className:"heat-dot "+n.heat}),n.heat==="hot"?"Hot":n.heat==="warm"?"Warm":"Cool"]})}),e.jsx("td",{style:{padding:"12px 14px",borderBottom:"0.5px solid var(--brd)"},children:n.cycle>0?`${n.cycle}d`:"—"}),e.jsx("td",{style:{padding:"12px 14px",borderBottom:"0.5px solid var(--brd)",color:"var(--ink4)"},children:n.intent})]},n.id)}),s.length===0&&e.jsx("tr",{children:e.jsx("td",{colSpan:6,style:{padding:"40px 14px",textAlign:"center",color:"var(--ink5)",fontSize:13},children:"No opportunities found."})})]})]})})})}),we=()=>{const[s,t]=f.useState("list"),[n,x]=f.useState(!1),[r,o]=f.useState(null),[d,p]=f.useState(null),[i,k]=f.useState(540),[h,y]=f.useState([]),[m,w]=f.useState(!0),[a,v]=f.useState(null);f.useEffect(()=>{let l=document.getElementById("cv-styles");l||(l=document.createElement("style"),l.id="cv-styles",document.head.appendChild(l)),l.textContent=de},[]),f.useEffect(()=>{w(!0),v(null),U(`${J()}/opportunities`,{headers:_()}).then(l=>{if(!l.ok)throw new Error(`${l.status}`);return l.json()}).then(l=>{const j=(Array.isArray(l)?l:[l]).filter(E=>!E.isDeleted).map(le);y(j)}).catch(l=>v(l.message)).finally(()=>w(!1))},[]);const C=h.reduce((l,j)=>l+j.value,0);return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"cv",children:[e.jsxs("div",{className:"cv-hdr",children:[e.jsx("div",{className:"cv-hdr-h",children:"Opportunity"}),e.jsx("div",{className:"cv-hdr-meta",children:m?"Loading…":a?"Error loading":`${h.length} active${C>0?` · ${L(C)}`:""}`}),!m&&(a?e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:4,fontFamily:'"DM Mono",monospace',fontSize:9,color:"var(--ink5)",background:"var(--bg3)",border:"0.5px solid var(--brd)",borderRadius:5,padding:"2px 7px"},title:a,children:[e.jsx(u,{name:"wifi-off",size:9})," offline"]}):e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:4,fontFamily:'"DM Mono",monospace',fontSize:9,color:"#1A9E7C",background:"rgba(29,196,160,0.07)",border:"0.5px solid #1A9E7C",borderRadius:5,padding:"2px 7px"},children:[e.jsx("span",{style:{width:5,height:5,borderRadius:"50%",background:"#1A9E7C",animation:"api-pulse 1.8s ease-in-out infinite",display:"inline-block"}})," ","live"]})),e.jsxs("div",{className:"cv-toggle",children:[e.jsxs("button",{className:"cv-toggle-it"+(s==="kanban"?" on":""),onClick:()=>t("kanban"),children:[e.jsx(u,{name:"columns-3",size:12})," Board"]}),e.jsxs("button",{className:"cv-toggle-it"+(s==="list"?" on":""),onClick:()=>t("list"),children:[e.jsx(u,{name:"list",size:12})," List"]}),e.jsxs("button",{className:"cv-toggle-it"+(s==="constellation"?" on":""),onClick:()=>t("constellation"),children:[e.jsx(u,{name:"orbit",size:12})," Constellation"]})]}),e.jsxs("div",{className:"cv-tools",children:[e.jsxs("button",{className:"cv-axisbtn",children:[e.jsx(u,{name:"circle",size:11})," Size: Value"]}),e.jsxs("button",{className:"cv-axisbtn",children:[e.jsx(u,{name:"palette",size:11})," Color: Heat"]}),e.jsxs("button",{className:"cv-axisbtn",children:[e.jsx(u,{name:"filter",size:11})," All owners"]}),e.jsxs("button",{className:"btn sm pri",onClick:()=>x(!0),children:[e.jsx(u,{name:"plus",size:12})," New deal"]})]})]}),m?e.jsx(ce,{}):a?e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,color:"var(--ink4)",fontSize:13},children:[e.jsx(u,{name:"wifi-off",size:32}),e.jsx("div",{style:{fontWeight:600,color:"var(--ink3)",fontSize:14},children:"Could not load opportunities"}),e.jsx("div",{style:{fontSize:12,color:"var(--ink5)",maxWidth:280,textAlign:"center"},children:a}),e.jsxs("button",{className:"btn sm",onClick:()=>window.location.reload(),children:[e.jsx(u,{name:"refresh-cw",size:12})," Retry"]})]}):e.jsxs(e.Fragment,{children:[s==="constellation"&&e.jsx(he,{opportunities:h,onSelect:l=>p(h.find(j=>j.id===l)||null)}),s==="kanban"&&e.jsx(me,{opportunities:h,onSelect:l=>p(h.find(j=>j.id===l)||null)}),s==="list"&&e.jsx(ge,{opportunities:h,onSelect:l=>p(h.find(j=>j.id===l)||null)})]}),n&&e.jsx("div",{style:{position:"fixed",top:0,right:0,width:"480px",height:"100vh",background:"var(--bg)",boxShadow:"-8px 0 30px rgba(0,0,0,0.12)",zIndex:9999,animation:"slideInRight 0.25s ease",overflowY:"auto"},children:e.jsx(ne,{onClose:()=>x(!1),open:!1})}),e.jsx(Q,{accountId:r,onClose:()=>o(null)}),d&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{position:"absolute",inset:0,background:"rgba(20,18,40,.32)",backdropFilter:"blur(3px)",WebkitBackdropFilter:"blur(3px)",zIndex:29,animation:"bdIn .18s ease"},onClick:()=>p(null)}),e.jsxs("div",{style:{position:"absolute",top:0,right:0,bottom:0,width:i,minWidth:320,maxWidth:"90%",background:"var(--bg2)",borderLeft:"0.5px solid var(--brd)",boxShadow:"-8px 0 40px rgba(60,50,150,.16)",zIndex:30,display:"flex",flexDirection:"column",animation:"slideInRight .22s cubic-bezier(.4,0,.2,1)"},children:[e.jsx("div",{style:{position:"absolute",left:0,top:0,bottom:0,width:5,cursor:"ew-resize",zIndex:31},onMouseDown:l=>{l.preventDefault();const j=l.clientX,E=i,F=O=>k(Math.max(320,Math.min(window.innerWidth*.9,E+(j-O.clientX)))),$=()=>{window.removeEventListener("mousemove",F),window.removeEventListener("mouseup",$)};window.addEventListener("mousemove",F),window.addEventListener("mouseup",$)}}),e.jsxs("div",{style:{height:50,display:"flex",alignItems:"center",gap:8,padding:"0 16px",borderBottom:"0.5px solid var(--brd)",flexShrink:0,background:"var(--bg2)"},children:[e.jsx("button",{className:"ic-btn sm",onClick:()=>p(null),children:e.jsx(u,{name:"x",size:13})}),e.jsx("span",{style:{fontFamily:"DM Mono",fontSize:11,color:"var(--ink4)"},children:d.id}),e.jsxs("div",{style:{marginLeft:"auto",display:"flex",gap:6},children:[e.jsxs("button",{className:"btn sm",children:[e.jsx(u,{name:"sparkles",size:12})," Ask Zotra"]}),e.jsxs("button",{className:"btn sm",children:[e.jsx(u,{name:"mail",size:12})," Email"]})]})]}),e.jsxs("div",{style:{flex:1,overflowY:"auto",padding:20},children:[e.jsxs("div",{style:{marginBottom:16},children:[e.jsx("div",{style:{fontFamily:"Sora,sans-serif",fontSize:18,fontWeight:700,letterSpacing:"-0.02em",color:"var(--ink)",marginBottom:6},children:d.name}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",fontSize:12,color:"var(--ink4)"},children:[e.jsx("span",{className:"stage-chip "+d.stage,children:d.phase||d.stage}),e.jsxs("span",{className:"heat-bub heat-"+d.heat,children:[e.jsx("span",{className:"heat-dot "+d.heat}),d.heat]}),e.jsx("span",{children:"·"}),e.jsxs("span",{style:{fontWeight:600,color:"var(--ink)",fontSize:13},children:["$",d.value.toLocaleString()]})]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:16},children:[{l:"Deal value",v:`$${d.value.toLocaleString()}`},{l:"Days in stage",v:`${d.cycle}d`},{l:"Health score",v:`${d.health}%`},{l:"Deal type",v:d.dealType||"—"},{l:"Panchashakti",v:`${d.panchashaktiScore}`},{l:"Last touch",v:d.lastTouch||"—"}].map(({l,v:j})=>e.jsxs("div",{style:{background:"var(--bg3)",border:"0.5px solid var(--brd)",borderRadius:9,padding:"10px 12px"},children:[e.jsx("div",{style:{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"var(--ink5)",marginBottom:4},children:l}),e.jsx("div",{style:{fontFamily:"Sora,sans-serif",fontSize:16,fontWeight:700,color:"var(--ink)",letterSpacing:"-0.02em"},children:j})]},l))}),e.jsxs("div",{style:{background:"var(--bg3)",border:"0.5px solid var(--brd)",borderRadius:10,padding:"12px 14px",marginBottom:12},children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"var(--ink5)",marginBottom:6},children:"Intent signal"}),e.jsx("div",{style:{fontSize:13,color:"var(--ink2)"},children:d.intent||"No intent signals detected."})]}),e.jsxs("div",{style:{background:"var(--pu)",border:"0.5px solid var(--brd)",borderRadius:10,padding:"12px 14px"},children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"var(--ink5)",marginBottom:6},children:"Status"}),e.jsx("div",{style:{fontSize:13,color:"var(--ink2)"},children:d.status||"—"})]})]})]})]})]})})};export{we as default};
