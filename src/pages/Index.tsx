
import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import ToolsGrid from '@/components/home/ToolsGrid';
import Hero from '@/components/home/Hero';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index: React.FC = () => {
  const featuresRef = useRef(null);
  const isInView = useInView(featuresRef, { once: true, amount: 0.2 });

  return (
    <>
      <Helmet>
        <title>Toolify - Free Online Calculators & Tools Collection | Financial, Date & Conversion Tools</title>
        <meta name="description" content="Toolify offers free online calculators and tools for finance, date calculations, unit conversions, and more. No signup required for EMI, GST, interest, age calculators, date difference, profit/loss calculations, currency conversion, and more." />
        <meta name="keywords" content="online calculators, free tools, financial calculators, date calculators, conversion tools, EMI calculator, GST calculator, interest calculator, age calculator, date difference, profit loss calculator, currency converter, unit converter, area calculator, word counter, QR generator, world clock, tax calculator, percentage calculator, measurement tools, online utilities" />
        <link rel="canonical" href="https://toolify.app/" />
        <meta property="og:title" content="Toolify - Free Online Calculators & Tools Collection" />
        <meta property="og:description" content="Free online calculators for finance, dates, conversions and more. No signup required." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://toolify.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Toolify - Free Online Calculators & Tools Collection" />
        <meta name="twitter:description" content="Free online calculators for finance, dates, conversions and more. No signup required." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen overflow-x-hidden">
        {/* Hero section with animated background */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl opacity-60 translate-y-1/3 -translate-x-1/3" />
          </div>
          
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-10 max-w-3xl"
              >
                <motion.div 
                  className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary font-medium"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                >
                  Simplify your everyday tasks
                </motion.div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                  Your Ultimate <span className="text-gradient-purple">Tool Collection</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Discover our powerful suite of free online tools designed to make your 
                  life easier. No signup required.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Tools Grid - Now at the top of the page */}
        <section id="tools" className="relative py-6 md:py-12">
          <div className="container px-4 md:px-6 mx-auto">
            <ToolsGrid />
          </div>
        </section>
        
        {/* Features Section */}
        <section ref={featuresRef} className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3" />
          </div>
          
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Toolify?</h2>
              <div className="mx-auto h-1 w-20 bg-primary/30 rounded-full mb-6"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our tools are designed with simplicity and efficiency in mind.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  title: "Free & Easy to Use",
                  description: "All our tools are completely free with no signup required. Just visit and start using instantly.",
                  delay: 0.1
                },
                {
                  title: "Accurate Results",
                  description: "Our calculators are designed to provide precise results for all your financial and conversion needs.",
                  delay: 0.2
                },
                {
                  title: "Time-Saving",
                  description: "Save valuable time with our optimized tools that deliver quick results for your everyday calculations.",
                  delay: 0.3
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: feature.delay }}
                  className="relative p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] -z-10" />
                  <h3 className="text-xl font-semibold mb-3 text-primary">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="perspective-container"
            >
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-10 border border-gray-100">
                <div className="flex flex-col md:flex-row items-center gap-12">
                  <div className="flex-1 text-left">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Ready to simplify your calculations?</h2>
                    <p className="text-muted-foreground mb-8">
                      Start using our tools today and save time on your everyday tasks.
                      All tools are free to use with no sign-up required.
                    </p>
                    <Button className="bg-primary hover:bg-primary/90 rounded-full px-8 py-6 text-base shadow-md hover:shadow-lg" asChild>
                      <a href="#tools">
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  <div className="flex-1 flex justify-center md:justify-end">
                    <motion.div 
                      className="relative w-64 h-64"
                      animate={{ rotateY: [0, 10, 0, -10, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="absolute inset-0 bg-blue-100/50 rounded-full blur-2xl opacity-60" />
                      <motion.div 
                        className="absolute inset-4 bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden"
                        animate={{ borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <svg
                          viewBox="0 0 56 56"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-32 h-32"
                        >
                          <motion.path
                            d="M20 8L38 8L38 16C38 18.2091 36.2091 20 34 20L24 20C21.7909 20 20 18.2091 20 16L20 8Z"
                            fill="#3b66f5"
                            animate={{ fill: ["#3b66f5", "#4c3bf5", "#3b66f5"] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                          <motion.path
                            d="M26 20L32 20L32 44C32 46.2091 30.2091 48 28 48V48C25.7909 48 24 46.2091 24 44L24 20L26 20Z"
                            fill="#3b66f5"
                            animate={{ fill: ["#3b66f5", "#4c3bf5", "#3b66f5"] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                          />
                          <motion.path
                            d="M15 12H43C45.2091 12 47 13.7909 47 16V16C47 18.2091 45.2091 20 43 20H13C10.7909 20 9 18.2091 9 16V16C9 13.7909 10.7909 12 13 12H15Z"
                            fill="#304aca"
                            animate={{ fill: ["#304aca", "#4133ca", "#304aca"] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                          />
                        </svg>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <footer className="relative bg-gradient-to-t from-gray-50 to-white py-16 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-10 md:mb-0">
              <div className="flex items-center">
                <svg
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-auto mr-3"
                >
                  <path
                    d="M20 8L38 8L38 16C38 18.2091 36.2091 20 34 20L24 20C21.7909 20 20 18.2091 20 16L20 8Z"
                    fill="#3b66f5"
                  />
                  <path
                    d="M26 20L32 20L32 44C32 46.2091 30.2091 48 28 48V48C25.7909 48 24 46.2091 24 44L24 20L26 20Z"
                    fill="#3b66f5"
                  />
                  <path
                    d="M15 12H43C45.2091 12 47 13.7909 47 16V16C47 18.2091 45.2091 20 43 20H13C10.7909 20 9 18.2091 9 16V16C9 13.7909 10.7909 12 13 12H15Z"
                    fill="#304aca"
                  />
                </svg>
                <span className="font-display font-bold text-xl">Toolify</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Smart tools for everyday calculations.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold mb-2">Navigation</h3>
                <a href="/" className="text-muted-foreground hover:text-primary">Home</a>
                <a href="/about" className="text-muted-foreground hover:text-primary">About</a>
                <a href="/contact" className="text-muted-foreground hover:text-primary">Contact</a>
              </div>
              
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold mb-2">Popular Tools</h3>
                <a href="/tools/qr-generator" className="text-muted-foreground hover:text-primary">QR Generator</a>
                <a href="/tools/currency-converter" className="text-muted-foreground hover:text-primary">Currency Converter</a>
                <a href="/tools/percentage-calculator" className="text-muted-foreground hover:text-primary">Percentage Calculator</a>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-semibold mb-2">Financial Tools</h3>
                <a href="/tools/emi-calculator" className="text-muted-foreground hover:text-primary">EMI Calculator</a>
                <a href="/tools/gst-calculator" className="text-muted-foreground hover:text-primary">GST Calculator</a>
                <a href="/tools/interest-calculator" className="text-muted-foreground hover:text-primary">Interest Calculator</a>
              </div>
              
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold mb-2">Legal</h3>
                <a href="/privacy-policy" className="text-muted-foreground hover:text-primary">Privacy Policy</a>
                <a href="/terms-of-service" className="text-muted-foreground hover:text-primary">Terms of Service</a>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Toolify. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex gap-6">
              <a href="https://twitter.com/toolify" className="hover:text-primary">Twitter</a>
              <a href="https://linkedin.com/company/toolify" className="hover:text-primary">LinkedIn</a>
              <a href="https://github.com/toolify" className="hover:text-primary">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
