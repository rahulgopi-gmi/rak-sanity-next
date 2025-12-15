export default {
    name: "seoMeta",
    title: "SEO Metadata",
    type: "object",
    fields: [
        { 
            name: "metaTitle", 
            type: "string", 
            title: "Meta Title",
            validation: (Rule : any) => Rule.max(60).warning("Titles over 60 characters may be truncated")
        },
        { 
            name: "metaDescription", 
            type: "text", 
            title: "Meta Description",
            validation: (Rule: any) => Rule.max(160).warning("Descriptions over 160 characters may be truncated"),
        },
        {
            name: "keywords",
            type: "array",
            title: "Keywords",
            of: [{ type: "string" }],
        },
        {
            name: "openGraphImage",
            type: "image",
            title: "OG Image",
            options: { hotspot: true },
            fields: [
                {
                    name: "alt",
                    type: "string",
                    title: "Alt Text",
                    validation: (Rule: any) => Rule.required().warning("OG image should include alt text")
                }
            ]
        },
        {
            name: "openGraphUrl",
            type: "url",
            title: "Open Graph URL",
            validation: (Rule: any) =>
                Rule.uri({
                    scheme: ["http", "https"],
                }).warning("URL should be valid and include http/https"),
        },
        {
            name: "facebookAppId",
            type: "string",
            title: "Facebook App ID",
        }   
    ],
    preview:{
        select:{
            title: "metaTitle",
            desc: "metaDescription"
        },
        prepare(selection: { title?: string; desc?: string }) {
            const { title, desc } = selection
            return{
                title: title || 'Untitled Page',
                subtitle: desc ? desc.substring(0, 60) + "..." : ""
            }
        }
    }
}