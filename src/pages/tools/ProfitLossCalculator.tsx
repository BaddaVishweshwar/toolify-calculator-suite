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
import { commonCurrencies } from '@/lib/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProfitLossCalculator: React.FC = () => {
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [expenses, setExpenses] = useState('0');
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState<{
    profitOrLoss: number;
    percentage: number;
    isProfit: boolean;
    totalCost: number;
    totalRevenue: number;
    margin: number;
  } | null>(null);

  const getCurrencySymbol = (code: string) => {
    const foundCurrency = commonCurrencies.find(c => c.code === code);
    return foundCurrency ? foundCurrency.symbol : '$';
  };

  const calculateProfitLoss = () => {
    if (!costPrice || !sellingPrice) {
      toast.error('Please enter both cost price and selling price');
      return;
    }

    const cp = parseFloat(costPrice);
    const sp = parseFloat(sellingPrice);
    const qty = parseFloat(quantity || '1');
    const exp = parseFloat(expenses || '0');

    const totalCost = (cp * qty) + exp;
    const totalRevenue = sp * qty;
    const profitOrLoss = totalRevenue - totalCost;
    const isProfit = profitOrLoss >= 0;
    
    // Calculate percentage
    const percentage = (Math.abs(profitOrLoss) / totalCost) * 100;
    
    // Calculate profit margin (profit as percentage of revenue)
    const margin = (profitOrLoss / totalRevenue) * 100;

    setResult({
      profitOrLoss,
      percentage,
      isProfit,
      totalCost,
      totalRevenue,
      margin
    });
    
    toast.success('Profit/Loss calculated successfully!');
  };

  const getChartData = () => {
    if (!result) return [];
    
    return [
      {
        name: 'Cost',
        value: result.totalCost,
        fill: '#94a3b8'
      },
      {
        name: 'Revenue',
        value: result.totalRevenue,
        fill: result.isProfit ? '#22c55e' : '#ef4444'
      },
      {
        name: result.isProfit ? 'Profit' : 'Loss',
        value: Math.abs(result.profitOrLoss),
        fill: result.isProfit ? '#16a34a' : '#dc2626'
      }
    ];
  };

  return (
    <>
      <Helmet>
        <title>Profit/Loss Calculator | Toolify</title>
        <meta name="description" content="Calculate profit or loss on transactions and investments with percentage and margin details." />
        <meta name="keywords" content="profit calculator, loss calculator, profit margin, profit percentage, business calculator, investment return calculator, markup calculator, breakeven analysis, cost price, selling price, revenue calculator, business profit, loss percentage" />
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

              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card>
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
                              {commonCurrencies.map((c) => (
                                <SelectItem key={c.code} value={c.code}>
                                  {c.symbol} {c.name} ({c.code})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="costPrice">Cost Price</Label>
                            <Input
                              id="costPrice"
                              type="number"
                              value={costPrice}
                              onChange={(e) => setCostPrice(e.target.value)}
                              placeholder="100"
                            />
                          </div>
                          <div>
                            <Label htmlFor="sellingPrice">Selling Price</Label>
                            <Input
                              id="sellingPrice"
                              type="number"
                              value={sellingPrice}
                              onChange={(e) => setSellingPrice(e.target.value)}
                              placeholder="120"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input
                              id="quantity"
                              type="number"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                              placeholder="1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="expenses">Additional Expenses</Label>
                            <Input
                              id="expenses"
                              type="number"
                              value={expenses}
                              onChange={(e) => setExpenses(e.target.value)}
                              placeholder="0"
                            />
                          </div>
                        </div>
                        
                        <Button onClick={calculateProfitLoss} className="w-full">Calculate Profit/Loss</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="md:col-span-1">
                  {result && (
                    <Card className="h-full">
                      <CardContent className="pt-6 h-full flex flex-col">
                        <div className={cn(
                          "text-center p-4 rounded-lg mb-4",
                          result.isProfit ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                        )}>
                          <div className="flex justify-center mb-2">
                            {result.isProfit ? (
                              <TrendingUp className="h-8 w-8" />
                            ) : (
                              <TrendingDown className="h-8 w-8" />
                            )}
                          </div>
                          <h3 className="font-bold text-lg">
                            {result.isProfit ? 'Profit' : 'Loss'}
                          </h3>
                          <p className="text-2xl font-bold mt-1">
                            {getCurrencySymbol(currency)}{Math.abs(result.profitOrLoss).toFixed(2)}
                          </p>
                          <p className="text-sm mt-1">
                            ({result.percentage.toFixed(2)}%)
                          </p>
                        </div>
                        
                        <div className="space-y-3 flex-grow">
                          <div className="flex justify-between text-sm border-b pb-2">
                            <span className="text-muted-foreground">Total Cost:</span>
                            <span className="font-medium">{getCurrencySymbol(currency)}{result.totalCost.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm border-b pb-2">
                            <span className="text-muted-foreground">Total Revenue:</span>
                            <span className="font-medium">{getCurrencySymbol(currency)}{result.totalRevenue.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Profit Margin:</span>
                            <span className={cn(
                              "font-medium",
                              result.margin >= 0 ? "text-green-600" : "text-red-600"
                            )}>
                              {result.margin.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {result && (
                <Card className="mt-6">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Visual Breakdown</h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={getChartData()}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value) => [`${getCurrencySymbol(currency)}${Number(value).toFixed(2)}`, 'Amount']}
                          />
                          <Bar dataKey="value" fill="#8884d8" name="Amount" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="mt-8 p-6 bg-toolify-50 rounded-lg text-sm">
                <h3 className="font-semibold mb-2">About Profit/Loss Calculation</h3>
                <p className="mb-3">
                  Profit and loss calculations are essential for businesses and individuals to determine 
                  the financial outcome of transactions, investments, or business activities.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-medium">Key Formulas:</h4>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>Profit/Loss = Selling Price - Cost Price</li>
                      <li>Profit/Loss % = (Profit or Loss ÷ Cost Price) × 100</li>
                      <li>Profit Margin = (Profit ÷ Revenue) × 100</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Common Terms:</h4>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>Cost Price: Amount paid to acquire goods</li>
                      <li>Selling Price: Amount received from selling goods</li>
                      <li>Profit Margin: Profit as a percentage of revenue</li>
                      <li>Markup: Increase over cost price</li>
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
