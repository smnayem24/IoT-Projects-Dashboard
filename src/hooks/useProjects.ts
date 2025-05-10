import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '@/utils/firebase';
import { Project } from '@/types/Project';
import { useAuth } from '@/contexts/AuthContext';

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        const projectsRef = ref(db, `users/${user.uid}/projects`);
        const unsubscribe = onValue(projectsRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                setProjects([]);
                return;
            }
            const projectsArray = Object.entries(data).map(([id, projectData]: [string, any]): Project => ({
                id,
                name: projectData.name || '',
                description: projectData.description || '',
                deviceId: projectData.deviceId,
                owner: projectData.owner || '',
                widgets: Array.isArray(projectData.widgets) ? projectData.widgets.map((w: any) => ({
                    id: w.id || '',
                    type: w.type || 'toggle',
                    label: w.label || '',
                    config: w.config || {}
                })) : [],
                isSimulation: Boolean(projectData.isSimulation),
                connectionStatus: projectData.connectionStatus || 'disconnected',
                createdAt: projectData.createdAt ? new Date(projectData.createdAt) : new Date(),
                updatedAt: projectData.updatedAt ? new Date(projectData.updatedAt) : new Date(),
                lastDataUpdate: projectData.lastDataUpdate ? new Date(projectData.lastDataUpdate) : undefined,
                config: projectData.config || {},
                firebaseConfig: projectData.firebaseConfig || undefined
            }));

            setProjects(projectsArray);
        });

        return () => {
            // Firebase automatically removes the listener
        };
    }, [user]);

    return projects;
}