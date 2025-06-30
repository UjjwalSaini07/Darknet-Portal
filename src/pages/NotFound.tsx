import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const fakeLogs = [
  "[ACCESS_DENIED] > Portal Key Missing...",
  "[TRACING_ROUTE] > 192.168.X.X → unreachable",
  "[SYS_ALERT] > Unauthorized endpoint breach attempt",
  "[INIT_RECALL] > Rolling back to safe node...",
  "[MONITOR] > Inject log into system cache...",
  "[KERNEL_LOG] > 404_HANDLE_FAILURE triggered",
  "[LOG] > /dev/null route -> blackholed",
];

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [seconds, setSeconds] = useState(10);
  const fullText = ">>> ERROR 404: NODE NOT FOUND";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < fakeLogs.length) {
        setConsoleLogs((prev) => [...prev, fakeLogs[logIndex++]]);
      } else {
        clearInterval(logInterval);
      }
    }, 900);

    return () => clearInterval(logInterval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(timer);
          navigate("/");
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen w-full bg-black text-matrix-green font-mono px-4 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
        <h1 className="text-6xl md:text-8xl font-bold glitch terminal-glow" data-text="404" style={{ fontFamily: "orbitron, monospace" }}>
          Error 404
        </h1>

        <div className="bg-black border border-matrix-green px-6 py-4 rounded-lg shadow-md shadow-matrix-green/20 w-full">
          <p className="text-lg tracking-wider terminal-glow">{typedText}</p>
          <p className="text-sm mt-2 text-gray-400">
            ✦ Attempted route: <span className="text-white">{location.pathname}</span>
          </p>
        </div>

        {/* Terminal Logs */}
        <div className="bg-black/80 border border-matrix-green rounded-md p-4 text-sm w-full max-h-48 overflow-y-auto shadow-inner shadow-matrix-green/10 backdrop-blur-sm">
          {consoleLogs.map((log, i) => (
            <p key={i} className="terminal-glow">
              {log}
            </p>
          ))}
        </div>

        <div className="flex flex-col items-center mt-2">
          <p className="text-xs text-gray-400 mb-2">
            Redirecting to home in <span className="text-matrix-green">{seconds}</span>s...
          </p>
          <a
            href="/"
            className="mt-2 px-6 py-2 border-2 border-matrix-green text-matrix-green font-semibold hover:bg-matrix-green hover:text-black transition-all duration-300 rounded terminal-glow"
          >
            ← Return to Secure Node Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
