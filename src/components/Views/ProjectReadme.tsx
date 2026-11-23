import React from 'react';
import { ExternalLink, Folder } from 'lucide-react';
import { Project } from '../../types/portfolio';
import { projectFolders } from '../../data/projects';
import { displayUrl } from '../Common/FolderFiles';

interface ProjectReadmeProps {
  project: Project;
}

const STATUS_LABEL: Record<Project['status'], string> = {
  done: 'Done',
  ongoing: 'Ongoing',
  planned: 'Planned',
  disbanded: 'Cancelled'
};

const STATUS_DOT: Record<Project['status'], string> = {
  done: 'bg-[#859900]',
  ongoing: 'bg-[#b58900]',
  planned: 'bg-[#586e75]',
  disbanded: 'bg-[#dc322f]'
};

const folderName = (project: Project) => projectFolders.find((f) => f.id === project.folder)?.name ?? project.folder;

// The project's main details, laid out like Finder's Get Info; shown when no file is selected
export const ProjectInfo: React.FC<ProjectReadmeProps> = ({ project }) => (
  <div className="h-full overflow-y-auto custom-scrollbar p-5 sm:p-6 space-y-5 text-[#93a1a1] select-text">
    <div className="flex items-start gap-4">
      <Folder className="w-14 h-14 shrink-0 text-[#268bd2] fill-[#268bd2]/25" strokeWidth={1.25} />
      <div className="flex-1 min-w-0 pt-1">
        <h2 className="text-xl font-semibold text-[#eee8d5] tracking-tight truncate">{project.title}</h2>
        <p className="text-xs text-[#839496] mt-0.5">{project.shortDescription}</p>
      </div>
    </div>

    <dl className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-3 gap-y-1.5 py-3 border-y border-[#2aa198]/15 text-xs">
      <dt className="text-right text-[#586e75]">Status</dt>
      <dd className="flex items-center gap-1.5 text-[#eee8d5]">
        <span className={`w-2 h-2 rounded-full ${STATUS_DOT[project.status]}`} />
        {STATUS_LABEL[project.status]}
      </dd>
      <dt className="text-right text-[#586e75]">Where</dt>
      <dd className="text-[#eee8d5]">Projects › {folderName(project)}</dd>
      <dt className="text-right text-[#586e75]">Kind</dt>
      <dd className="text-[#eee8d5]">{project.tag}</dd>
      <dt className="text-right text-[#586e75]">Date</dt>
      <dd className="text-[#eee8d5]">{project.date}</dd>
      <dt className="text-right text-[#586e75]">Built with</dt>
      <dd className="text-[#eee8d5]">{project.technologies.join(', ')}</dd>
      {(project.demoUrl || project.githubUrl) && (
        <>
          <dt className="text-right text-[#586e75]">Links</dt>
          <dd className="flex flex-wrap gap-x-4 gap-y-1">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-[#2aa198] hover:underline inline-flex items-center gap-1">
                {displayUrl(project.demoUrl)}
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#2aa198] hover:underline inline-flex items-center gap-1">
                Source on GitHub
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </dd>
        </>
      )}
    </dl>

    <p className="text-[13px] leading-relaxed">{project.fullDescription}</p>
    <p className="text-[11px] text-[#586e75]">Select README.md for the full write-up.</p>
  </div>
);

const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-base font-semibold text-[#eee8d5] pb-1.5 mb-2 border-b border-[#2aa198]/15">{children}</h2>
);

// A project's README.md, rendered the way a Markdown preview would show it
export const ProjectReadme: React.FC<ProjectReadmeProps> = ({ project }) => {
  const folder = folderName(project);
  const details: [string, string][] = [
    ['Status', STATUS_LABEL[project.status]],
    ['Folder', folder],
    ['Kind', project.tag],
    ['Date', project.date]
  ];

  return (
    <article className="h-full overflow-y-auto custom-scrollbar bg-[#002b36] px-5 sm:px-6 py-6 text-[13px] leading-relaxed text-[#93a1a1] select-text">
      <div className="max-w-2xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold text-[#eee8d5] pb-2 border-b border-[#2aa198]/15">{project.title}</h1>
          <p>{project.shortDescription}</p>
        </header>

        <table className="text-xs border-collapse">
          <tbody>
            {details.map(([label, value]) => (
              <tr key={label}>
                <th className="text-left font-semibold text-[#eee8d5] border border-[#2aa198]/20 px-3 py-1.5">{label}</th>
                <td className="border border-[#2aa198]/20 px-3 py-1.5">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <section>
          <H2>About</H2>
          <p>{project.fullDescription}</p>
        </section>

        <section>
          <H2>Problem</H2>
          <p>{project.problem}</p>
        </section>

        <section>
          <H2>Approach</H2>
          <p>{project.solution}</p>
        </section>

        <section>
          <H2>Architecture</H2>
          <p>{project.architecture}</p>
        </section>

        <section>
          <H2>Built with</H2>
          <ul className="list-disc pl-5 space-y-0.5">
            {project.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </section>

        {project.keyLearnings.length > 0 && (
          <section>
            <H2>What I learned</H2>
            <ul className="list-disc pl-5 space-y-1">
              {project.keyLearnings.map((learning) => (
                <li key={learning}>{learning}</li>
              ))}
            </ul>
          </section>
        )}

        {(project.demoUrl || project.githubUrl) && (
          <section>
            <H2>Links</H2>
            <ul className="list-disc pl-5 space-y-0.5">
              {project.demoUrl && (
                <li>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-[#268bd2] hover:underline">
                    {displayUrl(project.demoUrl)}
                  </a>
                </li>
              )}
              {project.githubUrl && (
                <li>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#268bd2] hover:underline">
                    Source on GitHub
                  </a>
                </li>
              )}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
};
