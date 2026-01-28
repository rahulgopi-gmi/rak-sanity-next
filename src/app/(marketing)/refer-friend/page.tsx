import { Metadata } from "next";
import { toPlainText } from "next-sanity";
import { notFound } from "next/navigation";
import { FeatureItem, HomeKeyWords } from "@/features/application/types/sanity";
import { urlFor } from "@/sanity/lib/image";
import { getBodyText } from "@/sanity/lib/utils";
import { normalizeArray } from "@/lib/helpers";
import Image from "next/image";
import { getSeoData } from "@/sanity/lib/seo";
import { getPageDataOnly } from "@/lib/data";
import ReferForm from "@/components/ReferForm";

/**
 * Generate metadata for the page.
*/
export async function generateMetadata(): Promise<Metadata> {
    const slug = "refer-friend";
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
    try{
        const slug = "refer-friend";
        const template = "other";
        const data = await getPageDataOnly(slug, template);
        if (!data) return notFound();

        const section: FeatureItem | undefined = data?.sections?.[0];
        if (!section) return notFound();
        
        const keywords = normalizeArray(section?.keywords);                

        return (
            <main className="relative w-full">
                <section className="relative h-130 max-md:h-107.5">
                    {
                        section?.bannerdesktop && (
                            <div 
                                className="hidden md:block w-full h-130 relative bg-cover"
                                style={{
                                    backgroundImage: `url(${urlFor(section?.bannerdesktop) || ""})`,
                                }}
                            >                                
                            </div>
                        )
                    }
                
                    {
                        section?.bannermobile && (
                            <div 
                                className="w-full h-107.5 md:hidden relative bg-cover"
                                style={{
                                    backgroundImage: `url(${urlFor(section?.bannermobile) || ""})`,
                                }}
                            >
                                {/* <Image fill alt={section?.bannermobile.alt} src={urlFor(section?.bannermobile).url()} /> */}
                            </div>
                        )        
                    }

                    <div className="w-full absolute top-0">
                        <div className="container">
                            <div className="w-full pt-52.5 lg:pt-90 pb-25 lg:pb-12.5">
                                <div className="max-w-145 md:w-full refer-page-hdr">
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
    
                <section className="w-full pb-25 refer-top-section">
                    <div className="container">
                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-14">
                            <div className="w-full -mt-20 lg:mt-0 lg:pr-14 relative z-10">
                                <div className="w-full">
                                    {
                                        section?.body && (
                                            <div className="refer-section" dangerouslySetInnerHTML={{ __html: getBodyText(section?.body) }}></div>
                                        )
                                    }                                    
                                </div>
    
                                <div className="w-full pt-6 max-md:pt-5">
                                    <ul className="flex flex-col gap-9 max-md:gap-12">
                                        {
                                            keywords.map((i: HomeKeyWords, index: number) => (
                                                <li key={index} className="text-[#FFFFFFCC] flex gap-6 items-center text-[16px] leading-7! tracking-[0.16px] font-normal font-sans">
                                                    {
                                                        i.icon && (
                                                            <span className="li-sub-icon flex items-center justify-center">
                                                                <span className="inline-block w-6 h-6 relative">
                                                                    <Image fill alt={i.icon.alt} src={urlFor(i.icon) || ""} />
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
    
                            <div className="w-full black-form">
                                <div className="py-14 md:py-12 px-4 refre md:px-9 refer-form-section border border-[#FFFFFF1A] form-section rounded-3xl">
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