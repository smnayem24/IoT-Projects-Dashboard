import { Project } from '@/types/types';
import LEDControlDashboard from './dashboards/LEDControlDashboard';

interface ProjectDashboardProps {
    selectedProject: Project | null;
}

const dashboardMap: Record<string, React.ComponentType<{ project: Project }>> = {
    'led-control': LEDControlDashboard,
    // Add other project types and their corresponding dashboards
};

export default function ProjectDashboard({ selectedProject }: ProjectDashboardProps) {
    console.log('Selected Project:', selectedProject);

    if (!selectedProject) {
        return <div>No project selected. Please select a project from the sidebar.</div>;
    }

    const DashboardComponent = dashboardMap[selectedProject.type];

    if (!DashboardComponent) {
        return (
            <div>
                Project Title: {selectedProject.name} <br />
                Description: {selectedProject?.description}
            </div>
        );
    }

    return <DashboardComponent project={selectedProject} />;
}