import { HashLink } from "@/components/hash-link";
import { getSiteCopy } from "@/content/site-copy";
import type { SiteLocale } from "@/i18n/locale";

type HomeSectionNavProps = {
  locale: SiteLocale;
};

export function HomeSectionNav({ locale }: HomeSectionNavProps) {
  const { navigation } = getSiteCopy(locale);
  const items = [
    { label: navigation.roomsRates, href: "#rooms-rates" },
    { label: navigation.amenities, href: "#amenities" },
    { label: navigation.gallery, href: "#gallery" },
    { label: navigation.contact, href: "#contact" },
    { label: navigation.policies, href: "#policies" },
    { label: navigation.faqs, href: "#faqs" },
  ];

  return (
    <nav
      aria-label={navigation.guesthouseSections}
      className="sticky top-18 z-40 border-b border-secondary/30 bg-[#edece8]/60 shadow-sm backdrop-blur-sm backdrop-saturate-150 md:top-16"
    >
      <div className="container mx-auto overflow-x-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex min-w-max items-center gap-6 text-sm font-semibold text-foreground md:gap-10 md:text-base lg:gap-14">
          {items.map((item) => (
            <li key={item.href}>
              <HashLink
                href={item.href}
                className="flex min-h-11 items-center whitespace-nowrap py-4 transition-colors duration-200 ease-out hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none"
              >
                {item.label}
              </HashLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
