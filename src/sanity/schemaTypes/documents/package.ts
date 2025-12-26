import { TagsIcon } from "@sanity/icons";
import { defineType } from "sanity";

export const packages = defineType({
    name: "packages",
    title: "Packages",
    type: "document",
    icon: TagsIcon,    
    fields: [        
        {
            name: "order",
            title: "Order",
            type: "number",
            validation: (Rule) => Rule.required(),
            initialValue: 1
        },
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        },

        {
            name: "label",
            title: "Label",
            type: "string",
            validation: (Rule) => Rule.required(),
        },

        {
            name: "content",
            title: "Content",
            type: "text"            
        },

        {
            name: "currency",
            title: "Currency",
            type: "string",
            options: {
                list: [
                    { title: "AED (د.إ)", value: "AED" },
                    { title: "USD ($)", value: "$" },
                    { title: "GBP (£)", value: "£" },
                ],
            },
            validation: (Rule) => Rule.required(),
        },

        {
            name: "price",
            title: "Price",
            type: "number",
            validation: (Rule) => Rule.required(),
        },

        {
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
        },

        {
            name: "ctaText",
            title: "Button Text",
            type: "string",
        },

        {
            name: "ctaLink",
            title: "Button Link",
            type: "string",
        },

        {
            name: "sectionTitle",
            title: "Features Section Title",
            type: "string",
        },

        {
            name: "features",
            title: "Included Features",
            type: "array",
            of: [{ type: "string" }],
        }
    ]
})