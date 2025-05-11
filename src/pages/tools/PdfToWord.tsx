
import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Upload, Download, File, ArrowRight, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const PdfToWord: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [converted, setConverted] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (selectedFile.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }
      
      if (selectedFile.size > 15 * 1024 * 1024) { // 15MB limit
        toast.error('File size exceeds 15MB limit');
        return;
      }
      
      setFile(selectedFile);
      setConverted(false);
      setConvertedUrl(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      
      if (droppedFile.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }
      
      if (droppedFile.size > 15 * 1024 * 1024) { // 15MB limit
        toast.error('File size exceeds 15MB limit');
        return;
      }
      
      setFile(droppedFile);
      setConverted(false);
      setConvertedUrl(null);
    }
  };

  const handleConvert = () => {
    if (!file) {
      toast.error('Please upload a PDF file first');
      return;
    }
    
    setIsConverting(true);
    
    // Simulate conversion process
    setTimeout(() => {
      // Create a dummy file URL for demo purposes
      const blob = new Blob(['dummy content'], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = URL.createObjectURL(blob);
      
      setConvertedUrl(url);
      setIsConverting(false);
      setConverted(true);
      toast.success('File successfully converted to Word format!');
    }, 2000);
  };

  const handleDownload = () => {
    if (!convertedUrl) {
      toast.error('Conversion failed. Please try again.');
      return;
    }
    
    // Create a link and trigger download
    const link = document.createElement('a');
    link.href = convertedUrl;
    link.download = file ? file.name.replace('.pdf', '.docx') : 'converted-document.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Your Word document has been downloaded');
  };

  const handleReset = () => {
    setFile(null);
    setConverted(false);
    setConvertedUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <Helmet>
        <title>PDF to Word Converter Online - Free Tool | Toolify</title>
        <meta name="description" content="Convert PDF files to editable Word documents online for free. No email or registration required. Keep your original formatting intact with our fast conversion tool." />
        <meta name="keywords" content="PDF to Word, convert PDF to Word, PDF to DOCX converter, edit PDF files, free PDF converter, online PDF converter, PDF to Word online, PDF to Word free, no registration PDF converter" />
        <meta property="og:title" content="PDF to Word Converter Online - Free Tool | Toolify" />
        <meta property="og:description" content="Convert PDF files to editable Word documents online for free. No email or registration required." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://toolify.app/tools/pdf-to-word" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PDF to Word Converter Online - Free Tool | Toolify" />
        <meta name="twitter:description" content="Convert PDF files to editable Word documents online for free. No email or registration required." />
        <link rel="canonical" href="https://toolify.app/tools/pdf-to-word" />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16 animate-fade-in min-h-screen">
        <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800 mb-4">
                  File Converter
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                  PDF to Word Converter
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Convert PDF files to editable Word documents in seconds. Free, online, and no registration required.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <Card className="shadow-md border-gray-200">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl font-bold">Convert Your PDF File</CardTitle>
                  <CardDescription>
                    Upload your PDF file to convert it to an editable Word document
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {/* File upload area */}
                  <div className="mb-8">
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                        file ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-blue-400'
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        ref={fileInputRef}
                        accept=".pdf"
                        onChange={handleFileChange}
                      />
                      <div className="flex flex-col items-center justify-center">
                        {file ? (
                          <>
                            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-green-100">
                              <FileText className="h-8 w-8 text-green-600" />
                            </div>
                            <p className="text-lg font-medium">{file.name}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <div className="mt-4 flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleReset();
                                }}
                              >
                                Remove
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  fileInputRef.current?.click();
                                }}
                              >
                                Change
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-100">
                              <Upload className="h-8 w-8 text-blue-600" />
                            </div>
                            <p className="text-lg font-medium">Click to upload or drag and drop</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              PDF (Max 15MB)
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Conversion steps */}
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
                    <div className="flex-1 text-center p-4">
                      <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-3">
                        <File className="h-6 w-6" />
                      </div>
                      <h3 className="text-sm font-medium">Upload PDF</h3>
                    </div>
                    
                    <ArrowRight className="hidden md:block text-gray-400" />
                    
                    <div className="flex-1 text-center p-4">
                      <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto mb-3">
                        <div className={isConverting ? 'animate-spin' : ''}>
                          <RefreshCw className="h-6 w-6" />
                        </div>
                      </div>
                      <h3 className="text-sm font-medium">Convert</h3>
                    </div>
                    
                    <ArrowRight className="hidden md:block text-gray-400" />
                    
                    <div className="flex-1 text-center p-4">
                      <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Download className="h-6 w-6" />
                      </div>
                      <h3 className="text-sm font-medium">Download DOCX</h3>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-6"
                      disabled={!file || isConverting}
                      onClick={handleConvert}
                    >
                      {isConverting ? (
                        <>
                          <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                          Converting...
                        </>
                      ) : 'Convert to Word'}
                    </Button>
                    
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-6"
                      disabled={!converted}
                      onClick={handleDownload}
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download Word Document
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-100">
                <h2 className="text-xl font-bold mb-4">About PDF to Word Conversion</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Our PDF to Word converter transforms your PDF files into editable Microsoft Word documents,
                    preserving the original formatting including text, images, tables, and more.
                  </p>
                  <p>
                    This tool is perfect for when you need to edit a PDF document and don't have access to the original Word file.
                  </p>
                  <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Features:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Maintains original document formatting</li>
                    <li>Converts text, images, and tables</li>
                    <li>High-quality conversion</li>
                    <li>Fast processing</li>
                    <li>100% secure and private</li>
                    <li>Free to use with no registration required</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gradient-to-t from-blue-50 to-white py-12 border-t border-gray-100">
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
                <h3 className="font-semibold mb-2">Financial Tools</h3>
                <a href="/tools/emi-calculator" className="text-muted-foreground hover:text-toolify-600">EMI Calculator</a>
                <a href="/tools/gst-calculator" className="text-muted-foreground hover:text-toolify-600">GST Calculator</a>
                <a href="/tools/interest-calculator" className="text-muted-foreground hover:text-toolify-600">Interest Calculator</a>
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold mb-2">Legal</h3>
                <a href="/privacy-policy" className="text-muted-foreground hover:text-toolify-600">Privacy Policy</a>
                <a href="/terms-of-service" className="text-muted-foreground hover:text-toolify-600">Terms of Service</a>
              </div>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Toolify. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex gap-4">
              <a href="https://twitter.com/toolify" className="hover:text-toolify-600">Twitter</a>
              <a href="https://linkedin.com/company/toolify" className="hover:text-toolify-600">LinkedIn</a>
              <a href="https://github.com/toolify" className="hover:text-toolify-600">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default PdfToWord;
