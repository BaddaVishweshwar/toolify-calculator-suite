
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Home, PieChart } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { commonCurrencies } from '@/lib/api';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const EmiCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [emi, setEmi] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);

  const getCurrencySymbol = (code: string) => {
    const foundCurrency = commonCurrencies.find(c => c.code === code);
    return foundCurrency ? foundCurrency.symbol : '$';
  };

  const calculateEmi = () => {
    if (!loanAmount || !interestRate || !loanTerm) {
      toast.error('Please fill in all fields');
      return;
    }

    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const time = parseFloat(loanTerm) * 12; // Total months

    // EMI formula: [P * r * (1+r)^n] / [(1+r)^n - 1]
    const emiValue = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    
    if (isNaN(emiValue) || !isFinite(emiValue)) {
      toast.error('Invalid input values. Please check and try again.');
      return;
    }

    const totalPaymentValue = emiValue * time;
    const totalInterestValue = totalPaymentValue - principal;

    setEmi(emiValue);
    setTotalInterest(totalInterestValue);
    setTotalPayment(totalPaymentValue);
    
    toast.success('EMI calculated successfully!');
  };

  const chartData = totalInterest !== null ? [
    { name: 'Principal', value: parseFloat(loanAmount) },
    { name: 'Interest', value: totalInterest }
  ] : [];

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <>
      <Helmet>
        <title>EMI Calculator | Toolify</title>
        <meta name="description" content="Calculate your Equated Monthly Installment (EMI) for loans with detailed breakdowns of principal and interest." />
        <meta name="keywords" content="EMI calculator, loan EMI, monthly installment, home loan calculator, car loan calculator, personal loan EMI, loan repayment calculator, mortgage calculator, interest calculation, loan tenure, principal amount, monthly payments" />
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-20 animate-fade-in">
        <section className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-toolify-100 text-toolify-700 flex items-center justify-center">
                  <Home size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">EMI Calculator</h1>
                  <p className="text-muted-foreground">
                    Calculate your Equated Monthly Installment for home, car, or personal loans.
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
                        <div>
                          <Label htmlFor="loanAmount">Loan Amount</Label>
                          <Input
                            id="loanAmount"
                            type="number"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(e.target.value)}
                            placeholder="100000"
                          />
                        </div>
                        <div>
                          <Label htmlFor="interestRate">Interest Rate (% per annum)</Label>
                          <Input
                            id="interestRate"
                            type="number"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                            placeholder="8.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="loanTerm">Loan Term (years)</Label>
                          <Input
                            id="loanTerm"
                            type="number"
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(e.target.value)}
                            placeholder="20"
                          />
                        </div>
                        <Button onClick={calculateEmi} className="w-full">Calculate EMI</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="md:col-span-1">
                  {emi !== null && (
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-4">Loan Summary</h3>
                        <div className="space-y-3">
                          <div className="p-3 bg-toolify-50 rounded-lg">
                            <p className="text-sm text-muted-foreground">Monthly Payment (EMI)</p>
                            <p className="text-lg font-bold">{getCurrencySymbol(currency)}{emi.toFixed(2)}</p>
                          </div>
                          <div className="p-3 bg-toolify-50 rounded-lg">
                            <p className="text-sm text-muted-foreground">Total Interest Payable</p>
                            <p className="text-lg font-bold">{getCurrencySymbol(currency)}{totalInterest?.toFixed(2)}</p>
                          </div>
                          <div className="p-3 bg-toolify-50 rounded-lg">
                            <p className="text-sm text-muted-foreground">Total Payment (Principal + Interest)</p>
                            <p className="text-lg font-bold">{getCurrencySymbol(currency)}{totalPayment?.toFixed(2)}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {emi !== null && (
                <Card className="mt-6">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <PieChart className="h-5 w-5 text-toolify-700" />
                      <h3 className="font-semibold">Payment Breakdown</h3>
                    </div>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`${getCurrencySymbol(currency)}${Number(value).toFixed(2)}`, 'Amount']}
                          />
                          <Legend />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="mt-8 p-6 bg-toolify-50 rounded-lg text-sm">
                <h3 className="font-semibold mb-2">What is EMI?</h3>
                <p className="mb-3">
                  EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender on a specified date each month. 
                  EMIs are applied to both interest and principal each month so that over a specified number of years, the loan is fully paid off.
                </p>
                
                <h4 className="font-medium mt-4">Formula Used:</h4>
                <p className="bg-white p-2 rounded my-2 font-mono text-xs">
                  EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]
                </p>
                <p>Where:</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>P = Principal loan amount</li>
                  <li>r = Monthly interest rate (Annual rate ÷ 12 ÷ 100)</li>
                  <li>n = Loan tenure in months</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default EmiCalculator;
