'use client';

import Link from 'next/link';
import { 
  ArrowRight, 
  Code2, 
  Cpu, 
  Share2, 
  Zap, 
  ShieldCheck, 
  Globe 
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-white selection:text-black">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl opacity-30"></div>
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Navbar */}
      <header className="relative z-10 border-b border-[#333]">
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
        <section className="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#333] bg-[#111] text-xs font-mono text-[#888] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            v1.0 Now Available
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 animate-in fade-in slide-in-from-bottom-6 duration-700">
            Understand Code <br/> in Seconds.
          </h1>
          <p className="text-lg text-[#888] mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700">
            AI-powered code analysis for developers. Upload any snippet or file, 
            and get an instant breakdown of logic, complexity, and improvements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <Link 
              href="/users/signup"
              className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              Start Analyzing <ArrowRight size={18} />
            </Link>
            <Link 
              href="/docs"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#111] hover:bg-[#222] border border-[#333] text-white rounded-md font-medium transition-all flex items-center justify-center gap-2"
            >
              Read Documentation
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 px-6 border-t border-[#333] bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">Everything you need to <br/> master your codebase.</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="p-6 rounded-xl border border-[#333] bg-[#111] hover:border-[#555] transition-colors group">
                <div className="w-12 h-12 bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Cpu className="text-indigo-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Deep Analysis</h3>
                <p className="text-[#888] text-sm leading-relaxed">
                  Our AI breaks down complex functions into plain English, explaining logic flow and edge cases instantly.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-6 rounded-xl border border-[#333] bg-[#111] hover:border-[#555] transition-colors group">
                <div className="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="text-purple-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Refactoring</h3>
                <p className="text-[#888] text-sm leading-relaxed">
                  Get actionable suggestions to improve time complexity, readability, and performance.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-6 rounded-xl border border-[#333] bg-[#111] hover:border-[#555] transition-colors group">
                <div className="w-12 h-12 bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Share2 className="text-emerald-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Public Sharing</h3>
                <p className="text-[#888] text-sm leading-relaxed">
                  Generate secure public links for your analyses to share with teammates or include in documentation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 px-6 text-center border-t border-[#333]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to optimize your workflow?</h2>
            <p className="text-[#888] mb-8">Join thousands of developers using CodeWise to write better code, faster.</p>
            <Link 
              href="/users/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
            >
              Get Started for Free
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#333] bg-[#050505] py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="size-6 text-white">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
                <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <h1 className="text-sm font-semibold tracking-tight text-white font-mono">CodeWise</h1>
            <p className="text-[#444] text-xs">© 2025 CodeWise. All rights reserved.</p>
            </div>
        
          </div>
        </footer>

      </main>
    </div>
  );
}