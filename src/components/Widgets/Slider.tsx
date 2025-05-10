import React from 'react';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  label: string;
  disabled?: boolean;
}

export const Slider: React.FC<SliderProps> = ({ value, onChange, min, max, label, disabled = false }) => {
  return (
    <div className="mb-6">
      <label htmlFor={label} className="block text-sm font-medium mb-2">{label}</label>
      <input
        type="range"
        id={label}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        disabled={disabled}
      />
      <div className="flex justify-between text-sm mt-1">
        <span>{min}</span>
        <span>{value}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};