import { MasterDetailIcon } from "@sanity/icons";

export default {
    name: "premiumActivities",
    type: "document",
    title: "Premium Activities",
    icon: MasterDetailIcon,
    fields: [
        { name: "code", type: "string", title: "Code" },
        { name: "name", type: "string", title: "Activity Name" },
        { name: "group", type: "string", title: "Activity Group" },
        { name: "description", type: "text", title: "Description" },
    ],
    preview: {
        select: {
            title: "code",
        }
    }
}