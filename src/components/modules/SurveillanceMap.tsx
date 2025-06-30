import React, { useEffect, useRef } from "react";

const SurveillanceMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const logo = new Image();
    logo.src = "/NSA.png";

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const points = [
      { x: canvas.width * 0.15, y: canvas.height * 0.25, active: true },
      { x: canvas.width * 0.35, y: canvas.height * 0.35, active: false },
      { x: canvas.width * 0.55, y: canvas.height * 0.45, active: true },
      { x: canvas.width * 0.75, y: canvas.height * 0.25, active: true },
      { x: canvas.width * 0.25, y: canvas.height * 0.65, active: false },
      { x: canvas.width * 0.65, y: canvas.height * 0.75, active: true },
    ];

    let animationFrame;

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          if (points[i].active && points[j].active) {
            ctx.strokeStyle = "#00FF0033";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();

            const t = (Date.now() / 1000) % 2;
            const flowX = points[i].x + ((points[j].x - points[i].x) * t) / 2;
            const flowY = points[i].y + ((points[j].y - points[i].y) * t) / 2;

            ctx.fillStyle = "#00FF0066";
            ctx.beginPath();
            ctx.arc(flowX, flowY, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Draw points
      points.forEach((point, i) => {
        ctx.fillStyle = point.active ? "#00FF00" : "#003300";
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
        ctx.fill();

        if (point.active) {
          ctx.strokeStyle = "#00FF00";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(
            point.x,
            point.y,
            10 + Math.sin(Date.now() / 300 + i) * 4,
            0,
            Math.PI * 2
          );
          ctx.stroke();
        }

        if (Math.random() < 0.001) {
          point.active = !point.active;
        }
      });

      // Draw NSA logo in the center
      if (logo.complete) {
        const logoSize = 150;
        const centerX = canvas.width / 2 - logoSize / 2;
        const centerY = canvas.height / 2 - logoSize / 2;

        ctx.drawImage(logo, centerX, centerY, logoSize, logoSize);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

export default SurveillanceMap;
