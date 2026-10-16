"use client";

import React, { useState } from "react";
import { Trophy, Award, Sparkles, Terminal } from "lucide-react";
import confetti from "canvas-confetti";
import { achievements } from "@/data/achievements";
import Card3D from "./Card3D";

export default function AchievementsSection() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filterTabs = [
    { label: "All Achievements", value: "all" },
    { label: "Competitive Programming", value: "cp" },
    { label: "Hackathons", value: "hackathon" },
    { label: "Systems & Open Source", value: "systems" },
    { label: "Academic", value: "academic" },
  ];

  const filteredItems =
    selectedFilter === "all"
      ? achievements
      : achievements.filter((a) => a.category === selectedFilter);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { x, y },
      colors: ["#00f2fe", "#4facfe", "#8b5cf6", "#10b981", "#f59e0b"],
      disableForReducedMotion: true,
    });
  };

  return (
    <section id="achievements" className="relative py-24 px-4 sm:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono text-cyan-300 mb-3">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>04 // RECOGNITION & HONORS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Milestones & <span className="text-gradient-cyan">Achievements</span>
            </h2>
            <p className="text-slate-400 max-w-xl text-sm sm:text-base mt-2">
              Recognized for competitive algorithmic excellence, hackathon victories, and high-impact open-source contributions.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl glass-panel border border-white/10">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedFilter(tab.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedFilter === tab.value
                    ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,242,254,0.15)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} onClick={handleCardClick} className="cursor-pointer">
              <Card3D
                glowColor={
                  item.category === "cp"
                    ? "cyan"
                    : item.category === "hackathon"
                    ? "amber"
                    : item.category === "systems"
                    ? "emerald"
                    : "violet"
                }
                className="h-full"
              >
                <div className="p-6 sm:p-7 flex flex-col justify-between h-full space-y-4">
                  <div>
                    {/* Top Row */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400">
                        {item.category === "hackathon" ? (
                          <Trophy className="w-4 h-4 text-amber-400" />
                        ) : item.category === "cp" ? (
                          <Sparkles className="w-4 h-4 text-cyan-400" />
                        ) : (
                          <Award className="w-4 h-4 text-emerald-400" />
                        )}
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300">
                        {item.categoryLabel}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>

                    {item.organization && (
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        {item.organization} • {item.date}
                      </p>
                    )}

                    <p className="text-xs text-slate-300 leading-relaxed mt-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Metric & Badge */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-cyan-400 font-semibold">
                      {item.highlightMetric}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-slate-400">
                      {item.badge}
                    </span>
                  </div>
                </div>
              </Card3D>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
