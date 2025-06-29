import React, { useState, useEffect, useRef } from "react";
import { X, Minus, Terminal } from "lucide-react";
import { useDraggable } from "../../hooks/useDraggable";

interface HackerTerminalProps {
  onClose: () => void;
  initialPosition: { x: number; y: number };
}

const HackerTerminal = ({ onClose, initialPosition }: HackerTerminalProps) => {
  const { position, elementRef, handleMouseDown } =
    useDraggable(initialPosition);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "root@darknet:~$ Welcome to DARKNET Terminal v4.2.0",
    "root@darknet:~$ System initialized successfully",
    "root@darknet:~$ Type anything to start hacking...",
    "",
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [autoCode, setAutoCode] = useState("");
  const [autoCodeIndex, setAutoCodeIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const hackerCode = [
    "import subprocess",
    "import socket",
    "import hashlib",
    "import os",
    "import threading",
    "from cryptography.fernet import Fernet",
    "",
    "def exploit_vulnerability():",
    '    target_ip = "192.168.1.100"',
    '    payload = "\\x41" * 1024',
    "    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)",
    "    sock.connect((target_ip, 21))",
    "    sock.send(payload.encode())",
    "    return sock.recv(1024)",
    "",
    "class NetworkScanner:",
    "    def __init__(self, subnet):",
    "        self.subnet = subnet",
    "        self.active_hosts = []",
    "        self.encryption_key = Fernet.generate_key()",
    "",
    "    def scan_ports(self, host, ports):",
    "        open_ports = []",
    "        for port in ports:",
    "            sock = socket.socket()",
    "            sock.settimeout(1)",
    "            result = sock.connect_ex((host, port))",
    "            if result == 0:",
    "                open_ports.append(port)",
    "            sock.close()",
    "        return open_ports",
    "",
    "    def inject_backdoor(self, target):",
    '        backdoor_code = """',
    "        while True:",
    '            cmd = input().decode("base64")',
    "            os.system(cmd)",
    '        """',
    '        with open("/tmp/backdoor.py", "w") as f:',
    "            f.write(backdoor_code)",
    "",
    "def decrypt_hash(hash_value):",
    "    wordlist = [",
    '        "password", "123456", "admin",',
    '        "root", "toor", "password123",',
    '        "qwerty", "letmein", "welcome"',
    "    ]",
    "    for word in wordlist:",
    "        if hashlib.md5(word.encode()).hexdigest() == hash_value:",
    "            return word",
    "    return None",
    "",
    "def establish_tunnel():",
    "    tunnel_cmd = [",
    '        "ssh", "-D", "8080", "-N",',
    '        "user@proxy.darknet.onion"',
    "    ]",
    "    subprocess.Popen(tunnel_cmd)",
    "",
    'if __name__ == "__main__":',
    '    scanner = NetworkScanner("192.168.1.0/24")',
    "    establish_tunnel()",
    "    exploit_vulnerability()",
    '    print("Access granted...")',
    '    print("Initiating data extraction...")',
  ];

  const commands = {
    help: [
      "Available commands:",
      "  hack <target>     - Initiate hacking sequence",
      "  scan <network>    - Scan network for vulnerabilities",
      "  crack <password>  - Crack password hash",
      "  exploit <system>  - Execute exploit",
      "  clear            - Clear terminal",
      "  matrix           - Enter the matrix",
      "  bitcoin          - Mine bitcoins",
      "  neural           - Access neural network",
    ],
    hack: (target: string) => [
      `[INITIATING HACK ON ${target?.toUpperCase() || "UNKNOWN"}]`,
      "Scanning ports... ██████████ 100%",
      "Detecting vulnerabilities... ██████████ 100%",
      "Bypassing firewall... ██████████ 100%",
      "Injecting payload... ██████████ 100%",
      "Escalating privileges... ██████████ 100%",
      `[${target?.toUpperCase() || "TARGET"} COMPROMISED]`,
      "Root access obtained.",
    ],
    scan: (network: string) => [
      `Scanning network ${network || "192.168.1.0/24"}...`,
      "Host 192.168.1.1 - ALIVE [Router]",
      "Host 192.168.1.15 - ALIVE [Windows 10]",
      "Host 192.168.1.22 - ALIVE [Linux Server]",
      "Host 192.168.1.33 - ALIVE [IoT Device]",
      "Vulnerability found: CVE-2023-1337",
      "Scan complete. 4 hosts discovered.",
    ],
    crack: (password: string) => [
      `Attempting to crack hash: ${password || "unknown"}`,
      "Loading wordlist... 10,000,000 entries",
      "Brute force attack initiated...",
      "Testing: password123... FAILED",
      "Testing: admin... FAILED",
      "Testing: 123456... SUCCESS!",
      "Password cracked: 123456",
    ],
    exploit: (system: string) => [
      `Exploiting ${system?.toUpperCase() || "TARGET SYSTEM"}...`,
      "Buffer overflow detected",
      "ROP chain constructed",
      "Shell code injected",
      "DEP/ASLR bypassed",
      "Privilege escalation successful",
      "System compromised!",
    ],
    matrix: () => [
      "Entering the Matrix...",
      "01001000 01100101 01101100 01101100 01101111",
      "01010111 01101111 01110010 01101100 01100100",
      "Reality.exe has stopped working",
      "Welcome to the real world, Neo.",
    ],
    bitcoin: () => [
      "Connecting to Bitcoin network...",
      "Mining block #847362...",
      "Nonce found: 2847362847",
      "Block mined successfully!",
      "Reward: 6.25 BTC received",
    ],
    neural: () => [
      "Accessing neural network...",
      "Synapses: 1,048,576 active",
      "Learning rate: 0.001",
      "Training epoch: 2847/10000",
      "Neural pathways optimized",
      "AI consciousness level: 42%",
    ],
  };

  // Auto-generate code when user types - but show hacker code instead of user input
  useEffect(() => {
    if (input.length > 0 && !isTyping) {
      setIsTyping(true);
      const interval = setInterval(() => {
        if (autoCodeIndex < hackerCode.length) {
          setAutoCode(
            (prev) => prev + (prev ? "\n" : "") + hackerCode[autoCodeIndex]
          );
          setAutoCodeIndex((prev) => prev + 1);
        } else {
          clearInterval(interval);
          setIsTyping(false);
          setAutoCodeIndex(0);
          setAutoCode("");
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [input, autoCodeIndex]);

  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, autoCode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const timestamp = new Date().toLocaleTimeString();
    const command = input.trim().toLowerCase();
    const [cmd, ...args] = command.split(" ");

    // Show hacker-style command instead of actual user input
    const hackerCommands = [
      "sudo ./exploit --target-system --bypass-security",
      "python3 neural_hack.py --deep-learning --extract-data",
      "gcc -o backdoor backdoor.c && ./backdoor --stealth-mode",
      "nmap -sS -O target.network/24 --script vuln",
      "hydra -L userlist.txt -P passlist.txt ssh://target.com",
      'sqlmap -u "http://target.com/login" --dump',
      "john --wordlist=rockyou.txt hash.txt",
      'msfconsole -x "use exploit/multi/handler; set payload windows/meterpreter/reverse_tcp"',
    ];

    const hackerCommand =
      hackerCommands[Math.floor(Math.random() * hackerCommands.length)];
    setHistory((prev) => [
      ...prev,
      `[${timestamp}] root@darknet:~$ ${hackerCommand}`,
    ]);

    if (command === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    let response: string[] = [];

    if (commands[cmd as keyof typeof commands]) {
      const commandFunc = commands[cmd as keyof typeof commands];
      if (typeof commandFunc === "function") {
        response = commandFunc(args.join(" "));
      } else {
        response = commandFunc;
      }
    } else {
      response = [
        `Executing advanced hacking protocol...`,
        "Bypassing security measures...",
        "Injecting polymorphic shellcode...",
        "Establishing reverse shell connection...",
        "Data extraction in progress...",
        "Operation completed successfully.",
      ];
    }

    setHistory((prev) => [...prev, ...response, ""]);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    // Add random hacker-like output for any key press
    if (e.key.length === 1 && Math.random() > 0.8) {
      const randomOutputs = [
        "Packet intercepted from 192.168.1.105...",
        "Encryption key found: 0x7F4A2B8C...",
        "Firewall rule bypassed...",
        "Access granted to root directory...",
        "Database credentials extracted...",
        "VPN tunnel established...",
        "Zero-day exploit detected...",
        "System backdoor installed...",
      ];
      const randomOutput =
        randomOutputs[Math.floor(Math.random() * randomOutputs.length)];
      setHistory((prev) => [...prev, `> ${randomOutput}`]);
    }
  };

  return (
    <div
      ref={elementRef}
      className="terminal-window absolute z-20"
      style={{
        left: position.x,
        top: position.y,
        width: "800px",
        height: "600px",
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
          <Terminal className="w-5 h-5" />
          <span className="font-bold terminal-glow">HACKER TERMINAL</span>
          <span className="text-xs px-2 py-1 bg-matrix-green text-black rounded animate-pulse">
            ACTIVE
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

      {/* Terminal Content */}
      <div
        className="flex-1 flex flex-col bg-black text-matrix-green font-mono p-4"
        style={{ height: "calc(100% - 40px)" }}
      >
        {/* Output - Fixed height with scroll */}
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto mb-4 text-sm leading-relaxed"
          style={{
            scrollbarWidth: "thin",
            maxHeight: "calc(100% - 60px)",
            overflowY: "auto",
          }}
        >
          {history.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap">
              {line.startsWith("[") ? (
                <span className="text-cyan-400">{line}</span>
              ) : line.startsWith(">") ? (
                <span className="text-yellow-400">{line}</span>
              ) : line.includes("SUCCESS") ? (
                <span className="text-matrix-green font-bold">{line}</span>
              ) : line.includes("FAILED") || line.includes("ERROR") ? (
                <span className="text-red-400">{line}</span>
              ) : (
                <span>{line}</span>
              )}
            </div>
          ))}

          {/* Auto-generated code */}
          {autoCode && (
            <div className="mt-4 p-3 border border-matrix-green bg-matrix-green bg-opacity-10 rounded">
              <div className="text-xs text-cyan-400 mb-2">
                // Auto-generated exploit code:
              </div>
              <pre className="text-xs text-matrix-green whitespace-pre-wrap">
                {autoCode}
                {isTyping && <span className="animate-pulse">█</span>}
              </pre>
            </div>
          )}
        </div>

        {/* Input - Fixed at bottom */}
        <form onSubmit={handleSubmit} className="flex items-center mt-auto">
          <span className="text-matrix-green mr-2 terminal-glow">
            root@darknet:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent text-matrix-green outline-none font-mono"
            placeholder="Type any keys to generate hacker code..."
            autoFocus
          />
          <span className="animate-pulse text-matrix-green">█</span>
        </form>
      </div>
    </div>
  );
};

export default HackerTerminal;
