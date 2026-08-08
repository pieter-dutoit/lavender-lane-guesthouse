"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import type { MainNavItem } from "@/constants/navigation";
import type { SitePageKey } from "@/i18n/locale";

const MOBILE_MENU_ID = "site-header-mobile-menu";

type SiteHeaderMobileMenuProps = {
  navItems: ReadonlyArray<MainNavItem>;
  activePage: SitePageKey;
  openLabel: string;
  closeLabel: string;
};

export function SiteHeaderMobileMenu({
  navItems,
  activePage,
  openLabel,
  closeLabel,
}: SiteHeaderMobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    document.getElementById(MOBILE_MENU_ID)?.hidePopover();
  }

  function handleToggle(event: React.ToggleEvent<HTMLDivElement>) {
    setIsOpen(event.nativeEvent.newState === "open");
  }

  return (
    <div className="flex items-center md:hidden">
      <button
        type="button"
        popoverTarget={MOBILE_MENU_ID}
        popoverTargetAction="toggle"
        aria-controls={MOBILE_MENU_ID}
        aria-expanded={isOpen}
        aria-label={isOpen ? closeLabel : openLabel}
        className="inline-flex size-11 items-center justify-center rounded-md text-primary transition-colors duration-200 ease-out hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none"
      >
        {isOpen ? (
          <X aria-hidden="true" className="size-7" />
        ) : (
          <Menu aria-hidden="true" className="size-7" />
        )}
      </button>

      <div
        id={MOBILE_MENU_ID}
        popover="auto"
        onToggle={handleToggle}
        className="fixed inset-x-0 top-18 bottom-auto z-50 m-0 w-screen max-w-none -translate-y-2 border-y border-secondary/40 bg-background p-0 opacity-0 shadow-lg transition-[opacity,transform,display,overlay] transition-discrete duration-200 ease-out open:translate-y-0 open:opacity-100 starting:open:-translate-y-2 starting:open:opacity-0 motion-reduce:transition-none md:hidden"
      >
        <div className="container mx-auto px-4 py-5 sm:px-6">
          <ul className="space-y-1 text-base font-semibold">
            {navItems.map((item) => {
              const isActive = item.page === activePage;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={closeMenu}
                    className={`flex min-h-14 items-center border-b-2 px-5 transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none ${
                      isActive
                        ? "border-accent bg-primary/10 text-primary"
                        : "border-transparent text-foreground hover:bg-secondary/20 hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
