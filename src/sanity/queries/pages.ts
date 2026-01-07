// /sanity/queries/pages.ts
export const getPageBySlug = `
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
      ...,       
    }
  }
`;

export const getPackages = `
  *[_type == "packages"] {
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

export const getActivitiesItems = `
{
  "standard": *[_type == "standardActivities"]{
    _id,
    _createdAt,
    code,
    activityName,
    activityGroup,
    description,
    active
  },
  "premium": *[_type == "premiumActivities"]{
    _id,
    _createdAt,
    code,
    activityName,
    activityGroup,
    description,
    active
  },
  "custom": *[_type == "customActivities"]{
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

export const getCategories = `
  * [_type == "category"] | order(title asc) {
    _id,
    title,
    description
  }
`;

export const getAllPostsQuery = `
*[_type == "post"] | order(publishedAt desc) {
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
}
`;

export const getAllPostsBySlideQuery = `
*[_type == "post" &&  showInSlider == true] | order(publishedAt desc) {
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
}
`;

export const getPostBySlug = `
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    body[]{
      ...,
      _type == "video" => {
        ...,
        asset->{
          url
        }
      }
    },    
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

export const getRelatedPosts = `
  *[_type == "post" && references($categoryId) && slug.current != $slug]{
    title,
    _id,
    "slug": slug.current,
    mainImage,
    publishedAt,
    body, 
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
  }[0..3]
`;

export const globalSettingsQuery = `*[_type == "settings"][0]{
  siteName,
  logo{
    asset->{
      url
    },
    alt
  },

  // Header Menu
  headerMenu[]{
    label,
    slug,
    children[]{
      label,
      slug
    }
  },

  // Footer Menu
  footerMenu[]{
    label,
    url
  },

  // Social Links
  socialLinks[]{
    platform,
    url,
    icon{
      asset->{
        url
      }
    }
  },

  // Contact Fields
  contactEmail,
  phone,
  address,

  // SEO
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
  }
}`;
