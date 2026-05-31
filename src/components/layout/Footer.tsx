import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white py-8">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
            CP
          </div>
          <span className="text-sm text-muted-foreground">
            &copy; {currentYear} Cenedy Udoy Palma. All rights reserved.
          </span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors" aria-label="GitHub">
            <FaGithub size={18} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors" aria-label="LinkedIn">
            <FaLinkedin size={18} />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors" aria-label="X/Twitter">
            <FaXTwitter size={18} />
          </a>
          <a href="mailto:cenedypalma@gmail.com" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors" aria-label="Email">
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
