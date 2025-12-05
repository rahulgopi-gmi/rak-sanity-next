import { defineType, defineField } from "sanity";

export default defineType({
    name: "settings",
    title: "Global Settings",
    type: "document",
    fields: [
        defineField({
            name: "headerMenu",
            title: "Header Menu",
            type: "array",
            of: [{ type: "reference", to: [{ type: "page" }] }],
        }),

        defineField({
            name: "footerText",
            title: "Footer Text",
            type: "text",
        }),

        defineField({
            name: "defaultSeo",
            type: "seo",
        }),
    ]
});
