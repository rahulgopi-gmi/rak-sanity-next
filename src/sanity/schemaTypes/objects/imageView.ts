export default {
    name: "imageView",
    title: "Image with Content",
    type: "object",
    fields: [
        { name: "title", title: "Title",  type: "string" },
        { name: "subtitle", title: "Subtitle", type: "string" },
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
        { name: "body", title: "Body", type: "blockContent" }
    ],
};
