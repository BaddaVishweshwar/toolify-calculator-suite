
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ProfitLossCalculator: React.FC = () => {
  const [cost, setCost] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [quantity, setQuantity] = useState('1');
  const [result, setResult] = useState<{
    profitLoss: number;
    profitLossPercentage: number;
    totalCost: number;
    totalRevenue: number;
    isProfit: boolean;
  } | null>(null);

  const getCurrencySymbol = (currencyCode: string) => {
    const currencyMap: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      INR: '₹',
      AUD: 'A$',
      CAD: 'C$',
      CHF: 'Fr',
      CNY: '¥',
      RUB: '₽',
      SGD: 'S$',
      ZAR: 'R'
    };
    
    return currencyMap[currencyCode] || currencyCode;
  };

  const calculateProfitLoss = () => {
    if (!cost || !sellingPrice) {
      toast.error('Please enter both cost and selling price');
      return;
    }

    try {
      const costValue = parseFloat(cost);
      const priceValue = parseFloat(sellingPrice);
      const quantityValue = parseInt(quantity) || 1;
      
      if (isNaN(costValue) || isNaN(priceValue) || costValue < 0 || priceValue < 0) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      const totalCost = costValue * quantityValue;
      const totalRevenue = priceValue * quantityValue;
      const profitLoss = totalRevenue - totalCost;
      const profitLossPercentage = (profitLoss / totalCost) * 100;
      
      setResult({
        profitLoss,
        profitLossPercentage,
        totalCost,
        totalRevenue,
        isProfit: profitLoss >= 0
      });
      
      toast.success('Profit/Loss calculated successfully!');
    } catch (error) {
      toast.error('Error calculating profit/loss. Please check your inputs.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Profit/Loss Calculator | Toolify</title>
        <meta name="description" content="Calculate profit or loss on transactions and investments with detailed percentage analysis." />
        <meta name="keywords" content="profit loss calculator, business profit, profit percentage, loss percentage, profit margin calculator, revenue calculator, cost analysis, profit analysis, return on investment, business tools, sales profit calculator, markup calculator, financial calculator" />
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-20 animate-fade-in">
        <section className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-toolify-100 text-toolify-700 flex items-center justify-center">
                  <DollarSign size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Profit/Loss Calculator</h1>
                  <p className="text-muted-foreground">
                    Calculate profit or loss on transactions and investments.
                  </p>
                </div>
              </div>

              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Select
                        value={currency}
                        onValueChange={setCurrency}
                      >
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Select Currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">US Dollar ($)</SelectItem>
                          <SelectItem value="EUR">Euro (€)</SelectItem>
                          <SelectItem value="GBP">British Pound (£)</SelectItem>
                          <SelectItem value="JPY">Japanese Yen (¥)</SelectItem>
                          <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                          <SelectItem value="AUD">Australian Dollar (A$)</SelectItem>
                          <SelectItem value="CAD">Canadian Dollar (C$)</SelectItem>
                          <SelectItem value="CHF">Swiss Franc (Fr)</SelectItem>
                          <SelectItem value="CNY">Chinese Yuan (¥)</SelectItem>
                          <SelectItem value="RUB">Russian Ruble (₽)</SelectItem>
                          <SelectItem value="SGD">Singapore Dollar (S$)</SelectItem>
                          <SelectItem value="ZAR">South African Rand (R)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cost">Cost Price (per unit)</Label>
                        <Input
                          id="cost"
                          type="number"
                          value={cost}
                          onChange={(e) => setCost(e.target.value)}
                          placeholder="100"
                          className={cn(
                            "transition-colors",
                            result && !result.isProfit && "focus-visible:ring-red-500"
                          )}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="sellingPrice">Selling Price (per unit)</Label>
                        <Input
                          id="sellingPrice"
                          type="number"
                          value={sellingPrice}
                          onChange={(e) => setSellingPrice(e.target.value)}
                          placeholder="120"
                          className={cn(
                            "transition-colors",
                            result && result.isProfit && "focus-visible:ring-green-500"
                          )}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="1"
                        min="1"
                      />
                    </div>
                    
                    <Button onClick={calculateProfitLoss} className="w-full">Calculate Profit/Loss</Button>
                  </div>
                </CardContent>
              </Card>

              {result && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Profit/Loss Analysis</h3>
                    
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg ${result.isProfit ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
                        <div className="flex items-center gap-2">
                          {result.isProfit ? (
                            <TrendingUp className="h-5 w-5 text-green-600" />
                          ) : (
                            <TrendingDown className="h-5 w-5 text-red-600" />
                          )}
                          <p className={`text-lg font-bold ${result.isProfit ? 'text-green-600' : 'text-red-600'}`}>
                            {result.isProfit ? 'Profit' : 'Loss'}: {getCurrencySymbol(currency)}{Math.abs(result.profitLoss).toFixed(2)} ({Math.abs(result.profitLossPercentage).toFixed(2)}%)
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-toolify-50 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Total Cost</p>
                          <p className="text-xl font-bold">{getCurrencySymbol(currency)}{result.totalCost.toFixed(2)}</p>
                          <p className="text-sm mt-1">
                            {getCurrencySymbol(currency)}{parseFloat(cost).toFixed(2)} × {parseInt(quantity)}
                          </p>
                        </div>
                        
                        <div className="p-4 bg-toolify-50 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                          <p className="text-xl font-bold">{getCurrencySymbol(currency)}{result.totalRevenue.toFixed(2)}</p>
                          <p className="text-sm mt-1">
                            {getCurrencySymbol(currency)}{parseFloat(sellingPrice).toFixed(2)} × {parseInt(quantity)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-toolify-50 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Margin</p>
                        <p className="text-xl font-bold">
                          {(result.profitLoss / result.totalRevenue * 100).toFixed(2)}%
                        </p>
                        <p className="text-sm mt-1">
                          Profit/Revenue × 100
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium mb-2">Formulas Used:</h4>
                      <ul className="space-y-2">
                        <li className="text-sm bg-white p-2 rounded">
                          <span className="font-medium">Profit/Loss</span>: Selling Price - Cost Price
                        </li>
                        <li className="text-sm bg-white p-2 rounded">
                          <span className="font-medium">Profit/Loss Percentage</span>: (Profit or Loss ÷ Cost Price) × 100
                        </li>
                        <li className="text-sm bg-white p-2 rounded">
                          <span className="font-medium">Margin</span>: (Profit ÷ Selling Price) × 100
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <div className="mt-8 p-6 bg-toolify-50 rounded-lg text-sm">
                <h3 className="font-semibold mb-2">About Profit/Loss Calculation</h3>
                <p className="mb-3">
                  Profit and loss calculations are fundamental to business decision-making, helping to determine 
                  the financial viability of products, services, or investments.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-medium">Key Terms:</h4>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li><span className="font-semibold">Cost Price</span>: The amount paid to acquire or produce something</li>
                      <li><span className="font-semibold">Selling Price</span>: The amount received when selling</li>
                      <li><span className="font-semibold">Profit</span>: When selling price exceeds cost price</li>
                      <li><span className="font-semibold">Loss</span>: When cost price exceeds selling price</li>
                      <li><span className="font-semibold">Margin</span>: Profit as a percentage of revenue</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Common Applications:</h4>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>Retail pricing strategy</li>
                      <li>Investment return analysis</li>
                      <li>Stock trading performance</li>
                      <li>Business financial planning</li>
                      <li>Product line profitability</li>
                    </ul>
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

export default ProfitLossCalculator;
