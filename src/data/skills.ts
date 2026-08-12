import { SkillNode, SkillCategory } from '../types/portfolio';

export const skillCategories: SkillCategory[] = [
  { id: 'Languages', name: 'Languages', description: 'Core programming languages for web, systems, & backend', color: '#3b82f6' },
  { id: 'Frontend', name: 'Frontend Architecture', description: 'Modern UI frameworks, performance, & client state', color: '#10b981' },
  { id: 'Backend & Cloud', name: 'Backend & Cloud Services', description: 'APIs, microservices, databases, & serverless', color: '#8b5cf6' },
  { id: 'DevOps & Infra', name: 'DevOps & Infrastructure', description: 'Containers, orchestration, CI/CD, & observability', color: '#f59e0b' },
  { id: 'AI & Systems', name: 'AI & Core Systems', description: 'LLM integrations, event streaming, & low-level performance', color: '#ec4899' },
];

export const skillNodes: SkillNode[] = [
  // Languages
  {
    id: 'typescript',
    label: 'TypeScript',
    category: 'Languages',
    level: 'Expert',
    years: '6 yrs',
    description: 'Strict type safety, generic utility patterns, AST transformers, and full-stack enterprise development.',
    iconName: 'Code2',
    relatedSkillIds: ['react', 'nodejs', 'express', 'nextjs'],
    projectIds: ['nexus-cloud-dashboard', 'odmandakh-os', 'aura-synth-ui']
  },
  {
    id: 'golang',
    label: 'Go (Golang)',
    category: 'Languages',
    level: 'Expert',
    years: '5 yrs',
    description: 'High-concurrency microservices, gRPC streaming, channel concurrency, and low-latency network servers.',
    iconName: 'Terminal',
    relatedSkillIds: ['grpc', 'docker', 'redis', 'kubernetes'],
    projectIds: ['aegis-engine']
  },
  {
    id: 'python',
    label: 'Python',
    category: 'Languages',
    level: 'Proficient',
    years: '4 yrs',
    description: 'Async FastAPIs, data processing pipelines, AI/LLM SDK integrations, and machine learning scripts.',
    iconName: 'FileCode',
    relatedSkillIds: ['fastapi', 'gemini-api', 'pytorch', 'postgresql'],
    projectIds: ['lumina-vision-ai']
  },
  {
    id: 'rust',
    label: 'Rust',
    category: 'Languages',
    level: 'Proficient',
    years: '2 yrs',
    description: 'Memory safety, Tokio async, Clap CLI interfaces, and systems utilities.',
    iconName: 'Cpu',
    relatedSkillIds: ['kubernetes', 'docker'],
    projectIds: ['kubeflow-canary-cli']
  },

  // Frontend
  {
    id: 'react',
    label: 'React 19',
    category: 'Frontend',
    level: 'Expert',
    years: '6 yrs',
    description: 'Component architecture, custom hooks, Server/Client components, dynamic state, and virtual rendering.',
    iconName: 'Atom',
    relatedSkillIds: ['typescript', 'tailwind', 'motion', 'nextjs'],
    projectIds: ['nexus-cloud-dashboard', 'odmandakh-os', 'aura-synth-ui']
  },
  {
    id: 'tailwind',
    label: 'Tailwind CSS',
    category: 'Frontend',
    level: 'Expert',
    years: '5 yrs',
    description: 'Utility-first design systems, modern CSS grid/flex layouts, dark mode optimization, and micro-interactions.',
    iconName: 'Palette',
    relatedSkillIds: ['react', 'motion'],
    projectIds: ['nexus-cloud-dashboard', 'odmandakh-os', 'aura-synth-ui']
  },
  {
    id: 'motion',
    label: 'Framer / Motion',
    category: 'Frontend',
    level: 'Expert',
    years: '4 yrs',
    description: 'Declarative layout transitions, gesture physics, spring physics, and desktop window animation dynamics.',
    iconName: 'Sparkles',
    relatedSkillIds: ['react', 'tailwind'],
    projectIds: ['odmandakh-os']
  },

  // Backend & Cloud
  {
    id: 'nodejs',
    label: 'Node.js',
    category: 'Backend & Cloud',
    level: 'Expert',
    years: '6 yrs',
    description: 'Event loop tuning, async I/O streams, Express middleware architecture, and REST/GraphQL APIs.',
    iconName: 'Server',
    relatedSkillIds: ['typescript', 'express', 'postgresql', 'redis'],
    projectIds: ['nexus-cloud-dashboard', 'odmandakh-os']
  },
  {
    id: 'express',
    label: 'Express',
    category: 'Backend & Cloud',
    level: 'Expert',
    years: '6 yrs',
    description: 'HTTP request routing, security headers, rate limiting, and full-stack Vite server integration.',
    iconName: 'Layers',
    relatedSkillIds: ['nodejs', 'typescript'],
    projectIds: ['nexus-cloud-dashboard', 'odmandakh-os']
  },
  {
    id: 'postgresql',
    label: 'PostgreSQL',
    category: 'Backend & Cloud',
    level: 'Expert',
    years: '5 yrs',
    description: 'Relational schema design, index optimization, JSONB querying, transactions, and migration strategies.',
    iconName: 'Database',
    relatedSkillIds: ['nodejs', 'golang', 'python'],
    projectIds: ['lumina-vision-ai']
  },
  {
    id: 'redis',
    label: 'Redis',
    category: 'Backend & Cloud',
    level: 'Expert',
    years: '5 yrs',
    description: 'In-memory caching, Pub/Sub channels, distributed locking, and rate limiting counters.',
    iconName: 'Zap',
    relatedSkillIds: ['golang', 'nodejs'],
    projectIds: ['aegis-engine']
  },

  // DevOps & Infra
  {
    id: 'docker',
    label: 'Docker',
    category: 'DevOps & Infra',
    level: 'Expert',
    years: '6 yrs',
    description: 'Multi-stage container builds, image size optimization, layer caching, and Compose orchestration.',
    iconName: 'Box',
    relatedSkillIds: ['kubernetes', 'golang'],
    projectIds: ['aegis-engine', 'lumina-vision-ai', 'kubeflow-canary-cli']
  },
  {
    id: 'kubernetes',
    label: 'Kubernetes',
    category: 'DevOps & Infra',
    level: 'Proficient',
    years: '4 yrs',
    description: 'Container orchestration, deployment manifests, ingress controllers, canary traffic routing, and Helm.',
    iconName: 'Network',
    relatedSkillIds: ['docker', 'rust', 'golang'],
    projectIds: ['nexus-cloud-dashboard', 'kubeflow-canary-cli']
  },

  // AI & Systems
  {
    id: 'gemini-api',
    label: 'Gemini AI API',
    category: 'AI & Systems',
    level: 'Proficient',
    years: '2 yrs',
    description: 'Multimodal vision parsing, structured JSON schema generation, function calling, and streaming completions.',
    iconName: 'Bot',
    relatedSkillIds: ['python', 'typescript'],
    projectIds: ['lumina-vision-ai']
  },
  {
    id: 'grpc',
    label: 'gRPC & Protobuf',
    category: 'AI & Systems',
    level: 'Expert',
    years: '4 yrs',
    description: 'Binary protocol buffers, streaming RPCs, client generation, and inter-microservice communication.',
    iconName: 'Radio',
    relatedSkillIds: ['golang'],
    projectIds: ['aegis-engine']
  }
];
