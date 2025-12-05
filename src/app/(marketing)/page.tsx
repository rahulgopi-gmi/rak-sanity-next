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

/** 
 * Fetch Sanity Data
*/
async function getData(slug: string): Promise<{ page: PageDataType | null, packages: any[] }> {
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
}
/**
 * Generate metadata for the page.
*/
export async function generateMetadata(): Promise<Metadata> {
    const meta = await getData('home') as PageDataType;

    if (!meta?.seo) {
        return {
            title: "Home",
            description: "Home page",
            openGraph: {
                title: "Home",
                description: "Home page",
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
        const { page, packages } = await getData("home");
        if (!page) return notFound();
        const section = page.sections?.[0] as any;
        const banner = section?.banner;

        const banners: HomeBannerType[] = Array.isArray(banner)
            ? banner
            : banner
                ? [banner]
                : [];                  

        console.log(section, 'data');        
        
        return(
            <main className="w-full">
                {
                    banners.map((b,i)=>(
                        <section key={`banner-${b._key}`} className="home-banner relative [@media(min-width:1025px)]:h-screen">
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

                            <div className="w-full h-full absolute top-0 left-0 flex flex-wrap items-end pb-[113px]">
                                <div className="container mx-auto">
                                    <div className="mt-20 mx-auto mb-0 text-center uppercase aos-init aos-animate" data-aos="fade-up">
                                        <div className="w-full flex justify-center" dangerouslySetInnerHTML={{ __html: getBodyText(b.header) }}></div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))
                }

                <section className="w-full">
                    <Hero data={section} />
                </section>    

                <section className="w-full home-package-wraper relative section-space-top section-space-bottom">
                    <div className="container mx-auto text-center">
                        <PillTag className="mx-auto relative mb-4">{section.packageTitle}</PillTag>                        
                        <div className="w-full flex justify-center" dangerouslySetInnerHTML={{ __html: getBodyText(section?.packageHeader) }}></div>
                    </div>

                    <PackagesDetails packages={packages} />

                    <div className="w-full flex justify-center relative" dangerouslySetInnerHTML={{ __html: getBodyText(section?.packageContent) }}></div>
                </section>

                <section className="wh-contact w-full section-space-top section-space-bottom bg-white">
                    <ContactForm />
                </section>
            </main>
        )
    } catch (error) {
        
    }
}