import React, { useState, useEffect } from "react";
import {
  X,
  Minus,
  Satellite,
  Zap,
  Shield,
  Globe,
  Radar,
  Lock,
  Unlock,
  Target,
  Cpu,
} from "lucide-react";
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
  const [exploitStage, setExploitStage] = useState(0);
  const [connectionStrength, setConnectionStrength] = useState(85);
  const [encryptionLevel, setEncryptionLevel] = useState(2048);
  const [quantumDecryption, setQuantumDecryption] = useState(false);
  const [payloadReady, setPayloadReady] = useState(false);

  const satellites = [
    {
      id: 1,
      name: "GPS-SAT-7",
      status: "LOCKED",
      signal: 98,
      location: "North America",
      type: "GPS",
      encryption: "AES-256",
      vulnerability: 3,
    },
    {
      id: 2,
      name: "COMM-SAT-12",
      status: "SCANNING",
      signal: 76,
      location: "Europe",
      type: "COMM",
      encryption: "RSA-2048",
      vulnerability: 7,
    },
    {
      id: 3,
      name: "SPY-SAT-3",
      status: "ENCRYPTED",
      signal: 84,
      location: "Asia",
      type: "MILITARY",
      encryption: "QUANTUM",
      vulnerability: 1,
    },
    {
      id: 4,
      name: "MIL-SAT-9",
      status: "BREACHED",
      signal: 92,
      location: "Global",
      type: "DEFENSE",
      encryption: "RSA-4096",
      vulnerability: 9,
    },
  ];

  const hackingStages = [
    "Initializing quantum protocols...",
    "Scanning vulnerability matrix...",
    "Breaking encryption layers...",
    "Bypassing military firewalls...",
    "Accessing uplink channels...",
    "Injecting exploit payload...",
    "Establishing backdoor...",
    "Extracting classified data...",
    "Covering digital tracks...",
    "Operation completed.",
  ];

  const [orbitingSatellites, setOrbitingSatellites] = useState(
    satellites.map((sat, i) => ({
      ...sat,
      angle: i * 90,
      radius: 50 + i * 12,
      speed: 0.4 + i * 0.15,
    }))
  );

  const [exploitTools] = useState([
    { name: "Buffer Overflow", active: false, success: 65 },
    { name: "SQL Injection", active: false, success: 78 },
    { name: "Quantum Decrypt", active: false, success: 34 },
    { name: "Zero-Day Exploit", active: false, success: 89 },
  ]);

  useEffect(() => {
    if (isHacking && hackingProgress < 100) {
      const timer = setTimeout(() => {
        const increment = Math.random() * 6 + 3;
        setHackingProgress((prev) => {
          const newProgress = Math.min(prev + increment, 100);
          setExploitStage(
            Math.floor((newProgress / 100) * hackingStages.length)
          );

          // Enable quantum decryption at 30%
          if (newProgress > 30 && !quantumDecryption) {
            setQuantumDecryption(true);
          }

          // Payload ready at 70%
          if (newProgress > 70 && !payloadReady) {
            setPayloadReady(true);
          }

          return newProgress;
        });
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isHacking, hackingProgress, quantumDecryption, payloadReady]);

  useEffect(() => {
    const interval = setInterval(() => {
      const hackingData = [
        `[INTERCEPT] ${(Math.random() * 180 - 90).toFixed(6)}°N ${(
          Math.random() * 360 -
          180
        ).toFixed(6)}°W`,
        `[DECRYPT] ${Math.random()
          .toString(36)
          .substring(2, 12)
          .toUpperCase()}`,
        `[BREACH] Security level ${
          Math.floor(Math.random() * 10) + 1
        } compromised`,
        `[ACCESS] File: ${Math.random()
          .toString(36)
          .substring(2, 8)}_classified.enc`,
        `[EXPLOIT] Buffer at 0x${Math.floor(Math.random() * 16777215).toString(
          16
        )}`,
        `[PAYLOAD] Backdoor established port ${
          Math.floor(Math.random() * 9999) + 1000
        }`,
        `[EXFIL] Packet ${Math.floor(Math.random() * 9999)} intercepted`,
        `[QUANTUM] Key derivation ${Math.floor(Math.random() * 100)}% complete`,
      ];

      setDataStream((prev) => [
        hackingData[Math.floor(Math.random() * hackingData.length)],
        ...prev.slice(0, 12),
      ]);

      setConnectionStrength((prev) =>
        Math.max(40, prev + (Math.random() - 0.5) * 8)
      );
      setEncryptionLevel((prev) => Math.max(512, prev - Math.random() * 50));
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrbitingSatellites((prev) =>
        prev.map((sat) => ({
          ...sat,
          angle: sat.angle + sat.speed,
        }))
      );
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const startHacking = () => {
    setIsHacking(true);
    setHackingProgress(0);
    setExploitStage(0);
    setQuantumDecryption(false);
    setPayloadReady(false);
  };

  const selectedSat = satellites.find((s) => s.id === selectedSatellite);

  return (
    <div
      ref={elementRef}
      className="terminal-window absolute z-20"
      style={{
        left: position.x,
        top: position.y,
        width: "760px",
        height: "560px",
        background:
          "linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 30, 0, 0.9) 100%)",
      }}
    >
      {/* Header */}
      <div
        className="terminal-header flex items-center justify-between cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-3">
          <Satellite className="w-4 h-4 animate-pulse" />
          <span className="font-bold terminal-glow text-sm">
            ORBITAL HACKING v3.2
          </span>
          <span className="text-xs px-2 py-1 bg-matrix-green text-black rounded animate-pulse">
            QUANTUM
          </span>
          <div className="flex items-center space-x-1">
            <Shield className="w-3 h-3 text-red-400" />
            <span className="text-xs text-red-400">STEALTH</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="w-4 h-4 bg-yellow-500 hover:bg-yellow-400 text-black text-xs flex items-center justify-center font-bold">
            <Minus size={8} />
          </button>
          <button
            onClick={onClose}
            className="w-4 h-4 bg-red-500 hover:bg-red-600 text-white text-xs flex items-center justify-center font-bold"
          >
            <X size={8} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        className="flex-1 bg-black text-matrix-green p-3"
        style={{ height: "calc(100% - 32px)" }}
      >
        <div className="grid grid-cols-5 gap-3 h-full">
          {/* Satellite List */}
          <div className="border border-matrix-green p-2 bg-black/30">
            <h3 className="text-xs font-bold terminal-glow mb-2 flex items-center">
              <Globe className="w-3 h-3 mr-1" />
              TARGETS
            </h3>
            <div className="space-y-1">
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
                  <div className="font-bold flex items-center justify-between">
                    <span>{sat.name}</span>
                    <Satellite className="w-2 h-2" />
                  </div>
                  <div className="text-[10px] text-matrix-green/70">
                    {sat.location}
                  </div>
                  <div className="text-[10px] text-blue-400">{sat.type}</div>
                  <div className="flex justify-between items-center mt-1">
                    <span
                      className={`px-1 py-0.5 rounded text-[10px] font-bold ${
                        sat.status === "BREACHED"
                          ? "bg-matrix-green text-black"
                          : sat.status === "LOCKED"
                          ? "bg-red-500 text-white"
                          : sat.status === "SCANNING"
                          ? "bg-yellow-500 text-black animate-pulse"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {sat.status}
                    </span>
                  </div>
                  <div className="text-[10px] flex justify-between mt-1">
                    <span>VULN: {sat.vulnerability}/10</span>
                    <span>{sat.signal}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Orbital Control */}
          <div className="col-span-2 border border-matrix-green p-2 bg-black/30">
            <h3 className="text-xs font-bold terminal-glow mb-2 flex items-center">
              <Radar className="w-3 h-3 mr-1 animate-spin" />
              ORBITAL MAP
            </h3>

            {/* Satellite Visualization */}
            <div className="bg-black border border-matrix-green h-40 mb-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-radial from-matrix-green/20 via-matrix-green/5 to-transparent">
                {/* Earth center */}
                <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg">
                  <div className="absolute inset-1 bg-green-400 rounded-full opacity-30"></div>
                </div>

                {/* Orbital rings */}
                {[45, 60, 75, 90].map((radius, i) => (
                  <div
                    key={i}
                    className="absolute border border-matrix-green/30 rounded-full"
                    style={{
                      width: `${radius * 2}px`,
                      height: `${radius * 2}px`,
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                ))}

                {/* Orbiting satellites */}
                {orbitingSatellites.map((sat) => {
                  const x = Math.cos((sat.angle * Math.PI) / 180) * sat.radius;
                  const y = Math.sin((sat.angle * Math.PI) / 180) * sat.radius;
                  return (
                    <div
                      key={sat.id}
                      className={`absolute w-2 h-2 rounded-full transition-all ${
                        sat.id === selectedSatellite
                          ? "bg-matrix-green shadow-lg shadow-matrix-green animate-pulse scale-150"
                          : sat.status === "BREACHED"
                          ? "bg-red-400 animate-pulse"
                          : "bg-matrix-green/70"
                      }`}
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {sat.id === selectedSatellite && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-[10px] whitespace-nowrap bg-black px-1 rounded">
                          {sat.name}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Scanning beam */}
                <div
                  className="absolute top-1/2 left-1/2 w-0.5 bg-matrix-green origin-bottom transform -translate-x-1/2 -translate-y-full opacity-60"
                  style={{
                    height: "120px",
                    animation: "spin 3s linear infinite",
                  }}
                />
              </div>
            </div>

            {/* Hacking Progress */}
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-bold">EXPLOITATION</span>
                <span className="font-mono">
                  {Math.round(hackingProgress)}%
                </span>
              </div>
              <div className="w-full bg-black border border-matrix-green h-4 relative overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-matrix-green via-yellow-400 to-red-400 transition-all duration-300"
                  style={{ width: `${hackingProgress}%` }}
                >
                  <div className="absolute inset-0 bg-matrix-green/20 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Target Analysis */}
            {selectedSat && (
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="border border-matrix-green/50 p-2 bg-black/50">
                  <div className="text-[10px] text-matrix-green/70">TARGET</div>
                  <div className="text-xs font-bold">{selectedSat.name}</div>
                  <div className="text-[10px]">
                    {selectedSat.type} - {selectedSat.location}
                  </div>
                  <div className="text-[10px] text-red-400">
                    {selectedSat.encryption}
                  </div>
                </div>
                <div className="border border-matrix-green/50 p-2 bg-black/50">
                  <div className="text-[10px] text-matrix-green/70">STATUS</div>
                  <div className="text-xs font-bold text-matrix-green">
                    {connectionStrength.toFixed(0)}%
                  </div>
                  <div className="text-[10px]">
                    Key: {encryptionLevel.toFixed(0)} bits
                  </div>
                  <div className="text-[10px] text-yellow-400">
                    Vuln: {selectedSat.vulnerability}/10
                  </div>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="space-y-2">
              <button
                onClick={startHacking}
                disabled={isHacking}
                className="w-full hacker-button text-xs py-2 flex items-center justify-center space-x-2"
              >
                <Zap className="w-3 h-3" />
                <span>
                  {isHacking
                    ? "HACKING IN PROGRESS..."
                    : "INITIATE QUANTUM HACK"}
                </span>
              </button>

              {/* Status indicators */}
              <div className="flex space-x-2 text-[10px]">
                <div
                  className={`flex items-center space-x-1 ${
                    quantumDecryption
                      ? "text-matrix-green"
                      : "text-matrix-green/50"
                  }`}
                >
                  <Cpu className="w-2 h-2" />
                  <span>QUANTUM</span>
                </div>
                <div
                  className={`flex items-center space-x-1 ${
                    payloadReady ? "text-matrix-green" : "text-matrix-green/50"
                  }`}
                >
                  <Target className="w-2 h-2" />
                  <span>PAYLOAD</span>
                </div>
                <div
                  className={`flex items-center space-x-1 ${
                    hackingProgress > 80
                      ? "text-matrix-green"
                      : "text-matrix-green/50"
                  }`}
                >
                  <Unlock className="w-2 h-2" />
                  <span>BREACH</span>
                </div>
              </div>

              {/* Current stage */}
              {isHacking && exploitStage < hackingStages.length && (
                <div className="text-[10px] text-center text-yellow-400 animate-pulse p-1 bg-black/50 rounded">
                  {hackingStages[exploitStage]}
                </div>
              )}
            </div>
          </div>

          {/* Data Stream & Tools */}
          <div className="col-span-2 space-y-3">
            {/* Live Data */}
            <div className="border border-matrix-green p-2 bg-black/30">
              <h3 className="text-xs font-bold terminal-glow mb-2">
                LIVE INTERCEPT
              </h3>
              <div className="bg-black border border-matrix-green/50 h-32 p-1 overflow-y-auto">
                <div className="space-y-0.5">
                  {dataStream.map((data, index) => (
                    <div
                      key={index}
                      className={`text-[10px] font-mono transition-all ${
                        index === 0
                          ? "text-matrix-green animate-pulse"
                          : index < 3
                          ? "text-matrix-green/80"
                          : "text-matrix-green/40"
                      }`}
                    >
                      <span className="text-matrix-green/60">
                        [{new Date().toLocaleTimeString().split(" ")[0]}]
                      </span>{" "}
                      {data}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Exploit Tools */}
            <div className="border border-matrix-green p-2 bg-black/30">
              <h3 className="text-xs font-bold terminal-glow mb-2">
                EXPLOIT ARSENAL
              </h3>
              <div className="space-y-1">
                {exploitTools.map((tool, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-[10px] p-1 border border-matrix-green/30 rounded"
                  >
                    <span className="text-matrix-green">{tool.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400">{tool.success}%</span>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isHacking && hackingProgress > index * 25
                            ? "bg-matrix-green animate-pulse"
                            : "bg-matrix-green/30"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Stats */}
            <div className="border border-matrix-green p-2 bg-black/30">
              <h3 className="text-xs font-bold terminal-glow mb-2">
                SYSTEM STATUS
              </h3>
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between">
                  <span className="text-matrix-green/70">Signal Strength</span>
                  <span className="text-matrix-green font-bold">
                    {connectionStrength.toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-matrix-green/70">
                    Packets Intercepted
                  </span>
                  <span className="text-matrix-green font-bold">
                    {dataStream.length * 23}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-matrix-green/70">
                    Encryption Status
                  </span>
                  <span
                    className={`font-bold ${
                      encryptionLevel > 1500
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {encryptionLevel > 1500 ? "SECURED" : "WEAKENED"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-matrix-green/70">Active Exploits</span>
                  <span className="text-matrix-green font-bold">
                    {
                      exploitTools.filter(
                        (_, i) => isHacking && hackingProgress > i * 25
                      ).length
                    }
                    /4
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatelliteHacking;
