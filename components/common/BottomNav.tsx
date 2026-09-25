'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRoadmap } from '@/lib/context/RoadmapContext';

export default function BottomNav() {
  const pathname = usePathname();
  const { savedPlaybookIds } = useRoadmap();

  const isBrowse = pathname === '/browse';
  const isSaved = pathname === '/saved';
  const isBuilder = pathname === '/builder';
  const isDashboard = pathname === '/dashboard';

  if (pathname === '/') return null;

  const savedCount = savedPlaybookIds.length;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,0,0,0.06)] border-t border-outline-variant/20 pb-3">
      <div className="w-full h-14 max-w-md md:max-w-2xl mx-auto px-4 flex items-center justify-around">
        {/* Browse Tab */}
        <Link
          href="/browse"
          aria-current={isBrowse ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-all active:scale-95 ${
            isBrowse ? 'text-primary-container font-semibold' : 'text-secondary hover:text-on-surface'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={isBrowse ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            explore
          </span>
          <span className="font-label-sm text-[11px]">Browse</span>
        </Link>

        {/* Saved Stories (Bookmarks) Tab */}
        <Link
          href="/saved"
          aria-current={isSaved ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-all active:scale-95 ${
            isSaved ? 'text-primary-container font-semibold' : 'text-secondary hover:text-on-surface'
          }`}
        >
          <div className="relative">
            <span
              className="material-symbols-outlined text-[24px]"
              style={isSaved ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              bookmark
            </span>
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-2 px-1.5 py-0.2 min-w-[16px] h-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {savedCount}
              </span>
            )}
          </div>
          <span className="font-label-sm text-[11px]">Saved</span>
        </Link>

        {/* Builder Tab */}
        <Link
          href="/builder"
          aria-current={isBuilder ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-all active:scale-95 ${
            isBuilder ? 'text-primary-container font-semibold' : 'text-secondary hover:text-on-surface'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={isBuilder ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            add_circle
          </span>
          <span className="font-label-sm text-[11px]">Builder</span>
        </Link>

        {/* Dashboard Tab */}
        <Link
          href="/dashboard"
          aria-current={isDashboard ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-all active:scale-95 ${
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
          <span className="font-label-sm text-[11px]">Dashboard</span>
        </Link>
      </div>
    </nav>
  );
}
