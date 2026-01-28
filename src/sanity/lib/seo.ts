import { cache } from "react";
import { sanityFetch } from "./live";
import { getPageBySlug } from "../queries/pages";

/**
 * Fetch SEO data for a given slug and template
 * Can be used globally for pages, layouts, and metadata
 */
export const getSeoData = cache(async (slug: string, template: string) => {
  try {
    const { data } = await sanityFetch({
      query: getPageBySlug,
      params: { slug, template },
      stega: false,
      requestTag: `seo-${slug}`, // optional for logging or caching
    });

    return data?.seo ?? null;
  } catch (error) {
    console.error(`SEO Fetch Error for slug "${slug}":`, error);
    return null;
  }
});