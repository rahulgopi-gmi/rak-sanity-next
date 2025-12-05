import { MasterDetailIcon } from "@sanity/icons";

export default {
    name: "customActivities",
    type: "document",
    title: "Custom Activities",
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