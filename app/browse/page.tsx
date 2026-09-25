'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/common/Header';
import PlaybookCard from '@/components/cards/PlaybookCard';
import { useRoadmap } from '@/lib/context/RoadmapContext';

const FILTER_CHIPS = [
  'All (42)',
  'IITs / BITS',
  'Tier-2/3 Achievers',
  'Freshers / APM',
  'Off-Campus',
];

export default function BrowsePage() {
  const { playbooks } = useRoadmap();
  const [searchQuery, setSearchQuery] = useState('Product Management');
  const [activeChip, setActiveChip] = useState('All (42)');

  const filteredPlaybooks = useMemo(() => {
    return playbooks.filter((pb) => {
      // Filter by category chip
      if (activeChip !== 'All (42)') {
        const matchesChip =
          pb.tags.some((t) => t.toLowerCase().includes(activeChip.toLowerCase())) ||
          pb.college.toLowerCase().includes(activeChip.toLowerCase()) ||
          pb.badges.some((b) => b.toLowerCase().includes(activeChip.toLowerCase()));
        if (!matchesChip) return false;
      }

      // Filter by search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        pb.title.toLowerCase().includes(q) ||
        pb.seniorName.toLowerCase().includes(q) ||
        pb.seniorRole.toLowerCase().includes(q) ||
        pb.college.toLowerCase().includes(q) ||
        pb.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [playbooks, searchQuery, activeChip]);

  return (
    <>
      <Header variant="standard" />

      <main className="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
        <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto w-full px-margin pb-6 flex flex-col gap-space-md">
          {/* Search Surface & Applied Query Capsule */}
          <section className="flex flex-col gap-space-xs mt-2">
            <div className="relative flex items-center w-full bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden transition-all focus-within:shadow-md border border-outline-variant/15">
              <span className="material-symbols-outlined absolute left-3.5 text-secondary text-[20px] pointer-events-none">
                search
              </span>
              <input
                id="playbookSearch"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by profession, person, company or college..."
                className="w-full h-12 pl-10 pr-24 bg-transparent font-body-md text-body-md text-on-surface placeholder:text-secondary outline-none"
              />
              {searchQuery && (
                <div className="absolute right-2 flex items-center">
                  <button
                    id="clearQueryBtn"
                    type="button"
                    aria-label="Clear filter"
                    onClick={() => setSearchQuery('')}
                    className="flex items-center gap-1 py-1 px-2 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm active:scale-95 transition-transform hover:bg-surface-container-high"
                  >
                    <span>Clear</span>
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </div>
              )}
            </div>

            {/* Active Query Removable Tag */}
            {searchQuery && (
              <div className="flex items-center gap-2 pt-1">
                <span className="font-label-sm text-label-sm text-secondary">Active Query:</span>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm shadow-sm font-medium">
                  <span>{searchQuery}</span>
                  <button
                    type="button"
                    aria-label="Remove tag"
                    onClick={() => setSearchQuery('')}
                    className="flex items-center hover:opacity-75 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-[14px]">cancel</span>
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Horizontal Filter Chips Carousel */}
          <section className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-margin px-margin">
            {FILTER_CHIPS.map((chip) => {
              const isActive = activeChip === chip;
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setActiveChip(chip)}
                  className={`filter-chip whitespace-nowrap px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all active:scale-95 ${
                    isActive
                      ? 'bg-inverse-surface text-inverse-on-surface shadow-sm font-semibold'
                      : 'bg-surface-container-low text-secondary hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </section>

          {/* Search Results Meta Bar */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              <h1 className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
                Top Playbooks
              </h1>
              <span className="font-body-sm text-body-sm text-secondary">
                Structured transition blueprints
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tertiary-container text-on-tertiary font-label-sm text-label-sm shadow-sm font-semibold">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>{filteredPlaybooks.length} Verified Roadmaps</span>
            </div>
          </div>

          {/* Playbooks List */}
          <div className="flex flex-col gap-space-md">
            {filteredPlaybooks.length > 0 ? (
              filteredPlaybooks.map((playbook) => (
                <PlaybookCard key={playbook.id} playbook={playbook} />
              ))
            ) : (
              <div className="py-12 px-6 text-center bg-surface-container-lowest rounded-xl border border-outline-variant/20 flex flex-col items-center">
                <span className="material-symbols-outlined text-secondary text-[40px] mb-2">
                  search_off
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  No Playbooks Found
                </h3>
                <p className="font-body-sm text-body-sm text-secondary mt-1 max-w-xs">
                  We couldn&#39;t find any playbooks matching &#34;{searchQuery}&#34;. Try searching for
                  Product Management, Flipkart, Blinkit, or DTU.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveChip('All (42)');
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-primary-container text-white font-label-md text-label-md font-semibold shadow-sm active:scale-95"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Ambient Micro Insight Footer */}
          <div className="flex items-center gap-2 p-3 mt-1 rounded-xl bg-surface-container-low text-secondary border border-outline-variant/10">
            <span className="material-symbols-outlined text-primary text-[20px] shrink-0">
              lightbulb
            </span>
            <p className="font-body-sm text-body-sm">
              Verified seniors update playbooks every quarter based on current campus interview cycles.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
