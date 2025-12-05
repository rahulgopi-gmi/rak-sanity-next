import { BookIcon } from "@sanity/icons";

export default {
    name: "aboutSection",
    title: "About Section",
    type: "object",
    icon: BookIcon,
    fields: [
        {
            name: "header",
            title: "Header",
            type: "blockContent",
        },
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "body",
            title: "Body",
            type: "blockContent",
        },
        {
            name: "imageDesktop",
            type: "image",
            title: "Desktop Image",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string", title: "Alt Text" }]
        },
        {
            name: "imageMobile",
            type: "image",
            title: "Mobile Image",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string", title: "Alt Text" }]
        },
        {
            name: "subHeader",
            title: "Sub Header",
            type: "blockContent",
        },        
        {
            name: "sectionContent",
            type: "array",
            title: "Image Section Content",
            of: [
                { type: "card" }
            ]
        },
        {
            name: "card",
            type: "array",
            title: "Card",
            of: [
                { type: "card" }
            ]
        }
    ],
    preview: {        
        prepare() {
            return {
                title: "Page Data"
            };
        },
    }
};
