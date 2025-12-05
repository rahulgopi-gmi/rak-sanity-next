export default {
    name: "seoMeta",
    title: "SEO Metadata",
    type: "object",
    fields: [
        { name: "metaTitle", type: "string", title: "Meta Title" },
        { name: "metaDescription", type: "text", title: "Meta Description" },
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
        },     
        {
            name: "facebookAppId",
            type: "string",
            title: "Facebook App ID",
        }   
    ],
    preview:{
        select:{
            title: "metaTitle"
        },
        prepare(selection: Record<string, any>) {
            const { title } = selection
            return{
                title: title || 'Untitled Page'
            }
        }
    }
}