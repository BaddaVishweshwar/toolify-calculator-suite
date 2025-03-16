
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

// Time zones
export const fetchTimeZones = async () => {
  try {
    const response = await fetch('https://worldtimeapi.org/api/timezone');
    if (!response.ok) {
      throw new Error('Failed to fetch time zones');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching time zones:', error);
    throw error;
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

