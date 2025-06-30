import React, { useState, useEffect } from "react";

const BackgroundTerminal = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");

  const hackerCommands = [
    "accessing mainframe...",
    "bypassing firewall protocols...",
    "injecting payload into target system...",
    "establishing encrypted tunnel...",
    "scanning for vulnerabilities...",
    "decrypting RSA encryption...",
    "penetrating neural network defenses...",
    "extracting classified data...",
    "masking IP address through proxy chains...",
    "deploying backdoor trojan...",
    "initiating brute force attack...",
    "escalating privileges to root access...",
    "compiling exploit code...",
    "launching distributed denial of service...",
    "infiltrating government database...",
  ];

  const generateRandomCommand = () => {
    const command =
      hackerCommands[Math.floor(Math.random() * hackerCommands.length)];
    const timestamp = new Date().toLocaleTimeString();
    return `[${timestamp}] root@darknet:~$ ${command}`;
  };

  const generateRandomHex = () => {
    return Math.random().toString(16).substr(2, 8).toUpperCase();
  };

  const generateRandomCode = () => {
    const codeTypes = [
      `0x${generateRandomHex()} -> 0x${generateRandomHex()}`,
      `malloc(${Math.floor(Math.random() * 9999)}); // allocated ${Math.floor(
        Math.random() * 999
      )}KB`,
      `exec("/bin/bash", ["-c", "rm -rf /var/log/*"]);`,
      `buffer_overflow_detected at 0x${generateRandomHex()}`,
      `SSH connection established: ${Math.floor(
        Math.random() * 255
      )}.${Math.floor(Math.random() * 255)}.${Math.floor(
        Math.random() * 255
      )}.${Math.floor(Math.random() * 255)}`,
      `SQL injection: SELECT * FROM users WHERE admin='1' OR '1'='1'`,
      `packet_capture: ${Math.floor(Math.random() * 9999)} bytes intercepted`,
    ];
    return codeTypes[Math.floor(Math.random() * codeTypes.length)];
  };

  useEffect(() => {
    const initialLines = Array.from({ length: 20 }, () =>
      generateRandomCommand()
    );
    setLines(initialLines);

    const interval = setInterval(() => {
      setLines((prev) => {
        const newLines = [...prev];
        if (newLines.length > 50) {
          newLines.shift();
        }
        newLines.push(
          Math.random() > 0.5 ? generateRandomCommand() : generateRandomCode()
        );
        return newLines;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.ctrlKey ||
        event.altKey ||
        event.metaKey ||
        event.key.length > 1
      ) {
        return;
      }

      setCurrentInput((prev) => prev + event.key);

      if (currentInput.length > 8) {
        const timestamp = new Date().toLocaleTimeString();
        const newLine = `[${timestamp}] anonymous@matrix:~$ ${currentInput}${event.key}`;

        setLines((prev) => {
          const newLines = [...prev];
          if (newLines.length > 50) {
            newLines.shift();
          }
          newLines.push(newLine);
          newLines.push(`> ${generateRandomCode()}`);
          return newLines;
        });

        setCurrentInput("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentInput]);

  return (
    <div
      className="background-terminal"
      style={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          flex: "1",
          overflowY: "auto",
          padding: "10px",
        }}
      >
        {lines.map((line, index) => (
          <div
            key={index}
            className="mb-1"
            style={{
              opacity: Math.max(0.1, 1 - (lines.length - index) * 0.02),
              textShadow: "0 0 3px #00FF00",
            }}
          >
            {line}
          </div>
        ))}
      </div>
      <div
        className="terminal-glow"
        style={{
          backgroundColor: "#000",
          padding: "5px 10px",
          fontWeight: "bold",
          color: "#00FF00",
          textShadow: "0 0 5px #00FF00",
          marginBottom: "30px",
        }}
      >
        [{new Date().toLocaleTimeString()}] typing: {currentInput}_
      </div>
    </div>
  );
};

export default BackgroundTerminal;
