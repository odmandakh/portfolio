import { Project } from '../types/portfolio';

export const projectsData: Project[] = [
  {
    id: 'blobfish',
    title: 'blobfish',
    category: 'Personal Project',
    tag: 'Web Development',
    shortDescription: 'Online marketplace to sell items for pets and sell pets.',
    fullDescription: 'A specialized online marketplace designed for pet lovers and breeders. Features pet listing verifications, pet supply e-commerce cataloging, adoption management, and secure buyer-seller transactions.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    problem: 'Finding verified pets for adoption and authentic pet supplies is fragmented across unmoderated social media groups.',
    solution: 'Building a dedicated pet marketplace platform with structured seller verification, product cataloging, and automated search filters for pet care needs.',
    architecture: 'React Frontend -> Express REST API -> PostgreSQL Database -> Cloud Object Storage for Pet & Item Media.',
    keyLearnings: [
      'Multi-vendor catalog management and transaction workflow architecture.',
      'Integrating location-based search filtering for nearby pet adoption listings.'
    ],
    featured: true,
    date: 'Planned',
    metrics: 'Planned Pet Marketplace Platform',
    folderColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
  },
  {
    id: 'happy-pig',
    title: 'happy-pig',
    category: 'Personal Project',
    tag: 'Backend Service',
    shortDescription: 'Analytics tool for pig farming operations.',
    fullDescription: 'A specialized agricultural analytics platform for livestock management. Tracks pig farm metrics including herd growth, feed efficiency ratios, vaccination schedules, and yield forecasts.',
    technologies: ['TypeScript', 'React', 'Python', 'FastAPI', 'Chart.js', 'Tailwind CSS'],
    problem: 'Pig farm management relies heavily on manual paper logs or complex spreadsheets, leading to untracked feed waste and mortality rates.',
    solution: 'Developing an intuitive visual dashboard with predictive analytics for feed optimization, health alerts, and batch weight tracking.',
    architecture: 'React Visual Dashboard -> FastAPI Analytics Engine -> Time-Series Metrics Store -> Predictive Yield Models.',
    keyLearnings: [
      'Domain-specific agricultural telemetry and data modeling.',
      'Visualizing complex growth curves and feed consumption ratios.'
    ],
    featured: true,
    date: 'Planned',
    metrics: 'Planned Farm Analytics Platform',
    folderColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30'
  },
  {
    id: 'todo-orientation',
    title: 'todo-orientation',
    category: 'Personal Project',
    tag: 'Web Development',
    shortDescription: 'Company orientation and employee onboarding task board.',
    fullDescription: 'A structured employee onboarding task management system. Helps HR teams and managers map out newcomer orientation milestones, mandatory training checklists, and team introduction workflows.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Express', 'Drizzle ORM'],
    problem: 'New hires often feel overwhelmed by unorganized onboarding documentation and scattered messaging channels.',
    solution: 'Crafted an interactive orientation task board with progress tracking, milestone badges, and automated mentor check-ins.',
    architecture: 'React Client -> Express API -> SQLite/Postgres DB -> Automated Notification Hooks.',
    keyLearnings: [
      'Kanban task state management with drag-and-drop interactions.',
      'Designing clear progress indicators for multi-stage onboarding.'
    ],
    featured: true,
    date: 'Planned',
    metrics: 'Planned Orientation Task Board',
    folderColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  },
  {
    id: 'huzur-diy',
    title: 'huzur-diy',
    category: 'Personal Project',
    tag: 'Backend Service',
    shortDescription: 'Online card games platform to play among friends.',
    fullDescription: 'A real-time multiplayer web application for playing traditional and custom card games with friends. Supports custom room creation, private lobbies, interactive card physics, and in-game chat.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Socket.IO', 'Motion', 'Tailwind CSS'],
    problem: 'Friends separated geographically lack lightweight, ad-free web platforms to play custom card games together.',
    solution: 'Creating a web-first real-time card room engine powered by WebSockets, custom deck rule configurations, and fluid card physics.',
    architecture: 'React Frontend -> WebSocket Game Server -> Authoritative Game State Engine -> In-Memory Room Manager.',
    keyLearnings: [
      'Synchronizing multi-player game state with minimal latency.',
      'Handling smooth card deal and flip animations using Motion.'
    ],
    githubUrl: 'https://github.com/odmandakh/huzur-diy',
    featured: true,
    date: 'Planned',
    metrics: 'Planned Multiplayer Game Room',
    folderColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  },
  {
    id: 'food-suggestion',
    title: 'food-suggestion',
    category: 'Personal Project',
    tag: 'Web Development',
    shortDescription: 'Food recommendation and dish testing platform (Foober for test).',
    fullDescription: 'An intelligent food selection and dish testing service ("Foober for test"). Helps users choose what to eat based on mood, dietary preferences, local restaurant menus, and crowd-sourced taste tests.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Google Maps API'],
    problem: 'Indecision when selecting daily meals leads to repetitive food choices and order fatigue.',
    solution: 'Engineered a decision-tree food suggestion algorithm with mood-based filters, taste profile matching, and menu discovery.',
    architecture: 'React Single-Page App -> Recommendation API Gateway -> Restaurant & Dish Dataset -> Location Services.',
    keyLearnings: [
      'Algorithmic decision tree logic for personalized food discovery.',
      'Integrating interactive location maps for dining recommendations.'
    ],
    featured: false,
    date: 'Planned',
    metrics: 'Planned Food Recommendation App',
    folderColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
  },
  {
    id: 'fhir-something',
    title: 'fhir-something',
    category: 'Personal Project',
    tag: 'Backend Service',
    shortDescription: 'Healthcare data application using HL7 FHIR standards.',
    fullDescription: 'A digital health application leveraging learned HL7 FHIR (Fast Healthcare Interoperability Resources) medical data specifications for patient record access, health interoperability, and clinical data visualization.',
    technologies: ['TypeScript', 'Node.js', 'FHIR API', 'OAuth2', 'React', 'Tailwind CSS'],
    problem: 'Medical health data remains isolated in proprietary hospital systems, making record transfers complex.',
    solution: 'Developing a FHIR-compliant medical data portal that aggregates patient records, medication history, and diagnostic metrics using standardized JSON schemas.',
    architecture: 'React UI -> SMART-on-FHIR Gateway -> Standardized FHIR API Endpoint -> Secure Medical Schema Parser.',
    keyLearnings: [
      'Practical implementation of HL7 FHIR R4 medical data specifications.',
      'Secure OAuth2 authorization flows for sensitive medical records.'
    ],
    featured: false,
    date: 'Planned',
    metrics: 'Planned Healthcare FHIR Application',
    folderColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
  },
  {
    id: 'snooker-shot',
    title: 'snooker-shot',
    category: 'Personal Project',
    tag: 'Data Science & ML',
    shortDescription: 'Billiards & snooker shot advisor using image analysis.',
    fullDescription: 'An image-based shot recommendation tool for billiards and snooker. Players upload a photo of the table layout, and the app detects ball positions, calculates collision angles, and highlights the optimal shot trajectory.',
    technologies: ['Python', 'OpenCV', 'React', 'TypeScript', 'Tailwind CSS', 'HTML5 Canvas'],
    problem: 'Beginner snooker players struggle to visualize complex geometric bank shots, safety angles, and cue ball deflection paths.',
    solution: 'Building a computer vision pipeline that isolates table geometry, identifies ball coordinates, and draws recommended vector paths on an interactive canvas overlay.',
    architecture: 'Photo Upload -> OpenCV Table Analysis & Ball Detection -> Geometry Angle Solver -> Interactive Canvas Overlay Rendering.',
    keyLearnings: [
      'Computer vision image processing for object detection on pool tables.',
      'Vector physics calculations for ball collision trajectories.'
    ],
    featured: false,
    date: 'Planned',
    metrics: 'Planned Snooker Shot Advisor',
    folderColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  },
  {
    id: 'odmandakh-os',
    title: 'odmandakh-os',
    category: 'Personal Project',
    tag: 'Web Development',
    shortDescription: 'Desktop-inspired interactive portfolio experience built with React & Motion.',
    fullDescription: 'An interactive macOS-inspired desktop portfolio operating system. Features window management, live widget integrations (GitHub & LeetCode), dynamic view navigation, and Solarized Dark styling.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Motion'],
    problem: 'Standard linear resume websites feel repetitive and fail to showcase frontend architectural craftsmanship.',
    solution: 'Designed an interactive desktop experience featuring Finder-style windows, real-time widget data, and clean Solarized styling.',
    architecture: 'React 19 -> Motion Layout Transitions -> Standardized Data Registries -> Responsive Reflow Engine.',
    keyLearnings: [
      'Separation of layout system and component state enables seamless window management.',
      'Solarized Dark theme implementation across window canvases.'
    ],
    demoUrl: 'https://odmandakh.dev',
    githubUrl: 'https://github.com/Odmandakh/portfolio',
    featured: true,
    date: '2026-08',
    metrics: 'Interactive Web OS Portfolio',
    folderColor: 'bg-teal-500/20 text-teal-400 border-teal-500/30'
  },
  {
    id: 'ecommerce-meat-store',
    title: 'ecommerce-meat-store',
    category: 'Personal Project',
    tag: 'Web Development',
    shortDescription: 'Online meat store e-commerce platform with cold-chain delivery options.',
    fullDescription: 'A specialized e-commerce web platform for fresh meat products and butcher cuts. Features cut selection, custom weight ordering, cold-chain delivery scheduling, and butcher subscription boxes.',
    technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Stripe', 'PostgreSQL'],
    problem: 'Purchasing fresh quality meat online requires precise weight options, cold packaging guarantees, and clear cut descriptions.',
    solution: 'Developing a tailored butcher store front-end with variable weight pricing, freshness guarantees, and recurring meat delivery subscriptions.',
    architecture: 'Next.js Frontend -> Serverless API Routes -> PostgreSQL DB -> Stripe Checkout & Cold-Chain Logistics Webhooks.',
    keyLearnings: [
      'Variable weight price calculations for fresh food e-commerce.',
      'Subscription model billing and inventory synchronization.'
    ],
    featured: false,
    date: 'Planned',
    metrics: 'Planned E-Commerce Store',
    folderColor: 'bg-red-500/20 text-red-400 border-red-500/30'
  },
  {
    id: 'buff_hunter',
    title: 'buff_hunter',
    category: 'Personal Project',
    tag: 'Automation & Scraping',
    shortDescription: 'Web scraper and bargain detector for buff.163.com and Lann market.',
    fullDescription: 'An automated web scraping and arbitrage discovery bot. Scrapes digital goods and gaming market listings from buff.163.com and Lann market to highlight hidden price deals, float discounts, and mispriced items.',
    technologies: ['Python', 'Playwright', 'Node.js', 'TypeScript', 'React', 'MongoDB'],
    problem: 'Manual searching for underpriced gaming items across foreign virtual markets takes hours of constant refreshing.',
    solution: 'Created an automated scraping pipeline with real-time price comparison triggers, discount alerts, and price history graphs.',
    architecture: 'Headless Scraper Workers -> Data Normalization Pipeline -> MongoDB Price Store -> React Alert Dashboard.',
    keyLearnings: [
      'Handling rate limits and anti-scraping measures on foreign marketplaces.',
      'Real-time price arbitrage algorithms and alert triggers.'
    ],
    githubUrl: 'https://github.com/odmandakh/buff_hunter',
    featured: false,
    date: 'Planned',
    metrics: 'Planned Scraping & Arbitrage Bot',
    folderColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
  }
];
