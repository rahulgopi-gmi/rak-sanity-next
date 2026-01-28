import { FeatureItem, HomeKeyWords } from "@/features/application/types/sanity";
import { normalizeArray } from "@/lib/helpers";
import { urlFor } from "@/sanity/lib/image";
import { getBodyText } from "@/sanity/lib/utils";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import PillTag from "@/components/ui/pill-tag";
import { getSeoData } from "@/sanity/lib/seo";
import { getPageDataOnly } from "@/lib/data";

/**
 * Generate metadata for the page.
*/
export async function generateMetadata(): Promise<Metadata> {
    const slug = "about";
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
        const slug = "about";
        const template = "other";
        const data = await getPageDataOnly(slug, template);
        if (!data) return notFound();
        
        const section: FeatureItem | undefined = data?.sections?.[0];
        if (!section) return notFound();
        
        const keywords = normalizeArray(section?.keywords);

        const desktopImage = urlFor(section?.imageDesktop) ?? "";
        const mobileImage = urlFor(section?.imageMobile) ?? "";        

        return(
            <main className="w-full">                
                <section className="relative bg-black pt-37.5 pb-1.75 text-center max-md:bg-[url('/images/gradient/bg-grd-banner.jpg')] bg-[url('/images/gradient/bg-grd-banner.jpg')] bg-no-repeat bg-cover max-md:bg-contain overflow-hidden max-md:pt-32.5 max-md:pb-6.25">
                    
                    
                    <div className="container mx-auto about-top-section">                        
                        <PillTag className="mx-auto mb-7.5! max-md:mb-5">
                            {section.title ?? ""}
                        </PillTag>  

                        {
                            section.header && (                      
                                <div className="xl:px-20" dangerouslySetInnerHTML={{ __html: getBodyText(section?.header) }}></div>
                            )
                        }

                        {
                            section.body && (
                                <div className="w-full flex justify-center" dangerouslySetInnerHTML={{ __html: getBodyText(section?.body) }}></div>
                            )
                        }    


                        {
                            (desktopImage || mobileImage) && (
                                <div className="abtimg-wrap mb-22.5 md:mb-16.25">
                                    {
                                        desktopImage && (
                                            <div className="w-full h-123.75 relative hidden md:block">
                                                <Image 
                                                    fill 
                                                    alt={section.imageDesktop?.alt ?? ""}
                                                    src={desktopImage}
                                                    className="rounded-10 object-cover" 
                                                />
                                            </div>
                                        )
                                    }

                                    {
                                        mobileImage && (
                                            <div className="w-full h-123.75 relative block md:hidden">
                                                <Image 
                                                    fill 
                                                    alt={section.imageMobile?.alt ?? ""}
                                                    src={mobileImage}
                                                    className="rounded-10 object-cover" 
                                                />
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }

                        {
                            section.sectionHeader && (
                                <div className="about-sub-hdr" dangerouslySetInnerHTML={{ __html: getBodyText(section.sectionHeader)}}></div>
                            )
                        }
                    </div>
                </section>
                           
                <section className="imgcon-wrapper max-lg:pt-5 text-white bg-black w-full md:w-auto">
                    <div className="container">
                        <div className="imgcon-inner-wrapper">
                            <div className="split-wrap flex flex-col-reverse md:flex-row max-md:mb-0 max-lg:mb-10 w-full">
                                <div className="w-full lg:w-7/12 md:w-full">
                                    <div className="w-full h-102.5 max-md:h-58.75 relative">
                                        {
                                            section?.sectionImage && (
                                                <Image
                                                    src={urlFor(section.sectionImage) || ""}
                                                    alt={section?.sectionImage?.alt ?? ""}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )
                                        }                                        
                                    </div>
                                </div>

                                <div className="w-full lg:w-7/12 md:w-full max-md:pl-4">
                                    <h3 className="text-lightgray text-20! font-sans font-normal leading-6.75! text-center md:text-left mb-7.5 md:mb-10 max-w-121.5 ml-auto mr-auto md:ml-auto md:mr-0" >
                                        {section?.sectionSubHeader || ""}
                                    </h3>

                                    <p className="text-lightgray text-base! font-sans leading-normal! text-center md:text-left max-w-121.5 ml-auto mr-auto md:ml-auto md:mr-0">
                                        {section?.sectionContent || ""}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>             
                
                {
                    keywords.length > 0 && (
                        <section className="ourvmv-sec w-full max-md:pb-12.5 max-md:pb-12.5 py-30">
                            <div className="container">
                                {
                                    keywords.map((c: HomeKeyWords, index:number) => {
                                        const cardImage = c.image && urlFor(c.image) || "";
                                        if (!cardImage) return null;

                                        return(                                        
                                            <div 
                                                key={`about-card-${index}`}
                                                className="ourvmv flex flex-col-reverse md:flex-row items-center max-md:mb-0 mb-30 last:mb-0"                                                 
                                            >
                                                <div className="md:w-1/2 w-full max-md:mb-10">
                                                    <div className="m-wrap relative w-full h-67.25 max-md:h-42.5">
                                                        <Image 
                                                            fill 
                                                            alt={c.image?.alt ?? ""}
                                                            src={cardImage} 
                                                            className="flex m-auto" 
                                                        />
                                                    </div>
                                                </div>

                                                <div className="md:w-1/2 w-full max-md:mb-10">
                                                    <PillTag variant={'light'} className="mb-3 max-md:mx-auto px-4">{c.tag || ""}</PillTag>
                                                    <h3 className="font-semibold font-mono mb-5! text-center md:text-left text-45! max-md:text-44! max-md:leading-11!">
                                                        {c.header as string}
                                                    </h3>
                                                    <p className="text-base! font-sans leading-normal! text-center max-w-87 mx-auto md:text-left md:mr-auto md:ml-0 md:max-w-105">
                                                        {c.content || ""}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </section>
                    )
                }
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