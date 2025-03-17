
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { commonCurrencies } from '@/lib/api';

const InterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [currency, setCurrency] = useState('USD');
  const [compoundFrequency, setCompoundFrequency] = useState('annually');

  const getCurrencySymbol = (code: string) => {
    const foundCurrency = commonCurrencies.find(c => c.code === code);
    return foundCurrency ? foundCurrency.symbol : '$';
  };

  const calculateInterest = () => {
    if (!principal || !rate || !time) {
      toast.error('Please fill in all fields');
      return;
    }

    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);

    let interest: number;
    let totalAmount: number;

    if (compoundFrequency === 'simple') {
      // Simple interest calculation
      interest = p * r * t;
      totalAmount = p + interest;
    } else {
      // Compound interest calculation
      let n = 1; // compounding frequency per year
      
      switch (compoundFrequency) {
        case 'annually':
          n = 1;
          break;
        case 'semi-annually':
          n = 2;
          break;
        case 'quarterly':
          n = 4;
          break;
        case 'monthly':
          n = 12;
          break;
        case 'daily':
          n = 365;
          break;
        default:
          n = 1;
      }
      
      totalAmount = p * Math.pow(1 + (r / n), n * t);
      interest = totalAmount - p;
    }

    setResult(interest);
    toast.success('Interest calculated successfully!');
  };

  return (
    <>
      <Helmet>
        <title>Interest Calculator | Toolify</title>
        <meta name="description" content="Calculate simple and compound interest with detailed breakdowns." />
        <meta name="keywords" content="interest calculator, simple interest, compound interest, financial calculator, loan interest, investment interest, interest rate calculator, interest computation, savings interest, deposit interest, annual interest, money growth calculator" />
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-20 animate-fade-in">
        <section className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-toolify-100 text-toolify-700 flex items-center justify-center">
                  <DollarSign size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Interest Calculator</h1>
                  <p className="text-muted-foreground">
                    Calculate simple and compound interest with detailed breakdowns.
                  </p>
                </div>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      <div>
                        <Label htmlFor="compoundFrequency">Interest Type</Label>
                        <Select
                          value={compoundFrequency}
                          onValueChange={setCompoundFrequency}
                        >
                          <SelectTrigger id="compoundFrequency">
                            <SelectValue placeholder="Compounding Frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="simple">Simple Interest</SelectItem>
                            <SelectItem value="annually">Annually</SelectItem>
                            <SelectItem value="semi-annually">Semi-Annually</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="principal">Principal Amount</Label>
                      <Input
                        id="principal"
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                        placeholder="1000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rate">Interest Rate (%)</Label>
                      <Input
                        id="rate"
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        placeholder="5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Time (years)</Label>
                      <Input
                        id="time"
                        type="number"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="1"
                      />
                    </div>
                    <Button onClick={calculateInterest} className="w-full">Calculate Interest</Button>

                    {result !== null && (
                      <div className="mt-4 p-4 bg-toolify-50 rounded-lg">
                        <h3 className="font-semibold mb-2">Results:</h3>
                        <div className="space-y-2">
                          <p>Principal Amount: {getCurrencySymbol(currency)}{parseFloat(principal).toFixed(2)}</p>
                          <p>Interest Amount: {getCurrencySymbol(currency)}{result.toFixed(2)}</p>
                          <p>Total Amount: {getCurrencySymbol(currency)}{(parseFloat(principal) + result).toFixed(2)}</p>
                          {compoundFrequency !== 'simple' && (
                            <p className="text-sm text-muted-foreground">Compounded {compoundFrequency}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 p-6 bg-toolify-50 rounded-lg text-sm">
                <h3 className="font-semibold mb-2">About Interest Calculation</h3>
                <p className="mb-3">Interest is the cost of borrowing money or the return earned on investments. There are two main types:</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">Simple Interest</h4>
                    <p>Simple interest is calculated only on the initial principal. Formula: P × r × t</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Compound Interest</h4>
                    <p>Compound interest is calculated on the initial principal and the accumulated interest. Formula: P(1 + r/n)^(nt)</p>
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

export default InterestCalculator;
