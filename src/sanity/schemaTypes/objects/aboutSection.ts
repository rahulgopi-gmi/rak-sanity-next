import { BookIcon } from "@sanity/icons";

const aboutSection = {
    name: "aboutSection",
    title: "About",
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
            name: "sectionImage",
            type: "image",
            title: "Section Image",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string", title: "Alt Text" }]
        },
        {
            name: "sectionHeader",
            title: "Section Header",
            type: "blockContent",
        }, 
        {
            name: "sectionSubHeader",
            title: "Section Sub Header",
            type: "text",
        },
        {
            name: "sectionContent",
            title: "Section Content",
            type: "text",
        },
        {
            name: "keywords",
            type: "array",
            title: "Keywords",
            of: [
                {
                    type: "object",
                    title: "Keywords Item",
                    fields: [
                        {
                            name: "image",
                            type: "image",
                            title: "Image",
                            options: { hotspot: true },
                            fields: [{ name: "alt", type: "string", title: "Alt Text" }]
                        },
                        {
                            name: "tag",
                            title: "Tag",
                            type: "string"
                        },
                        {
                            name: "header",
                            title: "Header",
                            type: "string"
                        },
                        {
                            name: "content",
                            title: "Content",
                            type: "text"
                        },
                    ],
                    preview: {
                        select: {
                            media: "image",
                            title: "tag"
                        }
                    }
                }
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

export default aboutSection;