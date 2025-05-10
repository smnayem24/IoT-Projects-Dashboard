import React, { useState } from 'react';

interface ProjectCreationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddProject: (name: string, description: string) => void;
}

export const ProjectCreationModal: React.FC<ProjectCreationModalProps> = ({ isOpen, onClose, onAddProject }) => {
    const [newProjectName, setNewProjectName] = useState("");
    const [newProjectDescription, setNewProjectDescription] = useState("");

    const handleAddProject = () => {
        if (newProjectName.trim() && newProjectDescription.trim()) {
            onAddProject(newProjectName.trim(), newProjectDescription.trim());
            setNewProjectName("");
            setNewProjectDescription("");
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
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
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
    );
};