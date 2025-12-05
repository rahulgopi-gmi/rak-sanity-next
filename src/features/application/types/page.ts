import { SectionType } from "./sanity";

export type PageData = {
    _id: string;
    sections: SectionType[];
    seo?: {
        metaTitle?: string;
        metaDescription?: any;
        openGraphImage?: { asset?: { url?: string } };
    };
};

export type PageProps = {
    params: { slug: string };
};
