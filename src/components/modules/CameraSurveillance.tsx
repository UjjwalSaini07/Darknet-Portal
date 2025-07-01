import React, { useState, useEffect } from "react";
import {
  X,
  Minus,
  Camera,
  Play,
  Pause,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Circle,
  Wifi,
  Shield,
  AlertTriangle,
  Target,
  Lock,
  Eye,
  Radio,
  Zap,
  Activity,
  Network,
  Users,
  Database,
  FileSearch,
  Skull,
  Bug,
} from "lucide-react";
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
  const [zoom, setZoom] = useState(1);
  const [motionDetected, setMotionDetected] = useState(false);
  const [faceRecognition, setFaceRecognition] = useState(0);
  const [nightVision, setNightVision] = useState(false);
  const [autoTracking, setAutoTracking] = useState(false);
  const [threatLevel, setThreatLevel] = useState(0);
  const [isHacking, setIsHacking] = useState(false);
  const [hackingProgress, setHackingProgress] = useState(0);
  const [signalJamming, setSignalJamming] = useState(false);
  const [dataInterception, setDataInterception] = useState(0);
  const [networkScan, setNetworkScan] = useState(false);
  const [privilegeEscalation, setPrivilegeEscalation] = useState(0);
  const [dataExtraction, setDataExtraction] = useState(false);
  const [bruteForceActive, setBruteForceActive] = useState(false);

  const cameras = [
    {
      id: 1,
      name: "CAM-01",
      location: "Main Gate",
      status: "ONLINE",
      signal: 98,
      threats: 0,
      encrypted: true,
      hackable: true,
      ip: "192.168.1.101",
    },
    {
      id: 2,
      name: "CAM-02",
      location: "Lobby",
      status: "ONLINE",
      signal: 89,
      threats: 2,
      encrypted: true,
      hackable: true,
      ip: "192.168.1.102",
    },
    {
      id: 3,
      name: "CAM-03",
      location: "Parking",
      status: "OFFLINE",
      signal: 0,
      threats: 0,
      encrypted: false,
      hackable: false,
      ip: "192.168.1.103",
    },
    {
      id: 4,
      name: "CAM-04",
      location: "Rooftop",
      status: "ONLINE",
      signal: 95,
      threats: 1,
      encrypted: true,
      hackable: true,
      ip: "192.168.1.104",
    },
  ];

  const [alerts, setAlerts] = useState([
    "[15:32:45] Motion detected - CAM-01",
    "[15:30:12] Unknown vehicle - CAM-03",
    "[15:28:33] Facial recognition match - CAM-02",
    "[15:25:01] Security breach alert - CAM-04",
  ]);

  const [videoPixels, setVideoPixels] = useState<
    Array<{ x: number; y: number; intensity: number }>
  >([]);
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const levels = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
      setAlertLevel(levels[Math.floor(Math.random() * levels.length)]);
      setMotionDetected(Math.random() > 0.7);
      setFaceRecognition(Math.floor(Math.random() * 100));
      setThreatLevel(Math.floor(Math.random() * 10));
      setDataInterception(Math.floor(Math.random() * 100));
      setPrivilegeEscalation(Math.floor(Math.random() * 100));

      if (Math.random() > 0.85) {
        const newAlert = `[${new Date().toLocaleTimeString()}] ${
          [
            "Motion detected",
            "Face recognized",
            "Perimeter breach",
            "Suspicious activity",
            "Signal intercepted",
            "Encryption bypassed",
          ][Math.floor(Math.random() * 6)]
        } - CAM-0${Math.floor(Math.random() * 4) + 1}`;
        setAlerts((prev) => [newAlert, ...prev.slice(0, 9)]);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newPixels = Array.from({ length: 15 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        intensity: Math.random(),
      }));
      setVideoPixels(newPixels);
      setScanLine((prev) => (prev + 2) % 100);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isHacking) {
      const interval = setInterval(() => {
        setHackingProgress((prev) => {
          if (prev >= 100) {
            setIsHacking(false);
            return 0;
          }
          return prev + Math.random() * 5;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isHacking]);

  const startHacking = () => {
    const camera = cameras.find((c) => c.id === activeCamera);
    if (camera?.hackable && camera.status === "ONLINE") {
      setIsHacking(true);
      setHackingProgress(0);
    }
  };

  const startNetworkScan = () => {
    setNetworkScan(true);
    setTimeout(() => setNetworkScan(false), 5000);
  };

  const startDataExtraction = () => {
    setDataExtraction(true);
    setTimeout(() => setDataExtraction(false), 8000);
  };

  const startBruteForce = () => {
    setBruteForceActive(true);
    setTimeout(() => setBruteForceActive(false), 10000);
  };

  const renderIndividualVideoFeed = (cameraId: number) => {
    const camera = cameras.find((c) => c.id === cameraId);
    if (!camera || camera.status === "OFFLINE") {
      return (
        <div className="w-full h-24 bg-red-900/20 border border-red-500 flex flex-col items-center justify-center relative">
          <AlertTriangle className="w-4 h-4 text-red-400 mb-1" />
          <span className="text-[10px] text-red-400 font-bold">OFFLINE</span>
          <span className="text-[8px] text-red-400/70">{camera?.name}</span>
        </div>
      );
    }

    return (
      <div
        className={`w-full h-24 border relative overflow-hidden bg-black ${
          cameraId === activeCamera
            ? "border-matrix-green"
            : "border-matrix-green/30"
        }`}
      >
        {/* Enhanced video simulation for individual feeds */}
        <div className="absolute inset-0">
          {/* Background static */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-matrix-green/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}

          {/* Moving elements for realism */}
          {videoPixels.slice(0, 6).map((pixel, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-matrix-green/60 rounded-full"
              style={{
                left: `${pixel.x}%`,
                top: `${pixel.y}%`,
                opacity: pixel.intensity * 0.4,
              }}
            />
          ))}

          {/* Scan lines for each camera */}
          <div
            className="absolute w-full h-0.5 bg-matrix-green/40"
            style={{ top: `${(scanLine + cameraId * 20) % 100}%` }}
          />
        </div>

        {/* Camera info overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-1">
          <div className="flex justify-between items-start">
            <span className="text-[8px] text-matrix-green font-bold bg-black/70 px-1">
              {camera.name}
            </span>
            <div className="flex flex-col items-end space-y-1">
              <span
                className={`text-[8px] px-1 rounded ${
                  camera.status === "ONLINE"
                    ? "bg-matrix-green text-black"
                    : "bg-red-500 text-white"
                }`}
              >
                {camera.signal}%
              </span>
              {camera.encrypted && <Lock className="w-2 h-2 text-yellow-400" />}
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <div className="text-[8px] text-matrix-green/70 bg-black/70 px-1">
                {camera.location}
              </div>
              <div className="text-[8px] text-matrix-green/50 bg-black/70 px-1">
                {camera.ip}
              </div>
            </div>
            {camera.threats > 0 && (
              <div className="text-[8px] text-red-400 flex items-center bg-black/70 px-1">
                <AlertTriangle className="w-2 h-2 mr-1" />
                {camera.threats}
              </div>
            )}
          </div>
        </div>

        {/* Active states overlay */}
        {cameraId === activeCamera && isHacking && (
          <div className="absolute inset-0 bg-red-500/20 border border-red-500 animate-pulse flex items-center justify-center">
            <span className="text-[8px] text-red-400 animate-bounce">
              HACKING
            </span>
          </div>
        )}

        {cameraId === activeCamera && nightVision && (
          <div className="absolute inset-0 bg-purple-500/10 border border-purple-500/50" />
        )}

        {/* Click indicator */}
        <div
          className="absolute inset-0 cursor-pointer hover:bg-matrix-green/5 transition-all"
          onClick={() => setActiveCamera(cameraId)}
        />
      </div>
    );
  };

  return (
    <div
      ref={elementRef}
      className="terminal-window absolute z-20"
      style={{
        left: position.x,
        top: position.y,
        width: "720px",
        height: "580px",
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
          <Camera className="w-4 h-4" />
          <span className="font-bold terminal-glow text-sm">
            SURVEILLANCE v2.7
          </span>
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
          <div className="flex items-center space-x-1">
            <Wifi className="w-3 h-3 text-matrix-green" />
            <span className="text-xs">SECURE</span>
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
        <div className="grid grid-cols-4 gap-3 h-full">
          {/* Camera List & Exploit Tools */}
          <div className="border border-matrix-green p-2 bg-black/30 overflow-y-auto">
            <h3 className="text-xs font-bold terminal-glow mb-2 flex items-center">
              <Target className="w-3 h-3 mr-1" />
              CAMERAS
            </h3>
            <div className="space-y-1 mb-3">
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
                    <span className="font-bold">{camera.name}</span>
                    <span
                      className={`px-1 rounded text-[10px] font-bold ${
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
                  {/* <div className="text-[9px] text-matrix-green/50">
                    {camera.ip}
                  </div> */}
                  <div className="flex justify-between items-center mt-1">
                    <div className="text-[10px]">Signal: {camera.signal}%</div>
                    <div className="flex items-center space-x-1">
                      {camera.encrypted && (
                        <Lock className="w-2 h-2 text-yellow-400" />
                      )}
                      {camera.threats > 0 && (
                        <div className="text-[10px] text-red-400 flex items-center">
                          <AlertTriangle className="w-2 h-2 mr-1" />
                          {camera.threats}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Exploit Tools */}
            <div className="border-t border-matrix-green/30 pt-2">
              <h4 className="text-[10px] font-bold text-matrix-green/70 mb-2 flex items-center">
                <Skull className="w-2 h-2 mr-1" />
                EXPLOIT ARSENAL
              </h4>
              <div className="space-y-1">
                <button
                  onClick={startHacking}
                  disabled={
                    !cameras.find((c) => c.id === activeCamera)?.hackable ||
                    isHacking
                  }
                  className={`w-full text-[9px] p-1 rounded transition-all flex items-center justify-center ${
                    isHacking
                      ? "bg-red-500 text-white animate-pulse"
                      : "bg-matrix-green text-black hover:bg-matrix-green/80"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Zap className="w-2 h-2 mr-1" />
                  {isHacking
                    ? `HACKING ${Math.floor(hackingProgress)}%`
                    : "BYPASS SECURITY"}
                </button>

                <button
                  onClick={() => setSignalJamming(!signalJamming)}
                  className={`w-full text-[9px] p-1 rounded transition-all flex items-center justify-center ${
                    signalJamming
                      ? "bg-yellow-500 text-black"
                      : "bg-matrix-green text-black hover:bg-matrix-green/80"
                  }`}
                >
                  <Radio className="w-2 h-2 mr-1" />
                  {signalJamming ? "JAMMING..." : "SIGNAL JAM"}
                </button>

                <button
                  onClick={startNetworkScan}
                  disabled={networkScan}
                  className={`w-full text-[9px] p-1 rounded transition-all flex items-center justify-center ${
                    networkScan
                      ? "bg-blue-500 text-white animate-pulse"
                      : "bg-matrix-green text-black hover:bg-matrix-green/80"
                  } disabled:opacity-50`}
                >
                  <Network className="w-2 h-2 mr-1" />
                  {networkScan ? "SCANNING..." : "NETWORK SCAN"}
                </button>

                <button
                  onClick={startBruteForce}
                  disabled={bruteForceActive}
                  className={`w-full text-[9px] p-1 rounded transition-all flex items-center justify-center ${
                    bruteForceActive
                      ? "bg-orange-500 text-white animate-pulse"
                      : "bg-matrix-green text-black hover:bg-matrix-green/80"
                  } disabled:opacity-50`}
                >
                  <Bug className="w-2 h-2 mr-1" />
                  {bruteForceActive ? "BRUTE FORCE..." : "BRUTE FORCE"}
                </button>

                <button
                  onClick={startDataExtraction}
                  disabled={dataExtraction}
                  className={`w-full text-[9px] p-1 rounded transition-all flex items-center justify-center ${
                    dataExtraction
                      ? "bg-purple-500 text-white animate-pulse"
                      : "bg-matrix-green text-black hover:bg-matrix-green/80"
                  } disabled:opacity-50`}
                >
                  <Database className="w-2 h-2 mr-1" />
                  {dataExtraction ? "EXTRACTING..." : "DATA EXTRACT"}
                </button>

                <div className="text-[9px] text-matrix-green/70 mt-2">
                  <div className="flex justify-between">
                    <span>Privilege Esc:</span>
                    <span className="text-blue-400">
                      {privilegeEscalation}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Camera View */}
          <div className="col-span-2 border border-matrix-green bg-black p-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold terminal-glow">
                {cameras.find((c) => c.id === activeCamera)?.name} -{" "}
                {cameras.find((c) => c.id === activeCamera)?.location}
              </h3>
              <div className="flex space-x-1">
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-1 rounded transition-all text-[10px] ${
                    isRecording ? "bg-red-500 animate-pulse" : "bg-matrix-green"
                  } text-black`}
                >
                  {isRecording ? <Circle size={10} /> : <Play size={10} />}
                </button>
                <button
                  onClick={() => setZoom(zoom === 1 ? 2 : 1)}
                  className="p-1 bg-matrix-green text-black rounded text-[10px]"
                >
                  {zoom === 1 ? <ZoomIn size={10} /> : <ZoomOut size={10} />}
                </button>
                <button
                  onClick={() => setNightVision(!nightVision)}
                  className={`p-1 rounded text-[10px] ${
                    nightVision ? "bg-purple-500" : "bg-matrix-green"
                  } text-black`}
                >
                  <Eye size={10} />
                </button>
                <button
                  onClick={() => setAutoTracking(!autoTracking)}
                  className={`p-1 rounded text-[10px] ${
                    autoTracking ? "bg-blue-500" : "bg-matrix-green"
                  } text-black`}
                >
                  <Target size={10} />
                </button>
              </div>
            </div>

            {/* Enhanced Camera Feed */}
            <div
              className={`border border-matrix-green h-40 relative overflow-hidden ${
                nightVision ? "bg-purple-900/20" : "bg-black"
              }`}
            >
              <div className="absolute inset-0">
                {videoPixels.map((pixel, i) => (
                  <div
                    key={i}
                    className={`absolute w-1 h-1 rounded-full ${
                      nightVision ? "bg-purple-400" : "bg-matrix-green"
                    }`}
                    style={{
                      left: `${pixel.x}%`,
                      top: `${pixel.y}%`,
                      opacity: pixel.intensity * 0.4,
                      transform: `scale(${zoom})`,
                    }}
                  />
                ))}

                <div
                  className={`absolute w-full h-0.5 ${
                    nightVision ? "bg-purple-400" : "bg-matrix-green"
                  } opacity-60`}
                  style={{ top: `${scanLine}%` }}
                />

                <div className="grid grid-cols-8 grid-rows-6 h-full opacity-20">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div
                      key={i}
                      className="border border-matrix-green/10"
                    ></div>
                  ))}
                </div>
              </div>

              {motionDetected && (
                <div className="absolute inset-0 border-2 border-red-500 animate-pulse">
                  <div className="absolute top-1 left-1 bg-red-500 text-white px-1 py-0.5 text-[10px] animate-bounce">
                    MOTION
                  </div>
                </div>
              )}

              {autoTracking && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border border-blue-400 animate-pulse">
                    <div className="w-full h-0.5 bg-blue-400 absolute top-1/2 transform -translate-y-1/2"></div>
                    <div className="h-full w-0.5 bg-blue-400 absolute left-1/2 transform -translate-x-1/2"></div>
                  </div>
                </div>
              )}

              <div className="absolute top-1 right-1 space-y-1">
                {isRecording && (
                  <div className="flex items-center space-x-1 bg-black/70 px-1 py-0.5 rounded">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] text-red-500 font-bold">
                      REC
                    </span>
                  </div>
                )}
                {nightVision && (
                  <div className="bg-purple-500/70 px-1 py-0.5 rounded text-[10px] text-white">
                    NV
                  </div>
                )}
                {autoTracking && (
                  <div className="bg-blue-500/70 px-1 py-0.5 rounded text-[10px] text-white">
                    TRACK
                  </div>
                )}
                {isHacking && (
                  <div className="bg-red-500/70 px-1 py-0.5 rounded text-[10px] text-white animate-pulse">
                    <Zap className="w-2 h-2 inline mr-1" />
                    HACK
                  </div>
                )}
              </div>

              <div className="absolute bottom-1 left-1 bg-black/70 px-1 py-0.5 rounded">
                <div className="text-[10px] text-matrix-green font-mono">
                  {new Date().toLocaleTimeString()} | ZOOM: {zoom}x
                </div>
                <div className="text-[10px] text-matrix-green">
                  1920x1080 |{" "}
                  {cameras.find((c) => c.id === activeCamera)?.signal}%
                </div>
              </div>
            </div>

            {/* Analysis Section */}
            <div className="mt-2 grid grid-cols-4 gap-2 text-[10px]">
              <div className="border border-matrix-green/50 p-1 bg-black/50">
                <div className="text-matrix-green/70">Motion</div>
                <div
                  className={`font-bold ${
                    motionDetected ? "text-red-400" : "text-matrix-green"
                  }`}
                >
                  {motionDetected ? "ACTIVE" : "CLEAR"}
                </div>
              </div>
              <div className="border border-matrix-green/50 p-1 bg-black/50">
                <div className="text-matrix-green/70">Face Match</div>
                <div className="font-bold text-matrix-green">
                  {faceRecognition}%
                </div>
              </div>
              <div className="border border-matrix-green/50 p-1 bg-black/50">
                <div className="text-matrix-green/70">Threat</div>
                <div
                  className={`font-bold ${
                    threatLevel > 5 ? "text-red-400" : "text-matrix-green"
                  }`}
                >
                  LVL {threatLevel}
                </div>
              </div>
              <div className="border border-matrix-green/50 p-1 bg-black/50">
                <div className="text-matrix-green/70">Data Intercept</div>
                <div className="font-bold text-blue-400">
                  {dataInterception}%
                </div>
              </div>
            </div>

            {/* Individual Video Feeds Container */}
            <div className="mt-2 border border-matrix-green/50 bg-black/30 p-2">
              <h4 className="text-[10px] font-bold text-matrix-green mb-2 flex items-center">
                <Activity className="w-2 h-2 mr-1" />
                LIVE FEEDS
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {cameras.map((camera) => renderIndividualVideoFeed(camera.id))}
              </div>
            </div>
          </div>

          {/* Alert Log */}
          <div className="border border-matrix-green p-2 bg-black/30">
            <h3 className="text-xs font-bold terminal-glow mb-2 flex items-center">
              <Shield className="w-3 h-3 mr-1" />
              ALERTS
            </h3>
            <div
              className="space-y-1 overflow-y-auto"
              style={{ maxHeight: "160px" }}
            >
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`text-[10px] font-mono p-1 rounded ${
                    index === 0
                      ? "text-red-400 bg-red-500/10 animate-pulse"
                      : "text-matrix-green/80"
                  }`}
                >
                  {alert}
                </div>
              ))}
            </div>

            <div className="mt-2 space-y-1 border-t border-matrix-green/30 pt-2">
              <div className="text-[10px] flex justify-between">
                <span className="text-matrix-green/70">Active Cams</span>
                <span className="text-matrix-green font-bold">
                  {cameras.filter((c) => c.status === "ONLINE").length}/4
                </span>
              </div>
              <div className="text-[10px] flex justify-between">
                <span className="text-matrix-green/70">Encrypted</span>
                <span className="text-yellow-400 font-bold">
                  {cameras.filter((c) => c.encrypted).length}/4
                </span>
              </div>
              <div className="text-[10px] flex justify-between">
                <span className="text-matrix-green/70">Hackable</span>
                <span className="text-red-400 font-bold">
                  {cameras.filter((c) => c.hackable).length}/4
                </span>
              </div>
              <div className="text-[10px] flex justify-between">
                <span className="text-matrix-green/70">Avg Signal</span>
                <span className="text-matrix-green font-bold">
                  {Math.round(
                    cameras
                      .filter((c) => c.status === "ONLINE")
                      .reduce((sum, cam) => sum + cam.signal, 0) /
                      cameras.filter((c) => c.status === "ONLINE").length
                  )}
                  %
                </span>
              </div>
              {signalJamming && (
                <div className="text-[10px] flex justify-between">
                  <span className="text-yellow-400/70">Jamming</span>
                  <span className="text-yellow-400 font-bold animate-pulse">
                    ACTIVE
                  </span>
                </div>
              )}
              {networkScan && (
                <div className="text-[10px] flex justify-between">
                  <span className="text-blue-400/70">Net Scan</span>
                  <span className="text-blue-400 font-bold animate-pulse">
                    RUNNING
                  </span>
                </div>
              )}
              {dataExtraction && (
                <div className="text-[10px] flex justify-between">
                  <span className="text-purple-400/70">Extraction</span>
                  <span className="text-purple-400 font-bold animate-pulse">
                    ACTIVE
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraSurveillance;
