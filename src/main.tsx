import React, { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import MobileApp from "./MobileApp.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import "./index.css";

const RootComponent = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <StrictMode>
      {isMobile ? <MobileApp /> : <App />}
      <ToastContainer />
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<RootComponent />);
