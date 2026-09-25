'use client';

import React, { useState } from 'react';
import { SeniorPlaybook } from '@/types';
import { useRoadmap } from '@/lib/context/RoadmapContext';

interface PlaybookCardProps {
  playbook: SeniorPlaybook;
}

export default function PlaybookCard({ playbook }: PlaybookCardProps) {
  const { savedPlaybookIds, toggleSavePlaybook } = useRoadmap();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const isSaved = savedPlaybookIds.includes(playbook.id) || !!playbook.isSaved;

  if (playbook.isDarkHero) {
    return (
      <>
        <article className="relative flex flex-col p-space-md rounded-xl bg-inverse-surface text-inverse-on-surface shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg">
          {/* Background subtle technical mesh glow */}
          <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

          {/* Senior Profile Header */}
          <div className="flex items-start justify-between gap-space-sm relative z-10">
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full object-cover shadow-sm bg-surface-container-high"
                alt={playbook.seniorName}
                src={playbook.avatarUrl}
              />
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-headline-sm text-white truncate">
                    {playbook.seniorName}
                  </span>
                  <span
                    className="material-symbols-outlined text-tertiary-fixed text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-secondary-fixed truncate">
                  {playbook.seniorRole}
                </span>
              </div>
            </div>
            <div className="shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white font-label-sm text-label-sm font-semibold border border-white/20 backdrop-blur-md shadow-xs">
              <span
                className="material-symbols-outlined text-[13px] text-tertiary-fixed"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span>{playbook.rating.toFixed(1)}</span>
              <span className="text-white/40 font-normal">•</span>
              <span className="text-secondary-fixed">{playbook.milestonesCount} Milestones</span>
            </div>
          </div>

          {/* Credibility Badges */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3 relative z-10">
            {playbook.badges.map((badge, idx) => (
              <span
                key={idx}
                className={`shrink-0 whitespace-nowrap inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm border shadow-xs ${
                  idx === 0
                    ? 'bg-tertiary-container/30 text-tertiary-fixed border-tertiary-container/40'
                    : idx === 1
                    ? 'bg-surface-container-lowest/10 text-surface-container border-white/10'
                    : 'bg-surface-container-lowest/10 text-secondary-fixed border-white/10'
                }`}
              >
                {idx === 0 && <span className="material-symbols-outlined text-[12px]">verified</span>}
                {idx === 1 && (
                  <span className="material-symbols-outlined text-[12px]">workspace_premium</span>
                )}
                {badge}
              </span>
            ))}
          </div>

          {/* Playbook Title */}
          <div className="mt-3.5 relative z-10">
            <h2 className="font-headline-sm text-headline-sm text-white leading-snug">
              {playbook.title}
            </h2>
          </div>

          {/* Stats Bar with Confidence Pill */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-3.5 pt-3 bg-surface-container-lowest/5 rounded-lg p-2 relative z-10">
            <div className="flex items-center gap-3 font-body-sm text-body-sm text-secondary-fixed">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-primary-fixed">
                  timeline
                </span>
                {playbook.milestonesCount} Milestones
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-primary-fixed">
                  folder_open
                </span>
                {playbook.resourcesCount} Resources
              </span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-container text-white font-label-sm text-label-sm shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed" />
              <span>{playbook.matchPercentage}% Match</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-4 relative z-10">
            <button
              onClick={() => setShowProfileModal(true)}
              className="flex items-center justify-center gap-1.5 h-10 px-3 rounded-lg bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 text-white font-label-md text-label-md active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">person</span>
              <span>View Profile</span>
            </button>
            <button
              onClick={() => toggleSavePlaybook(playbook.id)}
              className={`save-story-btn flex items-center justify-center gap-1.5 h-10 px-3 rounded-lg font-label-md text-label-md shadow-sm active:scale-95 transition-all text-white ${
                isSaved
                  ? 'bg-tertiary-container hover:bg-tertiary'
                  : 'bg-primary-container hover:bg-primary'
              }`}
            >
              <span
                className="material-symbols-outlined text-[16px]"
                style={isSaved ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {isSaved ? 'bookmark_added' : 'bookmark_add'}
              </span>
              <span>{isSaved ? 'Saved to Story' : 'Save to Story'}</span>
            </button>
          </div>
        </article>

        {showProfileModal && (
          <SeniorProfileModal playbook={playbook} onClose={() => setShowProfileModal(false)} />
        )}
      </>
    );
  }

  // Standard Crisp Surface Level 1 Card
  return (
    <>
      <article className="relative flex flex-col p-space-md rounded-xl bg-surface-container-lowest text-on-surface shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md border border-outline-variant/10">
        {/* Senior Profile Header */}
        <div className="flex items-start justify-between gap-space-sm">
          <div className="flex items-center gap-3">
            <img
              className="w-12 h-12 rounded-full object-cover shadow-sm bg-surface-container"
              alt={playbook.seniorName}
              src={playbook.avatarUrl}
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-headline-sm text-on-surface truncate">
                  {playbook.seniorName}
                </span>
                <span
                  className="material-symbols-outlined text-primary text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-secondary truncate">
                {playbook.seniorRole}
              </span>
            </div>
          </div>
          <div className="shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed/70 text-on-secondary-fixed font-label-sm text-label-sm font-semibold border border-outline-variant/30 shadow-xs">
            <span
              className="material-symbols-outlined text-[13px] text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span>{playbook.rating.toFixed(1)}</span>
            <span className="text-secondary/40 font-normal">•</span>
            <span>{playbook.milestonesCount} Milestones</span>
          </div>
        </div>

        {/* Credibility Badges */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3">
          {playbook.badges.map((badge, idx) => (
            <span
              key={idx}
              className={`shrink-0 whitespace-nowrap inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm border shadow-xs ${
                idx === 0
                  ? 'bg-secondary-container text-on-secondary-container border-secondary-container'
                  : 'bg-primary-fixed/80 text-on-primary-fixed border-primary-fixed'
              }`}
            >
              <span className="material-symbols-outlined text-[12px]">
                {idx === 0 ? 'school' : 'outbox'}
              </span>
              {badge}
            </span>
          ))}
        </div>

        {/* Playbook Title */}
        <div className="mt-3">
          <h2 className="font-headline-sm text-headline-sm text-on-surface leading-snug">
            {playbook.title}
          </h2>
        </div>

        {/* Stats Bar with Match Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-3.5 pt-3 bg-surface-container-low rounded-lg p-2 border border-outline-variant/10">
          <div className="flex items-center gap-3 font-body-sm text-body-sm text-secondary">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-primary">route</span>
              {playbook.milestonesCount} Milestones
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-primary">
                description
              </span>
              {playbook.resourcesCount} Templates
            </span>
          </div>
          <div className="shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-inverse-surface text-inverse-on-surface font-label-sm text-label-sm shadow-sm font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed-dim animate-pulse" />
            <span>{playbook.matchPercentage}% Match</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 mt-4">
          <button
            onClick={() => setShowProfileModal(true)}
            className="flex items-center justify-center gap-1.5 h-10 px-3.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold active:scale-95 transition-all border border-outline-variant/20 shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">person</span>
            <span>View Profile</span>
          </button>
          <button
            onClick={() => toggleSavePlaybook(playbook.id)}
            className={`save-story-btn flex items-center justify-center gap-1.5 h-10 px-3.5 rounded-xl font-label-md text-label-md font-bold shadow-md active:scale-95 transition-all text-white ${
              isSaved
                ? 'bg-tertiary-container hover:bg-tertiary shadow-tertiary/20'
                : 'bg-primary-container hover:bg-primary shadow-primary/20'
            }`}
          >
            <span
              className="material-symbols-outlined text-[16px]"
              style={isSaved ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {isSaved ? 'bookmark_added' : 'bookmark_add'}
            </span>
            <span>{isSaved ? 'Saved to Story' : 'Save to Story'}</span>
          </button>
        </div>
      </article>

      {showProfileModal && (
        <SeniorProfileModal playbook={playbook} onClose={() => setShowProfileModal(false)} />
      )}
    </>
  );
}

function SeniorProfileModal({
  playbook,
  onClose,
}: {
  playbook: SeniorPlaybook;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest text-on-surface rounded-2xl p-6 w-full max-w-sm shadow-2xl relative animate-slide-up flex flex-col gap-4">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:text-on-surface"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="flex items-center gap-3">
          <img
            src={playbook.avatarUrl}
            alt={playbook.seniorName}
            className="w-14 h-14 rounded-full object-cover shadow-md"
          />
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              {playbook.seniorName}
            </h3>
            <p className="font-body-sm text-body-sm text-secondary">{playbook.seniorRole}</p>
            <div className="flex items-center gap-1 text-tertiary font-label-sm text-[11px] mt-0.5">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>Verified Campus Credential</span>
            </div>
          </div>
        </div>

        <div className="p-3 bg-surface-container-low rounded-xl flex flex-col gap-1.5">
          <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">
            Track Blueprint
          </span>
          <p className="font-body-md text-body-md text-on-surface font-medium">{playbook.title}</p>
          <div className="flex items-center gap-3 text-secondary font-label-sm text-[12px] pt-1">
            <span>{playbook.milestonesCount} Milestones</span>
            <span>•</span>
            <span>{playbook.resourcesCount} Vetted Templates</span>
            <span>•</span>
            <span className="text-primary font-semibold">{playbook.matchPercentage}% Alignment</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md font-semibold"
          >
            Close
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-primary-container text-white font-label-md text-label-md font-semibold shadow-md shadow-primary/20"
          >
            Connect 1:1
          </button>
        </div>
      </div>
    </div>
  );
}
