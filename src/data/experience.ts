import { ExperienceEntry } from '../types/portfolio';

export const experienceData: ExperienceEntry[] = [
  {
    id: 'exp-1',
    period: '2024 — Present',
    role: 'Staff Software Architect',
    company: 'Apex Cloud Systems',
    location: 'Remote / Ulaanbaatar',
    type: 'Full-time',
    current: true,
    impactMetric: '3.2M Daily Active Users',
    highlights: [
      'Architected event-driven microservice message queues handling 80k+ req/sec using Go and gRPC.',
      'Led migration of monolithic backend services to multi-region Kubernetes clusters with zero-downtime canary deployments.',
      'Mentored team of 12 full-stack engineers and established strict CI/CD quality gates, reducing regression bugs by 40%.'
    ],
    technologies: ['Go', 'TypeScript', 'React', 'Kubernetes', 'Redis', 'gRPC', 'AWS']
  },
  {
    id: 'exp-2',
    period: '2022 — 2024',
    role: 'Senior Full-Stack Engineer',
    company: 'Nexus Tech Global',
    location: 'Ulaanbaatar, Mongolia',
    type: 'Full-time',
    current: false,
    impactMetric: '45% Faster Page Load Speed',
    highlights: [
      'Built multi-tenant cloud monitoring dashboard frontend using React 19, TypeScript, and D3 canvas graphs.',
      'Designed real-time WebSocket telemetry ingestion server in Node.js & Express, serving 10,000 live metrics streams.',
      'Spearheaded performance optimization campaign, improving p95 rendering speeds from 2.4s to 450ms.'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'D3.js', 'PostgreSQL', 'Docker']
  },
  {
    id: 'exp-3',
    period: '2021 — 2022',
    role: 'Backend & Systems Engineer',
    company: 'Steppe Digital Solutions',
    location: 'Ulaanbaatar, Mongolia',
    type: 'Full-time',
    current: false,
    impactMetric: '99.99% Service Availability',
    highlights: [
      'Developed core financial transaction API pipelines processing over $12M monthly volume with atomic Postgres locks.',
      'Implemented automated document parsing pipeline using Python FastAPI and vision models.',
      'Configured Docker multi-stage container builds and automated Terraform IaC deployment pipelines.'
    ],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Terraform', 'Redis']
  },
  {
    id: 'exp-4',
    period: '2020 — 2021',
    role: 'Frontend Developer',
    company: 'Nomad Interactive',
    location: 'Ulaanbaatar, Mongolia',
    type: 'Full-time',
    current: false,
    impactMetric: '150k App Downloads',
    highlights: [
      'Created responsive web applications and component libraries adhering to WCAG AA accessibility standards.',
      'Integrated RESTful APIs, optimized asset loading, and built mobile-first web user interfaces.'
    ],
    technologies: ['JavaScript', 'React', 'Tailwind CSS', 'REST APIs', 'Git']
  }
];

export const experienceWidgetSummary = {
  totalYears: 6,
  currentTitle: 'Staff Software Architect',
  currentCompany: 'Apex Cloud Systems',
  progression: [
    { year: '2020', label: 'Frontend Dev' },
    { year: '2021', label: 'Backend Eng' },
    { year: '2022', label: 'Senior Full-Stack' },
    { year: '2024+', label: 'Staff Architect' }
  ]
};
