import React from "react";

export default function DotBorderButton({ children, onClick, className = "" }) {
  return (
    <a
      href="#demo"
      onClick={onClick}
      className={`dbb-wrapper ${className}`}
      style={{
        "--dot-size": "7px",
        "--line-weight": "1px",
        "--line-distance": "0.6rem 0.8rem",
        "--animation-speed": "0.35s",
        "--dot-color": "rgba(255,255,255,0.8)",
        "--line-color": "rgba(255,255,255,0.6)",
        "--grid-color": "rgba(124,58,237,0.4)",
        position: "relative",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        width: "auto",
        height: "auto",
        padding: "var(--line-distance)",
        backgroundColor: "transparent",
        userSelect: "none",
        textDecoration: "none",
      }}
    >
      <style>{`
        .dbb-wrapper::after {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          border-radius: inherit;
          pointer-events: none;
          background-color: transparent;
          background-image: repeating-linear-gradient(
            45deg, var(--grid-color) 0 1px, transparent 2px 5px
          );
          opacity: 0;
          z-index: -1;
        }
        .dbb-wrapper:has(.dbb-btn:hover)::after {
          animation: dbb-opacity var(--animation-speed) ease-in-out forwards;
          animation-duration: calc(var(--animation-speed) * 4);
        }
        @keyframes dbb-opacity {
          80% { opacity: 0; }
          100% { opacity: 1; }
        }
        .dbb-btn {
          position: relative;
          display: flex;
          align-items: center;
          padding: 14px 28px;
          background: #7c3aed;
          border: 1px solid rgba(124,58,237,0.6);
          color: white;
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.04em;
          border-radius: 6px;
          cursor: pointer;
          transition: transform 0.2s ease, letter-spacing 0.2s ease,
                      background 0.2s ease, box-shadow 0.2s ease;
          text-transform: uppercase;
          gap: 8px;
        }
        .dbb-btn:hover {
          background: #6d28d9;
          transform: scale(1.04);
          letter-spacing: 0.07em;
          box-shadow: 0 0 40px rgba(124,58,237,0.5);
        }
        .dbb-btn:active {
          transform: scale(0.97);
        }
        .dbb-dot {
          position: absolute;
          width: var(--dot-size);
          aspect-ratio: 1;
          border-radius: 2px;
          background: var(--dot-color);
          opacity: 0;
          transition: all 0.3s ease;
        }
        .dbb-wrapper:has(.dbb-btn:hover) .dbb-dot.tl {
          animation: dbb-tl var(--animation-speed) ease forwards;
        }
        @keyframes dbb-tl {
          from { top: 50%; left: 20%; opacity: 0; }
          to { top: calc(var(--dot-size) * -0.5); left: calc(var(--dot-size) * -0.5); opacity: 1; }
        }
        .dbb-wrapper:has(.dbb-btn:hover) .dbb-dot.tr {
          animation: dbb-tr var(--animation-speed) ease forwards;
          animation-delay: calc(var(--animation-speed) * 0.6);
        }
        @keyframes dbb-tr {
          from { top: 50%; right: 20%; opacity: 0; }
          to { top: calc(var(--dot-size) * -0.5); right: calc(var(--dot-size) * -0.5); opacity: 1; }
        }
        .dbb-wrapper:has(.dbb-btn:hover) .dbb-dot.br {
          animation: dbb-br var(--animation-speed) ease forwards;
          animation-delay: calc(var(--animation-speed) * 1.2);
        }
        @keyframes dbb-br {
          from { bottom: 50%; right: 20%; opacity: 0; }
          to { bottom: calc(var(--dot-size) * -0.5); right: calc(var(--dot-size) * -0.5); opacity: 1; }
        }
        .dbb-wrapper:has(.dbb-btn:hover) .dbb-dot.bl {
          animation: dbb-bl var(--animation-speed) ease forwards;
          animation-delay: calc(var(--animation-speed) * 1.8);
        }
        @keyframes dbb-bl {
          from { bottom: 50%; left: 20%; opacity: 0; }
          to { bottom: calc(var(--dot-size) * -0.5); left: calc(var(--dot-size) * -0.5); opacity: 1; }
        }
        .dbb-line { position: absolute; transition: all 0.3s ease; }
        .dbb-line.h { height: var(--line-weight); width: 100%;
          background-image: repeating-linear-gradient(90deg,
            transparent 0 calc(var(--line-weight)*2),
            var(--line-color) calc(var(--line-weight)*2) calc(var(--line-weight)*4)); }
        .dbb-line.v { width: var(--line-weight); height: 100%;
          background-image: repeating-linear-gradient(0deg,
            transparent 0 calc(var(--line-weight)*2),
            var(--line-color) calc(var(--line-weight)*2) calc(var(--line-weight)*4)); }
        .dbb-line.top { top: calc(var(--line-weight)*-0.5); transform-origin: top left; transform: rotate(5deg) scaleX(0); }
        .dbb-wrapper:has(.dbb-btn:hover) .dbb-line.top {
          animation: dbb-draw-h 0.35s ease forwards; animation-delay: 0.28s; }
        .dbb-line.bot { bottom: calc(var(--line-weight)*-0.5); transform-origin: bottom right; transform: rotate(5deg) scaleX(0); }
        .dbb-wrapper:has(.dbb-btn:hover) .dbb-line.bot {
          animation: dbb-draw-h 0.35s ease forwards; animation-delay: 0.7s; }
        @keyframes dbb-draw-h { 100% { transform: rotate(0deg) scaleX(1); } }
        .dbb-line.lft { left: calc(var(--line-weight)*-0.5); transform-origin: bottom left; transform: scaleY(0); }
        .dbb-wrapper:has(.dbb-btn:hover) .dbb-line.lft {
          animation: dbb-draw-v 0.35s ease forwards; animation-delay: 0.84s; }
        .dbb-line.rgt { right: calc(var(--line-weight)*-0.5); transform-origin: top right; transform: scaleY(0); }
        .dbb-wrapper:has(.dbb-btn:hover) .dbb-line.rgt {
          animation: dbb-draw-v 0.35s ease forwards; animation-delay: 0.49s; }
        @keyframes dbb-draw-v { 100% { transform: scaleY(1); } }
      `}</style>

      <div className="dbb-line h top" />
      <div className="dbb-line v rgt" />
      <div className="dbb-line h bot" />
      <div className="dbb-line v lft" />
      <div className="dbb-dot tl" />
      <div className="dbb-dot tr" />
      <div className="dbb-dot br" />
      <div className="dbb-dot bl" />

      <button className="dbb-btn">
        {children}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </a>
  );
}
