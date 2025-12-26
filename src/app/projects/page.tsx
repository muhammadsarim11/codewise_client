'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Folder, 
  Plus, 
  Pencil, 
  Trash2, 
  Loader2, 
  X 
} from 'lucide-react';
import Sidebar from '../component/sidebar';

interface Project {
  id: number;
  name: string;
  description: string;
  userId: string;
  createdAt: string;
}

export default function ProjectsView() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  
  // Project Form State
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');

  // User State for Sidebar
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Load user for sidebar display
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;
      
      const res = await axios.get('http://localhost:5000/projects/get', {
   

   headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(res.data.projects || []);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.post('http://localhost:5000/projects/create', {
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
      const res = await axios.put(`http://localhost:5000/projects/edit/${currentProject.id}`, {
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

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:5000/projects/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (error: any) {
      alert("Failed to delete project");
    }
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setProjectName('');
    setProjectDesc('');
    setShowProjectModal(true);
  };

  const openEditModal = (project: Project) => {
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

  return (
    <div className="flex h-screen bg-[#000000] font-sans text-white overflow-hidden selection:bg-white selection:text-black">
       
       {/* Reusable Sidebar - Always visible */}
       <Sidebar activePage="projects" user={user} />

       {/* MAIN CONTENT AREA */}
       <main className="flex-1 flex flex-col relative overflow-hidden bg-[#000000]">
          
          {/* Background Grid Pattern */}
          <div 
            className="absolute inset-0 z-0 pointer-events-none opacity-20" 
            style={{
              backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          {/* Scrollable Container */}
          <div className="flex-1 flex flex-col p-6 z-10 overflow-y-auto">
            <div className="w-full max-w-6xl mx-auto h-full flex flex-col animate-in fade-in zoom-in duration-300">
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
                        <div key={project.id} className="bg-[#111] border border-[#333] rounded-lg p-5 group hover:border-[#666] transition-colors relative">
                            <div className="flex justify-between items-start mb-3">
                              <div className="p-2 bg-black rounded border border-[#333]">
                                  <Folder size={20} className="text-indigo-400" />
                              </div>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button 
                                    onClick={() => openEditModal(project)}
                                    className="p-1.5 hover:bg-[#333] rounded text-[#888] hover:text-white"
                                  >
                                    <Pencil size={14} />
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteProject(project.id)}
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
                              <button className="text-[10px] font-mono text-indigo-400 hover:underline">OPEN_DETAILS &rarr;</button>
                            </div>
                        </div>
                      ))}
                  </div>
                )}
            </div>
          </div>

          {/* --- PROJECT MODAL --- */}
          {showProjectModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                <div className="bg-[#111] border border-[#333] rounded-lg w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between p-4 border-b border-[#333]">
                      <h3 className="text-white font-medium">{isEditing ? 'Edit Project' : 'New Project'}</h3>
                      <button onClick={closeModal} className="text-[#888] hover:text-white"><X size={18} /></button>
                    </div>
                    <form onSubmit={isEditing ? handleEditProject : handleCreateProject} className="p-6 space-y-4">
                      <div className="space-y-1">
                          <label className="text-xs font-mono text-[#888] uppercase">Project Name</label>
                          <input 
                            type="text" 
                            required
                            minLength={3}
                            value={projectName}
                            onChange={e => setProjectName(e.target.value)}
                            placeholder="My Awesome Project"
                            className="w-full bg-black border border-[#333] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-white transition-colors"
                          />
                      </div>
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
                    </form>
                </div>
              </div>
          )}
       </main>
    </div>
  );
}