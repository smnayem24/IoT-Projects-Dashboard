import { Project } from "@/types/types";

type ProjectDashboardProps = {
  selectedProject: Project | null;
};

export default function ProjectDashboard({ selectedProject }: ProjectDashboardProps) {
  if (!selectedProject) {
    return <div className="text-center text-gray-500">Select a project to view its dashboard</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{selectedProject.name} Dashboard</h1>
      <p>Project ID: {selectedProject.id}</p>
      {/* Add more project-specific information and controls here */}
    </div>
  );
}