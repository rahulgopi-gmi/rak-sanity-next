import { MasterDetailIcon } from "@sanity/icons";

const customActivities =  {
    name: "customActivities",
    type: "document",
    title: "Custom Activities",
    icon: MasterDetailIcon,
    fields: [
        { name: "code", type: "string", title: "Code" },
        { name: "activityName", type: "string", title: "Activity Name" },
        { name: "activityGroup", type: "string", title: "Activity Group" },
        {
            name: "active",
            type: "boolean",
            title: "Active",
            description: "Enable or disable this activity",
            initialValue: true,
        },
        { name: "description", type: "text", title: "Description" },
    ],
    preview: {
        select: {
            title: "code",
        }
    }
}

export default customActivities;