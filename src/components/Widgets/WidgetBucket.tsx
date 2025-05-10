import React from 'react';
import { Widget } from '@/types/Project';

interface WidgetBucketProps {
  onAddWidget: (widgetType: Widget['type']) => void;
}

const availableWidgets: Array<{ type: Widget['type']; label: string; icon: string }> = [
  { type: 'toggle', label: 'Toggle Switch', icon: '🔘' },
  { type: 'slider', label: 'Slider', icon: '🎚️' },
  { type: 'graph', label: 'Graph', icon: '📊' },
];

export const WidgetBucket: React.FC<WidgetBucketProps> = ({ onAddWidget }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4">
      <h3 className="text-xl font-bold mb-2 text-white">Widget Bucket</h3>
      <div className="flex flex-wrap gap-2">
        {availableWidgets.map((widget) => (
          <button
            key={widget.type}
            onClick={() => onAddWidget(widget.type)}
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            <span className="mr-2">{widget.icon}</span>
            {widget.label}
          </button>
        ))}
      </div>
    </div>
  );
};