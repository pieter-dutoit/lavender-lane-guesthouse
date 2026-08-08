import Image from "next/image";

import { ABOUT_HERO_IMAGE_SIZES } from "@/constants/image-sizes";
import { getAboutContent } from "@/content/site-content";

export function AboutHero() {
  const { hero } = getAboutContent();

  return (
    <section
      aria-labelledby="about-hero-heading"
      className="relative overflow-hidden border-b border-secondary/30 bg-[#edece8]"
    >
      <div className="relative aspect-4/3 w-full bg-[#edece8] sm:absolute sm:inset-y-0 sm:right-0 sm:left-1/2 sm:aspect-auto sm:h-full">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          preload
          sizes={ABOUT_HERO_IMAGE_SIZES}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#edece8_0%,rgb(237_236_232_/_0.92)_14%,rgb(237_236_232_/_0.42)_34%,rgb(237_236_232_/_0)_58%)] sm:block" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center py-10 sm:min-h-96 sm:w-1/2 sm:py-16 lg:min-h-112 lg:py-20">
          <span className="text-sm font-extrabold text-primary/70">
            {hero.label}
          </span>
          <h1
            id="about-hero-heading"
            className="mt-2 max-w-xl text-4xl font-semibold text-balance text-primary sm:text-5xl lg:text-6xl"
          >
            {hero.title}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-pretty text-foreground sm:text-lg">
            {hero.description}
          </p>
        </div>
      </div>
    </section>
  );
}
