import { PortableTextBlock } from "sanity";

export interface SanityImage {
    _type: "image";
    asset: {
        _ref?: string;
        _type: "reference";
        url?: string;
    };
    alt?: string;
}

export type ImageType = {
    _type: "image";
    alt: string;
    asset: { _ref: string; _type: "reference" };
};

export type VideoType = {
    _type: "file";    
    asset: { _ref: string; _type: "reference" };
};

export type DataTypeSection = {
    banner?: HomeBannerType[];
    packageTitle?: string;
    packageHeader?: PortableTextBlock[];
    packageContent?: PortableTextBlock[];

    itemHeader?: PortableTextBlock[];
    itemTitle?: string;

    about?: HomeAboutType[];
    keywords?: HomeKeyWords[];
    items?: HomeItems[];
    keywordstitle?: string;
    _key: string;
    _type: string;
}

export type SectionHeroType = {
    about :HomeAboutType[];
    banner : HomeBannerType[];
    itemHeader:PortableTextBlock[];
    itemTitle: string;
    items: HomeItems[];
    keywords: HomeKeyWords[];
    keywordstitle:string;
    packageContent: PortableTextBlock[];
    packageHeader: PortableTextBlock[];
    packageTitle: string;
    _key: string;
    _type: string;
};

export type BannerType = {
    _key: string;
    _type: "imageView";
    title: string;
    subtitle: string;
    body?: PortableTextBlock[];
    imageDesktop: ImageType;
    imageMobile: ImageType;
};

export type ContentType = {
    _key: string;
    image: ImageType;
    header: string;
    content: string;
};

export type CardType = {
    _id: null | undefined;
    _key: string;
    image: ImageType;
    tag: string;
    header: string;
    content: string;
    videoDesktop: VideoType;
    link: string;
    body: PortableTextBlock[];
};

export type HomeBannerType = {
    _key?:string;
    header?: PortableTextBlock [];        
    videoDesktop?: VideoType;
    videoMobile?: VideoType;
}

export type HomeAboutType = {
    image: ImageType;
    content: PortableTextBlock[];
    ctaLink: string;
    ctaName: string;
    header: PortableTextBlock[];
    title: string;
    key:string;
}

export type HomeKeyWords = {
    _key?: string;
    content?:string;
    image?: ImageType;
    header?:string;
    tag?:string;
    icon?: ImageType;
    body?: PortableTextBlock[];
}

export type HomeItems = {
    key: string;
    content:string;
    header: string;
    image: ImageType;
    title?: string;
}

export type PackagePrice = {
    currency: string;
    price: number;
    _key: string;
}

export type PackageType ={
    _id?: null | undefined;
    title?: string;
    label?: string;
    order?:number;
    currency?: string;
    price?: number;
    ctaText?:string;
    ctaLink?: string;
    billingCycle?: string;
    sectionTitle?: string;
    features: string[];
    content?:string;
    prices?: PackagePrice[];
}

export type SectionType = {
  keywords?: HomeKeyWords;
  about?: HomeAboutType[];
  items?: HomeItems[];
  keywordstitle?: string;
  packageTitle?: string;
  packageHeader?: string;
  packageContent?: string;
  title?: string;
  itemHeader?: PortableTextBlock[];
  itemTitle?: string;
  body?: PortableTextBlock[];
  header?: PortableTextBlock[];
  techHeader?: string;
  benefitHeader?: string;
  _key?: string;
  imageView?: BannerType | BannerType[];
  imageHeaderContent?: ContentType | ContentType[];
  card?: CardType | CardType[];
  bannerContent?: CardType | CardType[];
  content?: CardType | CardType[];
  benefits?: CardType | CardType[];
  techItems?: CardType | CardType[];
};

export interface keywordsitems{
    badge:string;
    content:string;
    ctaName:string;
    image:ImageType;
    slug?: {
        _type?: string;
        current?: string;
    };
    title:string;
    _key:string
}

