import React, { useState } from 'react';

const STYLES = `
.iv-wrap{flex:1;overflow:hidden;display:flex;flex-direction:column}
.iv-hd{padding:14px 22px 0;background:var(--bg2);border-bottom:0.5px solid var(--brd);flex-shrink:0}
.iv-hd-top{display:flex;align-items:center;gap:12px;margin-bottom:14px}
.iv-title{font-family:"Sora",sans-serif;font-size:19px;font-weight:600;color:var(--ink);letter-spacing:-.02em}
.iv-sub{font-size:12px;color:var(--ink4);margin-top:2px}
.iv-tabs{display:flex;gap:2px}
.iv-tab{padding:7px 13px;font-size:12px;cursor:pointer;transition:all .12s;margin-bottom:-0.5px;color:var(--ink4);font-weight:400;border-bottom:2px solid transparent;text-transform:capitalize;user-select:none}
.iv-tab.on{color:var(--p);font-weight:600;border-bottom-color:var(--p)}
.iv-body{flex:1;overflow-y:auto;padding:16px 24px 80px}
.iv-table{background:var(--bg2);border:0.5px solid var(--brd);border-radius:12px;overflow:hidden}
.iv-table-hd{display:grid;grid-template-columns:1fr 90px 90px 80px 100px 80px;padding:8px 16px;border-bottom:0.5px solid var(--brd);background:var(--bg3)}
.iv-table-hd-cell{font-size:9.5px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:var(--ink5)}
.iv-row{display:grid;grid-template-columns:1fr 90px 90px 80px 100px 80px;padding:12px 16px;border-bottom:0.5px solid var(--brd);align-items:center;transition:background .1s}
.iv-row:last-child{border-bottom:none}
.iv-row:hover{background:var(--pu)}
.iv-item-name{font-size:13px;font-weight:600;color:var(--ink);display:flex;align-items:center;gap:6px}
.iv-featured{font-size:9px;padding:1px 6px;border-radius:8px;background:var(--pp);color:var(--p);font-weight:600}
.iv-amenities{font-size:11.5px;color:var(--ink5);margin-top:1px}
.iv-vertical{font-size:11.5px;color:var(--ink4);text-transform:capitalize}
.iv-rent{font-family:"DM Mono",monospace;font-size:12px;color:var(--ink)}
.iv-avail{font-size:11.5px;color:var(--ink4)}
`;

interface InventoryItem {
  id: string; name: string; vertical: string; type: string;
  floor: number; rent: number; parking: boolean;
  amenities: string[]; avail: string;
  status: 'available' | 'reserved' | 'unavailable';
  featured: boolean;
}

const INVENTORY: InventoryItem[] = [
  { id: 'u4b', name: 'Unit 4B', vertical: 'property', type: '2BHK', floor: 4, rent: 18500, parking: true,  amenities: ['Gym', 'Rooftop terrace', 'Covered parking'], avail: '01 Aug 2026', status: 'available', featured: true },
  { id: 'u7c', name: 'Unit 7C', vertical: 'property', type: '2BHK', floor: 7, rent: 22000, parking: true,  amenities: ['Gym', 'Pool', 'Covered parking'],            avail: '01 Aug 2026', status: 'available', featured: false },
  { id: 'u4a', name: 'Unit 4A', vertical: 'property', type: '2BHK', floor: 4, rent: 19800, parking: false, amenities: ['Gym', 'Rooftop terrace'],                   avail: '15 Jul 2026', status: 'reserved',  featured: false },
  { id: 'ev1', name: 'Rooftop Event Space',        vertical: 'availability', type: 'Event space',   floor: 12, rent: 8000, parking: true,  amenities: ['Catering prep', 'AV setup'], avail: 'Available weekends', status: 'available', featured: false },
  { id: 'pk1', name: 'Additional Parking Bay',     vertical: 'availability', type: 'Add-on',        floor: 0,  rent: 2000, parking: false, amenities: [],                            avail: 'Ongoing',            status: 'available', featured: false },
  { id: 'mn1', name: 'Maintenance Slot — Plumbing',vertical: 'availability', type: 'Service slot',  floor: 0,  rent: 0,    parking: false, amenities: [],                            avail: '22 Jul 2026',        status: 'available', featured: false },
];

const STATUS_CONF: Record<string, { label: string; color: string; bg: string }> = {
  available:   { label: 'Available',   color: 'var(--ok)',   bg: 'var(--okb)' },
  reserved:    { label: 'Reserved',    color: '#D97757',     bg: 'var(--amberp)' },
  unavailable: { label: 'Unavailable', color: 'var(--ink5)', bg: 'var(--bg3)' },
};

export default function InventoryView() {
  const [vertical, setVertical] = useState('all');
  const filtered = vertical === 'all' ? INVENTORY : INVENTORY.filter(i => i.vertical === vertical);

  return (
    <>
      <style>{STYLES}</style>
      <div className="iv-wrap">
        <div className="iv-hd">
          <div className="iv-hd-top">
            <div>
              <div className="iv-title">Inventory</div>
              <div className="iv-sub">What the Conversation Assistant knows about and can offer to customers</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              <button className="btn sm" style={{ fontFamily: 'inherit' }}>⬆ Import CSV</button>
              <button className="btn sm pri" style={{ fontFamily: 'inherit' }}>+ Add item</button>
            </div>
          </div>
          <div className="iv-tabs">
            {['all', 'property', 'availability'].map(v => (
              <div key={v} className={`iv-tab${vertical === v ? ' on' : ''}`} onClick={() => setVertical(v)}>
                {v === 'all' ? 'All' : v}
              </div>
            ))}
          </div>
        </div>

        <div className="iv-body">
          <div className="iv-table">
            <div className="iv-table-hd">
              {['Item', 'Vertical', 'Price/mo', 'Parking', 'Availability', 'Status'].map(h => (
                <div key={h} className="iv-table-hd-cell">{h}</div>
              ))}
            </div>
            {filtered.map(item => {
              const sc = STATUS_CONF[item.status] ?? STATUS_CONF.unavailable;
              return (
                <div key={item.id} className="iv-row">
                  <div>
                    <div className="iv-item-name">
                      {item.name}
                      {item.featured && <span className="iv-featured">Featured</span>}
                    </div>
                    <div className="iv-amenities">
                      {item.amenities.slice(0, 2).join(' · ')}{item.amenities.length > 2 ? ` +${item.amenities.length - 2}` : ''}
                    </div>
                  </div>
                  <div className="iv-vertical">{item.vertical}</div>
                  <div className="iv-rent">{item.rent ? `₹${item.rent.toLocaleString()}` : '—'}</div>
                  <div>{item.parking ? '✅' : '—'}</div>
                  <div className="iv-avail">{item.avail}</div>
                  <div>
                    <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 10, fontWeight: 600, background: sc.bg, color: sc.color }}>
                      {sc.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}