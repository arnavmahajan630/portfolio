"use client";

import React from "react";
import { GraduationCap, Code2, Server, Sparkles, Terminal } from "lucide-react";
import { personalData } from "@/data/personal";
import Card3D from "./Card3D";

export default function About() {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono text-cyan-300 mb-3">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>01 // BACKGROUND & PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering for <span className="text-gradient-cyan">Resilience & Scale</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base mt-2">
            A deep-dive into how I approach concurrent backend architecture, distributed telemetry, and algorithmic problem solving.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Main Narrative Card */}
          <div className="md:col-span-8">
            <Card3D glowColor="cyan" className="h-full">
              <div className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex items-center gap-3 text-cyan-400 mb-4">
                    <Server className="w-5 h-5" />
                    <span className="text-xs font-mono tracking-wider uppercase text-cyan-300">
                      Systems Engineering Core
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    Obsessed with high-throughput concurrent backends and rock-solid reliability.
                  </h3>
                  <div className="space-y-3.5 text-slate-300 text-sm leading-relaxed">
                    <p>
                      I am a third-year Computer Engineering undergraduate at{" "}
                      <span className="text-white font-medium">KJ Somaiya College of Engineering</span>{" "}
                      (Expected 2028, <span className="text-cyan-300 font-mono">8.68 CGPA</span>) specializing in
                      distributed systems, backend infrastructure, and cloud architecture.
                    </p>
                    <p>
                      My production experience spans developing high-concurrency event-driven services in{" "}
                      <span className="text-white font-mono">Go</span>, orchestrating cloud infrastructure with{" "}
                      <span className="text-white font-mono">AWS (EC2, RDS, S3, ECR)</span>, and scaling relational
                      databases through table partitioning to achieve over{" "}
                      <span className="text-cyan-300 font-semibold">2,000+ QPS</span> with sub-millisecond latencies.
                    </p>
                    <p>
                      Whether building air-gapped log normalization pipelines processing{" "}
                      <span className="text-emerald-400 font-semibold">300K+ events/sec</span> or contributing CLI
                      enhancements to CNCF&apos;s <span className="text-white font-semibold">Meshery</span>, I focus on
                      byte-level provenance, zero silent failures, and deterministic performance.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
                  {["Distributed Systems", "Concurrency", "Kafka & ClickHouse", "PostgreSQL", "Go", "AWS"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
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
            <Card3D glowColor="violet">
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-violet-400">
                  <GraduationCap className="w-5 h-5" />
                  <span className="text-xs font-mono uppercase tracking-wider text-violet-300">
                    Education
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    {personalData.education.institution}
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {personalData.education.degree}
                  </p>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    {personalData.education.location} • {personalData.education.expectedGraduation}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                  <span>Cumulative CGPA: {personalData.education.cgpa}</span>
                </div>
              </div>
            </Card3D>

            {/* Algorithmic Rigor Card */}
            <Card3D glowColor="emerald" className="flex-1">
              <div className="p-6 space-y-3 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 mb-2">
                    <Code2 className="w-5 h-5" />
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-300">
                      Algorithmic Rigor
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    1,600+ Problems & Active CP
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    Strong grasp on low-level memory layout, dynamic programming, and graph algorithms. Active
                    Codeforces Pupil and competitive programmer.
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between text-xs font-mono text-emerald-400">
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
