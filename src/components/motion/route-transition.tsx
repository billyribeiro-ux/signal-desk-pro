"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { MOTION_TOKENS } from "@/lib/motion/tokens";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced || !ref.current) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: MOTION_TOKENS.distance.xs },
      {
        opacity: 1,
        y: 0,
        duration: MOTION_TOKENS.duration.fast,
        ease: MOTION_TOKENS.ease.default,
      },
    );
  }, [pathname, prefersReduced]);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
}
