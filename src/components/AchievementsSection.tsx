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
      colors: ["#ff5a1f", "#b7e35a", "#ece6d3", "#a39e8c"],
      disableForReducedMotion: true,
    });
  };

  return (
    <section id="achievements" className="relative py-24 px-4 sm:px-8 border-t border-[var(--rule)]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--ink-2)] border border-[var(--rule)] text-xs font-mono text-[var(--bone-dim)] mb-3">
              <Terminal className="w-3.5 h-3.5 text-[var(--amber)]" />
              <span>04 // RECOGNITION &amp; HONORS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-normal text-[var(--bone)] tracking-tight">
              Milestones &amp; <em className="italic text-[var(--amber)]">Achievements</em>
            </h2>
            <p className="text-[var(--bone-dim)] max-w-xl text-xs sm:text-sm mt-2 font-mono">
              Recognized for competitive algorithmic excellence, hackathon victories, and high-impact open-source contributions.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-lg bg-[var(--ink-2)] border border-[var(--rule)] font-mono">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedFilter(tab.value)}
                className={`px-3 py-1 rounded text-xs transition-all ${
                  selectedFilter === tab.value
                    ? "bg-[var(--amber)] text-black font-semibold shadow-sm"
                    : "text-[var(--bone-dim)] hover:text-[var(--bone)]"
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
                    ? "amber"
                    : item.category === "hackathon"
                    ? "amber"
                    : item.category === "systems"
                    ? "lime"
                    : "bone"
                }
                className="h-full"
              >
                <div className="p-6 sm:p-7 flex flex-col justify-between h-full space-y-4">
                  <div>
                    {/* Top Row */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-[var(--ink-3)] border border-[var(--rule)] flex items-center justify-center">
                        {item.category === "hackathon" ? (
                          <Trophy className="w-4 h-4 text-[var(--amber)]" />
                        ) : item.category === "cp" ? (
                          <Sparkles className="w-4 h-4 text-[var(--ok)]" />
                        ) : (
                          <Award className="w-4 h-4 text-[var(--bone)]" />
                        )}
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--ink-3)] border border-[var(--rule)] text-[var(--bone-dim)]">
                        {item.categoryLabel}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-normal text-[var(--bone)] group-hover:text-[var(--amber)] transition-colors">
                      {item.title}
                    </h3>

                    {item.organization && (
                      <p className="text-xs text-[var(--bone-dim)] font-mono mt-1 opacity-80">
                        {item.organization} • {item.date}
                      </p>
                    )}

                    <p className="text-xs text-[var(--bone-dim)] leading-relaxed mt-3 font-mono">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Metric & Badge */}
                  <div className="pt-3 border-t border-[var(--rule)] flex items-center justify-between text-xs font-mono">
                    <span className="text-[var(--amber)] font-bold">
                      {item.highlightMetric}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[var(--ink-3)] text-[10px] text-[var(--bone-dim)] border border-[var(--rule)]">
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
