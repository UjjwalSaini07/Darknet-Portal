import React, { useEffect, useRef, useState } from "react";
import {
  X,
  Minus,
  Brain,
  Zap,
  Activity,
  Eye,
  Shield,
  Target,
} from "lucide-react";
import { useDraggable } from "../../hooks/useDraggable";

interface NeuralNetworkProps {
  onClose: () => void;
  initialPosition: { x: number; y: number };
}

const NeuralNetwork = ({ onClose, initialPosition }: NeuralNetworkProps) => {
  const { position, elementRef, handleMouseDown } =
    useDraggable(initialPosition);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [threatLevel, setThreatLevel] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const [activeNodes, setActiveNodes] = useState(0);
  const [neuralActivity, setNeuralActivity] = useState(0);
  const [detectedThreats, setDetectedThreats] = useState<string[]>([]);
  const [systemStatus, setSystemStatus] = useState({
    patternRecognition: 97.3,
    threatAnalysis: 89.7,
    dataFlow: 2.4,
    networkIntegrity: 99.2,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Smaller neural network nodes
    const nodes: Array<{
      x: number;
      y: number;
      layer: number;
      active: boolean;
      pulse: number;
      type: "input" | "hidden" | "output";
      activation: number;
    }> = [];
    const connections: Array<{
      from: (typeof nodes)[0];
      to: (typeof nodes)[0];
      weight: number;
      active: boolean;
      pulse: number;
    }> = [];

    // Generate nodes in 5 layers with different node counts
    const layerSizes = [4, 6, 8, 6, 3];
    layerSizes.forEach((size, layer) => {
      for (let i = 0; i < size; i++) {
        nodes.push({
          x: 40 + layer * 100,
          y: 30 + ((i + 1) * (canvas.height - 60)) / (size + 1),
          layer,
          active: Math.random() > 0.2,
          pulse: Math.random() * Math.PI * 2,
          type:
            layer === 0
              ? "input"
              : layer === layerSizes.length - 1
              ? "output"
              : "hidden",
          activation: Math.random(),
        });
      }
    });

    // Generate weighted connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes.length; j++) {
        if (nodes[j].layer === nodes[i].layer + 1) {
          connections.push({
            from: nodes[i],
            to: nodes[j],
            weight: Math.random() * 2 - 1,
            active: Math.random() > 0.3,
            pulse: Math.random() * Math.PI * 2,
          });
        }
      }
    }

    let animationFrame: number;
    let time = 0;

    const animate = () => {
      time += 0.02;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update node activations
      nodes.forEach((node) => {
        node.activation = (Math.sin(time + node.pulse) + 1) / 2;
        if (Math.random() < 0.01) {
          node.active = Math.random() > 0.3;
        }
      });

      // Draw connections
      connections.forEach((conn) => {
        if (conn.active) {
          const intensity = Math.abs(conn.weight) * conn.from.activation;
          const alpha = 0.3 + intensity * 0.7;

          const color =
            conn.weight > 0
              ? `rgba(0, 255, 0, ${alpha})`
              : `rgba(255, 100, 100, ${alpha})`;

          ctx.strokeStyle = color;
          ctx.lineWidth = 1 + intensity * 2;
          ctx.shadowColor = conn.weight > 0 ? "#00FF00" : "#FF6464";
          ctx.shadowBlur = intensity * 5;

          ctx.beginPath();
          ctx.moveTo(conn.from.x, conn.from.y);
          ctx.lineTo(conn.to.x, conn.to.y);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });

      // Draw smaller nodes
      let activeCount = 0;
      nodes.forEach((node) => {
        if (node.active) activeCount++;

        const pulseSize = Math.sin(time + node.pulse) * 1.5; // Reduced pulse size
        const baseSize =
          node.type === "input" ? 4 : node.type === "output" ? 5 : 3; // Smaller base sizes

        if (node.active) {
          let color = "#00FF00";
          if (node.type === "input") color = "#00FFFF";
          if (node.type === "output") color = "#FFD700";

          // Smaller outer glow
          const glowSize = baseSize + pulseSize + node.activation * 2;
          ctx.fillStyle = color;
          ctx.shadowColor = color;
          ctx.shadowBlur = 8 + node.activation * 5; // Reduced glow
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Smaller inner core
          ctx.fillStyle = "#000000";
          ctx.beginPath();
          ctx.arc(node.x, node.y, baseSize - 1, 0, Math.PI * 2);
          ctx.fill();

          // Smaller activation ring
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(
            node.x,
            node.y,
            baseSize + 1,
            0,
            Math.PI * 2 * node.activation
          );
          ctx.stroke();
        } else {
          // Smaller inactive nodes
          ctx.strokeStyle = "#003300";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(node.x, node.y, baseSize - 1, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      setActiveNodes(activeCount);
      setNeuralActivity(Math.floor((activeCount / nodes.length) * 100));

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  // Simulate threat detection and system updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update threat level
      setThreatLevel((prev) => {
        const change = (Math.random() - 0.5) * 10;
        return Math.max(0, Math.min(100, prev + change));
      });

      // Update scan progress
      setScanProgress((prev) => (prev + Math.random() * 5) % 100);

      // Update system status
      setSystemStatus((prev) => ({
        patternRecognition: Math.max(
          85,
          Math.min(99, prev.patternRecognition + (Math.random() - 0.5) * 2)
        ),
        threatAnalysis: Math.max(
          80,
          Math.min(95, prev.threatAnalysis + (Math.random() - 0.5) * 3)
        ),
        dataFlow: Math.max(
          1,
          Math.min(5, prev.dataFlow + (Math.random() - 0.5) * 0.5)
        ),
        networkIntegrity: Math.max(
          95,
          Math.min(100, prev.networkIntegrity + (Math.random() - 0.5) * 1)
        ),
      }));

      // Occasionally add new threats
      if (Math.random() < 0.1) {
        const threats = [
          "Anomalous packet detected",
          "Intrusion attempt blocked",
          "Malware signature found",
          "Unauthorized access denied",
          "Suspicious behavior pattern",
          "Network probe detected",
        ];
        const newThreat = `[${new Date().toLocaleTimeString()}] ${
          threats[Math.floor(Math.random() * threats.length)]
        }`;
        setDetectedThreats((prev) => [...prev.slice(-4), newThreat]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={elementRef}
      className="terminal-window w-[600px] h-[450px] absolute z-20"
      style={{
        left: position.x,
        top: position.y,
        userSelect: "none",
      }}
    >
      {/* Enhanced Window Header */}
      <div
        className="terminal-header flex items-center justify-between cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-3">
          <span className="text-lg">🧠</span>
          <span className="font-bold terminal-glow">
            NEURAL_DEFENSE_GRID v5.7.2
          </span>
          <span className="text-xs opacity-75 flex items-center gap-1">
            <Shield size={10} />
            [CLASSIFIED]
          </span>
        </div>
        <div className="flex space-x-2">
          <button className="w-5 h-5 bg-matrix-green hover:bg-matrix-lightGreen text-black text-xs flex items-center justify-center font-bold">
            <Minus size={10} />
          </button>
          <button
            onClick={onClose}
            className="w-5 h-5 bg-red-500 hover:bg-red-600 text-black text-xs flex items-center justify-center font-bold"
          >
            <X size={10} />
          </button>
        </div>
      </div>

      {/* Enhanced Window Content */}
      <div className="flex-1 p-3 bg-black">
        <div className="space-y-3">
          {/* Enhanced Network Stats */}
          <div className="grid grid-cols-4 gap-2 text-sm">
            <div className="border border-matrix-green p-2 bg-black text-center">
              <div className="terminal-glow text-xs">NODES</div>
              <div className="font-mono font-bold text-lg flex items-center justify-center gap-1">
                <Brain size={14} />
                {activeNodes}
              </div>
            </div>
            <div className="border border-matrix-green p-2 bg-black text-center">
              <div className="terminal-glow text-xs">ACTIVITY</div>
              <div className="font-mono font-bold text-lg flex items-center justify-center gap-1">
                <Activity size={14} />
                {neuralActivity}%
              </div>
            </div>
            <div className="border border-matrix-green p-2 bg-black text-center">
              <div className="terminal-glow text-xs">THREAT</div>
              <div
                className={`font-mono font-bold text-lg flex items-center justify-center gap-1 ${
                  threatLevel > 70
                    ? "text-red-400"
                    : threatLevel > 40
                    ? "text-yellow-400"
                    : "text-matrix-green"
                }`}
              >
                <Target size={14} />
                {threatLevel.toFixed(0)}%
              </div>
            </div>
            <div className="border border-matrix-green p-2 bg-black text-center">
              <div className="terminal-glow text-xs">SCAN</div>
              <div className="font-mono font-bold text-lg flex items-center justify-center gap-1">
                <Eye size={14} />
                {scanProgress.toFixed(0)}%
              </div>
            </div>
          </div>

          {/* Enhanced Network Visualization */}
          <div className="relative h-40 border-2 border-matrix-green bg-black">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ background: "#000000" }}
            />
            <div className="absolute top-2 left-2 text-xs terminal-glow">
              NEURAL ACTIVITY MONITOR
            </div>
            <div className="absolute top-2 right-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-cyan-400">INPUT</span>
                <div className="w-2 h-2 bg-matrix-green rounded-full animate-pulse"></div>
                <span className="text-matrix-green">HIDDEN</span>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-yellow-400">OUTPUT</span>
              </div>
            </div>
          </div>

          {/* Enhanced System Status */}
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-matrix-green p-2 bg-black">
              <div className="terminal-glow text-sm mb-2 flex items-center gap-2">
                <Zap size={14} />
                SYSTEM STATUS
              </div>
              <div className="space-y-1 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-matrix-green">
                    PATTERN_RECOGNITION:
                  </span>
                  <span className="terminal-glow">
                    {systemStatus.patternRecognition.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-matrix-green">THREAT_ANALYSIS:</span>
                  <span className="terminal-glow">
                    {systemStatus.threatAnalysis.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-matrix-green">DATA_FLOW:</span>
                  <span className="terminal-glow">
                    {systemStatus.dataFlow.toFixed(1)}GB/s
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-matrix-green">NETWORK_INTEGRITY:</span>
                  <span className="terminal-glow">
                    {systemStatus.networkIntegrity.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="border border-matrix-green p-2 bg-black">
              <div className="terminal-glow text-sm mb-2 flex items-center gap-2">
                <Shield size={14} />
                THREAT LOG
              </div>
              <div className="h-16 overflow-y-auto font-mono text-xs space-y-1">
                {detectedThreats.map((threat, i) => (
                  <div
                    key={i}
                    className="text-red-400 animate-fade-in opacity-90"
                  >
                    {threat}
                  </div>
                ))}
                <div className="text-matrix-green terminal-cursor animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Enhanced Control Buttons */}
          <div className="flex space-x-2">
            <button className="hacker-button text-sm flex-1 font-bold flex items-center justify-center gap-2">
              <Brain size={14} />
              [DEEP_SCAN]
            </button>
            <button className="hacker-button text-sm flex-1 font-bold flex items-center justify-center gap-2">
              <Target size={14} />
              [ANALYZE_THREATS]
            </button>
            <button className="hacker-button text-sm flex-1 font-bold flex items-center justify-center gap-2">
              <Shield size={14} />
              [ACTIVATE_DEFENSE]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralNetwork;
