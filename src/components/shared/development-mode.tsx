"use client";

import { ReactNode } from "react";

interface DevelopmentModeProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function DevelopmentMode({ children, fallback = null }: DevelopmentModeProps) {
  if (process.env.NODE_ENV === "development") {
    return <>{children}</>;
  }
  return <>{fallback}</>;
}
