import { BinaryDocumentIcon } from "@sanity/icons";

export default {
    name: "featureItem",
    title: "Feature Item",
    type: "object",
    icon: BinaryDocumentIcon,
    fields: [
        {
            name: "bannerdesktop",
            title: "Banner Desktop",
            type: "image",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string", title: "Alt Text" }],
            hidden: ({ document }: any) => {
                const hiddenSlugs = ["contact", "activities", "packages", "thankyou", "blog"];
                return hiddenSlugs.includes(document?.slug?.current);
            }
        },        
        {
            name: "bannermobile",
            title: "Banner Mobile",
            type: "image",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string", title: "Alt Text" }],
            hidden: ({ document }: any) => {
                const hiddenSlugs = ["contact", "activities", "packages", "thankyou", "blog"];
                return hiddenSlugs.includes(document?.slug?.current);
            }
        },
        {
            name: "icon",
            title: "Icon",
            type: "image",
            options: { hotspot: true },
            hidden: ({ document }: any) => {
                const hiddenSlugs = ["contact", "refer-friend", "activities", "packages", "privacy-policy", "thankyou", "blog"];
                return hiddenSlugs.includes(document?.slug?.current);
            }

        },
        {
            name: "title",
            title: "Title",
            type: "string",
            hidden: ({ document }: any) => {
                const hiddenSlugs = ["refer-friend", "privacy-policy", "thankyou"];
                return hiddenSlugs.includes(document?.slug?.current);
            }
        },        
        {
            name: "header",
            title: "Header",
            type: "blockContent",            
        },
        {
            name: "subheader",
            title: "SubHeader",
            type: "string",
            hidden: ({ document }: any) => {
                const hiddenSlugs = ["refer-friend", "activities", "packages", "privacy-policy", "thankyou", "blog"];
                return hiddenSlugs.includes(document?.slug?.current);
            }
        },        
        {
            name: "body",
            title: "Body",
            type: "blockContent",
            hidden: ({ document }: any) => {
                const hiddenSlugs = ["contact"];
                return hiddenSlugs.includes(document?.slug?.current);
            }
        },
        {
            name: "ctaName",
            title: "CTA Name",
            type: "string",
            hidden: ({ document }: any) => {
                const hiddenSlugs = ["thankyou"];
                return !hiddenSlugs.includes(document?.slug?.current);
            }
        },
        {
            name: "ctaLink",
            title: "CTA Link",
            type: "string",
            hidden: ({ document }: any) => {
                const hiddenSlugs = ["thankyou"];
                return !hiddenSlugs.includes(document?.slug?.current);
            }
        },
        {
            name: "keywords",
            type: "array",
            title: "Keywords",
            hidden: ({ document }: any) => {
                const hiddenSlugs = ["packages", "privacy-policy", "thankyou"];
                return hiddenSlugs.includes(document?.slug?.current);
            },
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
                            fields: [{ name: "alt", type: "string", title: "Alt Text" }],
                            hidden: ({ document }: any) => {
                                const hiddenSlugs = ["activities"];
                                return hiddenSlugs.includes(document?.slug?.current);
                            }
                        },
                        {
                            name: "header",
                            type: "string",
                            title: "Header",
                            hidden: ({ document }: any) => {
                                const hiddenSlugs = ["refer-friend"];
                                return hiddenSlugs.includes(document?.slug?.current);
                            }
                        },
                        {
                            name: "body",
                            title: "Body",
                            type: "blockContent",
                            hidden: ({ document }: any) => {
                                const hiddenSlugs = ["contact", "activities"];
                                return hiddenSlugs.includes(document?.slug?.current);
                            }
                        },
                        {
                            name: "content",
                            type: "text",
                            title: "Content",
                            hidden: ({ document }: any) => {
                                const hiddenSlugs = ["refer-friend"];
                                return hiddenSlugs.includes(document?.slug?.current);
                            }
                        },
                    ],
                    preview: {
                        select: {
                            media: "icon",
                        },
                        prepare({ media } : any) {
                            return {
                                title: "Keywords",
                                media: media,
                            };
                        },
                    }
                },
            ],
        },
        {
            name: "forms",
            title: "Forms",
            type: "array",           
            of: [
                { type: "contactForm" },
                { type: "referAFriendForm" }       
            ],
            hidden: ({ document }: any) => {
                const hiddenSlugs = ["contact", "refer-friend"];
                return !hiddenSlugs.includes(document?.slug?.current);
            }
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