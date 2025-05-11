
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
        'relative overflow-hidden group rounded-2xl p-6',
        'transform transition-all duration-300 hover:translate-y-[-6px]',
        'bg-gradient-to-br from-white to-gray-50',
        'border border-gray-100 hover:border-primary/20',
        'shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)]',
        className
      )}
    >
      <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-[100px] bg-gradient-to-br from-primary/5 to-primary/10 -z-10" />
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-tr-[120px] bg-gradient-to-br from-primary/0 to-primary/5 -z-10" />
      
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ duration: 0.3 }}
        className={cn(
          'w-16 h-16 rounded-2xl flex items-center justify-center mb-5',
          'bg-gradient-to-br from-primary/10 via-primary/15 to-primary/20 text-primary',
          'shadow-sm hover:shadow-md transition-shadow',
          iconClassName
        )}
      >
        <Icon size={28} className="text-primary" />
      </motion.div>
      
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      
      <div className="mt-4 text-primary font-medium flex items-center opacity-0 transform translate-x-[-8px] transition-all group-hover:opacity-100 group-hover:translate-x-0">
        Use tool
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 ml-1 group-hover:animate-pulse"
        >
          <path
            fillRule="evenodd"
            d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </Link>
  );
};

export default ToolCard;
