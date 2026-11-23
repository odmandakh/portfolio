import React from 'react';
import { FileText, Github, Globe } from 'lucide-react';

// One item inside an opened folder: a README document, or a shortcut that opens a URL
export interface FolderFile {
  id: string;
  name: string;
  kind: string;
  icon: 'readme' | 'github' | 'link';
  href?: string;
}

export const readmeFile: FolderFile = { id: 'readme', name: 'README.md', kind: 'Markdown document', icon: 'readme' };

export const linkFile = (id: string, url: string, name = displayUrl(url)): FolderFile => ({
  id,
  name,
  kind: 'Web link',
  icon: id === 'repo' ? 'github' : 'link',
  href: url
});

export const displayUrl = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

const FILE_LIST_COLUMNS = 'grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-x-3';

const FileIcon: React.FC<{ file: FolderFile; className: string }> = ({ file, className }) => {
  if (file.icon === 'readme') return <FileText className={`${className} text-[#93a1a1]`} strokeWidth={1.25} />;
  if (file.icon === 'github') return <Github className={`${className} text-[#93a1a1]`} strokeWidth={1.25} />;
  return <Globe className={`${className} text-[#268bd2]`} strokeWidth={1.25} />;
};

interface FolderFilesProps {
  files: FolderFile[];
  viewMode: 'grid' | 'list';
  selectedId: string | null;
  onSelect: (file: FolderFile) => void;
}

export const FolderFiles: React.FC<FolderFilesProps> = ({ files, viewMode, selectedId, onSelect }) => {
  // Link files open the site in a new tab; other files are selected and previewed beside the list
  const fileProps = (file: FolderFile) =>
    file.href
      ? { href: file.href, target: '_blank', rel: 'noopener noreferrer', title: file.href, onClick: (e: React.MouseEvent) => e.stopPropagation() }
      : {
          href: '#',
          'aria-current': selectedId === file.id ? ('true' as const) : undefined,
          onClick: (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            onSelect(file);
          }
        };
  const selectedClass = (file: FolderFile) => (selectedId === file.id ? 'bg-[#2aa198]/20' : '');

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(6.5rem,1fr))] gap-3">
        {files.map((file) => (
          <a
            key={file.id}
            {...fileProps(file)}
            className={`group flex flex-col items-center text-center p-3 rounded-xl hover:bg-[#073642]/60 focus-visible:bg-[#073642]/60 focus-visible:outline focus-visible:outline-[#2aa198] transition-colors cursor-pointer space-y-1.5 ${selectedClass(file)}`}
          >
            <FileIcon file={file} className="w-14 h-14" />
            <span className="text-xs font-medium text-[#eee8d5] max-w-full truncate">{file.name}</span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="min-w-[320px] text-xs">
      <div className={`${FILE_LIST_COLUMNS} sticky top-0 z-10 px-4 py-2 bg-[#073642] border-b border-[#2aa198]/30 text-[10px] font-bold uppercase tracking-wider text-[#2aa198] font-mono`}>
        <span>Name</span>
        <span>Kind</span>
      </div>
      {files.map((file) => (
        <a
          key={file.id}
          {...fileProps(file)}
          className={`${FILE_LIST_COLUMNS} px-4 py-2.5 items-center odd:bg-[#073642]/30 hover:bg-[#2aa198]/15 focus-visible:bg-[#2aa198]/15 focus-visible:outline-none transition-colors cursor-pointer text-[#eee8d5] ${selectedClass(file)}`}
        >
          <span className="flex items-center gap-2 min-w-0 font-semibold">
            <FileIcon file={file} className="w-4 h-4 shrink-0" />
            <span className="truncate">{file.name}</span>
          </span>
          <span className="text-[#839496] truncate">{file.kind}</span>
        </a>
      ))}
    </div>
  );
};
