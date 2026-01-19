import { ProjectsIcon } from "@sanity/icons";

const serviceCard = {
  name: "serviceCard",
  title: "Service Card",
  type: "object",
  icon: ProjectsIcon,
  fields: [
    {
      name: "serviceImage",
      title: "Service Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", title: "Alt Text", type: "string" },
      ],
    },
    {
      name: "title",
      title: "Card Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    },
  ],
};

export default serviceCard;
