import React, { useEffect, useMemo, useState } from 'react';
import {
  Server,
  BrainCircuit,
  Building2,
  Check,
  Hourglass,
  ChevronRight,
  Maximize,
  Minus,
  Plus,
  Search,
  X,
  Briefcase
} from 'lucide-react';
import { skillTrees } from '../../data/skillTrees';
import { SkillStatus } from '../../types/portfolio';
import { usePanZoom } from '../../hooks/usePanZoom';
import { layoutSkillTrees, LaidOutNode, SkillTreeSlug } from '../../utils/skillTreeLayout';

type Status = SkillStatus;

const TREE_THEME: Record<SkillTreeSlug, { name: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  backend: { name: 'Backend', color: '#859900', icon: Server },
  'machine-learning': { name: 'Machine Learning', color: '#b58900', icon: BrainCircuit },
  'software-architect': { name: 'Software Architect', color: '#268bd2', icon: Building2 }
};

const STATUS_TEXT: Record<Status, string> = { done: 'Done', learning: 'Learning', planned: 'Planned' };
const STATUS_POINTS: Record<Status, number> = { done: 2, learning: 1, planned: 0 };
const MAX_POINTS = 2;

const NODE_SIZE: Record<LaidOutNode['kind'], number> = { root: 64, topic: 52, subtopic: 40 };
const RING_CIRCUMFERENCE = 2 * Math.PI * 46;

const statusOf = (node: LaidOutNode): Status => node.status;

// Curve from parent to child: straight down the trunk, arched above the row for skills beside their branch
const branchPath = (parent: LaidOutNode, child: LaidOutNode) => {
  const dx = child.x - parent.x;
  const dy = child.y - parent.y;
  if (Math.abs(dy) < 1) {
    return `M ${parent.x} ${parent.y} C ${parent.x + dx * 0.3} ${parent.y - 52}, ${child.x - dx * 0.3} ${child.y - 52}, ${child.x} ${child.y}`;
  }
  return `M ${parent.x} ${parent.y} C ${parent.x} ${parent.y + dy * 0.5}, ${child.x} ${child.y - dy * 0.5}, ${child.x} ${child.y}`;
};

