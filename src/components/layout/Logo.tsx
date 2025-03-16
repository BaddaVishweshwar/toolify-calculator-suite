
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  };

  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        <svg
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`h-full w-auto`}
        >
          <path
            d="M20 8L38 8L38 16C38 18.2091 36.2091 20 34 20L24 20C21.7909 20 20 18.2091 20 16L20 8Z"
            fill="#2980FE"
            className="fill-toolify-600"
          />
          <path
            d="M26 20L32 20L32 44C32 46.2091 30.2091 48 28 48V48C25.7909 48 24 46.2091 24 44L24 20L26 20Z"
            fill="#2980FE"
            className="fill-toolify-600"
          />
          <path
            d="M15 12H43C45.2091 12 47 13.7909 47 16V16C47 18.2091 45.2091 20 43 20H13C10.7909 20 9 18.2091 9 16V16C9 13.7909 10.7909 12 13 12H15Z"
            fill="#0B50E2"
            className="fill-toolify-700"
          />
        </svg>
      </div>
      <span className="font-display font-bold text-foreground text-xl tracking-tight">
        Toolify
      </span>
    </Link>
  );
};

export default Logo;
