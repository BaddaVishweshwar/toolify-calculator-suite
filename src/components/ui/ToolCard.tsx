
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
    <motion.div
      whileHover={{ 
        translateY: -10,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      className="perspective-3d"
    >
      <Link
        to={path}
        className={cn(
          'relative block overflow-hidden group rounded-2xl p-6',
          'transform transition-all duration-300',
          'bg-gradient-to-br from-white to-gray-50',
          'border border-gray-100',
          'shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)]',
          className
        )}
      >
        <div className="absolute top-0 right-0 w-[120%] h-[120%] -z-10 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-primary/10 rounded-full blur-3xl opacity-70 -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[120%] h-[120%] -z-10 bg-gradient-to-tr from-blue-400/10 via-green-300/5 to-purple-400/10 rounded-full blur-3xl opacity-70 translate-y-1/3 -translate-x-1/3" />
        
        <motion.div
          initial={{ rotateY: 0 }}
          whileHover={{ rotateY: 15, rotateX: -5, scale: 1.1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={cn(
            'w-16 h-16 rounded-xl flex items-center justify-center mb-5 transform transition-all duration-300',
            'bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 text-primary',
            'shadow-lg shadow-primary/20',
            iconClassName
          )}
        >
          <Icon size={28} className="text-primary" />
        </motion.div>
        
        <motion.div
          initial={{ translateZ: 0 }}
          whileHover={{ translateZ: 10 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
          
          <div className="mt-4 text-primary font-medium flex items-center opacity-0 transform translate-x-[-8px] transition-all group-hover:opacity-100 group-hover:translate-x-0">
            Use tool
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 ml-1 group-hover:animate-bounce"
            >
              <path
                fillRule="evenodd"
                d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ToolCard;
