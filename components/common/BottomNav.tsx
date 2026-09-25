'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const isBrowse = pathname === '/browse';
  const isBuilder = pathname === '/builder';
  const isDashboard = pathname === '/dashboard';

  if (pathname === '/') return null;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-outline-variant/20 pb-4">
      <div className="w-full h-14 px-margin-md flex items-center justify-between">
        {/* Browse Tab */}
        <Link
          href="/browse"
          aria-current={isBrowse ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors ${
            isBrowse ? 'text-primary-container font-semibold' : 'text-secondary hover:text-on-surface'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={isBrowse ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            explore
          </span>
          <span className="font-label-sm text-label-sm">Browse</span>
        </Link>

        {/* Central Add (+) Builder Button */}
        <Link
          href="/builder"
          aria-label="Build Milestone"
          className="relative -top-4 flex items-center justify-center min-w-[50px] min-h-[50px] w-[50px] h-[50px] rounded-full bg-primary-container text-white shadow-[0_8px_16px_rgba(31,79,255,0.32)] transition-transform active:scale-95 hover:scale-105"
        >
          <span
            className="material-symbols-outlined text-[28px]"
            style={isBuilder ? { transform: 'rotate(45deg)' } : undefined}
          >
            add
          </span>
        </Link>

        {/* Dashboard Tab */}
        <Link
          href="/dashboard"
          aria-current={isDashboard ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors ${
            isDashboard
              ? 'text-primary-container font-semibold'
              : 'text-secondary hover:text-on-surface'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={isDashboard ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            analytics
          </span>
          <span className="font-label-sm text-label-sm">Dashboard</span>
        </Link>
      </div>
    </nav>
  );
}
