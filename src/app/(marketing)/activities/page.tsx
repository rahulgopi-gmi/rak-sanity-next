import ActivitiesTab from "@/components/layout/activities-tab/ActivitiesTab";
import PillTag from "@/components/layout/pill-tag/PillTag";
import { ActivitiesType, KeywordsType, PageDataType } from "@/features/application/types/sanity";
import { normalizeArray } from "@/lib/helpers";
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
const getData = async (slug: string, template:string): Promise<{ page: PageDataType | null; activities: ActivitiesType }> => {
    try {
        const [{ data: page }, { data: activitiesData }] = await Promise.all([
            sanityFetch({
                query: getPageBySlug,
                params: { 
                    slug,
                    template
                },
                stega: false
            }),
            sanityFetch({
                query: getActivitiesItems,
                stega: false
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
};

/**
 * Generate metadata for the page.
*/
export async function generateMetadata(): Promise<Metadata> {
    const slug = "activities";
    const template = "other";
    const { page } = await getData(slug, template);

    const seo = page?.seo;
    const title = seo?.metaTitle || "Innovation City";
    const description = seo ? toPlainText(seo.metaDescription || []) : "Set up your business easily with endless possibilities in the world's first free zone focused on AI, Web3, Robotics, Gaming & Healthtech companies.";
    const ogImageUrl = seo?.openGraphImage?.asset?.url || "/images/Innovation-City.jpg";
    const keywords = seo?.keywords?.map((k: string) => k) || ["innovation", "web3", "robotics", "healthtech", "artificial intelligence", "company set up", "free zone", "business license"];    

    return{
      title,
      description,
      keywords,
      referrer: "strict-origin-when-cross-origin",
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        title,
        description,
        type: "website",
        url: seo?.openGraphUrl || "https://innovationcity.com",
        images: ogImageUrl ? [{ url: ogImageUrl }] : []        
      },
      twitter: {
          card: "summary_large_image",
          title,
          description,
          images: ogImageUrl ? [ogImageUrl] : [],
      },
      other: seo?.facebookAppId
        ? {
            "fb:app_id": seo.facebookAppId,
          }
        : undefined        
    } satisfies Metadata;
}

/**
 * Page Component
*/
export default async function Page() {
    try {
        const slug = "activities";
        const template = "other";
        const { page, activities } = await getData(slug, template);
        if (!page) return notFound();

        const section: PageDataType | undefined = page?.sections?.[0];
        if (!section) return notFound();

        const keywords: KeywordsType[] = normalizeArray(section?.keywords);

        return (
            <main className="w-full">
                <section className="relative w-full bg-black bg-[url('/bg-grd-banner.jpg')] max-md:bg-cover max-md:bg-[url('/bg-grd-banner-mob.png')] bg-contain bg-no-repeat with-overlay">
                    <div className="container max-auto" data-aos="fade-up" data-aos-delay="200">
                        <div className="activities-top-section activities-top-section-wd mx-auto flex flex-col items-center justify-center text-center pt-[150px] max-md:pt-[135] pb-[30px]">
                            {
                                section.title && (
                                    <PillTag className="mx-auto mb-[25px] max-md:mb-5">
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

                    <div className="container mx-auto pt-6 pb-44" data-aos="fade-up">
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