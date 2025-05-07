import React, { useState, useEffect } from 'react';
import { Project } from '@/types/types';
import { FaPowerOff, FaLightbulb } from 'react-icons/fa';

interface LEDControlDashboardProps {
    project: Project;
}

export default function LEDControlDashboard({ project }: LEDControlDashboardProps) {
    const [isOn, setIsOn] = useState(false);
    const [brightness, setBrightness] = useState(50);

    const handleToggle = () => {
        setIsOn(!isOn);
        console.log(`Turning ${!isOn ? 'ON' : 'OFF'} LED for project:`, project.id);
    };

    const handleBrightnessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBrightness(Number(event.target.value));
    };

    useEffect(() => {
        console.log(`Setting brightness to ${brightness}% for project:`, project.id);
    }, [brightness, project.id]);

    return (
        <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">{project.name} Control Panel</h2>
            <div className="flex flex-col items-center mb-8">
                <div className={`w-40 h-40 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${isOn ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' : 'bg-gray-700'}`}>
                    <FaLightbulb className={`text-6xl ${isOn ? 'text-yellow-600' : 'text-gray-500'} transition-all duration-300`} />
                </div>
                <p className="text-xl mb-2">Status: <span className={`font-bold ${isOn ? 'text-green-400' : 'text-red-400'}`}>{isOn ? 'ON' : 'OFF'}</span></p>
                <button
                    onClick={handleToggle}
                    className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 flex items-center space-x-2
                    ${isOn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                >
                    <FaPowerOff />
                    <span>{isOn ? 'Turn Off' : 'Turn On'}</span>
                </button>
            </div>
            <div className="mb-6">
                <label htmlFor="brightness" className="block text-sm font-medium mb-2">Brightness</label>
                <input
                    type="range"
                    id="brightness"
                    min="0"
                    max="100"
                    value={brightness}
                    onChange={handleBrightnessChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    disabled={!isOn}
                />
                <div className="flex justify-between text-sm mt-1">
                    <span>0%</span>
                    <span>{brightness}%</span>
                    <span>100%</span>
                </div>
            </div>
            <div className="text-center text-gray-400 text-sm">
                <p>Last updated: {new Date().toLocaleTimeString()}</p>
            </div>
        </div>
    );
}