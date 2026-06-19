// import { Link } from 'react-router-dom';
// import AppMock from '../components/AppMock';
// import {
//   IconCompass, IconEye, IconSearch, IconMic, IconPen,
//   IconSunrise, IconSun, IconSunset, IconZap, IconUsers,
//   IconGrid, IconTrend, IconSparkles, IconReceipt, IconBuilding,
//   IconMail, IconRadar, IconCheckSq,
// } from '../components/Icons';

// // ── Reusable Eyebrow ──────────────────────────────────────────────────────
// const Eyebrow = ({ children, light }: { children: React.ReactNode; light?: boolean }) => (
//   <div className={`inline-flex items-center gap-2 text-[10.5px] font-mono font-medium tracking-[0.16em] uppercase mb-5 ${light ? 'text-indigo-pale/70' : 'text-indigo'}`}>
//     <span className="w-4 h-px bg-current"  />
//     {children}
//   </div>
// );

// // ── Button ────────────────────────────────────────────────────────────────
// const Btn = ({ href, to, primary, lg, light, children }: { href?: string; to?: string; primary?: boolean; lg?: boolean; light?: boolean; children: React.ReactNode }) => {
//   const base = `inline-flex items-center gap-2 font-medium tracking-[-0.005em] transition-all`;
//   const size = lg ? 'h-11 px-6 text-[13.5px] rounded-xl' : 'h-9 px-4 text-[13px] rounded-lg';
//   const variant = primary
//     ? light
//       ? 'bg-white text-ink border border-white hover:bg-cream-100'
//       : 'bg-indigo text-white border border-indigo hover:bg-indigo-light shadow-[0_2px_12px_rgba(85,82,201,0.25)]'
//     : light
//       ? 'bg-white/[0.1] border border-white/[0.2] text-white hover:bg-white/[0.18]'
//       : 'bg-transparent border border-sand text-ink-2 hover:bg-cream-200 hover:border-ink-6';
//   const cls = `${base} ${size} ${variant}`;
//   if (to) return <Link to={to} className={cls}>{children}</Link>;
//   return <a href={href || '#'} className={cls}>{children}</a>;
// };

// // ── Data ──────────────────────────────────────────────────────────────────
// const agents = [
//   { name: 'Zotra', role: 'Drafts every reply, follow-up and re-engage in your tone. Nothing sends without your nod.', tags: ['Outreach', 'Drafts'], icon: <IconCompass />, color: '#5552C9', status: 'Working' },
//   { name: 'Watcher', role: 'Watches signals — pricing intent, hires, champion shifts, account silence. Pings you only when it matters.', tags: ['Signals', 'Champions'], icon: <IconEye />, color: '#1A9E7C', status: 'Live' },
//   { name: 'Forager', role: 'Enriches every account — org maps, technographics, hiring patterns, fresh contacts on every new lead.', tags: ['Enrichment', 'Org maps'], icon: <IconSearch />, color: 'var(--ink4)', status: 'Idle', idle: true },
//   { name: 'Echo', role: 'Joins your calls, takes notes, files action items to the right account, and updates stakeholder maps.', tags: ['Meetings', 'Actions'], icon: <IconMic />, color: '#C4922A', status: 'Calls', watch: true },
//   { name: 'Composer', role: 'Writes drafts, adapts tone, prepares proposals and redlines. Trained on what you\'ve sent before.', tags: ['Writing', 'Proposals'], icon: <IconPen />, color: '#7A4EDB', status: 'Working' },
// ];

// const icpItems = [
//   { icon: <IconZap />, name: 'Agencies', desc: 'Retainers, multi-stream delivery, scope-drift detection across creative pods.' },
//   { icon: <IconUsers />, name: 'Consultants', desc: 'Engagement memory, statement-of-work continuity, partner-level forecasting.' },
//   { icon: <IconGrid />, name: 'IT & Tech Services', desc: 'Implementation health, change-order signals, managed-services renewals.' },
//   { icon: <IconTrend />, name: 'Marketing Firms', desc: 'Campaign-level margin, client engagement velocity, expansion signal capture.' },
//   { icon: <IconSparkles />, name: 'Creative Studios', desc: 'Project portfolio view, utilisation ceilings, recurring-client trust trends.' },
//   { icon: <IconReceipt />, name: 'Professional Services', desc: 'Legal, accounting, advisory — long arcs, stakeholder-dense relationships.' },
//   { icon: <IconCompass />, name: 'Solo & Founders', desc: 'Inbox is the system. Zotra makes solo operators look organisationally seasoned.' },
//   { icon: <IconBuilding />, name: 'Boutique Firms', desc: 'Bespoke engagement shapes — Zotra adapts to your forms, not the other way around.' },
// ];

// const tiers = [
//   {
//     name: 'Solo', heading: 'Solo & founders', desc: 'Morning Pulse, drafts in your tone, a five-minute morning brief. Zotra + Composer.', price: '$29', sub: '/ user / month',
//     features: ['Morning Pulse · daily rhythm', '2 agents · <b>Zotra · Composer</b>', 'Gmail / Outlook connectors', 'Up to 200 accounts'], featured: false
//   },
//   {
//     name: 'Team', heading: 'Agencies & service teams', desc: 'All three pulses, full signal coverage, calls joined and filed. Composer · Watcher · Echo · Forager.', price: '$79', sub: '/ user / month',
//     features: ['All 3 daily pulses', '4 agents · <b>+ Watcher · Echo · Forager</b>', 'Calendar & meeting connectors', 'Unlimited accounts'], featured: true
//   },
//   {
//     name: 'Operations', heading: 'Portfolio teams', desc: 'Add finance + renewal coverage. Ageing, margins, expansion signals, T-90 renewal windows.', price: '$149', sub: '/ user / month',
//     features: ['All pulses · evening prep', '6 agents · <b>+ Finance · Renewal</b>', 'Accounting connectors · SAML', 'Portfolio rollups'], featured: false
//   },
//   {
//     name: 'Enterprise', heading: 'Strategic', desc: 'Governance, audit, regions, APIs. Custom agents, custom rhythms, dedicated engineer.', price: 'Talk to us', sub: '',
//     features: ['Everything in Operations', 'API · custom agents', 'Region pinning · audit trail', 'Dedicated success engineer'], featured: false
//   },
// ];

// export default function Home() {
//   return (
//     <div className="bg-cream" >

//       {/* ── HERO ── */}
//       <section className="pt-20 pb-16 relative overflow-hidden" >
//         {/* Decorative background rings */}
//         <div className="absolute top-[-200px] right-[-300px] w-[900px] h-[900px] rounded-full border border-sand/60 pointer-events-none"  />
//         <div className="absolute top-[-100px] right-[-200px] w-[600px] h-[600px] rounded-full border border-sand pointer-events-none"  />
//         <div className="absolute top-[50px] right-[-100px] w-[320px] h-[320px] rounded-full bg-indigo/[0.04] pointer-events-none"  />

//         <div className="max-w-[1280px] mx-auto px-8 relative z-10" >
//           <Eyebrow>Daily Operating Rhythm · for service businesses</Eyebrow>

//           <div className="grid grid-cols-[1fr_auto] gap-8 items-start max-w-[820px]" >
//             <h1 className="font-serif text-[64px] font-semibold text-ink tracking-[-0.02em] leading-[1.02] text-wrap-balance" >
//               Wake up to your accounts <em className="text-indigo not-italic" >already&nbsp;worked.</em>
//             </h1>
//           </div>

//           <p className="text-[17px] text-ink-3 font-light leading-[1.6] max-w-[580px] mt-6 text-wrap-pretty" >
//             Zotra is the AI commercial team that runs your day. It drafts replies overnight, watches every champion, and hands you a five-minute morning brief — so the first thing you do is approve, not catch up.
//           </p>

//           <div className="flex items-center gap-3 mt-10" >
//             <Btn to="/signup" primary lg>Connect Gmail <span className="font-mono text-[11px]" >→</span></Btn>
//             <Btn to="/product" lg>See how it works</Btn>
//           </div>

//           <div className="flex items-center gap-5 mt-10 text-[11.5px] text-ink-4 flex-wrap font-mono tracking-[0.06em]" >
//             {['SOC 2 Type II', 'Inbox-native · read-only by default', 'Live in 6 minutes', 'EU · US · UK · APAC regions'].map((item, i, arr) => (
//               <span key={item} className="flex items-center gap-5" >
//                 {item}
//                 {i < arr.length - 1 && <span className="w-1 h-1 rounded-full bg-ink-6"  />}
//               </span>
//             ))}
//           </div>

//           <AppMock />
//         </div>
//       </section>

//       {/* ── PULSE ENGINE ── */}
//       <section id="pulse" className="py-28 border-t border-sand bg-cream-200" >
//         <div className="max-w-[1280px] mx-auto px-8" >
//           <div className="grid grid-cols-[1fr_2fr] gap-16 items-start" >
//             <div>
//               <Eyebrow>Pulse Engine</Eyebrow>
//               <h2 className="font-serif text-[42px] font-semibold text-ink tracking-[-0.02em] leading-[1.08]" >Three pulses a day. One commercial heartbeat.</h2>
//               <p className="text-[14px] text-ink-3 font-light leading-[1.65] mt-4 max-w-[360px]" >Zotra works on a rhythm — not a notification stream. Drafts before you arrive. Sweeps at midday. Wraps before you log off. Every cycle is reasoned, evidenced, and ready for one decision.</p>
//             </div>

