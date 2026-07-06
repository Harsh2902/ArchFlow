"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Royal-blue gradient with glow — the brand primary
        default:
          "bg-gradient-to-b from-flow-500 to-flow-700 text-white shadow-[0_0_0_1px_rgba(88,101,242,0.4),0_8px_24px_-6px_rgba(67,83,240,0.55)] hover:from-flow-400 hover:to-flow-600 hover:shadow-[0_0_0_1px_rgba(138,150,255,0.5),0_10px_32px_-6px_rgba(88,101,242,0.7)] active:scale-[0.98]",
        // Frosted glass
        secondary:
          "border border-foreground/10 bg-foreground/[0.04] text-foreground backdrop-blur-sm hover:border-foreground/20 hover:bg-foreground/[0.07]",
        ghost:
          "text-foreground/70 hover:bg-foreground/[0.05] hover:text-foreground",
        outline:
          "border border-foreground/10 bg-transparent text-foreground hover:border-flow-500/50 hover:text-flow-300"
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
