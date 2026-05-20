import type { ReactNode } from "react";

type SectionHeaderAlign = "left" | "center";

type SectionHeaderProps = {
  label?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  headingId?: string;
  align?: SectionHeaderAlign;
  className?: string;
};

const ALIGNMENT_CLASSES: Record<SectionHeaderAlign, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
};

const DESCRIPTION_ALIGNMENT_CLASSES: Record<SectionHeaderAlign, string> = {
  left: "",
  center: "mx-auto",
};

function joinClasses(...classes: Array<string | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function SectionHeader({
  label,
  title,
  description,
  headingId,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={joinClasses(
        "flex flex-col gap-1",
        ALIGNMENT_CLASSES[align],
        className,
      )}
    >
      {label ? (
        <span className="text-sm font-extrabold text-primary">{label}</span>
      ) : null}
      <h2
        id={headingId}
        className="text-2xl font-semibold text-balance text-black sm:text-3xl md:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p
          className={joinClasses(
            "max-w-prose text-sm text-pretty text-foreground",
            DESCRIPTION_ALIGNMENT_CLASSES[align],
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
