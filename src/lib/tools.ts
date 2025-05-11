
import {
  QrCode,
  Calculator,
  Percent,
  DollarSign,
  Home,
  Clock,
  Calendar,
  BarChart3,
  Square,
  Ruler,
  RefreshCcw,
  Globe,
  FileText,
  Image,
  Compress,
} from 'lucide-react';

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: any;
  path: string;
  category: 'calculator' | 'converter' | 'generator' | 'time' | 'file';
  color?: string;
}

export const tools: Tool[] = [
  {
    id: 'pdf-to-word',
    title: 'PDF to Word Converter',
    description: 'Convert PDF files to editable Word documents online.',
    icon: FileText,
    path: '/tools/pdf-to-word',
    category: 'file',
  },
  {
    id: 'image-compressor',
    title: 'Image Compressor',
    description: 'Compress and optimize your images without losing quality.',
    icon: Compress,
    path: '/tools/image-compressor',
    category: 'file',
  },
  {
    id: 'qr-generator',
    title: 'QR Code Generator',
    description: 'Generate QR codes for text, URLs, or contact information.',
    icon: QrCode,
    path: '/tools/qr-generator',
    category: 'generator',
  },
  {
    id: 'word-counter',
    title: 'Word Counter',
    description: 'Count words, characters, sentences and paragraphs in your text.',
    icon: Calculator,
    path: '/tools/word-counter',
    category: 'calculator',
  },
  {
    id: 'percentage-calculator',
    title: 'Percentage Calculator',
    description: 'Calculate percentages, increases, decreases, and differences.',
    icon: Percent,
    path: '/tools/percentage-calculator',
    category: 'calculator',
  },
  {
    id: 'interest-calculator',
    title: 'Interest Calculator',
    description: 'Calculate simple and compound interest with detailed breakdowns.',
    icon: DollarSign,
    path: '/tools/interest-calculator',
    category: 'calculator',
  },
  {
    id: 'emi-calculator',
    title: 'EMI Calculator',
    description: 'Calculate your Equated Monthly Installment for loans.',
    icon: Home,
    path: '/tools/emi-calculator',
    category: 'calculator',
  },
  {
    id: 'gst-calculator',
    title: 'GST Calculator',
    description: 'Calculate GST amounts, inclusive and exclusive prices.',
    icon: Calculator,
    path: '/tools/gst-calculator',
    category: 'calculator',
  },
  {
    id: 'age-calculator',
    title: 'Age Calculator',
    description: 'Calculate exact age from birthdate to current or selected date.',
    icon: Clock,
    path: '/tools/age-calculator',
    category: 'calculator',
  },
  {
    id: 'date-difference',
    title: 'Date Difference',
    description: 'Calculate the exact difference between two dates.',
    icon: Calendar,
    path: '/tools/date-difference',
    category: 'calculator',
  },
  {
    id: 'profit-loss-calculator',
    title: 'Profit/Loss Calculator',
    description: 'Calculate profit or loss on transactions and investments.',
    icon: BarChart3,
    path: '/tools/profit-loss-calculator',
    category: 'calculator',
  },
  {
    id: 'area-calculator',
    title: 'Area Calculator',
    description: 'Calculate area of different geometric shapes.',
    icon: Square,
    path: '/tools/area-calculator',
    category: 'calculator',
  },
  {
    id: 'unit-converter',
    title: 'Unit Converter',
    description: 'Convert between different units of measurement.',
    icon: Ruler,
    path: '/tools/unit-converter',
    category: 'converter',
  },
  {
    id: 'currency-converter',
    title: 'Currency Converter',
    description: 'Convert between different currencies with live exchange rates.',
    icon: RefreshCcw,
    path: '/tools/currency-converter',
    category: 'converter',
  },
  {
    id: 'world-clock',
    title: 'World Clock',
    description: 'Check the current time in different time zones around the world.',
    icon: Globe,
    path: '/tools/world-clock',
    category: 'time',
  },
];

export const getToolById = (id: string): Tool | undefined => {
  return tools.find(tool => tool.id === id);
};
