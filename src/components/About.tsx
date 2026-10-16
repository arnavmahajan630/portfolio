"use client";

import React from "react";
import { GraduationCap, Code2, Server, Sparkles, Terminal } from "lucide-react";
import { personalData } from "@/data/personal";
import Card3D from "./Card3D";

export default function About() {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-8 border-t border-[var(--rule)]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--ink-2)] border border-[var(--rule)] text-xs font-mono text-[var(--bone-dim)] mb-3">
            <Terminal className="w-3.5 h-3.5 text-[var(--amber)]" />
            <span>01 // BACKGROUND &amp; PHILOSOPHY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-normal text-[var(--bone)] tracking-tight">
            Engineering for <em className="italic text-[var(--amber)]">Resilience &amp; Scale</em>
          </h2>
          <p className="text-[var(--bone-dim)] max-w-2xl text-xs sm:text-sm mt-2 font-mono">
            A deep-dive into concurrent backend architecture, distributed telemetry, and algorithmic problem solving.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Main Narrative Card */}
          <div className="md:col-span-8">
            <Card3D glowColor="amber" className="h-full">
              <div className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex items-center gap-2.5 text-[var(--amber)] mb-4">
                    <Server className="w-4 h-4" />
                    <span className="text-[11px] font-mono tracking-wider uppercase">
                      Systems Engineering Core
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-normal text-[var(--bone)] mb-3 leading-snug">
                    Obsessed with high-throughput concurrent backends and rock-solid reliability.
                  </h3>
                  <div className="space-y-3.5 text-[var(--bone-dim)] text-xs sm:text-sm leading-relaxed font-mono">
                    <p>
                      I am a third-year Computer Engineering undergraduate at{" "}
                      <span className="text-[var(--bone)] font-semibold">KJ Somaiya College of Engineering</span>{" "}
                      (Expected 2028, <span className="text-[var(--amber)] font-bold">8.68 CGPA</span>) specializing in
                      distributed systems, backend infrastructure, and cloud architecture.
                    </p>
                    <p>
                      My production experience spans developing high-concurrency event-driven services in{" "}
                      <span className="text-[var(--bone)]">Go</span>, orchestrating cloud infrastructure with{" "}
                      <span className="text-[var(--bone)]">AWS (EC2, RDS, S3, ECR)</span>, and scaling relational
                      databases through table partitioning to achieve over{" "}
                      <span className="text-[var(--ok)] font-semibold">2,000+ QPS</span> with sub-millisecond latencies.
                    </p>
                    <p>
                      Whether building air-gapped log normalization pipelines processing{" "}
                      <span className="text-[var(--amber)] font-semibold">300K+ events/sec</span> or contributing CLI
                      enhancements to CNCF&apos;s <span className="text-[var(--bone)] font-semibold">Meshery</span>, I focus on
                      byte-level provenance, zero silent failures, and deterministic performance.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--rule)] flex flex-wrap items-center gap-2">
                  {["Distributed Systems", "Concurrency", "Kafka & ClickHouse", "PostgreSQL", "Go", "AWS"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded bg-[var(--ink-3)] border border-[var(--rule)] text-[11px] font-mono text-[var(--bone-dim)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card3D>
          </div>

          {/* Education & Algorithmic Rigor */}
          <div className="md:col-span-4 flex flex-col gap-5">
            {/* Education Card */}
            <Card3D glowColor="bone">
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-[var(--bone)]">
                  <GraduationCap className="w-4 h-4 text-[var(--amber)]" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--bone-dim)]">
                    Education
                  </span>
                </div>
                <div>
                  <h4 className="font-display text-xl font-normal text-[var(--bone)]">
                    {personalData.education.institution}
                  </h4>
                  <p className="text-xs text-[var(--bone-dim)] mt-0.5 font-mono">
                    {personalData.education.degree}
                  </p>
                  <p className="text-[11px] text-[var(--bone-dim)] font-mono mt-1 opacity-75">
                    {personalData.education.location} • {personalData.education.expectedGraduation}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[var(--ink-3)] border border-[var(--rule)] text-[var(--amber)] text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Cumulative CGPA: {personalData.education.cgpa}</span>
                </div>
              </div>
            </Card3D>

            {/* Algorithmic Rigor Card */}
            <Card3D glowColor="lime" className="flex-1">
              <div className="p-6 space-y-3 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 text-[var(--ok)] mb-2">
                    <Code2 className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--bone-dim)]">
                      Algorithmic Rigor
                    </span>
                  </div>
                  <h4 className="font-display text-xl font-normal text-[var(--bone)]">
                    1,600+ Problems &amp; Active CP
                  </h4>
                  <p className="text-xs text-[var(--bone-dim)] leading-relaxed mt-1 font-mono">
                    Deep mastery of algorithmic optimization, graph algorithms, and DP. Active Codeforces Pupil.
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between text-xs font-mono text-[var(--ok)]">
                  <span>Codeforces Pupil</span>
                  <span>2x Hackathons Won</span>
                </div>
              </div>
            </Card3D>
          </div>
        </div>
      </div>
    </section>
  );
}
