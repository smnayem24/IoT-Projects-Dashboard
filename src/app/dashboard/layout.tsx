'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { Project } from '@/types/Project';
import { useProjects } from '@/hooks/useProjects';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const projects = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  const handleAddProject = async (name: string, description: string, initialData: Record<string, any> = {}) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          widgets: [],
          deviceId: null,
          owner: user?.email || 'unknown',
          isSimulation: false,
          connectionStatus: 'disconnected',
          lastDataUpdate: null,
          config: initialData
        }),
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
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar
          projects={projects || []}
          selectedProject={selectedProject}
          onSelectProject={setSelectedProject}
          onAddProject={handleAddProject}
        />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
