"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "violet" | "emerald" | "amber";
  tiltMax?: number;
}

export default function Card3D({
  children,
  className = "",
  glowColor = "cyan",
  tiltMax = 8,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for buttery smooth interpolation
  const mouseX = useSpring(x, { stiffness: 250, damping: 25 });
  const mouseY = useSpring(y, { stiffness: 250, damping: 25 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [tiltMax, -tiltMax]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-tiltMax, tiltMax]);

  // Specular shine coordinates
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseFromCenterX = (e.clientX - rect.left) / width - 0.5;
    const mouseFromCenterY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseFromCenterX);
    y.set(mouseFromCenterY);

    setShinePos({
      x: ((e.clientX - rect.left) / width) * 100,
      y: ((e.clientY - rect.top) / height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const glowStyles = {
    cyan: "hover:border-cyan-500/40 hover:shadow-[0_0_35px_rgba(0,242,254,0.15)]",
    violet: "hover:border-violet-500/40 hover:shadow-[0_0_35px_rgba(139,92,246,0.15)]",
    emerald: "hover:border-emerald-500/40 hover:shadow-[0_0_35px_rgba(16,185,129,0.15)]",
    amber: "hover:border-amber-500/40 hover:shadow-[0_0_35px_rgba(245,158,11,0.15)]",
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-2xl glass-panel transition-colors duration-300 ${glowStyles[glowColor]} ${className}`}
    >
      {/* Specular Holographic Glare */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 280px at ${shinePos.x}% ${shinePos.y}%, rgba(255, 255, 255, 0.08), transparent 70%)`,
          }}
        />
      )}

      {/* Subtle border highlight */}
      <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none" />

      {/* Card Content with depth */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
