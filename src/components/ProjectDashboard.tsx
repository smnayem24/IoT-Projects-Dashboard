import { Project } from "@/types/types";

type ProjectDashboardProps = {
  selectedProject: Project | null;
};

export default function ProjectDashboard({ selectedProject }: ProjectDashboardProps) {
  if (!selectedProject) {
    return (
      <h1 className="text-2xl font-bold">Select a project to view its dashboard</h1>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{selectedProject.name} Dashboard</h1>
      {/* Add project-specific components here */}
      <p>This is where you'll add components specific to {selectedProject.name}.</p>
    </div>
  );
}