export interface FeatureItem {
    keywordsitems?:keywordsitems[];
    itemHeader?: PortableTextBlock[];
    itemTitle?: string; 
    keywordstitle?: string;
    _type?:string;       
    bannerdesktop?: ImageType;
    bannermobile?: ImageType;
    imageDesktop?: ImageType;
    imageMobile?: ImageType;
    sectionImage?: ImageType;    
    icon?: ImageType;
    _key?: string;
    title?: string;
    sectionHeader?: PortableTextBlock[];
    sectionSubHeader?:string;
    sectionContent?: string;
    header?: PortableTextBlock[];
    subheader?: string;
    packageTitle?:string;
    body?: PortableTextBlock[];
    packageContent?: PortableTextBlock[];
    description?: PortableTextBlock[];
    techCtaLink?: string;
    techCtaName?:string;
    techHeader?: PortableTextBlock[];
    packageHeader?: PortableTextBlock[];
    packageCtaName?:string;
    packageCtaLink?:string;
    businessHeader?:PortableTextBlock[];
    businessImage?: ImageType;
    logo?: ImageType;
    mode?:string;
    currency?:string;
    banner?: HomeBannerType[];
    about?: HomeAboutType[];
    items?: HomeItems[];
    businesskeywords?: {
        icon: ImageType;
        header: string;
        content: string;
        _key:string;
    }
    techkeywords?:{
        icon?: ImageType;
        header?: string;
        description?: PortableTextBlock[];
        content?: string;
        title?: string;
    }
    secondaryHeader?: PortableTextBlock[];
    secondarycontent?:string;
    secondaryCtaName?:string;
    secondaryCtaLink?:string;
    secondarydesktop?: ImageType;
    secondarymobile?: ImageType;
    keywords?: {
        icon?: ImageType;
        header: string;
        description?: PortableTextBlock[]; 
        content?: string;
    }[];
    //forms?: any[]; // referAFriendForm (object)
}

export interface PageDataType {
    keywords?: KeywordsType [];
    slug?: string;
    title?: string;
    sections?: FeatureItem[];
    tag?: string;
    header?: PortableTextBlock[];
    body: PortableTextBlock[];
    imageDesktop?: ImageType;
    imageMobile?: ImageType;
    sectionHeader?: PortableTextBlock[];
    sectionImage?: ImageType;
    sectionSubHeader?:string;
    sectionContent?:string;
    subheader?: string;
    banner?: ImageType;
    packageTitle? :string;
    packageHeader?:PortableTextBlock[];
    packageContent?:PortableTextBlock[];
    bannerdesktop?: ImageType;
    bannermobile?: ImageType;    
    seo?: SeoMetaType;
}

export interface KeywordsType {
    _key?: string;
    _id:string;
    header?: string;
    icon?: ImageType;
    body?: PortableTextBlock[];
    date?: string;
    subtitle?: string;
    title?:string;
    content?:string;
    price?:string;
    image?:ImageType;
    tag?:string;
}

export interface ActivitiesMainType {
    _id: string;    
    code: string;
    activityName: string;
    activityGroup: string;
    active: boolean;
    description: string;
}

export interface ActivitiesType {
    standard: ActivitiesMainType[];
    premium: ActivitiesMainType[];
    custom: ActivitiesMainType[];
}

export interface ActivitiesTabType {    
    header?:string;
    content?: string;
    _id?:string;
    price?:number;
}

export interface ActivitiesTabProps {
    keywords: ActivitiesTabType[];
    activities: ActivitiesType;
}

export interface AuthorType {
    _id?: string;
    name: string;
    image?: ImageType;
}

export interface CategoryType {
    _id: string;
    title?: string;
    description?: string;
}

export interface PostType {
    _id: string;
    title: string;
    slug: string;
    publishedAt: string;
    mainImage?: ImageType;
    body: PortableTextBlock[];
    author?: AuthorType;
    categories?: CategoryType[];
    datetime: string;
    seo?: SeoMetaType;
}

export interface PageSettingsType {
    siteName?: string;
    logo?: {
        asset?: {
            url: string;
        };
        alt?: string;
    };
    headerMenu?: HeaderMenuItem[];
    footerMenu?: FooterMenuItem[];
    socialLinks?: SocialLink[];
    contactEmail?: string;
    phone?: string;
    address?: string;
    seo?: SeoMetaType;
}

export interface SeoMetaType {    
    metaTitle?: string;
    metaDescription?: PortableTextBlock[];
    keywords?: string[];
    openGraphImage?: {
        asset?: {
            url?: string;
            _ref?: string;
            _type?: string;
        };
    };
    openGraphUrl?: string;
    title?: string;
    description?: string;
    facebookAppId?: string;       
}

export interface HeaderMenuItem {
    label?: string;
    slug?: {
        _type?: string;
        current?: string;
    };
    children?: HeaderMenuChild[];
}

export interface HeaderMenuChild {
    label?: string;
    slug?: {
        _type?: string;
        current?: string;
    };
}

export interface FooterMenuItem {
    label?: string;
    url?: string;
}

export interface SocialLink {
    platform?: string;
    url?: string;
    icon?: {
        asset?: {
            url: string;
        };
    };
}
