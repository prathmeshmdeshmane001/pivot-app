'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CareerTrack, Milestone, MilestoneStatus, SeniorPlaybook, UserProfile } from '@/types';
import { initialProfile, initialCareerTracks, initialPlaybooks, initialTemplates } from '@/data/mockData';

interface RoadmapContextType {
  profile: UserProfile;
  careerTracks: CareerTrack[];
  activeTrackId: string;
  setActiveTrackId: (id: string) => void;
  activeTrack: CareerTrack;
  playbooks: SeniorPlaybook[];
  savedPlaybookIds: string[];
  toggleSavePlaybook: (playbookId: string) => boolean;
  addMilestone: (trackId: string, milestone: Omit<Milestone, 'id'>) => void;
  updateMilestoneStatus: (trackId: string, milestoneId: string, status: MilestoneStatus) => void;
  adoptTemplate: (templateId: string) => void;
  logCheckpoint: (text: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

export function RoadmapProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [careerTracks, setCareerTracks] = useState<CareerTrack[]>(initialCareerTracks);
  const [activeTrackId, setActiveTrackId] = useState<string>('track-sde-2025');
  const [playbooks, setPlaybooks] = useState<SeniorPlaybook[]>(initialPlaybooks);
  const [savedPlaybookIds, setSavedPlaybookIds] = useState<string[]>(['pb-sde-1', 'pb-da-1']);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Hydrate from localStorage if available
  useEffect(() => {
    try {
      const savedTracks = localStorage.getItem('pivot_career_tracks');
      if (savedTracks) {
        setCareerTracks(JSON.parse(savedTracks));
      }
      const savedPbIds = localStorage.getItem('pivot_saved_playbooks');
      if (savedPbIds) {
        setSavedPlaybookIds(JSON.parse(savedPbIds));
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pivot_career_tracks', JSON.stringify(careerTracks));
    } catch {
      // ignore
    }
  }, [careerTracks]);

  useEffect(() => {
    try {
      localStorage.setItem('pivot_saved_playbooks', JSON.stringify(savedPlaybookIds));
    } catch {
      // ignore
    }
  }, [savedPlaybookIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const activeTrack =
    careerTracks.find((t) => t.id === activeTrackId) || careerTracks[0] || initialCareerTracks[0];

  const toggleSavePlaybook = (playbookId: string) => {
    let nowSaved = false;
    setSavedPlaybookIds((prev) => {
      if (prev.includes(playbookId)) {
        nowSaved = false;
        showToast('Removed from your career story');
        return prev.filter((id) => id !== playbookId);
      } else {
        nowSaved = true;
        showToast('Saved to your career story!');
        return [...prev, playbookId];
      }
    });
    setPlaybooks((prev) =>
      prev.map((pb) => (pb.id === playbookId ? { ...pb, isSaved: !pb.isSaved } : pb))
    );
    return nowSaved;
  };

  const addMilestone = (trackId: string, newMilestone: Omit<Milestone, 'id'>) => {
    const milestone: Milestone = {
      ...newMilestone,
      id: `m-${Date.now()}`,
    };

    setCareerTracks((prev) =>
      prev.map((track) => {
        if (track.id !== trackId) return track;
        const updatedMilestones = [...track.milestones, milestone];
        const completedCount = updatedMilestones.filter((m) => m.status === 'completed').length;
        const totalCount = updatedMilestones.length;
        const newScore = Math.min(98, Math.round((completedCount / (totalCount || 1)) * 100));

        return {
          ...track,
          milestones: updatedMilestones,
          totalStepCount: totalCount,
          unlockedStepCount: completedCount + 1,
          readinessScore: newScore,
        };
      })
    );

    // Update overall readiness
    setProfile((prev) => {
      const newOverall = Math.min(96, prev.overallReadiness + 3);
      return { ...prev, overallReadiness: newOverall };
    });

    showToast('New milestone inserted to execution path!');
  };

  const updateMilestoneStatus = (trackId: string, milestoneId: string, status: MilestoneStatus) => {
    setCareerTracks((prev) =>
      prev.map((track) => {
        if (track.id !== trackId) return track;
        const updated = track.milestones.map((m) => (m.id === milestoneId ? { ...m, status } : m));
        const completedCount = updated.filter((m) => m.status === 'completed').length;
        const newScore = Math.min(98, Math.round((completedCount / (updated.length || 1)) * 100));
        return {
          ...track,
          milestones: updated,
          readinessScore: newScore,
          unlockedStepCount: completedCount + 1,
        };
      })
    );
    showToast(`Milestone updated to ${status === 'completed' ? 'Completed' : status}!`);
  };

  const adoptTemplate = (templateId: string) => {
    const template = initialTemplates.find((t) => t.id === templateId);
    if (!template) return;

    const newMilestones: Milestone[] = template.milestones.map((m, idx) => ({
      ...m,
      id: `m-tpl-${Date.now()}-${idx}`,
    }));

    setCareerTracks((prev) => [
      ...prev,
      {
        id: `track-${Date.now()}`,
        title: template.title,
        type: 'secondary',
        cohort: 'Cohort 2025',
        targetRole: template.title,
        readinessScore: 70,
        milestones: newMilestones,
        unlockedStepCount: 2,
        totalStepCount: newMilestones.length + 2,
      },
    ]);

    showToast(`Adopted "${template.title}" template into your workspace!`);
  };

  const logCheckpoint = (text: string) => {
    if (!text.trim()) return;
    addMilestone(activeTrackId, {
      category: 'general',
      categoryLabel: 'Checkpoint',
      title: text,
      description: 'Logged through quick checkpoint logger on Dashboard.',
      status: 'completed',
      duration: 'Just now',
    });
  };

  return (
    <RoadmapContext.Provider
      value={{
        profile,
        careerTracks,
        activeTrackId,
        setActiveTrackId,
        activeTrack,
        playbooks,
        savedPlaybookIds,
        toggleSavePlaybook,
        addMilestone,
        updateMilestoneStatus,
        adoptTemplate,
        logCheckpoint,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </RoadmapContext.Provider>
  );
}

export function useRoadmap() {
  const context = useContext(RoadmapContext);
  if (!context) {
    throw new Error('useRoadmap must be used within a RoadmapProvider');
  }
  return context;
}
