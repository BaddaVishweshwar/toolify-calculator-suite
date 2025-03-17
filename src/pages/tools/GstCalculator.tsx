
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Calculator, ArrowRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { toast } from 'sonner';
import { commonCurrencies } from '@/lib/api';

const GstCalculator: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('18');
  const [currency, setCurrency] = useState('USD');
  const [gstAmount, setGstAmount] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [amountExcludingGst, setAmountExcludingGst] = useState<number | null>(null);

  const getCurrencySymbol = (code: string) => {
    const foundCurrency = commonCurrencies.find(c => c.code === code);
    return foundCurrency ? foundCurrency.symbol : '$';
  };

  const calculateGstInclusive = () => {
    if (!amount || !gstRate) {
      toast.error('Please fill in all fields');
      return;
    }

    const baseAmount = parseFloat(amount);
    const rate = parseFloat(gstRate) / 100;

    // Calculate GST from inclusive amount
    // Formula: GST Amount = Original Amount - (Original Amount / (1 + GST Rate))
    const excludingGst = baseAmount / (1 + rate);
    const gst = baseAmount - excludingGst;

    setGstAmount(gst);
    setTotalAmount(baseAmount);
    setAmountExcludingGst(excludingGst);
    
    toast.success('GST calculated successfully!');
  };

  const calculateGstExclusive = () => {
    if (!amount || !gstRate) {
      toast.error('Please fill in all fields');
      return;
    }

    const baseAmount = parseFloat(amount);
    const rate = parseFloat(gstRate) / 100;

    // Calculate GST from exclusive amount
    // Formula: GST Amount = Original Amount * GST Rate
    const gst = baseAmount * rate;
    const total = baseAmount + gst;

    setGstAmount(gst);
    setTotalAmount(total);
    setAmountExcludingGst(baseAmount);
    
    toast.success('GST calculated successfully!');
  };

  const commonGstRates = [
    { value: "5", label: "5%" },
    { value: "12", label: "12%" },
    { value: "18", label: "18%" },
    { value: "28", label: "28%" }
  ];

  return (
    <>
      <Helmet>
        <title>GST Calculator | Toolify</title>
        <meta name="description" content="Calculate GST amounts, inclusive and exclusive prices with this simple GST calculator." />
        <meta name="keywords" content="GST calculator, goods and service tax, tax calculator, inclusive GST, exclusive GST, VAT calculator, sales tax, tax computation, business tax, taxation, input tax credit, IGST, CGST, SGST calculator" />
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-20 animate-fade-in">
        <section className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-toolify-100 text-toolify-700 flex items-center justify-center">
                  <Calculator size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">GST Calculator</h1>
                  <p className="text-muted-foreground">
                    Calculate GST amounts, inclusive and exclusive prices.
                  </p>
                </div>
              </div>

              <Card className="mb-6">
                <CardContent className="pt-6">
                  <Tabs defaultValue="exclusive">
                    <TabsList className="mb-4 w-full">
                      <TabsTrigger value="exclusive" className="flex-1">Add GST (Exclusive)</TabsTrigger>
                      <TabsTrigger value="inclusive" className="flex-1">Remove GST (Inclusive)</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="exclusive">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="currencyExclusive">Currency</Label>
                            <Select
                              value={currency}
                              onValueChange={setCurrency}
                            >
                              <SelectTrigger id="currencyExclusive">
                                <SelectValue placeholder="Select Currency" />
                              </SelectTrigger>
                              <SelectContent>
                                {commonCurrencies.map((c) => (
                                  <SelectItem key={c.code} value={c.code}>
                                    {c.symbol} {c.name} ({c.code})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="gstRateExclusive">GST Rate</Label>
                            <Select
                              value={gstRate}
                              onValueChange={setGstRate}
                            >
                              <SelectTrigger id="gstRateExclusive">
                                <SelectValue placeholder="Select GST Rate" />
                              </SelectTrigger>
                              <SelectContent>
                                {commonGstRates.map((rate) => (
                                  <SelectItem key={rate.value} value={rate.value}>
                                    {rate.label}
                                  </SelectItem>
                                ))}
                                <SelectItem value="custom">Custom Rate</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        {gstRate === 'custom' && (
                          <div>
                            <Label htmlFor="customRateExclusive">Custom GST Rate (%)</Label>
                            <Input
                              id="customRateExclusive"
                              type="number"
                              value={gstRate === 'custom' ? '' : gstRate}
                              onChange={(e) => setGstRate(e.target.value)}
                              placeholder="Enter custom rate"
                            />
                          </div>
                        )}
                        
                        <div>
                          <Label htmlFor="amountExclusive">Amount (Excluding GST)</Label>
                          <Input
                            id="amountExclusive"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="100"
                          />
                        </div>
                        
                        <Button onClick={calculateGstExclusive} className="w-full">Calculate GST</Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="inclusive">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="currencyInclusive">Currency</Label>
                            <Select
                              value={currency}
                              onValueChange={setCurrency}
                            >
                              <SelectTrigger id="currencyInclusive">
                                <SelectValue placeholder="Select Currency" />
                              </SelectTrigger>
                              <SelectContent>
                                {commonCurrencies.map((c) => (
                                  <SelectItem key={c.code} value={c.code}>
                                    {c.symbol} {c.name} ({c.code})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="gstRateInclusive">GST Rate</Label>
                            <Select
                              value={gstRate}
                              onValueChange={setGstRate}
                            >
                              <SelectTrigger id="gstRateInclusive">
                                <SelectValue placeholder="Select GST Rate" />
                              </SelectTrigger>
                              <SelectContent>
                                {commonGstRates.map((rate) => (
                                  <SelectItem key={rate.value} value={rate.value}>
                                    {rate.label}
                                  </SelectItem>
                                ))}
                                <SelectItem value="custom">Custom Rate</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        {gstRate === 'custom' && (
                          <div>
                            <Label htmlFor="customRateInclusive">Custom GST Rate (%)</Label>
                            <Input
                              id="customRateInclusive"
                              type="number"
                              value={gstRate === 'custom' ? '' : gstRate}
                              onChange={(e) => setGstRate(e.target.value)}
                              placeholder="Enter custom rate"
                            />
                          </div>
                        )}
                        
                        <div>
                          <Label htmlFor="amountInclusive">Amount (Including GST)</Label>
                          <Input
                            id="amountInclusive"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="118"
                          />
                        </div>
                        
                        <Button onClick={calculateGstInclusive} className="w-full">Calculate GST</Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {gstAmount !== null && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">GST Calculation Results</h3>
                    
                    <div className="space-y-3">
                      <div className="p-3 bg-toolify-50 rounded-lg">
                        <div className="flex justify-between">
                          <p className="text-muted-foreground">Amount (Excluding GST)</p>
                          <p className="font-semibold">{getCurrencySymbol(currency)}{amountExcludingGst?.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-toolify-50 rounded-lg">
                        <div className="flex justify-between">
                          <p className="text-muted-foreground">GST Amount ({gstRate}%)</p>
                          <p className="font-semibold">{getCurrencySymbol(currency)}{gstAmount?.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-center my-2">
                        <ArrowRight className="text-muted-foreground" />
                      </div>
                      
                      <div className="p-3 bg-toolify-100 rounded-lg">
                        <div className="flex justify-between">
                          <p className="font-medium text-toolify-700">Total Amount (Including GST)</p>
                          <p className="font-bold">{getCurrencySymbol(currency)}{totalAmount?.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="mt-8 p-6 bg-toolify-50 rounded-lg text-sm">
                <h3 className="font-semibold mb-2">About GST</h3>
                <p className="mb-3">
                  Goods and Services Tax (GST) is a value-added tax levied on most goods and services sold for domestic consumption. 
                  GST is paid by consumers, but it is remitted to the government by the businesses selling the goods and services.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-medium">Adding GST (Exclusive to Inclusive):</h4>
                    <p className="bg-white p-2 rounded my-2 font-mono text-xs">
                      GST Amount = Original Price × GST Rate
                    </p>
                    <p className="bg-white p-2 rounded my-2 font-mono text-xs">
                      Total = Original Price + GST Amount
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Removing GST (Inclusive to Exclusive):</h4>
                    <p className="bg-white p-2 rounded my-2 font-mono text-xs">
                      Original Price = Total Price ÷ (1 + GST Rate)
                    </p>
                    <p className="bg-white p-2 rounded my-2 font-mono text-xs">
                      GST Amount = Total Price - Original Price
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default GstCalculator;
