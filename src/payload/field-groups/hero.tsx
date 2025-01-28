import { GroupField } from "payload";

const HeroFields: GroupField = {
  name: "hero",
  label: "Hero / Banner",
  type: "group",
  fields: [
    {
      name: "background_image",
      type: "upload",
      relationTo: "media",
      label: "Select the Background Image",
      required: true,
    },
    {
      name: "title",
      type: "text",
      label: "Heading (H1: Ideally 20 to 70 characters for SEO)",
      minLength: 3,
      maxLength: 200,
      required: true,
    },
    {
      name: "subtitle",
      type: "text",
      label: "Subtitle",
      minLength: 3,
      maxLength: 200,
    },
  ],
};

export default HeroFields;