export const SkillsView: React.FC = () => {
  const [activeTree, setActiveTree] = useState<SkillTreeSlug | 'all'>('all');
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const layout = useMemo(
    () => layoutSkillTrees(activeTree === 'all' ? skillTrees : skillTrees.filter((t) => t.slug === activeTree)),
    [activeTree]
  );
  const { viewportRef, view, animated, fit, zoomBy, centerOn, wasDrag, handlers } = usePanZoom({
    width: layout.width,
    height: layout.height,
    minScale: 0.35
  });

  useEffect(() => {
    setSelectedKey(null);
    fit();
  }, [layout, fit]);

  const selected = selectedKey ? layout.byKey.get(selectedKey) ?? null : null;

  // Skill points across every tree: 2 for a skill that's done, 1 while learning
  const points = useMemo(() => {
    const all = layoutSkillTrees(skillTrees).nodes.filter((n) => n.kind !== 'root');
    return {
      earned: all.reduce((sum, n) => sum + STATUS_POINTS[statusOf(n)], 0),
      max: all.length * MAX_POINTS
    };
  }, []);

  // A topic's ring shows how much of its branch (itself plus its skills) is done
  const progressOf = (node: LaidOutNode): number => {
    if (node.kind === 'subtopic') return STATUS_POINTS[statusOf(node)] / MAX_POINTS;
    const members = node.kind === 'topic' ? [node, ...node.childKeys.map((k) => layout.byKey.get(k)!).filter((n) => n.kind === 'subtopic')] : layout.nodes.filter((n) => n.slug === node.slug && n.kind !== 'root');
    return members.reduce((sum, n) => sum + STATUS_POINTS[statusOf(n)], 0) / (members.length * MAX_POINTS);
  };

  // The focused skill's path: everything up to the tree's root, plus what it directly unlocks
  const focusKey = hoveredKey ?? selectedKey;
  const highlighted = useMemo(() => {
    const keys = new Set<string>();
    if (!focusKey) return keys;
    let current = layout.byKey.get(focusKey);
    while (current) {
      keys.add(current.key);
      current = current.parentKey ? layout.byKey.get(current.parentKey) : undefined;
    }
    layout.byKey.get(focusKey)?.childKeys.forEach((k) => keys.add(k));
    return keys;
  }, [focusKey, layout]);

  const query = searchQuery.trim().toLowerCase();
  const matches = useMemo(
    () => new Set(query ? layout.nodes.filter((n) => n.label.toLowerCase().includes(query)).map((n) => n.key) : []),
    [query, layout]
  );

  const selectNode = (node: LaidOutNode, focus = false) => {
    setSelectedKey(node.key);
    if (focus) centerOn(node.x, node.y);
  };

  const isDimmed = (node: LaidOutNode) =>
    focusKey ? !highlighted.has(node.key) : query ? !matches.has(node.key) : false;

  const parent = selected?.parentKey ? layout.byKey.get(selected.parentKey) : undefined;
  const children = selected ? selected.childKeys.map((k) => layout.byKey.get(k)!) : [];

  return (
    <div className="flex flex-col h-full bg-[#001f27] text-[#93a1a1] overflow-hidden font-sans select-none relative">
      {/* Floating control bar */}
      <div className="absolute top-4 left-4 right-4 sm:right-auto z-40 flex flex-wrap items-center gap-2 bg-[#073642] sm:bg-[#073642]/90 sm:backdrop-blur border border-[#2aa198]/40 p-1.5 rounded-xl shadow-2xl">
        <div className="flex items-center gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTree('all')}
            className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono transition-all cursor-pointer whitespace-nowrap ${
              activeTree === 'all' ? 'bg-[#2aa198]/30 text-[#2aa198] border border-[#2aa198]/50' : 'text-[#839496] hover:text-[#eee8d5] border border-transparent'
            }`}
          >
            ALL
          </button>
          {skillTrees.map((tree) => {
            const theme = TREE_THEME[tree.slug];
            const active = activeTree === tree.slug;
            return (
              <button
                key={tree.slug}
                onClick={() => setActiveTree(tree.slug)}
                className="px-2 py-0.5 rounded text-[10px] font-bold font-mono transition-all cursor-pointer whitespace-nowrap border"
                style={{
                  color: active ? theme.color : '#839496',
                  backgroundColor: active ? `${theme.color}4d` : 'transparent',
                  borderColor: active ? `${theme.color}80` : 'transparent'
                }}
              >
                {theme.name.toUpperCase()}
              </button>
            );
          })}
        </div>

        <div className="h-4 w-px bg-[#2aa198]/20 hidden sm:block" />

        <div className="relative">
          <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-[#2aa198]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              const first = layout.nodes.find((n) => matches.has(n.key));
              if (e.key === 'Enter' && first) selectNode(first, true);
            }}
            placeholder="Find a skill…"
            className="w-32 sm:w-40 pl-6 pr-2 py-0.5 rounded-md bg-[#002b36] border border-[#2aa198]/30 text-[11px] text-[#eee8d5] placeholder-[#586e75] focus:outline-none focus:border-[#2aa198] font-mono"
          />
        </div>

        <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-lg bg-[#002b36] border border-[#2aa198]/30 text-[11px] font-mono" title="2 SP per skill done, 1 while learning">
          <span className="text-[#586e75] font-bold">SP:</span>
          <span className="text-[#b58900] font-black">
            {points.earned}/{points.max}
          </span>
        </div>
      </div>

      {/* Pannable, zoomable skill tree canvas */}
      <div
        ref={viewportRef}
        {...handlers}
        onClick={() => {
          if (!wasDrag()) setSelectedKey(null);
        }}
        className="flex-1 w-full h-full overflow-hidden relative bg-[#001d24] touch-none cursor-grab active:cursor-grabbing"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#2aa198_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        <div
          className={`absolute top-0 left-0 origin-top-left ${animated ? 'transition-transform duration-300 ease-out' : ''}`}
          style={{ width: layout.width, height: layout.height, transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}
        >
          {/* One group box per tree */}
          {layout.clusters.map((cluster) => {
            const theme = TREE_THEME[cluster.slug];
            const Icon = theme.icon;
            return (
              <div
                key={cluster.slug}
                className="absolute rounded-2xl border pointer-events-none p-3"
                style={{ left: cluster.x, top: cluster.y, width: cluster.width, height: cluster.height, borderColor: `${theme.color}40`, backgroundColor: `${theme.color}0d` }}
              >
                <div
                  className="flex items-center space-x-1.5 font-mono text-[11px] font-black uppercase tracking-wider bg-[#001f27]/80 px-2.5 py-1 rounded-lg border w-max"
                  style={{ color: theme.color, borderColor: `${theme.color}4d` }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{theme.name} Tree</span>
                </div>
              </div>
            );
          })}

          {/* Branches */}
          <svg className="absolute inset-0 pointer-events-none overflow-visible" width={layout.width} height={layout.height}>
            <defs>
              <filter id="skill-branch-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {layout.nodes.map((node) => {
              const from = node.parentKey ? layout.byKey.get(node.parentKey) : undefined;
              if (!from) return null;
              const color = TREE_THEME[node.slug].color;
              const active = focusKey !== null && highlighted.has(node.key) && highlighted.has(from.key);
              const path = branchPath(from, node);
              return (
                <g key={node.key}>
                  {active && <path d={path} fill="none" stroke={color} strokeWidth={5} strokeOpacity={0.5} filter="url(#skill-branch-glow)" />}
                  <path
                    d={path}
                    fill="none"
                    stroke={color}
                    strokeWidth={active ? 2.5 : 1.5}
                    strokeOpacity={active ? 1 : focusKey ? 0.08 : 0.25}
                    strokeDasharray={statusOf(node) === 'planned' && node.kind !== 'root' ? '4 4' : undefined}
                    className="transition-[stroke-opacity] duration-300"
                  />
                </g>
              );
            })}
          </svg>

          {/* Skill nodes */}
          {layout.nodes.map((node) => {
            const theme = TREE_THEME[node.slug];
            const size = NODE_SIZE[node.kind];
            const status: Status = node.kind === 'root' ? 'done' : statusOf(node);
            const progress = progressOf(node);
            const isFocused = focusKey === node.key;
            const isMatch = query !== '' && matches.has(node.key);
            const planned = status === 'planned' && node.kind !== 'root';
            const Icon = theme.icon;

            return (
              <button
                key={node.key}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!wasDrag()) setSelectedKey(selectedKey === node.key ? null : node.key);
                }}
                // Hover only for a mouse: on touch screens a tap would leave the path lit
                onPointerEnter={(e) => e.pointerType === 'mouse' && setHoveredKey(node.key)}
                onPointerLeave={(e) => e.pointerType === 'mouse' && setHoveredKey(null)}
                className={`absolute -translate-x-1/2 flex flex-col items-center cursor-pointer transition-[opacity,transform] duration-300 focus-visible:outline-none ${
                  isFocused ? 'z-30 scale-110' : isDimmed(node) ? 'z-10 opacity-30 hover:opacity-100' : 'z-10 hover:scale-105'
                }`}
                style={{ left: node.x, top: node.y - size / 2, width: 104 }}
              >
                <span
                  className={`relative rounded-full flex items-center justify-center transition-shadow ${
                    isFocused ? 'ring-4 ring-[#eee8d5] shadow-2xl' : isMatch ? 'ring-2 ring-[#eee8d5]/80' : ''
                  }`}
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: planned ? '#073642' : `${theme.color}${status === 'done' ? '33' : '1a'}`,
                    border: planned ? '1.5px dashed #586e75' : `1px solid ${theme.color}55`,
                    color: planned ? '#586e75' : theme.color
                  }}
                >
                  {/* Progress ring */}
                  {!planned && (
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="46" fill="none" stroke={`${theme.color}22`} strokeWidth="5" />
                      <circle
                        cx="50"
                        cy="50"
                        r="46"
                        fill="none"
                        stroke={theme.color}
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray={RING_CIRCUMFERENCE}
                        strokeDashoffset={RING_CIRCUMFERENCE * (1 - progress)}
                        className="transition-[stroke-dashoffset] duration-500"
                      />
                    </svg>
                  )}
                  {node.kind === 'root' ? (
                    <Icon className="w-7 h-7 text-[#eee8d5]" />
                  ) : node.kind === 'topic' ? (
                    <span className={`font-mono font-black text-sm ${planned ? 'text-[#586e75]' : 'text-[#eee8d5]'}`}>{node.topicNumber}</span>
                  ) : status === 'done' ? (
                    <Check className="w-4 h-4" strokeWidth={3} />
                  ) : status === 'learning' ? (
                    <Hourglass className="w-4 h-4" />
                  ) : null}
                </span>
                <span
                  className={`mt-1.5 text-[10px] font-bold font-mono tracking-tight text-center leading-tight line-clamp-2 ${
                    isFocused ? 'text-[#eee8d5]' : planned ? 'text-[#839496]' : 'text-[#eee8d5]/90'
                  } ${node.kind === 'root' ? 'text-xs' : ''}`}
                >
                  {node.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Legend and credit */}
        <div className="absolute bottom-4 left-4 z-40 flex flex-wrap items-center gap-x-3 gap-y-1 bg-[#073642] sm:bg-[#073642]/90 sm:backdrop-blur border border-[#2aa198]/30 px-2.5 py-1.5 rounded-xl text-[10px] font-mono max-w-[calc(100%-11rem)]">
          <span className="flex items-center gap-1 text-[#93a1a1]"><Check className="w-3 h-3 text-[#859900]" strokeWidth={3} />Done</span>
          <span className="flex items-center gap-1 text-[#93a1a1]"><Hourglass className="w-3 h-3 text-[#b58900]" />Learning</span>
          <span className="flex items-center gap-1 text-[#93a1a1]"><span className="w-3 h-3 rounded-full border border-dashed border-[#586e75]" />Planned</span>
        </div>

        {/* Zoom controls */}
        <div
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute bottom-4 right-4 z-50 flex items-center space-x-1.5 bg-[#073642] sm:bg-[#073642]/95 sm:backdrop-blur border border-[#2aa198]/40 p-1.5 rounded-xl shadow-2xl"
        >
          <button onClick={() => zoomBy(1 / 1.2)} className="p-1.5 rounded-lg bg-[#002b36] hover:bg-[#2aa198]/20 text-[#2aa198] transition-all cursor-pointer" title="Zoom out">
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-bold text-[#eee8d5] px-1 min-w-[44px] text-center tabular-nums">{Math.round(view.scale * 100)}%</span>
          <button onClick={() => zoomBy(1.2)} className="p-1.5 rounded-lg bg-[#002b36] hover:bg-[#2aa198]/20 text-[#2aa198] transition-all cursor-pointer" title="Zoom in">
            <Plus className="w-4 h-4" />
          </button>
          <button onClick={() => fit(true)} className="p-1.5 rounded-lg bg-[#002b36] hover:bg-[#2aa198]/20 text-[#2aa198] transition-all cursor-pointer" title="Fit to width">
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Skill inspector */}
      {selected && (
        <div
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute top-16 left-4 sm:left-auto right-4 bottom-16 z-40 sm:w-96 bg-[#073642] sm:bg-[#073642]/95 sm:backdrop-blur p-5 overflow-y-auto space-y-5 custom-scrollbar border border-[#2aa198]/40 rounded-2xl shadow-2xl text-[#93a1a1] select-text"
        >
          {(() => {
            const theme = TREE_THEME[selected.slug];
            const Icon = theme.icon;
            const status: Status = selected.kind === 'root' ? 'done' : statusOf(selected);
            const branch = selected.kind === 'subtopic' ? [selected] : selected.kind === 'topic' ? [selected, ...children.filter((c) => c.kind === 'subtopic')] : layout.nodes.filter((n) => n.slug === selected.slug && n.kind !== 'root');
            const earned = branch.reduce((sum, n) => sum + STATUS_POINTS[statusOf(n)], 0);
            const topicChildren = children.filter((c) => c.kind === 'subtopic');
            const nextTopic = children.find((c) => c.kind === 'topic');

            return (
              <>
                <div className="space-y-2 pb-4 border-b border-[#2aa198]/20 relative">
                  <button
                    onClick={() => setSelectedKey(null)}
                    className="absolute top-0 right-0 p-1.5 rounded-lg bg-[#002b36] hover:bg-[#dc322f]/20 text-[#839496] hover:text-[#dc322f] border border-[#2aa198]/20 transition-all cursor-pointer"
                    title="Close inspector"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex items-center space-x-3 pt-1 pr-8">
                    <div
                      className="p-2.5 rounded-2xl border text-[#eee8d5] shadow-lg shrink-0"
                      style={{ backgroundColor: status === 'planned' ? '#002b36' : `${theme.color}30`, borderColor: status === 'planned' ? '#586e75' : theme.color }}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-xl font-black text-[#eee8d5] tracking-tight">{selected.label}</h2>
                      <span className="text-xs font-mono font-bold" style={{ color: status === 'planned' ? '#586e75' : theme.color }}>
                        {selected.kind === 'root' ? `${theme.name} tree` : `${STATUS_TEXT[status]} · ${theme.name}${selected.kind === 'topic' ? ` · Branch ${selected.topicNumber}` : ''}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Points */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#eee8d5] font-bold">{selected.kind === 'subtopic' ? 'INVESTED POINTS' : 'BRANCH POINTS'}</span>
                    <span className="text-sm font-mono font-black text-[#b58900]">
                      {earned} / {branch.length * MAX_POINTS} SP
                    </span>
                  </div>
                  <div className="h-2 w-full bg-[#002b36] rounded-full overflow-hidden border border-[#2aa198]/20 flex">
                    {branch.flatMap((n) =>
                      Array.from({ length: MAX_POINTS }, (_, i) => (
                        <div
                          key={`${n.key}-${i}`}
                          className="flex-1 border-r border-[#002b36] last:border-r-0"
                          style={{ backgroundColor: i < STATUS_POINTS[statusOf(n)] ? '#859900' : 'transparent' }}
                        />
                      ))
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2aa198] block font-mono">Competency Description</span>
                  <p className="text-xs text-[#eee8d5] leading-relaxed">{selected.description}</p>
                </div>

                {/* Where it was used */}
                {selected.usedIn && (
                  <div className="space-y-1.5 pt-1 border-t border-[#2aa198]/20">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#268bd2] block font-mono pt-3">Where I Used It</span>
                    <p className="text-xs text-[#eee8d5] leading-relaxed flex items-start gap-2">
                      <Briefcase className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#268bd2]" />
                      {selected.usedIn}
                    </p>
                  </div>
                )}

                {/* Prerequisite */}
                {parent && (
                  <div className="space-y-2 pt-1 border-t border-[#2aa198]/20">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#b58900] block font-mono pt-3">Prerequisite</span>
                    <button
                      onClick={() => selectNode(parent, true)}
                      className="px-2.5 py-1 rounded-lg bg-[#002b36] hover:bg-[#002b36]/80 border border-[#2aa198]/30 text-xs text-[#2aa198] font-mono transition-colors flex items-center space-x-1 cursor-pointer"
                    >
                      <ChevronRight className="w-3 h-3" />
                      <span>{parent.label}</span>
                    </button>
                  </div>
                )}

                {/* What this unlocks */}
                {(topicChildren.length > 0 || nextTopic) && (
                  <div className="space-y-2 pt-1 border-t border-[#2aa198]/20">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2aa198] block font-mono pt-3">
                      Next Skills Unlocked ({topicChildren.length + (nextTopic ? 1 : 0)})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[...topicChildren, ...(nextTopic ? [nextTopic] : [])].map((child) => {
                        const childStatus = statusOf(child);
                        return (
                          <button
                            key={child.key}
                            onClick={() => selectNode(child, true)}
                            className={`px-2.5 py-1 rounded-lg border text-xs font-mono transition-colors flex items-center space-x-1 cursor-pointer bg-[#002b36] hover:bg-[#002b36]/70 ${
                              childStatus === 'planned' ? 'border-[#586e75]/40 text-[#839496]' : 'border-[#2aa198]/30 text-[#eee8d5]'
                            }`}
                          >
                            {childStatus === 'done' ? (
                              <Check className="w-3 h-3 text-[#859900]" strokeWidth={3} />
                            ) : childStatus === 'learning' ? (
                              <Hourglass className="w-3 h-3 text-[#b58900]" />
                            ) : (
                              <ChevronRight className="w-3 h-3 text-[#586e75]" />
                            )}
                            <span>{child.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};
