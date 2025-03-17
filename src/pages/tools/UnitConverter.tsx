
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Ruler, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
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

type UnitCategory = 'length' | 'weight' | 'temperature' | 'area' | 'volume' | 'speed';

interface UnitOption {
  value: string;
  label: string;
  conversionFactor: number;
}

const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [formula, setFormula] = useState<string>('');

  // Unit conversion data
  const unitOptions: Record<UnitCategory, UnitOption[]> = {
    length: [
      { value: 'mm', label: 'Millimeters (mm)', conversionFactor: 0.001 },
      { value: 'cm', label: 'Centimeters (cm)', conversionFactor: 0.01 },
      { value: 'm', label: 'Meters (m)', conversionFactor: 1 },
      { value: 'km', label: 'Kilometers (km)', conversionFactor: 1000 },
      { value: 'in', label: 'Inches (in)', conversionFactor: 0.0254 },
      { value: 'ft', label: 'Feet (ft)', conversionFactor: 0.3048 },
      { value: 'yd', label: 'Yards (yd)', conversionFactor: 0.9144 },
      { value: 'mi', label: 'Miles (mi)', conversionFactor: 1609.344 }
    ],
    weight: [
      { value: 'mg', label: 'Milligrams (mg)', conversionFactor: 0.000001 },
      { value: 'g', label: 'Grams (g)', conversionFactor: 0.001 },
      { value: 'kg', label: 'Kilograms (kg)', conversionFactor: 1 },
      { value: 't', label: 'Metric Tons (t)', conversionFactor: 1000 },
      { value: 'oz', label: 'Ounces (oz)', conversionFactor: 0.02834952 },
      { value: 'lb', label: 'Pounds (lb)', conversionFactor: 0.45359237 },
      { value: 'st', label: 'Stone (st)', conversionFactor: 6.35029 }
    ],
    temperature: [
      { value: 'c', label: 'Celsius (°C)', conversionFactor: 1 },
      { value: 'f', label: 'Fahrenheit (°F)', conversionFactor: 1 },
      { value: 'k', label: 'Kelvin (K)', conversionFactor: 1 }
    ],
    area: [
      { value: 'mm2', label: 'Square Millimeters (mm²)', conversionFactor: 0.000001 },
      { value: 'cm2', label: 'Square Centimeters (cm²)', conversionFactor: 0.0001 },
      { value: 'm2', label: 'Square Meters (m²)', conversionFactor: 1 },
      { value: 'ha', label: 'Hectares (ha)', conversionFactor: 10000 },
      { value: 'km2', label: 'Square Kilometers (km²)', conversionFactor: 1000000 },
      { value: 'in2', label: 'Square Inches (in²)', conversionFactor: 0.00064516 },
      { value: 'ft2', label: 'Square Feet (ft²)', conversionFactor: 0.09290304 },
      { value: 'yd2', label: 'Square Yards (yd²)', conversionFactor: 0.83612736 },
      { value: 'ac', label: 'Acres (ac)', conversionFactor: 4046.8564224 },
      { value: 'mi2', label: 'Square Miles (mi²)', conversionFactor: 2589988.110336 }
    ],
    volume: [
      { value: 'ml', label: 'Milliliters (ml)', conversionFactor: 0.001 },
      { value: 'l', label: 'Liters (l)', conversionFactor: 1 },
      { value: 'cm3', label: 'Cubic Centimeters (cm³)', conversionFactor: 0.001 },
      { value: 'm3', label: 'Cubic Meters (m³)', conversionFactor: 1000 },
      { value: 'gal_us', label: 'US Gallons (gal)', conversionFactor: 3.78541 },
      { value: 'gal_uk', label: 'UK Gallons (gal)', conversionFactor: 4.54609 },
      { value: 'qt', label: 'Quarts (qt)', conversionFactor: 0.946353 },
      { value: 'pt', label: 'Pints (pt)', conversionFactor: 0.473176 },
      { value: 'fl_oz', label: 'Fluid Ounces (fl oz)', conversionFactor: 0.0295735 },
      { value: 'cup', label: 'Cups (cup)', conversionFactor: 0.24 }
    ],
    speed: [
      { value: 'mps', label: 'Meters per Second (m/s)', conversionFactor: 1 },
      { value: 'kph', label: 'Kilometers per Hour (km/h)', conversionFactor: 0.277778 },
      { value: 'mph', label: 'Miles per Hour (mph)', conversionFactor: 0.44704 },
      { value: 'knot', label: 'Knots (kn)', conversionFactor: 0.514444 },
      { value: 'fts', label: 'Feet per Second (ft/s)', conversionFactor: 0.3048 }
    ]
  };

  const convertTemperature = (value: number, from: string, to: string): number => {
    // Convert to Celsius first (our base unit)
    let tempInCelsius;
    
    if (from === 'c') {
      tempInCelsius = value;
    } else if (from === 'f') {
      tempInCelsius = (value - 32) * 5/9;
    } else if (from === 'k') {
      tempInCelsius = value - 273.15;
    } else {
      return NaN;
    }
    
    // Convert from Celsius to target unit
    if (to === 'c') {
      return tempInCelsius;
    } else if (to === 'f') {
      return (tempInCelsius * 9/5) + 32;
    } else if (to === 'k') {
      return tempInCelsius + 273.15;
    } else {
      return NaN;
    }
  };

  const getTemperatureFormula = (from: string, to: string): string => {
    const formulas: Record<string, Record<string, string>> = {
      'c': {
        'f': '(°C × 9/5) + 32 = °F',
        'k': '°C + 273.15 = K'
      },
      'f': {
        'c': '(°F - 32) × 5/9 = °C',
        'k': '(°F - 32) × 5/9 + 273.15 = K'
      },
      'k': {
        'c': 'K - 273.15 = °C',
        'f': '(K - 273.15) × 9/5 + 32 = °F'
      }
    };
    
    return formulas[from]?.[to] || '';
  };

  const getConversionFormula = (fromValue: string, fromUnit: string, toUnit: string): string => {
    if (category === 'temperature') {
      return getTemperatureFormula(fromUnit, toUnit);
    }
    
    const fromOption = unitOptions[category].find(u => u.value === fromUnit);
    const toOption = unitOptions[category].find(u => u.value === toUnit);
    
    if (!fromOption || !toOption) return '';
    
    if (fromOption.conversionFactor === toOption.conversionFactor) {
      return `${fromValue} ${fromOption.value} = ${fromValue} ${toOption.value}`;
    }
    
    const conversionFactor = toOption.conversionFactor / fromOption.conversionFactor;
    
    if (conversionFactor < 1) {
      return `${fromValue} ${fromOption.value} ÷ ${(1/conversionFactor).toFixed(4)} = ${toOption.value}`;
    } else {
      return `${fromValue} ${fromOption.value} × ${conversionFactor.toFixed(4)} = ${toOption.value}`;
    }
  };

  const handleConversion = () => {
    if (!inputValue || !fromUnit || !toUnit) {
      toast.error('Please fill in all fields');
      return;
    }

    const value = parseFloat(inputValue);
    
    if (isNaN(value)) {
      toast.error('Please enter a valid number');
      return;
    }
    
    try {
      let convertedValue;
      
      if (category === 'temperature') {
        convertedValue = convertTemperature(value, fromUnit, toUnit);
        setFormula(getTemperatureFormula(fromUnit, toUnit));
      } else {
        const fromUnitOption = unitOptions[category].find(u => u.value === fromUnit);
        const toUnitOption = unitOptions[category].find(u => u.value === toUnit);
        
        if (!fromUnitOption || !toUnitOption) {
          toast.error('Invalid unit selection');
          return;
        }
        
        // Convert to base unit then to target unit
        const valueInBaseUnit = value * fromUnitOption.conversionFactor;
        convertedValue = valueInBaseUnit / toUnitOption.conversionFactor;
        
        setFormula(getConversionFormula(value.toString(), fromUnit, toUnit));
      }
      
      setResult(convertedValue);
      toast.success('Conversion completed successfully!');
    } catch (error) {
      toast.error('Error during conversion. Please check your inputs.');
    }
  };

  const handleCategoryChange = (newCategory: UnitCategory) => {
    setCategory(newCategory);
    setFromUnit('');
    setToUnit('');
    setResult(null);
    setFormula('');
  };

  const handleSwapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setResult(null);
  };

  return (
    <>
      <Helmet>
        <title>Unit Converter | Toolify</title>
        <meta name="description" content="Convert between different units of measurement with this easy-to-use unit converter tool." />
        <meta name="keywords" content="unit converter, metric converter, measurement converter, length converter, weight converter, temperature converter, area converter, volume converter, speed converter, unit calculator, conversion tool, metric to imperial, imperial to metric" />
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-20 animate-fade-in">
        <section className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-toolify-100 text-toolify-700 flex items-center justify-center">
                  <Ruler size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Unit Converter</h1>
                  <p className="text-muted-foreground">
                    Convert between different units of measurement.
                  </p>
                </div>
              </div>

              <Card className="mb-6">
                <CardContent className="pt-6">
                  <Tabs defaultValue="length" onValueChange={(value) => handleCategoryChange(value as UnitCategory)}>
                    <TabsList className="mb-4 grid grid-cols-3 md:grid-cols-6">
                      <TabsTrigger value="length">Length</TabsTrigger>
                      <TabsTrigger value="weight">Weight</TabsTrigger>
                      <TabsTrigger value="temperature">Temperature</TabsTrigger>
                      <TabsTrigger value="area">Area</TabsTrigger>
                      <TabsTrigger value="volume">Volume</TabsTrigger>
                      <TabsTrigger value="speed">Speed</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value={category}>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="inputValue">Value</Label>
                          <Input
                            id="inputValue"
                            type="number"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Enter value"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="fromUnit">From</Label>
                            <Select
                              value={fromUnit}
                              onValueChange={setFromUnit}
                            >
                              <SelectTrigger id="fromUnit">
                                <SelectValue placeholder="Select unit" />
                              </SelectTrigger>
                              <SelectContent>
                                {unitOptions[category].map((unit) => (
                                  <SelectItem key={unit.value} value={unit.value}>
                                    {unit.label}
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
                              onClick={handleSwapUnits}
                              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 md:flex hidden"
                            >
                              <ArrowRight className="h-4 w-4 rotate-90 md:rotate-0" />
                            </Button>
                            
                            <Label htmlFor="toUnit">To</Label>
                            <Select
                              value={toUnit}
                              onValueChange={setToUnit}
                            >
                              <SelectTrigger id="toUnit">
                                <SelectValue placeholder="Select unit" />
                              </SelectTrigger>
                              <SelectContent>
                                {unitOptions[category].map((unit) => (
                                  <SelectItem key={unit.value} value={unit.value}>
                                    {unit.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <Button onClick={handleConversion} className="w-full">Convert</Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {result !== null && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Conversion Result</h3>
                    
                    <div className="text-center p-6 bg-toolify-50 rounded-lg mb-4">
                      <div className="flex items-center justify-center gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">From</p>
                          <p className="text-xl font-bold">
                            {inputValue} {unitOptions[category].find(u => u.value === fromUnit)?.label.split(' ')[0]}
                          </p>
                        </div>
                        <ArrowRight className="text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">To</p>
                          <p className="text-xl font-bold">
                            {Number(result).toLocaleString(undefined, { 
                              maximumFractionDigits: 8,
                              minimumFractionDigits: 0 
                            })} {unitOptions[category].find(u => u.value === toUnit)?.label.split(' ')[0]}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {formula && (
                      <div className="border-t pt-4 mt-4">
                        <h4 className="font-medium mb-2">Formula Used:</h4>
                        <p className="bg-white p-2 rounded font-mono text-sm">{formula}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
              
              <div className="mt-8 p-6 bg-toolify-50 rounded-lg text-sm">
                <h3 className="font-semibold mb-2">About Unit Conversion</h3>
                <p className="mb-3">
                  Unit conversion is the process of changing a measurement from one unit to another.
                  This tool supports conversions across multiple categories including length, weight, temperature,
                  area, volume, and speed.
                </p>
                
                <h4 className="font-medium mt-4">Common Applications:</h4>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Scientific calculations</li>
                  <li>Engineering projects</li>
                  <li>Cooking and baking (volume conversions)</li>
                  <li>Construction and home improvement</li>
                  <li>International travel and commerce</li>
                  <li>Fitness and health tracking</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default UnitConverter;
