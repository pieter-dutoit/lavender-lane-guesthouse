import { SectionHeader } from "@/components/section-header";
import { getPolicies } from "@/content/site-content";

export function HomePolicies() {
  const policies = getPolicies();

  return (
    <section
      aria-labelledby="policies-heading"
      className="relative w-full border-b border-secondary/30 py-8 lg:py-16"
    >
      <div id="policies" className="absolute -mt-32 md:-mt-36 lg:-mt-40" />

      <div className="container mx-auto flex flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          headingId="policies-heading"
          label="Good to Know"
          title="Policies"
          description="Plan your arrival and departure with our current check-in and check-out times."
        />

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {policies.map((policy) => (
            <li
              key={policy.title}
              className="overflow-hidden rounded-lg border border-secondary/50 bg-white shadow-sm"
            >
              <div className="border-b border-secondary/40 bg-secondary/15 px-4 py-3">
                <h3 className="text-base font-semibold text-primary">
                  {policy.title}
                </h3>
              </div>
              <div className="px-4 py-3 text-sm leading-relaxed text-foreground">
                <p className="whitespace-pre-line">{policy.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
