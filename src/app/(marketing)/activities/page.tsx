import ActivitiesTab from "@/components/layout/activities-tab/ActivitiesTab";
import PillTag from "@/components/layout/pill-tag/PillTag";
import { ActivitiesType, KeywordsType, PageDataType } from "@/features/application/types/sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { getBodyText } from "@/sanity/lib/utils";
import { getActivitiesItems, getPageBySlug } from "@/sanity/queries/pages";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";
import { notFound } from "next/navigation";
import { cache } from "react";

/** 
 *  Fetch Sanity Data (cached)
*/
const getData = cache(async (slug: string): Promise<{ page: PageDataType | null; activities: ActivitiesType }> => {
    try {
        const [{ data: page }, { data: activitiesData }] = await Promise.all([
            sanityFetch({
                query: getPageBySlug,
                params: { slug },
                stega: false,
            }),
            sanityFetch({
                query: getActivitiesItems,
                stega: false,
            })
        ]);

        const activities: ActivitiesType = {
            standard: activitiesData?.standard ?? [],
            premium: activitiesData?.premium ?? [],
            custom: activitiesData?.custom ?? [],
        };

        return { page: page ?? null, activities: activities ?? [] };
    }
    catch (error) {        
        console.error(`Sanity Fetch Error ${slug}: `, error);
        return { page: null, activities: { standard: [], premium: [], custom: [] } };
    }
});

/**
 * Generate metadata for the page.
*/
export async function generateMetadata(): Promise<Metadata> {
    const { page } = await getData('activities');

    const seo = page?.seo;
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
        const { page, activities } = await getData("activities");
        if (!page) return notFound();
        const section: PageDataType | undefined = page?.sections?.[0];
        if (!section) return notFound();

        const keywords: KeywordsType[] = Array.isArray(section.keywords)
                ? section.keywords
                : section.keywords
                    ? [section.keywords]
                    : [];

        return (
            <main className="w-full">
                <section className="relative w-full bg-[url('/bg-grd-banner.jpg')] max-md:bg-[url('/bg-grd-banner-mob.png')] bg-cover bg-no-repeat with-overlay">
                    <div className="container max-auto">
                        <div className="activities-top-section activities-top-section-wd mx-auto flex flex-col items-center justify-center text-center pt-[211px] pb-[30px]">
                            {
                                section.title && (
                                    <PillTag className="mx-auto mb-[30px] max-md:mb-5">
                                        {section.title}
                                    </PillTag>
                                )
                            }

                            {
                                section.header && (
                                    <div dangerouslySetInnerHTML={{ __html: getBodyText(section?.header) }}></div>
                                )
                            }

                            {
                                section.header && (
                                    <div dangerouslySetInnerHTML={{ __html: getBodyText(section?.body) }}></div>
                                )
                            }
                        </div>
                    </div>

                    <div className="container mx-auto pt-12 pb-44" data-aos="fade-up">
                        <div className="w-full">
                            <ActivitiesTab 
                                keywords={keywords}
                                activities={activities} 
                            />
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