//             <div className="flex flex-col gap-3" >
//               {[
//                 { icon: <IconSunrise className="w-4 h-4"  />, title: 'Morning Pulse', sub: '06:00 · Overnight wrap', status: 'Complete', live: false, items: ['<b>4 drafts</b> written in your tone — reviewable', '<b>31 signals</b> scanned across accounts', '<b>2 risks</b> flagged — champion shift, ageing invoice', '<b>Priorities ranked</b> — top 5 surfaced in your plan'] },
//                 { icon: <IconSun className="w-4 h-4"  />, title: 'Midday Check', sub: '12:00 · In-day sweep', status: '● Live', live: true, items: ['<b>Stalled deals</b> reviewed — nudges drafted', '<b>Urgent action</b> sweep — escalations surfaced', '<b>Meeting follow-ups</b> from your morning calls', '<b>Calendar prep</b> for the next three meetings'] },
//                 { icon: <IconSunset className="w-4 h-4"  />, title: 'Evening Wrap', sub: '18:00 · Tomorrow prep', status: 'Scheduled', live: false, items: ['<b>Day summary</b> — what closed, what moved, what slipped', '<b>Tomorrow\'s plan</b> queued — drafts started overnight', '<b>Stakeholder updates</b> logged across accounts', '<b>Renewal calendar</b> rolled forward'] },
//               ].map(card => (
//                 <div key={card.title} className={`rounded-xl border overflow-hidden flex ${card.live ? 'border-teal/30 bg-teal-pale/30' : 'border-sand bg-white'} shadow-[0_1px_4px_rgba(60,50,30,0.06)]`}>
//                   <div className={`w-[5px] shrink-0 ${card.live ? 'bg-teal' : 'bg-sand'}`} />
//                   <div className="flex-1 p-5" >
//                     <div className="flex items-center gap-3 mb-3" >
//                       <div className={`w-8 h-8 rounded-lg grid place-items-center shrink-0 ${card.live ? 'bg-teal text-white' : 'bg-cream-300 text-ink-4'}`}>{card.icon}</div>
//                       <div className="flex-1" >
//                         <div className="font-serif font-semibold text-[15px] text-ink tracking-[-0.01em]" >{card.title}</div>
//                         <div className="font-mono text-[9.5px] text-ink-4 tracking-[0.08em] uppercase mt-0.5" >{card.sub}</div>
//                       </div>
//                       <div className={`font-mono text-[9px] px-2 py-0.5 rounded-md tracking-[0.1em] uppercase ${card.live ? 'bg-teal text-white' : 'bg-cream-300 text-ink-4'}`}>{card.status}</div>
//                     </div>
//                     <div className="grid grid-cols-2 gap-x-8 gap-y-1.5" >
//                       {card.items.map((item, i) => (
//                         <div key={i} className="flex items-start gap-2 text-[12.5px] text-ink-3 leading-[1.45]" >
//                           <div className={`w-[4px] h-[4px] rounded-full mt-[6px] shrink-0 ${card.live ? 'bg-teal' : 'bg-ink-5'}`} />
//                           <div dangerouslySetInnerHTML={{ __html: item.replace(/<b>/g, '<span class="text-ink font-medium">').replace(/<\/b>/g, '</span>') }} />
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── MANIFESTO ── */}
//       <section id="manifesto" className="py-32 border-t border-sand relative overflow-hidden"  style={{background: 'linear-gradient(135deg, #2D3A2A 0%, #1B2E24 50%, #1C2B22 100%)'}}>
//         <div className="absolute inset-0 pointer-events-none opacity-20"  style={{backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(85,82,201,0.3), transparent 60%), radial-gradient(circle at 20% 80%, rgba(26,158,124,0.3), transparent 50%)'}} />
//         <div className="max-w-[960px] mx-auto px-8 text-center relative z-10" >
//           <div className="inline-flex items-center gap-2 font-mono text-[10px] text-indigo-pale/60 tracking-[0.16em] uppercase mb-6" >A different shape of work</div>
//           <div className="font-serif text-[52px] font-semibold text-cream tracking-[-0.02em] leading-[1.08] text-wrap-balance" >
//             CRMs ask you to log the work.<br/>
//             <em className="text-indigo-light italic" >Zotra does the work, then logs it.</em>
//           </div>
//           <div className="mt-8 font-mono text-[10.5px] text-cream/40 tracking-[0.16em] uppercase" >— The Zotra philosophy</div>
//           <p className="text-[17px] text-cream/60 font-light leading-[1.6] max-w-[680px] mx-auto mt-10" >
//             The standard tools wait for your input — fields to fill, statuses to update, reports to run. Zotra inverts the loop. <strong className="text-cream/85 font-medium" >It works your accounts overnight, presents a five-minute brief in the morning, and asks for one decision at a time.</strong> You stay on the steering, not the data entry.
//           </p>
//         </div>
//       </section>

//       {/* ── FIVE AGENTS ── */}
//       <section id="agents" className="py-28 border-t border-sand bg-cream-200" >
//         <div className="max-w-[1280px] mx-auto px-8" >
//           <div className="mb-14 flex justify-between items-end" >
//             <div className="max-w-[560px]" >
//               <Eyebrow>Five specialist agents</Eyebrow>
//               <h2 className="font-serif text-[42px] font-semibold text-ink tracking-[-0.02em] leading-[1.08]" >A team of five, working in your tone, in the open.</h2>
//             </div>
//             <p className="text-[14px] text-ink-3 font-light leading-[1.65] max-w-[340px] text-right" >Each agent owns one job. They run on rhythm, surface evidence, and never send without your approval. You promote autonomy at your own pace.</p>
//           </div>

