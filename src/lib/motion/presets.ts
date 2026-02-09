import { MOTION_TOKENS } from "./tokens";

export const fadeUp = {
  from: { opacity: 0, y: MOTION_TOKENS.distance.md },
  to: { opacity: 1, y: 0, duration: MOTION_TOKENS.duration.normal, ease: MOTION_TOKENS.ease.smooth },
};

export const fadeDown = {
  from: { opacity: 0, y: -MOTION_TOKENS.distance.sm },
  to: { opacity: 1, y: 0, duration: MOTION_TOKENS.duration.fast, ease: MOTION_TOKENS.ease.default },
};

export const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1, duration: MOTION_TOKENS.duration.normal, ease: MOTION_TOKENS.ease.default },
};

export const scaleIn = {
  from: { opacity: 0, scale: MOTION_TOKENS.scale.normal },
  to: { opacity: 1, scale: 1, duration: MOTION_TOKENS.duration.normal, ease: MOTION_TOKENS.ease.bounce },
};

export const slideInLeft = {
  from: { opacity: 0, x: -MOTION_TOKENS.distance.lg },
  to: { opacity: 1, x: 0, duration: MOTION_TOKENS.duration.slow, ease: MOTION_TOKENS.ease.cinematic },
};

export const slideInRight = {
  from: { opacity: 0, x: MOTION_TOKENS.distance.lg },
  to: { opacity: 1, x: 0, duration: MOTION_TOKENS.duration.slow, ease: MOTION_TOKENS.ease.cinematic },
};

export const heroReveal = {
  from: { opacity: 0, y: MOTION_TOKENS.distance.hero, scale: MOTION_TOKENS.scale.dramatic },
  to: { opacity: 1, y: 0, scale: 1, duration: MOTION_TOKENS.duration.epic, ease: MOTION_TOKENS.ease.cinematic },
};

export const staggerChildren = (stagger = MOTION_TOKENS.stagger.normal) => ({
  stagger,
});
