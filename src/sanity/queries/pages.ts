// /sanity/queries/pages.ts
export const getPageBySlug = `
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
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
      }
    },
    sections[]{
      ...,       
    }
  }
`;


export const getPackages = `
  *[_type == "packages"] {
    _id,
    _createdAt,
    title,
    label,
    currency,
    price,
    billingCycle,
    ctaText,
    ctaLink,
    sectionTitle,
    features[]
  }
`

export const getActivitiesItems = `
{
  "standard": *[_type == "standardActivities"]{
    _id,
    _createdAt,
    code,
    name,
    group,
    description
  },
  "premium": *[_type == "premiumActivities"]{
    _id,
    _createdAt,
    code,
    name,
    group,
    description
  },
  "custom": *[_type == "customActivities"]{
    _id,
    _createdAt,
    code,
    name,
    group,
    description
  }
}
`