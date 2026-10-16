"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "amber" | "lime" | "ok" | "bone" | "rule";
  tiltMax?: number;
}

export default function Card3D({
  children,
  className = "",
  glowColor = "amber",
  tiltMax = 7,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 260, damping: 26 });
  const mouseY = useSpring(y, { stiffness: 260, damping: 26 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [tiltMax, -tiltMax]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-tiltMax, tiltMax]);

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

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const glowStyles = {
    amber: "hover:border-[var(--amber)]/50 hover:shadow-[0_0_30px_rgba(255,90,31,0.18)]",
    lime: "hover:border-[var(--ok)]/50 hover:shadow-[0_0_30px_rgba(183,227,90,0.18)]",
    ok: "hover:border-[var(--ok)]/50 hover:shadow-[0_0_30px_rgba(183,227,90,0.18)]",
    bone: "hover:border-[var(--bone)]/40 hover:shadow-[0_0_30px_rgba(236,230,211,0.1)]",
    rule: "hover:border-[var(--bone-dim)]/40",
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
      className={`relative rounded-xl bg-[var(--ink-2)] border border-[var(--rule)] transition-colors duration-250 ${glowStyles[glowColor]} ${className}`}
    >
      {/* Specular Warm Glare */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 260px at ${shinePos.x}% ${shinePos.y}%, rgba(236, 230, 211, 0.06), transparent 70%)`,
          }}
        />
      )}

      {/* Card Content */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
