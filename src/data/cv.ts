export interface ResumeData {
  fullName: string;
  title: string;
  email: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  summary: string;
  experience: {
    role: string;
    company: string;
    period: string;
    location: string;
    bullets: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    period: string;
    honors: string;
  }[];
  coreSkills: {
    category: string;
    items: string[];
  }[];
  certifications: string[];
}

export const resumeData: ResumeData = {
  fullName: 'Odmandakh',
  title: 'Senior Full-Stack & Systems Engineer',
  email: 'b.odmandah@gmail.com',
  location: 'Ulaanbaatar, Mongolia (Open to Remote)',
  website: 'https://odmandakh.dev',
  github: 'github.com/odmandakh',
  linkedin: 'linkedin.com/in/odmandakh-battulga',
  summary: 'Senior Software Engineer with 6+ years of expertise in high-concurrency event-driven systems, distributed web architectures, and cloud infrastructure. Track record of architecting sub-millisecond Go microservices, multi-region Kubernetes clusters, and responsive React web platforms.',
  experience: [
    {
      role: 'Staff Software Architect',
      company: 'Apex Cloud Systems',
      period: '2024 — Present',
      location: 'Remote',
      bullets: [
        'Architected high-throughput event streaming engine handling 80,000+ req/sec using Go, Redis, and gRPC with sub-millisecond p99 latencies.',
        'Led migration of legacy monolithic backend services to multi-region Kubernetes clusters using automated canary deployment rollouts.',
        'Mentored engineering team of 12 and instituted automated linting, type-checking, and integration test pipelines.'
      ]
    },
    {
      role: 'Senior Full-Stack Engineer',
      company: 'Nexus Tech Global',
      period: '2022 — 2024',
      location: 'Ulaanbaatar, Mongolia',
      bullets: [
        'Built real-time multi-cloud observability portal in React, TypeScript, and D3 canvas graphs, lowering incident MTTR by 45%.',
        'Engineered high-concurrency WebSocket telemetry aggregation server serving 10,000 live metrics channels in Express & Node.js.',
        'Optimized client bundle sizes and memory footprint, reducing web app load times by 81%.'
      ]
    },
    {
      role: 'Backend & Systems Engineer',
      company: 'Steppe Digital Solutions',
      period: '2021 — 2022',
      location: 'Ulaanbaatar, Mongolia',
      bullets: [
        'Developed transaction processing pipelines in Python FastAPI and PostgreSQL handling $12M+ monthly transaction volumes.',
        'Created automated OCR & document processing pipeline utilizing multimodal AI vision models.'
      ]
    }
  ],
  education: [
    {
      degree: 'B.S. in Computer Science & Software Engineering',
      institution: 'National University of Mongolia',
      period: '2016 — 2020',
      honors: 'First Class Honors (GPA 3.82/4.00)'
    }
  ],
  coreSkills: [
    { category: 'Languages', items: ['TypeScript', 'Go', 'Python', 'Rust', 'SQL'] },
    { category: 'Frontend', items: ['React 19', 'Next.js', 'Tailwind CSS', 'Motion', 'Canvas API'] },
    { category: 'Backend & Cloud', items: ['Node.js', 'Express', 'FastAPI', 'gRPC', 'PostgreSQL', 'Redis'] },
    { category: 'DevOps & Tools', items: ['Docker', 'Kubernetes', 'AWS', 'Google Cloud', 'Terraform', 'Git'] }
  ],
  certifications: [
    'AWS Certified Solutions Architect – Associate (2025)',
    'Certified Kubernetes Administrator - CKA (2025)',
    'Meta Senior Frontend Developer Specialization (2024)',
    'Google Cloud Professional Cloud Developer (2024)'
  ]
};
