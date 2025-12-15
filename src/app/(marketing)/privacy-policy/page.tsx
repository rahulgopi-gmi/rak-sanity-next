import { PageDataType } from "@/features/application/types/sanity";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { getBodyText } from "@/sanity/lib/utils";
import { getPageBySlug } from "@/sanity/queries/pages";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

/** Fetch Sanity Data with caching */
const getData = cache(async (slug: string): Promise<PageDataType | null> => {    
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
        console.error(`Sanity Fetch Error ${slug} : `, error);
        return null;
    }    
});

/**
 * Generate metadata for the page.
*/
export async function generateMetadata(): Promise<Metadata> {
    const data = await getData('privacy-policy');
    const seo = data?.seo;
    const title = seo?.metaTitle || "Innovation City";
    const description = seo ? toPlainText(seo.metaDescription || []) : "Set up your business easily with endless possibilities in the world's first free zone focused on AI, Web3, Robotics, Gaming & Healthtech companies.";
    const ogImageUrl = seo?.openGraphImage?.asset?.url || "/images/Innovation-City.jpg";
    const keywords = seo?.keywords?.map((k: string) => k) || ["innovation", "web3", "robotics", "healthtech", "artificial intelligence", "company set up", "free zone", "business license"];    

    return{
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            type: "website",
            url: seo?.openGraphUrl || "https://innovationcity.com",
            images: ogImageUrl ? [{ url: ogImageUrl }] : [],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ogImageUrl ? [ogImageUrl] : [],
        },
        other: {
            author: "Innovation City",
            robots: "index, follow",
            "fb:app_id": seo?.facebookAppId || "",            
            "X-Content-Type-Options": "nosniff",
            "Referrer-Policy": "strict-origin-when-cross-origin"
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
        const section: PageDataType | undefined = data?.sections?.[0];   
        if (!section) return notFound();

        return(
            <main className="w-full">
                <section className="landing-banner">                    
                    {
                        section?.bannerdesktop && ( 
                            <div className="w-full h-[350px] relative hidden md:block">
                                <Image fill alt={section?.bannerdesktop.alt} src={urlFor(section?.bannerdesktop).url()} />
                            </div>
                        )
                    }                
                    
                    {
                        section?.bannermobile && (
                            <div className="w-full h-[350px] relative block md:hidden">
                                <Image fill alt={section?.bannermobile.alt} src={urlFor(section?.bannermobile).url()} />
                            </div>    
                        )
                    }

                    <div className="banner-overlay">
                        <div className="container">
                            <div className="privacy-policy-banner-heading py-58 pt-16 text-center" data-aos="fade-up">
                                {
                                    section?.header && (
                                        <div dangerouslySetInnerHTML={{ __html: getBodyText(section?.header) }}></div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </section>

                <section className="privacy-policy-wrapper">
                    <div className="container">
                        <div className="w-full">
                            {
                                section?.body && (
                                    <div dangerouslySetInnerHTML={{ __html: getBodyText(section?.body) }}></div>
                                )
                            }
                        </div>
                    </div>
                </section>
            </main>
        )
    } 
    catch (error) {        
        console.error("Page render failed:", error);
        return <div className="w-full h-screen flex items-center justify-center">
            <p className="text-sm! text-center">Something went wrong. Please try again later.</p>
        </div>;
    }
}