import { urlFor } from "@/sanity/lib/image";
import { getBodyText } from "@/sanity/lib/utils";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSeoData } from "@/sanity/lib/seo";
import { getPageDataOnly } from "@/lib/data";
import NotFound from "@/app/not-found";

/**
 * Generate metadata for the page.
*/
export async function generateMetadata(): Promise<Metadata> {
    const slug = "privacy-policy";
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
        const slug = "privacy-policy";
        const template = "other";
        const data = await getPageDataOnly(slug, template);
        if (!data) return notFound();
        const section = data?.sections?.[0];   
        if (!section) return notFound();

        return(
            <main className="w-full">
                <section className="landing-banner">                    
                    {
                        section?.bannerdesktop && ( 
                            <div className="w-full h-[350px] relative hidden md:block">
                                <Image fill alt={section?.bannerdesktop.alt} src={urlFor(section?.bannerdesktop) || ""} />
                            </div>
                        )
                    }                
                    
                    {
                        section?.bannermobile && (
                            <div className="w-full h-[350px] relative block md:hidden">
                                <Image fill alt={section?.bannermobile.alt} src={urlFor(section?.bannermobile) || ""} />
                            </div>    
                        )
                    }

                    <div className="banner-overlay privacy-policy-banner-overlay md:h-[350px]!">
                        <div className="container">
                            <div className="privacy-policy-banner-heading py-58 pt-16 text-center">
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
        return <NotFound />;
    }
}