"use client";

import React, { useState } from "react";
import { Calendar, MapPin, CheckCircle2, Terminal } from "lucide-react";
import { experiences } from "@/data/experience";
import Card3D from "./Card3D";

export default function ExperienceTimeline() {
  const [selectedExp, setSelectedExp] = useState<string>(experiences[0].id);

  return (
    <section id="experience" className="relative py-24 px-4 sm:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono text-cyan-300 mb-3">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>02 // EXPERIENCE & TRACK RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Production <span className="text-gradient-cyan">Work & Impact</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base mt-2">
            Hands-on production backend engineering, high-throughput queue platforms, and CNCF open source contributions.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Glowing central vertical circuit line (desktop) */}
          <div className="hidden md:block absolute left-8 top-6 bottom-6 w-[2px] bg-gradient-to-b from-cyan-500 via-violet-500 to-emerald-500 opacity-30 shadow-[0_0_15px_rgba(0,242,254,0.5)]" />

          <div className="space-y-8">
            {experiences.map((exp, index) => {
              const isSelected = selectedExp === exp.id;
              return (
                <div key={exp.id} className="relative md:pl-20">
                  {/* Timeline Node Icon (Desktop) */}
                  <div className="hidden md:flex absolute left-4 top-6 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0a0e24] border-2 border-cyan-400 items-center justify-center shadow-[0_0_15px_rgba(0,242,254,0.4)] z-10">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  </div>

                  <Card3D
                    glowColor={index === 0 ? "cyan" : index === 1 ? "violet" : "emerald"}
                    className={`cursor-pointer transition-all ${
                      isSelected ? "border-cyan-500/40 shadow-[0_0_25px_rgba(0,242,254,0.15)]" : ""
                    }`}
                  >
                    <div
                      onClick={() => setSelectedExp(exp.id)}
                      className="p-6 sm:p-8"
                    >
                      {/* Top Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                              {exp.role}
                            </h3>
                            {exp.badge && (
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                                {exp.badge}
                              </span>
                            )}
                            {exp.current && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                Present
                              </span>
                            )}
                          </div>
                          <p className="text-base font-semibold text-slate-300 mt-0.5">
                            {exp.company}
                          </p>
                        </div>

                        {/* Meta: Period & Location */}
                        <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs font-mono text-slate-400">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                            {exp.period}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      {/* Bullet points description */}
                      <ul className="space-y-2.5 text-sm text-slate-300 leading-relaxed mb-6">
                        {exp.description.map((bullet, bIndex) => (
                          <li key={bIndex} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Key metrics highlight cards if present */}
                      {exp.metrics && exp.metrics.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                          {exp.metrics.map((m) => (
                            <div key={m.label} className="text-left">
                              <span className="text-[10px] font-mono uppercase text-slate-400 block">
                                {m.label}
                              </span>
                              <span className="text-sm font-bold text-white font-mono">
                                {m.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
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
      </div>
    </section>
  );
}
