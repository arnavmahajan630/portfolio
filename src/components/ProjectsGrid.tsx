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
    <section id="projects" className="relative py-24 px-4 sm:px-8 border-t border-[var(--rule)]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--ink-2)] border border-[var(--rule)] text-xs font-mono text-[var(--bone-dim)] mb-3">
              <Terminal className="w-3.5 h-3.5 text-[var(--amber)]" />
              <span>03 // FEATURED ARCHITECTURE &amp; CODE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-normal text-[var(--bone)] tracking-tight">
              Systems &amp; <em className="italic text-[var(--amber)]">Engineering Projects</em>
            </h2>
            <p className="text-[var(--bone-dim)] max-w-xl text-xs sm:text-sm mt-2 font-mono">
              From air-gapped forensic log pipelines with Merkle proofs to stealth agent settlement protocols.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-lg bg-[var(--ink-2)] border border-[var(--rule)] font-mono">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded text-xs transition-all ${
                  selectedCategory === cat
                    ? "bg-[var(--amber)] text-black font-semibold shadow-sm"
                    : "text-[var(--bone-dim)] hover:text-[var(--bone)]"
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
                  glowColor={isVeyra ? "amber" : project.category === "AI Systems" ? "bone" : "lime"}
                  className="h-full flex flex-col justify-between"
                >
                  <div className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                    <div>
                      {/* Top Bar: Badges & Quick Action Links */}
                      <div className="flex items-center justify-between gap-3 mb-4 font-mono">
                        <div className="flex items-center gap-2 flex-wrap">
                          {isVeyra && (
                            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-[var(--amber)]/10 text-[var(--amber)] border border-[var(--amber)]/30 font-semibold tracking-wider flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--amber)] animate-pulse" />
                              FLAGSHIP SYSTEM
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--ink-3)] border border-[var(--rule)] text-[var(--bone-dim)]">
                            {project.category}
                          </span>
                          <span className="text-[11px] font-mono text-[var(--bone-dim)] opacity-75">
                            {project.year}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg text-[var(--bone-dim)] hover:text-[var(--bone)] bg-[var(--ink-3)] border border-[var(--rule)] hover:border-[var(--bone-dim)] transition-colors"
                              aria-label={`GitHub repo for ${project.title}`}
                            >
                              <GithubIcon className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <button
                            onClick={() => setActiveModalProject(project)}
                            className="p-2 rounded-lg text-[var(--bone-dim)] hover:text-[var(--amber)] bg-[var(--ink-3)] border border-[var(--rule)] hover:border-[var(--amber)]/40 transition-colors"
                            title="Inspect Architecture"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Title & Tagline */}
                      <h3
                        onClick={() => setActiveModalProject(project)}
                        className="font-display text-2xl sm:text-3xl font-normal text-[var(--bone)] hover:text-[var(--amber)] transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--bone-dim)] mt-2 leading-relaxed max-w-3xl font-mono">
                        {project.tagline}
                      </p>

                      {/* Key Performance Metrics Bar */}
                      <div
                        className={`grid gap-3 my-5 p-3.5 rounded-lg bg-[var(--ink-3)] border border-[var(--rule)] ${
                          isVeyra
                            ? "grid-cols-2 sm:grid-cols-4"
                            : "grid-cols-2 sm:grid-cols-3"
                        }`}
                      >
                        {project.metrics.map((m) => (
                          <div key={m.label} className="text-left font-mono">
                            <span className="text-[9px] uppercase text-[var(--bone-dim)] block tracking-wider">
                              {m.label}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-[var(--amber)]">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Bullet Highlights: For Veyra, show ALL 4 points in a spacious 2-column layout */}
                      <div className="space-y-3 font-mono">
                        <div className="text-[10px] uppercase tracking-wider text-[var(--bone-dim)]">
                          {isVeyra ? "Engineering Implementation & Benchmarks" : "Key Technical Highlights"}
                        </div>
                        <ul
                          className={`text-xs text-[var(--bone-dim)] leading-relaxed ${
                            isVeyra
                              ? "grid grid-cols-1 md:grid-cols-2 gap-3"
                              : "space-y-2.5"
                          }`}
                        >
                          {project.highlights.map((h, hIdx) => (
                            <li
                              key={hIdx}
                              className={`flex items-start gap-2.5 p-3 rounded-lg ${
                                isVeyra
                                  ? "bg-[var(--ink-3)] border border-[var(--rule)] hover:border-[var(--bone-dim)] transition-colors"
                                  : ""
                              }`}
                            >
                              <span className="px-1.5 py-0.2 rounded text-[10px] bg-[var(--ink-2)] text-[var(--amber)] border border-[var(--rule)] shrink-0 mt-0.5 font-bold">
                                {String(hIdx + 1).padStart(2, "0")}
                              </span>
                              <span className="text-[var(--bone)]">{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Architecture Pipeline Banner for Veyra */}
                      {isVeyra && project.architectureDetails && (
                        <div className="mt-5 p-3.5 rounded-lg bg-[var(--ink-3)] border border-[var(--rule)] font-mono text-xs text-[var(--bone)]">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[var(--ok)] font-semibold uppercase text-[9px] tracking-widest px-2 py-0.5 rounded bg-[var(--ink-2)] border border-[var(--rule)]">
                              Pipeline Topology
                            </span>
                          </div>
                          <p className="leading-relaxed text-[var(--bone-dim)] text-[11px]">
                            {project.architectureDetails}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Tech Badges */}
                    <div className="pt-4 border-t border-[var(--rule)] flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--ink-3)] border border-[var(--rule)] text-[var(--bone-dim)] hover:text-[var(--bone)] transition-colors"
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
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[var(--ink-2)] rounded-xl p-6 sm:p-8 border border-[var(--rule)] shadow-2xl font-mono"
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-2.5 py-0.5 rounded text-[10px] bg-[var(--ink-3)] text-[var(--amber)] border border-[var(--rule)]">
                  {activeModalProject.category} • {activeModalProject.year}
                </span>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-2.5 py-1 text-xs text-[var(--bone-dim)] hover:text-[var(--bone)] rounded bg-[var(--ink-3)] border border-[var(--rule)]"
                >
                  ✕ Close
                </button>
              </div>

              <h3 className="font-display text-3xl font-normal text-[var(--bone)] mb-2">
                {activeModalProject.title}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--bone-dim)] mb-6 leading-relaxed">
                {activeModalProject.tagline}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-3.5 rounded-lg bg-[var(--ink-3)] border border-[var(--rule)]">
                {activeModalProject.metrics.map((m) => (
                  <div key={m.label}>
                    <span className="text-[9px] uppercase text-[var(--bone-dim)] block">
                      {m.label}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[var(--amber)]">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="space-y-4 mb-6">
                <h4 className="text-[10px] uppercase tracking-wider text-[var(--bone-dim)]">
                  Engineering Deep Dive
                </h4>
                <div className="space-y-3">
                  {activeModalProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[var(--bone)] leading-relaxed">
                      <span className="text-[var(--amber)] font-bold mt-0.5">•</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {activeModalProject.architectureDetails && (
                <div className="p-3.5 rounded-lg bg-[var(--ink-3)] border border-[var(--rule)] mb-6 text-xs text-[var(--bone)]">
                  <div className="text-[9px] text-[var(--ok)] uppercase tracking-widest mb-1.5 font-bold">
                    Pipeline Topology:
                  </div>
                  <p className="text-[var(--bone-dim)] text-[11px] leading-relaxed">
                    {activeModalProject.architectureDetails}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--rule)]">
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--ink-3)] border border-[var(--rule)] hover:border-[var(--amber)]/40 text-[var(--bone)] text-xs font-medium transition-all"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View Repository on GitHub</span>
                  </a>
                )}
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-[var(--bone-dim)] hover:text-[var(--bone)]"
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
