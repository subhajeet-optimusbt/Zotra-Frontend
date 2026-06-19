import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

function toPascal(str: string): string {
  return str.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('');
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 16,
  color,
  strokeWidth = 1.6,
  className = '',
  style = {},
}) => {
  const pascalName = toPascal(name);
  const LucideIcon = (LucideIcons as unknown as Record<string, React.FC<React.SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }>>)[pascalName];

  if (!LucideIcon) {
    // Fallback dot if icon name not found
    return (
      <span
        className={'ic ' + className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color,
          ...style,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: size,
            height: size,
            background: 'currentColor',
            opacity: 0.3,
            borderRadius: '50%',
          }}
        />
      </span>
    );
  }

  return (
    <span
      className={'ic ' + className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color,
        ...style,
      }}
    >
      <LucideIcon size={size} strokeWidth={strokeWidth} color={color} />
    </span>
  );
};

export default Icon;