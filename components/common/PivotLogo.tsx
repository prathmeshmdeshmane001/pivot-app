import React from 'react';

interface PivotLogoProps {
  className?: string;
  size?: number;
}

export default function PivotLogo({ className = 'w-8 h-8', size = 32 }: PivotLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      width={size}
      height={size}
    >
      <rect width="100" height="100" rx="24" fill="#0B0F19" />
      <path d="M50 24L82 40L50 56L18 40L50 24Z" fill="#1F4FFF" />
      <path d="M50 24L82 40L50 56L18 40L50 24Z" stroke="#3B82F6" strokeWidth="2" />
      <path
        d="M30 46.5V64C30 72 50 78 50 78C50 78 70 72 70 64V46.5"
        stroke="#FFFFFF"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M82 40V62C82 65 79 67 76 67"
        stroke="#60A5FA"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="76" cy="68" r="4" fill="#60A5FA" />
      <circle cx="50" cy="40" r="3.5" fill="#FFFFFF" />
    </svg>
  );
}
