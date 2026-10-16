"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Download, Menu, X } from "lucide-react";
import { personalData } from "@/data/personal";

interface NavbarProps {
  onOpenTerminal: () => void;
}

export default function Navbar({ onOpenTerminal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      const sections = ["hero", "about", "experience", "projects", "achievements", "skills", "contact"];
      const currentPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (currentPos >= top && currentPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Achievements", href: "#achievements" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-4 sm:px-8 ${
          scrolled
            ? "bg-[var(--ink)]/85 backdrop-blur-xl border-b border-[var(--rule)] shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo / Brand with Instrument Serif wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#hero");
            }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-[var(--ink-2)] border border-[var(--rule)] group-hover:border-[var(--amber)]/50 transition-all flex items-center justify-center shadow-sm">
              <span className="font-display italic text-lg font-normal text-[var(--bone)]">
                A<em className="text-[var(--amber)] not-italic">M</em>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-xs sm:text-sm tracking-wide text-[var(--bone)] group-hover:text-[var(--amber)] transition-colors font-mono">
                  {personalData.name}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--ok)]/10 text-[var(--ok)] border border-[var(--ok)]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--ok)] animate-pulse" />
                  Live
                </span>
              </div>
              <p className="text-[10px] text-[var(--bone-dim)] font-mono hidden sm:block">
                Systems & Infrastructure
              </p>
            </div>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--ink-2)] border border-[var(--rule)]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-3.5 py-1 text-xs font-mono transition-colors ${
                    isActive
                      ? "text-[var(--bone)] font-semibold"
                      : "text-[var(--bone-dim)] hover:text-[var(--bone)]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-[var(--ink-3)] rounded-full border border-[var(--rule)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Terminal Drawer Button */}
            <button
              onClick={onOpenTerminal}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--ink-2)] border border-[var(--rule)] text-xs text-[var(--bone-dim)] hover:text-[var(--bone)] hover:border-[var(--amber)]/40 transition-all font-mono"
              title="Open Systems Terminal"
            >
              <Terminal className="w-3.5 h-3.5 text-[var(--amber)]" />
              <span className="text-[11px]">HUD</span>
              <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-[var(--ink-3)] border border-[var(--rule)] rounded text-[var(--bone-dim)]">
                ⌘K
              </kbd>
            </button>

            {/* Resume Button */}
            <a
              href="/resume.pdf"
              download="Arnav_Mahajan_Resume.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--amber)]/10 hover:bg-[var(--amber)]/20 border border-[var(--amber)]/40 text-[var(--amber)] text-xs font-mono font-medium transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[var(--ink-2)] border border-[var(--rule)] text-[var(--bone-dim)] hover:text-[var(--bone)]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden rounded-xl p-5 bg-[var(--ink-2)] border border-[var(--rule)] shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-2 font-mono">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className="text-left px-4 py-2.5 rounded-lg text-xs font-medium text-[var(--bone-dim)] hover:bg-[var(--ink-3)] hover:text-[var(--bone)] transition-colors"
                >
                  {link.name}
                </button>
              ))}

              <div className="pt-3 mt-1 border-t border-[var(--rule)] flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTerminal();
                  }}
                  className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-[var(--ink-3)] text-xs text-[var(--amber)]"
                >
                  <span className="flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    Open Systems HUD
                  </span>
                  <span className="text-[10px] text-[var(--bone-dim)]">Terminal</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
