'use client';

import React, { useState } from 'react';
import Header from '@/components/common/Header';
import MilestoneNode from '@/components/builder/MilestoneNode';
import AddMilestoneModal from '@/components/builder/AddMilestoneModal';
import { useRoadmap } from '@/lib/context/RoadmapContext';
import { initialTemplates } from '@/data/mockData';

export default function BuilderPage() {
  const { activeTrack, updateMilestoneStatus, adoptTemplate, showToast } = useRoadmap();
  const [modalOpen, setModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      showToast('Roadmap link copied to clipboard!');
    }
  };

  const handleSaveRoadmap = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Roadmap blueprint safely preserved!');
    }, 700);
  };

  const completedCount = activeTrack.milestones.filter((m) => m.status === 'completed').length;
  const inProgressIndex = activeTrack.milestones.findIndex((m) => m.status === 'in_progress');
  const unlockedStep = inProgressIndex !== -1 ? inProgressIndex + 1 : completedCount + 1;

  // Calculate dynamic timeline rail fill height (approx 120px per milestone card)
  const railProgressHeight = Math.min(
    100,
    Math.round((completedCount / (activeTrack.milestones.length || 1)) * 100)
  );

  return (
    <>
      <Header variant="back" title="Build Milestone" />

      <main className="flex-1 flex flex-col relative w-full pt-2 pb-24 bg-surface">
        <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto w-full flex flex-col">
          {/* Top Command & Action Bar */}
          <div className="px-gutter pt-space-md pb-space-sm flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-primary uppercase tracking-wider font-semibold">
                Interactive Builder
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                {activeTrack.title}
              </h2>
            </div>
            <div className="flex items-center gap-space-sm">
              <button
                aria-label="Share Roadmap"
                onClick={handleShare}
                className="w-10 h-10 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center transition-transform active:scale-95 shadow-sm hover:bg-surface-container-highest"
              >
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>
              <button
                onClick={handleSaveRoadmap}
                disabled={isSaving}
                className="h-10 px-space-md rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold flex items-center gap-space-xs shadow-md shadow-primary/20 transition-transform active:scale-95 hover:bg-primary-container"
              >
                {isSaving ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">
                      refresh
                    </span>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>Save Roadmap</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Narrative Subtitle & Verification Ribbon */}
          <div className="px-gutter mb-space-md">
            <p className="font-body-md text-body-md text-secondary">
              Assemble your sequential career milestones into a verified battle-tested roadmap.
            </p>

            {/* Micro Match & Confidence Indicator */}
            <div className="mt-space-sm p-space-sm rounded-xl bg-surface-container-lowest flex items-center justify-between shadow-sm border border-outline-variant/10">
              <div className="flex items-center gap-space-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse" />
                <span className="font-label-md text-label-md text-on-surface font-medium">
                  Target Track: {activeTrack.targetRole}
                </span>
              </div>
              <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold">
                Step {unlockedStep} of {activeTrack.totalStepCount || activeTrack.milestones.length + 1} Unlocked
              </span>
            </div>
          </div>

          {/* Visual Canvas / Timeline Grid */}
          <div className="px-gutter relative">
            <div className="relative pl-6">
              {/* Continuous Background Timeline Rail */}
              <div className="absolute left-[27px] top-6 bottom-10 w-0.5 bg-surface-container-highest" />

              {/* Dynamic Completed Progress Fill Rail */}
              <div
                className="absolute left-[27px] top-6 w-0.5 bg-primary transition-all duration-500"
                style={{ height: `${Math.max(12, railProgressHeight)}%` }}
              />

              {/* Render Existing Milestones */}
              {activeTrack.milestones.map((milestone, idx) => (
                <MilestoneNode
                  key={milestone.id}
                  milestone={milestone}
                  stepNumber={idx + 1}
                  onToggleStatus={(newStatus) =>
                    updateMilestoneStatus(activeTrack.id, milestone.id, newStatus)
                  }
                />
              ))}

              {/* Central Add Step Button */}
              <div className="relative mb-space-lg flex items-center gap-space-md">
                <button
                  id="addStepBtn"
                  aria-label="Add Milestone"
                  onClick={() => setModalOpen(true)}
                  className="relative z-10 w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg shadow-primary/40 hover:scale-105 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[24px]">add</span>
                </button>

                {/* Prompt Card / Insertion Zone */}
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full p-space-md rounded-xl bg-primary-fixed/30 hover:bg-primary-fixed/50 text-left transition-colors flex items-center justify-between shadow-sm group border border-primary/10"
                >
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-primary font-bold flex items-center gap-1">
                      Add Next Milestone
                      <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </span>
                    <span className="font-body-sm text-body-sm text-secondary line-clamp-1">
                      Course, POR, Internship, Case Competition, APM Interview Prep
                    </span>
                  </div>
                  <span className="w-7 h-7 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Lower Section: Pre-made Senior Templates */}
          <div className="mt-space-xl px-gutter">
            <div className="flex items-center justify-between mb-space-sm">
              <div className="flex flex-col">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Create from Saved Roadmaps
                </h3>
                <p className="font-body-sm text-body-sm text-secondary">
                  Battle-tested playbooks authenticated by verified seniors.
                </p>
              </div>
            </div>

            {/* Horizontal Scroll Carousel for Senior Templates */}
            <div className="flex gap-space-md overflow-x-auto pb-space-sm pt-space-xs -mx-gutter px-gutter no-scrollbar snap-x">
              {initialTemplates.map((template) => (
                <div
                  key={template.id}
                  className="min-w-[270px] max-w-[270px] snap-center bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between border border-outline-variant/10"
                >
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                        {template.tag}
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary flex items-center gap-0.5">
                        <span
                          className="material-symbols-outlined text-[14px] text-tertiary"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>{' '}
                        {template.rating.toFixed(1)}
                      </span>
                    </div>

                    <h4 className="font-headline-sm text-headline-sm text-on-surface mt-1 font-semibold">
                      {template.title}
                    </h4>
                    <p className="font-body-sm text-body-sm text-secondary">
                      {template.milestonesCount} milestones · {template.resourcesCount} resources
                    </p>

                    <div className="flex items-center gap-space-xs mt-space-xs">
                      {template.authorAvatar ? (
                        <img
                          className="w-6 h-6 rounded-full object-cover"
                          alt={template.author}
                          src={template.authorAvatar}
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px] font-bold">
                          {template.authorLetter || 'G'}
                        </div>
                      )}
                      <span className="font-label-sm text-label-sm text-on-surface font-medium truncate">
                        By {template.author}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => adoptTemplate(template.id)}
                    className="mt-space-md w-full py-2.5 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-label-md text-label-md transition-all flex items-center justify-center gap-1 active:scale-95 font-semibold"
                  >
                    <span className="material-symbols-outlined text-[16px]">content_copy</span>
                    <span>Edit &amp; Adopt</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <AddMilestoneModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        trackId={activeTrack.id}
      />
    </>
  );
}
