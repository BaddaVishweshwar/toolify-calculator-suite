
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import QrGenerator from "./pages/tools/QrGenerator";
import WorldClock from "./pages/tools/WorldClock";
import PercentageCalculator from "./pages/tools/PercentageCalculator";
import WordCounter from "./pages/tools/WordCounter";
import InterestCalculator from "./pages/tools/InterestCalculator";
import EmiCalculator from "./pages/tools/EmiCalculator";
import GstCalculator from "./pages/tools/GstCalculator";
import AgeCalculator from "./pages/tools/AgeCalculator";
import DateDifference from "./pages/tools/DateDifference";
import ProfitLossCalculator from "./pages/tools/ProfitLossCalculator";
import AreaCalculator from "./pages/tools/AreaCalculator";
import UnitConverter from "./pages/tools/UnitConverter";
import CurrencyConverter from "./pages/tools/CurrencyConverter";
import PdfToWord from "./pages/tools/PdfToWord";
import ImageCompressor from "./pages/tools/ImageCompressor";
import NotFound from "./pages/NotFound";

// Import framer-motion for animations
import { motion, AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Helmet
        titleTemplate="%s | Toolify"
        defaultTitle="Toolify - Smart Tools for Everyday Calculations"
      >
        <meta
          name="description"
          content="Toolify offers a collection of powerful, easy-to-use calculators and utilities to simplify your daily tasks."
        />
      </Helmet>
      <Toaster />
      <Sonner position="top-center" theme="light" closeButton />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tools/qr-generator" element={<QrGenerator />} />
            <Route path="/tools/world-clock" element={<WorldClock />} />
            <Route path="/tools/percentage-calculator" element={<PercentageCalculator />} />
            <Route path="/tools/word-counter" element={<WordCounter />} />
            <Route path="/tools/interest-calculator" element={<InterestCalculator />} />
            <Route path="/tools/emi-calculator" element={<EmiCalculator />} />
            <Route path="/tools/gst-calculator" element={<GstCalculator />} />
            <Route path="/tools/age-calculator" element={<AgeCalculator />} />
            <Route path="/tools/date-difference" element={<DateDifference />} />
            <Route path="/tools/profit-loss-calculator" element={<ProfitLossCalculator />} />
            <Route path="/tools/area-calculator" element={<AreaCalculator />} />
            <Route path="/tools/unit-converter" element={<UnitConverter />} />
            <Route path="/tools/currency-converter" element={<CurrencyConverter />} />
            <Route path="/tools/pdf-to-word" element={<PdfToWord />} />
            <Route path="/tools/image-compressor" element={<ImageCompressor />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
