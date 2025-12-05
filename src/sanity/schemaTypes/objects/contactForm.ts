import { Rule } from "sanity";

export default {
    name: "contactForm",
    title: "Contact Form",
    type: "object",
    fields: [
        {
        name: "name",
        title: "Name",
        type: "string",
        validation: (Rule: Rule) => Rule.required().error("Name is required"),
        }
    ],
    preview: {        
        prepare() {
            return {
                title: "Contact Form",
            };
        } 
    }           
}        