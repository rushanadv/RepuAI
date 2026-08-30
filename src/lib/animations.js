export const EASE = [0.22, 1, 0.36, 1];

export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE }
  }
};

export const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: EASE }
  })
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.08 }
  })
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay: i * 0.1, ease: EASE }
  })
};

export const slideLeft = {
  hidden: { opacity: 0, x: -70 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, delay: i * 0.1, ease: EASE }
  })
};

export const slideRight = {
  hidden: { opacity: 0, x: 70 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, delay: i * 0.1, ease: EASE }
  })
};

export const clipWipe = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: (i = 0) => ({
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.9, delay: i * 0.12, ease: EASE }
  })
};

export const getVariants = (variant, prefersReduced) =>
  prefersReduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.01 } } }
    : variant;
