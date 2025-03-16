
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Users, Zap, Shield } from 'lucide-react';

const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About Toolify - Our Mission and Vision</title>
        <meta name="description" content="Learn about Toolify's mission to provide powerful and easy-to-use calculation tools for everyone." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 animate-fade-in">
        <section className="py-20 bg-gradient-to-b from-toolify-50/50 to-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-toolify-100 text-toolify-800 mb-4">
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Simplifying Complex Calculations
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Toolify was born from a simple idea: make everyday calculations accessible and easy for everyone, regardless of technical background.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  Toolify started as a personal project to solve common calculation problems without having to install multiple apps or navigate complex software.
                </p>
                <p className="text-muted-foreground mb-4">
                  What began as a simple calculator soon evolved into a comprehensive suite of tools designed to help people with everyday tasks - from generating QR codes to calculating complex financial formulas.
                </p>
                <p className="text-muted-foreground mb-4">
                  Today, Toolify serves thousands of users worldwide, helping them save time and reduce errors in their daily calculations.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-toolify-100 rounded-2xl blur-xl opacity-50 transform rotate-3" />
                <div className="absolute inset-0 bg-toolify-200 rounded-2xl blur-xl opacity-50 transform -rotate-3" />
                <div className="relative bg-white rounded-2xl shadow-subtle p-8 border border-gray-100">
                  <div className="flex items-center justify-center mb-6">
                    <svg
                      viewBox="0 0 56 56"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-auto"
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
                  <h3 className="text-xl font-semibold text-center mb-2">The Toolify Philosophy</h3>
                  <p className="text-center text-muted-foreground mb-6">
                    "Great tools should be simple, accessible, and reliable."
                  </p>
                  <div className="grid gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-toolify-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Simplicity First</h4>
                        <p className="text-sm text-muted-foreground">
                          We believe powerful tools don't need to be complicated.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-toolify-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Universal Access</h4>
                        <p className="text-sm text-muted-foreground">
                          Available on any device with a web browser, no downloads required.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-toolify-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Continuously Evolving</h4>
                        <p className="text-sm text-muted-foreground">
                          We regularly add new tools and improve existing ones.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-gradient-to-b from-white to-toolify-50/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Toolify?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our tools are designed with you in mind, focusing on what matters most.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-subtle border border-gray-100 transition-all hover:shadow-card-hover">
                <div className="w-12 h-12 rounded-xl bg-toolify-100 text-toolify-700 flex items-center justify-center mb-6">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Fast & Efficient</h3>
                <p className="text-muted-foreground">
                  Optimized for speed and efficiency, our tools give you results instantly without waiting.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-subtle border border-gray-100 transition-all hover:shadow-card-hover">
                <div className="w-12 h-12 rounded-xl bg-toolify-100 text-toolify-700 flex items-center justify-center mb-6">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">User-Friendly</h3>
                <p className="text-muted-foreground">
                  Intuitive interfaces that anyone can use without a learning curve or technical knowledge.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-subtle border border-gray-100 transition-all hover:shadow-card-hover">
                <div className="w-12 h-12 rounded-xl bg-toolify-100 text-toolify-700 flex items-center justify-center mb-6">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Private & Secure</h3>
                <p className="text-muted-foreground">
                  We don't store your data. All calculations happen in your browser for maximum privacy.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-white rounded-2xl shadow-subtle p-8 md:p-12 max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore our collection of tools and simplify your calculations today.
                </p>
              </div>
              <div className="flex justify-center">
                <Button className="bg-toolify-600 hover:bg-toolify-700 rounded-full px-8 py-6 text-base" asChild>
                  <a href="/#tools">Explore Our Tools</a>
                </Button>
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

export default About;
