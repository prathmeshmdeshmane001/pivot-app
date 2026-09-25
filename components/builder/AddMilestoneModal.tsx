'use client';

import React, { useState } from 'react';
import { MilestoneCategory } from '@/types';
import { useRoadmap } from '@/lib/context/RoadmapContext';

interface AddMilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackId?: string;
}

interface CategoryOption {
  category: MilestoneCategory;
  label: string;
  icon: string;
}

const CATEGORIES: CategoryOption[] = [
  { category: 'coursework', label: 'Coursework / Cert', icon: 'school' },
  { category: 'por', label: 'POR & Club Leadership', icon: 'groups' },
  { category: 'internship', label: 'Internship Track', icon: 'business_center' },
  { category: 'competition', label: 'Case Competition', icon: 'emoji_events' },
  { category: 'prep', label: 'APM Interview Prep', icon: 'psychology' },
  { category: 'general', label: 'Independent Project', icon: 'rocket_launch' },
];

export default function AddMilestoneModal({
  isOpen,
  onClose,
  trackId,
}: AddMilestoneModalProps) {
  const { activeTrackId, addMilestone } = useRoadmap();
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption>(CATEGORIES[0]);
  const [title, setTitle] = useState('');
  const [spec, setSpec] = useState('');

  if (!isOpen) return null;

  const targetTrack = trackId || activeTrackId;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addMilestone(targetTrack, {
      category: selectedCategory.category,
      categoryLabel: selectedCategory.label.split('/')[0].trim(),
      title: title.trim(),
      description:
        spec.trim() ||
        `Structured ${selectedCategory.label} achievement verified by campus mentors.`,
      status: 'in_progress',
      duration: 'Ongoing',
    });

    setTitle('');
    setSpec('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-sm flex flex-col justify-end transition-opacity">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-surface-container-lowest rounded-t-3xl p-space-md w-full max-h-[88vh] overflow-y-auto shadow-2xl flex flex-col gap-space-md animate-slide-up max-w-md md:max-w-2xl lg:max-w-4xl mx-auto border-t border-outline-variant/20">
        {/* Grab Handle */}
        <div className="w-12 h-1.5 rounded-full bg-surface-container-highest mx-auto" />

        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Add Career Milestone</h3>
            <p className="font-body-sm text-body-sm text-secondary">
              Structure your next competitive capability.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
          {/* Milestone Category Chips */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface">Milestone Category</label>
            <div className="grid grid-cols-2 gap-space-xs">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory.category === cat.category;
                return (
                  <button
                    key={cat.category}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`category-chip p-space-sm rounded-lg font-label-sm text-label-sm text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-primary-fixed text-on-primary-fixed font-semibold ring-2 ring-primary/30'
                        : 'bg-surface-container text-on-surface font-medium hover:bg-surface-container-high'
                    }`}
                  >
                    <span className="truncate pr-1">{cat.label}</span>
                    <span className="material-symbols-outlined text-[16px] shrink-0">
                      {cat.icon}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Milestone Title */}
          <div className="flex flex-col gap-1">
            <label className="font-label-md text-label-md text-on-surface">Milestone Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cleared Reforge Product Strategy Cohort"
              className="w-full h-11 px-space-md rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest outline-none shadow-xs border border-transparent focus:border-primary transition-all"
            />
          </div>

          {/* Deliverables & Proof */}
          <div className="flex flex-col gap-1">
            <label className="font-label-md text-label-md text-on-surface">
              Proof / Key Achievement Spec
            </label>
            <textarea
              rows={2}
              value={spec}
              onChange={(e) => setSpec(e.target.value)}
              placeholder="Shipped 1 PRD, 2 customer journey maps, verified by PM mentor..."
              className="w-full p-space-md rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest outline-none resize-none shadow-xs border border-transparent focus:border-primary transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!title.trim()}
            className="w-full h-12 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-xs shadow-md shadow-primary/25 active:scale-98 disabled:opacity-50 transition-all hover:bg-primary-container"
          >
            <span className="material-symbols-outlined text-[20px]">add_task</span>
            <span>Insert Milestone into Timeline</span>
          </button>
        </form>
      </div>
    </div>
  );
}
