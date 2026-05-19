type HomeSectionShellProps = {
  id: string;
  title: string;
};

export function HomeSectionShell({ id, title }: HomeSectionShellProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="scroll-mt-32 border-b border-secondary/30 md:scroll-mt-36 lg:scroll-mt-40"
    >
      <div className="container mx-auto min-h-72 px-4 py-16 sm:px-6 lg:px-8">
        <h2
          id={headingId}
          className="text-3xl font-semibold text-primary md:text-4xl"
        >
          {title}
        </h2>
      </div>
    </section>
  );
}
