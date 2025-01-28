import type { GlobalConfig, GroupField } from "payload";

import { isLoggedInOrIsPublished } from "@/payload/access/is-logged-in-or-is-published";
import { isLoggedIn } from "@/payload/access/is-logged-in";

import SEOFields from "../field-groups/seo";
import revalidateCache from "../hooks/globals/revalidate-cache";

const Hero: GroupField = {
  name: "hero",
  label: "Hero / Banner",
  type: "group",
  fields: [
    {
      name: "heading",
      label: "Page Heading",
      type: "text",
      required: true,
      minLength: 3,
      maxLength: 200,
    },
    {
      name: "sub_heading",
      label: "Sub Heading",
      type: "text",
      required: true,
      minLength: 3,
      maxLength: 200,
    },
  ],
};

const Overview: GroupField = {
  name: "overview",
  label: "About Us Overview",
  type: "group",
  fields: [
    {
      name: "title",
      label: "Heading (Ideally 5 to 10 words, up to 200 characters)",
      type: "text",
      minLength: 3,
      maxLength: 200,
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
      minLength: 3,
      maxLength: 1000,
    },
    {
      name: "image",
      label: "Image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
};

export const AboutUsPage: GlobalConfig = {
  slug: "about-us-page",
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidateCache("about-us-page")],
  },
  access: {
    read: isLoggedInOrIsPublished,
    update: isLoggedIn,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            Hero,
            Overview,
            {
              name: "subsections",
              label: "Sub-sections",
              type: "relationship",
              relationTo: "richtext-sections",
              hasMany: true,
            },
          ],
        },
        {
          label: "SEO",
          name: "seo",
          fields: SEOFields,
        },
      ],
    },
  ],
};
