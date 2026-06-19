import{r as p,j as e}from"./vendor-react-DTmZBiFG.js";import{a as R,b as I}from"./api-BV-Sjtc4.js";import{u as se}from"./index-Dra5disE.js";const X=[{id:"av-indigo",bg:"#EEF2FF",ring:"#4338CA",color:"#4338CA"},{id:"av-violet",bg:"#F5F3FF",ring:"#7C3AED",color:"#7C3AED"},{id:"av-rose",bg:"#FFF1F2",ring:"#BE123C",color:"#BE123C"},{id:"av-amber",bg:"#FFFBEB",ring:"#B45309",color:"#B45309"},{id:"av-green",bg:"#F0FDF4",ring:"#15803D",color:"#15803D"},{id:"av-cyan",bg:"#ECFEFF",ring:"#0E7490",color:"#0E7490"},{id:"av-slate",bg:"#F1F5F9",ring:"#475569",color:"#475569"},{id:"av-fuchsia",bg:"#FDF4FF",ring:"#A21CAF",color:"#A21CAF"}],te=["Asia/Kolkata (IST +5:30)","America/New_York (EST)","Europe/London (GMT)","America/Los_Angeles (PST)"],re=["English (US)","English (UK)","Hindi"],oe=2*1024*1024,Y=`
/* ── Root ── */
.pp-root {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg);
}

/* ── Page header — slim, professional ── */
.pp-hd {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 28px 18px;
  background: var(--bg2);
  border-bottom: 0.5px solid var(--brd);
  flex-shrink: 0;
  background: var(--pp);
}
.pp-hd-avatar {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  font-weight: 800;
  color: #fff;
  flex-shrink: 0;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(85,82,201,0.22);
  font-family: "Sora", sans-serif;
  letter-spacing: -0.02em;
  position: relative;
}
.pp-hd-avatar img { width: 100%; height: 100%; object-fit: cover; }
.pp-hd-avatar-dot {
  position: absolute;
  bottom: 1px;
  right: 1px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #22c55e;
  border: 1.5px solid var(--bg2);
}
.pp-hd-info { flex: 1; min-width: 0; }
.pp-hd-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--ink);
  font-family: "Sora", sans-serif;
  letter-spacing: -0.02em;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pp-hd-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 3px;
  flex-wrap: wrap;
}
.pp-hd-badge {
  font-size: 10.5px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
  background: var(--pp);
  color: var(--p);
  letter-spacing: 0.01em;
}
.pp-hd-email {
  font-size: 11px;
  color: var(--ink4);
  font-family: "DM Mono", monospace;
}
.pp-hd-sep {
  width: 1px;
  height: 32px;
  background: var(--brd);
  flex-shrink: 0;
  margin: 0 4px;
}
.pp-hd-stat {
  text-align: center;
  padding: 0 12px;
  flex-shrink: 0;
}
.pp-hd-stat-val {
  font-size: 16px;
  font-weight: 800;
  color: var(--p);
  font-family: "Sora", sans-serif;
  letter-spacing: -0.03em;
  line-height: 1;
}
.pp-hd-stat-lbl {
  font-size: 10px;
  color: var(--ink5);
  font-weight: 500;
  margin-top: 1px;
  white-space: nowrap;
}

/* ── Body: two-column grid ── */
.pp-body {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 316px;
  gap: 20px;
  padding: 20px 28px;
  overflow-y: auto;
  align-items: start;
  scrollbar-width: thin;
  scrollbar-color: var(--brd2) transparent;
  min-height: 0;
}
.pp-body::-webkit-scrollbar { width: 4px; }
.pp-body::-webkit-scrollbar-thumb { background: var(--brd2); border-radius: 4px; }

.pp-col-left  { display: flex; flex-direction: column; gap: 16px; }
.pp-col-right { display: flex; flex-direction: column; gap: 16px; }

/* ── Card ── */
.pp-card {
  background: var(--bg2);
  border: 0.5px solid var(--brd);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(40,40,80,0.05);
}
.pp-card-hdr {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border-bottom: 0.5px solid var(--brd);
}
.pp-card-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  flex-shrink: 0;
  background: var(--pp);
  color: var(--p);
}
.pp-card-title {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--ink);
  font-family: "Sora", sans-serif;
  letter-spacing: -0.01em;
}
.pp-card-sub {
  font-size: 11px;
  color: var(--ink4);
  margin-top: 1px;
}

/* ── Form fields ── */
.pp-fields-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  padding: 16px 18px;
  border-bottom: 0.5px solid var(--brd);
}
.pp-fields-2col:last-of-type { border-bottom: none; }
.pp-fields-1col {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px 18px;
  border-bottom: 0.5px solid var(--brd);
}
.pp-fields-1col:last-of-type { border-bottom: none; }

.pp-field-group { display: flex; flex-direction: column; gap: 5px; }
.pp-label {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: 0.01em;
}
.pp-label-sub {
  font-size: 10.5px;
  color: var(--ink4);
  line-height: 1.4;
  margin-top: -3px;
  margin-bottom: 2px;
}
.pp-input {
  height: 32px;
  padding: 0 11px;
  border-radius: 8px;
  border: 0.5px solid var(--brd2);
  background: var(--bg3);
  font-size: 12px;
  color: var(--ink);
  font-family: "DM Sans", sans-serif;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  transition: border-color .12s, box-shadow .12s;
}
.pp-input:focus {
  border-color: var(--p);
  background: var(--bg2);
  box-shadow: 0 0 0 2.5px rgba(85,82,201,0.09);
}
.pp-select {
  height: 32px;
  padding: 0 30px 0 11px;
  border-radius: 8px;
  border: 0.5px solid var(--brd2);
  background: var(--bg3);
  font-size: 12px;
  color: var(--ink);
  font-family: "DM Sans", sans-serif;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2388889A'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 9px center;
  transition: border-color .12s, box-shadow .12s;
}
.pp-select:focus {
  border-color: var(--p);
  background-color: var(--bg2);
  box-shadow: 0 0 0 2.5px rgba(85,82,201,0.09);
}

/* ── Avatar preset picker ── */
.pp-presets {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 2px;
}
.pp-preset-swatch {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10.5px;
  font-weight: 800;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color .12s, transform .1s, box-shadow .12s;
  user-select: none;
  flex-shrink: 0;
  font-family: "Sora", sans-serif;
}
.pp-preset-swatch:hover { transform: scale(1.1); }
.pp-preset-swatch.pp-active { box-shadow: 0 0 0 2.5px rgba(85,82,201,0.18); }

/* ── Photo upload ── */
.pp-photo-preview {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 10px 12px;
  background: var(--bg3);
  border-radius: 9px;
  border: 0.5px solid var(--brd2);
  margin-top: 6px;
}
.pp-photo-thumb {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 0.5px solid var(--brd2);
  overflow: hidden;
  flex-shrink: 0;
}
.pp-photo-thumb img { width: 100%; height: 100%; object-fit: cover; }
.pp-photo-name { font-size: 12px; font-weight: 600; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pp-photo-meta { font-size: 10.5px; color: var(--ink5); margin-top: 1px; }
.pp-dropzone {
  position: relative;
  border: 1.5px dashed var(--brd3);
  border-radius: 10px;
  padding: 16px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: border-color .15s, background .15s;
  background: var(--bg3);
  margin-top: 6px;
}
.pp-dropzone.pp-drag {
  border-color: var(--p);
  background: color-mix(in srgb, var(--p) 5%, transparent);
}
.pp-dropzone-icon {
  width: 36px; height: 36px;
  border-radius: 9px;
  background: var(--bg2);
  border: 0.5px solid var(--brd2);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; flex-shrink: 0;
}
.pp-dropzone-browse {
  pointer-events: none;
  flex-shrink: 0;
  padding: 6px 12px;
  border-radius: 7px;
  border: 0.5px solid var(--brd2);
  background: var(--bg2);
  font-size: 11.5px;
  font-weight: 600;
  color: var(--ink);
  white-space: nowrap;
}
.pp-photo-action-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.pp-photo-btn-row { display: flex; gap: 6px; flex-shrink: 0; }

/* ── Save footer ── */
.pp-save {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 18px;
  border-top: 0.5px solid var(--brd);
  background: var(--bg2);
}

/* ── Right column: stat chips ── */
.pp-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 14px 18px;
}
.pp-stat {
  background: var(--bg3);
  border: 0.5px solid var(--brd);
  border-radius: 10px;
  padding: 11px 12px;
  text-align: center;
}
.pp-stat-val {
  font-size: 18px;
  font-weight: 800;
  color: var(--p);
  font-family: "Sora", sans-serif;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 3px;
}
.pp-stat-lbl {
  font-size: 10px;
  color: var(--ink4);
  font-weight: 500;
}

/* ── Right column: security & activity rows ── */
.pp-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 18px;
  border-bottom: 0.5px solid var(--brd);
  gap: 10px;
}
.pp-row:last-child { border-bottom: none; }
.pp-row-lbl { font-size: 12px; font-weight: 500; color: var(--ink); }
.pp-row-sub { font-size: 10.5px; color: var(--ink4); margin-top: 1px; }

.pp-act-row {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  padding: 9px 18px;
  border-bottom: 0.5px solid var(--brd);
}
.pp-act-row:last-child { border-bottom: none; }
.pp-act-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--p);
  flex-shrink: 0;
  margin-top: 4px;
  opacity: 0.55;
}
.pp-act-text { font-size: 11.5px; color: var(--ink3); line-height: 1.4; flex: 1; }
.pp-act-time { font-size: 10.5px; color: var(--ink5); flex-shrink: 0; font-family: "DM Mono", monospace; white-space: nowrap; }

/* ── Toggle ── */
.pp-tg{position:relative;display:inline-block;width:34px;height:19px;min-width:34px;cursor:pointer}
.pp-tg input{opacity:0;width:0;height:0;position:absolute}
.pp-tg-track{position:absolute;inset:0;border-radius:20px;background:var(--ink6);transition:background .2s}
.pp-tg input:checked+.pp-tg-track{background:var(--p)}
.pp-tg-thumb{position:absolute;top:2.5px;left:2.5px;width:14px;height:14px;border-radius:50%;background:#fff;transition:transform .2s;box-shadow:0 1px 4px rgba(0,0,0,.18)}
.pp-tg input:checked~.pp-tg-thumb{transform:translateX(15px)}

/* ── Buttons ── */
.pp-btn {
  height: 30px;
  padding: 0 12px;
  border-radius: 8px;
  border: 0.5px solid var(--brd2);
  background: var(--bg2);
  font-size: 11.5px;
  color: var(--ink2);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: inherit;
  transition: all .12s;
  white-space: nowrap;
  flex-shrink: 0;
}
.pp-btn:hover { background: var(--pu); border-color: var(--brd3); color: var(--p); }
.pp-btn.pp-pri { background: var(--p); border-color: var(--p); color: #fff; font-weight: 600; }
.pp-btn.pp-pri:hover { opacity: 0.88; }
.pp-btn.pp-sm { height: 26px; padding: 0 10px; font-size: 11px; border-radius: 7px; }
.pp-btn.pp-xs { height: 22px; padding: 0 8px; font-size: 10.5px; border-radius: 6px; }
.pp-btn:disabled { opacity: .5; cursor: not-allowed; pointer-events: none; }

/* ── Error ── */
.pp-api-error {
  display: flex; gap: 8px; align-items: center;
  padding: 9px 14px;
  font-size: 11.5px; color: var(--wa);
  background: var(--wab); border-radius: 9px;
  border: 0.5px solid rgba(185,28,28,0.15);
  margin-bottom: 12px;
}

/* ── Toast ── */
.pp-toast {
  position: fixed; bottom: 22px; right: 22px;
  padding: 10px 16px; border-radius: 10px;
  font-size: 12.5px; font-weight: 500; color: #fff;
  z-index: 9999; display: flex; align-items: center; gap: 7px;
  box-shadow: 0 4px 20px rgba(0,0,0,.18);
  animation: ppToastIn .2s ease;
}
.pp-toast.ok { background: #1B6B4A; }
.pp-toast.err { background: #B91C1C; }
@keyframes ppToastIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

/* ── Skeleton ── */
.pp-skel { background:linear-gradient(90deg,var(--bg3) 25%,var(--brd) 50%,var(--bg3) 75%); background-size:200% 100%; animation:ppShimmer 1.4s infinite; border-radius:6px; }
@keyframes ppShimmer { to{background-position:-200% 0} }
`;function ie({checked:o,onChange:s,disabled:n=!1}){return e.jsxs("label",{className:"pp-tg",children:[e.jsx("input",{type:"checkbox",checked:o,disabled:n,onChange:l=>s(l.target.checked)}),e.jsx("span",{className:"pp-tg-track"}),e.jsx("span",{className:"pp-tg-thumb"})]})}function pe({msg:o,type:s}){return e.jsxs("div",{className:`pp-toast ${s}`,children:[s==="ok"?"✓":"✕"," ",o]})}function le(o){return o?o<1024?`${o} B`:o<1024*1024?`${(o/1024).toFixed(1)} KB`:`${(o/(1024*1024)).toFixed(1)} MB`:""}function T({icon:o,iconBg:s,iconColor:n,title:l,sub:x,children:g}){return e.jsxs("div",{className:"pp-card",children:[e.jsxs("div",{className:"pp-card-hdr",children:[e.jsx("div",{className:"pp-card-icon",style:{background:s??"var(--pp)",color:n??"var(--p)"},children:o}),e.jsxs("div",{children:[e.jsx("div",{className:"pp-card-title",children:l}),x&&e.jsx("div",{className:"pp-card-sub",children:x})]})]}),g]})}function ne({value:o,initials:s,onChange:n}){return e.jsxs("div",{className:"pp-presets",children:[X.map(l=>{const x=o===l.id;return e.jsx("div",{onClick:()=>n(x?"":l.id),title:l.id.replace("av-",""),className:"pp-preset-swatch"+(x?" pp-active":""),style:{background:l.bg,color:l.color,borderColor:x?l.ring:"transparent"},onMouseEnter:g=>{g.currentTarget.style.transform="scale(1.12)"},onMouseLeave:g=>{g.currentTarget.style.transform="scale(1)"},children:s||"??"},l.id)}),o&&e.jsx("button",{className:"pp-btn pp-xs",onClick:()=>n(""),children:"Clear"})]})}const de=({currentDisplayUrl:o,currentRemoteUrl:s,onFileChange:n})=>{var P;const[l,x]=p.useState(o),[g,y]=p.useState(o?s?((P=s.split("/").pop())==null?void 0:P.split("?")[0])??"Current photo":"Current photo":""),[u,S]=p.useState(0),[B,b]=p.useState(!!s),[E,j]=p.useState(!1),F=p.useRef(null);p.useEffect(()=>{var i;x(o),o&&!o.startsWith("data:")&&(y(s?((i=s.split("/").pop())==null?void 0:i.split("?")[0])??"photo.jpg":"photo.jpg"),b(!0)),S(0)},[o,s]);const v=p.useCallback(i=>{if(i.size>oe){alert("File exceeds 2 MB limit.");return}const d=new FileReader;d.onload=c=>{var m;const w=(m=c.target)==null?void 0:m.result;x(w),y(i.name),S(i.size),b(!1),n(i,w)},d.readAsDataURL(i)},[n]),U=()=>{x(""),y(""),S(0),b(!1),n(null,"")};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",width:"100%"},children:[e.jsxs("div",{className:"pp-photo-action-row",children:[e.jsxs("div",{children:[e.jsx("div",{className:"pp-label",children:"Profile photo"}),e.jsx("div",{className:"pp-label-sub",children:"JPEG, PNG or WebP · max 2 MB · first priority over avatar"})]}),l&&e.jsxs("div",{className:"pp-photo-btn-row",children:[e.jsx("button",{className:"pp-btn pp-sm",onClick:U,children:"Remove"}),e.jsxs("label",{className:"pp-btn pp-sm pp-pri",style:{cursor:"pointer"},children:["Replace",e.jsx("input",{type:"file",accept:"image/png,image/jpeg,image/webp",style:{display:"none"},onChange:i=>{var c;const d=(c=i.target.files)==null?void 0:c[0];d&&v(d),i.target.value=""}})]})]})]}),l&&e.jsxs("div",{className:"pp-photo-preview",children:[e.jsx("div",{className:"pp-photo-thumb",children:e.jsx("img",{src:l,alt:"profile"})}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{className:"pp-photo-name",children:g||"photo.jpg"}),u>0&&e.jsx("div",{className:"pp-photo-meta",children:le(u)}),B&&u===0&&e.jsx("div",{className:"pp-photo-meta",children:"Saved to cloud storage"})]})]}),!l&&e.jsxs("div",{ref:F,className:"pp-dropzone"+(E?" pp-drag":""),onDragOver:i=>{i.preventDefault(),j(!0)},onDragLeave:()=>j(!1),onDrop:i=>{var c;i.preventDefault(),j(!1);const d=(c=i.dataTransfer.files)==null?void 0:c[0];d&&v(d)},children:[e.jsx("input",{type:"file",accept:"image/png,image/jpeg,image/webp",style:{position:"absolute",inset:0,opacity:0,cursor:"pointer",width:"100%",height:"100%"},onChange:i=>{var c;const d=(c=i.target.files)==null?void 0:c[0];d&&v(d),i.target.value=""}}),e.jsx("div",{className:"pp-dropzone-icon",children:"🧑‍💼"}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsxs("div",{style:{fontSize:12,fontWeight:600,color:"var(--ink)",marginBottom:2},children:["Click to upload ",e.jsx("span",{style:{fontWeight:400,color:"var(--ink5)"},children:"or drag & drop"})]}),e.jsx("div",{style:{fontSize:11,color:"var(--ink5)"},children:"JPEG, PNG or WebP · max 2 MB"})]}),e.jsx("div",{className:"pp-dropzone-browse",children:"Browse file"})]})]})};function ge(){const{setProfileImage:o}=se(),[s,n]=p.useState({fullName:"",email:"",jobRole:"",timezone:"Asia/Kolkata (IST +5:30)",language:"English (US)",avatarPreset:""}),[l,x]=p.useState(null),[g,y]=p.useState(null),[u,S]=p.useState(""),[B,b]=p.useState(!0),[E,j]=p.useState(!1),[F,v]=p.useState(null),[U,P]=p.useState(!0),[i,d]=p.useState(null),[c,w]=p.useState(null),[m,_]=p.useState(""),[N,z]=p.useState(""),G=p.useRef([]);function D(a){a.startsWith("blob:")&&G.current.push(a)}p.useEffect(()=>()=>{G.current.forEach(a=>URL.revokeObjectURL(a))},[]);function $(a,r="ok"){d({msg:a,type:r}),setTimeout(()=>d(null),3e3)}function L(){const a=localStorage.getItem("zotra_token");return{"Content-Type":"application/json",...a?{Authorization:`Bearer ${a}`}:{}}}function Z(){const a=localStorage.getItem("zotra_token");return a?{Authorization:`Bearer ${a}`}:{}}function V(a){return a.split(" ").filter(Boolean).map(r=>r[0]).join("").toUpperCase().slice(0,2)||"??"}function q(){try{const a=localStorage.getItem("zotra_token");if(!a)return null;const r=a.split(".")[1];if(!r)return null;const t=JSON.parse(atob(r.replace(/-/g,"+").replace(/_/g,"/")));return t.userId||t.user_id||t.sub||t.id||null}catch{return null}}async function M(a){if(!a)return"";if(a.startsWith("data:")||a.startsWith("blob:"))return a;try{const r=localStorage.getItem("zotra_token"),t=await fetch(a,{headers:r?{Authorization:`Bearer ${r}`}:{}});if(!t.ok)throw new Error(`${t.status}`);return URL.createObjectURL(await t.blob())}catch{return a}}p.useEffect(()=>{b(!0);const a=localStorage.getItem("zotra_userId")||localStorage.getItem("zotra_user_id")||localStorage.getItem("userId")||localStorage.getItem("user_id")||q();if(a){H(a);return}const r=localStorage.getItem("zotra_email")||localStorage.getItem("email")||"";R(`${I()}/users`,{headers:L()}).then(t=>{if(!t.ok)throw new Error(`${t.status}`);return t.json()}).then(t=>{const h=r?t.find(f=>f.email.toLowerCase()===r.toLowerCase()):t[0];if(!h)throw new Error("Current user not found in /users list");H(h.userId)}).catch(t=>{v(t.message),b(!1)})},[]);async function H(a){y(a);try{const r=await R(`${I()}/users/${a}`,{headers:L()});if(!r.ok)throw new Error(`${r.status}`);const t=await r.json(),h={fullName:t.fullName??"",email:t.email??"",jobRole:t.jobRole??t.role??"",timezone:t.timezone||"Asia/Kolkata (IST +5:30)",language:t.language||"English (US)",avatarPreset:t.avatarPreset??""};n(h),x(h),S(t.role??""),v(null);const f=localStorage.getItem("zotra_profileUrl")??"",A=localStorage.getItem("zotra_avatar")??"",C=t.profileUrl??"",ae=t.avatar??"",W=f||C||A||ae||"";if(_(W),W){const K=await M(W);D(K),z(K)}else z("")}catch(r){v(r.message)}finally{b(!1)}}function k(a,r){n(t=>({...t,[a]:r}))}async function Q(){if(!g){$("User ID not resolved — cannot save","err");return}j(!0);try{const a=new FormData;a.append("FullName",s.fullName),a.append("Email",s.email),a.append("JobRole",s.jobRole),a.append("Timezone",s.timezone),a.append("Language",s.language),s.avatarPreset&&a.append("AvatarPreset",s.avatarPreset),c?a.append("ProfileImage",c):m&&(m.startsWith("http://")||m.startsWith("https://"))&&a.append("ProfileUrl",m);const r=await R(`${I()}/users/${g}`,{method:"PATCH",headers:Z(),body:a});if(!r.ok)throw new Error(`${r.status}`);const t=await R(`${I()}/users/${g}`,{headers:L()});let h=m;if(t.ok){const A=await t.json(),C=A.profileUrl??A.avatar??"";C&&(h=C)}let f="";h?(f=await M(h),D(f)):c&&!h&&(f=N),_(h),z(f),w(null),x({...s}),localStorage.setItem("zotra_profileUrl",h),localStorage.setItem("zotra_avatar",""),o(h,""),window.dispatchEvent(new CustomEvent("zotra:profile-updated",{detail:{profileUrl:h}})),$("Profile saved successfully")}catch(a){$(`Save failed: ${a.message}`,"err")}finally{j(!1)}}const O=X.find(a=>a.id===s.avatarPreset),J=V(s.fullName),ee=O?{background:O.bg,color:O.color}:{background:"linear-gradient(135deg,var(--p),var(--pl))",color:"#fff"};return B?e.jsxs(e.Fragment,{children:[e.jsx("style",{children:Y}),e.jsxs("div",{className:"pp-root",children:[e.jsxs("div",{className:"pp-hd",children:[e.jsx("div",{className:"pp-skel",style:{width:48,height:48,borderRadius:14,flexShrink:0}}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{className:"pp-skel",style:{height:14,width:140,marginBottom:8}}),e.jsx("div",{className:"pp-skel",style:{height:11,width:200}})]})]}),e.jsxs("div",{className:"pp-body",children:[e.jsx("div",{className:"pp-col-left",children:e.jsx("div",{className:"pp-card",children:[...Array(3)].map((a,r)=>e.jsx("div",{className:"pp-fields-2col",style:{borderBottom:r<2?"0.5px solid var(--brd)":"none"},children:[0,1].map(t=>e.jsxs("div",{className:"pp-field-group",children:[e.jsx("div",{className:"pp-skel",style:{height:11,width:80,marginBottom:4}}),e.jsx("div",{className:"pp-skel",style:{height:32,borderRadius:8}})]},t))},r))})}),e.jsx("div",{className:"pp-col-right",children:e.jsxs("div",{className:"pp-card",children:[e.jsxs("div",{className:"pp-card-hdr",children:[e.jsx("div",{className:"pp-skel",style:{width:28,height:28,borderRadius:8}}),e.jsx("div",{className:"pp-skel",style:{height:12,width:100}})]}),e.jsx("div",{className:"pp-stats",children:[...Array(4)].map((a,r)=>e.jsx("div",{className:"pp-skel",style:{height:56,borderRadius:10}},r))})]})})]})]})]}):e.jsxs(e.Fragment,{children:[e.jsx("style",{children:Y}),i&&e.jsx(pe,{msg:i.msg,type:i.type}),e.jsxs("div",{className:"pp-root",children:[e.jsxs("div",{className:"pp-hd",children:[e.jsxs("div",{className:"pp-hd-avatar",style:N?{}:ee,children:[N?e.jsx("img",{src:N,alt:s.fullName}):J,e.jsx("div",{className:"pp-hd-avatar-dot"})]}),e.jsxs("div",{className:"pp-hd-info",children:[e.jsx("div",{className:"pp-hd-name",children:s.fullName||"—"}),e.jsxs("div",{className:"pp-hd-meta",children:[u&&e.jsx("span",{className:"pp-hd-badge",children:u}),s.jobRole&&s.jobRole!==u&&e.jsx("span",{className:"pp-hd-badge",style:{background:"var(--bg3)",color:"var(--ink3)",border:"0.5px solid var(--brd2)"},children:s.jobRole}),s.email&&e.jsx("span",{className:"pp-hd-email",children:s.email})]})]}),e.jsx("div",{className:"pp-hd-sep"}),e.jsxs("div",{className:"pp-hd-stat",children:[e.jsx("div",{className:"pp-hd-stat-val",children:"7"}),e.jsx("div",{className:"pp-hd-stat-lbl",children:"Accounts"})]}),e.jsxs("div",{className:"pp-hd-stat",children:[e.jsx("div",{className:"pp-hd-stat-val",children:"14"}),e.jsx("div",{className:"pp-hd-stat-lbl",children:"Opps"})]}),e.jsxs("div",{className:"pp-hd-stat",children:[e.jsx("div",{className:"pp-hd-stat-val",children:"13"}),e.jsx("div",{className:"pp-hd-stat-lbl",children:"Intakes"})]})]}),e.jsxs("div",{className:"pp-body",children:[e.jsxs("div",{className:"pp-col-left",children:[F&&e.jsxs("div",{className:"pp-api-error",children:[e.jsx("span",{children:"⚠"}),e.jsxs("span",{children:["Could not reach API (",F,"). Some fields may be empty."]})]}),e.jsxs(T,{icon:"👤",title:"Identity",sub:"How you appear across the platform",children:[e.jsxs("div",{className:"pp-fields-2col",children:[e.jsxs("div",{className:"pp-field-group",children:[e.jsx("label",{className:"pp-label",children:"Full name"}),e.jsx("div",{className:"pp-label-sub",children:"Displayed across the app and in exports"}),e.jsx("input",{className:"pp-input",value:s.fullName,onChange:a=>k("fullName",a.target.value)})]}),e.jsxs("div",{className:"pp-field-group",children:[e.jsx("label",{className:"pp-label",children:"Email address"}),e.jsx("div",{className:"pp-label-sub",children:"Used for login and notifications"}),e.jsx("input",{className:"pp-input",value:s.email,onChange:a=>k("email",a.target.value)})]})]}),e.jsxs("div",{className:"pp-fields-2col",children:[e.jsxs("div",{className:"pp-field-group",children:[e.jsx("label",{className:"pp-label",children:"Role / Title"}),e.jsx("div",{className:"pp-label-sub",children:"Shown on opportunity reports"}),e.jsx("input",{className:"pp-input",value:s.jobRole,onChange:a=>k("jobRole",a.target.value)})]}),e.jsxs("div",{className:"pp-field-group",children:[e.jsx("label",{className:"pp-label",children:"Timezone"}),e.jsx("div",{className:"pp-label-sub",children:" "}),e.jsx("select",{className:"pp-select",value:s.timezone,onChange:a=>k("timezone",a.target.value),children:te.map(a=>e.jsx("option",{value:a,children:a},a))})]})]}),e.jsxs("div",{className:"pp-fields-2col",style:{borderBottom:"none"},children:[e.jsxs("div",{className:"pp-field-group",children:[e.jsx("label",{className:"pp-label",children:"Language"}),e.jsx("div",{className:"pp-label-sub",children:"Interface display language"}),e.jsx("select",{className:"pp-select",value:s.language,onChange:a=>k("language",a.target.value),children:re.map(a=>e.jsx("option",{value:a,children:a},a))})]}),e.jsx("div",{})]})]}),e.jsxs(T,{icon:"🎨",title:"Appearance",sub:"Avatar colour and profile photo",children:[e.jsxs("div",{className:"pp-fields-1col",children:[e.jsxs("div",{className:"pp-field-group",children:[e.jsx("label",{className:"pp-label",children:"Avatar colour"}),e.jsx("div",{className:"pp-label-sub",children:N?"Remove your photo above to use an initials avatar instead.":"Pick a colour for your initials avatar. Uploading a photo overrides this."}),e.jsx(ne,{value:s.avatarPreset,initials:J,onChange:a=>k("avatarPreset",a)})]}),e.jsx(de,{currentDisplayUrl:N,currentRemoteUrl:m,onFileChange:(a,r)=>{w(a),z(r),a||_("")}})]}),e.jsxs("div",{className:"pp-save",children:[e.jsx("button",{className:"pp-btn",onClick:async()=>{if(l){n({...l});const a=m?await M(m):"";a&&D(a),z(a),w(null)}},children:"Reset to loaded"}),e.jsx("button",{className:"pp-btn pp-pri",onClick:Q,disabled:E||!g,children:E?"Saving…":"Save changes"})]})]})]}),e.jsxs("div",{className:"pp-col-right",children:[e.jsxs(T,{icon:"🔑",title:"Security",sub:"Password and active sessions",children:[e.jsxs("div",{className:"pp-row",children:[e.jsxs("div",{children:[e.jsx("div",{className:"pp-row-lbl",children:"Password"}),e.jsx("div",{className:"pp-row-sub",children:"Update your account password"})]}),e.jsx("button",{className:"pp-btn pp-sm",children:"Change"})]}),e.jsxs("div",{className:"pp-row",children:[e.jsxs("div",{children:[e.jsx("div",{className:"pp-row-lbl",children:"Two-factor auth"}),e.jsx("div",{className:"pp-row-sub",children:"Authenticator app enabled"})]}),e.jsx(ie,{checked:U,onChange:P})]}),e.jsxs("div",{className:"pp-row",children:[e.jsxs("div",{children:[e.jsx("div",{className:"pp-row-lbl",children:"Active sessions"}),e.jsx("div",{className:"pp-row-sub",children:"2 devices signed in"})]}),e.jsx("button",{className:"pp-btn pp-sm",children:"Sign out others"})]})]}),e.jsxs(T,{icon:"⚡",title:"Recent activity",sub:"Last 4 actions",children:[e.jsxs("div",{className:"pp-act-row",children:[e.jsx("div",{className:"pp-act-dot"}),e.jsx("div",{className:"pp-act-text",children:"Signed in via web browser"}),e.jsx("div",{className:"pp-act-time",children:"Today"})]}),e.jsxs("div",{className:"pp-act-row",children:[e.jsx("div",{className:"pp-act-dot",style:{opacity:.4}}),e.jsx("div",{className:"pp-act-text",children:"Updated account profile"}),e.jsx("div",{className:"pp-act-time",children:"2d ago"})]}),e.jsxs("div",{className:"pp-act-row",children:[e.jsx("div",{className:"pp-act-dot",style:{opacity:.3}}),e.jsx("div",{className:"pp-act-text",children:"Added new intake record"}),e.jsx("div",{className:"pp-act-time",children:"4d ago"})]}),e.jsxs("div",{className:"pp-act-row",children:[e.jsx("div",{className:"pp-act-dot",style:{opacity:.2}}),e.jsx("div",{className:"pp-act-text",children:"Moved opportunity to Proposal"}),e.jsx("div",{className:"pp-act-time",children:"1w ago"})]})]})]})]})]})]})}export{ge as P};
