"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const visibleRef = useRef(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const rafRef = useRef<number>(0);

  // Check for reduced motion preference
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const lerp = useCallback((a: number, b: number, n: number) => {
    return a + (b - a) * n;
  }, []);

  useEffect(() => {
    // Detect touch device synchronously to bypass event registration in this hook execution
    const isTouchDevice = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    if (isTouchDevice) {
      setIsTouch(true);
      return;
    }

    if (prefersReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!visibleRef.current) {
        visibleRef.current = true;
        posRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
      );
      if (interactive) setIsHovering(true);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
      );
      if (interactive) setIsHovering(false);
    };

    const handleMouseOut = () => {
      visibleRef.current = false;
    };

    // Animation loop
    const animate = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Lerp toward target (dot is faster, ring is slower for trail effect)
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.15);
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.15);

      const dotX = targetRef.current.x;
      const dotY = targetRef.current.y;

      dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`;

      dot.style.opacity = visibleRef.current ? "1" : "0";
      ring.style.opacity = visibleRef.current ? "1" : "0";

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);
    document.addEventListener("mouseleave", handleMouseOut);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
      document.removeEventListener("mouseleave", handleMouseOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch, prefersReduced, lerp]);

  // Don't render on touch devices or reduced motion
  if (isTouch || prefersReduced) return null;

  return (
    <>
      {/* Inner dot — sticks to cursor */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: isHovering ? "12px" : "8px",
          height: isHovering ? "12px" : "8px",
          backgroundColor: "#fff",
          borderRadius: "50%",
          transition: "width 0.2s ease, height 0.2s ease",
          opacity: 0,
        }}
      />

      {/* Outer ring — trails behind with lerp */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{
          width: isHovering ? "48px" : isClicking ? "28px" : "36px",
          height: isHovering ? "48px" : isClicking ? "28px" : "36px",
          border: "1.5px solid rgba(255, 255, 255, 0.6)",
          borderRadius: "50%",
          transition:
            "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
          opacity: 0,
        }}
      />
    </>
  );
}
