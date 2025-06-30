import React, { useEffect } from "react";
import Preloader from "./LoadingScreen";
import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const PreloaderWrapper: React.FC = () => {
  useEffect(() => {
    toast.warn("⚠️ Use Darknet Portal at Your Own Risk, May it Harm Your System", {
      position: "top-center",
      theme: "dark",
      autoClose: false,
      closeOnClick: true,
      draggable: true,
      icon: false,
      style: {
        fontFamily: "monospace",
        background: "#1a1a1a",
        color: "#facc15",
        border: "1px solid #f87171",
        textAlign: "center",
        fontWeight: "bold",
      },
      transition: Slide,
    });

    setTimeout(() => {
      toast.warn("🛡️ This will disable all Antivirus & Security Protocols. Press F11 for Fullscreen Experience", {
        position: "top-center",
        theme: "dark",
        autoClose: false,
        closeOnClick: true,
        draggable: true,
        icon: false,
        style: {
          fontFamily: "monospace",
          background: "#1a1a1a",
          color: "#facc15",
          border: "1px solid #f87171",
          textAlign: "center",
          fontWeight: "bold",
        },
        transition: Slide,
      });
    }, 1000);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white font-mono overflow-hidden">
      <Preloader />
      <ToastContainer limit={2} newestOnTop />

      <main className="flex items-center justify-center min-h-screen text-green-400 text-2xl">
        <p>Darknet Portal Main Interface Loading...</p>
      </main>
    </div>
  );
};

export default PreloaderWrapper;
