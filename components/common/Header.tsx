'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PivotLogo from './PivotLogo';
import { useRoadmap } from '@/lib/context/RoadmapContext';

interface HeaderProps {
  variant?: 'standard' | 'back';
  title?: string;
  showProfile?: boolean;
}

export default function Header({
  variant = 'standard',
  title = 'Build Milestone',
  showProfile = true,
}: HeaderProps) {
  const router = useRouter();
  const { profile } = useRoadmap();

  return (
    <header className="sticky top-0 inset-x-0 z-40 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-black/[0.04]">
      <div className="w-full h-14 sm:h-16 px-margin flex items-center justify-between">
        {variant === 'standard' ? (
          <Link href="/browse" className="flex items-center gap-space-sm group">
            <PivotLogo size={30} className="h-7 w-7 sm:h-8 sm:w-8 object-contain transition-transform group-hover:scale-105" />
            <div className="flex items-center gap-1.5">
              <span className="font-headline-md text-headline-md tracking-tight text-on-surface">
                Pivot
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                Beta
              </span>
            </div>
          </Link>
        ) : (
          <div className="flex items-center gap-space-xs">
            <button
              aria-label="Go back"
              onClick={() => router.back()}
              className="min-w-[40px] min-h-[40px] flex items-center justify-center text-on-surface hover:text-primary transition-colors active:scale-90"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back_ios_new</span>
            </button>
            <div className="flex items-center gap-space-sm pl-1">
              <PivotLogo size={22} className="h-5 w-5 sm:h-6 sm:w-6 object-contain" />
              <h1 className="font-headline-sm text-headline-sm text-on-surface tracking-tight truncate max-w-[200px]">
                {title}
              </h1>
            </div>
          </div>
        )}

        {showProfile && (
          <div className="flex items-center">
            <Link
              href="/dashboard"
              className="relative flex items-center justify-center p-1 rounded-full hover:ring-2 hover:ring-primary/20 transition-all"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                src={profile.avatarUrl}
              />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-primary-container ring-2 ring-surface animate-pulse" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
