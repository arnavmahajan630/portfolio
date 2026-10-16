"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Download,
  Copy,
  Check,
  Send,
  Terminal,
  MapPin,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { personalData } from "@/data/personal";
import Card3D from "./Card3D";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#00f2fe", "#8b5cf6", "#10b981"],
    });

    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono text-cyan-300 mb-3">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>06 // CONNECT & INITIATE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let&apos;s Build <span className="text-gradient-cyan">Something Great</span>
          </h2>
          <p className="text-slate-400 max-w-xl text-sm sm:text-base mt-2">
            Interested in discussing distributed systems, backend engineering opportunities, or algorithmic problem solving? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Contact Info & Resume Card */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <Card3D glowColor="cyan">
              <div className="p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-slate-400 block">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${personalData.email}`}
                      className="text-sm font-bold text-white hover:text-cyan-300 transition-colors"
                    >
                      {personalData.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(personalData.email, "email")}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  title="Copy Email"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </Card3D>

            {/* Phone Card */}
            <Card3D glowColor="emerald">
              <div className="p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-slate-400 block">
                      Phone / WhatsApp
                    </span>
                    <a
                      href={`tel:${personalData.phone}`}
                      className="text-sm font-bold text-white hover:text-emerald-300 transition-colors"
                    >
                      {personalData.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(personalData.phone, "phone")}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  title="Copy Phone"
                >
                  {copiedPhone ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </Card3D>

            {/* Resume Direct Download Card */}
            <Card3D glowColor="violet">
              <div className="p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-slate-400 block">
                      Official Resume
                    </span>
                    <span className="text-sm font-bold text-white">
                      Arnav_Mahajan_Resume.pdf
                    </span>
                  </div>
                </div>

                <a
                  href="/resume.pdf"
                  download="Arnav_Mahajan_Resume.pdf"
                  className="px-3.5 py-2 rounded-xl bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/30 text-violet-300 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                >
                  <span>Download</span>
                </a>
              </div>
            </Card3D>

            {/* Socials Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={personalData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl glass-panel hover:border-cyan-500/40 flex items-center gap-3 transition-all group"
              >
                <GithubIcon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                <div>
                  <span className="text-xs font-bold text-white block">GitHub</span>
                  <span className="text-[10px] text-slate-400 font-mono">@arnavmahajan630</span>
                </div>
              </a>

              <a
                href={personalData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl glass-panel hover:border-cyan-500/40 flex items-center gap-3 transition-all group"
              >
                <LinkedinIcon className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="text-xs font-bold text-white block">LinkedIn</span>
                  <span className="text-[10px] text-slate-400 font-mono">/in/arnavmahajan630</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <Card3D glowColor="cyan" className="h-full">
              <div className="p-6 sm:p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      Send a Message
                    </h3>
                    <span className="text-xs font-mono text-slate-400">
                      Direct Dispatch
                    </span>
                  </div>

                  {formSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-8 text-center space-y-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30"
                    >
                      <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-300 mx-auto flex items-center justify-center">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold text-white">
                        Message Dispatched!
                      </h4>
                      <p className="text-xs text-slate-300 max-w-sm mx-auto">
                        Thank you for reaching out. Your transmission has been logged and Arnav will get back to you shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-mono text-slate-400 block mb-1.5">
                            Your Name
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="Alex Smith"
                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-mono text-slate-400 block mb-1.5">
                            Your Email
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            placeholder="alex@company.com"
                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-400 block mb-1.5">
                          Message / Opportunity Overview
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          placeholder="Hey Arnav, we love your distributed systems work and would love to chat about..."
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_30px_rgba(0,242,254,0.5)] transition-all flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>Transmit Message</span>
                      </button>
                    </form>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    {personalData.location}
                  </span>
                  <span>Avg Response: &lt; 24h</span>
                </div>
              </div>
            </Card3D>
          </div>
        </div>
      </div>
    </section>
  );
}
