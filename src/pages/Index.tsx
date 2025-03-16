
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import ToolsGrid from '@/components/home/ToolsGrid';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Toolify - Smart Tools for Everyday Calculations</title>
        <meta name="description" content="Toolify offers a collection of powerful, easy-to-use calculators and utilities to simplify your daily tasks." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen">
        <Hero />
        <ToolsGrid />
        
        <section className="py-20 bg-gradient-to-b from-white to-toolify-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-white rounded-2xl shadow-subtle p-8 md:p-12 max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to simplify your calculations?</h2>
                  <p className="text-muted-foreground mb-6">
                    Start using our tools today and save time on your everyday tasks.
                    All tools are free to use with no sign-up required.
                  </p>
                  <Button className="bg-toolify-600 hover:bg-toolify-700 rounded-full px-6" asChild>
                    <a href="#tools">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
                <div className="flex-1 flex justify-center md:justify-end">
                  <div className="relative w-64 h-64">
                    <div className="absolute inset-0 bg-toolify-100 rounded-full blur-xl opacity-50" />
                    <div className="absolute inset-4 bg-white rounded-full shadow-subtle flex items-center justify-center">
                      <svg
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-24 h-24"
                      >
                        <path
                          d="M20 8L38 8L38 16C38 18.2091 36.2091 20 34 20L24 20C21.7909 20 20 18.2091 20 16L20 8Z"
                          fill="#2980FE"
                          className="fill-toolify-600"
                        />
                        <path
                          d="M26 20L32 20L32 44C32 46.2091 30.2091 48 28 48V48C25.7909 48 24 46.2091 24 44L24 20L26 20Z"
                          fill="#2980FE"
                          className="fill-toolify-600"
                        />
                        <path
                          d="M15 12H43C45.2091 12 47 13.7909 47 16V16C47 18.2091 45.2091 20 43 20H13C10.7909 20 9 18.2091 9 16V16C9 13.7909 10.7909 12 13 12H15Z"
                          fill="#0B50E2"
                          className="fill-toolify-700"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gradient-to-b from-toolify-50 to-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <svg
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-auto mr-2"
                >
                  <path
                    d="M20 8L38 8L38 16C38 18.2091 36.2091 20 34 20L24 20C21.7909 20 20 18.2091 20 16L20 8Z"
                    fill="#2980FE"
                    className="fill-toolify-600"
                  />
                  <path
                    d="M26 20L32 20L32 44C32 46.2091 30.2091 48 28 48V48C25.7909 48 24 46.2091 24 44L24 20L26 20Z"
                    fill="#2980FE"
                    className="fill-toolify-600"
                  />
                  <path
                    d="M15 12H43C45.2091 12 47 13.7909 47 16V16C47 18.2091 45.2091 20 43 20H13C10.7909 20 9 18.2091 9 16V16C9 13.7909 10.7909 12 13 12H15Z"
                    fill="#0B50E2"
                    className="fill-toolify-700"
                  />
                </svg>
                <span className="font-display font-bold text-lg">Toolify</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Smart tools for everyday calculations.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 text-sm">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold mb-2">Navigation</h3>
                <a href="/" className="text-muted-foreground hover:text-toolify-600">Home</a>
                <a href="/about" className="text-muted-foreground hover:text-toolify-600">About</a>
                <a href="/contact" className="text-muted-foreground hover:text-toolify-600">Contact</a>
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold mb-2">Popular Tools</h3>
                <a href="/tools/qr-generator" className="text-muted-foreground hover:text-toolify-600">QR Generator</a>
                <a href="/tools/currency-converter" className="text-muted-foreground hover:text-toolify-600">Currency Converter</a>
                <a href="/tools/percentage-calculator" className="text-muted-foreground hover:text-toolify-600">Percentage Calculator</a>
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold mb-2">Legal</h3>
                <a href="#" className="text-muted-foreground hover:text-toolify-600">Privacy Policy</a>
                <a href="#" className="text-muted-foreground hover:text-toolify-600">Terms of Service</a>
              </div>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Toolify. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex gap-4">
              <a href="#" className="hover:text-toolify-600">Twitter</a>
              <a href="#" className="hover:text-toolify-600">LinkedIn</a>
              <a href="#" className="hover:text-toolify-600">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
