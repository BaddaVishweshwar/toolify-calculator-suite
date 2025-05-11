
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

  // Create an array of vibrant gradient backgrounds for the header
  const gradientClasses = [
    'from-blue-500/20 to-purple-500/20',
    'from-green-500/20 to-blue-500/20',
    'from-amber-500/20 to-pink-500/20',
    'from-teal-500/20 to-cyan-500/20',
    'from-purple-500/20 to-pink-500/20'
  ];

  // Choose a random gradient for the header
  const randomGradientClass = gradientClasses[Math.floor(Math.random() * gradientClasses.length)];

  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto mb-16 text-center">
        <motion.div
          className={`inline-block rounded-full px-6 py-3 mb-6 bg-gradient-to-r ${randomGradientClass}`}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            All Tools
          </span>
        </motion.div>
        
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="relative">
            Powerful Tools Collection
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1.5 w-24 bg-gradient-to-r from-blue-500/60 to-purple-500/60 rounded-full"></span>
          </span>
        </motion.h2>
        
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Discover our collection of powerful tools designed to simplify your everyday tasks
        </motion.p>
      </div>

      <motion.div 
        ref={gridRef}
        className="tool-grid relative z-10 px-4 md:px-0"
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        {tools.map((tool, index) => (
          <motion.div 
            key={tool.id} 
            variants={item}
            className="relative"
            style={{ 
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
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

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="max-w-5xl mx-auto mt-16 px-4 md:px-0"
      >
        <div className="rounded-2xl p-8 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-slow" />
          <div className="absolute inset-0 backdrop-blur-xl" />
          
          <div className="relative z-10">
            <p className="text-lg font-medium mb-2 text-center">
              Can't find what you need?
            </p>
            <p className="text-muted-foreground text-center">
              We're constantly expanding our collection of free tools to help you work smarter.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ToolsGrid;
