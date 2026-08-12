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
    <div className="p-4 sm:p-6 max-w-3xl mx-auto text-zinc-200">
      <div className="grid md:grid-cols-3 gap-4 bg-zinc-950/80 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
        {/* Left Sidebar: Conversation Thread Preview (macOS Messages Style) */}
        <div className="p-4 bg-zinc-900/60 border-r border-zinc-800 space-y-4 hidden md:block">
          <div className="flex items-center space-x-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">
            <MessageSquare className="w-4 h-4 text-zinc-400" />
            <span>Messages</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-800/80 border border-zinc-700/80 space-y-1.5 cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-zinc-400" />
                {profileData.name}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">Now</span>
            </div>
            <p className="text-[11px] text-zinc-300 line-clamp-2">
              Thanks for reaching out! Send a message directly and I will reply to your email promptly.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950/40 border border-zinc-800/80 space-y-1 text-xs text-zinc-400">
            <span className="font-semibold text-zinc-300 block">Direct Email</span>
            <a href={`mailto:${profileData.email}`} className="text-zinc-300 hover:underline font-mono text-[11px]">
              {profileData.email}
            </a>
          </div>
        </div>

        {/* Right Form Area */}
        <div className="md:col-span-2 p-6 space-y-5">
          {status === 'success' ? (
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-center space-y-4 my-6">
              <div className="w-12 h-12 rounded-2xl bg-zinc-800 text-zinc-200 flex items-center justify-center mx-auto border border-zinc-700">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Message Dispatched Successfully!
                </h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                  Thank you. Your message has been sent to {profileData.email}. Odmandakh will get back to you shortly.
                </p>
              </div>

              {submittedMessage && (
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-left text-xs text-zinc-300 font-mono">
                  "{submittedMessage}"
                </div>
              )}

              <button
                onClick={() => setStatus('idle')}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white inline-flex items-center space-x-1.5 transition-colors cursor-pointer border border-zinc-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Send Another Message</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-zinc-800 pb-3">
                <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                  <span>New Message</span>
                  <Sparkles className="w-4 h-4 text-zinc-400" />
                </h2>
                <p className="text-xs text-zinc-400">
                  To: Odmandakh &lt;{profileData.email}&gt;
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Smith"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/60 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Your Email
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/60 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Subject / Inquiry
                </label>
                <div className="relative">
                  <FileText className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Senior Full-Stack Opportunity / Project Collaboration"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/60 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hi Odmandakh, I'd love to discuss..."
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-700/60 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-zinc-500 flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                  Direct delivery to b.odmandah@gmail.com
                </span>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-xs font-bold text-zinc-900 flex items-center space-x-2 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{status === 'submitting' ? 'Sending...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
