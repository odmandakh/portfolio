import { ExperienceEntry } from '../types/portfolio';
import { getYearsOfExperience } from '../utils/date';

export const experienceData: ExperienceEntry[] = [
  {
    id: 'and-systems-ml-engineer',
    period: 'Sep 2024 — Apr 2026',
    role: 'Senior Machine Learning Engineer',
    company: 'AND Systems Tech LLC',
    location: 'Mongolia · Hybrid',
    type: 'Full-time',
    current: false,
    highlights: [
      'Implemented on-premise scoring service, ensuring secure integration within their private infrastructure and meeting strict data governance requirements.',
      'Developed a serverless scoring service, leveraging AWS Lambda and API Gateway to deliver scalable, cost-efficient ML inference with low-latency performance.'
    ],
    technologies: ['Python', 'Amazon Web Services (AWS)', 'Machine Learning', 'Credit Scoring']
  },
  {
    id: 'and-systems-backend-developer',
    period: 'Oct 2022 — Aug 2024',
    role: 'Senior Back End Developer',
    company: 'AND Systems Tech LLC',
    location: 'Mongolia · Hybrid',
    type: 'Full-time',
    current: false,
    highlights: [
      'Designed and implemented a workflow orchestration service using Netflix Conductor, enabling modular, fault-tolerant, and trackable service execution for core lending operations.',
      'Developed a web-based Niko AutoML platform, implementing backend systems for model training, scorecard configuration, and model deployment, empowering non-technical users to build and evaluate ML models.',
      "Developed a web-based data integration platform for Japan's dairy and livestock industry under the Beeco Program initiative."
    ],
    technologies: ['Microservices', 'Quarkus', 'Amazon Web Services (AWS)', 'Cloud Development']
  },
  {
    id: 'and-systems-software-engineer',
    period: 'Nov 2019 — Sep 2022',
    role: 'Software Engineer',
    company: 'AND Systems Tech LLC',
    location: 'Mongolia · Hybrid',
    type: 'Full-time',
    current: false,
    impactMetric: '500M-user scale app',
    highlights: [
      'Built a 500M-user scale built-in app for the LendMN ecosystem using React.js, focusing on modularity and responsiveness.',
      'Developed and maintained the admin panel for the LendMN lending site using the Symfony framework, including analytics, reporting, and user management features.',
      'Contributed to the migration from a monolithic architecture to a microservices-based system, improving scalability and deployment efficiency.',
      'Part of the core lending service team responsible for maintaining critical business logic and ensuring system stability and performance.'
    ],
    technologies: ['Symfony Framework', 'PHP', 'Microservices', 'Research Collaboration']
  },
  {
    id: 'mono-solution-web-developer',
    period: 'Jan 2019 — Nov 2019',
    role: 'Web Developer',
    company: 'Mono Solution',
    location: 'Ulan Bator, Mongolia',
    type: 'Full-time',
    current: false,
    highlights: [
      'Contributed to a national e-health platform project by implementing international healthcare data standards in Mongolia.',
      'Worked across the full stack using React.js and Node.js, focusing on component-based design, API integration, and scalable architecture.'
    ],
    technologies: ['Node.js', 'React.js', 'Git', 'Agile Project Management']
  },
  {
    id: 'qpon24-it-manager',
    period: 'Sep 2016 — Apr 2018',
    role: 'IT Manager',
    company: 'Qpon24',
    location: 'Mongolia',
    type: 'Part-time',
    current: false,
    highlights: [
      'Built a full-stack subscription-based coupon platform, Qpon24, to aggregate food and restaurant offers in one unified mobile/web experience.'
    ],
    technologies: ['Problem Solving', 'Start-ups', 'Project Management']
  }
];

export const experienceWidgetSummary = {
  totalYears: getYearsOfExperience(),
  currentTitle: experienceData[0].role,
  currentCompany: experienceData[0].company,
  progression: [
    { year: '2016', label: 'IT Manager' },
    { year: '2019', label: 'Web Developer' },
    { year: '2022', label: 'Senior Backend Dev' },
    { year: '2024', label: 'Senior ML Engineer' }
  ]
};
