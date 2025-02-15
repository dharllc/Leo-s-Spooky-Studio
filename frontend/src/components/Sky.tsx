import React, { useMemo } from 'react';

interface SkyProps {
  isNightMode: boolean;
}

const Sky: React.FC<SkyProps> = ({ isNightMode }) => {
  const starPositions = useMemo(() => 
    Array.from({ length: 70 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 60}%`,
      delay: `${Math.random() * 3}s`,
      size: Math.random() * 0.5 + 0.5, // Random size between 0.5 and 1
      duration: Math.random() * 1 + 2 // Random duration between 2 and 3 seconds
    })), []
  );

  // Create clouds
  const cloudPositions = useMemo(() => 
    Array.from({ length: 5 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 30}%`,
      scale: Math.random() * 0.5 + 0.75, // Random scale between 0.75 and 1.25
      duration: Math.random() * 20 + 40, // Random duration between 40 and 60 seconds
      delay: `${Math.random() * -20}s` // Stagger the start positions
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Stars */}
      {isNightMode && starPositions.map((pos, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: pos.left,
            top: pos.top,
            width: `${pos.size}px`,
            height: `${pos.size}px`,
            background: 'white',
            animation: `twinkle ${pos.duration}s infinite ${pos.delay}`,
            opacity: 0
          }}
        />
      ))}

      {/* Day/Night celestial body */}
      <div
        className={`absolute transition-all duration-1000 ${
          isNightMode ? 'text-yellow-100' : 'text-yellow-400'
        }`}
        style={{
          left: '8%',
          top: '8%',
          fontSize: '5rem',
          filter: isNightMode ? 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))' : 'none',
          transform: `scale(${isNightMode ? 1.2 : 1})`,
          transition: 'transform 1s ease-in-out'
        }}
      >
        {isNightMode ? '🌕' : '☀️'}
      </div>

      {/* Clouds (visible only during day) */}
      {!isNightMode && cloudPositions.map((cloud, i) => (
        <div
          key={i}
          className="absolute text-white opacity-90"
          style={{
            left: cloud.left,
            top: cloud.top,
            fontSize: '3rem',
            transform: `scale(${cloud.scale})`,
            animation: `float ${cloud.duration}s linear infinite ${cloud.delay}`,
          }}
        >
          ☁️
        </div>
      ))}

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        @keyframes float {
          from { transform: translateX(-10%) scale(${cloudPositions[0].scale}); }
          to { transform: translateX(110%) scale(${cloudPositions[0].scale}); }
        }
      `}</style>
    </div>
  );
};

export default Sky;