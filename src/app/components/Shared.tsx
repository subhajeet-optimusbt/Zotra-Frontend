import React from 'react';

// ── Sparkline ──────────────────────────────────────────────────
interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fill?: string;
  dot?: boolean;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data, width = 80, height = 22,
  color = 'var(--p)', fill, dot = true,
}) => {
  if (!data || !data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);
  const points = data.map((v, i) => [
    i * stepX,
    height - 2 - ((v - min) / range) * (height - 4),
  ]);
  const d = points.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const lastP = points[points.length - 1];
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      {fill && <path d={d + ` L ${width} ${height} L 0 ${height} Z`} fill={fill} opacity="0.18" />}
      <path d={d} stroke={color} strokeWidth="1.4" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      {dot && <circle cx={lastP[0]} cy={lastP[1]} r="2" fill={color} />}
    </svg>
  );
};

// ── HeatStrip ──────────────────────────────────────────────────
interface HeatStripProps {
  data: number[];
  max?: number;
  height?: number;
  dotSize?: number;
  gap?: number;
}

export const HeatStrip: React.FC<HeatStripProps> = ({
  data, max, height = 14, dotSize = 4, gap = 2,
}) => {
  const m = max || Math.max(...data) || 1;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: `${gap}px`, height: `${height}px` }}>
      {data.map((v, i) => {
        const a = 0.10 + 0.85 * (v / m);
        return (
          <span
            key={i}
            style={{
              width: dotSize, height: dotSize, borderRadius: '50%',
              background: `rgba(75,72,200,${a.toFixed(2)})`, display: 'inline-block',
            }}
          />
        );
      })}
    </span>
  );
};

// ── ZotraMark ──────────────────────────────────────────────────
interface ZotraMarkProps { size?: number; }

export const ZotraMark: React.FC<ZotraMarkProps> = ({ size = 26 }) => (
  <span style={{
    width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: 7, background: 'linear-gradient(135deg,#5552C9,#7A78E0)', color: '#fff',
    fontFamily: 'Sora,sans-serif', fontWeight: 700, fontSize: size * 0.5, letterSpacing: '-0.04em',
    boxShadow: '0 1px 2px rgba(75,72,200,0.30), inset 0 1px 0 rgba(255,255,255,0.25)',
  }}>z</span>
);
