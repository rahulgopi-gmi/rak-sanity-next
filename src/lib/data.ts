import { cache } from "react";
import { 
    getPageBySlug, 
    getPackages, 
    getActivitiesItems,
    getAllPostsQuery,
    getCategories,
    getAllPostsBySlideQuery,
    getPostBySlug,
    getRelatedPosts
} from "@/sanity/queries/pages";
import type { 
  PageDataType, 
  PackageType, 
  ActivitiesType, 
  PostType, 
  CategoryType 
} from "@/features/application/types/sanity";
import { sanityServerClient } from "@/sanity/lib/client.server";


/**
 *  Define the return type for getPageWithBlog
*/
interface GetDataResult {
    page: PageDataType | null;
    posts: PostType[];
    categories: CategoryType[];
    slidePosts: PostType[];
}

interface BlogDetailsType {
    page: PostType | null;
    categories: CategoryType[];
    related: PostType [];
}

/**
 * Fetch page + packages (for pages that need packages)
 */
export const getPageWithPackages = cache(async (
  slug: string,
  template: string
): Promise<{ page: PageDataType | null; packages: PackageType[] }> => {
  try {
    const [page, packages] = await Promise.all([
      sanityServerClient.fetch(getPageBySlug, { slug, template }),
      sanityServerClient.fetch(getPackages)
    ]);

    return { page: page ?? null, packages: packages ?? [] };
  } catch (error) {
    console.error(`Sanity Fetch Error ${slug}: `, error);
    return { page: null, packages: [] };
  }
});

/**
 * Fetch only page data (simpler case)
 */
export const getPageDataOnly = cache(async (
  slug: string,
  template: string
): Promise<PageDataType | null> => {
  try {
    const page: PageDataType | null = await sanityServerClient.fetch(getPageBySlug, {
      slug,
      template,
    });

    return page ?? null;
  } catch (error) {
    console.error(`Sanity Fetch Error ${slug}: `, error);
    return null;
  }
});

/**
 * Fetch page + activities
 */
export const getPageWithActivities = cache(async (
  slug: string,
  template: string
): Promise<{ page: PageDataType | null; activities: ActivitiesType }> => {
  try {
    const [page, activitiesData] = await Promise.all([
      sanityServerClient.fetch(getPageBySlug, { slug, template }),
      sanityServerClient.fetch(getActivitiesItems)
    ]);

    const activities: ActivitiesType = {
      standard: activitiesData?.standard ?? [],
      premium: activitiesData?.premium ?? [],
      custom: activitiesData?.custom ?? [],
    };

    return { page: page ?? null, activities };
  } catch (error) {
    console.error(`Sanity Fetch Error ${slug}: `, error);
    return { page: null, activities: { standard: [], premium: [], custom: [] } };
  }
});

/**
 * Fetch page + Blog
 */
export const getPageWithBlog = cache(async (slug: string, template: string): Promise<GetDataResult> => {
  try {
    const [page, posts, categories, slidePosts] = await Promise.all([
      sanityServerClient.fetch(getPageBySlug, { slug, template }),
      sanityServerClient.fetch(getAllPostsQuery),
      sanityServerClient.fetch(getCategories),
      sanityServerClient.fetch(getAllPostsBySlideQuery)
    ]);

    return {
      page: page ?? null,
      posts: posts ?? [],
      categories: categories ?? [],
      slidePosts: slidePosts ?? []
    };
  } catch (error) {
    console.error(`Sanity Fetch Error for slug "${slug}":`, error);
    return {
      page: null,
      posts: [],
      categories: [],
      slidePosts: []
    };
  }
});

/** 
 *  Fetch page + Blog deatails
*/
export const getPageWithBlogDetails = cache(async (slug: string): Promise<BlogDetailsType> => {
  try {
    const [page, categories] = await Promise.all([
      sanityServerClient.fetch(getPostBySlug, { slug }),
      sanityServerClient.fetch(getCategories)
    ]);

    let related: PostType[] = [];

    if (page?.categories?.[0]?._id) {
      const categoryId = page.categories[0]._id;
      related = await sanityServerClient.fetch(getRelatedPosts, { categoryId, slug }) ?? [];
    }

    return {
      page: page ?? null,
      categories: categories ?? [],
      related
    };
  } catch (error) {
    console.error(`Sanity Fetch Error ${slug}: `, error);
    return {
      page: null,
      categories: [],
      related: []
    };
  }
});
