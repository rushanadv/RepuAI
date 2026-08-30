import React, { useEffect, useRef } from "react";

export default function ConstellationCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let animId;

    const mouse = { x: W / 2, y: H / 2, vx: 0, vy: 0, px: W / 2, py: H / 2 };

    // GRID DOTS — small fixed grey dots in a grid pattern
    const GRID_COLS = Math.ceil(W / 60);
    const GRID_ROWS = Math.ceil(H / 60);
    const gridDots = [];
    for (let r = 0; r <= GRID_ROWS; r++) {
      for (let c = 0; c <= GRID_COLS; c++) {
        gridDots.push({
          x: (c / GRID_COLS) * W,
          y: (r / GRID_ROWS) * H,
        });
      }
    }

    // FLOATING NODES — larger, moving, connectable
    const NODE_COUNT = 55;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 1,
      // Each node has a "hot" state when cursor is near
      heat: 0,
    }));

    // CURSOR SHOCKWAVE PARTICLES — burst on fast cursor move
    const shockwaves = [];

    const onMouseMove = (e) => {
      mouse.vx = e.clientX - mouse.x;
      mouse.vy = e.clientY - mouse.y;
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Spawn shockwave if cursor is moving fast
      const speed = Math.sqrt(mouse.vx ** 2 + mouse.vy ** 2);
      if (speed > 12) {
        shockwaves.push({
          x: mouse.x,
          y: mouse.y,
          r: 0,
          maxR: speed * 3.5,
          alpha: 0.5,
          speed: speed * 0.18,
        });
      }
    };

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    const CONNECT_DIST = 200;
    const CURSOR_DIST = 150;
    const HOT_DIST = 100;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // — Draw grid dots —
      gridDots.forEach((d) => {
        // Check if near cursor
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const bright = dist < 120 ? (1 - dist / 120) * 0.35 : 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.07 + bright})`;
        ctx.fill();
      });

      // — Update & draw shockwaves —
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const s = shockwaves[i];
        s.r += s.speed;
        s.alpha -= 0.018;
        if (s.alpha <= 0 || s.r >= s.maxR) {
          shockwaves.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(124,58,237,${s.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // — Update & draw nodes —
      nodes.forEach((n, i) => {
        // Move
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;

        // Heat up near cursor
        const cdx = n.x - mouse.x;
        const cdy = n.y - mouse.y;
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
        n.heat = cdist < HOT_DIST ? (1 - cdist / HOT_DIST) : 
                 Math.max(0, n.heat - 0.02);

        // Draw node
        const alpha = 0.35 + n.heat * 0.65;
        const radius = n.r + n.heat * 2.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        // Hot nodes glow cyan, cool nodes are violet
        const r = Math.round(124 + n.heat * (0 - 124));
        const g = Math.round(58 + n.heat * (200 - 58));
        const b = Math.round(237 + n.heat * (255 - 237));
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();

        // Add glow ring on hot nodes
        if (n.heat > 0.3) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, radius + 4, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r},${g},${b},${n.heat * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // — Connect to nearby nodes —
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const opacity = (1 - dist / CONNECT_DIST) * 0.22;
            const hotOpacity = opacity + (n.heat + m.heat) * 0.15;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(124,58,237,${Math.min(hotOpacity, 0.6)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // — Connect to cursor if within range —
        if (cdist < CURSOR_DIST) {
          const opacity = (1 - cdist / CURSOR_DIST) * 0.45;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(124,58,237,${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      // — Draw cursor node —
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(124,58,237,0.7)";
      ctx.fill();
      // Cursor pulse ring
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(124,58,237,0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
