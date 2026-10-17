"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Copy,
  Check,
  Send,
  Terminal,
  MapPin,
  Sparkles,
  ExternalLink,
  BookOpen,
  Loader2,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import confetti from "canvas-confetti";
import { personalData } from "@/data/personal";
import Card3D from "./Card3D";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedBackup, setCopiedBackup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    provider?: string;
    mailtoUrl?: string;
    message?: string;
  } | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const copyToClipboard = (text: string, type: "email" | "phone" | "backup") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } else if (type === "phone") {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    } else {
      setCopiedBackup(true);
      setTimeout(() => setCopiedBackup(false), 2500);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const recipientEmail = "arnavmahajan630@gmail.com";
    const subject = `[Portfolio Inquiry] from ${formData.name}`;
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    try {
      // If a dedicated client-side Formspree endpoint is configured, use it directly
      if (process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT) {
        const res = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: subject,
          }),
        });

        if (res.ok) {
          setSubmitResult({
            success: true,
            provider: "formspree",
            message: "Transmission delivered directly to Arnav's inbox.",
          });
          confetti({
            particleCount: 60,
            spread: 80,
            origin: { y: 0.65 },
            colors: ["#ff5a1f", "#b7e35a", "#ece6d3", "#a39e8c"],
          });
          return;
        }
      }

      // Dispatch through the server route (supporting Discord Webhook, Resend, FormSubmit, Web3Forms)
      const apiRes = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const apiData = await apiRes.json();

      if (apiRes.ok && apiData.success) {
        setSubmitResult(apiData);
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.65 },
          colors: ["#ff5a1f", "#b7e35a", "#ece6d3", "#a39e8c"],
        });
        return;
      }

      // Fallback
      setErrorMessage(
        "Automated delivery could not be confirmed. Dispatch directly via your email client below."
      );
      setSubmitResult({
        success: false,
        provider: "mailto_fallback",
        mailtoUrl,
      });
    } catch (err) {
      console.error("Form dispatch error:", err);
      setErrorMessage(
        "Network connection interrupted. Dispatch directly via your email client below."
      );
      setSubmitResult({
        success: false,
        provider: "mailto_fallback",
        mailtoUrl,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitResult(null);
    setErrorMessage(null);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-8 border-t border-[var(--rule)]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--ink-3)] border border-[var(--rule)] text-xs font-mono text-[var(--bone-dim)] mb-3">
            <Terminal className="w-3.5 h-3.5 text-[var(--amber)]" />
            <span>06 // CONNECT &amp; INITIATE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display text-[var(--bone)] tracking-tight">
            Let&apos;s Build <span className="italic text-[var(--amber)]">Something Great</span>
          </h2>
          <p className="text-[var(--bone-dim)] max-w-xl text-xs sm:text-sm font-mono mt-2 leading-relaxed">
            Interested in discussing distributed systems, backend engineering opportunities, or algorithmic problem solving? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Contact Info & Resume Card */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <Card3D glowColor="amber">
              <div className="p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[var(--ink-3)] border border-[var(--rule)] flex items-center justify-center text-[var(--amber)]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--bone-dim)] block">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${personalData.email}`}
                      className="text-sm font-mono font-bold text-[var(--bone)] hover:text-[var(--amber)] transition-colors"
                    >
                      {personalData.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(personalData.email, "email")}
                  className="p-2 rounded-lg bg-[var(--ink-3)] border border-[var(--rule)] text-[var(--bone-dim)] hover:text-[var(--bone)] transition-colors"
                  title="Copy Email"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-[#b7e35a]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </Card3D>

            {/* Phone Card */}
            <Card3D glowColor="ok">
              <div className="p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[var(--ink-3)] border border-[var(--rule)] flex items-center justify-center text-[#b7e35a]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--bone-dim)] block">
                      Phone / WhatsApp
                    </span>
                    <a
                      href={`tel:${personalData.phone}`}
                      className="text-sm font-mono font-bold text-[var(--bone)] hover:text-[#b7e35a] transition-colors"
                    >
                      {personalData.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(personalData.phone, "phone")}
                  className="p-2 rounded-lg bg-[var(--ink-3)] border border-[var(--rule)] text-[var(--bone-dim)] hover:text-[var(--bone)] transition-colors"
                  title="Copy Phone"
                >
                  {copiedPhone ? (
                    <Check className="w-4 h-4 text-[#b7e35a]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </Card3D>


            {/* Socials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={personalData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg glass-panel border-[var(--rule)] hover:border-[var(--bone-dim)] flex items-center gap-3 transition-all group font-mono"
              >
                <GithubIcon className="w-4 h-4 text-[var(--bone-dim)] group-hover:text-[var(--bone)] transition-colors" />
                <div>
                  <span className="text-xs font-bold text-[var(--bone)] block">GitHub</span>
                  <span className="text-[10px] text-[var(--bone-dim)]">@arnavmahajan630</span>
                </div>
              </a>

              <a
                href={personalData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg glass-panel border-[var(--rule)] hover:border-[var(--amber)] flex items-center gap-3 transition-all group font-mono"
              >
                <LinkedinIcon className="w-4 h-4 text-[var(--amber)] group-hover:scale-110 transition-transform" />
                <div>
                  <span className="text-xs font-bold text-[var(--bone)] block">LinkedIn</span>
                  <span className="text-[10px] text-[var(--bone-dim)]">/in/arnavmahajan630</span>
                </div>
              </a>

              <a
                href={personalData.socials.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg glass-panel border-[var(--rule)] hover:border-[var(--amber)] flex items-center justify-between gap-3 transition-all group font-mono sm:col-span-2"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <BookOpen className="w-4 h-4 text-[var(--amber)] group-hover:scale-110 transition-transform shrink-0" />
                  <div className="truncate">
                    <span className="text-xs font-bold text-[var(--bone)] block">Technical Blog</span>
                    <span className="text-[10px] text-[var(--bone-dim)] truncate">arnavlogs.hashnode.dev</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[var(--bone-dim)] group-hover:text-[var(--amber)] transition-colors shrink-0" />
              </a>
            </div>
          </div>

          {/* Right Column: Live Transmission Form */}
          <div className="lg:col-span-7">
            <Card3D glowColor="amber" className="h-full">
              <div className="p-6 sm:p-8 h-full flex flex-col justify-between font-mono">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-display text-[var(--bone)] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[var(--amber)]" />
                      Send a Transmission
                    </h3>
                  </div>

                  {submitResult && submitResult.success ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 sm:p-8 space-y-4 rounded-lg bg-[var(--ink-3)] border border-[#b7e35a]/30"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#b7e35a]/15 text-[#b7e35a] mx-auto flex items-center justify-center">
                        <Check className="w-6 h-6" />
                      </div>
                      <div className="text-center">
                        <h4 className="text-2xl font-display text-[var(--bone)]">
                          Transmission Dispatched!
                        </h4>
                        <p className="text-xs text-[var(--bone-dim)] max-w-md mx-auto leading-relaxed mt-2">
                          {submitResult.message ? (
                            submitResult.message
                          ) : (
                            <>
                              Your transmission was delivered directly to Arnav&apos;s inbox (
                              <span className="text-[var(--bone)] font-mono">arnavmahajan630@gmail.com</span>
                              ). Expect a response shortly.
                            </>
                          )}
                        </p>
                      </div>

                      <div className="text-center pt-3 border-t border-[var(--rule)]">
                        <button
                          onClick={resetForm}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--ink)] hover:bg-[var(--ink-2)] border border-[var(--rule)] hover:border-[var(--bone-dim)] text-xs text-[var(--bone)] transition-all cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-[var(--amber)]" />
                          <span>Send another transmission</span>
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      {errorMessage && (
                        <div className="p-3.5 rounded-lg bg-[var(--amber)]/10 border border-[var(--amber)]/40 text-xs flex items-start gap-3 text-[var(--bone)]">
                          <AlertCircle className="w-4 h-4 text-[var(--amber)] shrink-0 mt-0.5" />
                          <div className="space-y-2 w-full">
                            <p>{errorMessage}</p>
                            {submitResult?.mailtoUrl && (
                              <div className="flex flex-wrap gap-2 pt-1">
                                <a
                                  href={submitResult.mailtoUrl}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--amber)] text-black text-[11px] font-bold uppercase tracking-wider"
                                >
                                  <span>Open Mail Client</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                                <button
                                  type="button"
                                  onClick={() =>
                                    copyToClipboard(
                                      `From: ${formData.name} <${formData.email}>\n\n${formData.message}`,
                                      "backup"
                                    )
                                  }
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--ink)] border border-[var(--rule)] text-[var(--bone)] text-[11px]"
                                >
                                  {copiedBackup ? (
                                    <>
                                      <Check className="w-3 h-3 text-[#b7e35a]" />
                                      <span>Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>Copy Message</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-[var(--bone-dim)] block mb-1.5">
                            Your Name
                          </label>
                          <input
                            type="text"
                            required
                            disabled={isSubmitting}
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="Alex Smith"
                            className="w-full px-4 py-2.5 rounded-lg bg-[var(--ink-3)] border border-[var(--rule)] text-[var(--bone)] placeholder-[var(--bone-dim)] text-xs focus:outline-none focus:border-[var(--amber)] transition-colors disabled:opacity-50"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-[var(--bone-dim)] block mb-1.5">
                            Your Email
                          </label>
                          <input
                            type="email"
                            required
                            disabled={isSubmitting}
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            placeholder="alex@company.com"
                            className="w-full px-4 py-2.5 rounded-lg bg-[var(--ink-3)] border border-[var(--rule)] text-[var(--bone)] placeholder-[var(--bone-dim)] text-xs focus:outline-none focus:border-[var(--amber)] transition-colors disabled:opacity-50"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-[var(--bone-dim)] block mb-1.5">
                          Message / Opportunity Overview
                        </label>
                        <textarea
                          required
                          disabled={isSubmitting}
                          rows={4}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          placeholder="Hey Arnav, we love your distributed systems work and would love to chat about..."
                          className="w-full px-4 py-2.5 rounded-lg bg-[var(--ink-3)] border border-[var(--rule)] text-[var(--bone)] placeholder-[var(--bone-dim)] text-xs focus:outline-none focus:border-[var(--amber)] transition-colors resize-none disabled:opacity-50"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-lg bg-[var(--amber)] hover:bg-[#ff733f] text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,90,31,0.25)] transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Transmitting...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Transmit Message</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-[var(--rule)] flex items-center justify-between text-[10px] uppercase tracking-widest text-[var(--bone-dim)]">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--amber)]" />
                    {personalData.location}
                  </span>
                  <span className="text-[var(--bone)] font-mono">Direct Uplink // Zero-Loss Priority Relay to Arnav</span>
                </div>
              </div>
            </Card3D>
          </div>
        </div>
      </div>
    </section>
  );
}
