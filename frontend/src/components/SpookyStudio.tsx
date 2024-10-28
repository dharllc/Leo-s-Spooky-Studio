import React, { useState, useRef, useEffect } from 'react';
import { XCircle } from 'lucide-react';
import { DecorationItem, PlacedDecoration } from '../types';

const SpookyStudio: React.FC = () => {
  const [decorations, setDecorations] = useState<PlacedDecoration[]>([]);
  const [draggedItem, setDraggedItem] = useState<DecorationItem | null>(null);
  const [movingDecoration, setMovingDecoration] = useState<string | null>(null);
  const [touchPosition, setTouchPosition] = useState<{ x: number; y: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const decorationItems: DecorationItem[] = [
    { id: 'ghost', emoji: '👻', name: 'Ghost' },
    { id: 'pumpkin', emoji: '🎃', name: 'Pumpkin' },
    { id: 'skeleton', emoji: '💀', name: 'Skeleton' },
    { id: 'turkey', emoji: '🦃', name: 'Turkey' },
    { id: 'leaf', emoji: '🍁', name: 'Autumn Leaf' },
    { id: 'corn', emoji: '🌽', name: 'Corn' },
    { id: 'pie', emoji: '🥧', name: 'Pie' },
    { id: 'squirrel', emoji: '🐿️', name: 'Squirrel' }
  ];

  // Handle both mouse and touch events for sidebar items
  const handleDragStart = (e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, item: DecorationItem) => {
    if ('touches' in e) {
      e.preventDefault();
      const touch = e.touches[0];
      setTouchPosition({ x: touch.clientX, y: touch.clientY });
      setDraggedItem(item);
    } else {
      e.dataTransfer.setData('decoration', JSON.stringify(item));
      e.currentTarget.classList.add('dragging');
    }
  };

  // Handle moving placed decorations
  const handleDecorationTouchStart = (e: React.TouchEvent<HTMLDivElement>, decorationId: string) => {
    e.stopPropagation();
    const touch = e.touches[0];
    setTouchPosition({ x: touch.clientX, y: touch.clientY });
    setMovingDecoration(decorationId);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if ((draggedItem || movingDecoration) && canvasRef.current) {
      e.preventDefault();
      const touch = e.touches[0];
      setTouchPosition({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (canvasRef.current && touchPosition) {
      e.preventDefault();
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const x = touchPosition.x - canvasRect.left;
      const y = touchPosition.y - canvasRect.top;

      if (draggedItem) {
        // Adding new decoration
        setDecorations(prev => [...prev, {
          ...draggedItem,
          id: `${draggedItem.id}-${Date.now()}`,
          x,
          y
        }]);
      } else if (movingDecoration) {
        // Moving existing decoration
        setDecorations(prev => prev.map(dec => 
          dec.id === movingDecoration ? { ...dec, x, y } : dec
        ));
      }

      setDraggedItem(null);
      setMovingDecoration(null);
      setTouchPosition(null);
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
      canvasRef.current.addEventListener('touchend', handleTouchEnd);

      return () => {
        canvasRef.current?.removeEventListener('touchmove', handleTouchMove);
        canvasRef.current?.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [draggedItem, movingDecoration, touchPosition]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!canvasRef.current) return;
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const itemData = e.dataTransfer.getData('decoration');
    
    try {
      const item: DecorationItem = JSON.parse(itemData);
      const x = e.clientX - canvasRect.left;
      const y = e.clientY - canvasRect.top;
      
      setDecorations(prev => [...prev, {
        ...item,
        id: `${item.id}-${Date.now()}`,
        x,
        y
      }]);
    } catch (error) {
      console.error('Failed to parse decoration data:', error);
    }
  };

  const handleReset = () => {
    setDecorations([]);
  };

  return (
    <div className="h-screen w-full bg-gray-100 overflow-hidden flex">
      <div className="w-24 bg-white shadow-lg p-4 flex flex-col gap-4">
        {decorationItems.map(item => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            onTouchStart={(e) => handleDragStart(e, item)}
            className="h-16 w-16 flex items-center justify-center text-4xl bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
          >
            {item.emoji}
          </div>
        ))}
        
        <button
          onClick={handleReset}
          className="mt-auto mb-4 p-2 bg-red-100 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
        >
          <XCircle className="h-6 w-6 text-red-600" />
        </button>
      </div>

      <div
        ref={canvasRef}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="flex-1 h-full relative overflow-hidden"
        style={{ background: '#f5f5f5' }}
      >
        {/* Haunted House SVG Background */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
          {/* Main House */}
          <path d="M200,200 L600,200 L600,500 L200,500 Z" fill="#8b5e34" /> {/* House body */}
          <path d="M150,200 L400,50 L650,200 Z" fill="#6b4423" /> {/* Roof */}
          
          {/* Windows */}
          <rect x="250" y="250" width="80" height="100" fill="#ffd700" stroke="#4a2911" strokeWidth="10" />
          <rect x="470" y="250" width="80" height="100" fill="#ffd700" stroke="#4a2911" strokeWidth="10" />
          <path d="M350,500 L450,500 L450,350 L350,350 Z" fill="#4a2911" /> {/* Door */}
          <circle cx="430" cy="425" r="10" fill="#c0c0c0" /> {/* Doorknob */}
          
          {/* Chimney */}
          <path d="M500,100 L550,100 L550,180 L500,180 Z" fill="#4a2911" />
          
          {/* Window Panes */}
          <line x1="290" y1="250" x2="290" y2="350" stroke="#4a2911" strokeWidth="5" />
          <line x1="250" y1="300" x2="330" y2="300" stroke="#4a2911" strokeWidth="5" />
          <line x1="510" y1="250" x2="510" y2="350" stroke="#4a2911" strokeWidth="5" />
          <line x1="470" y1="300" x2="550" y2="300" stroke="#4a2911" strokeWidth="5" />
          
          {/* Steps */}
          <rect x="330" y="500" width="140" height="20" fill="#6b4423" />
          <rect x="320" y="520" width="160" height="20" fill="#4a2911" />
          
          {/* Roof Details */}
          <path d="M150,200 L180,160 L400,20 L620,160 L650,200" fill="none" stroke="#4a2911" strokeWidth="10" />
        </svg>
        
        {decorations.map(decoration => (
          <div
            key={decoration.id}
            className="absolute text-4xl transition-transform cursor-move"
            style={{
              left: `${decoration.x}px`,
              top: `${decoration.y}px`,
              transform: 'translate(-50%, -50%)',
              touchAction: 'none'
            }}
            onTouchStart={(e) => handleDecorationTouchStart(e, decoration.id)}
          >
            {decoration.emoji}
          </div>
        ))}
        
        {/* Touch position indicator */}
        {touchPosition && (draggedItem || movingDecoration) && (
          <div
            className="absolute text-4xl pointer-events-none transition-transform"
            style={{
              left: `${touchPosition.x}px`,
              top: `${touchPosition.y}px`,
              transform: 'translate(-50%, -50%)',
              opacity: 0.7
            }}
          >
            {draggedItem?.emoji || decorations.find(d => d.id === movingDecoration)?.emoji}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpookyStudio;