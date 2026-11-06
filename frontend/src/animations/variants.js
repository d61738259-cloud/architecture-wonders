// Framer Motion Animation Presets for Architecture Wonders
// Styled for "Modern Editorial Architecture" — refined, calm, purposeful

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: custom * 0.15,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: 'easeOut' },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const heroTextStagger = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      delay: 0.2 + i * 0.18,
      ease: [0.22, 1, 0.36, 1], // Architectural cubic-bezier
    },
  }),
};

export const imageMaskReveal = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.77, 0, 0.175, 1],
    },
  },
};

export const cardHover = {
  rest: { y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  hover: { y: -6, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

export const mobileMenuVariant = {
  closed: {
    opacity: 0,
    x: '100%',
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  open: {
    opacity: 1,
    x: '0%',
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
