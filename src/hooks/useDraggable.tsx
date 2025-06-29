import { useState, useEffect, useRef } from "react";

interface Position {
  x: number;
  y: number;
}

export const useDraggable = (initialPosition: Position = { x: 0, y: 0 }) => {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      // Boundary constraints
      const maxX = window.innerWidth - (elementRef.current?.offsetWidth || 0);
      const maxY = window.innerHeight - (elementRef.current?.offsetHeight || 0);

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
  };

  return {
    position,
    elementRef,
    handleMouseDown,
    isDragging,
  };
};
