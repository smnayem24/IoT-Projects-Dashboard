"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ProjectDashboard from "@/components/ProjectDashboard";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "@/types/types";

export default function Home() {
  const projects = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleAddProject = async (name: string, description: string) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });
      if (!response.ok) {
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
        <ProjectDashboard selectedProject={selectedProject} />
      </main>
    </div>
  );
}