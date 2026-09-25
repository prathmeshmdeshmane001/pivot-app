'use client';

import React from 'react';
import Link from 'next/link';
import { CareerTrack } from '@/types';

interface StoryCardProps {
  track: CareerTrack;
  onAddMilestoneClick?: () => void;
}

export default function StoryCard({ track, onAddMilestoneClick }: StoryCardProps) {
  const isPrimary = track.type === 'primary';
  const completedCount = track.milestones.filter((m) => m.status === 'completed').length;
  const inProgressIndex = track.milestones.findIndex((m) => m.status === 'in_progress');
  const displayStep = inProgressIndex !== -1 ? inProgressIndex + 1 : completedCount;

  return (
    <div className="flex flex-col rounded-xl bg-surface-container-lowest p-space-md shadow-sm gap-3.5 border border-outline-variant/10 transition-all hover:shadow-md">
      {/* Top Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`shrink-0 whitespace-nowrap px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold border shadow-xs ${
                isPrimary
                  ? 'bg-primary-fixed text-on-primary-fixed border-primary-fixed'
                  : 'bg-surface-container-high text-secondary border-outline-variant/20'
              }`}
            >
              {isPrimary ? 'Primary Track' : 'Secondary Track'}
            </span>
            <span className="shrink-0 whitespace-nowrap font-label-sm text-label-sm text-secondary">{track.cohort}</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">
            {track.title}
          </h3>
        </div>
        <div
          className={`shrink-0 whitespace-nowrap px-3 py-1 rounded-full font-label-md text-label-md font-bold shadow-xs ${
            isPrimary
              ? 'bg-primary-container text-white shadow-primary/20'
              : 'bg-surface-container-high text-on-surface'
          }`}
        >
          {track.readinessScore}% Score
        </div>
      </div>

      <p className="font-body-sm text-body-sm text-secondary">
        Step {displayStep} of {track.totalStepCount || track.milestones.length} in progress ·{' '}
        {isPrimary ? 'Placement prep tier-1 prioritized' : 'High differentiator for Tech profiles'}
      </p>

      {/* Timeline Sequence Preview */}
      {isPrimary ? (
        <div className="flex items-center justify-between gap-1 py-1">
          {track.milestones.slice(0, 3).map((milestone, idx) => {
            const isDone = milestone.status === 'completed';
            const isActive = milestone.status === 'in_progress';
            return (
              <React.Fragment key={milestone.id}>
                <div className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isDone
                        ? 'bg-tertiary-container text-white shadow-xs'
                        : isActive
                        ? 'bg-primary-container text-white ring-4 ring-primary-fixed shadow-md animate-pulse'
                        : 'bg-surface-container-high text-secondary'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={isDone ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {isDone ? 'check' : isActive ? 'work' : 'analytics'}
                    </span>
                  </div>
                  <span
                    className={`font-label-sm text-[11px] text-center truncate w-full ${
                      isActive
                        ? 'text-primary-container font-semibold'
                        : isDone
                        ? 'text-on-surface font-medium'
                        : 'text-secondary'
                    }`}
                  >
                    {milestone.categoryLabel || milestone.title.split(':')[0]}
                  </span>
                </div>
                {idx < 2 && (
                  <div
                    className={`h-0.5 flex-1 mb-4 ${
                      isDone ? 'bg-tertiary-container' : 'bg-surface-container-highest'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center gap-2 bg-surface-container-low p-2 rounded-lg">
          <div className="w-6 h-6 rounded-full bg-primary-container text-white flex items-center justify-center text-[12px] font-bold">
            1
          </div>
          <span className="font-body-sm text-body-sm text-on-surface truncate">
            {track.milestones[0]?.title || 'Core Foundation Milestone'}
          </span>
          <span className="ml-auto font-label-sm text-label-sm text-primary-container font-semibold shrink-0">
            Active
          </span>
        </div>
      )}

      {/* Senior Feedback Micro-Quote */}
      {track.seniorFeedback && (
        <div className="p-2.5 rounded-lg bg-surface-container-low flex items-start gap-2">
          <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0 mt-0.5">
            comment
          </span>
          <p className="font-body-sm text-body-sm text-on-surface-variant italic">
            “{track.seniorFeedback.text}”
            <span className="block not-italic font-label-sm text-label-sm text-secondary font-medium mt-1">
              — {track.seniorFeedback.author}, {track.seniorFeedback.role}
            </span>
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-1">
        <Link
          href="/builder"
          className="flex-1 py-2 px-3 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold text-center transition-transform active:scale-95 hover:bg-surface-container"
        >
          Edit Roadmap
        </Link>
        <button
          onClick={onAddMilestoneClick}
          className={`flex-1 py-2 px-3 rounded-lg font-label-md text-label-md font-semibold text-center shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-1 ${
            isPrimary
              ? 'bg-primary-container text-white hover:bg-primary'
              : 'bg-surface-container-highest text-on-surface hover:bg-surface-container-high'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          Add Milestone
        </button>
      </div>
    </div>
  );
}
