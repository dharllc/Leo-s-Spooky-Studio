import React from 'react';
import { XCircle, Moon, Sun } from 'lucide-react';
import { DecorationItem, decorationItems } from '../types';

interface DecorationPanelProps {
  isNightMode: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, item: DecorationItem) => void;
  onReset: () => void;
  onToggleNightMode: () => void;
}

const DecorationPanel: React.FC<DecorationPanelProps> = ({
  isNightMode,
  onDragStart,
  onReset,
  onToggleNightMode
}) => {
  return (
    <div className="w-24 bg-white shadow-lg p-4 flex flex-col gap-4">
      {decorationItems.map(item => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => onDragStart(e, item)}
          onTouchStart={(e) => onDragStart(e, item)}
          className="h-16 w-16 flex items-center justify-center text-4xl bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
        >
          {item.emoji}
        </div>
      ))}
      
      <div className="mt-8 flex flex-col gap-3">
        <button
          onClick={onToggleNightMode}
          className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center"
          title={isNightMode ? "Switch to day mode" : "Switch to night mode"}
        >
          {isNightMode ? 
            <Sun className="h-6 w-6 text-yellow-600" /> : 
            <Moon className="h-6 w-6 text-blue-600" />
          }
        </button>

        <button
          onClick={onReset}
          className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
        >
          <XCircle className="h-6 w-6 text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default DecorationPanel;