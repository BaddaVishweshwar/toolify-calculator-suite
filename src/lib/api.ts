
// Currency API
export const fetchCurrencyRates = async (base: string = 'USD') => {
  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/${base}`);
    if (!response.ok) {
      throw new Error('Failed to fetch currency rates');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    throw error;
  }
};

// Time zones - using a more reliable approach with predefined timezones
export const fetchTimeZones = async () => {
  try {
    // This is a fallback if the API fails
    const commonTimezones = [
      "Africa/Cairo", "Africa/Johannesburg", "Africa/Lagos",
      "America/Chicago", "America/Los_Angeles", "America/New_York", "America/Toronto",
      "Asia/Dubai", "Asia/Hong_Kong", "Asia/Kolkata", "Asia/Seoul", "Asia/Shanghai", "Asia/Singapore", "Asia/Tokyo",
      "Australia/Melbourne", "Australia/Sydney",
      "Europe/Berlin", "Europe/London", "Europe/Moscow", "Europe/Paris",
      "Pacific/Auckland", "Pacific/Honolulu"
    ];
    
    // Try the API first
    const response = await fetch('https://worldtimeapi.org/api/timezone');
    if (!response.ok) {
      console.log("Using fallback timezone list");
      return commonTimezones;
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching time zones:', error);
    // Return the fallback list if the API fails
    return [
      "Africa/Cairo", "Africa/Johannesburg", "Africa/Lagos",
      "America/Chicago", "America/Los_Angeles", "America/New_York", "America/Toronto",
      "Asia/Dubai", "Asia/Hong_Kong", "Asia/Kolkata", "Asia/Seoul", "Asia/Shanghai", "Asia/Singapore", "Asia/Tokyo",
      "Australia/Melbourne", "Australia/Sydney",
      "Europe/Berlin", "Europe/London", "Europe/Moscow", "Europe/Paris",
      "Pacific/Auckland", "Pacific/Honolulu"
    ];
  }
};

export const fetchTimeForZone = async (timezone: string) => {
  try {
    const response = await fetch(`https://worldtimeapi.org/api/timezone/${timezone}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch time for ${timezone}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching time for ${timezone}:`, error);
    throw error;
  }
};

// QR Code generation
export const getQRCodeUrl = (text: string, size: number = 200) => {
  const encodedText = encodeURIComponent(text);
  return `https://api.qrserver.com/v1/create-qr-code/?data=${encodedText}&size=${size}x${size}`;
};

// Common currency list for dropdown
export const commonCurrencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "ZAR", name: "South African Rand", symbol: "R" }
];

