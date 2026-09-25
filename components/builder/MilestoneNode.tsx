'use client';

import React from 'react';
import { Milestone, MilestoneStatus } from '@/types';

interface MilestoneNodeProps {
  milestone: Milestone;
  stepNumber: number;
  onToggleStatus?: (status: MilestoneStatus) => void;
}

export default function MilestoneNode({
  milestone,
  stepNumber,
  onToggleStatus,
}: MilestoneNodeProps) {
  const isCompleted = milestone.status === 'completed';
  const isInProgress = milestone.status === 'in_progress';
  const isUnreached = milestone.status === 'unreached';

  const nextStatus: MilestoneStatus = isCompleted
    ? 'in_progress'
    : isInProgress
    ? 'completed'
    : 'in_progress';

  return (
    <div
      className={`relative mb-space-lg flex items-start gap-space-md group transition-all ${
        isUnreached ? 'opacity-60' : 'opacity-100'
      }`}
    >
      {/* Milestone Node Badge */}
      <button
        onClick={() => onToggleStatus?.(nextStatus)}
        title="Click to toggle milestone status"
        className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-90 ${
          isCompleted
            ? 'bg-tertiary-container text-white shadow-md'
            : isInProgress
            ? 'bg-primary text-white shadow-md shadow-primary/30'
            : 'bg-surface-container text-secondary shadow-inner'
        }`}
      >
        {isInProgress && (
          <span className="w-2.5 h-2.5 rounded-full bg-surface-container-lowest animate-ping absolute" />
        )}
        {isCompleted ? (
          <span
            className="material-symbols-outlined text-[18px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check
          </span>
        ) : isInProgress ? (
          <span className="material-symbols-outlined text-[18px]">bolt</span>
        ) : (
          <span className="font-label-sm text-label-sm font-bold">
            {stepNumber < 10 ? `0${stepNumber}` : stepNumber}
          </span>
        )}
      </button>

      {/* Node Content Card */}
      <div
        className={`w-full p-space-md rounded-xl transition-all ${
          isUnreached
            ? 'bg-surface-container-low shadow-none'
            : 'bg-surface-container-lowest shadow-sm border border-outline-variant/10 hover:shadow-md'
        } flex flex-col gap-space-xs`}
      >
        <div className="flex items-center justify-between flex-wrap gap-1">
          <span
            className={`font-label-sm text-label-sm px-space-xs py-0.5 rounded-md font-semibold ${
              isCompleted
                ? 'bg-secondary-container text-on-secondary-container'
                : isInProgress
                ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                : 'bg-surface-container-high text-secondary'
            }`}
          >
            {milestone.categoryLabel || 'Milestone'}
          </span>

          <button
            onClick={() => onToggleStatus?.(nextStatus)}
            className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
          >
            {isCompleted && (
              <div className="flex items-center gap-1 text-tertiary">
                <span
                  className="material-symbols-outlined text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <span className="font-label-sm text-label-sm font-semibold">Completed ✓</span>
              </div>
            )}
            {isInProgress && (
              <div className="flex items-center gap-1 text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-label-sm text-label-sm font-semibold">
                  In Progress {milestone.duration ? `(${milestone.duration})` : ''}
                </span>
              </div>
            )}
            {isUnreached && (
              <span className="font-label-sm text-label-sm text-secondary">
                {milestone.targetDate || 'Upcoming Goal'}
              </span>
            )}
          </button>
        </div>

        <h3 className="font-headline-sm text-headline-sm text-on-surface">{milestone.title}</h3>
        <p className="font-body-sm text-body-sm text-secondary">{milestone.description}</p>

        {/* Duration / Artifacts metadata */}
        {(milestone.duration || milestone.artifactsCount) && isCompleted && (
          <div className="mt-space-xs flex items-center gap-space-sm pt-space-xs text-secondary font-label-sm text-label-sm">
            {milestone.duration && (
              <span className="flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">calendar_today</span>{' '}
                {milestone.duration}
              </span>
            )}
            {milestone.duration && milestone.artifactsCount && <span>•</span>}
            {milestone.artifactsCount && (
              <span className="flex items-center gap-0.5 text-primary">
                <span className="material-symbols-outlined text-[14px]">attach_file</span>{' '}
                {milestone.artifactsCount} Artifacts Linked
              </span>
            )}
          </div>
        )}

        {/* Mentor Endorsement */}
        {milestone.mentorEndorsement && isInProgress && (
          <div className="mt-space-xs p-space-xs rounded-lg bg-surface-container-low flex items-center gap-space-xs">
            {milestone.mentorEndorsement.avatarUrl && (
              <img
                className="w-5 h-5 rounded-full object-cover"
                alt={milestone.mentorEndorsement.name}
                src={milestone.mentorEndorsement.avatarUrl}
              />
            )}
            <span className="font-label-sm text-label-sm text-on-surface truncate">
              Verified by {milestone.mentorEndorsement.name} ({milestone.mentorEndorsement.role})
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
