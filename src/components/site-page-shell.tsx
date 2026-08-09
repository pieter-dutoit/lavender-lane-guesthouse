import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { SiteLocale, SitePageKey } from "@/i18n/locale";

type SitePageShellProps = {
  children: ReactNode;
  locale: SiteLocale;
  page: SitePageKey;
};

export function SitePageShell({
  children,
  locale,
  page,
}: SitePageShellProps) {
  return (
    <>
      <SiteHeader locale={locale} page={page} />
      {children}
      <SiteFooter locale={locale} page={page} />
    </>
  );
}
