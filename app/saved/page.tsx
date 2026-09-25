'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/common/Header';
import PlaybookCard from '@/components/cards/PlaybookCard';
import { useRoadmap } from '@/lib/context/RoadmapContext';

const SAVED_ROLE_FILTERS = [
  'All',
  'SDE',
  'Data Analytics',
  'AI / ML',
  'Cloud / IT',
  'Product (PM)',
];

export default function SavedStoriesPage() {
  const { playbooks, savedPlaybookIds } = useRoadmap();
  const [activeRole, setActiveRole] = useState('All');

  // Filter playbooks that are currently bookmarked / saved
  const savedPlaybooks = useMemo(() => {
    return playbooks.filter((pb) => savedPlaybookIds.includes(pb.id) || !!pb.isSaved);
  }, [playbooks, savedPlaybookIds]);

  // Apply role filter on saved playbooks
  const filteredSaved = useMemo(() => {
    if (activeRole === 'All') return savedPlaybooks;
    const roleKey = activeRole.toLowerCase();

    return savedPlaybooks.filter((pb) => {
      if (roleKey === 'sde') {
        return (
          pb.tags.some((t) => ['sde', 'swe', 'software'].some((k) => t.toLowerCase().includes(k))) ||
          pb.seniorRole.toLowerCase().includes('sde') ||
          pb.seniorRole.toLowerCase().includes('swe') ||
          pb.title.toLowerCase().includes('sde')
        );
      }
      if (roleKey === 'data analytics') {
        return (
          pb.tags.some((t) => ['data', 'analytics', 'da'].some((k) => t.toLowerCase().includes(k))) ||
          pb.seniorRole.toLowerCase().includes('analyst') ||
          pb.title.toLowerCase().includes('analyst')
        );
      }
      if (roleKey === 'ai / ml') {
        return (
          pb.tags.some((t) => ['ai', 'ml', 'genai', 'agentic'].some((k) => t.toLowerCase().includes(k))) ||
          pb.seniorRole.toLowerCase().includes('ai') ||
          pb.title.toLowerCase().includes('ai')
        );
      }
      if (roleKey === 'cloud / it') {
        return (
          pb.tags.some((t) => ['cloud', 'devops', 'aws', 'docker'].some((k) => t.toLowerCase().includes(k))) ||
          pb.seniorRole.toLowerCase().includes('cloud') ||
          pb.title.toLowerCase().includes('cloud')
        );
      }
      if (roleKey === 'product (pm)') {
        return (
          pb.tags.some((t) => ['pm', 'product', 'apm'].some((k) => t.toLowerCase().includes(k))) ||
          pb.seniorRole.toLowerCase().includes('pm') ||
          pb.title.toLowerCase().includes('pm')
        );
      }
      return pb.tags.some((t) => t.toLowerCase().includes(roleKey));
    });
  }, [savedPlaybooks, activeRole]);

  // Calculate aggregate metrics across saved stories
  const totalMilestones = savedPlaybooks.reduce((acc, p) => acc + p.milestonesCount, 0);
  const totalResources = savedPlaybooks.reduce((acc, p) => acc + p.resourcesCount, 0);

  return (
    <>
      <Header variant="standard" />

      <main className="flex-1 flex flex-col relative w-full pt-2 pb-24 bg-surface">
        <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto w-full px-margin pb-6 flex flex-col gap-space-md">
          {/* Header Title & Subtitle */}
          <div className="flex flex-col gap-1 pt-space-xs mt-2">
            <div className="flex items-center justify-between">
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-extrabold flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary-container text-[28px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bookmark
                </span>
                Saved Stories
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-white font-label-sm text-label-sm shadow-sm font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {savedPlaybooks.length} {savedPlaybooks.length === 1 ? 'Story' : 'Stories'} Saved
              </span>
            </div>
            <p className="font-body-md text-body-md text-secondary">
              Your personalized collection of peer-tested senior career blueprints across tech domains.
            </p>
          </div>

          {/* Quick Metrics Capsule */}
          {savedPlaybooks.length > 0 && (
            <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-surface-container-low border border-outline-variant/15">
              <div className="flex flex-col items-center text-center p-2 rounded-lg bg-surface-container-lowest shadow-xs">
                <span className="font-headline-sm text-sm font-bold text-on-surface">
                  {savedPlaybooks.length}
                </span>
                <span className="font-label-sm text-[11px] text-secondary">Playbooks</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded-lg bg-surface-container-lowest shadow-xs">
                <span className="font-headline-sm text-sm font-bold text-primary-container">
                  {totalMilestones}
                </span>
                <span className="font-label-sm text-[11px] text-secondary">Milestones</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded-lg bg-surface-container-lowest shadow-xs">
                <span className="font-headline-sm text-sm font-bold text-tertiary">
                  {totalResources}
                </span>
                <span className="font-label-sm text-[11px] text-secondary">Templates</span>
              </div>
            </div>
          )}

          {/* Role Filter Chips */}
          {savedPlaybooks.length > 0 && (
            <section className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-margin px-margin">
              {SAVED_ROLE_FILTERS.map((role) => {
                const isActive = activeRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setActiveRole(role)}
                    className={`filter-chip whitespace-nowrap px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all active:scale-95 ${
                      isActive
                        ? 'bg-inverse-surface text-inverse-on-surface shadow-sm font-semibold'
                        : 'bg-surface-container-low text-secondary hover:text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    {role}
                  </button>
                );
              })}
            </section>
          )}

          {/* Playbooks List or Empty State */}
          <div className="flex flex-col gap-space-md mt-1">
            {filteredSaved.length > 0 ? (
              filteredSaved.map((playbook) => (
                <PlaybookCard key={playbook.id} playbook={playbook} />
              ))
            ) : savedPlaybooks.length > 0 ? (
              <div className="py-12 px-6 text-center bg-surface-container-lowest rounded-xl border border-outline-variant/20 flex flex-col items-center">
                <span className="material-symbols-outlined text-secondary text-[40px] mb-2">
                  filter_alt_off
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  No {activeRole} Stories Saved
                </h3>
                <p className="font-body-sm text-body-sm text-secondary mt-1 max-w-xs">
                  You have saved stories in other roles, but none under &#34;{activeRole}&#34;.
                </p>
                <button
                  onClick={() => setActiveRole('All')}
                  className="mt-4 px-4 py-2 rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold shadow-sm active:scale-95"
                >
                  View All Saved Stories
                </button>
              </div>
            ) : (
              <div className="py-14 px-6 text-center bg-surface-container-lowest rounded-2xl border border-outline-variant/20 flex flex-col items-center shadow-xs">
                <div className="w-16 h-16 rounded-2xl bg-primary-container/10 text-primary-container flex items-center justify-center mb-4">
                  <span
                    className="material-symbols-outlined text-[36px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    bookmark_add
                  </span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                  No Saved Stories Yet
                </h2>
                <p className="font-body-md text-body-md text-secondary mt-2 max-w-xs">
                  Browse playbooks from seniors at Google, Flipkart, Blinkit, and Microsoft across SDE, DA, AI, and PM, and bookmark them into your career story.
                </p>
                <Link
                  href="/browse"
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-white font-label-lg text-label-lg font-bold shadow-md shadow-primary/20 active:scale-95 hover:bg-primary transition-transform"
                >
                  <span className="material-symbols-outlined text-[20px]">explore</span>
                  <span>Explore Senior Playbooks</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