//           <div className="grid grid-cols-5 gap-3" >
//             {agents.map(agent => (
//               <div key={agent.name} className="p-6 border border-sand rounded-xl bg-white relative overflow-hidden shadow-[0_1px_4px_rgba(60,50,30,0.06)] hover:shadow-[0_6px_20px_rgba(60,50,30,0.10)] hover:-translate-y-1 transition-all group" >
//                 {/* status dot */}
//                 <div className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-[9px] text-ink-4 tracking-[0.06em] uppercase" >
//                   <span className={`w-1.5 h-1.5 rounded-full ${agent.idle ? 'bg-ink-5' : agent.watch ? 'bg-amber animate-pulse-dot' : 'bg-teal animate-pulse-dot'}`} />
//                   {agent.status}
//                 </div>
//                 {/* Icon */}
//                 <div className="w-11 h-11 rounded-xl grid place-items-center text-white mb-5"  style={{ background: agent.color }}>
//                   <span className="w-[18px] h-[18px]" >{agent.icon}</span>
//                 </div>
//                 <div className="font-serif font-semibold text-[15.5px] text-ink tracking-[-0.01em] mb-2" >{agent.name}</div>
//                 <p className="text-[12px] text-ink-3 leading-[1.55] font-light mb-4 min-h-[72px] text-wrap-pretty" >{agent.role}</p>
//                 <div className="flex gap-1.5 flex-wrap" >
//                   {agent.tags.map(t => <span key={t} className="font-mono text-[9px] text-ink-4 px-2 py-0.5 rounded-md bg-cream-200 tracking-[0.05em] border border-sand" >{t}</span>)}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── DAY ARC ── */}
//       <section id="dayarc" className="py-28 border-t border-sand bg-cream" >
//         <div className="max-w-[1280px] mx-auto px-8" >
//           <div className="mb-14 max-w-[680px]" >
//             <Eyebrow>Day arc</Eyebrow>
//             <h2 className="font-serif text-[42px] font-semibold text-ink tracking-[-0.02em] leading-[1.08]" >Built on the shape of a working day — not a Kanban board.</h2>
//             <p className="text-[14px] text-ink-3 font-light leading-[1.65] mt-4" >Zotra organises around the chapters you actually move through: morning, midday, evening. Each chapter has its own focus, its own surface, its own metric.</p>
//           </div>
//           <div className="grid grid-cols-3 gap-4" >
//             {[
//               { icon: <IconSunrise className="w-[13px] h-[13px]"  />, time: 'Morning · 09:00', heading: 'Approve the work that\'s already done.', body: 'Overnight drafts, ranked priorities, risks surfaced. Five minutes from coffee to "go". You decide, Zotra ships.', items: ['5-minute morning brief', 'Approvals queue · in-tone drafts', 'Risk & ageing escalations'], color: 'text-indigo', bgColor: 'bg-indigo-pale' },
//               { icon: <IconSun className="w-[13px] h-[13px]"  />, time: 'Midday · 12:00', heading: 'Steer between the meetings.', body: 'Stalled deals re-engaged. Echo files action items from your morning calls. The day stays on track even when you\'re not on it.', items: ['Auto follow-ups post-call', 'Stalled-deal sweeps', 'Meeting prep · next 3 events'], color: 'text-amber', bgColor: 'bg-amber-pale' },
//               { icon: <IconSunset className="w-[13px] h-[13px]"  />, time: 'Evening · 18:00', heading: 'Close the loop, queue the morning.', body: 'Day summary, what moved, what slipped, what\'s coming tomorrow. Overnight tasks dispatched while you switch off.', items: ['End-of-day summary', 'Tomorrow queued · drafts started', 'Renewal & pipeline rollups'], color: 'text-teal', bgColor: 'bg-teal-pale' },
//             ].map(c => (
//               <div key={c.time} className="p-7 border border-sand rounded-xl bg-white shadow-[0_1px_4px_rgba(60,50,30,0.06)] hover:shadow-[0_4px_16px_rgba(60,50,30,0.08)] transition-shadow" >
//                 <div className={`inline-flex items-center gap-2 font-mono text-[9.5px] tracking-[0.14em] uppercase font-medium mb-4 ${c.color}`}>
//                   <div className={`w-6 h-6 rounded-lg ${c.bgColor} grid place-items-center`}>{c.icon}</div>
//                   {c.time}
//                 </div>
//                 <h3 className="font-serif font-semibold text-[20px] text-ink tracking-[-0.015em] leading-[1.2] mb-2.5" >{c.heading}</h3>
//                 <p className="text-[13px] text-ink-3 leading-[1.6] font-light text-wrap-pretty" >{c.body}</p>
//                 <ul className="mt-5 flex flex-col gap-2" >
//                   {c.items.map(item => (
//                     <li key={item} className={`flex items-center gap-2 text-[11.5px] font-mono list-none ${c.color}`}>
//                       <span className="text-[8px]" >●</span>
//                       <span className="text-ink-3 tracking-[0.02em]" >{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── CONSTELLATION ── */}
//       <section id="constellation" className="py-28 border-t border-sand bg-cream-200" >
//         <div className="max-w-[1280px] mx-auto px-8" >
//           <div className="grid grid-cols-[1fr_1.1fr] gap-16 items-center" >
//             <div>
//               <Eyebrow>Constellation view</Eyebrow>
//               <h2 className="font-serif text-[42px] font-semibold text-ink tracking-[-0.02em] leading-[1.08] text-wrap-balance" >See every opportunity at a glance — by heat, not by stage.</h2>
//               <p className="text-[15px] text-ink-3 font-light leading-[1.6] max-w-[480px] mt-5" >Vertical: stage. Horizontal: time in stage. Size: ARR. Colour: heat — replies, momentum, engagement. Stalled cool opportunities on the right need rescuing. Hot ones rising up need closing.</p>
//               <div className="flex flex-col gap-3 mt-7" >
//                 {[
//                   { type: 'hot', label: 'Hot', desc: 'active intent, replies, momentum', color: '#5552C9' },
//                   { type: 'warm', label: 'Warm', desc: 'engaged, steady, watch the cadence', color: '#C4922A' },
//                   { type: 'cool', label: 'Cool', desc: 'quiet, may drift, may need a nudge', color: '#5A8AB4' },
//                 ].map(h => (
//                   <div key={h.type} className="flex items-center gap-3 text-[13px] text-ink-3" >
//                     <div className="w-3.5 h-3.5 rounded-full shrink-0"  style={{ background: h.color }} />
//                     <div><strong className="text-ink font-medium" >{h.label}</strong> — {h.desc}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Map visualization */}
//             <div className="bg-white border border-sand rounded-xl shadow-[0_4px_20px_rgba(60,50,30,0.08)] p-6 relative h-[420px] overflow-hidden" >
//               <div className="absolute inset-[24px] flex flex-col justify-between font-mono text-[9px] text-ink-5 tracking-[0.08em] uppercase pointer-events-none z-0" >
//                 {['QUALIFY','DISCOVERY','EVALUATION','NEGOTIATION','CLOSING'].map(s => (
//                   <div key={s} className="flex items-center gap-2.5" >
//                     {s}
//                     <div className="flex-1 h-px"  style={{backgroundImage:'linear-gradient(90deg,rgba(60,50,30,0.08) 50%,transparent 50%)',backgroundSize:'6px 0.5px'}} />
//                   </div>
//                 ))}
//               </div>
//               {[
//                 { label:'AR', x:'12%', y:'18%', s:42, type:'hot' }, { label:'VL', x:'34%', y:'14%', s:28, type:'warm' },
//                 { label:'DL', x:'58%', y:'24%', s:24, type:'cool' }, { label:'NW', x:'22%', y:'36%', s:36, type:'warm' },
//                 { label:'AC', x:'48%', y:'42%', s:46, type:'hot' }, { label:'PR', x:'72%', y:'40%', s:22, type:'cool' },
//                 { label:'KH', x:'18%', y:'58%', s:32, type:'warm' }, { label:'TS', x:'44%', y:'62%', s:28, type:'cool' },
//                 { label:'MX', x:'64%', y:'56%', s:38, type:'hot' }, { label:'NS', x:'30%', y:'80%', s:34, type:'warm' },
//                 { label:'VS', x:'60%', y:'80%', s:26, type:'cool' },
//               ].map(orb => (
//                 <div key={orb.label} className="absolute rounded-full grid place-items-center font-serif font-semibold text-[10px] text-white shadow-[0_3px_12px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform cursor-default z-10" 
//                   style={{ left: orb.x, top: orb.y, width: orb.s, height: orb.s,
//                     background: orb.type === 'hot' ? '#5552C9' : orb.type === 'warm' ? '#C4922A' : '#5A8AB4' }}>
//                   {orb.label}
//                 </div>
//               ))}
//               <div className="absolute bottom-3.5 left-6 right-6 flex justify-between font-mono text-[9px] text-ink-5 tracking-[0.06em]" >
//                 <span>0d in stage</span><span>30d</span><span>60d</span><span>90d+ (stale)</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── HOW IT WORKS ── */}
//       <section id="how" className="py-28 border-t border-sand bg-cream" >
//         <div className="max-w-[1280px] mx-auto px-8" >
//           <div className="mb-14 max-w-[680px]" >
//             <Eyebrow>How it works</Eyebrow>
//             <h2 className="font-serif text-[42px] font-semibold text-ink tracking-[-0.02em] leading-[1.08]" >Connect inbox. Intelligence appears.</h2>
//             <p className="text-[14px] text-ink-3 font-light leading-[1.65] mt-4" >Four moves. No implementation deck, no data entry. Your workspace builds itself from the conversations you've already had.</p>
//           </div>
//           <div className="grid grid-cols-4 gap-3" >
//             {[
//               { n:'01', label:'CONNECT', icon:<IconMail className="w-[17px] h-[17px]"  />, heading:'Authorize Gmail or Outlook in 30 seconds.', items:['read-only oauth scopes','backfill last 24 months','region pinned · auditable'] },
//               { n:'02', label:'DETECT', icon:<IconRadar className="w-[17px] h-[17px]"  />, heading:'Zotra recognises accounts, champions, signals, risks.', items:['opportunities surfaced','stakeholders mapped','renewals & risks flagged'] },
//               { n:'03', label:'DRAFT', icon:<IconPen className="w-[17px] h-[17px]"  />, heading:'Composer writes overnight in your tone.', items:['reply & follow-up drafts','proposals & redlines','re-engages for stalled deals'] },
//               { n:'04', label:'APPROVE', icon:<IconCheckSq className="w-[17px] h-[17px]"  />, heading:'You arrive to a five-minute brief.', items:['one decision at a time','edit · send · dismiss','promote autonomy at your pace'] },
//             ].map((s) => (
//               <div key={s.n} className="p-7 border border-sand rounded-xl bg-white shadow-[0_1px_4px_rgba(60,50,30,0.06)] hover:shadow-[0_4px_16px_rgba(60,50,30,0.09)] transition-shadow flex flex-col gap-4" >
//                 <div className="flex items-center justify-between" >
//                   <span className="font-mono text-[22px] font-medium text-ink-5 leading-none" >{s.n}</span>
//                   <div className="w-9 h-9 rounded-lg bg-indigo-pale text-indigo grid place-items-center" >{s.icon}</div>
//                 </div>
//                 <div className="font-mono text-[9px] text-indigo tracking-[0.16em] uppercase" >{s.label}</div>
//                 <h3 className="font-serif font-semibold text-[15.5px] text-ink tracking-[-0.01em] leading-[1.3]" >{s.heading}</h3>
//                 <ul className="flex flex-col gap-1.5 mt-auto" >
//                   {s.items.map(item => (
//                     <li key={item} className="list-none flex items-baseline gap-2 text-[11.5px] text-ink-3 font-mono tracking-[0.02em]" >
//                       <span className="text-ink-5 text-[9px]" >→</span>{item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── ICP ── */}
//       <section id="icp" className="py-28 border-t border-sand bg-cream-200" >
//         <div className="max-w-[1280px] mx-auto px-8" >
//           <div className="mb-14 max-w-[680px]" >
//             <Eyebrow>Built for service businesses</Eyebrow>
//             <h2 className="font-serif text-[42px] font-semibold text-ink tracking-[-0.02em] leading-[1.08]" >If revenue runs through your inbox, this is for you.</h2>
//             <p className="text-[14px] text-ink-3 font-light leading-[1.65] mt-4" >Service businesses don't have a product spec — they have a relationship trajectory. Zotra is shaped for that work.</p>
//           </div>
//           <div className="grid grid-cols-4 gap-3" >
//             {icpItems.map(item => (
//               <div key={item.name} className="p-6 border border-sand rounded-xl bg-white shadow-[0_1px_4px_rgba(60,50,30,0.06)] hover:border-ink-6 hover:-translate-y-0.5 hover:shadow-[0_5px_18px_rgba(60,50,30,0.09)] transition-all" >
//                 <div className="w-9 h-9 rounded-lg bg-indigo-pale text-indigo grid place-items-center mb-4" ><span className="w-4 h-4" >{item.icon}</span></div>
//                 <div className="font-serif font-semibold text-[14.5px] text-ink tracking-[-0.01em] mb-1.5" >{item.name}</div>
//                 <p className="text-[12px] text-ink-4 leading-[1.55] font-light" >{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── FIRST WEEK ── */}
//       <section id="firstweek" className="py-28 border-t border-sand bg-cream" >
//         <div className="max-w-[1280px] mx-auto px-8" >
//           <div className="mb-14 max-w-[680px]" >
//             <Eyebrow>First week experience</Eyebrow>
//             <h2 className="font-serif text-[42px] font-semibold text-ink tracking-[-0.02em] leading-[1.08]" >By tomorrow morning, your accounts are already worked.</h2>
//             <p className="text-[14px] text-ink-3 font-light leading-[1.65] mt-4" >Onboarding is the strategy. Connect today, and the first Morning Pulse lands while you sleep.</p>
//           </div>
//           <div className="grid grid-cols-2 gap-4" >
//             {[
//               { n: 'DAY 01', h: 'From connect to first Morning Pulse.', items: [
//                 { t: '00:30', c: '<b>Inbox connected</b> · 24 months back-filled' },
//                 { t: '02:00', c: '<b>14 accounts</b> detected, 38 stakeholders mapped' },
//                 { t: '04:00', c: '<b>Forager</b> enriched org maps and technographics' },
//                 { t: '06:00', c: '<b>First overnight Pulse</b> — 4 drafts, 2 risks' },
//               ]},
//               { n: 'WEEK 01', h: 'The team starts handing you the day.', items: [
//                 { t: 'DAY 2', c: '<b>Composer</b> drafted proposal for Acme · evidence linked' },
//                 { t: 'DAY 3', c: '<b>Echo</b> filed action items from 4 calls' },
//                 { t: 'DAY 5', c: '<b>Watcher</b> caught a champion shift · backup recommended' },
//                 { t: 'DAY 7', c: '<b>Renewal Agent</b> active · Karst T-87, prob 74 ↗' },
//               ]},
//             ].map(card => (
//               <div key={card.n} className="p-8 border border-sand rounded-xl bg-white shadow-[0_1px_4px_rgba(60,50,30,0.06)]" >
//                 <div className="font-mono text-[9.5px] text-indigo tracking-[0.16em] font-medium uppercase mb-2" >{card.n}</div>
//                 <h3 className="font-serif font-semibold text-[22px] text-ink tracking-[-0.015em] mb-6" >{card.h}</h3>
//                 <div className="flex flex-col gap-2.5" >
//                   {card.items.map(item => (
//                     <div key={item.t} className="flex items-center gap-3.5 p-3.5 bg-cream-100 border border-sand rounded-lg text-[12.5px] text-ink-2 leading-[1.45]" >
//                       <div className="font-mono text-[9px] text-ink-5 tracking-[0.08em] uppercase shrink-0 w-[52px]" >{item.t}</div>
//                       <div className="flex-1"  dangerouslySetInnerHTML={{ __html: item.c.replace(/<b>/g, '<span class="text-ink font-medium">').replace(/<\/b>/g, '</span>') }} />
//                       <div className="font-mono text-[9.5px] text-teal px-2 py-0.5 bg-teal-pale rounded-md tracking-[0.05em] shrink-0 border border-teal/20" >DONE</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── VS CRM ── */}
//       <section id="vs" className="py-28 border-t border-sand bg-cream-200" >
//         <div className="max-w-[1280px] mx-auto px-8" >
//           <div className="mb-14 max-w-[680px]" >
//             <Eyebrow>Zotra vs. CRM</Eyebrow>
//             <h2 className="font-serif text-[42px] font-semibold text-ink tracking-[-0.02em] leading-[1.08]" >A CRM watches you work. Zotra does the work.</h2>
//             <p className="text-[14px] text-ink-3 font-light leading-[1.65] mt-4" >Records vs. drafts. Pipeline vs. rhythm. Activities vs. action. The shape of the job is different — so the system has to be.</p>
//           </div>
//           <div className="rounded-xl border border-sand overflow-hidden bg-white shadow-[0_1px_4px_rgba(60,50,30,0.06)]" >
//             <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-cream-200 border-b border-sand" >
//               {['What you get', 'Traditional CRM', 'Zotra'].map((h, i) => (
//                 <div key={h} className={`p-4 text-[10.5px] font-mono font-semibold tracking-[0.12em] uppercase ${i === 0 ? 'text-ink-4' : i === 1 ? 'text-ink-3' : 'text-indigo'}`}>{h}</div>
//               ))}
//             </div>
//             {[
//               ['Data entry', 'You log activities', 'Zotra logs the work it did'],
//               ['Drafts', 'You write them', 'Written overnight, in your tone'],
//               ['Signals', 'You check dashboards', 'Watcher pings only when it matters'],
//               ['Champions', 'Static contact records', 'Live · shift detection · backup mapping'],
//               ['Meetings', 'You take notes after', 'Echo joins · files actions automatically'],
//               ['Mornings', 'You catch up', 'You approve'],
//             ].map(([what, crm, zotra], i, arr) => (
//               <div key={what} className={`grid grid-cols-[1.4fr_1fr_1fr] text-[13.5px] ${i < arr.length - 1 ? 'border-b border-sand' : ''}`}>
//                 <div className="p-4 text-ink-4 font-mono text-[11px] tracking-[0.04em]" >{what}</div>
//                 <div className="p-4 text-ink-3" >{crm}</div>
//                 <div className="p-4 text-ink font-medium bg-indigo-pale/30" >{zotra}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── EDITIONS ── */}
//       <section id="editions" className="py-28 border-t border-sand bg-cream" >
//         <div className="max-w-[1280px] mx-auto px-8" >
//           <div className="mb-14 max-w-[680px]" >
//             <Eyebrow>Editions</Eyebrow>
//             <h2 className="font-serif text-[42px] font-semibold text-ink tracking-[-0.02em] leading-[1.08]" >Hire the team you need today. Add agents as you grow.</h2>
//             <p className="text-[14px] text-ink-3 font-light leading-[1.65] mt-4" >Each edition adds agents and the rhythms that connect them. Upgrade in place — nothing migrates, nothing breaks.</p>
//           </div>
//           <div className="grid grid-cols-4 gap-3" >
//             {tiers.map((tier) => (
//               <div key={tier.name} className={`p-7 rounded-xl border flex flex-col relative ${tier.featured ? 'border-indigo/50 bg-indigo-pale/30 shadow-[0_4px_24px_rgba(85,82,201,0.12)]' : 'border-sand bg-white shadow-[0_1px_4px_rgba(60,50,30,0.06)]'}`}>
//                 {tier.featured && <div className="absolute top-4 right-4 font-mono text-[9px] text-indigo bg-white border border-indigo/30 px-2 py-0.5 rounded-lg tracking-[0.1em] uppercase" >POPULAR</div>}
//                 <div className="font-mono text-[9.5px] text-indigo tracking-[0.16em] font-medium uppercase mb-2" >{tier.name}</div>
//                 <div className="font-serif font-semibold text-[18px] text-ink tracking-[-0.015em] mb-1.5" >{tier.heading}</div>
//                 <p className="text-[12px] text-ink-4 leading-[1.55] font-light min-h-12" >{tier.desc}</p>
//                 <div className="mt-6 flex items-baseline gap-1" >
//                   <span className="font-serif font-semibold text-[32px] text-ink tracking-[-0.02em]" >{tier.price}</span>
//                   {tier.sub && <span className="text-[11px] text-ink-4 font-mono tracking-[0.04em]" >{tier.sub}</span>}
//                 </div>
//                 <ul className="mt-6 pt-6 border-t border-sand/80 flex flex-col gap-2.5 flex-1" >
//                   {tier.features.map(f => (
//                     <li key={f} className="list-none flex items-start gap-2 text-[12.5px] text-ink-3 leading-[1.5]" 
//                       dangerouslySetInnerHTML={{ __html:
//                         `<span class="text-teal font-bold text-[10px] mt-0.5 shrink-0">✓</span><span>${f.replace(/<b>/g, '<span class="text-ink font-medium">').replace(/<\/b>/g, '</span>')}</span>`
//                       }} />
//                   ))}
//                 </ul>
//                 <div className="mt-6" >
//                   <Link to={tier.name === 'Enterprise' ? '#' : '/signup'} className={`flex items-center justify-center h-[38px] w-full rounded-lg border text-[12.5px] font-medium transition-all ${tier.featured ? 'bg-indigo text-white border-indigo hover:bg-indigo-light' : 'bg-transparent border-sand text-ink-2 hover:bg-cream-200 hover:border-ink-6'}`}>
//                     {tier.name === 'Enterprise' ? 'Contact sales' : 'Start free'}
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── FINAL CTA ── */}
//       <section className="py-36 text-center relative overflow-hidden border-t border-sand"  style={{background:'linear-gradient(135deg, #3A2A1C 0%, #2A1E10 50%, #2E2318 100%)'}}>
//         <div className="absolute inset-0 pointer-events-none"  style={{background:'radial-gradient(900px 600px at 50% 0%,rgba(85,82,201,0.20),transparent 60%),radial-gradient(700px 500px at 20% 100%,rgba(26,158,124,0.15),transparent 60%)'}} />
//         {/* Decorative lines */}
//         <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]" >
//           {[...Array(8)].map((_, i) => (
//             <div key={i} className="absolute border-t border-cream"  style={{top: `${i * 14}%`, left:0, right:0}} />
//           ))}
//         </div>
//         <div className="max-w-[1280px] mx-auto px-8 relative z-10" >
//           <Eyebrow light>Get started</Eyebrow>
//           <h2 className="font-serif text-[66px] font-semibold text-cream tracking-[-0.02em] leading-[1.02] text-wrap-balance" >
//             Your business lives in email.<br/><em className="text-indigo-light italic" >Zotra works it overnight.</em>
//           </h2>
//           <p className="text-[17px] text-cream/60 font-light leading-[1.6] max-w-[580px] mx-auto mt-6" >Six minutes to connect. Tomorrow morning, your first Pulse lands. No credit card, no implementation deck — just an inbox and one real customer.</p>
//           <div className="flex justify-center gap-3 mt-10" >
//             <Btn to="/signup" primary lg light>Connect Gmail <span className="font-mono text-[11px]" >→</span></Btn>
//             <Btn to="/product" lg light>See a demo morning</Btn>
//           </div>
//           <div className="text-cream/35 mt-7 font-mono text-[11.5px] tracking-[0.06em]" >free 30 days · self-serve · cancel any time</div>
//         </div>
//       </section>
//     </div>
//   );
// }

