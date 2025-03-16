
import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { getQRCodeUrl } from '@/lib/api';
import { QrCode, Download, Link, RefreshCw } from 'lucide-react';

const QrGenerator: React.FC = () => {
  const [tab, setTab] = useState<string>('text');
  const [textInput, setTextInput] = useState<string>('');
  const [urlInput, setUrlInput] = useState<string>('');
  const [size, setSize] = useState<string>('200');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const qrRef = useRef<HTMLImageElement>(null);

  const generateQRCode = () => {
    const content = tab === 'text' ? textInput : urlInput;
    
    if (!content) {
      toast.error(`Please enter ${tab === 'text' ? 'some text' : 'a valid URL'}`);
      return;
    }

    setIsGenerating(true);
    
    try {
      const finalContent = tab === 'url' && !urlInput.startsWith('http') 
        ? `https://${urlInput}` 
        : content;
        
      setQrCodeUrl(getQRCodeUrl(finalContent, parseInt(size)));
      setIsGenerating(false);
      toast.success('QR Code generated successfully!');
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast.error('Failed to generate QR code. Please try again.');
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `toolify-qrcode-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('QR Code downloaded!');
  };

  return (
    <>
      <Helmet>
        <title>QR Code Generator | Toolify</title>
        <meta name="description" content="Generate QR codes for text, URLs, or contact information with Toolify's free QR code generator." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-20 animate-fade-in">
        <section className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-toolify-100 text-toolify-700 flex items-center justify-center">
                  <QrCode size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">QR Code Generator</h1>
                  <p className="text-muted-foreground">
                    Create QR codes for text, URLs, or contact information.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-subtle border border-gray-100">
                <Tabs defaultValue="text" className="mb-6" value={tab} onValueChange={setTab}>
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="text" className="text-base">Text</TabsTrigger>
                    <TabsTrigger value="url" className="text-base">URL</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="text" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="text-input">Enter Text</Label>
                      <Textarea
                        id="text-input"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="Enter the text you want to encode in the QR code"
                        rows={4}
                        className="w-full rounded-lg resize-none"
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="url" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="url-input">Enter URL</Label>
                      <div className="flex items-center space-x-2">
                        <div className="bg-muted px-3 py-2 rounded-l-lg border border-r-0 border-input">
                          <Link size={18} className="text-muted-foreground" />
                        </div>
                        <Input
                          id="url-input"
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                          placeholder="example.com"
                          className="rounded-l-none flex-1"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        'https://' will be added automatically if omitted
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="size">QR Code Size</Label>
                      <Select value={size} onValueChange={setSize}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="100">Small (100×100)</SelectItem>
                          <SelectItem value="200">Medium (200×200)</SelectItem>
                          <SelectItem value="300">Large (300×300)</SelectItem>
                          <SelectItem value="400">Extra Large (400×400)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      onClick={generateQRCode} 
                      disabled={isGenerating} 
                      className="w-full bg-toolify-600 hover:bg-toolify-700"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        'Generate QR Code'
                      )}
                    </Button>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center">
                    {qrCodeUrl ? (
                      <div className="flex flex-col items-center gap-4">
                        <div className="bg-white p-3 rounded-lg shadow-subtle border border-gray-200">
                          <img
                            ref={qrRef}
                            src={qrCodeUrl}
                            alt="Generated QR Code"
                            className="max-w-full h-auto"
                          />
                        </div>
                        <Button
                          onClick={downloadQRCode}
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <Download size={16} />
                          Download QR Code
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center p-6 border-2 border-dashed border-gray-200 rounded-lg">
                        <QrCode size={48} className="text-gray-300 mb-3" />
                        <p className="text-muted-foreground">
                          Your QR code will appear here
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-toolify-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-2">About QR Codes</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  QR codes (Quick Response codes) are two-dimensional barcodes that can store various types of information. They can be scanned using a smartphone camera.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-1">Uses for QR Codes:</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Website URLs</li>
                      <li>Contact information</li>
                      <li>Wi-Fi network credentials</li>
                      <li>Product information</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Tips:</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Keep content concise</li>
                      <li>Test QR codes after creation</li>
                      <li>Use larger sizes for better scanning</li>
                      <li>Add clear instructions near your QR code</li>
                    </ul>
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

export default QrGenerator;
