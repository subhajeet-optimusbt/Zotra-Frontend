import React from 'react';
import {
  IconHome, IconActivity, IconMail, IconBuilding, IconRadar,
  IconReceipt, IconGrid, IconBar, IconSunrise, IconCalendar,
  IconCheckSq, IconMoon, IconBell, IconSparkles, IconFileCheck,
  IconAlert, IconPencilLine
} from './Icons';

const RailIcon = ({ children, active }: { children: React.ReactNode; active?: boolean }) => (
  <div className={`w-9 h-9 rounded-[9px] grid place-items-center relative transition-all ${active ? 'bg-[#EEEDF9] text-[#5552C9]' : 'text-[var(--ink5)] hover:bg-[#F0EAD8] hover:text-[#5552C9]'}`}>
    {active && <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-0.5 h-[18px] bg-[#5552C9] rounded-sm"  />}
    <span className="w-[17px] h-[17px]" >{children}</span>
  </div>
);

const RhyPill = ({ variant, children }: { variant: 'ok' | 'ri' | 'br' | 'te'; children: React.ReactNode }) => {
  const styles = {
    ok: 'bg-[#E0F4EF] text-[#0F6050]',
    ri: 'bg-[#FAE8E8] text-[#7A2020]',
    br: 'bg-[#EEEDF9] text-[#3B38A8]',
    te: 'bg-[#E0F4EF] text-[#0F6050]',
  };
  return (
    <span className={`inline-flex items-center gap-1 py-0.5 px-2 rounded-full text-[10px] font-medium border border-transparent ${styles[variant]}`}>
      {children}
    </span>
  );
};

const RhyAct = ({ primary, children }: { primary?: boolean; children: React.ReactNode }) => (
  <button className={`h-[22px] px-[9px] rounded-[6px] border text-[10.5px] inline-flex items-center gap-1 ${primary ? 'bg-[#5552C9] border-[#5552C9] text-white font-medium' : 'bg-white border-[#DDD3BC] text-[var(--ink3)]'}`}>
    {children}
  </button>
);

export default function AppMock() {
  return (
    <div className="mt-14 rounded-2xl bg-white border border-[#DDD3BC] shadow-[0_24px_64px_-16px_rgba(100,70,40,0.18),0_0_0_0.5px_var(--brd)] overflow-hidden relative z-10" >
      {/* Chrome bar */}
      <div className="h-9 bg-[var(--bg3)] border-b border-[#DDD3BC] flex items-center px-3.5 gap-2" >
        <div className="w-[11px] h-[11px] rounded-full bg-[#FF5F57]"  />
        <div className="w-[11px] h-[11px] rounded-full bg-[#FEBC2E]"  />
        <div className="w-[11px] h-[11px] rounded-full bg-[#28C840]"  />
        <div className="ml-[18px] font-mono text-[11px] text-[var(--ink4)] bg-white h-[22px] flex items-center px-3 rounded-[5px] border border-[#DDD3BC] flex-1 max-w-[420px]" >
          <span className="mr-1.5 text-[9px] text-[#1A9E7C]" >🔒</span>app.zotra.com/rhythm
        </div>
      </div>

      {/* App body */}
      <div className="grid grid-cols-[60px_1fr] h-[680px]" >
        {/* Rail */}
        <aside className="bg-[#FAF8F3] border-r border-[#DDD3BC] flex flex-col items-center py-3.5 gap-1.5" >
          <div className="w-8 h-8 rounded-[9px] bg-center bg-cover"  style={{backgroundImage:"url('/logo-website.png')"}} />
          <div className="w-6 h-px bg-[#DDD3BC] my-2"  />
          <RailIcon active><IconHome className="w-full h-full"  /></RailIcon>
          <RailIcon><IconActivity className="w-full h-full"  /></RailIcon>
          <RailIcon><IconMail className="w-full h-full"  /></RailIcon>
          <RailIcon><IconBuilding className="w-full h-full"  /></RailIcon>
          <RailIcon><IconRadar className="w-full h-full"  /></RailIcon>
          <RailIcon><IconReceipt className="w-full h-full"  /></RailIcon>
          <RailIcon><IconGrid className="w-full h-full"  /></RailIcon>
          <RailIcon><IconBar className="w-full h-full"  /></RailIcon>
          <div className="mt-auto flex flex-col items-center gap-2 pb-1" >
            <div className="w-[30px] h-[30px] rounded-full text-white grid place-items-center font-serif font-bold text-[10.5px]"  style={{background: 'linear-gradient(135deg,#5552C9,#7370E0)'}}>EM</div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex flex-col overflow-hidden bg-[#F3EFE5]" >
          {/* Hero panel */}
          <div className="relative overflow-hidden px-[26px] pb-0 pt-[18px]"  style={{background:'linear-gradient(135deg, #3A2A1C 0%, #2A1E10 60%, #332618 100%)'}}>
            <div className="absolute top-[-40%] right-[-10%] w-[520px] h-[520px] rounded-full"  style={{background:'radial-gradient(circle,rgba(85,82,201,0.20) 0%,transparent 65%)'}} />
            <div className="absolute bottom-[-30%] left-[30%] w-[380px] h-[380px] rounded-full"  style={{background:'radial-gradient(circle,rgba(26,158,124,0.18) 0%,transparent 65%)'}} />
            <div className="relative z-10" >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-2 font-mono text-[10.5px] text-cream/60 tracking-[0.08em] uppercase" >
                  <div className="w-[7px] h-[7px] rounded-full bg-[#1A9E7C] animate-pulse-dot"  />
                  12:51 · Daily Operating Rhythm
                </div>
                <div className="flex gap-1.5" >
                  {[IconBell, IconSparkles].map((Icon, i) => (
                    <div key={i} className="w-7 h-7 rounded-[7px] border border-white/[0.14] bg-white/[0.05] text-white/[0.65] grid place-items-center" >
                      <Icon className="w-3 h-3"  />
                    </div>
                  ))}
                </div>
              </div>
              <div className="font-serif text-[32px] font-semibold tracking-[-0.02em] leading-[1.06] mt-[18px] text-[#FAF8F3]" >
                Good afternoon, <span className="text-[#7370E0]" >Elena.</span>
              </div>
              <p className="mt-2.5 text-[13.5px] text-cream/65 leading-[1.5] font-light max-w-[640px]" >
                Zotra worked overnight — <span className="text-cream/90 font-medium" >4 drafts written, 31 signals scanned, 2 risks flagged.</span> Here's your day.
              </p>
              <div className="flex gap-2 mt-[18px] flex-wrap" >
                {[
                  { label: 'Northwind redline drafted', type: 'ok' },
                  { label: 'Acme re-engage written', type: 'ok' },
                  { label: 'Kairo champion risk', type: 'risk' },
                  { label: 'Northside invoice · Day 22', type: 'warn' },
                ].map(({ label, type }) => (
                  <div key={label} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11.5px] font-medium tracking-[-0.005em] ${
                    type === 'ok' ? 'bg-[#1A9E7C]/20 border-[#1A9E7C]/30 text-[#E0F4EF]' :
                    type === 'risk' ? 'bg-[#C45252]/20 border-[#C45252]/30 text-[#FAE8E8]' :
                    'bg-[#C4922A]/20 border-[#C4922A]/30 text-[#FBF3E0]'
                  }`}>
                    <span className={`text-[10px] font-bold ${type === 'ok' ? 'text-[#2BBF97]' : type === 'risk' ? 'text-[#C45252]' : 'text-[#C4922A]'}`}>
                      {type === 'ok' ? '✓' : type === 'risk' ? '⚠' : '●'}
                    </span>
                    {label}
                  </div>
                ))}
              </div>
              <div className="mt-6 pb-[18px]" >
                <div className="flex justify-between font-mono text-[9.5px] text-cream/35 tracking-[0.04em] uppercase mb-1.5" >
                  <span>Day arc — 33% through your commercial day</span>
                  <span>12:51 / 18:00</span>
                </div>
                <div className="h-1 rounded-sm bg-white/[0.08] overflow-hidden relative" >
                  <div className="h-full w-1/3 rounded-sm relative"  style={{background:'linear-gradient(90deg,#5552C9,#7370E0)'}}>
                    <div className="absolute right-[-3px] top-[-3px] w-2.5 h-2.5 rounded-full bg-[#5552C9] shadow-[0_0_0_3px_rgba(85,82,201,0.30)]"  />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter tabs */}
          <div className="bg-white grid grid-cols-5 border-b border-[#DDD3BC]" >
            {[
              { icon: <IconSunrise className="w-4 h-4"  />, name: 'Morning', sub: '5 actions', badge: '5', active: true },
              { icon: <IconCalendar className="w-4 h-4"  />, name: 'Calendar', sub: '5 events', badge: '5' },
              { icon: <IconCheckSq className="w-4 h-4"  />, name: 'Approvals', sub: '5 pending', badge: '5', urgent: true },
              { icon: <IconActivity className="w-4 h-4"  />, name: 'Pulse Engine', sub: '● Live', live: true },
              { icon: <IconMoon className="w-4 h-4"  />, name: 'Tomorrow', sub: 'Queued' },
            ].map((tab, i) => (
              <div key={i} className={`px-4 py-3.5 border-r border-[#DDD3BC] last:border-r-0 flex flex-col items-center gap-1.5 relative ${tab.active ? 'bg-[#EEEDF9]/50' : ''}`}>
                {tab.active && <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[#5552C9]"  />}
                <div className={`w-[34px] h-[34px] rounded-[9px] grid place-items-center relative ${tab.active ? 'bg-[#EEEDF9] text-[#5552C9]' : 'bg-[#F3EFE5] text-[var(--ink5)]'}`}>
                  {tab.icon}
                  {tab.badge && (
                    <div className={`absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full grid place-items-center text-white font-mono text-[9.5px] font-semibold border-[1.5px] border-white ${tab.urgent ? 'bg-[#C45252]' : 'bg-[#5552C9]'}`}>
                      {tab.badge}
                    </div>
                  )}
                </div>
                <div className="font-serif font-semibold text-[12.5px] text-[var(--ink)] tracking-[-0.01em]" >{tab.name}</div>
                <div className={`font-mono text-[9.5px] tracking-[0.06em] uppercase ${tab.live ? 'text-[#1A9E7C]' : tab.urgent ? 'text-[#C45252]' : tab.active ? 'text-[#5552C9]' : 'text-[var(--ink5)]'}`}>{tab.sub}</div>
              </div>
            ))}
          </div>

          {/* Plan */}
          <div className="flex-1 overflow-hidden p-[18px_24px] bg-[#F3EFE5]" >
            <div className="flex items-center gap-2.5 mb-3" >
              <span className="font-mono text-[10px] text-[var(--ink5)] tracking-[0.12em] uppercase font-semibold" >Today's plan</span>
              <div className="flex-1 h-px bg-[#DDD3BC]"  />
              <span className="font-mono text-[10.5px] text-[var(--ink4)] tracking-[0.04em] border border-[#DDD3BC] rounded-[6px] px-2 py-0.5" >5 remaining · 0 done</span>
            </div>
            <div className="flex flex-col gap-2" >
              {/* Item 1 */}
              <div className="flex items-start gap-3 p-[13px_14px] bg-white border rounded-[11px] shadow-[0_1px_3px_rgba(100,70,40,0.06),0_0_0_0.5px_var(--brd)]"  style={{borderColor:'rgba(85,82,201,0.28)',background:'linear-gradient(150deg,rgba(85,82,201,0.04) 0%,#fff 55%)'}}>
                <div className="font-mono text-[9.5px] text-[var(--ink5)] tracking-[0.04em] pt-0.5 w-3.5 shrink-0" >01</div>
                <div className="w-[34px] h-[34px] rounded-[9px] grid place-items-center shrink-0 bg-[#EEEDF9] text-[#5552C9]" >
                  <IconFileCheck className="w-[15px] h-[15px]"  />
                </div>
                <div className="flex-1 min-w-0" >
                  <div className="flex items-center gap-1.5 flex-wrap mb-0.5" >
                    <div className="font-serif font-semibold text-[13px] text-[var(--ink)] tracking-[-0.01em]" >Send Northwind redline reply</div>
                    <div className="ml-auto font-mono text-[10px] text-[var(--ink4)] tracking-[0.04em]" >09:30</div>
                  </div>
                  <p className="text-[11.5px] text-[var(--ink3)] leading-[1.45] font-light" >Composer drafted a response addressing Sasha's three legal points. Tone matched, evidence linked. Awaiting your nod.</p>
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap" >
                    <RhyPill variant="br">Opportunity</RhyPill>
                    <RhyPill variant="ok">Confidence 88%</RhyPill>
                    <RhyAct primary>Send</RhyAct>
                    <RhyAct>Edit draft</RhyAct>
                  </div>
                </div>
              </div>
              {/* Item 2 */}
              <div className="flex items-start gap-3 p-[13px_14px] rounded-[11px] shadow-[0_1px_3px_rgba(100,70,40,0.06),0_0_0_0.5px_var(--brd)]"  style={{border:'0.5px solid rgba(196,82,82,0.28)',background:'linear-gradient(150deg,rgba(196,82,82,0.04) 0%,#fff 55%)'}}>
                <div className="font-mono text-[9.5px] text-[var(--ink5)] tracking-[0.04em] pt-0.5 w-3.5 shrink-0" >02</div>
                <div className="w-[34px] h-[34px] rounded-[9px] grid place-items-center shrink-0 bg-[#FAE8E8] text-[#C45252]" >
                  <IconAlert className="w-[15px] h-[15px]"  />
                </div>
                <div className="flex-1 min-w-0" >
                  <div className="flex items-center gap-1.5 flex-wrap mb-0.5" >
                    <div className="font-serif font-semibold text-[13px] text-[var(--ink)] tracking-[-0.01em]" >Stabilise Kairo Health — champion risk</div>
                    <div className="ml-auto font-mono text-[10px] text-[var(--ink4)] tracking-[0.04em]" >11:00</div>
                  </div>
                  <p className="text-[11.5px] text-[var(--ink3)] leading-[1.45] font-light" >Watcher saw Maya Chen update LinkedIn to "Open to opportunities". She's your champion on the $96K opportunity. Loop in Lena Park (VP Product) today.</p>
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap" >
                    <RhyPill variant="ri">High risk</RhyPill>
                    <RhyPill variant="br">Opportunity · $96K</RhyPill>
                    <RhyAct primary>Email Lena Park</RhyAct>
                    <RhyAct>View opportunity</RhyAct>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Command bar */}
          <div className="h-12 border-t border-[#DDD3BC] bg-white flex items-center px-[18px] gap-3 shrink-0" >
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[7px] border border-[#DDD3BC] bg-[#F3EFE5] text-[11px] text-[var(--ink3)] font-medium font-mono tracking-[0.04em] uppercase" >
              <IconPencilLine className="w-3 h-3"  />Log
            </div>
            <div className="flex-1 text-[12.5px] text-[var(--ink4)] font-light" >Log a note — e.g. "Met Priya 3pm — she's the new champion at Kairo"</div>
            <div className="px-[7px] py-0.5 rounded-[5px] border border-[#DDD3BC] bg-[#F3EFE5] font-mono text-[10px] text-[var(--ink4)] tracking-[0.04em]" >⌘ K</div>
          </div>
        </div>
      </div>
    </div>
  );
}
