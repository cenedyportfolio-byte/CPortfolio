"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { Menu, X, Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCv, setActiveCv] = useState<{ title: string; url: string; filename: string } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen || activeCv) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen, activeCv]);

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
            <Logo size={36} />
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

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => setActiveCv({
                title: "Software Engineer CV",
                url: "/CV/Cenedy Udoy Palma.pdf",
                filename: "Cenedy Udoy Palma.pdf"
              })}
              className={`${buttonVariants({ size: "sm" })} rounded-full px-5 gap-2 shadow-md shadow-primary/20 flex items-center font-bold`}
            >
              <Download className="w-4 h-4" />
              Download CV
            </button>
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
            <button
              onClick={() => {
                setActiveCv({
                  title: "Software Engineer CV",
                  url: "/CV/Cenedy Udoy Palma.pdf",
                  filename: "Cenedy Udoy Palma.pdf"
                });
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 text-sm font-black bg-primary text-white py-3 px-4 rounded-xl border-2 border-foreground shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:-translate-y-px hover:-translate-x-px hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" /> Download CV
            </button>
          </div>
        </nav>
      )}
      {/* CV PDF Preview Modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {activeCv && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 md:p-6 select-none"
              onClick={() => setActiveCv(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 15, opacity: 0 }}
                transition={{ type: "spring", duration: 0.3 }}
                className="relative w-full max-w-5xl h-[80vh] bg-white dark:bg-card border-4 border-foreground rounded-2xl shadow-[20px_20px_0px_rgba(0,0,0,1)] dark:shadow-[20px_20px_0px_rgba(255,255,255,0.15)] flex flex-col overflow-hidden select-text pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Browser/Document Top bar */}
                <div className="h-14 border-b-4 border-foreground bg-muted/30 px-4 md:px-6 flex items-center justify-between shrink-0 select-none">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 border border-foreground" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500 border border-foreground" />
                    <div className="w-3 h-3 rounded-full bg-green-500 border border-foreground" />
                    <span className="hidden sm:inline-block font-mono text-[10px] font-black uppercase bg-muted px-2.5 py-1 border border-foreground/30 rounded-md text-foreground/80 ml-3">
                      {activeCv.title}
                    </span>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2.5">
                    <a
                      href={activeCv.url}
                      download={activeCv.filename}
                      className="inline-flex items-center gap-2 bg-primary text-white font-black text-xs px-4 py-2 border-2 border-foreground rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-y-px hover:translate-x-px hover:shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Download PDF
                    </a>
                    <button
                      onClick={() => setActiveCv(null)}
                      className="p-2 border-2 border-foreground bg-white dark:bg-card text-foreground hover:bg-red-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                      aria-label="Close PDF preview"
                    >
                      <X className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>

                {/* Dynamic Notification bar on Mobile viewport */}
                <div className="sm:hidden bg-amber-500/10 border-b-2 border-foreground/30 px-4 py-2 text-[10px] font-bold text-amber-600 dark:text-amber-400 select-none">
                  💡 Scroll to read preview, or tap the Download button to save.
                </div>
                
                {/* PDF Preview Frame */}
                <div className="flex-1 w-full bg-zinc-100 dark:bg-zinc-950 relative overflow-hidden select-text pointer-events-auto">
                  <iframe
                    src={`${activeCv.url}#toolbar=0`}
                    title={`${activeCv.title} Live Preview`}
                    className="w-full h-full border-none select-text pointer-events-auto bg-white dark:bg-zinc-900"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}
