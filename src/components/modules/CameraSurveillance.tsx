import React, { useState, useEffect } from "react";
import { X, Minus, Camera, Play, Pause, RotateCcw } from "lucide-react";
import { useDraggable } from "../../hooks/useDraggable";

interface CameraSurveillanceProps {
  onClose: () => void;
  initialPosition: { x: number; y: number };
}

const CameraSurveillance = ({
  onClose,
  initialPosition,
}: CameraSurveillanceProps) => {
  const { position, elementRef, handleMouseDown } =
    useDraggable(initialPosition);
  const [activeCamera, setActiveCamera] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [alertLevel, setAlertLevel] = useState("LOW");

  const cameras = [
    {
      id: 1,
      name: "CAM-01 (ENTRANCE)",
      status: "ONLINE",
      location: "Main Gate",
    },
    {
      id: 2,
      name: "CAM-02 (LOBBY)",
      status: "ONLINE",
      location: "Building Lobby",
    },
    {
      id: 3,
      name: "CAM-03 (PARKING)",
      status: "OFFLINE",
      location: "Parking Lot",
    },
    { id: 4, name: "CAM-04 (ROOF)", status: "ONLINE", location: "Rooftop" },
  ];

  const alerts = [
    "[15:32:45] Motion detected - CAM-01",
    "[15:30:12] Unknown vehicle - CAM-03",
    "[15:28:33] Facial recognition match - CAM-02",
    "[15:25:01] Security breach alert - CAM-04",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const levels = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
      setAlertLevel(levels[Math.floor(Math.random() * levels.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={elementRef}
      className="terminal-window absolute z-20"
      style={{
        left: position.x,
        top: position.y,
        width: "700px",
        height: "500px",
        background:
          "linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 20, 0, 0.9) 100%)",
      }}
    >
      {/* Header */}
      <div
        className="terminal-header flex items-center justify-between cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-3">
          <Camera className="w-5 h-5" />
          <span className="font-bold terminal-glow">SURVEILLANCE SYSTEM</span>
          <span
            className={`text-xs px-2 py-1 rounded animate-pulse ${
              alertLevel === "CRITICAL"
                ? "bg-red-500 text-white"
                : alertLevel === "HIGH"
                ? "bg-yellow-500 text-black"
                : alertLevel === "MEDIUM"
                ? "bg-blue-500 text-white"
                : "bg-matrix-green text-black"
            }`}
          >
            {alertLevel}
          </span>
        </div>
        <div className="flex space-x-2">
          <button className="w-5 h-5 bg-yellow-500 hover:bg-yellow-400 text-black text-xs flex items-center justify-center font-bold">
            <Minus size={10} />
          </button>
          <button
            onClick={onClose}
            className="w-5 h-5 bg-red-500 hover:bg-red-600 text-white text-xs flex items-center justify-center font-bold"
          >
            <X size={10} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        className="flex-1 bg-black text-matrix-green p-4"
        style={{ height: "calc(100% - 40px)" }}
      >
        <div className="grid grid-cols-2 gap-4 h-full">
          {/* Main Camera View */}
          <div className="border-2 border-matrix-green bg-black p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold terminal-glow">
                {cameras.find((c) => c.id === activeCamera)?.name}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-1 rounded ${
                    isRecording ? "bg-red-500" : "bg-matrix-green"
                  } text-black`}
                >
                  {isRecording ? <Pause size={12} /> : <Play size={12} />}
                </button>
                <button className="p-1 bg-matrix-green text-black rounded">
                  <RotateCcw size={12} />
                </button>
              </div>
            </div>

            {/* Simulated Camera Feed */}
            <div className="bg-black border border-matrix-green h-48 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-matrix-green/10 to-transparent">
                <div className="grid grid-cols-8 grid-rows-6 h-full opacity-20">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div
                      key={i}
                      className="border border-matrix-green/20"
                    ></div>
                  ))}
                </div>
              </div>

              {/* Crosshair */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-matrix-green">
                  <div className="w-full h-0.5 bg-matrix-green absolute top-1/2 transform -translate-y-1/2"></div>
                  <div className="h-full w-0.5 bg-matrix-green absolute left-1/2 transform -translate-x-1/2"></div>
                </div>
              </div>

              {/* Recording Indicator */}
              {isRecording && (
                <div className="absolute top-2 right-2 flex items-center space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-red-500">REC</span>
                </div>
              )}

              {/* Timestamp */}
              <div className="absolute bottom-2 left-2 text-xs text-matrix-green font-mono">
                {new Date().toLocaleString()}
              </div>
            </div>
          </div>

          {/* Camera List & Alerts */}
          <div className="space-y-4">
            {/* Camera Grid */}
            <div className="border-2 border-matrix-green p-3">
              <h3 className="text-sm font-bold terminal-glow mb-2">
                CAMERA GRID
              </h3>
              <div className="space-y-1">
                {cameras.map((camera) => (
                  <div
                    key={camera.id}
                    onClick={() => setActiveCamera(camera.id)}
                    className={`text-xs p-2 border cursor-pointer transition-all ${
                      activeCamera === camera.id
                        ? "border-matrix-green bg-matrix-green/20"
                        : "border-matrix-green/50 hover:border-matrix-green"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{camera.name}</span>
                      <span
                        className={`px-1 rounded text-[10px] ${
                          camera.status === "ONLINE"
                            ? "bg-matrix-green text-black"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {camera.status}
                      </span>
                    </div>
                    <div className="text-[10px] text-matrix-green/70">
                      {camera.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alert Log */}
            <div className="border-2 border-matrix-green p-3 flex-1">
              <h3 className="text-sm font-bold terminal-glow mb-2">
                ALERT LOG
              </h3>
              <div className="space-y-1 overflow-y-auto max-h-32">
                {alerts.map((alert, index) => (
                  <div
                    key={index}
                    className="text-xs text-yellow-400 font-mono"
                  >
                    {alert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraSurveillance;
