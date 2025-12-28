'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { API_BASE_URL } from '../utils/api';
import { 
  Folder, 
  Plus, 
  Pencil, 
  Trash2, 
  Loader2, 
  X,
  FileCode,
  ArrowRight,
  ArrowLeft,
  Share2,
  Copy,
  Check
} from 'lucide-react';

interface Project {
  id: number;
  name: string;
  description: string;
  userId: string;
  createdAt: string;
}

interface Explanation {
  id: string;
  fileName: string;
  language: string;
  createdAt: string;
  projectId?: number;
  isPublic?: boolean;
  publicShareId?: string;
}

export default function ProjectsView() {
  const router = useRouter();
  
  // Projects List State
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');

  // Delete confirmation modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  // Selected Project State (History View)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectExplanations, setProjectExplanations] = useState<Explanation[]>([]);
  const [loadingExplanations, setLoadingExplanations] = useState(false);

  // Share Modal State
  const [shareModalData, setShareModalData] = useState<{link: string, id: string} | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  // --- Data Fetching ---

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;
      
      const res = await axios.get(`${API_BASE_URL}/projects/get`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(res.data.projects || []);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setLoadingProjects(false);
    }
  };

  const fetchProjectExplanations = async (projectId: number) => {
    setLoadingExplanations(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.get(`${API_BASE_URL}/explainations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const allExplanations = res.data.explanations || res.data || [];
      const filtered = allExplanations.filter((ex: any) => String(ex.projectId) === String(projectId));
      
      setProjectExplanations(filtered);
    } catch (error) {
      console.error("Failed to fetch project analyses", error);
    } finally {
      setLoadingExplanations(false);
    }
  };

  // --- Project Actions ---

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.post(`${API_BASE_URL}/projects/create`, {
        name: projectName,
        description: projectDesc
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setProjects(prev => [res.data.project, ...prev]);
      closeModal();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to create project");
    }
  };

  const handleEditProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProject) return;

    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.put(`${API_BASE_URL}/projects/edit/${currentProject.id}`, {
        name: projectName,
        description: projectDesc
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setProjects(prev => prev.map(p => p.id === currentProject.id ? res.data.project : p));
      closeModal();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to update project");
    }
  };

  // Open the themed delete confirmation modal
  const openDeleteModal = (project: Project, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setProjectToDelete(project);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setProjectToDelete(null);
    setShowDeleteModal(false);
  };

  const confirmDeleteProject = async () => {
    if (!projectToDelete) return;
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`${API_BASE_URL}/projects/delete/${projectToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
      if (selectedProject?.id === projectToDelete.id) handleBackToProjects();
    } catch (error: any) {
      alert("Failed to delete project");
    } finally {
      closeDeleteModal();
    }
  }; 

  const handleShare = async (e: React.MouseEvent, explanationId: string) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.patch(`${API_BASE_URL}/explainations/${explanationId}/share`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const shareId = res.data.shareId || res.data.explanation?.publicShareId || res.data.publicShareId;
      if (shareId) {
        const shareUrl = `${window.location.origin}/share/${shareId}`;
        setShareModalData({ link: shareUrl, id: explanationId });
        setProjectExplanations(prev => prev.map(ex => 
          ex.id === explanationId ? { ...ex, isPublic: true } : ex
        ));
      } else {
        alert("Could not generate share link.");
      }
    } catch (error: any) {
      console.error("Share failed", error);
      alert("Failed to share explanation");
    }
  };

  const copyToClipboard = () => {
    if (shareModalData) {
      navigator.clipboard.writeText(shareModalData.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // --- Handlers ---

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    fetchProjectExplanations(project.id);
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setProjectExplanations([]);
  };

  // Redirect to Home with context
  const handleAnalyzeNew = () => {
    if (selectedProject) {
      // Use window.location to force full redirect to Home page with param
      // Note: router.push('/?projectId=...') might work if Home handles param updates well
      window.location.href = `/?projectId=${selectedProject.id}`;
    }
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setProjectName('');
    setProjectDesc('');
    setShowProjectModal(true);
  };

  const openEditModal = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsEditing(true);
    setCurrentProject(project);
    setProjectName(project.name);
    setProjectDesc(project.description);
    setShowProjectModal(true);
  };

  const closeModal = () => {
    setShowProjectModal(false);
    setCurrentProject(null);
  };

  // --- RENDER ---

  // 1. SELECTED PROJECT VIEW (History Only)
  if (selectedProject) {
    return (
      <div className="w-full max-w-5xl mx-auto h-full flex flex-col animate-in fade-in zoom-in duration-300 pb-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="flex items-start md:items-center gap-3 md:gap-4 w-full">
            <button 
              onClick={handleBackToProjects}
              className="p-2 rounded-full hover:bg-[#111] border border-transparent hover:border-[#333] transition-all text-[#888] hover:text-white"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Folder size={18} className="text-indigo-400" />
                <h1 className="text-lg md:text-xl font-semibold tracking-tight text-white truncate">{selectedProject.name}</h1>
              </div>
              <p className="text-[#888] text-[11px] md:text-xs font-mono mt-1 line-clamp-1">{selectedProject.description}</p>
            </div>
          </div>

          <button 
            onClick={handleAnalyzeNew}
            className="flex items-center gap-2 px-4 md:px-5 py-2 bg-indigo-600 text-white rounded-md text-sm md:text-sm font-medium hover:bg-indigo-500 transition-colors shadow-md md:shadow-lg shadow-indigo-500/20 w-full md:w-auto min-w-[140px] justify-center whitespace-nowrap"
          >
            <Plus size={16} />
            <span className="hidden md:inline">New Analysis</span>
            <span className="md:hidden">Analyze</span>
          </button>
        </div>

        {/* History List */}
        <div className="w-full">
             <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-white">Project Analysis History</h2>
                <span className="text-xs text-[#666] font-mono">{projectExplanations.length} Reports</span>
             </div>

             {loadingExplanations ? (
               <div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#333]" /></div>
             ) : projectExplanations.length === 0 ? (
               <div className="text-center py-16 border border-dashed border-[#333] rounded-lg bg-[#111]/30">
                  <div className="bg-[#111] p-3 rounded-full border border-[#333] inline-block mb-3">
                    <FileCode className="text-[#444] w-6 h-6" />
                  </div>
                  <p className="text-[#888] text-sm font-medium">No analysis reports yet.</p>
                  <p className="text-[#555] text-xs mt-1 mb-4">Upload code to get started with this project.</p>
                  <button 
                    onClick={handleAnalyzeNew}
                    className="text-xs font-mono text-indigo-400 hover:text-indigo-300 hover:underline"
                  >
                    START_ANALYSIS &rarr;
                  </button>
               </div>
             ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projectExplanations.map((item) => (
                    <div 
                      key={item.id} 
                      className="group flex flex-col bg-[#111] border border-[#333] rounded-lg p-4 hover:border-[#666] transition-all"
                    >
                        <div 
                          className="flex items-start gap-4 cursor-pointer mb-3"
                          onClick={() => router.push(`/explanation/${item.id}`)}
                        >
                          <div className="p-2 bg-black rounded border border-[#333] text-indigo-400">
                              <FileCode size={20} />
                          </div>
                          <div>
                              <h4 className="text-sm font-medium text-white mb-0.5">{item.fileName || 'Untitled'}</h4>
                              <p className="text-[10px] text-[#666] font-mono">
                                {new Date(item.createdAt).toLocaleDateString()} • {item.language}
                              </p>
                          </div>
                        </div>

                        <div className="mt-auto pt-3 border-t border-[#333] flex items-center justify-between">
                           <button 
                             onClick={() => router.push(`/explanation/${item.id}`)}
                             className="text-xs font-mono text-white hover:underline flex items-center gap-1"
                           >
                             VIEW REPORT <ArrowRight size={12} />
                           </button>
                           
                           <button 
                             onClick={(e) => handleShare(e, item.id)}
                             className="p-1.5 text-[#666] hover:text-white hover:bg-[#222] rounded transition-colors flex items-center gap-1"
                             title="Share"
                           >
                             <Share2 size={14} />
                             {item.isPublic && <span className="text-[10px] text-indigo-400">Public</span>}
                           </button>
                        </div>
                    </div>
                  ))}
               </div>
             )}
        </div>

        {/* --- SHARE MODAL --- */}
        {shareModalData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md p-4">
             <div className="bg-[#111] border border-[#333] rounded-lg w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="text-white font-medium">Share Analysis</h3>
                   <button onClick={() => setShareModalData(null)} className="text-[#666] hover:text-white"><X size={18} /></button>
                </div>
                <p className="text-xs text-[#888] mb-4">Anyone with this link can view this analysis report.</p>
                
                <div className="flex gap-2">
                   <input 
                     type="text" 
                     readOnly 
                     value={shareModalData.link}
                     className="flex-1 bg-black border border-[#333] rounded px-3 text-xs text-[#ccc] focus:outline-none"
                   />
                   <button 
                     onClick={copyToClipboard}
                     className="p-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition-colors"
                   >
                     {copied ? <Check size={16} /> : <Copy size={16} />}
                   </button>
                </div>
             </div>
          </div>
        )}

        {/* --- DELETE CONFIRMATION MODAL (Selected Project) --- */}
        {showDeleteModal && projectToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md p-4">
            <div className="bg-[#111] border border-[#333] rounded-lg w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95">
              <div className="mb-4">
                <h3 className="text-white font-medium">Delete Project</h3>
              </div>
              <p className="text-sm text-[#888] mb-6">Are you sure you want to delete <strong className="text-white">{projectToDelete.name}</strong>? This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button onClick={closeDeleteModal} className="px-4 py-2 text-sm text-[#888] hover:text-white">Cancel</button>
                <button onClick={confirmDeleteProject} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition-colors">Delete</button>
              </div>
            </div>
          </div>
        )} 

      </div>
    );
  }

  // 2. PROJECT LIST VIEW (Default)
  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col animate-in fade-in zoom-in duration-300 pb-10">
       <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Projects</h1>
            <p className="text-[#888] text-sm font-mono mt-1">Manage your code analysis projects.</p>
          </div>
          <button 
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            <Plus size={16} /> New Project
          </button>
       </div>

       {loadingProjects ? (
         <div className="flex-1 flex items-center justify-center">
            <Loader2 className="animate-spin text-[#333]" size={32} />
         </div>
       ) : projects.length === 0 ? (
         <div className="flex-1 flex flex-col items-center justify-center text-center border-2 border-dashed border-[#333] rounded-lg bg-[#111]/50 p-10">
            <Folder className="text-[#333] w-16 h-16 mb-4" />
            <h3 className="text-white font-medium">No projects found</h3>
            <p className="text-[#888] text-sm mt-1 mb-6">Create your first project to organize your snippets.</p>
            <button 
              onClick={openCreateModal}
              className="px-4 py-2 bg-[#333] text-white rounded hover:bg-[#444] text-sm transition-colors"
            >
              Create Project
            </button>
         </div>
       ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
            {projects.map((project) => (
               <div 
                 key={project.id} 
                 onClick={() => handleProjectClick(project)}
                 className="bg-[#111] border border-[#333] rounded-lg p-5 group hover:border-[#666] transition-colors relative cursor-pointer"
               >
                  <div className="flex justify-between items-start mb-3">
                     <div className="p-2 bg-black rounded border border-[#333]">
                        <Folder size={20} className="text-indigo-400" />
                     </div>
                     <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => openEditModal(project, e)}
                          className="p-1.5 hover:bg-[#333] rounded text-[#888] hover:text-white"
                        >
                          <Pencil size={14} />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteModal(project, e);
                          }}
                          className="p-1.5 hover:bg-[#333] rounded text-[#888] hover:text-red-400"
                        >
                          <Trash2 size={14} />
                        </button> 
                     </div>
                  </div>
                  <h3 className="text-white font-medium mb-1 truncate">{project.name}</h3>
                  <p className="text-[#888] text-xs line-clamp-2 h-8">{project.description}</p>
                  <div className="mt-4 pt-4 border-t border-[#333] flex items-center justify-between">
                     <span className="text-[10px] font-mono text-[#666]">{new Date(project.createdAt).toLocaleDateString()}</span>
                     <button className="text-[10px] font-mono text-indigo-400 hover:underline">OPEN_PROJECT &rarr;</button>
                  </div>
               </div>
            ))}
         </div>
       )}

       {/* --- DELETE CONFIRMATION MODAL (List View) --- */}
       {showDeleteModal && projectToDelete && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md p-4">
           <div className="bg-[#111] border border-[#333] rounded-lg w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95">
             <div className="mb-4">
               <h3 className="text-white font-medium">Delete Project</h3>
             </div>
             <p className="text-sm text-[#888] mb-6">Are you sure you want to delete <strong className="text-white">{projectToDelete.name}</strong>? This action cannot be undone.</p>
             <div className="flex justify-end gap-3">
               <button onClick={closeDeleteModal} className="px-4 py-2 text-sm text-[#888] hover:text-white">Cancel</button>
               <button onClick={confirmDeleteProject} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition-colors">Delete</button>
             </div>
           </div>
         </div>
       )} 

       {/* --- PROJECT MODAL --- */}
       {showProjectModal && (
           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md p-4">
              <div className="bg-[#111] border border-[#333] rounded-lg w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
                 <div className="flex items-center justify-between p-4 border-b border-[#333]">
                    <h3 className="text-white font-medium">{isEditing ? 'Edit Project' : 'New Project'}</h3>
                    <button onClick={closeModal} className="text-[#888] hover:text-white"><X size={18} /></button>
                 </div>
                 <form onSubmit={isEditing ? handleEditProject : handleCreateProject} className="p-6 space-y-4">
                    <div className="space-y-1">
                    <div className="space-y-1">
                       <label className="text-xs font-mono text-[#888] uppercase">Description</label>
                       <textarea 
                         required
                         value={projectDesc}
                         onChange={e => setProjectDesc(e.target.value)}
                         placeholder="What is this project about?"
                         rows={3}
                         className="w-full bg-black border border-[#333] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-white transition-colors resize-none"
                       />
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                       <button 
                         type="button" 
                         onClick={closeModal}
                         className="px-4 py-2 text-sm text-[#888] hover:text-white"
                       >
                         Cancel
                       </button>
                       <button 
                         type="submit"
                         className="px-4 py-2 bg-white text-black text-sm font-medium rounded hover:bg-gray-200"
                       >
                         {isEditing ? 'Save Changes' : 'Create Project'}
                       </button>
                    </div>
                 </div>
                 </form>
              </div>
           </div>
        )}
    </div>
  );
}