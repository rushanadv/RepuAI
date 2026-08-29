import React, { useRef, useState } from "react";

export function GlowCard({ children, className = "", style = {} }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", overflow: "hidden", ...style }}
    >
      {hovered && (
        <div
          style={{
            position: "absolute",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
            left: pos.x,
            top: pos.y,
            pointerEvents: "none",
            transition: "opacity 0.2s ease",
            zIndex: 0,
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1, height: "100%", width: "100%" }}>
        {children}
      </div>
    </div>
  );
}

export default GlowCard;
