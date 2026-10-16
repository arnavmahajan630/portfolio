"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, CornerDownLeft } from "lucide-react";
import { personalData } from "@/data/personal";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { achievements } from "@/data/achievements";

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

export default function TerminalDrawer({ isOpen, onClose }: TerminalDrawerProps) {
  const [inputVal, setInputVal] = useState("");
  const [logs, setLogs] = useState<CommandLog[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Scroll to bottom on logs change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Handle hotkey Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    setHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    let output: React.ReactNode = null;

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-cyan-300 font-semibold">Available telemetry commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-slate-400 font-mono">
              <div><span className="text-white">bio</span> - Overview & academic background</div>
              <div><span className="text-white">experience</span> - Internships & CNCF Meshery</div>
              <div><span className="text-white">projects</span> - Veyra, Re:Learn, CertiProof</div>
              <div><span className="text-white">achievements</span> - CP rankings & hackathons</div>
              <div><span className="text-white">stats</span> - System benchmarks & DSA metrics</div>
              <div><span className="text-white">resume</span> - Download official resume PDF</div>
              <div><span className="text-white">contact</span> - Email, phone, and profiles</div>
              <div><span className="text-white">clear</span> - Clear terminal window</div>
              <div><span className="text-white">exit</span> - Close HUD drawer</div>
            </div>
          </div>
        );
        break;

      case "bio":
        output = (
          <div className="text-xs space-y-1.5 text-slate-300">
            <p className="text-cyan-400 font-bold">{personalData.name} — {personalData.role}</p>
            <p className="text-slate-400">{personalData.tagline}</p>
            <p>🎓 {personalData.education.institution} ({personalData.education.degree}, {personalData.education.expectedGraduation}, CGPA: {personalData.education.cgpa})</p>
            <p>📍 {personalData.location}</p>
          </div>
        );
        break;

      case "experience":
        output = (
          <div className="space-y-3 text-xs">
            {experiences.map((exp) => (
              <div key={exp.id} className="border-l-2 border-cyan-500/50 pl-3">
                <p className="text-white font-bold">{exp.role} @ {exp.company}</p>
                <p className="text-slate-400 text-[11px]">{exp.period} • {exp.location}</p>
                <p className="text-slate-300 mt-1">{exp.description[0]}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-2.5 text-xs">
            {projects.map((p) => (
              <div key={p.id} className="border-l-2 border-violet-500/50 pl-3">
                <p className="text-cyan-300 font-bold">{p.title} <span className="text-slate-400 font-normal">({p.category})</span></p>
                <p className="text-slate-300">{p.tagline}</p>
                <p className="text-slate-500 text-[11px]">Stack: {p.tech.slice(0, 5).join(", ")}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "stats":
        output = (
          <div className="grid grid-cols-2 gap-2 text-xs">
            {personalData.metrics.map((m) => (
              <div key={m.label} className="p-2 rounded bg-white/5 border border-white/10">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">{m.label}</span>
                <span className="text-cyan-300 font-bold text-sm">{m.value}</span>
                <span className="text-slate-400 text-[10px] block">{m.description}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "achievements":
        output = (
          <div className="space-y-2 text-xs">
            {achievements.map((a) => (
              <div key={a.id} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">★</span>
                <div>
                  <span className="text-white font-semibold">{a.title}</span>
                  <span className="text-slate-400 text-[11px]"> — {a.highlightMetric}</span>
                  <p className="text-slate-400 text-[11px]">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "resume":
        if (typeof window !== "undefined") {
          const link = document.createElement("a");
          link.href = "/resume.pdf";
          link.download = "Arnav_Mahajan_Resume.pdf";
          link.click();
        }
        output = (
          <p className="text-emerald-400 text-xs">
            ✓ Initiating download for Arnav_Mahajan_Resume.pdf...
          </p>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-xs text-slate-300 font-mono">
            <p>📧 Email: <span className="text-cyan-300">{personalData.email}</span></p>
            <p>📞 Phone: <span className="text-cyan-300">{personalData.phone}</span></p>
            <p>🔗 LinkedIn: <a href={personalData.socials.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{personalData.socials.linkedin}</a></p>
            <p>🐙 GitHub: <a href={personalData.socials.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{personalData.socials.github}</a></p>
          </div>
        );
        break;

      case "clear":
        setLogs([]);
        setInputVal("");
        return;

      case "exit":
        onClose();
        setInputVal("");
        return;

      default:
        output = (
          <p className="text-rose-400 text-xs">
            command not found: {rawCmd}. Type <span className="text-cyan-300 underline">&apos;help&apos;</span> to list commands.
          </p>
        );
        break;
    }

    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        command: rawCmd,
        output,
      },
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex + 1 < history.length ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIdx);
      setInputVal(history[history.length - 1 - nextIdx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx] || "");
      } else {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="fixed inset-x-4 bottom-4 md:right-8 md:left-auto md:w-[620px] z-50 rounded-2xl glass-panel border border-cyan-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col max-h-[75vh] sm:max-h-[540px] overflow-hidden"
        >
          {/* Terminal Window Title Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-white/10 select-none">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold text-slate-200">
                arnav@telemetry: ~ (zsh)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLogs([])}
                className="text-[10px] font-mono text-slate-400 hover:text-white px-2 py-0.5 rounded bg-white/5"
              >
                clear
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close terminal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Terminal Output Area */}
          <div className="p-4 overflow-y-auto space-y-3 font-mono flex-1 text-xs">
            {/* Initial Welcome message */}
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-slate-400 space-y-1">
              <p className="text-cyan-300 font-semibold">ARNAV MAHAJAN // SYSTEMS TELEMETRY v2.4.0</p>
              <p className="text-[11px]">Backend &bull; Distributed Infrastructure &bull; 1,600+ DSA &bull; CNCF Meshery</p>
              <p className="text-[11px] text-slate-500">Type <span className="text-cyan-300 font-bold">&apos;help&apos;</span> to discover commands or <span className="text-emerald-300 font-bold">&apos;resume&apos;</span> to download resume.</p>
            </div>

            {/* Logs history */}
            {logs.map((log) => (
              <div key={log.id} className="space-y-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-emerald-400 font-bold">&gt;</span>
                  <span className="text-white font-semibold">{log.command}</span>
                </div>
                <div className="pl-4">{log.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Terminal Input Bar */}
          <div className="p-3 bg-slate-950/90 border-t border-white/10 flex items-center gap-2 font-mono">
            <span className="text-cyan-400 text-sm font-bold">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help', 'projects', 'stats', 'resume'..."
              className="flex-1 bg-transparent border-none outline-none text-xs text-white placeholder-slate-500"
            />
            <button
              onClick={() => handleCommand(inputVal)}
              className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-xs transition-colors"
              title="Execute Command"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
