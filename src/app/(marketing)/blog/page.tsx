
import Image from "next/image";
import { CategoryType, FeatureItem, PageDataType, PostType } from "@/features/application/types/sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { getAllPostsBySlideQuery, getAllPostsQuery, getCategories, getPageBySlug } from "@/sanity/queries/pages";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";
import { notFound } from "next/navigation";
import PillTag from "@/components/ui/pill-tag";
import { getBodyText } from "@/sanity/lib/utils";
import BlogItems from "@/components/layout/blog/blog-items/BlogItems";
import BlogNewsLetter from "@/components/layout/blog/blog-newsletter/BlogNewsletter";
import BlogSwiper from "@/components/layout/blog/blog-swiper/BlogSwiper";

// Define the return type for getData
interface GetDataResult {
    page: PageDataType | null;
    posts: PostType[];
    categories: CategoryType[];
    slidePosts: PostType[];
}

/** Fetch Sanity Data */
const getData = async (slug: string, template:string): Promise<GetDataResult> => {
    try {
        const [
            { data: page },
            { data: posts },
            { data: categories },
            { data: slidePosts}
        ] = await Promise.all([
            sanityFetch({
                query: getPageBySlug,
                params: { 
                    slug,
                    template
                },
                stega: false,
            }),
            sanityFetch({
                query: getAllPostsQuery,
                stega: false,
            }),
            sanityFetch({
                query: getCategories,
                stega: false,
            }),
            sanityFetch({
                query: getAllPostsBySlideQuery,
                stega: false
            })
        ]);

        return {
            page: page ?? null,
            posts: posts ?? [],
            categories: categories ?? [],
            slidePosts: slidePosts ?? []
        };
    }
    catch (error) {
        console.error(`Sanity Fetch Error for slug "${slug}":`, error);
        return {
            page: null,
            posts: [],
            categories: [],
            slidePosts: []
        };
    }
};

/**
 * Generate metadata for the page.
*/
export async function generateMetadata(): Promise<Metadata> {
    const slug = "blog";
    const template = "other";
    const { page } = await getData(slug, template);
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
        const slug = "blog";
        const template = "other";
        const { page, posts, categories, slidePosts } = await getData(slug, template);
        if (!page) return notFound();

        const section: FeatureItem | undefined = page?.sections?.[0];        

        return(
            <main className="bg-black">
                <section className="relative w-full max-md:bg-[url('/images/gradient/bg-grd-banner.jpg')] bg-[url('/images/gradient/bg-grd-banner.jpg')] bg-contain bg-no-repeat with-overlay">
                    <div className="container">
                        <div className="flex flex-col items-center justify-center text-center pt-[150px] max-md:pt-[135]" data-aos="fade-up">
                            {
                                section?.title && (
                                    <PillTag className="mb-8! max-md:mb-5!">{section?.title}</PillTag>
                                )
                            }                            

                            <div className="max-w-[900px] mx-auto blog-top-section">
                                {
                                    section?.header && (
                                        <div dangerouslySetInnerHTML={{ __html: getBodyText(section?.header) }}></div>
                                    )
                                }
                                
                                {
                                    section?.body && (
                                        <div 
                                            dangerouslySetInnerHTML={{ __html: getBodyText(section?.body) }}
                                            data-aos="fade-up" 
                                            className="mt-7 text-[#D5D5D5] text-[16px]! font-normal font-sans normal-case px-10 leading-[normal]!"
                                        >
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="relative pt-[30px] pb-[461px] w-full px-[30px] max-md:px-[16px]" data-aos="fade-up">
                        <BlogSwiper
                            post={slidePosts}
                        />
                    </div>
                </section>

                <section className="w-full mt-[-410px] max-md:mt-[-395px] z-1 relative">
                    <div className="container">
                        <div className="w-full pb-24">                            
                            <BlogItems 
                                posts={posts}
                                categories={categories}
                            />
                        </div>                        
                    </div>                  
                </section>

                <section className="pb-[115px] bg-black relative [px-20px]">
                    <div className="w-full">
                        <Image fill alt="" src="/images/gradient/form-box-blue-shadow.png" />
                    </div>

                    <div className="container w-full flex justify-center" data-aos="fade-up">
                        <div className="max-w-[692px] lg:max-w-[792px] w-full py-[42px] md:px-[120px] px-5 rounded-3xl border border-[rgba(95,194,213,0.20)] form-box-bg md:bg-blog-banner-mob bg-cover bg-no-repeat with-overlay text-white relative z-10">
                            <h2 className="text-white font-sans text-[21px]! font-semibold leading-[29px]! mb-3.5 sm:text-left text-center">
                                Stay Updated
                            </h2>

                            <p className="text-white/80 font-sans text-[16px]! font-normal leading-6! max-w-2xl mb-[21px] sm:text-left text-center">
                                Join 10,000+ entrepreneurs receiving weekly insights on business
                                setup, Web3 innovation, and UAE opportunities.
                            </p>

                            <BlogNewsLetter view={true} />                         

                            <div className="flex items-center sm:justify-center justify-start  gap-2 mt-4 text-white/50 font-sans text-[12px] font-normal leading-[18px] sm:text-center text-left">
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
        return <div className="w-full h-screen flex items-center justify-center">
            <p className="text-sm! text-center">Something went wrong. Please try again later.</p>
        </div>;
    }
}