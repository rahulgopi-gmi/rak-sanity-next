import PillTag from "@/components/layout/pill-tag/PillTag";
import { CardType, ContentType, PageDataType } from "@/features/application/types/sanity";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { getBodyText } from "@/sanity/lib/utils";
import { getPageBySlug } from "@/sanity/queries/pages";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import toast from "react-hot-toast";

/** 
 *  Fetch Sanity Data
*/
async function getData(slug: string): Promise<PageDataType | null>{
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
        toast.error(`Sanity Fetch Error ${slug}`);
        console.error(`Sanity Fetch Error ${slug} : `, error);
        return null;
    }    
}

/**
 * Generate metadata for the page.
*/
export async function generateMetadata(): Promise<Metadata> {
    const meta = await getData('about');

    if (!meta?.seo) {
        return {
            title: "About",
            description: "About page",
            openGraph: {
                title: "About",
                description: "About page",
                type: "website",
                url: "",
            }
        };
    }

    const title = meta?.seo?.metaTitle
    const description = toPlainText(meta?.seo?.metaDescription);
    const ogImageUrl = meta?.seo?.openGraphImage?.asset?.url

    const keywords = meta?.seo?.keywords?.map((k: string) => k) || [];

    return {
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
        const data = await getData('about');
        if (!data) return notFound();
        const section = data.sections?.[0] as any;

        const innerContent: ContentType[] = Array.isArray(section.sectionContent)
            ? section.sectionContent
            : section.sectionContent
                ? [section.sectionContent]
                : [];
        
        const cards: CardType[] = Array.isArray(section.card)
            ? section.card
            : section.card
                ? [section.card]
                : [];

        return(
            <main className="w-full">
                {/***************  TOP SECTION  *****************/}
                <section className="about-sec relative bg-black max-md:bg-[url('/aboutbgmob.jpg')] bg-[url('/aboutbgdesk.jpg')]  bg-no-repeat bg-cover pt-[218px] pb-[7px] text-center overflow-hidden max-md:pb-[25px]">
                    <div className="container mx-auto about-top-section">
                        
                        <PillTag className="mx-auto mb-[30px] max-md:mb-5">{section.title}</PillTag>                        
                        <div dangerouslySetInnerHTML={{ __html: getBodyText(section?.header) }}></div>                        
                        <div className="w-full flex justify-center" dangerouslySetInnerHTML={{ __html: getBodyText(section?.body) }}></div>                        

                        <div className="abtimg-wrap mb-[90px] md:mb-[65px]" data-aos="fade-up">
                            <div className="w-full h-[495px] relative hidden md:block">
                                <Image fill alt={section.imageDesktop.alt} src={urlFor(section.imageDesktop).url()} className="rounded-[10px]" />
                            </div>

                            <div className="w-full h-[495px] relative block md:hidden">
                                <Image fill alt={section.imageMobile.alt} src={urlFor(section.imageMobile).url()} className="rounded-[10px]" />
                            </div>
                        </div>

                        <div className="about-sub-hdr" dangerouslySetInnerHTML={{ __html: getBodyText(section.subHeader) }}></div>                        
                    </div>
                </section>

                {/***************  CONTENT SECTION (AFTER BANNER)  *****************/}
                {
                    innerContent.map((e: any) => (
                        <section className="imgcon-wrapper text-white bg-black w-full md:w-auto">
                            <div className="container">
                                <div className="imgcon-inner-wrapper">
                                    <div className="split-wrap flex flex-col-reverse md:flex-row max-md:mb-0 max-lg:mb-10 w-full">
                                        <div className="w-full lg:w-7/12 md:w-full">
                                            <div className="w-full h-[410px] relative">
                                                <Image
                                                    src={urlFor(e.image).url()}
                                                    alt={e.image?.alt || ""}
                                                    fill
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full lg:w-7/12 md:w-full max-md:pl-4">
                                            <h3 className="text-[#D5D5D5] text-[20px]! font-sans font-normal leading-[27px]! text-center md:text-left mb-[30px] md:mb-10 max-w-[486px] ml-auto mr-auto md:ml-auto md:mr-0" data-aos="fade-up">
                                                {e.header}
                                            </h3>

                                            <p className="text-[#D5D5D5] text-[16px]! font-sans leading-normal! text-center md:text-left max-w-[486px] ml-auto mr-auto md:ml-auto md:mr-0" data-aos="fade-up">
                                                {e.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))
                }

                {/***************** CARDS SECTION *****************/}
                {
                    cards.length > 0 && (
                        <section className="ourvmv-sec w-full max-md:py-[90px] py-[120px]">
                            <div className="container">
                                {
                                    cards.map((c: any) => (
                                        <div className="ourvmv flex flex-col-reverse md:flex-row items-center max-md:mb-0 mb-[110px] last:mb-0" data-aos="fade-up">
                                            <div className="md:w-1/2 w-full max-md:mb-10">
                                                <div className="m-wrap relative w-full h-[269px]">
                                                    <Image fill alt={c.image.alt} src={urlFor(c.image).url()} className="flex m-auto" />
                                                </div>
                                            </div>

                                            <div className="md:w-1/2 w-full max-md:mb-10">
                                                <h4 className="text-[16px]! font-sans uppercase leading-normal text-black px-[17px] py-2 rounded-[17.5px] w-fit mb-3 border border-[#5FC2D5] bg-[linear-gradient(0deg,rgba(255,255,255,0.11)_0%,rgba(95,194,213,0.23)_0.01%,rgba(95,194,213,0.01)_88.24%)] shadow-[inset_0_0_14px_rgba(255,255,255,0.19)] mx-auto md:mx-0 text-center md:text-left">
                                                    {c.tag}
                                                </h4>
                                                <h3 className="font-semibold font-mono mb-5! text-center md:text-left text-[45px]!">
                                                    {c.header}
                                                </h3>
                                                <p className="text-[16px] font-sans leading-normal! text-center max-w-[348px] mx-auto md:text-left md:mr-auto md:ml-0 md:max-w-[420px]">
                                                    {c.content}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </section>
                    )
                }
            </main>
        )
    } 
    catch (error) {
        toast.error("Page render failed");
        console.error("Page render failed:", error);
        return <p>Something went wrong. Please try again later.</p>;
    }
}