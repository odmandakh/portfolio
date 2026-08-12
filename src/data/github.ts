import { GithubStats, GithubDay } from '../types/portfolio';

// Generate 52 weeks x 7 days = 364 days of contributions
const generateContributionCalendar = (): GithubDay[] => {
  const days: GithubDay[] = [];
  const today = new Date('2026-08-12');
  
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay(); // 0 = Sun, 6 = Sat
    
    // realistic commit patterns: more on weekdays, fewer on weekends
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    let count = 0;
    const rand = Math.random();
    
    if (isWeekend) {
      if (rand > 0.6) count = Math.floor(Math.random() * 4) + 1;
    } else {
      if (rand > 0.15) {
        if (rand > 0.85) count = Math.floor(Math.random() * 8) + 8; // heavy commit day
        else if (rand > 0.5) count = Math.floor(Math.random() * 5) + 3;
        else count = Math.floor(Math.random() * 3) + 1;
      }
    }
    
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count === 0) level = 0;
    else if (count <= 2) level = 1;
    else if (count <= 5) level = 2;
    else if (count <= 9) level = 3;
    else level = 4;
    
    days.push({ date: dateStr, count, level });
  }
  return days;
};

export const githubData: GithubStats = {
  username: 'odmandakh',
  totalContributionsYear: 2482,
  currentStreakDays: 38,
  publicRepos: 42,
  totalStars: 1850,
  topLanguages: [
    { name: 'TypeScript', percentage: 42, color: '#3178c6' },
    { name: 'Go', percentage: 31, color: '#00add8' },
    { name: 'Python', percentage: 15, color: '#3572A5' },
    { name: 'Rust', percentage: 12, color: '#dea584' }
  ],
  contributionCalendar: generateContributionCalendar(),
  featuredRepos: [
    {
      name: 'aegis-event-engine',
      description: 'Distributed event stream processing engine in Go & gRPC.',
      stars: 840,
      language: 'Go',
      url: 'https://github.com/odmandakh/aegis-event-engine'
    },
    {
      name: 'kubecanary-cli',
      description: 'Lightweight Rust CLI for zero-downtime canary rollouts on K8s.',
      stars: 620,
      language: 'Rust',
      url: 'https://github.com/odmandakh/kubecanary-cli'
    },
    {
      name: 'odmandakh-os',
      description: 'Personal portfolio presented as an elegant macOS-inspired desktop.',
      stars: 390,
      language: 'TypeScript',
      url: 'https://github.com/odmandakh/odmandakh-os'
    }
  ]
};
