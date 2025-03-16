
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
    <section id="tools" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-toolify-100 text-toolify-800 mb-3">
            Powerful & Intuitive
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Our Tools
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our collection of powerful tools designed to simplify complex calculations and everyday tasks.
          </p>
        </div>

        <motion.div 
          className="tool-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {tools.map((tool) => (
            <motion.div key={tool.id} variants={item}>
              <ToolCard
                icon={tool.icon}
                title={tool.title}
                description={tool.description}
                path={tool.path}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsGrid;
