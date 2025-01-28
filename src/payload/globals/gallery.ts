import { GlobalConfig } from "payload";
import revalidateCache from "../hooks/globals/revalidate-cache";

import { isLoggedInOrIsPublished } from "../access/is-logged-in-or-is-published";
import { isLoggedIn } from "../access/is-logged-in";

export const Gallery: GlobalConfig = {
  slug: "gallery",
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidateCache("gallery")],
  },
  access: {
    read: isLoggedInOrIsPublished,
    update: isLoggedIn,
  },
  fields: [
    {
      name: "images",
      type: "group",
      label: "Images",
      fields: [
        {
          name: "exterior",
          label: "Exterior Gallery (3 or more images)",
          type: "upload",
          required: true,
          relationTo: "media",
          hasMany: true,
          minRows: 3,
          maxRows: 10,
        },
        {
          name: "interior",
          label: "Interior Gallery (3 or more images)",
          type: "upload",
          required: true,
          relationTo: "media",
          hasMany: true,
          minRows: 3,
          maxRows: 10,
        },
      ],
    },
  ],
};
