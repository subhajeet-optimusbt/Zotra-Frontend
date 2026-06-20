import{r as ee,j as e,d as v,e as ke}from"./vendor-react-DTmZBiFG.js";import{I as g,f as Y,i as Q,a as oe,S as R}from"./AppShell-tc70GgXT.js";import{S as re}from"./Shared-BmJpXX_S.js";import{A as ye}from"./AccountDetailPanel-BlslcleL.js";import{a as ie,b as te,g as be}from"./api-BV-Sjtc4.js";import"./index-DV5jNSqv.js";import"./vendor-icons-BGVXKQIZ.js";const je=`
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
`,ne=[{id:"prospect",name:"Prospect"},{id:"qualified",name:"Qualified"},{id:"proposal",name:"Proposal"},{id:"negotiation",name:"Negotiation"},{id:"contract",name:"Contract Sent"},{id:"closed",name:"Closed Won"}],he=[{id:"1",name:"Alex R.",color:"#6366f1"},{id:"2",name:"Sam T.",color:"#0891b2"},{id:"3",name:"Jordan K.",color:"#16a34a"},{id:"4",name:"Morgan L.",color:"#d97706"}],we=["Details","Context","Review"];function ge(o){return o.split(" ").map(r=>r[0]).slice(0,2).join("").toUpperCase()}const Ne=({onClose:o})=>{var h;const[r,i]=ee.useState(0),[b,t]=ee.useState(!1),[l,s]=ee.useState({name:"",domain:"",stage:"prospect",value:"",heat:"warm",owner:"1",closeDate:"",intent:"",notes:""});ee.useEffect(()=>{if(!document.getElementById("nop-styles")){const n=document.createElement("style");n.id="nop-styles",n.textContent=je,document.head.appendChild(n)}},[]);const u=(n,D)=>s(x=>({...x,[n]:D})),d=()=>r===0?l.name.trim().length>0&&l.value.trim().length>0:r===1?l.intent.trim().length>0:!0,C=()=>{r<2?i(n=>n+1):t(!0)},w=()=>i(n=>Math.max(0,n-1)),A=he.find(n=>n.id===l.owner),k=((h=ne.find(n=>n.id===l.stage))==null?void 0:h.name)??"";return b?e.jsxs("div",{className:"nop-shell",children:[e.jsxs("div",{className:"nop-header",children:[e.jsx("div",{className:"nop-header-icon",children:e.jsx("svg",{width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",children:e.jsx("path",{d:"M9 2l1.8 3.6L15 6.3l-3 2.9.7 4.1L9 11.3 5.3 13.3l.7-4.1-3-2.9 4.2-.7L9 2z",fill:"#fff"})})}),e.jsxs("div",{children:[e.jsx("div",{className:"nop-header-title",children:"New Deal"}),e.jsx("div",{className:"nop-header-sub",children:"deal created successfully"})]}),e.jsx("button",{className:"nop-close",onClick:o,children:"×"})]}),e.jsxs("div",{className:"nop-success",children:[e.jsx("div",{className:"nop-success-ring",children:e.jsx("div",{className:"nop-success-check",children:e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",children:e.jsx("path",{d:"M5 10.5l3.5 3.5L15 7",stroke:"#fff",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round"})})})}),e.jsx("div",{className:"nop-success-title",children:"Deal Created! 🎉"}),e.jsxs("div",{className:"nop-success-sub",children:[e.jsx("strong",{children:l.name})," has been added to your pipeline and is now visible on the board."]}),e.jsxs("div",{className:"nop-success-deal",children:[e.jsx("div",{className:"nop-success-deal-name",children:l.name}),e.jsxs("div",{className:"nop-success-deal-meta",children:[l.domain||"—"," · $",Number(l.value||0).toLocaleString()," ARR · ",k]})]}),e.jsxs("div",{style:{display:"flex",gap:8,width:"100%"},children:[e.jsx("button",{className:"nop-btn-sec",style:{flex:1},onClick:o,children:"Close"}),e.jsx("button",{className:"nop-btn-pri",style:{flex:1},onClick:()=>{t(!1),i(0),s({name:"",domain:"",stage:"prospect",value:"",heat:"warm",owner:"1",closeDate:"",intent:"",notes:""})},children:"+ Add Another"})]})]})]}):e.jsxs("div",{className:"nop-shell",children:[e.jsxs("div",{className:"nop-header",children:[e.jsxs("div",{children:[e.jsx("div",{className:"nop-header-title",children:"New Deal"}),e.jsxs("div",{className:"nop-header-sub",children:["add to pipeline · ",ne.length," stages"]})]}),e.jsx("button",{className:"nop-close",onClick:o,children:"×"})]}),e.jsx("div",{className:"nop-steps",children:we.map((n,D)=>e.jsxs("div",{className:`nop-step${D===r?" active":""}${D<r?" done":""}`,style:{cursor:D<r?"pointer":"default"},onClick:()=>D<r&&i(D),children:[e.jsx("div",{className:"nop-step-circle",children:D<r?e.jsx("svg",{width:"10",height:"10",viewBox:"0 0 10 10",fill:"none",children:e.jsx("path",{d:"M2 5.2l2.2 2.2L8 3",stroke:"#fff",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})}):D+1}),e.jsx("span",{className:"nop-step-label",children:n})]},D))}),e.jsxs("div",{className:"nop-body",children:[r===0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"nop-section-label",children:"Account"}),e.jsxs("div",{className:"nop-field",style:{animationDelay:"0ms"},children:[e.jsxs("label",{className:"nop-label",children:["Company Name ",e.jsx("span",{className:"nop-required",children:"*"})]}),e.jsx("input",{className:"nop-input",placeholder:"e.g. Acme Corp",value:l.name,onChange:n=>u("name",n.target.value)})]}),e.jsxs("div",{className:"nop-field",style:{animationDelay:"50ms"},children:[e.jsx("label",{className:"nop-label",children:"Domain"}),e.jsx("input",{className:"nop-input",placeholder:"acmecorp.com",value:l.domain,onChange:n=>u("domain",n.target.value)})]}),e.jsxs("div",{className:"nop-grid2",children:[e.jsxs("div",{className:"nop-field",style:{animationDelay:"80ms"},children:[e.jsxs("label",{className:"nop-label",children:["ARR Value ",e.jsx("span",{className:"nop-required",children:"*"})]}),e.jsxs("div",{className:"nop-value-wrap",children:[e.jsx("span",{className:"nop-value-prefix",children:"$"}),e.jsx("input",{className:"nop-input",placeholder:"120,000",value:l.value,onChange:n=>u("value",n.target.value.replace(/[^0-9]/g,""))})]})]}),e.jsxs("div",{className:"nop-field",style:{animationDelay:"100ms"},children:[e.jsx("label",{className:"nop-label",children:"Close Date"}),e.jsx("input",{className:"nop-input",type:"date",value:l.closeDate,onChange:n=>u("closeDate",n.target.value)})]})]}),e.jsx("div",{className:"nop-section-label",style:{marginTop:4},children:"Pipeline"}),e.jsxs("div",{className:"nop-field",style:{animationDelay:"110ms"},children:[e.jsx("label",{className:"nop-label",children:"Stage"}),e.jsx("select",{className:"nop-select",value:l.stage,onChange:n=>u("stage",n.target.value),children:ne.map(n=>e.jsx("option",{value:n.id,children:n.name},n.id))})]}),e.jsxs("div",{className:"nop-field",style:{animationDelay:"130ms"},children:[e.jsx("label",{className:"nop-label",children:"Heat Signal"}),e.jsx("div",{className:"nop-heat-row",children:["hot","warm","cool"].map(n=>e.jsxs("button",{className:`nop-heat-opt${l.heat===n?` selected-${n}`:""}`,onClick:()=>u("heat",n),children:[e.jsx("span",{className:`nop-heat-dot ${n}`}),n.charAt(0).toUpperCase()+n.slice(1)]},n))})]})]}),r===1&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"nop-section-label",children:"Intent & Context"}),e.jsxs("div",{className:"nop-field",style:{animationDelay:"0ms"},children:[e.jsxs("label",{className:"nop-label",children:["Deal Intent ",e.jsx("span",{className:"nop-required",children:"*"})]}),e.jsx("input",{className:"nop-input",placeholder:"e.g. Expand from 50 → 200 seats",value:l.intent,onChange:n=>u("intent",n.target.value)})]}),e.jsxs("div",{className:"nop-field",style:{animationDelay:"60ms"},children:[e.jsx("label",{className:"nop-label",children:"Internal Notes"}),e.jsx("textarea",{className:"nop-textarea",placeholder:"Key context, blockers, next steps…",value:l.notes,onChange:n=>u("notes",n.target.value)})]}),e.jsx("div",{className:"nop-section-label",style:{marginTop:4},children:"Owner"}),e.jsxs("div",{className:"nop-field",style:{animationDelay:"80ms"},children:[e.jsx("label",{className:"nop-label",children:"Assign to"}),e.jsx("div",{className:"nop-owner-row",children:he.map(n=>e.jsxs("button",{className:`nop-owner-chip${l.owner===n.id?" selected":""}`,onClick:()=>u("owner",n.id),children:[e.jsx("div",{className:"nop-owner-av",style:{background:n.color},children:ge(n.name)}),n.name]},n.id))})]}),e.jsxs("div",{className:"nop-ai-banner",style:{animationDelay:"100ms"},children:[e.jsx("div",{className:"nop-ai-icon",children:e.jsx("svg",{width:"13",height:"13",viewBox:"0 0 13 13",fill:"none",children:e.jsx("path",{d:"M6.5 1.2l1.1 2.2 2.5.37-1.8 1.75.42 2.46L6.5 6.8 4.28 8l.42-2.46L2.9 3.79l2.5-.37L6.5 1.2z",fill:"#fff"})})}),e.jsxs("div",{className:"nop-ai-text",children:[e.jsx("strong",{children:"AI Insight:"})," Based on similar deals in ",e.jsx("strong",{children:k}),", the avg close time is ",e.jsx("strong",{children:"34 days"}),".",l.heat==="hot"?" Hot deals in this stage close 2× faster — prioritize!":l.heat==="cool"?" Consider a re-engagement sequence to warm this up.":" Steady engagement is key — schedule a touch within 7 days."]})]})]}),r===2&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"nop-section-label",children:"Review Deal"}),e.jsxs("div",{className:"nop-summary-card",children:[e.jsxs("div",{className:"nop-summary-head",children:[e.jsx("div",{className:"nop-summary-av",children:ge(l.name||"?")}),e.jsxs("div",{children:[e.jsx("div",{className:"nop-summary-name",children:l.name||"—"}),e.jsx("div",{className:"nop-summary-domain",children:l.domain||"—"})]})]}),e.jsx("div",{className:"nop-summary-rows",children:[["ARR",l.value?`$${Number(l.value).toLocaleString()}`:"—"],["Stage",k],["Heat",l.heat.charAt(0).toUpperCase()+l.heat.slice(1)],["Close Date",l.closeDate||"—"],["Intent",l.intent||"—"],["Owner",A.name],["Notes",l.notes||"—"]].map(([n,D])=>e.jsxs("div",{className:"nop-summary-row",children:[e.jsx("span",{className:"nop-summary-key",children:n}),e.jsx("span",{className:"nop-summary-val",style:{flex:1},children:D})]},n))})]}),e.jsxs("div",{className:"nop-ai-banner",children:[e.jsx("div",{className:"nop-ai-icon",children:e.jsx("svg",{width:"13",height:"13",viewBox:"0 0 13 13",fill:"none",children:e.jsx("path",{d:"M6.5 1.2l1.1 2.2 2.5.37-1.8 1.75.42 2.46L6.5 6.8 4.28 8l.42-2.46L2.9 3.79l2.5-.37L6.5 1.2z",fill:"#fff"})})}),e.jsxs("div",{className:"nop-ai-text",children:["Everything looks good! This deal will appear in your ",e.jsx("strong",{children:k})," column with a ",e.jsx("strong",{children:l.heat})," heat signal."]})]})]})]}),e.jsxs("div",{className:"nop-footer",children:[r>0&&e.jsx("button",{className:"nop-btn-sec",onClick:w,children:"← Back"}),e.jsx("button",{className:"nop-btn-pri",onClick:C,disabled:!d(),style:{opacity:d()?1:.45},children:r<2?e.jsxs(e.Fragment,{children:["Continue",e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",children:e.jsx("path",{d:"M3 7h8M7 3l4 4-4 4",stroke:"#fff",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",children:e.jsx("path",{d:"M3 7.2l2.8 2.8L11 4",stroke:"#fff",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})}),"Create Deal"]})})]})]})};function ze(){const o=be();return{accept:"*/*","Content-Type":"application/json",...o?{Authorization:`Bearer ${o}`}:{}}}function me(o){if(!o)return[];try{return JSON.parse(o)}catch{return[]}}function G(o){return o==="Up"?"up":o==="Down"?"dn":null}function _(o){if(!o)return"Unknown";try{const r=Date.now()-new Date(o).getTime(),i=Math.floor(r/6e4),b=Math.floor(i/60),t=Math.floor(b/24);return i<60?`${i}m ago`:b<24?`${b}h ago`:t===1?"yesterday":t<30?`${t}d ago`:new Date(o).toLocaleDateString("en-US",{month:"short",day:"numeric"})}catch{return o}}const Se=[{id:"overview",label:"Overview",icon:"layout-grid"},{id:"intelligence",label:"Intelligence",icon:"sparkles"},{id:"gaps",label:"Gaps",icon:"alert-circle"},{id:"motion",label:"Motion",icon:"zap"},{id:"reply",label:"Reply draft",icon:"mail"},{id:"evidence",label:"Evidence",icon:"file-text"},{id:"stakeholders",label:"Stakeholders",icon:"users"},{id:"activity",label:"Activity",icon:"clock"}],Ce=`
@keyframes odp-slide-in{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes odp-bd-in{from{opacity:0}to{opacity:1}}
@keyframes odp-sk-pulse{0%,100%{opacity:.45}50%{opacity:.9}}

.odp-backdrop{position:absolute;inset:0;background:rgba(20,18,40,.32);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);z-index:29;animation:odp-bd-in .18s ease;}
.odp-panel{position:absolute;top:0;right:0;bottom:0;background:var(--bg,#fff);border-left:0.5px solid var(--brd,#e2e8f0);box-shadow:-8px 0 40px rgba(60,50,150,.16);z-index:30;display:flex;flex-direction:column;overflow:hidden;animation:odp-slide-in .22s cubic-bezier(.4,0,.2,1);}
.odp-resize{position:absolute;left:0;top:0;bottom:0;width:5px;cursor:ew-resize;z-index:31;}

/* Top bar */
.odp-topbar{height:48px;display:flex;align-items:center;gap:8px;padding:0 16px;border-bottom:0.5px solid var(--brd,#e2e8f0);flex-shrink:0;background:var(--bg,#fff);}
.odp-close-btn{width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:7px;border:0.5px solid var(--brd2,#dde1ea);background:transparent;cursor:pointer;color:var(--ink4,#6b7280);flex-shrink:0;transition:background .12s,color .12s;}
.odp-close-btn:hover{background:var(--bg3);color:var(--ink);}
.odp-opp-id{font-family:"DM Mono",monospace;font-size:10px;color:var(--ink5,#9399a8);letter-spacing:0.04em;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.odp-act-btn{display:inline-flex;align-items:center;gap:5px;height:30px;padding:0 14px;border-radius:8px;background:#4B48C8;color:#fff;font-size:12px;font-weight:600;letter-spacing:-0.01em;border:none;cursor:pointer;flex-shrink:0;box-shadow:0 1px 2px rgba(75,72,200,.25),0 4px 12px rgba(75,72,200,.22);transition:filter .13s;}
.odp-act-btn:hover{filter:brightness(.9);}

/* Header */
.odp-hdr{padding:14px 18px 0;border-bottom:0.5px solid var(--brd,#e2e8f0);flex-shrink:0;background:var(--bg,#fff);}
.odp-hdr-row{display:flex;align-items:center;gap:10px;margin-bottom:12px;}
.odp-av{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0;}
.odp-name{font-family:"Sora",sans-serif;font-size:15px;font-weight:700;letter-spacing:-0.02em;color:var(--ink,#0f1117);line-height:1.2;}
.odp-meta{font-size:11px;color:var(--ink5,#9399a8);margin-top:2px;}

/* Stats */
.odp-stats{display:grid;grid-template-columns:repeat(4,1fr);border:0.5px solid var(--brd,#e2e8f0);border-radius:10px;overflow:hidden;margin:0 0 14px;}
.odp-stat{padding:9px 12px;border-right:0.5px solid var(--brd,#e2e8f0);}
.odp-stat:last-child{border-right:none;}
.odp-stat-l{font-size:8.5px;font-weight:700;letter-spacing:.10em;text-transform:uppercase;color:var(--ink5,#9399a8);margin-bottom:4px;}
.odp-stat-v{font-family:"Sora",sans-serif;font-size:14px;font-weight:700;letter-spacing:-0.02em;color:var(--ink,#0f1117);line-height:1;}
.odp-stat-v.pscore{color:#4B48C8;}
.odp-stat-v.heat-hot{color:#E5566C;}
.odp-stat-v.heat-warm{color:#D97757;}
.odp-stat-v.heat-cool{color:#4B6FDB;}

/* Stepper */
.odp-stepper{display:flex;align-items:center;padding:12px 18px 14px;gap:0;flex-shrink:0;}
.odp-step{display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;}
.odp-step-circle{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10.5px;font-weight:700;border:2px solid var(--brd2,#dde1ea);background:var(--bg3,#f1f3f7);color:var(--ink5,#9399a8);position:relative;z-index:2;flex-shrink:0;transition:background .2s,border-color .2s,color .2s;}
.odp-step-circle.active{background:#4B48C8;border-color:#4B48C8;color:#fff;box-shadow:0 0 0 3px rgba(75,72,200,.18);}
.odp-step-circle.done{background:rgba(75,72,200,.09);border-color:rgba(75,72,200,.30);color:#4B48C8;}
.odp-step-label{font-size:9px;font-weight:500;color:var(--ink5);white-space:nowrap;}
.odp-step-label.active{font-weight:700;color:#4B48C8;}
.odp-step-line{flex:1;height:2px;background:var(--brd2,#dde1ea);margin-bottom:13px;transition:background .2s;}
.odp-step-line.done{background:rgba(75,72,200,.30);}

/* Warning */
.odp-warn{margin:0 18px 12px;background:#fffbeb;border:0.5px solid #f5d878;border-radius:9px;padding:8px 12px;display:flex;align-items:center;gap:10px;flex-shrink:0;}
.odp-warn-ic{color:#d97706;flex-shrink:0;display:flex;align-items:center;}
.odp-warn-txt{font-size:11.5px;color:#78540e;flex:1;font-weight:500;}
.odp-warn-btn{font-size:11px;font-weight:600;color:#78540e;border:0.5px solid #d4a309;border-radius:6px;padding:3px 9px;background:transparent;cursor:pointer;white-space:nowrap;flex-shrink:0;transition:background .12s;}
.odp-warn-btn:hover{background:rgba(245,216,120,.25);}

/* Tabs */
.odp-tabs{display:flex;align-items:stretch;border-bottom:0.5px solid var(--brd,#e2e8f0);padding:0 12px;flex-shrink:0;overflow-x:auto;background:var(--bg2,#f8fafc);gap:1px;}
.odp-tabs::-webkit-scrollbar{display:none;}
.odp-tab{
  display:inline-flex;align-items:center;gap:6px;
  height:42px;padding:0 12px;
  font-size:12px;font-weight:500;
  color:var(--ink4,#6b7280);
  border:none;background:transparent;cursor:pointer;
  border-bottom:2.5px solid transparent;
  white-space:nowrap;font-family:inherit;
  transition:color .12s,background .12s;
  position:relative;top:0.5px;
  border-radius:6px 6px 0 0;
}
.odp-tab:hover{color:var(--ink);background:rgba(75,72,200,0.05);}
.odp-tab.active{
  color:#4B48C8;font-weight:700;
  border-bottom-color:#4B48C8;
  background:rgba(75,72,200,0.07);
}
.odp-tab .odp-tab-icon{
  display:flex;align-items:center;justify-content:center;
  width:20px;height:20px;border-radius:5px;
  background:transparent;
  transition:background .12s;
  flex-shrink:0;
}
.odp-tab:hover .odp-tab-icon{background:rgba(75,72,200,0.08);}
.odp-tab.active .odp-tab-icon{background:rgba(75,72,200,0.14);}
.odp-tab-badge{
  display:inline-flex;align-items:center;justify-content:center;
  min-width:17px;height:16px;padding:0 4px;
  border-radius:99px;
  background:#E5566C;color:#fff;
  font-size:8.5px;font-weight:700;line-height:1;
}
.odp-tab.active .odp-tab-badge{background:#4B48C8;}

/* Body */
.odp-body{flex:1;overflow-y:auto;padding:16px 18px 28px;}
.odp-body::-webkit-scrollbar{width:4px;}
.odp-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.10);border-radius:99px;}

/* Section header */
.odp-sh{font-size:9.5px;font-weight:700;letter-spacing:.11em;text-transform:uppercase;color:var(--ink5);margin-bottom:8px;display:flex;align-items:center;gap:8px;}

/* Card */
.odp-card{background:var(--bg2,#f8fafc);border:0.5px solid var(--brd,#e2e8f0);border-radius:10px;padding:14px 16px;margin-bottom:12px;}
.odp-card:last-child{margin-bottom:0;}

/* Skeleton */
.odp-sk{border-radius:5px;background:var(--bg3);animation:odp-sk-pulse 1.4s ease-in-out infinite;}

/* Force bars */
.odp-force-row{margin-bottom:0;padding:11px 0;border-bottom:0.5px solid var(--brd);}
.odp-force-row:last-child{border-bottom:none;padding-bottom:0;}
.odp-force-row:first-child{padding-top:0;}
.odp-force-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:3px;}
.odp-force-name{font-size:12.5px;font-weight:700;color:var(--ink);}
.odp-force-score{font-family:"DM Mono",monospace;font-size:12px;font-weight:700;color:var(--ink3);display:flex;align-items:center;gap:4px;}
.odp-force-score .up{color:#16a34a;}
.odp-force-score .dn{color:#dc2626;}
.odp-force-sub{font-size:10.5px;color:var(--ink5);margin-bottom:6px;}
.odp-force-track{height:6px;border-radius:99px;background:var(--brd,#e8eaf0);overflow:hidden;}
.odp-force-fill{height:100%;border-radius:99px;transition:width .6s cubic-bezier(.4,0,.2,1);}
.fill-artha{background:linear-gradient(90deg,#b45309,#f59e0b);}
.fill-laya{background:linear-gradient(90deg,#4338ca,#6366f1);}
.fill-kriya{background:linear-gradient(90deg,#1d4ed8,#3b82f6);}
.fill-gati{background:linear-gradient(90deg,#15803d,#22c55e);}
.fill-rasa{background:linear-gradient(90deg,#9333ea,#c084fc);}

/* overview score ring */
.odp-ov-score-ring{display:flex;align-items:center;gap:16px;padding:14px 16px;background:linear-gradient(135deg,rgba(75,72,200,0.06),rgba(75,72,200,0.02));border-radius:10px;border:0.5px solid rgba(75,72,200,0.15);margin-bottom:14px;}
.odp-ov-ring-num{font-family:"Sora",sans-serif;font-size:34px;font-weight:800;color:#4B48C8;letter-spacing:-0.04em;line-height:1;}
.odp-ov-ring-denom{font-family:"DM Mono",monospace;font-size:13px;color:var(--ink5);margin-top:2px;}
.odp-ov-ring-meta{display:flex;flex-direction:column;gap:3px;}
.odp-ov-ring-label{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--ink5);}
.odp-ov-ring-sub{font-size:11.5px;color:var(--ink3);}

/* quick kv row */
.odp-ov-kv-row{display:flex;align-items:center;gap:0;border:0.5px solid var(--brd);border-radius:10px;overflow:hidden;margin-bottom:14px;}
.odp-ov-kv{flex:1;padding:10px 14px;border-right:0.5px solid var(--brd);}
.odp-ov-kv:last-child{border-right:none;}
.odp-ov-kv-l{font-size:8.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--ink5);margin-bottom:4px;}
.odp-ov-kv-v{font-size:12.5px;font-weight:700;color:var(--ink);}

/* ── Inference cards ── */
.odp-inf-list{display:flex;flex-direction:column;gap:0;}
.odp-inf-card{display:flex;align-items:stretch;gap:0;border-bottom:0.5px solid var(--brd);padding:14px 16px;transition:background .12s;}
.odp-inf-card:last-child{border-bottom:none;}
.odp-inf-card:hover{background:var(--bg3);}
.odp-inf-left{display:flex;flex-direction:column;justify-content:center;gap:4px;flex:1;min-width:0;}
.odp-inf-name{font-size:12.5px;font-weight:700;color:var(--ink);line-height:1.3;}
.odp-inf-type{font-family:"DM Mono",monospace;font-size:9.5px;color:var(--ink5);letter-spacing:.03em;margin-top:1px;}
.odp-inf-evidence{font-size:11.5px;color:var(--ink4);line-height:1.5;margin-top:5px;font-style:italic;}
.odp-inf-right{display:flex;flex-direction:column;align-items:flex-end;justify-content:center;gap:7px;flex-shrink:0;padding-left:16px;min-width:84px;}
.odp-inf-score-wrap{display:flex;align-items:baseline;gap:2px;}
.odp-inf-score{font-family:"DM Mono",monospace;font-size:16px;font-weight:700;color:#4B48C8;line-height:1;}
.odp-inf-score-max{font-family:"DM Mono",monospace;font-size:10px;color:var(--ink5);font-weight:400;}
.odp-inf-bar-track{width:76px;height:5px;border-radius:99px;background:var(--bg3);overflow:hidden;flex-shrink:0;}
.odp-inf-bar-fill{height:100%;border-radius:99px;transition:width .5s cubic-bezier(.4,0,.2,1);}
.odp-inf-bar-fill.strong{background:linear-gradient(90deg,#16a34a,#4ade80);}
.odp-inf-bar-fill.partial{background:linear-gradient(90deg,#6d28d9,#a78bfa);}
.odp-inf-bar-fill.weak{background:linear-gradient(90deg,#c2410c,#fb923c);}
.odp-inf-bar-fill.missing{background:var(--brd2);}

.odp-status-pill{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700;white-space:nowrap;letter-spacing:.03em;}
.odp-status-pill::before{content:"";width:5px;height:5px;border-radius:50%;flex-shrink:0;}
.odp-status-pill.strong{background:#dcfce7;color:#15803d;}
.odp-status-pill.strong::before{background:#16a34a;}
.odp-status-pill.partial{background:#ede9fe;color:#6d28d9;}
.odp-status-pill.partial::before{background:#7c3aed;}
.odp-status-pill.weak{background:#fff7ed;color:#c2410c;}
.odp-status-pill.weak::before{background:#ea580c;}
.odp-status-pill.missing{background:#fee2e2;color:#b91c1c;}
.odp-status-pill.missing::before{background:#dc2626;}

/* phase chip */
.odp-phase-chip{display:inline-flex;padding:2px 8px;border-radius:4px;font-size:9px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;background:var(--bg3);border:0.5px solid var(--brd2);color:var(--ink5);}

/* Snapshot */
.odp-snap-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:6px;}
.odp-snap-cell{display:flex;flex-direction:column;gap:5px;}
.odp-snap-label{font-size:9px;font-weight:700;letter-spacing:.10em;text-transform:uppercase;color:var(--ink5);}
.odp-snap-pill{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:10.5px;font-weight:700;letter-spacing:.03em;white-space:nowrap;width:fit-content;}
.odp-snap-pill.blocked{background:#fee2e2;color:#b91c1c;}
.odp-snap-pill.no{background:#fee2e2;color:#b91c1c;}
.odp-snap-pill.gap-driven{background:#ede9fe;color:#6d28d9;}
.odp-snap-pill.yes{background:#dcfce7;color:#15803d;}
.odp-snap-pill.active{background:#dbeafe;color:#1d4ed8;}
.odp-blocking-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;}
.odp-block-tag{display:inline-flex;padding:2px 9px;border-radius:4px;font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;background:#fee2e2;color:#b91c1c;border:0.5px solid #fca5a5;}

/* Gaps */
.odp-gap-section-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
.odp-gap-section-title{font-size:14px;font-weight:700;color:var(--ink);display:flex;align-items:center;gap:8px;}
.odp-gap-count-pill{display:inline-flex;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;background:#fee2e2;color:#b91c1c;}
.odp-gap-row{border:0.5px solid var(--brd,#e2e8f0);border-radius:10px;overflow:hidden;margin-bottom:10px;background:var(--bg,#fff);}
.odp-gap-row:last-child{margin-bottom:0;}
.odp-gap-row-head{display:flex;align-items:center;gap:10px;padding:11px 14px;}
.odp-gap-critical{display:inline-flex;padding:2px 8px;border-radius:4px;font-size:9.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;background:#fee2e2;color:#b91c1c;flex-shrink:0;}
.odp-gap-high{display:inline-flex;padding:2px 8px;border-radius:4px;font-size:9.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;background:#fff7ed;color:#c2410c;flex-shrink:0;}
.odp-gap-title{font-size:13px;font-weight:700;color:var(--ink);flex:1;}
.odp-gap-actions{display:flex;align-items:center;gap:8px;flex-shrink:0;}
.odp-gap-action-btn{font-size:11.5px;font-weight:500;color:var(--ink4);background:none;border:none;cursor:pointer;padding:0;transition:color .12s;}
.odp-gap-action-btn:hover{color:var(--p,#4B48C8);}
.odp-gap-quote{margin:0 14px;padding:9px 12px;background:var(--bg3,#f8fafc);border-radius:7px;font-size:12px;font-style:italic;color:var(--ink3);line-height:1.55;border-left:2.5px solid #4B48C8;}
.odp-gap-desc{padding:8px 14px 12px;font-size:11.5px;color:var(--ink4);line-height:1.55;}

/* gap status pill */
.odp-gap-status{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:.03em;white-space:nowrap;flex-shrink:0;}
.odp-gap-status.open{background:#fff7ed;color:#c2410c;border:0.5px solid #fdba74;}
.odp-gap-status.resolved{background:#dcfce7;color:#15803d;}
.odp-gap-status.dismissed{background:var(--bg3);color:var(--ink5);}

.odp-resolved-head{display:flex;align-items:center;justify-content:space-between;margin:16px 0 10px;}
.odp-resolved-title{font-size:14px;font-weight:700;color:var(--ink);display:flex;align-items:center;gap:8px;}
.odp-resolved-pill{display:inline-flex;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;background:#dcfce7;color:#15803d;}
.odp-resolved-row{display:flex;align-items:flex-start;gap:9px;padding:9px 0;border-bottom:0.5px solid var(--brd);}
.odp-resolved-row:last-child{border-bottom:none;}
.odp-resolved-name{font-size:13px;font-weight:600;color:var(--ink);margin-bottom:2px;}
.odp-resolved-sub{font-size:11.5px;color:var(--ink5);line-height:1.45;}

/* Motion */
.odp-motion-card{border:0.5px solid var(--brd);border-radius:10px;padding:16px;margin-bottom:12px;background:var(--bg,#fff);}
.odp-motion-eyebrow{font-size:9px;font-weight:700;letter-spacing:.11em;text-transform:uppercase;color:var(--ink5);margin-bottom:8px;display:flex;align-items:center;gap:8px;}
.odp-motion-stage-pill{display:inline-flex;padding:2px 9px;border-radius:20px;font-size:9.5px;font-weight:700;letter-spacing:.04em;background:#ede9fe;color:#6d28d9;}
.odp-motion-title{font-size:14px;font-weight:700;color:var(--ink);margin-bottom:6px;}
.odp-motion-desc{font-size:12.5px;color:var(--ink3);line-height:1.55;margin-bottom:12px;}
.odp-motion-why{background:var(--bg3,#f8fafc);border-radius:7px;padding:9px 12px;font-size:12px;color:var(--ink3);line-height:1.55;}
.odp-conv-head{display:flex;align-items:center;gap:8px;margin-bottom:10px;}
.odp-conv-title{font-size:9px;font-weight:700;letter-spacing:.11em;text-transform:uppercase;color:var(--ink5);}
.odp-conv-active-pill{display:inline-flex;padding:2px 8px;border-radius:20px;font-size:9px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;background:#dcfce7;color:#15803d;}
.odp-conv-questions-label{font-size:11.5px;color:var(--ink4);margin-bottom:10px;}
.odp-conv-q{display:flex;align-items:flex-start;gap:10px;background:rgba(255,241,242,.7);border:0.5px solid #fca5a5;border-radius:8px;padding:10px 12px;margin-bottom:8px;font-size:12.5px;color:var(--ink2);line-height:1.55;}
.odp-conv-q:last-child{margin-bottom:0;}
.odp-conv-q-num{width:20px;height:20px;border-radius:50%;background:#E5566C;color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}
.odp-success-label{font-size:9px;font-weight:700;letter-spacing:.11em;text-transform:uppercase;color:var(--ink5);margin:14px 0 8px;}

/* Reply */
.odp-reply-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
.odp-reply-title{font-size:14px;font-weight:700;color:var(--ink);display:flex;align-items:center;gap:8px;}
.odp-reply-dot{width:8px;height:8px;border-radius:50%;background:var(--brd2);flex-shrink:0;}
.odp-pending-pill{display:inline-flex;padding:2px 9px;border-radius:6px;font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;background:#fff7ed;color:#c2410c;border:0.5px solid #fdba74;}
.odp-approved-pill{display:inline-flex;padding:2px 9px;border-radius:6px;font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;background:#dcfce7;color:#15803d;}
.odp-reply-subject-label{font-size:9px;font-weight:700;letter-spacing:.10em;text-transform:uppercase;color:var(--ink5);margin-bottom:5px;}
.odp-reply-subject{font-size:13.5px;font-weight:700;color:var(--ink);margin-bottom:12px;padding-bottom:12px;border-bottom:0.5px solid var(--brd);}
.odp-reply-body{font-size:13px;color:var(--ink2);line-height:1.72;padding-bottom:14px;border-bottom:0.5px solid var(--brd);margin-bottom:14px;white-space:pre-wrap;}
.odp-validation-card{background:var(--bg2,#f8fafc);border:0.5px solid var(--brd);border-radius:10px;padding:14px 16px;}
.odp-validation-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
.odp-validation-title{font-size:13px;font-weight:700;color:var(--ink);display:flex;align-items:center;gap:8px;}
.odp-validation-score{font-family:"DM Mono",monospace;font-size:13px;font-weight:700;color:#16a34a;}
.odp-validation-row{display:flex;align-items:flex-start;gap:9px;padding:8px 0;border-bottom:0.5px solid var(--brd);font-size:12.5px;color:var(--ink);}
.odp-validation-row:last-child{border-bottom:none;}
.odp-validation-sub{font-size:11px;color:var(--ink5);margin-top:2px;}

/* ── Evidence ── */
.odp-ev-wrap{border:0.5px solid var(--brd);border-radius:10px;overflow:hidden;background:var(--bg,#fff);margin-bottom:14px;}
.odp-ev-header{display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:0.5px solid var(--brd);}
.odp-ev-title{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:700;color:var(--ink);}
.odp-ev-count{display:inline-flex;padding:2px 10px;border-radius:20px;background:var(--bg3);border:0.5px solid var(--brd2);font-size:11px;font-weight:600;color:var(--ink4);}
.odp-ev-item{display:flex;align-items:flex-start;gap:14px;padding:13px 16px;border-bottom:0.5px solid var(--brd);}
.odp-ev-item:last-child{border-bottom:none;}
.odp-ev-left{display:flex;flex-direction:column;gap:4px;min-width:106px;flex-shrink:0;}
.odp-ev-slug{font-family:"DM Mono",monospace;font-size:10.5px;color:var(--ink4);line-height:1.4;}
.odp-ev-source{font-size:10px;color:var(--ink5);font-style:italic;}
.odp-ev-text{font-size:12.5px;color:var(--ink2);line-height:1.55;flex:1;font-style:italic;}
.odp-ev-right{display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0;min-width:64px;}
.odp-band-pill{display:inline-flex;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;letter-spacing:.04em;white-space:nowrap;}
.odp-band-pill.high{background:#dcfce7;color:#15803d;}
.odp-band-pill.medium{background:#fef9c3;color:#a16207;}
.odp-band-pill.low{background:#fee2e2;color:#b91c1c;}
.odp-conf{font-family:"DM Mono",monospace;font-size:11.5px;font-weight:600;color:var(--ink4);}

/* Human assertions */
.odp-ha-wrap{border:0.5px solid var(--brd);border-radius:10px;overflow:hidden;background:var(--bg,#fff);}
.odp-ha-header{display:flex;align-items:center;justify-content:space-between;padding:11px 16px;border-bottom:0.5px solid var(--brd);}
.odp-ha-title{font-size:9px;font-weight:700;letter-spacing:.11em;text-transform:uppercase;color:var(--ink5);}
.odp-ha-add{display:inline-flex;align-items:center;gap:4px;font-size:11.5px;font-weight:500;color:var(--ink4);background:none;border:none;cursor:pointer;padding:0;transition:color .12s;}
.odp-ha-add:hover{color:var(--p,#4B48C8);}
.odp-ha-item{display:flex;align-items:flex-start;gap:10px;padding:11px 16px;border-bottom:0.5px solid var(--brd);}
.odp-ha-item:last-child{border-bottom:none;}
.odp-ha-label{font-size:12.5px;font-weight:700;color:#15803d;display:flex;align-items:center;gap:6px;margin-bottom:3px;}
.odp-ha-key{font-family:"DM Mono",monospace;font-size:11px;color:var(--ink4);font-weight:400;}
.odp-ha-meta{font-size:11.5px;color:var(--ink3);line-height:1.5;font-style:italic;}
.odp-ha-empty{padding:22px 16px;text-align:center;color:var(--ink5);font-size:12px;}
.odp-ha-placeholder{display:flex;align-items:center;justify-content:center;height:38px;border:1.5px dashed var(--brd2);border-radius:8px;font-size:12px;color:var(--ink4);cursor:pointer;gap:5px;background:transparent;width:100%;margin-top:8px;transition:border-color .12s,color .12s;}
.odp-ha-placeholder:hover{border-color:var(--p,#4B48C8);color:var(--p,#4B48C8);}

/* ── Stakeholders ── */
.odp-sh-wrap{background:var(--bg,#fff);border:0.5px solid var(--brd);border-radius:10px;overflow:hidden;}
.odp-sh-header{display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:0.5px solid var(--brd);}
.odp-sh-title{font-size:14px;font-weight:700;color:var(--ink);display:flex;align-items:center;gap:8px;}
.odp-sh-add{display:inline-flex;align-items:center;gap:5px;height:28px;padding:0 12px;border-radius:7px;font-size:12px;font-weight:500;color:var(--ink4);border:0.5px solid var(--brd2);background:transparent;cursor:pointer;transition:background .12s,color .12s;}
.odp-sh-add:hover{background:var(--bg3);color:var(--ink);}
.odp-sh-item{display:flex;align-items:flex-start;gap:0;padding:0;border-bottom:0.5px solid var(--brd);}
.odp-sh-item:last-child{border-bottom:none;}
.odp-sh-av-col{display:flex;flex-direction:column;align-items:center;padding:14px 10px 14px 16px;gap:6px;}
.odp-sh-av{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0;}
.odp-sh-index{font-family:"DM Mono",monospace;font-size:9px;color:var(--ink5);font-weight:600;}
.odp-sh-info{flex:1;min-width:0;padding:13px 16px 13px 0;}
.odp-sh-name-row{display:flex;align-items:center;gap:7px;margin-bottom:4px;flex-wrap:wrap;}
.odp-sh-name{font-size:13px;font-weight:700;color:var(--ink);}
.odp-sh-role-tag{display:inline-flex;padding:2px 8px;border-radius:20px;font-size:10.5px;font-weight:600;}
.odp-sh-role-tag.champion{background:#ede9fe;color:#6d28d9;}
.odp-sh-role-tag.economic_buyer{background:#dbeafe;color:#1d4ed8;}
.odp-sh-role-tag.evaluator{background:#f0fdf4;color:#166534;border:0.5px solid #bbf7d0;}
.odp-sh-role-tag.blocker{background:#fee2e2;color:#b91c1c;}
.odp-sh-role-tag.influencer{background:#fef9c3;color:#854d0e;}
.odp-sh-role-tag.contact{background:var(--bg3);color:var(--ink4);border:0.5px solid var(--brd2);}
.odp-sh-role-tag.dm{display:inline-flex;padding:2px 7px;border-radius:4px;font-size:9.5px;font-weight:700;letter-spacing:.04em;background:#1d4ed8;color:#fff;}
.odp-sh-email{font-size:11px;color:var(--ink5);margin-bottom:8px;display:flex;align-items:center;gap:4px;}
.odp-sh-divider{height:0.5px;background:var(--brd);margin:6px 0 10px;}
.odp-sh-attrs{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
.odp-sh-attr-cell{display:flex;flex-direction:column;gap:2px;}
.odp-sh-attr-label{font-size:8.5px;font-weight:700;letter-spacing:.10em;text-transform:uppercase;color:var(--ink5);}
.odp-sh-attr-val{font-size:12px;font-weight:600;color:var(--ink2);text-transform:capitalize;}
.odp-sh-attr-val.email-val{font-size:11px;text-transform:none;font-family:"DM Mono",monospace;color:var(--ink3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.odp-sh-empty{padding:36px 16px;text-align:center;color:var(--ink5);font-size:13px;}

/* ── Activity feed ── */
.odp-act-wrap{background:var(--bg,#fff);border:0.5px solid var(--brd);border-radius:10px;overflow:hidden;margin-bottom:14px;}
.odp-act-header{display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:0.5px solid var(--brd);background:var(--bg2);}
.odp-act-title{font-size:14px;font-weight:700;color:var(--ink);display:flex;align-items:center;gap:8px;}
.odp-act-count{display:inline-flex;padding:2px 9px;border-radius:20px;font-size:10.5px;font-weight:600;color:var(--ink4);background:var(--bg3);border:0.5px solid var(--brd2);}

/* timeline spine */
.odp-feed{padding:8px 0;}
.odp-tl-item{
  display:flex;align-items:flex-start;gap:12px;
  padding:11px 16px;position:relative;
  transition:background .12s;
}
.odp-tl-item:hover{background:var(--bg3);}
.odp-tl-item::before{
  content:"";position:absolute;
  left:40px;top:44px;bottom:-2px;
  width:1.5px;
  background:linear-gradient(180deg,var(--brd2) 60%,transparent 100%);
}
.odp-tl-item:last-child::before{display:none;}
.odp-tl-icon{
  width:30px;height:30px;border-radius:9px;
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;color:var(--ink4);
  background:var(--bg3);border:0.5px solid var(--brd2);
  position:relative;z-index:1;
}
.odp-tl-icon.purple{background:rgba(109,40,217,0.10);border-color:rgba(109,40,217,0.20);color:#6d28d9;}
.odp-tl-icon.blue{background:rgba(29,78,216,0.09);border-color:rgba(29,78,216,0.18);color:#1d4ed8;}
.odp-tl-icon.red{background:rgba(185,28,28,0.09);border-color:rgba(185,28,28,0.18);color:#b91c1c;}
.odp-tl-icon.green{background:rgba(21,128,61,0.09);border-color:rgba(21,128,61,0.18);color:#15803d;}

.odp-tl-body{flex:1;min-width:0;padding-top:3px;}
.odp-tl-top{display:flex;align-items:center;gap:8px;margin-bottom:3px;flex-wrap:wrap;}
.odp-tl-title{font-size:12.5px;font-weight:700;color:var(--ink);line-height:1.3;flex:1;min-width:0;}
.odp-tl-time{font-size:10px;color:var(--ink5);font-weight:400;flex-shrink:0;white-space:nowrap;}
.odp-tl-desc{font-size:11.5px;color:var(--ink4);line-height:1.45;margin-bottom:5px;}
.odp-tl-chips{display:flex;align-items:center;gap:5px;flex-wrap:wrap;}
.odp-tl-chip{
  display:inline-flex;align-items:center;gap:3px;
  padding:2px 7px;border-radius:4px;
  font-family:"DM Mono",monospace;font-size:9.5px;font-weight:600;
  background:var(--bg3);border:0.5px solid var(--brd2);color:var(--ink5);
  text-transform:uppercase;letter-spacing:.04em;white-space:nowrap;
}
.odp-tl-chip.source{background:rgba(75,72,200,0.07);border-color:rgba(75,72,200,0.18);color:#4B48C8;}
.odp-tl-chip.agent{background:rgba(21,128,61,0.07);border-color:rgba(21,128,61,0.18);color:#15803d;}
.odp-tl-chip.sev-high,.odp-tl-chip.sev-critical{background:rgba(185,28,28,0.07);border-color:rgba(185,28,28,0.18);color:#b91c1c;}
.odp-tl-chip.sev-medium{background:rgba(194,65,12,0.07);border-color:rgba(194,65,12,0.18);color:#c2410c;}
.odp-act-empty{padding:40px 16px;text-align:center;color:var(--ink5);font-size:13px;}

/* legacy delta rows */
.odp-delta-row{display:flex;align-items:center;gap:10px;padding:8px 16px;border-bottom:0.5px solid var(--brd);}
.odp-delta-row:last-child{border-bottom:none;}
.odp-delta-pill{display:inline-flex;padding:2px 8px;border-radius:20px;font-size:10.5px;font-weight:700;flex-shrink:0;}
.odp-delta-pill.improved{background:#dcfce7;color:#15803d;}
.odp-delta-pill.declined{background:#fee2e2;color:#b91c1c;}
.odp-delta-pill.new{background:#dbeafe;color:#1d4ed8;}
.odp-delta-type{font-family:"DM Mono",monospace;font-size:11px;color:var(--ink4);flex:1;}
.odp-delta-time{font-size:10.5px;color:var(--ink5);flex-shrink:0;}

/* Error / loading */
.odp-error{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;flex:1;padding:28px;text-align:center;color:var(--ink4);}
`,J=({name:o,subtitle:r,score:i,fillClass:b,trend:t})=>e.jsxs("div",{className:"odp-force-row",children:[e.jsxs("div",{className:"odp-force-head",children:[e.jsx("span",{className:"odp-force-name",children:o}),e.jsxs("span",{className:"odp-force-score",children:[i,t==="up"&&e.jsx("span",{className:"up",children:"↑"}),t==="dn"&&e.jsx("span",{className:"dn",children:"↓"})]})]}),e.jsx("div",{className:"odp-force-sub",children:r}),e.jsx("div",{className:"odp-force-track",children:e.jsx("div",{className:`odp-force-fill ${b}`,style:{width:`${Math.min(100,Math.max(0,i))}%`}})})]}),ae=({color:o="#16a34a"})=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",style:{flexShrink:0,marginTop:1},children:[e.jsx("circle",{cx:"8",cy:"8",r:"7",stroke:o,strokeWidth:"1.4"}),e.jsx("path",{d:"M5 8l2.5 2.5 4-4",stroke:o,strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]}),U=({width:o="100%",height:r=12,style:i})=>e.jsx("span",{className:"odp-sk",style:{display:"block",width:o,height:r,...i}}),De=()=>e.jsxs("div",{style:{padding:"16px",display:"flex",flexDirection:"column",gap:14},children:[e.jsx(U,{height:16,width:"60%"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8},children:[0,1,2,3].map(o=>e.jsx(U,{height:46,style:{borderRadius:8}},o))}),e.jsx(U,{height:8,width:"80%"}),e.jsx(U,{height:8,width:"65%"}),e.jsx(U,{height:8,width:"72%"}),e.jsx(U,{height:100,style:{borderRadius:10}}),e.jsx(U,{height:100,style:{borderRadius:10}})]});function fe(o){const r=(o??"").toLowerCase();return r==="workspace_created"||r.includes("workspace_open")?{cls:"green",icon:"briefcase"}:r==="workspace_closed"||r.includes("workspace_close")?{cls:"",icon:"x-circle"}:r==="signal_detected"||r.includes("signal")?{cls:"purple",icon:"zap"}:r.includes("evidence")?{cls:"purple",icon:"file-text"}:r.includes("inference")?{cls:"blue",icon:"sparkles"}:r.includes("gap")?{cls:"red",icon:"alert-circle"}:r.includes("motion")?{cls:"purple",icon:"zap"}:r.includes("plan")||r.includes("conversation")?{cls:"blue",icon:"list"}:r.includes("reply")||r.includes("draft")?{cls:"blue",icon:"mail"}:r.includes("email")||r.includes("intake")?{cls:"blue",icon:"mail"}:r.includes("score")||r.includes("force")?{cls:"purple",icon:"activity"}:r.includes("stage")||r.includes("phase")?{cls:"green",icon:"arrow-right"}:r.includes("contact")||r.includes("stakeholder")?{cls:"blue",icon:"users"}:{cls:"",icon:"clock"}}function Me(o){if(o.title)return o.title;const r=(o.activityType??"event").replace(/_/g," ");return r.charAt(0).toUpperCase()+r.slice(1)}const Ae=({opp:o,onClose:r,panelWidth:i,onResizeStart:b})=>{var le,de,ce;const[t,l]=v.useState("overview"),[s,u]=v.useState(null),[d,C]=v.useState(!0),[w,A]=v.useState(null);v.useEffect(()=>{let a=document.getElementById("odp-styles");a||(a=document.createElement("style"),a.id="odp-styles",document.head.appendChild(a)),a.textContent=Ce},[]);const k=v.useCallback(()=>{o.id&&(C(!0),A(null),u(null),ie(`${te()}/opportunities/${o.id}/profile`,{headers:ze()}).then(a=>{if(!a.ok)throw new Error(`HTTP ${a.status}`);return a.json()}).then(a=>{console.log("[ODP] profile keys:",Object.keys(a)),console.log("[ODP] primaryContact raw:",a.primaryContact),console.log("[ODP] contacts raw:",a.contacts),console.log("[ODP] stakeholders raw:",a.stakeholders),u(a)}).catch(a=>A(a.message)).finally(()=>C(!1)))},[o.id]);v.useEffect(()=>{k()},[k]);const h=(s==null?void 0:s.opportunity)??(s==null?void 0:s.workspace)??null,n=(s==null?void 0:s.account)??null,x=((le=s==null?void 0:s.forceSnapshots)==null?void 0:le[0])??(s==null?void 0:s.forceSnapshot)??null??(h?{arthaScore:h.arthaScore??0,layaScore:h.layaScore??0,kriyaScore:h.kriyaScore??0,gatiScore:h.gatiScore??0,rasaScore:h.rasaScore??0,compositeScore:h.compositeScore??h.panchashaktiScore??0,arthaDirection:"Flat",layaDirection:"Flat",kriyaDirection:"Flat",gatiDirection:"Flat",rasaDirection:"Flat"}:null),p=(s==null?void 0:s.inferences)??[],N=(s==null?void 0:s.openGaps)??[],F=(s==null?void 0:s.resolvedGaps)??[],z=(s==null?void 0:s.activeMotion)??(s==null?void 0:s.selectedMotion)??null,E=(s==null?void 0:s.activeConversationPlan)??(s==null?void 0:s.conversationPlan)??null,$=(s==null?void 0:s.latestReplyDraft)??(s==null?void 0:s.replyDraft)??null,T=(s==null?void 0:s.latestReplyValidation)??(s==null?void 0:s.replyValidation)??null,K=(s==null?void 0:s.evidenceItems)??[],m=(s==null?void 0:s.humanAssertions)??[];s==null||s.stateDeltas,(s==null?void 0:s.pulseStream)??(s==null||s.timeline);const y=(s==null?void 0:s.activity)??[],S=v.useMemo(()=>{if(!s)return[];const a=s,c=a.stakeHolders??a.primaryContact??a.contacts??a.stakeholders??a.accountContacts??[],j=L=>L?Array.isArray(L)?L:[L]:[],M=[];return j(c).forEach(L=>{M.some(H=>H.rowKey&&H.rowKey===L.rowKey||H.email&&H.email===L.email)||M.push(L)}),M},[s]),W=(h==null?void 0:h.workspaceName)??o.name,O=(h==null?void 0:h.currentPhase)??o.stage,P=(h==null?void 0:h.dealValue)??o.value,I=(x==null?void 0:x.compositeScore)??(h==null?void 0:h.panchashaktiScore)??o.panchashaktiScore;o.heat==="hot"||o.heat,(n==null?void 0:n.domain)??`${W.toLowerCase().replace(/\s+/g,"")}`,n==null||n.industry;const f=N.filter(a=>a.severity==="Critical"),B=f.map(a=>a.inferenceType),q=me((z==null?void 0:z.questionsJson)??(E==null?void 0:E.questionsJson)),V=me((z==null?void 0:z.successCriteriaJson)??(E==null?void 0:E.successCriteriaJson)),X=T?[{label:"Plan alignment",sub:"Questions in draft match conversation plan",passed:T.planAlignmentStatus==="passed"},{label:"Policy check",sub:"Tone and language within guidelines",passed:T.policyStatus==="passed"},{label:"Gap coverage",sub:T.gapCoverageStatus==="partial"?"Partial — some signals still missing":"All gaps addressed",passed:T.gapCoverageStatus!=="failed"},{label:"Tone",sub:"Tone matches expected channel and context",passed:T.toneStatus==="passed"},{label:"Safety",sub:"No unsafe content detected",passed:T.safetyStatus==="passed"}]:[],ue=a=>a==="gaps"?N.length:a==="intelligence"?p.length:a==="evidence"?K.length:a==="stakeholders"?S.length:0;return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"odp-backdrop",onClick:r}),e.jsxs("div",{className:"odp-panel",style:{width:i,minWidth:320,maxWidth:"90%"},children:[e.jsx("div",{className:"odp-resize",onMouseDown:b}),e.jsx("div",{className:"odp-tabs",role:"tablist",children:Se.map(a=>{const c=ue(a.id),j=t===a.id;return e.jsxs("button",{role:"tab","aria-selected":j,className:`odp-tab${j?" active":""}`,onClick:()=>l(a.id),children:[e.jsx("span",{className:"odp-tab-icon",children:e.jsx(g,{name:a.icon,size:12})}),e.jsx("span",{children:a.label}),c>0&&e.jsx("span",{className:"odp-tab-badge",children:c})]},a.id)})}),e.jsxs("div",{className:"odp-body",children:[d&&e.jsx(De,{}),w&&e.jsxs("div",{className:"odp-error",children:[e.jsx(g,{name:"wifi-off",size:28}),e.jsx("div",{style:{fontWeight:600,color:"var(--ink3)",fontSize:13},children:"Could not load opportunity profile"}),e.jsx("div",{style:{fontSize:12,color:"var(--ink5)"},children:w}),e.jsxs("button",{className:"btn sm",onClick:k,children:[e.jsx(g,{name:"refresh-cw",size:12})," Retry"]})]}),!d&&!w&&s&&e.jsxs(e.Fragment,{children:[t==="overview"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"odp-ov-score-ring",children:[e.jsxs("div",{children:[e.jsx("div",{className:"odp-ov-ring-num",children:I}),e.jsx("div",{className:"odp-ov-ring-denom",children:"/100"})]}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{className:"odp-ov-ring-label",children:"Panchashakti Score"}),e.jsx("div",{className:"odp-ov-ring-sub",children:I>=70?"Strong deal — ready to advance":I>=40?"Moderate — gaps need addressing":"Weak — critical signals missing"}),e.jsx("div",{style:{marginTop:9,height:5,borderRadius:99,background:"var(--brd)",overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",width:`${Math.min(100,I)}%`,borderRadius:99,background:"linear-gradient(90deg,#4B48C8,#818cf8)",transition:"width .6s cubic-bezier(.4,0,.2,1)"}})})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5,flexShrink:0},children:[e.jsx("span",{className:`odp-status-pill ${o.heat==="hot"?"strong":o.heat==="warm"?"partial":"weak"}`,children:o.heat==="hot"?"Hot":o.heat==="warm"?"Warm":"Cool"}),e.jsx("span",{style:{fontFamily:'"DM Mono",monospace',fontSize:10,color:"var(--ink5)"},children:O})]})]}),e.jsxs("div",{className:"odp-ov-kv-row",children:[e.jsxs("div",{className:"odp-ov-kv",children:[e.jsx("div",{className:"odp-ov-kv-l",children:"Value"}),e.jsx("div",{className:"odp-ov-kv-v",children:P&&P>0?Y(P):"—"})]}),e.jsxs("div",{className:"odp-ov-kv",children:[e.jsx("div",{className:"odp-ov-kv-l",children:"Stage days"}),e.jsx("div",{className:"odp-ov-kv-v",children:o.cycle>0?`${o.cycle}d`:"—"})]}),e.jsxs("div",{className:"odp-ov-kv",children:[e.jsx("div",{className:"odp-ov-kv-l",children:"Open gaps"}),e.jsx("div",{className:"odp-ov-kv-v",style:{color:N.length>0?"#b91c1c":"#15803d"},children:N.length})]}),e.jsxs("div",{className:"odp-ov-kv",children:[e.jsx("div",{className:"odp-ov-kv-l",children:"Last touch"}),e.jsx("div",{className:"odp-ov-kv-v",style:{fontSize:11},children:o.lastTouch})]})]}),e.jsx("div",{className:"odp-sh",children:"Five Forces"}),e.jsxs("div",{className:"odp-card",style:{padding:"12px 16px"},children:[e.jsx(J,{name:"Artha",subtitle:"Economic value, budget, ROI",score:(x==null?void 0:x.arthaScore)??0,fillClass:"fill-artha",trend:G((x==null?void 0:x.arthaDirection)??"")}),e.jsx(J,{name:"Laya",subtitle:"Timing, urgency, momentum",score:(x==null?void 0:x.layaScore)??0,fillClass:"fill-laya",trend:G((x==null?void 0:x.layaDirection)??"")}),e.jsx(J,{name:"Kriya",subtitle:"Execution clarity, next-step readiness",score:(x==null?void 0:x.kriyaScore)??0,fillClass:"fill-kriya",trend:G((x==null?void 0:x.kriyaDirection)??"")}),e.jsx(J,{name:"Gati",subtitle:"Movement, alternatives, competition",score:(x==null?void 0:x.gatiScore)??0,fillClass:"fill-gati",trend:G((x==null?void 0:x.gatiDirection)??"")}),e.jsx(J,{name:"Rasa",subtitle:"Relationship, trust, authority",score:(x==null?void 0:x.rasaScore)??0,fillClass:"fill-rasa",trend:G((x==null?void 0:x.rasaDirection)??"")})]}),e.jsxs("div",{className:"odp-card",style:{marginTop:12},children:[e.jsx("div",{className:"odp-sh",style:{marginBottom:10},children:"Engagement Signals (14d)"}),e.jsx(re,{data:o.signals,width:280,height:32,color:"var(--p)"})]})]}),t==="intelligence"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{border:"0.5px solid var(--brd)",borderRadius:10,overflow:"hidden",background:"var(--bg)",marginBottom:12},children:[e.jsxs("div",{style:{padding:"13px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"0.5px solid var(--brd)",background:"var(--bg2)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,fontSize:14,fontWeight:700,color:"var(--ink)"},children:[e.jsx(g,{name:"sparkles",size:14})," Inference results"]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:5,fontSize:11,fontWeight:600,color:"#15803d"},children:[e.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:"#16a34a",display:"inline-block",flexShrink:0}}),p.filter(a=>a.passed).length," passed"]}),e.jsx("span",{style:{width:1,height:12,background:"var(--brd2)",display:"inline-block"}}),e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:5,fontSize:11,fontWeight:600,color:"#b91c1c"},children:[e.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:"#dc2626",display:"inline-block",flexShrink:0}}),p.filter(a=>!a.passed).length," missing"]})]})]}),e.jsxs("div",{className:"odp-inf-list",children:[p.map(a=>{const c=a.status.toLowerCase(),j=Math.min(100,a.score),M=a.evidenceSummary||(a.passed?a.answerText:null);return e.jsxs("div",{className:"odp-inf-card",children:[e.jsxs("div",{className:"odp-inf-left",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7},children:[e.jsx("div",{className:"odp-inf-name",children:a.inferenceName}),e.jsx("span",{className:"odp-phase-chip",children:a.phase})]}),e.jsx("div",{className:"odp-inf-type",children:a.inferenceType}),M&&e.jsxs("div",{className:"odp-inf-evidence",children:['"',M,'"']}),!a.passed&&e.jsx("div",{style:{fontSize:11,color:"var(--ink5)",marginTop:4,fontStyle:"italic"},children:a.questionText})]}),e.jsxs("div",{className:"odp-inf-right",children:[e.jsx("span",{className:`odp-status-pill ${c}`,children:a.status}),e.jsxs("div",{className:"odp-inf-score-wrap",children:[e.jsx("span",{className:"odp-inf-score",children:a.score}),e.jsx("span",{className:"odp-inf-score-max",children:"/100"})]}),e.jsx("div",{className:"odp-inf-bar-track",children:e.jsx("div",{className:`odp-inf-bar-fill ${c}`,style:{width:`${j}%`}})})]})]},a.rowKey)}),p.length===0&&e.jsx("div",{style:{padding:"32px 16px",textAlign:"center",color:"var(--ink5)",fontSize:13},children:"No inferences yet."})]})]}),e.jsxs("div",{className:"odp-card",style:{marginTop:12},children:[e.jsx("div",{className:"odp-sh",style:{marginBottom:10},children:"Workspace Snapshot"}),e.jsxs("div",{className:"odp-snap-grid",children:[e.jsxs("div",{className:"odp-snap-cell",children:[e.jsx("span",{className:"odp-snap-label",children:"Readiness"}),e.jsx("span",{className:`odp-snap-pill ${f.length>0?"blocked":"yes"}`,children:f.length>0?"BLOCKED":"READY"})]}),e.jsxs("div",{className:"odp-snap-cell",children:[e.jsx("span",{className:"odp-snap-label",children:"Can Advance"}),e.jsx("span",{className:`odp-snap-pill ${f.length>0?"no":"yes"}`,children:f.length>0?"NO":"YES"})]}),e.jsxs("div",{className:"odp-snap-cell",children:[e.jsx("span",{className:"odp-snap-label",children:"Motion"}),e.jsx("span",{className:"odp-snap-pill gap-driven",children:((de=z==null?void 0:z.motionCode)==null?void 0:de.replace(/_/g,"-").toUpperCase())??"—"})]})]}),B.length>0&&e.jsxs("div",{style:{marginTop:14},children:[e.jsx("div",{className:"odp-sh",style:{marginBottom:7},children:"Blocking Items"}),e.jsx("div",{className:"odp-blocking-row",children:B.map(a=>e.jsx("span",{className:"odp-block-tag",children:a.toUpperCase()},a))})]})]})]}),t==="gaps"&&e.jsxs(e.Fragment,{children:[N.length>0&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"odp-gap-section-head",children:[e.jsxs("div",{className:"odp-gap-section-title",children:[e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("circle",{cx:"8",cy:"8",r:"7",stroke:"var(--ink3)",strokeWidth:"1.4"}),e.jsx("path",{d:"M8 5v4M8 10.5v.5",stroke:"var(--ink3)",strokeWidth:"1.3",strokeLinecap:"round"})]}),"Open gaps"]}),e.jsx("span",{className:"odp-gap-count-pill",children:f.length>0?`${f.length} critical`:`${N.length} open`})]}),N.map(a=>{const c=p.find(M=>M.inferenceType===a.inferenceType),j=(a.status??"Open").toLowerCase();return e.jsxs("div",{className:"odp-gap-row",children:[e.jsxs("div",{className:"odp-gap-row-head",children:[e.jsx("span",{className:a.severity==="Critical"?"odp-gap-critical":"odp-gap-high",children:a.severity.toUpperCase()}),e.jsx("span",{className:`odp-gap-status ${j}`,children:a.status??"Open"}),e.jsx("span",{className:"odp-gap-title",children:(c==null?void 0:c.inferenceName)??a.inferenceType.replace(/_/g," ")}),e.jsxs("div",{className:"odp-gap-actions",children:[e.jsx("button",{className:"odp-gap-action-btn",children:"Dismiss"}),e.jsx("button",{className:"odp-gap-action-btn",style:{color:"#4B48C8",fontWeight:600},children:"Resolve"})]})]}),e.jsxs("div",{className:"odp-gap-quote",children:['"',a.recommendedQuestion,'"']}),e.jsx("div",{className:"odp-gap-desc",children:a.whyItMatters})]},a.rowKey)})]}),(()=>{const a=F.length>0?F:p.filter(c=>c.passed).map(c=>({rowKey:c.rowKey,inferenceType:c.inferenceType,gapType:"",severity:"",status:"resolved",recommendedQuestion:c.questionText,priority:"",whyItMatters:c.evidenceSummary||c.why}));return a.length?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"odp-resolved-head",children:[e.jsxs("div",{className:"odp-resolved-title",children:[e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"none",children:e.jsx("path",{d:"M4 8l3 3 5-5",stroke:"#16a34a",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})}),F.length>0?"Resolved gaps":"Passed inferences"]}),e.jsxs("span",{className:"odp-resolved-pill",children:[a.length," ",F.length>0?"resolved":"passed"]})]}),e.jsx("div",{className:"odp-card",children:a.map(c=>{const j=p.find(M=>M.inferenceType===c.inferenceType);return e.jsxs("div",{className:"odp-resolved-row",children:[e.jsx(ae,{}),e.jsxs("div",{children:[e.jsx("div",{className:"odp-resolved-name",children:(j==null?void 0:j.inferenceName)??c.inferenceType.replace(/_/g," ")}),e.jsx("div",{className:"odp-resolved-sub",children:(j==null?void 0:j.evidenceSummary)||c.whyItMatters||"Resolved automatically."})]})]},c.rowKey)})})]}):null})(),N.length===0&&F.length===0&&p.filter(a=>a.passed).length===0&&e.jsx("div",{style:{textAlign:"center",padding:"40px 16px",color:"var(--ink5)",fontSize:13},children:"No gaps found."})]}),t==="motion"&&e.jsxs(e.Fragment,{children:[z?e.jsxs("div",{className:"odp-motion-card",children:[e.jsxs("div",{className:"odp-motion-eyebrow",children:["Selected Motion",e.jsx("span",{className:"odp-motion-stage-pill",children:z.motionCode.replace(/_/g," ").toUpperCase()})]}),e.jsx("div",{className:"odp-motion-title",children:z.motionName}),e.jsx("div",{className:"odp-motion-desc",children:z.objective}),e.jsxs("div",{className:"odp-motion-why",children:[e.jsx("strong",{children:"Why selected:"})," ",z.reason]})]}):e.jsx("div",{className:"odp-card",style:{textAlign:"center",color:"var(--ink5)",fontSize:13},children:"No motion selected yet."}),E&&e.jsxs("div",{className:"odp-card",children:[e.jsxs("div",{className:"odp-conv-head",children:[e.jsx("span",{className:"odp-conv-title",children:"Conversation Plan"}),e.jsx("span",{className:"odp-conv-active-pill",children:"ACTIVE"})]}),e.jsxs("div",{className:"odp-conv-questions-label",children:[e.jsx("strong",{children:"Questions to ask"})," ·"," ",q.length," planned"]}),q.map((a,c)=>e.jsxs("div",{className:"odp-conv-q",children:[e.jsx("span",{className:"odp-conv-q-num",children:c+1}),e.jsx("span",{children:a})]},c)),V.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"odp-success-label",children:"Success Criteria"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:7},children:V.map((a,c)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,fontSize:12.5,color:"var(--ink3)"},children:[e.jsx(ae,{color:"#4B48C8"})," ",a]},c))})]})]})]}),t==="reply"&&e.jsxs(e.Fragment,{children:[$?e.jsxs("div",{className:"odp-card",style:{padding:"16px"},children:[e.jsxs("div",{className:"odp-reply-head",children:[e.jsxs("div",{className:"odp-reply-title",children:[e.jsx("span",{className:"odp-reply-dot"}),"Draft reply"]}),$.reviewStatus==="pending"?e.jsx("span",{className:"odp-pending-pill",children:"PENDING REVIEW"}):e.jsx("span",{className:"odp-approved-pill",children:((ce=$.reviewStatus)==null?void 0:ce.toUpperCase())??"DRAFT"})]}),e.jsx("div",{className:"odp-reply-subject-label",children:"Subject"}),e.jsx("div",{className:"odp-reply-subject",children:$.subject}),e.jsx("div",{className:"odp-reply-body",children:$.body}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsxs("button",{className:"btn sm pri",children:[e.jsx(g,{name:"mail",size:12})," Send email"]}),e.jsxs("button",{className:"btn sm",children:[e.jsx(g,{name:"copy",size:12})," Copy"]}),e.jsxs("button",{className:"btn sm",children:[e.jsx(g,{name:"refresh-cw",size:12})," Regenerate"]})]})]}):e.jsx("div",{className:"odp-card",style:{textAlign:"center",color:"var(--ink5)",fontSize:13},children:"No reply draft generated yet."}),T&&e.jsxs("div",{className:"odp-validation-card",style:{marginTop:12},children:[e.jsxs("div",{className:"odp-validation-head",children:[e.jsxs("div",{className:"odp-validation-title",children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("rect",{x:"2",y:"2",width:"12",height:"12",rx:"2",stroke:"var(--ink3)",strokeWidth:"1.3"}),e.jsx("path",{d:"M5 8l2.5 2.5 4-4",stroke:"var(--ink3)",strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round"})]}),"Validation report"]}),e.jsxs("span",{className:"odp-validation-score",children:[T.validationScore,"/100"]})]}),X.map((a,c)=>e.jsxs("div",{className:"odp-validation-row",children:[e.jsx(ae,{color:a.passed?"#16a34a":"#dc2626"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:12.5,fontWeight:600},children:a.label}),e.jsx("div",{className:"odp-validation-sub",children:a.sub})]})]},c)),T.recommendation&&e.jsx("div",{style:{marginTop:10,padding:"8px 11px",background:"var(--bg3)",borderRadius:7,fontSize:11.5,color:"var(--ink4)"},children:T.recommendation})]})]}),t==="evidence"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"odp-ev-wrap",children:[e.jsxs("div",{className:"odp-ev-header",children:[e.jsxs("div",{className:"odp-ev-title",children:[e.jsx(g,{name:"file-text",size:14}),"Evidence items"]}),e.jsxs("span",{className:"odp-ev-count",children:[K.length," items"]})]}),K.length>0?K.map(a=>{const c=p.find(j=>j.inferenceType===a.inferenceType);return e.jsxs("div",{className:"odp-ev-item",children:[e.jsxs("div",{className:"odp-ev-left",children:[e.jsx("span",{className:"odp-ev-slug",children:(c==null?void 0:c.inferenceName)??a.inferenceType}),a.sourceType&&e.jsx("span",{className:"odp-ev-source",children:a.sourceType})]}),e.jsxs("div",{className:"odp-ev-text",children:['"',a.evidenceText,'"']}),e.jsxs("div",{className:"odp-ev-right",children:[e.jsx("span",{className:`odp-band-pill ${a.evidenceBand.toLowerCase()}`,children:a.evidenceBand.toUpperCase()}),e.jsxs("span",{className:"odp-conf",children:[Math.round(a.confidence*100),"%"]})]})]},a.rowKey)}):e.jsx("div",{style:{padding:"32px 16px",textAlign:"center",color:"var(--ink5)",fontSize:13},children:"No evidence items collected yet."})]}),e.jsxs("div",{className:"odp-ha-wrap",children:[e.jsxs("div",{className:"odp-ha-header",children:[e.jsx("span",{className:"odp-ha-title",children:"Human Assertions"}),e.jsxs("button",{className:"odp-ha-add",children:[e.jsx(g,{name:"plus",size:11})," Add assertion"]})]}),m.length>0?e.jsxs(e.Fragment,{children:[m.map(a=>e.jsxs("div",{className:"odp-ha-item",children:[e.jsx(ae,{}),e.jsxs("div",{children:[e.jsxs("div",{className:"odp-ha-label",children:[a.assertionType??"Confirmation"," ·"," ",e.jsx("span",{className:"odp-ha-key",children:a.inferenceType})]}),e.jsxs("div",{className:"odp-ha-meta",children:['"',a.assertionText,'"',(a.createdBy||a.createdAt)&&e.jsxs("span",{style:{color:"var(--ink5)"},children:[" ","— ",a.createdBy??"User",a.createdAt?`, ${_(a.createdAt)}`:""]})]})]})]},a.rowKey)),e.jsx("div",{style:{padding:"0 16px 14px"},children:e.jsxs("button",{className:"odp-ha-placeholder",children:[e.jsx(g,{name:"plus",size:12})," Confirm, correct or override an inference result"]})})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"odp-ha-empty",children:"No human assertions yet."}),e.jsx("div",{style:{padding:"0 16px 14px"},children:e.jsxs("button",{className:"odp-ha-placeholder",children:[e.jsx(g,{name:"plus",size:12})," Confirm, correct or override an inference result"]})})]})]})]}),t==="stakeholders"&&e.jsxs("div",{className:"odp-sh-wrap",children:[e.jsxs("div",{className:"odp-sh-header",children:[e.jsxs("div",{className:"odp-sh-title",children:[e.jsx(g,{name:"users",size:14})," Stakeholder map",e.jsxs("span",{style:{fontFamily:'"DM Mono",monospace',fontSize:11,fontWeight:400,color:"var(--ink5)"},children:[S.length," contact",S.length!==1?"s":""]})]}),e.jsxs("button",{className:"odp-sh-add",children:[e.jsx(g,{name:"plus",size:11})," Add"]})]}),S.length>0?S.map((a,c)=>{const j=a.fullName??a.contactName??a.name??a.email??"Unknown",M=a.stakeholderRole??a.role??"contact",L=a.title??a.department??null,Z=M.toLowerCase().replace(/[\s-]+/g,"_"),H=a.isDm??(M.toLowerCase().includes("economic")||M.toLowerCase().includes("dm")),pe=a.email?a.email.split("@")[1]:null,xe=a.lastContactAt??a.lastTouchAt??null,se=a.accountName??(n==null?void 0:n.accountName)??null;return e.jsxs("div",{className:"odp-sh-item",children:[e.jsxs("div",{className:"odp-sh-av-col",children:[e.jsx("div",{className:"odp-sh-av "+oe(j),children:Q(j)}),e.jsxs("span",{className:"odp-sh-index",children:["#",c+1]})]}),e.jsxs("div",{className:"odp-sh-info",children:[e.jsxs("div",{className:"odp-sh-name-row",children:[e.jsx("span",{className:"odp-sh-name",children:j}),e.jsx("span",{className:`odp-sh-role-tag ${Z}`,children:M.replace(/_/g," ")}),H&&e.jsx("span",{className:"odp-sh-role-tag dm",children:"DM"})]}),e.jsxs("div",{className:"odp-sh-email",children:[L?e.jsxs(e.Fragment,{children:[e.jsx(g,{name:"briefcase",size:10})," ",L]}):pe?e.jsxs(e.Fragment,{children:[e.jsx(g,{name:"globe",size:10})," ",pe]}):null,se&&e.jsx("span",{style:{color:"var(--brd2)",margin:"0 3px"},children:"·"}),se&&e.jsx("span",{children:se})]}),e.jsx("div",{className:"odp-sh-divider"}),e.jsxs("div",{className:"odp-sh-attrs",children:[e.jsxs("div",{className:"odp-sh-attr-cell",children:[e.jsx("span",{className:"odp-sh-attr-label",children:"Email"}),e.jsx("span",{className:"odp-sh-attr-val email-val",children:a.email??"—"})]}),e.jsxs("div",{className:"odp-sh-attr-cell",children:[e.jsx("span",{className:"odp-sh-attr-label",children:"Authority"}),e.jsx("span",{className:"odp-sh-attr-val",children:a.authority??"—"})]}),e.jsxs("div",{className:"odp-sh-attr-cell",children:[e.jsx("span",{className:"odp-sh-attr-label",children:"Influence"}),e.jsx("span",{className:"odp-sh-attr-val",children:a.influence??"—"})]}),e.jsxs("div",{className:"odp-sh-attr-cell",children:[e.jsx("span",{className:"odp-sh-attr-label",children:"Last Contact"}),e.jsx("span",{className:"odp-sh-attr-val",children:xe?_(xe):"—"})]}),e.jsxs("div",{className:"odp-sh-attr-cell",children:[e.jsx("span",{className:"odp-sh-attr-label",children:"Source"}),e.jsx("span",{className:"odp-sh-attr-val",children:a.source??a.createdBy??"—"})]}),e.jsxs("div",{className:"odp-sh-attr-cell",children:[e.jsx("span",{className:"odp-sh-attr-label",children:"Added"}),e.jsx("span",{className:"odp-sh-attr-val",children:a.createdAt?_(a.createdAt):"—"})]})]})]})]},c)}):e.jsxs("div",{className:"odp-sh-empty",children:["No stakeholders mapped yet.",e.jsx("br",{}),e.jsx("span",{style:{fontSize:11},children:"Add contacts involved in this opportunity."}),s&&e.jsxs("div",{style:{marginTop:14,textAlign:"left",padding:"10px 14px",background:"var(--bg3)",borderRadius:8,fontSize:10,fontFamily:'"DM Mono",monospace',color:"var(--ink4)",lineHeight:1.65},children:[e.jsx("div",{style:{fontWeight:700,marginBottom:5},children:"Debug — profile keys:"}),Object.keys(s).map(a=>e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--p)"},children:a}),": ",e.jsx("span",{style:{color:"var(--ink5)"},children:Array.isArray(s[a])?`Array(${s[a].length})`:typeof s[a]=="object"&&s[a]?"Object":String(s[a]??"null")})]},a))]})]})]}),t==="activity"&&e.jsxs("div",{className:"odp-act-wrap",children:[e.jsxs("div",{className:"odp-act-header",children:[e.jsxs("div",{className:"odp-act-title",children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("circle",{cx:"8",cy:"8",r:"6.5",stroke:"currentColor",strokeWidth:"1.4"}),e.jsx("path",{d:"M8 5v3.5l2 1.5",stroke:"currentColor",strokeWidth:"1.3",strokeLinecap:"round"})]}),"Activity"]}),e.jsx("span",{className:"odp-act-count",children:y.length>0?`${y.length} event${y.length!==1?"s":""}`:"No events"})]}),y.length>0?e.jsx("div",{className:"odp-feed",children:[...y].reverse().map((a,c)=>{const{cls:j,icon:M}=fe(a.activityType??a.source??""),L=Me(a),Z=`sev-${(a.severity??"").toLowerCase()}`,H=a.source||a.agentType||a.severity&&a.severity.toLowerCase()!=="low";return e.jsxs("div",{className:"odp-tl-item",children:[e.jsx("div",{className:`odp-tl-icon ${j}`,children:e.jsx(g,{name:M,size:13})}),e.jsxs("div",{className:"odp-tl-body",children:[e.jsxs("div",{className:"odp-tl-top",children:[e.jsx("span",{className:"odp-tl-title",children:L}),e.jsx("span",{className:"odp-tl-time",children:_(a.createdAt)})]}),a.description&&e.jsx("div",{className:"odp-tl-desc",children:a.description}),H&&e.jsxs("div",{className:"odp-tl-chips",children:[a.source&&e.jsx("span",{className:"odp-tl-chip source",children:a.source}),a.agentType&&e.jsx("span",{className:"odp-tl-chip agent",children:a.agentType.replace(/_/g," ")}),a.severity&&a.severity.toLowerCase()!=="low"&&e.jsx("span",{className:`odp-tl-chip ${Z}`,children:a.severity}),a.activityType&&e.jsx("span",{className:"odp-tl-chip",children:a.activityType.replace(/_/g," ")})]})]})]},a.rowKey??c)})}):e.jsxs("div",{className:"odp-feed",children:[$&&(()=>{const{cls:a,icon:c}=fe("reply");return e.jsxs("div",{className:"odp-tl-item",children:[e.jsx("div",{className:`odp-tl-icon ${a}`,children:e.jsx(g,{name:c,size:13})}),e.jsxs("div",{className:"odp-tl-body",children:[e.jsxs("div",{className:"odp-tl-top",children:[e.jsx("span",{className:"odp-tl-title",children:"Reply draft generated"}),e.jsx("span",{className:"odp-tl-time",children:_($.createdAt)})]}),e.jsxs("div",{className:"odp-tl-desc",children:[(z==null?void 0:z.motionName)??"Motion"," · score"," ",(T==null?void 0:T.validationScore)??"—","/100"]})]})]})})(),f.map((a,c)=>{const j=p.find(M=>M.inferenceType===a.inferenceType);return e.jsxs("div",{className:"odp-tl-item",children:[e.jsx("div",{className:"odp-tl-icon red",children:e.jsx(g,{name:"alert-circle",size:13})}),e.jsxs("div",{className:"odp-tl-body",children:[e.jsxs("div",{className:"odp-tl-top",children:[e.jsx("span",{className:"odp-tl-title",children:"Gap detected"}),e.jsx("span",{className:"odp-tl-time",children:_(a.createdAt)})]}),e.jsxs("div",{className:"odp-tl-desc",children:[(j==null?void 0:j.inferenceName)??a.inferenceType.replace(/_/g," ")," ","— critical"]})]})]},c)}),h&&e.jsxs("div",{className:"odp-tl-item",children:[e.jsx("div",{className:"odp-tl-icon green",children:e.jsx(g,{name:"briefcase",size:13})}),e.jsxs("div",{className:"odp-tl-body",children:[e.jsxs("div",{className:"odp-tl-top",children:[e.jsx("span",{className:"odp-tl-title",children:"Workspace created"}),e.jsx("span",{className:"odp-tl-time",children:_(h.createdAt)})]}),e.jsxs("div",{className:"odp-tl-desc",children:["Opportunity opened ·"," ",o.cycle>0?`${o.cycle} days`:"recently"," ","in ",O]})]})]}),!$&&f.length===0&&!h&&e.jsx("div",{className:"odp-act-empty",children:"No activity recorded yet."})]})]})]})]})]})]})};function ve(){const o=be();return{accept:"*/*","Content-Type":"application/json",...o?{Authorization:`Bearer ${o}`}:{}}}function Te(o){if(!o)return"—";try{const r=new Date(o),i=Date.now()-r.getTime(),b=Math.floor(i/6e4),t=Math.floor(b/60),l=Math.floor(t/24);return b<60?`${b}m ago`:t<24?`${t}h ago`:l===1?"yesterday":l<30?`${l}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})}catch{return o}}function Be(o){if(!o)return 0;try{return Math.floor((Date.now()-new Date(o).getTime())/864e5)}catch{return 0}}function Le(o,r){const i=o>0?o:r;return i>=70?"hot":i>=35?"warm":"cool"}function Ee(o){if(!o)return"prospect";const r=o.toLowerCase().trim();return{prospect:"prospect",qualification:"qualify",qualify:"qualify",shaping:"shaping",shape:"shaping",development:"development",develop:"development",closing:"closing",close:"closing",active:"active",qualified:"qualified",renewal:"renewal",closed:"closed"}[r]??r}function $e(o){var s;const r=(o.totalCycleDays??(o.qualifyDays??0)+(o.shapingDays??0)+(o.developmentDays??0)+(o.closingDays??0))||Be(o.stageEnteredAt),i=o.opportunityHealth??0,b=o.panchashaktiScore??0,t=i>0?i:b,l=Array.from({length:14},(u,d)=>Math.max(1,Math.round(t/100*9*(.55+.45*Math.sin(d*.85+t*.1)))));return{id:o.rowKey,name:o.workspaceName,accountId:o.accountId,stage:Ee(o.currentPhase??o.stage),phase:o.currentPhase,heat:Le(i,b),value:o.dealValue??0,cycle:r,lastTouch:Te(o.lastTouchAt),intent:((s=o.dealType)==null?void 0:s.replace(/([A-Z])/g," $1").trim())??"—",signals:l,status:o.status,dealType:o.dealType??"—",panchashaktiScore:b,health:i}}const Fe=`
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
.kb-wrap{flex:1;display:flex;flex-direction:column;overflow:hidden;background:var(--bg,#f8fafc);height:100%}

.kb-scroll{flex:1;overflow:hidden;padding:16px 20px 20px;width:100%;box-sizing:border-box;display:flex;flex-direction:column}
.kb-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:13px;flex:1;min-height:0;width:100%;box-sizing:border-box}
.kb-col{display:flex;flex-direction:column;min-width:0;border-radius:14px;background:rgba(255,255,255,0.78);border:1px solid rgba(0,0,0,0.06);overflow:hidden;transition:box-shadow .2s,opacity .2s,border-color .2s;box-shadow:0 1px 4px rgba(15,23,42,0.05)}
.kb-col.can-drop{box-shadow:0 0 0 1.5px rgba(99,102,241,0.35),0 6px 24px rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.20)}
.kb-col.no-drop{opacity:0.38;filter:saturate(0.45)}
.kb-col-head{display:flex;align-items:center;gap:8px;padding:11px 13px 10px;border-bottom:1px solid rgba(0,0,0,0.055);background:rgba(255,255,255,0.88);position:relative}
.kb-col-head::after{content:'';position:absolute;left:0;top:0;right:0;height:2.5px;background:var(--col-accent,#94a3b8);border-radius:0 0 2px 2px;opacity:.88}
.kb-col-dot{width:7px;height:7px;border-radius:50%;background:var(--col-accent,#94a3b8);flex-shrink:0;box-shadow:0 0 0 2.5px var(--col-dot-ring,rgba(148,163,184,0.18))}
.kb-col-title{font-size:10.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#334155;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.kb-col-count{font-size:10px;font-weight:600;color:var(--col-accent,#94a3b8);background:var(--col-badge-bg,rgba(148,163,184,.10));border:1px solid var(--col-badge-brd,rgba(148,163,184,.28));border-radius:20px;padding:1.5px 8px;font-family:"DM Mono",monospace;flex-shrink:0}
.kb-col-sum{font-size:9.5px;font-family:"DM Mono",monospace;color:var(--ink5);flex-shrink:0;margin-left:2px}
.kb-cards{flex:1;padding:9px 8px 11px;display:flex;flex-direction:column;gap:7px;overflow-y:auto;min-height:0;transition:background .2s;position:relative}
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
`,Ie=()=>e.jsx("div",{className:"kb-wrap",children:e.jsx("div",{className:"kb-scroll",children:e.jsx("div",{className:"kb-cols",children:[0,1,2,3].map(o=>e.jsxs("div",{className:"kb-col",style:{opacity:.6},children:[e.jsxs("div",{className:"kb-col-head",children:[e.jsx("span",{className:"cv-sk",style:{width:7,height:7,borderRadius:"50%"}}),e.jsx("span",{className:"cv-sk",style:{width:80,height:10,flex:1}}),e.jsx("span",{className:"cv-sk",style:{width:24,height:16,borderRadius:20}})]}),e.jsx("div",{className:"kb-cards",children:[0,1,2].map(r=>e.jsxs("div",{className:"kb-card",style:{cursor:"default"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7,marginBottom:8},children:[e.jsx("span",{className:"cv-sk",style:{width:22,height:22,borderRadius:6,flexShrink:0}}),e.jsx("span",{className:"cv-sk",style:{flex:1,height:11}})]}),e.jsx("span",{className:"cv-sk",style:{width:"70%",height:9,display:"block",marginBottom:10}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7},children:[e.jsx("span",{className:"cv-sk",style:{width:52,height:11}}),e.jsx("span",{className:"cv-sk",style:{marginLeft:"auto",width:50,height:14}})]})]},r))})]},o))})})}),Re=`
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
`,We=({opportunity:o,fromStage:r,toStage:i,onConfirm:b,onCancel:t,loading:l,error:s})=>{var k,h;const[u,d]=v.useState(""),C=((k=R.find(n=>n.id===r))==null?void 0:k.name)??r,w=((h=R.find(n=>n.id===i))==null?void 0:h.name)??i,A=n=>{n.key==="Escape"&&!l&&t()};return ke.createPortal(e.jsxs(e.Fragment,{children:[e.jsx("style",{children:Re}),e.jsxs("div",{className:"smm-overlay",onKeyDown:A,tabIndex:-1,children:[e.jsx("div",{className:"smm-backdrop",onClick:l?void 0:t}),e.jsxs("div",{className:"smm-card",role:"dialog","aria-modal":"true","aria-labelledby":"smm-title",children:[e.jsxs("div",{className:"smm-header",children:[e.jsx("div",{className:"smm-eyebrow",children:"Stage transition"}),e.jsx("h2",{className:"smm-title",id:"smm-title",children:"Move opportunity"})]}),e.jsxs("div",{className:"smm-meta",children:[e.jsx("span",{className:"smm-opp-name",children:o.name}),e.jsxs("div",{className:"smm-stage-row",children:[e.jsx("span",{className:`smm-chip smm-chip--from smm-chip--${r}`,children:C}),e.jsx("span",{className:"smm-arrow-track",children:e.jsx("svg",{width:"28",height:"10",viewBox:"0 0 28 10",fill:"none","aria-hidden":"true",children:e.jsx("path",{d:"M1 5h22M19 1l4 4-4 4",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx("span",{className:`smm-chip smm-chip--to smm-chip--${i}`,children:w})]})]}),e.jsx("div",{className:"smm-divider"}),e.jsxs("div",{className:"smm-field",children:[e.jsx("label",{className:"smm-label",htmlFor:"smm-notes",children:"Notes"}),e.jsx("textarea",{id:"smm-notes",className:"smm-textarea",value:u,onChange:n=>d(n.target.value),placeholder:`Why is ${o.name} moving to ${w}? Add context, next steps, or conditions…`,disabled:l,autoFocus:!0,rows:4,maxLength:500}),e.jsxs("div",{className:"smm-char-count",children:[u.length," / 500"]})]}),e.jsxs("div",{className:"smm-footer",children:[s&&e.jsxs("div",{className:"smm-error",role:"alert",children:[e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 12 12",fill:"none","aria-hidden":"true",children:[e.jsx("circle",{cx:"6",cy:"6",r:"5.5",stroke:"currentColor"}),e.jsx("path",{d:"M6 3.5v3M6 8v.5",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round"})]}),s]}),e.jsxs("div",{className:"smm-actions",children:[e.jsx("button",{className:"smm-btn smm-btn--ghost",onClick:t,disabled:l,children:"Cancel"}),e.jsx("button",{className:"smm-btn smm-btn--primary",onClick:()=>b(u),disabled:l,children:l?e.jsxs(e.Fragment,{children:[e.jsx("svg",{className:"smm-spinner",width:"13",height:"13",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:e.jsx("circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"3",strokeDasharray:"31.4",strokeDashoffset:"10",strokeLinecap:"round"})}),"Moving…"]}):e.jsxs(e.Fragment,{children:["Confirm move",e.jsx("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":"true",children:e.jsx("path",{d:"M3 8h10M9 4l4 4-4 4",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})]})})]})]})]})]})]}),document.body)},Oe=({opportunities:o,onSelect:r})=>{const i=[{dot:"#9CA3AF",badge:"rgba(156,163,175,0.12)",brd:"rgba(156,163,175,0.35)"},{dot:"#0369A1",badge:"rgba(37,99,235,0.12)",brd:"rgba(37,99,235,0.35)"},{dot:"#4F46E5",badge:"rgba(79,70,229,0.12)",brd:"rgba(79,70,229,0.35)"},{dot:"#D97706",badge:"rgba(217,119,6,0.12)",brd:"rgba(217,119,6,0.35)"},{dot:"#0891B2",badge:"rgba(8,145,178,0.12)",brd:"rgba(8,145,178,0.35)"},{dot:"#16A34A",badge:"rgba(22,163,74,0.12)",brd:"rgba(22,163,74,0.35)"}],b=()=>R.map(m=>({stageId:m.id,title:m.name,color:m.color,items:o.filter(y=>y.stage===m.id)})),[t,l]=v.useState(b),[s,u]=v.useState(null),[d,C]=v.useState(null),[w,A]=v.useState(null),[k,h]=v.useState(null),[n,D]=v.useState(!1),[x,p]=v.useState(null);v.useEffect(()=>{l(b())},[o]);const N=(m,y,S)=>{C({colIdx:y,cardIdx:S}),m.dataTransfer.effectAllowed="move",m.dataTransfer.setData("text/plain",JSON.stringify({ci:y,ki:S})),setTimeout(()=>m.target.classList.add("dragging"),0)},F=m=>{m.target.classList.remove("dragging"),C(null),A(null)},z=(m,y)=>{d&&y>d.colIdx?(m.preventDefault(),m.dataTransfer.dropEffect="move",A(y)):(m.dataTransfer.dropEffect="none",A(null))},E=m=>{m.currentTarget.contains(m.relatedTarget)||A(null)},$=(m,y)=>{m.preventDefault(),A(null),C(null);const{ci:S,ki:W}=JSON.parse(m.dataTransfer.getData("text/plain"));if(y<=S)return;const O=t[S].items[W];p(null),h({srcCi:S,ki:W,targetCi:y,opp:O,fromStage:t[S].stageId,toStage:t[y].stageId})},T=async m=>{var f;if(!k)return;const{srcCi:y,ki:S,targetCi:W,opp:O,toStage:P}=k,I=((f=R.find(B=>B.id===P))==null?void 0:f.name)??P;D(!0),p(null);try{const B=await ie(`${te()}/opportunities/${O.id}/move`,{method:"PATCH",headers:{...ve(),"Content-Type":"application/json"},body:JSON.stringify({newPhase:I,notes:m})});if(!B.ok){const X=await B.text().catch(()=>"");throw new Error(X||`HTTP ${B.status}`)}const q=t.map(X=>({...X,items:[...X.items]})),[V]=q[y].items.splice(S,1);V.stage=P,V.phase=I,q[W].items.push(V),l(q),h(null)}catch(B){p((B==null?void 0:B.message)??"Move failed. Please try again.")}finally{D(!1)}},K=d!==null;return e.jsxs(e.Fragment,{children:[k&&e.jsx(We,{opportunity:k.opp,fromStage:k.fromStage,toStage:k.toStage,onConfirm:T,onCancel:()=>{h(null),p(null)},loading:n,error:x}),e.jsx("div",{className:"kb-wrap",children:e.jsx("div",{className:"kb-scroll",children:e.jsx("div",{className:"kb-cols",children:t.map((m,y)=>{const S=i[y%i.length],W=w===y,O=K&&y>d.colIdx,P=K&&y<=d.colIdx,I=m.items.reduce((f,B)=>f+B.value,0);return e.jsxs("div",{className:`kb-col${O?" can-drop":""}${P?" no-drop":""}`,style:{"--col-accent":S.dot,"--col-badge-bg":S.badge,"--col-badge-brd":S.brd,"--col-dot-ring":S.badge},children:[e.jsxs("div",{className:"kb-col-head",children:[e.jsx("div",{className:"kb-col-dot"}),e.jsx("div",{className:"kb-col-title",children:m.title}),e.jsx("div",{className:"kb-col-count",children:m.items.length}),e.jsx("div",{className:"kb-col-sum",children:I>0?Y(I):""})]}),e.jsxs("div",{className:`kb-cards${W&&O?" drop-active":""}`,onDrop:f=>$(f,y),onDragOver:f=>z(f,y),onDragLeave:E,children:[e.jsxs("div",{className:"kb-drop-indicator",children:[e.jsx("svg",{width:"11",height:"11",viewBox:"0 0 12 12",fill:"none",children:e.jsx("path",{d:"M6 1v10M1 6h10",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})}),"Drop here"]}),m.items.length===0&&!W&&e.jsxs("div",{className:"kb-empty",children:[e.jsx("div",{className:"kb-empty-icon",children:e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:e.jsx("path",{d:"M6 2v8M2 6h8",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})}),e.jsx("span",{className:"kb-empty-txt",children:"empty"})]}),m.items.map((f,B)=>e.jsxs("div",{draggable:!0,onDragStart:q=>N(q,y,B),onDragEnd:F,className:`kb-card${s===f.id?" on":""}`,onClick:()=>{u(s===f.id?null:f.id),r(f.id)},children:[e.jsxs("div",{className:"kb-drag-handle","aria-hidden":"true",children:[e.jsx("span",{}),e.jsx("span",{}),e.jsx("span",{})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7,marginBottom:4},children:[e.jsx("span",{className:"av "+oe(f.name),style:{width:22,height:22,borderRadius:6,fontSize:9,flexShrink:0},children:Q(f.name)}),e.jsx("div",{className:"kb-card-name",style:{marginBottom:0,paddingRight:0},children:f.name}),e.jsx("div",{className:`kb-card-heat ${f.heat}`,style:{marginLeft:"auto",flexShrink:0}})]}),e.jsx("div",{className:"kb-card-intent",children:f.intent}),e.jsxs("div",{className:"kb-card-foot",children:[e.jsx("span",{className:"kb-card-arr",children:f.value>0?Y(f.value):e.jsx("span",{style:{color:"var(--ink5)"},children:"—"})}),e.jsx("span",{className:"kb-card-spark",children:e.jsx(re,{data:f.signals.slice(-7),width:50,height:14,color:"var(--p)"})})]})]},f.id))]})]},m.stageId)})})})})]})},Pe=({opportunities:o,onSelect:r})=>{var u;const[i,b]=v.useState(null),t=i?o.find(d=>d.id===i):null,l=d=>{const C=R.findIndex(h=>h.id===d.stage),A=10+(C>=0?C:0)/Math.max(R.length-1,1)*78;return{x:8+Math.min(d.cycle/70*84,84),y:A}},s=d=>22+Math.min(34,d.value/51e4*34);return e.jsxs("div",{className:"cv-canvas-full",children:[R.map((d,C)=>{const w=10+C/(R.length-1)*78;return e.jsxs(v.Fragment,{children:[e.jsx("div",{className:"cv-stage-row",style:{top:w+"%"}}),e.jsx("div",{className:"cv-stage-lbl",style:{top:w+"%"},children:d.name}),e.jsx("div",{className:"cv-stage-rail",style:{top:`calc(${w}% - 10px)`,height:"20px",background:d.color,opacity:.45}})]},d.id)}),o.map((d,C)=>{const{x:w,y:A}=l(d),k=s(d);return e.jsxs("div",{className:"cv-deal"+(i===d.id?" on":""),style:{left:w+"%",top:A+"%",animationDelay:C*30+"ms"},onClick:()=>{b(i===d.id?null:d.id),r(d.id)},children:[e.jsx("div",{className:"cv-deal-orb "+d.heat,style:{width:k,height:k,fontSize:Math.max(8,k*.28)},children:Q(d.name)}),e.jsx("div",{className:"cv-deal-amt",children:d.value>0?Y(d.value):""}),e.jsx("div",{className:"cv-deal-label",children:d.name})]},d.id)}),e.jsxs("div",{className:"cv-axis-x",children:[e.jsx("span",{children:"0d in stage"}),e.jsx("span",{children:"30d"}),e.jsx("span",{children:"60d"}),e.jsx("span",{children:"90d+ (stale)"})]}),!i&&e.jsxs("div",{className:"cv-hint",children:[e.jsx("span",{className:"cv-hint-ic",children:e.jsx(g,{name:"info",size:13})}),"Vertical = stage · Horizontal = time-in-stage · Size = deal value · Color = heat — tap an orb to inspect"]}),e.jsxs("div",{className:"cv-float-legend",children:[e.jsx("div",{className:"cv-float-legend-h",children:"Heat"}),e.jsxs("div",{className:"cv-leg-row",children:[e.jsx("span",{className:"o",style:{background:"radial-gradient(circle at 35% 30%,#FF6F87,#E5566C 60%,#B83045)"}}),"Hot — active intent & momentum"]}),e.jsxs("div",{className:"cv-leg-row",children:[e.jsx("span",{className:"o",style:{background:"radial-gradient(circle at 35% 30%,#EFA177,#D97757 60%,#A04E2A)"}}),"Warm — engaged, steady"]}),e.jsxs("div",{className:"cv-leg-row",children:[e.jsx("span",{className:"o",style:{background:"radial-gradient(circle at 35% 30%,#7B9FE8,#4B6FDB 60%,#2E48A0)"}}),"Cool — quiet, may drift"]})]}),t&&e.jsxs("div",{className:"cv-float-inspector",children:[e.jsxs("div",{className:"cv-float-inspector-head",children:[e.jsx("span",{className:"av "+oe(t.name),style:{width:30,height:30,borderRadius:8,fontSize:11},children:Q(t.name)}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{className:"cv-card-h",children:t.name}),e.jsx("div",{className:"mono",style:{fontSize:11,color:"var(--ink4)"},children:t.phase})]}),e.jsx("button",{className:"cv-float-inspector-close",onClick:()=>b(null),children:"×"})]}),e.jsxs("div",{style:{padding:"12px 14px",flex:1},children:[e.jsxs("div",{className:"cv-kv",children:[e.jsx("span",{className:"cv-kv-l",children:"Stage"}),e.jsx("span",{className:"cv-kv-v",children:e.jsx("span",{className:"stage-chip "+t.stage,children:((u=R.find(d=>d.id===t.stage))==null?void 0:u.name)??t.phase})})]}),e.jsxs("div",{className:"cv-kv",children:[e.jsx("span",{className:"cv-kv-l",children:"Deal value"}),e.jsx("span",{className:"cv-kv-v num",children:t.value>0?Y(t.value):"—"})]}),e.jsxs("div",{className:"cv-kv",children:[e.jsx("span",{className:"cv-kv-l",children:"Days in stage"}),e.jsx("span",{className:"cv-kv-v",children:t.cycle>0?`${t.cycle}d`:"—"})]}),e.jsxs("div",{className:"cv-kv",children:[e.jsx("span",{className:"cv-kv-l",children:"Heat"}),e.jsx("span",{className:"cv-kv-v",children:e.jsxs("span",{className:"heat-bub heat-"+t.heat,children:[e.jsx("span",{className:"heat-dot "+t.heat}),t.heat==="hot"?"Hot":t.heat==="warm"?"Warm":"Cool"]})})]}),e.jsxs("div",{className:"cv-kv",children:[e.jsx("span",{className:"cv-kv-l",children:"Last touch"}),e.jsx("span",{className:"cv-kv-v",children:t.lastTouch})]}),e.jsxs("div",{className:"cv-kv",children:[e.jsx("span",{className:"cv-kv-l",children:"Deal type"}),e.jsx("span",{className:"cv-kv-v",children:t.intent})]}),e.jsxs("div",{className:"cv-kv",children:[e.jsx("span",{className:"cv-kv-l",children:"Health"}),e.jsx("span",{className:"cv-kv-v",children:t.health})]}),e.jsxs("div",{className:"cv-kv",children:[e.jsx("span",{className:"cv-kv-l",children:"Signals 14d"}),e.jsx("span",{className:"cv-kv-v",children:e.jsx(re,{data:t.signals,width:120,height:18,color:"var(--p)"})})]})]}),e.jsxs("div",{style:{padding:12,borderTop:"0.5px solid var(--brd)",display:"flex",gap:5,flexWrap:"wrap",flexShrink:0},children:[e.jsxs("button",{className:"btn sm pri",children:[e.jsx(g,{name:"mail",size:12})," Email"]}),e.jsxs("button",{className:"btn sm",children:[e.jsx(g,{name:"calendar",size:12})," Meeting"]}),e.jsxs("button",{className:"btn sm",children:[e.jsx(g,{name:"sparkles",size:12})," Plan next step"]})]})]})]})},qe=({opportunities:o,onSelect:r})=>e.jsx("div",{className:"blv",style:{flex:1,overflowY:"auto",minHeight:0},children:e.jsx("div",{className:"card",style:{overflow:"hidden",margin:16},children:e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:12.5},children:[e.jsx("thead",{children:e.jsx("tr",{children:["Opportunity","Phase","Deal value","Heat","Days in Stage","Deal type"].map(i=>e.jsx("th",{style:{textAlign:"left",padding:"9px 14px",color:"var(--ink5)",fontSize:10,textTransform:"uppercase",letterSpacing:".07em",borderBottom:"0.5px solid var(--brd)"},children:i},i))})}),e.jsxs("tbody",{children:[o.map(i=>{var b;return e.jsxs("tr",{style:{cursor:"pointer"},onClick:()=>r(i.id),children:[e.jsx("td",{style:{padding:"12px 14px",borderBottom:"0.5px solid var(--brd)"},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("div",{className:"av "+oe(i.name),style:{width:34,height:34,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700},children:Q(i.name)}),e.jsxs("div",{children:[e.jsx("div",{className:"fz13 fw6 t-ink",children:i.name}),e.jsx("div",{className:"fz11 t-ink5",children:i.intent})]})]})}),e.jsx("td",{style:{padding:"12px 14px",borderBottom:"0.5px solid var(--brd)"},children:e.jsx("span",{className:"stage-chip "+i.stage,children:((b=R.find(t=>t.id===i.stage))==null?void 0:b.name)??i.phase})}),e.jsx("td",{className:"mono",style:{padding:"12px 14px",borderBottom:"0.5px solid var(--brd)"},children:i.value>0?Y(i.value):"—"}),e.jsx("td",{style:{padding:"12px 14px",borderBottom:"0.5px solid var(--brd)"},children:e.jsxs("span",{className:"heat-bub heat-"+i.heat,children:[e.jsx("span",{className:"heat-dot "+i.heat}),i.heat==="hot"?"Hot":i.heat==="warm"?"Warm":"Cool"]})}),e.jsx("td",{style:{padding:"12px 14px",borderBottom:"0.5px solid var(--brd)"},children:i.cycle>0?`${i.cycle}d`:"—"}),e.jsx("td",{style:{padding:"12px 14px",borderBottom:"0.5px solid var(--brd)",color:"var(--ink4)"},children:i.intent})]},i.id)}),o.length===0&&e.jsx("tr",{children:e.jsx("td",{colSpan:6,style:{padding:"40px 14px",textAlign:"center",color:"var(--ink5)",fontSize:13},children:"No opportunities found."})})]})]})})})}),Ge=()=>{const[o,r]=v.useState("kanban"),[i,b]=v.useState(!1),[t,l]=v.useState(null),[s,u]=v.useState(null),[d,C]=v.useState(540),[w,A]=v.useState([]),[k,h]=v.useState(!0),[n,D]=v.useState(null);v.useEffect(()=>{let p=document.getElementById("cv-styles");p||(p=document.createElement("style"),p.id="cv-styles",document.head.appendChild(p)),p.textContent=Fe},[]),v.useEffect(()=>{h(!0),D(null),ie(`${te()}/opportunities`,{headers:ve()}).then(p=>{if(!p.ok)throw new Error(`${p.status}`);return p.json()}).then(p=>{const N=(Array.isArray(p)?p:[p]).filter(F=>!F.isDeleted).map($e);A(N)}).catch(p=>D(p.message)).finally(()=>h(!1))},[]);const x=w.reduce((p,N)=>p+N.value,0);return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"cv",children:[e.jsxs("div",{className:"cv-hdr",children:[e.jsx("div",{className:"cv-hdr-h",children:"Opportunity"}),e.jsx("div",{className:"cv-hdr-meta",children:k?"Loading…":n?"Error loading":`${w.length} active${x>0?` · ${Y(x)}`:""}`}),!k&&(n?e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:4,fontFamily:'"DM Mono",monospace',fontSize:9,color:"var(--ink5)",background:"var(--bg3)",border:"0.5px solid var(--brd)",borderRadius:5,padding:"2px 7px"},title:n,children:[e.jsx(g,{name:"wifi-off",size:9})," offline"]}):e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:4,fontFamily:'"DM Mono",monospace',fontSize:9,color:"#1A9E7C",background:"rgba(29,196,160,0.07)",border:"0.5px solid #1A9E7C",borderRadius:5,padding:"2px 7px"},children:[e.jsx("span",{style:{width:5,height:5,borderRadius:"50%",background:"#1A9E7C",animation:"api-pulse 1.8s ease-in-out infinite",display:"inline-block"}})," ","live"]})),e.jsxs("div",{className:"cv-toggle",children:[e.jsxs("button",{className:"cv-toggle-it"+(o==="kanban"?" on":""),onClick:()=>r("kanban"),children:[e.jsx(g,{name:"columns-3",size:12})," Board"]}),e.jsxs("button",{className:"cv-toggle-it"+(o==="list"?" on":""),onClick:()=>r("list"),children:[e.jsx(g,{name:"list",size:12})," List"]}),e.jsxs("button",{className:"cv-toggle-it"+(o==="constellation"?" on":""),onClick:()=>r("constellation"),children:[e.jsx(g,{name:"orbit",size:12})," Constellation"]})]}),e.jsxs("div",{className:"cv-tools",children:[e.jsxs("button",{className:"cv-axisbtn",children:[e.jsx(g,{name:"circle",size:11})," Size: Value"]}),e.jsxs("button",{className:"cv-axisbtn",children:[e.jsx(g,{name:"palette",size:11})," Color: Heat"]}),e.jsxs("button",{className:"cv-axisbtn",children:[e.jsx(g,{name:"filter",size:11})," All owners"]}),e.jsxs("button",{className:"btn sm pri",onClick:()=>b(!0),children:[e.jsx(g,{name:"plus",size:12})," New deal"]})]})]}),k?e.jsx(Ie,{}):n?e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,color:"var(--ink4)",fontSize:13},children:[e.jsx(g,{name:"wifi-off",size:32}),e.jsx("div",{style:{fontWeight:600,color:"var(--ink3)",fontSize:14},children:"Could not load opportunities"}),e.jsx("div",{style:{fontSize:12,color:"var(--ink5)",maxWidth:280,textAlign:"center"},children:n}),e.jsxs("button",{className:"btn sm",onClick:()=>window.location.reload(),children:[e.jsx(g,{name:"refresh-cw",size:12})," Retry"]})]}):e.jsxs(e.Fragment,{children:[o==="constellation"&&e.jsx(Pe,{opportunities:w,onSelect:p=>u(w.find(N=>N.id===p)||null)}),o==="kanban"&&e.jsx(Oe,{opportunities:w,onSelect:p=>u(w.find(N=>N.id===p)||null)}),o==="list"&&e.jsx(qe,{opportunities:w,onSelect:p=>u(w.find(N=>N.id===p)||null)})]}),i&&e.jsx("div",{style:{position:"fixed",top:0,right:0,width:"480px",height:"100vh",background:"var(--bg)",boxShadow:"-8px 0 30px rgba(0,0,0,0.12)",zIndex:9999,animation:"slideInRight 0.25s ease",overflowY:"auto"},children:e.jsx(Ne,{onClose:()=>b(!1),open:!1})}),e.jsx(ye,{accountId:t,onClose:()=>l(null)}),s&&e.jsx(Ae,{opp:s,onClose:()=>u(null),panelWidth:d,onResizeStart:p=>{p.preventDefault();const N=p.clientX,F=d,z=$=>C(Math.max(320,Math.min(window.innerWidth*.9,F+(N-$.clientX)))),E=()=>{window.removeEventListener("mousemove",z),window.removeEventListener("mouseup",E)};window.addEventListener("mousemove",z),window.addEventListener("mouseup",E)}})]})})};export{Ge as default};
