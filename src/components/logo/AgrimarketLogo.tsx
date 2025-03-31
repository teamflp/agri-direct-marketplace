
import React from 'react';

interface LogoProps {
  variant?: 'default' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

const AgrimarketLogo: React.FC<LogoProps> = ({ 
  variant = 'default',
  size = 'md'
}) => {
  const textColor = variant === 'white' ? 'text-white' : 'text-agrimarket-green';
  const taglineColor = variant === 'white' ? 'text-white/80' : 'text-gray-500';
  
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };
  
  const taglineSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };
  
  return (
    <div className="flex items-center">
      <div className="mr-2">
        {/* Simplified leaf logo inspired by the reference image */}
        <svg width={size === 'sm' ? 24 : size === 'md' ? 32 : 48} height={size === 'sm' ? 24 : size === 'md' ? 32 : 48} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path d="M28.5,10C21,10 13.5,16 10,23C17.5,20 25,21 28.5,28.5C32,21 39.5,20 47,23C43.5,16 36,10 28.5,10Z" fill="#65A30D" />
            <path d="M18.5,23C14,23 9.5,26 8,30C12.5,28 17,28.5 18.5,32.5C20,28.5 24.5,28 29,30C27.5,26 23,23 18.5,23Z" fill="#84CC16" />
          </g>
        </svg>
      </div>
      <div>
        <h1 className={`font-bold ${sizeClasses[size]} ${textColor} tracking-tight uppercase`}>
          AGRIMARKET
        </h1>
        <p className={`${taglineSizes[size]} ${taglineColor} tracking-wide uppercase`}>
          Fraîcheur & Qualité
        </p>
      </div>
    </div>
  );
};

export default AgrimarketLogo;
