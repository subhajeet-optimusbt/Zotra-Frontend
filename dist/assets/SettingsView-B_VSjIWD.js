import{r as d,j as e,d as Re}from"./vendor-react-DTmZBiFG.js";import{a as M,b as L}from"./api-C65-Ddf2.js";import{P as Oe}from"./PanelProfile-N2E-rLKZ.js";import{u as Ge}from"./index-Cntfpldn.js";const Z={default:"#6366f1",warm:"#cb6e50",dark:"#1e1e2e"};function He(a){return/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(a)}function Ue(){const a=localStorage.getItem("zotra_token");return{"Content-Type":"application/json",...a?{Authorization:`Bearer ${a}`}:{}}}function Ve(){const a=localStorage.getItem("zotra_token");return a?{Authorization:`Bearer ${a}`}:{}}function Ke(a){return a?a<1024?`${a} B`:a<1024*1024?`${(a/1024).toFixed(1)} KB`:`${(a/(1024*1024)).toFixed(1)} MB`:""}function ie(a){return a?a.startsWith("http://")||a.startsWith("https://")||a.startsWith("data:")?a:`${L()}/${a.replace(/^\//,"")}`:""}function qe(a){var i;if(!a)return"default";const r=a.toLowerCase();return((i=Object.entries(Z).find(([,n])=>n.toLowerCase()===r))==null?void 0:i[0])??"default"}async function se(a){if(!a)return"";if(a.startsWith("data:")||a.startsWith("blob:"))return a;try{const r=localStorage.getItem("zotra_token"),i=await fetch(a,{headers:r?{Authorization:`Bearer ${r}`}:{}});if(!i.ok)throw new Error(`${i.status}`);const n=await i.blob();return URL.createObjectURL(n)}catch{return a}}const Ye=2*1024*1024;function Qe({msg:a,type:r}){return e.jsxs("div",{style:{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:r==="ok"?"var(--ok)":"var(--ri)",color:"#fff",fontSize:12,padding:"8px 16px",borderRadius:8,zIndex:9999,whiteSpace:"nowrap",fontFamily:"DM Sans,sans-serif",fontWeight:500,boxShadow:"0 4px 16px rgba(0,0,0,.18)",animation:"toast-in .2s ease"},children:[r==="ok"?"✓ ":"✕ ",a]})}function be({icon:a,title:r,api:i}){return e.jsxs("div",{className:"sv-card-hdr",children:[e.jsx("div",{className:"sv-card-icon",children:a}),e.jsxs("div",{children:[e.jsx("div",{className:"sv-card-title",children:r}),i&&e.jsx("span",{className:"sv-card-api",children:i})]})]})}function te({label:a,sub:r,children:i}){return e.jsxs("div",{className:"sv-row",children:[e.jsxs("div",{className:"sv-row-lbl",children:[e.jsx("div",{className:"sv-row-t",children:a}),r&&e.jsx("div",{className:"sv-row-s",children:r})]}),i&&e.jsx("div",{className:"sv-ctrl",children:i})]})}function Je(){const[a,r]=d.useState(localStorage.getItem("zotra_color_scheme")??"default");return d.useEffect(()=>{const i=()=>r(localStorage.getItem("zotra_color_scheme")??"default");return window.addEventListener("storage",i),()=>window.removeEventListener("storage",i)},[]),e.jsx("span",{style:{position:"absolute",left:10,width:13,height:13,borderRadius:"50%",background:Z[a]??Z.default,border:"1.5px solid rgba(0,0,0,0.12)",flexShrink:0,pointerEvents:"none",zIndex:1}})}const Xe=({currentUrl:a,currentRemoteUrl:r,onFileChange:i})=>{var S;const[n,s]=d.useState(a),[l,p]=d.useState(a?r?((S=r.split("/").pop())==null?void 0:S.split("?")[0])??"Current logo":"Current logo":""),[x,t]=d.useState(0),[j,w]=d.useState(!!r),[u,h]=d.useState(!1),b=d.useRef(null);d.useEffect(()=>{var N;s(a),a&&!a.startsWith("data:")&&(p(r?((N=r.split("/").pop())==null?void 0:N.split("?")[0])??"logo.png":"logo.png"),w(!0)),t(0)},[a,r]);const f=d.useCallback(N=>{if(N.size>Ye){alert("File exceeds 2 MB limit.");return}const o=new FileReader;o.onload=m=>{var _;const C=(_=m.target)==null?void 0:_.result;s(C),p(N.name),t(N.size),w(!1),i(N,C)},o.readAsDataURL(N)},[i]),z=()=>{s(""),p(""),t(0),w(!1),i(null,"")};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:10,width:"100%"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between"},children:[e.jsxs("div",{children:[e.jsx("div",{className:"sv-row-t",children:"Organisation logo"}),e.jsx("div",{className:"sv-row-s",style:{marginTop:2},children:"PNG, SVG or JPEG · recommended 200×60 px · max 2 MB"})]}),n&&e.jsxs("div",{style:{display:"flex",gap:6,flexShrink:0,marginTop:2},children:[e.jsx("button",{className:"btn sm",onClick:z,children:"Remove"}),e.jsxs("label",{className:"btn sm pri",style:{cursor:"pointer"},children:["Replace",e.jsx("input",{type:"file",accept:"image/png,image/jpeg,image/svg+xml,image/webp",style:{display:"none"},onChange:N=>{var m;const o=(m=N.target.files)==null?void 0:m[0];o&&f(o),N.target.value=""}})]})]})]}),n&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",background:"var(--bg3)",borderRadius:9,border:"0.5px solid var(--brd2)"},children:[e.jsx("div",{style:{width:56,height:56,borderRadius:8,border:"0.5px solid var(--brd2)",background:"var(--bg2)",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0},children:e.jsx("img",{src:n,alt:"logo",style:{maxWidth:"100%",maxHeight:"100%",objectFit:"contain"}})}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontSize:12.5,fontWeight:600,color:"var(--ink)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:l||"logo.png"}),x>0&&e.jsx("div",{style:{fontSize:11,color:"var(--ink5)",marginTop:2},children:Ke(x)}),j&&x===0&&e.jsx("div",{style:{fontSize:11,color:"var(--ink5)",marginTop:2},children:"Saved to cloud storage"})]})]}),!n&&e.jsxs("div",{ref:b,style:{position:"relative",border:`1.5px dashed ${u?"var(--p)":"var(--brd3)"}`,borderRadius:12,padding:"20px 20px",display:"flex",alignItems:"center",gap:16,cursor:"pointer",transition:"border-color .15s, background .15s",background:u?"color-mix(in srgb,var(--p) 5%,transparent)":"var(--bg3)"},onDragOver:N=>{N.preventDefault(),h(!0)},onDragLeave:()=>h(!1),onDrop:N=>{var m;N.preventDefault(),h(!1);const o=(m=N.dataTransfer.files)==null?void 0:m[0];o&&f(o)},children:[e.jsx("input",{type:"file",accept:"image/png,image/jpeg,image/svg+xml,image/webp",style:{position:"absolute",inset:0,opacity:0,cursor:"pointer",width:"100%",height:"100%"},onChange:N=>{var m;const o=(m=N.target.files)==null?void 0:m[0];o&&f(o),N.target.value=""}}),e.jsx("div",{style:{width:44,height:44,borderRadius:10,background:"var(--bg2)",border:"0.5px solid var(--brd2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:20},children:"🖼"}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsxs("div",{style:{fontSize:13,fontWeight:600,color:"var(--ink)",marginBottom:2},children:["Click to upload ",e.jsx("span",{style:{fontWeight:400,color:"var(--ink5)"},children:"or drag & drop"})]}),e.jsx("div",{style:{fontSize:11.5,color:"var(--ink5)"},children:"PNG, SVG or JPEG · recommended 200×60 px"})]}),e.jsx("div",{style:{pointerEvents:"none",flexShrink:0,padding:"7px 14px",borderRadius:7,border:"0.5px solid var(--brd2)",background:"var(--bg2)",fontSize:12,fontWeight:600,color:"var(--ink)",whiteSpace:"nowrap"},children:"Browse file"})]})]})},Ze=({orgName:a,logoDataUrl:r,primaryColour:i})=>{const n=He(i)?i:"#4B48C8";return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:10,width:"100%"},children:[e.jsx("div",{style:{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:".08em",color:"var(--ink5)"},children:"Live preview"}),e.jsxs("div",{style:{border:"0.5px solid var(--brd2)",borderRadius:10,overflow:"hidden",background:"var(--bg3)"},children:[e.jsxs("div",{style:{height:42,display:"flex",alignItems:"center",gap:9,padding:"0 13px",background:"var(--bg2)",borderBottom:"0.5px solid var(--brd)"},children:[e.jsx("span",{style:{width:26,height:26,display:"inline-flex",alignItems:"center",justifyContent:"center",borderRadius:6,background:"linear-gradient(135deg,#4B48C8,#7A78E0)",color:"#fff",fontWeight:700,fontSize:13,flexShrink:0},children:"z"}),r&&e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{width:"0.5px",height:16,background:"var(--brd2)",flexShrink:0}}),e.jsx("span",{style:{display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0,height:22,maxWidth:80,overflow:"hidden"},children:e.jsx("img",{src:r,alt:"org",style:{maxHeight:22,maxWidth:80,objectFit:"contain",display:"block"}})})]}),!r&&e.jsx("span",{style:{fontSize:13,fontWeight:700,color:n},children:a||"zotra"}),e.jsx("span",{style:{flex:1}}),e.jsx("span",{style:{fontSize:10,color:"var(--ink5)"},children:"Sidebar · Proposal PDF"})]}),e.jsx("div",{style:{padding:16,display:"flex",gap:10,alignItems:"flex-start"},children:e.jsxs("div",{style:{flex:1,background:"var(--bg2)",border:"0.5px solid var(--brd)",borderRadius:9,padding:"14px 16px"},children:[e.jsx("div",{style:{width:80,height:28,borderRadius:5,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12},children:r?e.jsx("img",{src:r,alt:"logo",style:{maxWidth:"100%",maxHeight:"100%",objectFit:"contain"}}):e.jsx("span",{style:{fontWeight:700,fontSize:11,color:n},children:"zotra"})}),e.jsxs("div",{style:{fontSize:13,fontWeight:600,color:"var(--ink)",marginBottom:4},children:["Proposal · ",a||"Optimus BT"]}),e.jsx("div",{style:{height:7,borderRadius:3,background:"var(--bg3)",marginBottom:5}}),e.jsx("div",{style:{height:7,borderRadius:3,background:"var(--bg3)",width:"60%",marginBottom:5}}),e.jsx("div",{style:{height:7,borderRadius:3,background:"var(--bg3)",width:"80%",marginBottom:10}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx("div",{style:{height:22,width:60,borderRadius:5,background:n,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("span",{style:{fontSize:9,fontWeight:700,color:"#fff"},children:"Send →"})}),e.jsx("div",{style:{height:22,width:50,borderRadius:5,background:"var(--bg3)"}})]})]})})]})]})};function ea(){const{colorScheme:a,onColorSchemeChange:r}=d.useContext(Le),{setOrgBranding:i}=Ge(),[n,s]=d.useState(null),[l,p]=d.useState(null),[x,t]=d.useState(!0),[j,w]=d.useState(!1),[u,h]=d.useState(null),[b,f]=d.useState(null),[z,S]=d.useState(null),[N,o]=d.useState(""),[m,C]=d.useState(""),_=d.useRef([]);function v(c){c.startsWith("blob:")&&_.current.push(c)}d.useEffect(()=>()=>{_.current.forEach(c=>URL.revokeObjectURL(c))},[]);function g(c,y="ok"){f({msg:c,type:y}),setTimeout(()=>f(null),3e3)}d.useEffect(()=>{t(!0),M(`${L()}/organizations`,{headers:Ue()}).then(c=>{if(!c.ok)throw new Error(`${c.status}`);return c.json()}).then(async c=>{s(c),p(c),h(null);const y=ie(c.logoURL??"");if(o(y),y){const I=await se(y);v(I),C(I)}else C("");const T=qe(c.primarycolour??"");localStorage.setItem("zotra_color_scheme",T),r(T),window.dispatchEvent(new Event("storage"))}).catch(c=>{h(c.message);const y={orgName:"",domain:"",email:"",plan:0,status:0,maxUsers:0,maxWorkspaces:0,createdAt:new Date().toISOString(),createdBy:"",updatedAt:new Date().toISOString(),updatedBy:"",verificationOtp:null,verificationOtpExpiresAt:null,isEmailVerified:!1,region:"",companySize:"",companyType:"",edition:"",isOnboardingCompleted:!1,logoURL:"",primarycolour:"#4B48C8",replysignature:""};s(y),p(y)}).finally(()=>t(!1))},[]);function F(c,y){s(T=>T&&{...T,[c]:y})}async function A(){if(n){w(!0);try{const c=Z[a]??n.primarycolour,y=new FormData;y.append("OrgName",n.orgName),y.append("Domain",n.domain),y.append("Primarycolour",c),y.append("Replysignature",n.replysignature),z?y.append("Logo",z):N&&(N.startsWith("http://")||N.startsWith("https://"))&&y.append("Logo",N);const T=await M(`${L()}/organizations`,{method:"PATCH",headers:Ve(),body:y});if(!T.ok)throw new Error(`${T.status}`);let I=N;try{const $=await T.json();$.logoURL&&(I=ie($.logoURL))}catch{}let O=m;I&&I!==N&&(O=await se(I),v(O));const G={...n,logoURL:I,primarycolour:c};s(G),p(G),o(I),C(O),S(null),i({orgName:G.orgName,orgLogoUrl:O,orgColor:c}),localStorage.setItem("zotra_orgColor",c),window.dispatchEvent(new Event("storage")),g("Branding saved successfully")}catch(c){g(`Save failed: ${c.message}`,"err")}finally{w(!1)}}}return x||!n?e.jsxs("div",{className:"sv-card",children:[e.jsx(be,{icon:"🏷",title:"Branding",api:"PATCH /organizations · tenant branding & white-labelling"}),[...Array(4)].map((c,y)=>e.jsxs("div",{className:"sv-row",style:{gap:16},children:[e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{className:"skel",style:{height:12,width:140,marginBottom:6}}),e.jsx("div",{className:"skel",style:{height:10,width:220}})]}),e.jsx("div",{className:"skel",style:{height:30,width:200,borderRadius:7}})]},y))]}):e.jsxs(e.Fragment,{children:[b&&e.jsx(Qe,{msg:b.msg,type:b.type}),u&&e.jsxs("div",{style:{padding:"8px 14px",fontSize:11.5,color:"var(--wa)",background:"var(--wab)",borderRadius:8,marginBottom:10,display:"flex",gap:8},children:["⚠ Could not reach API (",u,"). Showing defaults — changes will submit when saved."]}),e.jsxs("div",{className:"sv-card",children:[e.jsx(be,{icon:"🏷",title:"Branding",api:"PATCH /organizations · tenant branding & white-labelling"}),e.jsx(te,{label:"Organization name",sub:"Displayed in emails and exports generated by Zotra",children:e.jsx("input",{className:"sv-input",value:n.orgName,placeholder:"Your organisation name",onChange:c=>F("orgName",c.target.value)})}),e.jsx("div",{className:"sv-row",style:{flexDirection:"column",alignItems:"stretch",gap:0},children:e.jsx(Xe,{currentUrl:m,currentRemoteUrl:N,onFileChange:(c,y)=>{S(c),C(y),c||o("")}})}),e.jsx(te,{label:"Colour scheme",sub:"App-wide colour theme — applies to the entire interface",children:e.jsxs("div",{style:{position:"relative",display:"inline-flex",alignItems:"center"},children:[e.jsx(Je,{}),e.jsxs("select",{className:"sv-input",value:a,style:{minWidth:200,paddingLeft:32},onChange:c=>{const y=c.target.value;localStorage.setItem("zotra_color_scheme",y),r(y),window.dispatchEvent(new Event("storage"))},children:[e.jsx("option",{value:"default",children:"Default — Indigo & Violet"}),e.jsx("option",{value:"warm",children:"Warm & Light — Terracotta"}),e.jsx("option",{value:"dark",children:"Dark"})]})]})}),e.jsx(te,{label:"Reply signature",sub:"Default sign-off appended to Comms agent reply drafts",children:e.jsx("input",{className:"sv-input",value:n.replysignature,placeholder:"Warm regards,",onChange:c=>F("replysignature",c.target.value)})}),e.jsx("div",{className:"sv-row",style:{flexDirection:"column",alignItems:"stretch",gap:0},children:e.jsx(Ze,{orgName:n.orgName,logoDataUrl:m,primaryColour:Z[a]??n.primarycolour})}),e.jsxs("div",{className:"sv-save",style:{display:"flex",justifyContent:"flex-end",gap:8,padding:"12px 18px",borderTop:"0.5px solid var(--brd)"},children:[e.jsx("button",{className:"btn",onClick:async()=>{if(l){s({...l});const c=ie(l.logoURL??"");o(c);const y=c?await se(c):"";y&&v(y),C(y),S(null)}},children:"Reset to loaded"}),e.jsx("button",{className:"btn pri",onClick:A,disabled:j,children:j?"Saving…":"Save branding"})]})]})]})}const aa=`
.il-toast{position:fixed;bottom:24px;right:24px;padding:10px 16px;border-radius:10px;font-size:12.5px;font-weight:500;color:#fff;z-index:9999;display:flex;align-items:center;gap:8px;box-shadow:0 4px 20px rgba(0,0,0,.18);animation:toastIn .2s ease}
.il-toast-ok{background:#1B6B4A}
.il-toast-err{background:#B91C1C}
@keyframes toastIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

/* Edit drawer section badges */
.il-section-ro {
  display: flex; align-items: center; gap: 6px;
  margin: 16px 0 10px;
  padding: 7px 12px;
  border-radius: 7px;
  background: var(--bg3);
  border: 0.5px solid var(--brd);
  font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
  color: var(--ink5);
}
.il-section-ro .il-section-badge {
  font-size: 9px; padding: 2px 6px; border-radius: 4px;
  background: var(--bg3); border: 0.5px solid var(--brd2);
  color: var(--ink5); font-weight: 600; letter-spacing: .05em;
  margin-left: auto;
}
.il-section-edit {
  display: flex; align-items: center; gap: 6px;
  margin: 16px 0 10px;
  padding: 7px 12px;
  border-radius: 7px;
  background: var(--pp,#f0edff);
  border: 0.5px solid var(--p);
  font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
  color: var(--p);
}
.il-section-edit .il-edit-dot {
  width: 6px; height: 6px; border-radius: 50%; background: var(--p); flex-shrink: 0;
}
.il-section-edit .il-section-badge-edit {
  font-size: 9px; padding: 2px 7px; border-radius: 4px;
  background: var(--p); color: #fff; font-weight: 700; letter-spacing: .04em;
  margin-left: auto;
}

/* Field label styles */
.il-field-lbl-ro {
  font-size: 9.5px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
  color: var(--ink5); margin-bottom: 4px;
}
.il-field-lbl-edit {
  font-size: 9.5px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
  color: var(--p); margin-bottom: 4px; display: flex; align-items: center; gap: 4px;
}
.il-field-lbl-edit::before {
  content: ''; display: inline-block; width: 3px; height: 3px;
  border-radius: 50%; background: var(--p); flex-shrink: 0;
}

/* Editable input highlight */
.il-edit-input {
  width: 100%; min-width: 0; box-sizing: border-box;
  border: 1px solid var(--p) !important;
  background: var(--bg) !important;
}
.il-edit-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--pp, rgba(91,79,212,.15));
}
.il-edit-ta {
  width: 100%; min-width: 0; box-sizing: border-box;
  height: 52px; resize: vertical; padding: 7px 10px;
  line-height: 1.45; font-family: inherit;
  border: 1px solid var(--p) !important;
  background: var(--bg) !important;
}
.il-edit-ta:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--pp, rgba(91,79,212,.15));
}
`;function ra({msg:a,type:r}){return e.jsxs("div",{className:`il-toast il-toast-${r}`,children:[r==="ok"?"✓":"✕"," ",a]})}const ve={Artha:{bg:"#FAEEDA",color:"#854F0B"},Laya:{bg:"#DBEAFE",color:"#1D4ED8"},Kriya:{bg:"#DCFCE7",color:"#166534"},Gati:{bg:"#EEEEF9",color:"#4B48C8"},Rasa:{bg:"#FEE2E2",color:"#991B1B"}},ee={qualification:{label:"Qual",bg:"#EEEEF9",color:"#4B48C8"},shaping:{label:"Shape",bg:"#FAEEDA",color:"#854F0B"},shape:{label:"Shape",bg:"#FAEEDA",color:"#854F0B"},development:{label:"Dev",bg:"#DCFCE7",color:"#166534"},closing:{label:"Close",bg:"#FEE2E2",color:"#991B1B"},close:{label:"Close",bg:"#FEE2E2",color:"#991B1B"}},na=["qualification","shaping","shape","development","closing","close"];function Y(a){return a==="shape"?"shaping":a==="close"?"closing":a}function Q({label:a,hint:r,children:i}){return e.jsxs("div",{style:{marginTop:10},children:[e.jsx("div",{className:"il-field-lbl-ro",children:a}),i,r&&e.jsx("div",{style:{fontSize:10.5,color:"var(--ink5)",marginTop:3},children:r})]})}const X={width:"100%",minWidth:0,boxSizing:"border-box",background:"var(--bg3)",color:"var(--ink4)",cursor:"default",border:"0.5px solid var(--brd)"},oe={...X,height:60,resize:"none",padding:"6px 10px",lineHeight:1.45,fontFamily:"inherit"};function fe({label:a}){return e.jsxs("div",{className:"il-section-ro",children:[e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),e.jsx("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]}),a,e.jsx("span",{className:"il-section-badge",children:"Read-only"})]})}function ae({label:a}){return e.jsxs("div",{className:"il-section-edit",children:[e.jsx("span",{className:"il-edit-dot"}),a]})}function ia({inf:a,saving:r,onSave:i,onClose:n}){const[s,l]=d.useState({...a}),p=(t,j)=>l(w=>({...w,[t]:j})),x="sv-input";return e.jsx("div",{style:{position:"fixed",inset:0,zIndex:200,background:"rgba(15,15,25,.42)",backdropFilter:"blur(2px)",display:"flex",alignItems:"flex-start",justifyContent:"flex-end",pointerEvents:"none"},children:e.jsxs("div",{style:{width:520,height:"100%",background:"var(--bg)",borderLeft:"0.5px solid var(--brd2)",display:"flex",flexDirection:"column",boxShadow:"-12px 0 40px rgba(0,0,0,.18)",pointerEvents:"auto"},children:[e.jsxs("div",{style:{padding:"14px 18px 12px",borderBottom:"0.5px solid var(--brd)",display:"flex",alignItems:"flex-start",gap:12,flexShrink:0,background:"var(--bg2)"},children:[e.jsx("div",{style:{width:36,height:36,borderRadius:9,background:"var(--pp,#f0edff)",color:"var(--p)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1},children:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),e.jsx("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontSize:13.5,fontWeight:650,color:"var(--ink)",fontFamily:'"Sora",sans-serif',lineHeight:1.3},children:a._isNew?"New Inference":"Edit Inference"}),e.jsx("div",{style:{fontSize:10.5,color:"var(--p)",fontFamily:'"DM Mono",monospace',marginTop:3,background:"var(--pp,#f0edff)",display:"inline-block",padding:"1px 8px",borderRadius:5},children:s.inferenceType||"—"})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4},children:e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center"},children:[e.jsx("span",{style:{fontSize:9.5,padding:"2px 7px",borderRadius:5,fontWeight:600,background:"var(--pp,#f0edff)",color:"var(--p)",border:"0.5px solid var(--p)"},children:a._isNew?"All fields editable":"4 editable fields"}),e.jsx("button",{className:"btn sm",onClick:n,children:"✕"})]})})]}),e.jsxs("div",{style:{flex:1,overflowY:"auto",padding:"4px 18px 32px",scrollbarWidth:"thin"},children:[a._isNew?e.jsx(ae,{label:"Identity · define the new inference"}):e.jsx(fe,{label:"Identity · semantic key fields used by the LLM"}),a._isNew?e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{marginTop:10},children:[e.jsx("div",{className:"il-field-lbl-edit",children:"InferenceName"}),e.jsx("input",{className:`${x} il-edit-input`,value:s.inferenceName,placeholder:"e.g. Budget Confirmed",onChange:t=>{const j=t.target.value,w=j.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"");l(u=>({...u,inferenceName:j,inferenceType:w}))}})]}),e.jsxs("div",{style:{marginTop:10},children:[e.jsxs("div",{className:"il-field-lbl-ro",children:["InferenceType"," ",e.jsx("span",{style:{fontSize:9,fontWeight:500,color:"var(--ink5)",marginLeft:4},children:"· auto-generated from name · API rowKey"})]}),e.jsx("input",{className:x,style:{...X,fontFamily:'"DM Mono",monospace',fontSize:11,color:"var(--p)",background:"var(--pp,#f0edff)"},value:s.inferenceType,readOnly:!0,tabIndex:-1})]}),e.jsxs("div",{style:{marginTop:10},children:[e.jsxs("div",{className:"il-field-lbl-edit",children:["InferenceDefinition"," ",e.jsx("span",{style:{fontSize:9,fontWeight:500,color:"var(--ink5)",marginLeft:4},children:"· sent to the LLM"})]}),e.jsx("textarea",{className:"il-edit-ta",style:{height:68},value:s.inferenceDefinition,placeholder:"Describe what this inference detects…",onChange:t=>p("inferenceDefinition",t.target.value)})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 80px",gap:10,marginTop:10},children:[e.jsxs("div",{children:[e.jsx("div",{className:"il-field-lbl-edit",children:"Phase"}),e.jsxs("select",{className:"sv-select il-edit-input",style:{width:"100%",minWidth:0},value:s.phase,onChange:t=>p("phase",t.target.value),children:[e.jsx("option",{value:"qualification",children:"qualification"}),e.jsx("option",{value:"shaping",children:"shaping"}),e.jsx("option",{value:"development",children:"development"}),e.jsx("option",{value:"closing",children:"closing"})]})]}),e.jsxs("div",{children:[e.jsx("div",{className:"il-field-lbl-edit",children:"PrimaryForce"}),e.jsx("select",{className:"sv-select il-edit-input",style:{width:"100%",minWidth:0},value:s.primaryForce,onChange:t=>p("primaryForce",t.target.value),children:["Artha","Laya","Kriya","Gati","Rasa"].map(t=>e.jsx("option",{value:t,children:t},t))})]}),e.jsxs("div",{children:[e.jsx("div",{className:"il-field-lbl-edit",children:"SortOrder"}),e.jsx("input",{className:`${x} il-edit-input`,type:"number",style:{textAlign:"center"},value:s.sortOrder,onChange:t=>p("sortOrder",Number(t.target.value))})]})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(Q,{label:"InferenceType",hint:"API rowKey — cannot be changed",children:e.jsx("input",{className:x,style:X,value:s.inferenceType,readOnly:!0})}),e.jsx(Q,{label:"InferenceName",children:e.jsx("input",{className:x,style:X,value:s.inferenceName,readOnly:!0})}),e.jsx(Q,{label:"InferenceDefinition",hint:"Semantic definition sent to the LLM",children:e.jsx("textarea",{className:x,style:oe,value:s.inferenceDefinition,readOnly:!0})}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 80px",gap:10,marginTop:10},children:[{lbl:"Phase",val:s.phase},{lbl:"PrimaryForce",val:s.primaryForce},{lbl:"SortOrder",val:String(s.sortOrder)}].map(({lbl:t,val:j})=>e.jsxs("div",{children:[e.jsx("div",{className:"il-field-lbl-ro",children:t}),e.jsx("input",{className:x,style:{...X,textAlign:t==="SortOrder"?"center":"left"},value:j,readOnly:!0})]},t))})]}),e.jsx(ae,{label:"Scoring · adjust thresholds, weights and flags"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10},children:[e.jsxs("div",{children:[e.jsx("div",{className:"il-field-lbl-edit",children:"ThresholdScore"}),e.jsx("input",{className:`${x} il-edit-input`,type:"number",style:{textAlign:"center"},value:s.thresholdScore,onChange:t=>p("thresholdScore",Number(t.target.value))}),e.jsx("div",{style:{fontSize:10.5,color:"var(--ink5)",marginTop:3},children:"0–10"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"il-field-lbl-edit",children:"Weight"}),e.jsx("input",{className:`${x} il-edit-input`,type:"number",step:"0.1",style:{textAlign:"center"},value:s.weight,onChange:t=>p("weight",Number(t.target.value))}),e.jsx("div",{style:{fontSize:10.5,color:"var(--ink5)",marginTop:3},children:"multiplier"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"il-field-lbl-edit",children:"IsGateInference"}),e.jsxs("select",{className:"sv-select il-edit-input",style:{width:"100%",minWidth:0},value:s.isGateInference?"yes":"no",onChange:t=>p("isGateInference",t.target.value==="yes"),children:[e.jsx("option",{value:"no",children:"no"}),e.jsx("option",{value:"yes",children:"yes"})]})]}),e.jsxs("div",{children:[e.jsx("div",{className:"il-field-lbl-edit",children:"Enabled"}),e.jsxs("select",{className:"sv-select il-edit-input",style:{width:"100%",minWidth:0,fontWeight:700,color:s.enabled?"var(--ok, #166534)":"var(--wa, #B91C1C)"},value:s.enabled?"yes":"no",onChange:t=>p("enabled",t.target.value==="yes"),children:[e.jsx("option",{value:"yes",children:"✓ enabled"}),e.jsx("option",{value:"no",children:"✕ disabled"})]}),e.jsxs("div",{style:{marginTop:4,fontSize:10,padding:"2px 7px",borderRadius:5,textAlign:"center",fontWeight:600,background:s.enabled?"#DCFCE7":"#FEE2E2",color:s.enabled?"#166534":"#991B1B"},children:["Currently ",s.enabled?"active":"inactive"]})]})]}),a._isNew?e.jsx(ae,{label:"Evidence guidance · used by the LLM at scoring time"}):e.jsx(fe,{label:"Evidence guidance · used by the LLM at scoring time"}),a._isNew?e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{marginTop:10},children:[e.jsx("div",{className:"il-field-lbl-edit",children:"PositiveEvidenceGuidance"}),e.jsx("textarea",{className:"il-edit-ta",style:{height:60},value:s.positiveEvidenceGuidance,placeholder:"Signals that confirm this inference is true…",onChange:t=>p("positiveEvidenceGuidance",t.target.value)})]}),e.jsxs("div",{style:{marginTop:10},children:[e.jsx("div",{className:"il-field-lbl-edit",children:"NegativeEvidenceGuidance"}),e.jsx("textarea",{className:"il-edit-ta",style:{height:60},value:s.negativeEvidenceGuidance,placeholder:"Signals that contradict or weaken this inference…",onChange:t=>p("negativeEvidenceGuidance",t.target.value)})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(Q,{label:"PositiveEvidenceGuidance",children:e.jsx("textarea",{className:x,style:oe,value:s.positiveEvidenceGuidance,readOnly:!0})}),e.jsx(Q,{label:"NegativeEvidenceGuidance",children:e.jsx("textarea",{className:x,style:oe,value:s.negativeEvidenceGuidance,readOnly:!0})})]}),e.jsx(ae,{label:"Question variants · selected at runtime via QuestionStrategy"}),[{key:"defaultQuestion",label:"DefaultQuestion"},{key:"softQuestion",label:"SoftQuestion"},{key:"directQuestion",label:"DirectQuestion"},{key:"executiveQuestion",label:"ExecutiveQuestion"},{key:"procurementQuestion",label:"ProcurementQuestion"},{key:"renewalQuestion",label:"RenewalQuestion"}].map(({key:t,label:j})=>e.jsxs("div",{style:{marginTop:10},children:[e.jsx("div",{className:"il-field-lbl-edit",children:j}),e.jsx("textarea",{className:"il-edit-ta",value:s[t],onChange:w=>p(t,w.target.value)})]},t))]}),e.jsxs("div",{style:{padding:"12px 18px",borderTop:"0.5px solid var(--brd)",display:"flex",gap:8,justifyContent:"space-between",alignItems:"center",background:"var(--bg2)",flexShrink:0},children:[e.jsx("span",{style:{fontSize:10.5,color:"var(--ink5)"},children:a._isNew?"Fill in all fields to create this inference":"Scoring + Question variants are editable"}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx("button",{className:"btn",onClick:n,disabled:r,children:"Cancel"}),e.jsx("button",{className:"btn pri",onClick:()=>i(s),disabled:r,children:r?"Saving…":"Save changes"})]})]})]})})}function sa({inf:a,onEdit:r,onToggleEnabled:i,toggling:n}){const s=ee[a.phase]??ee.qualification,l=ve[a.primaryForce]??ve.Artha,p=!a.enabled;return e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 80px 72px 52px 52px 52px 96px",gap:8,alignItems:"center",padding:"10px 18px",borderBottom:"0.5px solid var(--brd)",background:"transparent",transition:"background .12s",opacity:p?.5:1},onMouseEnter:x=>x.currentTarget.style.background="var(--bg2)",onMouseLeave:x=>x.currentTarget.style.background="transparent",children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:2,minWidth:0},children:[e.jsx("div",{style:{fontFamily:'"DM Mono",monospace',fontSize:10.5,color:"var(--p)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",textDecoration:p?"line-through":"none"},children:a.inferenceType}),e.jsx("div",{style:{fontSize:12,color:p?"var(--ink5)":"var(--ink)",lineHeight:1.35,textDecoration:p?"line-through":"none"},children:a.inferenceName})]}),e.jsx("div",{children:e.jsx("span",{style:{fontSize:10,padding:"2px 7px",borderRadius:10,fontWeight:500,whiteSpace:"nowrap",background:l.bg,color:l.color},children:a.primaryForce})}),e.jsx("div",{children:e.jsx("span",{style:{fontSize:"9.5px",padding:"2px 6px",borderRadius:4,fontWeight:600,background:s.bg,color:s.color},children:s.label})}),e.jsx("div",{style:{display:"flex",alignItems:"center"},children:e.jsx("span",{style:{fontSize:10,width:18,height:18,borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,background:a.isGateInference?"#FAEEDA":"transparent",color:a.isGateInference?"#854F0B":"var(--ink5)"},children:a.isGateInference?"G":"—"})}),e.jsx("div",{style:{fontFamily:'"DM Mono",monospace',fontSize:11,color:"var(--ink3)",textAlign:"center"},children:a.thresholdScore??"—"}),e.jsxs("div",{style:{fontFamily:'"DM Mono",monospace',fontSize:11,color:"var(--ink3)",textAlign:"center"},children:[a.weight,"×"]}),e.jsxs("div",{style:{display:"flex",gap:4,justifyContent:"flex-end"},children:[e.jsx("button",{style:{height:26,padding:"0 9px",borderRadius:6,border:"0.5px solid var(--brd2)",background:"transparent",fontSize:11,color:"var(--ink4)",cursor:"pointer",fontFamily:'"DM Sans",sans-serif',transition:"background .12s,color .12s"},onMouseEnter:x=>{x.currentTarget.style.background="var(--pu)",x.currentTarget.style.color="var(--p)"},onMouseLeave:x=>{x.currentTarget.style.background="transparent",x.currentTarget.style.color="var(--ink4)"},onClick:()=>r(a),children:"Edit"}),e.jsx("button",{style:{height:26,padding:"0 9px",borderRadius:6,border:"0.5px solid var(--brd2)",background:"transparent",fontSize:11,color:p?"var(--ok)":"var(--ink4)",cursor:n?"not-allowed":"pointer",fontFamily:'"DM Sans",sans-serif',transition:"background .12s,color .12s",opacity:n?.5:1},onMouseEnter:x=>{n||(x.currentTarget.style.background="var(--pu)")},onMouseLeave:x=>{x.currentTarget.style.background="transparent"},disabled:n,onClick:()=>i(a),children:n?"…":p?"Enable":"Disable"})]})]})}function ta({phase:a}){const r=ee[a]??ee.qualification;return e.jsxs("div",{style:{padding:"6px 18px",fontSize:"9.5px",fontWeight:700,letterSpacing:".09em",textTransform:"uppercase",color:r.color,background:`${r.bg}88`,borderBottom:"0.5px solid var(--brd)",borderTop:"0.5px solid var(--brd)",display:"flex",alignItems:"center",gap:8},children:[e.jsx("span",{style:{width:6,height:6,borderRadius:2,background:r.color,display:"inline-block"}}),a]})}function oa(){return e.jsx(e.Fragment,{children:[...Array(6)].map((a,r)=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 80px 72px 52px 52px 52px 96px",gap:8,padding:"12px 18px",borderBottom:"0.5px solid var(--brd)",alignItems:"center"},children:[e.jsxs("div",{children:[e.jsx("div",{className:"skel",style:{height:10,width:140,marginBottom:5}}),e.jsx("div",{className:"skel",style:{height:12,width:180}})]}),e.jsx("div",{className:"skel",style:{height:20,width:52,borderRadius:10}}),e.jsx("div",{className:"skel",style:{height:18,width:44,borderRadius:4}}),e.jsx("div",{className:"skel",style:{height:18,width:18,borderRadius:4}}),e.jsx("div",{className:"skel",style:{height:14,width:20,margin:"0 auto"}}),e.jsx("div",{className:"skel",style:{height:14,width:24,margin:"0 auto"}}),e.jsxs("div",{style:{display:"flex",gap:4,justifyContent:"flex-end"},children:[e.jsx("div",{className:"skel",style:{height:26,width:40,borderRadius:6}}),e.jsx("div",{className:"skel",style:{height:26,width:52,borderRadius:6}})]})]},r))})}function la(){return{inferenceType:"new_inference",inferenceName:"New Inference",inferenceDefinition:"",primaryForce:"Artha",thresholdScore:5,weight:1,positiveEvidenceGuidance:"",negativeEvidenceGuidance:"",isGateInference:!1,phase:"qualification",defaultQuestion:"",softQuestion:"",directQuestion:"",executiveQuestion:"",procurementQuestion:"",renewalQuestion:"",sortOrder:99,enabled:!0,_isNew:!0}}function le(){const a=typeof localStorage<"u"?localStorage.getItem("zotra_token"):null;return{"Content-Type":"application/json",...a?{Authorization:`Bearer ${a}`}:{}}}function ca(){const[a,r]=d.useState([]),[i,n]=d.useState(!0),[s,l]=d.useState(null),[p,x]=d.useState("all"),[t,j]=d.useState(null),[w,u]=d.useState(!1),[h,b]=d.useState(null),[f,z]=d.useState(null);function S(c,y="ok"){z({msg:c,type:y}),setTimeout(()=>z(null),3200)}d.useEffect(()=>{n(!0),M(`${L()}/inference-library/seed`,{method:"POST",headers:le()}).then(c=>{if(!c.ok)throw new Error(`${c.status}`);return c.json()}).then(c=>{const y=Array.isArray(c)?c:c.inferences??[];y.sort((T,I)=>(T.sortOrder??0)-(I.sortOrder??0)),r(y),l(null)}).catch(c=>{l(c.message),r([])}).finally(()=>n(!1))},[]);const N=d.useCallback(async c=>{u(!0);const{phase:y,inferenceType:T}=c,{_isNew:I,partitionKey:O,rowKey:G,timestamp:$,eTag:ge,...H}=c;try{const K=(t==null?void 0:t.phase)??y,ne=(t==null?void 0:t.inferenceType)??T,U=await M(`${L()}/inference-library/${encodeURIComponent(K)}/${encodeURIComponent(ne)}`,{method:"PATCH",headers:le(),body:JSON.stringify(H)});if(!U.ok)throw new Error(`${U.status}`);const ue=await U.json();r(me=>I?[...me,ue].sort((q,$e)=>(q.sortOrder??0)-($e.sortOrder??0)):me.map(q=>q.inferenceType===((t==null?void 0:t.inferenceType)??T)&&q.phase===((t==null?void 0:t.phase)??y)?ue:q)),S(I?"Inference created":"Inference saved"),j(null)}catch(K){S(`Save failed: ${K.message}`,"err")}finally{u(!1)}},[t]),o=d.useCallback(async c=>{const y=`${c.phase}::${c.inferenceType}`;b(y);const{_isNew:T,partitionKey:I,rowKey:O,timestamp:G,eTag:$,...ge}=c;try{const H=await M(`${L()}/inference-library/${encodeURIComponent(c.phase)}/${encodeURIComponent(c.inferenceType)}`,{method:"PATCH",headers:le(),body:JSON.stringify({...ge,enabled:!c.enabled})});if(!H.ok)throw new Error(`${H.status}`);const K=await H.json();r(ne=>ne.map(U=>U.inferenceType===c.inferenceType&&U.phase===c.phase?K:U)),S(c.enabled?`${c.inferenceName} disabled`:`${c.inferenceName} enabled`)}catch(H){S(`Toggle failed: ${H.message}`,"err")}finally{b(null)}},[]),m=Array.from(new Set(a.map(c=>Y(c.phase)))),C=na.map(c=>Y(c)).filter((c,y,T)=>T.indexOf(c)===y&&m.includes(c)),_=p==="all"?a:a.filter(c=>Y(c.phase)===p),v=C.map(c=>({phase:c,items:_.filter(y=>Y(y.phase)===c)})).filter(c=>c.items.length>0),g=a.filter(c=>c.enabled).length,F=a.filter(c=>c.isGateInference&&c.enabled).length;function A(c){return c==="all"?a.length:a.filter(y=>Y(y.phase)===c).length}return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:aa}),f&&e.jsx(ra,{msg:f.msg,type:f.type}),t&&e.jsx(ia,{inf:t,saving:w,onSave:N,onClose:()=>j(null)}),s&&e.jsxs("div",{style:{padding:"8px 14px",fontSize:11.5,color:"var(--wa)",background:"var(--wab)",borderRadius:8,marginBottom:10,display:"flex",gap:8},children:["⚠ Could not reach API (",s,"). Inference library unavailable."]}),e.jsxs("div",{className:"sv-card",children:[e.jsxs("div",{className:"sv-card-hdr",children:[e.jsx("div",{className:"sv-card-icon",style:{background:"var(--pp)",color:"var(--p)"},children:e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"}),e.jsx("path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"})]})}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{className:"sv-card-title",children:"Inference Library"}),e.jsx("span",{className:"sv-card-api",children:"POST /api/inference-library/seed · PATCH /api/inference-library/{phase}/{id}"})]}),e.jsxs("div",{style:{marginLeft:"auto",flexShrink:0,display:"flex",gap:8,alignItems:"center"},children:[!i&&e.jsxs("span",{style:{fontSize:11,color:"var(--ink5)",fontFamily:'"DM Mono",monospace'},children:[a.length," inferences"]}),e.jsxs("button",{className:"btn pri",style:{display:"flex",alignItems:"center",gap:5,height:28,padding:"0 11px",fontSize:11.5,fontWeight:600},disabled:i,onClick:()=>j(la()),children:[e.jsxs("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]}),"New Inference"]})]})]}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:0,padding:"0 14px",borderBottom:"0.5px solid var(--brd)",background:"var(--bg2)",flexWrap:"wrap"},children:["all",...C].map(c=>{const y=c!=="all"?ee[c]:null,T=p===c;return e.jsxs("button",{onClick:()=>x(c),style:{padding:"9px 12px",borderRadius:0,border:"none",background:"none",fontSize:11.5,fontWeight:T?600:500,color:T?y?y.color:"var(--p)":"var(--ink4)",cursor:"pointer",borderBottom:T?`2px solid ${y?y.color:"var(--p)"}`:"2px solid transparent",transition:"color .15s",fontFamily:'"DM Sans",sans-serif'},children:[c==="all"?"All phases":c.charAt(0).toUpperCase()+c.slice(1),e.jsx("span",{style:{fontSize:10,padding:"1px 5px",borderRadius:8,background:"var(--bg3)",color:"var(--ink5)",marginLeft:5,fontWeight:500},children:A(c)})]},c)})}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 80px 72px 52px 52px 52px 96px",gap:8,padding:"7px 18px",background:"var(--bg3)",borderBottom:"0.5px solid var(--brd)"},children:["InferenceType · InferenceName","PrimaryForce","Phase","Gate","Score","Weight",""].map((c,y)=>e.jsx("div",{style:{fontSize:"9.5px",fontWeight:600,letterSpacing:".07em",textTransform:"uppercase",color:"var(--ink5)"},children:c},y))}),i&&e.jsx(oa,{}),!i&&v.map(({phase:c,items:y})=>e.jsxs(Re.Fragment,{children:[p==="all"&&e.jsx(ta,{phase:c}),y.map(T=>e.jsx(sa,{inf:T,onEdit:j,onToggleEnabled:o,toggling:h===`${T.phase}::${T.inferenceType}`},`${T.phase}::${T.inferenceType}`))]},c)),!i&&_.length===0&&e.jsx("div",{style:{padding:"32px 18px",textAlign:"center",color:"var(--ink5)",fontSize:12.5},children:s?"Could not load inferences.":"No inferences in this phase."}),e.jsxs("div",{style:{padding:"10px 18px",borderTop:"0.5px solid var(--brd)",display:"flex",alignItems:"center",gap:8},children:[e.jsx("span",{style:{fontSize:11.5,color:"var(--ink5)",flex:1},children:i?"Loading…":`${g} active · ${F} gates`}),e.jsx("button",{className:"btn",disabled:i||a.length===0,onClick:()=>{const c=new Blob([JSON.stringify(a,null,2)],{type:"application/json"}),y=URL.createObjectURL(c),T=document.createElement("a");T.href=y,T.download="inference-library.json",T.click(),URL.revokeObjectURL(y)},children:"Export JSON"})]})]})]})}const pe=`
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
`,B={gmail:e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",children:[e.jsx("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z",fill:"#EA4335",opacity:".15"}),e.jsx("polyline",{points:"22,6 12,13 2,6",stroke:"#EA4335",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",fill:"none"})]}),gcal:e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"#4285F4",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2"}),e.jsx("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),e.jsx("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),e.jsx("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),outlook:e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",children:[e.jsx("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z",fill:"#0078D4",opacity:".15"}),e.jsx("polyline",{points:"22,6 12,13 2,6",stroke:"#0078D4",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",fill:"none"})]}),mcal:e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"#0078D4",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2"}),e.jsx("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),e.jsx("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),e.jsx("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),teams:e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"#4B53BC",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}),e.jsx("circle",{cx:"9",cy:"7",r:"4"}),e.jsx("path",{d:"M23 21v-2a4 4 0 0 0-3-3.87"}),e.jsx("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]}),link:e.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}),e.jsx("path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"})]}),close:e.jsxs("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]}),plus:e.jsxs("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",children:[e.jsx("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]}),check:e.jsx("svg",{width:"8",height:"8",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"20 6 9 17 4 12"})}),info:e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),e.jsx("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})]}),warn:e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}),e.jsx("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),e.jsx("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})]}),google:e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",children:[e.jsx("path",{d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",fill:"#4285F4"}),e.jsx("path",{d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",fill:"#34A853"}),e.jsx("path",{d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z",fill:"#FBBC05"}),e.jsx("path",{d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",fill:"#EA4335"})]}),ms:e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",children:[e.jsx("rect",{x:"1",y:"1",width:"10",height:"10",fill:"#F35325"}),e.jsx("rect",{x:"13",y:"1",width:"10",height:"10",fill:"#81BC06"}),e.jsx("rect",{x:"1",y:"13",width:"10",height:"10",fill:"#05A6F0"}),e.jsx("rect",{x:"13",y:"13",width:"10",height:"10",fill:"#FFBA08"})]}),lockIcon:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2"}),e.jsx("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]}),msEmptyIcon:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:[e.jsx("rect",{x:"1",y:"1",width:"10",height:"10",fill:"#F35325",opacity:".4"}),e.jsx("rect",{x:"13",y:"1",width:"10",height:"10",fill:"#81BC06",opacity:".4"}),e.jsx("rect",{x:"1",y:"13",width:"10",height:"10",fill:"#05A6F0",opacity:".4"}),e.jsx("rect",{x:"13",y:"13",width:"10",height:"10",fill:"#FFBA08",opacity:".4"})]})},he={gmail:{name:"Gmail",icon:B.gmail,iconBg:"rgba(234,67,53,.07)",scope:"gmail.readonly",disabledDesc:"inbox & sent"},google_calendar:{name:"Google Calendar",icon:B.gcal,iconBg:"rgba(66,133,244,.07)",scope:"calendar.readonly",disabledDesc:"meeting imports"},outlook:{name:"Outlook Mail",icon:B.outlook,iconBg:"rgba(0,120,212,.07)",scope:"mail.read",disabledDesc:"inbox & sent"},microsoft_calendar:{name:"Microsoft Calendar",icon:B.mcal,iconBg:"rgba(0,120,212,.07)",scope:"calendars.read",disabledDesc:"meeting imports"},teams:{name:"Microsoft Teams",icon:B.teams,iconBg:"rgba(75,83,188,.07)",scope:"teams.notify",disabledDesc:"agent notifications"}};function Fe(){const a=localStorage.getItem("zotra_token");return{"Content-Type":"application/json",...a?{Authorization:`Bearer ${a}`}:{}}}function da(a){const r=a.split("@")[0].split(/[._-]/);return r.length>=2?(r[0][0]+r[1][0]).toUpperCase():a.slice(0,2).toUpperCase()}function pa(a,r){const i=["#4285F4,#34A853","#1DC4A0,#3DD9B8","#F4B400,#EA4335"],n=["#0078D4,#4B53BC","#00BCF2,#0078D4"];return a==="google"?i[r%i.length]:n[r%n.length]}function xa(a){if(!a.enabled)return"";if(a.lastSyncAt){const r=Math.round((Date.now()-new Date(a.lastSyncAt).getTime())/6e4),i=r<2?"just now":`${r} min ago`,n=he[a.appType];return`Syncing · ${i} · ${(n==null?void 0:n.disabledDesc)??""}`}return a.syncStatus==="active"?"Active · watching for changes":"Pending first sync"}function ha(a,r){return r?a==="active"?"ok":a==="error"?"warn":"ok":"off"}function ye(a,r){return a.map((i,n)=>({connectionId:i.connectionId,provider:r,label:i.label,status:i.status,lastAuthAt:i.lastAuthAt,initials:da(i.label),avatarGrad:pa(r,n),apps:i.apps.map(s=>{const l=he[s.appType]??{name:s.appType,icon:B.link,iconBg:"var(--bg3)",scope:s.appType,disabledDesc:s.appType};return{appInstanceId:s.appInstanceId,appType:s.appType,name:l.name,scope:l.scope,iconBg:l.iconBg,icon:l.icon,enabled:s.enabled,syncDot:ha(s.syncStatus,s.enabled),activeDesc:xa(s),disabledDesc:l.disabledDesc,config:s.config}})}))}function Ee({checked:a,onChange:r}){return e.jsxs("label",{className:"int-tog",children:[e.jsx("input",{type:"checkbox",checked:a,onChange:i=>r(i.target.checked)}),e.jsx("span",{className:"int-tog-track"}),e.jsx("span",{className:"int-tog-thumb"})]})}function W({label:a,hint:r,children:i}){return e.jsxs("div",{className:"int-df-field",children:[e.jsx("label",{children:a}),i,r&&e.jsx("div",{className:"hint",children:r})]})}function ga({connLabel:a,config:r}){var i;return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"int-df-div",children:"Account"}),e.jsx("div",{className:"int-df-acct-tag",children:a}),e.jsx("div",{className:"int-df-div",children:"Sync"}),e.jsx(W,{label:"Sync interval",hint:"Minutes between polls",children:e.jsx("select",{defaultValue:String(r.syncIntervalMinutes??10)+" min",children:["5 min","10 min","15 min","30 min"].map(n=>e.jsx("option",{children:n},n))})}),e.jsx(W,{label:"Mailbox scope",children:e.jsxs("select",{defaultValue:r.mailboxScope==="all"?"All mail":"Inbox + Sent",children:[e.jsx("option",{children:"Inbox"}),e.jsx("option",{children:"Inbox + Sent"}),e.jsx("option",{children:"All mail"})]})}),e.jsx(W,{label:"Label filter",hint:"Comma-separated labels (blank = all)",children:e.jsx("input",{type:"text",defaultValue:((i=r.labelFilter)==null?void 0:i.join(", "))??"",placeholder:"e.g. deals, prospects"})}),e.jsx("div",{className:"int-df-div",children:"On error"}),e.jsx(W,{label:"If sync fails",children:e.jsxs("select",{defaultValue:r.onError==="retry"?"Retry":"Log and alert",children:[e.jsx("option",{children:"Log and alert"}),e.jsx("option",{children:"Retry"}),e.jsx("option",{children:"Pause sync"}),e.jsx("option",{children:"Ignore"})]})})]})}function ua({connLabel:a,config:r}){return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"int-df-div",children:"Account"}),e.jsx("div",{className:"int-df-acct-tag",children:a}),e.jsx("div",{className:"int-df-div",children:"Sync"}),e.jsx(W,{label:"Sync interval",children:e.jsx("select",{defaultValue:String(r.syncIntervalMinutes??10)+" min",children:["5 min","10 min","15 min","30 min"].map(i=>e.jsx("option",{children:i},i))})}),e.jsx(W,{label:"Calendars",children:e.jsxs("select",{defaultValue:r.calendars==="all"?"All calendars":"Primary",children:[e.jsx("option",{children:"Primary"}),e.jsx("option",{children:"All calendars"}),e.jsx("option",{children:"Work only"})]})}),e.jsx(W,{label:"Auto-create pre-call briefs",children:e.jsxs("select",{defaultValue:r.autoCreateBriefs?"Yes":"No",children:[e.jsx("option",{children:"Yes"}),e.jsx("option",{children:"No"})]})})]})}function ma({connLabel:a,config:r}){return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"int-df-div",children:"Account"}),e.jsx("div",{className:"int-df-acct-tag",children:a}),e.jsx("div",{className:"int-df-div",children:"Sync"}),e.jsx(W,{label:"Sync interval",children:e.jsx("select",{defaultValue:String(r.syncIntervalMinutes??10)+" min",children:["5 min","10 min","15 min","30 min"].map(i=>e.jsx("option",{children:i},i))})}),e.jsx(W,{label:"Folder scope",children:e.jsxs("select",{defaultValue:r.mailboxScope==="inbox"?"Inbox":"Inbox + Sent",children:[e.jsx("option",{children:"Inbox"}),e.jsx("option",{children:"Inbox + Sent"}),e.jsx("option",{children:"All folders"})]})})]})}function ba({connLabel:a}){return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"int-df-div",children:"Account"}),e.jsx("div",{className:"int-df-acct-tag",children:a}),e.jsx("div",{className:"int-df-div",children:"Notifications"}),e.jsx(W,{label:"Default channel",hint:"e.g. General or deal-updates",children:e.jsx("input",{type:"text",placeholder:"#deal-updates"})}),e.jsx(W,{label:"Notify on",children:e.jsxs("select",{defaultValue:"All events",children:[e.jsx("option",{children:"Deal signals only"}),e.jsx("option",{children:"Agent actions only"}),e.jsx("option",{children:"All events"})]})})]})}function va({provider:a}){const[r,i]=d.useState({gmail:!0,gcal:!0,outlook:!0,mcal:!0,teams:!0}),n=a==="google"?["gmail","gcal"]:["outlook","mcal","teams"],s=a==="google"?"Google":"Microsoft";return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"int-banner blue",children:[e.jsx("strong",{children:"OAuth 2.0 connection."})," A secure ",s," sign-in window will open. No passwords stored."]}),e.jsx(W,{label:"Account email",hint:`The ${s} account to authorise`,children:e.jsx("input",{type:"text",placeholder:a==="google"?"you@gmail.com":"you@company.com"})}),e.jsx("div",{className:"int-df-div",children:"Apps to activate"}),e.jsx("div",{style:{fontSize:11,color:"var(--ink5)",marginBottom:10},children:"All apps share this account's OAuth token."}),n.map(l=>{const p=he[l];return p?e.jsxs("div",{className:"int-df-app-row",children:[e.jsx("div",{style:{width:26,height:26,background:p.iconBg,borderRadius:7,border:"1px solid var(--brd)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:p.icon}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontSize:12,fontWeight:600,color:"var(--ink2)"},children:p.name}),e.jsx("div",{style:{fontSize:10.5,color:"var(--ink5)"},children:p.disabledDesc})]}),e.jsx(Ee,{checked:r[l]??!0,onChange:x=>i(t=>({...t,[l]:x}))})]},l):null})]})}function fa({mode:a,onClose:r,onConfirm:i}){if(!a)return null;const s={"add-account":{title:`Connect · ${a.type==="add-account"?a.provider==="google"?"Google":"Microsoft":""}`,iconBg:"var(--pp)",iconColor:"var(--p)",icon:B.link,saveLabel:"Authorise & connect",saveCls:"int-btn pri"},reauth:{title:`Re-authorise · ${a.type==="reauth"?a.connLabel:""}`,iconBg:"var(--wab)",iconColor:"var(--wa)",icon:B.link,saveLabel:"Re-authorise",saveCls:"int-btn"},revoke:{title:`Revoke · ${a.type==="revoke"?a.connLabel:""}`,iconBg:"var(--rib)",iconColor:"var(--ri)",icon:B.warn,saveLabel:"Confirm revoke",saveCls:"int-btn danger"},"app-settings":{title:`${a.type==="app-settings"?a.appName:""} · Settings`,iconBg:"var(--pu)",iconColor:"var(--p)",icon:B.link,saveLabel:"Save settings",saveCls:"int-btn pri"}}[a.type];function l(){if((a==null?void 0:a.type)==="add-account")return e.jsx(va,{provider:a.provider});if((a==null?void 0:a.type)==="reauth")return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"int-banner amber",children:"Re-authorising refreshes the OAuth token without changing enabled apps or configurations."}),e.jsx(W,{label:"Confirm account email",hint:"Must match the connected account",children:e.jsx("input",{type:"text",placeholder:a.connLabel})})]});if((a==null?void 0:a.type)==="revoke")return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"int-banner red",children:[e.jsxs("strong",{children:["Revoke ",a.connLabel,"?"]}),e.jsx("br",{}),"These apps will stop syncing immediately:"," ",e.jsx("strong",{children:a.appNames.join(", ")}),".",e.jsx("br",{}),"Imported data is preserved. Other accounts are unaffected."]}),e.jsx(W,{label:"Type the account email to confirm",children:e.jsx("input",{type:"text",placeholder:a.connLabel})})]});if((a==null?void 0:a.type)==="app-settings"){if(a.appType==="gmail")return e.jsx(ga,{connLabel:a.connLabel,config:a.config});if(a.appType==="google_calendar"||a.appType==="microsoft_calendar")return e.jsx(ua,{connLabel:a.connLabel,config:a.config});if(a.appType==="outlook")return e.jsx(ma,{connLabel:a.connLabel,config:a.config});if(a.appType==="teams")return e.jsx(ba,{connLabel:a.connLabel})}return null}return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"int-drw-overlay open",onClick:r}),e.jsxs("div",{className:"int-drw open",children:[e.jsxs("div",{className:"int-drw-head",children:[e.jsx("div",{className:"int-drw-icon",style:{background:s.iconBg,color:s.iconColor},children:s.icon}),e.jsx("div",{className:"int-drw-title",children:s.title}),e.jsx("button",{className:"int-drw-close",onClick:r,children:B.close})]}),e.jsx("div",{className:"int-drw-body",children:l()}),e.jsxs("div",{className:"int-drw-foot",children:[e.jsx("button",{className:"int-btn",onClick:r,children:"Cancel"}),e.jsx("button",{className:s.saveCls,onClick:()=>i(a),children:s.saveLabel})]})]})]})}function ya({app:a,connLabel:r,onSettings:i,onToggle:n}){const[s,l]=d.useState(a.enabled),[p,x]=d.useState(!1);async function t(j){x(!0);try{const w=await M(`${L()}/integrations/apps/${a.appInstanceId}`,{method:"PATCH",headers:Fe(),body:JSON.stringify({enabled:j})});if(!w.ok)throw new Error(`${w.status}`);l(j),n(a.appInstanceId,j)}catch{}finally{x(!1)}}return e.jsxs("tr",{className:`int-app-tr${s?"":" off"}`,children:[e.jsx("td",{className:"int-app-td",children:e.jsx("div",{className:"int-app-ico",style:{background:a.iconBg},children:a.icon})}),e.jsxs("td",{className:"int-app-td",children:[e.jsxs("div",{className:"int-app-nm",children:[a.name,e.jsx("span",{className:"int-scope-tag",children:a.scope})]}),e.jsxs("div",{className:"int-app-status",children:[e.jsx("span",{className:`int-sdot ${s?a.syncDot:"off"}`}),s?a.activeDesc:`Paused · ${a.disabledDesc}`]})]}),e.jsx("td",{className:"int-app-td",children:e.jsxs("div",{className:"int-app-ctrl",children:[s&&e.jsx("button",{className:"int-btn xs ghost",onClick:()=>i(a,r),children:"Settings"}),e.jsx(Ee,{checked:s,onChange:t}),p&&e.jsx("span",{style:{fontSize:10,color:"var(--ink5)"},children:"…"})]})})]})}function ja({conn:a,onReauth:r,onRevoke:i,onAppSettings:n,onToggle:s}){const[l,p]=d.useState(!0),x=a.apps.filter(h=>h.enabled).length,t=a.status==="active"?x===a.apps.length?"Active":`${x} of ${a.apps.length} enabled`:"Needs re-auth",j=a.status==="active"?"on":"part",u=`OAuth 2.0 · connected ${new Date(a.lastAuthAt).toLocaleDateString("en-GB",{month:"short",year:"numeric"})} · ${x} app${x!==1?"s":""} active`;return e.jsxs("div",{className:`int-acct-card${l?" open":""}`,children:[e.jsxs("div",{className:"int-acct-head",onClick:()=>p(h=>!h),children:[e.jsx("div",{className:"int-acct-av",style:{background:`linear-gradient(135deg,${a.avatarGrad})`},children:a.initials}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{className:"int-acct-email",children:a.label}),e.jsx("div",{className:"int-acct-meta",children:u})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,flexShrink:0},children:[e.jsxs("span",{className:`int-acct-pill ${j}`,children:[j==="on"&&B.check," ",t]}),e.jsx("button",{className:"int-btn xs",onClick:h=>{h.stopPropagation(),r(a)},children:"Re-auth"}),e.jsx("button",{className:"int-btn xs danger",onClick:h=>{h.stopPropagation(),i(a)},children:"Revoke"}),e.jsx("svg",{style:{width:12,height:12,color:"var(--ink5)",flexShrink:0,transition:"transform .18s",transform:l?"rotate(90deg)":void 0},viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"9 18 15 12 9 6"})})]})]}),l&&e.jsx("table",{className:"int-app-tbl",children:e.jsx("tbody",{children:a.apps.map(h=>e.jsx(ya,{app:h,connLabel:a.label,onSettings:n,onToggle:s},h.appInstanceId))})})]})}const ka={google:{id:"google",name:"Google",logoBg:"#F8F9FF",logo:B.google,appsLabel:"Gmail · Calendar · Drive · Contacts",emptyIconBg:"#F8F9FF",emptyIcon:B.lockIcon,emptyTitle:"No Google accounts connected",emptyDesc:"Connect to enable Gmail, Calendar, Drive, and Contacts."},microsoft:{id:"microsoft",name:"Microsoft",logoBg:"#F6F8FF",logo:B.ms,appsLabel:"Outlook · Calendar · Teams",emptyIconBg:"#F6F8FF",emptyIcon:B.msEmptyIcon,emptyTitle:"No Microsoft accounts connected",emptyDesc:"Connect to enable Outlook Mail, Calendar, and Teams notifications."}};function wa({meta:a,connections:r,onAdd:i,onReauth:n,onRevoke:s,onSettings:l,onToggle:p,defaultOpen:x}){const[t,j]=d.useState(x),w=r.length,u=new Set,h=r.flatMap(b=>b.apps).filter(b=>b.enabled&&!u.has(b.name)&&(u.add(b.name),!0));return e.jsxs("div",{className:`int-prov${t?" open":""}`,children:[e.jsxs("div",{className:"int-prov-bar",children:[e.jsxs("div",{className:"int-prov-head",onClick:()=>j(b=>!b),children:[e.jsx("div",{className:"int-prov-logo",style:{background:a.logoBg},children:a.logo}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{className:"int-prov-name",children:a.name}),h.length>0?e.jsx("div",{className:"int-app-badges",children:h.map(b=>e.jsxs("span",{className:"int-app-badge active",children:[e.jsx("span",{className:"int-badge-dot"}),b.name]},b.appInstanceId))}):e.jsx("div",{className:"int-prov-desc",children:a.appsLabel})]})]}),e.jsxs("div",{className:"int-prov-right",children:[e.jsxs("span",{className:`int-conn-pill ${w>0?"on":"off"}`,children:[w>0&&B.check,w>0?`${w} account${w>1?"s":""}`:"Not connected"]}),e.jsx("button",{className:"int-btn sm pri",onClick:b=>{b.stopPropagation(),i(a)},children:w>0?"+ Add account":"Connect"}),e.jsx("svg",{className:"int-prov-chev",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round",onClick:()=>j(b=>!b),children:e.jsx("polyline",{points:"9 18 15 12 9 6"})})]})]}),t&&e.jsx("div",{className:"int-prov-body",children:r.length===0?e.jsxs("div",{className:"int-empty",children:[e.jsx("div",{className:"int-empty-ico",style:{background:a.emptyIconBg,color:"var(--ink5)"},children:a.emptyIcon}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{className:"int-empty-t",children:a.emptyTitle}),e.jsx("div",{className:"int-empty-d",children:a.emptyDesc})]}),e.jsx("button",{className:"int-btn sm pri",onClick:()=>i(a),children:"Connect"})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"int-accts-list",children:r.map(b=>e.jsx(ja,{conn:b,onReauth:n,onRevoke:s,onAppSettings:l,onToggle:p},b.connectionId))}),e.jsxs("div",{className:"int-add-row",onClick:()=>i(a),children:[B.plus," Add another ",a.name," account"]})]})})]})}function Na(){const[a,r]=d.useState(null);function i(n,s="ok"){r({msg:n,kind:s}),setTimeout(()=>r(null),3e3)}return{toast:a,show:i}}function Sa(){return e.jsxs("div",{children:[e.jsxs("div",{style:{background:"var(--bg2)",border:"1px solid var(--brd)",borderRadius:"var(--r)",marginBottom:14,padding:18},children:[e.jsxs("div",{style:{display:"flex",gap:12,marginBottom:14},children:[e.jsx("div",{className:"int-skel",style:{width:36,height:36,borderRadius:9}}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{className:"int-skel",style:{height:14,width:120,marginBottom:7,borderRadius:4}}),e.jsx("div",{className:"int-skel",style:{height:11,width:200,borderRadius:4}})]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",borderTop:"1px solid var(--brd)"},children:[0,1,2].map(a=>e.jsxs("div",{style:{padding:"12px 18px",borderRight:a<2?"1px solid var(--brd)":"none"},children:[e.jsx("div",{className:"int-skel",style:{height:20,width:32,marginBottom:6,borderRadius:4}}),e.jsx("div",{className:"int-skel",style:{height:10,width:70,borderRadius:4}})]},a))})]}),[0,1].map(a=>e.jsxs("div",{style:{background:"var(--bg2)",border:"1px solid var(--brd)",borderRadius:"var(--r)",marginBottom:10,padding:"14px 18px",display:"flex",alignItems:"center",gap:12},children:[e.jsx("div",{className:"int-skel",style:{width:40,height:40,borderRadius:10}}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{className:"int-skel",style:{height:13,width:100,marginBottom:7,borderRadius:4}}),e.jsx("div",{className:"int-skel",style:{height:10,width:180,borderRadius:4}})]}),e.jsx("div",{className:"int-skel",style:{height:24,width:80,borderRadius:20}})]},a))]})}function Ca(){const[a,r]=d.useState([]),[i,n]=d.useState([]),[s,l]=d.useState(!0),[p,x]=d.useState(null),[t,j]=d.useState(null),{toast:w,show:u}=Na();d.useEffect(()=>{l(!0),M(`${L()}/integrations`,{headers:Fe()}).then(o=>{if(!o.ok)throw new Error(`${o.status}`);return o.json()}).then(o=>{r(ye(o.google??[],"google")),n(ye(o.microsoft??[],"microsoft")),x(null)}).catch(o=>x(o.message)).finally(()=>l(!1))},[]);const h=[...a,...i],b=h.reduce((o,m)=>o+m.apps.filter(C=>C.enabled).length,0),f=h.length,z=[a,i].filter(o=>o.length>0).length;function S(o,m){const C=_=>_.map(v=>({...v,apps:v.apps.map(g=>g.appInstanceId===o?{...g,enabled:m}:g)}));r(C),n(C),u(m?"App enabled":"App paused","info")}function N(o){o.type==="add-account"?u(`${o.provider==="google"?"Google":"Microsoft"} account connected`,"ok"):o.type==="reauth"?u("Token refreshed","info"):o.type==="revoke"?(r(m=>m.filter(C=>C.connectionId!==o.connId)),n(m=>m.filter(C=>C.connectionId!==o.connId)),u(`${o.connLabel} revoked`,"err")):o.type==="app-settings"&&u("Settings saved","ok"),j(null)}return s?e.jsxs(e.Fragment,{children:[e.jsx("style",{children:pe}),e.jsx(Sa,{})]}):e.jsxs(e.Fragment,{children:[e.jsx("style",{children:pe}),w&&e.jsxs("div",{className:`int-toast ${w.kind}`,children:[w.kind==="ok"?"✓":w.kind==="err"?"✕":"·"," ",w.msg]}),e.jsx(fa,{mode:t,onClose:()=>j(null),onConfirm:N}),p&&e.jsxs("div",{style:{padding:"8px 14px",fontSize:11.5,color:"var(--wa)",background:"var(--wab)",borderRadius:8,marginBottom:10,display:"flex",gap:8},children:["⚠ Could not load integrations (",p,") — showing cached state."]}),e.jsxs("div",{className:"int-hdr",children:[e.jsxs("div",{className:"int-hdr-top",children:[e.jsx("div",{className:"int-hdr-icon",children:B.link}),e.jsxs("div",{children:[e.jsx("div",{className:"int-hdr-title",children:"Integrations"}),e.jsxs("div",{className:"int-hdr-sub",children:[e.jsxs("strong",{children:[b," apps active"]})," · ",f," accounts connected"]})]})]}),e.jsxs("div",{className:"int-kpi-strip",children:[e.jsxs("div",{className:"int-kpi",children:[e.jsx("div",{className:"int-kpi-val c-acc",children:b}),e.jsx("div",{className:"int-kpi-lbl",children:"Apps active"})]}),e.jsxs("div",{className:"int-kpi",children:[e.jsx("div",{className:"int-kpi-val c-ok",children:f}),e.jsx("div",{className:"int-kpi-lbl",children:"Accounts"})]}),e.jsxs("div",{className:"int-kpi",children:[e.jsx("div",{className:"int-kpi-val c-vi",children:z}),e.jsx("div",{className:"int-kpi-lbl",children:"Providers"})]})]}),e.jsxs("div",{className:"int-hdr-info",children:[e.jsx("span",{style:{color:"var(--ink4)",flexShrink:0,marginTop:1},children:B.info}),e.jsxs("span",{children:[e.jsx("strong",{children:"Multiple accounts per provider."})," Gmail and Drive on the same Google account share one OAuth token. Connect a second Google account to get an independent set of apps with separate credentials and settings."]})]})]}),["google","microsoft"].map((o,m)=>{const C=ka[o],_=o==="google"?a:i;return e.jsx(wa,{meta:C,connections:_,defaultOpen:m===0,onAdd:v=>j({type:"add-account",provider:v.id}),onReauth:v=>j({type:"reauth",connLabel:v.label,connId:v.connectionId}),onRevoke:v=>j({type:"revoke",connLabel:v.label,connId:v.connectionId,appNames:v.apps.filter(g=>g.enabled).map(g=>g.name)}),onSettings:(v,g)=>j({type:"app-settings",appName:v.name,connLabel:g,appInstanceId:v.appInstanceId,appType:v.appType,config:v.config}),onToggle:S},o)})]})}const za=`
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
.ca-rule{display:flex;align-items:center;gap:12px;padding:14px 16px;border-bottom:0.5px solid var(--brd)}
.ca-rule:last-child{border-bottom:none}
.ca-rule:hover{background:var(--pu)}
.ca-rule-num{width:27px;height:27px;border-radius:9px;background:var(--pp);color:var(--p);display:flex;align-items:center;justify-content:center;font-family:"DM Mono",monospace;font-size:11px;font-weight:700;flex-shrink:0}
.ca-rule-name{font-size:12.5px;font-weight:600;color:var(--ink);margin-bottom:2px}
.ca-rule-sub{font-size:11.5px;color:var(--ink4)}
@media(max-width:1100px){.ca-hero,.ca-grid{grid-template-columns:1fr}.ca-live-card{max-width:460px}.ca-form{grid-template-columns:1fr}}
`;function Aa({checked:a,onChange:r}){return e.jsxs("label",{className:"sv-tg",style:{cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:a,onChange:i=>r(i.target.checked),style:{display:"none"}}),e.jsx("div",{style:{width:36,height:20,borderRadius:20,background:a?"var(--p)":"var(--ink6)",transition:"background .2s",position:"relative",cursor:"pointer"},children:e.jsx("div",{style:{position:"absolute",top:3,left:a?19:3,width:14,height:14,borderRadius:"50%",background:"#fff",transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,.18)"}})})]})}function Ta(){const[a,r]=d.useState("Vak"),[i,n]=d.useState("Hi! I'm Vak, your Hartwell Residences assistant 👋"),[s,l]=d.useState(["Warm","Friendly","Professional"]),[p,x]=d.useState(!0),[t,j]=d.useState(!0),[w,u]=d.useState(!0),[h,b]=d.useState(`You are Vak, a leasing assistant for Hartwell Residences.

You help prospective residents find the perfect apartment. You have access to live inventory data including unit types, pricing, availability, amenities, and parking.

Your job:
1. Understand what the customer is looking for
2. Ask one clarifying question at a time — never overwhelm
3. Match them to available inventory and present options clearly
4. Guide them toward booking a viewing
5. Capture name, email, and preferred viewing slot to confirm

Always be warm, concise, and professional. End every response with a clear next step.`);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:za}),e.jsxs("div",{className:"ca-wrap",children:[e.jsxs("div",{className:"ca-hero",children:[e.jsxs("div",{children:[e.jsx("div",{className:"ca-kicker",children:"Conversation Assistant"}),e.jsx("div",{className:"ca-title",children:"Persona & prompt"}),e.jsx("div",{className:"ca-desc",children:"Configure how the customer-facing live chat introduces itself, responds, and guides customers toward the next commercial step."}),e.jsxs("div",{className:"ca-hero-actions",children:[e.jsx("button",{className:"btn sm pri",style:{fontFamily:"inherit"},children:"Save changes"}),e.jsx("button",{className:"btn sm",style:{fontFamily:"inherit"},children:"Preview assistant"}),e.jsx("button",{className:"btn sm ghost",style:{fontFamily:"inherit"},children:"Reset"})]})]}),e.jsxs("div",{className:"ca-live-card",children:[e.jsxs("div",{className:"ca-live-top",children:[e.jsx("div",{className:"ca-bot-ic",children:"🤖"}),e.jsxs("div",{children:[e.jsx("div",{className:"ca-live-name",children:a||"Vak"}),e.jsx("div",{className:"ca-live-sub",children:"Hartwell Residences · Active on website"})]}),e.jsx("span",{className:"ca-status ok",style:{marginLeft:"auto"},children:"Live"})]}),e.jsx("div",{className:"ca-preview-msg",children:i})]})]}),e.jsxs("div",{className:"ca-grid",children:[e.jsxs("div",{className:"ca-panel",children:[e.jsxs("div",{className:"ca-panel-head",children:[e.jsx("div",{className:"ca-panel-icon",children:"✦"}),e.jsxs("div",{children:[e.jsx("div",{className:"ca-panel-title",children:"Assistant identity"}),e.jsx("div",{className:"ca-panel-sub",children:"Basic personality and response behavior shown to customers."})]})]}),e.jsxs("div",{className:"ca-form",children:[e.jsxs("div",{className:"ca-field",children:[e.jsx("div",{className:"ca-label",children:"Assistant name"}),e.jsx("input",{className:"ca-input",value:a,onChange:f=>r(f.target.value)})]}),e.jsxs("div",{className:"ca-field",children:[e.jsx("div",{className:"ca-label",children:"Language"}),e.jsxs("select",{className:"ca-select",children:[e.jsx("option",{children:"English"}),e.jsx("option",{children:"Hindi"}),e.jsx("option",{children:"English + Hindi"})]})]}),e.jsxs("div",{className:"ca-field full",children:[e.jsx("div",{className:"ca-label",children:"Greeting message"}),e.jsx("input",{className:"ca-input",value:i,onChange:f=>n(f.target.value)})]}),e.jsxs("div",{className:"ca-field",children:[e.jsx("div",{className:"ca-label",children:"Tone"}),e.jsx("div",{className:"ca-chip-row",children:s.map(f=>e.jsx("span",{className:"ca-chip",children:f},f))})]}),e.jsxs("div",{className:"ca-field",children:[e.jsx("div",{className:"ca-label",children:"Response length"}),e.jsxs("select",{className:"ca-select",children:[e.jsx("option",{children:"Concise — 2 to 4 sentences"}),e.jsx("option",{children:"Short — 1 to 2 sentences"}),e.jsx("option",{children:"Detailed when needed"})]})]})]})]}),e.jsxs("div",{className:"ca-panel",children:[e.jsxs("div",{className:"ca-panel-head",children:[e.jsx("div",{className:"ca-panel-icon",children:"⚙"}),e.jsxs("div",{children:[e.jsx("div",{className:"ca-panel-title",children:"Conversation behavior"}),e.jsx("div",{className:"ca-panel-sub",children:"Guardrails for how the assistant leads the conversation."})]})]}),e.jsx("div",{className:"ca-rule-list",children:[{num:"1",name:"Ask one question at a time",sub:"Avoid long forms and keep the chat natural.",val:p,set:x},{num:"2",name:"Guide to a clear next step",sub:"Viewing, callback, application, or team handoff.",val:t,set:j},{num:"3",name:"Use only approved inventory",sub:"Never recommend hidden or unavailable items.",val:w,set:u}].map(f=>e.jsxs("div",{className:"ca-rule",children:[e.jsx("div",{className:"ca-rule-num",children:f.num}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{className:"ca-rule-name",children:f.name}),e.jsx("div",{className:"ca-rule-sub",children:f.sub})]}),e.jsx(Aa,{checked:f.val,onChange:f.set})]},f.num))})]})]}),e.jsxs("div",{className:"ca-panel",children:[e.jsxs("div",{className:"ca-panel-head",children:[e.jsx("div",{className:"ca-panel-icon",children:"⌘"}),e.jsxs("div",{children:[e.jsx("div",{className:"ca-panel-title",children:"System prompt"}),e.jsx("div",{className:"ca-panel-sub",children:"Instruction set that shapes every customer conversation."})]}),e.jsxs("div",{className:"ca-panel-actions",children:[e.jsx("button",{className:"btn xs",style:{fontFamily:"inherit"},children:"Version history"}),e.jsx("button",{className:"btn xs pri",style:{fontFamily:"inherit"},children:"Edit prompt"})]})]}),e.jsx("div",{className:"ca-form",style:{gridTemplateColumns:"1fr"},children:e.jsx("div",{className:"ca-field full",children:e.jsx("textarea",{className:"ca-textarea",value:h,onChange:f=>b(f.target.value),style:{minHeight:180}})})})]})]})]})}const Ra=`
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
`,Fa=[{ic:"🌐",name:"Website live chat",sub:"Embed script installed · chat.hartwellresidences.com",code:'<script src="https://cdn.zotra.io/widget.js" data-key="hw_live_001"><\/script>',status:"active",active:!0},{ic:"📱",name:"Mobile app",sub:"iOS + Android SDK with native view embed and push notification support.",status:"not-installed"},{ic:"💬",name:"WhatsApp",sub:"Requires Meta Business API credentials. Async conversations with full context continuity.",status:"phase2",muted:!0},{ic:"📲",name:"SMS",sub:"Requires Twilio credentials. Numbered option lists replace quick replies in SMS context.",status:"phase2",muted:!0}],Ea={active:{label:"Active",cls:"ok"},"not-installed":{label:"Not installed",cls:"muted"},phase2:{label:"Phase 2",cls:"phase"}};function _a(){return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:Ra}),e.jsxs("div",{className:"ca-wrap",children:[e.jsxs("div",{className:"ca-hero",children:[e.jsxs("div",{children:[e.jsx("div",{className:"ca-kicker",children:"Install points"}),e.jsx("div",{className:"ca-title",children:"Channels"}),e.jsx("div",{className:"ca-desc",children:"Choose where customers can start conversations. Each channel keeps the same assistant memory, inventory awareness, and handoff rules."}),e.jsxs("div",{className:"ca-hero-actions",children:[e.jsx("button",{className:"btn sm pri",style:{fontFamily:"inherit"},children:"Add channel"}),e.jsx("button",{className:"btn sm",style:{fontFamily:"inherit"},children:"Copy install guide"})]})]}),e.jsxs("div",{className:"ca-live-card",children:[e.jsxs("div",{className:"ca-live-top",children:[e.jsx("div",{className:"ca-bot-ic",children:"🌐"}),e.jsxs("div",{children:[e.jsx("div",{className:"ca-live-name",children:"Website live chat"}),e.jsx("div",{className:"ca-live-sub",children:"Primary channel"})]}),e.jsx("span",{className:"ca-status ok",style:{marginLeft:"auto"},children:"Active"})]}),e.jsx("div",{className:"ca-preview-msg",children:"The website widget is installed and receiving conversations from prospective residents."})]})]}),e.jsxs("div",{className:"ca-panel",children:[e.jsxs("div",{className:"ca-panel-head",children:[e.jsx("div",{className:"ca-panel-icon",children:"📡"}),e.jsxs("div",{children:[e.jsx("div",{className:"ca-panel-title",children:"Connected channels"}),e.jsx("div",{className:"ca-panel-sub",children:"Customers reach you through these channels; your team reviews routed conversations inside Zotra."})]})]}),e.jsx("div",{className:"ca-channel-list",children:Fa.map((a,r)=>{const i=Ea[a.status];return e.jsxs("div",{className:`ca-channel${a.active?" active":""}${a.muted?" muted":""}`,children:[e.jsx("div",{className:"ca-ch-ic",children:a.ic}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{className:"ca-ch-name",children:a.name}),e.jsx("div",{className:"ca-ch-sub",children:a.sub}),a.code&&e.jsx("div",{className:"ca-ch-code",children:a.code})]}),e.jsxs("div",{className:"ca-ch-right",children:[e.jsx("span",{className:`ca-status ${i.cls}`,children:i.label}),a.status==="active"&&e.jsx("button",{className:"btn xs",style:{fontFamily:"inherit"},children:"Configure"}),a.status==="not-installed"&&e.jsx("button",{className:"btn xs pri",style:{fontFamily:"inherit"},children:"Install"})]})]},r)})})]})]})]})}const Da=`
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
`,Ba=[{name:"Active vertical",sub:"Property — units, rent, amenities, availability",status:"Active",statusCls:"ok",demand:88},{name:"Featured items",sub:"Unit 4B pinned first in all recommendations",status:"Featured",statusCls:"phase",demand:72},{name:"Hidden items",sub:"No items are currently hidden",status:"None",statusCls:"muted",demand:0},{name:"Demand signal logging",sub:"Unmatched customer queries are logged for review",status:"On",statusCls:"ok",demand:63}];function La(){return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:Da}),e.jsxs("div",{className:"ca-wrap",children:[e.jsxs("div",{className:"ca-hero",children:[e.jsxs("div",{children:[e.jsx("div",{className:"ca-kicker",children:"Inventory-aware answers"}),e.jsx("div",{className:"ca-title",children:"Inventory config"}),e.jsx("div",{className:"ca-desc",children:"Control which inventory the assistant can recommend and how unmatched demand is captured for your team."}),e.jsxs("div",{className:"ca-hero-actions",children:[e.jsx("button",{className:"btn sm pri",style:{fontFamily:"inherit"},children:"Manage inventory"}),e.jsx("button",{className:"btn sm",style:{fontFamily:"inherit"},children:"Import CSV"}),e.jsx("button",{className:"btn sm",style:{fontFamily:"inherit"},children:"Sync external system"})]})]}),e.jsxs("div",{className:"ca-live-card",children:[e.jsxs("div",{className:"ca-live-top",children:[e.jsx("div",{className:"ca-bot-ic",children:"📦"}),e.jsxs("div",{children:[e.jsx("div",{className:"ca-live-name",children:"Property inventory"}),e.jsx("div",{className:"ca-live-sub",children:"Units · rent · amenities · availability"})]}),e.jsx("span",{className:"ca-status ok",style:{marginLeft:"auto"},children:"Synced"})]}),e.jsx("div",{className:"ca-preview-msg",children:"Featured units appear first. Hidden units are never shown in customer recommendations."})]})]}),e.jsxs("div",{className:"ca-panel",children:[e.jsxs("div",{className:"ca-panel-head",children:[e.jsx("div",{className:"ca-panel-icon",children:"📦"}),e.jsxs("div",{children:[e.jsx("div",{className:"ca-panel-title",children:"Recommendation controls"}),e.jsx("div",{className:"ca-panel-sub",children:"Simple rules for surfacing, hiding, and logging inventory-related demand."})]})]}),e.jsxs("div",{className:"ca-inv-head",children:[e.jsx("div",{children:"Setting"}),e.jsx("div",{children:"Status"}),e.jsx("div",{children:"Demand"}),e.jsx("div",{})]}),e.jsx("div",{className:"ca-inv-list",children:Ba.map((a,r)=>e.jsxs("div",{className:"ca-inv-row",children:[e.jsxs("div",{children:[e.jsx("div",{className:"ca-inv-name",children:a.name}),e.jsx("div",{className:"ca-inv-sub",children:a.sub})]}),e.jsx("div",{children:e.jsx("span",{className:`ca-status ${a.statusCls}`,children:a.status})}),e.jsx("div",{children:e.jsx("div",{className:"ca-meter",children:e.jsx("div",{className:"ca-meter-fill",style:{width:`${a.demand}%`}})})}),e.jsx("div",{children:e.jsx("button",{className:"btn xs",style:{fontFamily:"inherit"},children:r===0?"Change":r===3?"View":"Edit"})})]},r))})]}),e.jsxs("div",{className:"ca-panel",children:[e.jsxs("div",{className:"ca-panel-head",children:[e.jsx("div",{className:"ca-panel-icon",children:"💬"}),e.jsxs("div",{children:[e.jsx("div",{className:"ca-panel-title",children:"No-match response"}),e.jsx("div",{className:"ca-panel-sub",children:"Used when no available inventory fits the customer request."})]}),e.jsx("div",{className:"ca-panel-actions",children:e.jsx("button",{className:"btn xs",style:{fontFamily:"inherit"},children:"Edit"})})]}),e.jsx("div",{className:"ca-message-box",children:`"We don't have an exact match right now — I can notify you when one becomes available."`})]})]})]})}const Ia=`
.ca-esc-message-box{margin:0 16px 16px;padding:12px 13px;background:var(--bg3);border:0.5px solid var(--brd);border-radius:12px;font-size:12.5px;color:var(--ink3);line-height:1.6;font-style:italic}
.ca-esc-divider{border:none;border-top:0.5px solid var(--brd);margin:0}
`,Ma=[{num:"01",name:"Frustration signal",sub:"Escalate after 2 consecutive expressions of frustration."},{num:"02",name:"No progress",sub:"Escalate after 3 turns with no advancement."},{num:"03",name:"Legal / contractual",sub:"Always escalate — never handle autonomously."},{num:"04",name:"VIP accounts",sub:"Escalate immediately for accounts flagged as VIP."}],Pa=[{num:"A",name:"Escalation routing",sub:"Account lead first · Manager if unavailable · 15-min timeout."},{num:"B",name:"Quiet hours",sub:"10:00 PM – 8:00 AM · Queue for next morning."}];function Wa(){return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:Ia}),e.jsxs("div",{className:"ca-wrap",children:[e.jsxs("div",{className:"ca-hero",children:[e.jsxs("div",{children:[e.jsx("div",{className:"ca-kicker",children:"Human handoff"}),e.jsx("div",{className:"ca-title",children:"Escalation rules"}),e.jsx("div",{className:"ca-desc",children:"Define when the assistant should stop autonomous handling and transfer the conversation with context to your team."}),e.jsxs("div",{className:"ca-hero-actions",children:[e.jsx("button",{className:"btn sm pri",style:{fontFamily:"inherit"},children:"Save rules"}),e.jsx("button",{className:"btn sm",style:{fontFamily:"inherit"},children:"Test handoff"})]})]}),e.jsxs("div",{className:"ca-live-card",children:[e.jsxs("div",{className:"ca-live-top",children:[e.jsx("div",{className:"ca-bot-ic",children:"🔀"}),e.jsxs("div",{children:[e.jsx("div",{className:"ca-live-name",children:"Context-first handoff"}),e.jsx("div",{className:"ca-live-sub",children:"Summary · signals · next action"})]}),e.jsx("span",{className:"ca-status ok",style:{marginLeft:"auto"},children:"Enabled"})]}),e.jsx("div",{className:"ca-preview-msg",children:"When escalated, the team receives the full conversation summary and recommended next step."})]})]}),e.jsxs("div",{className:"ca-grid",children:[e.jsxs("div",{className:"ca-panel",children:[e.jsxs("div",{className:"ca-panel-head",children:[e.jsx("div",{className:"ca-panel-icon",children:"⚠"}),e.jsxs("div",{children:[e.jsx("div",{className:"ca-panel-title",children:"Escalation triggers"}),e.jsx("div",{className:"ca-panel-sub",children:"Situations where the assistant should involve a human."})]})]}),e.jsx("div",{className:"ca-rule-list",children:Ma.map(a=>e.jsxs("div",{className:"ca-rule",children:[e.jsx("div",{className:"ca-rule-num",children:a.num}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{className:"ca-rule-name",children:a.name}),e.jsx("div",{className:"ca-rule-sub",children:a.sub})]}),e.jsx("button",{className:"btn xs",style:{fontFamily:"inherit"},children:"Edit"})]},a.num))})]}),e.jsxs("div",{className:"ca-panel",children:[e.jsxs("div",{className:"ca-panel-head",children:[e.jsx("div",{className:"ca-panel-icon",children:"👥"}),e.jsxs("div",{children:[e.jsx("div",{className:"ca-panel-title",children:"Routing & coverage"}),e.jsx("div",{className:"ca-panel-sub",children:"Who receives the handoff and when."})]})]}),e.jsx("div",{className:"ca-rule-list",children:Pa.map(a=>e.jsxs("div",{className:"ca-rule",children:[e.jsx("div",{className:"ca-rule-num",children:a.num}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{className:"ca-rule-name",children:a.name}),e.jsx("div",{className:"ca-rule-sub",children:a.sub})]}),e.jsx("button",{className:"btn xs",style:{fontFamily:"inherit"},children:"Edit"})]},a.num))}),e.jsx("hr",{className:"ca-esc-divider"}),e.jsxs("div",{className:"ca-panel-head",style:{borderBottom:"0.5px solid var(--brd)"},children:[e.jsx("div",{className:"ca-panel-icon",children:"✉"}),e.jsxs("div",{children:[e.jsx("div",{className:"ca-panel-title",children:"Customer handoff message"}),e.jsx("div",{className:"ca-panel-sub",children:"Shown before transferring to the team."})]}),e.jsx("div",{className:"ca-panel-actions",children:e.jsx("button",{className:"btn xs",style:{fontFamily:"inherit"},children:"Edit"})})]}),e.jsx("div",{className:"ca-esc-message-box",children:`"I'm connecting you with a member of our team who can help further. They'll be with you shortly — typically within a few minutes during business hours."`})]})]})]})]})}const $a=`
.rs-table{width:100%;border-collapse:collapse}
.rs-table th{text-align:left;padding:9px 16px;font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--ink5);border-bottom:0.5px solid var(--brd);background:var(--bg3)}
.rs-table td{padding:12px 16px;border-bottom:0.5px solid var(--brd);font-size:12.5px;color:var(--ink2);vertical-align:middle}
.rs-table tr:last-child td{border-bottom:none}
.rs-table tr:hover td{background:var(--pu)}
.rs-stage-num{font-family:"DM Mono",monospace;font-size:11px;color:var(--ink5);font-weight:600}
.rs-badge{font-size:10.5px;padding:2px 10px;border-radius:20px;font-weight:600;white-space:nowrap}
.rs-swatch{width:20px;height:20px;border-radius:5px;border:0.5px solid var(--brd)}
.rs-rule{font-size:11.5px;color:var(--ink4)}
.rs-section-desc{padding:0 18px 14px;font-size:12.5px;color:var(--ink4);line-height:1.55}
`,Oa=[{num:1,key:"prospect",label:"Prospect",color:"#B4B2A9",badgeBg:"var(--bg3)",badgeColor:"#B4B2A9",rule:"Manual only"},{num:2,key:"trust",label:"Trust",color:"#4B48C8",badgeBg:"var(--pp)",badgeColor:"#4B48C8",rule:"Signal-triggered"},{num:3,key:"service",label:"Service",color:"#1DC4A0",badgeBg:"var(--tp)",badgeColor:"#1DC4A0",rule:"Signal-triggered"},{num:4,key:"success",label:"Success",color:"#1F8A5B",badgeBg:"#E6FAF1",badgeColor:"#1F8A5B",rule:"Manual + signal"},{num:5,key:"expansion",label:"Expansion",color:"#D97757",badgeBg:"var(--amberp)",badgeColor:"#D97757",rule:"Signal-triggered"},{num:6,key:"advocacy",label:"Advocacy",color:"#7A4EDB",badgeBg:"#F3EEFF",badgeColor:"#7A4EDB",rule:"Manual only"}];function Ga(){const[a,r]=d.useState(Oa);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:$a}),e.jsxs("div",{className:"sv-card",children:[e.jsxs("div",{className:"sv-card-hdr",children:[e.jsx("div",{className:"sv-card-icon",children:"🔗"}),e.jsx("div",{children:e.jsx("div",{className:"sv-card-title",children:"Relationship stages"})})]}),e.jsx("div",{className:"rs-section-desc",children:"The six stages shown on every account page. Rename to match your terminology and set transition rules. Stages cannot be reordered or deleted — only renamed and recoloured."}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{className:"rs-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Stage"}),e.jsx("th",{children:"Your label"}),e.jsx("th",{children:"Colour"}),e.jsx("th",{children:"Transition rule"}),e.jsx("th",{})]})}),e.jsx("tbody",{children:a.map(i=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("span",{className:"rs-stage-num",children:i.num})}),e.jsx("td",{children:e.jsx("span",{className:"rs-badge",style:{background:i.badgeBg,color:i.badgeColor},children:i.label})}),e.jsx("td",{children:e.jsx("div",{className:"rs-swatch",style:{background:i.color}})}),e.jsx("td",{children:e.jsx("span",{className:"rs-rule",children:i.rule})}),e.jsx("td",{children:e.jsx("button",{className:"btn xs",style:{fontFamily:"inherit"},children:"Edit"})})]},i.key))})]})})]})]})}const Ha=`
/* ── Force grid row ── */
.fc-row{
  display:grid;
  grid-template-columns:100px 1fr 80px 72px 110px;
  gap:10px;align-items:center;
  padding:12px 18px;
  border-bottom:0.5px solid var(--brd);
  transition:background .12s;
}
.fc-row:last-of-type{border-bottom:none}
.fc-row:hover{background:color-mix(in srgb,var(--p) 2%,transparent)}
.fc-row-hd{
  background:var(--bg3);border-bottom:0.5px solid var(--brd);
  padding:7px 18px;
}
.fc-row-hd:hover{background:var(--bg3)}

/* ── Force name pill ── */
.force-pill{
  font-size:11px;font-weight:700;
  padding:4px 10px;border-radius:20px;
  white-space:nowrap;display:inline-flex;
  align-items:center;gap:5px;
  letter-spacing:0.01em;
}
.force-pill-dot{
  width:5px;height:5px;border-radius:50%;
  background:currentColor;opacity:0.6;flex-shrink:0;
}

/* ── Custom slider ── */
.sv-slider{
  width:100%;height:4px;border-radius:99px;
  outline:none;-webkit-appearance:none;cursor:pointer;
  background:var(--brd2);
  transition:background .15s;
}
.sv-slider::-webkit-slider-thumb{
  -webkit-appearance:none;
  width:16px;height:16px;border-radius:50%;
  background:var(--bg2);
  border:2px solid var(--p);
  box-shadow:0 1px 6px color-mix(in srgb,var(--p) 30%,transparent);
  cursor:pointer;
  transition:transform .12s,box-shadow .12s;
}
.sv-slider::-webkit-slider-thumb:hover{
  transform:scale(1.15);
  box-shadow:0 2px 10px color-mix(in srgb,var(--p) 40%,transparent);
}
.sv-slider::-moz-range-thumb{
  width:16px;height:16px;border-radius:50%;
  background:var(--bg2);border:2px solid var(--p);
  cursor:pointer;
}

/* ── Weight number input ── */
.fc-weight-cell{display:flex;align-items:center;gap:4px}
.fc-num-input{
  width:46px;height:28px;
  border:0.5px solid var(--brd2);border-radius:7px;
  background:var(--bg3);color:var(--ink);
  font-family:"DM Mono",monospace;
  font-size:12px;font-weight:600;
  text-align:center;outline:none;
  transition:border-color .12s,background .12s,box-shadow .12s;
  -moz-appearance:textfield;
}
.fc-num-input::-webkit-outer-spin-button,
.fc-num-input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
.fc-num-input:focus{
  border-color:var(--p);background:var(--bg2);
  box-shadow:0 0 0 2.5px color-mix(in srgb,var(--p) 12%,transparent);
}
.fc-num-input.err{
  border-color:var(--ri);
  box-shadow:0 0 0 2px color-mix(in srgb,var(--ri) 12%,transparent);
}
.fc-pct-label{font-family:"DM Mono",monospace;font-size:10px;color:var(--ink5)}

/* ── Total bar ── */
.fc-total-bar{
  display:flex;align-items:center;gap:10px;
  padding:12px 18px;
  border-top:0.5px solid var(--brd);
  background:var(--bg2);flex-wrap:wrap;
}
.fc-total-summary{display:flex;align-items:center;gap:10px;margin-right:auto;flex-wrap:wrap}
.fc-total-label{font-size:12px;color:var(--ink4)}
.fc-total-val{
  font-family:"DM Mono",monospace;
  font-size:14px;font-weight:700;
  transition:color .2s;letter-spacing:-0.02em;
}
.fc-total-val.ok{color:var(--ok)}
.fc-total-val.err{color:var(--ri)}
.fc-total-val.warn{color:var(--wa)}

/* ── Progress bar ── */
.fc-prog-wrap{
  height:4px;border-radius:99px;
  background:var(--brd2);width:120px;overflow:hidden;flex-shrink:0;
}
.fc-prog-fill{
  height:100%;border-radius:99px;
  transition:width .25s cubic-bezier(.4,0,.2,1),background .2s;
}

/* ── Warning banner ── */
.fc-warn-banner{
  display:flex;align-items:flex-start;gap:10px;
  margin:0 18px 0;
  padding:10px 14px;
  border-radius:10px;
  animation:fc-banner-in .2s ease;
  border:0.5px solid transparent;
}
@keyframes fc-banner-in{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
.fc-warn-icon{
  width:28px;height:28px;border-radius:8px;
  display:flex;align-items:center;justify-content:center;
  font-size:13px;flex-shrink:0;
}
.fc-warn-body{flex:1;min-width:0}
.fc-warn-title{font-size:12.5px;font-weight:600;margin-bottom:2px}
.fc-warn-sub{font-size:11.5px;color:var(--ink3);line-height:1.5}
.fc-warn-val{font-family:"DM Mono",monospace;font-weight:700}
.fc-warn-banner.over{
  background:color-mix(in srgb,var(--ri) 8%,transparent);
  border-color:color-mix(in srgb,var(--ri) 22%,transparent);
}
.fc-warn-banner.over .fc-warn-icon{background:color-mix(in srgb,var(--ri) 14%,transparent);color:var(--ri)}
.fc-warn-banner.over .fc-warn-title{color:var(--ri)}
.fc-warn-banner.over .fc-warn-val{color:var(--ri)}
.fc-warn-banner.under{
  background:color-mix(in srgb,var(--wa) 8%,transparent);
  border-color:color-mix(in srgb,var(--wa) 22%,transparent);
}
.fc-warn-banner.under .fc-warn-icon{background:color-mix(in srgb,var(--wa) 14%,transparent);color:var(--wa)}
.fc-warn-banner.under .fc-warn-title{color:var(--wa)}
.fc-warn-banner.under .fc-warn-val{color:var(--wa)}
`,Ua={artha:{bg:"#FAEEDA",color:"#854F0B"},laya:{bg:"#DBEAFE",color:"#1D4ED8"},kriya:{bg:"#DCFCE7",color:"#166534"},gati:{bg:"#EEEEF9",color:"#4B48C8"},rasa:{bg:"#FEE2E2",color:"#991B1B"}},Va={bg:"var(--bg3)",color:"var(--ink)"};function je(a){const r=Ua[a.forceKey]??Va;return{partitionKey:a.partitionKey,rowKey:a.rowKey,key:a.forceKey,name:a.displayName,bg:r.bg,color:r.color,weight:a.weight,directionMultiplier:a.directionMultiplier,trend:a.trend,sortOrder:a.sortOrder}}function Ka(a){return{forceKey:a.key,weight:a.weight,directionMultiplier:a.directionMultiplier,trend:a.trend,sortOrder:a.sortOrder}}const qa=["improving","stable","declining"],ce={improving:{icon:"↑",color:"var(--ok)"},stable:{icon:"→",color:"var(--ink4)"},declining:{icon:"↓",color:"var(--ri)"}};function Ya({msg:a,type:r}){return e.jsxs("div",{className:`toast toast-${r}`,children:[r==="ok"?"✓":"✕"," ",a]})}function ke({icon:a,iconBg:r="var(--pp)",iconColor:i="var(--p)",title:n,api:s,sub:l}){return e.jsxs("div",{className:"sv-card-hdr",children:[e.jsx("div",{className:"sv-card-icon",style:{background:r,color:i},children:a}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{className:"sv-card-title",children:n}),s&&e.jsx("span",{className:"sv-card-api",children:s})]}),l&&e.jsx("div",{style:{marginLeft:"auto",flexShrink:0},children:l})]})}function Qa({value:a,isOver:r,onChange:i}){const[n,s]=d.useState(String(a)),l=d.useRef(null);d.useEffect(()=>{s(String(a))},[a]);function p(x){const t=parseInt(x,10);!isNaN(t)&&t>=0&&t<=100?(i(t),s(String(t))):s(String(a))}return e.jsxs("div",{className:"fc-weight-cell",children:[e.jsx("input",{ref:l,type:"number",min:0,max:100,className:`fc-num-input${r?" err":""}`,value:n,onChange:x=>{s(x.target.value);const t=parseInt(x.target.value,10);!isNaN(t)&&t>=0&&t<=100&&i(t)},onBlur:x=>p(x.target.value),onKeyDown:x=>{var t,j;x.key==="Enter"&&(p(x.target.value),(t=l.current)==null||t.blur()),x.key==="Escape"&&(s(String(a)),(j=l.current)==null||j.blur())}}),e.jsx("span",{className:"fc-pct-label",children:"%"})]})}function Ja({value:a,onChange:r}){const[i,n]=d.useState(String(a)),s=d.useRef(null);d.useEffect(()=>{n(String(a))},[a]);function l(p){const x=parseFloat(p);!isNaN(x)&&x>=0?(r(x),n(String(x))):n(String(a))}return e.jsx("input",{ref:s,type:"number",min:0,step:.1,className:"sv-input",style:{minWidth:62,width:62,textAlign:"center",fontFamily:'"DM Mono",monospace',fontSize:11.5},value:i,onChange:p=>{n(p.target.value);const x=parseFloat(p.target.value);!isNaN(x)&&x>=0&&r(x)},onBlur:p=>l(p.target.value),onKeyDown:p=>{var x,t;p.key==="Enter"&&(l(p.target.value),(x=s.current)==null||x.blur()),p.key==="Escape"&&(n(String(a)),(t=s.current)==null||t.blur())}})}function Xa({value:a,color:r,onChange:i}){const n=a/100*100;return e.jsx("input",{type:"range",className:"sv-slider",min:0,max:100,value:a,style:{background:`linear-gradient(to right,${r} 0%,${r} ${n}%,var(--brd2) ${n}%,var(--brd2) 100%)`},onChange:s=>i(+s.target.value)})}function Za({variant:a,total:r}){const i=a==="over",n=i?r-100:100-r;return e.jsxs("div",{className:`fc-warn-banner ${a}`,children:[e.jsx("div",{className:"fc-warn-icon",children:i?"⚠":"◑"}),e.jsxs("div",{className:"fc-warn-body",children:[e.jsx("div",{className:"fc-warn-title",children:i?"Weights exceed 100%":"Weights below 100%"}),e.jsxs("div",{className:"fc-warn-sub",children:["Total is ",e.jsxs("span",{className:"fc-warn-val",children:[r,"%"]}),i?e.jsxs(e.Fragment,{children:[" ","— reduce by ",e.jsxs("span",{className:"fc-warn-val",children:["+",n,"%"]})," to save."]}):e.jsxs(e.Fragment,{children:[" ","— add ",e.jsxs("span",{className:"fc-warn-val",children:[n,"%"]})," more to reach exactly 100%."]})]})]})]})}function er(){const[a,r]=d.useState([]),[i,n]=d.useState([]),[s,l]=d.useState(!0),[p,x]=d.useState(!1),[t,j]=d.useState(null),[w,u]=d.useState(null);function h(v,g="ok"){u({msg:v,type:g}),setTimeout(()=>u(null),3e3)}function b(){const v=localStorage.getItem("zotra_token");return{"Content-Type":"application/json",...v?{Authorization:`Bearer ${v}`}:{}}}d.useEffect(()=>{l(!0),M(`${L()}/force`,{headers:b()}).then(v=>{if(!v.ok)throw new Error(`${v.status}`);return v.json()}).then(v=>{const g=[...v].sort((F,A)=>F.sortOrder-A.sortOrder).map(je);r(g),n(g.map(F=>({...F}))),j(null)}).catch(v=>j(v.message)).finally(()=>l(!1))},[]);const f=d.useCallback((v,g,F)=>{r(A=>A.map((c,y)=>y===v?{...c,[g]:F}:c))},[]),z=a.reduce((v,g)=>v+g.weight,0),S=z>100,N=z<100,o=z===100,m=Math.min(z/100*100,100),C=S?"var(--ri)":o?"var(--ok)":"var(--wa)";async function _(){if(o){x(!0);try{const v=a.map(Ka),g=await M(`${L()}/force`,{method:"PATCH",headers:b(),body:JSON.stringify(v)});if(!g.ok)throw new Error(`${g.status}`);n(a.map(F=>({...F}))),h("Force weights saved")}catch(v){h(`Save failed: ${v.message}`,"err")}finally{x(!1)}}}return s?e.jsxs("div",{className:"sv-card",children:[e.jsx(ke,{icon:"◐",title:"Panchashakti Force Weights",api:"GET /force · PATCH /force"}),e.jsx("div",{className:"sv-card-desc",children:"Loading force configuration…"}),[...Array(5)].map((v,g)=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"100px 1fr 80px 72px 110px",gap:10,alignItems:"center",padding:"13px 18px",borderBottom:"0.5px solid var(--brd)"},children:[e.jsx("div",{className:"skel",style:{height:26,borderRadius:20}}),e.jsx("div",{className:"skel",style:{height:4,borderRadius:4}}),e.jsx("div",{className:"skel",style:{height:28,borderRadius:7}}),e.jsx("div",{className:"skel",style:{height:28,borderRadius:7}}),e.jsx("div",{className:"skel",style:{height:28,borderRadius:7}})]},g))]}):e.jsxs(e.Fragment,{children:[w&&e.jsx(Ya,{msg:w.msg,type:w.type}),t&&e.jsxs("div",{style:{padding:"8px 14px",fontSize:11.5,color:"var(--wa)",background:"var(--wab)",borderRadius:8,marginBottom:10,display:"flex",gap:8,alignItems:"flex-start"},children:[e.jsx("span",{style:{flexShrink:0},children:"⚠"}),e.jsxs("span",{children:["Could not load force config (",t,"). Check your connection or try refreshing."]}),e.jsx("button",{className:"btn sm",style:{marginLeft:"auto",flexShrink:0},onClick:()=>{j(null),l(!0),M(`${L()}/force`,{headers:b()}).then(v=>{if(!v.ok)throw new Error(`${v.status}`);return v.json()}).then(v=>{const g=[...v].sort((F,A)=>F.sortOrder-A.sortOrder).map(je);r(g),n(g.map(F=>({...F}))),j(null)}).catch(v=>j(v.message)).finally(()=>l(!1))},children:"Retry"})]}),e.jsxs("div",{className:"sv-card",children:[e.jsx(ke,{icon:"◐",title:"Panchashakti Force Weights",api:"GET /force · PATCH /force",sub:e.jsx("span",{style:{fontFamily:'"DM Mono",monospace',fontSize:10.5,fontWeight:700,padding:"3px 10px",borderRadius:20,background:o?"var(--okb)":S?"color-mix(in srgb,var(--ri) 12%,transparent)":"var(--wab)",color:o?"var(--okf)":S?"var(--ri)":"var(--waf)",transition:"all .2s",border:"0.5px solid",borderColor:o?"color-mix(in srgb,var(--ok) 25%,transparent)":S?"color-mix(in srgb,var(--ri) 22%,transparent)":"color-mix(in srgb,var(--wa) 22%,transparent)"},children:o?"✓ 100%":`${z} / 100%`})}),e.jsx("div",{className:"sv-card-desc",children:"Drag the slider or type a value to set each force's contribution to the OHI composite score. All five weights must total exactly 100%."}),e.jsx("div",{className:"fc-row fc-row-hd",children:["Force","Slider","Weight","Dir. mult.","Trend"].map(v=>e.jsx("div",{style:{fontSize:"9px",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"var(--ink5)"},children:v},v))}),a.map((v,g)=>{const F=ce[v.trend]??ce.stable;return e.jsxs("div",{className:"fc-row",children:[e.jsxs("span",{className:"force-pill",style:{background:v.bg,color:v.color},children:[e.jsx("span",{className:"force-pill-dot"}),v.name]}),e.jsx(Xa,{value:v.weight,color:v.color,onChange:A=>f(g,"weight",A)}),e.jsx(Qa,{value:v.weight,isOver:S,onChange:A=>f(g,"weight",A)}),e.jsx(Ja,{value:v.directionMultiplier,onChange:A=>f(g,"directionMultiplier",A)}),e.jsx("select",{className:"sv-select",style:{minWidth:106,fontSize:11,color:F.color,fontWeight:500},value:v.trend,onChange:A=>f(g,"trend",A.target.value),children:qa.map(A=>e.jsxs("option",{value:A,children:[ce[A].icon," ",A]},A))})]},v.rowKey)}),(S||N)&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{height:12}}),e.jsx(Za,{variant:S?"over":"under",total:z}),e.jsx("div",{style:{height:4}})]}),e.jsxs("div",{className:"fc-total-bar",children:[e.jsxs("div",{className:"fc-total-summary",children:[e.jsx("span",{className:"fc-total-label",children:"Total"}),e.jsx("div",{className:"fc-prog-wrap",children:e.jsx("div",{className:"fc-prog-fill",style:{width:`${m}%`,background:C}})}),e.jsxs("span",{className:`fc-total-val ${o?"ok":S?"err":"warn"}`,children:[z,"%"]}),o&&e.jsx("span",{style:{fontSize:10.5,color:"var(--okf)",background:"var(--okb)",padding:"2px 8px",borderRadius:20,fontWeight:600},children:"✓ Ready to save"})]}),e.jsx("button",{className:"btn",disabled:p,onClick:()=>r(i.map(v=>({...v}))),children:"Reset"}),e.jsx("button",{className:"btn pri",onClick:_,disabled:p||!o,title:S?`Reduce by ${z-100}% to save`:N?`Add ${100-z}% more to save`:void 0,children:p?"Saving…":"Save weights"})]})]})]})}const ar=`

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
`;function _e(a){return a>=10?{bg:"#5552C9",color:"#fff",label:"Confirmed"}:a>=8?{bg:"#DCFCE7",color:"#166534",label:"Strong"}:a>=6?{bg:"#DBEAFE",color:"#1E40AF",label:"Partial"}:a>=3?{bg:"#FEF9C3",color:"#854D0E",label:"Weak"}:{bg:"#F1F5F9",color:"#475569",label:"Absent"}}function rr(a){return{rowKey:a.rowKey,sortOrder:a.sortOrder,score:a.score,band:a.band,description:a.description,evaluationGuidance:a.evaluationGuidance,badge:_e(a.score)}}function nr(a){return{rowKey:a.rowKey,dimensionKey:a.dimensionKey,sortOrder:a.sortOrder,displayName:a.displayName,description:a.description,weight:a.weight,flagBelowScore:a.flagBelowScore,enabled:a.enabled}}function ir(a){return{rowKey:a.rowKey,score:a.score,band:a.band,description:a.description,evaluationGuidance:a.evaluationGuidance,sortOrder:a.sortOrder}}function sr(a){return{dimensionKey:a.dimensionKey,displayName:a.displayName,description:a.description,weight:a.weight,flagBelowScore:a.flagBelowScore,enabled:a.enabled,sortOrder:a.sortOrder}}const De=["no_evidence","weak_implied","partial_unconfirmed","strong_evidence","explicit_confirmed"],tr={evidence_strength:8,coverage:7,consistency:6,freshness:9,confidence:7.2};function Be({msg:a,type:r}){return e.jsxs("div",{className:`rp-toast ${r}`,children:[e.jsx("div",{className:"rp-toast-icon",children:r==="ok"?"✓":"✕"}),a]})}function re({icon:a,iconBg:r="var(--pp)",iconColor:i="var(--p)",title:n,api:s,sub:l}){return e.jsxs("div",{className:"rp-card-hdr",children:[e.jsx("div",{className:"rp-card-icon",style:{background:r,color:i},children:a}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{className:"rp-card-title",children:n}),s&&e.jsx("span",{className:"rp-card-api",children:s})]}),l&&e.jsx("div",{style:{marginLeft:"auto",flexShrink:0},children:l})]})}function or({checked:a,onChange:r,disabled:i=!1}){return e.jsxs("label",{className:"rp-tg",children:[e.jsx("input",{type:"checkbox",checked:a,disabled:i,onChange:n=>r(n.target.checked)}),e.jsx("span",{className:"rp-tg-track"}),e.jsx("span",{className:"rp-tg-thumb"})]})}function xe({value:a,isErr:r=!1,min:i=0,max:n=100,step:s=1,style:l,onChange:p}){const[x,t]=d.useState(String(a)),j=d.useRef(null);d.useEffect(()=>{t(String(a))},[a]);function w(u){const h=s<1?parseFloat(u):parseInt(u,10);!isNaN(h)&&h>=i&&h<=n?(p(h),t(String(h))):t(String(a))}return e.jsx("input",{ref:j,type:"number",min:i,max:n,step:s,className:`rub-num-input${r?" err":""}`,style:l,value:x,onChange:u=>{t(u.target.value);const h=s<1?parseFloat(u.target.value):parseInt(u.target.value,10);!isNaN(h)&&h>=i&&h<=n&&p(h)},onBlur:u=>w(u.target.value),onKeyDown:u=>{var h,b;u.key==="Enter"&&(w(u.target.value),(h=j.current)==null||h.blur()),u.key==="Escape"&&(t(String(a)),(b=j.current)==null||b.blur())}})}function lr({variant:a,total:r}){const i=a==="over",n=i?r-100:100-r;return e.jsxs("div",{className:`rub-warn-banner ${a}`,children:[e.jsx("div",{className:"rub-warn-icon",children:i?"⚠":"◑"}),e.jsxs("div",{className:"rub-warn-body",children:[e.jsx("div",{className:"rub-warn-title",children:i?"Weights exceed 100%":"Weights below 100%"}),e.jsxs("div",{className:"rub-warn-sub",children:["Total is ",e.jsxs("span",{className:"rub-warn-val",children:[r,"%"]}),i?e.jsxs(e.Fragment,{children:[" ","— reduce by ",e.jsxs("span",{className:"rub-warn-val",children:["+",n,"%"]})," to save."]}):e.jsxs(e.Fragment,{children:[" ","— add ",e.jsxs("span",{className:"rub-warn-val",children:[n,"%"]})," more to reach exactly 100%."]})]})]})]})}function cr({msg:a,onRetry:r}){return e.jsxs("div",{className:"rp-err-banner",children:[e.jsx("span",{style:{flexShrink:0},children:"⚠"}),e.jsxs("span",{style:{flex:1},children:["Could not load rubric config (",a,")."]}),e.jsx("button",{className:"rp-btn",onClick:r,style:{fontSize:11.5},children:"Retry"})]})}function dr({dims:a,bands:r}){const[i,n]=d.useState(!1),l=a.filter(u=>u.enabled).map(u=>{const h=tr[u.dimensionKey]??7,b=u.weight/100,f=+(h*b).toFixed(2);return{dim:u,rawScore:h,weightFrac:b,contrib:f}}),p=+l.reduce((u,h)=>u+h.contrib,0).toFixed(2),t=[...r].sort((u,h)=>h.score-u.score).find(u=>p>=u.score)??r[0],j=r.find(u=>u.score>((t==null?void 0:t.score)??0)),w=t?j?`score ${t.score}.0–${j.score-1+.9}`:`score ${t.score}.0–10`:"";return e.jsxs("div",{className:"rp-explainer",children:[e.jsxs("div",{className:"rp-exp-trigger",onClick:()=>n(u=>!u),children:[e.jsxs("div",{className:"rp-exp-trigger-left",children:[e.jsx("div",{className:`rp-exp-trigger-icon ${i?"rp-exp-trigger-icon-open":"rp-exp-trigger-icon-closed"}`,children:e.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:i?"var(--wa)":"var(--ink4)",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"}),e.jsx("path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"})]})}),e.jsxs("div",{children:[e.jsx("div",{className:"rp-exp-trigger-text",style:{color:i?"var(--wa)":"var(--ink)"},children:"How rubric scoring works"}),e.jsx("div",{className:"rp-exp-trigger-sub",style:{color:i?"var(--wa)":"var(--ink5)"},children:"Weighted composite · score bands · rep guidance"})]})]}),e.jsxs("span",{className:"rp-exp-pill",style:{background:"var(--wab)",color:"var(--waf)",border:"0.5px solid color-mix(in srgb, var(--wa) 25%, transparent)"},children:[e.jsx("svg",{width:"8",height:"8",viewBox:"0 0 24 24",fill:"none",stroke:"var(--wa)",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"22 12 18 12 15 21 9 3 6 12 2 12"})}),"Scoring model"]}),e.jsx("div",{className:`rp-exp-chevron-wrap${i?" open":""}`,children:e.jsx("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"6 9 12 15 18 9"})})})]}),i&&e.jsxs("div",{className:"rp-exp-body",children:[e.jsxs("div",{className:"rp-exp-section",children:[e.jsxs("div",{className:"rp-exp-section-label",children:[e.jsx("span",{className:"rp-exp-section-label-text",children:"Scoring pipeline"}),e.jsx("span",{className:"rp-exp-section-label-line"})]}),e.jsx("div",{className:"rp-pipeline",children:[{n:"1",title:"Dimension scores",body:"Each active dimension evaluates inference evidence and produces a raw score from 0–10."},null,{n:"2",title:"Weighted average",body:"Each score is multiplied by its weight%. The sum of all contributions gives the composite."},null,{n:"3",title:"Band mapping",body:"The composite score maps to a score band that controls rep guidance and agent actions."}].map((u,h)=>u===null?e.jsx("div",{className:"rp-pipeline-arrow",children:e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"var(--wa)",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),e.jsx("polyline",{points:"12 5 19 12 12 19"})]})},h):e.jsxs("div",{className:"rp-pipeline-step",children:[e.jsx("div",{className:"rp-pipeline-step-num",children:u.n}),e.jsx("div",{className:"rp-pipeline-step-title",children:u.title}),e.jsx("div",{className:"rp-pipeline-step-body",children:u.body})]},u.n))})]}),e.jsxs("div",{className:"rp-exp-section",children:[e.jsxs("div",{className:"rp-exp-section-label",children:[e.jsx("span",{className:"rp-exp-section-label-text",children:"Formula"}),e.jsx("span",{className:"rp-exp-section-label-line"})]}),e.jsxs("div",{className:"rp-formula-block",children:[e.jsx("span",{className:"rp-formula-label-cell",children:"Σ"}),e.jsxs("span",{className:"rp-formula-expr",children:["composite_score = Σ ( dimension_score",e.jsx("sub",{style:{fontSize:9},children:"i"})," × weight",e.jsx("sub",{style:{fontSize:9},children:"i"})," )"]}),e.jsx("span",{className:"rp-formula-note",children:"→ maps to a score band"})]})]}),e.jsxs("div",{className:"rp-exp-section",style:{paddingBottom:20},children:[e.jsxs("div",{className:"rp-exp-section-label",children:[e.jsx("span",{className:"rp-exp-section-label-text",children:"Live example"}),e.jsx("span",{className:"rp-exp-section-label-line"})]}),e.jsxs("div",{className:"rp-ex-wrap",children:[e.jsxs("div",{className:"rp-ex-header",children:[e.jsx("span",{className:"rp-ex-header-dot"}),e.jsx("span",{className:"rp-ex-header-label",children:"budget_presence inference · active dimensions"})]}),e.jsxs("table",{className:"rp-ex-table",children:[e.jsx("thead",{children:e.jsx("tr",{children:["Dimension","Raw score","Weight","Contribution"].map(u=>e.jsx("th",{children:u},u))})}),e.jsxs("tbody",{children:[l.map(u=>e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("span",{style:{fontWeight:600,color:"var(--ink)"},children:u.dim.displayName}),e.jsx("span",{style:{fontFamily:"var(--rp-mono)",fontSize:9.5,color:"var(--ink5)",marginLeft:7,background:"var(--bg3)",border:"0.5px solid var(--brd2)",padding:"1px 5px",borderRadius:4},children:u.dim.dimensionKey})]}),e.jsxs("td",{children:[e.jsx("span",{style:{fontFamily:"var(--rp-mono)",fontSize:13,fontWeight:700,color:"var(--wa)"},children:u.rawScore}),e.jsx("span",{style:{fontSize:10,color:"var(--ink5)",marginLeft:3},children:"/10"})]}),e.jsx("td",{children:e.jsxs("span",{style:{fontFamily:"var(--rp-mono)",fontSize:12,color:"var(--ink3)"},children:[u.dim.weight,"%"]})}),e.jsx("td",{children:e.jsxs("span",{style:{fontFamily:"var(--rp-mono)",fontSize:11.5,color:"var(--ink3)"},children:[u.rawScore," × ",u.weightFrac.toFixed(2)," ",e.jsx("span",{style:{color:"var(--ink6)",margin:"0 3px"},children:"="}),e.jsx("strong",{style:{color:"var(--ink2)",fontWeight:700},children:u.contrib.toFixed(2)})]})})]},u.dim.dimensionKey)),e.jsxs("tr",{className:"rp-ex-total",children:[e.jsx("td",{style:{padding:"11px 14px"},children:e.jsx("span",{style:{fontSize:11.5,fontWeight:700,color:"var(--waf)",letterSpacing:"-.01em"},children:"Composite score"})}),e.jsxs("td",{style:{padding:"11px 14px"},colSpan:2,children:[e.jsx("span",{className:"rp-ex-score-big",children:p}),e.jsx("span",{className:"rp-ex-score-denom",children:"/ 10"})]}),e.jsxs("td",{style:{padding:"11px 14px"},children:[e.jsx("span",{className:"rp-ex-arrow",children:"→"}),t&&e.jsx("span",{className:"rp-ex-band-chip",style:{background:t.badge.bg,color:t.badge.color},children:De[r.indexOf(t)]??t.rowKey}),e.jsx("span",{style:{fontSize:10.5,color:"var(--ink4)",marginLeft:7},children:w})]})]})]})]})]})]})]})]})}function pr(){return e.jsx(e.Fragment,{children:[...Array(5)].map((a,r)=>e.jsx("div",{style:{display:"grid",gridTemplateColumns:"148px 70px 1fr 1fr",gap:12,padding:"13px 20px",borderBottom:"1px solid var(--brd)"},children:[1,1,1,1].map((i,n)=>e.jsx("div",{className:"rp-skel",style:{height:30,borderRadius:8}},n))},r))})}function xr(){return e.jsx(e.Fragment,{children:[...Array(5)].map((a,r)=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 96px 96px 42px",gap:12,padding:"14px 20px",borderBottom:"1px solid var(--brd)"},children:[e.jsxs("div",{children:[e.jsx("div",{className:"rp-skel",style:{height:13,width:140,marginBottom:7}}),e.jsx("div",{className:"rp-skel",style:{height:10,width:260}})]}),e.jsx("div",{className:"rp-skel",style:{height:30,borderRadius:8}}),e.jsx("div",{className:"rp-skel",style:{height:30,borderRadius:8}}),e.jsx("div",{className:"rp-skel",style:{height:19,width:34,borderRadius:10}})]},r))})}function hr(){const[a,r]=d.useState([]),[i,n]=d.useState([]),[s,l]=d.useState([]),[p,x]=d.useState([]),[t,j]=d.useState(!0),[w,u]=d.useState(null);function h(){const f=localStorage.getItem("zotra_token");return{"Content-Type":"application/json",...f?{Authorization:`Bearer ${f}`}:{}}}const b=d.useCallback(()=>{j(!0),u(null),M(`${L()}/inference-rubric`,{headers:h()}).then(f=>{if(!f.ok)throw new Error(`${f.status}`);return f.json()}).then(f=>{const z=[...f.scoreBands].sort((N,o)=>N.sortOrder-o.sortOrder).map(rr),S=[...f.dimensions].sort((N,o)=>N.sortOrder-o.sortOrder).map(nr);r(z),n(S),l(z.map(N=>({...N}))),x(S.map(N=>({...N})))}).catch(f=>u(f.message)).finally(()=>j(!1))},[]);return d.useEffect(()=>{b()},[b]),t?e.jsxs("div",{className:"rp-root",children:[e.jsxs("div",{className:"rp-card",children:[e.jsx(re,{icon:e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"22 12 18 12 15 21 9 3 6 12 2 12"})}),title:"Score Bands",api:"GET /inference-rubric · PATCH /inference-rubric/bands"}),e.jsx(pr,{})]}),e.jsxs("div",{className:"rp-card",children:[e.jsx(re,{icon:e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),e.jsx("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})]}),title:"Rubric Scoring Dimensions",api:"GET /inference-rubric · PATCH /inference-rubric/dimensions"}),e.jsx(xr,{})]})]}):e.jsxs("div",{className:"rp-root",children:[w&&e.jsx(cr,{msg:w,onRetry:b}),e.jsx(gr,{bands:a,setBands:r,origBands:s,setOrigBands:l,authHeaders:h}),e.jsx(ur,{dims:i,setDims:n,origDims:p,setOrigDims:x,bands:a,authHeaders:h})]})}function gr({bands:a,setBands:r,origBands:i,setOrigBands:n,authHeaders:s}){const[l,p]=d.useState(!1),[x,t]=d.useState(null);function j(h,b="ok"){t({msg:h,type:b}),setTimeout(()=>t(null),3e3)}function w(h,b,f){r(z=>z.map((S,N)=>{if(N!==h)return S;const o={...S,[b]:f};return b==="score"&&(o.badge=_e(f)),o}))}async function u(){p(!0);try{const h=await M(`${L()}/inference-rubric/bands`,{method:"PATCH",headers:s(),body:JSON.stringify(a.map(ir))});if(!h.ok)throw new Error(`${h.status}`);n(a.map(b=>({...b}))),j("Score bands saved")}catch(h){j(`Save failed: ${h.message}`,"err")}finally{p(!1)}}return e.jsxs(e.Fragment,{children:[x&&e.jsx(Be,{msg:x.msg,type:x.type}),e.jsxs("div",{className:"rp-card",children:[e.jsx(re,{icon:e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"22 12 18 12 15 21 9 3 6 12 2 12"})}),title:"Score Bands",api:"PATCH /inference-rubric/bands",sub:e.jsxs("span",{style:{fontFamily:"var(--rp-mono)",fontSize:10.5,fontWeight:700,padding:"3px 10px",borderRadius:20,background:"var(--bg3)",color:"var(--ink4)",border:"1px solid var(--brd2)",letterSpacing:".01em"},children:[a.length," bands"]})}),e.jsx("div",{className:"rp-card-desc",children:"Define score thresholds and the guidance text shown to reps at each band level."}),e.jsx("div",{className:"rb-row rb-row-hd",style:{display:"grid",gridTemplateColumns:"148px 70px 1fr 1fr",gap:12},children:["Band","Score ↕","Description","Evaluation Guidance"].map(h=>e.jsx("div",{className:"rp-col-hdr-cell",children:h},h))}),a.map((h,b)=>e.jsxs("div",{className:"rb-row",children:[e.jsx("div",{children:e.jsxs("span",{className:"rb-band-pill",style:{background:h.badge.bg,color:h.badge.color},children:[e.jsx("span",{className:"rb-band-dot",style:{background:h.badge.color}}),De[b]??h.rowKey]})}),e.jsx("div",{children:e.jsx(xe,{value:h.score,min:0,max:10,style:{width:52,minWidth:52},onChange:f=>w(b,"score",f)})}),e.jsx("input",{className:"sv-input rc-edit-input",style:{width:"100%",minWidth:0},value:h.description,onChange:f=>w(b,"description",f.target.value)}),e.jsx("input",{className:"sv-input rc-edit-input",style:{width:"100%",minWidth:0},value:h.evaluationGuidance,onChange:f=>w(b,"evaluationGuidance",f.target.value)})]},h.rowKey)),a.length===0&&e.jsx("div",{style:{padding:"36px 20px",textAlign:"center",color:"var(--ink5)",fontSize:12.5},children:"No score bands returned from API."}),e.jsxs("div",{className:"rp-save-bar",children:[e.jsx("button",{className:"rp-btn",disabled:l,onClick:()=>r(i.map(h=>({...h}))),children:"Reset"}),e.jsx("button",{className:"rp-btn pri",onClick:u,disabled:l,children:l?e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",children:e.jsx("path",{d:"M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"})}),"Saving…"]}):e.jsxs(e.Fragment,{children:[e.jsxs("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"}),e.jsx("polyline",{points:"17 21 17 13 7 13 7 21"}),e.jsx("polyline",{points:"7 3 7 8 15 8"})]}),"Save bands"]})})]})]})]})}function ur({dims:a,setDims:r,origDims:i,setOrigDims:n,bands:s,authHeaders:l}){const[p,x]=d.useState(!1),[t,j]=d.useState(null);function w(m,C="ok"){j({msg:m,type:C}),setTimeout(()=>j(null),3e3)}function u(m,C,_){r(v=>v.map((g,F)=>F===m?{...g,[C]:_}:g))}const h=a.reduce((m,C)=>m+C.weight,0),b=h>100,f=h<100,z=h===100,S=Math.min(h/100*100,100),N=b?"var(--ri)":z?"var(--ok)":"var(--wa)";async function o(){if(z){x(!0);try{const m=await M(`${L()}/inference-rubric/dimensions`,{method:"PATCH",headers:l(),body:JSON.stringify(a.map(sr))});if(!m.ok)throw new Error(`${m.status}`);n(a.map(C=>({...C}))),w("Rubric dimensions saved")}catch(m){w(`Save failed: ${m.message}`,"err")}finally{x(!1)}}}return e.jsxs(e.Fragment,{children:[t&&e.jsx(Be,{msg:t.msg,type:t.type}),e.jsxs("div",{className:"rp-card",children:[e.jsx(re,{icon:e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),e.jsx("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})]}),title:"Rubric Scoring Dimensions",api:"PATCH /inference-rubric/dimensions",sub:e.jsx("span",{style:{fontFamily:"var(--rp-mono)",fontSize:10.5,fontWeight:700,padding:"3px 10px",borderRadius:20,background:z?"var(--okb)":b?"color-mix(in srgb,var(--ri) 12%,transparent)":"var(--wab)",color:z?"var(--okf)":b?"var(--ri)":"var(--waf)",border:"1px solid",borderColor:z?"color-mix(in srgb,var(--ok) 25%,transparent)":b?"color-mix(in srgb,var(--ri) 22%,transparent)":"color-mix(in srgb,var(--wa) 22%,transparent)",transition:"all .2s"},children:z?"✓ 100%":`${h} / 100%`})}),e.jsx("div",{className:"rub-dim-row rub-dim-row-hd",style:{display:"grid",gridTemplateColumns:"1fr 96px 96px 42px",gap:12},children:["Dimension","Weight","Flag below","On"].map(m=>e.jsx("div",{className:"rp-col-hdr-cell",children:m},m))}),a.map((m,C)=>e.jsxs("div",{className:`rub-dim-row${m.enabled?"":" disabled"}`,children:[e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7,marginBottom:3},children:[e.jsx("span",{className:"rub-dim-name",style:{fontSize:12.5,fontWeight:650,color:"var(--ink)",letterSpacing:"-.01em"},children:m.displayName}),e.jsx("span",{style:{fontFamily:"var(--rp-mono)",fontSize:9.5,color:"var(--ink5)",background:"var(--bg3)",border:"0.5px solid var(--brd2)",padding:"1px 6px",borderRadius:4},children:m.dimensionKey})]}),e.jsx("div",{style:{fontSize:11,color:"var(--ink4)",lineHeight:1.45},children:m.description})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5},children:[e.jsx(xe,{value:m.weight,isErr:b,min:0,max:100,onChange:_=>u(C,"weight",_)}),e.jsx("span",{className:"rub-pct",children:"%"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5},children:[e.jsx(xe,{value:m.flagBelowScore,min:0,max:10,step:.1,style:{width:48,minWidth:48},onChange:_=>u(C,"flagBelowScore",_)}),e.jsx("span",{style:{fontSize:11,color:"var(--ink5)",fontWeight:500},children:"/ 10"})]}),e.jsx(or,{checked:m.enabled,onChange:_=>u(C,"enabled",_)})]},m.rowKey)),(b||f)&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{height:12}}),e.jsx(lr,{variant:b?"over":"under",total:h}),e.jsx("div",{style:{height:4}})]}),e.jsxs("div",{className:"rub-total-bar",children:[e.jsxs("div",{className:"rub-total-summary",children:[e.jsx("span",{className:"rub-total-label",children:"Total weight"}),e.jsx("div",{className:"rub-prog-track",children:e.jsx("div",{className:"rub-prog-fill",style:{width:`${S}%`,background:N}})}),e.jsxs("span",{className:`rub-total-val ${z?"ok":b?"err":"warn"}`,children:[h,"%"]}),z&&e.jsxs("span",{className:"rub-ready-chip",children:[e.jsx("svg",{width:"9",height:"9",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"20 6 9 17 4 12"})}),"Ready to save"]})]}),e.jsx("button",{className:"rp-btn",disabled:p,onClick:()=>r(i.map(m=>({...m}))),children:"Reset"}),e.jsx("button",{className:"rp-btn pri",onClick:o,disabled:p||!z,title:b?`Reduce by ${h-100}% to save`:f?`Add ${100-h}% more to save`:void 0,children:p?e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",children:e.jsx("path",{d:"M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"})}),"Saving…"]}):e.jsxs(e.Fragment,{children:[e.jsxs("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"}),e.jsx("polyline",{points:"17 21 17 13 7 13 7 21"}),e.jsx("polyline",{points:"7 3 7 8 15 8"})]}),"Save weights"]})})]}),e.jsx(dr,{dims:a,bands:s})]})]})}const Le=d.createContext({colorScheme:"default",onColorSchemeChange:()=>{}}),mr=`
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
`+pe+Ha+ar;function D({checked:a,onChange:r,disabled:i=!1}){return e.jsxs("label",{className:"sv-tg",children:[e.jsx("input",{type:"checkbox",checked:a,disabled:i,onChange:n=>r(n.target.checked)}),e.jsx("span",{className:"sv-tg-track"}),e.jsx("span",{className:"sv-tg-thumb"})]})}function k({label:a,sub:r,children:i}){return e.jsxs("div",{className:"sv-row",children:[e.jsxs("div",{className:"sv-row-lbl",children:[e.jsx("div",{className:"sv-row-t",children:a}),r&&e.jsx("div",{className:"sv-row-s",children:r})]}),e.jsx("div",{className:"sv-ctrl",children:i})]})}function E({icon:a,iconBg:r="var(--pp)",iconColor:i="var(--p)",title:n,api:s,sub:l,children:p}){return e.jsxs("div",{className:"sv-card-hdr",children:[e.jsx("div",{className:"sv-card-icon",style:{background:r,color:i},children:a}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{className:"sv-card-title",children:n}),s&&e.jsx("span",{className:"sv-card-api",children:s})]}),l&&e.jsx("div",{style:{marginLeft:"auto",flexShrink:0},children:l}),p]})}function R({children:a}){return e.jsx("span",{className:"mk",children:a})}function V({children:a}){return e.jsx("div",{className:"sv-sublbl",children:a})}function Ie({msg:a,type:r}){return e.jsxs("div",{className:`toast toast-${r}`,children:[r==="ok"?"✓":"✕"," ",a]})}function P({id:a,title:r,sub:i,tagClass:n,tagLabel:s}){return e.jsxs("div",{className:"sr-row",children:[e.jsxs("div",{className:"sr-body",children:[e.jsx("div",{className:"sr-title",children:r}),e.jsx("div",{className:"sr-sub",children:i}),e.jsxs("div",{className:"sr-meta",children:[e.jsx("span",{className:"rule-id",children:a}),e.jsx("span",{className:`tag ${n}`,children:s})]})]}),e.jsxs("div",{className:"sr-actions",children:[e.jsx("button",{className:"btn xs",children:"Edit"}),e.jsx("button",{className:"btn xs",children:"Disable"})]})]})}const br=["helpful","direct","soft","executive_ready","concise"],Me=["services_project","product_sale","retainer","saas","consulting","other"],Pe=["always","never","new_only","new_or_stale","stale_only"],We=["USD","INR","EUR","GBP","CAD","AUD"],vr=["Asia/Kolkata (IST +5:30)","America/New_York (EST)","Europe/London (GMT)","America/Los_Angeles (PST)"],fr=["English (US)","English (UK)","Hindi"];function de(a,r){if(typeof r=="number")return Math.max(0,Math.min(r,a.length-1));const i=a.indexOf(r);return i>=0?i:0}const we={defaultTone:"helpful",defaultDealType:0,defaultResearchPolicy:0,researchStaleAfterDays:30,minResearchConfidence:.6,maxReplyQuestions:3,timezone:"Asia/Kolkata (IST +5:30)",language:"English (US)",currency:0,enableAccountResearch:!0,enableReplyValidation:!0,enablePanchashakti:!0,enableProjection:!0,enableStateDeltas:!0,enableAgentActivity:!0,enableFinancialTracking:!1};function yr(a){return{defaultTone:a.defaultTone||"helpful",defaultDealType:de(Me,a.defaultDealType),defaultResearchPolicy:de(Pe,a.defaultResearchPolicy),researchStaleAfterDays:a.researchStaleAfterDays??30,minResearchConfidence:a.minResearchConfidence??.6,maxReplyQuestions:a.maxReplyQuestions??3,timezone:a.timezone||"Asia/Kolkata (IST +5:30)",language:a.language||"English (US)",currency:de(We,a.currency),enableAccountResearch:a.enableAccountResearch??!0,enableReplyValidation:a.enableReplyValidation??!0,enablePanchashakti:a.enablePanchashakti??!0,enableProjection:a.enableProjection??!0,enableStateDeltas:a.enableStateDeltas??!0,enableAgentActivity:a.enableAgentActivity??!0,enableFinancialTracking:a.enableFinancialTracking??!1}}function jr(a){return{defaultTone:a.defaultTone,defaultDealType:Number(a.defaultDealType),defaultResearchPolicy:Number(a.defaultResearchPolicy),researchStaleAfterDays:Number(a.researchStaleAfterDays),minResearchConfidence:Number(a.minResearchConfidence),maxReplyQuestions:Number(a.maxReplyQuestions),timezone:a.timezone,language:a.language,currency:Number(a.currency),enableAccountResearch:a.enableAccountResearch,enableReplyValidation:a.enableReplyValidation,enablePanchashakti:a.enablePanchashakti,enableProjection:a.enableProjection,enableStateDeltas:a.enableStateDeltas,enableAgentActivity:a.enableAgentActivity,enableFinancialTracking:a.enableFinancialTracking}}const kr=[["Account Research","enableAccountResearch","Allow Forager to enrich account-level data automatically"],["Reply Validation","enableReplyValidation","Validate generated replies against rules before presenting to user"],["Panchashakti Scoring","enablePanchashakti","Score opportunities across five commercial forces"],["Projection Engine","enableProjection","Generate outcome branches and risk scenario projections"],["State Deltas","enableStateDeltas","Track and surface visible state changes on workspaces"],["Agent Activity Feed","enableAgentActivity","Show what each agent is doing in the activity log"],["Financial Tracking","enableFinancialTracking","Enable invoice, payment, and margin tracking across workspaces"]];function wr(){const[a,r]=d.useState(null),[i,n]=d.useState(null),[s,l]=d.useState(null),[p,x]=d.useState(!0),[t,j]=d.useState(!1),[w,u]=d.useState(null),[h,b]=d.useState(null);function f(o,m="ok"){b({msg:o,type:m}),setTimeout(()=>b(null),3e3)}function z(){const o=localStorage.getItem("zotra_token");return{"Content-Type":"application/json",...o?{Authorization:`Bearer ${o}`}:{}}}d.useEffect(()=>{x(!0),M(`${L()}/config`,{headers:z()}).then(o=>{if(!o.ok)throw new Error(`${o.status}`);return o.json()}).then(o=>{l(o.rowKey??null);const m=yr(o);r(m),n(m),u(null)}).catch(o=>{u(o.message),r({...we}),n({...we})}).finally(()=>x(!1))},[]);const S=d.useCallback((o,m)=>{r(C=>C&&{...C,[o]:m})},[]);async function N(){if(!a||!s){f("Cannot save: config not loaded yet","err");return}j(!0);try{const o=await M(`${L()}/config/${s}`,{method:"PUT",headers:z(),body:JSON.stringify(jr(a))});if(!o.ok)throw new Error(`${o.status}`);const m=await o.json();n({...a}),f(m.message||"Tenant settings saved")}catch(o){f(`Save failed: ${o.message}`,"err")}finally{j(!1)}}return p||!a?e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{icon:"⚙",title:"Tenant Settings",api:"PUT /api/config/{rowKey} · admin or owner only"}),[...Array(9)].map((o,m)=>e.jsxs("div",{className:"sv-row",style:{gap:16},children:[e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{className:"skel",style:{height:12,width:160,marginBottom:6}}),e.jsx("div",{className:"skel",style:{height:10,width:240}})]}),e.jsx("div",{className:"skel",style:{height:30,width:170,borderRadius:7}})]},m))]}):e.jsxs(e.Fragment,{children:[h&&e.jsx(Ie,{msg:h.msg,type:h.type}),w&&e.jsxs("div",{style:{padding:"8px 14px",fontSize:11.5,color:"var(--wa)",background:"var(--wab)",borderRadius:8,marginBottom:10,display:"flex",gap:8},children:["⚠ Could not reach API (",w,"). Showing defaults — changes will submit when saved."]}),e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{icon:"⚙",title:"Tenant Settings",api:"PUT /api/config/{rowKey} · admin or owner only"}),e.jsx(V,{children:"Defaults & Policies"}),e.jsx(k,{label:e.jsxs("span",{children:["Default tone ",e.jsx(R,{children:"defaultTone"})]}),sub:"Tone applied when no specific tone is selected for a reply draft",children:e.jsx("select",{className:"sv-select",value:a.defaultTone,onChange:o=>S("defaultTone",o.target.value),children:br.map(o=>e.jsx("option",{value:o,children:o},o))})}),e.jsx(k,{label:e.jsxs("span",{children:["Default deal type ",e.jsx(R,{children:"defaultDealType"})]}),children:e.jsx("select",{className:"sv-select",value:a.defaultDealType,onChange:o=>S("defaultDealType",Number(o.target.value)),children:Me.map((o,m)=>e.jsx("option",{value:m,children:o},o))})}),e.jsx(k,{label:e.jsxs("span",{children:["Research policy ",e.jsx(R,{children:"defaultResearchPolicy"})]}),sub:"When the Forager agent triggers enrichment automatically",children:e.jsx("select",{className:"sv-select",value:a.defaultResearchPolicy,onChange:o=>S("defaultResearchPolicy",Number(o.target.value)),children:Pe.map((o,m)=>e.jsx("option",{value:m,children:o},o))})}),e.jsx(k,{label:e.jsxs("span",{children:["Research stale after ",e.jsx(R,{children:"researchStaleAfterDays"})]}),children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx("input",{className:"sv-input",style:{width:60,minWidth:60,textAlign:"center"},value:a.researchStaleAfterDays,onChange:o=>S("researchStaleAfterDays",Number(o.target.value))}),e.jsx("span",{style:{fontSize:12,color:"var(--ink4)"},children:"days"})]})}),e.jsx(k,{label:e.jsxs("span",{children:["Min research confidence ",e.jsx(R,{children:"minResearchConfidence"})]}),sub:"Minimum confidence score (0.0–1.0) to surface a research finding",children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx("input",{className:"sv-input",style:{width:60,minWidth:60,textAlign:"center"},value:a.minResearchConfidence,onChange:o=>S("minResearchConfidence",Number(o.target.value))}),e.jsx("span",{style:{fontSize:12,color:"var(--ink4)"},children:"0.0–1.0"})]})}),e.jsx(k,{label:e.jsxs("span",{children:["Max reply questions ",e.jsx(R,{children:"maxReplyQuestions"})]}),sub:"Maximum clarifying questions included in a generated reply",children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx("input",{className:"sv-input",style:{width:60,minWidth:60,textAlign:"center"},value:a.maxReplyQuestions,onChange:o=>S("maxReplyQuestions",Number(o.target.value))}),e.jsx("span",{style:{fontSize:12,color:"var(--ink4)"},children:"questions"})]})}),e.jsx(V,{children:"Localisation"}),e.jsx(k,{label:e.jsxs("span",{children:["Timezone ",e.jsx(R,{children:"timezone"})]}),children:e.jsx("select",{className:"sv-select",value:a.timezone,onChange:o=>S("timezone",o.target.value),children:vr.map(o=>e.jsx("option",{value:o,children:o},o))})}),e.jsx(k,{label:e.jsxs("span",{children:["Language ",e.jsx(R,{children:"language"})]}),children:e.jsx("select",{className:"sv-select",value:a.language,onChange:o=>S("language",o.target.value),children:fr.map(o=>e.jsx("option",{value:o,children:o},o))})}),e.jsx(k,{label:e.jsxs("span",{children:["Currency ",e.jsx(R,{children:"currency"})]}),sub:"Used in financial tracking and proposal values",children:e.jsx("select",{className:"sv-select",value:a.currency,onChange:o=>S("currency",Number(o.target.value)),children:We.map((o,m)=>e.jsx("option",{value:m,children:o},o))})}),e.jsx(V,{children:"Feature Toggles"}),kr.map(([o,m,C])=>e.jsx(k,{label:e.jsxs("span",{children:[o," ",e.jsx(R,{children:m})]}),sub:C,children:e.jsx(D,{checked:a[m],onChange:_=>S(m,_)})},m)),e.jsxs("div",{className:"sv-save",children:[e.jsx("button",{className:"btn",onClick:()=>i&&r({...i}),children:"Reset to loaded"}),e.jsx("button",{className:"btn pri",onClick:N,disabled:t||!s,children:t?"Saving…":"Save changes"})]})]})]})}function Nr(){const[a,r]=d.useState({sidebarCollapsed:!1,emailNotif:!0,inAppNotif:!0,slackNotif:!1}),i=(n,s)=>r(l=>({...l,[n]:s}));return e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{icon:"🎨",title:"User Preferences",api:"PATCH /api/config/settings/user · current user only"}),e.jsx(k,{label:e.jsxs("span",{children:["Theme ",e.jsx(R,{children:"theme"})]}),sub:"Applies immediately across all views",children:e.jsxs("select",{className:"sv-select",children:[e.jsx("option",{children:"light"}),e.jsx("option",{children:"dark"}),e.jsx("option",{children:"system"})]})}),e.jsx(k,{label:e.jsxs("span",{children:["Default view ",e.jsx(R,{children:"default_view"})]}),sub:"The view that opens when you launch Zotra",children:e.jsxs("select",{className:"sv-select",children:[e.jsx("option",{children:"pulse"}),e.jsx("option",{children:"pipeline"}),e.jsx("option",{children:"accounts"}),e.jsx("option",{children:"inbox"})]})}),e.jsx(k,{label:e.jsxs("span",{children:["Dashboard layout ",e.jsx(R,{children:"dashboard_layout"})]}),children:e.jsxs("select",{className:"sv-select",children:[e.jsx("option",{children:"default"}),e.jsx("option",{children:"compact"}),e.jsx("option",{children:"expanded"})]})}),e.jsx(k,{label:e.jsxs("span",{children:["Sidebar collapsed ",e.jsx(R,{children:"sidebar_collapsed"})]}),sub:"Start with navigation sidebar collapsed",children:e.jsx(D,{checked:a.sidebarCollapsed,onChange:n=>i("sidebarCollapsed",n)})}),e.jsx(V,{children:"Notifications"}),e.jsx(k,{label:e.jsxs("span",{children:["Email notifications ",e.jsx(R,{children:"notifications.email"})]}),children:e.jsx(D,{checked:a.emailNotif,onChange:n=>i("emailNotif",n)})}),e.jsx(k,{label:e.jsxs("span",{children:["In-app notifications ",e.jsx(R,{children:"notifications.in_app"})]}),children:e.jsx(D,{checked:a.inAppNotif,onChange:n=>i("inAppNotif",n)})}),e.jsx(k,{label:e.jsxs("span",{children:["Slack notifications ",e.jsx(R,{children:"notifications.slack"})]}),sub:"Requires Slack integration to be connected",children:e.jsx(D,{checked:a.slackNotif,onChange:n=>i("slackNotif",n)})}),e.jsx("div",{className:"sv-save",children:e.jsx("button",{className:"btn pri",children:"Save preferences"})})]})}function J({icon:a,iconBg:r,iconColor:i,title:n,sub:s,children:l}){const[p,x]=d.useState(!0);return e.jsxs("div",{className:"sv-card",children:[e.jsxs("div",{className:"sv-card-hdr",children:[e.jsx("div",{className:"sv-card-icon",style:{background:r,color:i},children:a}),e.jsxs("div",{children:[e.jsx("div",{className:"sv-card-title",children:n}),e.jsx("div",{style:{fontSize:11,color:"var(--ink4)",marginTop:1},children:s})]}),e.jsx("div",{style:{marginLeft:"auto"},children:e.jsx(D,{checked:p,onChange:x})})]}),l]})}function Sr(){const a=["Assists — recommend only","Acts — execute + log","Leads — manage end-to-end"];function r({opts:i}){return e.jsx("select",{className:"sv-select",children:i.map(n=>e.jsx("option",{children:n},n))})}return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{icon:"◙",title:"Automation"}),e.jsx(k,{label:"Agents enabled",sub:"All 9 agents are active.",children:e.jsx("span",{style:{fontSize:12,fontWeight:600,color:"var(--ok)"},children:"9 / 9"})}),e.jsx(k,{label:"Default autonomy mode",sub:"Override for all agents at once",children:e.jsx(r,{opts:a})})]}),e.jsxs(J,{iconBg:"var(--pp)",iconColor:"var(--p)",icon:"👁",title:"Watcher",sub:"Signal detection · account silence · gap monitoring",children:[e.jsx(k,{label:"Autonomy mode",children:e.jsx(r,{opts:a})}),e.jsx(k,{label:"Silence threshold",sub:"Days without customer contact before flagging",children:e.jsx(r,{opts:["5 days","7 days","10 days","14 days"]})})]}),e.jsxs(J,{iconBg:"var(--pp)",iconColor:"var(--p)",icon:"🎯",title:"Opportunity",sub:"Pipeline gaps · qualification · proposal drafts",children:[e.jsx(k,{label:"Autonomy mode",children:e.jsx(r,{opts:a.slice(0,2)})}),e.jsx(k,{label:"Stall detection",sub:"Days after proposal before flagging",children:e.jsx(r,{opts:["5 days","7 days","10 days"]})})]}),e.jsxs(J,{iconBg:"var(--amberp)",iconColor:"var(--amber)",icon:"💰",title:"Financial",sub:"Invoice aging · margin watch · payment alerts",children:[e.jsx(k,{label:"Autonomy mode",children:e.jsx(r,{opts:a})}),e.jsx(k,{label:"Invoice watch threshold",children:e.jsx(r,{opts:["7 days","10 days","14 days","21 days"]})}),e.jsx(k,{label:"Margin alert below",children:e.jsx(r,{opts:["10%","20%","25%","30%"]})})]}),e.jsxs(J,{iconBg:"#E8F5E9",iconColor:"#2E7D32",icon:"📋",title:"Project",sub:"Effort variance · delivery health · scope events",children:[e.jsx(k,{label:"Autonomy mode",children:e.jsx(r,{opts:a.slice(0,2)})}),e.jsx(k,{label:"Scope drift alert",children:e.jsx(r,{opts:["10%","20%","25%","30%"]})})]}),e.jsxs(J,{iconBg:"var(--tp)",iconColor:"var(--td)",icon:"🔄",title:"Renewal",sub:"Renewal probability · expansion signals · 90-day watch",children:[e.jsx(k,{label:"Autonomy mode",children:e.jsx(r,{opts:a.slice(0,2)})}),e.jsx(k,{label:"Activation window",children:e.jsx(r,{opts:["60 days","90 days","120 days"]})})]})]})}function Cr(){const[a,r]=d.useState({autoClassify:!0,autoWorkspace:!0,autoResearch:!0,autoDraft:!0,autoSend:!1,stageChange:!1,requireHumanReview:!0}),i=(n,s)=>r(l=>({...l,[n]:s}));return e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{icon:"🎛",title:"Agent Autonomy",api:"PATCH /api/config/agent-autonomy"}),e.jsx(V,{children:"Automatic Actions"}),e.jsx(k,{label:e.jsxs("span",{children:["Auto-classify emails ",e.jsx(R,{children:"allow_auto_classification"})]}),sub:"Automatically classify inbound emails by intent and opportunity",children:e.jsx(D,{checked:a.autoClassify,onChange:n=>i("autoClassify",n)})}),e.jsx(k,{label:e.jsxs("span",{children:["Auto-create workspaces ",e.jsx(R,{children:"allow_auto_workspace_creation"})]}),sub:"Create opportunity workspaces automatically on detection",children:e.jsx(D,{checked:a.autoWorkspace,onChange:n=>i("autoWorkspace",n)})}),e.jsx(k,{label:e.jsxs("span",{children:["Auto-run research ",e.jsx(R,{children:"allow_auto_research"})]}),sub:"Trigger Forager enrichment without manual request",children:e.jsx(D,{checked:a.autoResearch,onChange:n=>i("autoResearch",n)})}),e.jsx(k,{label:e.jsxs("span",{children:["Auto-draft replies ",e.jsx(R,{children:"allow_auto_draft"})]}),sub:"Generate reply drafts without explicit request",children:e.jsx(D,{checked:a.autoDraft,onChange:n=>i("autoDraft",n)})}),e.jsx(k,{label:e.jsxs("span",{children:["Auto-send replies ",e.jsx(R,{children:"allow_auto_send"})]}),sub:"Send drafted replies automatically after approval window expires",children:e.jsx(D,{checked:a.autoSend,onChange:n=>i("autoSend",n)})}),e.jsx(k,{label:e.jsxs("span",{children:["Auto stage changes ",e.jsx(R,{children:"allow_stage_change"})]}),sub:"Allow agents to advance workspace stages based on readiness rules",children:e.jsx(D,{checked:a.stageChange,onChange:n=>i("stageChange",n)})}),e.jsx(V,{children:"Limits & Review"}),e.jsx(k,{label:e.jsxs("span",{children:["Require human review for external replies"," ",e.jsx(R,{children:"require_human_review_for_external_reply"})]}),children:e.jsx(D,{checked:a.requireHumanReview,onChange:n=>i("requireHumanReview",n)})}),e.jsx(k,{label:e.jsxs("span",{children:["Max autonomous actions/day ",e.jsx(R,{children:"max_autonomous_actions_per_day"})]}),sub:"Hard cap on agent actions that execute without approval",children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx("input",{className:"sv-input",style:{width:70,minWidth:70,textAlign:"center"},defaultValue:"50"}),e.jsx("span",{style:{fontSize:12,color:"var(--ink4)"},children:"actions"})]})}),e.jsx("div",{className:"sv-save",children:e.jsx("button",{className:"btn pri",children:"Save autonomy settings"})})]})}function zr(){return e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{iconBg:"var(--okb)",iconColor:"var(--okf)",icon:"✓",title:"Readiness Rules",api:"GET · POST · PATCH /api/config/readiness-rules",sub:e.jsx("button",{className:"btn sm pri",children:"＋ New rule"})}),e.jsx("div",{className:"sv-card-desc",children:"Rules that control stage advancement gates."}),e.jsx(P,{id:"qualify_to_discovery",title:"Qualify → Discovery",sub:"Account researched · Budget signal present",tagClass:"tag-ok",tagLabel:"active"}),e.jsx(P,{id:"discovery_to_proposal",title:"Discovery → Proposal",sub:"Decision maker identified · Pain confirmed",tagClass:"tag-ok",tagLabel:"active"}),e.jsx(P,{id:"proposal_to_negotiation",title:"Proposal → Negotiation",sub:"Proposal sent · Value confirmed by sponsor",tagClass:"tag-ok",tagLabel:"active"}),e.jsx(P,{id:"negotiation_to_close",title:"Negotiation → Close",sub:"Legal review done · Pricing agreed",tagClass:"tag-ok",tagLabel:"active"})]})}function Ar(){return e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{iconBg:"var(--wab)",iconColor:"var(--wa)",icon:"⚠",title:"Gap Rules",api:"GET · POST · PATCH /api/config/gap-rules",sub:e.jsx("button",{className:"btn sm pri",children:"＋ New rule"})}),e.jsx("div",{className:"sv-card-desc",children:"Define conditions for missing, weak, stale, risky, or conflicting intelligence."}),e.jsx(P,{id:"missing_decision_maker",title:"Missing decision maker",sub:"No DM identified after 14 days in Discovery",tagClass:"tag-wa",tagLabel:"missing"}),e.jsx(P,{id:"stale_research",title:"Stale research",sub:"Research not refreshed within staleness threshold",tagClass:"tag-wa",tagLabel:"stale"}),e.jsx(P,{id:"weak_budget_signal",title:"Weak budget signal",sub:"Budget score below 0.4 in Proposal stage",tagClass:"tag-wa",tagLabel:"weak"}),e.jsx(P,{id:"conflicting_stakeholders",title:"Conflicting stakeholder signals",sub:"Two contacts show opposing intent signals",tagClass:"tag-ri",tagLabel:"conflict"})]})}function Tr(){const[a,r]=d.useState(!1),[i,n]=d.useState(!0);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{icon:"◐",title:"Projection Rules",api:"GET · POST · PATCH /api/config/projection-rules",sub:e.jsx("button",{className:"btn sm pri",children:"＋ New rule"})}),e.jsx("div",{className:"sv-card-desc",children:"Rules that define outcome branches, probability weights, and risk scenarios."}),e.jsx(P,{id:"high_force_fast_close",title:"High force → fast close",sub:"All Panchashakti forces ≥ 0.7 → project 80% close within 30 days",tagClass:"tag-ok",tagLabel:"optimistic"}),e.jsx(P,{id:"silent_after_proposal",title:"Silent after proposal",sub:"No reply 10 days post-proposal → project 40% ghost risk",tagClass:"tag-wa",tagLabel:"risk"}),e.jsx(P,{id:"budget_mismatch",title:"Budget mismatch",sub:"Quoted value > 2× budget signal → project stall or discount scenario",tagClass:"tag-ri",tagLabel:"pessimistic"})]}),e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{icon:"🔀",title:"Branch Transition Controls"}),e.jsx(k,{label:"Require rep confirmation for branch shifts",sub:"System proposes the branch change and waits for rep approval",children:e.jsx(D,{checked:a,onChange:r})}),e.jsx(k,{label:"Auto-notify manager on at-risk branch shift",sub:"Send notification when a deal enters an at-risk projection branch",children:e.jsx(D,{checked:i,onChange:n})}),e.jsx("div",{className:"sv-save",children:e.jsx("button",{className:"btn pri",children:"Save"})})]})]})}function Rr(){return e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{iconBg:"var(--tp)",iconColor:"var(--td)",icon:"✉",title:"Reply Validation Rules",api:"GET · POST · PATCH /api/config/reply-validation-rules",sub:e.jsx("button",{className:"btn sm pri",children:"＋ New rule"})}),e.jsx("div",{className:"sv-card-desc",children:"Rules that validate generated replies before they are presented to the user."}),e.jsx(P,{id:"no_unverified_claims",title:"No unverified claims",sub:"Reject drafts that make claims not backed by workspace intelligence",tagClass:"tag-ri",tagLabel:"block"}),e.jsx(P,{id:"tone_check",title:"Tone match",sub:"Flag drafts whose detected tone differs from the selected tone setting",tagClass:"tag-wa",tagLabel:"flag"}),e.jsx(P,{id:"no_pricing_in_early_stage",title:"No pricing in early stage",sub:"Block price mentions before Proposal stage",tagClass:"tag-ri",tagLabel:"block"}),e.jsx(P,{id:"max_length",title:"Reply length limit",sub:"Flag replies over 400 words as potentially too long",tagClass:"tag-wa",tagLabel:"flag"})]})}function Fr(){const[a,r]=d.useState({newCustomer:!0,stageAdvance:!1,staleProfile:!0,gapFlag:!0,blockLowConf:!1}),i=(n,s)=>r(l=>({...l,[n]:s}));return e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{iconBg:"var(--amberp)",iconColor:"var(--amber)",icon:"🔍",title:"Research Rules",api:"GET · POST · PATCH /api/config/research-rules"}),e.jsx(k,{label:e.jsxs("span",{children:["Run for new customers ",e.jsx(R,{children:"run_for_new_customer"})]}),sub:"Trigger research pipeline when a new customer is resolved from an inbound email",children:e.jsx(D,{checked:a.newCustomer,onChange:n=>i("newCustomer",n)})}),e.jsx(k,{label:e.jsxs("span",{children:["Run on stage advance ",e.jsx(R,{children:"run_on_stage_advance"})]}),sub:"Re-trigger research whenever a workspace advances to a new stage",children:e.jsx(D,{checked:a.stageAdvance,onChange:n=>i("stageAdvance",n)})}),e.jsx(k,{label:e.jsxs("span",{children:["Run on stale profile ",e.jsx(R,{children:"run_on_stale"})]}),sub:"Automatically re-enrich when staleness threshold is exceeded",children:e.jsx(D,{checked:a.staleProfile,onChange:n=>i("staleProfile",n)})}),e.jsx(k,{label:e.jsxs("span",{children:["Run on gap flag ",e.jsx(R,{children:"run_on_gap_flag"})]}),sub:"Trigger a focused research pass when a critical intelligence gap is flagged",children:e.jsx(D,{checked:a.gapFlag,onChange:n=>i("gapFlag",n)})}),e.jsx(k,{label:e.jsxs("span",{children:["Research stale after ",e.jsx(R,{children:"stale_after_days"})]}),sub:"Days since last research run before eligible for re-enrichment",children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx("input",{className:"sv-input",style:{width:60,minWidth:60,textAlign:"center"},defaultValue:"30"}),e.jsx("span",{style:{fontSize:12,color:"var(--ink4)"},children:"days"})]})}),e.jsx(k,{label:e.jsxs("span",{children:["Block agent actions on low confidence"," ",e.jsx(R,{children:"block_on_low_confidence"})]}),sub:"Prevent agents from acting on workspaces where research confidence is below threshold",children:e.jsx(D,{checked:a.blockLowConf,onChange:n=>i("blockLowConf",n)})}),e.jsxs("div",{className:"sv-save",children:[e.jsx("button",{className:"btn",children:"Reset defaults"}),e.jsx("button",{className:"btn pri",children:"Save rules"})]})]})}const Ne=[{id:"buying_intent",title:"Buying intent",sub:"Keywords and phrases that indicate purchase readiness",sens:"high",tagClass:"tag-ri",on:!0},{id:"churn_risk",title:"Churn risk",sub:"Signals of dissatisfaction, silence, or competitive evaluation",sens:"high",tagClass:"tag-ri",on:!0},{id:"expansion_trigger",title:"Expansion trigger",sub:"Indicators of upsell or cross-sell opportunity",sens:"medium",tagClass:"tag-wa",on:!0},{id:"payment_hesitation",title:"Payment hesitation",sub:"Language around billing, delays, disputes",sens:"medium",tagClass:"tag-wa",on:!0},{id:"stakeholder_change",title:"Stakeholder change",sub:"New contacts, org changes, role shifts",sens:"low",tagClass:"tag-mu",on:!0},{id:"competitive_mention",title:"Competitor mention",sub:"Named competitor references in comms or research",sens:"medium",tagClass:"tag-wa",on:!1}];function Er(){const[a,r]=d.useState(Ne.map(n=>n.on)),i=(n,s)=>r(l=>{const p=[...l];return p[n]=s,p});return e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{icon:"📡",title:"Signal Types",api:"PATCH /api/config/signal-types/{signalType}"}),e.jsx("div",{className:"sv-card-desc",children:"Configure which signal types are extracted from emails, meetings, and research."}),Ne.map((n,s)=>e.jsxs("div",{className:`sr-row${a[s]?"":" disabled"}`,children:[e.jsxs("div",{className:"sr-body",children:[e.jsx("div",{className:"sr-title",children:n.title}),e.jsx("div",{className:"sr-sub",children:n.sub}),e.jsxs("div",{className:"sr-meta",children:[e.jsx("span",{className:"rule-id",children:n.id}),e.jsx("span",{className:`tag ${n.tagClass}`,children:n.sens})]})]}),e.jsxs("div",{className:"sr-actions",children:[e.jsxs("select",{className:"sv-select",style:{minWidth:90,height:26,fontSize:11},children:[e.jsx("option",{children:"high"}),e.jsx("option",{children:"medium"}),e.jsx("option",{children:"low"})]}),e.jsx("button",{className:"btn xs",children:"Edit"}),e.jsx(D,{checked:a[s],onChange:l=>i(s,l)})]})]},n.id)),e.jsx("div",{className:"sv-save",children:e.jsx("button",{className:"btn pri",children:"Save signal config"})})]})}const Se=[{id:"force_score_drop",title:"Force score drop",sub:"Surface when any Panchashakti force drops by ≥ 0.2",on:!0},{id:"stage_advance",title:"Stage advance",sub:"Show state delta whenever a workspace advances to next stage",on:!0},{id:"contact_added",title:"Key contact added",sub:"Surface when decision maker or sponsor is added to workspace",on:!0},{id:"research_refresh",title:"Research refreshed",sub:"Show delta when Forager completes a re-enrichment run",on:!1},{id:"gap_cleared",title:"Gap cleared",sub:"Surface when a previously flagged intelligence gap is resolved",on:!0}];function _r(){const[a,r]=d.useState(Se.map(n=>n.on)),i=(n,s)=>r(l=>{const p=[...l];return p[n]=s,p});return e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{iconBg:"var(--tp)",iconColor:"var(--td)",icon:"↻",title:"State Delta Rules",api:"PATCH /api/config/state-delta-rules/{ruleId}"}),e.jsx("div",{className:"sv-card-desc",children:"Define which workspace field changes are surfaced as visible state deltas."}),Se.map((n,s)=>e.jsx(k,{label:e.jsxs("span",{children:[n.title," ",e.jsx(R,{children:n.id})]}),sub:n.sub,children:e.jsx(D,{checked:a[s],onChange:l=>i(s,l)})},n.id)),e.jsx("div",{className:"sv-save",children:e.jsx("button",{className:"btn pri",children:"Save delta rules"})})]})}const Ce=[{n:1,name:"ask_gap_questions",desc:"Ask top qualification gaps in reply.",trigger:"high_severity_gaps_present",action:"ask_question",pri:1},{n:2,name:"suggest_discovery_call",desc:"Suggest a short discovery call.",trigger:"urgency_and_authority_present",action:"schedule_meeting",pri:2},{n:3,name:"request_budget_range",desc:"Ask for budget range or commercial expectation.",trigger:"budget_missing",action:"ask_question",pri:3},{n:4,name:"confirm_authority_path",desc:"Ask who will evaluate or approve.",trigger:"authority_missing",action:"ask_question",pri:4},{n:5,name:"send_soft_qualification_reply",desc:"Respond helpfully while qualifying fit.",trigger:"overall_score_medium",action:"reply",pri:5},{n:6,name:"route_to_manager",desc:"Route to manager for review.",trigger:"enterprise_or_high_risk",action:"route",pri:6,danger:!0},{n:7,name:"nurture",desc:"Send light reply and avoid heavy sales motion.",trigger:"overall_score_low",action:"nurture",pri:7}];function Dr(){const[a,r]=d.useState(Ce.map(()=>!0)),i=(n,s)=>r(l=>{const p=[...l];return p[n]=s,p});return e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{icon:"⚡",title:"Agent Rules",api:"GET · POST · PATCH /api/config/agent-rules",sub:e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center"},children:[e.jsx("span",{style:{fontSize:11,color:"var(--ink5)"},children:"7 rules · priority order"}),e.jsx("button",{className:"btn sm pri",children:"＋ New rule"})]})}),e.jsx("div",{className:"sv-card-desc",children:"Agent rules fire in priority order when their trigger condition is satisfied."}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"24px 1fr 160px 120px 48px 44px",gap:8,padding:"8px 14px",background:"var(--bg)",borderBottom:"0.5px solid var(--brd)"},children:["#","Rule name · Description","Trigger condition","Action type","Pri.","Active"].map(n=>e.jsx("div",{style:{fontSize:"9.5px",fontWeight:700,letterSpacing:".07em",textTransform:"uppercase",color:"var(--ink5)"},children:n},n))}),Ce.map((n,s)=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"24px 1fr 160px 120px 48px 44px",gap:8,alignItems:"start",padding:"11px 14px",borderBottom:"0.5px solid var(--brd)"},children:[e.jsx("div",{style:{fontFamily:'"DM Mono",monospace',fontSize:11,color:"var(--ink5)",paddingTop:4},children:n.n}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:12.5,fontWeight:500,color:"var(--ink)",fontFamily:'"DM Mono",monospace',marginBottom:2},children:n.name}),e.jsx("div",{style:{fontSize:11.5,color:"var(--ink4)"},children:n.desc}),e.jsxs("div",{style:{display:"flex",gap:4,marginTop:6},children:[e.jsx("button",{className:"btn xs",children:"Edit"}),e.jsx("button",{className:"btn xs",children:"Duplicate"})]})]}),e.jsx("input",{className:"sv-input",style:{width:"100%",minWidth:0,fontFamily:'"DM Mono",monospace',fontSize:11},defaultValue:n.trigger}),e.jsx("span",{style:{fontSize:10.5,fontWeight:600,padding:"3px 9px",borderRadius:4,background:n.danger?"#FEE2E2":"var(--pp)",color:n.danger?"#991B1B":"var(--p)",marginTop:4,display:"inline-block"},children:n.action}),e.jsx("input",{className:"sv-input",style:{width:38,minWidth:38,textAlign:"center"},defaultValue:n.pri}),e.jsx("div",{style:{paddingTop:4},children:e.jsx(D,{checked:a[s],onChange:l=>i(s,l)})})]},n.n)),e.jsxs("div",{className:"sv-save",children:[e.jsx("button",{className:"btn",children:"Reset to seed defaults"}),e.jsx("button",{className:"btn pri",children:"Save rules"})]})]})}const ze=[{icon:"🏢",bg:"#E3F9F4",name:"Company Enrichment",id:"company_enrichment",desc:"Company size, revenue band, HQ, industry, business model.",fields:"company_size · revenue_band · hq · industry · business_model",providers:["llm","clearbit","apollo"],on:!0},{icon:"💰",bg:"#FFFBEB",name:"Funding & Growth",id:"funding_growth",desc:"Funding stage, growth indicators, investors, and valuation signals.",fields:"funding_stage · total_raised · investors · growth_stage",providers:["llm","crunchbase"],on:!0},{icon:"🛠",bg:"#F5F3FF",name:"Tech Stack",id:"tech_stack",desc:"Known CRM, marketing stack, data tools, and software environment.",fields:"crm · marketing_stack · data_tools · current_systems",providers:["llm"],on:!0},{icon:"📰",bg:"#EFF6FF",name:"Company News",id:"company_news",desc:"Recent launches, executive changes, partnerships, M&A events.",fields:"recent_news · launches · exec_changes · partnerships",providers:["llm"],on:!0},{icon:"👤",bg:"#F0FDF4",name:"Sender Profile",id:"sender_profile",desc:"Sender role, seniority, likely responsibility, and buyer relevance.",fields:"sender_role · seniority · function · buyer_relevance",providers:["llm","linkedin"],on:!0},{icon:"📋",bg:"#FFF1F2",name:"Job Posting Signals",id:"job_signals",desc:"Hiring activity and roles that indicate business priorities.",fields:"active_roles · hiring_areas · team_growth",providers:["llm","linkedin"],on:!1}];function Br(){const[a,r]=d.useState(ze.map(n=>n.on)),i=(n,s)=>r(l=>{const p=[...l];return p[n]=s,p});return e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{iconBg:"var(--amberp)",iconColor:"var(--amber)",icon:"🔬",title:"Research Modules",api:"PATCH /api/config/research-modules/{moduleId} · 6 modules"}),e.jsx("div",{className:"sv-card-desc",children:"Each module defines what the research pipeline collects for a workspace."}),ze.map((n,s)=>e.jsxs("div",{className:"rm-row",children:[e.jsx("div",{className:"rm-icon",style:{background:n.bg},children:n.icon}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsxs("div",{className:"rm-name",children:[n.name," ",e.jsx(R,{children:n.id})]}),e.jsx("div",{className:"rm-desc",children:n.desc}),e.jsx("div",{className:"rm-fields",children:n.fields})]}),e.jsxs("div",{className:"rm-ctrl",children:[e.jsx("select",{className:"sv-select",style:{minWidth:100},children:n.providers.map(l=>e.jsx("option",{children:l},l))}),e.jsx(D,{checked:a[s],onChange:l=>i(s,l)})]})]},n.id)),e.jsx("div",{className:"sv-save",children:e.jsx("button",{className:"btn pri",children:"Save modules"})})]})}const Ae=[{id:"deal_stalled_7d",title:"Deal stalled 7 days",sub:"Notify owner when an active workspace has no activity for 7 days",ch:"in-app + email",on:!0},{id:"high_risk_gap",title:"High-risk intelligence gap",sub:"Notify owner when a risky or conflicting signal is flagged",ch:"in-app",on:!0},{id:"stage_blocked",title:"Stage advance blocked",sub:"Notify when readiness rules block a stage advancement",ch:"in-app",on:!0},{id:"reply_draft_ready",title:"Reply draft ready",sub:"Notify when Comms agent finishes a reply draft",ch:"in-app + slack",on:!0},{id:"invoice_overdue",title:"Invoice overdue",sub:"Notify finance contact when invoice passes watch threshold",ch:"email",on:!1}];function Lr(){const[a,r]=d.useState(Ae.map(n=>n.on)),i=(n,s)=>r(l=>{const p=[...l];return p[n]=s,p});return e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{icon:"📣",title:"Notification Rules",api:"GET · POST · PATCH /api/config/notification-rules · tenant-level",sub:e.jsx("button",{className:"btn sm pri",children:"＋ New rule"})}),e.jsx("div",{className:"sv-card-desc",children:"Tenant-level rules that define when notifications are triggered, who receives them, and via which channel."}),Ae.map((n,s)=>e.jsxs("div",{className:"sr-row",children:[e.jsxs("div",{className:"sr-body",children:[e.jsx("div",{className:"sr-title",children:n.title}),e.jsx("div",{className:"sr-sub",children:n.sub}),e.jsxs("div",{className:"sr-meta",children:[e.jsx("span",{className:"rule-id",children:n.id}),e.jsx("span",{style:{fontSize:9.5,padding:"1.5px 7px",borderRadius:10,background:"var(--bg3)",color:"var(--ink4)",border:".5px solid var(--brd2)",fontFamily:'"DM Mono",monospace'},children:n.ch})]})]}),e.jsxs("div",{className:"sr-actions",children:[e.jsx("button",{className:"btn xs",children:"Edit"}),e.jsx(D,{checked:a[s],onChange:l=>i(s,l)})]})]},n.id))]})}function Ir(){const a=[{key:"helpful",desc:"Warm, supportive, solution-oriented"},{key:"direct",desc:"Concise, no fluff, confident"},{key:"soft",desc:"Empathetic, gentle, relationship-first"},{key:"executive_ready",desc:"Formal, polished, boardroom-appropriate"},{key:"concise",desc:"Minimum words, maximum clarity"}],r=[{key:"commercial_inquiry",desc:"Inbound email expressing business interest → signals_extract"},{key:"meeting_request",desc:"Meeting / demo / discovery request → workspace_create"},{key:"pricing_request",desc:"Pricing / commercial discussion → commercial_push"},{key:"partnership_inquiry",desc:"Partnership / channel discussion → signals_extract"},{key:"renewal_discussion",desc:"Renewal / retention conversation → renewal_protection"},{key:"support_request",desc:"Operational / support request → disposition only"},{key:"non_commercial",desc:"Non-commercial communication → NonCommercialDisposition",system:!0}],i=[{key:"services_project",desc:"Project-based engagement with defined scope, timelines, and deliverables."},{key:"product_sale",desc:"One-time sale of a physical or digital product to the customer."},{key:"retainer",desc:"Ongoing service agreement with recurring billing and continuous support."},{key:"saas",desc:"Subscription-based software service delivered and managed through the cloud."},{key:"consulting",desc:"Advisory or strategic expertise provided to solve business or technical challenges."},{key:"other",desc:"Custom or non-standard deal structure that does not fit predefined categories."}],n=({children:s})=>e.jsx("span",{style:{fontFamily:'"DM Mono",monospace',fontSize:10,color:"var(--ink5)",fontWeight:400},children:s});return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"sv-card",style:{marginBottom:8,padding:"12px 18px"},children:[e.jsx("div",{style:{fontSize:12.5,fontWeight:600,color:"var(--ink)",marginBottom:2},children:"Config Items"}),e.jsxs("div",{style:{fontSize:11.5,color:"var(--ink4)"},children:["Lightweight configurable lists used across Zotra ·"," ",e.jsx("span",{style:{fontFamily:'"DM Mono",monospace',fontSize:10.5,color:"var(--p)"},children:"GET / POST / PATCH /api/config/items"})]})]}),e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{icon:"💬",title:e.jsxs("span",{children:["Tones ",e.jsx(n,{children:"tones"})]}),sub:e.jsx("button",{className:"btn sm pri",children:"＋ Add"})}),a.map(s=>e.jsxs("div",{className:"ci-row",children:[e.jsx("div",{className:"ci-key",children:s.key}),e.jsx("div",{className:"ci-desc",children:s.desc}),e.jsx("span",{className:"ci-badge",children:"system"}),e.jsxs("div",{style:{display:"flex",gap:5},children:[e.jsx("button",{className:"btn xs",children:"Edit"}),e.jsx("button",{className:"btn xs",disabled:!0,style:{opacity:.4},children:"Remove"})]})]},s.key))]}),e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{icon:"◈",title:e.jsxs("span",{children:["Commercial Categories ",e.jsx(n,{children:"commercial_categories"})]}),sub:e.jsx("button",{className:"btn sm pri",children:"＋ Add"})}),r.map(s=>e.jsxs("div",{className:"ci-row",children:[e.jsx("div",{className:"ci-key",children:s.key}),e.jsx("div",{className:"ci-desc",children:s.desc}),s.system&&e.jsx("span",{className:"ci-badge",children:"system"}),e.jsxs("div",{style:{display:"flex",gap:5},children:[e.jsx("button",{className:"btn xs",children:"Edit"}),!s.system&&e.jsx("button",{className:"btn xs",children:"Remove"})]})]},s.key))]}),e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{icon:"◈",title:e.jsxs("span",{children:["Deal Types ",e.jsx(n,{children:"deal_types"})]}),sub:e.jsx("button",{className:"btn sm pri",children:"＋ Add"})}),i.map(s=>e.jsxs("div",{className:"ci-row",children:[e.jsx("div",{className:"ci-key",children:s.key}),e.jsx("div",{className:"ci-desc",children:s.desc}),e.jsxs("div",{style:{display:"flex",gap:5},children:[e.jsx("button",{className:"btn xs",children:"Edit"}),e.jsx("button",{className:"btn xs",children:"Remove"})]})]},s.key))]})]})}function Mr(){return e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{icon:"↻",title:"Outcome Learning",api:"Configure how the system learns from deal outcomes"}),e.jsx(k,{label:e.jsxs("span",{children:["Learning trigger ",e.jsx(R,{children:"outcome_trigger"})]}),sub:"When does outcome logging fire?",children:e.jsxs("select",{className:"sv-select",children:[e.jsx("option",{children:"reply_sent"}),e.jsx("option",{children:"workspace_closed"}),e.jsx("option",{children:"stage_advanced"}),e.jsx("option",{children:"manual"})]})}),e.jsx(k,{label:e.jsxs("span",{children:["Learning target ",e.jsx(R,{children:"learning_target"})]}),sub:"What does the learning loop update?",children:e.jsxs("select",{className:"sv-select",children:[e.jsx("option",{children:"action_scoring_model"}),e.jsx("option",{children:"inference_library_weights"}),e.jsx("option",{children:"rubric_thresholds"}),e.jsx("option",{children:"all_targets"})]})}),e.jsx(k,{label:"Minimum outcomes before learning",sub:"Minimum closed deals required before the model updates.",children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx("input",{className:"sv-input",style:{width:60,minWidth:60,textAlign:"center"},defaultValue:"5"}),e.jsx("span",{style:{fontSize:12,color:"var(--ink4)"},children:"deals"})]})}),e.jsx(k,{label:"Learning cadence",sub:"How frequently the model re-evaluates outcomes and updates targets.",children:e.jsxs("select",{className:"sv-select",children:[e.jsx("option",{children:"Daily"}),e.jsx("option",{children:"Weekly"}),e.jsx("option",{children:"Monthly"})]})}),e.jsxs("div",{className:"sv-save",children:[e.jsx("button",{className:"btn",children:"Reset defaults"}),e.jsx("button",{className:"btn pri",children:"Save changes"})]})]})}const Pr=["Owner","Admin","Manager","Member","Viewer","Partner"];function Wr(){const[a,r]=d.useState([]),[i,n]=d.useState(!0),[s,l]=d.useState(null),[p,x]=d.useState(null),[t,j]=d.useState(null),[w,u]=d.useState(null),[h,b]=d.useState(!0);function f(g,F="ok"){u({msg:g,type:F}),setTimeout(()=>u(null),3e3)}function z(){const g=localStorage.getItem("zotra_token");return{"Content-Type":"application/json",...g?{Authorization:`Bearer ${g}`}:{}}}d.useEffect(()=>{n(!0),M(`${L()}/users`,{headers:z()}).then(g=>{if(!g.ok)throw new Error(`${g.status}`);return g.json()}).then(g=>{r(g),j(null)}).catch(g=>j(g.message)).finally(()=>n(!1))},[]);async function S(g,F){l(g);try{const A=await M(`${L()}/users/${g}`,{method:"PATCH",headers:z(),body:JSON.stringify({role:F})});if(!A.ok)throw new Error(`${A.status}`);r(c=>c.map(y=>y.userId===g?{...y,role:F}:y)),f("Role updated successfully")}catch(A){f(`Failed: ${A.message}`,"err")}finally{l(null)}}async function N(g,F){l(g),x(null);try{const A=await M(`${L()}/users/${g}`,{method:"DELETE",headers:z()});if(!A.ok)throw new Error(`${A.status}`);r(c=>c.filter(y=>y.userId!==g)),f(`${F} has been removed`)}catch(A){f(`Failed: ${A.message}`,"err")}finally{l(null)}}async function o(g,F){l(g);try{const A=await M(`${L()}/users/${g}/resend-invite`,{method:"POST",headers:z()});if(!A.ok)throw new Error(`${A.status}`);f(`Invite resent to ${F}`)}catch(A){f(`Failed: ${A.message}`,"err")}finally{l(null)}}const m=[{bg:"#EEF2FF",color:"#4338CA"},{bg:"#F0FDF4",color:"#15803D"},{bg:"#FFF7ED",color:"#C2410C"},{bg:"#FDF4FF",color:"#9333EA"},{bg:"#FFF1F2",color:"#BE123C"},{bg:"#F0F9FF",color:"#0369A1"}],C={Owner:{bg:"#EEF2FF",color:"#4338CA"},Admin:{bg:"#FFF7ED",color:"#C2410C"},Manager:{bg:"#F0FDF4",color:"#15803D"},Member:{bg:"#F0F9FF",color:"#0369A1"},Viewer:{bg:"#F5F5F5",color:"#525252"},Partner:{bg:"#FDF4FF",color:"#9333EA"}},_=localStorage.getItem("zotra_email")??"",v=a.filter(g=>g.status==="Active").length;return i?e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{icon:"👥",title:"Team members",sub:e.jsx("button",{className:"btn sm pri",disabled:!0,children:"＋ Invite member"})}),[...Array(4)].map((g,F)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,padding:"14px 18px",borderBottom:"0.5px solid var(--brd)"},children:[e.jsx("div",{className:"skel",style:{width:38,height:38,borderRadius:10,flexShrink:0}}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{className:"skel",style:{height:12,width:140,marginBottom:7}}),e.jsx("div",{className:"skel",style:{height:10,width:200}})]}),e.jsx("div",{className:"skel",style:{height:30,width:130,borderRadius:7}}),e.jsx("div",{className:"skel",style:{height:30,width:80,borderRadius:7}})]},F))]}):e.jsxs(e.Fragment,{children:[w&&e.jsx(Ie,{msg:w.msg,type:w.type}),t&&e.jsxs("div",{style:{padding:"8px 14px",fontSize:11.5,color:"var(--wa)",background:"var(--wab)",borderRadius:8,marginBottom:10,display:"flex",gap:8,alignItems:"center"},children:[e.jsx("span",{children:"⚠"}),e.jsxs("span",{children:["Could not reach API (",t,"). Showing cached data."]})]}),p&&(()=>{const g=a.find(F=>F.userId===p);return g?e.jsx("div",{style:{position:"fixed",inset:0,zIndex:1e3,background:"rgba(15,15,25,.45)",backdropFilter:"blur(2px)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsxs("div",{style:{background:"var(--bg2)",borderRadius:16,border:"0.5px solid var(--brd2)",boxShadow:"0 8px 40px rgba(0,0,0,.18)",padding:"28px 28px 22px",width:360,maxWidth:"90vw"},children:[e.jsx("div",{style:{width:44,height:44,borderRadius:12,background:"var(--rib)",color:"var(--ri)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,marginBottom:16},children:"⚠"}),e.jsx("div",{style:{fontSize:15,fontWeight:650,color:"var(--ink)",fontFamily:'"Sora",sans-serif',marginBottom:6},children:"Remove team member?"}),e.jsxs("div",{style:{fontSize:12.5,color:"var(--ink4)",lineHeight:1.6,marginBottom:22},children:[e.jsx("strong",{style:{color:"var(--ink)"},children:g.fullName||g.email})," ","will immediately lose access to all workspaces and data. This cannot be undone."]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"flex-end"},children:[e.jsx("button",{className:"btn",onClick:()=>x(null),children:"Cancel"}),e.jsx("button",{className:"btn pri",style:{background:"var(--ri)",borderColor:"var(--ri)"},onClick:()=>N(g.userId,g.fullName||g.email),children:"Yes, remove"})]})]})}):null})(),e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{icon:"👥",title:"Team members",sub:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("span",{style:{fontSize:11,color:"var(--ink5)",background:"var(--bg3)",border:"0.5px solid var(--brd2)",padding:"2px 9px",borderRadius:20,fontFamily:'"DM Mono",monospace'},children:[v," active · ",a.length," total"]}),e.jsx("button",{className:"btn sm pri",children:"＋ Invite member"})]})}),a.length===0&&e.jsx("div",{style:{padding:"36px 18px",textAlign:"center",color:"var(--ink4)",fontSize:13},children:"No team members found."}),a.map((g,F)=>{const A=g.status==="Active",c=g.status==="Invited",y=g.email.toLowerCase()===_.toLowerCase(),T=s===g.userId,I=m[F%m.length],O=C[g.role]??{bg:"var(--pp)",color:"var(--p)"},G=(g.fullName||g.email).split(" ").map($=>$[0]).join("").toUpperCase().slice(0,2);return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,padding:"13px 18px",borderBottom:"0.5px solid var(--brd)",opacity:T?.6:1},children:[e.jsx("div",{style:{width:38,height:38,borderRadius:10,flexShrink:0,background:I.bg,color:I.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,border:`1.5px solid ${I.color}22`},children:G}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,marginBottom:3,flexWrap:"wrap"},children:[e.jsx("span",{style:{fontSize:13,fontWeight:600,color:"var(--ink)"},children:g.fullName||g.email}),y&&e.jsx("span",{style:{fontSize:9.5,background:"var(--pp)",color:"var(--p)",padding:"1.5px 7px",borderRadius:20,fontWeight:700},children:"You"}),e.jsx("span",{style:{fontSize:9.5,padding:"1.5px 7px",borderRadius:20,fontWeight:700,background:A?"var(--okb)":c?"var(--wab)":"var(--bg3)",color:A?"var(--okf)":c?"var(--waf)":"var(--ink4)"},children:g.status}),e.jsx("span",{style:{fontSize:9.5,padding:"1.5px 7px",borderRadius:20,fontWeight:600,background:O.bg,color:O.color},children:g.role})]}),e.jsxs("div",{style:{fontSize:11.5,color:"var(--ink4)",display:"flex",gap:8},children:[e.jsx("span",{children:g.email}),g.jobRole&&e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{color:"var(--ink6)"},children:"·"}),e.jsx("span",{children:g.jobRole})]})]})]}),e.jsx("select",{className:"sv-select",value:g.role,disabled:T||y,style:{minWidth:120},onChange:$=>S(g.userId,$.target.value),children:Pr.map($=>e.jsx("option",{value:$,children:$},$))}),A?e.jsx("button",{className:"btn",disabled:T||y,style:{color:"var(--ri)",borderColor:"var(--rib)",minWidth:76,opacity:y?.35:1},onClick:()=>x(g.userId),children:T?"…":"Remove"}):e.jsx("button",{className:"btn",disabled:T,style:{minWidth:76},onClick:()=>o(g.userId,g.email),children:T?"Sending…":"Resend"})]},g.userId)})]}),e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{icon:"🔒",title:"Workspace sharing"}),e.jsx(k,{label:"Default opportunity visibility",sub:"Who can see new opportunities by default",children:e.jsxs("select",{className:"sv-select",children:[e.jsx("option",{children:"Private (only me)"}),e.jsx("option",{children:"Team (all members)"}),e.jsx("option",{children:"Custom"})]})}),e.jsx(k,{label:"Allow managers to view all deals",children:e.jsx(D,{checked:h,onChange:b})})]})]})}function $r(){return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{icon:"⭐",title:"Current plan",sub:e.jsx("span",{style:{background:"var(--pp)",color:"var(--p)",fontSize:10.5,fontWeight:700,padding:"2px 9px",borderRadius:20},children:"Pro"})}),e.jsx(k,{label:e.jsxs("span",{children:["Zotra Pro ",e.jsx(R,{children:"Plan: premium"})]}),sub:"$79/month · billed monthly · renews Jun 4, 2026",children:e.jsx("button",{className:"btn pri",children:"Upgrade plan"})}),e.jsx(k,{label:"Opportunities used",sub:"12 of 25 active opportunities",children:e.jsxs("div",{children:[e.jsx("div",{className:"bill-bar",children:e.jsx("div",{className:"bill-fill",style:{width:"48%"}})}),e.jsx("div",{style:{fontSize:10.5,color:"var(--ink5)",marginTop:3,textAlign:"right",fontFamily:'"DM Mono",monospace'},children:"12 / 25"})]})}),e.jsx(k,{label:"Billing email",children:e.jsx("input",{className:"sv-input",defaultValue:"finance@acme.com"})}),e.jsx(k,{label:"Payment method",sub:"Visa ending 4242 · expires 09/27",children:e.jsx("button",{className:"btn",children:"Update card"})})]}),e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{icon:"📄",title:"Invoices"}),["May 2026","April 2026","March 2026"].map(a=>e.jsx(k,{label:a,sub:"$79.00 · Paid",children:e.jsx("button",{className:"btn sm",children:"Download PDF"})},a))]})]})}function Or(){return e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{iconBg:"var(--rib)",iconColor:"var(--ri)",icon:"⚠",title:e.jsx("span",{style:{color:"var(--ri)"},children:"Danger zone"})}),e.jsx(k,{label:"Export all data",sub:"Download a full archive of your opportunities, signals, and settings",children:e.jsx("button",{className:"btn",children:"Request export"})}),e.jsx(k,{label:"Clear all opportunities",sub:"Permanently delete all opportunity data. Cannot be undone.",children:e.jsx("button",{className:"btn danger",children:"Clear opportunities"})}),e.jsx(k,{label:"Reset all agent settings",sub:"All agent configurations will revert to factory defaults.",children:e.jsx("button",{className:"btn danger",children:"Reset agents"})}),e.jsx(k,{label:"Delete account",sub:"Permanently remove your account, data, and all associated opportunities",children:e.jsx("button",{className:"btn danger",children:"Delete account"})})]})}const Te=[{section:"Tenant",items:[{id:"tenant-settings",icon:"⚙",label:"Tenant Settings"},{id:"branding",icon:"🏷",label:"Branding"},{id:"team",icon:"👥",label:"Team"}]},{section:"Agents & Autonomy",items:[{id:"agents",icon:"◙",label:"Agents"},{id:"agent-autonomy",icon:"🎛",label:"Agent Autonomy"},{id:"outcome-learning",icon:"↻",label:"Outcome Learning"}]},{section:"Intelligence Config",items:[{id:"inference-library",icon:"📚",label:"Inference Library"},{id:"force-config",icon:"◐",label:"Panchashakti"},{id:"rubric-config",icon:"◈",label:"Rubrics"},{id:"readiness-rules",icon:"✓",label:"Readiness Rules"},{id:"gap-rules",icon:"⚠",label:"Gap Rules"},{id:"projection-rules",icon:"◐",label:"Projection Rules"},{id:"reply-validation",icon:"✉",label:"Reply Validation"},{id:"action-rules",icon:"⚡",label:"Agent Rules"}]},{section:"Research & Signals",items:[{id:"research-modules",icon:"🔬",label:"Research Modules"},{id:"research-rules",icon:"🔍",label:"Research Rules"},{id:"signal-types",icon:"📡",label:"Signal Types"},{id:"state-delta-rules",icon:"↻",label:"State Delta Rules"},{id:"notification-rules",icon:"📣",label:"Notification Rules"}]},{section:"Config Lists",items:[{id:"config-items",icon:"■",label:"Config Items"}]},{section:"Integrations & Billing",items:[{id:"integrations",icon:"🔗",label:"Integrations"},{id:"billing",icon:"💳",label:"Billing"}]},{section:"Conversation Assistant",items:[{id:"assistant-persona",icon:"🤖",label:"Persona & Prompt"},{id:"assistant-channels",icon:"📡",label:"Channels"},{id:"assistant-inventory",icon:"📦",label:"Inventory Config"},{id:"assistant-escalation",icon:"🔀",label:"Escalation Rules"},{id:"rel-stages",icon:"🔗",label:"Relationship Stages"}]},{section:null,items:[{id:"danger",icon:"⚠",label:"Danger zone",danger:!0}]}],Gr={profile:Oe,preferences:Nr,"tenant-settings":wr,branding:ea,team:Wr,agents:Sr,"agent-autonomy":Cr,"outcome-learning":Mr,"inference-library":ca,"force-config":er,"rubric-config":hr,"readiness-rules":zr,"gap-rules":Ar,"projection-rules":Tr,"reply-validation":Rr,"action-rules":Dr,"research-modules":Br,"research-rules":Fr,"signal-types":Er,"state-delta-rules":_r,"notification-rules":Lr,"config-items":Ir,integrations:Ca,billing:$r,danger:Or,"assistant-persona":Ta,"assistant-channels":_a,"assistant-inventory":La,"assistant-escalation":Wa,"rel-stages":Ga};function qr({colorScheme:a="default",onColorSchemeChange:r=()=>{},initialPanel:i}){const[n,s]=d.useState(i??"tenant-settings");d.useEffect(()=>{i&&s(i)},[i]);const l=Gr[n]??null;return e.jsxs(Le.Provider,{value:{colorScheme:a,onColorSchemeChange:r},children:[e.jsx("style",{children:mr}),e.jsxs("div",{className:"sv",children:[e.jsx("div",{className:"sv-hd",children:e.jsxs("div",{children:[e.jsx("div",{className:"sv-hd-title",children:"Settings"}),e.jsx("div",{className:"sv-hd-sub",children:"Manage your account, preferences, integrations and team"})]})}),e.jsxs("div",{className:"sv-body",children:[e.jsx("nav",{className:"sv-nav",children:Te.map((p,x)=>e.jsxs(Re.Fragment,{children:[p.section&&e.jsx("div",{className:"sv-nav-grp",children:p.section}),p.items.map(t=>e.jsxs("div",{className:`sv-nav-item${n===t.id?" on":""}${t.danger?" danger":""}`,onClick:()=>s(t.id),children:[e.jsx("span",{className:"sv-nav-ic",children:t.icon}),t.label]},t.id)),x<Te.length-2&&e.jsx("div",{className:"sv-nav-sep"})]},x))}),e.jsx("div",{className:"sv-content",children:l?e.jsx(l,{},n):e.jsxs("div",{className:"sv-card",children:[e.jsx(E,{icon:"⚙",title:n.replace(/-/g," ")}),e.jsx("div",{style:{padding:"40px 18px",textAlign:"center",color:"var(--ink4)",fontSize:13},children:"Configuration panel coming soon."})]})})]})]})]})}export{Le as ThemeContext,qr as default};
