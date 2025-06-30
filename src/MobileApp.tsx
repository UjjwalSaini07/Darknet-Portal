import React, { useState, useEffect } from "react";
import Preloader from "./components/effects/Preloader";
import { motion } from "framer-motion";

const MobileApp: React.FC = () => {
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
        <div className="min-h-screen w-full bg-black text-matrix-green flex flex-col justify-center items-center px-4 relative overflow-hidden text-center font-mono">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-green-900 via-black to-green-800 opacity-30 blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 2 }}
          ></motion.div>
          <motion.div
            className="absolute top-1/3 left-1/4 w-96 h-96 bg-green-500 opacity-20 rounded-full filter blur-3xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          ></motion.div>
          <motion.div
            className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-lime-500 opacity-20 rounded-full filter blur-3xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          ></motion.div>

          {/* Floating Neon Particles */}
          <motion.div
            className="absolute top-5 left-5 w-8 h-8 bg-emerald-400 rounded-full shadow-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          ></motion.div>
          <motion.div
            className="absolute bottom-5 right-5 w-10 h-10 bg-lime-400 rounded-full shadow-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl px-6 sm:px-10 md:px-16 relative z-10"
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-matrix-green mb-4 drop-shadow-[0_0_10px_#00ff9f]"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              💻 DARKNET PORTAL 💻
            </motion.h1>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-lime-400 to-emerald-500 drop-shadow-xl mb-6"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Welcome, Operative.
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-green-200 drop-shadow-md max-w-3xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Access encrypted tools, trace network vulnerabilities, and
              navigate the shadows with elite precision. The darknet awaits.
            </motion.p>
            <motion.p
              className="text-base text-green-300 drop-shadow-md italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              (⚠️ Best viewed on a wide-screen terminal or desktop interface.)
            </motion.p>
            <motion.a
              href="https://darknet-portal.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-50 pointer-events-auto mt-8 inline-block px-10 sm:px-14 py-3 sm:py-4 cursor-pointer bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-lime-600 hover:to-emerald-500 rounded-full text-lg sm:text-xl font-bold text-black shadow-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-green-500/50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 1.5 }}
            >
              Enter the Network
            </motion.a>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default MobileApp;
