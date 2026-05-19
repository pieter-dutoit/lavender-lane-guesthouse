const HOME_SECTION_NAV_ITEMS = [
  {
    label: "Rooms & Rates",
    href: "#rooms-rates",
  },
  {
    label: "Amenities",
    href: "#amenities",
  },
  {
    label: "Gallery",
    href: "#gallery",
  },
  {
    label: "Contact",
    href: "#contact",
  },
  {
    label: "FAQs",
    href: "#faqs",
  },
] as const;

export function HomeSectionNav() {
  return (
    <nav
      aria-label="Guesthouse sections"
      className="sticky top-18 z-40 border-b border-secondary/30 bg-[#edece8]/60 shadow-sm backdrop-blur-sm backdrop-saturate-150 md:top-16"
    >
      <div className="container mx-auto overflow-x-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex min-w-max items-center gap-6 text-sm md:text-base font-semibold text-foreground md:gap-10 lg:gap-14">
          {HOME_SECTION_NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="flex min-h-11 items-center whitespace-nowrap py-4 transition-colors duration-200 ease-out hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
