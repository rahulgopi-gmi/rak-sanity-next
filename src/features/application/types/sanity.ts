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
    key?: string;
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
    currency?: string;
    price?: number;
    ctaText?:string;
    ctaLink?: string;
    billingCycle?: string;
    sectionTitle?: string;
    features: string[];
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

export interface SEOType {
    metaTitle?: string;
    metaDescription?: any;
    openGraphImage?: {
        asset?: {
            url?: string;
        };
    };
    facebookAppId?: string;
    keywords?: string[];
}

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
    bannerdesktop?: SanityImage;
    bannermobile?: SanityImage;
    icon?: SanityImage;
    title?: string;
    header?: string;
    subheader?: string;

    description?: any[]; // blockContent -> array of blocks

    keywords?: {
        icon?: SanityImage;
        header?: string;
        description?: any[]; // blockContent
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
    seo?: {
        facebookAppId: string;
        metaTitle?: string;
        metaDescription?: any;
        openGraphImage?: { asset?: { url: string } }
        keywords?: string[];
    };
}

export interface KeywordsType {
    _key?: string;
    header: string;
    content?:string;
}

export interface ActivitiesMainType {
    _id: string;
    _createdAt: string;
    code: string;
    name: string;
    group: string;
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
