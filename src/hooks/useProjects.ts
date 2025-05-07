import { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { Project } from '@/types/types';

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const q = query(collection(db, 'projects'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const projectsData: Project[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                projectsData.push({
                    id: doc.id,
                    name: data.name,
                    description: data.description,
                    type: data.type,
                    data: data.data || {}
                } as Project);
            });
            setProjects(projectsData);
        });

        return () => unsubscribe();
    }, []);

    return projects;
}