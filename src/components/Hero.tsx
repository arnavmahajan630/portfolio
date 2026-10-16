"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Terminal,
  Download,
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill mb-6 border border-cyan-500/30 shadow-[0_0_20px_rgba(0,242,254,0.15)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-xs font-mono text-cyan-200 tracking-wide">
            {personalData.status.text}
          </span>
        </motion.div>

        {/* Main Title & Role */}
        <div className="space-y-4 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
          >
            <span className="text-white">Hi, I&apos;m </span>
            <span className="text-hologram inline-block">{personalData.name}</span>
          </motion.h1>

          {/* Dynamic Animated Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-10 sm:h-12 flex items-center"
          >
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-lg sm:text-2xl text-slate-300 font-mono flex items-center gap-2"
            >
              <span className="text-cyan-400 font-bold">&gt;</span>
              <span>{roles[roleIndex]}</span>
            </motion.p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl pt-2"
          >
            Third-year Computer Engineering student at{" "}
            <span className="text-white font-medium">KJ Somaiya</span>. Specialized in building
            fault-tolerant distributed architectures, high-concurrency microservices in Go, and robust cloud
            infrastructure.
          </motion.p>
        </div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center gap-3.5 pt-8"
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-sm tracking-wide shadow-[0_0_25px_rgba(0,242,254,0.35)] hover:shadow-[0_0_35px_rgba(0,242,254,0.55)] transition-all flex items-center gap-2 group"
          >
            <span>Explore Systems</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>

          <a
            href="/resume.pdf"
            download="Arnav_Mahajan_Resume.pdf"
            className="px-5 py-3 rounded-xl glass-panel text-slate-200 hover:text-white border border-white/10 hover:border-cyan-500/40 text-sm font-medium transition-all flex items-center gap-2 shadow-lg"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Download Resume</span>
          </a>

          <button
            onClick={onOpenTerminal}
            className="px-4 py-3 rounded-xl glass-panel text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/30 text-sm font-mono transition-all flex items-center gap-2"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>CLI HUD</span>
          </button>

          {/* Social Links */}
          <div className="flex items-center gap-2 pl-2">
            <a
              href={personalData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl glass-panel text-slate-400 hover:text-white hover:border-white/20 transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={personalData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl glass-panel text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30 transition-all"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={personalData.socials.email}
              className="p-3 rounded-xl glass-panel text-slate-400 hover:text-violet-300 hover:border-violet-500/30 transition-all"
              aria-label="Email Me"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Key Metrics 3D Bento Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-14"
        >
          {personalData.metrics.map((metric, i) => (
            <Card3D key={metric.label} glowColor={i === 0 ? "cyan" : i === 1 ? "violet" : i === 2 ? "emerald" : "amber"}>
              <div className="p-4 sm:p-5 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-slate-400 tracking-wider uppercase">
                    {metric.label}
                  </span>
                  {i === 0 && <Cpu className="w-4 h-4 text-cyan-400" />}
                  {i === 1 && <Zap className="w-4 h-4 text-violet-400" />}
                  {i === 2 && <Layers className="w-4 h-4 text-emerald-400" />}
                  {i === 3 && <Sparkles className="w-4 h-4 text-amber-400" />}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                  {metric.value}
                </div>
                <p className="text-xs text-slate-400 mt-1 font-sans">
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
