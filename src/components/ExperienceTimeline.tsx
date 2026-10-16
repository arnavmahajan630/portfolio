"use client";

import React, { useState } from "react";
import { Calendar, MapPin, CheckCircle2, Terminal } from "lucide-react";
import { experiences } from "@/data/experience";
import Card3D from "./Card3D";

export default function ExperienceTimeline() {
  const [selectedExp, setSelectedExp] = useState<string>(experiences[0].id);

  return (
    <section id="experience" className="relative py-24 px-4 sm:px-8 border-t border-[var(--rule)]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--ink-2)] border border-[var(--rule)] text-xs font-mono text-[var(--bone-dim)] mb-3">
            <Terminal className="w-3.5 h-3.5 text-[var(--amber)]" />
            <span>02 // EXPERIENCE &amp; TRACK RECORD</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-normal text-[var(--bone)] tracking-tight">
            Production <em className="italic text-[var(--amber)]">Work &amp; Impact</em>
          </h2>
          <p className="text-[var(--bone-dim)] max-w-2xl text-xs sm:text-sm mt-2 font-mono">
            Hands-on production backend engineering, high-throughput queue platforms, and CNCF open source contributions.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical rule line */}
          <div className="hidden md:block absolute left-8 top-6 bottom-6 w-[1px] bg-[var(--rule)]" />

          <div className="space-y-8">
            {experiences.map((exp, index) => {
              const isSelected = selectedExp === exp.id;
              return (
                <div key={exp.id} className="relative md:pl-20">
                  {/* Timeline Node */}
                  <div className="hidden md:flex absolute left-4 top-6 -translate-x-1/2 w-8 h-8 rounded-full bg-[var(--ink)] border border-[var(--rule)] items-center justify-center z-10">
                    <span className={`w-2 h-2 rounded-full ${index === 0 ? "bg-[var(--amber)] animate-pulse" : "bg-[var(--bone-dim)]"}`} />
                  </div>

                  <Card3D
                    glowColor={index === 0 ? "amber" : "bone"}
                    className={`cursor-pointer transition-all ${
                      isSelected ? "border-[var(--amber)]/50 shadow-[0_0_25px_rgba(255,90,31,0.12)]" : ""
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
                            <h3 className="font-display text-2xl sm:text-3xl font-normal text-[var(--bone)] group-hover:text-[var(--amber)] transition-colors">
                              {exp.role}
                            </h3>
                            {exp.badge && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--ink-3)] text-[var(--amber)] border border-[var(--rule)]">
                                {exp.badge}
                              </span>
                            )}
                            {exp.current && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--ok)]/15 text-[var(--ok)] border border-[var(--ok)]/30 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--ok)] animate-ping" />
                                Present
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm font-mono text-[var(--bone)] mt-1 font-semibold">
                            {exp.company}
                          </p>
                        </div>

                        {/* Meta: Period & Location */}
                        <div className="flex flex-wrap sm:flex-col sm:items-end gap-1.5 text-xs font-mono text-[var(--bone-dim)]">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[var(--amber)]" />
                            {exp.period}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      {/* Bullet points description */}
                      <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--bone-dim)] leading-relaxed mb-6 font-mono">
                        {exp.description.map((bullet, bIndex) => (
                          <li key={bIndex} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[var(--amber)] shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Key metrics highlight cards */}
                      {exp.metrics && exp.metrics.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5 p-3.5 rounded-lg bg-[var(--ink-3)] border border-[var(--rule)]">
                          {exp.metrics.map((m) => (
                            <div key={m.label} className="text-left font-mono">
                              <span className="text-[9px] uppercase text-[var(--bone-dim)] block">
                                {m.label}
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-[var(--bone)]">
                                {m.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--rule)]">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-[var(--ink-3)] border border-[var(--rule)] text-[var(--bone-dim)] hover:text-[var(--bone)] hover:border-[var(--bone-dim)] transition-colors"
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
