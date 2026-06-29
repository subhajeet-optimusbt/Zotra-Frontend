import{r as o,j as e,d as Se}from"./vendor-react-DTmZBiFG.js";import{I as r}from"./AppShell-DczK4XpG.js";import{g as te,a as se,b as re}from"./api-BR5LSxT6.js";import"./index-C07rrmDM.js";import"./vendor-icons-BGVXKQIZ.js";function ae(a){const l=a.trim().split(/[,\-\u2013\u2014.]/)[0].trim();return l.charAt(0).toUpperCase()+l.slice(1)||"New Customer"}const qe=`
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
`,he=["Hartwell Ortho","Peak Studio","Northwind Trading","Clearview Digital","Proval Consulting"],ze=[{name:"Hartwell Ortho",industry:"Healthcare",size:"30"},{name:"Peak Studio",industry:"Design",size:"22"},{name:"Northwind Trading",industry:"Logistics",size:"180"},{name:"Clearview Digital",industry:"Digital Agency",size:"65"},{name:"Proval Consulting",industry:"Consulting",size:"120"}],ge=[{id:"marketwake",label:"SEO retainer proposal",co:"Marketwake",type:"Proposal",value:"$96K",accentColor:"#5552C9",accentBg:"#EEEDF9",from:"Acme Agency",to:"Marketwake",contact:"David Chen, Head of Marketing",date:"19 May 2026",ref:"PROP-2026-042",term:"12 months",start:"1 June 2026",intro:"Following our initial discovery call, we are pleased to submit this proposal for a 12-month SEO and content retainer. Marketwake has strong domain authority and a clear brief — we believe this programme will drive measurable pipeline within 90 days.",scope:[{item:"Technical SEO audit and remediation",detail:"Full crawl, Core Web Vitals, schema markup"},{item:"Monthly content production",detail:"8 long-form articles targeting high-intent terms"},{item:"Link building",detail:"6–8 quality placements per month"},{item:"Reporting and strategy review",detail:"Monthly dashboard + quarterly QBR"}],pricing:[{line:"SEO retainer",qty:"12 months",rate:"$7,200/mo",total:"$86,400"},{line:"Content top-up",qty:"12 articles",rate:"$450 each",total:"$5,400"},{line:"Technical audit",qty:"1 project",rate:"fixed",total:"$4,200"}],total:"$96,000",note:"Audit invoiced at project start. Monthly retainer from month 1."},{id:"canpango",label:"Content and SEO proposal",co:"Canpango",type:"Proposal",value:"$27.9K",accentColor:"#7A4EDB",accentBg:"#F0EBFB",from:"Acme Agency",to:"Canpango",contact:"Mike Alvarez, Head of Growth",date:"17 May 2026",ref:"PROP-2026-043",term:"6 months",start:"1 July 2026",intro:"Following your enquiry, we are pleased to submit this proposal for SEO and content services. Canpango is entering a competitive SaaS search landscape and we believe a focused 6-month programme will establish clear organic authority in your category.",scope:[{item:"Keyword research and opportunity mapping",detail:"Category analysis, competitor gap, priority keyword set"},{item:"On-page SEO",detail:"Title tags, meta, heading structure, internal linking across site"},{item:"Content production",detail:"8 long-form articles per month targeting high-intent terms"},{item:"Weekly performance reporting",detail:"Keyword rankings, organic sessions, conversion tracking"}],pricing:[{line:"SEO and content retainer",qty:"6 months",rate:"$3,800/mo",total:"$22,800"},{line:"Onboarding and site audit",qty:"1 project",rate:"fixed",total:"$2,400"},{line:"Content top-up",qty:"12 articles",rate:"$225 each",total:"$2,700"}],total:"$27,900",note:"Onboarding invoiced at project start. Retainer monthly."},{id:"proval",label:"Content and paid search proposal",co:"Proval Consulting",type:"Proposal",value:"$54K",accentColor:"var(--ink2)",accentBg:"#EFEFF7",from:"Acme Agency",to:"Proval Consulting",contact:"Jane Crawford, Marketing Director",date:"18 May 2026",ref:"PROP-2026-044",term:"12 months",start:"1 June 2026",intro:"Referred by David Chen at Marketwake, we are delighted to submit this proposal. Proval Consulting is looking to build brand authority through thought leadership content and generate qualified leads through paid search.",scope:[{item:"Thought leadership content",detail:"2 long-form articles and 1 case study per month"},{item:"Google Ads management",detail:"Campaign setup, keyword bidding, ad copy, monthly optimisation"},{item:"LinkedIn Ads",detail:"Sponsored content targeting finance and operations leaders"},{item:"Monthly reporting and strategy review",detail:"Lead volume, cost per lead, content performance"}],pricing:[{line:"Content retainer",qty:"12 months",rate:"$2,200/mo",total:"$26,400"},{line:"Google Ads management",qty:"12 months",rate:"$1,800/mo",total:"$21,600"},{line:"LinkedIn Ads management",qty:"12 months",rate:"$500/mo",total:"$6,000"}],total:"$54,000",note:"Ad spend billed directly to client. Management fees only."}],ie=[{id:"thread",ic:"mail",icBg:"var(--pp)",icFg:"var(--p)",label:"Analyse one thread",desc:"Paste or forward one email conversation",bullets:["Finds gaps, risks, and next actions instantly","No connection needed · takes 30 seconds"],recommended:!0,cta:"Paste a thread"},{id:"upload",ic:"file-text",icBg:"var(--tp)",icFg:"var(--td)",label:"Upload a document",desc:"Drop a proposal, SOW, invoice, or contract",bullets:["Extracts scope, pricing, stakeholders, timeline","No connection needed · takes 60 seconds"],recommended:!1,cta:"Upload a file"},{id:"empty",ic:"plus-circle",icBg:"var(--bg3)",icFg:"var(--ink3)",label:"Start empty",desc:"Name a customer and open a blank workspace",bullets:["Add notes, logs, and context as you go","Zero setup · always available"],recommended:!1,cta:"Name a customer"},{id:"tour",ic:"compass",icBg:"var(--amberp)",icFg:"var(--amber)",label:"Quick tour",desc:"Browse a live workspace with sample data",bullets:["See Pulse, Opportunities, Renewals, Finance at maturity","No setup · sample data only"],recommended:!1,cta:"Start tour",dashed:!0}],fe=({doc:a})=>e.jsxs("div",{style:{background:"#fff",borderRadius:6,boxShadow:"0 1px 6px rgba(0,0,0,.09), 0 0 0 .5px rgba(0,0,0,.06)",overflow:"hidden"},children:[e.jsxs("div",{style:{background:a.accentColor,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:'"Sora",sans-serif',fontSize:14,fontWeight:700,color:"#fff"},children:"Proposal"}),e.jsxs("div",{style:{fontSize:10.5,color:"rgba(255,255,255,.7)",marginTop:2},children:[a.type," · ",a.co]})]}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsx("div",{style:{fontSize:10,fontFamily:'"DM Mono",monospace',color:"rgba(255,255,255,.6)"},children:a.ref}),e.jsx("div",{style:{fontSize:10,color:"rgba(255,255,255,.5)",marginTop:1},children:a.date})]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",borderBottom:".5px solid #eee"},children:[{l:"Prepared by",v:a.from},{l:"Prepared for",v:a.to},{l:"Contact",v:a.contact},{l:"Term / Start",v:`${a.term} · ${a.start}`}].map((l,p)=>e.jsxs("div",{style:{padding:"10px 18px",borderRight:p%2===0?".5px solid #eee":"none",borderBottom:p<2?".5px solid #eee":"none"},children:[e.jsx("div",{style:{fontSize:"9px",fontWeight:600,letterSpacing:".09em",textTransform:"uppercase",color:"#aaa",marginBottom:3},children:l.l}),e.jsx("div",{style:{fontSize:11.5,fontWeight:600,color:"#111"},children:l.v})]},p))}),e.jsxs("div",{style:{padding:"12px 18px",borderBottom:".5px solid #eee"},children:[e.jsx("div",{style:{fontSize:"9px",fontWeight:600,letterSpacing:".09em",textTransform:"uppercase",color:"#aaa",marginBottom:5},children:"Introduction"}),e.jsx("div",{style:{fontSize:11.5,color:"#444",lineHeight:1.65},children:a.intro})]}),e.jsxs("div",{style:{padding:"12px 18px",borderBottom:".5px solid #eee"},children:[e.jsx("div",{style:{fontSize:"9px",fontWeight:600,letterSpacing:".09em",textTransform:"uppercase",color:"#aaa",marginBottom:8},children:"Scope of work"}),a.scope.map((l,p)=>e.jsxs("div",{style:{display:"flex",gap:9,padding:"6px 0",borderBottom:p<a.scope.length-1?".5px solid #f0f0f0":"none"},children:[e.jsx("div",{style:{width:17,height:17,borderRadius:4,background:"#EEEDF9",color:"#5552C9",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:9,fontWeight:700,marginTop:1},children:p+1}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:11.5,fontWeight:600,color:"#111",marginBottom:1},children:l.item}),e.jsx("div",{style:{fontSize:10.5,color:"#777"},children:l.detail})]})]},p))]}),e.jsxs("div",{style:{padding:"12px 18px"},children:[e.jsx("div",{style:{fontSize:"9px",fontWeight:600,letterSpacing:".09em",textTransform:"uppercase",color:"#aaa",marginBottom:8},children:"Investment"}),a.pricing.map((l,p)=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",gap:8,fontSize:11.5,padding:"5px 0",borderBottom:".5px solid #f0f0f0"},children:[e.jsx("span",{style:{color:"#333",flex:1},children:l.line}),e.jsxs("span",{style:{color:"#888",flexShrink:0,fontSize:10.5},children:[l.qty," · ",l.rate]}),e.jsx("span",{style:{color:"#111",fontWeight:600,flexShrink:0},children:l.total})]},p)),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:8,paddingTop:8,borderTop:"1.5px solid #ddd"},children:[e.jsx("span",{style:{fontSize:12,fontWeight:700,color:"#111"},children:"Total"}),e.jsx("span",{style:{fontSize:13,fontWeight:700,color:"#5552C9"},children:a.total})]}),e.jsx("div",{style:{fontSize:10.5,color:"#aaa",marginTop:6},children:a.note})]})]}),Ne=({inputText:a,setInputText:l,handleEmpty:p})=>{const[h,f]=o.useState(""),[g,B]=o.useState(0),[u,F]=o.useState(0),[v,q]=o.useState(!1),[T,O]=o.useState([0,0,0]),[y,j]=o.useState([!1,!1,!1]),[$,w]=o.useState(!1),z=o.useRef(null),m=a.trim(),L=m?m.split(" ").slice(0,2).map(i=>i[0]||"").join("").toUpperCase():"",k=["#5552C9","#1A9E7C","#D97757","#3F75DC","#7A4EDB"],D=m?k[m.charCodeAt(0)%k.length]:k[0];o.useEffect(()=>{if(a)return;const i=he[g];if(!v&&u<=i.length){const n=setTimeout(()=>{f(i.slice(0,u)),F(b=>b+1)},u===0?600:80);return()=>clearTimeout(n)}if(!v&&u>i.length){const n=setTimeout(()=>q(!0),1400);return()=>clearTimeout(n)}if(v&&u>0){const n=setTimeout(()=>{f(i.slice(0,u-1)),F(b=>b-1)},40);return()=>clearTimeout(n)}v&&u===0&&(q(!1),B(n=>(n+1)%he.length))},[a,u,v,g]),o.useEffect(()=>{if(m.length>=2){w(!0);const i=setTimeout(()=>O([Math.floor(30+Math.random()*50),Math.floor(20+Math.random()*40),0]),300),n=setTimeout(()=>j([!0,!1,!1]),600),b=setTimeout(()=>j([!0,!0,!1]),900),H=setTimeout(()=>j([!0,!0,!0]),1200);return()=>[i,n,b,H].forEach(clearTimeout)}else w(!1),O([0,0,0]),j([!1,!1,!1])},[m]);const W=[{l:"Relationship",color:"#D97757"},{l:"Deal health",color:"#D97757"},{l:"Renewal risk",color:"var(--ink4)"}],A=["Budget presence unclear","Decision-maker not confirmed","Timeline not captured"];return e.jsxs("div",{children:[e.jsxs("div",{className:"qs-input-card",children:[e.jsxs("div",{style:{padding:"20px 22px 16px"},children:[e.jsx("div",{style:{fontSize:11,fontWeight:600,color:"var(--ink4)",marginBottom:10,letterSpacing:".02em"},children:"Customer or company name"}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx("input",{ref:z,style:{width:"100%",height:52,padding:"0 52px 0 16px",fontSize:18,fontFamily:'"Sora",sans-serif',fontWeight:600,letterSpacing:"-.02em",border:"1.5px solid var(--brd2)",borderRadius:12,background:"var(--bg)",color:"var(--ink)",outline:"none",transition:"border-color .15s, box-shadow .15s",boxSizing:"border-box"},placeholder:h||"e.g. Acme Corp",value:a,onChange:i=>l(i.target.value),onFocus:i=>{i.target.style.borderColor="var(--p)",i.target.style.boxShadow="0 0 0 3px rgba(75,72,200,.09)"},onBlur:i=>{i.target.style.borderColor="var(--brd2)",i.target.style.boxShadow="none"},onKeyDown:i=>{i.key==="Enter"&&a.trim()&&p()},autoFocus:!0}),m&&e.jsx("div",{style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",width:30,height:30,borderRadius:8,background:D,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#fff"},children:L})]}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6,marginTop:12},children:ze.map((i,n)=>e.jsxs("button",{onClick:()=>{l(i.name),setTimeout(()=>{var b;return(b=z.current)==null?void 0:b.focus()},50)},style:{display:"inline-flex",alignItems:"center",gap:6,height:28,padding:"0 11px",borderRadius:20,background:a===i.name?"var(--pp)":"var(--bg3)",border:a===i.name?"1px solid var(--p)":".5px solid var(--brd2)",fontSize:11.5,color:a===i.name?"var(--p)":"var(--ink3)",fontFamily:"inherit",cursor:"pointer",transition:"all .12s",fontWeight:a===i.name?600:400},children:[e.jsx("span",{style:{fontSize:9,fontFamily:'"DM Mono",monospace',color:a===i.name?"var(--p)":"var(--ink5)",fontWeight:600},children:i.industry}),i.name]},n))})]}),e.jsx("div",{style:{borderTop:".5px solid var(--brd)",padding:"14px 22px 16px",background:$?"linear-gradient(135deg,var(--pp) 0%,var(--bg2) 60%)":"var(--bg3)",transition:"background .4s"},children:$?e.jsxs("div",{style:{animation:"qs-fadein .3s ease-out"},children:[e.jsxs("div",{className:"qs-ws-preview-row",children:[e.jsx("div",{style:{width:28,height:28,borderRadius:8,background:D,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#fff",flexShrink:0},children:L}),e.jsx("div",{style:{fontFamily:'"Sora",sans-serif',fontSize:15,fontWeight:650,color:"var(--ink)",letterSpacing:"-.02em",flex:1},children:m}),e.jsx("span",{style:{fontSize:9.5,fontFamily:'"DM Mono",monospace',fontWeight:600,padding:"2px 8px",borderRadius:5,background:"var(--p)",color:"#fff",letterSpacing:".04em",textTransform:"uppercase"},children:"New workspace"})]}),e.jsx("div",{className:"qs-ws-health-row",children:W.map((i,n)=>e.jsxs("div",{className:"qs-ws-health-card",children:[e.jsx("div",{style:{fontSize:"9px",fontWeight:600,letterSpacing:".07em",textTransform:"uppercase",color:"var(--ink5)",marginBottom:4},children:i.l}),e.jsx("div",{style:{fontFamily:'"Sora",sans-serif',fontSize:18,fontWeight:650,color:T[n]>0?i.color:"var(--ink6)",transition:"color .4s",letterSpacing:"-.02em"},children:T[n]>0?T[n]:"—"}),e.jsx("div",{style:{height:3,background:"var(--bg3)",borderRadius:2,overflow:"hidden",marginTop:5},children:e.jsx("div",{style:{width:T[n]+"%",height:"100%",background:i.color,borderRadius:2,transition:"width .6s ease-out"}})})]},n))}),e.jsx("div",{style:{fontSize:"9px",fontWeight:600,letterSpacing:".08em",textTransform:"uppercase",color:"var(--ink5)",marginBottom:6},children:"Open gaps — Zotra is asking"}),A.map((i,n)=>e.jsxs("div",{className:"qs-gap-row",style:{background:y[n]?"var(--wab)":"var(--bg3)",border:y[n]?".5px solid rgba(193,123,42,.2)":".5px solid var(--brd)",opacity:y[n]?1:.3,transform:y[n]?"translateX(0)":"translateX(-8px)"},children:[e.jsx("div",{style:{width:16,height:16,borderRadius:4,background:y[n]?"var(--wa)":"var(--ink6)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"background .3s"},children:e.jsx(r,{name:"circle-alert",size:9})}),e.jsx("div",{style:{fontSize:11.5,fontWeight:500,color:y[n]?"var(--ink)":"var(--ink5)"},children:i}),e.jsx("div",{style:{marginLeft:"auto",fontSize:10,fontFamily:'"DM Mono",monospace',color:"var(--wa)",fontWeight:600,opacity:y[n]?1:0},children:"gap"})]},n))]}):e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,opacity:.5},children:[e.jsx("div",{style:{width:28,height:28,borderRadius:8,background:"var(--brd)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(r,{name:"building-2",size:14})}),e.jsx("div",{style:{fontSize:12,color:"var(--ink5)",fontStyle:"italic"},children:"Your workspace will appear here as you type…"})]})}),e.jsx("div",{style:{padding:"12px 22px",borderTop:".5px solid var(--brd)",display:"flex",gap:8,alignItems:"center"},children:e.jsxs("button",{className:"btn pri",style:{height:36,flex:1,justifyContent:"center",opacity:m?1:.45,transition:"opacity .2s"},disabled:!m,onClick:p,children:[e.jsx(r,{name:"arrow-right",size:13})," Open ",m||"workspace"]})})]}),e.jsx("div",{style:{fontSize:11.5,color:"var(--ink5)",textAlign:"center",lineHeight:1.6},children:"Zotra starts with zero data and builds commercial memory as you log interactions."})]})},Ce=({parsed:a,health:l,gaps:p})=>e.jsxs("div",{className:"qs-health-wrap",children:[e.jsxs("div",{className:"qs-health-name",children:[a,e.jsx("span",{style:{fontSize:10,fontFamily:'"DM Mono",monospace',fontWeight:600,padding:"2px 8px",borderRadius:5,background:"var(--p)",color:"#fff",letterSpacing:".04em",textTransform:"uppercase"},children:"New workspace"})]}),e.jsx("div",{style:{fontSize:12,color:"var(--ink4)"},children:"Zotra is filling gaps in the background"}),e.jsx("div",{className:"qs-health-cards",children:l.map((h,f)=>e.jsxs("div",{className:"qs-health-card",children:[e.jsx("div",{style:{fontSize:"9.5px",fontWeight:600,letterSpacing:".07em",textTransform:"uppercase",color:"var(--ink5)",marginBottom:5},children:h.l}),e.jsx("div",{style:{fontFamily:'"Sora",sans-serif',fontSize:20,fontWeight:650,letterSpacing:"-.02em",color:h.color},children:h.v}),e.jsx("div",{style:{height:3,background:"var(--bg3)",borderRadius:2,overflow:"hidden",marginTop:5},children:e.jsx("div",{style:{width:`${h.fill}%`,height:"100%",borderRadius:2,background:h.color,transition:"width .7s ease-out"}})})]},f))}),p.length>0&&e.jsxs("div",{style:{marginTop:14},children:[e.jsx("div",{style:{fontSize:"9.5px",fontWeight:600,letterSpacing:".08em",textTransform:"uppercase",color:"var(--ink5)",marginBottom:6},children:"Open gaps"}),p.map((h,f)=>e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:9,padding:"9px 12px",background:"var(--wab)",border:".5px solid rgba(193,123,42,.2)",borderRadius:9,marginBottom:5},children:[e.jsx("div",{style:{width:20,height:20,borderRadius:5,background:"var(--wa)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1},children:e.jsx(r,{name:"circle-alert",size:11})}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:12,fontWeight:600,color:"var(--ink)"},children:h.t}),e.jsx("div",{style:{fontSize:11,color:"var(--ink4)",marginTop:1,lineHeight:1.4},children:h.s})]})]},f))]})]}),P=({children:a})=>e.jsx("div",{className:"qs-shell",children:e.jsx("div",{className:"qs-scroll",children:e.jsx("div",{className:"qs-inner",children:a})})}),De=({setView:a,setTenantAge:l,setOpenAcc:p})=>{const[h,f]=o.useState(0),[g,B]=o.useState(null),[u,F]=o.useState(""),[v,q]=o.useState(null),[T]=o.useState([{l:"Relationship",v:"—",color:"var(--ink5)",fill:0},{l:"Deal health",v:"—",color:"var(--ink5)",fill:0},{l:"Renewal risk",v:"—",color:"var(--ink5)",fill:0}]),[O]=o.useState([{t:"Budget presence unclear",s:"Add a deal value or mention budget to resolve this."},{t:"Decision-maker not confirmed",s:"Who has the final say? Log the contact name to close this."},{t:"Timeline not captured",s:"When is the decision expected?"}]),[y,j]=o.useState(null),[$,w]=o.useState(null),[z,m]=o.useState(null),[L,k]=o.useState(!1),[D,W]=o.useState(""),[A,i]=o.useState([]),[n,b]=o.useState(!1),[H,oe]=o.useState(!1),[N,C]=o.useState(null),[J,Z]=o.useState(null),[Q,X]=o.useState("compose"),[R,M]=o.useState({from:"",subject:""}),[Be,ne]=o.useState(""),[E,K]=o.useState(""),[ue,U]=o.useState(!1),[V,le]=o.useState(!1),[ee,Y]=o.useState(null),de=()=>{try{const t=localStorage.getItem("zotra_saved_session");if(!t)return"";const s=JSON.parse(t);return Date.now()-(s.savedAt??0)>30*24*60*60*1e3?"":s.tenantId??""}catch{return""}},ce=o.useCallback(async()=>{b(!0);try{const t=te(),s=de(),d=new URLSearchParams;s&&d.set("partitionKey",s);const c=d.toString()?`?${d.toString()}`:"",x=await se(`${re()}/demo/inbox${c}`,{headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}}});if(!x.ok)throw new Error(`HTTP ${x.status}`);const S=await x.json();i(S)}catch{i([])}finally{b(!1)}},[]),be=async t=>{oe(!0),C(null);try{const s=te(),d=t.partitionKey||de(),c=new URLSearchParams({inboxId:t.rowKey});d&&c.set("partitionKey",d);const x=await se(`${re()}/demo/intake-email?${c.toString()}`,{method:"POST",headers:{...s?{Authorization:`Bearer ${s}`}:{}}});let S={};try{S=await x.json()}catch{}const I=S.success??x.ok;if(C({success:I,message:S.message??(x.ok?"Demo intake queued successfully.":`Request failed (${x.status}).`),zotrademoId:S.zotrademoId}),I){const _=ae(t.fromName||t.from||t.subject||"Customer");q(_),W(_)}}catch(s){console.error("[handleAnalyseApiForItem]",s),C({success:!1,message:s instanceof Error?s.message:"Network error"})}finally{oe(!1)}},ve=async()=>{if(E.trim()){le(!0),Y(null);try{const t=te(),s=await se(`${re()}/demo/compose-email`,{method:"POST",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}},body:JSON.stringify({from:R.from,to:"info@zotra.com",subject:R.subject,content:E})});let d={};try{d=await s.json()}catch{}const c=d.success??s.ok;if(Y({success:c,message:d.message??(s.ok?"Email sent successfully.":`Request failed (${s.status}).`)}),c){U(!0);const x=ae(R.from||R.subject||"Customer");q(x),W(x)}}catch(t){Y({success:!1,message:t instanceof Error?t.message:"Network error"})}finally{le(!1)}}},pe=new Date().getHours(),ye=pe<12?"Good morning":pe<17?"Good afternoon":"Good evening";o.useEffect(()=>{if(document.getElementById("qs-styles"))return;const t=document.createElement("style");return t.id="qs-styles",t.textContent=qe,document.head.appendChild(t),()=>{var s;(s=document.getElementById("qs-styles"))==null||s.remove()}},[]),o.useEffect(()=>{(g==="thread"||g==="connect")&&h===1&&(ce(),C(null),Z(null))},[g,h,ce]);const G=t=>{l==null||l("week1"),a==null||a("accounts"),setTimeout(()=>p==null?void 0:p(null),80)},je=()=>{if(!u.trim())return;const t=ae(u);q(t),W(t),k(!0)};if(h===0)return e.jsxs(P,{children:[e.jsxs("div",{className:"qs-hero",children:[e.jsx("div",{className:"qs-hero-orb1"}),e.jsx("div",{className:"qs-hero-orb2"}),e.jsxs("div",{className:"qs-hero-body",children:[e.jsxs("div",{className:"qs-hero-eyebrow",children:[e.jsx("span",{className:"qs-hero-dot"}),ye," · Zotra is ready"]}),e.jsxs("div",{className:"qs-hero-title",children:["Hi. Pick one customer",e.jsx("br",{}),e.jsx("span",{style:{opacity:.75},children:"No connections needed to begin."})]}),e.jsx("div",{className:"qs-hero-pills",children:[{ic:"check",l:"No inbox needed"},{ic:"check",l:"Takes 30 seconds"},{ic:"check",l:"You approve everything"}].map((t,s)=>e.jsxs("span",{className:"qs-hero-pill",children:[e.jsx(r,{name:t.ic,size:11}),t.l]},s))})]})]}),e.jsx("div",{className:"qs-cards",children:ie.map(t=>e.jsxs("div",{className:`qs-card${t.recommended?" qs-card-recommended":""}`,style:{border:t.recommended?void 0:t.dashed?"1.5px dashed var(--brd2)":".5px solid var(--brd)",boxShadow:t.dashed?"none":"var(--sh-s)"},onClick:()=>{B(t.id),f(1)},children:[t.recommended&&e.jsx("span",{className:"qs-recommended-badge",children:"Recommended"}),e.jsx("div",{className:"qs-card-ic",style:{background:t.icBg,color:t.icFg},children:e.jsx(r,{name:t.ic,size:18})}),e.jsxs("div",{className:"qs-card-body",children:[e.jsx("div",{className:"qs-card-title",children:t.label}),e.jsx("div",{className:"qs-card-desc",children:t.desc}),e.jsx("div",{className:"qs-card-bullets",children:t.bullets.map((s,d)=>e.jsxs("div",{className:"qs-card-bullet",children:[e.jsx("span",{className:"qs-card-bullet-dot"}),s]},d))})]}),e.jsx("div",{className:"qs-card-chev",children:e.jsx(r,{name:"chevron-right",size:16})})]},t.id))}),e.jsxs("div",{className:"qs-footer-links",children:["Already have data elsewhere?"," ",["Connect CRM","Import CSV","Connect inbox"].map((t,s)=>e.jsxs(Se.Fragment,{children:[s>0&&e.jsx("span",{className:"qs-footer-sep",children:"·"}),e.jsx("span",{className:"qs-footer-link",onClick:()=>{B("connect"),f(1)},children:t})]},t))]})]});if(L)return e.jsxs(P,{children:[e.jsxs("div",{className:"qs-submitted-hero",children:[e.jsx("div",{className:"qs-submitted-ic",children:e.jsx(r,{name:"sparkles",size:24})}),e.jsx("div",{style:{fontFamily:'"Sora",sans-serif',fontSize:22,fontWeight:650,letterSpacing:"-.025em",color:"var(--ink)",marginBottom:8},children:"Zotra is building your workspace"}),e.jsxs("div",{style:{fontSize:13.5,color:"var(--ink3)",lineHeight:1.6,maxWidth:380,margin:"0 auto 28px"},children:["Scanning for signals, extracting context, and opening a workspace for"," ",e.jsx("strong",{style:{color:"var(--ink)",fontWeight:600},children:D}),"."]}),e.jsxs("button",{className:"btn pri",style:{height:44,fontSize:14,padding:"0 28px",borderRadius:12},onClick:()=>G(),children:[e.jsx(r,{name:"arrow-right",size:15})," Open ",D," workspace"]}),e.jsx("div",{style:{marginTop:14},children:e.jsx("span",{style:{fontSize:12,color:"var(--ink5)",cursor:"pointer",textDecoration:"underline",textUnderlineOffset:3},onClick:()=>{k(!1),f(0)},children:"Start over"})})]}),e.jsx("div",{className:"qs-checklist",children:[{ic:"search",t:"Scanning for existing signals",done:!0},{ic:"user",t:"Customer profile created",done:!0},{ic:"activity",t:"Health scoring in progress",done:!1},{ic:"circle-alert",t:"Gap detection running",done:!1}].map((t,s)=>e.jsxs("div",{className:"qs-check-item",children:[e.jsx("div",{className:"qs-check-ic",style:{background:t.done?"var(--okb)":"var(--bg3)"},children:e.jsx(r,{name:t.done?"check":t.ic,size:13})}),e.jsx("div",{style:{fontSize:12.5,color:t.done?"var(--ink)":"var(--ink4)",fontWeight:t.done?500:400},children:t.t}),!t.done&&e.jsx("div",{className:"qs-spin"})]},s))})]});const ke=ie.find(t=>t.id===g)||ie[0];return h===1?e.jsxs(P,{children:[g!=="thread"&&g!=="connect"&&e.jsxs("div",{className:"qs-step-back",children:[e.jsxs("button",{className:"btn ghost sm",onClick:()=>{f(0),B(null),F(""),m(null),j(null),w(null),X("compose"),M({from:"",subject:""}),ne(""),K(""),U(!1),Z(null),C(null)},children:[e.jsx(r,{name:"arrow-left",size:12})," Back"]}),e.jsx("span",{className:"qs-step-label",children:ke.label})]}),(g==="thread"||g==="connect")&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8},children:[e.jsxs("div",{className:"qs-eyebrow",style:{marginBottom:0},children:[e.jsx("span",{className:"qs-eyebrow-dot"})," Send a thread"]}),e.jsxs("button",{className:"btn ghost sm",onClick:()=>{f(0),B(null),F(""),m(null),j(null),w(null),X("compose"),M({from:"",subject:""}),ne(""),K(""),U(!1),Z(null),C(null)},children:[e.jsx(r,{name:"arrow-left",size:12})," Back"]})]}),e.jsx("div",{className:"qs-step-title",children:"Send an email thread"}),e.jsx("div",{className:"qs-step-sub",children:"Compose your own email or pick a sample thread. Zotra will find the customer, extract context, and surface gaps and next actions."}),e.jsx("div",{style:{display:"flex",gap:0,marginBottom:0,borderBottom:".5px solid var(--brd)"},children:[{id:"compose",label:"Compose",icon:"pencil"},{id:"sample",label:"Sample thread",icon:"mail"}].map(t=>{const s=Q===t.id;return e.jsxs("button",{onClick:()=>{X(t.id)},style:{display:"flex",alignItems:"center",gap:6,padding:"10px 18px",fontSize:12.5,fontWeight:s?600:500,fontFamily:"inherit",color:s?"var(--p)":"var(--ink4)",background:"none",border:"none",cursor:"pointer",borderBottom:s?"2px solid var(--p)":"2px solid transparent",marginBottom:-1,transition:"color .13s"},children:[e.jsx(r,{name:t.icon,size:12}),t.label]},t.id)})}),e.jsx("div",{className:"qs-input-card",style:{borderTopLeftRadius:0,borderTopRightRadius:0,borderTop:"none"},children:e.jsxs("div",{className:"qs-input-pad",children:[Q==="compose"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{fontSize:12,color:"var(--ink4)",marginBottom:14,lineHeight:1.5},children:"Write your email below. Zotra reads it and surfaces gaps and next actions."}),ue?e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",padding:"28px 0 20px",gap:12,animation:"qs-fadein .3s ease-out"},children:[e.jsx("div",{style:{width:48,height:48,borderRadius:14,background:"var(--okb)",border:".5px solid rgba(29,158,117,.2)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(r,{name:"check-circle",size:24,style:{color:"var(--ok)"}})}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:14,fontWeight:600,color:"var(--ink)",marginBottom:4},children:"Thread sent"}),e.jsx("div",{style:{fontSize:12,color:"var(--ink4)",lineHeight:1.5},children:"Zotra received your email and is building the workspace."})]}),e.jsxs("button",{className:"btn pri",style:{height:34,fontSize:12,marginTop:4},onClick:()=>k(!0),children:[e.jsx(r,{name:"arrow-right",size:12})," Open workspace"]}),e.jsx("span",{style:{fontSize:11,color:"var(--ink5)",cursor:"pointer",textDecoration:"underline",textUnderlineOffset:3},onClick:()=>{U(!1),M({from:"",subject:""}),K(""),Y(null)},children:"Send another"})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8,marginBottom:12},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("span",{style:{fontSize:11,fontWeight:600,color:"var(--ink4)",width:52,flexShrink:0,fontFamily:'"DM Mono",monospace',letterSpacing:".03em"},children:"From"}),e.jsx("input",{style:{flex:1,height:32,padding:"0 12px",fontSize:12.5,fontFamily:"inherit",border:".5px solid var(--brd2)",borderRadius:8,background:"var(--bg)",color:"var(--ink)",outline:"none",transition:"border-color .15s"},placeholder:"client@example.com",value:R.from,onChange:t=>M(s=>({...s,from:t.target.value})),onFocus:t=>{t.target.style.borderColor="var(--p)",t.target.style.boxShadow="0 0 0 2px rgba(75,72,200,.08)"},onBlur:t=>{t.target.style.borderColor="var(--brd2)",t.target.style.boxShadow="none"}})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("span",{style:{fontSize:11,fontWeight:600,color:"var(--ink4)",width:52,flexShrink:0,fontFamily:'"DM Mono",monospace',letterSpacing:".03em"},children:"To"}),e.jsxs("div",{style:{flex:1,height:32,padding:"0 12px",fontSize:12.5,fontFamily:"inherit",border:".5px solid var(--brd)",borderRadius:8,background:"var(--bg3)",color:"var(--ink4)",display:"flex",alignItems:"center",gap:6},children:[e.jsx(r,{name:"lock",size:11,style:{color:"var(--ink5)",flexShrink:0}}),"info@zotra.com"]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("span",{style:{fontSize:11,fontWeight:600,color:"var(--ink4)",width:52,flexShrink:0,fontFamily:'"DM Mono",monospace',letterSpacing:".03em"},children:"Subject"}),e.jsx("input",{style:{flex:1,height:32,padding:"0 12px",fontSize:12.5,fontFamily:"inherit",border:".5px solid var(--brd2)",borderRadius:8,background:"var(--bg)",color:"var(--ink)",outline:"none",transition:"border-color .15s"},placeholder:"Digital marketing inquiry",value:R.subject,onChange:t=>M(s=>({...s,subject:t.target.value})),onFocus:t=>{t.target.style.borderColor="var(--p)",t.target.style.boxShadow="0 0 0 2px rgba(75,72,200,.08)"},onBlur:t=>{t.target.style.borderColor="var(--brd2)",t.target.style.boxShadow="none"}})]})]}),e.jsx("div",{style:{marginBottom:12},children:e.jsx("textarea",{style:{width:"100%",padding:"13px 16px",fontSize:13,fontFamily:'"DM Sans",sans-serif',border:"1.5px solid var(--brd2)",borderRadius:12,background:"var(--bg)",color:"var(--ink)",outline:"none",resize:"vertical",lineHeight:1.55,minHeight:110,transition:"border-color .15s",boxSizing:"border-box"},placeholder:"We are looking for help with our online presence...",value:E,onChange:t=>K(t.target.value),onFocus:t=>{t.target.style.borderColor="var(--p)"},onBlur:t=>{t.target.style.borderColor="var(--brd2)"}})}),e.jsx("button",{className:"btn pri",style:{height:36,opacity:!E.trim()||V?.45:1,transition:"opacity .2s",display:"flex",alignItems:"center",gap:7},disabled:!E.trim()||V,onClick:ve,children:V?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"qs-spin",style:{width:13,height:13,marginLeft:0,marginRight:2,borderWidth:1.5}}),"Sending…"]}):e.jsxs(e.Fragment,{children:[e.jsx(r,{name:"send",size:13})," Send"]})}),ee&&!ee.success&&e.jsxs("div",{style:{marginTop:12,padding:"10px 14px",borderRadius:9,background:"var(--rib)",border:".5px solid rgba(196,82,82,.22)",display:"flex",alignItems:"center",gap:8,animation:"qs-fadein .25s ease-out"},children:[e.jsx("div",{style:{width:20,height:20,borderRadius:5,background:"var(--ri)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:e.jsx(r,{name:"x",size:11,style:{color:"#fff"}})}),e.jsx("div",{style:{fontSize:12,color:"var(--rif)",fontWeight:500,flex:1},children:ee.message})]})]})]}),Q==="sample"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{fontSize:12,color:"var(--ink4)",marginBottom:12,lineHeight:1.5},children:"Pick a thread from your demo inbox — Zotra will queue it as an intake immediately."}),n&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"12px",color:"var(--ink5)",fontSize:12},children:[e.jsx("div",{className:"qs-spin",style:{width:13,height:13,marginLeft:0,borderWidth:1.5}}),"Loading inbox…"]}),!n&&A.length===0&&e.jsx("div",{style:{fontSize:12,color:"var(--ink5)",padding:"8px 0",fontStyle:"italic"},children:"No sample threads available."}),!n&&A.map(t=>{var me;const s=y===t.rowKey,d=(J==null?void 0:J.rowKey)===t.rowKey,c=d&&(N==null?void 0:N.success)===!0,x=d&&H,S=t.fromName||t.from||"Unknown",I=t.from?(me=t.from.split("@")[1])==null?void 0:me.split(".")[0]:"",_=I?I.charAt(0).toUpperCase()+I.slice(1):"Inbox";return e.jsxs("div",{style:{marginBottom:7},children:[e.jsxs("div",{className:"qs-sample-row",style:{background:c?"var(--okb)":s?"var(--pp)":"var(--bg2)",border:c?".5px solid rgba(29,158,117,.22)":s?"1.5px solid var(--p)":".5px solid var(--brd)",borderBottom:s&&!c?0:void 0,borderRadius:s&&!c?"10px 10px 0 0":10,boxShadow:s?"none":"0 1px 3px rgba(0,0,0,.04)",cursor:c?"default":"pointer",transition:"all .15s"},onClick:()=>{c||H||j(s?null:t.rowKey)},children:[e.jsx("div",{className:"qs-sample-row-ic",style:{background:c?"var(--ok)":s?"var(--p)":"var(--pp)",color:c||s?"#fff":"var(--p)"},children:x?e.jsx("div",{className:"qs-spin",style:{width:11,height:11,marginLeft:0,borderWidth:1.5}}):c?e.jsx(r,{name:"check",size:13}):e.jsx(r,{name:"mail",size:13})}),e.jsxs("div",{className:"qs-sample-body",children:[e.jsx("div",{className:"qs-sample-title",style:{color:c?"var(--okf)":void 0},children:t.subject||"(no subject)"}),e.jsxs("div",{className:"qs-sample-sub",children:[S," · ",_]})]}),e.jsx("span",{className:"qs-sample-preview-btn",style:{color:c?"var(--okf)":s?"var(--p)":"var(--ink4)",fontWeight:c?600:500},children:c?e.jsxs(e.Fragment,{children:[e.jsx(r,{name:"check-circle",size:12})," Sent"]}):x?"Sending…":s?e.jsxs(e.Fragment,{children:["Close ",e.jsx(r,{name:"chevron-up",size:12})]}):e.jsxs(e.Fragment,{children:["Preview"," ",e.jsx(r,{name:"chevron-down",size:12})]})})]}),s&&!c&&e.jsxs("div",{style:{border:"1.5px solid var(--p)",borderTop:"none",borderRadius:"0 0 10px 10px",overflow:"hidden",boxShadow:"0 4px 16px -4px rgba(75,72,200,.15)"},children:[e.jsx("div",{style:{maxHeight:260,overflowY:"auto",padding:"10px 10px 0"},children:e.jsxs("div",{style:{background:"#fff",borderRadius:6,boxShadow:"0 1px 4px rgba(0,0,0,.08), 0 0 0 .5px rgba(0,0,0,.06)",overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"12px 14px",borderBottom:".5px solid #eee",background:"#fafafa"},children:[e.jsx("div",{style:{fontSize:12.5,fontWeight:600,color:"#111",marginBottom:7},children:t.subject||"(no subject)"}),[{l:"From",v:t.fromName?`${t.fromName} <${t.from}>`:t.from||"—"},{l:"To",v:t.to||"—"}].map((xe,we)=>e.jsxs("div",{style:{display:"flex",gap:8,fontSize:11,marginBottom:2},children:[e.jsx("span",{style:{color:"#888",fontWeight:600,width:34,flexShrink:0},children:xe.l}),e.jsx("span",{style:{color:"#555"},children:xe.v})]},we))]}),e.jsx("div",{style:{padding:"12px 14px",fontSize:12.5,color:"#333",lineHeight:1.7,whiteSpace:"pre-line"},children:t.content||"(empty)"})]})}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:10,background:"var(--bg2)",borderTop:".5px solid var(--brd)"},children:[e.jsx("button",{className:"btn pri sm",style:{opacity:x?.6:1},disabled:x,onClick:()=>{Z(t),C(null),j(null),be(t)},children:x?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"qs-spin",style:{width:11,height:11,marginLeft:0,marginRight:4,borderWidth:1.5}}),"Sending…"]}):e.jsxs(e.Fragment,{children:[e.jsx(r,{name:"send",size:11})," Send"]})}),e.jsxs("span",{style:{marginLeft:"auto",fontSize:10.5,color:"var(--ink5)",display:"flex",alignItems:"center",gap:4},children:[e.jsx(r,{name:"sparkles",size:10})," New opportunity"]})]})]}),c&&N&&e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",background:"var(--okb)",border:".5px solid rgba(29,158,117,.22)",borderTop:"none",borderRadius:"0 0 10px 10px",animation:"qs-fadein .25s ease-out"},children:[e.jsxs("div",{style:{fontSize:11.5,color:"var(--okf)",fontWeight:500,flex:1},children:[N.message,N.zotrademoId&&e.jsxs("span",{style:{marginLeft:8,fontSize:10,fontFamily:'"DM Mono",monospace',opacity:.7},children:["ID: ",N.zotrademoId]})]}),e.jsxs("button",{className:"btn pri sm",style:{fontSize:11,flexShrink:0,marginLeft:10},onClick:()=>k(!0),children:[e.jsx(r,{name:"arrow-right",size:11})," Open workspace"]})]})]},t.rowKey)})]})]})})]}),g==="upload"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"qs-eyebrow",children:[e.jsx("span",{className:"qs-eyebrow-dot"})," Upload a document"]}),e.jsx("div",{className:"qs-step-title",children:"Drop a proposal, SOW, or contract"}),e.jsx("div",{className:"qs-step-sub",children:"Zotra extracts the customer name, deal value, scope, stakeholders, and timeline — and opens a workspace from what it finds."}),z?e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:10,padding:"8px 12px",background:"var(--okb)",border:".5px solid rgba(29,158,117,.2)",borderRadius:9},children:[e.jsx(r,{name:"check-circle",size:14}),e.jsxs("div",{style:{fontSize:12,fontWeight:600,color:"var(--ink)",flex:1},children:[z.label," — ready to analyse"]}),e.jsx("button",{className:"btn ghost sm",style:{fontSize:11},onClick:()=>m(null),children:"Change"})]}),e.jsx("div",{style:{padding:10,background:"var(--bg2)",border:".5px solid var(--brd)",borderRadius:12,marginBottom:12,maxHeight:360,overflowY:"auto"},children:e.jsx(fe,{doc:z})}),e.jsxs("button",{className:"btn pri",style:{height:36,width:"100%",justifyContent:"center"},onClick:()=>{const t=z.co;q(t),W(t),k(!0)},children:[e.jsx(r,{name:"sparkles",size:13})," Analyse this document"]})]}):e.jsx("div",{className:"qs-input-card",children:e.jsxs("div",{className:"qs-input-pad",children:[e.jsxs("div",{className:"qs-drop-area",onDragOver:t=>{t.preventDefault(),t.currentTarget.classList.add("over")},onDragLeave:t=>t.currentTarget.classList.remove("over"),onDrop:t=>{t.preventDefault(),t.currentTarget.classList.remove("over"),m(ge[0])},children:[e.jsx("div",{style:{width:38,height:38,borderRadius:11,background:"var(--bg3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 9px",color:"var(--ink4)"},children:e.jsx(r,{name:"upload",size:20})}),e.jsx("div",{style:{fontSize:13,fontWeight:600,color:"var(--ink)",marginBottom:3},children:"Drop your file here"}),e.jsx("div",{style:{fontSize:12,color:"var(--ink4)",lineHeight:1.5},children:"PDF, Word, or plain text · proposals, SOWs, invoices, contracts"})]}),e.jsx("div",{className:"qs-sample-lbl",children:"Or pick a sample document"}),ge.map((t,s)=>{const d=$===t.id;return e.jsxs("div",{style:{marginBottom:7},children:[e.jsxs("div",{className:"qs-sample-row",style:{background:"var(--bg2)",border:d?"1.5px solid var(--p)":".5px solid var(--brd)",borderBottom:d?0:void 0,borderRadius:d?"10px 10px 0 0":10,boxShadow:d?"none":"0 1px 3px rgba(0,0,0,.04)"},onClick:()=>w(d?null:t.id),children:[e.jsx("div",{className:"qs-sample-row-ic",style:{background:t.accentBg,color:t.accentColor},children:e.jsx(r,{name:"file-text",size:13})}),e.jsxs("div",{className:"qs-sample-body",children:[e.jsx("div",{className:"qs-sample-title",children:t.label}),e.jsxs("div",{className:"qs-sample-sub",children:[t.co," · ",t.type," · ",t.value]})]}),e.jsxs("span",{className:"qs-sample-preview-btn",style:{color:d?"var(--p)":"var(--ink4)"},children:[d?"Close":"Preview"," ",e.jsx(r,{name:d?"chevron-up":"chevron-down",size:12})]})]}),d&&e.jsxs("div",{style:{border:"1.5px solid var(--p)",borderTop:"none",borderRadius:"0 0 10px 10px",overflow:"hidden",boxShadow:"0 4px 16px -4px rgba(75,72,200,.15)"},children:[e.jsx("div",{style:{maxHeight:320,overflowY:"auto",padding:"10px 10px 0"},children:e.jsx(fe,{doc:t})}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:10,background:"var(--bg2)",borderTop:".5px solid var(--brd)"},children:[e.jsxs("button",{className:"btn pri sm",onClick:()=>{m(t),w(null)},children:[e.jsx(r,{name:"check",size:11})," Use this document"]}),e.jsx("button",{className:"btn sm",onClick:()=>w(null),children:"Cancel"}),e.jsxs("span",{style:{marginLeft:"auto",fontSize:10.5,color:"var(--ink5)",display:"flex",alignItems:"center",gap:4},children:[e.jsx(r,{name:"sparkles",size:10})," New opportunity"]})]})]})]},s)})]})})]}),g==="empty"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"qs-eyebrow",children:[e.jsx("span",{className:"qs-eyebrow-dot"})," Start empty"]}),e.jsx("div",{className:"qs-step-title",children:"Name a customer to begin"}),e.jsx("div",{className:"qs-step-sub",children:"Type a name — watch Zotra build the workspace in real time."}),e.jsx(Ne,{inputText:u,setInputText:F,handleEmpty:je})]}),g==="tour"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"qs-eyebrow",children:[e.jsx("span",{className:"qs-eyebrow-dot"})," Quick tour"]}),e.jsx("div",{className:"qs-step-title",children:"Browse a live demo workspace"}),e.jsx("div",{className:"qs-step-sub",children:"See how Zotra looks at maturity — pulse, opportunities, renewals, and finance — without any setup."}),[{ic:"activity",label:"Pulse — Log stream",desc:"Live activity feed showing agent actions and customer signals",view:"pulse"},{ic:"target",label:"Opportunities",desc:"Pipeline constellation view with deal health and next actions",view:"deals"},{ic:"refresh-cw",label:"Renewals",desc:"Renewal tracker with contract timeline and risk indicators",view:"renewal"},{ic:"receipt",label:"Finance",desc:"Invoice tracker and cash flow across all active accounts",view:"finance"},{ic:"layout-dashboard",label:"Dashboard",desc:"Portfolio health at a glance — revenue, churn risk, pipeline",view:"dashboard"}].map((t,s)=>e.jsxs("div",{className:"qs-tour-card",onClick:()=>{l==null||l("established"),a==null||a(t.view)},children:[e.jsx("div",{className:"qs-tour-ic",children:e.jsx(r,{name:t.ic,size:16})}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontSize:13,fontWeight:600,color:"var(--ink)",marginBottom:2},children:t.label}),e.jsx("div",{style:{fontSize:11.5,color:"var(--ink4)"},children:t.desc})]}),e.jsx(r,{name:"chevron-right",size:14,style:{color:"var(--ink5)",flexShrink:0}})]},s))]})]}):h===2?e.jsxs(P,{children:[e.jsxs("div",{className:"qs-eyebrow",children:[e.jsx("span",{className:"qs-eyebrow-dot"})," Workspace ready"]}),e.jsx("div",{className:"qs-step-title",children:"Here's what Zotra found"}),e.jsxs("div",{className:"qs-step-sub",children:["From one ",g==="upload"?"document":"thread",", Zotra built a workspace and identified open gaps."]}),e.jsxs("div",{style:{background:"var(--bg2)",border:".5px solid var(--brd)",borderRadius:18,boxShadow:"var(--sh-s)",overflow:"hidden",marginBottom:12},children:[v&&e.jsx(Ce,{parsed:v,health:T,gaps:O}),e.jsxs("div",{style:{padding:"16px 28px",borderTop:".5px solid var(--brd)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5,fontSize:"9.5px",fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:"var(--p)",marginBottom:6},children:[e.jsx(r,{name:"sparkles",size:11})," Suggested action"]}),e.jsxs("div",{style:{fontSize:13.5,fontWeight:650,color:"var(--ink)",marginBottom:4,letterSpacing:"-.01em"},children:["Confirm the decision-maker at ",v]}),e.jsx("div",{style:{fontSize:12,color:"var(--ink3)",lineHeight:1.55,marginBottom:12},children:"No confirmed decision-maker means Zotra cannot assess authority risk. One name closes this gap and lifts the health score immediately."}),e.jsxs("div",{style:{display:"flex",gap:7},children:[e.jsxs("button",{className:"btn pri sm",onClick:()=>f(3),children:[e.jsx(r,{name:"check",size:11})," Log it now"]}),e.jsx("button",{className:"btn sm",onClick:()=>f(3),children:"Do later"})]})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:"var(--bg2)",border:".5px solid var(--brd)",borderRadius:11},children:[e.jsx(r,{name:"help-circle",size:14,style:{color:"var(--ink4)",flexShrink:0}}),e.jsxs("div",{style:{fontSize:"11.5px",color:"var(--ink4)",lineHeight:1.5},children:[e.jsx("strong",{style:{color:"var(--ink)",fontWeight:600},children:"Why suggested?"})," ","No activity logged yet · decision-maker gap blocking health score ·"," ",v," has a warm relationship signal"]})]})]}):e.jsxs(P,{children:[e.jsxs("div",{className:"qs-eyebrow",children:[e.jsx("span",{className:"qs-eyebrow-dot"})," One more step — optional"]}),e.jsx("div",{className:"qs-step-title",children:"Want Zotra to watch your inbox?"}),e.jsx("div",{className:"qs-step-sub",children:"You've seen what Zotra does. Connect your inbox and it'll do this automatically for every customer."}),e.jsxs("div",{className:"qs-connect-card",children:[e.jsx("div",{className:"qs-connect-title",children:"Connect Gmail or Outlook"}),e.jsx("div",{className:"qs-connect-sub",children:"Zotra scans the last 90 days, finds every commercial thread, and builds workspaces automatically. You confirm before anything is imported."}),e.jsxs("div",{className:"qs-connect-btns",children:[e.jsxs("button",{className:"qs-connect-btn-pri",onClick:()=>G(),children:[e.jsx(r,{name:"mail",size:14})," Connect inbox"]}),e.jsx("button",{className:"qs-connect-btn-ghost",onClick:()=>G(),children:"Skip for now"})]}),e.jsx("div",{className:"qs-trust-row",children:[{ic:"shield-check",l:"Read-only access"},{ic:"eye-off",l:"Nothing sends without approval"},{ic:"x-circle",l:"Disconnect anytime"}].map((t,s)=>e.jsxs("div",{className:"qs-trust-item",children:[e.jsx(r,{name:t.ic,size:12})," ",t.l]},s))})]}),e.jsxs("div",{style:{marginTop:10},children:[e.jsx("div",{style:{fontSize:"11.5px",color:"var(--ink4)",marginBottom:10},children:"Other ways to get data in:"}),[{ic:"database",t:"Import CSV",s:"Upload accounts and deals from a spreadsheet"},{ic:"plug",t:"Connect CRM",s:"Salesforce, HubSpot, Pipedrive"},{ic:"forward",t:"Forward emails",s:"Forward individual threads to your Zotra address"}].map((t,s)=>e.jsxs("div",{className:"qs-opt-row",onClick:()=>G(),children:[e.jsx("div",{className:"qs-opt-ic",children:e.jsx(r,{name:t.ic,size:14})}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"12.5px",fontWeight:600,color:"var(--ink)"},children:t.t}),e.jsx("div",{style:{fontSize:11,color:"var(--ink4)"},children:t.s})]}),e.jsx(r,{name:"chevron-right",size:14,style:{marginLeft:"auto",color:"var(--ink5)"}})]},s))]})]})};export{De as default};
