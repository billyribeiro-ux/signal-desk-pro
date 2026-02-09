export const MOTION_TOKENS = {
  duration: {
    instant: 0.1,
    fast: 0.2,
    normal: 0.4,
    slow: 0.6,
    cinematic: 1.0,
    epic: 1.4,
  },
  ease: {
    default: "power2.out",
    smooth: "power3.out",
    snap: "power4.out",
    bounce: "back.out(1.7)",
    elastic: "elastic.out(1, 0.3)",
    cinematic: "expo.out",
    inOut: "power2.inOut",
  },
  distance: {
    xs: 8,
    sm: 16,
    md: 32,
    lg: 64,
    xl: 100,
    hero: 120,
  },
  stagger: {
    tight: 0.04,
    normal: 0.08,
    relaxed: 0.12,
    dramatic: 0.2,
  },
  scale: {
    subtle: 0.98,
    normal: 0.95,
    dramatic: 0.85,
  },
} as const;
