import { GroupField } from "payload";

const Amenities: GroupField = {
  name: "amenities",
  type: "group",
  label: "General Amenities",
  fields: [
    {
      name: "heading",
      label: "Amenities Heading",
      type: "text",
      minLength: 3,
      maxLength: 100,
      required: true,
    },
    {
      name: "description",
      label: "Amenities Description",
      type: "textarea",
      required: true,
      minLength: 3,
      maxLength: 1000,
    },
    {
      name: "background_image",
      label: "Amenities Background Image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "general_amenities",
      label: "General Amenities",
      type: "relationship",
      relationTo: "amenities",
      hasMany: true,
      required: true,
      minRows: 1,
      maxRows: 100,
    },
  ],
};

export default Amenities;
