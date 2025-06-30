import React, { useEffect, useRef } from "react";
import "./LoadingScreen.css";

const phrasesList = [
  "Decrypting protocols",
  "Bypassing firewalls",
  "Injecting packets",
  "Disable Antivirus",
  "Listening to ports",
  "Brute-forcing hashes",
  "Spoofing DNS",
  "Mining entropy",
  "Deploying exploits",
  "Opening sockets",
  "Bypass all Routes",
  "Initiating DDoS",
  "Scraping data",
  "Masking identity",
  "Encrypting payloads",
  "Copying Files",
  "Duplicates the Passwords",
];

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const LoadingScreen = () => {
  const phrasesRef = useRef(null);

  useEffect(() => {
    const phrases = shuffleArray(phrasesList).slice(0, 12); // Use a few lines only
    const phrasesGroup = phrasesRef.current;
    const lineHeight = 35;
    const checks = [];

    let currentY = 0;
    let index = 0;

    // Clear existing content
    phrasesGroup.innerHTML = "";

    phrases.forEach((phrase, i) => {
      const yOffset = i * lineHeight;

      const lineGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
      lineGroup.setAttribute("transform", `translate(0 ${yOffset})`);

      const checkGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
      checkGroup.setAttribute("transform", `translate(10 5) scale(0.9)`);

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", "16");
      circle.setAttribute("cy", "16");
      circle.setAttribute("r", "15");
      circle.setAttribute("fill", "rgba(0,255,0,0)");

      const circleOutline = document.createElementNS("http://www.w3.org/2000/svg", "path");
      circleOutline.setAttribute(
        "d",
        "M16,0C7.163,0,0,7.163,0,16s7.163,16,16,16s16-7.163,16-16S24.837,0,16,0z M16,30C8.28,30,2,23.72,2,16C2,8.28,8.28,2,16,2 c7.72,0,14,6.28,14,14C30,23.72,23.72,30,16,30z"
      );
      circleOutline.setAttribute("fill", "#00FF00");

      const check = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      check.setAttribute("points", "21.661,7.643 13.396,19.328 9.429,15.361 7.075,17.714 13.745,24.384 24.345,9.708");
      check.setAttribute("fill", "rgba(0,255,0,0)"); // Start hidden

      checkGroup.appendChild(circle);
      checkGroup.appendChild(circleOutline);
      checkGroup.appendChild(check);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", "60");
      text.setAttribute("y", "22");
      text.setAttribute("font-size", "18");
      text.setAttribute("fill", "#00FF00");
      text.setAttribute("font-family", "Courier New, monospace");
      text.textContent = `${phrase}...`;

      lineGroup.appendChild(checkGroup);
      lineGroup.appendChild(text);
      phrasesGroup.appendChild(lineGroup);

      checks.push({ check, circle, offset: yOffset });
    });

    const scrollSpeed = 0.7; // speed control

    const animate = () => {
      currentY -= scrollSpeed;
      phrasesGroup.setAttribute("transform", `translate(0, ${currentY})`);

      checks.forEach((item, i) => {
        const threshold = item.offset - 20; // when this line reaches certain Y
        if (currentY * -1 >= threshold && item.circle.getAttribute("fill") === "rgba(0,255,0,0)") {
          item.circle.setAttribute("fill", "rgba(0,255,0,0.3)");
          item.check.setAttribute("fill", "#00FF00");
        }
      });

      if (currentY > -lineHeight * phrases.length) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="page">
      <div className="phrase-box">
        <svg width="100%" height="100%">
          <defs>
            <mask id="mask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
              <linearGradient id="linearGradient" gradientUnits="objectBoundingBox" x2="0" y2="1">
                <stop stopColor="white" stopOpacity="0" offset="0%" />
                <stop stopColor="white" stopOpacity="1" offset="25%" />
                <stop stopColor="white" stopOpacity="1" offset="75%" />
                <stop stopColor="white" stopOpacity="0" offset="100%" />
              </linearGradient>
              <rect width="100%" height="100%" fill="url(#linearGradient)" />
            </mask>
          </defs>
          <g style={{ mask: "url(#mask)" }}>
            <g ref={phrasesRef}></g>
          </g>
        </svg>
      </div>
      <div className="footer">
        <div className="logo" />
        Welcome Hacker Terminal
      </div>
    </div>
  );
};

export default LoadingScreen;
