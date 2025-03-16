
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Percent, Calculator } from 'lucide-react';

const PercentageCalculator: React.FC = () => {
  const [tab, setTab] = useState<string>('percentage');
  
  // Percentage of X calculation
  const [percentValue, setPercentValue] = useState<string>('');
  const [ofValue, setOfValue] = useState<string>('');
  const [percentResult, setPercentResult] = useState<string>('');
  
  // X is what percent of Y calculation
  const [isValue, setIsValue] = useState<string>('');
  const [ofTotalValue, setOfTotalValue] = useState<string>('');
  const [percentOfResult, setPercentOfResult] = useState<string>('');
  
  // Percentage increase/decrease calculation
  const [fromValue, setFromValue] = useState<string>('');
  const [toValue, setToValue] = useState<string>('');
  const [changeResult, setChangeResult] = useState<string>('');
  const [changeAmount, setChangeAmount] = useState<string>('');

  const calculatePercentage = () => {
    if (!percentValue || !ofValue) {
      toast.error('Please fill in all fields');
      return;
    }
    
    const percent = parseFloat(percentValue);
    const value = parseFloat(ofValue);
    
    if (isNaN(percent) || isNaN(value)) {
      toast.error('Please enter valid numbers');
      return;
    }
    
    const result = (percent / 100) * value;
    setPercentResult(result.toFixed(2));
    toast.success('Calculation complete!');
  };

  const calculatePercentOf = () => {
    if (!isValue || !ofTotalValue) {
      toast.error('Please fill in all fields');
      return;
    }
    
    const is = parseFloat(isValue);
    const of = parseFloat(ofTotalValue);
    
    if (isNaN(is) || isNaN(of) || of === 0) {
      toast.error('Please enter valid numbers');
      return;
    }
    
    const result = (is / of) * 100;
    setPercentOfResult(result.toFixed(2) + '%');
    toast.success('Calculation complete!');
  };

  const calculatePercentageChange = () => {
    if (!fromValue || !toValue) {
      toast.error('Please fill in all fields');
      return;
    }
    
    const from = parseFloat(fromValue);
    const to = parseFloat(toValue);
    
    if (isNaN(from) || isNaN(to) || from === 0) {
      toast.error('Please enter valid numbers');
      return;
    }
    
    const change = to - from;
    const percentChange = (change / Math.abs(from)) * 100;
    
    setChangeAmount(Math.abs(change).toFixed(2));
    setChangeResult(
      `${percentChange.toFixed(2)}% ${percentChange >= 0 ? 'increase' : 'decrease'}`
    );
    toast.success('Calculation complete!');
  };

  return (
    <>
      <Helmet>
        <title>Percentage Calculator | Toolify</title>
        <meta 
          name="description" 
          content="Calculate percentages, increases, decreases, and differences with Toolify's free percentage calculator." 
        />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-20 animate-fade-in">
        <section className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-toolify-100 text-toolify-700 flex items-center justify-center">
                  <Percent size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Percentage Calculator</h1>
                  <p className="text-muted-foreground">
                    Calculate percentages, increases, decreases, and differences.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-subtle border border-gray-100">
                <Tabs 
                  defaultValue="percentage" 
                  className="mb-6" 
                  value={tab} 
                  onValueChange={setTab}
                >
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="percentage" className="text-base">
                      % of Value
                    </TabsTrigger>
                    <TabsTrigger value="percentof" className="text-base">
                      % of Total
                    </TabsTrigger>
                    <TabsTrigger value="change" className="text-base">
                      % Change
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="percentage" className="space-y-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4 items-end">
                            <div className="space-y-2">
                              <Label htmlFor="percent-value">Percentage</Label>
                              <div className="relative">
                                <Input
                                  id="percent-value"
                                  type="number"
                                  placeholder="10"
                                  value={percentValue}
                                  onChange={(e) => setPercentValue(e.target.value)}
                                  className="pr-8"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                  %
                                </span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="of-value">of</Label>
                              <Input
                                id="of-value"
                                type="number"
                                placeholder="200"
                                value={ofValue}
                                onChange={(e) => setOfValue(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Button 
                                onClick={calculatePercentage}
                                className="w-full bg-toolify-600 hover:bg-toolify-700"
                              >
                                <Calculator className="mr-2 h-4 w-4" />
                                Calculate
                              </Button>
                            </div>
                          </div>
                          
                          {percentResult && (
                            <div className="mt-6 p-4 bg-toolify-50 rounded-lg border border-toolify-100">
                              <p className="text-center font-medium">
                                <span className="text-lg text-toolify-700">
                                  {percentValue}% of {ofValue} is <span className="text-xl font-bold">{percentResult}</span>
                                </span>
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="percentof" className="space-y-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4 items-end">
                            <div className="space-y-2">
                              <Label htmlFor="is-value">Value</Label>
                              <Input
                                id="is-value"
                                type="number"
                                placeholder="20"
                                value={isValue}
                                onChange={(e) => setIsValue(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="of-total-value">of Total</Label>
                              <Input
                                id="of-total-value"
                                type="number"
                                placeholder="80"
                                value={ofTotalValue}
                                onChange={(e) => setOfTotalValue(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Button 
                                onClick={calculatePercentOf}
                                className="w-full bg-toolify-600 hover:bg-toolify-700"
                              >
                                <Calculator className="mr-2 h-4 w-4" />
                                Calculate
                              </Button>
                            </div>
                          </div>
                          
                          {percentOfResult && (
                            <div className="mt-6 p-4 bg-toolify-50 rounded-lg border border-toolify-100">
                              <p className="text-center font-medium">
                                <span className="text-lg text-toolify-700">
                                  {isValue} is <span className="text-xl font-bold">{percentOfResult}</span> of {ofTotalValue}
                                </span>
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="change" className="space-y-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4 items-end">
                            <div className="space-y-2">
                              <Label htmlFor="from-value">From Value</Label>
                              <Input
                                id="from-value"
                                type="number"
                                placeholder="100"
                                value={fromValue}
                                onChange={(e) => setFromValue(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="to-value">To Value</Label>
                              <Input
                                id="to-value"
                                type="number"
                                placeholder="125"
                                value={toValue}
                                onChange={(e) => setToValue(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Button 
                                onClick={calculatePercentageChange}
                                className="w-full bg-toolify-600 hover:bg-toolify-700"
                              >
                                <Calculator className="mr-2 h-4 w-4" />
                                Calculate
                              </Button>
                            </div>
                          </div>
                          
                          {changeResult && (
                            <div className="mt-6 p-4 bg-toolify-50 rounded-lg border border-toolify-100">
                              <p className="text-center font-medium">
                                <span className="text-lg text-toolify-700">
                                  Change amount: <span className="font-bold">{changeAmount}</span>
                                  <br />
                                  Percentage change: <span className="text-xl font-bold">{changeResult}</span>
                                </span>
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="mt-8 bg-toolify-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-2">About Percentage Calculations</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Percentages are used to express how large or small one number is relative to another number. They're a way of expressing a number as a fraction of 100.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-1">Common Percentage Formulas:</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>X% of Y = (X/100) × Y</li>
                      <li>X is what % of Y = (X/Y) × 100</li>
                      <li>% increase = ((New - Original)/|Original|) × 100</li>
                      <li>% decrease = ((Original - New)/|Original|) × 100</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Uses for Percentages:</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Financial calculations</li>
                      <li>Discounts and sales</li>
                      <li>Statistical analysis</li>
                      <li>Performance metrics</li>
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
                <a href="/tools/percentage-calculator" className="text-muted-foreground hover:text-toolify-600">Percentage Calculator</a>
                <a href="/tools/currency-converter" className="text-muted-foreground hover:text-toolify-600">Currency Converter</a>
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

export default PercentageCalculator;
