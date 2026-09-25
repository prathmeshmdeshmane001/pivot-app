'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PivotLogo from './PivotLogo';

interface IPhone17FrameProps {
  children: React.ReactNode;
}

export default function IPhone17Frame({ children }: IPhone17FrameProps) {
  const pathname = usePathname();
  const [time, setTime] = useState('9:41');
  const [scale, setScale] = useState<number>(0.92);
  const [frameMode, setFrameMode] = useState<'iphone' | 'fullscreen'>('iphone');

  // Update clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      hours = hours % 12 || 12;
      const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
      setTime(`${hours}:${minutesStr}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  // Auto adjust scale based on window height on desktop
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const h = window.innerHeight;
        if (h < 850) {
          setScale(0.82);
        } else if (h < 950) {
          setScale(0.88);
        } else {
          setScale(0.95);
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0a0d14] text-white flex flex-col items-center justify-start overflow-x-hidden selection:bg-primary-container selection:text-white">
      {/* Top Presentation Toolbar (visible on screens >= 640px) */}
      <header className="hidden sm:flex w-full max-w-5xl items-center justify-between px-6 py-3.5 z-40 border-b border-white/10 bg-[#0a0d14]/80 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-3">
          <PivotLogo size={28} className="h-7 w-7 object-contain" />
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-sm font-bold tracking-tight text-white">
              Pivot
            </span>
            <span className="px-2 py-0.5 rounded-full bg-primary-container/20 text-inverse-primary font-label-sm text-[11px] font-semibold border border-primary-container/30">
              iPhone 17 Pro
            </span>
          </div>
        </div>

        {/* Screen Quick Switcher */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
          <Link
            href="/"
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              pathname === '/'
                ? 'bg-primary-container text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Onboarding
          </Link>
          <Link
            href="/browse"
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              pathname === '/browse'
                ? 'bg-primary-container text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Browse
          </Link>
          <Link
            href="/builder"
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              pathname === '/builder'
                ? 'bg-primary-container text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Builder
          </Link>
          <Link
            href="/dashboard"
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              pathname === '/dashboard'
                ? 'bg-primary-container text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Dashboard
          </Link>
        </div>

        {/* Zoom & View Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white/5 rounded-lg border border-white/10 p-0.5 text-xs text-gray-300">
            <button
              onClick={() => setScale(Math.max(0.75, scale - 0.05))}
              className="px-2 py-1 hover:text-white transition-colors"
              title="Zoom out"
            >
              -
            </button>
            <span className="px-1.5 font-mono text-[11px]">{Math.round(scale * 100)}%</span>
            <button
              onClick={() => setScale(Math.min(1.05, scale + 0.05))}
              className="px-2 py-1 hover:text-white transition-colors"
              title="Zoom in"
            >
              +
            </button>
          </div>

          <button
            onClick={() => setFrameMode(frameMode === 'iphone' ? 'fullscreen' : 'iphone')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              frameMode === 'iphone'
                ? 'bg-white/10 text-white border-white/20'
                : 'bg-primary-container text-white border-primary-container'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">
              {frameMode === 'iphone' ? 'stay_current_portrait' : 'fullscreen'}
            </span>
            <span>{frameMode === 'iphone' ? 'Device View' : 'Full Screen'}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full flex items-center justify-center sm:py-6 px-0 sm:px-4">
        {frameMode === 'fullscreen' ? (
          // Fullscreen responsive view
          <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl min-h-screen bg-surface text-on-surface shadow-2xl relative flex flex-col">
            {children}
          </div>
        ) : (
          // Realistic iPhone 17 Frame
          <div
            className="transition-transform duration-300 ease-out origin-top sm:origin-center"
            style={{
              transform: `scale(${scale})`,
            }}
          >
            {/* Outer Hardware Chassis (Natural Titanium / Space Black) */}
            <div className="relative w-[402px] h-[874px] rounded-[56px] p-[11px] bg-gradient-to-b from-[#2d3139] via-[#1b1e24] to-[#121418] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.15)] ring-1 ring-black/80">
              {/* Hardware Side Buttons */}
              {/* Action Button */}
              <div className="hidden sm:block absolute -left-[14px] top-[112px] w-[3.5px] h-[30px] rounded-l-md bg-gradient-to-r from-[#17191d] to-[#2e333b]" />
              {/* Volume Up */}
              <div className="hidden sm:block absolute -left-[14px] top-[162px] w-[3.5px] h-[52px] rounded-l-md bg-gradient-to-r from-[#17191d] to-[#2e333b]" />
              {/* Volume Down */}
              <div className="hidden sm:block absolute -left-[14px] top-[226px] w-[3.5px] h-[52px] rounded-l-md bg-gradient-to-r from-[#17191d] to-[#2e333b]" />
              {/* Power / Lock Button */}
              <div className="hidden sm:block absolute -right-[14px] top-[178px] w-[3.5px] h-[78px] rounded-r-md bg-gradient-to-l from-[#17191d] to-[#2e333b]" />

              {/* Antenna Bands */}
              <div className="hidden sm:block absolute -left-[11px] top-[75px] w-[2px] h-[4px] bg-[#3a3f49]" />
              <div className="hidden sm:block absolute -left-[11px] bottom-[75px] w-[2px] h-[4px] bg-[#3a3f49]" />
              <div className="hidden sm:block absolute -right-[11px] top-[75px] w-[2px] h-[4px] bg-[#3a3f49]" />
              <div className="hidden sm:block absolute -right-[11px] bottom-[75px] w-[2px] h-[4px] bg-[#3a3f49]" />

              {/* Inner Screen Display (380px x 852px) */}
              <div
                className="w-full h-full rounded-[45px] overflow-hidden relative flex flex-col bg-surface text-on-surface shadow-inner border border-black/40"
                style={{
                  transform: 'translateZ(0)',
                  willChange: 'transform',
                }}
              >
                {/* iOS Status Bar with Dynamic Island */}
                <div className="h-[46px] w-full px-7 flex items-center justify-between z-50 select-none bg-surface/85 backdrop-blur-md shrink-0 sticky top-0 inset-x-0 border-b border-black/[0.03]">
                  {/* Left: Clock */}
                  <div className="w-14 text-left">
                    <span className="font-semibold text-[14px] tracking-tight text-on-surface">
                      {time}
                    </span>
                  </div>

                  {/* Center: Dynamic Island */}
                  <div className="w-[124px] h-[30px] bg-black rounded-full flex items-center justify-between px-3 shadow-md group cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95">
                    {/* Front Camera Lens */}
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0b101e] ring-1 ring-[#1b253b] relative flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-[#182a52] opacity-80" />
                    </div>
                    {/* TrueDepth Sensor */}
                    <div className="w-2 h-2 rounded-full bg-[#06080e]" />
                    {/* Activity Indicator (Pivot pulse) */}
                    <div className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                  </div>

                  {/* Right: Cellular, WiFi, Battery */}
                  <div className="w-14 flex items-center justify-end gap-1.5 text-on-surface">
                    {/* Signal */}
                    <div className="flex items-end gap-0.5 h-3">
                      <span className="w-[2.5px] h-[4px] bg-current rounded-xs" />
                      <span className="w-[2.5px] h-[6px] bg-current rounded-xs" />
                      <span className="w-[2.5px] h-[8px] bg-current rounded-xs" />
                      <span className="w-[2.5px] h-[10px] bg-current rounded-xs" />
                    </div>
                    {/* WiFi */}
                    <span className="material-symbols-outlined text-[15px] font-bold">wifi</span>
                    {/* Battery */}
                    <div className="w-[20px] h-[10px] rounded-[3px] border border-current p-0.5 flex items-center">
                      <div className="w-full h-full bg-current rounded-xs" />
                    </div>
                  </div>
                </div>

                {/* App Content Body */}
                <div className="flex-1 w-full overflow-y-auto no-scrollbar relative flex flex-col">
                  {children}
                </div>

                {/* Bottom Home Indicator */}
                <div className="h-[20px] w-full flex items-center justify-center pointer-events-none z-50 absolute bottom-0 inset-x-0">
                  <div className="w-[134px] h-[4.5px] bg-[#191c1e]/40 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
