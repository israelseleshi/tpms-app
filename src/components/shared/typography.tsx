import { cn } from "@/lib/utils";
import { ReactNode, ElementType } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
  variant?: "display" | "heading" | "subheading" | "body" | "data";
  as?: ElementType;
}

const typographyVariants = {
  display: "text-2xl font-semibold tracking-tight",
  heading: "text-lg font-semibold",
  subheading: "text-base font-medium",
  body: "text-sm",
  data: "text-xs font-medium",
};

export function Typography({ 
  children, 
  className, 
  variant = "body",
  as: Component = "p" 
}: TypographyProps) {
  return (
    <Component className={cn(typographyVariants[variant], className)}>
      {children}
    </Component>
  );
}

export function Display({ children, className, as }: Omit<TypographyProps, "variant">) {
  return (
    <Typography variant="display" className={className} as={as}>
      {children}
    </Typography>
  );
}

export function Heading({ children, className, as }: Omit<TypographyProps, "variant">) {
  return (
    <Typography variant="heading" className={className} as={as}>
      {children}
    </Typography>
  );
}

export function Subheading({ children, className, as }: Omit<TypographyProps, "variant">) {
  return (
    <Typography variant="subheading" className={className} as={as}>
      {children}
    </Typography>
  );
}

export function Body({ children, className, as }: Omit<TypographyProps, "variant">) {
  return (
    <Typography variant="body" className={className} as={as}>
      {children}
    </Typography>
  );
}

export function Data({ children, className, as }: Omit<TypographyProps, "variant">) {
  return (
    <Typography variant="data" className={className} as={as}>
      {children}
    </Typography>
  );
}
