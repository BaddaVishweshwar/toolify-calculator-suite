
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Mail, MapPin, Phone, Send, Users, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [communityEmail, setCommunityEmail] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check for empty fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    // Check valid email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      toast.error('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      toast.success('Thank you for your message! We\'ll be in touch soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleCommunitySubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!communityEmail) {
      toast.error('Please enter your email address');
      return;
    }

    // Check valid email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(communityEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    toast.success('Thank you for joining our community!');
    setCommunityEmail('');
  };
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return <>
      <Helmet>
        <title>Contact Toolify - Get in Touch With Us</title>
        <meta name="description" content="Have questions or feedback? Contact the Toolify team. We'd love to hear from you." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 animate-fade-in">
        <section className="py-20 bg-gradient-to-b from-purple-100 via-toolify-50/50 to-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <motion.span 
                className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-toolify-100 text-toolify-800 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Contact Us
              </motion.span>
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-toolify-700 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Get in Touch
              </motion.h1>
              <motion.p 
                className="text-lg text-muted-foreground mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Have questions, feedback, or feature requests? We'd love to hear from you.
              </motion.p>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              className="grid md:grid-cols-3 gap-8 mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              <motion.div 
                className="bg-gradient-to-br from-toolify-50 to-blue-50 rounded-2xl p-8 shadow-subtle border border-gray-100 flex flex-col items-center text-center transform transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-12 h-12 rounded-xl bg-toolify-100 text-toolify-700 flex items-center justify-center mb-6">
                  <Mail size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Email Us</h3>
                <p className="text-muted-foreground mb-4">
                  For general inquiries and support
                </p>
                <a href="mailto:hello@toolify.com" className="text-toolify-600 font-medium hover:underline">buywithjustbuy@gmail.com</a>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-subtle border border-gray-100 flex flex-col items-center text-center transform transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-6">
                  <Phone size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Call Us</h3>
                <p className="text-muted-foreground mb-4">
                  Monday to Friday, 9am to 5pm
                </p>
                <a href="tel:+1234567890" className="text-toolify-600 font-medium hover:underline">+1 (234) 567-890</a>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 shadow-subtle border border-gray-100 flex flex-col items-center text-center transform transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6">
                  <MapPin size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Visit Us</h3>
                <p className="text-muted-foreground mb-4">
                  Our virtual office is always open
                </p>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-toolify-600 font-medium hover:underline flex items-center">
                  View on Map <ExternalLink size={14} className="ml-1" />
                </a>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-subtle border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Your Name
                      </label>
                      <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required placeholder="John Doe" className="w-full rounded-lg border-gray-200 focus:border-toolify-500" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Your Email
                      </label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required placeholder="john@example.com" className="w-full rounded-lg border-gray-200 focus:border-toolify-500" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required placeholder="How can we help you?" className="w-full rounded-lg border-gray-200 focus:border-toolify-500" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required placeholder="Your message here..." rows={6} className="w-full rounded-lg border-gray-200 focus:border-toolify-500" />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="bg-gradient-to-r from-toolify-600 to-purple-600 hover:from-toolify-700 hover:to-purple-700 w-full py-6 rounded-lg"
                  >
                    {isSubmitting ? 'Sending...' : (
                      <>
                        <Send className="mr-2" size={18} />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
        
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              className="bg-gradient-to-br from-toolify-50 to-purple-50 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto shadow-subtle border border-gray-100"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Users className="text-purple-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                  Stay updated with new tools, features, and tips. We never spam, just helpful updates.
                </p>
                <form onSubmit={handleCommunitySubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                  <Input 
                    type="email" 
                    value={communityEmail}
                    onChange={(e) => setCommunityEmail(e.target.value)}
                    placeholder="Your email address" 
                    className="rounded-full bg-white shadow-sm border-gray-200" 
                    required
                  />
                  <Button className="bg-gradient-to-r from-purple-600 to-toolify-600 hover:from-purple-700 hover:to-toolify-700 rounded-full px-6">
                    Subscribe
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gradient-to-b from-purple-50 to-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto mr-2">
                  <path d="M20 8L38 8L38 16C38 18.2091 36.2091 20 34 20L24 20C21.7909 20 20 18.2091 20 16L20 8Z" fill="#2980FE" className="fill-toolify-600" />
                  <path d="M26 20L32 20L32 44C32 46.2091 30.2091 48 28 48V48C25.7909 48 24 46.2091 24 44L24 20L26 20Z" fill="#2980FE" className="fill-toolify-600" />
                  <path d="M15 12H43C45.2091 12 47 13.7909 47 16V16C47 18.2091 45.2091 20 43 20H13C10.7909 20 9 18.2091 9 16V16C9 13.7909 10.7909 12 13 12H15Z" fill="#0B50E2" className="fill-toolify-700" />
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
    </>;
};
export default Contact;
