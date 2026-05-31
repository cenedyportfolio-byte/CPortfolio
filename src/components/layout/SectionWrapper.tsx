"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export function SectionWrapper({ children, id, className = "" }: SectionWrapperProps) {
  return (
    <section id={id} className={`py-24 ${className}`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              staggerChildren: 0.2,
            },
          },
        }}
        className="container mx-auto px-4 md:px-8 max-w-7xl"
      >
        {children}
      </motion.div>
    </section>
  );
}

// Reusable child item for staggered animations
export const motionItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};
