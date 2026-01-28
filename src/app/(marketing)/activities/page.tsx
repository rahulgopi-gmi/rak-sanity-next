import { normalizeArray } from "@/lib/helpers";
import { getBodyText } from "@/sanity/lib/utils";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";
import { notFound } from "next/navigation";
import PillTag from "@/components/ui/pill-tag";
import { urlFor } from "@/sanity/lib/image";
import { getSeoData } from "@/sanity/lib/seo";
import { getPageWithActivities } from "@/lib/data";
import ActivitiesTab from "@/components/ActivitiesTab";

/**
 * Generate metadata for the page.
*/
export async function generateMetadata(): Promise<Metadata> {
    const slug = "activities";
    const template = "other";
    const seo  = await getSeoData(slug, template);

    if (!seo) return {};

    const title = seo?.metaTitle;
    const description = seo.metaDescription?.length ? toPlainText(seo.metaDescription) : undefined;
    const ogImageUrl = urlFor(seo?.openGraphImage, { width: 1200, height: 630 });
    const keywords = seo?.keywords?.map((k: string) => k);

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
        url: seo?.openGraphUrl,
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
        const { page, activities } = await getPageWithActivities(slug, template);
        if (!page) return notFound();

        const section = page?.sections?.[0];
        if (!section) return notFound();

        const keywords = normalizeArray(section?.keywords);

        return (
            <main className="w-full">
                <section className="relative w-full bg-black bg-[url('/images/gradient/bg-grd-banner.jpg')] max-md:bg-[url('/images/gradient/bg-grd-banner-mob.png')] bg-cover max-md:bg-contain bg-no-repeat with-overlay">
                    <div className="container max-auto">
                        <div className="activities-top-section activities-top-section-wd mx-auto flex flex-col items-center justify-center text-center pt-37.5 pb-7.5">
                            {
                                section.title && (
                                    <PillTag className="mx-auto mb-6.25 max-md:mb-5">
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

                    <div className="container mx-auto pt-6 pb-44">
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