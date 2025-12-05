import { DocumentTextIcon, TagsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const packages = defineType({
    name: "packages",
    title: "Packages",
    type: "document",
    icon: TagsIcon,
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "label",
            title: "Label",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "currency",
            title: "Currency",
            type: "string",
            options: {
                list: [
                    { title: "AED", value: "AED" },
                    { title: "USD", value: "USD" },
                    { title: "EUR", value: "EUR" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "price",
            title: "Price",
            type: "number",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "billingCycle",
            title: "Billing Cycle",
            type: "string",
            options: {
                list: [
                    { title: "Monthly", value: "monthly" },
                    { title: "Annually", value: "annually" },
                ],
            },
            initialValue: "annually",
        }),

        defineField({
            name: "ctaText",
            title: "Button Text",
            type: "string",
        }),

        defineField({
            name: "ctaLink",
            title: "Button Link",
            type: "string",
        }),

        defineField({
            name: "sectionTitle",
            title: "Features Section Title",
            type: "string",
        }),

        defineField({
            name: "features",
            title: "Included Features",
            type: "array",
            of: [{ type: "string" }],
        })
    ]
})