import { ProfileData } from '../types/portfolio';
import { CAREER_START_DATE, getYearsOfExperience } from '../utils/date';

export const profileData: ProfileData = {
  name: 'Odmandakh',
  title: 'Software Engineer',
  careerStartDate: CAREER_START_DATE,
  location: 'Ulaanbaatar, Mongolia',
  avatarUrl: '/odmandakh-profile.jpg',
  shortBio: 'Crafting resilient distributed systems, modern web apps, and high-performance cloud infrastructure.',
  bio: `Software Engineer with ${getYearsOfExperience()} years of experience specializing in scalable backend architectures, machine learning solutions, and serverless infrastructure.`,
  status: 'Available for hire',
  githubUrl: 'https://github.com/odmandakh',
  githubUsername: 'odmandakh',
  leetcodeUsername: 'Odmandakh',
  linkedinUrl: 'https://www.linkedin.com/in/odmandakh-battulga/',
  email: 'b.odmandah@gmail.com',
  xUrl: 'https://x.com/odmandakh_dev'
};
