
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
