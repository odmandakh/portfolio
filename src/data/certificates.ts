import { Certificate } from '../types/portfolio';

export const certificatesData: Certificate[] = [
  {
    id: 'aws-cloud-practitioner',
    categoryId: 'cloud',
    categoryName: 'Cloud & Infrastructure',
    tag: 'AWS',
    title: 'AWS - Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: '2024-05-19',
    expirationDate: '2027-05-19',
    credentialId: '3bab36da530d4f798f74fa0d11c9b596',
    verifyUrl: 'https://cp.certmetrics.com/amazon/en/public/verify/credential/3bab36da530d4f798f74fa0d11c9b596',
    description: 'Foundational certification validating overall understanding of the AWS Cloud, including core services, security, architecture, pricing, and support.',
    skills: ['AWS Cloud Concepts', 'Core AWS Services', 'Cloud Security', 'Billing & Pricing'],
    badgeColor: 'border-amber-500/30 bg-amber-500/10 text-amber-400'
  },
  {
    id: 'symfonycasts-api-platform',
    categoryId: 'frontend',
    categoryName: 'Software Engineering',
    tag: 'SymfonyCasts',
    title: 'SymfonyCasts - API Platform',
    issuer: 'SymfonyCasts',
    issueDate: '2020-06-29',
    credentialId: '6F838B73C113',
    verifyUrl: 'https://symfonycasts.com/certificates/6F838B73C113',
    description: 'Certificate of completion for the API Platform track on SymfonyCasts, covering building hypermedia and GraphQL APIs on top of Symfony.',
    skills: ['API Platform', 'Symfony', 'REST APIs'],
    badgeColor: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400'
  },
  {
    id: 'symfonycasts-composer',
    categoryId: 'frontend',
    categoryName: 'Software Engineering',
    tag: 'SymfonyCasts',
    title: 'SymfonyCasts - Composer',
    issuer: 'SymfonyCasts',
    issueDate: '2020-07-08',
    credentialId: '7BA5A8927C29',
    verifyUrl: 'https://symfonycasts.com/certificates/7BA5A8927C29',
    description: 'Certificate of completion for the Composer track on SymfonyCasts, covering PHP dependency management, autoloading, and package versioning.',
    skills: ['Composer', 'PHP Dependency Management'],
    badgeColor: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400'
  },
  {
    id: 'symfonycasts-php-namespaces',
    categoryId: 'frontend',
    categoryName: 'Software Engineering',
    tag: 'SymfonyCasts',
    title: 'SymfonyCasts - PHP Namespaces',
    issuer: 'SymfonyCasts',
    issueDate: '2020-07-08',
    credentialId: '6473C43DCC21',
    verifyUrl: 'https://symfonycasts.com/certificates/6473C43DCC21',
    description: 'Certificate of completion for the PHP Namespaces track on SymfonyCasts, covering namespace organization and autoloading in PHP.',
    skills: ['PHP', 'Namespaces', 'Autoloading'],
    badgeColor: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400'
  }
];

export const certificateCategories = [
  { id: 'cloud', name: 'Cloud & Infrastructure', icon: 'Cloud' },
  { id: 'frontend', name: 'Software Engineering', icon: 'Code' },
  { id: 'ai', name: 'AI & Data Engineering', icon: 'Cpu' }
];
