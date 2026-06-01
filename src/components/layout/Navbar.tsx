"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Download, ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cvDropdownOpen, setCvDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "#top" },
    { name: "About", href: "#about" },
    { name: "Process", href: "#process" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-3 shadow-sm" : "bg-white/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border bg-muted flex items-center justify-center shrink-0">
              <Image
                src="/images/hero.png"
                alt="Cenedy Palma Logo"
                fill
                sizes="36px"
                className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <span className="text-lg font-bold text-foreground">Cenedy Palma</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Button with Dropdown */}
          <div className="hidden lg:flex items-center relative">
            <button
              onClick={() => setCvDropdownOpen(!cvDropdownOpen)}
              onBlur={() => setTimeout(() => setCvDropdownOpen(false), 200)}
              className={`${buttonVariants({ size: "sm" })} rounded-full px-5 gap-2 shadow-md shadow-primary/20 flex items-center font-bold`}
            >
              <Download className="w-4 h-4" />
              Download CV
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${cvDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {cvDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-card border-2 border-foreground rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.15)] py-2 z-50 text-left select-none"
                >
                  <a
                    href="/CV/Cenedy Udoy Palma.pdf"
                    download="Cenedy Udoy Palma.pdf"
                    className="block px-4 py-2 text-xs font-black text-foreground hover:bg-muted hover:text-primary transition-colors border-b border-border/50"
                  >
                    💼 Software Engineer CV (General)
                  </a>
                  <a
                    href="/CV/it_industry.pdf"
                    download="Cenedy Udoy Palma - IT Industry CV.pdf"
                    className="block px-4 py-2 text-xs font-black text-foreground hover:bg-muted hover:text-primary transition-colors border-b border-border/50"
                  >
                    🛠️ IT Industry CV
                  </a>
                  <a
                    href="/CV/Candy_letex_cv_For_US_salimsazzed.pdf"
                    download="Cenedy Udoy Palma - US Format CV.pdf"
                    className="block px-4 py-2 text-xs font-black text-foreground hover:bg-muted hover:text-primary transition-colors"
                  >
                    🌐 US Format CV
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav aria-label="Mobile navigation" className="lg:hidden absolute top-full left-0 right-0 glass border-t border-white/20 p-4 flex flex-col gap-1 shadow-lg max-h-[calc(100vh-70px)] overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-medium text-foreground py-2.5 px-3 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="border-t border-border/30 mt-3 pt-3 flex flex-col gap-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-3 mb-1">Download CV Options:</p>
            <a
              href="/CV/Cenedy Udoy Palma.pdf"
              download="Cenedy Udoy Palma.pdf"
              className="flex items-center gap-2 text-sm font-bold text-foreground py-2 px-3 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              💼 Software Engineer CV (General)
            </a>
            <a
              href="/CV/it_industry.pdf"
              download="Cenedy Udoy Palma - IT Industry CV.pdf"
              className="flex items-center gap-2 text-sm font-bold text-foreground py-2 px-3 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              🛠️ IT Industry CV
            </a>
            <a
              href="/CV/Candy_letex_cv_For_US_salimsazzed.pdf"
              download="Cenedy Udoy Palma - US Format CV.pdf"
              className="flex items-center gap-2 text-sm font-bold text-foreground py-2 px-3 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              🌐 US Format CV
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
