import { MasterDetailIcon } from "@sanity/icons";

const productsItems = {
    name: "productsItems",
    title: "Products Items",
    type: "object",
    icon: MasterDetailIcon,
    fields: [
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
            name: "items",
            type: "array",
            title: "Items",           
            of: [
                {
                    type: "object",
                    title: "Items",
                    fields: [                        
                        {
                            name: "title",
                            type: "string",
                            title: "Title"                           
                        }
                    ],
                    preview: {
                        select: {
                            media: "",
                            title: "title"
                        },
                        prepare({ media, title } : { media?: unknown; title?: string }) {
                            return {
                                title: title ? title : "Keywords",
                                media: media,
                            };
                        },
                    }
                },
            ],
        },
        {
            name: "keywordsitems",
            type: "array",
            title: "Keywords Items",           
            of: [
                {
                    type: "object",
                    title: "Keywords Items",
                    fields: [                        
                        {
                            name: "title",
                            type: "string",
                            title: "Title"                           
                        },
                        {
                            name: "image",
                            type: "image",
                            title: "Image",
                            options: { hotspot: true },
                            fields: [{ name: "alt", type: "string", title: "Alt Text" }]                            
                        },
                        {
                            name: "content",
                            type: "text",
                            title: "Content"                           
                        },
                        {
                            name: "badge",
                            title: "Badge",
                            type: "string"
                        },
                        {
                            name: "ctaName",
                            title: "CTA Name",
                            type: "string"
                        },
                        {
                            name: "slug",
                            title: "Slug",
                            type: "slug",
                            options: {
                                source: (
                                    _doc : unknown,
                                    context: { parent?: { title?: string } }
                                ) => context.parent?.title ?? "",
                                maxLength: 96,
                            },
                        },
                        
                    ],
                    preview: {
                        select: {
                            media: "",
                            title: "title"
                        },
                        prepare({ media, title } : { media?: unknown; title?: string }) {
                            return {
                                title: title ? title : "Keywords",
                                media: media,
                            };
                        },
                    }
                },
            ],
        }
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

export default productsItems;