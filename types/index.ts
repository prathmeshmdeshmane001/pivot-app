export type MilestoneCategory =
  | 'coursework'
  | 'por'
  | 'internship'
  | 'competition'
  | 'prep'
  | 'general';

export type MilestoneStatus = 'completed' | 'in_progress' | 'unreached';

export interface Milestone {
  id: string;
  category: MilestoneCategory;
  categoryLabel: string;
  title: string;
  description: string;
  status: MilestoneStatus;
  duration?: string;
  artifactsCount?: number;
  mentorEndorsement?: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  targetDate?: string;
}

export interface CareerTrack {
  id: string;
  title: string;
  type: 'primary' | 'secondary';
  cohort: string;
  targetRole: string;
  readinessScore: number;
  milestones: Milestone[];
  seniorFeedback?: {
    text: string;
    author: string;
    role: string;
  };
  unlockedStepCount: number;
  totalStepCount: number;
}

export interface SeniorPlaybook {
  id: string;
  seniorName: string;
  seniorRole: string;
  college: string;
  avatarUrl: string;
  rating: number;
  badges: string[];
  title: string;
  milestonesCount: number;
  resourcesCount: number;
  matchPercentage: number;
  isDarkHero?: boolean;
  isSaved?: boolean;
  tags: string[];
}

export interface SeniorTemplate {
  id: string;
  title: string;
  rating: number;
  milestonesCount: number;
  resourcesCount: number;
  author: string;
  authorAvatar?: string;
  authorLetter?: string;
  tag: string;
  milestones: Omit<Milestone, 'id'>[];
}

export interface UserProfile {
  name: string;
  collegeCohort: string;
  targetTrack: string;
  targetPlacementSeason: string;
  avatarUrl: string;
  overallReadiness: number;
}
