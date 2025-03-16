
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Globe, Clock, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { fetchTimeZones } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

interface TimeZoneData {
  timezone: string;
  time: string;
  date: string;
}

const WorldClock: React.FC = () => {
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>([]);
  const [timeData, setTimeData] = useState<Record<string, TimeZoneData>>({});
  
  // Query for fetching available timezones
  const { data: timezones, isLoading, error } = useQuery({
    queryKey: ['timezones'],
    queryFn: fetchTimeZones,
  });

  // Update clock data every second
  useEffect(() => {
    const updateClocks = () => {
      const updatedTimeData: Record<string, TimeZoneData> = {};
      
      selectedTimezones.forEach(timezone => {
        const date = new Date();
        try {
          // Format the date according to the timezone
          const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
          });
          
          const dateFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          
          updatedTimeData[timezone] = {
            timezone,
            time: formatter.format(date),
            date: dateFormatter.format(date),
          };
        } catch (err) {
          console.error(`Error formatting time for ${timezone}:`, err);
        }
      });
      
      setTimeData(updatedTimeData);
    };
    
    // Initial update
    updateClocks();
    
    // Set interval for updates
    const interval = setInterval(updateClocks, 1000);
    
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [selectedTimezones]);
  
  const addTimezone = (timezone: string) => {
    if (selectedTimezones.includes(timezone)) {
      toast.error('This timezone is already added');
      return;
    }
    
    setSelectedTimezones([...selectedTimezones, timezone]);
    toast.success(`Added ${formatTimezoneName(timezone)}`);
  };
  
  const removeTimezone = (timezone: string) => {
    setSelectedTimezones(selectedTimezones.filter(tz => tz !== timezone));
    toast.success(`Removed ${formatTimezoneName(timezone)}`);
  };
  
  const formatTimezoneName = (timezone: string) => {
    return timezone.replace(/_/g, ' ').replace(/\//g, ' / ');
  };
  
  // Group timezones by continent
  const groupedTimezones: Record<string, string[]> = {};
  
  if (timezones) {
    timezones.forEach((timezone: string) => {
      const parts = timezone.split('/');
      const continent = parts[0];
      
      if (!groupedTimezones[continent]) {
        groupedTimezones[continent] = [];
      }
      
      groupedTimezones[continent].push(timezone);
    });
  }
  
  return (
    <>
      <Helmet>
        <title>World Clock | Toolify</title>
        <meta name="description" content="Check the current time in different time zones around the world with Toolify's free World Clock tool." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-20 animate-fade-in">
        <section className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-toolify-100 text-toolify-700 flex items-center justify-center">
                  <Globe size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">World Clock</h1>
                  <p className="text-muted-foreground">
                    Check the current time in different time zones around the world.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-subtle border border-gray-100 mb-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <h2 className="text-lg font-semibold">Add a location</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select a timezone to add to your world clock dashboard
                    </p>
                    
                    {isLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-toolify-600"></div>
                      </div>
                    ) : error ? (
                      <div className="text-red-500 py-4">
                        Error loading timezones. Please try again later.
                      </div>
                    ) : (
                      <Select onValueChange={addTimezone}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a timezone" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[400px]">
                          {Object.keys(groupedTimezones).sort().map(continent => (
                            <div key={continent}>
                              <div className="font-semibold px-2 py-1.5 text-sm text-muted-foreground">
                                {continent}
                              </div>
                              {groupedTimezones[continent].sort().map(timezone => (
                                <SelectItem key={timezone} value={timezone}>
                                  {formatTimezoneName(timezone)}
                                </SelectItem>
                              ))}
                            </div>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  
                  <div className="bg-toolify-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={18} className="text-toolify-700" />
                      <h3 className="font-medium">Current Local Time</h3>
                    </div>
                    <div className="text-2xl font-semibold mb-1">
                      {new Date().toLocaleTimeString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-4">Your World Clock</h2>
                
                {selectedTimezones.length === 0 ? (
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-8 text-center">
                    <Globe className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                    <p className="text-muted-foreground mb-3">No timezones added yet</p>
                    <p className="text-sm text-muted-foreground">
                      Select a timezone from the dropdown above to add it to your world clock.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedTimezones.map((timezone) => (
                      <motion.div
                        key={timezone}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="overflow-hidden">
                          <CardHeader className="bg-toolify-50 pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">{formatTimezoneName(timezone)}</CardTitle>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-7 w-7"
                                onClick={() => removeTimezone(timezone)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <CardDescription>
                              {timezone}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-4">
                            {timeData[timezone] ? (
                              <>
                                <div className="text-3xl font-semibold mb-1 font-mono">
                                  {timeData[timezone].time}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {timeData[timezone].date}
                                </div>
                              </>
                            ) : (
                              <div className="animate-pulse h-12 bg-gray-200 rounded"></div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="mt-12 bg-toolify-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-2">About World Clock</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  World Clock allows you to check the current time in different time zones around the world. 
                  This is particularly useful for coordinating calls or meetings with people in different locations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-1">Features:</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Real-time updates every second</li>
                      <li>Support for all major time zones</li>
                      <li>Date and time in local format</li>
                      <li>Easy to add and remove locations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Helpful For:</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>International business meetings</li>
                      <li>Coordinating across global teams</li>
                      <li>Planning international travel</li>
                      <li>Keeping track of family in different countries</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gradient-to-b from-toolify-50 to-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <svg
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-auto mr-2"
                >
                  <path
                    d="M20 8L38 8L38 16C38 18.2091 36.2091 20 34 20L24 20C21.7909 20 20 18.2091 20 16L20 8Z"
                    fill="#2980FE"
                    className="fill-toolify-600"
                  />
                  <path
                    d="M26 20L32 20L32 44C32 46.2091 30.2091 48 28 48V48C25.7909 48 24 46.2091 24 44L24 20L26 20Z"
                    fill="#2980FE"
                    className="fill-toolify-600"
                  />
                  <path
                    d="M15 12H43C45.2091 12 47 13.7909 47 16V16C47 18.2091 45.2091 20 43 20H13C10.7909 20 9 18.2091 9 16V16C9 13.7909 10.7909 12 13 12H15Z"
                    fill="#0B50E2"
                    className="fill-toolify-700"
                  />
                </svg>
                <span className="font-display font-bold text-lg">Toolify</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Smart tools for everyday calculations.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 text-sm">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold mb-2">Navigation</h3>
                <a href="/" className="text-muted-foreground hover:text-toolify-600">Home</a>
                <a href="/about" className="text-muted-foreground hover:text-toolify-600">About</a>
                <a href="/contact" className="text-muted-foreground hover:text-toolify-600">Contact</a>
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold mb-2">Popular Tools</h3>
                <a href="/tools/qr-generator" className="text-muted-foreground hover:text-toolify-600">QR Generator</a>
                <a href="/tools/world-clock" className="text-muted-foreground hover:text-toolify-600">World Clock</a>
                <a href="/tools/percentage-calculator" className="text-muted-foreground hover:text-toolify-600">Percentage Calculator</a>
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold mb-2">Legal</h3>
                <a href="#" className="text-muted-foreground hover:text-toolify-600">Privacy Policy</a>
                <a href="#" className="text-muted-foreground hover:text-toolify-600">Terms of Service</a>
              </div>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Toolify. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex gap-4">
              <a href="#" className="hover:text-toolify-600">Twitter</a>
              <a href="#" className="hover:text-toolify-600">LinkedIn</a>
              <a href="#" className="hover:text-toolify-600">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default WorldClock;
