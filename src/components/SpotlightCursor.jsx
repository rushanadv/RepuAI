import React, { useEffect } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

export default function SpotlightCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const y = useSpring(mouseY, { stiffness: 80, damping: 25 });

  useEffect(() => {
    const move = (e) => { 
      mouseX.set(e.clientX); 
      mouseY.set(e.clientY); 
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        position: "fixed",
        width: 650, 
        height: 650,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
        x, 
        y,
        translateX: "-50%",
        translateY: "-50%",
        pointerEvents: "none",
        zIndex: 1,
        top: 0, 
        left: 0,
      }}
    />
  );
}
