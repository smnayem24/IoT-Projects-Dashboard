import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

interface Widget {
    id: string;
    label: string;
    type: string;
}

interface WidgetSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddWidget: (widget: Widget) => void;
    availableWidgets: Widget[];
}

const DraggableWidget = ({ widget, onAddWidget }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'WIDGET',
        item: { widget },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <span>{widget.label}</span>
            <button onClick={() => onAddWidget(widget)}>Add</button>
        </div>
    );
};

const WidgetSelectionModal: React.FC<WidgetSelectionModalProps> = ({ isOpen, onClose, onAddWidget, availableWidgets }) => {
    const [searchTerm, setSearchTerm] = useState('');

    if (!isOpen) return null;

    const filteredWidgets = availableWidgets.filter(widget =>
        widget.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Select a Widget</h2>
                <input
                    type="text"
                    placeholder="Search widgets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded text-gray-800"
                />
                <ul>
                    {filteredWidgets.map(widget => (
                        <li key={widget.id} className="flex justify-between items-center mb-2">
                            <DraggableWidget widget={widget} onAddWidget={onAddWidget} />
                        </li>
                    ))}
                </ul>
                <button onClick={onClose} className="mt-4 px-4 py-2 text-gray-600 hover:text-gray-800">
                    Close
                </button>
            </div>
        </div>
    );
};

export default WidgetSelectionModal;
