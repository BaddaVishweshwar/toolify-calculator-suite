
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToTools = () => {
    const toolsSection = document.getElementById('tools');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-toolify-50/80 to-background z-[-1]" />

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden z-[-2]">
        <div className="absolute top-[10%] right-[10%] w-64 h-64 rounded-full bg-toolify-200/30 blur-3xl" />
        <div className="absolute bottom-[10%] left-[5%] w-72 h-72 rounded-full bg-toolify-100/20 blur-2xl" />
        <div className="absolute top-[30%] left-[15%] w-96 h-96 rounded-full bg-toolify-300/10 blur-2xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-toolify-100 text-toolify-800 mb-4">
              Smart tools for everyday calculations
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Every Tool You Need, <br />
              <span className="text-toolify-600">All in One Place</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Toolify offers a collection of powerful, easy-to-use calculators and 
              utilities to simplify your daily tasks. No installations. No complications.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              size="lg" 
              className="bg-toolify-600 hover:bg-toolify-700 rounded-full px-6 text-base"
              onClick={scrollToTools}
            >
              Explore Tools
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="rounded-full px-6 text-base border-gray-300"
              asChild
            >
              <a href="/about">Learn More</a>
            </Button>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={scrollToTools}
            className="rounded-full opacity-70 hover:opacity-100"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
