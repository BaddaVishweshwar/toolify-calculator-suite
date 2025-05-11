
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

  // 3D animation effects
  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror" as const
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden py-16">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-300 via-toolify-100/80 to-blue-200 z-[-1]" />

      {/* Dynamic 3D background elements */}
      <div className="absolute inset-0 overflow-hidden z-[-2]">
        <motion.div 
          className="absolute top-[10%] right-[10%] w-64 h-64 rounded-full bg-purple-200/50 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[10%] left-[5%] w-72 h-72 rounded-full bg-pink-200/40 blur-2xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute top-[30%] left-[15%] w-96 h-96 rounded-full bg-blue-300/30 blur-2xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.span 
              className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-toolify-100 text-toolify-800 mb-4"
              animate={floatAnimation}
            >
              Smart tools for everyday calculations
            </motion.span>
            
            <motion.div
              className="relative inline-block"
              initial={{ perspective: 1000 }}
            >
              <motion.h2 
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 tracking-tight bg-gradient-to-r from-toolify-700 via-purple-600 to-blue-600 bg-clip-text text-transparent"
                animate={{ 
                  rotateX: [0, 5, 0, -5, 0], 
                  transition: { duration: 5, repeat: Infinity, ease: "easeInOut" } 
                }}
              >
                Every Tool You Need, All in One Place
              </motion.h2>
            </motion.div>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8">
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
              className="bg-toolify-600 hover:bg-toolify-700 rounded-full px-6 text-base shadow-lg hover:shadow-xl transition-shadow"
              onClick={scrollToTools}
            >
              Explore Tools
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="rounded-full px-6 text-base border-gray-300 bg-white/80 backdrop-blur-sm hover:bg-white/90"
              asChild
            >
              <a href="/about">Learn More</a>
            </Button>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={scrollToTools}
            className="rounded-full opacity-70 hover:opacity-100 bg-white/30 backdrop-blur-sm"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
