'use client';

import Link from 'next/link';
import { 
  Book, 
  FileText, 
  Folder, 
  Share2, 
  Shield, 
  ArrowLeft ,
  Zap
} from 'lucide-react';

export default function Documentation() {
  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-white selection:text-black flex">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-[#333] bg-[#050505] hidden md:flex flex-col fixed inset-y-0">
        <div className="p-6 border-b border-[#333]">
          <Link href="/" className="flex items-center gap-2 font-mono font-bold text-lg">
     <div className="size-6 text-white">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
                <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <h1 className="text-sm font-semibold tracking-tight text-white font-mono">CodeWise</h1>
          </Link>
        </div>
        <nav className="p-4 space-y-1 overflow-y-auto flex-1">
          <div className="pb-4">
            <p className="px-3 text-xs font-mono text-[#666] uppercase mb-2">Getting Started</p>
            <a href="#introduction" className="flex items-center gap-3 px-3 py-2 text-sm text-white bg-[#111] rounded-md"><Book size={16} /> Introduction</a>
            <a href="#quickstart" className="flex items-center gap-3 px-3 py-2 text-sm text-[#888] hover:text-white hover:bg-[#111] rounded-md"><Zap size={16} /> Quick Start</a>
          </div>
          <div className="pb-4">
 
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8 md:p-12 max-w-4xl">
        
        {/* Mobile Header (Only visible on small screens) */}
        <div className="md:hidden mb-8 pb-6 border-b border-[#333]">
           <Link href="/" className="flex items-center gap-2 font-mono font-bold text-sm text-[#888]">
            &larr; Back to App
          </Link>
        </div>

        {/* Content */}
        <div className="space-y-16">
          
          <section id="introduction" className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">Introduction</h1>
            <p className="text-lg text-[#888] leading-relaxed">
              Welcome to the CodeWise documentation. CodeWise is an AI-powered platform designed to help developers analyze, understand, and optimize their codebases efficiently.
            </p>
            <div className="bg-[#111] border-l-4 border-indigo-500 p-6 rounded-r-lg">
              <p className="text-sm text-[#ccc]">
                <strong>Note:</strong> CodeWise currently supports JavaScript, Python, Java, C++, and 8+ other languages.
              </p>
            </div>
          </section>

          <section id="quickstart" className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-[#333] pb-2">Quick Start</h2>
            <p className="text-[#888]">Follow these steps to get your first analysis report:</p>
            <ol className="list-decimal list-inside space-y-4 text-[#ccc] ml-4">
              <li>Create an account at <Link href="/users/signup" className="text-indigo-400 hover:underline">/signup</Link>.</li>
              <li>Navigate to your <strong>Dashboard</strong>.</li>
              <li>Upload a file or paste your code snippet.</li>
              <li>Click <strong>Analyze Code</strong> and wait for the AI processing.</li>
            </ol>
          </section>

          <section id="projects" className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-[#333] pb-2">Projects</h2>
            <p className="text-[#888] leading-relaxed">
              Projects allow you to organize your analyses into folders. This is useful when working on multiple applications or distinct modules.
            </p>
            <ul className="space-y-3 mt-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-[#222] rounded"><Folder size={14} className="text-indigo-400"/></div>
                <span className="text-[#ccc] text-sm">Create unlimited projects from the Projects tab.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-[#222] rounded"><FileText size={14} className="text-indigo-400"/></div>
                <span className="text-[#ccc] text-sm">All analyses performed inside a project are automatically saved to its history.</span>
              </li>
            </ul>
          </section>

          <section id="sharing" className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-[#333] pb-2">Public Sharing</h2>
            <p className="text-[#888] leading-relaxed">
              You can share any analysis report with your team or the public.
            </p>
            <div className="bg-[#111] border border-[#333] rounded-lg p-6">
              <h3 className="text-white font-medium mb-2">How to Share</h3>
              <p className="text-sm text-[#888] mb-4">
                1. Open any completed analysis report.<br/>
                2. Click the <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#222] text-xs"><Share2 size={10}/> Share</span> button in the header.<br/>
                3. Copy the generated link.
              </p>
              <div className="p-3 bg-black rounded border border-[#333] text-xs font-mono text-[#666]">
                https://codewise.app/share/cmjlvg9h800...
              </div>
            </div>
          </section>

        </div>

        <footer className="mt-20 pt-10 border-t border-[#333] text-center text-[#444] text-xs font-mono">
          Documentation v1.0 • Last updated Dec 2025
        </footer>

      </main>
    </div>
  );
}