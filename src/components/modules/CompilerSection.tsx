import React, { useState, useEffect } from "react";
import { X, Minus } from "lucide-react";
import { useDraggable } from "../../hooks/useDraggable";

interface CompilerSectionProps {
  onClose: () => void;
  initialPosition: { x: number; y: number };
}

const CompilerSection = ({
  onClose,
  initialPosition,
}: CompilerSectionProps) => {
  const { position, elementRef, handleMouseDown } =
    useDraggable(initialPosition);
  const [isCompiling, setIsCompiling] = useState(true);
  const [matrixLines, setMatrixLines] = useState<string[]>([]);

  const matrixChars =
    "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEF";

  const generateMatrixLine = () => {
    const lineLength = Math.floor(Math.random() * 30) + 20;
    let line = "";
    for (let i = 0; i < lineLength; i++) {
      line += matrixChars[Math.floor(Math.random() * matrixChars.length)];
    }
    return line;
  };

  useEffect(() => {
    if (isCompiling) {
      const interval = setInterval(() => {
        setMatrixLines((prev) => {
          const newLines = [...prev];
          if (newLines.length > 8) {
            newLines.shift();
          }
          newLines.push(generateMatrixLine());
          return newLines;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isCompiling]);

  return (
    <div
      ref={elementRef}
      className="terminal-window w-80 h-72 absolute z-20"
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
          <span className="text-lg">⚡</span>
          <span className="font-bold terminal-glow">COMPILER.EXE</span>
          <span className="text-xs opacity-75">[BUILD_SYSTEM_v4.2]</span>
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
        <div className="space-y-3">
          {/* Enhanced Compilation Status */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="border border-matrix-green p-2 bg-black">
              <div className="terminal-glow">STATUS:</div>
              <div className="font-mono font-bold">
                {isCompiling ? "COMPILING" : "IDLE"}
              </div>
            </div>
            <div className="border border-matrix-green p-2 bg-black">
              <div className="terminal-glow">TARGET:</div>
              <div className="font-mono font-bold">neural_v3.exe</div>
            </div>
          </div>

          {/* Enhanced Matrix Output */}
          <div className="h-24 bg-black border-2 border-matrix-green p-2 overflow-hidden">
            <div className="terminal-glow text-sm mb-1">COMPILER_OUTPUT:</div>
            <div className="text-xs font-mono space-y-0">
              {matrixLines.map((line, i) => (
                <div
                  key={i}
                  className="text-matrix-green"
                  style={{
                    opacity: Math.max(0.3, 1 - i * 0.1),
                    textShadow: "0 0 5px #00FF00",
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Compilation Stats */}
          <div className="grid grid-cols-2 gap-2 text-sm border border-matrix-green p-2 bg-black">
            <div>
              <div className="terminal-glow">LINES:</div>
              <div className="font-mono font-bold">3,247</div>
            </div>
            <div>
              <div className="terminal-glow">ERRORS:</div>
              <div className="font-mono font-bold">0</div>
            </div>
          </div>

          {/* Enhanced Control Button */}
          <button
            onClick={() => setIsCompiling(!isCompiling)}
            className="hacker-button w-full text-sm font-bold"
          >
            {isCompiling ? "[ABORT_COMPILE]" : "[START_COMPILE]"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompilerSection;
