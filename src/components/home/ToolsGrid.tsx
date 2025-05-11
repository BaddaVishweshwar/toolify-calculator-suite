
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ToolCard from '../ui/ToolCard';
import { tools } from '@/lib/tools';

const ToolsGrid: React.FC = () => {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.2 });

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
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span>Powerful Tools</span>
          <span className="inline-block mt-2 h-1.5 w-20 bg-gradient-to-r from-primary/40 to-primary rounded-full"></span>
        </motion.h2>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Discover our collection of powerful tools designed to simplify your everyday tasks.
        </motion.p>
      </div>

      <motion.div 
        ref={gridRef}
        className="tool-grid relative z-10"
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        {tools.map((tool, index) => (
          <motion.div 
            key={tool.id} 
            variants={item}
            className="relative"
          >
            <ToolCard
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              path={tool.path}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="relative max-w-5xl mx-auto mt-16 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-xl p-8 shadow-sm"
        >
          <p className="text-lg text-gray-800 font-medium mb-2">
            Can't find what you need?
          </p>
          <p className="text-muted-foreground">
            We're constantly expanding our collection of free tools to help you work smarter.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ToolsGrid;
