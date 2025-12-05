import { defineField, defineType } from "sanity";

export const document = defineType({
    name: "document",
    title: "Document",
    type: "object",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
    ]
});