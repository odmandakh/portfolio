import React, { useState } from 'react';
import { 
  Laptop, 
  Cpu, 
  HardDrive, 
  ShieldCheck, 
  Sparkles, 
  Info, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Check, 
  RefreshCw, 
  Terminal,
  Activity,
  Layers,
  Award
} from 'lucide-react';
import { profileData } from '../../data/profile';

export const AboutView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'report' | 'storage' | 'updates'>('overview');
  const [checkingUpdates, setCheckingUpdates] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);

  const handleCheckUpdates = () => {
    setCheckingUpdates(true);
    setUpdateStatus(null);
    setTimeout(() => {
      setCheckingUpdates(false);
      setUpdateStatus('Odmandakh OS 15.4 is up to date (Latest Build 2026.08)');
    }, 1200);
  };

  return (
    <div className="p-4 sm:p-6 flex flex-col md:flex-row gap-4 min-h-[520px] text-[#93a1a1] font-sans select-none">
      {/* Left Settings Sidebar (macOS System Settings Navigation) */}
      <div className="w-full md:w-56 bg-[#073642]/90 border border-[#2aa198]/30 rounded-2xl p-3 flex flex-row md:flex-col gap-1 shrink-0 backdrop-blur-xl">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#2aa198] font-mono hidden md:block">
          System Settings
        </div>

        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 md:flex-none flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-[#002b36] text-[#eee8d5] border border-[#2aa198]/40 shadow-sm'
              : 'text-[#839496] hover:text-[#eee8d5] hover:bg-[#002b36]/50'
          }`}
        >
          <Laptop className="w-4 h-4 text-[#2aa198]" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('report')}
          className={`flex-1 md:flex-none flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'report'
              ? 'bg-[#002b36] text-[#eee8d5] border border-[#2aa198]/40 shadow-sm'
              : 'text-[#839496] hover:text-[#eee8d5] hover:bg-[#002b36]/50'
          }`}
        >
          <Info className="w-4 h-4 text-[#268bd2]" />
          <span>System Report</span>
        </button>

        <button
          onClick={() => setActiveTab('storage')}
          className={`flex-1 md:flex-none flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'storage'
              ? 'bg-[#002b36] text-[#eee8d5] border border-[#2aa198]/40 shadow-sm'
              : 'text-[#839496] hover:text-[#eee8d5] hover:bg-[#002b36]/50'
          }`}
        >
          <HardDrive className="w-4 h-4 text-[#b58900]" />
          <span>Storage & Stack</span>
        </button>

        <button
          onClick={() => setActiveTab('updates')}
          className={`flex-1 md:flex-none flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'updates'
              ? 'bg-[#002b36] text-[#eee8d5] border border-[#2aa198]/40 shadow-sm'
              : 'text-[#839496] hover:text-[#eee8d5] hover:bg-[#002b36]/50'
          }`}
        >
          <RefreshCw className="w-4 h-4 text-[#859900]" />
          <span>Software Update</span>
        </button>
      </div>

      {/* Main Content View (macOS Settings Panel) */}
      <div className="flex-1 bg-[#002b36]/90 border border-[#2aa198]/30 rounded-2xl p-6 backdrop-blur-2xl flex flex-col justify-between space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Device Hardware Graphic Card */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-[#073642] border border-[#2aa198]/30 shadow-xl relative overflow-hidden">
              {/* Laptop Graphic Badge */}
              <div className="relative group shrink-0">
                <div className="w-28 h-28 rounded-3xl bg-[#002b36] p-1 shadow-2xl flex items-center justify-center border border-[#2aa198]/40">
                  <div className="w-full h-full bg-[#073642] rounded-[22px] flex flex-col items-center justify-center p-3 text-center border border-[#2aa198]/20">
                    {profileData.avatarUrl ? (
                      <img
                        src={profileData.avatarUrl}
                        alt={profileData.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <Laptop className="w-12 h-12 text-[#2aa198]" />
                    )}
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#859900] text-[#002b36] border border-[#859900] shadow font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Specs Header */}
              <div className="space-y-1 text-center sm:text-left flex-1">
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#2aa198]/20 border border-[#2aa198]/40 text-[#2aa198] text-[10px] font-bold uppercase tracking-wider font-mono">
                  <Sparkles className="w-3 h-3 text-[#2aa198]" />
                  <span>Odmandakh OS • 15.4</span>
                </div>
                <h1 className="text-2xl font-black text-[#eee8d5] tracking-tight pt-1">
                  {profileData.name}
                </h1>
                <p className="text-xs text-[#268bd2] font-semibold">
                  {profileData.title}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[11px] font-mono text-[#93a1a1]">
                  <span className="flex items-center text-[#eee8d5]">
                    <MapPin className="w-3 h-3 mr-1 text-[#2aa198]" />
                    {profileData.location}
                  </span>
                  <span>•</span>
                  <span className="text-[#859900] font-semibold">{profileData.yearsExperience}+ Years Exp</span>
                </div>
              </div>
            </div>

            {/* macOS System Information Key Specs Grid */}
            <div className="rounded-xl border border-[#2aa198]/30 bg-[#073642]/60 overflow-hidden divide-y divide-[#2aa198]/20 text-xs">
              <div className="flex justify-between items-center p-3.5 px-4">
                <span className="text-[#93a1a1] font-medium">Developer Chip</span>
                <span className="font-bold text-[#eee8d5] font-mono flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#2aa198]" />
                  Apple M3 Max (Full-Stack Engine)
                </span>
              </div>
              <div className="flex justify-between items-center p-3.5 px-4">
                <span className="text-[#93a1a1] font-medium">Unified Memory & Architecture</span>
                <span className="font-bold text-[#268bd2] font-mono">64 GB (React 19, TypeScript, Go)</span>
              </div>
              <div className="flex justify-between items-center p-3.5 px-4">
                <span className="text-[#93a1a1] font-medium">System Serial Number</span>
                <span className="font-mono text-[#2aa198] font-bold bg-[#002b36] px-2 py-0.5 rounded border border-[#2aa198]/40">
                  ODM-2026-ARCH-8821
                </span>
              </div>
              <div className="flex justify-between items-center p-3.5 px-4">
                <span className="text-[#93a1a1] font-medium">Primary Focus</span>
                <span className="font-bold text-[#b58900] font-mono">Distributed Systems & Web Apps</span>
              </div>
            </div>

            {/* Quick Action Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={profileData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#268bd2] text-[#eee8d5] hover:bg-[#268bd2]/90 text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3 h-3 text-[#eee8d5]" />
              </a>

              <a
                href={profileData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#073642] hover:bg-[#073642]/80 text-[#eee8d5] text-xs font-bold transition-all border border-[#2aa198]/40 flex items-center space-x-1.5 cursor-pointer"
              >
                <Github className="w-3.5 h-3.5 text-[#2aa198]" />
                <span>GitHub Repos</span>
                <ExternalLink className="w-3 h-3 text-[#2aa198]" />
              </a>

              <a
                href={`mailto:${profileData.email}`}
                className="px-4 py-2 rounded-xl bg-[#073642] hover:bg-[#073642]/80 text-[#eee8d5] text-xs font-bold transition-all border border-[#2aa198]/40 flex items-center space-x-1.5 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[#859900]" />
                <span>Email Developer</span>
              </a>
            </div>
          </div>
        )}

        {activeTab === 'report' && (
          <div className="space-y-5">
            <div className="flex items-center space-x-2 border-b border-[#2aa198]/20 pb-3">
              <Info className="w-5 h-5 text-[#268bd2]" />
              <h2 className="text-lg font-bold text-[#eee8d5]">Full System Bio & Technical Report</h2>
            </div>

            <div className="p-4 rounded-xl bg-[#073642] border border-[#2aa198]/30 space-y-3 text-xs leading-relaxed text-[#93a1a1]">
              <p className="font-medium text-[#eee8d5]">{profileData.bio}</p>
              <p>
                Specialized in architecting high-throughput distributed backends, ultra-responsive React client user interfaces, and cloud infrastructure pipelines on GCP and AWS.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2aa198] font-mono block">
                Engineering Highlights
              </span>
              <div className="grid sm:grid-cols-2 gap-3 text-xs">
                {profileData.stats.map((stat, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#073642] border border-[#2aa198]/30 space-y-1">
                    <span className="text-[10px] text-[#586e75] uppercase font-mono block">{stat.label}</span>
                    <span className="text-base font-bold text-[#b58900] font-mono">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'storage' && (
          <div className="space-y-5">
            <div className="flex items-center space-x-2 border-b border-[#2aa198]/20 pb-3">
              <HardDrive className="w-5 h-5 text-[#b58900]" />
              <h2 className="text-lg font-bold text-[#eee8d5]">System Storage & Memory Allocation</h2>
            </div>

            {/* macOS Bar Meter */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[#93a1a1]">
                <span>Memory Allocation (64 GB Total)</span>
                <span className="text-[#859900] font-mono font-bold">12 GB Free</span>
              </div>
              <div className="h-4 rounded-full bg-[#002b36] overflow-hidden flex p-0.5 border border-[#2aa198]/30">
                <div className="h-full bg-[#268bd2] rounded-l-full w-[45%]" title="Frontend (45%)" />
                <div className="h-full bg-[#2aa198] w-[30%]" title="Backend & Go (30%)" />
                <div className="h-full bg-[#6c71c4] w-[15%]" title="Cloud & DevOps (15%)" />
                <div className="h-full bg-[#073642] rounded-r-full w-[10%]" title="Free Space" />
              </div>
              <div className="flex flex-wrap gap-4 pt-2 text-[11px] text-[#93a1a1] font-mono">
                <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#268bd2] mr-1.5" /> React & Frontend (45%)</span>
                <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#2aa198] mr-1.5" /> Go & Node Backend (30%)</span>
                <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#6c71c4] mr-1.5" /> GCP / Docker / CI/CD (15%)</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'updates' && (
          <div className="space-y-5">
            <div className="flex items-center space-x-2 border-b border-[#2aa198]/20 pb-3">
              <RefreshCw className="w-5 h-5 text-[#859900]" />
              <h2 className="text-lg font-bold text-[#eee8d5]">Software Update Center</h2>
            </div>

            <div className="p-5 rounded-2xl bg-[#073642] border border-[#2aa198]/30 space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-bold text-[#eee8d5] text-sm">Odmandakh OS 15.4 (2026.08 Build)</h3>
                <p className="text-xs text-[#93a1a1]">
                  Includes security enhancements, performance boosts, and updated project repositories.
                </p>
                {updateStatus && (
                  <p className="text-xs text-[#2aa198] font-semibold pt-1 flex items-center gap-1 justify-center sm:justify-start font-mono">
                    <Check className="w-3.5 h-3.5 text-[#859900]" />
                    <span>{updateStatus}</span>
                  </p>
                )}
              </div>

              <button
                onClick={handleCheckUpdates}
                disabled={checkingUpdates}
                className="px-4 py-2 rounded-xl bg-[#859900] hover:bg-[#859900]/90 text-[#002b36] disabled:opacity-50 text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer flex items-center space-x-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${checkingUpdates ? 'animate-spin' : ''}`} />
                <span>{checkingUpdates ? 'Checking...' : 'Check for Updates'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer info bar */}
        <div className="pt-3 border-t border-[#2aa198]/20 flex justify-between items-center text-[10px] font-mono text-[#586e75]">
          <span>Odmandakh OS Settings • Build 2026.08</span>
          <span>Apple M3 Max Architecture</span>
        </div>
      </div>
    </div>
  );
};
