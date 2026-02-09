"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION_TOKENS } from "@/lib/motion/tokens";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const scenes = [
  {
    title: "Onboard clients in minutes",
    description:
      "Multi-step wizard with autosave, conditional sections, and real-time validation.",
    gradient: "from-primary/10 to-info/10",
  },
  {
    title: "Command your projects",
    description:
      "Full lifecycle management with status tracking, filtering, and detail views.",
    gradient: "from-success/10 to-primary/10",
  },
  {
    title: "Streamline revisions",
    description:
      "Threaded feedback, approve/reject workflows, and complete audit trails.",
    gradient: "from-warning/10 to-danger/10",
  },
];

export function ScrollScenes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-scroll-scene]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: MOTION_TOKENS.distance.lg,
          duration: MOTION_TOKENS.duration.slow,
          ease: MOTION_TOKENS.ease.smooth,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        });
      });

      const pinned = containerRef.current?.querySelector("[data-pinned-scene]");
      if (pinned) {
        ScrollTrigger.create({
          trigger: pinned,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: true,
        });

        gsap.from("[data-pinned-content]", {
          opacity: 0,
          scale: MOTION_TOKENS.scale.normal,
          duration: MOTION_TOKENS.duration.cinematic,
          ease: MOTION_TOKENS.ease.cinematic,
          scrollTrigger: {
            trigger: pinned,
            start: "top top",
            end: "+=50%",
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <div ref={containerRef} className="space-y-32 py-24">
      {scenes.map((scene, i) => (
        <section
          key={i}
          data-scroll-scene
          className="mx-auto max-w-4xl px-6"
        >
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className={i % 2 === 1 ? "md:order-2" : ""}>
              <h2 className="text-heading-1 font-bold text-text">
                {scene.title}
              </h2>
              <p className="mt-4 text-body text-text-muted">
                {scene.description}
              </p>
            </div>
            <div
              className={`aspect-square rounded-3xl bg-gradient-to-br ${scene.gradient} flex items-center justify-center border border-border`}
            >
              <div className="h-16 w-16 rounded-2xl bg-surface shadow-elevation-2 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {i + 1}
                </span>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section
        data-pinned-scene
        className="flex min-h-screen items-center justify-center bg-gradient-to-b from-bg to-surface"
      >
        <div data-pinned-content className="text-center px-6">
          <h2 className="text-display font-bold text-text">
            Built for scale
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-body text-text-muted">
            From solo consultants to 100-person agencies, SignalDesk Pro adapts
            to your workflow.
          </p>
        </div>
      </section>
    </div>
  );
}
