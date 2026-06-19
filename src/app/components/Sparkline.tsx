import React from 'react';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fill?: string;
  dot?: boolean;
}

const Sparkline: React.FC<SparklineProps> = ({ data, width = 80, height = 22, color = 'var(--p)', fill, dot = true }) => {
  if (!data || !data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);
  const points = data.map((v, i) => [i * stepX, height - 2 - ((v - min) / range) * (height - 4)] as [number, number]);
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

export default Sparkline;
