import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <Logo size={32} />
          <span className="text-sm text-muted-foreground">
            &copy; {currentYear} Cenedy Udoy Palma. All rights reserved.
          </span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <a href="https://github.com/cenedypalma" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors" aria-label="GitHub">
            <FaGithub size={18} />
          </a>
          <a href="https://www.linkedin.com/in/cenedy-palma-9560a7253/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors" aria-label="LinkedIn">
            <FaLinkedin size={18} />
          </a>
          <a href="https://x.com/cenedypalma" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors" aria-label="X/Twitter">
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
