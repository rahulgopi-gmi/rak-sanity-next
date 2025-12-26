import { TiersIcon } from "@sanity/icons";

export default {
    name: "campaigns",
    title: "Campaigns",
    type: "object",
    icon: TiersIcon,
    fields: [
        {
            name: "mode",
            title: "Mode",
            type: "string",
            options: {
                list: [
                    { title: "Dark", value: "dark" },
                    { title: "Light", value: "light" },
                ],
                layout: "dropdown",
            },
            initialValue: "dark",            
        },
        {
            name: "currency",
            title: "Currency",
            type: "string",
            options: {
                list: [
                    { title: "AED (د.إ)", value: "AED" },
                    { title: "USD ($)", value: "USD $" },
                    { title: "GBP (£)", value: "GBP £" },
                ],
            }
        },
        {
            name: "bannerdesktop",
            title: "Banner Desktop",
            type: "image",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string", title: "Alt Text" }]           
        },
        {
            name: "bannermobile",
            title: "Banner Mobile",
            type: "image",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string", title: "Alt Text" }]           
        },
        {
            name: "logo",
            title: "Logo",
            type: "image",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string", title: "Alt Text" }]           
        },
        {
            name: "icon",
            title: "Icon",
            type: "image",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string", title: "Alt Text" }]          

        },
        {
            name: "title",
            title: "Title",
            type: "string",            
        },
        {
            name: "header",
            title: "Header",
            type: "blockContent",
        },
        {
            name: "body",
            title: "Body",
            type: "blockContent",
        },
        {
            name: "keywords",
            type: "array",
            title: "Keywords",    
            of: [
                {
                    type: "object",
                    title: "Keyword Item",
                    fields: [                        
                        {
                            name: "icon",
                            type: "image",
                            title: "Icon",
                            options: { hotspot: true },
                            fields: [{ name: "alt", type: "string", title: "Alt Text" }]                            
                        },
                        {
                            name: "header",
                            type: "string",
                            title: "Header"                            
                        },
                        {
                            name: "body",
                            title: "Body",
                            type: "blockContent"                            
                        }
                    ],
                    preview: {
                        select: {
                            media: "icon",
                            title: "header"
                        }
                    }
                },
            ],
        },        
        {
            name: "techCtaName",
            title: "Tech CTA Name",
            type: "string",
        },
        {
            name: "techCtaLink",
            title: "Tech CTA Link",
            type: "string",
        },
        {
            name: "techHeader",
            title: "Tech Header",
            type: "blockContent",
        },
        {
            name: "techkeywords",
            type: "array",
            title: "Tech Keywords",
            of: [
                {
                    type: "object",
                    title: "Tech Keywords Item",
                    fields: [
                        {
                            name: "icon",
                            type: "image",
                            title: "Icon",
                            options: { hotspot: true },
                            fields: [{ name: "alt", type: "string", title: "Alt Text" }]
                        },
                        {
                            name: "header",
                            title: "Header",
                            type: "string"
                        },
                        {
                            name: "title",
                            title: "Title",
                            type: "string"
                        },
                    ],
                    preview: {
                        select: {
                            media: "icon",
                            title: "header"
                        }
                    }
                }     
            ]
        },
        {
            name: "packageCtaName",
            title: "Package CTA Name",
            type: "string",
        },
        {
            name: "packageCtaLink",
            title: "Package CTA Link",
            type: "string",
        },
        {
            name: "packageHeader",
            title: "Package Header",
            type: "blockContent",
        },
        {
            name: "businessHeader",
            title: "Business Header",
            type: "blockContent",
        },
        {
            name: "businessImage",
            type: "image",
            title: "Business Image",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string", title: "Alt Text" }]
        },
        {
            name: "businesskeywords",
            type: "array",
            title: "Business Keywords",
            of: [
                {
                    type: "object",
                    title: "Business Keywords Item",
                    fields: [
                        {
                            name: "icon",
                            type: "image",
                            title: "Icon",
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
                            type: "text"
                        },
                    ],
                    preview: {
                        select: {
                            media: "icon",
                            title: "header"
                        }
                    }
                }
            ]
        },
        {
            name: "secondarydesktop",
            title: "Secondary Desktop",
            type: "image",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string", title: "Alt Text" }]
        },
        {
            name: "secondarymobile",
            title: "Secondary Mobile",
            type: "image",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string", title: "Alt Text" }]
        },
        {
            name: "secondaryHeader",
            title: "Secondary Header",
            type: "blockContent",
        },
        {
            name: "secondarycontent",
            title: "Secondary Content",
            type: "text"
        },
        {
            name: "secondaryCtaName",
            title: "Secondary CTA Name",
            type: "string"
        },
        {
            name: "secondaryCtaLink",
            title: "Secondary CTA Link",
            type: "string"
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