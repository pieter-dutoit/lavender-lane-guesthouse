"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { joinClasses } from "@/utils/join-classes";

type CarouselArrowButtonDirection = "previous" | "next";
type CarouselArrowButtonVariant = "main" | "thumbnail";

type CarouselArrowButtonProps = {
  direction: CarouselArrowButtonDirection;
  variant: CarouselArrowButtonVariant;
  ariaLabel: string;
  disabled: boolean;
  onClick: () => void;
};

const baseButtonClasses =
  "items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-70";

const variantClasses: Record<CarouselArrowButtonVariant, string> = {
  main: "pointer-events-auto absolute top-1/2 inline-flex size-16 -translate-y-1/2 border border-primary bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 hover:text-primary-foreground focus-visible:outline-primary disabled:bg-primary/50 disabled:text-primary-foreground/70",
  thumbnail:
    "absolute top-1/2 z-10 hidden size-12 -translate-y-1/2 rounded-full border border-secondary/50 bg-white text-primary shadow-lg hover:bg-secondary/20 hover:text-accent focus-visible:outline-accent disabled:bg-white/80 disabled:text-primary/35 sm:inline-flex",
};

const directionClasses: Record<
  CarouselArrowButtonVariant,
  Record<CarouselArrowButtonDirection, string>
> = {
  main: {
    previous: "left-0 rounded-r-md",
    next: "right-0 rounded-l-md",
  },
  thumbnail: {
    previous: "left-0",
    next: "right-0",
  },
};

export function CarouselArrowButton({
  direction,
  variant,
  ariaLabel,
  disabled,
  onClick,
}: CarouselArrowButtonProps) {
  const Icon = direction === "previous" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={joinClasses(
        baseButtonClasses,
        variantClasses[variant],
        directionClasses[variant][direction],
      )}
    >
      <Icon
        aria-hidden="true"
        className={variant === "main" ? "size-6" : "size-5"}
      />
    </button>
  );
}
