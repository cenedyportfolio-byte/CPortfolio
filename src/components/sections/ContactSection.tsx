"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-0">
      <div className="bg-gradient-to-r from-primary via-secondary to-accent py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-center justify-between gap-10"
          >
            {/* Left — CTA */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {"Let's build something amazing together! 🚀"}
              </h2>
              <p className="text-white/80 text-lg max-w-xl">
                {"I'm always open to new opportunities and interesting projects."}
              </p>
            </div>

            {/* Right — Contact Info */}
            <div className="flex flex-wrap items-center gap-6 text-white">
              <a href="mailto:cenedypalma@gmail.com" className="flex items-center gap-2 text-sm hover:underline">
                <Mail className="w-4 h-4" /> cenedypalma@gmail.com
              </a>
              <a href="tel:+8801746520223" className="flex items-center gap-2 text-sm hover:underline">
                <Phone className="w-4 h-4" /> +8801746520223
              </a>
              <span className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" /> Dhaka, Bangladesh
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
