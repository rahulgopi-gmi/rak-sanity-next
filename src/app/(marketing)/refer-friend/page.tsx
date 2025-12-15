import { sanityFetch } from "@/sanity/lib/live";
import { getPageBySlug } from "@/sanity/queries/pages";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";
import { notFound } from "next/navigation";
import { CardType, PageDataType } from "@/features/application/types/sanity";
import ReferForm from "@/components/layout/refer-form/ReferForm";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { getBodyText } from "@/sanity/lib/utils";
import { cache } from "react";

/** Fetch Sanity Data with cache */
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
    const data  = await getData('refer-friend');
    const seo = data?.seo;

    const title = seo?.metaTitle || "Innovation City";
    const description = 
        seo ? toPlainText(seo.metaDescription) 
        : "Set up your business easily with endless possibilities in the world's first free zone focused on AI, Web3, Robotics, Gaming & Healthtech companies.";
    const ogImageUrl = seo?.openGraphImage?.asset?.url || "/images/Innovation-City.jpg";
    const keywords = seo?.keywords?.map((k: string) => k) 
    || 
    ["innovation", "web3", "robotics", "healthtech", "artificial intelligence", "company set up", "free zone", "business license"];    

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
    try{
        const data = await getData('refer-friend');
        if (!data) return notFound();
        const section: PageDataType | undefined = data?.sections?.[0];
        const keywords: CardType[] = Array.isArray(section?.keywords)
            ? section?.keywords
            : section?.keywords
                ? [section?.keywords]
                : [];

        return (
            <main className="relative w-full">
                <section className="h-[520px] relative">                    
                    {
                        section?.bannerdesktop && (
                            <div className="hidden md:block w-full">
                                <Image fill alt={section?.bannerdesktop.alt} src={urlFor(section?.bannerdesktop).url()} />
                            </div>
                        )
                    }
                
                    {
                        section?.bannermobile && (
                            <div className="w-full md:hidden">
                                <Image fill alt={section?.bannerdesktop.alt} src={urlFor(section?.bannermobile).url()} />
                            </div>
                        )        
                    }

                    <div className="w-full absolute">
                        <div className="container">
                            <div className="w-full pt-[210px] lg:pt-[340px] pb-[100px] lg:pb-[50px]">
                                <div className="max-w-[580px] md:w-full refer-page-hdr">
                                    {
                                        section?.header && (
                                            <div className="refer-section" dangerouslySetInnerHTML={{ __html: getBodyText(section?.header) }}></div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>    
                </section>
    
                <section className="w-full pb-[100px] refer-form-section">
                    <div className="container">
                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-14">
                            <div className="w-full -mt-20 lg:mt-0">
                                <div className="w-full">
                                    {
                                        section?.body && (
                                            <div className="refer-section" dangerouslySetInnerHTML={{ __html: getBodyText(section?.body) }}></div>
                                        )
                                    }                                    
                                </div>
    
                                <div className="w-full pt-12">
                                    <ul className="flex flex-col gap-9" data-aos="fade-up">
                                        {
                                            keywords.map((i: any, index: number) => (
                                                <li key={index} className="text-[#FFFFFFCC] flex gap-6 items-center text-[16px] leading-7! tracking-[0.16px] font-normal font-sans">
                                                    {
                                                        i.icon && (
                                                            <span className="li-sub-icon flex items-center justify-center">
                                                                <span className="inline-block w-5 h-5 relative">
                                                                    <Image fill alt={i.icon.alt} src={urlFor(i.icon).url()} />
                                                                </span>
                                                            </span>
                                                        )
                                                    }
                                                    <div className="refer-friend-items" dangerouslySetInnerHTML={{ __html: getBodyText(i?.body) }}></div>
                                                </li>
                                            ))
                                        }                                                                                
                                    </ul>
                                </div>
                            </div>
    
                            <div className="w-full black-form" data-aos="fade-up">
                                <div className="py-14 md:py-12 px-4 md:px-9 border border-[#FFFFFF1A] form-section rounded-3xl">
                                    <ReferForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
    catch(error){
        console.error("Page render failed:", error);        
        return <div className="w-full h-screen flex items-center justify-center">
            <p className="text-sm! text-center">Something went wrong. Please try again later.</p>
        </div>;
    }
}