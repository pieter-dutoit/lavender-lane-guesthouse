import "server-only";

import type { Graph, Thing, WithContext } from "schema-dts";

type JsonLdProps = {
  data: Graph | WithContext<Thing>;
  id?: string;
};

export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
      id={id}
      type="application/ld+json"
    />
  );
}
