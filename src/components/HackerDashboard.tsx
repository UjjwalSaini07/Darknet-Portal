import React, { useState, useEffect } from "react";
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import BitcoinMiner from "./modules/BitcoinMiner";
import PasswordCracker from "./modules/PasswordCracker";
import NeuralNetwork from "./modules/NeuralNetwork";
import SurveillanceMap from "./modules/SurveillanceMap";
import CompilerSection from "./modules/CompilerSection";
import HackerTerminal from "./modules/HackerTerminal";
import CameraSurveillance from "./modules/CameraSurveillance";
import SatelliteHacking from "./modules/SatelliteHacking";
import TaskBar from "./modules/TaskBar";
import MatrixRain from "./effects/MatrixRain";
import BackgroundTerminal from "./BackgroundTerminal";

const HackerDashboard = () => {
  const [activeModules, setActiveModules] = useState({
    bitcoinMiner: false,
    passwordCracker: true,
    neuralNetwork: false,
    surveillance: true,
    compiler: true,
    terminal: false,
    cameraSurveillance: true,
    satelliteHacking: false,
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const { initiateDetection, isDetecting } = useDeviceDetection();
  const [enableDeviceDetection, setEnableDeviceDetection] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Stop device detection after 16 seconds
    const disableDetectionTimer = setTimeout(() => {
      setEnableDeviceDetection(false);
    }, 16000);

    return () => clearTimeout(disableDetectionTimer);
  }, []);

  useEffect(() => {
    if (enableDeviceDetection) {
      // Small delay to let the UI render first
      const detectionTimer = setTimeout(() => {
        initiateDetection();
      }, 500);

      return () => clearTimeout(detectionTimer);
    }
  }, [enableDeviceDetection, initiateDetection]);

  const toggleModule = (module: keyof typeof activeModules) => {
    setActiveModules((prev) => ({
      ...prev,
      [module]: !prev[module],
    }));
  };

  const closeModule = (module: keyof typeof activeModules) => {
    setActiveModules((prev) => ({
      ...prev,
      [module]: false,
    }));
  };

  return (
    <div className="h-screen w-screen bg-black relative overflow-hidden font-terminal">
      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* Background Terminal */}
      <BackgroundTerminal />

      {/* Background Surveillance Map */}
      <div className="absolute inset-0 opacity-20">
        <SurveillanceMap />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Enhanced System Header Bar */}
        <div className="h-10 bg-black border-b-2 border-matrix-green flex items-center justify-between px-4 terminal-glow">
          <div className="flex items-center space-x-6">
            <span className="text-lg font-bold terminal-glow">
              DARKNET_TERMINAL v1.3.0 [CLASSIFIED]
            </span>
            <span className="text-sm text-matrix-green">
              [{currentTime.toLocaleTimeString()}] [UTC+5:30] [SECURE_MODE]
            </span>
            {isDetecting && enableDeviceDetection && (
              <span className="text-xs text-red-400 animate-pulse">
                [INFILTRATING_TARGET...]
              </span>
            )}
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <span className="text-matrix-green terminal-glow">
              CONNECTION::ENCRYPTED
            </span>
            <div
              className="w-3 h-3 bg-matrix-green rounded-full animate-pulse"
              style={{
                boxShadow: "0 0 15px #00FF00",
              }}
            ></div>
          </div>
        </div>

        {/* Desktop Area with Floating Windows */}
        <div className="flex-1 p-6 relative">
          {/* Bitcoin Miner Window */}
          {activeModules.bitcoinMiner && (
            <BitcoinMiner
              onClose={() => closeModule("bitcoinMiner")}
              initialPosition={{ x: 520, y: 0 }}
            />
          )}

          {/* Password Cracker Window */}
          {activeModules.passwordCracker && (
            <PasswordCracker
              onClose={() => closeModule("passwordCracker")}
              initialPosition={{ x: 1100, y: 50 }}
            />
          )}

          {/* Neural Network Window */}
          {activeModules.neuralNetwork && (
            <NeuralNetwork
              onClose={() => closeModule("neuralNetwork")}
              initialPosition={{ x: 250, y: 80 }}
            />
          )}

          {/* Compiler Window */}
          {activeModules.compiler && (
            <CompilerSection
              onClose={() => closeModule("compiler")}
              initialPosition={{ x: 850, y: 200 }}
            />
          )}

          {/* Hacker Terminal Window */}
          {activeModules.terminal && (
            <HackerTerminal
              onClose={() => closeModule("terminal")}
              initialPosition={{ x: 350, y: 40 }}
            />
          )}

          {/* Camera Surveillance Window */}
          {activeModules.cameraSurveillance && (
            <CameraSurveillance
              onClose={() => closeModule("cameraSurveillance")}
              initialPosition={{ x: 20, y: 25 }}
            />
          )}

          {/* Satellite Hacking Window */}
          {activeModules.satelliteHacking && (
            <SatelliteHacking
              onClose={() => closeModule("satelliteHacking")}
              initialPosition={{ x: 200, y: 80 }}
            />
          )}
        </div>

        {/* Enhanced TaskBar */}
        <TaskBar activeModules={activeModules} onToggleModule={toggleModule} />
      </div>
    </div>
  );
};

export default HackerDashboard;
