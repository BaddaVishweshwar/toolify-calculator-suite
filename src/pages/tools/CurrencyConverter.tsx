
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RefreshCcw, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { fetchCurrencyRates, commonCurrencies } from '@/lib/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  const { data: ratesData, isLoading, error, refetch } = useQuery({
    queryKey: ['currencyRates', fromCurrency],
    queryFn: () => fetchCurrencyRates(fromCurrency),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  useEffect(() => {
    if (ratesData && ratesData.rates && toCurrency) {
      const rate = ratesData.rates[toCurrency];
      if (rate) {
        setExchangeRate(rate);
        const value = parseFloat(amount) * rate;
        setConvertedAmount(value);
      }
    }
  }, [ratesData, toCurrency, amount]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleConvert = () => {
    if (!amount || isNaN(parseFloat(amount))) {
      toast.error('Please enter a valid amount');
      return;
    }

    refetch();
    toast.success('Currency converted successfully!');
  };

  const getCurrencySymbol = (code: string) => {
    const foundCurrency = commonCurrencies.find(c => c.code === code);
    return foundCurrency ? foundCurrency.symbol : code;
  };

  return (
    <>
      <Helmet>
        <title>Currency Converter | Toolify</title>
        <meta name="description" content="Convert between different currencies with live exchange rates using this easy-to-use currency converter tool." />
        <meta name="keywords" content="currency converter, exchange rate, forex, foreign exchange, money converter, currency calculator, USD, EUR, GBP, JPY, international currency, travel money, currency exchange rates, live rates, foreign currency calculator" />
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-20 animate-fade-in">
        <section className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-toolify-100 text-toolify-700 flex items-center justify-center">
                  <RefreshCcw size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Currency Converter</h1>
                  <p className="text-muted-foreground">
                    Convert between different currencies with live exchange rates.
                  </p>
                </div>
              </div>

              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="amount">Amount</Label>
                      <div className="flex gap-2">
                        <Input
                          id="amount"
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="1.00"
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fromCurrency">From</Label>
                        <Select
                          value={fromCurrency}
                          onValueChange={setFromCurrency}
                        >
                          <SelectTrigger id="fromCurrency">
                            <SelectValue placeholder="Select currency" />
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

                      <div className="relative">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={handleSwapCurrencies}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 md:flex hidden"
                        >
                          <ArrowRight className="h-4 w-4 rotate-90 md:rotate-0" />
                        </Button>

                        <Label htmlFor="toCurrency">To</Label>
                        <Select
                          value={toCurrency}
                          onValueChange={setToCurrency}
                        >
                          <SelectTrigger id="toCurrency">
                            <SelectValue placeholder="Select currency" />
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
                    </div>

                    <Button
                      onClick={handleConvert}
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Converting..." : "Convert"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {error && (
                <div className="p-4 mb-6 bg-red-50 text-red-800 rounded-lg border border-red-200">
                  <p>Error fetching exchange rates. Please try again later.</p>
                </div>
              )}

              {convertedAmount !== null && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Conversion Result</h3>

                    <div className="text-center p-6 bg-toolify-50 rounded-lg mb-4">
                      <div className="text-3xl font-bold mb-2">
                        {getCurrencySymbol(fromCurrency)}{parseFloat(amount).toFixed(2)} = {getCurrencySymbol(toCurrency)}{convertedAmount.toFixed(2)}
                      </div>
                      {exchangeRate && (
                        <p className="text-muted-foreground">
                          1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
                        </p>
                      )}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p>Last updated: {new Date().toLocaleString()}</p>
                      <p className="mt-1">Exchange rates are provided from Fixer.io API with a fallback to open.er-api.com.</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="mt-8 p-6 bg-toolify-50 rounded-lg text-sm">
                <h3 className="font-semibold mb-2">About Currency Conversion</h3>
                <p className="mb-3">
                  Currency conversion is the process of changing one currency into another at a specific exchange rate.
                  Exchange rates fluctuate based on market conditions and are influenced by factors such as economic
                  indicators, interest rates, and geopolitical events.
                </p>

                <h4 className="font-medium mt-4">Common Uses:</h4>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>International travel planning</li>
                  <li>Online shopping from foreign websites</li>
                  <li>Investment analysis</li>
                  <li>Business accounting for multinational operations</li>
                  <li>Remittances and money transfers</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CurrencyConverter;
