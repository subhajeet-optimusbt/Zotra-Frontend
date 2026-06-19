import React, { useState, useEffect } from "react";
import {
  Sunrise, Calendar, CheckSquare, Activity, Moon,
  Check, TriangleAlert, Receipt, Radar, FileCheck,
  Sparkles, Send, Edit3, RotateCw, X, CheckCheck,
  Sun, Sunset, BarChart3, RefreshCw, Clock, Settings,
  PenLine, AlertCircle, Plus,
} from "lucide-react";

// ── Design tokens — all hardcoded hex, zero CSS vars ─────────────────────────
const C = {
  p:"#5552C9", pl:"#7370E0", pd:"#3B38A8", pp:"#EEEDF9", pu:"#F4F3FC",
  t:"#1A9E7C", tp:"#E0F4EF", td:"#0F6050",
  amber:"#D97757", amberp:"#FCEFE7",
  ink:"var(--ink)", ink2:"var(--ink2)", ink3:"var(--ink3)", ink4:"var(--ink4)", ink5:"var(--ink5)",
  bg:"#F6F6FB", bg2:"var(--bg2)", bg3:"#EFEFF7", bg4:"#E7E7F2",
  brd:"var(--brd)", brd2:"var(--brd2)",
  ok:"#1D9E75", okb:"#E6FAF1", okf:"#0B5E45",
  wa:"#C17B2A", wab:"#FBF1DE", waf:"#7C4C12",
  ri:"#D7384F", rib:"#FBE6EA", rif:"#891322",
  shS:"0 1px 2px rgba(60,50,150,.04),0 0 0 0.5px rgba(60,50,150,.06)",
  shM:"0 2px 8px rgba(60,50,150,.06),0 0 0 0.5px rgba(60,50,150,.07)",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const AV:[string,string][] = [
  ["#5552C9","#7370E0"],["#1A9E7C","#2BBF97"],["#D97757","#EAA47C"],
  ["#E5566C","#F07788"],["#3F75DC","#6398F0"],["#7A4EDB","#9E78EE"],["#1F8A5B","#34A974"],
];
const avGrad = (n:string)=>AV[(n.charCodeAt(0)+(n.charCodeAt(1)||0))%7];
const inits  = (n:string)=>n.split(" ").slice(0,2).map(p=>p[0]).join("").toUpperCase();

function useNow(){
  const [now,setNow]=useState(new Date());
  useEffect(()=>{const id=setInterval(()=>setNow(new Date()),60000);return()=>clearInterval(id);},[]);
  const h=now.getHours(),m=now.getMinutes();
  return{h,m,fmt:(n:number)=>String(n).padStart(2,"0")};
}

const PILL:Record<string,[string,string]>={
  ok:[C.okb,C.okf],wa:[C.wab,C.waf],ri:[C.rib,C.rif],
  br:[C.pp,C.pd],te:[C.tp,C.td],mu:[C.bg3,C.ink3],
};

function Av({name,size=22,r=7}:{name:string;size?:number;r?:number}){
  const [a,b]=avGrad(name);
  return <div style={{width:size,height:size,borderRadius:r,flexShrink:0,background:`linear-gradient(135deg,${a},${b})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:size*.4,fontWeight:700}}>{inits(name)}</div>;
}

function Btn({ch,pr,xs,full,onClick}:{ch:React.ReactNode;pr?:boolean;xs?:boolean;full?:boolean;onClick?:(e:React.MouseEvent)=>void}){
  return(
    <button onClick={onClick} style={{display:"inline-flex",alignItems:"center",gap:xs?3:5,height:xs?20:24,padding:xs?"0 7px":"0 10px",borderRadius:xs?5:6,border:`0.5px solid ${pr?C.p:C.brd2}`,background:pr?C.p:C.bg2,color:pr?"#fff":C.ink2,fontSize:xs?10.5:11,fontWeight:pr?600:500,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",width:full?"100%":undefined,justifyContent:full?"center":undefined}}>
      {ch}
    </button>
  );
}

function SectRow({label,right}:{label:string;right?:React.ReactNode}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
      <span style={{fontSize:9.5,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.ink5}}>{label}</span>
      <div style={{flex:1,height:.5,background:C.brd}}/>
      {right&&<span style={{fontFamily:"monospace",fontSize:9,background:C.bg3,color:C.ink4,border:`0.5px solid ${C.brd2}`,padding:"1px 6px",borderRadius:5}}>{right}</span>}
    </div>
  );
}

// ─────────────────────────── MORNING PANE ────────────────────────────────────
const PLAN=[
  {id:"northwind",urgency:"approval",accent:"#5552C9",icBg:"#EEEDF9",icFg:"#5552C9",priority:1,
   title:"Send Northwind redline reply",
   sub:"Sasha replied last night — clause 4.2 on auto-renewal. Zotra drafted the redline. One-click to send.",
   time:"9:30",area:"Opportunity",areaC:"br",status:"Draft ready",statusC:"ok",
   draft:"Sasha — happy to go 30-day notice on auto-renewal. Sending the revised redline now so we're good for Thursday. Want me to book a quick 10-min walk-through Thursday AM before signature? — Elena",
   acts:["Send draft","Edit first","Review MSA"],Ic:FileCheck},
  {id:"kairo",urgency:"urgent",accent:"#D7384F",icBg:"#FBE6EA",icFg:"#D7384F",priority:2,
   title:"Stabilise Kairo Health — champion risk",
   sub:"Maya Chen's LinkedIn shows she's open to new roles. Zotra recommends looping in Lena Park (VP Product) today.",
   time:"11:00",area:"Opportunity",areaC:"br",status:"High risk",statusC:"ri",
   acts:["Email Lena Park","View opportunity","Ask Zotra"],Ic:TriangleAlert},
  {id:"northside",urgency:"urgent",accent:"#D7384F",icBg:"#FBE6EA",icFg:"#D7384F",priority:3,
   title:"Escalate Northside invoice — Day 22",
   sub:"Invoice #1041 ($2,200) is 8 days overdue. Two reminders sent, no response. Zotra suggests a call.",
   time:"14:00",area:"Finance",areaC:"wa",status:"Day 22",statusC:"ri",
   acts:["Call Julie","Send escalation","View invoice"],Ic:Receipt},
  {id:"metro",urgency:"",accent:"#C17B2A",icBg:"#FBF1DE",icFg:"#C17B2A",priority:4,
   title:"Resolve Metro scope drift",
   sub:"Metro Content effort is +22% above estimate. Margin has fallen to 16%. A change order is needed.",
   time:"15:30",area:"Project",areaC:"mu",status:"Watch",statusC:"wa",
   acts:["Draft change order","Email Troy","View project"],Ic:TriangleAlert},
  {id:"acme",urgency:"",accent:"#5552C9",icBg:"#EEEDF9",icFg:"#5552C9",priority:5,
   title:"Re-engage Acme Robotics",
   sub:"4 visitors from acme.io on /pricing and /security this morning. Draft re-engage is ready.",
   time:"16:00",area:"Opportunity",areaC:"br",status:"Hot intent",statusC:"ok",
   draft:"Hi Dana — noticed your team was back on our site this morning. The pricing questions you had in March — happy to walk through the updated numbers on a quick call this week. Worth 30 min? — Elena",
   acts:["Send re-engage","Edit draft","View opportunity"],Ic:Radar},
];
const RISKS=[
  {name:"Kairo Health",  sub:"Champion may be exiting. Opportunity at $96K ARR.",score:22,color:"#D7384F"},
  {name:"Voltic Energy", sub:"14 days silent. Auto-close risk in 7 days.",        score:38,color:"#C17B2A"},
  {name:"Metro Content", sub:"Scope drift — margin at 16%, needs change order.",  score:48,color:"#C17B2A"},
  {name:"Acme Robotics", sub:"Proposal stalled 7 days. Hot intent signal now.",   score:61,color:"#5552C9"},
];

function MorningPane({done,setDone}:{done:string[];setDone:React.Dispatch<React.SetStateAction<string[]>>}){
  const[expanded,setExpanded]=useState<string|null>(null);
  return(
    <div style={{flex:1,overflowY:"auto",padding:"20px 24px 40px",display:"flex",flexDirection:"column",gap:14,background:"var(--bg)"}}>
      <div>
        <SectRow label="Today's plan" right={`${PLAN.length-done.length} remaining · ${done.length} done`}/>
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          {PLAN.map((p,i)=>{
            const isOpen=expanded===p.id,isDone=done.includes(p.id);
            const[ab,af]=PILL[p.areaC]||PILL.mu;
            const[sb,sf]=PILL[p.statusC]||PILL.mu;
            const Ic=p.Ic;
            return(
              <div key={p.id} onClick={()=>!isDone&&setExpanded(e=>e===p.id?null:p.id)}
                style={{background:isDone?C.bg2:p.urgency==="urgent"?`linear-gradient(150deg,rgba(215,56,79,0.05),${C.bg2} 55%)`:p.urgency==="approval"?`linear-gradient(150deg,rgba(75,72,200,0.05),${C.bg2} 55%)`:C.bg2,
                  border:`0.5px solid ${C.brd}`,borderLeft:`3px solid ${isDone?C.ok:p.accent}`,borderRadius:13,padding:"13px 15px",
                  display:"flex",gap:13,alignItems:"flex-start",cursor:"pointer",opacity:isDone?.55:1,boxShadow:C.shS}}>
                {/* circle */}
                <div onClick={e=>{e.stopPropagation();setDone(d=>d.includes(p.id)?d.filter(x=>x!==p.id):[...d,p.id]);}}
                  style={{width:24,height:24,borderRadius:8,flexShrink:0,marginTop:2,background:isDone?C.ok:p.accent,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
                  {isDone?<Check size={12} color="#fff"/>:<span style={{fontFamily:"monospace",fontSize:10,fontWeight:700,color:"#fff"}}>{p.priority}</span>}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:8}}>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                        <div style={{width:24,height:24,borderRadius:7,background:p.icBg,color:p.icFg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic size={12}/></div>
                        <div style={{fontSize:12.5,fontWeight:650,color:C.ink,letterSpacing:"-.01em",lineHeight:1.3,textDecoration:isDone?"line-through":"none"}}>{p.title}</div>
                      </div>
                      <div style={{fontSize:12,color:C.ink3,lineHeight:1.5,paddingLeft:31}}>{p.sub}</div>
                    </div>
                    <span style={{fontFamily:"monospace",fontSize:10,color:C.ink5,flexShrink:0,paddingTop:2}}>{p.time}</span>
                  </div>
                  {!isDone&&(
                    <div style={{display:"flex",alignItems:"center",gap:6,marginTop:8,paddingLeft:31,flexWrap:"wrap"}}>
                      <span style={{fontSize:10,padding:"2px 8px",borderRadius:20,background:ab,color:af,fontWeight:600}}>{p.area}</span>
                      <span style={{fontSize:10,padding:"2px 8px",borderRadius:20,background:sb,color:sf,fontWeight:600}}>{p.status}</span>
                      <span style={{marginLeft:"auto",fontSize:10,color:C.ink5}}>{isOpen?"↑":"↓"}</span>
                    </div>
                  )}
                  {isOpen&&!isDone&&(
                    <div style={{marginTop:10,paddingLeft:31}}>
                      {"draft" in p&&p.draft&&(
                        <div style={{background:`linear-gradient(135deg,${C.pp},${C.bg2})`,borderRadius:9,padding:"10px 12px",fontSize:12,color:C.ink2,lineHeight:1.6,border:`0.5px solid ${C.brd2}`,marginBottom:9}}>
                          <div style={{fontSize:9.5,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:C.p,marginBottom:5,display:"flex",alignItems:"center",gap:5}}><Sparkles size={10}/>Zotra draft</div>
                          {p.draft}
                        </div>
                      )}
                      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                        {p.acts.map((a,j)=><Btn key={j} pr={j===0} ch={a} onClick={e=>e.stopPropagation()}/>)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <SectRow label="Opportunities at risk" right="2 high · 1 watch"/>
        <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:2}}>
          {RISKS.map((r,i)=>(
            <div key={i} style={{background:C.bg2,border:`0.5px solid ${C.brd}`,borderRadius:12,padding:"12px 14px",minWidth:210,flexShrink:0,cursor:"pointer",boxShadow:C.shS}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                <Av name={r.name} size={24} r={7}/>
                <div style={{fontSize:12.5,fontWeight:650,color:C.ink,letterSpacing:"-.01em"}}>{r.name}</div>
                <span style={{fontFamily:"monospace",fontSize:10,fontWeight:700,color:r.color,marginLeft:"auto"}}>{r.score}/100</span>
              </div>
              <div style={{fontSize:11,color:C.ink4,lineHeight:1.45,marginBottom:8}}>{r.sub}</div>
              <div style={{height:4,background:C.bg3,borderRadius:3,overflow:"hidden"}}>
                <div style={{height:"100%",borderRadius:3,width:`${r.score}%`,background:r.color}}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── CALENDAR PANE ───────────────────────────────────
const EVENTS=[
  {id:"e1",time:"9:30", dur:"30m",color:"#5552C9",bg:"#EEEDF9",title:"Northwind — contract walk-through",  kind:"zotra",brief:"Pre-brief ready · 2 attendees · Sasha Krieger + Elena",tags:["Opportunity","Closing","$180K"],actions:["Open brief","Join call"]},
  {id:"e2",time:"11:00",dur:"15m",color:"#C17B2A",bg:"#FBF1DE",title:"Kairo Health — champion stabilisation call",kind:"zotra",brief:"Zotra suggests: loop in Lena Park. Maya's exit risk is real.",tags:["Opportunity","Risk","$96K"],actions:["Open brief","Join call"]},
  {id:"e3",time:"12:30",dur:"60m",color:"#1D9E75",bg:"#E6FAF1",title:"Demo: Rune Systems",                kind:"zotra",brief:"3 attendees confirmed · pre-brief built · 4 qualifying questions ready",tags:["New prospect","Discovery"],actions:["Open brief","Join call","View opportunity"]},
  {id:"e4",time:"14:00",dur:"30m",color:"var(--ink4)",bg:"#EFEFF7",title:"Internal — Q2 pipeline review",     kind:"std",  brief:"Weekly team sync · no Zotra enrichment",tags:["Internal"],actions:["Open calendar"]},
  {id:"e5",time:"16:00",dur:"45m",color:"#D97757",bg:"#FCEFE7",title:"Hartwell Orthodontics — monthly report call",kind:"zotra",brief:"Zotra prepared a monthly summary: SEO up 23%, leads +12, margin 34%.",tags:["Project","On track","$4K MRR"],actions:["Open brief","Join call"]},
];
function CalendarPane(){
  return(
    <div style={{flex:1,overflowY:"auto",padding:"20px 24px 40px",display:"flex",flexDirection:"column",gap:14,background:"var(--bg)"}}>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <div>
          <div style={{fontSize:17,fontWeight:650,color:C.ink,letterSpacing:"-.02em"}}>Wednesday, May 14</div>
          <div style={{fontSize:11.5,color:C.ink4,marginTop:2}}>5 events · 4 Zotra-managed</div>
        </div>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:14}}>
          <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:C.p,fontWeight:600}}>
            <div style={{width:10,height:10,borderRadius:3,background:C.pp,border:`1.5px solid ${C.p}`}}/> Zotra-managed
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:C.ink4,fontWeight:500}}>
            <div style={{width:10,height:10,borderRadius:3,background:C.bg3,border:`1px solid ${C.brd2}`}}/> Standard
          </div>
          <Btn ch={<><Plus size={11}/>Add event</>}/>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {EVENTS.map((ev,i)=>(
          <div key={ev.id} style={{background:C.bg2,border:`0.5px solid ${C.brd}`,borderRadius:13,overflow:"hidden",boxShadow:C.shS,cursor:"pointer"}}>
            <div style={{display:"flex",alignItems:"stretch"}}>
              <div style={{width:4,flexShrink:0,background:ev.color}}/>
              <div style={{width:58,flexShrink:0,display:"flex",flexDirection:"column",alignItems:"flex-end",justifyContent:"center",padding:"14px 10px 14px 12px",gap:2}}>
                <div style={{fontFamily:"monospace",fontSize:13,fontWeight:600,color:C.ink2,lineHeight:1}}>{ev.time}</div>
                <div style={{fontFamily:"monospace",fontSize:10,color:C.ink5}}>{ev.dur}</div>
              </div>
              <div style={{width:.5,background:C.brd,alignSelf:"stretch",margin:"12px 0"}}/>
              <div style={{flex:1,minWidth:0,padding:"13px 14px 12px"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                  <div style={{fontSize:13.5,fontWeight:600,color:C.ink,flex:1,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ev.title}</div>
                  <span style={{fontSize:10,padding:"3px 8px",borderRadius:6,fontWeight:600,flexShrink:0,display:"inline-flex",alignItems:"center",gap:4,background:ev.kind==="zotra"?C.pp:C.bg3,color:ev.kind==="zotra"?C.p:C.ink4,border:`0.5px solid ${ev.kind==="zotra"?C.brd2:C.brd}`}}>
                    {ev.kind==="zotra"&&<Sparkles size={9}/>}{ev.kind==="zotra"?"Zotra":"Standard"}
                  </span>
                </div>
                <div style={{fontSize:12,color:C.ink4,lineHeight:1.5,marginBottom:9}}>{ev.brief}</div>
                <div style={{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap"}}>
                  {ev.tags.map((t,j)=><span key={j} style={{fontSize:10.5,padding:"3px 9px",borderRadius:20,fontWeight:600,background:ev.bg,color:ev.color,border:`0.5px solid ${ev.color}33`}}>{t}</span>)}
                  <div style={{marginLeft:"auto",display:"flex",gap:5,flexShrink:0}}>
                    {ev.actions.map((a,j)=><Btn key={j} xs pr={j===0&&ev.kind==="zotra"} ch={a}/>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────── APPROVALS PANE ──────────────────────────────────
const APPROVALS=[
  {id:"a1",Ic:Send,         icBg:C.pp,    icFg:C.p,   label:"Reply draft · Northwind",        to:"Sasha Krieger · VP Engineering",
   preview:"Sasha — happy to go 30-day notice on auto-renewal. Sending the revised redline now so we're good for Thursday. Want me to book a quick 10-min walk-through Thursday AM before signature? — Elena",confidence:"94%",tone:"Matched your style"},
  {id:"a2",Ic:Send,         icBg:C.tp,    icFg:C.td,  label:"Re-engage draft · Acme Robotics", to:"Dana Reyes · VP Engineering",
   preview:"Hi Dana — noticed your team was back on our site this morning. The pricing questions from March — happy to walk through the updated numbers on a quick 30-min call this week? — Elena",confidence:"88%",tone:"Warm, direct"},
  {id:"a3",Ic:TriangleAlert,icBg:C.rib,   icFg:C.ri,  label:"Escalation · Northside Dental",   to:"Julie Marsh · Practice Manager",
   preview:"Julie — following up on Invoice #1041 ($2,200), now 22 days outstanding. Would a quick call today work to sort this? — Elena",confidence:"91%",tone:"Professional, firm"},
  {id:"a4",Ic:FileCheck,    icBg:C.wab,   icFg:C.waf, label:"Change order draft · Metro Content",to:"Troy Nguyen · Operations Lead",
   preview:"Troy — as discussed, the additional revision rounds have taken the project beyond the original brief. Attached is a change order for the extra 14 hours at the agreed rate.",confidence:"82%",tone:"Clear, non-apologetic"},
  {id:"a5",Ic:Sparkles,     icBg:C.amberp,icFg:C.amber,label:"Meeting brief · Rune Systems demo",to:"3 attendees · 12:30 today",
   preview:"Rune Systems is a Series B logistics software co. Key stakeholder: Max Heller (CEO). Pain: manual client reporting. Our fit: automation + renewal management. 4 discovery questions prepared.",confidence:"97%",tone:"Pre-brief ready"},
];
function ApprovalsPane(){
  const[approved,setApproved]=useState<Record<string,boolean>>({});
  const[dismissed,setDismissed]=useState<Record<string,boolean>>({});
  const pending=APPROVALS.filter(it=>!approved[it.id]&&!dismissed[it.id]).length;
  return(
    <div style={{flex:1,overflowY:"auto",padding:"20px 24px 40px",display:"flex",flexDirection:"column",gap:14,background:"var(--bg)"}}>
      <div style={{background:`linear-gradient(135deg,${C.pp},${C.bg2})`,borderRadius:13,padding:"13px 16px",border:`0.5px solid ${C.brd2}`,display:"flex",gap:12,alignItems:"center"}}>
        <div style={{width:32,height:32,borderRadius:9,background:`linear-gradient(135deg,${C.p},${C.pl})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Sparkles size={15} color="#fff"/></div>
        <div>
          <div style={{fontSize:13,fontWeight:650,color:C.ink,letterSpacing:"-.01em"}}>5 items need your approval</div>
          <div style={{fontSize:12,color:C.ink4,marginTop:1}}>Zotra prepared these overnight. Review, send, or edit each one.</div>
        </div>
        <div style={{marginLeft:"auto"}}><Btn ch={<><CheckCheck size={11}/>Approve all</>}/></div>
      </div>
      <SectRow label="Waiting for you" right={`${pending} pending`}/>
      <div style={{display:"flex",flexDirection:"column",gap:7}}>
        {APPROVALS.map((it,i)=>{
          if(dismissed[it.id])return null;
          const isOk=approved[it.id];
          const Ic=it.Ic;
          return(
            <div key={it.id} style={{background:`linear-gradient(150deg,rgba(75,72,200,0.05),${C.bg2} 55%)`,border:`0.5px solid rgba(75,72,200,0.22)`,borderRadius:13,padding:"13px 15px",display:"flex",gap:12,alignItems:"flex-start",opacity:isOk?.55:1}}>
              <div style={{width:34,height:34,borderRadius:10,background:it.icBg,color:it.icFg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic size={14}/></div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:8}}>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                      <div style={{fontSize:12,fontWeight:650,color:C.ink,letterSpacing:"-.01em"}}>{it.label}</div>
                      {isOk&&<span style={{fontSize:9.5,padding:"1px 7px",borderRadius:5,background:C.okb,color:C.okf,fontWeight:600}}>Sent ✓</span>}
                    </div>
                    <div style={{fontFamily:"monospace",fontSize:10.5,color:C.ink5,marginBottom:6}}>To: {it.to}</div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:3,flexShrink:0}}>
                    <span style={{fontSize:10,padding:"1px 7px",borderRadius:5,background:C.okb,color:C.okf,fontWeight:600}}>{it.confidence}</span>
                    <span style={{fontSize:9.5,color:C.ink5}}>{it.tone}</span>
                  </div>
                </div>
                <div style={{background:C.bg,border:`0.5px solid ${C.brd}`,borderRadius:9,padding:"9px 12px",fontSize:12,color:C.ink3,lineHeight:1.6,marginBottom:9,fontStyle:"italic"}}>"{it.preview}"</div>
                {!isOk&&(
                  <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                    <Btn pr ch={<><Send size={11}/>Send</>} onClick={e=>{e.stopPropagation();setApproved(a=>({...a,[it.id]:true}));}}/>
                    <Btn ch={<><Edit3 size={11}/>Edit</>}/>
                    <Btn ch={<><RotateCw size={11}/>Different tone</>}/>
                    <button onClick={e=>{e.stopPropagation();setDismissed(d=>({...d,[it.id]:true}));}}
                      style={{marginLeft:"auto",display:"inline-flex",alignItems:"center",gap:4,height:24,padding:"0 10px",fontSize:11,borderRadius:6,border:"none",background:"transparent",color:C.ink3,cursor:"pointer"}}>
                      <X size={11}/>Skip
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────── PULSE ENGINE PANE ───────────────────────────────
const RHYTHMS=[
  {label:"Morning Pulse",time:"6:00 AM",     status:"Complete",    Ic:Sunrise,  bg:C.okb,    fg:C.okf,   items:["4 drafts written","31 signals scanned","2 risks flagged","Priorities set"]},
  {label:"Midday Check", time:"12:00 PM",    status:"In 2h",       Ic:Sun,      bg:C.pp,     fg:C.pd,    items:["Stalled deals review","Urgent action sweep","Meeting follow-ups"]},
  {label:"Evening Wrap", time:"6:00 PM",     status:"Scheduled",   Ic:Sunset,   bg:C.bg3,    fg:C.ink4,  items:["Day summary","Tomorrow prep","Overnight tasks queued"]},
  {label:"Weekly Pulse", time:"Mon 7:00 AM", status:"Sunday night",Ic:Calendar, bg:C.tp,     fg:C.td,    items:["Pipeline review","Renewal watch","Financial aging"]},
  {label:"Monthly Pulse",time:"1st of month",status:"Jun 1",       Ic:BarChart3,bg:C.amberp, fg:C.amber, items:["Revenue summary","Client health scores","Expansion signals"]},
];
const ENG_STATS=[
  {lbl:"Signals today",v:"31",s:"processed",  color:C.p,    bg:C.pp},
  {lbl:"Actions taken",v:"9", s:"overnight",  color:C.ok,   bg:C.okb},
  {lbl:"Drafts ready", v:"5", s:"for approval",color:C.amber,bg:C.amberp},
  {lbl:"At risk",      v:"2", s:"need attention",color:C.ri,bg:C.rib},
];
function PulseEnginePane(){
  return(
    <div style={{flex:1,overflowY:"auto",padding:"20px 24px 40px",display:"flex",flexDirection:"column",gap:14,background:"var(--bg)"}}>
      <div style={{background:C.bg2,border:`0.5px solid ${C.brd}`,borderRadius:14,overflow:"hidden",boxShadow:C.shS}}>
        <div style={{height:42,padding:"0 16px",borderBottom:`0.5px solid ${C.brd}`,display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:30,height:30,borderRadius:9,background:C.pp,color:C.p,display:"flex",alignItems:"center",justifyContent:"center"}}><Clock size={15}/></div>
          <div style={{fontSize:13,fontWeight:650,color:C.ink}}>Commercial Pulse Engine</div>
          <span style={{marginLeft:"auto",fontSize:10,padding:"2px 8px",borderRadius:6,background:C.okb,color:C.okf,fontWeight:600,fontFamily:"monospace"}}>● Live</span>
        </div>
        <div style={{display:"flex",padding:12}}>
          {ENG_STATS.map((m,i)=>(
            <div key={i} style={{flex:1,textAlign:"center",padding:"0 16px",borderRight:i<3?`0.5px solid ${C.brd}`:"none"}}>
              <div style={{width:34,height:34,borderRadius:10,background:m.bg,color:m.color,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 7px"}}><Activity size={14}/></div>
              <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:C.ink5,marginBottom:3}}>{m.lbl}</div>
              <div style={{fontSize:17,fontWeight:650,color:m.color,letterSpacing:"-.02em"}}>{m.v}</div>
              <div style={{fontSize:10.5,color:C.ink5,marginTop:1}}>{m.s}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <span style={{fontSize:9.5,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.ink5}}>Pulse schedule</span>
          <div style={{flex:1,height:.5,background:C.brd}}/>
          <Btn ch={<><Settings size={11}/>Configure</>}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          {RHYTHMS.map((r,i)=>{const Ic=r.Ic;return(
            <div key={i} style={{background:C.bg2,border:`0.5px solid ${C.brd}`,borderRadius:13,padding:"13px 15px",display:"flex",gap:13,alignItems:"flex-start",cursor:"pointer",boxShadow:C.shS}}>
              <div style={{width:34,height:34,borderRadius:10,background:r.bg,color:r.fg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic size={14}/></div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                  <div style={{fontSize:12.5,fontWeight:650,color:C.ink,letterSpacing:"-.01em"}}>{r.label}</div>
                  <span style={{fontSize:9.5,padding:"1px 8px",borderRadius:5,background:r.bg,color:r.fg,fontWeight:600,marginLeft:"auto",fontFamily:"monospace"}}>{r.status}</span>
                </div>
                <div style={{fontFamily:"monospace",fontSize:10.5,color:C.ink5,marginBottom:5}}>{r.time}</div>
                <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                  {r.items.map((it,j)=><span key={j} style={{fontSize:10,padding:"1px 7px",borderRadius:5,background:C.bg3,color:C.ink4,border:`0.5px solid ${C.brd}`}}>{it}</span>)}
                </div>
              </div>
            </div>
          );})}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── TOMORROW PANE ───────────────────────────────────
const TMEETS=[
  {time:"9:00", title:"Northwind — post-signing onboarding kickoff",tag:"Zotra managed",color:C.ok},
  {time:"11:00",title:"Rune Systems — follow-up after today's demo",tag:"Zotra managed",color:C.p},
  {time:"14:00",title:"Internal — weekly team sync",                tag:"Standard",     color:C.ink5},
];
const AWORK=[
  {Ic:PenLine,  label:"Composer drafts Hartwell expansion proposal",time:"Tonight 10pm",bg:C.pp,    fg:C.p},
  {Ic:RefreshCw,label:"Renewal Agent sends Northside 60-day brief", time:"Tonight 11pm",bg:C.tp,    fg:C.td},
  {Ic:Send,     label:"Follow-up sequence: Voltic Energy re-engage",time:"Tomorrow 6am",bg:C.amberp,fg:C.amber},
  {Ic:Radar,    label:"Watcher monitors Acme post-reply sentiment",  time:"Continuous",  bg:C.pp,    fg:C.p},
];
const WKAHEAD=[
  {day:"Thu",label:"Northwind signs",    color:C.ok,   tag:"Target"},
  {day:"Fri",label:"Metro scope call",   color:C.wa,   tag:"At risk"},
  {day:"Mon",label:"Weekly Pulse",       color:C.p,    tag:"Zotra"},
  {day:"Mon",label:"Hartwell renewal 60d",color:C.amber,tag:"Renewal"},
  {day:"Tue",label:"Rune follow-up",     color:C.p,    tag:"Opportunity"},
];
function TomorrowPane(){
  return(
    <div style={{flex:1,overflowY:"auto",padding:"20px 24px 40px",display:"flex",flexDirection:"column",gap:14,background:"var(--bg)"}}>
      <div style={{background:C.bg2,borderRadius:13,padding:"14px 16px",border:`0.5px solid ${C.brd}`,display:"flex",gap:12,alignItems:"center",boxShadow:C.shS}}>
        <div style={{width:32,height:32,borderRadius:9,background:C.ink,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Moon size={15} color="#fff"/></div>
        <div>
          <div style={{fontSize:13,fontWeight:650,color:C.ink,letterSpacing:"-.01em"}}>Thursday, May 15 — tomorrow's plan</div>
          <div style={{fontSize:12,color:C.ink4,marginTop:1}}>Zotra is already preparing. These agents work tonight.</div>
        </div>
      </div>
      <div>
        <SectRow label="Tomorrow's calendar"/>
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          {TMEETS.map((m,i)=>(
            <div key={i} style={{background:C.bg2,border:`0.5px solid ${C.brd}`,borderLeft:`3px solid ${m.color}`,borderRadius:13,padding:"12px 15px",display:"flex",gap:12,alignItems:"center",cursor:"pointer",boxShadow:C.shS}}>
              <div style={{fontFamily:"monospace",fontSize:11,color:C.ink4,textAlign:"right",flexShrink:0,width:48,lineHeight:1.3}}>{m.time}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:600,color:C.ink,marginBottom:2}}>{m.title}</div>
                <span style={{fontSize:9.5,padding:"1px 7px",borderRadius:5,fontWeight:600,display:"inline-block",background:m.color===C.ink5?C.bg3:C.pp,color:m.color===C.ink5?C.ink4:m.color}}>{m.tag}</span>
              </div>
              <Btn xs ch="Pre-brief"/>
            </div>
          ))}
        </div>
      </div>
      <div>
        <SectRow label="Agents working tonight"/>
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          {AWORK.map((a,i)=>{const Ic=a.Ic;return(
            <div key={i} style={{background:C.bg2,border:`0.5px solid ${C.brd}`,borderRadius:13,padding:"12px 15px",display:"flex",gap:12,alignItems:"center",boxShadow:C.shS}}>
              <div style={{width:32,height:32,borderRadius:9,background:a.bg,color:a.fg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic size={13}/></div>
              <div style={{flex:1,minWidth:0,fontSize:12,fontWeight:600,color:C.ink}}>{a.label}</div>
              <span style={{fontFamily:"monospace",fontSize:10,color:C.ink5,flexShrink:0}}>{a.time}</span>
            </div>
          );})}
        </div>
      </div>
      <div>
        <SectRow label="Week ahead — key moments"/>
        <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:2}}>
          {WKAHEAD.map((w,i)=>(
            <div key={i} style={{background:C.bg2,border:`0.5px solid ${C.brd}`,borderTop:`3px solid ${w.color}`,borderRadius:10,padding:"10px 14px",minWidth:140,flexShrink:0,boxShadow:C.shS}}>
              <div style={{fontFamily:"monospace",fontSize:10,color:C.ink5,marginBottom:4}}>{w.day}</div>
              <div style={{fontSize:12,fontWeight:600,color:C.ink,marginBottom:4}}>{w.label}</div>
              <span style={{fontSize:9.5,padding:"1px 7px",borderRadius:5,background:C.bg3,color:C.ink4,fontWeight:600}}>{w.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── MAIN VIEW ───────────────────────────────────────
type TabId="morning"|"calendar"|"approvals"|"pulse"|"tomorrow";
const CHAPTERS:{id:TabId;label:string;Ic:React.ElementType;statusBase:string;urgent?:boolean}[]=[
  {id:"morning",  label:"Morning",     Ic:Sunrise,    statusBase:"actions", urgent:true},
  {id:"calendar", label:"Calendar",    Ic:Calendar,   statusBase:"5 events"},
  {id:"approvals",label:"Approvals",   Ic:CheckSquare,statusBase:"5 pending",urgent:true},
  {id:"pulse",    label:"Pulse Engine",Ic:Activity,   statusBase:"Live"},
  {id:"tomorrow", label:"Tomorrow",    Ic:Moon,       statusBase:"Queued"},
];
const OVERNIGHT=[
  {label:"Northwind redline drafted",kind:"done"},
  {label:"Acme re-engage written",   kind:"done"},
  {label:"Kairo champion risk",      kind:"risk"},
  {label:"Northside invoice Day 22", kind:"warn"},
];

export default function TodayView({setView}:{setView?:(v:string)=>void}){
  const[tab,setTab]=useState<TabId>("morning");
  const[done,setDone]=useState<string[]>([]);
  const{h,fmt}=useNow();
  const fullName = sessionStorage.getItem("zotra_fullName") ?? "";
    const firstName = fullName.trim().split(" ")[0] || "there";
  const dayPct=Math.min(100,Math.max(0,Math.round(((h-9)/(18-9))*100)));
  const greet=h<12?"morning":h<17?"afternoon":"evening";

  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minHeight:0,fontFamily:"'Outfit',sans-serif"}}>
      {/* ── Dark warm hero ── */}
      <div style={{flexShrink:0,background:"linear-gradient(135deg,#3A2A1C 0%,#2A1E10 60%,#332618 100%)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-80,right:-60,width:420,height:420,borderRadius:"50%",background:"radial-gradient(circle,rgba(85,82,201,0.22) 0%,transparent 65%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:-100,left:-40,width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(26,158,124,0.18) 0%,transparent 65%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:-120,left:"30%",width:500,height:500,borderRadius:"50%",border:"1px solid rgba(250,248,243,0.04)",pointerEvents:"none"}}/>

        {/* live row */}
        <div style={{position:"relative",zIndex:2,display:"flex",alignItems:"center",gap:8,padding:"14px 24px 0"}}>
          <div style={{display:"flex",alignItems:"center",gap:6,fontFamily:"'IBM Plex Mono',monospace",fontSize:10,fontWeight:500,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(250,248,243,0.45)"}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"#1A9E7C",flexShrink:0,animation:"rhy-blink 2s ease-in-out infinite"}}/>
            {fmt(h)}:{fmt(new Date().getMinutes())} · Daily Operating Rhythm
          </div>
        </div>

        {/* greeting */}
        <div style={{position:"relative",zIndex:2,padding:"10px 24px 0"}}>
          <div style={{fontSize:30,fontWeight:600,color:"var(--bg2)",letterSpacing:"-.02em",lineHeight:1.1,marginBottom:3,fontFamily:"'Playfair Display',serif"}}>
            Good {greet}, <span style={{color:"#7370E0",fontStyle:"italic"}}>{firstName}</span>
          </div>
          <div style={{fontSize:13,color:"rgba(250,248,243,0.60)",lineHeight:1.5,marginBottom:14}}>
            Zotra worked overnight — 4 drafts written, 2 risks flagged. Here's your day.
          </div>
        </div>

        {/* chips */}
        <div style={{position:"relative",zIndex:2,display:"flex",gap:6,flexWrap:"wrap",padding:"0 24px 14px"}}>
          {OVERNIGHT.map((c,i)=>{
            const Ic=c.kind==="done"?Check:c.kind==="risk"?TriangleAlert:AlertCircle;
            const s=c.kind==="done"
              ?{bg:"rgba(26,158,124,0.22)",color:"#C8E8D8",brd:"rgba(26,158,124,0.38)"}
              :c.kind==="risk"
              ?{bg:"rgba(196,82,82,0.20)",color:"rgba(255,200,200,0.92)",brd:"rgba(196,82,82,0.35)"}
              :{bg:"rgba(196,146,42,0.20)",color:"rgba(255,220,160,0.92)",brd:"rgba(196,146,42,0.35)"};
            return(
              <div key={i} style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:11,fontWeight:500,padding:"5px 11px",borderRadius:20,border:`0.5px solid ${s.brd}`,background:s.bg,color:s.color,whiteSpace:"nowrap"}}>
                <Ic size={11}/>{c.label}
              </div>
            );
          })}
        </div>

        {/* day arc */}
        <div style={{position:"relative",zIndex:2,padding:"0 24px 16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",fontFamily:"'IBM Plex Mono',monospace",fontSize:9.5,color:"rgba(250,248,243,0.35)",letterSpacing:"0.04em",marginBottom:6}}>
            <span>Day arc — {dayPct}% through your commercial day</span>
            <span>{fmt(h)}:{fmt(new Date().getMinutes())} / 18:00</span>
          </div>
          <div style={{height:5,background:"rgba(250,248,243,0.10)",borderRadius:99,overflow:"hidden"}}>
            <div style={{height:"100%",borderRadius:99,background:"linear-gradient(90deg,#5552C9,#7370E0)",width:`${dayPct}%`,transition:"width .7s cubic-bezier(.4,0,.2,1)"}}/>
          </div>
        </div>

        {/* chapter tabs — ON the hero, cream bg */}
        <div style={{position:"relative",zIndex:2,display:"flex",background:"var(--bg2)",borderBottom:`0.5px solid var(--brd2)`}}>
          {CHAPTERS.map((ch,ci)=>{
            const isOn=tab===ch.id;
            const Ic=ch.Ic;
            const cnt=ch.id==="morning"?Math.max(0,5-done.length):ch.id==="approvals"?5:0;
            const prog=ch.id==="morning"?Math.round((done.length/5)*100):ch.id==="pulse"?100:0;
            return(
              <div key={ch.id} onClick={()=>setTab(ch.id)}
                style={{flex:1,padding:"12px 8px 10px",cursor:"pointer",borderRight:ci<4?`0.5px solid var(--brd2)`:"none",position:"relative",background:isOn?"#EEEDF9":"var(--bg2)",display:"flex",flexDirection:"column",alignItems:"center",gap:3,transition:"background .13s"}}>
                {isOn&&<div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"#5552C9",borderRadius:"0 0 3px 3px"}}/>}
                <div style={{width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",background:isOn?"#5552C9":"var(--bg3)",color:isOn?"#fff":"var(--ink4)",position:"relative",flexShrink:0,transition:"all .13s"}}>
                  <Ic size={14}/>
                  {cnt>0&&<div style={{position:"absolute",top:-5,right:-5,minWidth:16,height:16,padding:"0 4px",borderRadius:8,background:ch.urgent?"#C45252":"#5552C9",color:"#fff",fontFamily:"'IBM Plex Mono',monospace",fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid var(--bg2)"}}>{cnt}</div>}
                </div>
                <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.05em",textTransform:"uppercase",color:isOn?"#5552C9":"var(--ink4)",whiteSpace:"nowrap",transition:"color .13s"}}>{ch.label}</div>
                <div style={{fontSize:9,fontFamily:"'IBM Plex Mono',monospace",color:isOn?"#3B38A8":"var(--ink5)"}}>
                  {ch.id==="morning"&&done.length>0?`${done.length}/5 done`:ch.statusBase}
                </div>
                <div style={{width:"100%",height:3,background:"var(--bg3)",borderRadius:2,overflow:"hidden",marginTop:2}}>
                  <div style={{height:"100%",borderRadius:2,width:`${prog}%`,background:prog===100?"#1A9E7C":ch.urgent?"#C45252":"#5552C9",transition:"width .5s cubic-bezier(.4,0,.2,1)"}}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* pane */}
      {tab==="morning"   &&<MorningPane     done={done} setDone={setDone}/>}
      {tab==="calendar"  &&<CalendarPane/>}
      {tab==="approvals" &&<ApprovalsPane/>}
      {tab==="pulse"     &&<PulseEnginePane/>}
      {tab==="tomorrow"  &&<TomorrowPane/>}

      <style>{`@keyframes rhy-blink{0%,100%{opacity:.9}50%{opacity:.35}}`}</style>
    </div>
  );
}