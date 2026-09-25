'use client';

import React, { useState } from 'react';
import Header from '@/components/common/Header';
import StoryCard from '@/components/cards/StoryCard';
import AddMilestoneModal from '@/components/builder/AddMilestoneModal';
import { useRoadmap } from '@/lib/context/RoadmapContext';

const DASHBOARD_FILTERS = [
  { id: 'all', label: 'All Goals' },
  { id: 'por', label: 'POR' },
  { id: 'fellowship', label: 'PM Fellowship' },
  { id: 'ai', label: 'Agentic AI' },
  { id: 'intern', label: 'Internships' },
  { id: 'prep', label: 'Interview Prep' },
];

export default function DashboardPage() {
  const {
    profile,
    careerTracks,
    logCheckpoint,
    showToast,
  } = useRoadmap();

  const [activeFilter, setActiveFilter] = useState('all');
  const [quickInput, setQuickInput] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTrackId, setModalTrackId] = useState<string | undefined>(undefined);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Compute aggregate stats across active tracks
  const totalMilestones = careerTracks.reduce((sum, t) => sum + t.milestones.length, 0);
  const completedMilestones = careerTracks.reduce(
    (sum, t) => sum + t.milestones.filter((m) => m.status === 'completed').length,
    0
  );

  const handleQuickUpdate = () => {
    if (!quickInput.trim()) return;
    setIsUpdating(true);
    logCheckpoint(quickInput.trim());
    setQuickInput('');
    setTimeout(() => {
      setIsUpdating(false);
    }, 1400);
  };

  const openAddMilestoneForTrack = (trackId: string) => {
    setModalTrackId(trackId);
    setModalOpen(true);
  };

  return (
    <>
      <Header variant="standard" />

      <main className="flex-1 flex flex-col relative w-full pt-16 pb-28 bg-surface">
        <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto w-full px-margin pb-space-xl flex flex-col gap-space-lg">
          {/* Header Context Greeting */}
          <div className="flex flex-col gap-1 pt-space-sm">
            <div className="flex items-center justify-between">
              <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-extrabold">
                Hey {profile.name} 👋
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm shadow-sm font-semibold">
                <span
                  className="material-symbols-outlined text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                {profile.collegeCohort}
              </span>
            </div>
            <p className="font-body-md text-body-md text-secondary">
              Target:{' '}
              <span className="font-label-lg text-label-lg text-on-surface font-bold">
                {profile.targetPlacementSeason}
              </span>
            </p>
          </div>

          {/* Horizontal Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-margin px-margin no-scrollbar">
            {DASHBOARD_FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`filter-chip px-3.5 py-1.5 rounded-full font-label-md text-label-md shrink-0 transition-all active:scale-95 ${
                    isActive
                      ? 'bg-on-secondary-fixed text-surface-container-lowest shadow-sm font-semibold'
                      : 'bg-surface-container-high text-secondary hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Overall Confidence & Progress Meter Widget (Dark Navy Executive Card) */}
          <div className="relative overflow-hidden rounded-xl bg-on-secondary-fixed text-surface-container-lowest p-space-md shadow-xl flex flex-col gap-4 border border-white/10">
            {/* Background ambient decorative light */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

            {/* Top Sparkle Decors */}
            <div className="flex items-start justify-between relative z-10">
              <div className="flex flex-col gap-0.5">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed-dim font-semibold">
                  Overall Health
                </span>
                <h3 className="font-headline-sm text-headline-sm text-surface-container-lowest font-bold">
                  {profile.overallReadiness}% Career Readiness
                </h3>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-container/30 text-inverse-primary font-label-sm text-label-sm font-semibold">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                Day 1 Safe
              </div>
            </div>

            {/* Glowing Dynamic Progress Bar */}
            <div className="flex flex-col gap-1.5 relative z-10">
              <div className="w-full h-2.5 bg-secondary-fixed/20 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-primary-container shadow-[0_0_12px_rgba(31,79,255,0.8)] transition-all duration-700"
                  style={{ width: `${profile.overallReadiness}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-secondary-fixed-dim font-label-sm text-label-sm">
                <span>
                  {completedMilestones} of {totalMilestones} Milestones Completed
                </span>
                <span className="text-surface-container-lowest font-medium">Goal: 6 by Nov 2025</span>
              </div>
            </div>

            {/* Senior Review Validation Signal */}
            <div className="flex items-center gap-2.5 pt-2 border-t-0 bg-surface-container-highest/10 p-2.5 rounded-lg relative z-10">
              <div className="flex -space-x-1.5 shrink-0">
                <div className="w-6 h-6 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary font-label-sm text-[10px] font-bold">
                  FL
                </div>
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-on-primary font-label-sm text-[10px] font-bold">
                  SW
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-surface-container-lowest font-medium truncate">
                  Reviewed by 2 Flipkart &amp; Swiggy Seniors
                </span>
                <span className="font-body-sm text-body-sm text-secondary-fixed-dim truncate">
                  Verified on-track for Associate Product Manager cohort
                </span>
              </div>
              <span
                className="material-symbols-outlined text-tertiary-fixed text-[18px] ml-auto shrink-0"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
          </div>

          {/* Search & Quick Milestone Logger Input */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface font-semibold">
              Track Milestone Progress
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-secondary text-[20px] pointer-events-none">
                search
              </span>
              <input
                id="searchMilestoneInput"
                type="text"
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleQuickUpdate()}
                placeholder="Search milestone (e.g. Case Study, PRD, DSA)..."
                className="w-full pl-9 pr-24 py-3 bg-surface-container-lowest rounded-xl font-body-md text-body-md text-on-surface placeholder:text-secondary shadow-sm focus:outline-none focus:bg-surface-container-low transition-colors border border-outline-variant/15"
              />
              <button
                id="logCheckpointBtn"
                onClick={handleQuickUpdate}
                className={`absolute right-1.5 px-3 py-1.5 font-label-md text-label-md font-semibold rounded-lg shadow-sm active:scale-95 transition-all text-white ${
                  isUpdating ? 'bg-tertiary-container' : 'bg-primary-container hover:bg-primary'
                }`}
              >
                {isUpdating ? 'Saved!' : 'Update'}
              </button>
            </div>
          </div>

          {/* Section: My Career Story */}
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  My Career Story
                </h2>
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
              </div>
              <span className="font-label-sm text-label-sm text-secondary font-medium">
                {careerTracks.length} Active Tracks
              </span>
            </div>

            {/* Career Tracks List */}
            {careerTracks.map((track) => (
              <StoryCard
                key={track.id}
                track={track}
                onAddMilestoneClick={() => openAddMilestoneForTrack(track.id)}
              />
            ))}
          </div>

          {/* Peer Benchmark / Proof of Outcome Module */}
          <div className="rounded-xl bg-surface-container-low p-space-md flex items-center gap-3 border border-outline-variant/10">
            <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary-container shadow-xs shrink-0">
              <span className="material-symbols-outlined text-[28px]">insights</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                Tier-1 APM Shortlist Index
              </span>
              <span className="font-body-sm text-body-sm text-secondary">
                Candidates with &gt;75% Confidence score get 3.4x more interview shortlists on campus.
              </span>
            </div>
          </div>

          {/* Quick Action Float: Book 1:1 Senior Validation */}
          <div className="sticky bottom-20 z-30 pt-1">
            <button
              onClick={() => setShowBookingModal(true)}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-on-secondary-fixed text-surface-container-lowest shadow-xl active:scale-[0.98] transition-transform hover:opacity-95"
            >
              <div className="flex items-center gap-2.5">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-primary-container text-white">
                  <span className="material-symbols-outlined text-[18px]">support_agent</span>
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-tertiary-fixed" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-label-lg text-label-lg text-surface-container-lowest font-semibold">
                    Book 1:1 Senior Validation
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary-fixed-dim">
                    3 Seniors online from Swiggy, Flipkart, Cred
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 font-label-md text-label-md text-primary-fixed bg-primary-container/30 px-2.5 py-1 rounded-full font-semibold">
                <span>Instant Slot</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </div>
            </button>
          </div>
        </div>
      </main>

      <AddMilestoneModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        trackId={modalTrackId}
      />

      {/* Booking 1:1 Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest text-on-surface rounded-2xl p-6 w-full max-w-sm shadow-2xl relative animate-slide-up flex flex-col gap-4 border border-outline-variant/10">
            <button
              onClick={() => setShowBookingModal(false)}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">support_agent</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Book Senior Review
                </h3>
                <p className="font-body-sm text-body-sm text-secondary">
                  1:1 CV &amp; Roadmap Audit
                </p>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-secondary">
              Connect with senior mentors from Swiggy, Flipkart, CRED to review your milestone proof
              and interview strategy.
            </p>
            <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
              <span className="font-label-md text-label-md font-semibold text-on-surface">
                Next Available Slot:
              </span>
              <span className="font-label-sm text-label-sm text-tertiary font-bold">
                Today, 9:30 PM IST
              </span>
            </div>
            <button
              onClick={() => {
                setShowBookingModal(false);
                showToast('1:1 Review Slot Booked! Check your email for Google Meet link.');
              }}
              className="w-full py-3 bg-primary-container hover:bg-primary text-white font-label-md text-label-md font-bold rounded-xl shadow-md transition-all active:scale-95"
            >
              Confirm Instant Slot
            </button>
          </div>
        </div>
      )}
    </>
  );
}
