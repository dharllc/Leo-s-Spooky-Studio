import React, { useState, useRef, useEffect } from 'react';
import { DecorationItem, PlacedDecoration } from '../types';
import HauntedHouse from './HauntedHouse';
import Sky from './Sky';
import DecorationPanel from './DecorationPanel';

const SpookyStudio: React.FC = () => {
  const [decorations, setDecorations] = useState<PlacedDecoration[]>([]);
  const [draggedItem] = useState<DecorationItem | null>(null);
  const [movingDecoration, setMovingDecoration] = useState<string | null>(null);
  const [touchPosition, setTouchPosition] = useState<{ x: number; y: number } | null>(null);
  const [isNightMode, setIsNightMode] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const touchOffsetRef = useRef({ x: 0, y: 0 });

  // Prevent scrolling when dragging
  useEffect(() => {
    const preventDefault = (e: Event) => {
      if (isDraggingRef.current) {
        e.preventDefault();
      }
    };

    document.body.addEventListener('touchmove', preventDefault, { passive: false });
    return () => {
      document.body.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  // Lock body scroll during component mount
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, []);

  const calculateCanvasPosition = (clientX: number, clientY: number) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    const sidebarOffset = draggedItem ? 0 : 96;
    return {
      x: clientX - rect.left + sidebarOffset,
      y: clientY - rect.top
    };
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, item: DecorationItem) => {
    if ('touches' in e) {
      e.preventDefault();
      const touch = e.touches[0];
      const pos = calculateCanvasPosition(touch.clientX, touch.clientY);
      
      setDecorations(prev => [...prev, {
        ...item,
        id: `${item.id}-${Date.now()}`,
        x: pos.x,
        y: pos.y
      }]);
    } else {
      e.dataTransfer.setData('decoration', JSON.stringify(item));
    }
  };

  const handleDecorationTouchStart = (e: React.TouchEvent<HTMLDivElement>, decorationId: string) => {
    e.stopPropagation();
    isDraggingRef.current = true;
    const touch = e.touches[0];
    const targetRect = e.currentTarget.getBoundingClientRect();
    touchOffsetRef.current = {
      x: touch.clientX - targetRect.left - targetRect.width / 2,
      y: touch.clientY - targetRect.top - targetRect.height / 2
    };
    
    const pos = {
      x: touch.clientX - touchOffsetRef.current.x,
      y: touch.clientY - touchOffsetRef.current.y
    };
    
    setTouchPosition(pos);
    setMovingDecoration(decorationId);
  };

  const handleTouchMove = React.useCallback((e: TouchEvent) => {
    if (movingDecoration && canvasRef.current) {
      e.preventDefault();
      const touch = e.touches[0];
      const pos = {
        x: touch.clientX - touchOffsetRef.current.x,
        y: touch.clientY - touchOffsetRef.current.y
      };
      
      requestAnimationFrame(() => {
        setTouchPosition(pos);
      });
    }
  }, [movingDecoration]);

  const handleTouchEnd = React.useCallback((e: TouchEvent) => {
    e.preventDefault();
    isDraggingRef.current = false;

    if (canvasRef.current && touchPosition && movingDecoration) {
      setDecorations(prev => prev.map(dec => 
        dec.id === movingDecoration 
          ? { ...dec, x: touchPosition.x, y: touchPosition.y }
          : dec
      ));

      setMovingDecoration(null);
      setTouchPosition(null);
      touchOffsetRef.current = { x: 0, y: 0 };
    }
  }, [touchPosition, movingDecoration]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    isDraggingRef.current = false;
    if (!canvasRef.current) return;
    
    const pos = calculateCanvasPosition(e.clientX, e.clientY);
    const itemData = e.dataTransfer.getData('decoration');
    
    try {
      const item: DecorationItem = JSON.parse(itemData);
      setDecorations(prev => [...prev, {
        ...item,
        id: `${item.id}-${Date.now()}`,
        x: pos.x,
        y: pos.y
      }]);
    } catch (error) {
      console.error('Failed to parse decoration data:', error);
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      const currentRef = canvasRef.current;
      currentRef.addEventListener('touchmove', handleTouchMove, { passive: false });
      currentRef.addEventListener('touchend', handleTouchEnd);

      return () => {
        currentRef.removeEventListener('touchmove', handleTouchMove);
        currentRef.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [handleTouchMove, handleTouchEnd]);

  const handleReset = () => {
    setDecorations([]);
  };

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  return (
    <div className="h-screen w-full bg-gray-100 overflow-hidden flex select-none">
      <DecorationPanel
        isNightMode={isNightMode}
        onDragStart={handleDragStart}
        onReset={handleReset}
        onToggleNightMode={toggleNightMode}
      />

      <div
        ref={canvasRef}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={`flex-1 h-full relative overflow-hidden transition-all duration-1000 ${
          isNightMode ? 'bg-gray-900' : 'bg-blue-200'
        }`}
      >
        <Sky isNightMode={isNightMode} />
        <HauntedHouse isNightMode={isNightMode} />

        <div className={`absolute top-4 right-4 px-6 py-3 rounded-xl shadow-lg text-3xl font-bold ${
          isNightMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        } transition-colors duration-1000`}>
          {decorations.length}
        </div>
        
        {decorations.map(decoration => (
          <div
            key={decoration.id}
            className={`absolute text-5xl cursor-move transform transition-transform hover:scale-110 active:scale-95 ${
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

        {touchPosition && movingDecoration && (
          <div
            className="absolute text-5xl pointer-events-none opacity-70"
            style={{
              left: `${touchPosition.x}px`,
              top: `${touchPosition.y}px`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {decorations.find(d => d.id === movingDecoration)?.emoji}
          </div>
        )}
      </div>

      <style>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
        }
      `}</style>
    </div>
  );
};

export default SpookyStudio;