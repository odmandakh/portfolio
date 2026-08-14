import React, { useState, useMemo } from 'react';
import { 
  Network, 
  Search, 
  Code2, 
  Sparkles, 
  ChevronRight, 
  Cpu, 
  Layers, 
  Terminal, 
  Zap, 
  CheckCircle2, 
  Award,
  Lock,
  Plus,
  Minus,
  RotateCcw,
  Shield,
  Coffee,
  FileCode,
  Server,
  Share2,
  Cloud,
  Box,
  Users,
  Bot,
  Radio,
  Database,
  Layout,
  Clock,
  ListFilter,
  Star,
  X
} from 'lucide-react';
import { skillNodes, skillCategories } from '../../data/skills';
import { projectsData } from '../../data/projects';
import { SkillNode } from '../../types/portfolio';

// Dynamic Icon Resolver
const renderSkillIcon = (iconName: string, className: string = "w-5 h-5") => {
  switch (iconName) {
    case 'Code2': return <Code2 className={className} />;
    case 'Coffee': return <Coffee className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'Terminal': return <Terminal className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'FileCode': return <FileCode className={className} />;
    case 'Server': return <Server className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Network': return <Network className={className} />;
    case 'Layers': return <Layers className={className} />;
    case 'Box': return <Box className={className} />;
    case 'Share2': return <Share2 className={className} />;
    case 'Cloud': return <Cloud className={className} />;
    case 'Users': return <Users className={className} />;
    case 'Shield': return <Shield className={className} />;
    case 'Award': return <Award className={className} />;
    case 'CheckCircle2': return <CheckCircle2 className={className} />;
    case 'Bot': return <Bot className={className} />;
    case 'Radio': return <Radio className={className} />;
    case 'Database': return <Database className={className} />;
    case 'Layout': return <Layout className={className} />;
    default: return <Sparkles className={className} />;
  }
};

