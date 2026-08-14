import { Certificate } from '../types/portfolio';

export const certificatesData: Certificate[] = [
  {
    id: 'aws-sa-assoc',
    categoryId: 'cloud',
    categoryName: 'Cloud & Infrastructure',
    tag: 'AWS',
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: '2025-06',
    credentialId: 'AWS-SAA-8392014',
    verifyUrl: 'https://aws.amazon.com/verification',
    description: 'Validation of expertise in designing distributed, resilient, and cost-efficient cloud architectures on AWS.',
    skills: ['AWS EC2', 'S3', 'Lambda', 'VPC', 'DynamoDB', 'CloudFront'],
    badgeColor: 'border-amber-500/30 bg-amber-500/10 text-amber-400'
  },
  {
    id: 'cka-k8s',
    categoryId: 'cloud',
    categoryName: 'Cloud & Infrastructure',
    tag: 'CKA',
    title: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation (CNCF)',
    issueDate: '2025-01',
    credentialId: 'LF-CKA-749201',
    verifyUrl: 'https://www.cncf.io/certification/cka/',
    description: 'Hands-on performance-based exam demonstrating container orchestration, cluster maintenance, networking, and security.',
    skills: ['Kubernetes', 'Kubeadm', 'Etcd Backup', 'RBAC', 'NetworkPolicies'],
    badgeColor: 'border-blue-500/30 bg-blue-500/10 text-blue-400'
  },
  {
    id: 'meta-senior-frontend',
    categoryId: 'frontend',
    categoryName: 'Software Engineering',
    tag: 'Meta',
    outdated: true,
    title: 'Meta Senior Frontend Developer Specialization',
    issuer: 'Meta / Coursera',
    issueDate: '2024-10',
    credentialId: 'META-FED-992018',
    verifyUrl: 'https://www.coursera.org/verify/meta-frontend',
    description: 'Advanced React, client-side performance tuning, UX architecture, web accessibility (WCAG), and state management.',
    skills: ['React 19', 'Performance Optimization', 'Accessibility', 'Testing'],
    badgeColor: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
  },
  {
    id: 'google-cloud-dev',
    categoryId: 'cloud',
    categoryName: 'Cloud & Infrastructure',
    tag: 'GCP',
    title: 'Google Cloud Professional Cloud Developer',
    issuer: 'Google Cloud',
    issueDate: '2024-03',
    credentialId: 'GCP-PCD-482019',
    verifyUrl: 'https://cloud.google.com/certification/cloud-developer',
    description: 'Demonstrates ability to build scalable cloud-native applications using Google Cloud Run, Firestore, and Pub/Sub.',
    skills: ['Cloud Run', 'Firestore', 'Pub/Sub', 'Cloud Logging'],
    badgeColor: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
  },
  {
    id: 'deeplearning-tf',
    categoryId: 'ai',
    categoryName: 'AI & Data Engineering',
    title: 'DeepLearning.AI TensorFlow Specialization',
    issuer: 'DeepLearning.AI',
    issueDate: '2023-11',
    credentialId: 'DLAI-TF-301948',
    verifyUrl: 'https://www.deeplearning.ai/',
    description: 'Practical deep learning model training, computer vision CNNs, natural language processing, and model deployment.',
    skills: ['TensorFlow', 'Computer Vision', 'NLP', 'Model Evaluation'],
    badgeColor: 'border-purple-500/30 bg-purple-500/10 text-purple-400'
  },
  {
    id: 'hashicorp-terraform',
    categoryId: 'cloud',
    categoryName: 'Cloud & Infrastructure',
    title: 'HashiCorp Certified: Terraform Associate',
    issuer: 'HashiCorp',
    issueDate: '2023-05',
    credentialId: 'HC-TA-102938',
    verifyUrl: 'https://www.credly.com/org/hashicorp',
    description: 'Infrastructure as Code (IaC) principles, module creation, state management, and multi-cloud provisioning.',
    skills: ['Terraform', 'IaC', 'HCL', 'State Locks', 'Cloud Modules'],
    badgeColor: 'border-violet-500/30 bg-violet-500/10 text-violet-400'
  }
];

export const certificateCategories = [
  { id: 'cloud', name: 'Cloud & Infrastructure', icon: 'Cloud' },
  { id: 'frontend', name: 'Software Engineering', icon: 'Code' },
  { id: 'ai', name: 'AI & Data Engineering', icon: 'Cpu' }
];
