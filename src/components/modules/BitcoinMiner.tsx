import React, { useState, useEffect } from "react";
import { X, Minus, TrendingUp, Zap, DollarSign, Activity } from "lucide-react";
import { useDraggable } from "../../hooks/useDraggable";

interface BitcoinMinerProps {
  onClose: () => void;
  initialPosition: { x: number; y: number };
}

const BitcoinMiner = ({ onClose, initialPosition }: BitcoinMinerProps) => {
  const { position, elementRef, handleMouseDown } =
    useDraggable(initialPosition);
  const [connectionStatus, setConnectionStatus] = useState(
    "128.154.26.11 Connected to btcn.miner.bitcoin-heap.htmld.com"
  );
  const [btcBalance, setBtcBalance] = useState(8.47251903);
  const [usdValue, setUsdValue] = useState(847362);
  const [hashRate, setHashRate] = useState(152.45);
  const [asicData, setAsicData] = useState([
    {
      id: 1,
      accepted: 32477,
      rejected: 359,
      hashrate: 346.54,
      temp: 68,
      power: 1200,
    },
    {
      id: 32,
      accepted: 56872,
      rejected: 8769,
      hashrate: 34.99,
      temp: 72,
      power: 980,
    },
  ]);
  const [totalStats, setTotalStats] = useState({
    accepted: 834319,
    rejected: 32122,
    totalHashrate: 152,
  });
  const [logEntries, setLogEntries] = useState([
    "WCFO - [11:01:53] Resp Vvkpo*61 | No match Zr*02 | Diff: 29/160",
    "NTKU - [11:01:54] Resp Grglr#39 | No match Fot99 | Diff: 04/431",
    "SNFL - [11:01:55] Resp Jmgt*08 | No match Hfq56 | Diff: 55/148",
    "KRYM - [11:01:56] Resp WuxmnS43 | No match Qq@38 | Diff: 52/878",
    "DCRO - [11:01:58] Resp Htsvbr45 | No match Stf69 | Diff: 80/532",
  ]);
  const [graphData, setGraphData] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(true);

  // Initialize graph data
  useEffect(() => {
    const initData = Array.from({ length: 50 }, (_, i) =>
      isRunning
        ? 70 + Math.sin(i * 0.3) * 20 + Math.random() * 10
        : 10 + Math.random() * 5
    );
    setGraphData(initData);
  }, []);

  // Update mining data with enhanced animations
  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        // Update ASIC data with temperature and power
        setAsicData((prev) =>
          prev.map((asic) => ({
            ...asic,
            accepted: asic.accepted + Math.floor(Math.random() * 3),
            rejected: asic.rejected + (Math.random() > 0.9 ? 1 : 0),
            hashrate: Math.max(
              20,
              Math.min(400, asic.hashrate + (Math.random() - 0.5) * 10)
            ),
            temp: Math.max(
              55,
              Math.min(85, asic.temp + (Math.random() - 0.5) * 3)
            ),
            power: Math.max(
              800,
              Math.min(1500, asic.power + (Math.random() - 0.5) * 50)
            ),
          }))
        );

        // Update total stats
        setTotalStats((prev) => ({
          accepted: prev.accepted + Math.floor(Math.random() * 5),
          rejected: prev.rejected + (Math.random() > 0.8 ? 1 : 0),
          totalHashrate: Math.max(
            140,
            Math.min(180, prev.totalHashrate + (Math.random() - 0.5) * 5)
          ),
        }));

        // Update graphs dynamically based on mining status
        setGraphData((prev) => {
          const newValue = isRunning
            ? 70 + Math.sin(Date.now() * 0.001) * 20 + Math.random() * 15
            : 5 + Math.random() * 10;
          return [...prev.slice(-49), newValue];
        });

        setHashRate((prev) =>
          Math.max(140, Math.min(180, prev + (Math.random() - 0.5) * 8))
        );

        // Update balance with more realistic increments
        if (Math.random() > 0.6) {
          setBtcBalance((prev) =>
            Number((prev + 0.00000001 * Math.random() * 10).toFixed(8))
          );
          setUsdValue((prev) => prev + Math.floor(Math.random() * 100 - 50));
        }

        // Enhanced log entries
        if (Math.random() > 0.5) {
          const cryptoSymbols = [
            "WCFO",
            "NTKU",
            "SNFL",
            "KRYM",
            "DCRO",
            "BITMX",
            "HASHX",
            "MINR",
            "BLKC",
            "NONCE",
          ];
          const time = new Date().toLocaleTimeString();
          const symbol =
            cryptoSymbols[Math.floor(Math.random() * cryptoSymbols.length)];
          const hash = Math.random().toString(36).substr(2, 8);
          const diff = `${Math.floor(Math.random() * 100)}/${Math.floor(
            Math.random() * 500 + 100
          )}`;

          const newLog = `${symbol} - [${time}] Block #${Math.floor(
            Math.random() * 999999
          )} | Hash: ${hash} | Diff: ${diff}`;

          setLogEntries((prev) => [...prev.slice(-4), newLog]);
        }
      } else {
        // When stopped, show minimal activity
        setGraphData((prev) => {
          const newValue = 5 + Math.random() * 10;
          return [...prev.slice(-49), newValue];
        });
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setGraphData((prevData) => {
        const newVal = Math.max(
          10,
          Math.min(
            100,
            prevData[prevData.length - 1] + (Math.random() * 20 - 10)
          )
        );
        const nextData = [...prevData.slice(1), newVal];
        return nextData;
      });
    }, 300); // Adjust speed here

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div
      ref={elementRef}
      className="terminal-window w-[950px] h-[650px] absolute z-20"
      style={{
        left: position.x,
        top: position.y,
        boxShadow:
          "0 0 50px rgba(0, 255, 0, 0.8), inset 0 0 50px rgba(0, 255, 0, 0.1)",
        border: "3px solid #00FF00",
        background:
          "linear-gradient(135deg, rgba(0, 0, 0, 0.98) 0%, rgba(0, 50, 0, 0.95) 100%)",
      }}
    >
      {/* Enhanced Header */}
      <div
        className="terminal-header flex items-center justify-between cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-3">
          <div className="text-2xl animate-pulse">₿</div>
          <span className="font-bold terminal-glow text-xl">
            CRYPTO MINER v3.7.2
          </span>
          <div className="flex items-center space-x-2">
            <span
              className={`text-xs px-3 py-1 rounded-full font-bold ${
                isRunning
                  ? "bg-matrix-green text-black animate-pulse"
                  : "bg-red-500 text-white"
              }`}
            >
              {isRunning ? "MINING ACTIVE" : "STOPPED"}
            </span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-matrix-green rounded-full animate-pulse"></div>
              <span className="text-xs terminal-glow">
                {hashRate.toFixed(2)} TH/s
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="w-6 h-6 bg-matrix-green hover:bg-matrix-lightGreen text-black text-xs flex items-center justify-center font-bold rounded"
          >
            {isRunning ? "⏸" : "▶"}
          </button>
          <button className="w-6 h-6 bg-yellow-500 hover:bg-yellow-400 text-black text-xs flex items-center justify-center font-bold rounded">
            <Minus size={12} />
          </button>
          <button
            onClick={onClose}
            className="w-6 h-6 bg-red-500 hover:bg-red-600 text-white text-xs flex items-center justify-center font-bold rounded"
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="flex-1 p-4 bg-black text-matrix-green font-mono text-sm">
        {/* Enhanced Connection Status */}
        <div className="mb-3 p-2 border border-matrix-green rounded bg-matrix-green bg-opacity-10">
          <div className="terminal-glow text-sm">{connectionStatus}</div>
          <div className="text-xs opacity-80 mt-1">
            <span className="text-cyan-400">Block:</span> ...7e9Wq#001 |
            <span className="text-yellow-400"> Diff:</span> 147M |
            <span className="text-matrix-green"> Status:</span> Permission
            granted!
          </div>
          <div className="text-xs opacity-80">
            <span className="text-blue-400">GPU:</span> #0-#32 [OK] (1.092Ph/s)
            |<span className="text-red-400"> OC:</span> 300% |
            <span className="text-purple-400"> Power:</span> 55/13/4Mh/kWh
          </div>
        </div>

        <div className="flex gap-4 h-[520px]">
          {/* Left Side - Enhanced Tables and Logs */}
          <div className="flex-1 space-y-3">
            {/* Enhanced ASIC Table */}
            <div className="border-2 border-matrix-green rounded bg-matrix-green bg-opacity-5">
              <div className="bg-matrix-green text-black p-2 font-bold text-center">
                <span className="terminal-glow text-black">
                  ⚡ ASIC MINERS STATUS ⚡
                </span>
              </div>
              <table className="w-full text-xs">
                <thead className="bg-matrix-green bg-opacity-20">
                  <tr>
                    <th className="p-2 text-left">ID</th>
                    <th className="p-2 text-left">Accepted</th>
                    <th className="p-2 text-left">Rejected</th>
                    <th className="p-2 text-left">Hash Rate</th>
                    <th className="p-2 text-left">Temp</th>
                    <th className="p-2 text-left">Power</th>
                  </tr>
                </thead>
                <tbody>
                  {asicData.map((asic, i) => (
                    <tr
                      key={i}
                      className="border-t border-matrix-green hover:bg-matrix-green hover:bg-opacity-10"
                    >
                      <td className="p-2 text-center font-bold">#{asic.id}</td>
                      <td className="p-2 text-center text-matrix-green">
                        {asic.accepted.toLocaleString()}
                      </td>
                      <td className="p-2 text-center text-red-400">
                        {asic.rejected}
                      </td>
                      <td className="p-2 text-center text-cyan-400">
                        {asic.hashrate.toFixed(2)} GH/s
                      </td>
                      <td className="p-2 text-center">
                        <span
                          className={
                            asic.temp > 75
                              ? "text-red-400"
                              : asic.temp > 65
                              ? "text-yellow-400"
                              : "text-matrix-green"
                          }
                        >
                          {asic.temp}°C
                        </span>
                      </td>
                      <td className="p-2 text-center text-purple-400">
                        {asic.power}W
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-matrix-green bg-matrix-green bg-opacity-15">
                    <td className="p-2 text-center font-bold">TOTAL</td>
                    <td className="p-2 text-center font-bold text-matrix-green">
                      {totalStats.accepted.toLocaleString()}
                    </td>
                    <td className="p-2 text-center font-bold text-red-400">
                      {totalStats.rejected}
                    </td>
                    <td className="p-2 text-center font-bold text-cyan-400">
                      ~{totalStats.totalHashrate} GH/s
                    </td>
                    <td className="p-2 text-center font-bold">AVG</td>
                    <td className="p-2 text-center font-bold">2180W</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Enhanced Mining Logs */}
            <div className="border-2 border-matrix-green rounded flex-1 overflow-hidden bg-black">
              <div className="bg-matrix-green text-black p-2 font-bold text-center">
                <span className="terminal-glow text-black">
                  📊 MINING ACTIVITY LOG 📊
                </span>
              </div>
              <div className="p-3 h-48 overflow-y-auto">
                <div className="space-y-1">
                  {logEntries.map((entry, i) => (
                    <div
                      key={i}
                      className="text-xs font-mono opacity-90 hover:opacity-100 transition-opacity"
                    >
                      <span className="text-cyan-400">
                        {entry.split(" - ")[0]}
                      </span>
                      <span className="text-matrix-green">
                        {" "}
                        - {entry.split(" - ")[1]}
                      </span>
                    </div>
                  ))}
                  <div className="text-matrix-green terminal-cursor animate-pulse flex items-center">
                    <span className="animate-pulse">█</span>
                    <span className="ml-2 text-xs">
                      Scanning for new blocks...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Wallet and Hash Rate Graph */}
          <div className="w-72 space-y-3">
            {/* Enhanced Wallet */}
            <div className="border-2 border-matrix-green bg-gradient-to-br from-matrix-green to-matrix-mediumGreen text-black p-4 rounded">
              <div className="text-center">
                <div className="text-lg font-bold mb-2 flex items-center justify-center">
                  <span className="text-2xl mr-2">💰</span>
                  WALLET BALANCE
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-3xl animate-pulse">₿</span>
                  <span className="text-2xl font-bold">
                    {btcBalance.toFixed(8)}
                  </span>
                </div>
                <div className="text-xl font-bold">
                  ≈ ${usdValue.toLocaleString()}
                </div>
                <div className="text-sm mt-2 opacity-80">
                  Daily Profit: +$2,847 📈
                </div>
              </div>
            </div>

            {/* Enhanced Hash Rate Graph - Dynamic based on mining status */}
            <div className="border-2 border-matrix-green p-3 h-44 rounded bg-black">
              <div className="text-sm font-bold mb-2 text-center terminal-glow">
                ⚡ HASH RATE MONITOR ⚡
              </div>
              <div className="text-xs text-center mb-2">
                <span
                  className={`px-2 py-1 rounded ${
                    isRunning
                      ? "bg-matrix-green text-black"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {isRunning ? "ACTIVE MINING" : "MINING STOPPED"}
                </span>
              </div>
              <svg
                className="w-full h-24"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="hashGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={isRunning ? "#00FF00" : "#FF4444"}
                      stopOpacity="0.8"
                    />
                    <stop
                      offset="100%"
                      stopColor={isRunning ? "#00FF00" : "#FF4444"}
                      stopOpacity="0.1"
                    />
                  </linearGradient>
                </defs>

                {/* Background grid */}
                {[...Array(5)].map((_, i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={i * 25}
                    x2="100"
                    y2={i * 25}
                    stroke={isRunning ? "#00FF00" : "#FF4444"}
                    strokeOpacity="0.1"
                    strokeWidth="0.5"
                  />
                ))}

                {/* Area fill */}
                {graphData.length > 1 && (
                  <>
                    <polygon
                      fill="url(#hashGradient)"
                      points={`0,100 ${graphData
                        .map(
                          (val, idx) =>
                            `${(idx / (graphData.length - 1)) * 100},${
                              100 - (val / 100) * 90
                            }`
                        )
                        .join(" ")} 100,100`}
                    />
                    <polyline
                      fill="none"
                      stroke={isRunning ? "#00FF00" : "#FF4444"}
                      strokeWidth="1.5"
                      points={graphData
                        .map(
                          (val, idx) =>
                            `${(idx / (graphData.length - 1)) * 100},${
                              100 - (val / 100) * 90
                            }`
                        )
                        .join(" ")}
                      style={{
                        filter: `drop-shadow(0 0 3px ${
                          isRunning ? "#00FF00" : "#FF4444"
                        })`,
                      }}
                    />
                  </>
                )}
              </svg>
            </div>

            {/* Enhanced Bitcoin Animation */}
            <div className="border-2 border-matrix-green bg-black p-3 h-32 relative overflow-hidden rounded">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <img
                    src="/CryptoMining-animation.gif"
                    alt="Crypto Mining Animation"
                    className="absolute w-40 h-40 text-center object-cover opacity-70"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                  <div className="absolute bottom-2 right-2 text-xl animate-pulse">
                    <span
                      className={
                        isRunning ? "text-matrix-green" : "text-gray-500"
                      }
                    >
                      ⛏️
                    </span>
                  </div>
                  <div className="absolute top-2 left-2 text-xs terminal-glow">
                    {isRunning ? "MINING..." : "STOPPED"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BitcoinMiner;
