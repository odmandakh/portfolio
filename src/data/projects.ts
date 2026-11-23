import { Project, ProjectFolder } from '../types/portfolio';

export const projectFolders: ProjectFolder[] = [
  { id: 'hobby', name: 'Hobby', description: 'Things built for fun and personal use' },
  { id: 'professional', name: 'Professional', description: 'Work drawn from professional experience' },
  { id: 'plan', name: 'Plan', description: 'Ideas lined up to build next' }
];

export const projectsData: Project[] = [
  {
    id: 'blobfish',
    title: 'blobfish',
    folder: 'plan',
    tag: 'Web Development',
    status: 'planned',
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
    folder: 'plan',
    tag: 'Backend Service',
    status: 'planned',
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
    folder: 'plan',
    tag: 'Web Development',
    status: 'planned',
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
    folder: 'plan',
    tag: 'Backend Service',
    status: 'planned',
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
    featured: true,
    date: 'Planned',
    metrics: 'Planned Multiplayer Game Room',
    folderColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  },
  {
    id: 'food-suggestion',
    title: 'food-suggestion',
    folder: 'plan',
    tag: 'Web Development',
    status: 'planned',
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
    folder: 'plan',
    tag: 'Backend Service',
    status: 'planned',
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
    folder: 'plan',
    tag: 'Data Science & ML',
    status: 'planned',
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
    folder: 'hobby',
    tag: 'Web Development',
    status: 'done',
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
    githubUrl: 'https://github.com/odmandakh/portfolio',
    featured: true,
    date: '2026-08',
    metrics: 'Interactive Web OS Portfolio',
    folderColor: 'bg-teal-500/20 text-teal-400 border-teal-500/30'
  },
  {
    id: 'ecommerce-meat-store',
    title: 'ecommerce-meat-store',
    folder: 'plan',
    tag: 'Web Development',
    status: 'planned',
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
    folder: 'plan',
    tag: 'Automation & Scraping',
    status: 'planned',
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
    featured: false,
    date: 'Planned',
    metrics: 'Planned Scraping & Arbitrage Bot',
    folderColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
  },
  {
    id: 'leetcode',
    title: 'leetcode',
    folder: 'hobby',
    tag: 'Algorithms & Data Structures',
    status: 'ongoing',
    shortDescription: 'Personal repository of LeetCode problem solutions.',
    fullDescription: 'A personal collection of LeetCode problem solutions, solved independently as ongoing algorithm and data structure practice, organized by problem with a shared local build setup.',
    technologies: ['C++', 'Shell', 'CMake'],
    problem: 'Wanted a structured, version-controlled way to practice algorithms and data structures consistently rather than losing solutions across the LeetCode editor.',
    solution: 'Maintain a personal repository of solved LeetCode problems, written in C++ and organized per problem, with shared Shell/CMake tooling for building and running solutions locally.',
    architecture: 'Individual solution files organized by problem, with a shared CMake build configuration and Shell scripts for compiling and running solutions locally.',
    keyLearnings: [
      'Consistent daily practice strengthens pattern recognition across algorithm categories.',
      'Writing solutions in C++ reinforces low-level performance and memory tradeoffs.'
    ],
    githubUrl: 'https://github.com/odmandakh/leetcode',
    featured: false,
    date: 'Ongoing',
    metrics: '117+ LeetCode Problems Solved',
    folderColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
  },
  {
    id: 'pause-please',
    title: 'pause-please',
    folder: 'hobby',
    tag: 'Web Development',
    status: 'done',
    shortDescription: 'Event booking, match scoring, and a leaderboard for a board game club.',
    fullDescription: 'A community platform for the Pause Please Club. Members book seats for Blood on the Clocktower nights on a 15-seat town square or spots at tabletop board-game events, staff score matches by role, and points feed a leaderboard with rank titles. The app is fully bilingual (English and Mongolian) with light and dark modes.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Firebase', 'Storybook'],
    problem: 'A tabletop game club needed a shared way to organize event sign-ups and track player progress across sessions instead of relying on scattered chat messages.',
    solution: 'Built a club platform for booking game nights, scoring matches with a role-based points table, and ranking players on a leaderboard, plus an admin panel for events, payments, members, and an audit log.',
    architecture: 'React and TypeScript single-page app built with Vite and Tailwind CSS, on Firebase: Firestore for data, Cloud Functions for server-side logic, Storage for uploads, and Hosting. Components are developed in Storybook with design tokens generated by Style Dictionary.',
    keyLearnings: [
      'Designing role-based match scoring and a leaderboard that stay fair across irregular attendance.',
      'Building an event booking flow simple enough for a casual weekly club to actually use.'
    ],
    demoUrl: 'https://pauseplease.club',
    featured: false,
    date: 'Phase 1 Released',
    metrics: 'Club Event & Leaderboard Platform',
    folderColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30'
  },
  {
    id: 'dotfiles',
    title: 'dotfiles',
    folder: 'hobby',
    tag: 'Developer Tooling',
    status: 'done',
    shortDescription: 'Personal ZSH shell configuration.',
    fullDescription: 'A personal dotfiles repository for ZSH configuration, covering aliases, prompt customization, and environment setup for a consistent terminal experience across machines.',
    technologies: ['Shell', 'Zsh'],
    problem: 'Wanted a consistent, version-controlled terminal environment instead of manually reconfiguring shell settings on every new machine.',
    solution: 'Maintain a personal dotfiles repository for ZSH configuration, keeping shell setup portable and easy to restore.',
    architecture: 'Shell scripts and ZSH configuration files, version-controlled and portable across machines.',
    keyLearnings: [
      'Structuring shell configuration for easy syncing across multiple machines.',
      'Keeping a personal dev environment reproducible and version-controlled.'
    ],
    featured: false,
    date: 'Maintained',
    metrics: 'Personal ZSH Configuration',
    folderColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30'
  },
  {
    id: 'credit-scorecard-builder',
    title: 'credit-scorecard-builder',
    folder: 'professional',
    tag: 'Data Science & ML',
    status: 'done',
    shortDescription: 'No-code tool for building rule-based credit scorecards, from the AND Solutions ML team.',
    fullDescription: 'Credit Scorecard Builder from AND Solutions lets lenders and other businesses design rule-based scorecards without developers. It connects through APIs or bulk data uploads and supports team roles, A/B testing and version control. I worked on it as part of the AND ML team.',
    technologies: ['Python', 'AWS', 'Machine Learning', 'Credit Scoring'],
    problem: 'Lenders wanted to design and adjust their own scoring rules instead of waiting on developers for every change.',
    solution: 'Worked in the ML team behind the product on the scoring services that run scorecards, both serverless in the cloud and on-premise for clients with strict data rules.',
    architecture: 'Scoring served through AWS Lambda and API Gateway, with an on-premise deployment option for clients that keep data in their own infrastructure.',
    keyLearnings: [
      'Serving ML scoring with low latency while keeping costs tied to actual usage.',
      'Meeting strict data governance requirements when running inside a client’s own infrastructure.'
    ],
    demoUrl: 'https://andsolutions.net/credit-scorecard-builder',
    featured: false,
    date: 'Sep 2024 — Apr 2026'
  },
  {
    id: 'niko-scoring',
    title: 'niko-scoring',
    folder: 'professional',
    tag: 'Data Science & ML',
    status: 'done',
    shortDescription: 'AutoML platform for building, evaluating and deploying scoring models without code.',
    fullDescription: 'Niko is a web-based AutoML platform that lets non-technical users build and evaluate machine learning models. As a senior backend developer at AND Systems, I built its backend for model training, scorecard configuration and model deployment.',
    technologies: ['Quarkus', 'Python', 'AWS', 'Machine Learning'],
    problem: 'Credit teams needed scoring models but depended on data scientists to build and ship every one.',
    solution: 'Built the backend that runs model training, stores scorecard configurations and deploys models, so users can do all of it from the web app.',
    architecture: 'Web app backed by services for model training, scorecard configuration and deployment.',
    keyLearnings: [
      'Turning an ML workflow into product features that non-technical users can trust.',
      'Designing APIs around long-running jobs such as model training.'
    ],
    demoUrl: 'https://app.nikoscoring.ai',
    featured: false,
    date: 'Oct 2022 — Aug 2024'
  },
  {
    id: 'beeco-program',
    title: 'beeco-program',
    folder: 'professional',
    tag: 'Backend Service',
    status: 'done',
    shortDescription: 'Data integration platform for Japan’s dairy and livestock industry.',
    fullDescription: 'BeecoProgram is a data integration platform for Japan’s dairy and livestock industry. I worked on it as a senior backend developer at AND Systems.',
    technologies: ['Quarkus', 'Microservices', 'AWS'],
    problem: 'Data from different sources across the dairy and livestock industry needed to come together in one platform.',
    solution: 'Built backend services that bring this data into one consistent model for the platform to use.',
    architecture: 'Microservices backend on AWS behind the web platform.',
    keyLearnings: [
      'Modelling data from many sources into one consistent shape.',
      'Building for an industry and market with its own domain rules and expectations.'
    ],
    demoUrl: 'https://beeco.eco/services/beecoprogram',
    featured: false,
    date: 'Oct 2022 — Aug 2024'
  },
  {
    id: 'lendmn',
    title: 'lendmn',
    folder: 'professional',
    tag: 'Backend Service',
    status: 'done',
    shortDescription: 'Consumer lending and investment platform: core lending service, user points and levels, and the admin panel.',
    fullDescription: 'LendMN is a consumer lending and investment platform from LendMN NBFI, with loan products, a loan calculator, mobile apps and an investor section. As part of the core lending team at AND Systems, I worked on the lending service, the user points and user levels system, and the admin panel.',
    technologies: ['PHP', 'Symfony', 'React', 'Microservices'],
    problem: 'A growing lending business needed its core loan logic to stay reliable while new features shipped, and its staff needed one place to run daily operations.',
    solution: 'Maintained business logic in the core lending service, built the user points and user levels system, and developed the Symfony admin panel with analytics, reporting and user management.',
    architecture: 'Core lending service within a platform moving from a monolith to microservices, with a Symfony admin panel for staff.',
    keyLearnings: [
      'Changing critical lending logic safely in a system that handles real money.',
      'Moving from a monolith to microservices without pausing the business.'
    ],
    demoUrl: 'https://lend.mn',
    featured: false,
    date: 'Nov 2019 — Sep 2022'
  },
  {
    id: 'liver-center',
    title: 'liver-center',
    folder: 'professional',
    tag: 'Web Development',
    status: 'done',
    shortDescription: 'Web application for the Liver Center, built at Mono Solution.',
    fullDescription: 'A web application for the Liver Center, built with the Mono Solution team. I worked across the full stack with React and Node.js.',
    technologies: ['React', 'Node.js'],
    problem: 'The Liver Center needed its own web application.',
    solution: 'Worked across the full stack, building React components and integrating them with Node.js APIs.',
    architecture: 'React frontend with a Node.js backend.',
    keyLearnings: [
      'Building software for healthcare, where correctness and privacy come first.',
      'Component-based design and API integration across a full stack.'
    ],
    demoUrl: 'https://app.livercenter.mn',
    featured: false,
    date: 'Jan 2019 — Nov 2019'
  }
];
