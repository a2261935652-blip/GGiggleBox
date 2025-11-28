import React from 'react';

export const GiggleLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 512 512" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Excitement Rays */}
      <path d="M256 40 L256 80" stroke="#EA580C" strokeWidth="24" strokeLinecap="round" />
      <path d="M150 60 L170 95" stroke="#EA580C" strokeWidth="24" strokeLinecap="round" />
      <path d="M362 60 L342 95" stroke="#EA580C" strokeWidth="24" strokeLinecap="round" />

      {/* Box Back/Inside (Darker Orange) */}
      <path 
        d="M110 150 L402 150 L380 400 L132 400 Z" 
        fill="#C2410C" 
      />

      {/* Box Body (Main Orange) */}
      <path 
        d="M100 150 L125 430 Q130 460 170 460 L342 460 Q382 460 387 430 L412 150" 
        fill="#F97316" 
        stroke="#9A3412" 
        strokeWidth="12" 
        strokeLinejoin="round"
      />
      
      {/* Box Rim (Top Flap) */}
      <path 
        d="M85 150 Q256 200 427 150 L415 120 Q256 170 97 120 Z" 
        fill="#EA580C" 
        stroke="#9A3412" 
        strokeWidth="12"
        strokeLinejoin="round"
      />

      {/* Face - Eyes */}
      <circle cx="190" cy="280" r="24" fill="#0B1E3B" />
      <circle cx="322" cy="280" r="24" fill="#0B1E3B" />
      
      {/* Face - Mouth (Smile) */}
      <path 
        d="M190 350 Q256 430 322 350 Z" 
        fill="#0B1E3B" 
      />
    </svg>
  );
};