import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Preloader from "./components/effects/Preloader";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/") {
      setLoading(true);
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        setLoading(false);
        document.body.style.overflow = "";
      }, 8600);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading && window.location.pathname === "/" ? (
        <Preloader />
      ) : (
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      )}
    </>
  );
};

export default App;
