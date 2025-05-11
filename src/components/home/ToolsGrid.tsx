
import React from 'react';
import { motion } from 'framer-motion';
import ToolCard from '../ui/ToolCard';
import { tools } from '@/lib/tools';

const ToolsGrid: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Define a set of color combinations for tool cards
  const colorSchemes = [
    { bg: 'bg-blue-50', icon: 'bg-blue-100 text-blue-700' },
    { bg: 'bg-green-50', icon: 'bg-green-100 text-green-700' },
    { bg: 'bg-purple-50', icon: 'bg-purple-100 text-purple-700' },
    { bg: 'bg-amber-50', icon: 'bg-amber-100 text-amber-700' },
    { bg: 'bg-rose-50', icon: 'bg-rose-100 text-rose-700' },
    { bg: 'bg-cyan-50', icon: 'bg-cyan-100 text-cyan-700' },
  ];

  return (
    <>
      <motion.div 
        className="tool-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {tools.map((tool, index) => (
          <motion.div 
            key={tool.id} 
            variants={item}
            className="transform transition-all hover:scale-105"
          >
            <ToolCard
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              path={tool.path}
              className={colorSchemes[index % colorSchemes.length].bg}
              iconClassName={colorSchemes[index % colorSchemes.length].icon}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center mt-12">
        <motion.p 
          className="text-lg text-muted-foreground mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Can't find what you need? We're constantly adding new tools!
        </motion.p>
      </div>
    </>
  );
};

export default ToolsGrid;
