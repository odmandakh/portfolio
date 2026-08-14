import { DesktopItem } from '../types/portfolio';

export const desktopItems: DesktopItem[] = [
  {
    id: 'projects',
    title: 'Projects',
    type: 'folder',
    icon: 'FolderGit2',
    badge: '10',
    description: 'Projects'
  },
  {
    id: 'certificates',
    title: 'Certificates',
    type: 'folder',
    icon: 'FolderAward',
    badge: '6',
    description: 'AWS, CKA, Meta & GCP certifications'
  },
  {
    id: 'about',
    title: 'About Me',
    type: 'app',
    icon: 'UserCheck',
    description: 'macOS Settings style profile summary'
  },
  {
    id: 'skills',
    title: 'Skills Tree',
    type: 'app',
    icon: 'Network',
    badge: 'Interactive',
    description: 'Connected skill node graph & dependencies'
  },
  {
    id: 'cv',
    title: 'CV.pdf',
    type: 'file',
    icon: 'FileText',
    description: 'Curriculum Vitae / Resume'
  },
  {
    id: 'experience',
    title: 'Experience',
    type: 'widget',
    icon: 'Briefcase',
    badge: '6+ YOE',
    description: 'Career progression & role timeline'
  },
  {
    id: 'github',
    title: 'GitHub Activity',
    type: 'widget',
    icon: 'Github',
    badge: '2.4k',
    description: 'Contribution heatmaps & open source'
  },
  {
    id: 'leetcode',
    title: 'LeetCode Stats',
    type: 'widget',
    icon: 'Code',
    badge: '642',
    description: 'Algorithmic problem solving record'
  }
];
