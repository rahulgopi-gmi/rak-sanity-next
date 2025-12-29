import PillTag from "@/components/layout/pill-tag/PillTag";
import { CardType, ContentType, PageDataType } from "@/features/application/types/sanity";
import { normalizeArray } from "@/lib/helpers";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { getBodyText } from "@/sanity/lib/utils";
import { getPageBySlug } from "@/sanity/queries/pages";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

/** 
 *  Fetch Sanity Data (cached)
*/
const getData = cache(async (slug: string, template:string): Promise<PageDataType | null> => {
    try {
        const { data } = await sanityFetch({
            query: getPageBySlug,
            params: { 
                slug,
                template
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
    const slug = "about";
    const template = "other";    
    const page  = await getData(slug, template);
    const seo = page?.seo;

    const title = seo?.metaTitle || "Innovation City";
    const description = 
        seo ? toPlainText(seo.metaDescription) 
        : "Set up your business easily with endless possibilities in the world's first free zone focused on AI, Web3, Robotics, Gaming & Healthtech companies.";
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
        const slug = "about";
        const template = "other";
        const data = await getData(slug, template);
        if (!data) return notFound();
        
        const section: PageDataType | undefined = data?.sections?.[0];
        if (!section) return notFound();
        
        const keywords: CardType[] = normalizeArray(section?.keywords);
        const desktopImage = section?.imageDesktop && urlFor(section?.imageDesktop).url();
        const mobileImage = section?.imageMobile && urlFor(section?.imageMobile).url();        

        return(
            <main className="w-full">                
                <section className="about-sec relative bg-black max-md:bg-[url('/aboutbgmob.jpg')] bg-[url('/aboutbgdesk.jpg')]  bg-no-repeat bg-cover pt-[150px] pb-[7px] text-center overflow-hidden max-md:pt-[130px] max-md:pb-[25px]">
                    <div className="container mx-auto about-top-section">                        
                        <PillTag className="mx-auto mb-[30px]! max-md:mb-5">
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
                                <div className="abtimg-wrap mb-[90px] md:mb-[65px]" data-aos="fade-up">
                                    {
                                        desktopImage && (
                                            <div className="w-full h-[495px] relative hidden md:block">
                                                <Image 
                                                    fill 
                                                    alt={section.imageDesktop?.alt ?? ""}
                                                    src={desktopImage}
                                                    className="rounded-[10px] object-cover" 
                                                />
                                            </div>
                                        )
                                    }

                                    {
                                        mobileImage && (
                                            <div className="w-full h-[495px] relative block md:hidden">
                                                <Image 
                                                    fill 
                                                    alt={section.imageMobile?.alt ?? ""}
                                                    src={mobileImage}
                                                    className="rounded-[10px] object-cover" 
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
                                    <div className="w-full h-[410px] max-md:h-[235px] relative">
                                        {
                                            section?.sectionImage && (
                                                <Image
                                                    src={urlFor(section.sectionImage).url()}
                                                    alt={section?.sectionImage?.alt ?? ""}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )
                                        }                                        
                                    </div>
                                </div>

                                <div className="w-full lg:w-7/12 md:w-full max-md:pl-4">
                                    <h3 className="text-[#D5D5D5] text-[20px]! font-sans font-normal leading-[27px]! text-center md:text-left mb-[30px] md:mb-10 max-w-[486px] ml-auto mr-auto md:ml-auto md:mr-0" data-aos="fade-up">
                                        {section?.sectionSubHeader || ""}
                                    </h3>

                                    <p className="text-[#D5D5D5] text-[16px]! font-sans leading-normal! text-center md:text-left max-w-[486px] ml-auto mr-auto md:ml-auto md:mr-0" data-aos="fade-up">
                                        {section?.sectionContent || ""}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>             
                
                {
                    keywords.length > 0 && (
                        <section className="ourvmv-sec w-full max-md:pt-[90px] max-md:pb-[50px] py-[120px]">
                            <div className="container">
                                {
                                    keywords.map((c: CardType, index:number) => {
                                        const cardImage = c.image && urlFor(c.image).url();
                                        if (!cardImage) return null;

                                        return(                                        
                                            <div 
                                                key={`about-card-${index}`}
                                                className="ourvmv flex flex-col-reverse md:flex-row items-center max-md:mb-0 mb-[120px] last:mb-0" 
                                                data-aos="fade-up"
                                            >
                                                <div className="md:w-1/2 w-full max-md:mb-10">
                                                    <div className="m-wrap relative w-full h-[269px] max-md:h-[170px]">
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
                                                    <h3 className="font-semibold font-mono mb-5! text-center md:text-left text-[45px]! max-md:text-[44px]! max-md:leading-11">
                                                        {c.header || ""}
                                                    </h3>
                                                    <p className="text-base! font-sans leading-normal! text-center max-w-[348px] mx-auto md:text-left md:mr-auto md:ml-0 md:max-w-[420px]">
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