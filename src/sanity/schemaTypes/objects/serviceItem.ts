import { ProjectsIcon } from "@sanity/icons";

const serviceItem = {
    name: "serviceItem",
    title: "Service Items",
    type: "object",
    icon: ProjectsIcon,
    fields: [
        {
            name: "bannerImageDesktop",
            type: "image",
            title: "Banner Image (Desktop)",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string", title: "Alt Text" }]
        },
        {
            name: "bannerImageMobile",
            type: "image",
            title: "Banner Image (Mobile)",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string", title: "Alt Text" }]
        },
        {
            name: "title",
            title: "Title",
            type: "string"
        },
        {
            name: "header",
            title: "header",
            type: "header"
        },        
        {
            name: "tag",
            title: "Tag / Label",
            type: "string"           
        },
        {
            name: "subHeader",
            title: "Sub Header",
            type: "blockContent"           
        },
        {
            name: "subTitle",
            title: "Sub Title",
            type: "text"
        },        
        {
            name: "subContent",
            title: "Sub Content",
            type: "text"
        },
        {
            name: "subImageDesktop",
            type: "image",
            title: "Sub Image (Desktop)",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string", title: "Alt Text" }]
        },
        {
            name: "subImageMobile",
            type: "image",
            title: "Sub Image (Mobile)",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string", title: "Alt Text" }]
        },
        {
            name: "listCardsHeader",
            title: "List Cards Header",
            type: "blockContent"
        },
        {
            name: "cards",
            title: "List Cards",
            type: "array",
            of: [{ type: "serviceCard" }],
            validation: (Rule: any) => Rule.min(1),
        },
        {
            name: "contentImageDesktop",
            type: "image",
            title: "Content Image (Desktop)",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string", title: "Alt Text" }]
        },
        {
            name: "contentImageMobile",
            type: "image",
            title: "Content Image (Mobile)",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string", title: "Alt Text" }]
        },
        {
            name: "imageContent",
            title: "Image Content",
            type: "text"
        },
        {
            name: "service",
            title: "Service Cards",
            type: "array",
            of: [{ type: "serviceCard" }],
            validation: (Rule: any) => Rule.min(1),
        },
    ],
    preview: {
        select: {
            media: "icon",
        },
        prepare() {
            return {
                title: "Page Data",
                media: undefined,
            };
        },
    }
}

export default serviceItem;