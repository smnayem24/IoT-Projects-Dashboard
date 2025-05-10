'use client';

import { useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { Project } from '@/types/Project';
import { ProjectDashboard } from '@/components/ProjectDashboard';
import { ProjectService } from '@/services/projectService';
import { useAuth } from '@/contexts/AuthContext';
import { ProjectCreationModal } from '@/components/modal/ProjectCreationModal';

export default function DashboardPage() {
  const { user } = useAuth();
  const projects = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);  const handleAddProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'widgets'>) => {
    try {
      if (!user) {
        throw new Error('User not authenticated');
      }      await ProjectService.createProject(user.uid, {
        ...projectData,
        owner: user.email || 'unknown',
        widgets: [], // Widgets will be added later in the dashboard
        createdAt: new Date(),
        updatedAt: new Date(),
        isSimulation: projectData.isSimulation || false,
        connectionStatus: 'disconnected',
        config: projectData.config || {}
      });
      
      setIsAddProjectModalOpen(false); // Close modal after successful creation
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project. Please try again.'); // Basic error feedback
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My IoT Projects</h1>
        <button
          onClick={() => setIsAddProjectModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create New Project
        </button>
      </div>

      {selectedProject ? (
        <ProjectDashboard selectedProject={selectedProject} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p className="text-gray-600">{project.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                {project.deviceId ? 'Connected' : 'No device connected'}
              </div>
            </div>          ))}
        </div>
      )}

      {isAddProjectModalOpen && (
        <ProjectCreationModal
          isOpen={isAddProjectModalOpen}
          onClose={() => setIsAddProjectModalOpen(false)}
          onAddProject={handleAddProject}
        />
      )}
    </div>
  );
}
