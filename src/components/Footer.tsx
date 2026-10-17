"use client";

import React from "react";
import { ArrowUp, Mail, BookOpen } from "lucide-react";
import { personalData } from "@/data/personal";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 px-4 sm:px-8 border-t border-[var(--rule)] bg-[var(--ink)] font-mono">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Telemetry */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-8 h-8 rounded-lg bg-[var(--ink-2)] border border-[var(--rule)] flex items-center justify-center font-display italic text-sm text-[var(--bone)]">
            A<em className="text-[var(--amber)] not-italic">M</em>
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--bone)]">
              {personalData.name} &copy; {new Date().getFullYear()}
            </p>
            <p className="text-[10px] text-[var(--bone-dim)] flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ok)]" />
              All systems nominal &bull; Styled with Monad &amp; Lightberry Theme
            </p>
          </div>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-2.5">
          <a
            href={personalData.socials.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[var(--ink-2)] border border-[var(--rule)] text-[var(--bone-dim)] hover:text-[var(--amber)] transition-colors"
            aria-label="Technical Blog"
            title="Technical Blog"
          >
            <BookOpen className="w-3.5 h-3.5" />
          </a>
          <a
            href={personalData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[var(--ink-2)] border border-[var(--rule)] text-[var(--bone-dim)] hover:text-[var(--bone)] transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href={personalData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[var(--ink-2)] border border-[var(--rule)] text-[var(--bone-dim)] hover:text-[var(--amber)] transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href={`mailto:${personalData.email}`}
            className="p-2 rounded-lg bg-[var(--ink-2)] border border-[var(--rule)] text-[var(--bone-dim)] hover:text-[var(--ok)] transition-colors"
            aria-label="Email"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Right: Scroll to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--ink-2)] border border-[var(--rule)] text-xs text-[var(--bone-dim)] hover:text-[var(--amber)] hover:border-[var(--amber)]/40 transition-all"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
