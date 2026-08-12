import { Project } from '../types/portfolio';

export const projectsData: Project[] = [
  {
    id: 'aegis-engine',
    title: 'Aegis Event Engine',
    category: 'Professional',
    shortDescription: 'High-throughput, distributed event stream processing & queueing service.',
    fullDescription: 'A distributed, fault-tolerant message queue and streaming broker designed for high-concurrency microservices telemetry and distributed background job scheduling.',
    technologies: ['Go', 'Redis', 'gRPC', 'Docker', 'Kubernetes', 'Prometheus'],
    problem: 'Existing messaging infrastructure faced severe latency bottlenecks and consumer lag during peak spikes exceeding 80,000 requests per second.',
    solution: 'Engineered a custom lock-free memory ring buffer in Go with gRPC streaming transport, yielding dynamic partition rebalancing and sub-millisecond p99 latencies.',
    architecture: 'Producer services publish events via gRPC -> Aegis Ring Buffer ingress -> Distributed Partition Coordinators -> Consumer Worker Pools with automatic retry backoff.',
    keyLearnings: [
      'Lock-free data structures dramatically reduce thread contention under extreme load.',
      'gRPC multiplexing saves up to 40% memory bandwidth compared to JSON over HTTP/1.1.',
      'Graceful degradation patterns prevent cascading failures across downstream worker queues.'
    ],
    demoUrl: 'https://aegis-engine-demo.example.com',
    githubUrl: 'https://github.com/odmandakh/aegis-event-engine',
    featured: true,
    date: '2026-03',
    metrics: '85k req/sec throughput, <1.2ms p99 latency',
    folderColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  },
  {
    id: 'nexus-cloud-dashboard',
    title: 'Nexus Cloud Control',
    category: 'Professional',
    shortDescription: 'Multi-region Kubernetes & infrastructure monitoring web platform.',
    fullDescription: 'An enterprise cloud observability portal providing real-time metric visualization, cluster health topologies, and automated incident triage workflows across multi-cloud deployments.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Express', 'D3.js', 'WebSockets'],
    problem: 'DevOps teams struggled with fragmented dashboards across 4 cloud providers, causing delayed MTTR during service degradation.',
    solution: 'Constructed a unified single-pane-of-glass workspace with WebSocket push updates, custom D3 node graphs for cluster topology, and instant log correlation.',
    architecture: 'React Frontend SPA -> Express Aggregator Gateway -> GraphQL Subscriptions -> Multi-Cluster Prometheus & CloudWatch APIs.',
    keyLearnings: [
      'Virtualized canvas rendering for 10,000+ cluster nodes prevents browser UI freezes.',
      'Delta compression over WebSockets reduced telemetry bandwidth consumption by 65%.',
      'Optimistic state updates provide instant user feedback during node scaling commands.'
    ],
    demoUrl: 'https://nexus-cloud-demo.example.com',
    githubUrl: 'https://github.com/odmandakh/nexus-cloud-control',
    featured: true,
    date: '2025-11',
    metrics: '45% reduction in Incident MTTR',
    folderColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
  },
  {
    id: 'odmandakh-os',
    title: 'Odmandakh OS Portfolio',
    category: 'Personal',
    shortDescription: 'Desktop-inspired interactive portfolio experience built with React & Motion.',
    fullDescription: 'A clean, modern portfolio presented as an elegant desktop interface. Focuses on content clarity, fluid motion, responsive navigation, and strict data-driven content maintainability.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Motion'],
    problem: 'Standard linear resume websites feel repetitive and fail to showcase frontend architectural craftsmanship.',
    solution: 'Designed an interactive macOS-inspired desktop with folders, widgets, graph views, and lightweight modal windows while adhering to zero-clutter principles.',
    architecture: 'React 19 -> Motion Layout Transitions -> Standardized Data Registries (Projects, Skills Graph, Experience Timeline) -> Mobile Reflow Engine.',
    keyLearnings: [
      'Clean separation between layout system and content data enables seamless updates.',
      'Respecting prefers-color-scheme provides native OS cohesion.',
      'Avoiding simulated OS bloat keeps page weight under 200KB.'
    ],
    demoUrl: 'https://odmandakh.dev',
    githubUrl: 'https://github.com/odmandakh/odmandakh-os',
    featured: true,
    date: '2026-08',
    metrics: '100/100 Lighthouse Performance Score',
    folderColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  },
  {
    id: 'lumina-vision-ai',
    title: 'Lumina OCR & Document AI',
    category: 'Personal',
    shortDescription: 'Intelligent document processing and entity extraction API powered by Gemini.',
    fullDescription: 'An automated document processing pipeline that parses complex multi-page financial statements, invoices, and blueprints into structured JSON schemas with semantic verification.',
    technologies: ['Python', 'FastAPI', 'Gemini API', 'PyTorch', 'Docker', 'PostgreSQL'],
    problem: 'Manual data entry from unstructured PDF documents was error-prone and took hours per batch.',
    solution: 'Integrated multimodal Gemini API key entity parsing with custom confidence scoring and human-in-the-loop validation dashboards.',
    architecture: 'Client Upload -> FastAPI Ingestion -> Layout Analysis Pipeline -> Multimodal Gemini Vision API -> Validation Engine -> Structured Postgres Storage.',
    keyLearnings: [
      'Structured JSON mode in Gemini guarantees predictable schema enforcement.',
      'Parallel chunk processing reduced 50-page document processing time from 3 mins to 14 seconds.'
    ],
    demoUrl: 'https://lumina-ai-demo.example.com',
    githubUrl: 'https://github.com/odmandakh/lumina-document-ai',
    featured: false,
    date: '2025-08',
    metrics: '99.4% Extraction Accuracy',
    folderColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
  },
  {
    id: 'kubeflow-canary-cli',
    title: 'KubeCanary Deployer',
    category: 'Open Source',
    shortDescription: 'Lightweight Rust CLI for zero-downtime canary rollouts on Kubernetes.',
    fullDescription: 'A developer-first CLI tool for orchestrating progressive traffic shifting, metric analysis, and automatic rollback on Kubernetes deployments.',
    technologies: ['Rust', 'Kubernetes API', 'Helm', 'Tokio', 'Clap'],
    problem: 'Existing deployment operators were overly complex to configure for small engineering teams.',
    solution: 'Built a lightweight single-binary CLI in Rust that interfaces with Istio and NGINX Ingress controllers for declarative canary releases.',
    architecture: 'CLI Command -> K8s Ingress Controller API -> Traffic Shift Ratio Monitor -> Prometheus Metrics Evaluation -> Auto Approve / Rollback.',
    keyLearnings: [
      'Rust Tokio async runtime provides instant startup and zero memory overhead.',
      'Declarative YAML configuration files simplify CI/CD pipeline integration.'
    ],
    githubUrl: 'https://github.com/odmandakh/kubecanary-cli',
    featured: false,
    date: '2025-04',
    metrics: '1,200+ GitHub Stars',
    folderColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30'
  },
  {
    id: 'aura-synth-ui',
    title: 'Aura Web Synthesizer',
    category: 'Personal',
    shortDescription: 'Modular polyphonic audio synthesizer and visualizer in the browser.',
    fullDescription: 'An interactive web synthesizer featuring customizable oscillators, ADSR envelopes, low-pass filters, delay effects, and real-time audio oscilloscope visualizer.',
    technologies: ['TypeScript', 'WebAudio API', 'HTML5 Canvas', 'React', 'Tailwind CSS'],
    problem: 'Exploring WebAudio capabilities requires clean modular DSP node management in React.',
    solution: 'Created custom WebAudio graph nodes bound to high-frequency Canvas animation frame visualizers for ultra-responsive sound synthesis.',
    architecture: 'Keyboard/MIDI Input -> Oscillator Node Array -> Biquad Filter -> ADSR Gain Envelope -> Delay & Reverb -> Master Audio Context Out & Canvas Visualizer.',
    keyLearnings: [
      'Decoupling audio processing loops from React re-render cycles avoids audio clicking/popping.',
      'Web MIDI API integration allows connecting external physical keyboards seamlessly.'
    ],
    demoUrl: 'https://aura-synth.example.com',
    githubUrl: 'https://github.com/odmandakh/aura-web-synth',
    featured: false,
    date: '2024-12',
    metrics: '60 FPS Real-time Canvas Rendering',
    folderColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
  }
];
