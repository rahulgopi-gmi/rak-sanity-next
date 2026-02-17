import { dataset, projectId } from "../env";
import { PortableTextBlock } from "next-sanity";
import type { PortableTextSpan } from "sanity";

// ---------------- Slug helper ----------------
export const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w]+/g, "-") 
    .replace(/-+/g, "-") 
    .replace(/^-|-$/g, "");

// ---------------- Browser-safe scroll ----------------
export const scrollToId = (id: string, offset = 0) => {
  if(!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
};
// ---------------- Extract H2 from Portable Text ----------------


type HeadingItem = {
  type: "h2";
  text: string;
};

export const getBodyJSON = (
  body?: PortableTextBlock[] | any
): HeadingItem[] => {
  if (!Array.isArray(body)) return [];

  return body
    .filter(
      (
        block
      ): block is PortableTextBlock<
        never,
        PortableTextSpan,
        "h2",
        never
      > =>
        block._type === "block" &&
        block.style === "h2" &&
        Array.isArray(block.children)
    )
    .map((block) => ({
      type: "h2",
      text: block.children
        .map((child) => child.text)
        .join(""),
    }));
};

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
    const text = block.children
      .map((child: any) => {
        let childText = child.text;

        if (child.marks?.length) {
          child.marks.forEach((mark: string) => {

            // Find mark definition (for links)
            const markDef = block.markDefs?.find(
              (def: any) => def._key === mark
            );
            
            if (markDef?._type === "link" && markDef?.href) {
              childText = `<a href="${markDef.href}" target="_blank" rel="noopener noreferrer">${childText}</a>`;
            }

            /* Bold */
            if (mark === "strong") {
              childText = `<strong>${childText}</strong>`;
            }

            /* Italic */
            if (mark === "em") {
              childText = `<em>${childText}</em>`;
            }
          });
        }

        return childText;
      })
      .join("");

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

