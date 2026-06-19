import React from "react";

export default function ZotraLogo({
  size = 42,
}: {
  size?: number;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 12,
        background: "#0F172A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow:
          "0 10px 30px rgba(76,72,200,0.18), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <svg
        width={size * 0.62}
        height={size * 0.62}
        viewBox="0 0 64 64"
        fill="none"
      >
        <defs>
          <linearGradient id="zotraGradient" x1="0" y1="0" x2="64" y2="64">
            <stop offset="0%" stopColor="#5552C9" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>

        {/* Main futuristic Z path */}
        <path
          d="M14 16H50L22 48H50"
          stroke="url(#zotraGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Neural nodes */}
        <circle cx="14" cy="16" r="3.5" fill="#6D6AF8" />
        <circle cx="50" cy="16" r="3.5" fill="#7C3AED" />
        <circle cx="22" cy="48" r="3.5" fill="#5EEAD4" />
        <circle cx="50" cy="48" r="3.5" fill="#8B5CF6" />

        {/* Glow */}
        <circle
          cx="22"
          cy="48"
          r="7"
          fill="#5EEAD4"
          opacity="0.18"
        />
      </svg>
    </div>
  );
}