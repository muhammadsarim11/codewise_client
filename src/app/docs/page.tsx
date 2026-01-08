'use client';

import Link from 'next/link';
import { 
  Book, 
  FileText, 
  Folder, 
  Share2, 
  ArrowLeft,
  Zap,
  LayoutTemplate,
  CheckCircle2,
  Terminal,
  Search
} from 'lucide-react';

export default function Documentation() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30 selection:text-indigo-200 flex overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      {/* Sidebar Navigation */}
      <aside className="w-72 border-r border-white/10 bg-[#050505]/80 backdrop-blur-xl hidden md:flex flex-col fixed inset-y-0 z-20">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3 group">
             <div className="size-8 text-white group-hover:text-indigo-400 transition-colors">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
                <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <div>
                <h1 className="text-sm font-bold tracking-tight text-white font-mono leading-none">CodeWise</h1>
                <span className="text-[10px] text-zinc-500 font-mono">v1.0.0</span>
            </div>
          </Link>
        </div>

        {/* Mock Search */}
        <div className="px-6 pt-4">
            <div className="flex items-center gap-2 bg-zinc-900/50 border border-white/10 rounded-md px-3 py-2 text-sm text-zinc-500">
                <Search size={14} />
                <span>Search docs...</span>
                <span className="ml-auto text-[10px] border border-zinc-700 px-1 rounded">⌘K</span>
            </div>
        </div>

        <nav className="p-6 space-y-8 overflow-y-auto flex-1 custom-scrollbar">
          <div>
            <p className="px-2 text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Start Here</p>
            <div className="space-y-1">
                <a href="#introduction" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white bg-white/5 border border-white/5 rounded-lg transition-all"><Book size={16} className="text-indigo-400" /> Introduction</a>
                <a href="#quickstart" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"><Zap size={16} /> Quick Start</a>
            </div>
          </div>
          
          <div>
            <p className="px-2 text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Core Modules</p>
            <div className="space-y-1">
                <a href="#projects" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"><Folder size={16} /> Projects</a>
                <a href="#autodocs" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"><LayoutTemplate size={16} /> Automated Docs</a>
                <a href="#sharing" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"><Share2 size={16} /> Sharing</a>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 relative z-10 h-screen overflow-y-auto scroll-smooth">
        
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 bg-black/80 backdrop-blur border-b border-white/10 p-4 z-50">
           <Link href="/" className="flex items-center gap-2 font-mono font-bold text-sm text-zinc-400 hover:text-white">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>

        <div className="max-w-5xl mx-auto p-6 md:p-16 space-y-24 pb-32">
          
          {/* HERO SECTION */}
          <section id="introduction" className="space-y-6 relative">
            {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Documentation Updated
            </div> */}
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
              Master Your Codebase <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">With AI Intelligence.</span>
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
              CodeWise isn't just an analyzer; it's your automated documentation architect. Transform raw code into structured, professional insights in seconds.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
                <a href="#quickstart" className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors">
                    Get Started
                </a>
                <a href="/" className="px-6 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-colors">
                    Open Dashboard
                </a>
            </div>
          </section>

          {/* QUICK START - STEPS LAYOUT */}
          <section id="quickstart" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400"><Zap size={24}/></span>
                Quick Start
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { step: "01", title: "Sign Up", desc: "Create your free account to unlock project history.", link: "/users/signup" },
                    { step: "02", title: "Upload Code", desc: "Paste a snippet or upload a file directly to the dashboard.", link: "/" },
                    { step: "03", title: "AI Analysis", desc: "Get instant complexity scores, logic flows, and docs.", link: "/" },
                ].map((item, i) => (
                    <div key={i} className="group relative bg-zinc-900/40 border border-white/10 p-6 rounded-2xl hover:border-indigo-500/50 hover:bg-zinc-900/60 transition-all duration-300">
                        <div className="text-4xl font-black text-white/5 group-hover:text-indigo-500/10 mb-4 absolute top-4 right-6 transition-colors">
                            {item.step}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{item.desc}</p>
                        <Link href={item.link} className="text-indigo-400 text-sm font-medium hover:text-indigo-300 flex items-center gap-1">
                            Action &rarr;
                        </Link>
                    </div>
                ))}
            </div>
          </section>

          {/* PROJECTS FEATURE */}
          <section id="projects" className="scroll-mt-24">
             <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                {/* Decoration */}
                <div className="absolute top-0 right-0 bg-white/5 w-64 h-64 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                        <Folder size={28} className="text-indigo-400" />
                        Smart Projects
                    </h2>
                    <p className="text-zinc-400 text-lg mb-8 max-w-2xl">
                        Stop losing track of your snippets. Projects act as containers for your analyses, keeping related files organized and accessible.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3 bg-black/40 p-4 rounded-xl border border-white/5">
                            <CheckCircle2 size={20} className="text-emerald-500 mt-0.5" />
                            <div>
                                <h4 className="text-white font-medium">Unlimited Workspace</h4>
                                <p className="text-zinc-500 text-sm">Create as many projects as you need.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 bg-black/40 p-4 rounded-xl border border-white/5">
                            <CheckCircle2 size={20} className="text-emerald-500 mt-0.5" />
                            <div>
                                <h4 className="text-white font-medium">Auto-Save History</h4>
                                <p className="text-zinc-500 text-sm">Every analysis is stored automatically.</p>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          </section>

          {/* AUTOMATED DOCS (HIGHLIGHT) */}
          <section id="autodocs" className="scroll-mt-24">
            <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1 space-y-6">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <span className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400"><LayoutTemplate size={24}/></span>
                        Automated Documentation
                    </h2>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                        The crown jewel of CodeWise. Generate a full static documentation site for your project with a single click.
                    </p>
                    <ul className="space-y-4">
                        {[
                            "AI-Structured Hierarchy (Core, API, Utils)",
                            "Deep-Dive Logic Explanation",
                            "Export to PDF & Markdown"
                        ].map((feat, i) => (
                            <li key={i} className="flex items-center gap-3 text-zinc-300">
                                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
                                {feat}
                            </li>
                        ))}
                    </ul>
                    <div className="pt-4">
                        <div className="inline-block bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-xs font-mono text-zinc-400">
                            Project &gt; Docs Tab &gt; <span className="text-white">Generate Docs</span>
                        </div>
                    </div>
                </div>
                
                {/* Visual Representation */}
                <div className="flex-1 w-full">
                    <div className="relative bg-[#0F0F0F] border border-zinc-800 rounded-xl p-6 shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
                        <div className="absolute -top-3 -left-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded shadow-lg">NEW FEATURE</div>
                        <div className="space-y-3 opacity-60">
                            <div className="h-4 w-1/3 bg-zinc-700 rounded"></div>
                            <div className="h-2 w-full bg-zinc-800 rounded"></div>
                            <div className="h-2 w-5/6 bg-zinc-800 rounded"></div>
                            <div className="h-2 w-4/6 bg-zinc-800 rounded"></div>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <div className="h-8 w-24 bg-zinc-800 rounded"></div>
                            <div className="h-8 w-24 bg-indigo-900/30 border border-indigo-500/30 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* SHARING SECTION */}
          <section id="sharing" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6 border-b border-white/10 pb-4">Sharing & Collaboration</h2>
            <div className="bg-zinc-900/20 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                    <p className="text-zinc-400 mb-6">
                        Need to explain a complex function to a teammate? Generate a public link for any analysis report.
                    </p>
                    <div className="bg-black border border-zinc-800 rounded-lg p-4 flex items-center justify-between gap-4 max-w-md">
                        <code className="text-xs text-indigo-300 truncate">https://codewise.app/share/x9s8d...</code>
                        <button className="text-zinc-500 hover:text-white"><Share2 size={14}/></button>
                    </div>
                </div>
                <div className="flex-1 flex justify-center">
                    <div className="bg-indigo-500/10 p-6 rounded-full border border-indigo-500/20">
                        <Share2 size={48} className="text-indigo-400" />
                    </div>
                </div>
            </div>
          </section>

        </div>

        <footer className="border-t border-white/5 py-12 text-center">
          <p className="text-zinc-600 text-sm font-mono mb-2">Built for Developers, by Developers.</p>
          <p className="text-zinc-700 text-xs">© 2026 CodeWise Inc. All rights reserved.</p>
        </footer>

      </main>
    </div>
  );
}