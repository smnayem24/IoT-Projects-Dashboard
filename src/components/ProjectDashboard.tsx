import React, { useState } from 'react';
import { Project, Widget } from '@/types/Project';
import { ToggleSwitch } from './Widgets/ToggleSwitch';
import { Slider } from './Widgets/Slider';
import { useDrop } from 'react-dnd';

interface ProjectDashboardProps {
    selectedProject: Project | null;
}

type TabType = 'widgets' | 'keys' | 'settings' | null;

export const ProjectDashboard: React.FC<ProjectDashboardProps> = ({ selectedProject }) => {
    const [widgets, setWidgets] = useState<Widget[]>(selectedProject?.widgets || []);
    const [activeTab, setActiveTab] = useState<TabType>(null);

    const handleAddWidget = (widget: Widget) => {
        setWidgets((prevWidgets) => [...prevWidgets, widget]);
    };

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'WIDGET',
        drop: (item: { widget: Widget }) => handleAddWidget(item.widget),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    }));

    if (!selectedProject) {
        return <div className="text-center text-gray-500">No project selected</div>;
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'widgets':
                return (
                    <div ref={(node) => { drop(node); }} className={`drop-area ${isOver ? 'highlight' : ''}`}>
                        {widgets.map((widget) => {
                            switch (widget.type) {
                                case 'toggle':
                                    return <ToggleSwitch key={widget.id} isOn={false} onToggle={() => { }} label={widget.label} />;
                                case 'slider':
                                    return (
                                        <Slider
                                            key={widget.id}
                                            value={0}
                                            onChange={() => { }}
                                            min={widget.config?.min || 0}
                                            max={widget.config?.max || 100}
                                            label={widget.label}
                                        />
                                    );
                                case 'graph':
                                    return <div key={widget.id} className="bg-gray-800 p-4 rounded-lg">Graph placeholder</div>;
                                default:
                                    return null;
                            }
                        })}
                    </div>
                );
            case 'keys':
                return <div className="text-gray-300">API Keys management will be implemented here.</div>;
            case 'settings':
                return <div className="text-gray-300">Project settings will be implemented here.</div>;
            default:
                return <div className="text-gray-500">Please select a tab to view its content.</div>;
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-900 text-white">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h2 className="text-2xl font-bold">{selectedProject.name} Dashboard</h2>
                <div className="flex space-x-2">
                    {(['widgets', 'keys', 'settings'] as TabType[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-t-lg ${activeTab === tab
                                ? 'bg-gray-800 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            disabled={tab === null}
                        >
                            {tab ? tab.charAt(0).toUpperCase() + tab.slice(1) : 'Tab'}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex-grow p-4 overflow-auto">
                {activeTab === null ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">Please select a tab to view its content.</p>
                    </div>
                ) : (
                    renderTabContent()
                )}
            </div>
            <div className="text-center text-gray-500 text-sm p-2 border-t border-gray-700">
                Last updated: {selectedProject.lastDataUpdate ? new Date(selectedProject.lastDataUpdate).toLocaleTimeString() : 'Never'}
            </div>
        </div>
    );
};