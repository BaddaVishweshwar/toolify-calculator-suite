
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Image, Upload, Download, RefreshCw, MinusSquare } from 'lucide-react'; // Replace Compress with MinusSquare
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const ImageCompressor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState<number[]>([80]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressed, setCompressed] = useState(false);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!validImageTypes.includes(selectedFile.type)) {
        toast.error('Please upload a valid image file (JPEG, PNG, WebP)');
        return;
      }
      
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('File size exceeds 10MB limit');
        return;
      }
      
      setFile(selectedFile);
      setOriginalSize(selectedFile.size);
      setCompressed(false);
      setCompressedSize(0);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleCompress = () => {
    if (!file) {
      toast.error('Please upload an image file first');
      return;
    }
    
    setIsCompressing(true);
    
    // Simulate compression
    setTimeout(() => {
      // Simulate compression result (reduced by quality percentage)
      const reducedSize = Math.floor(originalSize * (quality[0] / 100) * 0.7);
      setCompressedSize(reducedSize);
      
      setIsCompressing(false);
      setCompressed(true);
      toast.success('Image successfully compressed!');
    }, 1500);
  };

  const handleDownload = () => {
    toast.success('Your compressed image has been downloaded');
    // In a real app, this would trigger a file download
  };

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) {
      return bytes + ' B';
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(2) + ' KB';
    } else {
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }
  };

  const compressionRate = (): number => {
    if (!originalSize || !compressedSize) return 0;
    return Math.floor(((originalSize - compressedSize) / originalSize) * 100);
  };

  return (
    <>
      <Helmet>
        <title>Image Compressor | Toolify</title>
        <meta name="description" content="Compress your images online for free without losing quality. Optimize images for websites and social media." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16 animate-fade-in min-h-screen">
        <section className="py-12 bg-gradient-to-b from-purple-100 to-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-toolify-100 text-toolify-800 mb-4">
                  Optimize Images
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Image Compressor
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Compress and optimize your images without losing quality. Perfect for websites, social media, and email attachments.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-lg border-purple-100">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl font-bold">Compress Your Image</CardTitle>
                  <CardDescription>
                    Upload your image and adjust the compression quality
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {/* File upload area */}
                  <div className="mb-8">
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                        file ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-toolify-400'
                      }`}
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      <input
                        type="file"
                        id="image-upload"
                        className="hidden"
                        accept="image/jpeg,image/png,image/jpg,image/webp"
                        onChange={handleFileChange}
                      />
                      <div className="flex flex-col items-center justify-center">
                        {preview ? (
                          <>
                            <div className="relative mb-4 w-48 h-48">
                              <img src={preview} alt="Preview" className="w-full h-full object-contain rounded-md" />
                            </div>
                            <p className="text-lg font-medium">{file?.name}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Original size: {formatSize(originalSize)}
                            </p>
                            <p className="mt-2 text-sm text-green-600">Click to change image</p>
                          </>
                        ) : (
                          <>
                            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-purple-100">
                              <Image className="h-8 w-8 text-purple-600" />
                            </div>
                            <p className="text-lg font-medium">Click to upload or drag and drop</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              JPG, PNG, WebP (Max 10MB)
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Quality slider */}
                  {file && (
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium">Compression Quality:</label>
                        <span className="text-sm font-bold">{quality[0]}%</span>
                      </div>
                      <Slider
                        value={quality}
                        onValueChange={setQuality}
                        min={30}
                        max={100}
                        step={1}
                        className="my-6"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Smaller file size</span>
                        <span>Higher quality</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Compression results */}
                  {compressed && (
                    <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-800 mb-2">Compression Results:</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Original size:</p>
                          <p className="font-semibold">{formatSize(originalSize)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Compressed size:</p>
                          <p className="font-semibold">{formatSize(compressedSize)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Compression rate:</p>
                          <p className="font-semibold text-green-600">{compressionRate()}% reduced</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Quality level:</p>
                          <p className="font-semibold">{quality[0]}%</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-6"
                      disabled={!file || isCompressing}
                      onClick={handleCompress}
                    >
                      {isCompressing ? (
                        <>
                          <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                          Compressing...
                        </>
                      ) : (
                        'Compress Image'
                      )}
                    </Button>
                    
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-6"
                      disabled={!compressed}
                      onClick={handleDownload}
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download Compressed Image
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-100">
                <h2 className="text-xl font-bold mb-4">About Image Compression</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Image compression is the process of reducing the file size of an image while maintaining acceptable quality.
                    This is especially important for websites and applications where smaller file sizes lead to faster loading times.
                  </p>
                  <p>
                    Our tool uses smart compression algorithms to reduce file size while preserving visual quality, finding the perfect balance.
                  </p>
                  <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Benefits:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Faster website loading speed</li>
                    <li>Reduced bandwidth usage</li>
                    <li>Lower storage requirements</li>
                    <li>Better user experience on mobile devices</li>
                    <li>Improved SEO performance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gradient-to-t from-purple-50 to-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          {/* Keep existing footer code */}
        </div>
      </footer>
    </>
  );
};

export default ImageCompressor;
