import ContactForm from "@/components/ContactForm";
import Hero from "@/components/layout/hero/Hero";
import PackagesDetails from "@/components/PackagesDetails";
import PillTag from "@/components/ui/pill-tag";
import { HomeBannerType, FeatureItem, SectionHeroType } from "@/features/application/types/sanity";
import { getPageWithPackages } from "@/lib/data";
import { normalizeArray } from "@/lib/helpers";
import { urlFor } from "@/sanity/lib/image";
import { getSeoData } from "@/sanity/lib/seo";
import { getBodyText } from "@/sanity/lib/utils";
import { getVideoUrl } from "@/sanity/lib/video";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";
import { notFound } from "next/navigation";

/**
 * Generate metadata for the page.
*/
export async function generateMetadata(): Promise<Metadata> {
    const template = "other";
    const slug = "home";
    const seo = await getSeoData(slug, template);

    if (!seo) return {};

    const title = seo?.metaTitle;
    const description = seo.metaDescription?.length ? toPlainText(seo.metaDescription) : undefined;
    const ogImageUrl = urlFor(seo?.openGraphImage, { width: 1200, height: 630 });
    const keywords = seo?.keywords?.map((k: string) => k);

    return {
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
        const template = "other";
        const slug = "home";
        const { page, packages } = await getPageWithPackages(slug, template);
        if (!page) return notFound();

        const section = page?.sections?.[0];
        if (!section) return notFound();

        const banners: HomeBannerType[] = normalizeArray(section?.banner);
        const currency = 'AED';

        const mapFeatureToHero = (feature: FeatureItem): SectionHeroType => ({
            about: feature.about ?? [],
            banner: feature.banner ?? [],
            itemHeader: feature.itemHeader ?? [],
            itemTitle: feature.itemTitle ?? "",
            items: feature.items ?? [],
            keywords: feature.keywords ?? [],
            keywordstitle: feature.keywordstitle ?? "",
            packageContent: feature.packageContent ?? [],
            packageHeader: feature.packageHeader ?? [],
            packageTitle: feature.packageTitle ?? "",
            _key: feature._key ?? "",
            _type: feature._type ?? "",
        });

        const heroData = mapFeatureToHero(section);
        
        return(
            <main className="w-full">
                {
                    banners.map((b)=>(
                        <section key={`banner-${b._key}`} className="home-banner relative [@media(min-width:1025px)]:h-screen">
                            {
                                b.videoDesktop && (
                                    <video
                                        className=" block w-full h-full [@media(max-width:992px)]:h-203.5 [@media(max-width:992px)]:object-cover [@media(min-width:1025px)]:object-cover"
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

                            <div className="w-full h-full absolute top-0 left-0 flex flex-wrap items-end pb-25">
                                <div className="container mx-auto" data-aos="fade-up" data-aos-delay="200">
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
                    <Hero data={heroData} key={'hero-section'} />
                </section>    

                <section className="w-full home-package-wraper relative section-space-top section-space-bottom">
                    <div className="container mx-auto text-center mb-10">
                        {
                            section.packageTitle && (
                                <PillTag className="mx-auto relative mb-4 px-4">{section.packageTitle}</PillTag>
                            )
                        }

                        {
                            section.packageHeader && (                        
                                <div className="w-full flex justify-center package-header-txt" dangerouslySetInnerHTML={{ __html: getBodyText(section?.packageHeader) }}></div>
                            )
                        }
                    </div>

                    <PackagesDetails 
                        packages={packages}
                        currency={currency}
                    />

                    {
                        section.packageContent && (
                            <div className="container mx-auto">
                                <div className="w-full flex justify-center relative package-btm-txt max-md:px-8" dangerouslySetInnerHTML={{ __html: getBodyText(section?.packageContent) }}></div>
                            </div>
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