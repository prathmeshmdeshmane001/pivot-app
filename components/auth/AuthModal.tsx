'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRoadmap } from '@/lib/context/RoadmapContext';
import PivotLogo from '../common/PivotLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signup' | 'login';
}

export default function AuthModal({ isOpen, onClose, mode }: AuthModalProps) {
  const router = useRouter();
  const { showToast } = useRoadmap();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAuth = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
      showToast('Welcome to Pivot! Signed in successfully.');
      router.push('/dashboard');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest text-on-surface rounded-2xl p-6 w-full max-w-sm shadow-2xl relative animate-slide-up flex flex-col gap-4 border border-outline-variant/10">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:text-on-surface"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="flex flex-col items-center text-center pt-2">
          <PivotLogo size={44} className="h-11 w-11 mb-2" />
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
            {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
          </h3>
          <p className="font-body-sm text-body-sm text-secondary mt-1">
            Access verified career roadmaps and alumni playbooks.
          </p>
        </div>

        <form onSubmit={handleAuth} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-on-surface font-semibold">
              College Email (.edu / .ac.in)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. arjun@iitd.ac.in"
              className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md outline-none border border-transparent focus:border-primary transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-primary-container text-white rounded-xl shadow-md font-label-md text-label-md font-bold flex items-center justify-center gap-2 active:scale-98 transition-transform"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin text-[18px]">refresh</span>
            ) : (
              <span>Continue with College ID</span>
            )}
          </button>
        </form>

        <div className="flex items-center gap-2 my-1">
          <div className="h-px bg-surface-container flex-1" />
          <span className="font-label-sm text-label-sm text-secondary">or</span>
          <div className="h-px bg-surface-container flex-1" />
        </div>

        <button
          onClick={() => handleAuth()}
          className="w-full h-11 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-label-md text-label-md font-semibold flex items-center justify-center gap-2 active:scale-98 transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <p className="font-label-sm text-[11px] text-secondary text-center">
          By continuing, you agree to Pivot&#39;s Terms of Service & Privacy Policy.
        </p>
      </div>
    </div>
  );
}
