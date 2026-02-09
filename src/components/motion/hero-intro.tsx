"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MOTION_TOKENS } from "@/lib/motion/tokens";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";

export function HeroIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: MOTION_TOKENS.ease.cinematic } });

      tl.from("[data-hero-badge]", {
        opacity: 0,
        y: MOTION_TOKENS.distance.sm,
        duration: MOTION_TOKENS.duration.normal,
      })
        .from(
          "[data-hero-heading]",
          {
            opacity: 0,
            y: MOTION_TOKENS.distance.hero,
            scale: MOTION_TOKENS.scale.dramatic,
            duration: MOTION_TOKENS.duration.epic,
          },
          "-=0.2",
        )
        .from(
          "[data-hero-sub]",
          {
            opacity: 0,
            y: MOTION_TOKENS.distance.md,
            duration: MOTION_TOKENS.duration.slow,
          },
          "-=0.8",
        )
        .from(
          "[data-hero-cta]",
          {
            opacity: 0,
            y: MOTION_TOKENS.distance.sm,
            scale: MOTION_TOKENS.scale.subtle,
            duration: MOTION_TOKENS.duration.normal,
          },
          "-=0.4",
        )
        .from(
          "[data-hero-visual]",
          {
            opacity: 0,
            y: MOTION_TOKENS.distance.xl,
            scale: 0.9,
            duration: MOTION_TOKENS.duration.epic,
          },
          "-=0.6",
        );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 py-24 text-center lg:py-32">
        <div
          data-hero-badge
          className="mb-6 inline-flex items-center rounded-full border border-primary/30 bg-primary-muted px-4 py-1.5 text-caption font-medium text-primary"
        >
          Client Operations Platform
        </div>

        <h1
          data-hero-heading
          className="text-display-xl font-bold tracking-tight text-text sm:text-display-xl"
        >
          Run your agency
          <br />
          <span className="bg-gradient-to-r from-primary via-info to-primary bg-clip-text text-transparent">
            with precision
          </span>
        </h1>

        <p
          data-hero-sub
          className="mx-auto mt-6 max-w-2xl text-body text-text-muted lg:text-heading-3"
        >
          SignalDesk Pro streamlines client onboarding, project management, and
          revision workflows into one powerful command center.
        </p>

        <div data-hero-cta className="mt-10 flex items-center justify-center gap-4">
          <a
            href="/dashboard"
            className="inline-flex h-12 items-center rounded-xl bg-primary px-8 text-body font-semibold text-text-inverse shadow-elevation-2 transition-all hover:bg-primary-hover hover:shadow-elevation-3 active:scale-[0.98]"
          >
            Open Dashboard
          </a>
          <a
            href="/motion-showcase"
            className="inline-flex h-12 items-center rounded-xl border border-border px-8 text-body font-semibold text-text transition-all hover:bg-surface active:scale-[0.98]"
          >
            View Motion Demo
          </a>
        </div>

        <div
          data-hero-visual
          className="mt-16 rounded-2xl border border-border bg-surface p-2 shadow-elevation-4"
        >
          <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/5 via-info/5 to-primary/10 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">S</span>
              </div>
              <p className="text-body-sm text-text-muted">Dashboard Preview</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
