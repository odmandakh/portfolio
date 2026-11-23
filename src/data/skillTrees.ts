import { SkillTree } from '../types/portfolio';

// Odmandakh's skill trees. Each tree's trunk is a list of branches (skill areas, in the order
// they were picked up); each branch carries the specific skills under it.
// status: done = used in real work, learning = actively studying, planned = next up.

export const skillTrees: SkillTree[] = [
  {
    slug: 'backend',
    title: 'Backend',
    description: 'Server-side engineering: services, data, APIs and the infrastructure they run on.',
    branches: [
      {
        id: 'be-languages',
        label: 'Languages',
        status: 'done',
        description: 'The languages behind the backend work, picked per job rather than out of loyalty.',
        skills: [
          { id: 'be-java', label: 'Java', status: 'done', description: 'Primary backend language for typed, long-lived services.', usedIn: 'Quarkus microservices at AND Systems' },
          { id: 'be-php', label: 'PHP', status: 'done', description: 'Modern PHP with Composer and namespaces for web backends.', usedIn: 'LendMN admin panel at AND Systems; SymfonyCasts certificates' },
          { id: 'be-python', label: 'Python', status: 'done', description: 'Scripting, data work and ML services.', usedIn: 'Credit scoring services at AND Systems' },
          { id: 'be-typescript', label: 'JavaScript / TypeScript', status: 'done', description: 'Node.js services and the frontends that talk to them.', usedIn: 'Mono Solution e-health platform; pause-please; this site' },
          { id: 'be-go', label: 'Go', status: 'done', description: 'Small, fast services and command-line tools.' },
          { id: 'be-cpp', label: 'C++', status: 'done', description: 'Algorithms and data structures under tight time limits.', usedIn: 'LeetCode practice repository' },
          { id: 'be-rust', label: 'Rust', status: 'planned', description: 'Systems programming with memory safety, for performance-critical services.' }
        ]
      },
      {
        id: 'be-frameworks',
        label: 'Frameworks',
        status: 'done',
        description: 'Frameworks for building services quickly without giving up structure.',
        skills: [
          { id: 'be-quarkus', label: 'Quarkus', status: 'done', description: 'Cloud-native Java with fast startup, a good fit for containers and serverless.', usedIn: 'Lending microservices at AND Systems' },
          { id: 'be-spring', label: 'Spring Boot', status: 'done', description: 'The standard toolkit for Java web services.' },
          { id: 'be-symfony', label: 'Symfony', status: 'done', description: 'Full-featured PHP framework with strong conventions.', usedIn: 'LendMN admin panel: analytics, reporting, user management' },
          { id: 'be-api-platform', label: 'API Platform', status: 'done', description: 'REST and GraphQL APIs generated on top of Symfony.', usedIn: 'SymfonyCasts API Platform certificate' },
          { id: 'be-node', label: 'Node.js', status: 'done', description: 'JavaScript on the server for APIs and tooling.', usedIn: 'Mono Solution e-health platform' }
        ]
      },
      {
        id: 'be-data',
        label: 'Data & Storage',
        status: 'done',
        description: 'Choosing where data lives and keeping it correct under load.',
        skills: [
          { id: 'be-postgres', label: 'PostgreSQL', status: 'done', description: 'Relational modelling, indexing and transactions.' },
          { id: 'be-redis', label: 'Redis', status: 'done', description: 'Caching and short-lived shared state between services.' },
          { id: 'be-firestore', label: 'Firestore', status: 'done', description: 'Document database with security rules and real-time updates.', usedIn: 'pause-please bookings, scores and leaderboard' },
          { id: 'be-data-integration', label: 'Data integration', status: 'done', description: 'Pulling data from many sources into one consistent model.', usedIn: 'Beeco Program platform for Japan’s dairy and livestock industry' }
        ]
      },
      {
        id: 'be-apis',
        label: 'APIs',
        status: 'done',
        description: 'Contracts between services and their clients.',
        skills: [
          { id: 'be-rest', label: 'REST', status: 'done', description: 'Resource-oriented HTTP APIs with clear status codes and versioning.' },
          { id: 'be-grpc', label: 'gRPC', status: 'done', description: 'Typed, fast service-to-service calls with Protocol Buffers.' },
          { id: 'be-auth', label: 'Authentication', status: 'done', description: 'Sessions, tokens and OAuth flows, with roles on top.', usedIn: 'Role-based staff and admin access in pause-please' }
        ]
      },
      {
        id: 'be-workflows',
        label: 'Workflows & Messaging',
        status: 'done',
        description: 'Coordinating long-running, multi-step work across services.',
        skills: [
          { id: 'be-conductor', label: 'Netflix Conductor', status: 'done', description: 'Workflow orchestration with retries, timeouts and a visible execution history.', usedIn: 'Core lending operations at AND Systems' },
          { id: 'be-functions', label: 'Cloud Functions', status: 'done', description: 'Event-driven server code that runs on demand.', usedIn: 'pause-please server-side logic on Firebase' },
          { id: 'be-kafka', label: 'Kafka', status: 'planned', description: 'Durable event streams for decoupled, replayable messaging.' }
        ]
      },
      {
        id: 'be-cloud',
        label: 'Cloud & Delivery',
        status: 'done',
        description: 'Getting code from a laptop to production and keeping it there.',
        skills: [
          { id: 'be-lambda', label: 'AWS Lambda & API Gateway', status: 'done', description: 'Serverless endpoints that scale to zero and bill per request.', usedIn: 'Serverless ML scoring service at AND Systems' },
          { id: 'be-docker', label: 'Docker', status: 'done', description: 'Reproducible builds and environments in containers.' },
          { id: 'be-kubernetes', label: 'Kubernetes', status: 'done', description: 'Running and scaling containers across a cluster.' },
          { id: 'be-ci', label: 'CI/CD', status: 'done', description: 'Automated builds, checks and deploys on every push.', usedIn: 'GitHub Actions deploy and release pipeline for this site' }
        ]
      },
      {
        id: 'be-testing',
        label: 'Testing',
        status: 'done',
        description: 'Catching mistakes before users do.',
        skills: [
          { id: 'be-unit-tests', label: 'Unit & integration tests', status: 'done', description: 'Fast checks for logic, slower ones for the pieces working together.' },
          { id: 'be-emulators', label: 'Testing against emulators', status: 'done', description: 'Running tests against local copies of cloud services instead of production.', usedIn: 'Firebase emulators and Vitest in pause-please' }
        ]
      }
    ]
  },

  {
    slug: 'machine-learning',
    title: 'Machine Learning',
    description: 'From statistics to models in production, with a focus on credit scoring.',
    branches: [
      {
        id: 'ml-foundations',
        label: 'Foundations',
        status: 'done',
        description: 'The maths and tooling every model rests on.',
        skills: [
          { id: 'ml-stats', label: 'Probability & statistics', status: 'done', description: 'Distributions, inference and knowing when a difference is real.' },
          { id: 'ml-linear-algebra', label: 'Linear algebra', status: 'done', description: 'Vectors and matrices, the language models are written in.' },
          { id: 'ml-pydata', label: 'NumPy & pandas', status: 'done', description: 'Loading, cleaning and reshaping tabular data in Python.' }
        ]
      },
      {
        id: 'ml-classical',
        label: 'Classical ML',
        status: 'done',
        description: 'Well-understood models that still win on tabular data.',
        skills: [
          { id: 'ml-logistic', label: 'Logistic regression', status: 'done', description: 'Interpretable probability models, the basis of scorecards.' },
          { id: 'ml-trees', label: 'Decision trees & random forests', status: 'done', description: 'Non-linear models that handle mixed feature types well.' },
          { id: 'ml-boosting', label: 'Gradient boosting', status: 'done', description: 'Strong tabular models built from many small trees.' },
          { id: 'ml-sklearn', label: 'scikit-learn', status: 'done', description: 'Pipelines for preprocessing, training and validation.' }
        ]
      },
      {
        id: 'ml-credit',
        label: 'Credit Scoring',
        status: 'done',
        description: 'Predicting repayment risk in a way lenders and regulators can trust.',
        usedIn: 'AND Systems lending products',
        skills: [
          { id: 'ml-scorecards', label: 'Scorecard modelling', status: 'done', description: 'Turning model output into points that explain each decision.', usedIn: 'Scorecard configuration in the Niko AutoML platform' },
          { id: 'ml-features', label: 'Feature engineering', status: 'done', description: 'Building signals from raw customer and transaction data.' },
          { id: 'ml-evaluation', label: 'Model evaluation', status: 'done', description: 'ROC-AUC, Gini and stability checks before a model goes live.' }
        ]
      },
      {
        id: 'ml-production',
        label: 'ML in Production',
        status: 'done',
        description: 'Getting models out of notebooks and into decisions.',
        skills: [
          { id: 'ml-automl', label: 'AutoML platform', status: 'done', description: 'Letting non-technical users train, compare and deploy models.', usedIn: 'Niko AutoML backend: training, scorecards, deployment' },
          { id: 'ml-serverless', label: 'Serverless inference', status: 'done', description: 'Low-latency scoring that scales with demand.', usedIn: 'Scoring service on AWS Lambda and API Gateway' },
          { id: 'ml-onprem', label: 'On-premise deployment', status: 'done', description: 'Running models inside a client’s own infrastructure under strict data rules.', usedIn: 'On-premise scoring service at AND Systems' }
        ]
      },
      {
        id: 'ml-deep-learning',
        label: 'Deep Learning',
        status: 'learning',
        description: 'Neural networks for unstructured data like text and images.',
        skills: [
          { id: 'ml-nn', label: 'Neural network basics', status: 'learning', description: 'Layers, activations, loss and backpropagation.' },
          { id: 'ml-pytorch', label: 'PyTorch', status: 'learning', description: 'Building and training networks with a flexible, Pythonic API.' },
          { id: 'ml-transformers', label: 'Transformers', status: 'learning', description: 'The attention-based architecture behind modern language models.' }
        ]
      },
      {
        id: 'ml-llms',
        label: 'LLM Applications',
        status: 'learning',
        description: 'Building products on top of large language models.',
        skills: [
          { id: 'ml-gemini', label: 'Gemini API', status: 'done', description: 'Calling Google’s models for text generation and analysis.' },
          { id: 'ml-prompting', label: 'Prompt design', status: 'learning', description: 'Writing instructions that get reliable, structured answers.' },
          { id: 'ml-rag', label: 'Embeddings & RAG', status: 'learning', description: 'Grounding answers in your own documents through vector search.' },
          { id: 'ml-agents', label: 'AI agents', status: 'planned', description: 'Models that plan and use tools to finish multi-step tasks.' }
        ]
      }
    ]
  },

  {
    slug: 'software-architect',
    title: 'Software Architect',
    description: 'Shaping systems so they stay fast to change as they grow.',
    branches: [
      {
        id: 'sa-styles',
        label: 'Architecture Styles',
        status: 'done',
        description: 'How a system is split up, and the trade-offs that come with each split.',
        skills: [
          { id: 'sa-microservices', label: 'Microservices', status: 'done', description: 'Independent services that deploy and scale on their own.', usedIn: 'Lending platform at AND Systems' },
          { id: 'sa-migration', label: 'Monolith to microservices', status: 'done', description: 'Splitting a running system apart without stopping the business.', usedIn: 'LendMN migration at AND Systems' },
          { id: 'sa-serverless', label: 'Serverless', status: 'done', description: 'Event-driven functions with no servers to manage.', usedIn: 'ML scoring on AWS Lambda; pause-please on Firebase' },
          { id: 'sa-orchestration', label: 'Workflow orchestration', status: 'done', description: 'A central coordinator for multi-step business processes.', usedIn: 'Netflix Conductor for lending operations' }
        ]
      },
      {
        id: 'sa-design',
        label: 'Design Principles',
        status: 'done',
        description: 'Keeping code easy to read, test and change.',
        skills: [
          { id: 'sa-solid', label: 'SOLID & OOP', status: 'done', description: 'Small, focused classes with clear responsibilities.' },
          { id: 'sa-patterns', label: 'Design patterns', status: 'done', description: 'Shared solutions and vocabulary for recurring problems.' },
          { id: 'sa-ddd', label: 'Domain-Driven Design', status: 'learning', description: 'Modelling code around the business’s own language and boundaries.' },
          { id: 'sa-cqrs', label: 'CQRS & event sourcing', status: 'learning', description: 'Separating reads from writes and keeping a history of changes.' }
        ]
      },
      {
        id: 'sa-system-design',
        label: 'System Design',
        status: 'done',
        description: 'Designing for scale, failure and change from the start.',
        skills: [
          { id: 'sa-scaling', label: 'Scalability & caching', status: 'done', description: 'Handling more load by scaling out and avoiding repeated work.' },
          { id: 'sa-resilience', label: 'Fault tolerance', status: 'done', description: 'Retries, timeouts and fallbacks so one failure doesn’t take everything down.', usedIn: 'Fault-tolerant service execution with Netflix Conductor' },
          { id: 'sa-api-design', label: 'API design', status: 'done', description: 'Stable contracts that let teams work independently.' },
          { id: 'sa-data-modelling', label: 'Data modelling', status: 'done', description: 'Shaping data for how it is read, written and kept consistent.' }
        ]
      },
      {
        id: 'sa-security',
        label: 'Security & Compliance',
        status: 'done',
        description: 'Protecting data and meeting the rules around it.',
        skills: [
          { id: 'sa-governance', label: 'Data governance', status: 'done', description: 'Keeping sensitive data inside the boundaries a client requires.', usedIn: 'On-premise scoring service at AND Systems' },
          { id: 'sa-access', label: 'Access control', status: 'done', description: 'Deciding who can see and change what, enforced server-side.', usedIn: 'Firestore security rules and roles in pause-please' }
        ]
      },
      {
        id: 'sa-cloud',
        label: 'Cloud Architecture',
        status: 'done',
        description: 'Designing for the cloud’s building blocks and their limits.',
        skills: [
          { id: 'sa-aws', label: 'AWS', status: 'done', description: 'Core AWS services, security model and pricing.', usedIn: 'AWS Certified Cloud Practitioner' },
          { id: 'sa-iac', label: 'Infrastructure as Code', status: 'learning', description: 'Describing infrastructure in versioned, reviewable files.' },
          { id: 'sa-service-mesh', label: 'Service mesh', status: 'planned', description: 'Traffic, security and observability between services, handled outside the code.' }
        ]
      },
      {
        id: 'sa-domains',
        label: 'Domains & Standards',
        status: 'done',
        description: 'Industry knowledge that shapes how a system has to work.',
        skills: [
          { id: 'sa-lending', label: 'Lending systems', status: 'done', description: 'Loan lifecycles, scoring and the business rules around them.', usedIn: 'Core lending service team at AND Systems' },
          { id: 'sa-healthcare', label: 'Healthcare data standards', status: 'done', description: 'Exchanging medical records in internationally agreed formats.', usedIn: 'Mongolia’s national e-health platform at Mono Solution' }
        ]
      },
      {
        id: 'sa-leadership',
        label: 'Leadership',
        status: 'done',
        description: 'Helping a team make good technical decisions together.',
        skills: [
          { id: 'sa-team-lead', label: 'Team leadership', status: 'done', description: 'Planning work, unblocking people and owning delivery.' },
          { id: 'sa-docs', label: 'Technical writing', status: 'done', description: 'Design docs and decision records people actually read.' },
          { id: 'sa-agile', label: 'Agile delivery', status: 'done', description: 'Short cycles, visible progress and regular course correction.' }
        ]
      }
    ]
  }
];
