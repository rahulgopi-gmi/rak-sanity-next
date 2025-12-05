import { PageDataType } from "@/features/application/types/sanity";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { getBodyText } from "@/sanity/lib/utils";
import { getPageBySlug } from "@/sanity/queries/pages";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import toast from "react-hot-toast";

/** 
 *  Fetch Sanity Data
*/
async function getData(slug: string): Promise<PageDataType | null>{
    
    try {
        const { data } = await sanityFetch({
            query: getPageBySlug,
            params: { 
                slug: slug
            },
            stega: false,
        });
        return data ?? null;
    }
    catch (error){
        toast.error(`Sanity Fetch Error ${slug}`);
        console.error(`Sanity Fetch Error ${slug} : `, error);
        return null;
    }    
}

/**
 * Generate metadata for the page.
*/
export async function generateMetadata(): Promise<Metadata> {
    const meta = await getData('privacy-policy');

    if (!meta?.seo) {
        return {
            title: "Privacy Policy",
            description: "Privacy Policy",
            openGraph: {
                title: "Privacy Policy",
                description: "Privacy Policy page",
                type: "website",
                url: "",
            }
        };
    }

    const title = meta?.seo?.metaTitle
    const description = toPlainText(meta?.seo?.metaDescription);
    const ogImageUrl = meta?.seo?.openGraphImage?.asset?.url

    const keywords = meta?.seo?.keywords?.map((k: string) => k) || [];

    return {
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            type: "website",
            url: "",
            images: ogImageUrl ? [{ url: ogImageUrl }] : [],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ogImageUrl ? [ogImageUrl] : [],
        },
        other: {
            "fb:app_id": meta.seo.facebookAppId || ""
        }
    } satisfies Metadata;
}

/**
 * Page Component
*/
export default async function Page() {
    try {
        const data = await getData('privacy-policy');
        if (!data) return notFound();
        const section = data.sections?.[0] as any;        

        return(
            <main className="w-full">
                <section className="landing-banner">
                    <div className="w-full h-[350px] relative hidden md:block">
                        {
                            section?.bannerdesktop ? 
                                <Image fill alt={section?.bannerdesktop.alt} src={urlFor(section?.bannerdesktop).url()} />
                            :
                            null
                        }
                    </div>

                    <div className="w-full h-[350px] relative block md:hidden">
                        {
                            section?.bannermobile ?
                                <Image fill alt={section?.bannermobile.alt} src={urlFor(section?.bannermobile).url()} />
                            :
                            null
                        }
                    </div>

                    <div className="banner-overlay">
                        <div className="container">
                            <div className="privacy-policy-banner-heading py-58 pt-16 text-center" data-aos="fade-up">
                                {
                                    section?.header ?
                                        <div dangerouslySetInnerHTML={{ __html: getBodyText(section?.header) }}></div>
                                    :
                                    null
                                }
                            </div>
                        </div>
                    </div>
                </section>

                <section className="privacy-policy-wrapper">
                    <div className="container">
                        <div className="w-full">
                            {
                                section?.body ?
                                    <div dangerouslySetInnerHTML={{ __html: getBodyText(section?.body) }}></div>
                                :
                                null
                            }
                        </div>
                    </div>
                </section>
            </main>
        )
    } 
    catch (error) {
        toast.error("Page render failed");
        console.error("Page render failed:", error);
        return <p>Something went wrong. Please try again later.</p>;
    }
}