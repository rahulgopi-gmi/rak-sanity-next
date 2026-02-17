// src/sanity/queries/pages.ts
import { groq } from "next-sanity";

// -------------------
// Shared Fields
// -------------------
const postFields = groq`
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  body,
  mainImage{
    asset->{
      _id,
      url
    },
    alt
  },
  author->{
    _id,
    name,
    role,
    bio,
    image{
      asset->{
        _id,
        url
      }
    }
  },
  categories[]->{
    _id,
    title,
    description
  }
`;

const basePostQuery = `*[_type == "post" && defined(slug.current)]`;

// -------------------
// Pages
// -------------------
export const getPageBySlug = groq`
  *[_type == "page" && slug.current == $slug && template == $template][0]{
    _id,
    title,
    slug,
    template,
    seo{
      metaTitle,
      metaDescription,
      keywords,
      openGraphImage{
        asset->{
          url,
          metadata {
            lqip,
            dimensions
          }
        },        
        alt
      },
      openGraphUrl,
      facebookAppId
    },
    sections[]{
      ...
    }
  }
`;

// -------------------
// Packages
// -------------------
export const getPackages = groq`
  *[_type == "packages"] | order(order asc, _createdAt desc) {
    _id,
    _createdAt,
    order,
    title,
    content,
    label,
    prices,
    billingCycle,
    ctaText,
    ctaLink,
    sectionTitle,
    features[]
  }
`;

// -------------------
// Activities
// -------------------
export const getActivitiesItems = groq`
{
  "standard": *[_type == "standardActivities"] | order(_createdAt desc){
    _id,
    _createdAt,
    code,
    activityName,
    activityGroup,
    description,
    active
  },
  "premium": *[_type == "premiumActivities"] | order(_createdAt desc){
    _id,
    _createdAt,
    code,
    activityName,
    activityGroup,
    description,
    active
  },
  "custom": *[_type == "customActivities"] | order(_createdAt desc){
    _id,
    _createdAt,
    code,
    activityName,
    activityGroup,
    description,
    active
  }
}
`;

// -------------------
// Categories
// -------------------
export const getCategories = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    description
  }
`;

// -------------------
// Posts
// -------------------
export const getAllPostsQuery = groq`
  ${basePostQuery} | order(order asc, publishedAt desc){
    ${postFields}
  }
`;

export const getAllPostsBySlideQuery = groq`
  ${basePostQuery}[showInSlider == true] | order(order asc, publishedAt desc){
    ${postFields}
  }
`;

// -------------------
// Paginated Posts (example)
export const getPaginatedPostsQuery = groq`
  ${basePostQuery} | order(order asc, publishedAt desc)
  [$offset...$offset + $limit]{
    ${postFields}
  }
`;

// -------------------
// Single Post by Slug
// -------------------
export const getPostBySlug = groq`
  *[_type == "post" && slug.current == $slug][0]{
    ${postFields},
    body[] {
      ...,
      _type == "video" => {
        ...,
        asset->{
          url
        }
      }
    },
    seo {
      metaTitle,
      metaDescription,
      openGraphImage{
        asset->{
          url
        }
      },
      openGraphUrl
    }
  }
`;

// -------------------
// Related Posts
// -------------------
export const getRelatedPosts = groq`
  *[_type == "post" && references($categoryId) && slug.current != $slug] | order(order asc, publishedAt desc)[0..3] {
    ${postFields}
  }
`;

// -------------------
// Global Settings
// -------------------
export const globalSettingsQuery = groq`
*[_type == "settings"][0]{
  siteName,
  logo{
    asset->{
      url
    },
    alt
  },
  headerMenu[] { label, slug, children[]{label, slug} },
  footerMenu[] { label, url, target },
  socialLinks[] { platform, url, icon{ asset->{url} } },
  contactEmail,
  phone,
  address,
  seo{
    metaTitle,
    metaDescription,
    keywords,
    openGraphImage{
      asset->{
        url,
        metadata { lqip, dimensions }
      },        
      alt
    },
    openGraphUrl,
    facebookAppId
  }
}
`;
