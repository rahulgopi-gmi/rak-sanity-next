import { DocumentsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

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
    defineField({
      name: "title",
      type: "string",
      title: "Page Title",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
      group: "content",
    }),

    defineField({
      name: "sections",
      title: "Page Sections",
      type: "array",
      group: "content",
      of: [
        { type: "heroSection" },
        { type: "aboutSection" },
        { type: "featureItem" },
        { type: "campaigns"}
      ]
    }),

    defineField({
      name: "seo",
      title: "SEO Metadata",
      type: "seoMeta",
      group: "seo",
    }),
  ],

  preview: {
    select:{
        title: "title"
    }    
  }
});
