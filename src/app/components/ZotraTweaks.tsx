import React from 'react';
import type { Tweaks } from '../types';

const tweaksCss = `
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
`;

interface TweaksPanelProps {
  tweaks: Tweaks;
  setTweak: (key: keyof Tweaks, value: unknown) => void;
}

const ZotraTweaks: React.FC<TweaksPanelProps> = ({ tweaks, setTweak }) => {
  const [open, setOpen] = React.useState(true);
  const dragRef = React.useRef<HTMLDivElement>(null);
  const offsetRef = React.useRef({ x: 16, y: 16 });

  React.useEffect(() => {
    if (!document.getElementById('twk-styles')) {
      const s = document.createElement('style');
      s.id = 'twk-styles';
      s.textContent = tweaksCss;
      document.head.appendChild(s);
    }
  }, []);

  const onDragStart = (e: React.MouseEvent) => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const startRight  = window.innerWidth  - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev: MouseEvent) => {
      offsetRef.current = {
        x: startRight  - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      if (dragRef.current) {
        dragRef.current.style.right  = offsetRef.current.x + 'px';
        dragRef.current.style.bottom = offsetRef.current.y + 'px';
      }
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  if (!open) return null;

  const themeOpts   = ['light', 'dark'] as const;
  const densityOpts = ['compact', 'comfortable'] as const;
  const accentOpts  = ['#5552C9','#1A9E7C','#D97757','#3F75DC','#7A4EDB','#E5566C'];
  const ageOpts     = ['new','week1','month1','month6','established'] as const;

  return (
    <div ref={dragRef} className="twk-panel"  style={{ right: 16, bottom: 16 }}>
      <div className="twk-hd"  onMouseDown={onDragStart}>
        <b>Tweaks</b>
        <button className="twk-x"  onMouseDown={e => e.stopPropagation()} onClick={() => setOpen(false)}>✕</button>
      </div>
      <div className="twk-body" >
        <div className="twk-sect" >Theme</div>
        <div className="twk-row" >
          <div className="twk-lbl" ><span>Mode</span></div>
          <div className="twk-seg" >
            <div className="twk-seg-thumb"  style={{ left: `calc(2px + ${themeOpts.indexOf(tweaks.theme)} * (100% - 4px) / 2)`, width: 'calc((100% - 4px) / 2)' }} />
            {themeOpts.map(o => (
              <button key={o} type="button" onClick={() => setTweak('theme', o)}>{o}</button>
            ))}
          </div>
        </div>
        <div className="twk-row" >
          <div className="twk-lbl" ><span>Accent</span></div>
          <div className="twk-chips" >
            {accentOpts.map(c => (
              <button key={c} type="button" className="twk-chip"  data-on={tweaks.accent === c ? '1' : '0'} style={{ background: c }} onClick={() => setTweak('accent', c)} />
            ))}
          </div>
        </div>
        <div className="twk-sect" >Layout</div>
        <div className="twk-row" >
          <div className="twk-lbl" ><span>Density</span></div>
          <div className="twk-seg" >
            <div className="twk-seg-thumb"  style={{ left: `calc(2px + ${densityOpts.indexOf(tweaks.density)} * (100% - 4px) / 2)`, width: 'calc((100% - 4px) / 2)' }} />
            {densityOpts.map(o => (
              <button key={o} type="button" onClick={() => setTweak('density', o)}>{o}</button>
            ))}
          </div>
        </div>
        <div className="twk-sect" >Demo</div>
        <div className="twk-row" >
          <div className="twk-lbl" ><span>Tenant age (Pulse)</span></div>
          <select className="twk-field"  value={tweaks.tenantAge} onChange={e => setTweak('tenantAge', e.target.value)}>
            {ageOpts.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div className="twk-sect" >AI</div>
        <div className="twk-row twk-row-h" >
          <div className="twk-lbl" ><span>Proactive suggestions</span></div>
          <button type="button" className="twk-toggle"  data-on={tweaks.proactive ? '1' : '0'} onClick={() => setTweak('proactive', !tweaks.proactive)}><i /></button>
        </div>
      </div>
    </div>
  );
};

export default ZotraTweaks;
