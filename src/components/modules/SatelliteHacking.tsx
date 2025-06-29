import React, { useState, useEffect } from "react";
import { X, Minus, Satellite } from "lucide-react";
import { useDraggable } from "../../hooks/useDraggable";

interface SatelliteHackingProps {
  onClose: () => void;
  initialPosition: { x: number; y: number };
}

const SatelliteHacking = ({
  onClose,
  initialPosition,
}: SatelliteHackingProps) => {
  const { position, elementRef, handleMouseDown } =
    useDraggable(initialPosition);
  const [selectedSatellite, setSelectedSatellite] = useState(1);
  const [hackingProgress, setHackingProgress] = useState(0);
  const [isHacking, setIsHacking] = useState(false);
  const [dataStream, setDataStream] = useState<string[]>([]);

  const satellites = [
    {
      id: 1,
      name: "GPS-SAT-7",
      status: "LOCKED",
      signal: 98,
      location: "North America",
    },
    {
      id: 2,
      name: "COMM-SAT-12",
      status: "SCANNING",
      signal: 76,
      location: "Europe",
    },
    {
      id: 3,
      name: "SPY-SAT-3",
      status: "ENCRYPTED",
      signal: 84,
      location: "Asia",
    },
    {
      id: 4,
      name: "MIL-SAT-9",
      status: "BREACHED",
      signal: 92,
      location: "Global",
    },
  ];

  const hackingLogs = [
    "Initializing quantum decryption...",
    "Breaking RSA-2048 encryption...",
    "Accessing satellite uplink...",
    "Bypassing military protocols...",
    "Extracting classified data...",
    "Installing backdoor access...",
    "Covering digital tracks...",
    "Operation completed successfully.",
  ];

  useEffect(() => {
    if (isHacking && hackingProgress < 100) {
      const timer = setTimeout(() => {
        setHackingProgress((prev) => Math.min(prev + Math.random() * 15, 100));
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isHacking, hackingProgress]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [
        `[INTERCEPT] Latitude: ${(Math.random() * 180 - 90).toFixed(6)}°`,
        `[INTERCEPT] Longitude: ${(Math.random() * 360 - 180).toFixed(6)}°`,
        `[DECRYPT] Message: ${Math.random()
          .toString(36)
          .substring(7)
          .toUpperCase()}`,
        `[ACCESS] File: classified_${Math.floor(Math.random() * 9999)}.dat`,
        `[BREACH] Security Level: ${Math.floor(Math.random() * 10) + 1}`,
      ];
      setDataStream((prev) => [
        ...prev.slice(-10),
        newData[Math.floor(Math.random() * newData.length)],
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const startHacking = () => {
    setIsHacking(true);
    setHackingProgress(0);
  };

  return (
    <div
      ref={elementRef}
      className="terminal-window absolute z-20"
      style={{
        left: position.x,
        top: position.y,
        width: "750px",
        height: "550px",
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
          <Satellite className="w-5 h-5" />
          <span className="font-bold terminal-glow">SATELLITE HACKING</span>
          <span className="text-xs px-2 py-1 bg-matrix-green text-black rounded animate-pulse">
            ONLINE
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
        <div className="grid grid-cols-3 gap-4 h-full">
          {/* Satellite List */}
          <div className="border-2 border-matrix-green p-3">
            <h3 className="text-sm font-bold terminal-glow mb-3">
              TARGET SATELLITES
            </h3>
            <div className="space-y-2">
              {satellites.map((sat) => (
                <div
                  key={sat.id}
                  onClick={() => setSelectedSatellite(sat.id)}
                  className={`text-xs p-2 border cursor-pointer transition-all ${
                    selectedSatellite === sat.id
                      ? "border-matrix-green bg-matrix-green/20"
                      : "border-matrix-green/50 hover:border-matrix-green"
                  }`}
                >
                  <div className="font-bold">{sat.name}</div>
                  <div className="text-[10px] text-matrix-green/70">
                    {sat.location}
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span
                      className={`px-1 rounded text-[10px] ${
                        sat.status === "BREACHED"
                          ? "bg-matrix-green text-black"
                          : sat.status === "LOCKED"
                          ? "bg-red-500 text-white"
                          : sat.status === "SCANNING"
                          ? "bg-yellow-500 text-black"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {sat.status}
                    </span>
                    <span className="text-[10px]">{sat.signal}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Control Panel */}
          <div className="border-2 border-matrix-green p-3">
            <h3 className="text-sm font-bold terminal-glow mb-3">
              CONTROL PANEL
            </h3>

            {/* Satellite Visualization */}
            <div className="bg-black border border-matrix-green h-32 mb-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-radial from-matrix-green/20 to-transparent">
                {/* Radar sweep effect */}
                <div className="absolute top-1/2 left-1/2 w-24 h-24 border border-matrix-green rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
                <div className="absolute top-1/2 left-1/2 w-16 h-16 border border-matrix-green rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/2 w-8 h-8 border border-matrix-green rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

                {/* Satellite dots */}
                {satellites.map((sat, index) => (
                  <div
                    key={sat.id}
                    className={`absolute w-2 h-2 rounded-full ${
                      sat.id === selectedSatellite
                        ? "bg-matrix-green animate-pulse"
                        : "bg-matrix-green/50"
                    }`}
                    style={{
                      top: `${20 + index * 15}%`,
                      left: `${30 + index * 20}%`,
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Hacking Progress */}
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Hacking Progress</span>
                <span>{Math.round(hackingProgress)}%</span>
              </div>
              <div className="w-full bg-black border border-matrix-green h-4">
                <div
                  className="h-full bg-matrix-green transition-all duration-300"
                  style={{ width: `${hackingProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-2">
              <button
                onClick={startHacking}
                disabled={isHacking}
                className="w-full hacker-button text-xs py-2"
              >
                {isHacking ? "HACKING IN PROGRESS..." : "INITIATE HACK"}
              </button>

              {/* Hack Status */}
              {isHacking && hackingProgress < 100 && (
                <div className="text-xs text-center text-yellow-400">
                  {
                    hackingLogs[
                      Math.floor((hackingProgress / 100) * hackingLogs.length)
                    ]
                  }
                </div>
              )}
            </div>
          </div>

          {/* Data Stream */}
          <div className="border-2 border-matrix-green p-3">
            <h3 className="text-sm font-bold terminal-glow mb-3">
              DATA STREAM
            </h3>
            <div className="bg-black border border-matrix-green/50 h-64 p-2 overflow-y-auto">
              <div className="space-y-1">
                {dataStream.map((data, index) => (
                  <div
                    key={index}
                    className="text-xs font-mono text-matrix-green"
                  >
                    {data}
                  </div>
                ))}
              </div>
            </div>

            {/* Signal Strength */}
            <div className="mt-3">
              <div className="text-xs mb-1">Signal Strength</div>
              <div className="flex space-x-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-6 ${
                      i <
                      (satellites.find((s) => s.id === selectedSatellite)
                        ?.signal || 0) /
                        10
                        ? "bg-matrix-green"
                        : "bg-matrix-green/20"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatelliteHacking;
