"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MOTION_TOKENS } from "@/lib/motion/tokens";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";

export function useHoverElevation(ref: React.RefObject<HTMLElement | null>) {
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (prefersReduced || !el) return;

    const onEnter = () => {
      gsap.to(el, {
        y: -2,
        boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.1)",
        duration: MOTION_TOKENS.duration.fast,
        ease: MOTION_TOKENS.ease.default,
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        y: 0,
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.04)",
        duration: MOTION_TOKENS.duration.fast,
        ease: MOTION_TOKENS.ease.default,
      });
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref, prefersReduced]);
}

export function MicroInteractionDemo() {
  const card1 = useRef<HTMLDivElement>(null);
  const card2 = useRef<HTMLDivElement>(null);
  const card3 = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useHoverElevation(card1);
  useHoverElevation(card2);
  useHoverElevation(card3);

  useEffect(() => {
    const btn = buttonRef.current;
    if (prefersReduced || !btn) return;

    const onPress = () => {
      gsap.to(btn, { scale: 0.96, duration: 0.1, ease: "power2.out" });
    };
    const onRelease = () => {
      gsap.to(btn, { scale: 1, duration: 0.2, ease: "back.out(2)" });
    };

    btn.addEventListener("mousedown", onPress);
    btn.addEventListener("mouseup", onRelease);
    btn.addEventListener("mouseleave", onRelease);
    return () => {
      btn.removeEventListener("mousedown", onPress);
      btn.removeEventListener("mouseup", onRelease);
      btn.removeEventListener("mouseleave", onRelease);
    };
  }, [prefersReduced]);

  return (
    <div className="space-y-8">
      <h3 className="text-heading-2 font-bold text-text">Micro Interactions</h3>
      <div className="grid gap-6 sm:grid-cols-3">
        {[card1, card2, card3].map((ref, i) => (
          <div
            key={i}
            ref={ref}
            className="cursor-pointer rounded-2xl border border-border bg-surface p-6 shadow-elevation-1 transition-colors"
          >
            <div className="mb-3 h-10 w-10 rounded-xl bg-primary-muted flex items-center justify-center">
              <span className="text-sm font-bold text-primary">{i + 1}</span>
            </div>
            <h4 className="text-body font-semibold text-text">
              Hover Card {i + 1}
            </h4>
            <p className="mt-1 text-body-sm text-text-muted">
              Hover to see elevation animation
            </p>
          </div>
        ))}
      </div>
      <button
        ref={buttonRef}
        className="inline-flex h-12 items-center rounded-xl bg-primary px-8 text-body font-semibold text-text-inverse shadow-elevation-2 transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Press me for scale feedback
      </button>
    </div>
  );
}
