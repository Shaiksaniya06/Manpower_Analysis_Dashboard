import React from 'react';

/**
 * Authentic ISRO & NRSC vector logos with crisp geometry.
 */
export function IsroLogo({ className = "h-9 w-auto" }) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`} title="Indian Space Research Organisation">
      <svg
        viewBox="0 0 160 50"
        className="h-full w-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ISRO Upward Rocket / Solar Crest Symbol */}
        <g transform="translate(4, 5)">
          {/* Blue Solar Panels Wing */}
          <path
            d="M 6,36 L 22,20 L 22,12 L 6,28 Z"
            fill="#0284c7"
          />
          <path
            d="M 12,36 L 28,20 L 28,12 L 12,28 Z"
            fill="#38bdf8"
          />
          {/* Saffron/Orange Rocket Flame */}
          <path
            d="M 22,38 C 22,38 32,32 32,16 C 32,8 26,2 26,2 C 26,2 28,10 26,16 C 24,22 18,28 18,34 Z"
            fill="#f97316"
          />
          <path
            d="M 25,36 C 25,36 30,30 30,18 C 30,12 27,6 27,6 C 27,6 29,11 27,16 C 25,21 21,26 21,32 Z"
            fill="#fbbf24"
          />
          {/* Central Thrust Dot */}
          <circle cx="28" cy="8" r="2.5" fill="#ffffff" />
        </g>
        
        {/* Typography: ISRO & Hindi इसरो */}
        <text
          x="46"
          y="27"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="22"
          letterSpacing="1.5"
          fill="#ffffff"
        >
          ISRO
        </text>
        <text
          x="48"
          y="41"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fontSize="11"
          letterSpacing="2"
          fill="#fdba74"
        >
          इसरो
        </text>
      </svg>
    </div>
  );
}

export function NrscLogo({ className = "h-9 w-auto" }) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`} title="National Remote Sensing Centre">
      <svg
        viewBox="0 0 160 50"
        className="h-full w-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* NRSC Satellite Globe & Orbit Symbol */}
        <g transform="translate(6, 5)">
          {/* Central Earth Globe */}
          <circle cx="20" cy="20" r="14" fill="#0284c7" />
          <path
            d="M 10,20 Q 20,12 30,20 Q 20,28 10,20 Z"
            fill="#0369a1"
            opacity="0.6"
          />
          {/* Golden Orbit Ellipse 1 */}
          <ellipse
            cx="20"
            cy="20"
            rx="19"
            ry="6.5"
            stroke="#f59e0b"
            strokeWidth="2.2"
            transform="rotate(-28 20 20)"
          />
          {/* Saffron Orbit Ellipse 2 */}
          <ellipse
            cx="20"
            cy="20"
            rx="19"
            ry="6.5"
            stroke="#f97316"
            strokeWidth="2.2"
            transform="rotate(35 20 20)"
          />
          {/* Satellite Beacon Dot */}
          <circle cx="34" cy="11" r="3" fill="#ffffff" />
          <circle cx="34" cy="11" r="1.5" fill="#ef4444" />
        </g>

        {/* NRSC Bold Text */}
        <text
          x="48"
          y="27"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="22"
          letterSpacing="1.5"
          fill="#fbbf24"
        >
          NRSC
        </text>
        <text
          x="49"
          y="41"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="600"
          fontSize="9"
          letterSpacing="0.8"
          fill="#94a3b8"
        >
          HYDERABAD
        </text>
      </svg>
    </div>
  );
}
