import createImageUrlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import { dataset, projectId } from "../env";

const imageBuilder = createImageUrlBuilder({
    projectId: projectId || "",
    dataset: dataset || "",
});

export const urlForImage = (source: any) => {
    // Ensure that source image contains a valid reference
    if (!source?.asset?._ref) {
        return undefined;
    }

    const imageRef = source?.asset?._ref;
    const crop = source.crop;

    // get the image's og dimensions
    const { width, height } = getImageDimensions(imageRef);

    if (Boolean(crop)) {
        // compute the cropped image's area
        const croppedWidth = Math.floor(width * (1 - (crop.right + crop.left)));

        const croppedHeight = Math.floor(height * (1 - (crop.top + crop.bottom)));

        // compute the cropped image's position
        const left = Math.floor(width * crop.left);
        const top = Math.floor(height * crop.top);

        // gather into a url
        return imageBuilder
            ?.image(source)
            .rect(left, top, croppedWidth, croppedHeight)
            .auto("format");
    }

    return imageBuilder?.image(source).auto("format");
};

export function resolveOpenGraphImage(image: any, width = 1200, height = 627) {
    if (!image) return;
    const url = urlForImage(image)?.width(1200).height(627).fit("crop").url();
    if (!url) return;
    return { url, alt: image?.alt as string, width, height };
}

export const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w]+/g, "-") 
    .replace(/-+/g, "-") 
    .replace(/^-|-$/g, "");

export const getBodyText = (body: any[] = []) => {
    let html = "";
    let inUL = false;
    let inOL = false;    

    body.forEach((block) => {
        if (block._type !== "block" || !block.children) return;

        const text = block.children.map((c: any) => c.text).join("");

        // ----- LIST ITEMS -----
        if (block.listItem === "bullet") {
            // open <ul> if not open
            if (!inUL) {
                if (inOL) { html += "</ol>"; inOL = false; }
                html += "<ul>";
                inUL = true;
            }
            html += `<li>${text}</li>`;
            return;
        }

        if (block.listItem === "number") {
            // open <ol> if not open
            if (!inOL) {
                if (inUL) { html += "</ul>"; inUL = false; }
                html += "<ol>";
                inOL = true;
            }
            html += `<li>${text}</li>`;
            return;
        }

        // If block is NOT list, close lists
        if (inUL) { html += "</ul>"; inUL = false; }
        if (inOL) { html += "</ol>"; inOL = false; }

        // ----- HEADING & NORMAL TEXT -----
        switch (block.style) {
            case "h1":
                html += `<h1>${text}</h1>`;
                break;
            case "h2":                
                html += `<h2 id=${slugify(text)}>${text}</h2>`;
                break;
            case "h3":
                html += `<h3>${text}</h3>`;
                break;
            case "blockquote":
                html += `<blockquote>${text}</blockquote>`;
                break;
            case "normal":
            default:
                html += `<p>${text}</p>`;
                break;
        }
    });

    // Ensure lists are closed at end
    if (inUL) html += "</ul>";
    if (inOL) html += "</ol>";

    return html;
};

export const getBodyJSON = (body: any[] = []) => {
    return body
        .filter(block => block._type === "block" && block.style === "h2")
        .map(block => ({
            type: "h2",
            text: block.children.map((c: any) => c.text).join(""),
        }));
};

export const scrollToId = (id: string, offset = 0) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
};
