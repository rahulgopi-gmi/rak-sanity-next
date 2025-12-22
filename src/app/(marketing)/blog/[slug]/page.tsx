import BlogForm from "@/components/layout/blog-form/BlogForm";
import BlogList from "@/components/layout/blog-list/BlogList";
import BlogNewsLetter from "@/components/layout/blog-newsletter/BlogNewsletter";
import BlogSideList from "@/components/layout/blog-side-list/BlogSideList";
import { CategoryType, PostType } from "@/features/application/types/sanity";
import { formatDate } from "@/lib/date";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { getBodyJSON, getBodyText, scrollToId, slugify } from "@/sanity/lib/utils";
import { getCategories, getPostBySlug, getRelatedPosts } from "@/sanity/queries/pages";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

interface GetDataResult {
    page: PostType | null;
    categories: CategoryType[];
    related: PostType [];
}

/** Fetch Sanity Data with caching */
const getData = cache(async (slug: string): Promise<GetDataResult> => {
    try {
        const [
            { data: page },
            { data: categories }
        ] = await Promise.all([
            sanityFetch({
                query: getPostBySlug,
                params: { slug },
                stega: false,
            }),
            sanityFetch({
                query: getCategories,
                stega: false,
            })
        ]);

        let related: PostType[] = [];

        if(page?.categories?.[0]?._id){
            const categoryId = page.categories[0]._id;

            const { data: relatedPosts } = await sanityFetch({
                query: getRelatedPosts,
                params: { categoryId, slug },
                stega: false
            });

            related = relatedPosts ?? [];
        }

        return {
            page: page ?? null,
            categories: categories ?? [],
            related
        };
    }
    catch (error) {
        console.error(`Sanity Fetch Error ${slug} : `, error);
        return {
            page: null,
            categories: [],
            related: []
        };
    }
});

/**
 * Generate metadata for the page.
*/
export async function generateMetadata({ params }: { params: Promise<{ slug: string }>}): Promise<Metadata> {
    const { slug } = await params;
    const { page }  = await getData(slug);

    const seo = page?.seo;    
    const title = seo?.metaTitle || "Innovation City";
    const description = seo ? toPlainText(seo.metaDescription || []) : "Set up your business easily with endless possibilities in the world's first free zone focused on AI, Web3, Robotics, Gaming & Healthtech companies.";
    const ogImageUrl = seo?.openGraphImage?.asset?.url || "/images/Innovation-City.jpg";
    const keywords = seo?.keywords?.map((k: string) => k) || ["innovation", "web3", "robotics", "healthtech", "artificial intelligence", "company set up", "free zone", "business license"];    

    return{
      title,
      description,
      keywords,
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

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    try {
        const { page, categories, related } = await getData(slug);
        if (!page) return notFound();       
        const sideList = getBodyJSON(page?.body);

        return (
            <main className="bg-black w-full">
                <section className="relative w-full bg-[url('/aboutbgmob.jpg')] md:bg-[url('/aboutbgdesk.jpg')] md:bg-cover bg-no-repeat with-overlay pt-[211px] pb-[380px]">
                    <div className="container">
                         <div className="text-white" data-aos="fade-up">
                            <div className="flex items-center gap-3">
                                <span className="text-white font-sans text-[14px] font-normal leading-[21px] tracking-[0.13px] uppercase">
                                    {formatDate(page?.publishedAt)}
                                </span>

                                {
                                    page?.categories.map((category: CategoryType | any, index:number) => (
                                        <span
                                            key={`categories-${index}`}
                                            className="px-3 py-1 rounded-full bg-[rgba(27,26,26,0.70)] text-white font-sans text-[14px] font-normal leading-[21px]">
                                            {category?.title}
                                        </span>
                                    ))
                                }                                                                
                            </div>

                            <h1 className="mt-6 text-white font-semibold text-[32px]! md:text-[45px]! leading-8! md:leading-[47px]! font-mono">
                               {page?.title}
                            </h1>

                            <p className="mt-4 text-[rgba(255,255,255,0.60)] font-sans text-[14px]! font-normal leading-[21px]!">
                                By {page?.author?.name}
                            </p>

                            <div className="mt-8">
                                <div className="w-full h-[478px] relative">
                                    <Image 
                                        fill 
                                        alt={page?.mainImage?.alt || page?.title}
                                        src={urlFor(page?.mainImage).url()}
                                        className="rounded-xl w-full h-auto shadow-xl object-cover"
                                    />
                                </div>
                            </div>
                         </div>
                    </div>
                </section>

                <section className="text-white pt-0 mt-[-345px] md:mt-[-340px] pb-[30px] md:pb-[104px] relative z-10" data-aos="fade-up">
                    <div className="container grid grid-cols-1 lg:grid-cols-[250px_1fr_350px] gap-6">
                        <div className="space-y-10">
                            <div className="rounded-[10px] border-[1.701px] border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] p-6">
                                <h3 className="text-white font-sans text-[16px]! font-normal leading-6! mb-4">
                                    Contents
                                </h3>

                                <div className="w-full">
                                    <BlogSideList list={sideList} />
                                </div>
                            </div>

                            <div className="rounded-[10px] border-[1.701px] border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] p-6">
                                <h3 className="text-white font-sans text-[16px]! font-normal leading-6! mb-4">
                                    Stay Updated
                                </h3>

                                <p className="text-[rgba(255,255,255,0.70)] font-sans text-[14px]! font-normal leading-[21px]! mb-4">
                                    Subscribe to our newsletter
                                </p>

                                <div className="w-full">
                                    <BlogNewsLetter view={false} />
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1 space-y-10 leading-relaxed">
                            <div className="w-full">
                                <h2 id="introduction" className="text-white font-sans text-[20px]! font-medium leading-[30px]! mb-4">
                                    Introduction
                                </h2>

                                <div 
                                    className="blog-details-content"
                                    dangerouslySetInnerHTML={{ __html: getBodyText(page?.body) }}>
                                </div>                                
                            </div>    
                        </div>  

                         <div className="space-y-10">
                            <div className="rounded-[10px] border-[1.701px] border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] p-6">
                                <h3 className="text-white font-sans text-[16px]! font-normal leading-6! mb-4">
                                    Categories
                                </h3>

                                <div className="flex flex-wrap gap-3">
                                    {
                                        categories.map((list, index) =>(
                                            <span
                                                key={`categories-list-${index}`}
                                                className="px-6 py-2 rounded-full border border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.05)] text-white font-sans text-[12px] font-normal leading-[18px]">
                                                {list.title}
                                            </span>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="rounded-[10px] border-[1.701px] border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] p-6">  
                                <h3 className="text-white font-sans text-[16px]! font-normal leading-6! mb-6">
                                    Let's Connect
                                </h3>

                                <div className="w-full black-form blog-form">
                                    <BlogForm />
                                </div>
                            </div>
                        </div>  
                    </div>
                </section>

                <section className="w-full py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-white sm:text-left text-center font-sans text-[26px]! font-normal leading-[27px] uppercase mb-10">
                            RELATED BLOG
                        </h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {
                                related.length > 0 ? (
                                    related.map((r : PostType, index: number)=>(
                                        <BlogList
                                            posts={r}
                                            key={index}
                                        />
                                    ))
                                ) : (
                                    <p className="text-white/50">No related blogs found.</p>
                                )
                            }
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

