"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Terminal,
  Mail,
  Zap,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";
import { personalData } from "@/data/personal";
import Card3D from "./Card3D";
import { GithubIcon, LinkedinIcon } from "./Icons";

interface HeroProps {
  onOpenTerminal: () => void;
}

export default function Hero({ onOpenTerminal }: HeroProps) {
  const roles = [
    "Backend & Distributed Systems Engineer",
    "High-Throughput Ingestion & Kafka Pipelines",
    "Go • Kubernetes • AWS • PostgreSQL Partitioning",
    "1,600+ Algorithmic Problems Solved",
  ];

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center px-4 sm:px-8">
      <div className="max-w-6xl mx-auto w-full">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--ink-2)] border border-[var(--rule)] mb-6 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--ok)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ok)]"></span>
          </span>
          <span className="text-xs font-mono text-[var(--bone)] tracking-wide">
            {personalData.status.text}
          </span>
        </motion.div>

        {/* Main Title & Role in Instrument Serif */}
        <div className="space-y-4 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[var(--bone)]"
          >
            <span className="text-[var(--bone-dim)]">Hi, I&apos;m </span>
            <em className="text-[var(--bone)] not-italic underline decoration-[var(--amber)] decoration-wavy decoration-1 underline-offset-8">
              {personalData.name}
            </em>
          </motion.h1>

          {/* Dynamic Animated Subtitle in Martian Mono */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-10 sm:h-12 flex items-center"
          >
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="text-base sm:text-xl text-[var(--bone)] font-mono flex items-center gap-2"
            >
              <span className="text-[var(--amber)] font-bold">&gt;</span>
              <span>{roles[roleIndex]}</span>
            </motion.p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xs sm:text-sm text-[var(--bone-dim)] leading-relaxed max-w-2xl pt-2 font-mono"
          >
            Third-year Computer Engineering student at{" "}
            <span className="text-[var(--bone)] font-semibold">KJ Somaiya</span>. Specialized in building
            fault-tolerant distributed architectures, high-concurrency microservices in Go, and robust cloud
            infrastructure.
          </motion.p>
        </div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center gap-3 pt-7 font-mono"
        >
          <a
            href="#projects"
            className="px-5 py-2.5 rounded-lg bg-[var(--amber)] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#ff733f] shadow-[0_0_25px_rgba(255,90,31,0.25)] transition-all flex items-center gap-2 group"
          >
            <span>Explore Systems</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
          </a>


          <button
            onClick={onOpenTerminal}
            className="px-3.5 py-2.5 rounded-lg bg-[var(--ink-2)] border border-[var(--rule)] text-[var(--bone-dim)] hover:text-[var(--bone)] hover:border-[var(--bone-dim)] text-xs transition-all flex items-center gap-2"
          >
            <Terminal className="w-3.5 h-3.5 text-[var(--ok)]" />
            <span>CLI HUD</span>
          </button>

          {/* Social Links */}
          <div className="flex items-center gap-2 pl-1">
            <a
              href={personalData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[var(--ink-2)] border border-[var(--rule)] text-[var(--bone-dim)] hover:text-[var(--bone)] hover:border-[var(--bone-dim)] transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href={personalData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[var(--ink-2)] border border-[var(--rule)] text-[var(--bone-dim)] hover:text-[var(--amber)] hover:border-[var(--amber)]/40 transition-all"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href={personalData.socials.email}
              className="p-2.5 rounded-lg bg-[var(--ink-2)] border border-[var(--rule)] text-[var(--bone-dim)] hover:text-[var(--ok)] hover:border-[var(--ok)]/40 transition-all"
              aria-label="Email Me"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Key Metrics Strip with Instrument Serif Numbers */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12"
        >
          {personalData.metrics.map((metric, i) => (
            <Card3D key={metric.label} glowColor={i === 0 ? "amber" : i === 1 ? "lime" : i === 2 ? "amber" : "bone"}>
              <div className="p-4 sm:p-5 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-[var(--bone-dim)] tracking-wider uppercase">
                    {metric.label}
                  </span>
                  {i === 0 && <Cpu className="w-3.5 h-3.5 text-[var(--amber)]" />}
                  {i === 1 && <Zap className="w-3.5 h-3.5 text-[var(--ok)]" />}
                  {i === 2 && <Layers className="w-3.5 h-3.5 text-[var(--amber)]" />}
                  {i === 3 && <Sparkles className="w-3.5 h-3.5 text-[var(--bone)]" />}
                </div>
                <div className="font-display text-3xl sm:text-4xl font-normal text-[var(--bone)] tracking-tight">
                  {metric.value}
                </div>
                <p className="text-[11px] text-[var(--bone-dim)] mt-1 font-mono">
                  {metric.description}
                </p>
              </div>
            </Card3D>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
