import { HomeIcon } from "@sanity/icons";

const heroSection = {
    name: "heroSection",
    title: "Hero Section",
    type: "object",
    icon: HomeIcon,
    fields: [
        {
            name: "banner",
            type: "array",
            title: "Banner",
            of: [
                {
                    type: "object",
                    title: "Banner Item",
                    fields: [                         
                        {
                            name: "header",
                            title: "Header",
                            type: "blockContent"
                        },
                        {
                            name: "videoDesktop",
                            type: "file",
                            title: "Desktop Video",
                            options: { accept: "video/*" }
                        },
                        {
                            name: "videoMobile",
                            type: "file",
                            title: "Mobile Video",
                            options: { accept: "video/*" }                            
                        },
                    ],
                    preview: {
                        prepare() {
                            return {
                                title: "Banner Data"
                            };
                        },
                    }
                }        
            ]            
        },
        {
            name: "about",
            type: "array",
            title: "About",
            of: [
                {
                    type: "object",
                    title: "About Item",
                    fields: [
                        {
                            name: "image",
                            type: "image",
                            title: "Image",
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
                            title: "Header",
                            type: "blockContent"
                        },
                        {
                            name: "content",
                            title: "Content",
                            type: "blockContent"
                        },
                        {
                            name: "ctaName",
                            title: "CTA Name",
                            type: "string"
                        },
                        {
                            name: "ctaLink",
                            title: "CTA Link",
                            type: "string"
                        },
                    ],
                    preview: {
                        prepare() {
                            return {
                                title: "About Data"
                            };
                        },
                    }
                }
            ]
        },
        {
            name: "keywordstitle",
            title: "Keywords Title",
            type: "string"    
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
                            name: "content",
                            title: "Content",
                            type: "string"
                        }                        
                    ],
                    preview: {
                        select: {
                            media: "image",
                            title: "content"
                        }
                    }
                }
            ]
        },
        {
            name: "itemTitle",
            title: "Items Title",
            type: "string"
        },
        {
            name: "itemHeader",
            title: "Item Header",
            type: "blockContent"          
        },
        {
            name: "items",
            type: "array",
            title: "Items",
            of: [
                {
                    type: "object",
                    title: "List Item",
                    fields: [
                        {
                            name: "image",
                            type: "image",
                            title: "Image",
                            options: { hotspot: true },
                            fields: [{ name: "alt", type: "string", title: "Alt Text" }]
                        },
                        {
                            name: "header",
                            title: "Header",
                            type: "string"
                        },
                        {
                            name: "content",
                            title: "Content",
                            type: "string"
                        }
                    ],
                    preview: {
                        prepare() {
                            return {
                                title: "Items Data"
                            };
                        },
                    }
                }
            ]
        },        
        {
            name: "packageTitle",
            title: "Package Titile",
            type: "string",            
        },
        {
            name: "packageHeader",
            title: "Package Header",
            type: "blockContent",            
        },
        {
            name: "packageContent",
            title: "Package Content",
            type: "blockContent",            
        },
    ],
    preview: {
        prepare() {
            return {
                title: "Page Data"
            };
        },
    }
};

export default heroSection;