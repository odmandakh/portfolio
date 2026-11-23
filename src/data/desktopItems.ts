import { DesktopItem } from '../types/portfolio';
import { getYearsOfExperience } from '../utils/date';
import { projectsData } from './projects';
import { certificatesData } from './certificates';

export const desktopItems: DesktopItem[] = [
  {
    id: 'projects',
    title: 'Projects',
    type: 'folder',
    icon: 'FolderGit2',
    badge: projectsData.length,
    description: 'Projects'
  },
  {
    id: 'certificates',
    title: 'Certificates',
    type: 'folder',
    icon: 'FolderAward',
    badge: certificatesData.length,
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
    badge: `${getYearsOfExperience()}+ YOE`,
    description: 'Experience'
  },
  {
    id: 'github',
    title: 'GitHub Activity',
    type: 'widget',
    icon: 'Github',
    description: 'GitHub Activity'
  },
  {
    id: 'leetcode',
    title: 'LeetCode Stats',
    type: 'widget',
    icon: 'Code',
    description: 'LeetCode Stats'
  }
];