import React from 'react';
import { Link } from 'react-router-dom';
import AppMock from '../components/AppMock';
import {
  IconCompass, IconEye, IconSearch, IconMic, IconPen,
  IconSunrise, IconSun, IconSunset, IconZap, IconUsers,
  IconGrid, IconTrend, IconSparkles, IconReceipt, IconBuilding,
  IconMail, IconRadar, IconCheckSq,
} from '../components/Icons';

// ── Reusable Eyebrow ──────────────────────────────────────────────────────
const Eyebrow = ({ children, light }: { children: React.ReactNode; light?: boolean }) => (
  <div className={`inline-flex items-center gap-2.5 text-[10px] font-mono font-semibold tracking-[0.20em] uppercase mb-6 ${light ? 'text-indigo-pale/70' : 'text-indigo'}`}>
    <span className="w-5 h-px bg-current opacity-60" />
    {children}
    <span className="w-5 h-px bg-current opacity-60" />
  </div>
);

// ── Button ────────────────────────────────────────────────────────────────
const Btn = ({ href, to, primary, lg, light, children }: { href?: string; to?: string; primary?: boolean; lg?: boolean; light?: boolean; children: React.ReactNode }) => {
  const base = `inline-flex items-center gap-2 font-medium tracking-[-0.005em] transition-all duration-200`;
  const size = lg ? 'h-12 px-7 text-[13.5px] rounded-xl' : 'h-9 px-5 text-[13px] rounded-lg';
  const variant = primary
    ? light
      ? 'bg-white text-ink border border-white hover:bg-cream-100 shadow-[0_2px_16px_rgba(255,255,255,0.15)]'
      : 'bg-indigo text-white border border-indigo hover:bg-indigo-light shadow-[0_2px_16px_rgba(85,82,201,0.30)] hover:shadow-[0_4px_24px_rgba(85,82,201,0.40)] hover:-translate-y-px'
    : light
      ? 'bg-white/[0.08] border border-white/[0.18] text-white hover:bg-white/[0.15] hover:border-white/[0.28]'
      : 'bg-transparent border border-sand text-ink-2 hover:bg-cream-200 hover:border-ink-6 hover:-translate-y-px';
  const cls = `${base} ${size} ${variant}`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  return <a href={href || '#'} className={cls}>{children}</a>;
};

// ── Divider ───────────────────────────────────────────────────────────────
const SectionDivider = ({ light }: { light?: boolean }) => (
  <div className={`w-full h-px ${light ? 'bg-white/10' : 'bg-sand'}`} />
);

