export type ImageType = {
    _type: "image";
    alt: string;
    asset: { _ref: string; _type: "reference" };
};

export type VideoType = {
    _type: "file";    
    asset: { _ref: string; _type: "reference" };
};

export type BannerType = {
    _key: string;
    _type: "imageView";
    title: string;
    subtitle: string;
    body?: any[]; // Use PortableTextBlock[] if you have @sanity/types
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
    body: any[];
};

export type HomeBannerType = {
    _key?:string;
    header?: any;        
    videoDesktop?: any[];
    videoMobile?: any[];
}

export type HomeAboutType = {
    image: ImageType;
    content: any;
    ctaLink: string;
    ctaName: string;
    header:any;
    title: any;
    key:string;
}

export type HomeKeyWords = {
    _key?: string;
    content?:string;
    image?: ImageType | any;
    header?:string;
}

export type HomeItems = {
    key: string;
    content:string;
    header: string;
    image: ImageType | any;
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
}

export type SectionType = {
    keywords: HomeKeyWords | any;
    about: HomeAboutType [];    
    items: HomeItems [];
    keywordstitle?: string;
    packageTitle?: string;
    packageHeader?: string;
    packageContent?: string;
    title?: string;
    itemHeader?: any;
    itemTitle?: string;
    body: any[];
    header: any[];
    techHeader?: string;
    benefitHeader?: string;
    _key: string;
    imageView?: BannerType | BannerType[];
    imageHeaderContent?: ContentType | ContentType[];
    card?: CardType | CardType[];
    bannerContent?: CardType | CardType[];
    content?: CardType | CardType[];
    benefits?: CardType | CardType[];
    techItems?: CardType | CardType[];
};



export interface SanityImage {
    _type: "image";
    asset: {
        _ref?: string;
        _type: "reference";
        url?: string;
    };
    alt?: string;
}


export interface FeatureItem {
    bannerdesktop?: SanityImage | any;
    bannermobile?: SanityImage | any;
    icon?: SanityImage | any;
    title?: string;
    header?: string | any;
    subheader?: string;
    body?:any;
    description?: any[];
    techCtaLink?: string;
    techCtaName?:string;
    techHeader?:any;
    packageHeader?:any;
    packageCtaName?:string;
    packageCtaLink?:string;
    businessHeader?:any;
    businessImage?: SanityImage | any;   
    businesskeywords?: {
        icon?: SanityImage;
        header?: string;
        content?: string;
        _key:string;
    }
    techkeywords?:{
        icon?: SanityImage;
        header?: string;
        description?: any[];
        content?: string;
    }
    keywords?: {
        icon?: SanityImage;
        header?: string;
        description?: any[]; 
        content?: string;
    }[];

    forms?: any[]; // referAFriendForm (object)
}

export interface PageDataType {
    keywords?: any [];
    slug?: string;
    title?: string;
    sections?: FeatureItem[];
    tag?: string;
    header?: any;
    body?: any;
    imageDesktop?: SanityImage | any;
    imageMobile?: SanityImage | any;
    sectionHeader?: any;
    sectionImage?: SanityImage | any;
    sectionSubHeader?:string;
    sectionContent?:string;
    subheader?: string;
    banner?: SanityImage | any;
    packageTitle? :string;
    packageHeader?:any;
    packageContent?:any;
    bannerdesktop?: SanityImage | any;
    bannermobile?: SanityImage | any;    
    seo?: {
        metaTitle?: string;
        metaDescription?: any;
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
        other: {
            author: string;
            robots: string;
            "fb:app_id": string;
            "X-Content-Type-Options": string;
            "Referrer-Policy": string;
        }
    }
}

export interface KeywordsType {
    _key?: string;
    header?: any;
    icon?: SanityImage | any;
    body?: any;
    date?: string;
    subtitle?: string;
    title?:string;
    content?:string;
    price?:string;
}

export interface ActivitiesMainType {
    _id: string;
    _createdAt: string;
    code: string;
    activityName: string;
    activityGroup: string;
    active: any;
    description: string;
}

export interface ActivitiesType {
    standard: ActivitiesMainType[];
    premium: ActivitiesMainType[];
    custom: ActivitiesMainType[];
}

export interface ActivitiesTabProps {
    keywords: KeywordsType[];
    activities: ActivitiesType;
}

export interface AuthorType {
    _id?: string;
    name: string;
    image?: SanityImage;
}

export interface CategoryType {
    _id?: string;
    title?: string;
    description?: string;
}

export interface PostType {
    _id: string;
    title: string;
    slug: string;
    publishedAt: string;
    mainImage?: SanityImage | any;
    body: any;
    author?: AuthorType;
    categories?: CategoryType | any;
    datetime: string;
    seo?: {
        metaTitle?: string;
        metaDescription?: any;
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
        other: {
            author: string;
            robots: string;
            "fb:app_id": string;
            "X-Content-Type-Options": string;
            "Referrer-Policy": string;
        }
    }
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

    seoTitle?: string;
    seoDescription?: string;
    seoImage?: {
        asset?: {
            url: string;
        };
        alt?: string;
    };
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
    url?: string;
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
