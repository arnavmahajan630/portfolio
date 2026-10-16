"use client";

import React from "react";
import { ArrowUp, Mail } from "lucide-react";
import { personalData } from "@/data/personal";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 px-4 sm:px-8 border-t border-white/10 bg-[#04060d]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Telemetry */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-violet-600 p-[1px]">
            <div className="w-full h-full bg-[#070913] rounded-[7px] flex items-center justify-center font-mono font-bold text-xs text-cyan-400">
              AM
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-white">
              {personalData.name} &copy; {new Date().getFullYear()}
            </p>
            <p className="text-[11px] font-mono text-slate-400 flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              All systems nominal &bull; Built with Next.js &amp; 3D Glass
            </p>
          </div>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-3">
          <a
            href={personalData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={personalData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-cyan-400 transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${personalData.email}`}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-violet-400 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Scroll to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-all"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