// ── Data ──────────────────────────────────────────────────────────────────
const agents = [
  { name: 'Zotra', subtitle: 'Drafts every reply, follow-up, and re-engage — in your tone', role: 'Drafts every reply, follow-up and re-engage in your tone. Nothing sends without your nod.', tags: ['Outreach', 'Drafts'], icon: <IconCompass />, color: '#5552C9', status: 'Working' },
  { name: 'Watcher', subtitle: 'Tracks champion shifts, buying signals, and account silence', role: 'Watches signals — pricing intent, hires, champion shifts, account silence. Pings you only when it matters.', tags: ['Signals', 'Champions'], icon: <IconEye />, color: '#1A9E7C', status: 'Live' },
  { name: 'Forager', subtitle: 'Enriches every account — org maps, contacts, hiring patterns', role: 'Enriches every account — org maps, technographics, hiring patterns, fresh contacts on every new lead.', tags: ['Enrichment', 'Org maps'], icon: <IconSearch />, color: 'var(--ink4)', status: 'Idle', idle: true },
  { name: 'Echo', subtitle: 'Joins your calls, files notes, and updates stakeholder maps', role: 'Joins your calls, takes notes, files action items to the right account, and updates stakeholder maps.', tags: ['Meetings', 'Actions'], icon: <IconMic />, color: '#C4922A', status: 'Calls', watch: true },
  { name: 'Composer', subtitle: 'Writes proposals, redlines, and anything that needs your voice', role: 'Writes drafts, adapts tone, prepares proposals and redlines. Trained on what you\'ve sent before.', tags: ['Writing', 'Proposals'], icon: <IconPen />, color: '#7A4EDB', status: 'Working' },
];

const icpItems = [
  {
    icon: <IconZap />, name: 'Agencies',
    desc: 'Retainers renew themselves or they don\'t. Zotra watches every account for the moment a champion goes quiet, a scope starts drifting, or a competitor starts appearing in job postings.'
  },
  {
    icon: <IconUsers />, name: 'Consultants & Professional Services',
    desc: 'Your pipeline is your relationships — and relationships slip when you\'re heads-down on delivery. Zotra holds the thread across every engagement so nothing falls through.'
  },
  {
    icon: <IconGrid />, name: 'Solo Operators & Boutique Firms',
    desc: 'You\'re the whole commercial team. Zotra makes one person run like five — drafts in your tone, signals across your accounts, a shaped day waiting every morning.'
  },
];

const tiers = [
  {
    name: 'Solo', heading: 'You are the commercial team', desc: 'Morning Pulse, drafts in your tone, a five-minute morning brief. Zotra + Composer.', price: '$29', sub: '/ user / month',
    features: ['Morning Pulse · daily rhythm', '2 agents · <b>Zotra · Composer</b>', 'Gmail / Outlook connectors', 'Up to 200 accounts'], featured: false
  },
  {
    name: 'Team', heading: 'Full signal coverage, every account', desc: 'All three pulses, full signal coverage, calls joined and filed. Composer · Watcher · Echo · Forager.', price: '$79', sub: '/ user / month',
    features: ['All 3 daily pulses', '4 agents · <b>+ Watcher · Echo · Forager</b>', 'Calendar & meeting connectors', 'Unlimited accounts'], featured: true
  },
  {
    name: 'Operations', heading: 'When renewals and margins need watching too', desc: 'Add finance + renewal coverage. Ageing, margins, expansion signals, T-90 renewal windows.', price: '$149', sub: '/ user / month',
    features: ['All pulses · evening prep', '6 agents · <b>+ Finance · Renewal</b>', 'Accounting connectors · SAML', 'Portfolio rollups'], featured: false
  },
  {
    name: 'Enterprise', heading: 'Custom agents, audit trail, dedicated support', desc: 'Governance, audit, regions, APIs. Custom agents, custom rhythms, dedicated engineer.', price: 'Talk to us', sub: '',
    features: ['Everything in Operations', 'API · custom agents', 'Region pinning · audit trail', 'Dedicated success engineer'], featured: false
  },
];

