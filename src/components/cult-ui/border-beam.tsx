"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  children: ReactNode;
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function BorderBeam({
  children,
  className = "",
  size = 2,
  duration = 2,
  colorFrom = "rgb(59 130 246)", // blue-500
  colorTo = "rgb(147 51 234)", // purple-600
}: BorderBeamProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      {children}
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          background: `linear-gradient(90deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
        }}
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div 
        className="absolute inset-0 rounded-lg"
        style={{
          boxShadow: `0 0 ${size}px 0 ${colorFrom} inset, 0 0 ${size}px 0 ${colorTo} inset`,
        }}
      />
    </div>
  );
}
