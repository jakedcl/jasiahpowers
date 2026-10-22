/** Shared motion tokens — keep in sync with CSS variables in globals.css */
export const MOTION = {
  duration: {
    fast: 150,
    base: 300,
    slow: 600,
  },
  easing: {
    out: 'cubic-bezier(0.22, 1, 0.36, 1)',
    inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  },
  stagger: 60,
  reveal: {
    distance: 12,
  },
  press: {
    scale: 0.98,
  },
  image: {
    hoverScale: 1.03,
  },
}

export function ms(key) {
  return `${MOTION.duration[key]}ms`
}

export function staggerDelay(index) {
  return index * MOTION.stagger
}
