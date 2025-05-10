"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { ProjectDashboard } from "@/components/ProjectDashboard";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "@/types/Project";


export default function Home() {
  const projects = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleAddProject = async (name: string, description: string, initialData: Record<string, any> = {}) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, widgets: [], deviceId: null, owner: 'user@example.com', isSimulation: false, connectionStatus: 'disconnected', lastDataUpdate: null, config: {} }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error('Failed to add project');
      }
      const newProject = await response.json();
      console.log('New project added:', newProject);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar
        projects={projects}
        selectedProject={selectedProject}
        onSelectProject={setSelectedProject}
        onAddProject={handleAddProject}
      />
      <main className="flex-1 p-4 md:overflow-y-auto">
        {selectedProject ? (
          <ProjectDashboard selectedProject={selectedProject} />
        ) : (
          <div className="text-center text-gray-500">Select a project to view its dashboard</div>
        )}
      </main>
    </div>
  );
}