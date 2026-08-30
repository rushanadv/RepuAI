import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function GlowCard({ children, className = "", style = {} }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      style={{ position: "relative", overflow: "hidden", ...style }}
    >
      {hovered && (
        <div style={{
          position: "absolute",
          width: 280, 
          height: 280,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          left: pos.x, 
          top: pos.y,
          pointerEvents: "none",
          zIndex: 0,
        }} />
      )}
      <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%" }}>
        {children}
      </div>
    </motion.div>
  );
}

export { GlowCard };
