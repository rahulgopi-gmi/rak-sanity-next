import { CogIcon } from "@sanity/icons";

export default {
    name: "settings",
    title: "Global Settings",
    type: "document",
    icon: CogIcon,
    __experimental_actions: ["update", "publish"], // disable delete & create
    fields: [
        // ========== GENERAL ==========
        {
            name: "siteName",
            title: "Site Name",
            type: "string"
        },
        {
            name: "logo",
            title: "Logo",
            type: "image",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string", title: "Alt Text" }]
        },

        // ========== HEADER ==========
        {
            name: "headerMenu",
            title: "Header Menu",
            type: "array",
            of: [
                {
                    type: "object",
                    title: "Menu Item",
                    fields: [
                        { name: "label", title: "Label", type: "string" },
                        {
                            name: "slug",
                            title: "Slug",
                            type: "slug",
                            options: {
                                source: "label",
                                maxLength: 96,
                            },
                        },
                        {
                            name: "children",
                            title: "Dropdown Items",
                            type: "array",
                            of: [
                                {
                                    type: "object",
                                    fields: [
                                        { name: "label", title: "Label", type: "string" },
                                        { name: "url", title: "URL", type: "string" },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },

        // ========== FOOTER ==========
        {
            name: "footerMenu",
            title: "Footer Menu",
            type: "array",
            of: [
                {
                    type: "object",
                    title: "Footer Item",
                    fields: [
                        { name: "label", title: "Label", type: "string" },
                        { name: "url", title: "URL", type: "string" },
                    ],
                },
            ],
        },

        // ========== SOCIAL LINKS ==========
        {
            name: "socialLinks",
            title: "Social Links",
            type: "array",
            of: [
                {
                    type: "object",
                    title: "Social Link",
                    fields: [
                        { name: "platform", title: "Platform", type: "string" },
                        { name: "url", title: "URL", type: "url" },
                        {
                            name: "icon",
                            title: "Icon",
                            type: "image",
                            options: { hotspot: true }
                        },
                    ],
                },
            ],
        },

        // ========== CONTACT INFO ==========
        {
            name: "contactEmail",
            title: "Contact Email",
            type: "string"
        },
        {
            name: "phone",
            title: "Phone Number",
            type: "string"
        },
        {
            name: "address",
            title: "Address",
            type: "text"
        },

        // ========== DEFAULT SEO ==========
        {
            name: "seoTitle",
            title: "Default SEO Title",
            type: "string"
        },
        {
            name: "seoDescription",
            title: "Default SEO Description",
            type: "text"
        },
        {
            name: "seoImage",
            title: "Default Open Graph Image",
            type: "image",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string", title: "Alt Text" }]
        }
    ],

    preview: {
        prepare() {
            return {
                title: "Site Settings"
            };
        },
    },
};
