"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ProjectDashboard from "@/components/ProjectDashboard";
import { Project } from "@/types/types";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: "Project 1" },
    { id: 2, name: "Project 2" },
    { id: 3, name: "Project 3" },
  ]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleAddProject = () => {
    const newProject: Project = {
      id: projects.length + 1,
      name: `New Project ${projects.length + 1}`,
    };
    setProjects([...projects, newProject]);
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