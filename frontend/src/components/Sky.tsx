import React, { useMemo } from 'react';

interface SkyProps {
  isNightMode: boolean;
}

const Sky: React.FC<SkyProps> = ({ isNightMode }) => {
  const starPositions = useMemo(() => 
    Array.from({ length: 50 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 40}%`,
      delay: `${Math.random() * 2}s`
    })), []
  );

  return (
    <div className="absolute inset-0">
      {isNightMode ? (
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
        <div className="absolute left-8 top-8 text-yellow-500 text-6xl">
          ☀️
        </div>
      )}
    </div>
  );
};

export default Sky;