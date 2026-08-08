import { UserRound } from "lucide-react";

import { SectionHeader } from "@/components/section-header";
import { getLocalizedAboutContent } from "@/content/localized-site-content";
import type { SiteLocale } from "@/i18n/locale";

type AboutTeamProps = {
  locale: SiteLocale;
};

export function AboutTeam({ locale }: AboutTeamProps) {
  const { team } = getLocalizedAboutContent(locale);

  return (
    <section
      aria-labelledby="about-team-heading"
      className="w-full border-b border-secondary/30 bg-secondary/10 py-10 lg:py-16"
    >
      <div className="container mx-auto flex flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          className="mx-auto max-w-2xl"
          headingId="about-team-heading"
          label={team.label}
          title={team.title}
          description={team.description}
        />

        <ul className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
          {team.members.map((member) => (
            <li
              key={member.name}
              className="flex flex-col items-center rounded-lg border border-secondary/50 bg-white p-6 text-center shadow-sm"
            >
              <span className="inline-flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <UserRound aria-hidden="true" className="size-7" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-balance text-primary">
                {member.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-accent">
                {member.role}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
