import{r as t,j as e}from"./vendor-react-DTmZBiFG.js";const m=`
.apv-wrap{flex:1;overflow:hidden;display:flex;flex-direction:column}
.apv-hd{padding:14px 22px;background:var(--bg2);border-bottom:0.5px solid var(--brd);flex-shrink:0;display:flex;align-items:center;gap:12px}
.apv-title{font-family:"Sora",sans-serif;font-size:19px;font-weight:600;color:var(--ink);letter-spacing:-.02em}
.apv-sub{font-size:12px;color:var(--ink4);margin-top:2px}
.apv-body{flex:1;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--bg);padding:24px}
.apv-chat-wrap{width:100%;max-width:520px;height:100%;max-height:680px;background:var(--bg2);border:0.5px solid var(--brd);border-radius:18px;box-shadow:0 4px 32px rgba(40,40,80,.1);display:flex;flex-direction:column;overflow:hidden}
.apv-chat-hd{padding:14px 16px;border-bottom:0.5px solid var(--brd);display:flex;align-items:center;gap:10px;background:var(--bg2)}
.apv-bot-avatar{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,var(--p),var(--pl));display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;box-shadow:0 2px 8px rgba(75,72,200,.25)}
.apv-bot-name{font-family:"Sora",sans-serif;font-size:13px;font-weight:650;color:var(--ink);letter-spacing:-.01em}
.apv-bot-sub{font-size:11px;color:var(--ink4);margin-top:1px}
.apv-status-dot{width:8px;height:8px;border-radius:50%;background:var(--ok);margin-left:auto}
.apv-preview-badge{font-size:10px;color:var(--p);font-weight:500;background:var(--pp);padding:2px 8px;border-radius:20px}
.apv-thread{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}
.apv-msg{display:flex;flex-direction:column;gap:3px}
.apv-msg.cust{align-items:flex-end}
.apv-msg.asst{align-items:flex-start}
.apv-bubble{padding:10px 13px;font-size:13px;line-height:1.55;max-width:86%}
.apv-bubble.asst{background:var(--bg3);color:var(--ink);border:0.5px solid var(--brd);border-radius:4px 12px 12px 12px}
.apv-bubble.cust{background:var(--p);color:#fff;border-radius:12px 4px 12px 12px}
.apv-qr-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}
.apv-qr{padding:6px 12px;border-radius:20px;font-size:12px;border:0.5px solid var(--brd2);background:var(--bg2);color:var(--p);cursor:pointer;transition:all .12s;font-weight:500}
.apv-qr:hover{background:var(--pp);border-color:var(--p)}
.apv-typing{display:flex;align-items:center;gap:5px;padding:10px 13px;background:var(--bg3);border:0.5px solid var(--brd);border-radius:4px 12px 12px 12px;width:fit-content}
.apv-typing span{width:6px;height:6px;border-radius:50%;background:var(--ink5);animation:apv-bounce 1.2s ease-in-out infinite}
.apv-typing span:nth-child(2){animation-delay:.2s}
.apv-typing span:nth-child(3){animation-delay:.4s}
@keyframes apv-bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}
.apv-input-row{padding:12px 14px;border-top:0.5px solid var(--brd);display:flex;gap:8px;align-items:center;background:var(--bg2)}
.apv-input{flex:1;height:36px;border-radius:10px;border:0.5px solid var(--brd2);background:var(--bg3);padding:0 12px;font-size:13px;color:var(--ink);outline:none;font-family:inherit}
.apv-input:focus{border-color:var(--p);background:var(--bg2)}
.apv-send{width:36px;height:36px;border-radius:10px;background:var(--p);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;transition:background .12s}
.apv-send:hover{background:var(--pl)}
.apv-footer{font-size:10.5px;color:var(--ink5);text-align:center;padding:8px;border-top:0.5px solid var(--brd);background:var(--bg2)}
`,x=[{role:"assistant",text:"Hi! I'm Vak, your Hartwell Residences assistant 👋 Tell me what kind of apartment you're looking for, and I'll show available units that fit your needs.",qr:["2BHK apartment","What's available?","Book a viewing"]}],v={default:{text:"Great question! I'd be happy to help you with that. Could you share a bit more about what you're looking for — like budget range, preferred floor, or must-have amenities?",qr:["Under ₹20,000/mo","High floor preferred","Need parking"]},"2bhk apartment":{text:`We have two 2BHK apartments available right now:

• **Unit 4B** — ₹18,500/mo · Floor 4 · Featured · Gym + Rooftop terrace
• **Unit 7C** — ₹22,000/mo · Floor 7 · Pool + Covered parking

Would you like to book a viewing for either of these?`,qr:["Book viewing for 4B","Book viewing for 7C","Tell me more about 4B"]},"what's available?":{text:`Currently available units:

📦 **Unit 4B** — 2BHK, ₹18,500/mo, available Aug 1
📦 **Unit 7C** — 2BHK, ₹22,000/mo, available Aug 1

Unit 4A is reserved. Would you like to schedule a viewing?`,qr:["Yes, book a viewing","What floor is 4B?","Is parking included?"]}};function k(){const[c,s]=t.useState(x),[n,o]=t.useState(""),[g,p]=t.useState(!1),[b,u]=t.useState(0),d=a=>{if(!a.trim())return;const l={role:"customer",text:a};s(r=>[...r,l]),o(""),p(!0),setTimeout(()=>{const r=a.toLowerCase(),i=v[r]??v.default;p(!1),s(f=>[...f,{role:"assistant",text:i.text,qr:i.qr}])},1200)},h=()=>{s(x),o(""),p(!1),u(a=>a+1)};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:m}),e.jsxs("div",{className:"apv-wrap",children:[e.jsxs("div",{className:"apv-hd",children:[e.jsxs("div",{children:[e.jsx("div",{className:"apv-title",children:"Vak"}),e.jsx("div",{className:"apv-sub",children:"Customer-facing AI · Inventory-aware · Relationship-directed"})]}),e.jsx("div",{style:{marginLeft:"auto",display:"flex",gap:8},children:e.jsx("button",{className:"btn sm",style:{fontFamily:"inherit"},onClick:h,children:"↺ Reset preview"})})]}),e.jsx("div",{className:"apv-body",children:e.jsxs("div",{className:"apv-chat-wrap",children:[e.jsxs("div",{className:"apv-chat-hd",children:[e.jsx("div",{className:"apv-bot-avatar",children:"🤖"}),e.jsxs("div",{children:[e.jsx("div",{className:"apv-bot-name",children:"Vak"}),e.jsx("div",{className:"apv-bot-sub",children:"Hartwell Residences · Active on website"})]}),e.jsxs("div",{style:{marginLeft:"auto",display:"flex",alignItems:"center",gap:8},children:[e.jsx("span",{className:"apv-preview-badge",children:"Preview mode"}),e.jsx("div",{className:"apv-status-dot"})]})]}),e.jsxs("div",{className:"apv-thread",children:[c.map((a,l)=>e.jsxs("div",{className:`apv-msg ${a.role}`,children:[e.jsx("div",{className:`apv-bubble ${a.role}`,style:{whiteSpace:"pre-line"},children:a.text}),a.role==="assistant"&&a.qr&&a.qr.length>0&&e.jsx("div",{className:"apv-qr-row",children:a.qr.map((r,i)=>e.jsx("button",{className:"apv-qr",onClick:()=>d(r),children:r},i))})]},l)),g&&e.jsx("div",{className:"apv-msg asst",children:e.jsxs("div",{className:"apv-typing",children:[e.jsx("span",{}),e.jsx("span",{}),e.jsx("span",{})]})})]}),e.jsxs("div",{className:"apv-input-row",children:[e.jsx("input",{className:"apv-input",placeholder:"Type a message…",value:n,onChange:a=>o(a.target.value),onKeyDown:a=>a.key==="Enter"&&d(n)}),e.jsx("button",{className:"apv-send",onClick:()=>d(n),children:"→"})]}),e.jsx("div",{className:"apv-footer",children:"Powered by Zotra Conversation Assistant · Inventory-aware · Relationship-directed"})]},b)})]})]})}export{k as default};
