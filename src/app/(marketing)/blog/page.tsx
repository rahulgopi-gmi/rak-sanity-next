
import Image from "next/image";
import { FeatureItem } from "@/features/application/types/sanity";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";
import { notFound } from "next/navigation";
import PillTag from "@/components/ui/pill-tag";
import { getBodyText } from "@/sanity/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { getSeoData } from "@/sanity/lib/seo";
import { getPageWithBlog } from "@/lib/data";
import BlogNewsLetter from "@/components/BlogNewsletter";
import BlogSwiper from "@/components/BlogSwiper";
import BlogItems from "@/components/BlogItems";
import NotFound from "@/app/not-found";

const PAGE_SLUG = "blog";
const TEMPLATE = "other";

/**
 * Generate metadata for the page.
*/
export async function generateMetadata(): Promise<Metadata> {   

    const seo = await getSeoData(PAGE_SLUG, TEMPLATE);

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
        const { page, posts, categories, slidePosts } = await getPageWithBlog(PAGE_SLUG, TEMPLATE);
        if (!page) return notFound();

        const section: FeatureItem | undefined = page?.sections?.[0];  

        /**
         * Filter Only Categories That Have Posts
        */
        const usedCategoryIds = new Set(
            (posts ?? []).flatMap((post) =>
                post.categories?.map((cat) => cat._id) ?? []
            )
        );

        const visibleCategories = (categories ?? []).filter(
            (category) => usedCategoryIds.has(category._id)
        );       

        return(
            <main className="bg-black">
                <section className="relative w-full max-md:bg-[url('/images/gradient/bg-grd-banner.jpg')] bg-[url('/images/gradient/bg-grd-banner.jpg')] bg-cover max-md:bg-contain bg-no-repeat with-overlay">
                    <div className="container">
                        <div className="flex flex-col items-center justify-center text-center pt-37.5 max-md:pt-32.5 max-md:pb-6.25">
                            {
                                section?.title && (
                                    <PillTag className="mb-8! max-md:mb-5!">{section?.title}</PillTag>
                                )
                            }                            

                            <div className="max-w-225 mx-auto blog-top-section">
                                {
                                    section?.header && (
                                        <div 
                                            className="[&_h2]:text-white [&_h2]:font-extrabold [&_h2]:font-mono [&_h2]:text-center [&_h2]:uppercase [&_h2]:mb-8 max-md:[&_h2]:text-35! max-md:[&_h2]:leading-8.75! max-md:[&_br]:hidden"
                                            dangerouslySetInnerHTML={{ __html: getBodyText(section?.header) }} 
                                        />
                                    )
                                }
                                
                                {
                                    section?.body && (
                                        <div 
                                            dangerouslySetInnerHTML={{ __html: getBodyText(section?.body) }}  
                                            className="w-full flex justify-center [&_p]:text-lightgray [&_p]:font-sans [&_p]:text-center [&_p]:mb-4 [&_p]:leading-6! [&_p]:text-base!"
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="relative pt-7.5 pb-115.25 w-full">
                        <div className="container">
                            <BlogSwiper
                                post={slidePosts}
                            />
                        </div>
                    </div>
                </section>

                <section className="w-full -mt-102.5 max-md:-mt-98.75 z-1 relative">
                    <div className="container">
                        <div className="w-full pb-24">                            
                            <BlogItems 
                                posts={posts}
                                categories={visibleCategories}
                            />
                        </div>                        
                    </div>                  
                </section>

                <section className="pb-28.75 bg-black relative [px-20px]">
                    <div className="w-full">
                        <Image fill alt="" src="/images/gradient/form-box-blue-shadow.png" />
                    </div>

                    <div className="container w-full flex justify-center">
                        <div className="max-w-173 lg:max-w-198 w-full py-10.5 md:px-30 px-5 rounded-3xl border border-[rgba(95,194,213,0.20)] bg-[linear-gradient(180deg,rgba(95,194,213,0.08)_0%,rgba(95,194,213,0.04)_85%,rgba(0,0,0,0.4)_100%)] md:bg-blog-banner-mob bg-cover bg-no-repeat with-overlay text-white relative z-10">
                            <h2 className="text-white font-sans text-21! font-semibold leading-7.25! mb-3.5 sm:text-left text-center">
                                Stay Updated
                            </h2>

                            <p className="text-white/80 font-sans text-base! font-normal leading-6! max-w-2xl mb-5.25 sm:text-left text-center">
                                Join 10,000+ entrepreneurs receiving weekly insights on business
                                setup, Web3 innovation, and UAE opportunities.
                            </p>

                            <BlogNewsLetter view={true} />                         

                            <div className="flex items-center sm:justify-center justify-start gap-2 mt-4 text-white/50 font-sans text-xs font-normal leading-4.5 sm:text-center text-left">
                                <span>🔒 We respect your privacy. Unsubscribe anytime.</span>
                            </div>
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