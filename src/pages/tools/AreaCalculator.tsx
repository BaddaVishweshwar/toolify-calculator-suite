
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Square, Circle, Triangle, Hexagon } from 'lucide-react';
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

interface ShapeResult {
  area: number;
  perimeter?: number;
  shape: string;
}

const AreaCalculator: React.FC = () => {
  const [shape, setShape] = useState('rectangle');
  const [unit, setUnit] = useState('m²');
  const [result, setResult] = useState<ShapeResult | null>(null);
  
  // Rectangle/Square state
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  
  // Circle state
  const [radius, setRadius] = useState('');
  
  // Triangle state
  const [baseLength, setBaseLength] = useState('');
  const [height, setHeight] = useState('');
  const [sideA, setSideA] = useState('');
  const [sideB, setSideB] = useState('');
  const [sideC, setSideC] = useState('');

  const calculateArea = () => {
    let area = 0;
    let perimeter = 0;
    
    try {
      switch (shape) {
        case 'square':
          if (!length) {
            toast.error('Please enter the side length');
            return;
          }
          const side = parseFloat(length);
          area = side * side;
          perimeter = 4 * side;
          break;
          
        case 'rectangle':
          if (!length || !width) {
            toast.error('Please enter both length and width');
            return;
          }
          const rectLength = parseFloat(length);
          const rectWidth = parseFloat(width);
          area = rectLength * rectWidth;
          perimeter = 2 * (rectLength + rectWidth);
          break;
          
        case 'circle':
          if (!radius) {
            toast.error('Please enter the radius');
            return;
          }
          const circleRadius = parseFloat(radius);
          area = Math.PI * circleRadius * circleRadius;
          perimeter = 2 * Math.PI * circleRadius; // circumference
          break;
          
        case 'triangle':
          // Area calculation using base and height
          if (baseLength && height) {
            area = 0.5 * parseFloat(baseLength) * parseFloat(height);
          } else {
            toast.error('Please enter base and height for triangle area');
            return;
          }
          
          // Perimeter calculation if all sides are provided
          if (sideA && sideB && sideC) {
            perimeter = parseFloat(sideA) + parseFloat(sideB) + parseFloat(sideC);
          } else {
            perimeter = 0; // Don't show perimeter if not all sides provided
          }
          break;
          
        default:
          toast.error('Please select a valid shape');
          return;
      }
      
      setResult({
        area,
        perimeter: perimeter || undefined,
        shape
      });
      
      toast.success('Area calculated successfully!');
    } catch (error) {
      toast.error('Error calculating area. Please check your inputs.');
    }
  };

  const renderInputFields = () => {
    switch (shape) {
      case 'square':
        return (
          <div>
            <Label htmlFor="length">Side Length</Label>
            <Input
              id="length"
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="Enter side length"
            />
          </div>
        );
        
      case 'rectangle':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="length">Length</Label>
              <Input
                id="length"
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="Enter length"
              />
            </div>
            <div>
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="Enter width"
              />
            </div>
          </div>
        );
        
      case 'circle':
        return (
          <div>
            <Label htmlFor="radius">Radius</Label>
            <Input
              id="radius"
              type="number"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              placeholder="Enter radius"
            />
          </div>
        );
        
      case 'triangle':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="baseLength">Base</Label>
                <Input
                  id="baseLength"
                  type="number"
                  value={baseLength}
                  onChange={(e) => setBaseLength(e.target.value)}
                  placeholder="Enter base length"
                />
              </div>
              <div>
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter height"
                />
              </div>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <p className="text-sm text-muted-foreground mb-2">For perimeter calculation (optional):</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="sideA">Side A</Label>
                  <Input
                    id="sideA"
                    type="number"
                    value={sideA}
                    onChange={(e) => setSideA(e.target.value)}
                    placeholder="Side A"
                  />
                </div>
                <div>
                  <Label htmlFor="sideB">Side B</Label>
                  <Input
                    id="sideB"
                    type="number"
                    value={sideB}
                    onChange={(e) => setSideB(e.target.value)}
                    placeholder="Side B"
                  />
                </div>
                <div>
                  <Label htmlFor="sideC">Side C</Label>
                  <Input
                    id="sideC"
                    type="number"
                    value={sideC}
                    onChange={(e) => setSideC(e.target.value)}
                    placeholder="Side C"
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  const getShapeIcon = () => {
    switch (shape) {
      case 'square':
      case 'rectangle':
        return <Square className="h-12 w-12 text-toolify-600" />;
      case 'circle':
        return <Circle className="h-12 w-12 text-toolify-600" />;
      case 'triangle':
        return <Triangle className="h-12 w-12 text-toolify-600" />;
      default:
        return <Square className="h-12 w-12 text-toolify-600" />;
    }
  };

  const formatResult = (value: number) => {
    return value.toFixed(4).replace(/\.?0+$/, '');
  };

  return (
    <>
      <Helmet>
        <title>Area Calculator | Toolify</title>
        <meta name="description" content="Calculate area and perimeter of different geometric shapes like square, rectangle, circle, and triangle." />
        <meta name="keywords" content="area calculator, square area, rectangle area, circle area, triangle area, geometry calculator, perimeter calculator, shape calculator, mathematics, geometric calculations, land area calculator, room area" />
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-20 animate-fade-in">
        <section className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-toolify-100 text-toolify-700 flex items-center justify-center">
                  <Square size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Area Calculator</h1>
                  <p className="text-muted-foreground">
                    Calculate area of different geometric shapes.
                  </p>
                </div>
              </div>

              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="shape">Select Shape</Label>
                      <Select
                        value={shape}
                        onValueChange={setShape}
                      >
                        <SelectTrigger id="shape">
                          <SelectValue placeholder="Select a shape" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="square">Square</SelectItem>
                          <SelectItem value="rectangle">Rectangle</SelectItem>
                          <SelectItem value="circle">Circle</SelectItem>
                          <SelectItem value="triangle">Triangle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="unit">Unit</Label>
                      <Select
                        value={unit}
                        onValueChange={setUnit}
                      >
                        <SelectTrigger id="unit">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="m²">Square Meters (m²)</SelectItem>
                          <SelectItem value="cm²">Square Centimeters (cm²)</SelectItem>
                          <SelectItem value="km²">Square Kilometers (km²)</SelectItem>
                          <SelectItem value="ft²">Square Feet (ft²)</SelectItem>
                          <SelectItem value="in²">Square Inches (in²)</SelectItem>
                          <SelectItem value="yd²">Square Yards (yd²)</SelectItem>
                          <SelectItem value="acre">Acres</SelectItem>
                          <SelectItem value="ha">Hectares (ha)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="pt-2 border-t">
                      {renderInputFields()}
                    </div>
                    
                    <Button onClick={calculateArea} className="w-full">Calculate Area</Button>
                  </div>
                </CardContent>
              </Card>

              {result && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      {getShapeIcon()}
                    </div>
                    
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold capitalize">{result.shape}</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-toolify-50 rounded-lg p-6 text-center">
                        <h4 className="text-sm text-muted-foreground mb-1">Area</h4>
                        <p className="text-2xl font-bold">{formatResult(result.area)} {unit}</p>
                      </div>
                      
                      {result.perimeter !== undefined && (
                        <div className="bg-toolify-50 rounded-lg p-6 text-center">
                          <h4 className="text-sm text-muted-foreground mb-1">
                            {shape === 'circle' ? 'Circumference' : 'Perimeter'}
                          </h4>
                          <p className="text-2xl font-bold">
                            {formatResult(result.perimeter)} {unit.charAt(0)}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t text-sm text-muted-foreground">
                      <h4 className="font-medium text-foreground mb-2">Formula Used:</h4>
                      <p className="font-mono bg-gray-50 p-2 rounded">
                        {shape === 'square' && 'Area = side × side'}
                        {shape === 'rectangle' && 'Area = length × width'}
                        {shape === 'circle' && 'Area = π × radius²'}
                        {shape === 'triangle' && 'Area = ½ × base × height'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <div className="mt-8 p-6 bg-toolify-50 rounded-lg text-sm">
                <h3 className="font-semibold mb-2">About Area Calculation</h3>
                <p className="mb-3">
                  Area is the quantity that expresses the extent of a two-dimensional shape or planar lamina, 
                  in the plane. Surface area is its analog on the two-dimensional surface of a three-dimensional object.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-medium">Common Area Formulas:</h4>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>Square: side²</li>
                      <li>Rectangle: length × width</li>
                      <li>Circle: π × radius²</li>
                      <li>Triangle: ½ × base × height</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Applications:</h4>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>Architecture and construction</li>
                      <li>Land measurement</li>
                      <li>Interior design</li>
                      <li>Manufacturing</li>
                      <li>Material estimation</li>
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

export default AreaCalculator;
