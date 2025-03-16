
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
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
        'hover:translate-y-[-4px] hover:shadow-card-hover',
        className
      )}
    >
      <div
        className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
          'bg-toolify-50 text-toolify-600',
          iconClassName
        )}
      >
        <Icon size={24} className="transition-transform group-hover:scale-110" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
      <div className="mt-4 text-toolify-600 text-sm font-medium flex items-center opacity-0 transform translate-x-[-8px] transition-all group-hover:opacity-100 group-hover:translate-x-0">
        Use tool
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 ml-1"
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
