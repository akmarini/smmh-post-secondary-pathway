import React from 'react';

interface SmmhtLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  withGlow?: boolean;
}

export const SmmhtLogo: React.FC<SmmhtLogoProps> = ({
  className = '',
  size = 'md',
  withGlow = false
}) => {
  const sizeMap = {
    xs: 'w-8 h-8 min-w-[2rem] min-h-[2rem]',
    sm: 'w-10 h-10 min-w-[2.5rem] min-h-[2.5rem]',
    md: 'w-12 h-12 min-w-[3rem] min-h-[3rem]',
    lg: 'w-16 h-16 min-w-[4rem] min-h-[4rem]',
    xl: 'w-24 h-24 min-w-[6rem] min-h-[6rem]',
    '2xl': 'w-32 h-32 min-w-[8rem] min-h-[8rem]'
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${currentSize} ${className}`}>
      {withGlow && (
        <div className="absolute inset-0 rounded-full bg-sky-400/20 blur-md -z-10 animate-pulse" />
      )}
      <svg
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm select-none"
      >
        <defs>
          {/* Chevron 1 Left Gradient (fading speed lines) */}
          <linearGradient id="chevSpeedGrad" x1="160" y1="170" x2="260" y2="170" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="35%" stopColor="#E0F2FE" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#7DD3FC" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          {/* Chevron 2 Mid Gradient */}
          <linearGradient id="chevMidGrad" x1="220" y1="160" x2="310" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>

          {/* Chevron 3 Main Dark Blue Gradient */}
          <linearGradient id="chevMainGrad" x1="260" y1="160" x2="370" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#0B5796" />
          </linearGradient>

          {/* SMMHT Shield Fill */}
          <linearGradient id="crestShieldGrad" x1="300" y1="310" x2="300" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          {/* Golden Paddy Stalks */}
          <linearGradient id="paddyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>

          {/* Curved Text Path: Bottom Left "Unit Pendidikan Kerjaya SMMHT" */}
          <path
            id="unitKerjayaArc"
            d="M 160 300 A 210 210 0 0 0 380 480"
            fill="none"
          />

          {/* Curved Text Path: Top Right "Guiding Your Path, Shaping Your Future" */}
          <path
            id="mottoArc"
            d="M 370 175 A 210 210 0 0 1 495 400"
            fill="none"
          />
        </defs>

        {/* 1. OUTER ORBITAL STEEL-BLUE RING */}
        <path
          d="M 180 185 
             A 200 200 0 1 0 405 450"
          fill="none"
          stroke="#6898B4"
          strokeWidth="18"
          strokeLinecap="round"
        />

        {/* 2. DYNAMIC CHEVRONS / ARROWS AT THE TOP */}
        {/* Chevron 1 (Leftmost with speed lines) */}
        <g fill="url(#chevSpeedGrad)">
          <rect x="200" y="145" width="40" height="18" rx="2" />
          <rect x="200" y="172" width="60" height="18" rx="2" />
          <rect x="200" y="199" width="40" height="18" rx="2" />
          <path d="M 230 145 L 268 181 L 230 217 L 246 217 L 284 181 L 246 145 Z" />
        </g>

        {/* Chevron 2 (Middle Sky Blue Arrow) */}
        <path
          d="M 252 135 L 302 181 L 252 227 L 272 227 L 322 181 L 272 135 Z"
          fill="url(#chevMidGrad)"
        />

        {/* Chevron 3 (Rightmost Solid Navy Blue Arrow) */}
        <path
          d="M 292 120 L 368 181 L 292 242 L 320 242 L 396 181 L 320 120 Z"
          fill="url(#chevMainGrad)"
        />

        {/* 3. CURVED TEXT LABELS */}
        {/* "Unit Pendidikan Kerjaya SMMHT" (Bottom-Left) */}
        <text
          fontSize="16.5"
          fontFamily="'Arial Black', 'Trebuchet MS', sans-serif"
          fontWeight="900"
          fill="#0B6396"
          letterSpacing="0.8"
        >
          <textPath href="#unitKerjayaArc" startOffset="5%">
            Unit Pendidikan Kerjaya SMMHT
          </textPath>
        </text>

        {/* "Guiding Your Path, Shaping Your Future" (Upper-Right) */}
        <text
          fontSize="16"
          fontFamily="'Arial Black', 'Trebuchet MS', sans-serif"
          fontWeight="900"
          fill="#0B4D78"
          letterSpacing="0.6"
        >
          <textPath href="#mottoArc" startOffset="6%">
            Guiding Your Path, Shaping Your Future
          </textPath>
        </text>

        {/* 4. GRADUATION CAP (MORTARBOARD) */}
        {/* Cap Base (Cyan Body) */}
        <path
          d="M 200 305 
             L 200 380 
             C 200 415, 360 415, 360 380 
             L 360 305 
             Z"
          fill="#38BDF8"
          stroke="#0284C7"
          strokeWidth="4"
        />

        {/* Cap Top Rhombus (Mortarboard Slate) */}
        <polygon
          points="280,250 405,285 280,320 155,285"
          fill="#FFFFFF"
          stroke="#0284C7"
          strokeWidth="7"
          strokeLinejoin="round"
        />

        {/* Center Button */}
        <circle cx="280" cy="285" r="5.5" fill="#0284C7" />

        {/* Tassel Cord running to right */}
        <path
          d="M 280 285 L 388 290 C 395 290, 395 298, 388 298 L 385 320"
          fill="none"
          stroke="#0284C7"
          strokeWidth="9"
          strokeLinecap="round"
        />

        {/* Tassel Dangle Bob */}
        <path
          d="M 378 320 L 392 320 L 398 360 C 398 364, 372 364, 372 360 Z"
          fill="#38BDF8"
          stroke="#0284C7"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* 5. SMMHT SCHOOL CREST CENTERED ON MORTARBOARD BASE */}
        <g transform="translate(196, 310) scale(0.84)">
          {/* Shield Outline */}
          <path
            d="M 100 24
               C 114 24, 126 20, 136 28
               C 130 38, 134 52, 146 48
               C 162 44, 172 68, 168 96
               C 162 130, 138 152, 100 168
               C 62 152, 38 130, 32 96
               C 28 68, 38 44, 54 48
               C 66 52, 70 38, 64 28
               C 74 20, 86 24, 100 24 Z"
            fill="url(#crestShieldGrad)"
            stroke="#0F172A"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />

          {/* Torch Flame at top */}
          <path
            d="M 100 44 C 109 52, 110 60, 105 64 C 102 66, 98 66, 95 64 C 90 60, 91 52, 100 44 Z"
            fill="#EF4444"
            stroke="#991B1B"
            strokeWidth="1.6"
          />

          {/* Wheat / Paddy Stalks Left & Right */}
          <g stroke="#0F172A" strokeWidth="1.5" strokeLinejoin="round" fill="url(#paddyGrad)">
            {/* Left Stalks */}
            <ellipse cx="38" cy="98" rx="4.5" ry="7.5" transform="rotate(-30 38 98)" />
            <ellipse cx="35" cy="110" rx="4.5" ry="7.5" transform="rotate(-15 35 110)" />
            <ellipse cx="38" cy="122" rx="5" ry="8" transform="rotate(0 38 122)" />
            <ellipse cx="46" cy="132" rx="5" ry="8" transform="rotate(20 46 132)" />

            {/* Right Stalks */}
            <ellipse cx="162" cy="98" rx="4.5" ry="7.5" transform="rotate(30 162 98)" />
            <ellipse cx="165" cy="110" rx="4.5" ry="7.5" transform="rotate(15 165 110)" />
            <ellipse cx="162" cy="122" rx="5" ry="8" transform="rotate(0 162 122)" />
            <ellipse cx="154" cy="132" rx="5" ry="8" transform="rotate(-20 154 132)" />
          </g>

          {/* Open Book */}
          <path
            d="M 64 68 C 80 66, 96 70, 100 72 C 104 70, 120 66, 136 68 L 136 108 C 120 106, 104 110, 100 112 C 96 110, 80 106, 64 108 Z"
            fill="#FFFFFF"
            stroke="#0F172A"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <line x1="100" y1="72" x2="100" y2="112" stroke="#0F172A" strokeWidth="2.2" />

          {/* Book Quadrants Text (EX-CEL-SI-OR) */}
          <text x="82" y="84" textAnchor="middle" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="10.5" fill="#0F172A">EX</text>
          <text x="82" y="102" textAnchor="middle" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="9.5" fill="#0F172A">CEL</text>
          <text x="118" y="84" textAnchor="middle" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="10.5" fill="#0F172A">SI</text>
          <text x="118" y="102" textAnchor="middle" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="9.5" fill="#0F172A">OR</text>

          {/* SMMHT Scroll Banner */}
          <path
            d="M 44 140 C 60 135, 80 142, 100 142 C 120 142, 140 135, 156 140 C 148 154, 134 160, 122 158 C 110 163, 90 163, 78 158 C 66 160, 52 154, 44 140 Z"
            fill="url(#crestShieldGrad)"
            stroke="#0F172A"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path id="crestScrollPath" d="M 54 154 C 78 160, 122 160, 146 154" fill="none" />
          <text fontSize="12" fontFamily="'Arial Black', sans-serif" fontWeight="900" fill="#0F172A" letterSpacing="1.2">
            <textPath href="#crestScrollPath" startOffset="50%" textAnchor="middle">
              SMMHT
            </textPath>
          </text>
        </g>
      </svg>
    </div>
  );
};



