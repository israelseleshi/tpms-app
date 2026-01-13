"use client";

import { motion, Variants } from 'framer-motion';
import React from 'react';

interface AnimatedWrapperProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideIn' | 'scaleUp';
  delay?: number;
  className?: string;
}

const animationVariants: { [key: string]: Variants } = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
  slideIn: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  },
};

export function AnimatedWrapper({
  children,
  animation = 'fadeIn',
  delay = 0,
  className,
}: AnimatedWrapperProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={animationVariants[animation]}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
