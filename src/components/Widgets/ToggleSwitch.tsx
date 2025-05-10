import React from 'react';
import { FaPowerOff } from 'react-icons/fa';

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  label: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle, label }) => {
  return (
    <div className="flex flex-col items-center mb-8">
      <p className="text-xl mb-2">{label}: <span className={`font-bold ${isOn ? 'text-green-400' : 'text-red-400'}`}>{isOn ? 'ON' : 'OFF'}</span></p>
      <button
        onClick={onToggle}
        className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 flex items-center space-x-2
        ${isOn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
      >
        <FaPowerOff />
        <span>{isOn ? 'Turn Off' : 'Turn On'}</span>
      </button>
    </div>
  );
};