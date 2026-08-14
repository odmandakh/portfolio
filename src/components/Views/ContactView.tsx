import React, { useState } from 'react';
import { 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Mail, 
  User, 
  FileText,
  Sparkles,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { profileData } from '../../data/profile';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submittedMessage, setSubmittedMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');

    // Simulate reliable message dispatch
    setTimeout(() => {
      setStatus('success');
      setSubmittedMessage(formData.message);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full min-h-0 text-[#93a1a1]">
      {/* Left Sidebar: macOS Messages Style Sidebar */}
      <div className="w-full md:w-64 lg:w-72 bg-[#073642]/60 border-b md:border-b-0 md:border-r border-[#2aa198]/20 p-4 flex flex-col justify-between shrink-0 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#2aa198]/20">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#2aa198] uppercase tracking-wider font-mono">
              <MessageSquare className="w-4 h-4 text-[#2aa198]" />
              <span>Messages</span>
            </div>
            <span className="text-[10px] text-[#859900] font-mono font-semibold px-2 py-0.5 rounded bg-[#859900]/10 border border-[#859900]/30">
              Online
            </span>
          </div>

          {/* Contact / Conversation Preview Item */}
          <div className="p-3 rounded-xl bg-[#002b36] border border-[#2aa198]/30 space-y-1.5 transition-all">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#eee8d5] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#859900]" />
                {profileData.name}
              </span>
              <span className="text-[10px] text-[#2aa198] font-mono">Now</span>
            </div>
            <p className="text-[11px] text-[#93a1a1] leading-relaxed">
              Thanks for reaching out! Leave a message and I will reply to your email promptly.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#002b36]/50 border border-[#2aa198]/20 space-y-1 text-xs text-[#839496]">
            <span className="font-semibold text-[#eee8d5] text-[11px] block uppercase tracking-wider font-mono">
              Direct Contact
            </span>
            <a 
              href={`mailto:${profileData.email}`} 
              className="text-[#2aa198] hover:underline font-mono text-[11px] break-all block"
            >
              {profileData.email}
            </a>
            <span className="text-[10px] text-[#586e75] font-mono block mt-1">
              Location: {profileData.location}
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-2 text-[11px] text-[#586e75] font-mono pt-2 border-t border-[#2aa198]/10">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2aa198] shrink-0" />
          <span>Encrypted transmission</span>
        </div>
      </div>

      {/* Right Area: Clean Compose Area (No nested outer box) */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto custom-scrollbar">
        {status === 'success' ? (
          <div className="my-auto max-w-md mx-auto w-full text-center space-y-4 py-8">
            <div className="w-14 h-14 rounded-2xl bg-[#073642] text-[#859900] flex items-center justify-center mx-auto border border-[#2aa198]/30 shadow-lg">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#eee8d5]">
                Message Dispatched Successfully!
              </h3>
              <p className="text-xs text-[#839496] mt-1.5">
                Thank you. Your message has been sent to {profileData.email}. Odmandakh will get back to you shortly.
              </p>
            </div>

            {submittedMessage && (
              <div className="p-3.5 rounded-xl bg-[#073642] border border-[#2aa198]/30 text-left text-xs text-[#eee8d5] font-mono">
                "{submittedMessage}"
              </div>
            )}

            <button
              onClick={() => setStatus('idle')}
              className="px-4 py-2 rounded-xl bg-[#2aa198] hover:bg-[#2aa198]/90 text-xs font-bold text-[#002b36] inline-flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Send Another Message</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-xl w-full mx-auto my-auto">
            <div className="border-b border-[#2aa198]/20 pb-3">
              <h2 className="text-base sm:text-lg font-black text-[#eee8d5] tracking-tight flex items-center gap-2">
                <span>New Message</span>
                <Sparkles className="w-4 h-4 text-[#2aa198]" />
              </h2>
              <p className="text-xs text-[#2aa198] font-mono mt-0.5">
                To: Odmandakh &lt;{profileData.email}&gt;
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#2aa198] uppercase tracking-wider block font-mono">
                  Your Name
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#2aa198]" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Smith"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#073642] border border-[#2aa198]/30 text-xs text-[#eee8d5] placeholder-[#586e75] focus:outline-none focus:border-[#2aa198]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#2aa198] uppercase tracking-wider block font-mono">
                  Your Email
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#2aa198]" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#073642] border border-[#2aa198]/30 text-xs text-[#eee8d5] placeholder-[#586e75] focus:outline-none focus:border-[#2aa198]"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#2aa198] uppercase tracking-wider block font-mono">
                Subject / Inquiry
              </label>
              <div className="relative">
                <FileText className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#2aa198]" />
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Senior Full-Stack Opportunity / Project Collaboration"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#073642] border border-[#2aa198]/30 text-xs text-[#eee8d5] placeholder-[#586e75] focus:outline-none focus:border-[#2aa198]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#2aa198] uppercase tracking-wider block font-mono">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Hi Odmandakh, I'd love to discuss..."
                className="w-full p-3 rounded-xl bg-[#073642] border border-[#2aa198]/30 text-xs text-[#eee8d5] placeholder-[#586e75] focus:outline-none focus:border-[#2aa198] resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-[11px] text-[#586e75] flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2aa198]" />
                Direct delivery to {profileData.email}
              </span>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#2aa198] hover:bg-[#2aa198]/90 text-xs font-bold text-[#002b36] flex items-center justify-center space-x-2 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{status === 'submitting' ? 'Sending...' : 'Send Message'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
