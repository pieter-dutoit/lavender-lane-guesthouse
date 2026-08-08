import { SectionHeader } from "@/components/section-header";
import { getLocalizedAboutContent } from "@/content/localized-site-content";
import type { SiteLocale } from "@/i18n/locale";

type AboutStoryProps = {
  locale: SiteLocale;
};

export function AboutStory({ locale }: AboutStoryProps) {
  const { story } = getLocalizedAboutContent(locale);

  return (
    <section
      aria-labelledby="about-story-heading"
      className="w-full border-b border-secondary/30 py-10 lg:py-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-lg border border-secondary/30 bg-[linear-gradient(135deg,rgb(155_199_199_/_0.28)_0%,rgb(255_255_255_/_0.98)_52%,rgb(120_88_164_/_0.12)_100%)] p-6 shadow-sm sm:p-8 lg:grid-cols-3 lg:gap-12 lg:p-10">
          <SectionHeader
            headingId="about-story-heading"
            label={story.label}
            title={story.title}
          />

          <div className="space-y-5 text-sm leading-7 text-pretty text-foreground sm:text-base lg:col-span-2">
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
