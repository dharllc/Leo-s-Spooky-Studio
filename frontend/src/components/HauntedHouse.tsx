import React from 'react';

interface HauntedHouseProps {
  isNightMode: boolean;
}

const HauntedHouse: React.FC<HauntedHouseProps> = ({ isNightMode }) => {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
      {/* Sky Gradient Background */}
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          {isNightMode ? (
            <>
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#bae6fd" />
            </>
          )}
        </linearGradient>
      </defs>

      {/* Ground with Gradient */}
      <defs>
        <linearGradient id="groundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          {isNightMode ? (
            <>
              <stop offset="0%" stopColor="#1f2937" />
              <stop offset="100%" stopColor="#111827" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#166534" />
            </>
          )}
        </linearGradient>
      </defs>

      {/* Ground */}
      <rect x="0" y="500" width="800" height="100" fill="url(#groundGradient)">
        <animate 
          attributeName="height" 
          values="100;102;100" 
          dur="3s" 
          repeatCount="indefinite" 
        />
      </rect>
      
      {/* Main House */}
      <path 
        d="M200,200 L600,200 L600,500 L200,500 Z" 
        fill={isNightMode ? "#374151" : "#a16207"}
        className="transition-all duration-1000"
        filter={isNightMode ? "url(#glow)" : ""}
      >
        <animate
          attributeName="d"
          values="M200,200 L600,200 L600,500 L200,500 Z;
                  M200,202 L600,202 L600,500 L200,500 Z;
                  M200,200 L600,200 L600,500 L200,500 Z"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>
      
      {/* Roof with subtle movement */}
      <path 
        d="M150,200 L400,50 L650,200 Z" 
        fill={isNightMode ? "#1f2937" : "#854d0e"}
        className="transition-all duration-1000"
      >
        <animate
          attributeName="d"
          values="M150,200 L400,50 L650,200 Z;
                  M150,200 L400,48 L650,200 Z;
                  M150,200 L400,50 L650,200 Z"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>

      {/* Add glow filter for night mode */}
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Windows with improved animation */}
      {isNightMode ? (
        <>
          <rect x="250" y="250" width="80" height="100" fill="#fef08a" opacity="0.8" filter="url(#glow)">
            <animate 
              attributeName="opacity" 
              values="0.8;0.6;0.8" 
              dur="4s" 
              repeatCount="indefinite" 
            />
          </rect>
          <rect x="470" y="250" width="80" height="100" fill="#fef08a" opacity="0.6" filter="url(#glow)">
            <animate 
              attributeName="opacity" 
              values="0.6;0.8;0.6" 
              dur="3.5s" 
              repeatCount="indefinite" 
            />
          </rect>
        </>
      ) : (
        <>
          <rect x="250" y="250" width="80" height="100" fill="#fef9c3" stroke="#78350f" strokeWidth="10" />
          <rect x="470" y="250" width="80" height="100" fill="#fef9c3" stroke="#78350f" strokeWidth="10" />
        </>
      )}
      
      {/* Door with subtle animation */}
      <path 
        d="M350,500 L450,500 L450,350 L350,350 Z" 
        fill={isNightMode ? "#292524" : "#78350f"}
        className="transition-all duration-1000"
      >
        <animate
          attributeName="d"
          values="M350,500 L450,500 L450,350 L350,350 Z;
                  M350,500 L450,500 L450,352 L350,352 Z;
                  M350,500 L450,500 L450,350 L350,350 Z"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>

      {/* Doorknob with glow effect */}
      <circle 
        cx="430" 
        cy="425" 
        r="10" 
        fill={isNightMode ? "#fbbf24" : "#d4d4d4"}
        filter={isNightMode ? "url(#glow)" : ""}
        className="transition-all duration-1000"
      >
        <animate
          attributeName="r"
          values="10;11;10"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Chimney with enhanced smoke animation */}
      <path 
        d="M500,100 L550,100 L550,180 L500,180 Z" 
        fill={isNightMode ? "#374151" : "#78350f"}
        className="transition-all duration-1000"
      />

      {/* Animated smoke */}
      <g opacity={isNightMode ? "0.4" : "0.2"}>
        <path d="M510,60 Q525,40 540,60 Q525,80 510,60" fill="#94a3b8">
          <animate 
            attributeName="d" 
            values="M510,60 Q525,40 540,60 Q525,80 510,60;
                    M510,60 Q525,30 540,60 Q525,90 510,60;
                    M510,60 Q525,40 540,60 Q525,80 510,60"
            dur="4s" 
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="opacity" 
            values="0.4;0.1;0.4" 
            dur="4s" 
            repeatCount="indefinite" 
          />
        </path>
        <path d="M515,40 Q530,20 545,40 Q530,60 515,40" fill="#94a3b8">
          <animate 
            attributeName="d" 
            values="M515,40 Q530,20 545,40 Q530,60 515,40;
                    M515,40 Q530,10 545,40 Q530,70 515,40;
                    M515,40 Q530,20 545,40 Q530,60 515,40"
            dur="3s" 
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="opacity" 
            values="0.3;0.1;0.3" 
            dur="3s" 
            repeatCount="indefinite" 
          />
        </path>
      </g>
      
      {/* Window Panes */}
      <line x1="290" y1="250" x2="290" y2="350" stroke="#78350f" strokeWidth="5" />
      <line x1="250" y1="300" x2="330" y2="300" stroke="#78350f" strokeWidth="5" />
      <line x1="510" y1="250" x2="510" y2="350" stroke="#78350f" strokeWidth="5" />
      <line x1="470" y1="300" x2="550" y2="300" stroke="#78350f" strokeWidth="5" />
    </svg>
  );
};

export default HauntedHouse;