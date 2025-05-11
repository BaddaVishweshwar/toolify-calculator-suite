
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  className?: string;
  iconClassName?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({
  icon: Icon,
  title,
  description,
  path,
  className = '',
  iconClassName = '',
}) => {
  return (
    <Link
      to={path}
      className={cn(
        'relative overflow-hidden group rounded-2xl p-6 glass-card flex flex-col h-full',
        'transform transition-all duration-300 hover:translate-y-[-8px] hover:shadow-card-hover',
        className
      )}
    >
      <motion.div
        whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          'w-14 h-14 rounded-xl flex items-center justify-center mb-4',
          'bg-gradient-to-r from-toolify-100 to-toolify-200 text-toolify-600',
          'shadow-sm hover:shadow-md transition-shadow',
          iconClassName
        )}
      >
        <Icon size={24} />
      </motion.div>
      
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
      
      <div className="mt-4 text-toolify-600 text-sm font-medium flex items-center opacity-0 transform translate-x-[-8px] transition-all group-hover:opacity-100 group-hover:translate-x-0">
        Use tool
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 ml-1 group-hover:animate-pulse"
        >
          <path
            fillRule="evenodd"
            d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      
      {/* 3D effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </Link>
  );
};

export default ToolCard;
