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
    <main className="relative min-h-screen bg-[var(--ink)] text-[var(--bone)] font-mono selection:bg-[var(--amber)] selection:text-black">
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

      {/* Achievements & Milestones */}
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
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-lg bg-[var(--ink-2)]/90 backdrop-blur-xl border border-[var(--rule)] text-[var(--bone-dim)] shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:border-[var(--amber)] hover:text-[var(--bone)] hover:scale-105 active:scale-95 transition-all group flex items-center gap-2 font-mono text-xs uppercase tracking-wider"
        title="Open Systems Terminal (⌘K)"
      >
        <Terminal className="w-4 h-4 text-[var(--amber)] group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline font-semibold">
          SYSTEM HUD
        </span>
      </button>
    </main>
  );
}