export const SkillsView: React.FC = () => {
  // State for points allocation per skill node
  const [pointsState, setPointsState] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    skillNodes.forEach((node) => {
      initial[node.id] = node.defaultPoints;
    });
    return initial;
  });

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [activeBranch, setActiveBranch] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [viewMode, setViewMode] = useState<'map' | 'awesome'>('map');

  // Map Canvas Pan/Drag State
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, input, a, select')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      if ((e.target as HTMLElement).closest('button, input, a, select')) return;
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - panPosition.x, y: e.touches[0].clientY - panPosition.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      setPanPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Active focus target for map path highlighting (either hovered or selected)
  const focusNodeId = hoveredNodeId || selectedNodeId;

  // Zoom handlers
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(1.8, Math.round((prev + 0.15) * 100) / 100));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(0.6, Math.round((prev - 0.15) * 100) / 100));
  };

  const handleResetZoom = () => {
    setZoomLevel(1.0);
  };

  // Compute Ancestor Node IDs (Prerequisite path up to root)
  const ancestorNodeIds = useMemo(() => {
    const visited = new Set<string>();
    if (!focusNodeId) return visited;
    const queue = [focusNodeId];

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      const node = skillNodes.find((n) => n.id === currentId);
      if (node && node.parentIds) {
        node.parentIds.forEach((parentId) => {
          if (!visited.has(parentId)) {
            visited.add(parentId);
            queue.push(parentId);
          }
        });
      }
    }
    return visited;
  }, [focusNodeId]);

  // Compute Descendant Node IDs (Next skills unlocked downstream)
  const descendantNodeIds = useMemo(() => {
    const visited = new Set<string>();
    if (!focusNodeId) return visited;
    const queue = [focusNodeId];

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      const children = skillNodes.filter((n) => n.parentIds.includes(currentId));
      children.forEach((child) => {
        if (!visited.has(child.id)) {
          visited.add(child.id);
          queue.push(child.id);
        }
      });
    }
    return visited;
  }, [focusNodeId]);

  // Combined set of all nodes in the active learning path
  const highlightedNodeIds = useMemo(() => {
    const set = new Set<string>();
    if (focusNodeId) set.add(focusNodeId);
    ancestorNodeIds.forEach((id) => set.add(id));
    descendantNodeIds.forEach((id) => set.add(id));
    return set;
  }, [focusNodeId, ancestorNodeIds, descendantNodeIds]);

  // Branch SP points summary
  const branchPoints = useMemo(() => {
    const totals = { languages: 0, frameworks: 0, soft_skills: 0 };
    skillNodes.forEach((node) => {
      totals[node.branch] += pointsState[node.id] || 0;
    });
    return totals;
  }, [pointsState]);

  const totalAllocatedSP = useMemo(() => {
    return Object.values(pointsState).reduce((a, b) => a + b, 0);
  }, [pointsState]);

  const maxTotalSP = useMemo(() => {
    return skillNodes.reduce((a, b) => a + b.maxPoints, 0);
  }, []);

  // Skill Inspector Detail Panel strictly tracks selectedNodeId (only opens on click, NOT hover)
  const activeFocusNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return skillNodes.find((n) => n.id === selectedNodeId) || null;
  }, [selectedNodeId]);

  // Modify points for a node
  const handleModifyPoints = (nodeId: string, delta: number) => {
    const node = skillNodes.find((n) => n.id === nodeId);
    if (!node || node.status === 'planned') return;

    setPointsState((prev) => {
      const current = prev[nodeId] || 0;
      const next = Math.min(node.maxPoints, Math.max(0, current + delta));
      return { ...prev, [nodeId]: next };
    });
  };

  const handleResetPoints = () => {
    const reset: Record<string, number> = {};
    skillNodes.forEach((node) => {
      reset[node.id] = node.defaultPoints;
    });
    setPointsState(reset);
  };

  const handleMaxOutAll = () => {
    const maxed: Record<string, number> = {};
    skillNodes.forEach((node) => {
      maxed[node.id] = node.status === 'planned' ? 0 : node.maxPoints;
    });
    setPointsState(maxed);
  };

  // Branch Theme Configuration
  const getBranchTheme = (branch: 'languages' | 'frameworks' | 'soft_skills') => {
    switch (branch) {
      case 'languages': 
        return { primary: '#859900', light: '#b58900', name: 'PROGRAMMING LANGUAGES', glow: 'rgba(133, 153, 0, 0.4)' };
      case 'frameworks': 
        return { primary: '#b58900', light: '#cb4b16', name: 'FRAMEWORKS & TOOLS', glow: 'rgba(181, 137, 0, 0.4)' };
      case 'soft_skills': 
        return { primary: '#268bd2', light: '#2aa198', name: 'SOFT SKILLS', glow: 'rgba(38, 139, 210, 0.4)' };
      default: 
        return { primary: '#2aa198', light: '#268bd2', name: 'CORE', glow: 'rgba(42, 161, 152, 0.4)' };
    }
  };

  // Filter nodes based on active branch filter & search
  const filteredNodes = useMemo(() => {
    return skillNodes.filter((node) => {
      const matchesBranch = activeBranch === 'all' || node.branch === activeBranch;
      const matchesSearch = searchQuery === '' || 
        node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesBranch && matchesSearch;
    });
  }, [activeBranch, searchQuery]);

  // Grouped nodes for Awesome List view
  const groupedSkills = useMemo(() => {
    return {
      languages: filteredNodes.filter((n) => n.branch === 'languages'),
      frameworks: filteredNodes.filter((n) => n.branch === 'frameworks'),
      soft_skills: filteredNodes.filter((n) => n.branch === 'soft_skills'),
    };
  }, [filteredNodes]);

  // Find linked projects for focused skill
  const linkedProjects = useMemo(() => {
    if (!activeFocusNode) return [];
    return projectsData.filter((p) => activeFocusNode.projectIds.includes(p.id));
  }, [activeFocusNode]);

  // Direct Parent Nodes
  const parentNodes = useMemo(() => {
    if (!activeFocusNode) return [];
    return skillNodes.filter((n) => activeFocusNode.parentIds.includes(n.id));
  }, [activeFocusNode]);

  // Direct Child Nodes
  const childNodes = useMemo(() => {
    if (!activeFocusNode) return [];
    return skillNodes.filter((n) => n.parentIds.includes(activeFocusNode.id));
  }, [activeFocusNode]);

  return (
    <div className="flex flex-col h-full min-h-[600px] bg-[#001f27] text-[#93a1a1] overflow-hidden font-sans select-none relative">
      {/* Floating Canvas Top Control Bar Overlay */}
      <div className="absolute top-4 left-4 z-40 flex items-center space-x-2 bg-[#073642]/90 backdrop-blur border border-[#2aa198]/40 p-1.5 rounded-xl shadow-2xl">
        {/* View Mode Toggle Switch */}
        <div className="flex items-center bg-[#002b36] p-0.5 rounded-lg border border-[#2aa198]/30">
          <button
            onClick={() => setViewMode('map')}
            className={`px-2.5 py-1 rounded text-[11px] font-bold font-mono transition-all flex items-center space-x-1 cursor-pointer ${
              viewMode === 'map'
                ? 'bg-[#2aa198] text-[#002b36] font-black shadow'
                : 'text-[#839496] hover:text-[#eee8d5]'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Map View</span>
          </button>
          <button
            onClick={() => setViewMode('awesome')}
            className={`px-2.5 py-1 rounded text-[11px] font-bold font-mono transition-all flex items-center space-x-1 cursor-pointer ${
              viewMode === 'awesome'
                ? 'bg-[#859900] text-[#002b36] font-black shadow'
                : 'text-[#839496] hover:text-[#eee8d5]'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Awesome Index</span>
          </button>
        </div>

        <div className="h-4 w-px bg-[#2aa198]/20 my-auto" />

        {/* Branch Filter Tabs */}
        <div className="hidden sm:flex items-center space-x-1">
          <button
            onClick={() => setActiveBranch('all')}
            className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono transition-all cursor-pointer ${
              activeBranch === 'all'
                ? 'bg-[#2aa198]/30 text-[#2aa198] border border-[#2aa198]/50'
                : 'text-[#839496] hover:text-[#eee8d5]'
            }`}
          >
            ALL
          </button>
          <button
            onClick={() => setActiveBranch('languages')}
            className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono transition-all cursor-pointer ${
              activeBranch === 'languages'
                ? 'bg-[#859900]/30 text-[#859900] border border-[#859900]/50'
                : 'text-[#839496] hover:text-[#859900]'
            }`}
          >
            LANGUAGES
          </button>
          <button
            onClick={() => setActiveBranch('frameworks')}
            className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono transition-all cursor-pointer ${
              activeBranch === 'frameworks'
                ? 'bg-[#b58900]/30 text-[#b58900] border border-[#b58900]/50'
                : 'text-[#839496] hover:text-[#b58900]'
            }`}
          >
            FRAMEWORKS
          </button>
          <button
            onClick={() => setActiveBranch('soft_skills')}
            className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono transition-all cursor-pointer ${
              activeBranch === 'soft_skills'
                ? 'bg-[#268bd2]/30 text-[#268bd2] border border-[#268bd2]/50'
                : 'text-[#839496] hover:text-[#268bd2]'
            }`}
          >
            SOFT SKILLS
          </button>
        </div>

        <div className="h-4 w-px bg-[#2aa198]/20 my-auto" />

        {/* SP Bank Badge */}
        <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-lg bg-[#002b36] border border-[#2aa198]/30 text-[11px] font-mono">
          <span className="text-[#586e75] font-bold">SP:</span>
          <span className="text-[#b58900] font-black">{totalAllocatedSP}/{maxTotalSP}</span>
        </div>
      </div>

      {/* VIEW MODE 1: INTERACTIVE MAP CANVAS WITH CLUSTER GROUPS */}
      {viewMode === 'map' && (
        <div 
          className="flex-1 w-full h-full overflow-hidden relative bg-[#001d24] select-none cursor-grab active:cursor-grabbing flex items-center justify-center min-h-[550px]"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Infinite Background Dots Pattern across full container viewport */}
          <div className="absolute inset-0 bg-[radial-gradient(#2aa198_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

          {/* Interactive Zoomable & Pannable Skill Tree Canvas Container */}
          <div className="w-full h-full relative flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Zoomable & Pannable Inner Canvas Container */}
            <div 
              className={`relative w-[960px] h-[620px] shrink-0 transition-transform origin-center ${
                isDragging ? 'duration-0' : 'duration-200 ease-out'
              }`}
              style={{
                transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel})`,
              }}
            >
              {/* Grouped Cluster Boundary Boxes (Visual Grouping) */}
              <div className="absolute top-2 left-[2%] w-[30%] bottom-8 rounded-2xl border border-[#859900]/25 bg-[#859900]/5 pointer-events-none p-3 flex flex-col justify-between">
                <div className="flex items-center space-x-1.5 text-[#859900] font-mono text-[11px] font-black uppercase tracking-wider bg-[#001f27]/80 px-2.5 py-1 rounded-lg border border-[#859900]/30 w-max">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Languages Group</span>
                </div>
              </div>

              <div className="absolute top-2 left-[35%] w-[31%] bottom-8 rounded-2xl border border-[#b58900]/25 bg-[#b58900]/5 pointer-events-none p-3 flex flex-col justify-between">
                <div className="flex items-center space-x-1.5 text-[#b58900] font-mono text-[11px] font-black uppercase tracking-wider bg-[#001f27]/80 px-2.5 py-1 rounded-lg border border-[#b58900]/30 w-max">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Frameworks & Tools Group</span>
                </div>
              </div>

              <div className="absolute top-2 left-[68%] w-[30%] bottom-8 rounded-2xl border border-[#268bd2]/25 bg-[#268bd2]/5 pointer-events-none p-3 flex flex-col justify-between">
                <div className="flex items-center space-x-1.5 text-[#268bd2] font-mono text-[11px] font-black uppercase tracking-wider bg-[#001f27]/80 px-2.5 py-1 rounded-lg border border-[#268bd2]/30 w-max">
                  <Users className="w-3.5 h-3.5" />
                  <span>Soft Skills & Leadership</span>
                </div>
              </div>

              {/* SVG Connection Lines Layer */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <filter id="glow-languages" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="glow-frameworks" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="glow-soft" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Render Bezier Lines Connecting Direct Parent and Child Nodes */}
                {skillNodes.map((node) => {
                  if (node.parentIds.length === 0) return null;

                  return node.parentIds.map((parentId) => {
                    const parentNode = skillNodes.find((n) => n.id === parentId);
                    if (!parentNode) return null;

                    // Path highlighting logic
                    const isParentInPath = highlightedNodeIds.has(parentNode.id);
                    const isChildInPath = highlightedNodeIds.has(node.id);
                    // Connection line is active ONLY when a node is hovered or selected, and both ends are in its active path
                    const isLineInActivePath = (hoveredNodeId !== null || selectedNodeId !== null) && isParentInPath && isChildInPath;

                    const isPlannedLine = node.status === 'planned' || parentNode.status === 'planned';
                    const branchTheme = getBranchTheme(node.branch);

                    // Transform Y percentages to leave top padding for header controls
                    const getNodeY = (y: number) => y * 0.76 + 15;

                    const x1 = parentNode.x;
                    const y1 = getNodeY(parentNode.y);
                    const x2 = node.x;
                    const y2 = getNodeY(node.y);

                    const dx = x2 - x1;
                    const dy = y1 - y2; // Note: y decreases going up

                    let cp1x: number, cp1y: number, cp2x: number, cp2y: number;

                    if (Math.abs(dy) < 5) {
                      // Same-tier horizontal connection (arch downward between tiers so line doesn't cut through nodes)
                      const archDepth = Math.min(12, Math.abs(dx) * 0.35);
                      cp1x = x1 + dx * 0.25;
                      cp1y = y1 + archDepth;
                      cp2x = x2 - dx * 0.25;
                      cp2y = y2 + archDepth;
                    } else if (Math.abs(dx) > 20) {
                      // Cross-branch connection (smooth wide curve through channel)
                      cp1x = x1 + dx * 0.4;
                      cp1y = y1 - dy * 0.2;
                      cp2x = x1 + dx * 0.6;
                      cp2y = y2 + dy * 0.2;
                    } else {
                      // Standard vertical connection between tiers
                      cp1x = x1;
                      cp1y = y1 - dy * 0.5;
                      cp2x = x2;
                      cp2y = y2 + dy * 0.5;
                    }

                    const pathString = `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;

                    return (
                      <g key={`${parentNode.id}-${node.id}`}>
                        {/* Glowing Backdrop Path for active highlighted learning path */}
                        {isLineInActivePath && (
                          <path
                            d={pathString}
                            fill="none"
                            stroke={branchTheme.primary}
                            strokeWidth="3.5"
                            strokeOpacity="0.6"
                            filter={`url(#glow-${node.branch === 'languages' ? 'languages' : node.branch === 'frameworks' ? 'frameworks' : 'soft'})`}
                            vectorEffect="non-scaling-stroke"
                          />
                        )}

                        {/* Main Line - Completely transparent by default, visible on hover/click */}
                        <path
                          d={pathString}
                          fill="none"
                          stroke={branchTheme.primary}
                          strokeWidth={isLineInActivePath ? "2" : "0"}
                          strokeDasharray={isPlannedLine ? "3 3" : "none"}
                          opacity={isLineInActivePath ? 1 : 0}
                          strokeOpacity={isLineInActivePath ? 1 : 0}
                          vectorEffect="non-scaling-stroke"
                          className="transition-all duration-300"
                        />
                      </g>
                    );
                  });
                })}
              </svg>

              {/* HTML Interactive Nodes Grid Container */}
              <div className="relative w-full h-full z-10">
                {filteredNodes.map((node) => {
                  const pts = pointsState[node.id] || 0;
                  const isAllocated = pts > 0;
                  const isFocused = focusNodeId === node.id;
                  const hasActiveSelection = hoveredNodeId !== null || selectedNodeId !== null;

                  // Check if node is part of the highlighted path
                  const isInHighlightedPath = highlightedNodeIds.has(node.id);
                  const isPlanned = node.status === 'planned';

                  const branchTheme = getBranchTheme(node.branch);

                  // Remove percentage numbers (e.g., "(30%)") from skill labels
                  const cleanLabel = node.label.replace(/\s*\(\d+%\)/g, '').trim();

                  // Map Y percentage to ensure nodes sit cleanly below header controls
                  const nodeYPercent = node.y * 0.76 + 15;

                  return (
                    <div
                      key={node.id}
                      style={{
                        left: `${node.x}%`,
                        top: `${nodeYPercent}%`,
                      }}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-all duration-300 flex flex-col items-center ${
                        isFocused 
                          ? 'z-30 scale-110' 
                          : isInHighlightedPath 
                          ? 'z-20 scale-105 opacity-100' 
                          : hasActiveSelection
                          ? 'z-10 opacity-30 hover:opacity-100 hover:scale-105'
                          : 'z-10 opacity-100 hover:scale-105'
                      }`}
                    >
                      {/* Outer Circular Ring */}
                      <div 
                        className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isFocused 
                            ? 'ring-4 ring-[#eee8d5] shadow-2xl' 
                            : isInHighlightedPath 
                            ? 'ring-2 ring-current shadow-lg' 
                            : isPlanned
                            ? 'ring-1 ring-[#586e75]/50 bg-[#073642]/60 border border-dashed border-[#586e75]'
                            : 'ring-1 ring-[#2aa198]/30 bg-[#002b36]/80'
                        }`}
                        style={{
                          backgroundColor: isPlanned 
                            ? '#073642' 
                            : isInHighlightedPath 
                            ? `${branchTheme.primary}25` 
                            : '#002b36',
                          borderColor: isPlanned ? '#586e75' : isAllocated ? branchTheme.primary : '#2aa19833',
                          color: isPlanned ? '#586e75' : branchTheme.primary
                        }}
                      >
                        {/* SVG Circular Progress Ring */}
                        {!isPlanned && (
                          <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle
                              cx="50%"
                              cy="50%"
                              r="45%"
                              fill="none"
                              stroke={`${branchTheme.primary}22`}
                              strokeWidth="3"
                            />
                            <circle
                              cx="50%"
                              cy="50%"
                              r="45%"
                              fill="none"
                              stroke={branchTheme.primary}
                              strokeWidth="3"
                              strokeDasharray="283"
                              strokeDashoffset={283 - (283 * (pts / node.maxPoints))}
                              strokeLinecap="round"
                              className="transition-all duration-500"
                            />
                          </svg>
                        )}

                        {/* Planned Grey Lock/Clock Icon or Skill Icon */}
                        {isPlanned ? (
                          <div className="flex flex-col items-center justify-center text-[#586e75]">
                            <Clock className="w-5 h-5 text-[#586e75]" />
                          </div>
                        ) : (
                          <div className={`transition-colors ${isAllocated ? 'text-[#eee8d5]' : 'text-[#839496]'}`}>
                            {renderSkillIcon(node.iconName, "w-5 h-5 sm:w-6 sm:h-6")}
                          </div>
                        )}
                      </div>

                      {/* Node Label underneath (Full clean text without truncation or ellipsis) */}
                      <span className={`mt-1.5 text-[10px] sm:text-xs font-bold font-mono tracking-tight text-center max-w-[160px] whitespace-normal leading-tight block transition-colors ${
                        isFocused 
                          ? 'text-[#eee8d5] font-extrabold z-20' 
                          : isPlanned
                          ? 'text-[#586e75] z-10'
                          : isAllocated 
                          ? 'text-[#eee8d5]/90 z-10' 
                          : 'text-[#839496] z-0'
                      }`}>
                        {cleanLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Floating Zoom Controls Widget (+ / -) ALWAYS stayed fixed at bottom right */}
          <div className="absolute bottom-4 right-4 z-50 flex items-center space-x-1.5 bg-[#073642]/95 backdrop-blur border border-[#2aa198]/40 p-1.5 rounded-xl shadow-2xl">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 0.6}
              className="p-1.5 rounded-lg bg-[#002b36] hover:bg-[#2aa198]/20 disabled:opacity-30 text-[#2aa198] transition-all cursor-pointer"
              title="Zoom Out (-)"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-[#eee8d5] px-2 min-w-[48px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 1.8}
              className="p-1.5 rounded-lg bg-[#002b36] hover:bg-[#2aa198]/20 disabled:opacity-30 text-[#2aa198] transition-all cursor-pointer"
              title="Zoom In (+)"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Right Side Skill Inspector HUD Panel (Floating Overlay) */}
          {activeFocusNode && (
            <div className="absolute top-16 right-4 bottom-16 z-40 w-80 sm:w-96 bg-[#073642]/95 backdrop-blur p-5 overflow-y-auto space-y-5 custom-scrollbar border border-[#2aa198]/40 rounded-2xl shadow-2xl font-sans text-[#93a1a1]">
              {/* Header Info */}
              <div className="space-y-2 pb-4 border-b border-[#2aa198]/20 relative">
                <button
                  onClick={() => {
                    setSelectedNodeId('');
                    setHoveredNodeId(null);
                  }}
                  className="absolute top-0 right-0 p-1.5 rounded-lg bg-[#002b36] hover:bg-[#dc322f]/20 text-[#839496] hover:text-[#dc322f] border border-[#2aa198]/20 transition-all cursor-pointer"
                  title="Close Inspector"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center space-x-3 pt-1 pr-8">
                    <div 
                      className="p-2.5 rounded-2xl border text-[#eee8d5] shadow-lg"
                      style={{
                        backgroundColor: activeFocusNode.status === 'planned' 
                          ? '#002b36' 
                          : `${getBranchTheme(activeFocusNode.branch).primary}30`,
                        borderColor: activeFocusNode.status === 'planned' 
                          ? '#586e75' 
                          : getBranchTheme(activeFocusNode.branch).primary
                      }}
                    >
                      {renderSkillIcon(activeFocusNode.iconName, "w-7 h-7")}
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-[#eee8d5] tracking-tight">
                        {activeFocusNode.label}
                      </h2>
                      <span className={`text-xs font-mono font-bold ${
                        activeFocusNode.status === 'planned' ? 'text-[#586e75]' : 'text-[#859900]'
                      }`}>
                        {activeFocusNode.level} ({activeFocusNode.years})
                      </span>
                    </div>
                  </div>


                </div>

                {/* Point Allocation Display HUD (Progress Bar only, no buttons) */}
                {activeFocusNode.status === 'planned' ? (
                  <div className="py-2 space-y-1.5 text-center">
                    <div className="flex items-center justify-center space-x-2 text-[#586e75] font-mono text-xs font-bold uppercase">
                      <Clock className="w-4 h-4 animate-spin" />
                      <span>PLANNED IN FUTURE ROADMAP</span>
                    </div>
                    <p className="text-[11px] text-[#839496]">
                      This skill is queued for upcoming engineering study.
                    </p>
                  </div>
                ) : (
                  <div className="py-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#eee8d5] font-bold">INVESTED POINTS</span>
                      <span className="text-sm font-mono font-black text-[#b58900]">
                        {pointsState[activeFocusNode.id] || 0} / {activeFocusNode.maxPoints} SP
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 w-full bg-[#073642] rounded-full overflow-hidden border border-[#2aa198]/20 flex">
                      {Array.from({ length: activeFocusNode.maxPoints }).map((_, idx) => (
                        <div
                          key={idx}
                          className={`flex-1 border-r border-[#002b36] transition-colors ${
                            idx < (pointsState[activeFocusNode.id] || 0)
                              ? 'bg-[#859900]'
                              : 'bg-transparent'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Node Overview */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2aa198] block font-mono">
                    Competency Description
                  </span>
                  <p className="text-xs text-[#eee8d5] leading-relaxed">
                    {activeFocusNode.description}
                  </p>
                </div>

                {/* Direct Prerequisites */}
                {parentNodes.length > 0 && (
                  <div className="space-y-2 pt-1 border-t border-[#2aa198]/20">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#b58900] block font-mono">
                      Direct Prerequisites ({parentNodes.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {parentNodes.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setSelectedNodeId(p.id)}
                          className="px-2.5 py-1 rounded-lg bg-[#002b36] hover:bg-[#002b36]/80 border border-[#2aa198]/30 text-xs text-[#2aa198] font-mono transition-colors flex items-center space-x-1 cursor-pointer"
                        >
                          <ChevronRight className="w-3 h-3 text-[#2aa198]" />
                          <span>{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Next Skills Unlocked */}
                {childNodes.length > 0 && (
                  <div className="space-y-2 pt-1 border-t border-[#2aa198]/20">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2aa198] block font-mono">
                      Next Skills Unlocked ({childNodes.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {childNodes.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setSelectedNodeId(c.id)}
                          className={`px-2.5 py-1 rounded-lg border text-xs font-mono transition-colors flex items-center space-x-1 cursor-pointer ${
                            c.status === 'planned'
                              ? 'bg-[#002b36] border-[#586e75]/40 text-[#586e75]'
                              : 'bg-[#002b36] border-[#2aa198]/30 text-[#eee8d5]'
                          }`}
                        >
                          <ChevronRight className="w-3 h-3 text-[#859900]" />
                          <span>{c.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Linked Portfolio Projects */}
                {linkedProjects.length > 0 && (
                  <div className="space-y-2 pt-1 border-t border-[#2aa198]/20">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#268bd2] block font-mono">
                      Applied in Portfolio Projects ({linkedProjects.length})
                    </span>
                    <div className="space-y-2">
                      {linkedProjects.map((p) => (
                        <div
                          key={p.id}
                          className="p-3 rounded-xl bg-[#002b36] border border-[#2aa198]/30 space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#eee8d5]">{p.title}</span>
                            <span className="text-[9px] font-mono text-[#2aa198] px-1.5 py-0.5 rounded bg-[#073642]">
                              {p.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#839496] line-clamp-2">{p.shortDescription}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      {/* VIEW MODE 2: AWESOME LIST INDEX VIEW (Inspired by sindresorhus/awesome) */}
      {viewMode === 'awesome' && (
        <div className="flex-1 overflow-y-auto pt-20 px-4 sm:px-6 pb-6 sm:pb-8 custom-scrollbar space-y-6 max-w-6xl mx-auto w-full">
          {/* Awesome Banner Header */}
          <div className="p-5 rounded-2xl bg-[#073642] border border-[#859900]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-black font-mono bg-[#859900] text-[#002b36] uppercase tracking-wider">
                  AWESOME LIST
                </span>
                <span className="text-xs font-mono text-[#eee8d5]">Curated Engineering Competencies</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-[#eee8d5] tracking-tight font-mono">
                Awesome Engineering Skills & Systems Stack
              </h2>
              <p className="text-xs text-[#93a1a1]">
                A categorised list of awesome programming languages, enterprise frameworks, cloud tools, and leadership competencies.
              </p>
            </div>

            {/* Quick Table of Contents Jump Links */}
            <div className="flex flex-wrap items-center gap-2 bg-[#002b36] p-2 rounded-xl border border-[#2aa198]/30 text-xs font-mono">
              <span className="text-[10px] text-[#586e75] uppercase font-bold px-1">Contents:</span>
              <a href="#awesome-languages" className="px-2 py-1 rounded bg-[#859900]/20 text-[#859900] hover:bg-[#859900]/30 font-bold transition-all">
                Languages ({groupedSkills.languages.length})
              </a>
              <a href="#awesome-frameworks" className="px-2 py-1 rounded bg-[#b58900]/20 text-[#b58900] hover:bg-[#b58900]/30 font-bold transition-all">
                Frameworks ({groupedSkills.frameworks.length})
              </a>
              <a href="#awesome-soft" className="px-2 py-1 rounded bg-[#268bd2]/20 text-[#268bd2] hover:bg-[#268bd2]/30 font-bold transition-all">
                Soft Skills ({groupedSkills.soft_skills.length})
              </a>
            </div>
          </div>

          {/* GROUP 1: PROGRAMMING LANGUAGES */}
          {(activeBranch === 'all' || activeBranch === 'languages') && (
            <div id="awesome-languages" className="space-y-3">
              <div className="flex items-center space-x-2 pb-2 border-b border-[#859900]/30">
                <div className="p-1.5 rounded-lg bg-[#859900]/20 text-[#859900]">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-[#eee8d5] font-mono uppercase tracking-wider">
                  Programming Languages
                </h3>
                <span className="text-xs font-mono text-[#859900] font-bold bg-[#859900]/10 px-2 py-0.5 rounded-full border border-[#859900]/30">
                  {groupedSkills.languages.length} Items
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {groupedSkills.languages.map((node) => {
                  const pts = pointsState[node.id] || 0;
                  const isSelected = selectedNodeId === node.id;
                  const isPlanned = node.status === 'planned';

                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'bg-[#073642] border-[#859900] shadow-xl ring-2 ring-[#859900]/50'
                          : 'bg-[#002b36] border-[#2aa198]/20 hover:border-[#859900]/50 hover:bg-[#073642]/80'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center space-x-2.5">
                            <div className="p-1.5 rounded-lg bg-[#859900]/20 text-[#859900]">
                              {renderSkillIcon(node.iconName, "w-4 h-4")}
                            </div>
                            <h4 className="text-sm font-bold text-[#eee8d5] font-mono">{node.label}</h4>
                          </div>

                          {/* GitHub Awesome Style Badges */}
                          <div className="flex items-center space-x-1 shrink-0">
                            {isPlanned ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#073642] text-[#586e75] border border-[#586e75]/40">
                                PLANNED
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#859900]/20 text-[#859900] border border-[#859900]/40">
                                {node.level}
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-[#839496] leading-relaxed">{node.description}</p>
                      </div>

                      {/* Footer Details */}
                      <div className="pt-2 border-t border-[#2aa198]/15 flex items-center justify-between text-[11px] font-mono">
                        <div className="flex items-center space-x-2 text-[#586e75]">
                          <span>{node.years}</span>
                          <span>•</span>
                          <span className="text-[#859900] font-bold">{node.statBonus}</span>
                        </div>

                        {!isPlanned && (
                          <div className="flex items-center space-x-1 text-[#b58900] font-bold">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{pts}/{node.maxPoints} SP</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* GROUP 2: FRAMEWORKS & TOOLS */}
          {(activeBranch === 'all' || activeBranch === 'frameworks') && (
            <div id="awesome-frameworks" className="space-y-3 pt-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-[#b58900]/30">
                <div className="p-1.5 rounded-lg bg-[#b58900]/20 text-[#b58900]">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-[#eee8d5] font-mono uppercase tracking-wider">
                  Frameworks & Infrastructure
                </h3>
                <span className="text-xs font-mono text-[#b58900] font-bold bg-[#b58900]/10 px-2 py-0.5 rounded-full border border-[#b58900]/30">
                  {groupedSkills.frameworks.length} Items
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {groupedSkills.frameworks.map((node) => {
                  const pts = pointsState[node.id] || 0;
                  const isSelected = selectedNodeId === node.id;
                  const isPlanned = node.status === 'planned';

                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'bg-[#073642] border-[#b58900] shadow-xl ring-2 ring-[#b58900]/50'
                          : 'bg-[#002b36] border-[#2aa198]/20 hover:border-[#b58900]/50 hover:bg-[#073642]/80'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center space-x-2.5">
                            <div className="p-1.5 rounded-lg bg-[#b58900]/20 text-[#b58900]">
                              {renderSkillIcon(node.iconName, "w-4 h-4")}
                            </div>
                            <h4 className="text-sm font-bold text-[#eee8d5] font-mono">{node.label}</h4>
                          </div>

                          <div className="flex items-center space-x-1 shrink-0">
                            {isPlanned ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#073642] text-[#586e75] border border-[#586e75]/40">
                                PLANNED
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#b58900]/20 text-[#b58900] border border-[#b58900]/40">
                                {node.level}
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-[#839496] leading-relaxed">{node.description}</p>
                      </div>

                      <div className="pt-2 border-t border-[#2aa198]/15 flex items-center justify-between text-[11px] font-mono">
                        <div className="flex items-center space-x-2 text-[#586e75]">
                          <span>{node.years}</span>
                          <span>•</span>
                          <span className="text-[#b58900] font-bold">{node.statBonus}</span>
                        </div>

                        {!isPlanned && (
                          <div className="flex items-center space-x-1 text-[#b58900] font-bold">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{pts}/{node.maxPoints} SP</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* GROUP 3: SOFT SKILLS & LEADERSHIP */}
          {(activeBranch === 'all' || activeBranch === 'soft_skills') && (
            <div id="awesome-soft" className="space-y-3 pt-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-[#268bd2]/30">
                <div className="p-1.5 rounded-lg bg-[#268bd2]/20 text-[#268bd2]">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-[#eee8d5] font-mono uppercase tracking-wider">
                  Soft Skills & Engineering Leadership
                </h3>
                <span className="text-xs font-mono text-[#268bd2] font-bold bg-[#268bd2]/10 px-2 py-0.5 rounded-full border border-[#268bd2]/30">
                  {groupedSkills.soft_skills.length} Items
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {groupedSkills.soft_skills.map((node) => {
                  const pts = pointsState[node.id] || 0;
                  const isSelected = selectedNodeId === node.id;
                  const isPlanned = node.status === 'planned';

                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'bg-[#073642] border-[#268bd2] shadow-xl ring-2 ring-[#268bd2]/50'
                          : 'bg-[#002b36] border-[#2aa198]/20 hover:border-[#268bd2]/50 hover:bg-[#073642]/80'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center space-x-2.5">
                            <div className="p-1.5 rounded-lg bg-[#268bd2]/20 text-[#268bd2]">
                              {renderSkillIcon(node.iconName, "w-4 h-4")}
                            </div>
                            <h4 className="text-sm font-bold text-[#eee8d5] font-mono">{node.label}</h4>
                          </div>

                          <div className="flex items-center space-x-1 shrink-0">
                            {isPlanned ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#073642] text-[#586e75] border border-[#586e75]/40">
                                PLANNED
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#268bd2]/20 text-[#268bd2] border border-[#268bd2]/40">
                                {node.level}
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-[#839496] leading-relaxed">{node.description}</p>
                      </div>

                      <div className="pt-2 border-t border-[#2aa198]/15 flex items-center justify-between text-[11px] font-mono">
                        <div className="flex items-center space-x-2 text-[#586e75]">
                          <span>{node.years}</span>
                          <span>•</span>
                          <span className="text-[#268bd2] font-bold">{node.statBonus}</span>
                        </div>

                        {!isPlanned && (
                          <div className="flex items-center space-x-1 text-[#b58900] font-bold">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{pts}/{node.maxPoints} SP</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