export default function Home() {
  return (
    <div className="bg-cream">

      {/* ── HERO ── */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        {/* Decorative rings — larger, more intentional */}
        <div className="absolute top-[-280px] right-[-360px] w-[1000px] h-[1000px] rounded-full border border-sand/50 pointer-events-none" />
        <div className="absolute top-[-160px] right-[-240px] w-[700px] h-[700px] rounded-full border border-sand/70 pointer-events-none" />
        <div className="absolute top-[20px] right-[-120px] w-[380px] h-[380px] rounded-full bg-indigo/[0.035] pointer-events-none" />
        {/* Subtle grain texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
        />

        <div className="max-w-[1280px] mx-auto px-10 relative z-10">
          <Eyebrow>For service businesses · Inbox-native · No setup</Eyebrow>

          <div className="max-w-[860px] mb-8">
            <h1 className="font-serif text-[68px] font-semibold text-ink tracking-[-0.025em] leading-[1.01] text-wrap-balance">
              Wake up to your accounts{' '}
              <em className="text-indigo not-italic relative">
                already&nbsp;worked.
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-indigo/20" />
              </em>
            </h1>
          </div>

          <p className="text-[18px] text-ink-3 font-light leading-[1.65] max-w-[580px] mb-10 text-wrap-pretty">
            Deals go cold while you're delivering work. Champions leave while you're in meetings. Invoices age while you're on calls. Zotra runs your commercial day overnight — so you arrive each morning to a five-minute brief, not a backlog of things that slipped.
          </p>

          <div className="flex items-center gap-4 mb-12">
            <Btn to="/signup" primary lg>Connect Gmail <span className="font-mono text-[11px]">→</span></Btn>
            <Btn to="/product" lg>See how it works</Btn>
          </div>

          {/* Trust block — refined card */}
          <div className="mt-0 p-5 border border-sand/90 rounded-2xl bg-white/70 backdrop-blur-sm max-w-[540px] flex items-start gap-4 shadow-[0_2px_12px_rgba(60,50,30,0.06),0_1px_3px_rgba(60,50,30,0.04)]">
            <div className="w-9 h-9 rounded-xl bg-teal-pale text-teal grid place-items-center shrink-0 mt-0.5 shadow-[inset_0_1px_2px_rgba(26,158,124,0.15)]">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 1a4 4 0 0 0-4 4v1H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1V5a4 4 0 0 0-4-4zm2 5H6V5a2 2 0 1 1 4 0v1z" fill="currentColor"/></svg>
            </div>
            <div>
              <div className="font-semibold text-[13px] text-ink tracking-[-0.01em] mb-1">Read-only by default. You approve before anything sends.</div>
              <div className="text-[12px] text-ink-4 leading-[1.55]">Zotra reads your inbox to understand your accounts. It never modifies, deletes, or accesses anything outside what you've authorised.</div>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-8 text-[11px] text-ink-5 flex-wrap font-mono tracking-[0.08em]">
            {['SOC 2 Type II', 'Live in 6 minutes', 'EU · US · UK · APAC regions'].map((item, i, arr) => (
              <span key={item} className="flex items-center gap-6">
                {item}
                {i < arr.length - 1 && <span className="w-1 h-1 rounded-full bg-ink-6" />}
              </span>
            ))}
          </div>

          <div className="mt-16">
            <AppMock />
          </div>
        </div>
      </section>

      {/* ── FOUNDER TRUST BLOCK ── */}
      <section className="py-24 border-t border-sand" style={{background: 'linear-gradient(135deg, #F7F3EC 0%, #FAF8F3 100%)'}}>
        <div className="max-w-[1000px] mx-auto px-10">
          <div className="grid grid-cols-[220px_1fr] gap-20 items-start">
            <div className="pt-1">
              <Eyebrow>Why we built this</Eyebrow>
              <div className="w-10 h-[2px] bg-indigo rounded-full mb-5" />
              <p className="text-[12px] text-ink-4 font-mono tracking-[0.06em] leading-[1.7]">From people who ran service businesses — and watched the revenue slip quietly.</p>
            </div>
            <div className="border-l-2 border-sand pl-14">
              <blockquote className="font-serif text-[23px] font-medium text-ink tracking-[-0.015em] leading-[1.5] text-wrap-pretty mb-7">
                "Service businesses lose revenue quietly. Not to bad proposals or losing pitches — but to the gap between delivery and selling. The champion who moved on. The deal that went cold while you were heads-down. The renewal no one noticed was approaching."
              </blockquote>
              <p className="text-[15px] text-ink-3 font-light leading-[1.7] max-w-[560px] mb-4">
                We built Zotra because we ran service businesses and watched it happen. The CRM was always behind. The inbox was always full. The morning always started with catching up instead of moving forward.
              </p>
              <p className="text-[15px] text-ink font-semibold tracking-[-0.01em] mb-8">This is the tool we wished we had.</p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-1.5">
                  <div className="w-9 h-9 rounded-full bg-indigo/20 border-2 border-white grid place-items-center font-serif font-semibold text-[13px] text-indigo shadow-sm">Z</div>
                  <div className="w-9 h-9 rounded-full bg-teal/15 border-2 border-white grid place-items-center font-serif font-semibold text-[13px] text-teal shadow-sm">Z</div>
                </div>
                <div>
                  <div className="font-semibold text-[13px] text-ink">Founders, Zotra</div>
                  <div className="font-mono text-[9.5px] text-ink-5 tracking-[0.10em] uppercase mt-0.5">Built from first-hand experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DON'T DO ── */}
      <section className="py-20 border-t border-sand bg-cream-200">
        <div className="max-w-[1000px] mx-auto px-10">
          <div className="grid grid-cols-[220px_1fr] gap-20 items-start">
            <div className="pt-1">
              <Eyebrow>Honest limits</Eyebrow>
              <h3 className="font-serif text-[26px] font-semibold text-ink tracking-[-0.02em] leading-[1.2]">A few things Zotra doesn't do</h3>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {[
                { icon: '✗', text: 'It never sends anything without your approval. Ever.' },
                { icon: '✗', text: "It doesn't replace your judgment — it surfaces what needs it." },
                { icon: '✗', text: "It doesn't work for product companies or inbound-led sales." },
                { icon: '✓', text: "It's built for service businesses where revenue runs through relationships." },
                { icon: '✓', text: "It's not a CRM you have to maintain. If you have to log it yourself, that's a bug." },
              ].map((item, i) => (
                <div key={i} className={`flex items-start gap-4 px-5 py-4 rounded-xl border transition-all ${item.icon === '✓' ? 'bg-teal-pale/50 border-teal/20 hover:border-teal/35' : 'bg-white border-sand hover:border-ink-6'}`}>
                  <span className={`font-mono text-[11px] font-bold mt-px shrink-0 w-4 ${item.icon === '✓' ? 'text-teal' : 'text-ink-5'}`}>{item.icon}</span>
                  <p className="text-[13.5px] text-ink-2 leading-[1.55]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PULSE ENGINE ── */}
      <section id="pulse" className="py-32 border-t border-sand bg-cream">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="grid grid-cols-[360px_1fr] gap-20 items-start">
            <div className="sticky top-12">
              <Eyebrow>Commercial rhythm</Eyebrow>
              <h2 className="font-serif text-[44px] font-semibold text-ink tracking-[-0.025em] leading-[1.06] mb-5">Three pulses a day. One commercial heartbeat.</h2>
              <p className="text-[14.5px] text-ink-3 font-light leading-[1.7]">Zotra works on a rhythm — not a notification stream. Drafts before you arrive. Sweeps at midday. Wraps before you log off. Every cycle is reasoned, evidenced, and ready for one decision.</p>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { icon: <IconSunrise className="w-4 h-4" />, title: 'Morning Pulse', sub: '06:00 · Overnight wrap', status: 'Complete', live: false, items: ['<b>4 drafts</b> written in your tone — reviewable', '<b>31 signals</b> scanned across accounts', '<b>2 risks</b> flagged — champion shift, ageing invoice', '<b>Priorities ranked</b> — top 5 surfaced in your plan'] },
                { icon: <IconSun className="w-4 h-4" />, title: 'Midday Check', sub: '12:00 · In-day sweep', status: '● Live', live: true, items: ['<b>Stalled deals</b> reviewed — nudges drafted', '<b>Urgent action</b> sweep — escalations surfaced', '<b>Meeting follow-ups</b> from your morning calls', '<b>Calendar prep</b> for the next three meetings'] },
                { icon: <IconSunset className="w-4 h-4" />, title: 'Evening Wrap', sub: '18:00 · Tomorrow prep', status: 'Scheduled', live: false, items: ['<b>Day summary</b> — what closed, what moved, what slipped', '<b>Tomorrow\'s plan</b> queued — drafts started overnight', '<b>Stakeholder updates</b> logged across accounts', '<b>Renewal calendar</b> rolled forward'] },
              ].map(card => (
                <div key={card.title} className={`rounded-2xl border overflow-hidden flex transition-all hover:shadow-[0_4px_20px_rgba(60,50,30,0.08)] ${card.live ? 'border-teal/35 bg-teal-pale/35 shadow-[0_2px_8px_rgba(26,158,124,0.08)]' : 'border-sand bg-white shadow-[0_1px_4px_rgba(60,50,30,0.05)]'}`}>
                  <div className={`w-[4px] shrink-0 ${card.live ? 'bg-teal' : 'bg-sand'}`} />
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className={`w-9 h-9 rounded-xl grid place-items-center shrink-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)] ${card.live ? 'bg-teal text-white' : 'bg-cream-300 text-ink-4'}`}>{card.icon}</div>
                      <div className="flex-1">
                        <div className="font-serif font-semibold text-[16px] text-ink tracking-[-0.01em]">{card.title}</div>
                        <div className="font-mono text-[9.5px] text-ink-4 tracking-[0.10em] uppercase mt-0.5">{card.sub}</div>
                      </div>
                      <div className={`font-mono text-[9px] px-3 py-1 rounded-lg tracking-[0.10em] uppercase font-semibold ${card.live ? 'bg-teal text-white shadow-[0_1px_4px_rgba(26,158,124,0.3)]' : 'bg-cream-300 text-ink-4'}`}>{card.status}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-10 gap-y-2">
                      {card.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-[12.5px] text-ink-3 leading-[1.5]">
                          <div className={`w-[4px] h-[4px] rounded-full mt-[7px] shrink-0 ${card.live ? 'bg-teal' : 'bg-ink-5'}`} />
                          <div dangerouslySetInnerHTML={{ __html: item.replace(/<b>/g, '<span class="text-ink font-medium">').replace(/<\/b>/g, '</span>') }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section id="manifesto" className="py-36 border-t border-sand relative overflow-hidden" style={{background: 'linear-gradient(135deg, #2D3A2A 0%, #1B2E24 50%, #1C2B22 100%)'}}>
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(85,82,201,0.3), transparent 60%), radial-gradient(circle at 20% 80%, rgba(26,158,124,0.3), transparent 50%)'}} />
        {/* Subtle horizontal lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="absolute border-t border-cream" style={{top: `${i * 9}%`, left: 0, right: 0}} />
          ))}
        </div>
        <div className="max-w-[900px] mx-auto px-10 text-center relative z-10">
          <div className="inline-flex items-center gap-3 font-mono text-[9.5px] text-indigo-pale/50 tracking-[0.20em] uppercase mb-8">
            <span className="w-8 h-px bg-current" />
            A different shape of work
            <span className="w-8 h-px bg-current" />
          </div>
          <div className="font-serif text-[54px] font-semibold text-cream tracking-[-0.025em] leading-[1.06] text-wrap-balance mb-8">
            CRMs ask you to log the work.<br/>
            <em className="text-indigo-light italic">Zotra does the work, then logs it.</em>
          </div>
          <div className="font-mono text-[9.5px] text-cream/35 tracking-[0.18em] uppercase mb-12">— The Zotra philosophy</div>
          <p className="text-[17.5px] text-cream/60 font-light leading-[1.65] max-w-[660px] mx-auto mb-6">
            Every tool you've used waited for you to open it. Fields to fill, statuses to update, dashboards to check. The job only moved when you moved it.
          </p>
          <p className="text-[17.5px] text-cream/80 font-light leading-[1.65] max-w-[660px] mx-auto">
            Zotra inverts that loop. It works your accounts overnight, surfaces a five-minute brief each morning, and asks for one decision at a time. <strong className="text-cream font-medium">The accounts keep moving even when you're not on them.</strong>
          </p>
        </div>
      </section>

      {/* ── FIVE AGENTS ── */}
      <section id="agents" className="py-32 border-t border-sand bg-cream-200">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="flex justify-between items-end mb-16">
            <div className="max-w-[520px]">
              <Eyebrow>Five specialist agents</Eyebrow>
              <h2 className="font-serif text-[44px] font-semibold text-ink tracking-[-0.025em] leading-[1.06]">A team of five, working in your tone, in the open.</h2>
            </div>
            <p className="text-[14px] text-ink-3 font-light leading-[1.7] max-w-[320px] text-right pb-1">Each agent owns one job. They run on rhythm, surface evidence, and never send without your approval. You promote autonomy at your own pace.</p>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {agents.map(agent => (
              <div key={agent.name} className="p-6 border border-sand rounded-2xl bg-white relative overflow-hidden shadow-[0_1px_4px_rgba(60,50,30,0.05)] hover:shadow-[0_8px_28px_rgba(60,50,30,0.11)] hover:-translate-y-1.5 transition-all duration-200 group">
                {/* Subtle top accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: agent.color }} />
                {/* Status */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-[8.5px] text-ink-5 tracking-[0.08em] uppercase">
                  <span className={`w-1.5 h-1.5 rounded-full ${agent.idle ? 'bg-ink-5' : agent.watch ? 'bg-amber animate-pulse-dot' : 'bg-teal animate-pulse-dot'}`} />
                  {agent.status}
                </div>
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl grid place-items-center text-white mb-5 shadow-[0_2px_8px_rgba(0,0,0,0.18)]" style={{ background: agent.color }}>
                  <span className="w-[18px] h-[18px]">{agent.icon}</span>
                </div>
                <div className="font-serif font-semibold text-[16px] text-ink tracking-[-0.015em] mb-1.5">{agent.name}</div>
                <p className="text-[10px] text-ink-4 font-mono tracking-[0.04em] mb-3 leading-[1.5]">{agent.subtitle}</p>
                <p className="text-[12px] text-ink-3 leading-[1.6] font-light mb-5 min-h-[60px] text-wrap-pretty">{agent.role}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {agent.tags.map(t => <span key={t} className="font-mono text-[8.5px] text-ink-4 px-2 py-0.5 rounded-md bg-cream-200 tracking-[0.06em] border border-sand">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DAY ARC ── */}
      <section id="dayarc" className="py-32 border-t border-sand bg-cream">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="max-w-[640px] mb-16">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="font-serif text-[44px] font-semibold text-ink tracking-[-0.025em] leading-[1.06] mb-5">Built on the shape of a working day — not a Kanban board.</h2>
            <p className="text-[15px] text-ink-3 font-light leading-[1.7]">Zotra organises around the chapters you actually move through: morning, midday, evening. Each chapter has its own focus, its own surface, its own metric.</p>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {[
              { icon: <IconSunrise className="w-[14px] h-[14px]" />, time: 'Morning · 09:00', heading: 'Approve the work that\'s already done.', body: 'Overnight drafts, ranked priorities, risks surfaced. Five minutes from coffee to "go". You decide, Zotra ships.', items: ['5-minute morning brief', 'Approvals queue · in-tone drafts', 'Risk & ageing escalations'], color: 'text-indigo', bgColor: 'bg-indigo-pale' },
              { icon: <IconSun className="w-[14px] h-[14px]" />, time: 'Midday · 12:00', heading: 'Steer between the meetings.', body: 'Stalled deals re-engaged. Echo files action items from your morning calls. The day stays on track even when you\'re not on it.', items: ['Auto follow-ups post-call', 'Stalled-deal sweeps', 'Meeting prep · next 3 events'], color: 'text-amber', bgColor: 'bg-amber-pale' },
              { icon: <IconSunset className="w-[14px] h-[14px]" />, time: 'Evening · 18:00', heading: 'Close the loop, queue the morning.', body: 'Day summary, what moved, what slipped, what\'s coming tomorrow. Overnight tasks dispatched while you switch off.', items: ['End-of-day summary', 'Tomorrow queued · drafts started', 'Renewal & pipeline rollups'], color: 'text-teal', bgColor: 'bg-teal-pale' },
            ].map(c => (
              <div key={c.time} className="p-8 border border-sand rounded-2xl bg-white shadow-[0_1px_4px_rgba(60,50,30,0.05)] hover:shadow-[0_6px_24px_rgba(60,50,30,0.09)] hover:-translate-y-1 transition-all duration-200">
                <div className={`inline-flex items-center gap-2.5 font-mono text-[9.5px] tracking-[0.14em] uppercase font-semibold mb-6 ${c.color}`}>
                  <div className={`w-7 h-7 rounded-lg ${c.bgColor} grid place-items-center shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]`}>{c.icon}</div>
                  {c.time}
                </div>
                <h3 className="font-serif font-semibold text-[21px] text-ink tracking-[-0.015em] leading-[1.2] mb-3">{c.heading}</h3>
                <p className="text-[13.5px] text-ink-3 leading-[1.65] font-light text-wrap-pretty mb-6">{c.body}</p>
                <ul className="flex flex-col gap-2.5 pt-5 border-t border-sand/60">
                  {c.items.map(item => (
                    <li key={item} className={`flex items-center gap-2.5 text-[11.5px] font-mono list-none ${c.color}`}>
                      <span className="text-[7px]">●</span>
                      <span className="text-ink-3 tracking-[0.02em]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIVID DEMO UI ── */}
      <section className="py-32 border-t border-sand bg-cream-200">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="max-w-[640px] mb-16">
            <Eyebrow>Morning brief · live example</Eyebrow>
            <h2 className="font-serif text-[44px] font-semibold text-ink tracking-[-0.025em] leading-[1.06] mb-5">What you wake up to.</h2>
            <p className="text-[15px] text-ink-3 font-light leading-[1.7]">Real signals, real context, real drafts. One decision at a time.</p>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {[
              {
                n: '01', account: 'Northwind', tag: 'Reply waiting', tagColor: 'bg-indigo text-white',
                signal: "Sasha's been waiting 3 days. Composer drafted a reply addressing all three legal points.",
                confidence: '88%', confColor: 'text-teal',
                action: 'Draft ready to send',
                detail: 'Re: MSA redline — Section 4.2 liability cap addressed, payment terms clarified.',
              },
              {
                n: '02', account: 'Kairo Health', tag: 'Champion risk', tagColor: 'bg-amber text-white',
                signal: "Maya Chen updated LinkedIn to 'Open to opportunities.' She's your champion on $96K. Watcher caught it at 6am.",
                confidence: 'Risk: High', confColor: 'text-amber',
                action: 'Backup contact identified',
                detail: 'James Park (VP Operations) now mapped. Warm-up sequence ready.',
              },
              {
                n: '03', account: 'Acme Robotics', tag: 'Intent signal', tagColor: 'bg-teal text-white',
                signal: '4 visitors from acme.io on /pricing this morning. They\'re looking. Re-engagement draft is ready.',
                confidence: 'Signal: Hot', confColor: 'text-indigo',
                action: 'Draft personalised to visit',
                detail: '"Saw you exploring — happy to walk through current pricing for your use case."',
              },
            ].map(task => (
              <div key={task.n} className="p-7 border border-sand rounded-2xl bg-white shadow-[0_1px_4px_rgba(60,50,30,0.05)] hover:shadow-[0_8px_28px_rgba(60,50,30,0.10)] hover:-translate-y-1 transition-all duration-200 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-ink-5 tracking-[0.10em]">TASK {task.n}</span>
                  <span className={`font-mono text-[8.5px] px-2.5 py-1 rounded-lg tracking-[0.10em] uppercase font-semibold ${task.tagColor}`}>{task.tag}</span>
                </div>
                <div>
                  <div className="font-serif font-semibold text-[18px] text-ink tracking-[-0.015em] mb-2.5">{task.account}</div>
                  <p className="text-[13px] text-ink-3 leading-[1.6] font-light">{task.signal}</p>
                </div>
                <div className="p-4 bg-cream-100 rounded-xl border border-sand/80">
                  <div className="font-mono text-[9px] text-ink-4 tracking-[0.10em] uppercase mb-1.5">{task.action}</div>
                  <p className="text-[12px] text-ink-3 italic leading-[1.5]">{task.detail}</p>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className={`font-mono text-[10px] font-semibold ${task.confColor}`}>{task.confidence}</span>
                  <div className="flex gap-2">
                    <button className="font-mono text-[8.5px] text-ink-4 px-3 py-1.5 rounded-lg border border-sand hover:bg-cream-200 tracking-[0.06em] transition-colors">Dismiss</button>
                    <button className="font-mono text-[8.5px] text-white px-3 py-1.5 rounded-lg bg-indigo hover:bg-indigo-light tracking-[0.06em] transition-colors shadow-[0_1px_6px_rgba(85,82,201,0.25)]">Approve →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSTELLATION ── */}
      <section id="constellation" className="py-32 border-t border-sand bg-cream">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="grid grid-cols-[1fr_1.15fr] gap-20 items-center">
            <div>
              <Eyebrow>Constellation view</Eyebrow>
              <h2 className="font-serif text-[44px] font-semibold text-ink tracking-[-0.025em] leading-[1.06] text-wrap-balance mb-6">See every opportunity at a glance — by heat, not by stage.</h2>
              <p className="text-[15px] text-ink-3 font-light leading-[1.7] max-w-[460px] mb-8">Vertical: stage. Horizontal: time in stage. Size: ARR. Colour: heat — replies, momentum, engagement. Stalled cool opportunities on the right need rescuing. Hot ones rising up need closing.</p>
              <div className="flex flex-col gap-3.5">
                {[
                  { type: 'hot', label: 'Hot', desc: 'active intent, replies, momentum', color: '#5552C9' },
                  { type: 'warm', label: 'Warm', desc: 'engaged, steady, watch the cadence', color: '#C4922A' },
                  { type: 'cool', label: 'Cool', desc: 'quiet, may drift, may need a nudge', color: '#5A8AB4' },
                ].map(h => (
                  <div key={h.type} className="flex items-center gap-3.5 text-[13.5px] text-ink-3">
                    <div className="w-3.5 h-3.5 rounded-full shrink-0 shadow-[0_1px_4px_rgba(0,0,0,0.12)]" style={{ background: h.color }} />
                    <div><strong className="text-ink font-semibold">{h.label}</strong> — {h.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map visualization — elevated */}
            <div className="bg-white border border-sand rounded-2xl shadow-[0_8px_32px_rgba(60,50,30,0.10),0_1px_4px_rgba(60,50,30,0.06)] p-7 relative h-[440px] overflow-hidden">
              {/* Grid background */}
              <div className="absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: 'linear-gradient(rgba(60,50,30,1) 1px, transparent 1px), linear-gradient(90deg, rgba(60,50,30,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
              <div className="absolute inset-[28px] flex flex-col justify-between font-mono text-[8.5px] text-ink-5 tracking-[0.10em] uppercase pointer-events-none z-0">
                {['QUALIFY','DISCOVERY','EVALUATION','NEGOTIATION','CLOSING'].map(s => (
                  <div key={s} className="flex items-center gap-3">
                    {s}
                    <div className="flex-1 h-px" style={{backgroundImage:'linear-gradient(90deg,rgba(60,50,30,0.10) 50%,transparent 50%)',backgroundSize:'6px 0.5px'}} />
                  </div>
                ))}
              </div>
              {[
                { label:'AR', x:'12%', y:'18%', s:44, type:'hot' }, { label:'VL', x:'34%', y:'14%', s:30, type:'warm' },
                { label:'DL', x:'58%', y:'24%', s:25, type:'cool' }, { label:'NW', x:'22%', y:'36%', s:38, type:'warm' },
                { label:'AC', x:'48%', y:'42%', s:48, type:'hot' }, { label:'PR', x:'72%', y:'40%', s:23, type:'cool' },
                { label:'KH', x:'18%', y:'58%', s:34, type:'warm' }, { label:'TS', x:'44%', y:'62%', s:29, type:'cool' },
                { label:'MX', x:'64%', y:'56%', s:40, type:'hot' }, { label:'NS', x:'30%', y:'80%', s:35, type:'warm' },
                { label:'VS', x:'60%', y:'80%', s:27, type:'cool' },
              ].map(orb => (
                <div key={orb.label} className="absolute rounded-full grid place-items-center font-serif font-semibold text-[10px] text-white hover:scale-110 transition-transform cursor-default z-10"
                  style={{ left: orb.x, top: orb.y, width: orb.s, height: orb.s,
                    background: orb.type === 'hot' ? '#5552C9' : orb.type === 'warm' ? '#C4922A' : '#5A8AB4',
                    boxShadow: `0 3px 14px ${orb.type === 'hot' ? 'rgba(85,82,201,0.35)' : orb.type === 'warm' ? 'rgba(196,146,42,0.30)' : 'rgba(90,138,180,0.28)'}` }}>
                  {orb.label}
                </div>
              ))}
              <div className="absolute bottom-4 left-7 right-7 flex justify-between font-mono text-[8.5px] text-ink-5 tracking-[0.08em]">
                <span>0d in stage</span><span>30d</span><span>60d</span><span>90d+ (stale)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ICP ── */}
      <section id="icp" className="py-32 border-t border-sand bg-cream-200">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="max-w-[600px] mb-16">
            <Eyebrow>Built for service businesses</Eyebrow>
            <h2 className="font-serif text-[44px] font-semibold text-ink tracking-[-0.025em] leading-[1.06] mb-5">If revenue runs through your inbox, this is for you.</h2>
            <p className="text-[15px] text-ink-3 font-light leading-[1.7]">Service businesses don't have a product spec — they have a relationship trajectory. Zotra is shaped for that work.</p>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {icpItems.map(item => (
              <div key={item.name} className="p-9 border border-sand rounded-2xl bg-white shadow-[0_1px_4px_rgba(60,50,30,0.05)] hover:border-ink-6 hover:-translate-y-1.5 hover:shadow-[0_10px_32px_rgba(60,50,30,0.10)] transition-all duration-200">
                <div className="w-11 h-11 rounded-xl bg-indigo-pale text-indigo grid place-items-center mb-6 shadow-[inset_0_1px_3px_rgba(85,82,201,0.12)]">
                  <span className="w-5 h-5">{item.icon}</span>
                </div>
                <div className="font-serif font-semibold text-[19px] text-ink tracking-[-0.015em] mb-3">{item.name}</div>
                <p className="text-[14px] text-ink-3 leading-[1.7] font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FIRST WEEK ── */}
      <section id="firstweek" className="py-32 border-t border-sand bg-cream">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="max-w-[600px] mb-16">
            <Eyebrow>First week experience</Eyebrow>
            <h2 className="font-serif text-[44px] font-semibold text-ink tracking-[-0.025em] leading-[1.06] mb-5">By tomorrow morning, your accounts are already worked.</h2>
            <p className="text-[15px] text-ink-3 font-light leading-[1.7]">Onboarding is the strategy. Connect today, and the first Morning Brief lands while you sleep.</p>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {[
              { n: 'DAY 01', h: 'From connect to first Morning Brief.', items: [
                { t: '00:30', c: '<b>Inbox connected</b> · 24 months back-filled' },
                { t: '02:00', c: '<b>14 accounts</b> detected, 38 stakeholders mapped' },
                { t: '04:00', c: '<b>Forager</b> enriched org maps and technographics' },
                { t: '06:00', c: '<b>First overnight Brief</b> — 4 drafts, 2 risks' },
              ]},
              { n: 'WEEK 01', h: 'The team starts handing you the day.', items: [
                { t: 'DAY 2', c: '<b>Composer</b> drafted proposal for Acme · evidence linked' },
                { t: 'DAY 3', c: '<b>Echo</b> filed action items from 4 calls' },
                { t: 'DAY 5', c: '<b>Watcher</b> caught a champion shift · backup recommended' },
                { t: 'DAY 7', c: '<b>Renewal Agent</b> active · Karst T-87, prob 74 ↗' },
              ]},
            ].map(card => (
              <div key={card.n} className="p-9 border border-sand rounded-2xl bg-white shadow-[0_1px_4px_rgba(60,50,30,0.05)]">
                <div className="font-mono text-[9.5px] text-indigo tracking-[0.18em] font-semibold uppercase mb-2">{card.n}</div>
                <h3 className="font-serif font-semibold text-[23px] text-ink tracking-[-0.015em] mb-7">{card.h}</h3>
                <div className="flex flex-col gap-3">
                  {card.items.map(item => (
                    <div key={item.t} className="flex items-center gap-4 p-4 bg-cream-100 border border-sand rounded-xl text-[13px] text-ink-2 leading-[1.5]">
                      <div className="font-mono text-[8.5px] text-ink-5 tracking-[0.10em] uppercase shrink-0 w-[52px]">{item.t}</div>
                      <div className="flex-1" dangerouslySetInnerHTML={{ __html: item.c.replace(/<b>/g, '<span class="text-ink font-medium">').replace(/<\/b>/g, '</span>') }} />
                      <div className="font-mono text-[9px] text-teal px-2.5 py-1 bg-teal-pale rounded-lg tracking-[0.06em] shrink-0 border border-teal/20 font-semibold">DONE</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VS CRM ── */}
      <section id="vs" className="py-32 border-t border-sand bg-cream-200">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="max-w-[600px] mb-16">
            <Eyebrow>Zotra vs. CRM</Eyebrow>
            <h2 className="font-serif text-[44px] font-semibold text-ink tracking-[-0.025em] leading-[1.06] mb-5">A CRM watches you work. Zotra does the work.</h2>
            <p className="text-[15px] text-ink-3 font-light leading-[1.7]">Records vs. drafts. Pipeline vs. rhythm. Activities vs. action. The shape of the job is different — so the system has to be.</p>
          </div>
          <div className="rounded-2xl border border-sand overflow-hidden bg-white shadow-[0_2px_12px_rgba(60,50,30,0.07)]">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-cream-200 border-b border-sand">
              {['What you get', 'Traditional CRM', 'Zotra'].map((h, i) => (
                <div key={h} className={`px-6 py-4 text-[10px] font-mono font-bold tracking-[0.14em] uppercase ${i === 0 ? 'text-ink-5' : i === 1 ? 'text-ink-3' : 'text-indigo'}`}>{h}</div>
              ))}
            </div>
            {[
              ['Data entry', 'You log activities', 'Zotra logs the work it did'],
              ['Drafts', 'You write them', 'Written overnight, in your tone'],
              ['Signals', 'You check dashboards', 'Watcher pings only when it matters'],
              ['Champions', 'Static contact records', 'Live · shift detection · backup mapping'],
              ['Meetings', 'You take notes after', 'Echo joins · files actions automatically'],
              ['Cost of a missed signal', 'You find out later — or not at all', 'Watcher catches it overnight'],
              ['Mornings feel like', 'Digging through what slipped', 'Approving what\'s already done'],
            ].map(([what, crm, zotra], i, arr) => (
              <div key={what} className={`grid grid-cols-[1.4fr_1fr_1fr] group hover:bg-cream-100/50 transition-colors ${i < arr.length - 1 ? 'border-b border-sand' : ''}`}>
                <div className="px-6 py-4 text-ink-4 font-mono text-[11px] tracking-[0.04em]">{what}</div>
                <div className="px-6 py-4 text-[13.5px] text-ink-3">{crm}</div>
                <div className="px-6 py-4 text-[13.5px] text-ink font-medium bg-indigo-pale/25 group-hover:bg-indigo-pale/40 transition-colors">{zotra}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITIONS ── */}
      <section id="editions" className="py-32 border-t border-sand bg-cream">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="max-w-[600px] mb-16">
            <Eyebrow>Editions</Eyebrow>
            <h2 className="font-serif text-[44px] font-semibold text-ink tracking-[-0.025em] leading-[1.06] mb-5">Start with what you need. Add agents as your revenue grows.</h2>
            <p className="text-[15px] text-ink-3 font-light leading-[1.7]">Each edition adds agents and the rhythms that connect them. Upgrade in place — nothing migrates, nothing breaks.</p>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {tiers.map((tier) => (
              <div key={tier.name} className={`p-8 rounded-2xl border flex flex-col relative transition-all hover:-translate-y-1 ${tier.featured ? 'border-indigo/50 bg-indigo-pale/30 shadow-[0_6px_32px_rgba(85,82,201,0.14)]' : 'border-sand bg-white shadow-[0_1px_4px_rgba(60,50,30,0.05)] hover:shadow-[0_6px_24px_rgba(60,50,30,0.09)]'}`}>
                {tier.featured && (
                  <div className="absolute top-5 right-5 font-mono text-[8.5px] text-indigo bg-white border border-indigo/30 px-2 py-0.5 rounded-lg tracking-[0.12em] uppercase font-semibold">POPULAR</div>
                )}
                <div className="font-mono text-[9px] text-indigo tracking-[0.18em] font-bold uppercase mb-2">
                  {tier.name}
                  {tier.sub && <span className="text-ink-5 font-normal"> · {tier.sub}</span>}
                </div>
                <div className="font-serif font-semibold text-[17px] text-ink tracking-[-0.015em] mb-2 leading-[1.3]">{tier.heading}</div>
                <p className="text-[12px] text-ink-4 leading-[1.6] font-light min-h-12">{tier.desc}</p>
                <div className="mt-7 flex items-baseline gap-1.5">
                  <span className="font-serif font-semibold text-[34px] text-ink tracking-[-0.025em]">{tier.price}</span>
                </div>
                <ul className="mt-6 pt-6 border-t border-sand/80 flex flex-col gap-3 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="list-none flex items-start gap-2.5 text-[12.5px] text-ink-3 leading-[1.5]"
                      dangerouslySetInnerHTML={{ __html:
                        `<span class="text-teal font-bold text-[10px] mt-0.5 shrink-0">✓</span><span>${f.replace(/<b>/g, '<span class="text-ink font-medium">').replace(/<\/b>/g, '</span>')}</span>`
                      }} />
                  ))}
                </ul>
                <div className="mt-7">
                  <Link to={tier.name === 'Enterprise' ? '#' : '/signup'} className={`flex items-center justify-center h-10 w-full rounded-xl border text-[13px] font-medium transition-all ${tier.featured ? 'bg-indigo text-white border-indigo hover:bg-indigo-light shadow-[0_2px_10px_rgba(85,82,201,0.25)]' : 'bg-transparent border-sand text-ink-2 hover:bg-cream-200 hover:border-ink-6'}`}>
                    {tier.name === 'Enterprise' ? 'Contact sales' : 'Start free'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-40 text-center relative overflow-hidden border-t border-sand" style={{background:'linear-gradient(135deg, #3A2A1C 0%, #2A1E10 50%, #2E2318 100%)'}}>
        <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(900px 700px at 50% 0%,rgba(85,82,201,0.22),transparent 60%),radial-gradient(700px 600px at 20% 100%,rgba(26,158,124,0.16),transparent 60%)'}} />
        {/* Refined horizontal lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="absolute border-t border-cream" style={{top: `${i * 11}%`, left: 0, right: 0}} />
          ))}
        </div>
        {/* Corner decorations */}
        <div className="absolute top-12 left-12 w-16 h-16 border-l border-t border-cream/10 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-12 right-12 w-16 h-16 border-r border-t border-cream/10 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-12 left-12 w-16 h-16 border-l border-b border-cream/10 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-12 right-12 w-16 h-16 border-r border-b border-cream/10 rounded-br-xl pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-10 relative z-10">
          <Eyebrow light>Get started</Eyebrow>
          <h2 className="font-serif text-[68px] font-semibold text-cream tracking-[-0.025em] leading-[1.01] text-wrap-balance mb-8">
            Your business lives in your inbox.<br/><em className="text-indigo-light italic">Zotra works it while you sleep.</em>
          </h2>
          <p className="text-[17.5px] text-cream/60 font-light leading-[1.65] max-w-[560px] mx-auto mb-12">Six minutes to connect. Tomorrow morning, your first brief lands — drafts written, signals scanned, your day already shaped. No credit card. No setup call. No implementation deck. Just an inbox.</p>
          <div className="flex justify-center gap-4">
            <Btn to="/signup" primary lg light>Connect Gmail <span className="font-mono text-[11px]">→</span></Btn>
            <Btn to="/product" lg light>See a demo morning</Btn>
          </div>
          <div className="text-cream/30 mt-8 font-mono text-[11px] tracking-[0.08em]">free 30 days · self-serve · cancel any time</div>
        </div>
      </section>
    </div>
  );
}
