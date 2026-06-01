"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <Link
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2.5"
          >
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
                onClick={(e) => {
                  if (link.href.startsWith("#")) {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="#"
              className={`${buttonVariants({ size: "sm" })} rounded-full px-5 gap-2 shadow-md shadow-primary/20`}
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
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
              onClick={(e) => {
                setMobileMenuOpen(false);
                if (link.href.startsWith("#")) {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="#"
            className={`${buttonVariants()} w-full mt-3 rounded-full gap-2 shrink-0`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Download className="w-4 h-4" />
            Download CV
          </a>
        </nav>
      )}
    </header>
  );
}
