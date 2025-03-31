
import React from 'react';

interface LogoProps {
  variant?: 'default' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

const AgrimarketLogo: React.FC<LogoProps> = ({ 
  variant = 'default',
  size = 'md'
}) => {
  const textColor = variant === 'white' ? 'text-white' : 'text-green-700';
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
        <svg width={size === 'sm' ? 24 : size === 'md' ? 32 : 48} height={size === 'sm' ? 24 : size === 'md' ? 32 : 48} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 6C14.5 6 8 16 8 24C8 32 14.5 42 24 42C33.5 42 40 32 40 24C40 16 33.5 6 24 6Z" fill="#84CC16" fillOpacity="0.2" />
          <path d="M24 10C17 10 12 17.5 12 24C12 30.5 17 38 24 38C31 38 36 30.5 36 24C36 17.5 31 10 24 10Z" fill="#84CC16" fillOpacity="0.4" />
          <path d="M24 14.5C20 14.5 16.5 19 16.5 24C16.5 29 20 33.5 24 33.5C28 33.5 31.5 29 31.5 24C31.5 19 28 14.5 24 14.5Z" fill="#84CC16" />
          <path d="M20 21C18.5 25 19.5 29 22 31.5" stroke="#65A30D" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M28 21C29.5 25 28.5 29 26 31.5" stroke="#65A30D" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M24 18.5V14.5" stroke="#65A30D" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M22 10C22 10 20 6.5 24 4.5C28 2.5 29 7.5 29 7.5" stroke="#65A30D" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div>
        <h1 className={`font-bold ${sizeClasses[size]} ${textColor} tracking-tight`}>
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
