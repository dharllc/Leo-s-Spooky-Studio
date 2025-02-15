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
    <div className="w-32 bg-white shadow-lg p-6 flex flex-col gap-6">
      {decorationItems.map(item => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => onDragStart(e, item)}
          onTouchStart={(e) => onDragStart(e, item)}
          className="h-20 w-20 flex items-center justify-center text-5xl bg-gray-50 rounded-xl cursor-move hover:bg-gray-100 transition-colors shadow-sm hover:shadow-md active:scale-95 transform transition-transform"
        >
          {item.emoji}
        </div>
      ))}
      
      <div className="mt-auto flex flex-col gap-4">
        <button
          onClick={onToggleNightMode}
          className="p-4 bg-blue-100 rounded-xl hover:bg-blue-200 transition-colors flex items-center justify-center"
          title={isNightMode ? "Switch to day mode" : "Switch to night mode"}
        >
          {isNightMode ? 
            <Sun className="h-8 w-8 text-yellow-600" /> : 
            <Moon className="h-8 w-8 text-blue-600" />
          }
        </button>

        <button
          onClick={onReset}
          className="p-4 bg-red-100 rounded-xl hover:bg-red-200 transition-colors flex items-center justify-center"
        >
          <XCircle className="h-8 w-8 text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default DecorationPanel;