import { ref, set, push, remove, get } from 'firebase/database';
import { db } from '@/utils/firebase';
import { Project } from '@/types/Project';

export class ProjectService {
    static async createProject(userId: string, project: Omit<Project, 'id'>): Promise<string> {
        try {
            const projectsRef = ref(db, `users/${userId}/projects`);
            const newProjectRef = push(projectsRef);
            const projectId = newProjectRef.key!;

            // Basic project metadata
            const projectData = {
                ...project,
                id: projectId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                widgets: [], // Will be populated when user adds widgets
                connectionStatus: 'disconnected',
                simulationData: {
                    // Real-time data structure for simulation
                    status: 'idle',
                    controls: {},  // Will store control states (like LED states)
                    sensors: {}    // Will store sensor values
                }
            };

            await set(newProjectRef, projectData);
            return projectId;
        } catch (error) {
            console.error('Error creating project:', error);
            throw error;
        }
    }

    static async initializeProjectDatabase(projectId: string, firebaseConfig: Project['firebaseConfig']) {
        try {
            // Create basic structure for the project
            const initialStructure = {
                metadata: {
                    created: new Date().toISOString(),
                    lastUpdated: new Date().toISOString()
                },
                devices: {},
                widgets: {},
                config: {}
            };

            await set(ref(db, `users/${projectId}`), initialStructure);
        } catch (error) {
            console.error('Error initializing project database:', error);
            throw error;
        }
    }

    static async getProject(userId: string, projectId: string): Promise<Project | null> {
        try {
            const projectRef = ref(db, `users/${userId}/projects/${projectId}`);
            const snapshot = await get(projectRef);
            return snapshot.exists() ? snapshot.val() : null;
        } catch (error) {
            console.error('Error getting project:', error);
            throw error;
        }
    }

    static async updateProject(userId: string, projectId: string, updates: Partial<Project>): Promise<void> {
        try {
            const projectRef = ref(db, `users/${userId}/projects/${projectId}`);
            const project = await this.getProject(userId, projectId);

            if (!project) {
                throw new Error('Project not found');
            }

            await set(projectRef, {
                ...project,
                ...updates,
                updatedAt: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error updating project:', error);
            throw error;
        }
    }

    static async deleteProject(userId: string, projectId: string): Promise<void> {
        try {
            const projectRef = ref(db, `users/${userId}/projects/${projectId}`);
            await remove(projectRef);
        } catch (error) {
            console.error('Error deleting project:', error);
            throw error;
        }
    }
}