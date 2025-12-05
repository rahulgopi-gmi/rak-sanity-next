export default {
    name: "card",
    title: "Card",
    type: "object",
    fields: [
        { 
            name: "tag", 
            title: "Tag", 
            type: "string",            
            hidden: ({ parent }: any) => !["content", "benefits"].includes(parent?.cardType)
        },
        { 
            name: "header", 
            title: "Header", 
            type: "string" 
        },
        { 
            name: "subheader", 
            title: "Sub Header", 
            type: "string",            
            hidden: ({ parent }: any) => !["content", "benefits"].includes(parent?.cardType)
        },
        { 
            name: "content", 
            title: "Content", 
            type: "text",
            hidden: ({ parent }: any) => ["benefits"].includes(parent?.cardType)
        },
        { 
            name: "link", 
            title: "Link", 
            type: "string",
            hidden: ({ parent }: any) => !["benefits"].includes(parent?.cardType)
        },
        {
            name: "videoDesktop",
            type: "file",
            title: "Desktop Video",
            options: { accept: "video/*" },
            hidden: ({ parent }: any) => !["content", "benefits"].includes(parent?.cardType)
        },
        {
            name: "videoMobile",
            type: "file",
            title: "Mobile Video",
            options: { accept: "video/*" },
            hidden: ({ parent }: any) => !["content", "benefits"].includes(parent?.cardType)
        },
        {
            name: "image",
            type: "image",
            title: "Image",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string", title: "Alt Text" }]
        },
        { 
            name: "body", 
            title: "Body", 
            type: "blockContent",
            hidden: ({ parent }: any) => !["benefits"].includes(parent?.cardType)
        }
    ],
};
