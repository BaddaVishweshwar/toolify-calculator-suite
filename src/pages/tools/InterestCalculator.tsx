
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { DollarSign } from 'lucide-react';
import { toast } from 'sonner';

const InterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculateInterest = () => {
    if (!principal || !rate || !time) {
      toast.error('Please fill in all fields');
      return;
    }

    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);

    const interest = p * r * t;
    setResult(interest);
    toast.success('Interest calculated successfully!');
  };

  return (
    <>
      <Helmet>
        <title>Interest Calculator | Toolify</title>
        <meta name="description" content="Calculate simple and compound interest with detailed breakdowns." />
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
                          <p>Principal Amount: ${parseFloat(principal).toFixed(2)}</p>
                          <p>Interest Amount: ${result.toFixed(2)}</p>
                          <p>Total Amount: ${(parseFloat(principal) + result).toFixed(2)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default InterestCalculator;
