export interface ProfileData {
  name: string;
  title: string;
  role: string;
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

export interface Project {
  id: string;
  title: string;
  category: string;
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

export interface SkillNode {
  id: string;
  label: string;
  category: string;
  branch: 'languages' | 'frameworks' | 'soft_skills';
  status: 'mastered' | 'learning' | 'planned';
  tier: number;
  x: number; // 0 - 100 percentage
  y: number; // 0 - 100 percentage
  parentIds: string[];
  maxPoints: number;
  defaultPoints: number;
  level: 'Expert' | 'Experienced' | 'Skillful' | 'Proficient' | 'Planned';
  years: string;
  description: string;
  statBonus?: string;
  iconName: string;
  relatedSkillIds: string[];
  projectIds: string[];
}

export interface SkillCategory {
  id: 'languages' | 'frameworks' | 'soft_skills';
  name: string;
  description: string;
  color: string;
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
    timeAgo: string;
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
