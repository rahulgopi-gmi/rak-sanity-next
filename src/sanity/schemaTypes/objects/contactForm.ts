import { Rule } from "sanity";

export default {
    name: "contactForm",
    title: "Contact Form",
    type: "object",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string"        
        },
        {
            name: "header",
            title: "Header",
            type: "blockContent"        
        },
        {
            name: "subheader",
            title: "SubHeader",
            type: "text"        
        },
        {
            name: "phone",
            title: "Phone",
            type: "text"        
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