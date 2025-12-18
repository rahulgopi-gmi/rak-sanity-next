import ContactForm from "@/components/layout/contact-form/ContactForm";
import Hero from "@/components/layout/hero/Hero";
import PackagesDetails from "@/components/layout/packages-details/PackagesDetails";
import PillTag from "@/components/layout/pill-tag/PillTag";
import { BannerType, CardType, HomeBannerType, PageDataType } from "@/features/application/types/sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { getBodyText } from "@/sanity/lib/utils";
import { getVideoUrl } from "@/sanity/lib/video";
import { getPackages, getPageBySlug } from "@/sanity/queries/pages";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";
import { notFound } from "next/navigation";
import { cache } from "react";

/** Fetch Sanity Data with cache */
const getData = cache(async (slug: string): Promise<{ page: PageDataType | null; packages: any[] }> => {
    try {
        const [{ data: page }, { data: packages }] = await Promise.all([
            sanityFetch({
                query: getPageBySlug,
                params: { slug },
                stega: false,
            }),
            sanityFetch({
                query: getPackages,
                stega: false,
            })
        ]);

        return { page: page ?? null, packages: packages ?? [] };
    }
    catch (error) {
        console.error(`Sanity Fetch Error ${slug}: `, error);
        return { page: null, packages: [] };
    }
});

/**
 * Generate metadata for the page.
*/
export async function generateMetadata(): Promise<Metadata> {
    const { page } = await getData('home');

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
        const { page, packages } = await getData("home");
        if (!page) return notFound();        
        const section: PageDataType | undefined = page?.sections?.[0];
        if (!section) return notFound();        

        const banners: HomeBannerType[] = Array.isArray(section?.banner)
            ? section?.banner
            : section?.banner
                ? [section?.banner]
                : [];
        
        return(
            <main className="w-full">
                {
                    banners.map((b,i)=>(
                        <section key={`banner-${b._key}`} className="home-banner relative [@media(min-width:1025px)]:h-screen">
                            {
                                b.videoDesktop && (
                                    <video
                                        className=" block w-full h-full [@media(max-width:992px)]:h-[814px] [@media(max-width:992px)]:object-cover [@media(min-width:1025px)]:object-cover"
                                        width="100%"
                                        height="100%"
                                        playsInline
                                        muted
                                        preload="auto"
                                        autoPlay
                                        loop
                                    >
                                        <source src={getVideoUrl(b.videoDesktop)} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )
                            }

                            <div className="w-full h-full absolute top-0 left-0 flex flex-wrap items-end pb-[100px]">
                                <div className="container mx-auto">
                                    <div className="mt-20 mx-auto mb-0 text-center uppercase aos-init aos-animate" data-aos="fade-up">
                                        {
                                            b.header && (                                            
                                                <div className="w-full flex justify-center" dangerouslySetInnerHTML={{ __html: getBodyText(b.header) }}></div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))
                }

                <section className="w-full">
                    <Hero data={section} key={'hero-section'} />
                </section>    

                <section className="w-full home-package-wraper relative section-space-top section-space-bottom">
                    <div className="container mx-auto text-center mb-10">
                        {
                            section.packageTitle && (
                                <PillTag className="mx-auto relative mb-4">{section.packageTitle}</PillTag>
                            )
                        }

                        {
                            section.packageHeader && (                        
                                <div className="w-full flex justify-center package-header-txt" dangerouslySetInnerHTML={{ __html: getBodyText(section?.packageHeader) }}></div>
                            )
                        }
                    </div>
                    <PackagesDetails packages={packages} />
                    {
                        section.packageContent && (
                            <div className="w-full flex justify-center relative package-btm-txt" dangerouslySetInnerHTML={{ __html: getBodyText(section?.packageContent) }}></div>
                        )
                    }
                </section>

                <section className="wh-contact w-full section-space-top section-space-bottom bg-white">
                    <ContactForm />
                </section>
            </main>
        )
    } 
    catch (error) {
        console.error("Page render failed:", error);
        return <div className="w-full h-screen flex items-center justify-center">
            <p>Something went wrong. Please try again later.</p>
        </div>;
    }
}