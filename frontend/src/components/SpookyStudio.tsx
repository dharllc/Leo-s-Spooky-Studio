import React, { useState, useRef, useEffect, useMemo } from 'react';
import { XCircle, Moon, Sun } from 'lucide-react';
import { DecorationItem, PlacedDecoration } from '../types';

const SpookyStudio: React.FC = () => {
  const [decorations, setDecorations] = useState<PlacedDecoration[]>([]);
  const [draggedItem, setDraggedItem] = useState<DecorationItem | null>(null);
  const [movingDecoration, setMovingDecoration] = useState<string | null>(null);
  const [touchPosition, setTouchPosition] = useState<{ x: number; y: number } | null>(null);
  const [isNightMode, setIsNightMode] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Generate static star positions once
  const starPositions = useMemo(() => 
    Array.from({ length: 50 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 40}%`,
      delay: `${Math.random() * 2}s`
    })), []
  );
  
  const decorationItems: DecorationItem[] = [
    { id: 'ghost', emoji: '👻', name: 'Ghost' },
    { id: 'pumpkin', emoji: '🎃', name: 'Pumpkin' },
    { id: 'skeleton', emoji: '💀', name: 'Skeleton' },
    { id: 'spider', emoji: '🕷️', name: 'Spider' },
    { id: 'witch', emoji: '🧙‍♀️', name: 'Witch' },
    { id: 'cat', emoji: '🐈‍⬛', name: 'Black Cat' },
    { id: 'cat', emoji: '🧛‍♂️', name: 'Vampire' }
  ];

  // Your existing handlers remain the same
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
        setDecorations(prev => [...prev, {
          ...draggedItem,
          id: `${draggedItem.id}-${Date.now()}`,
          x,
          y
        }]);
      } else if (movingDecoration) {
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

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
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
        
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={toggleNightMode}
            className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center"
            title={isNightMode ? "Switch to day mode" : "Switch to night mode"}
          >
            {isNightMode ? 
              <Sun className="h-6 w-6 text-yellow-600" /> : 
              <Moon className="h-6 w-6 text-blue-600" />
            }
          </button>

          <button
            onClick={handleReset}
            className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
          >
            <XCircle className="h-6 w-6 text-red-600" />
          </button>
        </div>
      </div>

      <div
        ref={canvasRef}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={`flex-1 h-full relative overflow-hidden transition-all duration-1000 ${
          isNightMode ? 'bg-gray-900' : 'bg-blue-200'
        }`}
      >
        {/* Day/Night Sky Elements */}
        <div className="absolute inset-0">
          {isNightMode ? (
            // Night sky with static stars
            <>
              {starPositions.map((pos, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                  style={{
                    left: pos.left,
                    top: pos.top,
                    animationDelay: pos.delay
                  }}
                />
              ))}
              <div className="absolute left-8 top-8 text-yellow-200 text-6xl">
                🌕
              </div>
            </>
          ) : (
            // Day sky with sun
            <div className="absolute left-8 top-8 text-yellow-500 text-6xl">
              ☀️
            </div>
          )}
        </div>

        {/* Haunted House SVG Background */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
          {/* Ground */}
          <rect x="0" y="500" width="800" height="100" fill={isNightMode ? "#1a1a1a" : "#2d2d2d"} />
          
          {/* Main House */}
          <path d="M200,200 L600,200 L600,500 L200,500 Z" 
                fill={isNightMode ? "#4a4a4a" : "#8b5e34"} 
                className="transition-all duration-1000" />
          
          {/* Roof */}
          <path d="M150,200 L400,50 L650,200 Z" 
                fill={isNightMode ? "#333333" : "#6b4423"} 
                className="transition-all duration-1000" />
          
          {/* Windows */}
          {isNightMode ? (
            <>
              <rect x="250" y="250" width="80" height="100" fill="#fff5b8" opacity="0.8">
                <animate attributeName="opacity" values="0.8;0.6;0.8" dur="4s" repeatCount="indefinite" />
              </rect>
              <rect x="470" y="250" width="80" height="100" fill="#fff5b8" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.8;0.6" dur="4s" repeatCount="indefinite" />
              </rect>
            </>
          ) : (
            <>
              <rect x="250" y="250" width="80" height="100" fill="#ffd700" stroke="#4a2911" strokeWidth="10" />
              <rect x="470" y="250" width="80" height="100" fill="#ffd700" stroke="#4a2911" strokeWidth="10" />
            </>
          )}
          
          {/* Door */}
          <path d="M350,500 L450,500 L450,350 L350,350 Z" 
                fill={isNightMode ? "#2a1810" : "#4a2911"} />
          <circle cx="430" cy="425" r="10" fill={isNightMode ? "#ffd700" : "#c0c0c0"} />
          
          {/* Chimney with smoke */}
          <path d="M500,100 L550,100 L550,180 L500,180 Z" fill={isNightMode ? "#333333" : "#4a2911"} />
          <path d="M510,60 Q525,40 540,60 Q525,80 510,60" fill="#666666" opacity="0.3">
            <animate attributeName="d" 
                     values="M510,60 Q525,40 540,60 Q525,80 510,60;
                             M510,60 Q525,30 540,60 Q525,90 510,60;
                             M510,60 Q525,40 540,60 Q525,80 510,60"
                     dur="4s" repeatCount="indefinite" />
          </path>
          
          {/* Window Panes */}
          <line x1="290" y1="250" x2="290" y2="350" stroke="#4a2911" strokeWidth="5" />
          <line x1="250" y1="300" x2="330" y2="300" stroke="#4a2911" strokeWidth="5" />
          <line x1="510" y1="250" x2="510" y2="350" stroke="#4a2911" strokeWidth="5" />
          <line x1="470" y1="300" x2="550" y2="300" stroke="#4a2911" strokeWidth="5" />
        </svg>

        {/* Decoration Counter */}
        <div className={`absolute top-4 right-4 px-4 py-2 rounded-lg shadow-lg ${
          isNightMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        } transition-colors duration-1000`}>
          {decorations.length} Decorations
        </div>
        
        {/* Placed Decorations */}
        {decorations.map(decoration => (
          <div
            key={decoration.id}
            className={`absolute text-4xl transition-all duration-300 cursor-move ${
              isNightMode ? 'drop-shadow-glow' : ''
            }`}
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
        
        {/* Touch Position Indicator */}
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

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
        }
      `}</style>
    </div>
  );
};

export default SpookyStudio;