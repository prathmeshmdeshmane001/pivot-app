'use client';

import React, { useEffect, useState } from 'react';
import { useRoadmap } from '@/lib/context/RoadmapContext';

export default function Toast() {
  const { toastMessage, showToast } = useRoadmap();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (toastMessage) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => showToast(''), 300);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  if (!toastMessage && !visible) return null;

  return (
    <div
      className={`fixed bottom-20 inset-x-6 z-50 max-w-sm mx-auto bg-inverse-surface text-inverse-on-surface px-space-md py-space-sm rounded-xl shadow-xl flex items-center justify-between transition-all duration-300 pointer-events-none ${
        visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
      }`}
    >
      <div className="flex items-center gap-space-xs">
        <span
          className="material-symbols-outlined text-tertiary-fixed text-[20px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
        <span className="font-label-md text-label-md text-surface-container-lowest font-medium">
          {toastMessage}
        </span>
      </div>
    </div>
  );
}
