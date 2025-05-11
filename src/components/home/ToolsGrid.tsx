
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
            style={{ 
              zIndex: tools.length - index,
              transformStyle: "preserve-3d",
              perspective: "1000px"
            }}
          >
            <ToolCard
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              path={tool.path}
              className={`gradient-${index % 5}`}
              iconClassName={`bg-gradient-to-br ${index % 2 === 0 ? 'from-purple-100 to-purple-200 text-purple-600' : 'from-blue-100 to-blue-200 text-blue-600'}`}
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
