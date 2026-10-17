"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, CornerDownLeft, Loader2, Check } from "lucide-react";
import confetti from "canvas-confetti";
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

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

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
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const parts = trimmed.split(/\s+/);
    const mainCmd = parts[0].toLowerCase();
    const cmd = trimmed.toLowerCase();

    // CLI Message Sending Command: msg <text>, send <text>, transmit <text>
    if (mainCmd === "msg" || mainCmd === "send" || mainCmd === "transmit") {
      const args = trimmed.slice(mainCmd.length).trim();
      if (!args) {
        setLogs((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(7),
            command: rawCmd,
            output: (
              <div className="space-y-1 text-xs text-[var(--bone-dim)] font-mono p-2.5 rounded bg-[var(--ink-3)] border border-[var(--rule)]">
                <p className="text-[var(--amber)] font-bold">CLI Transmission Uplink</p>
                <p className="text-[11px]">Usage: <span className="text-[var(--bone)]">msg &lt;your message&gt;</span></p>
                <p className="text-[11px]">Or with email: <span className="text-[var(--bone)]">msg &lt;you@email.com&gt; &lt;your message&gt;</span></p>
                <p className="text-[11px] text-[var(--bone-dim)] opacity-80">
                  Example: <span className="text-[#b7e35a]">msg alex@startup.io Interested in distributed systems roles!</span>
                </p>
              </div>
            ),
          },
        ]);
        setInputVal("");
        return;
      }

      const argParts = args.split(/\s+/);
      let senderEmail = "cli-hud@portfolio.local";
      const senderName = "CLI HUD Terminal";
      let messageText = args;

      if (argParts[0].includes("@") && argParts.length > 1) {
        senderEmail = argParts[0];
        messageText = argParts.slice(1).join(" ");
      }

      const logId = Math.random().toString(36).substring(7);

      setLogs((prev) => [
        ...prev,
        {
          id: logId,
          command: rawCmd,
          output: (
            <div className="flex items-center gap-2 text-xs text-[var(--amber)] font-mono animate-pulse">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>[DISPATCHING] Establishing direct uplink to Arnav&apos;s inbox...</span>
            </div>
          ),
        },
      ]);
      setInputVal("");

      // Async Formspree dispatch
      (async () => {
        const endpoint =
          process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ||
          "https://formspree.io/f/xnpjlwqn";
        try {
          const res = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              name: senderName,
              email: senderEmail,
              message: messageText,
              _subject: `[HUD CLI Transmission] from ${senderEmail}`,
            }),
          });

          if (res.ok) {
            confetti({
              particleCount: 50,
              spread: 70,
              origin: { y: 0.7 },
              colors: ["#ff5a1f", "#b7e35a", "#ece6d3", "#a39e8c"],
            });

            setLogs((prev) =>
              prev.map((log) =>
                log.id === logId
                  ? {
                      ...log,
                      output: (
                        <div className="space-y-1 text-xs font-mono p-2.5 rounded bg-[var(--ink-3)] border border-[#b7e35a]/30">
                          <p className="text-[#b7e35a] font-bold flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5" />
                            <span>[TRANSMISSION CONFIRMED]</span>
                          </p>
                          <p className="text-[var(--bone)] text-[11px]">
                            Telemetry packet dispatched to <span className="font-bold">arnavmahajan630@gmail.com</span>. Zero-loss relay acknowledged.
                          </p>
                          <p className="text-[var(--bone-dim)] text-[10px]">
                            Payload: &quot;{messageText}&quot; {senderEmail !== "cli-hud@portfolio.local" && `(from ${senderEmail})`}
                          </p>
                        </div>
                      ),
                    }
                  : log
              )
            );
            return;
          }

          // Fallback via /api/contact
          const apiRes = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: senderName,
              email: senderEmail,
              message: messageText,
            }),
          });

          if (apiRes.ok) {
            confetti({
              particleCount: 50,
              spread: 70,
              origin: { y: 0.7 },
              colors: ["#ff5a1f", "#b7e35a", "#ece6d3", "#a39e8c"],
            });
            setLogs((prev) =>
              prev.map((log) =>
                log.id === logId
                  ? {
                      ...log,
                      output: (
                        <div className="space-y-1 text-xs font-mono p-2.5 rounded bg-[var(--ink-3)] border border-[#b7e35a]/30">
                          <p className="text-[#b7e35a] font-bold">✓ [TRANSMISSION CONFIRMED]</p>
                          <p className="text-[var(--bone)] text-[11px]">Delivered to Arnav&apos;s inbox via proxy relay.</p>
                        </div>
                      ),
                    }
                  : log
              )
            );
            return;
          }

          throw new Error("Relay rejected");
        } catch {
          setLogs((prev) =>
            prev.map((log) =>
              log.id === logId
                ? {
                    ...log,
                    output: (
                      <div className="space-y-1 text-xs font-mono p-2.5 rounded bg-[var(--ink-3)] border border-[var(--amber)]/40 text-[var(--bone)]">
                        <p className="text-[var(--amber)] font-bold">✗ [TRANSMISSION INTERRUPTED]</p>
                        <p className="text-[11px] text-[var(--bone-dim)]">
                          Could not deliver telemetry packet. Type <span className="text-[var(--bone)] font-bold">&apos;contact&apos;</span> to inspect direct fallback channels.
                        </p>
                      </div>
                    ),
                  }
                : log
            )
          );
        }
      })();

      return;
    }

    let output: React.ReactNode = null;

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1.5 text-xs text-[var(--bone-dim)] font-mono">
            <p className="text-[var(--amber)] font-semibold">Available telemetry commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 font-mono">
              <div><span className="text-[var(--bone)]">msg &lt;text&gt;</span> - Transmit message live from CLI</div>
              <div><span className="text-[var(--bone)]">bio</span> - Overview & academic background</div>
              <div><span className="text-[var(--bone)]">experience</span> - Internships & CNCF Meshery</div>
              <div><span className="text-[var(--bone)]">projects</span> - Veyra, ah-monad, Re:Learn</div>
              <div><span className="text-[var(--bone)]">achievements</span> - CP rankings & hackathons</div>
              <div><span className="text-[var(--bone)]">stats</span> - System benchmarks & DSA metrics</div>
              <div><span className="text-[var(--bone)]">blog</span> - Open technical blog (arnavlogs)</div>
              <div><span className="text-[var(--bone)]">resume</span> - Download official resume PDF</div>
              <div><span className="text-[var(--bone)]">contact</span> - Email, phone, and profiles</div>
              <div><span className="text-[var(--bone)]">clear</span> - Clear terminal window</div>
              <div><span className="text-[var(--bone)]">exit</span> - Close HUD drawer</div>
            </div>
          </div>
        );
        break;

      case "bio":
        output = (
          <div className="text-xs space-y-1.5 text-[var(--bone-dim)] font-mono">
            <p className="text-[var(--amber)] font-bold">{personalData.name} — {personalData.role}</p>
            <p>{personalData.tagline}</p>
            <p>🎓 {personalData.education.institution} ({personalData.education.degree}, {personalData.education.expectedGraduation}, CGPA: {personalData.education.cgpa})</p>
            <p>📍 {personalData.location}</p>
          </div>
        );
        break;

      case "experience":
        output = (
          <div className="space-y-3 text-xs font-mono">
            {experiences.map((exp) => (
              <div key={exp.id} className="border-l-2 border-[var(--amber)] pl-3">
                <p className="text-[var(--bone)] font-bold">{exp.role} @ {exp.company}</p>
                <p className="text-[var(--bone-dim)] text-[11px]">{exp.period} • {exp.location}</p>
                <p className="text-[var(--bone-dim)] mt-1">{exp.description[0]}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-2.5 text-xs font-mono">
            {projects.map((p) => (
              <div key={p.id} className="border-l-2 border-[var(--rule)] pl-3">
                <p className="text-[var(--amber)] font-bold">{p.title} <span className="text-[var(--bone-dim)] font-normal">({p.category})</span></p>
                <p className="text-[var(--bone)]">{p.tagline}</p>
                <p className="text-[var(--bone-dim)] text-[11px]">Stack: {p.tech.slice(0, 5).join(", ")}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "stats":
        output = (
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {personalData.metrics.map((m) => (
              <div key={m.label} className="p-2 rounded bg-[var(--ink-3)] border border-[var(--rule)]">
                <span className="text-[var(--bone-dim)] block text-[9px] uppercase">{m.label}</span>
                <span className="text-[var(--amber)] font-bold text-sm">{m.value}</span>
                <span className="text-[var(--bone-dim)] text-[10px] block opacity-80">{m.description}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "achievements":
        output = (
          <div className="space-y-2 text-xs font-mono">
            {achievements.map((a) => (
              <div key={a.id} className="flex items-start gap-2">
                <span className="text-[var(--amber)] font-bold">★</span>
                <div>
                  <span className="text-[var(--bone)] font-semibold">{a.title}</span>
                  <span className="text-[var(--bone-dim)] text-[11px]"> — {a.highlightMetric}</span>
                  <p className="text-[var(--bone-dim)] text-[11px]">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "blog":
        if (typeof window !== "undefined") {
          window.open(personalData.socials.blog, "_blank", "noopener,noreferrer");
        }
        output = (
          <p className="text-[var(--ok)] text-xs font-mono">
            ✓ Opening Arnav&apos;s technical blog ({personalData.socials.blog})...
          </p>
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
          <p className="text-[var(--ok)] text-xs font-mono">
            ✓ Initiating download for Arnav_Mahajan_Resume.pdf...
          </p>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-xs text-[var(--bone-dim)] font-mono">
            <p>📧 Email: <span className="text-[var(--bone)]">{personalData.email}</span></p>
            <p>📞 Phone: <span className="text-[var(--bone)]">{personalData.phone}</span></p>
            <p>✍️ Blog: <a href={personalData.socials.blog} target="_blank" rel="noreferrer" className="text-[var(--amber)] underline">{personalData.socials.blog}</a></p>
            <p>🔗 LinkedIn: <a href={personalData.socials.linkedin} target="_blank" rel="noreferrer" className="text-[var(--amber)] underline">{personalData.socials.linkedin}</a></p>
            <p>🐙 GitHub: <a href={personalData.socials.github} target="_blank" rel="noreferrer" className="text-[var(--amber)] underline">{personalData.socials.github}</a></p>
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
          <p className="text-[var(--amber)] text-xs font-mono">
            command not found: {rawCmd}. Type <span className="underline">&apos;help&apos;</span> to list commands.
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
          className="fixed inset-x-4 bottom-4 md:right-8 md:left-auto md:w-[620px] z-50 rounded-xl bg-[var(--ink-2)] border border-[var(--rule)] shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col max-h-[75vh] sm:max-h-[540px] overflow-hidden"
        >
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--ink)] border-b border-[var(--rule)] select-none font-mono">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-[var(--amber)]" />
              <span className="text-xs font-bold text-[var(--bone)]">
                arnav@telemetry: ~ (zsh)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLogs([])}
                className="text-[10px] text-[var(--bone-dim)] hover:text-[var(--bone)] px-2 py-0.5 rounded bg-[var(--ink-3)] border border-[var(--rule)]"
              >
                clear
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded text-[var(--bone-dim)] hover:text-[var(--bone)] hover:bg-[var(--ink-3)] transition-colors"
                aria-label="Close terminal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Terminal Output Area */}
          <div className="p-4 overflow-y-auto space-y-3 font-mono flex-1 text-xs">
            <div className="p-3 rounded bg-[var(--ink-3)] border border-[var(--rule)] text-[var(--bone-dim)] space-y-1">
              <p className="text-[var(--amber)] font-semibold">ARNAV MAHAJAN // SYSTEMS TELEMETRY v2.4.0</p>
              <p className="text-[11px]">Backend &bull; Distributed Infrastructure &bull; 1,600+ DSA &bull; CNCF Meshery</p>
              <p className="text-[11px] text-[var(--bone-dim)] opacity-80">
                Type <span className="text-[var(--bone)] font-bold">&apos;help&apos;</span> to discover commands, <span className="text-[var(--amber)] font-bold">&apos;msg &lt;text&gt;&apos;</span> to transmit live message, or <span className="text-[var(--ok)] font-bold">&apos;resume&apos;</span> to download resume.
              </p>
            </div>

            {logs.map((log) => (
              <div key={log.id} className="space-y-1">
                <div className="flex items-center gap-2 text-[var(--bone-dim)]">
                  <span className="text-[var(--amber)] font-bold">&gt;</span>
                  <span className="text-[var(--bone)] font-semibold">{log.command}</span>
                </div>
                <div className="pl-4">{log.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Terminal Input Bar */}
          <div className="p-3 bg-[var(--ink)] border-t border-[var(--rule)] flex items-center gap-2 font-mono">
            <span className="text-[var(--amber)] text-sm font-bold">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help', 'blog', 'projects', 'resume'..."
              className="flex-1 bg-transparent border-none outline-none text-xs text-[var(--bone)] placeholder-[var(--bone-dim)]"
            />
            <button
              onClick={() => handleCommand(inputVal)}
              className="p-1.5 rounded bg-[var(--ink-3)] text-[var(--amber)] border border-[var(--rule)] hover:border-[var(--amber)]/40 text-xs transition-colors"
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
