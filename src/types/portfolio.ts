export interface ProfileData {
  name: string;
  title: string;
  careerStartDate: string;
  location: string;
  avatarUrl: string;
  bio: string;
  shortBio: string;
  status: string;
  githubUrl: string;
  githubUsername: string;
  leetcodeUsername: string;
  linkedinUrl: string;
  email: string;
  xUrl?: string;
}

export type ProjectFolderId = 'hobby' | 'professional' | 'plan';

export interface ProjectFolder {
  id: ProjectFolderId;
  name: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  folder: ProjectFolderId;
  tag: string;
  status: 'done' | 'ongoing' | 'planned' | 'disbanded';
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  problem: string;
  solution: string;
  architecture: string;
  keyLearnings: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  date: string;
  metrics?: string;
  folderColor?: string;
}

export type SkillStatus = 'done' | 'learning' | 'planned';

export interface Skill {
  id: string;
  label: string;
  status: SkillStatus;
  description: string;
  // Where the skill was actually used: a role, project or certificate
  usedIn?: string;
}

// A branch is a skill area on a tree's trunk; its skills hang off it
export interface SkillBranch extends Skill {
  skills: Skill[];
}

export interface SkillTree {
  slug: 'backend' | 'machine-learning' | 'software-architect';
  title: string;
  description: string;
  branches: SkillBranch[];
}

export interface Certificate {
  id: string;
  categoryId: string;
  categoryName: string;
  tag?: string;
  outdated?: boolean;
  title: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  credentialId: string;
  verifyUrl: string;
  description: string;
  skills: string[];
  badgeColor: string;
}

export interface ExperienceEntry {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  current: boolean;
  highlights: string[];
  technologies: string[];
  impactMetric?: string;
}

export interface GithubDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GithubStats {
  username: string;
  totalContributionsYear: number;
  currentStreakDays: number;
  publicRepos: number;
  totalStars: number;
  topLanguages: { name: string; percentage: number; color: string }[];
  contributionCalendar: GithubDay[];
  featuredRepos: {
    name: string;
    description: string;
    stars: number;
    language: string;
    url: string;
  }[];
}

export interface LeetcodeStats {
  username: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
  acceptanceRate: string;
  ranking: string;
  streakDays: number;
  attempting: number;
  totalSubmissions: number;
  activeDays: number;
  longestStreak: number;
  submissionCalendarDays: GithubDay[];
  recentSubmissions: {
    title: string;
    timestamp: number;
    lang: string;
  }[];
  contestsAttended: number;
  contestRating: number;
  contestGlobalRanking: number;
  contestTopPercentage: number;
  contestHistory: {
    title: string;
    date: string;
    rating: number;
    ranking: number;
    problemsSolved: number;
    totalProblems: number;
    trendDirection: 'UP' | 'DOWN';
  }[];
}

export type DesktopWindowId = 
  | 'projects' 
  | 'certificates' 
  | 'about' 
  | 'skills' 
  | 'cv' 
  | 'experience' 
  | 'github' 
  | 'leetcode' 
  | 'contact';

export interface DesktopItem {
  id: DesktopWindowId;
  title: string;
  type: 'folder' | 'file' | 'app' | 'widget';
  icon: string;
  badge?: string | number;
  description?: string;
}
