"use client";

import React, { useState } from "react";
import Canvas3D from "@/components/Canvas3D";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ProjectsGrid from "@/components/ProjectsGrid";
import AchievementsSection from "@/components/AchievementsSection";
import SkillsMatrix from "@/components/SkillsMatrix";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import TerminalDrawer from "@/components/TerminalDrawer";
import { Terminal } from "lucide-react";

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#070913] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
      {/* 3D Interactive Particle Constellation Canvas */}
      <Canvas3D />

      {/* Floating Glass Navigation */}
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Hero Section */}
      <Hero onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Background & Systems Philosophy */}
      <About />

      {/* Production Experience Timeline */}
      <ExperienceTimeline />

      {/* Featured Architecture & Projects */}
      <ProjectsGrid />

      {/* Achievements & Milestones (Easily Extensible) */}
      <AchievementsSection />

      {/* Technical Arsenal & Skills Matrix */}
      <SkillsMatrix />

      {/* Connect & Direct Contact */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Interactive Systems Telemetry Terminal Drawer */}
      <TerminalDrawer
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Persistent Floating HUD Button (Bottom Right) */}
      <button
        onClick={() => setTerminalOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 text-cyan-300 shadow-[0_0_25px_rgba(0,242,254,0.25)] hover:shadow-[0_0_35px_rgba(0,242,254,0.5)] hover:scale-105 active:scale-95 transition-all group flex items-center gap-2"
        title="Open Systems Terminal (⌘K)"
      >
        <Terminal className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline font-mono text-xs font-semibold">
          SYSTEM HUD
        </span>
      </button>
    </main>
  );
}
