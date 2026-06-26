const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/TodayView-Ca2BBvGt.js","assets/vendor-react-DTmZBiFG.js","assets/vendor-icons-BGVXKQIZ.js","assets/PulseView-DH8ELqR3.js","assets/api-DCvr0-DU.js","assets/AccountsView-Bb_I9xU0.js","assets/Shared-BmJpXX_S.js","assets/index-lTUd1QeB.js","assets/index-HwiKQ_jz.css","assets/ConstellationView-4Iy7Voys.js","assets/AccountDetailPanel-Cf3Wj9qL.js","assets/IntakeView-CdoW7TUl.js","assets/WorkspaceBoardView-CC58rR2v.js","assets/DashboardView-O0ea9W2T.js","assets/ReportsView-bahSWZc_.js","assets/SettingsView-LY0Xc3je.js","assets/PanelProfile-hl_eWSOy.js","assets/ProfileView-DCirRDdk.js","assets/JourneyView-C5MK2EGY.js","assets/AutomationView-BDRk5RCf.js","assets/QuickStartView-CEJSrPy0.js","assets/ConversationsView-CmqgMMFl.js","assets/AssistantpreviewView-UC0pMbxC.js","assets/InventoryView-ChT82ovW.js","assets/TestInboxView-HDrXTsn5.js"])))=>i.map(i=>d[i]);
import{u as G,_ as z}from"./index-lTUd1QeB.js";import{r as o,j as e,d as H,a as ge,u as ue}from"./vendor-react-DTmZBiFG.js";import{g as ne,b as Q,l as be,a as K,c as fe}from"./api-DCvr0-DU.js";import{L as ve}from"./vendor-icons-BGVXKQIZ.js";const ie="zotra_saved_session";function ke(){const r=localStorage.getItem("zotra_userId")??"",t=localStorage.getItem("zotra_tenantId")??"",a=localStorage.getItem("zotra_email")??"",c=localStorage.getItem("zotra_fullName")??"",s=localStorage.getItem("zotra_role")??"",b=localStorage.getItem("zotra_orgName")??"",I=localStorage.getItem("zotra_profileUrl")??"",w=localStorage.getItem("zotra_avatar")??"";if(r)return{userId:r,tenantId:t,email:a,fullName:c,role:s,orgName:b,profileUrl:I,avatar:w};try{const d=localStorage.getItem(ie);if(!d)return{userId:"",tenantId:"",email:"",fullName:"",role:"",orgName:"",profileUrl:"",avatar:""};const g=JSON.parse(d);return Date.now()-(g.savedAt??0)>30*24*60*60*1e3?(localStorage.removeItem(ie),{userId:"",tenantId:"",email:"",fullName:"",role:"",orgName:"",profileUrl:"",avatar:""}):{userId:g.userId??"",tenantId:g.tenantId??"",email:g.email??"",fullName:g.fullName??"",role:g.role??"",orgName:g.orgName??"",profileUrl:"",avatar:""}}catch{return{userId:"",tenantId:"",email:"",fullName:"",role:"",orgName:"",profileUrl:"",avatar:""}}}function we(){const[r,t]=o.useState(null),[a,c]=o.useState(!0),[s,b]=o.useState(null);async function I(w){const{userId:d,tenantId:g,email:y,fullName:l,role:f,orgName:E,profileUrl:R,avatar:P}=ke();if(!d){c(!1);return}const N=R||P||void 0;t(j=>j??{userId:d,tenantId:g,email:y,displayName:l||y.split("@")[0],role:f,tenantName:E,avatarUrl:N});const L=ne();try{const j=await fetch(`${Q()}/users/${d}`,{headers:{"Content-Type":"application/json",...L?{Authorization:`Bearer ${L}`}:{}},signal:w}),M=await j.json();if(!j.ok){if(j.status===401){["zotra_userId","zotra_tenantId","zotra_email","zotra_fullName","zotra_role","zotra_orgName","zotra_profileUrl","zotra_avatar","zotra_token","zotra_refresh_token","zotra_saved_session"].forEach(p=>localStorage.removeItem(p)),window.location.href="/login";return}console.warn("[Zotra] Profile API returned",j.status,"— using session data only.");return}const h=M,k=p=>typeof p=="string"?p:"",C=localStorage.getItem("zotra_profileUrl")??"",T=localStorage.getItem("zotra_avatar")??"",W=k(h.profileUrl??h.avatarUrl??h.avatar_url??h.picture),n=C||T||W||void 0;t({userId:k(h.userId??h.rowKey??d),tenantId:k(h.tenantId??h.partitionKey??g),email:k(h.email??y),displayName:k(h.fullName??l)||y.split("@")[0],firstName:k(h.firstName??h.first_name),lastName:k(h.lastName??h.last_name),role:k(h.jobRole??f),avatarUrl:n,tenantName:k(h.tenantName??h.orgName??E),workspaceName:k(h.workspaceName),phone:k(h.phone),department:k(h.department),company:k(h.company??h.companyName)}),console.log("[Zotra] Profile enriched from API ✓")}catch(j){if(j.name==="AbortError")return;console.warn("[Zotra] Profile API fetch failed:",j.message)}finally{c(!1)}}return o.useEffect(()=>{const w=new AbortController;I(w.signal);const d=()=>{const g=new AbortController;I(g.signal)};return window.addEventListener("zotra:profile-updated",d),()=>{w.abort(),window.removeEventListener("zotra:profile-updated",d)}},[]),{profile:r,loading:a,error:s}}function ye(r){var t,a;if(!r)return"Z";if(r.firstName&&r.lastName)return(r.firstName[0]+r.lastName[0]).toUpperCase();if((t=r.displayName)!=null&&t.trim()){const c=r.displayName.trim().split(/\s+/);return(c[0][0]+(((a=c[1])==null?void 0:a[0])??"")).toUpperCase()}return r.email?r.email.slice(0,2).toUpperCase():"Z"}const je=o.createContext({logoUrl:"",orgName:"",orgPlan:""});function Ne(){return o.useContext(je)}const _=r=>({stroke:r?"var(--sb-ic-active)":"var(--sb-ic-stroke)",fill:r?"var(--sb-ic-fill)":"none",faint:r?"var(--sb-ic-faint)":"none",dot:r?"var(--sb-ic-active)":"var(--sb-ic-stroke)",w:"1.5",cap:"round",join:"round"}),Se=({active:r})=>{const t=_(r);return e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("path",{d:"M8 2v1.5M3.2 4.2l1.1 1.1M1.5 9h1.5M12 9h1.5M11.7 4.2l-1.1 1.1",stroke:t.stroke,strokeWidth:t.w,strokeLinecap:t.cap}),e.jsx("path",{d:"M4 9a4 4 0 0 1 8 0",stroke:t.stroke,strokeWidth:t.w,strokeLinecap:t.cap}),e.jsx("line",{x1:"2",y1:"11.5",x2:"14",y2:"11.5",stroke:t.stroke,strokeWidth:t.w,strokeLinecap:t.cap})]})},ze=({active:r})=>{const t=_(r);return e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:e.jsx("polyline",{points:"1,10 3.5,6.5 6,10.5 9,4.5 12,8 15,5.5",stroke:t.stroke,strokeWidth:t.w,strokeLinecap:t.cap,strokeLinejoin:t.join,fill:"none"})})},_e=({active:r})=>{const t=_(r);return e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("path",{d:"M1.5 9h3l1.5 2.5h4L11.5 9h3",stroke:t.stroke,strokeWidth:t.w,strokeLinecap:t.cap,strokeLinejoin:t.join}),e.jsx("path",{d:"M2.5 4.5h11a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1Z",stroke:t.stroke,strokeWidth:t.w,fill:t.fill}),e.jsx("path",{d:"M1.5 9h13",stroke:t.stroke,strokeWidth:t.w,strokeLinecap:t.cap})]})},Ie=({active:r})=>{const t=_(r);return e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("rect",{x:"2",y:"4",width:"8",height:"11",rx:"1",stroke:t.stroke,strokeWidth:t.w,fill:t.fill}),e.jsx("path",{d:"M10 7h3a1 1 0 0 1 1 1v7H10",stroke:t.stroke,strokeWidth:t.w,strokeLinejoin:t.join}),e.jsx("rect",{x:"4",y:"6.5",width:"1.8",height:"1.8",rx:"0.4",fill:t.dot,opacity:"0.7"}),e.jsx("rect",{x:"7.2",y:"6.5",width:"1.8",height:"1.8",rx:"0.4",fill:t.dot,opacity:"0.7"}),e.jsx("rect",{x:"4",y:"10",width:"1.8",height:"1.8",rx:"0.4",fill:t.dot,opacity:"0.7"}),e.jsx("rect",{x:"7.2",y:"10",width:"1.8",height:"1.8",rx:"0.4",fill:t.dot,opacity:"0.5"}),e.jsx("rect",{x:"5",y:"13",width:"2.5",height:"2",rx:"0.4",fill:t.dot,opacity:"0.8"})]})},Le=({active:r})=>{const t=_(r);return e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("circle",{cx:"8",cy:"8",r:"6.5",stroke:t.stroke,strokeWidth:t.w,opacity:"0.35"}),e.jsx("circle",{cx:"8",cy:"8",r:"4",stroke:t.stroke,strokeWidth:t.w,opacity:"0.65"}),e.jsx("circle",{cx:"8",cy:"8",r:"1.8",fill:t.dot})]})},Me=({active:r})=>{const t=_(r);return e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("rect",{x:"1.5",y:"1.5",width:"13",height:"13",rx:"2",stroke:t.stroke,strokeWidth:t.w,fill:t.fill}),e.jsx("rect",{x:"3.5",y:"4",width:"2.5",height:"6",rx:"0.8",fill:t.dot,opacity:r?.9:.5}),e.jsx("rect",{x:"6.75",y:"4",width:"2.5",height:"4.5",rx:"0.8",fill:t.dot,opacity:r?.7:.4}),e.jsx("rect",{x:"10",y:"4",width:"2.5",height:"3",rx:"0.8",fill:t.dot,opacity:r?.5:.3})]})},Ee=({active:r})=>{const t=_(r);return e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("path",{d:"M3.5 1.5h9v13l-1.5-1-1.5 1-1.5-1-1.5 1-1.5-1-1.5 1Z",stroke:t.stroke,strokeWidth:t.w,strokeLinejoin:t.join,fill:t.fill}),e.jsx("line",{x1:"5.5",y1:"5.5",x2:"10.5",y2:"5.5",stroke:t.stroke,strokeWidth:t.w,strokeLinecap:t.cap}),e.jsx("line",{x1:"5.5",y1:"8",x2:"10.5",y2:"8",stroke:t.stroke,strokeWidth:t.w,strokeLinecap:t.cap}),e.jsx("line",{x1:"5.5",y1:"10.5",x2:"8.5",y2:"10.5",stroke:t.stroke,strokeWidth:t.w,strokeLinecap:t.cap})]})},Ce=({active:r})=>{const t=_(r);return e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("path",{d:"M13 2.5v3.5h-3.5",stroke:t.stroke,strokeWidth:t.w,strokeLinecap:t.cap,strokeLinejoin:t.join}),e.jsx("path",{d:"M3 13.5v-3.5h3.5",stroke:t.stroke,strokeWidth:t.w,strokeLinecap:t.cap,strokeLinejoin:t.join}),e.jsx("path",{d:"M12.5 6.5A5.5 5.5 0 1 0 13 9.5",stroke:t.stroke,strokeWidth:t.w,strokeLinecap:t.cap})]})},Ae=({active:r})=>{const t=_(r);return e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("rect",{x:"1.5",y:"1.5",width:"5.5",height:"7",rx:"1.2",stroke:t.stroke,strokeWidth:t.w,fill:t.fill}),e.jsx("rect",{x:"9",y:"1.5",width:"5.5",height:"3.5",rx:"1.2",stroke:t.stroke,strokeWidth:t.w,fill:t.fill}),e.jsx("rect",{x:"9",y:"7",width:"5.5",height:"7.5",rx:"1.2",stroke:t.stroke,strokeWidth:t.w,fill:t.fill}),e.jsx("rect",{x:"1.5",y:"10.5",width:"5.5",height:"4",rx:"1.2",stroke:t.stroke,strokeWidth:t.w,fill:t.fill})]})},Te=({active:r})=>{const t=_(r);return e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("rect",{x:"2",y:"9",width:"3",height:"5.5",rx:"0.8",stroke:t.stroke,strokeWidth:t.w,fill:t.fill}),e.jsx("rect",{x:"6.5",y:"5.5",width:"3",height:"9",rx:"0.8",stroke:t.stroke,strokeWidth:t.w,fill:t.fill}),e.jsx("rect",{x:"11",y:"2.5",width:"3",height:"12",rx:"0.8",stroke:t.stroke,strokeWidth:t.w,fill:t.fill}),e.jsx("line",{x1:"1",y1:"15",x2:"15",y2:"15",stroke:t.stroke,strokeWidth:t.w,strokeLinecap:t.cap})]})},Re=({active:r})=>{const t=_(r);return e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("path",{d:"M8 1.5A4.5 4.5 0 0 0 3.5 6v3.5l-1 1.5h11l-1-1.5V6A4.5 4.5 0 0 0 8 1.5Z",stroke:t.stroke,strokeWidth:t.w,strokeLinejoin:t.join,fill:t.fill}),e.jsx("path",{d:"M6.5 11.5a1.5 1.5 0 0 0 3 0",stroke:t.stroke,strokeWidth:t.w,strokeLinecap:t.cap})]})},Pe=({active:r})=>{const t=_(r);return e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("rect",{x:"4",y:"4",width:"8",height:"8",rx:"1.5",stroke:t.stroke,strokeWidth:t.w,fill:t.fill}),e.jsx("rect",{x:"5.8",y:"5.8",width:"4.4",height:"4.4",rx:"0.8",stroke:t.stroke,strokeWidth:"1",fill:t.faint}),e.jsx("path",{d:"M6 1.5V4M8 1.5V4M10 1.5V4M6 12v2.5M8 12v2.5M10 12v2.5M1.5 6H4M1.5 8H4M1.5 10H4M12 6h2.5M12 8h2.5M12 10h2.5",stroke:t.stroke,strokeWidth:"1.3",strokeLinecap:t.cap})]})},We=({active:r})=>{const t=_(r);return e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("path",{d:"M8 1.5C5.5 3.5 4.5 7 4.5 9l2.5 2.5c2 0 5.5-1 7.5-3.5C15 3 13 1 8 1.5Z",stroke:t.stroke,strokeWidth:t.w,strokeLinejoin:t.join,fill:t.fill}),e.jsx("path",{d:"M4.5 9L2.5 11l.8 2.2L5.5 12.5 7 11",stroke:t.stroke,strokeWidth:t.w,strokeLinecap:t.cap,strokeLinejoin:t.join}),e.jsx("circle",{cx:"9.5",cy:"6.5",r:"1.3",stroke:t.stroke,strokeWidth:"1.3"})]})},De=({active:r})=>{const t=_(r);return e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("path",{d:"M1.5 4l4.5-2 4.5 2 4.5-2v10l-4.5 2-4.5-2-4.5 2Z",stroke:t.stroke,strokeWidth:t.w,strokeLinejoin:t.join,fill:t.fill}),e.jsx("line",{x1:"6",y1:"2",x2:"6",y2:"14",stroke:t.stroke,strokeWidth:"1",strokeLinecap:t.cap,opacity:"0.45"}),e.jsx("line",{x1:"10.5",y1:"2",x2:"10.5",y2:"14",stroke:t.stroke,strokeWidth:"1",strokeLinecap:t.cap,opacity:"0.45"})]})},Oe=({active:r})=>{const t=_(r);return e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("circle",{cx:"8",cy:"8",r:"2",stroke:t.stroke,strokeWidth:t.w}),e.jsx("path",{d:"M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41",stroke:t.stroke,strokeWidth:"1.4",strokeLinecap:t.cap})]})},Be=()=>e.jsx("svg",{width:"13",height:"13",viewBox:"0 0 14 14",fill:"none",children:e.jsx("path",{d:"M9 11L5 7l4-4",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})}),Ve=()=>e.jsx("svg",{width:"13",height:"13",viewBox:"0 0 14 14",fill:"none",children:e.jsx("path",{d:"M5 11l4-4-4-4",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})}),Ue=()=>e.jsx("svg",{width:"13",height:"13",viewBox:"0 0 14 14",fill:"none",children:e.jsx("path",{d:"M4.5 5.5L7 3l2.5 2.5M4.5 8.5L7 11l2.5-2.5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})}),Fe=()=>e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("path",{d:"M2 4.5h8M12 4.5h2",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round"}),e.jsx("circle",{cx:"11",cy:"4.5",r:"1.5",stroke:"currentColor",strokeWidth:"1.3"}),e.jsx("path",{d:"M2 11.5h2M6 11.5h8",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round"}),e.jsx("circle",{cx:"4.5",cy:"11.5",r:"1.5",stroke:"currentColor",strokeWidth:"1.3"})]}),He=()=>e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("path",{d:"M6.5 3H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3.5",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round"}),e.jsx("path",{d:"M11 5.5L13.5 8 11 10.5",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("line",{x1:"7",y1:"8",x2:"13.5",y2:"8",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round"})]}),$e=({active:r})=>{const t=_(r);return e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("path",{d:"M14 7.5a6 6 0 0 1-6 6 5.97 5.97 0 0 1-3.07-.84L2 13.5l.84-2.93A5.97 5.97 0 0 1 2 7.5a6 6 0 0 1 12 0Z",stroke:t.stroke,strokeWidth:t.w,strokeLinejoin:t.join,fill:t.fill}),e.jsx("circle",{cx:"5.5",cy:"7.5",r:"0.8",fill:t.dot}),e.jsx("circle",{cx:"8",cy:"7.5",r:"0.8",fill:t.dot}),e.jsx("circle",{cx:"10.5",cy:"7.5",r:"0.8",fill:t.dot})]})},Ke=({active:r})=>{const t=_(r);return e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("rect",{x:"2",y:"5.5",width:"12",height:"8",rx:"2",stroke:t.stroke,strokeWidth:t.w,fill:t.fill}),e.jsx("circle",{cx:"5.5",cy:"9.5",r:"1.2",fill:t.dot}),e.jsx("circle",{cx:"10.5",cy:"9.5",r:"1.2",fill:t.dot}),e.jsx("path",{d:"M6 12.5h4",stroke:t.stroke,strokeWidth:"1.2",strokeLinecap:t.cap,opacity:"0.6"}),e.jsx("path",{d:"M8 5.5V3",stroke:t.stroke,strokeWidth:t.w,strokeLinecap:t.cap}),e.jsx("circle",{cx:"8",cy:"2.5",r:"0.8",fill:t.dot}),e.jsx("path",{d:"M1 8.5H2M14 8.5h1",stroke:t.stroke,strokeWidth:t.w,strokeLinecap:t.cap,opacity:"0.5"})]})},qe=({active:r})=>{const t=_(r);return e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("path",{d:"M13.5 5L8 2 2.5 5v6L8 14l5.5-3V5Z",stroke:t.stroke,strokeWidth:t.w,strokeLinejoin:t.join,fill:t.fill}),e.jsx("path",{d:"M8 2v12",stroke:t.stroke,strokeWidth:"1",strokeLinecap:t.cap,opacity:"0.4"}),e.jsx("path",{d:"M2.5 5L8 8l5.5-3",stroke:t.stroke,strokeWidth:"1",strokeLinecap:t.cap,opacity:"0.5"}),e.jsx("path",{d:"M5.25 3.5L10.75 6.5",stroke:t.dot,strokeWidth:"1.1",strokeLinecap:t.cap,opacity:r?.7:.35})]})},Ye=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("circle",{cx:"8",cy:"5.5",r:"2.8",stroke:"currentColor",strokeWidth:"1.5",fill:"none"}),e.jsx("path",{d:"M2.5 13.5c0-3 2.5-4.5 5.5-4.5s5.5 1.5 5.5 4.5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),Ze={sunrise:Se,activity:ze,inbox:_e,"building-2":Ie,target:Le,"kanban-square":Me,receipt:Ee,"refresh-cw":Ce,"layout-dashboard":Ae,"bar-chart-3":Te,bell:Re,cpu:Pe,rocket:We,map:De,configure:Oe,"chevron-left":Be,"chevron-right":Ve,"chevrons-up-down":Ue,"sliders-horizontal":Fe,"log-out":He,"message-circle":$e,bot:Ke,package:qe},B=({name:r,active:t})=>{const a=Ze[r];return a?e.jsx(a,{active:t}):null},Je=`
/* ─── CSS variable wiring for icon colours ─────────────────────────────────── */
.sb-item{
  --sb-ic-stroke: var(--ink4);
  --sb-ic-active: var(--p);
  --sb-ic-fill:   color-mix(in srgb, var(--p) 12%, transparent);
  --sb-ic-faint:  color-mix(in srgb, var(--p)  7%, transparent);
  --sb-ic-dot:    var(--ink4);
  color: var(--ink4);
}
.sb-item.on{
  --sb-ic-stroke: var(--p);
  --sb-ic-active: var(--p);
  --sb-ic-fill:   color-mix(in srgb, var(--p) 15%, transparent);
  --sb-ic-faint:  color-mix(in srgb, var(--p)  8%, transparent);
  --sb-ic-dot:    var(--p);
  color: var(--p);
}
.sb-item:hover:not(.on){
  --sb-ic-stroke: var(--ink2);
  --sb-ic-dot:    var(--ink2);
  color: var(--p);
}

/* ─── Shell ──────────────────────────────────────────────────────────────────── */
.sb{
  width:212px;flex-shrink:0;
  background:var(--bg2);
  border-right:0.5px solid var(--brd2);
  display:flex;flex-direction:column;
  height:100vh;
  transition:width .22s cubic-bezier(.4,0,.2,1);
  overflow:hidden;position:relative;z-index:50;
}
.sb.collapsed{width:54px}

/* ─── Brand ─────────────────────────────────────────────────────────────────── */
.sb-brand{
  height:54px;display:flex;align-items:center;gap:9px;
  padding:0 14px;flex-shrink:0;
  border-bottom:0.5px solid var(--brd2);
  background:linear-gradient(180deg,color-mix(in srgb,var(--p) 3%,var(--bg2)) 0%,var(--bg2) 100%);
}
.sb-brand-name{
  font-weight:700;font-size:23px;color:var(--p);
  letter-spacing:-0.03em;
}
.sb.collapsed .sb-brand{padding:0;justify-content:center}
.sb.collapsed .sb-brand-name{display:none}

/* ─── Nav scroll area ───────────────────────────────────────────────────────── */
.sb-nav{flex:1;overflow-y:auto;overflow-x:hidden;padding:8px 6px;scrollbar-width:none}
.sb-nav::-webkit-scrollbar{display:none}
.sb.collapsed .sb-nav{padding:8px 6px}

/* ─── Section labels ────────────────────────────────────────────────────────── */
.sb-lbl{
  display:flex;align-items:center;gap:6px;
  font-size:9px;font-weight:700;letter-spacing:0.11em;
  text-transform:uppercase;color:var(--ink5);
  padding:14px 8px 5px;
  white-space:nowrap;overflow:hidden;
  font-family:"IBM Plex Mono",monospace;
  opacity:0.75;
}
.sb-lbl::before{
  content:"";
  display:block;width:2px;height:8px;border-radius:2px;
  background:linear-gradient(180deg,var(--p),color-mix(in srgb,var(--p) 40%,transparent));
  flex-shrink:0;opacity:0.55;
}
.sb.collapsed .sb-lbl{opacity:0;height:0;padding:0;pointer-events:none}

/* ─── Nav items ─────────────────────────────────────────────────────────────── */
.sb-item{
  display:flex;align-items:center;gap:10px;
  padding:5px 7px;border-radius:9px;
  cursor:pointer;
  transition:background .13s, color .13s, border-color .13s, box-shadow .13s;
  margin-bottom:1px;
  border:0.5px solid transparent;
  white-space:nowrap;min-width:0;position:relative;
  font-size:12.5px;user-select:none;
  letter-spacing:-0.005em;
}
.sb-item:hover{
  background:color-mix(in srgb,var(--p) 6%,transparent);
}
.sb-item.on{
  background:color-mix(in srgb,var(--p) 10%,transparent);
  border-color:color-mix(in srgb,var(--p) 18%,transparent);
  font-weight:500;
  box-shadow:inset 0 0 0 0.5px color-mix(in srgb,var(--p) 20%,transparent),
             0 1px 3px color-mix(in srgb,var(--p) 8%,transparent);
}

.sb-item .si-ic{
  flex-shrink:0;width:27px;height:27px;
  display:flex;align-items:center;justify-content:center;
  border-radius:7px;
  transition:background .15s, box-shadow .15s;
}
.sb-item:hover .si-ic{
  background:color-mix(in srgb,var(--p) 9%,transparent);
}
.sb-item.on .si-ic{
  background:color-mix(in srgb,var(--p) 14%,transparent);
  box-shadow:0 1px 5px color-mix(in srgb,var(--p) 22%,transparent);
}

.sb-item .si-nm{flex:1;min-width:0;overflow:hidden}

.sb.collapsed .sb-item{
  justify-content:center;padding:0;margin:2px auto;
  width:38px;height:36px;border-radius:9px;gap:0;
}
.sb.collapsed .sb-item .si-nm,.sb.collapsed .sb-item .si-cnt{display:none}
.sb.collapsed .sb-item .si-ic{width:34px;height:34px;border-radius:9px}
.sb.collapsed .sb-item::after{
  content:attr(data-tip);position:absolute;left:calc(100% + 8px);top:50%;
  transform:translateY(-50%);
  background:var(--ink);color:var(--bg2);
  font-size:10.5px;padding:3px 8px;border-radius:6px;
  white-space:nowrap;pointer-events:none;opacity:0;z-index:200;
  transition:opacity .12s;font-weight:500;
}
.sb.collapsed .sb-item:hover::after{opacity:1}

/* ─── Badges ────────────────────────────────────────────────────────────────── */
.si-cnt{
  font-family:"IBM Plex Mono",monospace;font-size:10px;
  color:var(--ink5);background:var(--bg3);
  padding:1px 6px;border-radius:8px;flex-shrink:0;
}
.sb-item.on .si-cnt{
  background:color-mix(in srgb,var(--p) 14%,transparent);
  color:var(--p);
}
.si-cnt.alert{background:var(--p);color:#fff}
.si-cnt.live{background:var(--ok);color:#fff}
.si-cnt.warn{background:var(--wab);color:var(--waf)}
.si-cnt.dot{padding:0;width:7px;height:7px;border-radius:50%;background:var(--ri) !important}

/* ─── Divider ───────────────────────────────────────────────────────────────── */
.sb-div{height:0.5px;background:var(--brd2);margin:8px 6px}
.sb.collapsed .sb-div{margin:8px auto;width:24px}

/* ─── Footer / identity card ────────────────────────────────────────────────── */
.sb-footer{padding:0;flex-shrink:0}

.sb-identity-card{
  border-radius:0;border:none;
  border-top:0.5px solid var(--brd2);
  background:
    linear-gradient(180deg,
      color-mix(in srgb,var(--p) 5%,var(--bg2)) 0%,
      color-mix(in srgb,var(--bg3) 55%,var(--bg2)) 100%
    );
  overflow:hidden;transition:background .15s;
  position:relative;
}
.sb-identity-card::before{
  content:"";
  display:block;height:1px;width:100%;
  background:linear-gradient(90deg,
    transparent 0%,
    color-mix(in srgb,var(--p) 35%,transparent) 30%,
    color-mix(in srgb,var(--p) 35%,transparent) 70%,
    transparent 100%
  );
  position:absolute;top:0;left:0;
}
.sb-identity-card:hover{
  background:
    linear-gradient(180deg,
      color-mix(in srgb,var(--p) 7%,var(--bg2)) 0%,
      color-mix(in srgb,var(--p) 3%,var(--bg3)) 100%
    );
}

.sb.collapsed .sb-footer{padding:0}
.sb.collapsed .sb-identity-card{
  display:flex;flex-direction:column;align-items:center;gap:2px;
  padding:6px 0 8px;border-radius:0;
  border-top:0.5px solid var(--brd2);
}

/* ── Org row ── */
.sb-org{
  display:flex;align-items:center;gap:10px;
  padding:10px 12px 7px;overflow:hidden;cursor:default;
}
.sb-org-mark{
  width:34px;height:34px;min-width:34px;
  border-radius:50%;overflow:hidden;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
  background:var(--bg2);
  border:1.5px solid color-mix(in srgb,var(--p) 22%,var(--brd2));
  box-shadow:0 0 0 2.5px color-mix(in srgb,var(--p) 10%,transparent),
             0 2px 6px color-mix(in srgb,var(--p) 15%,transparent);
}
.sb-org-mark img{width:100%;height:100%;object-fit:cover;display:block}
.sb-org-initials{font-weight:700;font-size:11px;color:var(--p);letter-spacing:-0.02em;font-family:inherit}
.sb-org-text{min-width:0;flex:1;overflow:hidden;line-height:1.25}
.sb-org-label{font-size:8px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--ink5);margin-bottom:1px;opacity:0.7}
.sb-org-name{font-size:12px;font-weight:600;color:var(--ink2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:-0.015em}
.sb-org-plan{
  font-size:8px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;
  color:var(--p);
  background:color-mix(in srgb,var(--p) 12%,transparent);
  border:0.5px solid color-mix(in srgb,var(--p) 22%,transparent);
  border-radius:4px;padding:1px 5px;
  display:inline-block;margin-top:2px;
}
.sb.collapsed .sb-org{justify-content:center;padding:4px 0;width:100%}
.sb.collapsed .sb-org-text{display:none}

/* ── Divider inside card ── */
.sb-card-div{height:0.5px;background:var(--brd2);margin:0 12px;opacity:0.7}
.sb.collapsed .sb-card-div{width:26px;margin:2px auto;opacity:0.5;display:block}

/* ── User row ── */
.sb-user{
  display:flex;align-items:center;gap:10px;
  padding:7px 12px 10px;cursor:pointer;
  border-radius:0 0 14px 14px;
  transition:background .13s;
  overflow:hidden;position:relative;
}
.sb-user:hover{background:color-mix(in srgb,var(--p) 6%,transparent)}
.sb-user.menu-open{background:color-mix(in srgb,var(--p) 8%,transparent)}

.sb-avatar{
  width:34px;height:34px;min-width:34px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:12px;font-weight:700;color:#fff;
  background:var(--pg);
  overflow:hidden;letter-spacing:-0.02em;flex-shrink:0;
  border:1.5px solid color-mix(in srgb,var(--p) 22%,var(--brd2));
  box-shadow:0 0 0 2.5px color-mix(in srgb,var(--p) 10%,transparent);
  transition:box-shadow .15s,border-color .15s;
}
.sb-user:hover .sb-avatar{
  border-color:color-mix(in srgb,var(--p) 38%,transparent);
  box-shadow:0 0 0 3px color-mix(in srgb,var(--p) 16%,transparent);
}
.sb-avatar img{width:100%;height:100%;object-fit:cover;border-radius:50%}
.sb-avatar.pulse{animation:sb-pulse 1.6s ease-in-out infinite}
@keyframes sb-pulse{0%,100%{opacity:.4}50%{opacity:.9}}

.sb-uinfo{min-width:0;flex:1;display:flex;flex-direction:column;gap:0}
.sb-uname{font-size:12px;font-weight:600;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.3;letter-spacing:-0.01em}
.sb-urole{font-size:10px;color:var(--ink4);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.3}
.sb-chev{color:var(--ink5);flex-shrink:0;transition:transform .18s,color .15s}
.sb-chev.open{transform:rotate(180deg)}
.sb-user:hover .sb-chev{color:var(--ink3)}

.sb-sk{border-radius:4px;background:var(--bg3);animation:sb-pulse 1.4s ease-in-out infinite}
.sb-sk.w70{width:70px;height:9px;margin-bottom:5px}
.sb-sk.w44{width:44px;height:8px}

.sb.collapsed .sb-uinfo,.sb.collapsed .sb-chev{display:none}
.sb.collapsed .sb-user{justify-content:center;padding:4px 0;width:100%;border-radius:0 0 14px 14px}
.sb.collapsed .sb-user::after{
  content:attr(data-tip);position:absolute;left:calc(100% + 10px);top:50%;
  transform:translateY(-50%);
  background:var(--ink);color:var(--bg2);
  font-size:10.5px;padding:3px 9px;border-radius:6px;
  white-space:nowrap;pointer-events:none;opacity:0;z-index:200;
  transition:opacity .12s;font-weight:500;
}
.sb.collapsed .sb-user:hover::after{opacity:1}

/* ─── Collapse toggle ───────────────────────────────────────────────────────── */
.sb-collapse-btn{
  position:absolute;top:18px;right:-11px;
  width:22px;height:22px;border-radius:50%;
  background:var(--bg2);border:0.5px solid var(--brd2);
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;color:var(--ink4);z-index:60;
  opacity:0;transition:opacity .12s,background .12s,color .12s;
  box-shadow:var(--sh-s);
}
.sb:hover .sb-collapse-btn{opacity:1}
.sb-collapse-btn:hover{background:var(--p);color:#fff;border-color:var(--p)}

/* ─── Profile popup menu ─────────────────────────────────────────────────────── */
.sb-profile-menu{
  position:fixed;
  background:var(--bg2);
  border:0.5px solid var(--brd2);
  border-radius:16px;
  box-shadow:var(--sh-l), 0 0 0 1px color-mix(in srgb,var(--p) 6%,transparent);
  z-index:999;overflow:hidden;
  animation:pm-in .18s cubic-bezier(.34,1.26,.64,1);
  transform-origin:bottom left;
}
@keyframes pm-in{from{opacity:0;transform:scale(.93) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}

.sb-pm-email-section{
  padding:10px 14px 9px;
  background:color-mix(in srgb,var(--p) 4%,transparent);
  border-bottom:0.5px solid var(--brd);
}
.sb-pm-email-label{
  font-size:8.5px;font-weight:700;letter-spacing:0.1em;
  text-transform:uppercase;color:var(--ink5);
  margin-bottom:3px;opacity:0.7;
}
.sb-pm-email-val{
  font-family:"IBM Plex Mono",monospace;font-size:10.5px;
  color:var(--ink3);letter-spacing:0.01em;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.sb-pm-identity{
  padding:12px 14px 13px;border-bottom:0.5px solid var(--brd);
  display:flex;align-items:center;gap:12px;
}
.sb-pm-avatar{
  width:40px;height:40px;min-width:40px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:15px;font-weight:700;color:#fff;
  background:var(--pg);overflow:hidden;letter-spacing:-0.02em;flex-shrink:0;
  box-shadow:0 3px 12px color-mix(in srgb,var(--p) 30%,transparent);
}
.sb-pm-avatar img{width:100%;height:100%;object-fit:cover;border-radius:50%}
.sb-pm-details{min-width:0;flex:1;display:flex;flex-direction:column;gap:1px}
.sb-pm-name{
  font-size:13.5px;font-weight:650;color:var(--ink);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  line-height:1.35;letter-spacing:-0.015em;
}
.sb-pm-role{font-size:11px;color:var(--ink4);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.35;margin-top:1px}

.sb-pm-actions{padding:5px}
.sb-pm-item{
  display:flex;align-items:center;gap:10px;
  padding:7.5px 10px;border-radius:9px;
  cursor:pointer;font-size:12.5px;font-weight:500;color:var(--ink2);
  transition:background .12s,color .12s;
  border:none;width:100%;background:none;
  text-align:left;letter-spacing:-0.005em;
}
.sb-pm-item:hover{
  background:color-mix(in srgb,var(--p) 7%,transparent);
  color:var(--ink);
}
.sb-pm-item .pm-ic{
  color:var(--ink4);flex-shrink:0;
  width:27px;height:27px;border-radius:8px;
  background:var(--bg3);border:0.5px solid var(--brd2);
  display:flex;align-items:center;justify-content:center;
  transition:background .12s,color .12s,border-color .12s;
}
.sb-pm-item:hover .pm-ic{
  background:color-mix(in srgb,var(--p) 10%,transparent);
  color:var(--p);
  border-color:color-mix(in srgb,var(--p) 20%,transparent);
}
.sb-pm-item .pm-label{flex:1}
.sb-pm-item.danger{color:var(--ri)}
.sb-pm-item.danger .pm-ic{color:var(--ri);background:var(--rib);border-color:color-mix(in srgb,var(--ri) 20%,transparent)}
.sb-pm-item.danger:hover{background:var(--rib);color:var(--ri)}
.sb-pm-div{height:0.5px;background:var(--brd2);margin:3px 4px}

.sb-pm-cfg-arrow{
  display:flex;align-items:center;justify-content:center;
  width:20px;height:20px;border-radius:6px;
  border:0.5px solid var(--brd2);background:var(--bg3);
  color:var(--ink5);cursor:pointer;
  transition:background .12s,color .12s,border-color .12s;
  flex-shrink:0;padding:0;
}
.sb-pm-cfg-arrow:hover{
  background:color-mix(in srgb,var(--p) 10%,transparent);
  color:var(--p);
  border-color:color-mix(in srgb,var(--p) 25%,transparent);
}
.sb-pm-cfg-arrow.open,.sb-pm-cfg-arrow.active{
  background:color-mix(in srgb,var(--p) 14%,transparent);
  color:var(--p);
  border-color:color-mix(in srgb,var(--p) 30%,transparent);
}

/* ── Configure flyout ── */
.sb-configure-flyout{
  position:fixed;
  background:var(--bg2);
  border:0.5px solid var(--brd2);
  border-radius:13px;
  box-shadow:var(--sh-l), 0 0 0 1px color-mix(in srgb,var(--p) 5%,transparent);
  z-index:1000;
  width:196px;
  max-height:calc(100vh - 32px);
  overflow-y:auto;
  animation:cfg-fly-in .16s cubic-bezier(.34,1.26,.64,1);
  transform-origin:left center;
  scrollbar-width:thin;
  scrollbar-color:var(--brd2) transparent;
}
.sb-configure-flyout::-webkit-scrollbar{width:4px}
.sb-configure-flyout::-webkit-scrollbar-thumb{background:var(--brd2);border-radius:4px}
@keyframes cfg-fly-in{from{opacity:0;transform:scale(.92) translateX(-8px)}to{opacity:1;transform:scale(1) translateX(0)}}
.sb-cfg-header{
  font-size:8.5px;font-weight:700;letter-spacing:0.10em;
  text-transform:uppercase;color:var(--ink5);
  padding:10px 14px 7px;border-bottom:0.5px solid var(--brd);
  opacity:0.75;
  position:sticky;top:0;background:var(--bg2);z-index:1;
}
.sb-cfg-item{
  display:flex;align-items:center;gap:10px;
  padding:8px 10px;width:100%;
  background:none;border:none;text-align:left;
  font-size:12.5px;font-weight:400;color:var(--ink2);
  cursor:pointer;transition:background .11s,color .11s;font-family:inherit;
}
.sb-cfg-item:last-child{border-radius:0 0 13px 13px}
.sb-cfg-item:hover{background:color-mix(in srgb,var(--p) 6%,transparent);color:var(--ink)}
.sb-cfg-item.on{background:color-mix(in srgb,var(--p) 10%,transparent);color:var(--p);font-weight:500}
.sb-cfg-item .cfg-ic{
  --sb-ic-stroke:var(--ink4);
  --sb-ic-active:var(--p);
  --sb-ic-fill:color-mix(in srgb,var(--p) 12%,transparent);
  --sb-ic-faint:color-mix(in srgb,var(--p) 7%,transparent);
  --sb-ic-dot:var(--ink4);
  width:26px;height:26px;border-radius:7px;
  background:var(--bg3);border:0.5px solid var(--brd);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
  transition:background .12s;
}
.sb-cfg-item:hover .cfg-ic{
  background:color-mix(in srgb,var(--p) 9%,transparent);
  border-color:color-mix(in srgb,var(--p) 18%,transparent);
}
.sb-cfg-item.on .cfg-ic{
  --sb-ic-stroke:var(--p);--sb-ic-dot:var(--p);
  background:color-mix(in srgb,var(--p) 13%,transparent);
  border-color:color-mix(in srgb,var(--p) 22%,transparent);
}
`,Ge=({view:r,setView:t,collapsed:a,setCollapsed:c,profile:s,profileLoading:b=!1,orgBranding:I,navCounts:w={},onProfileClick:d})=>{var te;const[g,y]=o.useState(!1),[l,f]=o.useState(!1),[E,R]=o.useState({bottom:0,left:0}),P=o.useRef(0),N=o.useRef(null),L=o.useRef(null),j=o.useRef(null),M=o.useRef(null),h=Ne(),{logoUrl:k,orgName:C,orgPlan:T}=I??h;o.useEffect(()=>{if(!g&&!l)return;const u=S=>{var re,oe,se;const F=(re=L.current)==null?void 0:re.contains(S.target),me=(oe=j.current)==null?void 0:oe.contains(S.target),xe=(se=N.current)==null?void 0:se.contains(S.target);!F&&!me&&!xe&&(y(!1),f(!1))};return document.addEventListener("mousedown",u),()=>document.removeEventListener("mousedown",u)},[g,l]);const W=()=>{if(N.current){const u=N.current.getBoundingClientRect();R({bottom:window.innerHeight-u.top+6,left:u.left})}y(u=>!u),f(!1)},n=u=>{if(u.stopPropagation(),l){f(!1);return}if(M.current){const S=M.current.getBoundingClientRect();P.current=S.right+6}f(!0)},p=[{id:"pulse",name:"Pulse Stream",ic:"activity",kind:"alert"},{id:"inbox",name:"Intake",ic:"inbox",count:w.inbox,kind:"alert"}],i=[{id:"accounts",name:"Accounts",ic:"building-2",count:w.accounts,kind:"alert"},{id:"deals",name:"Opportunity",ic:"target",count:w.deals,kind:"alert"}],x=[{id:"dashboard",name:"Dashboard",ic:"layout-dashboard"},{id:"reports",name:"Report",ic:"bar-chart-3"}],m=[{id:"conversations",name:"Conversations",ic:"message-circle",count:3,kind:"alert"},{id:"inventory",name:"Inventory",ic:"package"}],V=[{id:"rhythm",name:"Today",ic:"sunrise",count:5,kind:"alert"},{id:"notifications",name:"Notifications",ic:"bell",count:3,kind:"alert"},{id:"automation",name:"Automation",ic:"cpu",count:3,kind:"live"},{id:"onboarding",name:"Quick Start",ic:"rocket"},{id:"journey",name:"Journey",ic:"map"},{id:"projects",name:"Project",ic:"kanban-square"},{id:"finance",name:"Finance",ic:"receipt"},{id:"renewal",name:"Renewal",ic:"refresh-cw"},{id:"testinbox",name:"Test Inbox",ic:"inbox"}],D=u=>u.map(S=>{const F=r===S.id;return e.jsxs("div",{className:"sb-item"+(F?" on":""),"data-tip":S.name,onClick:()=>t(S.id),children:[e.jsx("span",{className:"si-ic",children:e.jsx(B,{name:S.ic,active:F})}),e.jsx("span",{className:"si-nm",children:S.name}),S.count!=null&&e.jsx("span",{className:"si-cnt"+(S.kind?" "+S.kind:""),children:S.count})]},S.id)}),A=(s==null?void 0:s.displayName)||(s!=null&&s.firstName&&(s!=null&&s.lastName)?`${s.firstName} ${s.lastName}`:"")||((te=s==null?void 0:s.email)==null?void 0:te.split("@")[0])||"User",O=(s==null?void 0:s.role)||sessionStorage.getItem("zotra_role")||"",X=(s==null?void 0:s.email)||"",ee=ye(s??null),le=b?"Loading…":A,{clearAuth:ce}=G(),de=V.some(u=>u.id===r),pe=(C||"").split(" ").map(u=>u[0]).join("").slice(0,2).toUpperCase(),he={position:"fixed",left:P.current,top:"50%",transform:"translateY(-50%)",maxHeight:"calc(100vh - 32px)",overflowY:"auto"};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:Je}),e.jsxs("aside",{className:"sb"+(a?" collapsed":""),children:[e.jsx("div",{className:"sb-collapse-btn",onClick:()=>c(!a),children:e.jsx(B,{name:a?"chevron-right":"chevron-left"})}),e.jsxs("div",{className:"sb-brand",children:[e.jsx("img",{src:"https://zotra.blob.core.windows.net/content/logo.png",alt:"Zotra",style:{width:36,height:36,borderRadius:6,flexShrink:0}}),e.jsx("span",{className:"sb-brand-name",children:"zotra"})]}),e.jsxs("nav",{className:"sb-nav",children:[e.jsx("div",{className:"sb-lbl",children:"Today"}),D(p),e.jsx("div",{className:"sb-lbl",children:"Records"}),D(i),e.jsx("div",{className:"sb-lbl",children:"Insights"}),D(x),e.jsx("div",{className:"sb-lbl",children:"Conversation Asst."}),D(m)]}),e.jsx("div",{className:"sb-footer",ref:N,children:e.jsxs("div",{className:"sb-identity-card",children:[(k||C)&&e.jsxs("div",{className:"sb-org",children:[e.jsx("span",{className:"sb-org-mark",children:k?e.jsx("img",{src:k,alt:C}):e.jsx("span",{className:"sb-org-initials",children:pe})}),e.jsxs("div",{className:"sb-org-text",children:[e.jsx("div",{className:"sb-org-label",children:"Organisation"}),e.jsx("div",{className:"sb-org-name",children:C}),T&&e.jsx("div",{className:"sb-org-plan",children:T})]})]}),e.jsxs("div",{className:"sb-user"+(g?" menu-open":""),"data-tip":le,onClick:W,children:[e.jsx("div",{className:"sb-avatar"+(b?" pulse":""),children:!b&&(s!=null&&s.avatarUrl?e.jsx("img",{src:s.avatarUrl,alt:A}):ee)}),e.jsx("div",{className:"sb-uinfo",children:b?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"sb-sk w70"}),e.jsx("div",{className:"sb-sk w44",style:{marginTop:4}})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"sb-uname",children:A}),O&&e.jsx("div",{className:"sb-urole",children:O})]})}),e.jsx("span",{className:"sb-chev"+(g?" open":""),children:e.jsx(B,{name:"chevrons-up-down"})})]})]})})]}),g&&e.jsxs("div",{ref:L,className:"sb-profile-menu",style:{bottom:E.bottom,left:E.left,width:a?228:220},children:[X&&e.jsxs("div",{className:"sb-pm-email-section",ref:M,children:[e.jsx("div",{className:"sb-pm-email-label",children:"Signed in as"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx("div",{className:"sb-pm-email-val",style:{flex:1},children:X}),e.jsx("button",{className:"sb-pm-cfg-arrow"+(l?" open":"")+(de?" active":""),onClick:n,title:"Configure",children:e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:e.jsx("path",{d:"M4.5 2.5L8 6l-3.5 3.5",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})})]})]}),e.jsxs("div",{className:"sb-pm-identity",children:[e.jsx("div",{className:"sb-pm-avatar",children:s!=null&&s.avatarUrl?e.jsx("img",{src:s.avatarUrl,alt:A}):ee}),e.jsxs("div",{className:"sb-pm-details",children:[e.jsx("div",{className:"sb-pm-name",children:A}),O&&e.jsx("div",{className:"sb-pm-role",children:O})]})]}),e.jsxs("div",{className:"sb-item sb-profile-nav"+(r==="profile"?" on":""),"data-tip":"My Profile",onClick:()=>{d==null||d()},style:{margin:"0 6px 4px"},children:[e.jsx("span",{className:"si-ic",children:e.jsx(Ye,{})}),e.jsx("span",{className:"si-nm",children:"My Profile"})]}),e.jsxs("div",{className:"sb-pm-actions",children:[e.jsxs("button",{className:"sb-pm-item",onClick:()=>{y(!1),t("settings")},children:[e.jsx("span",{className:"pm-ic",children:e.jsx(B,{name:"sliders-horizontal"})}),e.jsx("span",{className:"pm-label",children:"Settings"})]}),e.jsx("div",{className:"sb-pm-div"}),e.jsxs("button",{className:"sb-pm-item danger",onClick:async()=>{y(!1),f(!1),await be(),ce(),sessionStorage.clear(),window.location.href="/login"},children:[e.jsx("span",{className:"pm-ic",children:e.jsx(B,{name:"log-out"})}),e.jsx("span",{className:"pm-label",children:"Log out"})]})]})]}),l&&P.current>0&&e.jsxs("div",{ref:j,className:"sb-configure-flyout",style:he,children:[e.jsx("div",{className:"sb-cfg-header",children:"Configure"}),V.map(u=>{const S=r===u.id;return e.jsxs("button",{className:"sb-cfg-item"+(S?" on":""),onClick:()=>{y(!1),f(!1),t(u.id)},children:[e.jsx("span",{className:"cfg-ic",children:e.jsx(B,{name:u.ic,active:S})}),e.jsx("span",{style:{flex:1},children:u.name}),u.count!=null&&e.jsx("span",{style:{fontFamily:"IBM Plex Mono,monospace",fontSize:9.5,padding:"1px 6px",borderRadius:6,background:u.kind==="alert"?"var(--p)":u.kind==="live"?"var(--ok)":"var(--bg3)",color:u.kind==="alert"||u.kind==="live"?"#fff":"var(--ink5)",flexShrink:0},children:u.count})]},u.id)})]})]})};function Qe(r){return r.split("-").map(t=>t[0].toUpperCase()+t.slice(1)).join("")}const v=({name:r,size:t=16,color:a,strokeWidth:c=1.6,className:s="",style:b={}})=>{const I=Qe(r),w=ve[I];return w?e.jsx("span",{className:"ic "+s,style:{display:"inline-flex",alignItems:"center",justifyContent:"center",color:a,...b},children:e.jsx(w,{size:t,strokeWidth:c,color:a})}):e.jsx("span",{className:"ic "+s,style:{display:"inline-flex",alignItems:"center",justifyContent:"center",color:a,...b},children:e.jsx("span",{style:{display:"inline-block",width:t,height:t,background:"currentColor",opacity:.3,borderRadius:"50%"}})})},Bt=[{id:"qualify",name:"Qualify",color:"#9CA3AF"},{id:"shaping",name:"Shaping",color:"#0369A1"},{id:"development",name:"Development",color:"#4F46E5"},{id:"closing",name:"Closing",color:"#16A34A"}],Vt=[{id:"a1",name:"Acme Corp",domain:"acme.com",stage:"qualify",value:48e3,heat:"cool",cycle:8,lastTouch:"2d ago",intent:"Exploring automation options",signals:[1,2,1,3,2,1,2,3,2,1,2,1,1,2],size:"Mid-market",industry:"Manufacturing",temp:32,owner:"Sara Lin"},{id:"a2",name:"Blue Ridge Tech",domain:"blueridge.io",stage:"qualify",value:62e3,heat:"warm",cycle:5,lastTouch:"1d ago",intent:"Evaluating vendor shortlist",signals:[2,3,4,3,2,3,4,5,4,3,4,3,4,5],size:"SMB",industry:"Technology",temp:54,owner:"Tom Reed"},{id:"a3",name:"Cortex Labs",domain:"cortexlabs.ai",stage:"qualify",value:31e3,heat:"cool",cycle:14,lastTouch:"5d ago",intent:"Initial discovery call done",signals:[1,1,2,1,1,2,1,1,2,1,1,2,1,1],size:"Startup",industry:"AI / ML",temp:28,owner:"Sara Lin"},{id:"a4",name:"Dune Analytics",domain:"dune.xyz",stage:"shaping",value:95e3,heat:"warm",cycle:18,lastTouch:"3d ago",intent:"Mapping requirements to platform",signals:[3,4,3,5,4,4,5,4,5,5,4,5,6,5],size:"Mid-market",industry:"Analytics",temp:61,owner:"James Park"},{id:"a5",name:"Ember Systems",domain:"embersys.com",stage:"shaping",value:12e4,heat:"hot",cycle:11,lastTouch:"Today",intent:"Strong intent, scoping POC",signals:[4,5,6,5,7,6,7,8,7,8,7,8,9,9],size:"Enterprise",industry:"Infrastructure",temp:88,owner:"Tom Reed"},{id:"a6",name:"Fluxpoint AI",domain:"fluxpoint.ai",stage:"shaping",value:74e3,heat:"warm",cycle:22,lastTouch:"2d ago",intent:"Aligning on integration approach",signals:[3,3,4,3,4,4,3,5,4,4,5,4,4,5],size:"SMB",industry:"AI / ML",temp:57,owner:"Sara Lin"},{id:"a7",name:"Grayscale IO",domain:"grayscale.io",stage:"shaping",value:58e3,heat:"cool",cycle:31,lastTouch:"6d ago",intent:"Slowed down, champion changed",signals:[2,2,1,2,1,1,2,1,1,2,1,1,1,1],size:"Mid-market",industry:"FinTech",temp:22,owner:"James Park"},{id:"a8",name:"Harbour Cloud",domain:"harbourcloud.co",stage:"development",value:21e4,heat:"hot",cycle:9,lastTouch:"Today",intent:"Business case approved, moving fast",signals:[5,6,7,6,8,7,8,9,8,9,9,9,10,10],size:"Enterprise",industry:"Cloud / SaaS",temp:94,owner:"Tom Reed"},{id:"a9",name:"Iris Dynamics",domain:"irisdyn.com",stage:"development",value:145e3,heat:"warm",cycle:27,lastTouch:"1d ago",intent:"Proposal review with exec sponsor",signals:[4,5,4,6,5,5,6,5,6,7,6,6,7,6],size:"Mid-market",industry:"Robotics",temp:68,owner:"Sara Lin"},{id:"a10",name:"Juno Software",domain:"junosoft.dev",stage:"development",value:88e3,heat:"warm",cycle:35,lastTouch:"4d ago",intent:"Technical validation in progress",signals:[3,4,3,4,4,3,4,4,3,4,3,4,4,3],size:"SMB",industry:"Dev Tools",temp:51,owner:"James Park"},{id:"a11",name:"Kindred Systems",domain:"kindredsys.com",stage:"development",value:165e3,heat:"hot",cycle:16,lastTouch:"Today",intent:"Legal reviewing MSA terms",signals:[5,6,5,7,6,7,8,7,8,8,9,8,9,10],size:"Enterprise",industry:"Security",temp:85,owner:"Tom Reed"},{id:"a12",name:"Luma Ventures",domain:"lumavc.com",stage:"closing",value:31e4,heat:"hot",cycle:6,lastTouch:"Today",intent:"Final pricing call scheduled",signals:[7,8,8,9,8,9,9,10,9,10,10,10,10,10],size:"Enterprise",industry:"Venture / PE",temp:97,owner:"Tom Reed"},{id:"a13",name:"Mosaic Health",domain:"mosaichealth.io",stage:"closing",value:195e3,heat:"hot",cycle:12,lastTouch:"Yesterday",intent:"Verbal commit, awaiting signature",signals:[6,7,7,8,8,9,8,9,9,10,9,10,10,10],size:"Mid-market",industry:"Health Tech",temp:91,owner:"Sara Lin"},{id:"a14",name:"Novu Platforms",domain:"novu.io",stage:"closing",value:78e3,heat:"warm",cycle:19,lastTouch:"2d ago",intent:"Procurement aligned, minor redlines",signals:[5,5,6,6,5,6,6,7,6,7,7,6,7,7],size:"SMB",industry:"Productivity",temp:73,owner:"James Park"}],q=r=>r?"av-"+(1+(r.charCodeAt(0)+(r.charCodeAt(1)||0))%7):"av-1",Ut=r=>r>=1e6?"$"+(r/1e6).toFixed(1)+"M":r>=1e3?"$"+Math.round(r/1e3)+"K":"$"+r,Ft=r=>r.split(" ").slice(0,2).map(t=>t[0]).join("").toUpperCase(),Xe=[{type:"query",label:"Accounts cooling off this week"},{type:"query",label:"Deals at risk of slipping the quarter"},{type:"query",label:"Who hasn't replied to me in 7 days?"},{type:"query",label:"Pipeline by industry"},{type:"action",label:"Draft a follow-up for Acme Robotics"},{type:"action",label:"Schedule a re-engage sequence for dormant accounts"},{type:"action",label:"Brief me on Kairo Health"}];function et(){const r=ne();return r?{Authorization:`Bearer ${r}`}:{}}const tt=`
.tb{flex-shrink:0;background:var(--bg2);border-top:0.5px solid var(--brd);display:flex;align-items:center;justify-content:center;padding:10px 16px;gap:12px;position:relative;z-index:40}
.tb-omni{flex:1;max-width:720px;min-width:160px;position:relative}
.tb-omni-wrap{height:40px;border:1px solid var(--brd2);border-radius:12px;background:var(--bg);display:flex;align-items:center;padding:0 12px 0 14px;gap:10px;cursor:text;transition:border-color .12s,background .12s,box-shadow .12s}
.tb-omni-wrap:hover{border-color:var(--brd3)}
.tb-omni-wrap.focused{border-color:var(--p);background:var(--bg2);box-shadow:0 0 0 3px rgba(75,72,200,0.10)}
.tb-omni-ic{color:var(--ink4);flex-shrink:0}
.tb-omni-wrap.focused .tb-omni-ic{color:var(--p)}
.tb-omni-input{flex:1;background:transparent;border:0;outline:0;font-family:inherit;font-size:13px;color:var(--ink);min-width:0;font-weight:500}
.tb-omni-input::placeholder{color:var(--ink4);font-weight:400}
.tb-omni-kbd{font-family:"DM Mono",monospace;font-size:9.5px;color:var(--ink5);background:var(--bg2);border:0.5px solid var(--brd2);padding:1px 6px;border-radius:4px;flex-shrink:0;font-weight:500}
.tb-omni-mode{display:flex;align-items:center;gap:5px;height:26px;padding:0 10px;border-radius:7px;background:var(--pp);color:var(--p);font-size:10.5px;font-weight:600;font-family:"DM Mono",monospace;letter-spacing:.04em;text-transform:uppercase;flex-shrink:0;cursor:pointer;border:0.5px solid var(--brd2)}
.tb-omni-mode:hover{background:var(--p);color:#fff}
.tb-omni-attach{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:7px;background:var(--bg2);color:var(--ink4);cursor:pointer;flex-shrink:0;border:0.5px solid var(--brd2);transition:all .12s}
.tb-omni-attach:hover{border-color:var(--p);color:var(--p);background:var(--pp)}
.tb-omni-attach.has-file{border-color:var(--p);color:var(--p);background:var(--pp)}
.tb-omni-file-pill{max-width:132px;display:flex;align-items:center;gap:5px;height:24px;padding:0 8px;border-radius:7px;background:var(--pp);color:var(--p);border:0.5px solid var(--brd2);font-size:10.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex-shrink:0}
.tb-omni-file-pill span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tb-omni-send{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:7px;background:var(--p);color:#fff;cursor:pointer;flex-shrink:0;border:0;transition:background .12s}
.tb-omni-send:hover{background:var(--pd)}
.tb-omni-send:disabled{background:var(--bg3);color:var(--ink5);cursor:default}
.omni-dd{position:absolute;bottom:calc(100% + 8px);left:0;right:0;background:var(--bg2);border:0.5px solid var(--brd2);border-radius:14px;box-shadow:0 -12px 36px -8px rgba(60,50,150,.18),0 0 0 0.5px var(--brd2);z-index:200;overflow:hidden;animation:omni-fade-up .14s ease-out;max-height:60vh;display:flex;flex-direction:column}
.omni-dd-scroll{overflow-y:auto;flex:1;min-height:0}
.omni-dd-modes{display:flex;gap:6px;padding:10px 12px;border-bottom:0.5px solid var(--brd);background:var(--bg3);flex-shrink:0}
.omni-mode-pill{flex:1;display:flex;align-items:center;gap:6px;padding:7px 10px;border-radius:8px;background:var(--bg2);border:0.5px solid var(--brd2);cursor:pointer;font-size:11px;font-weight:600;color:var(--ink3);text-transform:uppercase;font-family:"DM Mono",monospace;letter-spacing:.05em;transition:all .12s;min-width:0}
.omni-mode-pill:hover{border-color:var(--brd3);color:var(--ink2)}
.omni-mode-pill.on{background:var(--p);border-color:var(--p);color:#fff}
.omni-mode-pill-hint{font-family:"DM Sans",sans-serif;font-weight:500;font-size:10px;color:var(--ink5);text-transform:none;letter-spacing:0;margin-left:auto;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.omni-mode-pill.on .omni-mode-pill-hint{color:rgba(255,255,255,.85)}
.omni-dd-sect{padding:6px 0}
.omni-dd-sect+.omni-dd-sect{border-top:0.5px solid var(--brd)}
.omni-dd-lbl{font-size:9px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--ink5);padding:7px 14px 4px;display:flex;align-items:center;gap:6px}
.omni-dd-it{display:flex;align-items:center;gap:10px;padding:8px 14px;cursor:pointer;font-size:12.5px;color:var(--ink2);transition:background .1s}
.omni-dd-it:hover,.omni-dd-it.active{background:var(--pu);color:var(--p)}
.omni-dd-it .omni-dd-ic{width:24px;height:24px;border-radius:7px;background:var(--bg3);display:flex;align-items:center;justify-content:center;color:var(--ink4);flex-shrink:0;border:0.5px solid var(--brd2)}
.omni-dd-it.active .omni-dd-ic{background:var(--pp);color:var(--p);border-color:var(--brd2)}
.omni-dd-it .omni-dd-kind{font-family:"DM Mono",monospace;font-size:9px;text-transform:uppercase;letter-spacing:.05em;color:var(--ink5);margin-left:auto;flex-shrink:0}
.omni-dd-footer{padding:8px 14px;background:var(--bg3);border-top:0.5px solid var(--brd);display:flex;align-items:center;gap:14px;font-size:10.5px;color:var(--ink5);font-family:"DM Mono",monospace;flex-shrink:0}
.omni-dd-footer .legend{display:flex;align-items:center;gap:4px}
.omni-toast{position:fixed;bottom:84px;left:50%;transform:translateX(-50%);background:var(--ink);color:#fff;padding:10px 16px;border-radius:10px;font-size:12.5px;box-shadow:0 12px 32px -8px rgba(0,0,0,.4);z-index:300;display:flex;align-items:center;gap:9px;max-width:540px;animation:omni-toast-in .2s ease-out}
.omni-toast-ic{width:22px;height:22px;border-radius:6px;background:var(--ok);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.omni-toast-ic.err{background:#e5566c}
.omni-toast-body{flex:1;min-width:0;line-height:1.4}
.omni-toast-body b{font-weight:600}
.omni-toast-body small{display:block;font-family:"DM Mono",monospace;font-size:10.5px;opacity:.65;margin-top:1px}
.omni-sending{opacity:.6;pointer-events:none}
`,U={ask:{ic:"sparkles",placeholder:"Ask anything — e.g. “which accounts are cooling off this week?”"},go:{ic:"arrow-right",placeholder:"Jump to anything — e.g. “Acme Robotics” or “Inbox”"},do:{ic:"wand-2",placeholder:"Do anything — e.g. “draft a follow-up for Sasha at Northwind”"},log:{ic:"pencil-line",placeholder:"Log a note — e.g. “Met Priya 3pm — she’s the new champion at Kairo”"}},$=["log","do","ask","go"],rt={ask:["Which accounts are cooling off?","What needs my attention today?","Show overdue invoices > 30 days"],go:["Acme Robotics","Inbox","Pulse"],do:["Draft a follow-up for Sasha at Northwind","Schedule a check-in with Kairo Health next week","Create a renewal opportunity for Hartwell Ortho"],log:["Met Priya 3pm — she’s the new champion at Kairo","Call w/ Acme: VP Eng confirmed budget Q1","Northwind signed MSA Thursday — kickoff next week"]},ot=({view:r,setView:t,runQuery:a})=>{var k,C,T,W;const{fullName:c}=G(),[s,b]=o.useState(""),[I,w]=o.useState(!1),[d,g]=o.useState("log"),[y,l]=o.useState(null),[f,E]=o.useState(null),[R,P]=o.useState(!1),N=o.useRef(null),L=o.useRef(null);o.useEffect(()=>{const n=p=>{var x,m;const i=p.key.toLowerCase();(p.metaKey||p.ctrlKey)&&i==="k"&&(p.preventDefault(),(x=N.current)==null||x.focus()),i==="escape"&&document.activeElement===N.current&&((m=N.current)==null||m.blur())};return window.addEventListener("keydown",n),()=>window.removeEventListener("keydown",n)},[]);const j=async()=>{var n;if(!(!s.trim()&&!f)){P(!0);try{const p=new FormData;p.append("sourceType",d.toUpperCase()),p.append("createdBy",c??""),s.trim()&&p.append("content",s.trim()),f&&p.append("file",f);const i=await K(`${Q()}/intakes`,{method:"POST",headers:et(),body:p});if(!i.ok)throw new Error(`${i.status} ${i.statusText}`);l({title:d==="log"?"Note logged":`${d.toUpperCase()} submitted`,sub:f?`${s.trim()?s.trim().slice(0,40)+" · ":""}${f.name}`:s.trim().slice(0,60)}),setTimeout(()=>l(null),3e3),b(""),E(null),L.current&&(L.current.value=""),(n=N.current)==null||n.blur()}catch(p){l({title:"Failed to submit",sub:p.message,err:!0}),setTimeout(()=>l(null),4e3)}finally{P(!1)}}},M={log:"Capture any interaction",do:"AI takes action",ask:"Query your pipeline",go:"Navigate anywhere"},h=(s.trim().length>0||!!f)&&!R;return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:tt}),e.jsx("div",{className:"tb"+(R?" omni-sending":""),children:e.jsxs("div",{className:"tb-omni",children:[e.jsxs("div",{className:"tb-omni-wrap"+(I?" focused":""),onClick:()=>{var n;return(n=N.current)==null?void 0:n.focus()},children:[e.jsx("span",{className:"tb-omni-ic",children:e.jsx(v,{name:((k=U[d])==null?void 0:k.ic)||"pencil-line",size:16})}),f&&e.jsxs("div",{className:"tb-omni-file-pill",children:[e.jsx(v,{name:"paperclip",size:10}),e.jsx("span",{children:f.name}),e.jsx("span",{style:{cursor:"pointer",marginLeft:2},onClick:n=>{n.stopPropagation(),E(null),L.current&&(L.current.value="")},children:"×"})]}),e.jsx("input",{ref:N,className:"tb-omni-input",placeholder:(C=U[d])==null?void 0:C.placeholder,value:s,onChange:n=>b(n.target.value),onFocus:()=>w(!0),onBlur:()=>setTimeout(()=>w(!1),150),onKeyDown:n=>{n.key==="Enter"&&j()}}),!I&&!s&&e.jsx("span",{className:"tb-omni-kbd",children:"⌘K"}),I&&e.jsxs("button",{className:"tb-omni-mode",onMouseDown:n=>{n.preventDefault();const p=($.indexOf(d)+1)%$.length;g($[p])},children:[e.jsx(v,{name:(T=U[d])==null?void 0:T.ic,size:11}),d]}),e.jsx("div",{className:"tb-omni-attach"+(f?" has-file":""),onClick:n=>{var p;n.stopPropagation(),(p=L.current)==null||p.click()},title:"Attach a file",children:e.jsx(v,{name:"paperclip",size:14})}),e.jsx("input",{ref:L,type:"file",style:{display:"none"},onChange:n=>{var p;(p=n.target.files)!=null&&p[0]&&E(n.target.files[0])}}),e.jsx("button",{className:"tb-omni-send",disabled:!h,onClick:n=>{n.stopPropagation(),j()},title:"Send (↵)",children:R?e.jsx(v,{name:"loader",size:14}):e.jsx(v,{name:"arrow-up",size:14})})]}),I&&e.jsxs("div",{className:"omni-dd",children:[e.jsx("div",{className:"omni-dd-modes",children:$.map(n=>e.jsxs("button",{className:"omni-mode-pill"+(d===n?" on":""),onMouseDown:p=>{p.preventDefault(),g(n)},children:[e.jsx(v,{name:U[n].ic,size:12}),n,e.jsx("span",{className:"omni-mode-pill-hint",children:M[n]})]},n))}),e.jsxs("div",{className:"omni-dd-scroll",children:[e.jsxs("div",{className:"omni-dd-sect",children:[e.jsxs("div",{className:"omni-dd-lbl",children:[e.jsx(v,{name:"clock",size:11})," Try these"]}),(W=rt[d])==null?void 0:W.map((n,p)=>e.jsxs("div",{className:"omni-dd-it"+(p===0?" active":""),onMouseDown:()=>{var i;b(n),(i=N.current)==null||i.focus()},children:[e.jsx("div",{className:"omni-dd-ic",children:e.jsx(v,{name:U[d].ic,size:13})}),n,e.jsx("span",{className:"omni-dd-kind",children:d})]},p))]}),e.jsxs("div",{className:"omni-dd-sect",children:[e.jsxs("div",{className:"omni-dd-lbl",children:[e.jsx(v,{name:"sparkles",size:11})," Suggestions"]}),Xe.slice(0,4).map((n,p)=>e.jsxs("div",{className:"omni-dd-it",onMouseDown:()=>{var i;b(n.label),(i=N.current)==null||i.focus()},children:[e.jsx("div",{className:"omni-dd-ic",children:e.jsx(v,{name:n.type==="action"?"wand-2":"search",size:13})}),n.label,e.jsx("span",{className:"omni-dd-kind",children:n.type})]},p))]})]}),e.jsxs("div",{className:"omni-dd-footer",children:[e.jsxs("span",{className:"legend",children:[e.jsx("span",{style:{fontFamily:"DM Mono",fontSize:10,background:"var(--bg4)",padding:"1px 5px",borderRadius:3},children:"↵"})," ","send"]}),e.jsxs("span",{className:"legend",children:[e.jsx("span",{style:{fontFamily:"DM Mono",fontSize:10,background:"var(--bg4)",padding:"1px 5px",borderRadius:3},children:"Tab"})," ","cycle mode"]}),e.jsxs("span",{className:"legend",children:[e.jsx("span",{style:{fontFamily:"DM Mono",fontSize:10,background:"var(--bg4)",padding:"1px 5px",borderRadius:3},children:"Esc"})," ","close"]})]})]})]})}),y&&e.jsxs("div",{className:"omni-toast",children:[e.jsx("div",{className:"omni-toast-ic"+(y.err?" err":""),children:e.jsx(v,{name:y.err?"x":"check",size:12,color:"#fff"})}),e.jsxs("div",{className:"omni-toast-body",children:[e.jsx("b",{children:y.title}),e.jsx("small",{children:y.sub})]}),e.jsx("button",{className:"btn xs ghost",onClick:()=>l(null),style:{marginLeft:8},children:"dismiss"})]})]})},st=`
.twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;max-height:calc(100vh - 32px);display:flex;flex-direction:column;background:rgba(250,249,247,.78);color:#29261b;-webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);border:.5px solid rgba(255,255,255,.6);border-radius:14px;box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
.twk-hd{display:flex;align-items:center;justify-content:space-between;padding:10px 8px 10px 14px;cursor:move;user-select:none}
.twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
.twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
.twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
.twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;overflow-y:auto;overflow-x:hidden;min-height:0}
.twk-row{display:flex;flex-direction:column;gap:5px}
.twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
.twk-lbl{display:flex;justify-content:space-between;align-items:baseline;color:rgba(41,38,27,.72)}
.twk-lbl>span:first-child{font-weight:500}
.twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:rgba(41,38,27,.45);padding:10px 0 0}
.twk-sect:first-child{padding-top:0}
.twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;background:rgba(0,0,0,.06);user-select:none}
.twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
.twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;overflow-wrap:anywhere}
.twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
.twk-toggle[data-on="1"]{background:#34c759}
.twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
.twk-toggle[data-on="1"] i{transform:translateX(14px)}
.twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
.twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
select.twk-field{padding-right:22px}
.twk-chips{display:flex;flex-wrap:wrap;gap:5px}
.twk-chip{width:26px;height:26px;border-radius:6px;border:2px solid transparent;cursor:default;display:flex;align-items:center;justify-content:center;padding:0}
.twk-chip[data-on="1"]{border-color:rgba(0,0,0,.3)}
`,it=({tweaks:r,setTweak:t})=>{const[a,c]=H.useState(!0),s=H.useRef(null),b=H.useRef({x:16,y:16});H.useEffect(()=>{if(!document.getElementById("twk-styles")){const l=document.createElement("style");l.id="twk-styles",l.textContent=st,document.head.appendChild(l)}},[]);const I=l=>{const f=s.current;if(!f)return;const E=f.getBoundingClientRect(),R=l.clientX,P=l.clientY,N=window.innerWidth-E.right,L=window.innerHeight-E.bottom,j=h=>{b.current={x:N-(h.clientX-R),y:L-(h.clientY-P)},s.current&&(s.current.style.right=b.current.x+"px",s.current.style.bottom=b.current.y+"px")},M=()=>{window.removeEventListener("mousemove",j),window.removeEventListener("mouseup",M)};window.addEventListener("mousemove",j),window.addEventListener("mouseup",M)};if(!a)return null;const w=["light","dark"],d=["compact","comfortable"],g=["#5552C9","#1A9E7C","#D97757","#3F75DC","#7A4EDB","#E5566C"],y=["new","week1","month1","month6","established"];return e.jsxs("div",{ref:s,className:"twk-panel",style:{right:16,bottom:16},children:[e.jsxs("div",{className:"twk-hd",onMouseDown:I,children:[e.jsx("b",{children:"Tweaks"}),e.jsx("button",{className:"twk-x",onMouseDown:l=>l.stopPropagation(),onClick:()=>c(!1),children:"✕"})]}),e.jsxs("div",{className:"twk-body",children:[e.jsx("div",{className:"twk-sect",children:"Theme"}),e.jsxs("div",{className:"twk-row",children:[e.jsx("div",{className:"twk-lbl",children:e.jsx("span",{children:"Mode"})}),e.jsxs("div",{className:"twk-seg",children:[e.jsx("div",{className:"twk-seg-thumb",style:{left:`calc(2px + ${w.indexOf(r.theme)} * (100% - 4px) / 2)`,width:"calc((100% - 4px) / 2)"}}),w.map(l=>e.jsx("button",{type:"button",onClick:()=>t("theme",l),children:l},l))]})]}),e.jsxs("div",{className:"twk-row",children:[e.jsx("div",{className:"twk-lbl",children:e.jsx("span",{children:"Accent"})}),e.jsx("div",{className:"twk-chips",children:g.map(l=>e.jsx("button",{type:"button",className:"twk-chip","data-on":r.accent===l?"1":"0",style:{background:l},onClick:()=>t("accent",l)},l))})]}),e.jsx("div",{className:"twk-sect",children:"Layout"}),e.jsxs("div",{className:"twk-row",children:[e.jsx("div",{className:"twk-lbl",children:e.jsx("span",{children:"Density"})}),e.jsxs("div",{className:"twk-seg",children:[e.jsx("div",{className:"twk-seg-thumb",style:{left:`calc(2px + ${d.indexOf(r.density)} * (100% - 4px) / 2)`,width:"calc((100% - 4px) / 2)"}}),d.map(l=>e.jsx("button",{type:"button",onClick:()=>t("density",l),children:l},l))]})]}),e.jsx("div",{className:"twk-sect",children:"Demo"}),e.jsxs("div",{className:"twk-row",children:[e.jsx("div",{className:"twk-lbl",children:e.jsx("span",{children:"Tenant age (Pulse)"})}),e.jsx("select",{className:"twk-field",value:r.tenantAge,onChange:l=>t("tenantAge",l.target.value),children:y.map(l=>e.jsx("option",{value:l,children:l},l))})]}),e.jsx("div",{className:"twk-sect",children:"AI"}),e.jsxs("div",{className:"twk-row twk-row-h",children:[e.jsx("div",{className:"twk-lbl",children:e.jsx("span",{children:"Proactive suggestions"})}),e.jsx("button",{type:"button",className:"twk-toggle","data-on":r.proactive?"1":"0",onClick:()=>t("proactive",!r.proactive),children:e.jsx("i",{})})]})]})]})},Y=[{id:"t1",from:"Sasha Krieger",acc:"Northwind Trading",preview:"we’re ready to sign Thursday — just need clause 4.2 sorted",time:"23m",unread:!0,hot:!0,av:"SK"},{id:"t2",from:"Daniel Yu",acc:"Orbit Logistics",preview:"New CISO here. Want to revisit security review with my team?",time:"2h",unread:!0,av:"DY"},{id:"t3",from:"Maya Chen",acc:"Kairo Health",preview:"I’ll loop in Priya — she owns this now.",time:"4h",unread:!0,hot:!0,av:"MC"},{id:"t4",from:"Zotra",acc:"Acme Robotics",preview:"Draft #2 ready — used a warmer tone. Want to send?",time:"6h",unread:!0,agent:!0,av:"ZO"},{id:"t5",from:"Lucas Reed",acc:"Rune Systems",preview:"See you at 12:30. Bringing our infra lead.",time:"1d",av:"LR"},{id:"t6",from:"Zotra",acc:"Voltic Energy",preview:"No reply yet on the ROI calculator. Try a different angle?",time:"1d",agent:!0,av:"ZO"},{id:"t7",from:"Forager",acc:"Pebble Group",preview:"Enrichment complete. 14 new stakeholders, hierarchy mapped.",time:"2d",agent:!0,av:"FO"}],nt=()=>{const[r,t]=o.useState("t1"),a=Y.find(c=>c.id===r)||Y[0];return e.jsxs("div",{style:{flex:1,display:"flex",overflow:"hidden",minHeight:0,background:"var(--bg)"},children:[e.jsxs("div",{style:{width:360,flexShrink:0,background:"var(--bg2)",borderRight:"0.5px solid var(--brd)",display:"flex",flexDirection:"column",overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"14px 18px 12px",borderBottom:"0.5px solid var(--brd)"},children:[e.jsx("div",{className:"sora",style:{fontSize:18,fontWeight:600},children:"Inbox"}),e.jsx("div",{className:"mono",style:{fontSize:11,color:"var(--ink4)",marginTop:3},children:"4 unread · 7 threads"})]}),e.jsx("div",{style:{flex:1,overflowY:"auto"},children:Y.map(c=>e.jsxs("div",{onClick:()=>t(c.id),style:{padding:"11px 18px",borderBottom:"0.5px solid var(--brd)",cursor:"pointer",background:r===c.id?"var(--pu)":"transparent",borderLeft:r===c.id?"2px solid var(--p)":"2px solid transparent",display:"flex",gap:11,alignItems:"flex-start"},children:[e.jsx("span",{className:"av "+q(c.from),style:{width:32,height:32,borderRadius:9,fontSize:11},children:c.av}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7,marginBottom:2},children:[e.jsx("span",{style:{fontSize:12.5,fontWeight:c.unread?600:500,color:"var(--ink)"},children:c.from}),c.agent&&e.jsx("span",{className:"tag amber",children:"AI"}),c.hot&&e.jsx("span",{style:{background:"#E5566C",width:5,height:5,borderRadius:"50%",display:"inline-block"}}),e.jsx("span",{style:{marginLeft:"auto",fontFamily:"DM Mono,monospace",fontSize:10,color:"var(--ink5)"},children:c.time})]}),e.jsx("div",{className:"mono",style:{fontSize:10,color:"var(--ink4)",marginBottom:4},children:c.acc}),e.jsx("div",{style:{fontSize:11.5,color:c.unread?"var(--ink2)":"var(--ink4)",lineHeight:1.4,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"},children:c.preview})]})]},c.id))})]}),e.jsxs("div",{style:{flex:1,overflow:"hidden",display:"flex",flexDirection:"column",minWidth:0},children:[e.jsxs("div",{style:{padding:"16px 22px 14px",borderBottom:"0.5px solid var(--brd)",background:"var(--bg2)",display:"flex",alignItems:"center",gap:12},children:[e.jsx("span",{className:"av "+q(a.from),style:{width:38,height:38,borderRadius:10,fontSize:13},children:a.av}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsxs("div",{className:"sora",style:{fontSize:16,fontWeight:600},children:[a.from," · ",a.acc]}),e.jsx("div",{className:"mono",style:{fontSize:11,color:"var(--ink4)"},children:"Thread · 4 messages"})]}),e.jsxs("button",{className:"btn sm",children:[e.jsx(v,{name:"sparkles",size:12})," Draft reply"]}),e.jsxs("button",{className:"btn sm",children:[e.jsx(v,{name:"calendar",size:12})," Schedule"]}),e.jsx("button",{className:"ic-btn sm",children:e.jsx(v,{name:"archive",size:13})})]}),e.jsx("div",{style:{flex:1,overflowY:"auto",padding:"20px 24px",background:"var(--bg)"},children:e.jsxs("div",{style:{maxWidth:720,margin:"0 auto"},children:[e.jsxs("div",{style:{padding:"14px 16px",background:"var(--bg2)",border:"0.5px solid var(--brd)",borderRadius:14,marginBottom:12},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:8},children:[e.jsx("span",{className:"av "+q(a.from),style:{width:24,height:24,borderRadius:7,fontSize:9},children:a.av}),e.jsx("span",{style:{fontSize:12,fontWeight:600,color:"var(--ink)"},children:a.from}),e.jsx("span",{className:"mono",style:{fontSize:10,color:"var(--ink5)"},children:"Today, 10:18"})]}),e.jsxs("div",{style:{fontSize:13,color:"var(--ink2)",lineHeight:1.65},children:["Hey Elena — quick one. We talked it over and we're ready to sign Thursday. Last thing: clause 4.2 (auto-renewal) — can we strike the auto-renew or at least make it 30-day notice? Everything else looks good.",e.jsx("br",{}),e.jsx("br",{}),"— Sasha"]})]}),e.jsxs("div",{style:{padding:"14px 16px",background:"linear-gradient(180deg,var(--pu) 0%,var(--bg2) 90%)",border:"0.5px solid var(--brd2)",borderRadius:14,marginBottom:12},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:8},children:[e.jsx("span",{style:{width:24,height:24,borderRadius:7,background:"var(--pg)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(v,{name:"sparkles",size:12,color:"#fff"})}),e.jsx("span",{style:{fontSize:12,fontWeight:600,color:"var(--ink)"},children:"Zotra — suggested reply"}),e.jsx("span",{className:"mono",style:{fontSize:10,color:"var(--ink5)"},children:"draft · matched your tone"})]}),e.jsxs("div",{style:{fontSize:13,color:"var(--ink2)",lineHeight:1.65},children:["Sasha — great. We can do 30-day notice on auto-renewal. I'll send the revised redline tonight so we're good for Thursday. Want me to book a 10-min walk-through Thursday AM before signature?",e.jsx("br",{}),e.jsx("br",{}),"— Elena"]}),e.jsxs("div",{style:{display:"flex",gap:6,marginTop:12,flexWrap:"wrap"},children:[e.jsxs("button",{className:"btn sm pri",children:[e.jsx(v,{name:"send",size:12})," Send"]}),e.jsxs("button",{className:"btn sm",children:[e.jsx(v,{name:"edit-3",size:12})," Edit"]}),e.jsxs("button",{className:"btn sm",children:[e.jsx(v,{name:"rotate-cw",size:12})," Try another tone"]}),e.jsxs("button",{className:"btn sm ghost",children:[e.jsx(v,{name:"x",size:12})," Dismiss"]})]})]}),e.jsxs("div",{style:{padding:"11px 14px",background:"var(--bg2)",border:"0.5px dashed var(--brd2)",borderRadius:12,textAlign:"center",color:"var(--ink4)",fontSize:12},children:["Earlier messages · ",e.jsx("span",{style:{color:"var(--p)",cursor:"pointer"},children:"show 2 more"})]})]})})]})]})},at=[{lbl:"Today",items:[{ic:"mail",color:"br",t:"Sasha @ Northwind replied",s:'"we’re ready to sign Thursday — just need clause 4.2 sorted"',time:"23m",acc:"Northwind Trading",dot:!0},{ic:"radar",color:"br",t:"Acme Robotics is shopping",s:"4 visitors hit /pricing and /security in the last 90 minutes.",time:"6m",acc:"Acme Robotics",dot:!0},{ic:"triangle-alert",color:"wa",t:"Kairo champion may be leaving",s:'Maya Chen flipped to "Open to opportunities" on LinkedIn.',time:"41m",acc:"Kairo Health",dot:!0}]},{lbl:"Earlier today",items:[{ic:"sparkles",color:"amber",t:"Forager finished enrichment",s:"Pebble Group · 14 stakeholders added, hierarchy mapped.",time:"5h",acc:"Pebble Group"},{ic:"calendar",color:"br",t:"Demo with Rune Systems in 45 min",s:"3 attendees confirmed. Pre-brief notes ready.",time:"1h",acc:"Rune Systems"},{ic:"triangle-alert",color:"wa",t:"Voltic has gone quiet (14 days)",s:"Auto-close in 7 days unless re-engaged.",time:"2h",acc:"Voltic Energy"}]},{lbl:"Yesterday",items:[{ic:"trophy",color:"ok",t:"Wisp Studios moved to Closing",s:"Forecast updated. $14K added to best case.",time:"yest",acc:"Wisp Studios"},{ic:"user-plus",color:"br",t:"Orbit hired a new CISO",s:"Daniel Yu (ex-Stripe). Security review may shift.",time:"yest",acc:"Orbit Logistics"}]}],lt={br:"var(--p)",wa:"var(--wa)",ok:"var(--ok)",amber:"var(--amber)",ri:"var(--ri)"},ct={br:"var(--pp)",wa:"var(--wab)",ok:"var(--okb)",amber:"var(--amberp)",ri:"var(--rib)"},dt=()=>e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minHeight:0},children:[e.jsxs("div",{style:{padding:"16px 28px 14px",background:"var(--bg2)",borderBottom:"0.5px solid var(--brd)",display:"flex",alignItems:"center",gap:12},children:[e.jsxs("div",{children:[e.jsx("div",{className:"sora",style:{fontSize:19,fontWeight:600},children:"Notifications"}),e.jsx("div",{style:{color:"var(--ink4)",fontSize:12,marginTop:2},children:"3 new · 8 today"})]}),e.jsxs("div",{style:{marginLeft:"auto",display:"flex",gap:6},children:[e.jsxs("button",{className:"btn sm",children:[e.jsx(v,{name:"check-check",size:12})," Mark all read"]}),e.jsxs("button",{className:"btn sm",children:[e.jsx(v,{name:"sliders-horizontal",size:12})," Preferences"]})]})]}),e.jsx("div",{style:{flex:1,overflowY:"auto",padding:"14px 28px 32px",background:"var(--bg)"},children:e.jsx("div",{style:{maxWidth:760,margin:"0 auto"},children:at.map((r,t)=>e.jsxs("div",{style:{marginBottom:22},children:[e.jsx("div",{className:"lbl",style:{marginBottom:8},children:r.lbl}),r.items.map((a,c)=>e.jsxs("div",{style:{display:"flex",gap:12,padding:"12px 14px",background:"var(--bg2)",border:"0.5px solid var(--brd)",borderRadius:12,marginBottom:6,cursor:"pointer"},children:[e.jsx("div",{style:{width:32,height:32,borderRadius:9,background:ct[a.color],color:lt[a.color],display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:e.jsx(v,{name:a.ic,size:14})}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:2},children:[e.jsx("span",{style:{fontSize:13,fontWeight:600,color:"var(--ink)"},children:a.t}),a.dot&&e.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:"var(--rose)",display:"inline-block"}}),e.jsx("span",{className:"mono",style:{fontSize:10,color:"var(--ink5)",marginLeft:"auto"},children:a.time})]}),e.jsx("div",{style:{fontSize:12,color:"var(--ink3)",lineHeight:1.5},children:a.s}),e.jsx("div",{className:"mono",style:{fontSize:10,color:"var(--ink5)",marginTop:4},children:a.acc})]})]},c))]},t))})})]}),ae=({title:r,icon:t,blurb:a,sub:c})=>e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minHeight:0},children:[e.jsxs("div",{style:{padding:"18px 24px 14px",background:"var(--bg2)",borderBottom:"0.5px solid var(--brd)"},children:[e.jsx("div",{className:"sora",style:{fontSize:22,fontWeight:600},children:r}),c&&e.jsx("div",{style:{color:"var(--ink4)",fontSize:12,marginTop:4},children:c})]}),e.jsx("div",{style:{flex:1,overflowY:"auto",padding:24,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsxs("div",{style:{textAlign:"center",maxWidth:480,padding:28,border:"0.5px dashed var(--brd2)",borderRadius:16,background:"var(--bg2)"},children:[e.jsx("div",{style:{width:48,height:48,borderRadius:14,background:"var(--pp)",display:"inline-flex",alignItems:"center",justifyContent:"center",color:"var(--p)",marginBottom:10},children:e.jsx(v,{name:t,size:22})}),e.jsx("div",{className:"sora",style:{fontSize:16,fontWeight:600},children:r}),e.jsx("div",{style:{color:"var(--ink4)",fontSize:12,marginTop:6,lineHeight:1.6},children:a})]})})]}),pt=Object.freeze(Object.defineProperty({__proto__:null,InboxView:nt,NotificationsView:dt,SimpleView:ae},Symbol.toStringTag,{value:"Module"})),ht=o.lazy(()=>z(()=>import("./TodayView-Ca2BBvGt.js"),__vite__mapDeps([0,1,2]))),mt=o.lazy(()=>z(()=>import("./PulseView-DH8ELqR3.js"),__vite__mapDeps([3,1,4,2]))),xt=o.lazy(()=>z(()=>import("./AccountsView-Bb_I9xU0.js"),__vite__mapDeps([5,1,6,4,7,8,2]))),gt=o.lazy(()=>z(()=>import("./ConstellationView-4Iy7Voys.js"),__vite__mapDeps([9,1,6,10,4,7,8,2]))),ut=o.lazy(()=>z(()=>import("./IntakeView-CdoW7TUl.js"),__vite__mapDeps([11,1,4,7,8,2]))),bt=o.lazy(()=>z(()=>Promise.resolve().then(()=>pt),void 0).then(r=>({default:r.NotificationsView}))),Z=o.lazy(()=>z(()=>import("./WorkspaceBoardView-CC58rR2v.js"),__vite__mapDeps([12,1,10,6,7,8,4,2]))),ft=o.lazy(()=>z(()=>import("./DashboardView-O0ea9W2T.js"),__vite__mapDeps([13,1,7,8,4,2]))),vt=o.lazy(()=>z(()=>import("./ReportsView-bahSWZc_.js"),__vite__mapDeps([14,1,7,8,4,2]))),kt=o.lazy(()=>z(()=>import("./SettingsView-LY0Xc3je.js"),__vite__mapDeps([15,1,4,16,7,8]))),wt=o.lazy(()=>z(()=>import("./ProfileView-DCirRDdk.js"),__vite__mapDeps([17,1,16,4,7,8]))),yt=o.lazy(()=>z(()=>import("./JourneyView-C5MK2EGY.js"),__vite__mapDeps([18,1,7,8,4,2]))),jt=o.lazy(()=>z(()=>import("./AutomationView-BDRk5RCf.js"),__vite__mapDeps([19,1,7,8,4,2]))),Nt=o.lazy(()=>z(()=>import("./QuickStartView-CEJSrPy0.js"),__vite__mapDeps([20,1,4,7,8,2]))),St=o.lazy(()=>z(()=>import("./ConversationsView-CmqgMMFl.js"),__vite__mapDeps([21,1]))),zt=o.lazy(()=>z(()=>import("./AssistantpreviewView-UC0pMbxC.js"),__vite__mapDeps([22,1]))),_t=o.lazy(()=>z(()=>import("./InventoryView-ChT82ovW.js"),__vite__mapDeps([23,1]))),It=o.lazy(()=>z(()=>import("./TestInboxView-HDrXTsn5.js"),__vite__mapDeps([24,1,4])));function Lt(){return e.jsxs("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",height:"100%",opacity:.4},children:[e.jsx("div",{style:{width:32,height:32,border:"2px solid var(--p, #5552C9)",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 0.7s linear infinite"}}),e.jsx("style",{children:"@keyframes spin { to { transform: rotate(360deg); } }"})]})}const Mt=localStorage.getItem("zotra_color_scheme")??"default",Et={theme:"light",accent:"#5552C9",density:"comfortable",tenantAge:"established",proactive:!0,colorScheme:Mt},Ct=["rhythm","pulse","inbox","accounts","deals","projects","finance","renewal","dashboard","reports","notifications","settings","journey","automation","onboarding","conversations","assistant","inventory","profile","testinbox"],J={"/app/home":"rhythm","/app/pulse":"pulse","/app/inbox":"inbox","/app/accounts":"accounts","/app/deals":"deals","/app/projects":"projects","/app/finance":"finance","/app/renewal":"renewal","/app/dashboard":"dashboard","/app/reports":"reports","/app/notifications":"notifications","/app/settings":"settings","/app/journey":"journey","/app/automation":"automation","/app/quickstart":"onboarding","/app/conversations":"conversations","/app/assistant":"assistant","/app/inventory":"inventory","/app/profile":"profile","/app/testinbox":"testinbox","/home":"rhythm","/pulse":"pulse","/inbox":"inbox","/accounts":"accounts","/deals":"deals","/projects":"projects","/finance":"finance","/renewal":"renewal","/dashboard":"dashboard","/reports":"reports","/notifications":"notifications","/settings":"settings","/journey":"journey","/automation":"automation","/quickstart":"onboarding","/conversations":"conversations","/assistant":"assistant","/inventory":"inventory","/profile":"profile","/testinbox":"testinbox"},At={rhythm:"/app/home",pulse:"/app/pulse",inbox:"/app/inbox",accounts:"/app/accounts",deals:"/app/deals",projects:"/app/projects",finance:"/app/finance",renewal:"/app/renewal",dashboard:"/app/dashboard",reports:"/app/reports",notifications:"/app/notifications",settings:"/app/settings",journey:"/app/journey",automation:"/app/automation",onboarding:"/app/quickstart",conversations:"/app/conversations",assistant:"/app/assistant",inventory:"/app/inventory",profile:"/app/profile",testinbox:"/app/testinbox"};function Tt(){const r=window.location.pathname;if(J[r])return J[r];const t=new URLSearchParams(window.location.search).get("tab");return Ct.includes(t)?t:"rhythm"}function Rt(){const r=ge(),t=ue(),[a,c]=o.useState(Tt),[s,b]=o.useState(null),[I,w]=o.useState(!0),[d,g]=o.useState(Et),[y,l]=o.useState(!1),[f,E]=o.useState({}),[R,P]=o.useState(void 0),{orgName:N,orgLogoUrl:L,orgPlan:j,orgColor:M}=G();o.useEffect(()=>{var D;if(!M)return;const i={default:"#6366f1",warm:"#cb6e50",dark:"#1e1e2e"},x=M.toLowerCase(),m=(D=Object.entries(i).find(([,A])=>A.toLowerCase()===x))==null?void 0:D[0];if(!m)return;localStorage.getItem("zotra_color_scheme")!==m&&(localStorage.setItem("zotra_color_scheme",m),g(A=>({...A,colorScheme:m})))},[M]);const{profile:h,loading:k,error:C}=we();o.useEffect(()=>{C&&console.error("[App] Failed to load user profile:",C)},[C]),o.useEffect(()=>{const i=fe();return()=>i()},[]),o.useEffect(()=>{const i=localStorage.getItem("zotra_token"),x=localStorage.getItem("zotra_userId")||(()=>{try{const m=localStorage.getItem("zotra_saved_session");return m?JSON.parse(m).userId:null}catch{return null}})();(!i||!x)&&(localStorage.removeItem("zotra_token"),localStorage.removeItem("zotra_refresh_token"),window.location.href="/login")},[]),o.useEffect(()=>{if(!localStorage.getItem("zotra_token"))return;const x=Q();Promise.allSettled([K(`${x}/accounts`).then(m=>m.ok?m.json():[]),K(`${x}/opportunities`).then(m=>m.ok?m.json():[]),K(`${x}/intakes`).then(m=>m.ok?m.json():[])]).then(([m,V,D])=>{const A=O=>O.status==="fulfilled"&&Array.isArray(O.value)?O.value.length:void 0;E({accounts:A(m)??0,deals:A(V)??0,inbox:A(D)??0})})},[]);const T=o.useCallback((i,x)=>{i==="colorScheme"&&localStorage.setItem("zotra_color_scheme",x),g(m=>({...m,[i]:x}))},[]);o.useEffect(()=>{const i=At[a]??"/app/pulse";t.pathname!==i&&r(i,{replace:!0})},[a]),o.useEffect(()=>{const i=J[t.pathname];i&&i!==a&&c(i)},[t.pathname]),o.useEffect(()=>{const i=d.colorScheme??"default",x=M??"";i==="dark"?document.documentElement.dataset.theme="dark":i==="default"?document.documentElement.dataset.theme="default":document.documentElement.dataset.theme="light",document.documentElement.style.removeProperty("--p"),document.documentElement.style.removeProperty("--p-rgb"),i==="default"&&x&&/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(x)&&document.documentElement.style.setProperty("--p",x)},[d.colorScheme,M]),o.useEffect(()=>{const i=()=>{const x=localStorage.getItem("zotra_color_scheme")??"default";g(m=>m.colorScheme===x?m:{...m,colorScheme:x})};return window.addEventListener("storage",i),()=>window.removeEventListener("storage",i)},[]);const W=o.useCallback(i=>{if(i.target instanceof HTMLInputElement||i.target instanceof HTMLTextAreaElement)return;const x={t:"rhythm",p:"pulse",a:"accounts",d:"deals",y:"journey",j:"projects",f:"finance",b:"dashboard",r:"reports",i:"inbox",n:"notifications",s:"settings",u:"automation",q:"onboarding"};if(i.key==="?"){l(m=>!m);return}if(window.__gPressed&&x[i.key]){c(x[i.key]),b(null),window.__gPressed=!1;return}i.key==="g"&&(window.__gPressed=!0,setTimeout(()=>{window.__gPressed=!1},600))},[]);o.useEffect(()=>(window.addEventListener("keydown",W),()=>window.removeEventListener("keydown",W)),[W]);const n=o.useCallback(i=>{c(i),b(null);const x=new URL(window.location.href);x.searchParams.delete("tab"),window.history.replaceState(null,"",x.toString())},[]);function p(){switch(a){case"rhythm":return e.jsx(ht,{});case"pulse":return e.jsx(mt,{tenantAge:d.tenantAge});case"accounts":return e.jsx(xt,{openAcc:s,setOpenAcc:b});case"deals":return e.jsx(gt,{});case"inbox":return e.jsx(ut,{});case"notifications":return e.jsx(bt,{});case"projects":return e.jsx(Z,{kind:"project"});case"finance":return e.jsx(Z,{kind:"finance"});case"renewal":return e.jsx(Z,{kind:"renewal"});case"dashboard":return e.jsx(ft,{setView:n});case"reports":return e.jsx(vt,{setView:n});case"profile":return e.jsx(wt,{});case"settings":return e.jsx(kt,{colorScheme:d.colorScheme??"default",onColorSchemeChange:i=>T("colorScheme",i),initialPanel:R});case"journey":return e.jsx(yt,{setView:n,setTenantAge:i=>T("tenantAge",i)});case"automation":return e.jsx(jt,{setView:n});case"onboarding":return e.jsx(Nt,{setView:n,setTenantAge:i=>T("tenantAge",i),setOpenAcc:b});case"conversations":return e.jsx(St,{});case"assistant":return e.jsx(zt,{});case"inventory":return e.jsx(_t,{});case"testinbox":return e.jsx(It,{});default:return e.jsx(ae,{title:"Coming Soon",icon:"sparkles",blurb:"This feature is on the roadmap."})}}return e.jsxs("div",{className:"app","data-density":d.density,children:[e.jsx(Ge,{view:a,setView:n,collapsed:I,setCollapsed:w,profile:h,profileLoading:k,orgBranding:{logoUrl:L??"",orgName:N??"",orgPlan:j??""},navCounts:f,onProfileClick:()=>{n("profile")}}),e.jsxs("div",{className:"main",children:[e.jsx("div",{className:"content",children:e.jsx("div",{className:"viewport",style:{overflowY:"auto"},children:e.jsx(o.Suspense,{fallback:e.jsx(Lt,{}),children:p()})})}),e.jsx(ot,{view:a,setView:n,runQuery:()=>{}})]}),y&&e.jsx(it,{tweaks:d,setTweak:T})]})}const Ht=Object.freeze(Object.defineProperty({__proto__:null,default:Rt},Symbol.toStringTag,{value:"Module"}));export{Vt as A,v as I,Bt as S,q as a,Ht as b,Ut as f,Ft as i};
