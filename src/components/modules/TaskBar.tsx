import React from "react";
import {
  Terminal,
  Cpu,
  Shield,
  Eye,
  Code,
  Bitcoin,
  Camera,
  Satellite,
} from "lucide-react";

interface TaskBarProps {
  activeModules: {
    bitcoinMiner: boolean;
    passwordCracker: boolean;
    neuralNetwork: boolean;
    surveillance: boolean;
    compiler: boolean;
    terminal: boolean;
    cameraSurveillance: boolean;
    satelliteHacking: boolean;
  };
  onToggleModule: (module: keyof TaskBarProps["activeModules"]) => void;
}

const TaskBar = ({ activeModules, onToggleModule }: TaskBarProps) => {
  const currentTime = new Date().toLocaleTimeString();

  const modules = [
    {
      key: "bitcoinMiner",
      icon: Bitcoin,
      name: "Crypto Miner",
      title: "Bitcoin Miner",
    },
    {
      key: "passwordCracker",
      icon: Shield,
      name: "Password Cracker",
      title: "Password Cracker",
    },
    {
      key: "neuralNetwork",
      icon: Cpu,
      name: "Neural Network",
      title: "Neural Network",
    },
    {
      key: "surveillance",
      icon: Eye,
      name: "Surveillance",
      title: "Surveillance Map",
    },
    { key: "compiler", icon: Code, name: "Compiler", title: "Code Compiler" },
    {
      key: "terminal",
      icon: Terminal,
      name: "Terminal",
      title: "Hacker Terminal",
    },
    {
      key: "cameraSurveillance",
      icon: Camera,
      name: "Camera",
      title: "Camera Surveillance",
    },
    {
      key: "satelliteHacking",
      icon: Satellite,
      name: "Satellite",
      title: "Satellite Hacking",
    },
  ];

  return (
    <div className="status-bar h-12 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        {/* Module Icons with Names */}
        {modules.map((module) => (
          <button
            key={module.key}
            onClick={() =>
              onToggleModule(module.key as keyof TaskBarProps["activeModules"])
            }
            className={`flex items-center space-x-2 px-3 py-1 rounded transition-all ${
              activeModules[module.key as keyof TaskBarProps["activeModules"]]
                ? "bg-matrix-green text-black"
                : "text-matrix-green hover:bg-matrix-green hover:bg-opacity-20"
            }`}
            title={module.title}
          >
            <module.icon size={16} />
            <span className="text-xs font-bold">{module.name}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-matrix-green rounded-full animate-pulse"></div>
          <span>SYSTEM ACTIVE</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>CPU: 73%</span>
          <span>RAM: 68%</span>
          <span>NET: 847 KB/s</span>
        </div>
        <div className="text-matrix-green font-bold">{currentTime}</div>
      </div>
    </div>
  );
};

export default TaskBar;
