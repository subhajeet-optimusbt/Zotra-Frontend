import{r as d,j as a}from"./vendor-react-DTmZBiFG.js";import{I as o}from"./AppShell-DczK4XpG.js";import"./index-C07rrmDM.js";import"./api-BR5LSxT6.js";import"./vendor-icons-BGVXKQIZ.js";const i=[{id:"watcher",name:"Watcher",ic:"eye",icBg:"var(--pp)",icFg:"var(--p)",mode:"Acts",state:"working",stateLabel:"Working now",stateBg:"var(--okb)",stateFg:"var(--okf)",pulse:!0,action:"Scanning Marketwake engagement",detail:"Reply gap detected — 9 days since David replied. Engagement score declining. Suggested action queued for review.",customer:"Marketwake",time:"now",runsToday:4},{id:"forager",name:"Forager",ic:"search",icBg:"var(--amberp)",icFg:"var(--amber)",mode:"Acts",state:"working",stateLabel:"Working now",stateBg:"var(--okb)",stateFg:"var(--okf)",pulse:!0,action:"Enriching NorthPoint Legal",detail:"Org map building. Dr. Kim confirmed as sole decision-maker. LinkedIn scan running for additional stakeholder contacts.",customer:"NorthPoint Legal",time:"now",runsToday:2},{id:"comms",name:"Comms",ic:"send",icBg:"var(--pp)",icFg:"var(--p)",mode:"Assists",state:"pending",stateLabel:"2 pending",stateBg:"var(--wab)",stateFg:"var(--waf)",pulse:!0,action:"2 drafts awaiting your review",detail:"Northwind Trading follow-up and Canpango qualification reply are ready. Nothing sends until you approve.",customer:"Multiple",time:"now",runsToday:3},{id:"opportunity",name:"Opportunity",ic:"target",icBg:"var(--pp)",icFg:"var(--p)",mode:"Assists",state:"done",stateLabel:"Done · 3h",stateBg:"var(--okb)",stateFg:"var(--okf)",pulse:!1,action:"Draft agreement ready",detail:"Verbal commit received from David Chen. $96K agreement drafted and sitting in your review queue — nothing is sent until you confirm.",customer:"Marketwake",time:"3h",runsToday:3},{id:"financial",name:"Financial",ic:"receipt",icBg:"var(--amberp)",icFg:"var(--amber)",mode:"Acts",state:"done",stateLabel:"Done · 1h",stateBg:"var(--okb)",stateFg:"var(--okf)",pulse:!1,action:"Invoice Day 22 alert logged",detail:"DataBridge #INV-2026-004 is 8 days overdue. Two email reminders sent with no response. Escalation logged — a call is recommended.",customer:"DataBridge",time:"1h",runsToday:2},{id:"project",name:"Project",ic:"kanban-square",icBg:"#E8F5E9",icFg:"#2E7D32",mode:"Acts",state:"done",stateLabel:"Done · 1h",stateBg:"var(--okb)",stateFg:"var(--okf)",pulse:!1,action:"Scope drift +30% flagged",detail:"Metro Content effort is 30% over estimate. Gross margin has dropped to 16%. Change order drafted and ready for your review before sending to client.",customer:"Metro Content",time:"1h",runsToday:2},{id:"renewal",name:"Renewal",ic:"refresh-cw",icBg:"var(--tp)",icFg:"var(--td)",mode:"Acts",state:"done",stateLabel:"Done · 2h",stateBg:"var(--okb)",stateFg:"var(--okf)",pulse:!1,action:"Renewal brief filed",detail:"Hartwell Ortho contract ends in 61 days. Brief includes the paid search expansion signal Rachel mentioned on last call. Ready to send.",customer:"Hartwell Ortho",time:"2h",runsToday:1},{id:"escalation",name:"Escalation",ic:"alert-triangle",icBg:"var(--rib)",icFg:"var(--ri)",mode:"Assists",state:"idle",stateLabel:"Idle",stateBg:"var(--bg3)",stateFg:"var(--ink4)",pulse:!1,action:"No converging risks detected",detail:"Portfolio scanned across all 10 active accounts. No simultaneous risk signals found. All accounts within normal thresholds.",customer:"Portfolio",time:"6h",runsToday:0},{id:"portfolio",name:"Portfolio Intelligence",ic:"globe",icBg:"var(--bg3)",icFg:"var(--ink3)",mode:"Acts",state:"scheduled",stateLabel:"Next · 6h",stateBg:"var(--bg3)",stateFg:"var(--ink4)",pulse:!1,action:"Last scan clean",detail:"Revenue concentration within normal range. No cohort churn patterns detected. Pipeline velocity trends stable. Next scheduled run in 6 hours.",customer:"All accounts",time:"6h",runsToday:1}],h=`
@keyframes av-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(0.8); }
}
.av-pulse { animation: av-pulse 1.8s ease-in-out infinite; }

.av-shell {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  background: var(--bg);
}
.av-header {
  flex-shrink: 0;
  padding: 18px 24px 14px;
  background: var(--bg2);
  border-bottom: 0.5px solid var(--brd);
}
.av-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}
.av-title {
  font-family: "Sora", sans-serif;
  font-size: 19px;
  font-weight: 650;
  letter-spacing: -0.025em;
  color: var(--ink);
  margin-bottom: 3px;
}
.av-sub {
  font-size: 12.5px;
  color: var(--ink4);
}
.av-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 14px;
}
.av-chip {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 6px 13px;
  background: var(--bg2);
  border: 0.5px solid var(--brd2);
  border-radius: 20px;
  box-shadow: var(--sh-s);
}
.av-chip-num {
  font-family: "Sora", sans-serif;
  font-size: 15px;
  font-weight: 650;
  color: var(--ink);
  letter-spacing: -0.02em;
}
.av-chip-lbl {
  font-size: 11.5px;
  color: var(--ink4);
}
.av-filters {
  display: flex;
  gap: 5px;
}
.av-filter-cnt {
  font-family: "DM Mono", monospace;
  font-size: 9.5px;
  padding: 0 5px;
  border-radius: 8px;
  margin-left: 3px;
}
.av-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px 24px 40px;
}
.av-list-inner {
  max-width: 840px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.av-empty {
  text-align: center;
  padding: 60px 0;
  color: var(--ink4);
}
.av-card {
  background: var(--bg2);
  border-radius: 13px;
  overflow: hidden;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.av-card-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 16px;
  cursor: pointer;
}
.av-card-ic {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.av-card-body {
  flex: 1;
  min-width: 0;
}
.av-card-name-row {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 3px;
}
.av-card-name {
  font-size: 13.5px;
  font-weight: 650;
  color: var(--ink);
  letter-spacing: -0.01em;
}
.av-mode-badge {
  font-size: 9.5px;
  font-family: "DM Mono", monospace;
  font-weight: 600;
  padding: 1px 7px;
  border-radius: 4px;
  border: 0.5px solid var(--brd2);
}
.av-card-action {
  font-size: 12px;
  color: var(--ink3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.av-card-customer {
  color: var(--ink5);
  margin-left: 6px;
}
.av-card-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.av-state-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 11px;
  border-radius: 20px;
}
.av-pulse-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  display: inline-block;
}
.av-expand-panel {
  border-top: 0.5px solid var(--brd);
  background: var(--pu);
  padding: 14px 16px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
.av-expand-text {
  flex: 1;
  min-width: 0;
}
.av-expand-detail {
  font-size: 12.5px;
  color: var(--ink3);
  line-height: 1.65;
  margin-bottom: 10px;
}
.av-expand-meta {
  display: flex;
  gap: 16px;
}
.av-meta-item {
  font-size: 11px;
  color: var(--ink4);
}
.av-meta-val {
  font-weight: 600;
  color: var(--ink);
}
.av-expand-btns {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}
`,w=({setView:n})=>{const[c,p]=d.useState(null),[r,v]=d.useState("all"),s={working:i.filter(e=>e.state==="working").length,pending:i.filter(e=>e.state==="pending").length,done:i.filter(e=>e.state==="done").length,idle:i.filter(e=>["idle","scheduled"].includes(e.state)).length,total:i.reduce((e,t)=>e+t.runsToday,0)},m=[{id:"all",label:"All",count:i.length},{id:"active",label:"Active now",count:s.working+s.pending},{id:"done",label:"Done today",count:s.done},{id:"idle",label:"Idle",count:s.idle}],g=[{v:s.working,l:"Working now",dot:"var(--p)",pulse:!0},{v:s.pending,l:"Pending review",dot:"var(--wa)",pulse:!0},{v:s.done,l:"Done today",dot:"var(--ok)",pulse:!1},{v:s.idle,l:"Idle",dot:"var(--ink5)",pulse:!1}],l=r==="all"?i:r==="active"?i.filter(e=>["working","pending"].includes(e.state)):r==="done"?i.filter(e=>e.state==="done"):i.filter(e=>["idle","scheduled"].includes(e.state));return a.jsxs("div",{className:"av-shell",children:[a.jsx("style",{children:h}),a.jsxs("div",{className:"av-header",children:[a.jsxs("div",{className:"av-title-row",children:[a.jsxs("div",{children:[a.jsx("div",{className:"av-title",children:"Automation"}),a.jsxs("div",{className:"av-sub",children:[i.length," agents running in the background · ",s.total," actions taken today"]})]}),a.jsxs("button",{className:"btn sm",style:{flexShrink:0,marginTop:2},onClick:()=>n==null?void 0:n("settings"),children:[a.jsx(o,{name:"sliders-horizontal",size:12})," Configure"]})]}),a.jsx("div",{className:"av-chips",children:g.map((e,t)=>a.jsxs("div",{className:"av-chip",children:[a.jsx("span",{className:e.pulse?"av-pulse":"",style:{width:7,height:7,borderRadius:"50%",background:e.dot,flexShrink:0,display:"inline-block"}}),a.jsx("span",{className:"av-chip-num",children:e.v}),a.jsx("span",{className:"av-chip-lbl",children:e.l})]},t))}),a.jsx("div",{className:"av-filters",children:m.map(e=>a.jsxs("button",{className:`btn sm${r===e.id?" pri":""}`,onClick:()=>v(e.id),children:[e.label,a.jsx("span",{className:"av-filter-cnt",style:{background:r===e.id?"rgba(255,255,255,.22)":"var(--bg3)",color:r===e.id?"#fff":"var(--ink4)"},children:e.count})]},e.id))})]}),a.jsx("div",{className:"av-list",children:a.jsxs("div",{className:"av-list-inner",children:[l.length===0&&a.jsxs("div",{className:"av-empty",children:[a.jsx(o,{name:"cpu",size:28}),a.jsx("div",{style:{marginTop:12,fontSize:13},children:"No agents in this state right now."})]}),l.map(e=>{const t=c===e.id;return a.jsxs("div",{className:"av-card",style:{border:t?"1.5px solid var(--p)":"0.5px solid var(--brd)",boxShadow:t?"0 0 0 3px rgba(75,72,200,.07), var(--sh-s)":"var(--sh-s)"},children:[a.jsxs("div",{className:"av-card-row",onClick:()=>p(t?null:e.id),children:[a.jsx("div",{className:"av-card-ic",style:{background:e.icBg,color:e.icFg},children:a.jsx(o,{name:e.ic,size:16})}),a.jsxs("div",{className:"av-card-body",children:[a.jsxs("div",{className:"av-card-name-row",children:[a.jsx("span",{className:"av-card-name",children:e.name}),a.jsx("span",{className:"av-mode-badge",style:{background:e.mode==="Acts"?"var(--pp)":"var(--bg3)",color:e.mode==="Acts"?"var(--p)":"var(--ink4)"},children:e.mode})]}),a.jsxs("div",{className:"av-card-action",children:[e.action,a.jsxs("span",{className:"av-card-customer",children:["· ",e.customer]})]})]}),a.jsxs("div",{className:"av-card-right",children:[a.jsxs("span",{className:"av-state-badge",style:{background:e.stateBg,color:e.stateFg},children:[e.pulse&&a.jsx("span",{className:"av-pulse-dot av-pulse"}),e.stateLabel]}),a.jsx(o,{name:t?"chevron-up":"chevron-down",size:14,style:{color:"var(--ink4)"}})]})]}),t&&a.jsxs("div",{className:"av-expand-panel",children:[a.jsxs("div",{className:"av-expand-text",children:[a.jsx("div",{className:"av-expand-detail",children:e.detail}),a.jsxs("div",{className:"av-expand-meta",children:[a.jsxs("div",{className:"av-meta-item",children:["Runs today: ",a.jsx("span",{className:"av-meta-val",children:e.runsToday})]}),a.jsxs("div",{className:"av-meta-item",children:["Last: ",a.jsx("span",{className:"av-meta-val",children:e.time==="now"?"running now":`${e.time} ago`})]})]})]}),a.jsxs("div",{className:"av-expand-btns",children:[e.state==="pending"&&a.jsxs("button",{className:"btn sm pri",children:[a.jsx(o,{name:"check",size:11})," Review drafts"]}),a.jsxs("button",{className:"btn sm",onClick:x=>{x.stopPropagation(),n==null||n("settings")},children:[a.jsx(o,{name:"sliders-horizontal",size:11})," Configure"]})]})]})]},e.id)})]})})]})};export{w as default};
