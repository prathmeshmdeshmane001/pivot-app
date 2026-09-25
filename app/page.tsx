'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PivotLogo from '@/components/common/PivotLogo';
import AuthModal from '@/components/auth/AuthModal';

export default function OnboardingPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');

  const openAuth = (mode: 'signup' | 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <main className="flex-1 flex flex-col relative w-full pt-safe pb-safe bg-surface">
      <div className="max-w-md md:max-w-xl mx-auto w-full flex flex-col relative pb-10">
        {/* Top Header Bar */}
        <div className="px-space-md pt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm tracking-wide uppercase font-semibold">
              Early Access v2.4
            </span>
          </div>
          <div className="flex items-center space-x-1.5 bg-surface-container-high px-2.5 py-1 rounded-full text-secondary">
            <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse" />
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              942 Seniors Online
            </span>
          </div>
        </div>

        {/* Hero Branding Section */}
        <div className="flex flex-col items-center text-center px-space-md pt-6">
          <div className="relative mb-5">
            <div className="absolute -inset-1.5 bg-primary-container/20 rounded-2xl blur-lg" />
            <div className="relative w-20 h-20 rounded-2xl bg-surface-container-lowest p-2 shadow-md flex items-center justify-center">
              <PivotLogo size={64} className="w-full h-full object-contain rounded-xl" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-on-surface text-surface-container-lowest px-2 py-0.5 rounded-full shadow-sm flex items-center space-x-1">
              <span
                className="material-symbols-outlined text-[13px] text-tertiary-fixed"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <span className="font-label-sm text-label-sm text-surface-container-lowest font-bold">
                Pro
              </span>
            </div>
          </div>

          <h1 className="font-headline-xl-mobile text-headline-xl-mobile text-on-surface tracking-tight font-extrabold">
            Pivot
          </h1>
          <p className="font-headline-sm text-headline-sm text-primary-container mt-1 font-semibold max-w-xs">
            Discover, build &amp; validate your career roadmap
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 max-w-sm">
            {['SDE', 'Data Analytics', 'AI / ML', 'Cloud / IT', 'Product (PM)'].map((role) => (
              <span
                key={role}
                className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-[11px] font-semibold border border-outline-variant/15 shadow-xs"
              >
                {role}
              </span>
            ))}
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2.5 max-w-sm px-2">
            Proven milestone playbooks engineered by verified seniors from tier-1 firms &amp;
            campuses. Zero guesswork, pure execution.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="px-space-md mt-6 space-y-2.5">
          <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm flex items-start space-x-3 transition-transform active:scale-[0.99] border border-outline-variant/10">
            <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-1.5">
                <p className="font-label-lg text-label-lg text-on-surface font-bold">
                  1,240+ Playbooks
                </p>
                <span className="px-1.5 py-0.2 rounded bg-tertiary-fixed/40 text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">
                  Live
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Flipkart, Google, Blinkit, Microsoft &amp; top scaleups
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm flex items-start space-x-3 transition-transform active:scale-[0.99] border border-outline-variant/10">
            <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-fixed shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">track_changes</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-label-lg text-label-lg text-on-surface font-bold">
                84% Higher Prep Clarity
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Outperforms traditional campus placement cells
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm flex items-start space-x-3 transition-transform active:scale-[0.99] border border-outline-variant/10">
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-tertiary shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-label-lg text-label-lg text-on-surface font-bold">
                100% Peer-Vetted
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Authentic CTC bands, interview rounds &amp; system designs
              </p>
            </div>
          </div>
        </div>

        {/* Social Proof Cohort */}
        <div className="px-space-md mt-6">
          <div className="bg-surface-container-low p-3.5 rounded-xl flex items-center justify-between border border-outline-variant/10">
            <div className="flex -space-x-2 shrink-0">
              <img
                className="w-7 h-7 rounded-full object-cover shadow-sm ring-2 ring-surface"
                alt="Student 1"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD94PVh-8UrOCLf7mvZ7X1pXvfS1jyXoTufZljmLFuSURREP64YzjcU7V3HsdmSOIeBP-BBZAvh7PtxL6Uj8Vw2mvtCibTVLXCz1g4AsV2yesYG-iAutG7X6PUX9AXPhd6eWeuKb2RA39IJriLkQ27dOSQ4o9Elx_AJfRygC5K_zci-MzJy6PMJ9XJXzp-fByIH8DsAeKwbUX64cR900WAl5yCJjd61ukMbejP0LIuFMEWie9SukVir4g"
              />
              <img
                className="w-7 h-7 rounded-full object-cover shadow-sm ring-2 ring-surface"
                alt="Student 2"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXonBY94zq9CEVX8RPqsLy5h4g39zQA8MgGeMZ9DjJgN1YMiJ92tu9ssI9SMlAD9RWewzD1gH8QmNNP0LUT-uDz7PeoKVLJiI0dv9NrteBNG8bEI_BN5ELBq1WsyD81qExRh8YRD6yXu-666csPyy3MtDqp7AdWuXD7JGtF29YMfHrAAA5M7NMGzr0G2GjJyDpBGSI9_F0TunrHtt5mVclqrQWvrV-MA6tewOitwMiCUTRT-xhW7nG1Q"
              />
              <img
                className="w-7 h-7 rounded-full object-cover shadow-sm ring-2 ring-surface"
                alt="Student 3"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzTFn-8X_mDTkLosLchdtuDShA_eBYHf8RQeuuErwc1bCak6CYnfGeilYANpv23px1YOjNc-Qlhh41zX5iz95FKzB9DeP6axy5ZLsEiKgmm9flPDbI6pzNaSOf6U_9vcqk3lEhl6VVFN4UbtT3Ey1jQO2yIB-gh4qopc0ha8xEg0RHD7qnVl-MGvvXLzYL3Bh_Ro3EXabx7fO1UydRNXUWcVYq5kOsFUK3R2sBUkNNkbacAMeIATGKBg"
              />
            </div>
            <div className="min-w-0 flex-1 pl-3 text-left">
              <p className="font-label-sm text-label-sm text-on-surface font-semibold truncate">
                15,280+ Early Career Professionals
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                From IITs, BITS, NITs, and top tech scaleups
              </p>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
              groups
            </span>
          </div>
        </div>

        {/* Primary Interactive CTAs */}
        <div className="px-space-md mt-6 pt-2 space-y-3">
          <button
            onClick={() => openAuth('signup')}
            className="w-full h-12 bg-primary-container text-white rounded-xl shadow-md font-label-lg text-label-lg font-bold flex items-center justify-center space-x-2 transition-transform active:scale-[0.98] hover:bg-primary"
          >
            <span>Sign Up with College Email / Google</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
          <button
            onClick={() => openAuth('login')}
            className="w-full h-12 bg-surface-container-lowest text-on-surface rounded-xl shadow-sm font-label-lg text-label-lg font-semibold flex items-center justify-center space-x-2 active:bg-surface-container transition-all border border-outline-variant/20 hover:border-primary/40"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">login</span>
            <span>Log In to Existing Account</span>
          </button>
          <div className="text-center pt-2 px-4">
            <p className="font-label-sm text-label-sm text-secondary">
              Institutional security backed by end-to-end verified college domains.
            </p>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
      />
    </main>
  );
}
