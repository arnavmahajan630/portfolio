"use client";

import React from "react";
import {
  Code2,
  Cpu,
  Cloud,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { skillCategories } from "@/data/skills";
import Card3D from "./Card3D";

export default function SkillsMatrix() {
  const getIcon = (name: string) => {
    switch (name) {
      case "Code2":
        return <Code2 className="w-5 h-5 text-[var(--amber)]" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-[var(--ok)]" />;
      case "Cloud":
        return <Cloud className="w-5 h-5 text-[var(--bone)]" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-[var(--amber)]" />;
      default:
        return <Terminal className="w-5 h-5 text-[var(--amber)]" />;
    }
  };

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-8 border-t border-[var(--rule)]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--ink-2)] border border-[var(--rule)] text-xs font-mono text-[var(--bone-dim)] mb-3">
            <Terminal className="w-3.5 h-3.5 text-[var(--amber)]" />
            <span>05 // TECHNICAL ARSENAL</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-normal text-[var(--bone)] tracking-tight">
            Core Competencies &amp; <em className="italic text-[var(--amber)]">Stack</em>
          </h2>
          <p className="text-[var(--bone-dim)] max-w-xl text-xs sm:text-sm mt-2 font-mono">
            A breakdown of technologies and engineering disciplines I employ to architect resilient, high-load backends.
          </p>
        </div>

        {/* 2x2 Grid of Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, idx) => (
            <Card3D
              key={category.title}
              glowColor={idx === 0 ? "amber" : idx === 1 ? "lime" : idx === 3 ? "amber" : "bone"}
              className="h-full"
            >
              <div className="p-6 sm:p-8 space-y-6">
                {/* Category Header */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--ink-3)] border border-[var(--rule)] flex items-center justify-center shrink-0">
                    {getIcon(category.iconName)}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-normal text-[var(--bone)]">
                      {category.title}
                    </h3>
                    <p className="text-xs text-[var(--bone-dim)] mt-0.5 font-mono">
                      {category.subtitle}
                    </p>
                  </div>
                </div>

                {/* Skills Badges / Pills */}
                <div className="space-y-2.5 font-mono">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-lg bg-[var(--ink-3)] border border-[var(--rule)] hover:border-[var(--bone-dim)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-1.5"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            skill.highlight
                              ? "bg-[var(--amber)] shadow-[0_0_6px_rgba(255,90,31,0.5)]"
                              : "bg-[var(--bone-dim)]/40"
                          }`}
                        />
                        <span className="text-xs sm:text-sm font-semibold text-[var(--bone)] shrink-0">
                          {skill.name}
                        </span>
                        {skill.description && (
                          <span className="hidden lg:inline text-[11px] text-[var(--bone-dim)] truncate">
                            — {skill.description}
                          </span>
                        )}
                      </div>

                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded self-start sm:self-auto uppercase tracking-wider shrink-0 ${
                          skill.level === "Production"
                            ? "bg-[var(--ink-2)] text-[var(--amber)] border border-[var(--rule)]"
                            : skill.level === "Advanced"
                            ? "bg-[var(--ink-2)] text-[var(--ok)] border border-[var(--rule)]"
                            : "bg-[var(--ink-2)] text-[var(--bone-dim)] border border-[var(--rule)]"
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
}
