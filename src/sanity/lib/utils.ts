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

    /* ---------------- IMAGE BLOCK ---------------- */
    if (block._type === "image") {
      if (inUL) { html += "</ul>"; inUL = false; }
      if (inOL) { html += "</ol>"; inOL = false; }

      const imageUrl = block.asset?._ref
        ? `https://cdn.sanity.io/images/${projectId}/${dataset}/${block.asset._ref
            .replace("image-", "")
            .replace("-jpg", ".jpg")
            .replace("-png", ".png")
            .replace("-webp", ".webp")}`
        : "";

      html += `
        <figure>
          <img src="${imageUrl}" alt="${block.alt || ""}" />
          ${block.caption ? `<figcaption>${block.caption}</figcaption>` : ""}
        </figure>
      `;
      return;
    }

    /* ---------------- VIDEO BLOCK ---------------- */
    if (block._type === "video") {
      if (inUL) { html += "</ul>"; inUL = false; }
      if (inOL) { html += "</ol>"; inOL = false; }
        
      //const videoUrl = block?.asset?.asset?._ref ? `https://cdn.sanity.io/files/${projectId}/${dataset}/${block?.asset?.asset?._ref}` : "";
      const videoUrl = block.asset?.url;
        console.log(videoUrl, 'videoUrl')
      if (!videoUrl) return;
      
      
      html += `
        <figure>
          <video controls class="blog-video">
            <source src="${videoUrl}" type="video/mp4" />
          </video>
          ${block.caption ? `<figcaption>${block.caption}</figcaption>` : ""}
        </figure>
      `;
      return;
    }

    /* ---------------- TEXT BLOCK ---------------- */
    if (block._type !== "block" || !block.children) return;

    const text = block.children.map((c: any) => c.text).join("");

    /* -------- LIST ITEMS -------- */
    if (block.listItem === "bullet") {
      if (!inUL) {
        if (inOL) { html += "</ol>"; inOL = false; }
        html += "<ul>";
        inUL = true;
      }
      html += `<li>${text}</li>`;
      return;
    }

    if (block.listItem === "number") {
      if (!inOL) {
        if (inUL) { html += "</ul>"; inUL = false; }
        html += "<ol>";
        inOL = true;
      }
      html += `<li>${text}</li>`;
      return;
    }

    if (inUL) { html += "</ul>"; inUL = false; }
    if (inOL) { html += "</ol>"; inOL = false; }

    /* -------- HEADINGS -------- */
    switch (block.style) {
      case "h1":
        html += `<h1>${text}</h1>`;
        break;
      case "h2":
        html += `<h2 id="${slugify(text)}">${text}</h2>`;
        break;
      case "h3":
        html += `<h3>${text}</h3>`;
        break;
      case "blockquote":
        html += `<blockquote>${text}</blockquote>`;
        break;
      default:
        html += `<p>${text}</p>`;
    }
  });

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
