import React, { useState } from 'react';
import { Project } from '@/types/Project';
import { ProjectCreationModal } from './modal/ProjectCreationModal';

interface SidebarProps {
  projects: Project[];
  selectedProject: Project | null;
  onSelectProject: (project: Project) => void;
  onAddProject: (name: string, description: string, initialData?: Record<string, any>) => Promise<void>;
}

export default function Sidebar({ projects, selectedProject, onSelectProject, onAddProject }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-20 bg-gray-800 text-white p-2 rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "Close" : "Menu"}
      </button>
      <aside
        className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 transition-transform duration-300 ease-in-out
          fixed md:sticky top-0 left-0 h-screen w-64 bg-gray-800 text-white
          overflow-y-auto flex flex-col
        `}
      >
        <div className="p-4 flex-grow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Projects</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
            >
              +
            </button>
          </div>
          <ul>
            {projects.map((project) => (
              <li
                key={project.id}
                className={`cursor-pointer hover:bg-gray-700 p-2 rounded ${selectedProject?.id === project.id ? "bg-gray-700" : ""
                  }`}
                onClick={() => {
                  onSelectProject(project);
                  setIsSidebarOpen(false);
                }}
              >
                {project.name}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <ProjectCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProject={onAddProject}
      />
    </>
  );
}