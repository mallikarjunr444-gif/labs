// Reusable Framer Motion animation variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const floatingAnimation = {
  float: {
    y: [0, -20, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const glowAnimation = {
  glow: {
    boxShadow: [
      '0 0 20px rgba(0, 240, 255, 0.3)',
      '0 0 40px rgba(0, 240, 255, 0.6)',
      '0 0 20px rgba(0, 240, 255, 0.3)',
    ],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const slideInVariants = (direction: 'left' | 'right' | 'up' | 'down') => {
  const slideMap = {
    left: { hidden: { x: -100 }, visible: { x: 0 } },
    right: { hidden: { x: 100 }, visible: { x: 0 } },
    up: { hidden: { y: 100 }, visible: { y: 0 } },
    down: { hidden: { y: -100 }, visible: { y: 0 } },
  };
  return slideMap[direction];
};
