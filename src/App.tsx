import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Preloader from "./components/effects/InitialPreloader";
import WlcmPreloader from "./components/effects/WelcomePreloader";
import "./App.css";

const queryClient = new QueryClient();

const App = () => {
  const [loadingStage, setLoadingStage] = useState("initial");

  useEffect(() => {
    if (window.location.pathname === "/") {
      document.body.style.overflow = "hidden";

      const initialTimer = setTimeout(() => {
        setLoadingStage("welcome");
        const welcomeTimer = setTimeout(() => {
          setLoadingStage("done");
          document.body.style.overflow = "";
        }, 12000); // 12 seconds
        return () => clearTimeout(welcomeTimer);
      }, 8600); // 8.6 seconds

      return () => {
        clearTimeout(initialTimer);
        document.body.style.overflow = "";
      };
    } else {
      setLoadingStage("done");
    }
  }, []);

  if (loadingStage === "initial") {
    return <Preloader />;
  }

  if (loadingStage === "welcome") {
    return <WlcmPreloader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/error404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/error404" />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
