import React, { useState, useEffect } from "react";
import { X, Minus } from "lucide-react";
import { useDraggable } from "../../hooks/useDraggable";

interface PasswordCrackerProps {
  onClose: () => void;
  initialPosition: { x: number; y: number };
}

const PasswordCracker = ({
  onClose,
  initialPosition,
}: PasswordCrackerProps) => {
  const { position, elementRef, handleMouseDown } =
    useDraggable(initialPosition);
  const [targetIP, setTargetIP] = useState("192.168.1.47");
  const [isRunning, setIsRunning] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [currentAttempt, setCurrentAttempt] = useState("");
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const generateRandomAttempt = () => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        const newAttempts = attempts + Math.floor(Math.random() * 50) + 10;
        const newAttempt = generateRandomAttempt();

        setAttempts(newAttempts);
        setCurrentAttempt(newAttempt);
        setProgress((prev) => Math.min(100, prev + Math.random() * 1.5));

        setLogs((prev) => {
          const newLogs = [
            ...prev,
            `[${new Date().toLocaleTimeString()}] ATTEMPT: ${newAttempt} -> FAILED`,
          ];
          return newLogs.slice(-5);
        });
      }, 150);
    }

    return () => clearInterval(interval);
  }, [isRunning, attempts]);

  return (
    <div
      ref={elementRef}
      className="terminal-window w-96 h-96 absolute z-20"
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
          <span className="text-lg">🔓</span>
          <span className="font-bold terminal-glow">PASSWORD_CRACKER.EXE</span>
          <span className="text-xs opacity-75">[BREACH_TOOL_v2.1]</span>
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
      <div className="flex-1 p-4 bg-black">
        <div className="space-y-4">
          {/* Enhanced Target Input */}
          <div className="border border-matrix-green p-2 bg-black">
            <label className="text-sm terminal-glow block mb-2">
              TARGET_IP_ADDRESS:
            </label>
            <input
              type="text"
              value={targetIP}
              onChange={(e) => setTargetIP(e.target.value)}
              className="terminal-input w-full p-2 text-sm font-mono"
              disabled={isRunning}
            />
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="border border-matrix-green p-2 bg-black">
              <div className="terminal-glow">ATTEMPTS:</div>
              <div className="font-mono font-bold text-lg">
                {attempts.toLocaleString()}
              </div>
            </div>
            <div className="border border-matrix-green p-2 bg-black">
              <div className="terminal-glow">RATE:</div>
              <div className="font-mono font-bold text-lg">2,847/sec</div>
            </div>
          </div>

          {/* Enhanced Current Attempt */}
          <div className="border border-matrix-green p-2 bg-black">
            <div className="terminal-glow text-sm mb-2">CURRENT_ATTEMPT:</div>
            <div className="font-mono bg-black border border-matrix-green p-2 text-sm">
              {currentAttempt || "awaiting_target..."}
              <span className="animate-blink terminal-glow">█</span>
            </div>
          </div>

          {/* Enhanced Progress */}
          <div>
            <div className="flex justify-between text-sm terminal-glow mb-2">
              <span>BREACH_PROGRESS:</span>
              <span className="font-bold">{progress.toFixed(1)}%</span>
            </div>
            <div className="h-3 bg-black border-2 border-matrix-green overflow-hidden">
              <div
                className="h-full bg-matrix-green transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  boxShadow: "0 0 10px #00FF00",
                }}
              />
            </div>
          </div>

          {/* Enhanced Control Button */}
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="hacker-button w-full text-sm font-bold"
          >
            {isRunning ? "[ABORT_ATTACK]" : "[LAUNCH_BREACH]"}
          </button>

          {/* Enhanced Warning */}
          <div className="border-2 border-red-500 p-2 text-xs text-red-400 font-mono bg-black">
            <span className="terminal-glow">⚠️ WARNING:</span>{" "}
            UNAUTHORIZED_ACCESS_VIOLATION
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordCracker;
