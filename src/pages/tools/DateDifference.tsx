
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar as CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import { format, differenceInYears, differenceInMonths, differenceInDays, differenceInWeeks, differenceInHours } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from "@/lib/utils";

const DateDifference: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [difference, setDifference] = useState<{
    years: number;
    months: number;
    weeks: number;
    days: number;
    hours: number;
    totalDays: number;
  } | null>(null);

  const calculateDifference = () => {
    if (!startDate || !endDate) {
      toast.error('Please select both dates');
      return;
    }

    // If start date is after end date, swap them
    let actualStartDate = startDate;
    let actualEndDate = endDate;
    
    if (startDate > endDate) {
      actualStartDate = endDate;
      actualEndDate = startDate;
      toast.info('Start date was after end date, so dates have been swapped');
    }
    
    // Calculate difference components
    const years = differenceInYears(actualEndDate, actualStartDate);
    
    // Calculate remaining months after years
    const startDatePlusYears = new Date(actualStartDate);
    startDatePlusYears.setFullYear(startDatePlusYears.getFullYear() + years);
    const months = differenceInMonths(actualEndDate, startDatePlusYears);
    
    // Calculate total days (useful for many applications)
    const totalDays = differenceInDays(actualEndDate, actualStartDate);
    
    // Calculate weeks (total / 7, floored)
    const weeks = differenceInWeeks(actualEndDate, actualStartDate);
    
    // Calculate remaining days after months
    const startDatePlusMonths = new Date(startDatePlusYears);
    startDatePlusMonths.setMonth(startDatePlusMonths.getMonth() + months);
    const days = differenceInDays(actualEndDate, startDatePlusMonths);
    
    // Calculate hours as well
    const hours = differenceInHours(actualEndDate, actualStartDate);
    
    setDifference({
      years,
      months,
      weeks,
      days,
      hours,
      totalDays
    });
    
    toast.success('Date difference calculated successfully!');
  };

  return (
    <>
      <Helmet>
        <title>Date Difference Calculator | Toolify</title>
        <meta name="description" content="Calculate the exact difference between two dates in years, months, weeks, days, and hours." />
        <meta name="keywords" content="date difference calculator, date duration calculator, days between dates, time between dates, date range calculator, calculate days between dates, date interval, date gap, date span, calendar days calculator, working days calculator" />
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-20 animate-fade-in">
        <section className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-toolify-100 text-toolify-700 flex items-center justify-center">
                  <CalendarIcon size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Date Difference Calculator</h1>
                  <p className="text-muted-foreground">
                    Calculate the exact difference between two dates.
                  </p>
                </div>
              </div>

              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Start Date</h3>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !startDate && "text-muted-foreground"
                            )}
                          >
                            {startDate ? format(startDate, "PPP") : "Select start date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">End Date</h3>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !endDate && "text-muted-foreground"
                            )}
                          >
                            {endDate ? format(endDate, "PPP") : "Select end date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <Button onClick={calculateDifference} className="w-full mt-6">Calculate Difference</Button>
                </CardContent>
              </Card>

              {difference && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Date Difference Results</h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-toolify-50 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-toolify-700">{difference.years}</p>
                        <p className="text-sm text-muted-foreground">Years</p>
                      </div>
                      <div className="bg-toolify-50 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-toolify-700">{difference.months}</p>
                        <p className="text-sm text-muted-foreground">Months</p>
                      </div>
                      <div className="bg-toolify-50 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-toolify-700">{difference.days}</p>
                        <p className="text-sm text-muted-foreground">Days</p>
                      </div>
                      <div className="bg-toolify-50 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-toolify-700">{difference.weeks}</p>
                        <p className="text-sm text-muted-foreground">Weeks</p>
                      </div>
                      <div className="bg-toolify-50 rounded-lg p-4 text-center md:col-span-2">
                        <p className="text-2xl font-bold text-toolify-700">{difference.totalDays}</p>
                        <p className="text-sm text-muted-foreground">Total Days</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Duration Summary</h4>
                      <p>
                        The difference is {difference.years} years, {difference.months} months, and {difference.days} days.
                      </p>
                      <p className="mt-2">
                        This equals {difference.totalDays} total days or approximately {difference.weeks} weeks.
                      </p>
                      <p className="mt-2">
                        In hours, this is approximately {difference.hours} hours.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <div className="mt-8 p-6 bg-toolify-50 rounded-lg text-sm">
                <h3 className="font-semibold mb-2">About Date Difference Calculation</h3>
                <p className="mb-3">
                  Date difference calculation determines the exact time between two dates, expressed in various units like
                  years, months, weeks, days, and hours.
                </p>
                
                <h4 className="font-medium mt-4">Common Uses:</h4>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Project timeline planning</li>
                  <li>Age calculation</li>
                  <li>Event planning</li>
                  <li>Contract duration determination</li>
                  <li>Tracking time between significant events</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default DateDifference;
