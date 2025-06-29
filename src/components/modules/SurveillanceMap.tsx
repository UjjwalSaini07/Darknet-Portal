import React, { useEffect, useRef } from "react";

const SurveillanceMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Connection points around the world
    const points = [
      { x: canvas.width * 0.2, y: canvas.height * 0.3, active: true },
      { x: canvas.width * 0.4, y: canvas.height * 0.4, active: false },
      { x: canvas.width * 0.6, y: canvas.height * 0.5, active: true },
      { x: canvas.width * 0.8, y: canvas.height * 0.3, active: true },
      { x: canvas.width * 0.3, y: canvas.height * 0.7, active: false },
      { x: canvas.width * 0.7, y: canvas.height * 0.8, active: true },
    ];

    let animationFrame: number;

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          if (points[i].active && points[j].active) {
            ctx.strokeStyle = "#00FF0033";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();

            // Animated data flow
            const t = (Date.now() / 1000) % 2;
            const flowX = points[i].x + ((points[j].x - points[i].x) * t) / 2;
            const flowY = points[i].y + ((points[j].y - points[i].y) * t) / 2;

            ctx.fillStyle = "#00FF0066";
            ctx.beginPath();
            ctx.arc(flowX, flowY, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Draw points
      points.forEach((point, i) => {
        ctx.fillStyle = point.active ? "#00FF00" : "#003300";
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fill();

        if (point.active) {
          ctx.strokeStyle = "#00FF00";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(
            point.x,
            point.y,
            8 + Math.sin(Date.now() / 200 + i) * 3,
            0,
            Math.PI * 2
          );
          ctx.stroke();
        }

        // Toggle active state randomly
        if (Math.random() < 0.001) {
          point.active = !point.active;
        }
      });

      // Draw NSA emblem in center
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.strokeStyle = "#00FF0044";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 50, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "#00FF0022";
      ctx.fillText("NSA", centerX - 15, centerY + 5);

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default SurveillanceMap;
