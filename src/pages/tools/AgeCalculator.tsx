
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { toast } from 'sonner';
import { format, differenceInYears, differenceInMonths, differenceInDays, isValid, parse } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from "@/lib/utils";

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(new Date());
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);
  const [nextBirthday, setNextBirthday] = useState<{ days: number } | null>(null);

  const calculateAge = () => {
    if (!birthDate) {
      toast.error('Please select your birth date');
      return;
    }

    if (!toDate) {
      toast.error('Please select the date to calculate age to');
      return;
    }

    if (birthDate > toDate) {
      toast.error('Birth date cannot be in the future');
      return;
    }

    // Years calculation
    const years = differenceInYears(toDate, birthDate);
    
    // Create a date with the same day/month as birth but in the year of toDate
    const birthDateThisYear = new Date(toDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    
    // Adjust if birthday already passed this year
    const adjustedBirthDate = birthDateThisYear > toDate 
      ? new Date(toDate.getFullYear() - 1, birthDate.getMonth(), birthDate.getDate())
      : birthDateThisYear;
    
    // Get months from the last birthday
    const months = differenceInMonths(toDate, adjustedBirthDate) % 12;
    
    // Get days
    const lastMonthDate = new Date(toDate.getFullYear(), toDate.getMonth() - months, birthDate.getDate());
    let days = differenceInDays(toDate, lastMonthDate);
    
    setAge({ years, months, days });
    
    // Calculate days until next birthday
    const nextBirthdayDate = new Date(toDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthdayDate < toDate) {
      nextBirthdayDate.setFullYear(toDate.getFullYear() + 1);
    }
    
    const daysUntilBirthday = differenceInDays(nextBirthdayDate, toDate);
    setNextBirthday({ days: daysUntilBirthday });
    
    toast.success('Age calculated successfully!');
  };

  return (
    <>
      <Helmet>
        <title>Age Calculator | Toolify</title>
        <meta name="description" content="Calculate your exact age in years, months, and days from your birth date to today or any selected date." />
        <meta name="keywords" content="age calculator, birthday calculator, age in years, months, days calculator, how old am I, exact age calculation, date of birth calculator, next birthday countdown, age difference calculator" />
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-20 animate-fade-in">
        <section className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-toolify-100 text-toolify-700 flex items-center justify-center">
                  <Clock size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Age Calculator</h1>
                  <p className="text-muted-foreground">
                    Calculate exact age from birthdate to current or selected date.
                  </p>
                </div>
              </div>

              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Date of Birth</h3>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !birthDate && "text-muted-foreground"
                            )}
                          >
                            {birthDate ? format(birthDate, "PPP") : "Select your birth date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={birthDate}
                            onSelect={setBirthDate}
                            disabled={(date) => date > new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Calculate Age To</h3>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !toDate && "text-muted-foreground"
                            )}
                          >
                            {toDate ? format(toDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={toDate}
                            onSelect={setToDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <Button onClick={calculateAge} className="w-full mt-6">Calculate Age</Button>
                </CardContent>
              </Card>

              {age && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Age Calculation Results</h3>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-toolify-50 rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-toolify-700">{age.years}</p>
                        <p className="text-sm text-muted-foreground">Years</p>
                      </div>
                      <div className="bg-toolify-50 rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-toolify-700">{age.months}</p>
                        <p className="text-sm text-muted-foreground">Months</p>
                      </div>
                      <div className="bg-toolify-50 rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-toolify-700">{age.days}</p>
                        <p className="text-sm text-muted-foreground">Days</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Summary</h4>
                      <p>You are {age.years} years, {age.months} months, and {age.days} days old.</p>
                      
                      {nextBirthday && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                          <p className="text-blue-800">
                            {nextBirthday.days === 0 
                              ? "Happy Birthday! Today is your birthday!" 
                              : `Your next birthday is in ${nextBirthday.days} days.`}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <div className="mt-8 p-6 bg-toolify-50 rounded-lg text-sm">
                <h3 className="font-semibold mb-2">About Age Calculation</h3>
                <p className="mb-3">
                  Age calculation determines the exact time between your birth date and the current or selected date,
                  expressed in years, months, and days.
                </p>
                
                <h4 className="font-medium mt-4">Why exact age matters:</h4>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Legal purposes (eligibility for services, retirement, etc.)</li>
                  <li>Medical considerations</li>
                  <li>Astrological calculations</li>
                  <li>Personal milestone tracking</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AgeCalculator;
