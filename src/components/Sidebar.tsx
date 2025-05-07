import { useState } from "react";
import { Project } from "@/types/types";

type SidebarProps = {
  projects: Project[];
  selectedProject: Project | null;
  onSelectProject: (project: Project) => void;
  onAddProject: (name: string, description: string) => void;
};

export default function Sidebar({ projects, selectedProject, onSelectProject, onAddProject }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");

  const handleAddProject = () => {
    if (newProjectName.trim() && newProjectDescription.trim()) {
      onAddProject(newProjectName.trim(), newProjectDescription.trim());
      setNewProjectName("");
      setNewProjectDescription("");
      setIsModalOpen(false);
    }
  };

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
                className={`cursor-pointer hover:bg-gray-700 p-2 rounded ${
                  selectedProject?.id === project.id ? "bg-gray-700" : ""
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Create New Project</h2>
            <input
              type="text"
              placeholder="Project Name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded text-gray-800"
            />
            <textarea
              placeholder="Project Description"
              value={newProjectDescription}
              onChange={(e) => setNewProjectDescription(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded text-gray-800"
              rows={3}
            />
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProject}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}