'use client';

import Link from 'next/link';
import { 
  ArrowRight, 
  Code2, 
  Cpu, 
  Share2, 
  Zap, 
  ShieldCheck, 
  Globe,
  Users
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      
      {/* --- GUARANTEED STYLES FOR ANIMATIONS & GRID --- */}
      <style dangerouslySetInnerHTML={{__html: `
        /* 1. Background Grid Pattern */
        .bg-grid-pattern {
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
        }

        /* 2. Blob Floating Animation */
        @keyframes float {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: float 10s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }

        /* 3. Page Entry Animations (Fade & Slide) */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .reveal-1 { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
        .reveal-2 { animation: fadeInUp 0.8s ease-out 0.2s forwards; opacity: 0; }
        .reveal-3 { animation: fadeInUp 0.8s ease-out 0.4s forwards; opacity: 0; }
        .reveal-4 { animation: fadeInUp 0.8s ease-out 0.6s forwards; opacity: 0; }
      `}} />

      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Animated Color Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[100px] animate-blob mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-screen" />
        
        {/* The Grid Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.4]" />
      </div>

      {/* Navbar */}
      <header className="relative z-10 border-b border-[#333]/50 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
           <div className="size-6 text-white">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
                <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <h1 className="text-sm font-semibold tracking-tight text-white font-mono">CodeWise</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#888]">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>

          </nav>
          <div className="flex items-center gap-4">
            <Link 
              href="/users/signin" 
              className="text-sm font-medium text-[#ccc] hover:text-white transition-colors"
            >
              Log in
            </Link>
            <Link 
              href="/users/signup" 
              className="text-sm font-medium bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        
        {/* Hero Section */}
        <section className="pt-32 pb-24 px-6 text-center max-w-5xl mx-auto relative">
          
          {/* Badge */}
          <div className="reveal-1 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#333] bg-[#111]/50 backdrop-blur-sm text-xs font-mono text-[#888] mb-8 ring-1 ring-white/5 hover:ring-indigo-500/50 transition-all cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            v1.0 Now Available
          </div>

          {/* Headline */}
          <h1 className="reveal-2 text-5xl md:text-8xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500">
            Understand Code <br/> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">in Seconds.</span>
          </h1>

          {/* Subheadline */}
          <p className="reveal-3 text-lg md:text-xl text-[#888] mb-12 max-w-2xl mx-auto leading-relaxed">
            AI-powered code analysis for modern developers. Upload any snippet, file, or repo
            and get an instant breakdown of logic, complexity, and improvements.
          </p>

          {/* CTA Buttons */}
          <div className="reveal-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/users/signup"
              className="group relative w-full sm:w-auto px-8 py-3.5 bg-white text-black rounded-lg font-semibold transition-all hover:scale-105 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                Start Analyzing <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link 
              href="/docs"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#111]/80 hover:bg-[#222] border border-[#333] text-white rounded-lg font-medium transition-all hover:border-[#555] flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              Read Documentation
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 px-6 border-t border-[#333]/50 bg-[#050505]/50 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 reveal-1">
               <h2 className="text-3xl md:text-4xl font-bold mb-4">Master your codebase</h2>
               <p className="text-[#666]">Everything you need to ship faster and safer.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="p-8 rounded-2xl border border-[#333] bg-[#0a0a0a] hover:bg-[#111] hover:border-[#444] transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-all" />
                <div className="w-12 h-12 bg-[#1a1a1a] rounded-xl border border-[#333] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Cpu className="text-indigo-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Deep Analysis</h3>
                <p className="text-[#888] text-sm leading-relaxed">
                  Our AI models break down complex functions into plain English, explaining logic flow and edge cases instantly.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-8 rounded-2xl border border-[#333] bg-[#0a0a0a] hover:bg-[#111] hover:border-[#444] transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/20 transition-all" />
                <div className="w-12 h-12 bg-[#1a1a1a] rounded-xl border border-[#333] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="text-purple-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Smart Refactoring</h3>
                <p className="text-[#888] text-sm leading-relaxed">
                  Get actionable code improvements. We spot inefficiencies (O(n²) vs O(n)) and suggest cleaner alternatives.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-8 rounded-2xl border border-[#333] bg-[#0a0a0a] hover:bg-[#111] hover:border-[#444] transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-all" />
                <div className="w-12 h-12 bg-[#1a1a1a] rounded-xl border border-[#333] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Share2 className="text-emerald-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Public Sharing</h3>
                <p className="text-[#888] text-sm leading-relaxed">
                  Generate secure, read-only links for your analyses. Perfect for code reviews, documentation, or asking for help.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-24 px-6 bg-black relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-indigo-900/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h2 className="text-3xl font-bold mb-6">Streamlined Workflow</h2>
            <p className="text-[#888] mb-12 max-w-2xl mx-auto">Upload or paste your code, and let CodeWise provide instant, actionable analysis.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-[#111] rounded-2xl border border-[#333] flex items-center justify-center mb-6 shadow-2xl shadow-black">
                  <Code2 className="text-indigo-400" size={28} />
                </div>
                <h3 className="font-semibold text-lg mb-2">1. Upload</h3>
                <p className="text-[#666] text-sm max-w-xs">Attach files or paste snippets directly into the editor.</p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-[#111] rounded-2xl border border-[#333] flex items-center justify-center mb-6 shadow-2xl shadow-black relative">
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                  <Cpu className="text-purple-400" size={28} />
                </div>
                <h3 className="font-semibold text-lg mb-2">2. Analyze</h3>
                <p className="text-[#666] text-sm max-w-xs">Our models analyze complexity, security, and logic.</p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-[#111] rounded-2xl border border-[#333] flex items-center justify-center mb-6 shadow-2xl shadow-black">
                  <Share2 className="text-emerald-400" size={28} />
                </div>
                <h3 className="font-semibold text-lg mb-2">3. Share</h3>
                <p className="text-[#666] text-sm max-w-xs">Export summaries to PDF or create shareable links.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why CodeWise */}
        <section className="py-24 px-6 border-t border-[#333]/50 bg-[#050505]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold mb-4">Why developers choose us</h2>
               <p className="text-[#666]">Built for speed, accuracy, and collaboration.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-[#0a0a0a] border border-[#222]">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="text-emerald-400" size={20} />
                  <h3 className="font-semibold">Accurate Explanations</h3>
                </div>
                <p className="text-[#888] text-sm">Models tuned for code semantics produce precise, line-level breakdowns of what your code actually does.</p>
              </div>

              <div className="p-6 rounded-xl bg-[#0a0a0a] border border-[#222]">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="text-indigo-400" size={20} />
                  <h3 className="font-semibold">Built for Teams</h3>
                </div>
                <p className="text-[#888] text-sm">Standardize code reviews by generating objective complexity reports and refactoring suggestions.</p>
              </div>

              <div className="p-6 rounded-xl bg-[#0a0a0a] border border-[#222]">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="text-blue-400" size={20} />
                  <h3 className="font-semibold">Multi-Language</h3>
                </div>
                <p className="text-[#888] text-sm">From Python and JS to Rust and Go. We support the modern stack out of the box.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Language Ticker */}
        <section className="py-10 border-y border-[#333] bg-black overflow-hidden">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#444] text-xs font-mono uppercase tracking-widest mb-6">Trusted for</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-mono text-[#666]">
              {['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'Java', 'C++', 'PHP', 'Ruby'].map((lang) => (
                <span key={lang} className="px-4 py-2 rounded border border-[#222] bg-[#0a0a0a] hover:border-[#444] hover:text-[#aaa] transition-colors cursor-default">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-32 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/10 to-transparent pointer-events-none" />
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Start optimizing today.</h2>
            <p className="text-[#888] text-lg mb-10">Stop guessing. Start optimizing. Join the CodeWise revolution.</p>
            <Link 
              href="/users/signup"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
            >
              Get Started for Free
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#333] bg-black py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="size-6 text-[#666]">
                <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
                  <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
              </div>
              <span className="font-mono font-semibold text-[#888]">CodeWise</span>
              <p className="text-[#444] text-xs ml-4">© 2025 CodeWise. All rights reserved.</p>
            </div>
            
            
          </div>
        </footer>

      </main>
    </div>
  );
}