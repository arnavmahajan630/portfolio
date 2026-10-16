"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ArrowUpRight } from "lucide-react";
import { projects, ProjectItem } from "@/data/projects";
import Card3D from "./Card3D";
import { GithubIcon } from "./Icons";

export default function ProjectsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const categories = [
    "All",
    "Distributed Systems",
    "AI Systems",
    "Web3 & Security",
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono text-cyan-300 mb-3">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>03 // FEATURED ARCHITECTURE & CODE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Systems & <span className="text-gradient-cyan">Engineering Projects</span>
            </h2>
            <p className="text-slate-400 max-w-xl text-sm sm:text-base mt-2">
              From air-gapped forensic log pipelines with Merkle proofs to stealth agent settlement protocols.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl glass-panel border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,242,254,0.15)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid: Veyra spans full width (col-span-2) as flagship, others form a 2x2 grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const isVeyra = project.id === "veyra-ulpf";

            return (
              <div
                key={project.id}
                className={isVeyra ? "lg:col-span-2" : "col-span-1"}
              >
                <Card3D
                  glowColor={
                    project.category === "Distributed Systems"
                      ? "cyan"
                      : project.category === "AI Systems"
                      ? "violet"
                      : "emerald"
                  }
                  className="h-full flex flex-col justify-between"
                >
                  <div className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                    <div>
                      {/* Top Bar: Badges & Quick Action Links */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          {isVeyra && (
                            <span className="px-3 py-0.5 rounded-full text-[11px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold tracking-wider flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                              FLAGSHIP SYSTEM
                            </span>
                          )}
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300">
                            {project.category}
                          </span>
                          <span className="text-xs font-mono text-slate-500">
                            {project.year}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                              aria-label={`GitHub repo for ${project.title}`}
                            >
                              <GithubIcon className="w-4 h-4" />
                            </a>
                          )}
                          <button
                            onClick={() => setActiveModalProject(project)}
                            className="p-2 rounded-xl text-slate-400 hover:text-cyan-300 bg-white/5 hover:bg-white/10 transition-colors"
                            title="Inspect Architecture"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Title & Tagline */}
                      <h3
                        onClick={() => setActiveModalProject(project)}
                        className="text-2xl sm:text-3xl font-extrabold text-white hover:text-cyan-300 transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed max-w-3xl">
                        {project.tagline}
                      </p>

                      {/* Key Performance Metrics Bar */}
                      <div
                        className={`grid gap-3 my-5 p-4 rounded-xl bg-white/[0.03] border border-white/5 ${
                          isVeyra
                            ? "grid-cols-2 sm:grid-cols-4"
                            : "grid-cols-2 sm:grid-cols-3"
                        }`}
                      >
                        {project.metrics.map((m) => (
                          <div key={m.label} className="text-left">
                            <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">
                              {m.label}
                            </span>
                            <span className="text-sm sm:text-base font-extrabold text-cyan-300 font-mono">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Bullet Highlights: For Veyra, show ALL 4 points in a spacious 2-column layout */}
                      <div className="space-y-3">
                        <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                          {isVeyra ? "Engineering Implementation & Benchmarks" : "Key Technical Highlights"}
                        </div>
                        <ul
                          className={`text-xs sm:text-sm text-slate-300 leading-relaxed ${
                            isVeyra
                              ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                              : "space-y-2.5"
                          }`}
                        >
                          {project.highlights.map((h, hIdx) => (
                            <li
                              key={hIdx}
                              className={`flex items-start gap-3 p-3 rounded-xl ${
                                isVeyra
                                  ? "bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 transition-colors"
                                  : ""
                              }`}
                            >
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0 mt-0.5 font-bold">
                                {String(hIdx + 1).padStart(2, "0")}
                              </span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Architecture Pipeline Banner for Veyra */}
                      {isVeyra && project.architectureDetails && (
                        <div className="mt-5 p-4 rounded-xl bg-slate-950/80 border border-cyan-500/25 font-mono text-xs text-cyan-200">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-cyan-400 font-bold uppercase text-[10px] tracking-widest px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                              Data Pipeline Topology
                            </span>
                          </div>
                          <p className="leading-relaxed text-slate-300 text-[11px] sm:text-xs">
                            {project.architectureDetails}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Tech Badges */}
                    <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card3D>
              </div>
            );
          })}
        </div>
      </div>

      {/* Architecture Deep Dive Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl"
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {activeModalProject.category} • {activeModalProject.year}
                </span>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-2.5 py-1 text-xs font-mono text-slate-400 hover:text-white rounded-lg bg-white/5"
                >
                  ✕ Close
                </button>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                {activeModalProject.title}
              </h3>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                {activeModalProject.tagline}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                {activeModalProject.metrics.map((m) => (
                  <div key={m.label}>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      {m.label}
                    </span>
                    <span className="text-sm font-bold text-white font-mono">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="space-y-4 mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                  Engineering Deep Dive
                </h4>
                <div className="space-y-3">
                  {activeModalProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <span className="text-cyan-400 font-mono font-bold mt-0.5">•</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {activeModalProject.architectureDetails && (
                <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/20 mb-6 font-mono text-xs text-cyan-200">
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">
                    Data Pipeline Topology:
                  </div>
                  {activeModalProject.architectureDetails}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View Repository on GitHub</span>
                  </a>
                )}
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
