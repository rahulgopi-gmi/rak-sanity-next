import { DocumentsIcon } from "@sanity/icons";
import { defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Pages",
  type: "document",
  icon: DocumentsIcon,

  groups: [
    { name: "content", title: "Content" },
    { name: "seo", title: "SEO" },
  ],

  fields: [
    {
      name: "title",
      type: "string",
      title: "Page Title",
      group: "content",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
      group: "content",
    },
    {
      name: "template",
      title: "Template",
      type: "string",
      options: {
        list: [
          { title: "Campaigns", value: "campaigns" },
          { title: "Other", value: "other" },
        ],
        layout: "dropdown",
      },
      initialValue: "campaign",
      validation: Rule => Rule.required().error("Template is required"),
    },
    {
      name: "sections",
      title: "Page Sections",
      type: "array",
      group: "content",
      description:"Only one section can be added.",
      of: [
        { type: "heroSection" },
        { type: "aboutSection" },
        { type: "featureItem" },
        { type: "campaigns"}
      ],
      validation: (Rule) => Rule.max(1).warning("Only one section can be added.")
    },
    {
      name: "seo",
      title: "SEO Metadata",
      type: "seoMeta",
      group: "seo",
    },
  ],

  preview: {
    select:{
        title: "title"
    }    
  }
});
