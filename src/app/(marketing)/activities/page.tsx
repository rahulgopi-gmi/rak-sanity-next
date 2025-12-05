import ActivitiesTab from "@/components/layout/activities-tab/ActivitiesTab";
import PillTag from "@/components/layout/pill-tag/PillTag";
import { ActivitiesTabProps, ActivitiesType, CardType, KeywordsType, PageDataType, SectionType, SEOType } from "@/features/application/types/sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { getBodyText } from "@/sanity/lib/utils";
import { getActivitiesItems, getPageBySlug } from "@/sanity/queries/pages";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";
import { notFound } from "next/navigation";
import toast from "react-hot-toast";

/** 
 *  Fetch Sanity Data
*/
async function getData(slug: string): Promise<{ page: PageDataType | null, activities: ActivitiesType }> {
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
        toast.error(`Sanity Fetch Error ${slug}`);
        console.error(`Sanity Fetch Error ${slug}: `, error);
        return { page: null, activities: { standard: [], premium: [], custom: [] } };
    }
}

/**
 * Generate metadata for the page.
*/
export async function generateMetadata(): Promise<Metadata> {
    const meta = await getData('activities') as PageDataType;

    if (!meta?.seo) {
        return {
            title: "Activities",
            description: "Activities page",
            openGraph: {
                title: "Activities",
                description: "Activities page",
                type: "website",
                url: "",
            }
        };
    }

    const title = meta?.seo?.metaTitle
    const description = toPlainText(meta?.seo?.metaDescription);
    const ogImageUrl = meta?.seo?.openGraphImage?.asset?.url

    const keywords = meta?.seo?.keywords?.map((k: string) => k) || [];

    return{
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
        const { page, activities } = await getData("activities");
        if (!page) return notFound();
        const section = page.sections?.[0] as PageDataType;        

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
                            <PillTag className="mx-auto mb-[30px] max-md:mb-5">
                                {section.title}
                            </PillTag>

                            <div dangerouslySetInnerHTML={{ __html: getBodyText(section?.header) }}></div>                           
                            <div dangerouslySetInnerHTML={{ __html: getBodyText(section?.body) }}></div>                            
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
        toast.error("Page render failed");
        console.error("Page render failed:", error);
        return <p>Something went wrong. Please try again later.</p>;
    }    
}   