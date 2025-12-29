import ContactForm from "@/components/layout/contact-form/ContactForm";
import PillTag from "@/components/layout/pill-tag/PillTag";
import { CardType, PageDataType } from "@/features/application/types/sanity";
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
 *  Fetch Sanity Data
*/
const getData = cache(async (slug: string, template:string): Promise<PageDataType | null> => {
    try {
        const { data: page } = await sanityFetch({
            query: getPageBySlug,
            params: {
                slug,
                template
            },
            stega: false,
        });
        return page ?? null;
    }
    catch (error) {
        console.error(`Sanity Fetch Error ${slug} : `, error);
        return null;
    }
});

/**
 * Generate metadata for the page.
*/
export async function generateMetadata(): Promise<Metadata> {
    const slug = "contact";
    const template = "other";
    const page = await getData(slug, template);

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
        const slug = "contact";
        const template = "other";
        const page = await getData(slug, template);
        if (!page) return notFound();

        const section: PageDataType | undefined = page?.sections?.[0];
        if (!section) return notFound();
        
        const keywords: CardType[] = normalizeArray(section?.keywords);

        return (
            <main className="w-full">
                <section className="relative w-full bg-[url('/bg-grd-banner.jpg')] max-md:bg-[url('/bg-grd-banner-mob.png')] bg-cover bg-no-repeat">
                    <div className="flex flex-col items-center justify-center text-center pt-[150px] max-md:pt-[135]">
                        <div className="container contact-section"  data-aos="fade-up" data-aos-delay="200">
                            {
                                section.title && (
                                    <PillTag className="mx-auto mb-[30px] max-md:mb-5!">
                                        {section.title}
                                    </PillTag>
                                )
                            }

                            {
                                section.header && (
                                    <div className="contact-top-section-wd mx-auto" dangerouslySetInnerHTML={{ __html: getBodyText(section?.header) }}></div>
                                )
                            }
                        </div>
                    </div>

                    <div className="mt-[30px] w-full pb-[150px]" data-aos="fade-up">
                        <div className="container">
                            <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <ul className="space-y-6 lg:max-w-[427px]">
                                        {
                                            keywords.map((i: any, index: number) => (
                                                <li key={`keyword-${index}`} className="flex items-start">
                                                    <span className="mr-4 flex items-center justify-center bg-[rgba(95,194,213,0.18)] rounded-tl-[18px] rounded-tr-[18px] rounded-bl-[18px] rounded-br-none p-4">
                                                        <span className="inline-block w-5 h-5 max-md:w-6 max-md:h-6 relative">
                                                            {
                                                                i.icon && (
                                                                    <Image fill alt={i.icon.alt} src={urlFor(i.icon).url()} />
                                                                )
                                                            }
                                                        </span>
                                                    </span>

                                                    <span className="border-b border-dotted border-white/20 pb-6">
                                                        <h4 className="text-white text-[20px]! font-bold normal-case leading-normal font-sans">
                                                            {i.header || ""}
                                                        </h4>
                                                        <p className="text-[#D5D5D5] text-base! font-normal normal-case leading-normal! font-sans mt-0">
                                                            {i.content || ""}
                                                        </p>
                                                    </span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>

                                <div className="contact-form py-12 md:py-12 px-4 md:px-9 border border-white/20 rounded-[20px] [background:linear-gradient(129deg,rgba(255,255,255,0.11)_8.15%,rgba(255,255,255,0.04)_93.89%)] backdrop-blur-[21.5px]">
                                    {
                                        section.subheader && (
                                            <h3 className="text-[30px]! max-md:text-center leading-[35px]! font-semibold text-white mb-4 font-mono">
                                                {section.subheader}
                                            </h3>
                                        )
                                    }

                                    <ContactForm formonly={false} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
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