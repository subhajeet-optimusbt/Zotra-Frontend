import { Link } from 'react-router-dom';

const steps = [
  { n: '01', label: 'CONNECT', h: 'Connect one source. Seed one customer.', p: 'Gmail, Outlook, calendar, accounting — read-only at first. Zotra pulls history with the contact and the team starts building the workspace immediately.', code: [['connect', 'google workspace · ok'], ['connect', 'google calendar · ok'], ['seed', 'kairo health · 42 emails ingested'], ['forager', '3 stakeholders enriched']] },
  { n: '02', label: 'DETECT', h: 'Watcher reads the signal layer.', p: 'Pricing intent, hires, LinkedIn shifts, account silence, ageing invoices. Watcher pings only when something has changed enough to matter — never on a schedule.', code: [['signal', '4 visits to acme.io/pricing this morning'], ['signal', 'maya chen · linkedin · "open to opportunities"'], ['signal', 'tessera one-pager forwarded internally · 4 opens'], ['flagged', 'kairo · champion shift · high risk']] },
  { n: '03', label: 'DRAFT', h: 'Composer writes overnight in your tone.', p: 'Replies, follow-ups, redlines, proposals. Trained on what you\'ve actually sent before — same voice, same cadence. Nothing ships until you nod.', code: [['compose', 'northwind · redline reply · confidence 88%'], ['compose', 'acme · re-engage · warm signal'], ['compose', 'tessera · proposal v1 · €185k scope'], ['queue', '4 drafts ready for morning brief']] },
  { n: '04', label: 'BRIEF', h: 'You arrive to a five-minute morning.', p: 'Top five actions, ranked. Each with an evidenced "why", an in-tone draft, and one decision. Approve, edit, dismiss, or ask Zotra to dig deeper.', code: [['today', '5 actions · 5 approvals · 33% of day'], ['action 1', 'send northwind redline · approved'], ['action 2', 'stabilise kairo · email lena park · queued'], ['action 3', 're-engage acme · 16:00 · approved']] },
  { n: '05', label: 'STEER', h: 'Echo handles the between-meetings work.', p: "Joins your calls, takes notes, files action items, updates stakeholder maps. The day stays on track even when you're not on it. Midday Pulse keeps stalled deals moving.", code: [['echo', 'joined northwind kickoff · 4 actions filed'], ['echo', 'updated stakeholder · priya shah · backup champion'], ['midday', '3 stalled deals · re-engages drafted'], ['compose', 'follow-up after kickoff · ready to send']] },
  { n: '06', label: 'WRAP', h: 'Evening Wrap closes the loop. Overnight queue starts.', p: "End-of-day summary — what moved, what slipped, what's coming. Then the cycle restarts — Zotra works the inbox while you switch off, and the morning brief lands before coffee.", code: [['wrap', '5 of 5 actions complete · 2 risks contained'], ['tomorrow', '3 priorities queued · drafts started'], ['renewal', 'karst · T-87 · prob 74 ↗'], ['overnight', 'watcher · composer · forager · live']] },
];

export default function Product() {
  return (
    <div className="bg-cream" >
      {/* Hero */}
      <section className="pt-20 pb-14 relative overflow-hidden" >
        <div className="absolute top-[-200px] left-[-200px] w-[700px] h-[700px] rounded-full border border-sand/50 pointer-events-none"  />
        <div className="max-w-[1280px] mx-auto px-8 relative z-10" >
          <div className="inline-flex items-center gap-2 font-mono text-[10px] text-indigo tracking-[0.16em] uppercase mb-5" >
            <span className="w-4 h-px bg-indigo"  />How Zotra works
          </div>
          <h1 className="font-serif text-[64px] font-semibold text-ink tracking-[-0.02em] leading-[1.02] text-wrap-balance max-w-[800px]" >From overnight draft to evening wrap — one continuous rhythm.</h1>
          <p className="text-[17px] text-ink-3 font-light leading-[1.6] max-w-[580px] mt-6" >Six chapters carry every account through the day. Zotra picks each one up where the last left off, with the same evidence, the same agents, the same rhythm.</p>
        </div>
      </section>

      {/* Steps */}
      <section className="pb-28 bg-cream" >
        <div className="max-w-[1280px] mx-auto px-8" >
          <div className="flex flex-col rounded-xl border border-sand overflow-hidden bg-white shadow-[0_2px_12px_rgba(60,50,30,0.08)]" >
            {steps.map((s, i) => (
              <div key={s.n} className={`grid grid-cols-[80px_1fr_1.3fr] gap-8 p-10 ${i < steps.length - 1 ? 'border-b border-sand' : ''} items-start hover:bg-cream-50/40 transition-colors`}>
                <div className="pt-1" >
                  <div className="font-mono text-[32px] font-medium text-ink-5 leading-none" >{s.n}</div>
                  <div className="font-mono text-[9px] text-indigo tracking-[0.16em] uppercase mt-2" >{s.label}</div>
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-[22px] text-ink tracking-[-0.015em] leading-[1.22] mb-3" >{s.h}</h3>
                  <p className="text-[14px] text-ink-3 font-light leading-[1.65]" >{s.p}</p>
                </div>
                <div className="p-5 bg-cream-200 border border-sand rounded-xl font-mono text-[11.5px] text-ink-3 leading-[2] tracking-[0.02em]" >
                  {s.code.map(([cmd, val]) => (
                    <div key={cmd + val} className="flex gap-1" >
                      <span className="text-ink font-medium min-w-[90px]" >{cmd}</span>
                      <span className="text-indigo" >→</span>
                      <span>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-36 text-center relative overflow-hidden border-t border-sand"  style={{background:'linear-gradient(135deg, #3A2A1C 0%, #2A1E10 50%, #2E2318 100%)'}}>
        <div className="absolute inset-0 pointer-events-none"  style={{background:'radial-gradient(800px 600px at 50% 0%,rgba(85,82,201,0.2),transparent 60%)'}} />
        <div className="max-w-[1280px] mx-auto px-8 relative z-10" >
          <div className="inline-flex items-center gap-2 font-mono text-[10px] text-indigo tracking-[0.16em] uppercase mb-5" >
            <span className="w-4 h-px bg-indigo"  />Try it
          </div>
          <h2 className="font-serif text-[64px] font-semibold text-cream tracking-[-0.02em] leading-[1.02]" >The shortest path is <em className="text-indigo-light italic" >starting</em>.</h2>
          <p className="text-[17px] text-cream/60 font-light leading-[1.6] max-w-[560px] mx-auto mt-6" >Connect today, and the first Morning Pulse lands tomorrow before coffee. One real customer is enough.</p>
          <div className="flex justify-center gap-3 mt-10" >
            <Link to="/signup" className="inline-flex items-center gap-2 h-11 px-6 text-[13.5px] rounded-xl font-medium bg-white text-ink border border-white hover:bg-cream-100 transition-all" >Start free <span className="font-mono text-[11px]" >→</span></Link>
            <Link to="/" className="inline-flex items-center gap-2 h-11 px-6 text-[13.5px] rounded-xl font-medium bg-white/[0.08] border border-white/[0.18] text-white hover:bg-white/[0.14] transition-all" >Back to overview</Link>
          </div>
          <div className="text-cream/35 mt-7 font-mono text-[11.5px] tracking-[0.06em]" >free 30 days · self-serve · cancel any time</div>
        </div>
      </section>
    </div>
  );
}
