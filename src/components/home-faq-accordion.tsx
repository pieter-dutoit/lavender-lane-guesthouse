"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { joinClasses } from "@/utils/join-classes";

type HomeFaqAccordionItem = {
  id: string;
  question: string;
  answer: string;
};

type HomeFaqAccordionProps = {
  items: ReadonlyArray<HomeFaqAccordionItem>;
};

export function HomeFaqAccordion({ items }: HomeFaqAccordionProps) {
  const [openIds, setOpenIds] = useState<ReadonlyArray<string>>([]);

  function toggleItem(id: string) {
    setOpenIds((currentOpenIds) =>
      currentOpenIds.includes(id)
        ? currentOpenIds.filter((openId) => openId !== id)
        : [...currentOpenIds, id],
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const triggerId = `faq-${item.id}-trigger`;
        const panelId = `faq-${item.id}-panel`;

        return (
          <li
            key={item.id}
            className="overflow-hidden rounded-lg border border-secondary/50 bg-white shadow-sm"
          >
            <button
              id={triggerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggleItem(item.id)}
              className="group flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors duration-200 ease-out hover:bg-secondary/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none sm:px-5"
            >
              <span className="text-sm md:text-base font-semibold text-primary">
                {item.question}
              </span>
              <ChevronDown
                aria-hidden="true"
                className={joinClasses(
                  "size-5 shrink-0 text-primary transition-transform duration-200 ease-out motion-reduce:transition-none",
                  isOpen && "rotate-180",
                )}
              />
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
              className={joinClasses(
                "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 text-sm leading-relaxed text-pretty text-foreground sm:px-5 sm:pb-5">
                  {item.answer}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
