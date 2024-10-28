import React from 'react';

interface HauntedHouseProps {
  isNightMode: boolean;
}

const HauntedHouse: React.FC<HauntedHouseProps> = ({ isNightMode }) => {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
      {/* Ground */}
      <rect x="0" y="500" width="800" height="100" fill={isNightMode ? "#1a1a1a" : "#2d2d2d"} />
      
      {/* Main House */}
      <path 
        d="M200,200 L600,200 L600,500 L200,500 Z" 
        fill={isNightMode ? "#4a4a4a" : "#8b5e34"} 
        className="transition-all duration-1000" 
      />
      
      {/* Roof */}
      <path 
        d="M150,200 L400,50 L650,200 Z" 
        fill={isNightMode ? "#333333" : "#6b4423"} 
        className="transition-all duration-1000" 
      />
      
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
      <path 
        d="M350,500 L450,500 L450,350 L350,350 Z" 
        fill={isNightMode ? "#2a1810" : "#4a2911"} 
      />
      <circle 
        cx="430" 
        cy="425" 
        r="10" 
        fill={isNightMode ? "#ffd700" : "#c0c0c0"} 
      />
      
      {/* Chimney with smoke */}
      <path 
        d="M500,100 L550,100 L550,180 L500,180 Z" 
        fill={isNightMode ? "#333333" : "#4a2911"} 
      />
      <path 
        d="M510,60 Q525,40 540,60 Q525,80 510,60" 
        fill="#666666" 
        opacity="0.3"
      >
        <animate 
          attributeName="d" 
          values="M510,60 Q525,40 540,60 Q525,80 510,60;
                  M510,60 Q525,30 540,60 Q525,90 510,60;
                  M510,60 Q525,40 540,60 Q525,80 510,60"
          dur="4s" 
          repeatCount="indefinite" 
        />
      </path>
      
      {/* Window Panes */}
      <line x1="290" y1="250" x2="290" y2="350" stroke="#4a2911" strokeWidth="5" />
      <line x1="250" y1="300" x2="330" y2="300" stroke="#4a2911" strokeWidth="5" />
      <line x1="510" y1="250" x2="510" y2="350" stroke="#4a2911" strokeWidth="5" />
      <line x1="470" y1="300" x2="550" y2="300" stroke="#4a2911" strokeWidth="5" />
    </svg>
  );
};

export default HauntedHouse;