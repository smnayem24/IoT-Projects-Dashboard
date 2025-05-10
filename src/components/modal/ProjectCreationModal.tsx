import React, { useState } from 'react';
import { Project } from '@/types/Project';

interface ProjectCreationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddProject: (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'widgets'>) => void;
}

export const ProjectCreationModal: React.FC<ProjectCreationModalProps> = ({ isOpen, onClose, onAddProject }) => {
    const [newProjectName, setNewProjectName] = useState("");
    const [newProjectDescription, setNewProjectDescription] = useState("");
    const [isSimulation, setIsSimulation] = useState(true);

    const handleAddProject = () => {
        if (newProjectName.trim() && newProjectDescription.trim()) {
            const projectData = {
                name: newProjectName.trim(),
                description: newProjectDescription.trim(),
                owner: '', // This will be set by the service
                isSimulation,
                connectionStatus: 'disconnected' as const,
                config: {},
            };
            
            onAddProject(projectData);
            setNewProjectName("");
            setNewProjectDescription("");
            setIsSimulation(true);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
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
                
                <div className="mb-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={isSimulation}
                            onChange={(e) => setIsSimulation(e.target.checked)}
                            className="form-checkbox h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">This is a simulation project</span>
                    </label>
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddProject}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        disabled={!newProjectName.trim() || !newProjectDescription.trim()}
                    >
                        Create Project
                    </button>
                </div>
            </div>
        </div>
    );
};