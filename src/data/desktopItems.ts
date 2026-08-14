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
    description: 'Certificates'
  },
  {
    id: 'about',
    title: 'About Me',
    type: 'app',
    icon: 'UserCheck',
    description: 'About Me'
  },
  {
    id: 'skills',
    title: 'Skills Tree',
    type: 'app',
    icon: 'Network',
    badge: 'Interactive',
    description: 'Skills Tree'
  },
  {
    id: 'cv',
    title: 'CV.pdf',
    type: 'file',
    icon: 'FileText',
    description: ''
  },
  {
    id: 'experience',
    title: 'Experience',
    type: 'widget',
    icon: 'Briefcase',
    badge: '6+ YOE',
    description: 'Experience'
  },
  {
    id: 'github',
    title: 'GitHub Activity',
    type: 'widget',
    icon: 'Github',
    badge: '2.4k',
    description: 'GitHub Activity'
  },
  {
    id: 'leetcode',
    title: 'LeetCode Stats',
    type: 'widget',
    icon: 'Code',
    badge: '642',
    description: 'LeetCode Stats'
  }
];
