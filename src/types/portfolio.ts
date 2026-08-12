export interface ProfileData {
  name: string;
  title: string;
  role: string;
  yearsExperience: number;
  location: string;
  avatarUrl: string;
  bio: string;
  shortBio: string;
  status: string;
  githubUrl: string;
  linkedinUrl: string;
  email: string;
  xUrl?: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  category: 'Professional' | 'Personal' | 'Open Source';
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
  category: 'Languages' | 'Frontend' | 'Backend & Cloud' | 'DevOps & Infra' | 'AI & Systems';
  level: 'Expert' | 'Proficient' | 'Familiar';
  years: string;
  description: string;
  iconName: string;
  relatedSkillIds: string[];
  projectIds: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface Certificate {
  id: string;
  categoryId: string;
  categoryName: string;
  title: string;
  issuer: string;
  issueDate: string;
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
  impactMetric: string;
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
  badgesCount: number;
  recentSubmissions: {
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    timeAgo: string;
    lang: string;
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
