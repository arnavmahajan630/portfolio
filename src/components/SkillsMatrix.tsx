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
        return <Code2 className="w-5 h-5 text-cyan-400" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-violet-400" />;
      case "Cloud":
        return <Cloud className="w-5 h-5 text-emerald-400" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-amber-400" />;
      default:
        return <Terminal className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono text-cyan-300 mb-3">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>05 // TECHNICAL ARSENAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Core Competencies & <span className="text-gradient-cyan">Stack</span>
          </h2>
          <p className="text-slate-400 max-w-xl text-sm sm:text-base mt-2">
            A breakdown of technologies and engineering disciplines I employ to architect resilient, high-load backends.
          </p>
        </div>

        {/* 2x2 Grid of Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, idx) => (
            <Card3D
              key={category.title}
              glowColor={idx === 0 ? "cyan" : idx === 1 ? "violet" : idx === 2 ? "emerald" : "amber"}
              className="h-full"
            >
              <div className="p-6 sm:p-8 space-y-6">
                {/* Category Header */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    {getIcon(category.iconName)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {category.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {category.subtitle}
                    </p>
                  </div>
                </div>

                {/* Skills Badges / Pills */}
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span className="text-sm font-semibold text-white">
                          {skill.name}
                        </span>
                        {skill.description && (
                          <span className="hidden lg:inline text-xs text-slate-400 font-sans">
                            — {skill.description}
                          </span>
                        )}
                      </div>

                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded self-start sm:self-auto ${
                          skill.level === "Production"
                            ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                            : skill.level === "Advanced"
                            ? "bg-violet-500/10 text-violet-300 border border-violet-500/20"
                            : "bg-white/5 text-slate-400 border border-white/10"
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
