
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, CaptionProps } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 pointer-events-auto", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center gap-1",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
        Caption: (props: CaptionProps) => <CustomCaption {...props} />
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

// Custom caption component with month/year dropdowns
function CustomCaption(props: CaptionProps) {
  const { displayMonth } = props;
  
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  
  const monthIndex = displayMonth.getMonth();
  const year = displayMonth.getFullYear();
  
  // Create year range (10 years back, 10 years forward)
  const startYear = year - 10;
  const endYear = year + 10;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  
  const handleMonthChange = (newMonth: string) => {
    const newMonthIndex = months.findIndex(m => m === newMonth);
    const newDate = new Date(displayMonth);
    newDate.setMonth(newMonthIndex);
    
    // Access the proper DayPicker context to navigate to a month
    props.activeModifiers.outside = [];
    const dayPicker = document.getElementsByClassName('rdp')[0] as HTMLElement;
    const customEvent = new CustomEvent('dateSelect', { detail: { date: newDate } });
    dayPicker.dispatchEvent(customEvent);
    
    // Fall back to using the DayPicker's built-in navigation
    if (props.onPrevious && props.onNext) {
      // Calculate the number of months to move
      const currentMonth = displayMonth.getMonth();
      const diff = newMonthIndex - currentMonth;
      
      // Move forward or backward based on the difference
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          props.onNext();
        }
      } else if (diff < 0) {
        for (let i = 0; i < Math.abs(diff); i++) {
          props.onPrevious();
        }
      }
    }
  };
  
  const handleYearChange = (newYear: string) => {
    const newDate = new Date(displayMonth);
    const newYearNumber = parseInt(newYear);
    const currentYear = displayMonth.getFullYear();
    newDate.setFullYear(newYearNumber);
    
    // Access the proper DayPicker context to navigate to a month
    props.activeModifiers.outside = [];
    const dayPicker = document.getElementsByClassName('rdp')[0] as HTMLElement;
    const customEvent = new CustomEvent('dateSelect', { detail: { date: newDate } });
    dayPicker.dispatchEvent(customEvent);
    
    // Fall back to using the DayPicker's built-in navigation
    if (props.onPrevious && props.onNext) {
      // Calculate the number of years to move
      const diff = newYearNumber - currentYear;
      
      // Move by months (12 months per year)
      if (diff > 0) {
        for (let i = 0; i < diff * 12; i++) {
          props.onNext();
        }
      } else if (diff < 0) {
        for (let i = 0; i < Math.abs(diff) * 12; i++) {
          props.onPrevious();
        }
      }
    }
  };
  
  return (
    <div className="flex justify-center items-center gap-1 px-8">
      <div className="flex-1">
        <Select 
          value={months[monthIndex]} 
          onValueChange={handleMonthChange}
        >
          <SelectTrigger className="h-7 text-xs">
            <SelectValue placeholder={months[monthIndex]} />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month} value={month} className="text-xs">
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1">
        <Select 
          value={year.toString()} 
          onValueChange={handleYearChange}
        >
          <SelectTrigger className="h-7 text-xs">
            <SelectValue placeholder={year.toString()} />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y.toString()} className="text-xs">
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export { Calendar };
