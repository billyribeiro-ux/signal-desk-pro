"use client";

import { MicroInteractionDemo } from "@/components/motion/micro-interactions";

export default function MotionShowcasePage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-heading-1 font-bold text-text">Motion Showcase</h1>
        <p className="mt-1 text-body text-text-muted">
          Interactive demos of the GSAP-powered motion system
        </p>
      </div>
      <MicroInteractionDemo />
    </div>
  );
}
