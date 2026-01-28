import Image from "next/image";
import { CategoryType } from "@/features/application/types/sanity";
import { formatDate } from "@/lib/date";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { getBodyJSON, getBodyText } from "@/sanity/lib/utils";
import { getPostBySlug } from "@/sanity/queries/pages";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";
import { notFound } from "next/navigation";
import { getPageWithBlogDetails } from "@/lib/data";
import BlogRelated from "@/components/BlogRelated";
import BlogForm from "@/components/BlogForm";
import BlogNewsLetter from "@/components/BlogNewsletter";
import BlogSideList from "@/components/BlogSideList";

/**
 * Fetch SEO only
 */
async function getSeoData(slug: string) {
  const { data } = await sanityFetch({
    query: getPostBySlug,
    params: { slug },
    stega: false,
  });
  return data?.seo ?? null;
}

/**
 * Generate metadata for the page.
*/
export async function generateMetadata({ params }: { params: Promise<{ slug: string }>}): Promise<Metadata> {
    const { slug } = await params;
    const seo  = await getSeoData(slug);

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

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    try {
        const { page, categories, related } = await getPageWithBlogDetails(slug);
        if (!page) return notFound();       
        const sideList = getBodyJSON(page?.body);

        return (
            <main className="bg-black w-full">
                <section className="relative w-full max-md:bg-[url('/images/gradient/bg-grd-banner.jpg')] bg-[url('/images/gradient/bg-grd-banner.jpg')] max-md:bg-cover bg-contain bg-no-repeat with-overlay pt-52.75 pb-95">
                    <div className="container">
                         <div className="text-white">
                            <div className="flex items-center gap-3">
                                <span className="text-white font-sans text-sm font-normal leading-5.25 tracking-[0.13px] uppercase">
                                    {formatDate(page?.publishedAt)}
                                </span>

                                {
                                    page?.categories ?
                                        page?.categories.map((category: CategoryType, index:number) => (
                                            <span
                                                key={`categories-${index}`}
                                                className="px-3 py-1 rounded-full bg-[rgba(27,26,26,0.70)] text-white font-sans text-sm font-normal leading-5.25">
                                                {category?.title}
                                            </span>
                                        ))
                                    :
                                    []
                                }                                                                
                            </div>

                            <h1 className="mt-6 text-white font-semibold text-35! leading-8! max-md:leading-8.75! font-mono">
                               {page?.title}
                            </h1>

                            <p className="mt-4 text-white/60 font-sans text-sm! font-normal leading-5.25!">
                                By {page?.author?.name}
                            </p>

                            <div className="mt-8">
                                <div className="w-full h-119.5 relative">
                                    {
                                        page?.mainImage && (
                                            <Image
                                                fill
                                                alt={page?.mainImage?.alt || page?.title}
                                                src={urlFor(page?.mainImage) || ""}
                                                className="rounded-xl w-full h-auto shadow-xl object-cover"
                                            />
                                        )
                                    }
                                    
                                </div>
                            </div>
                         </div>
                    </div>
                </section>

                <section className="text-white pt-0 -mt-86.25 md:-mt-85 pb-7.5 md:pb-15 relative z-10">
                    <div className="container grid grid-cols-1 lg:grid-cols-[250px_1fr_350px] gap-6">
                        <div className="space-y-10">
                            <div className="rounded-10 border-[1.701px] border-white/10 bg-white/3 p-6">
                                <h3 className="text-white font-sans text-base! font-normal! leading-6! mb-4">
                                    Contents
                                </h3>

                                <div className="w-full">
                                    <BlogSideList list={sideList} />
                                </div>
                            </div>

                            <div className="rounded-10 border-[1.701px] border-white/10 bg-white/3 p-6">
                                <h3 className="text-white font-sans text-base! font-normal leading-6! mb-4">
                                    Stay Updated
                                </h3>

                                <p className="text-white/70 font-sans text-sm! font-normal leading-5.25! mb-4">
                                    Subscribe to our newsletter
                                </p>

                                <div className="w-full">
                                    <BlogNewsLetter view={false} />
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1 space-y-10 leading-relaxed">
                            <div className="w-full">
                                <h2 id="introduction" className="text-white font-sans text-20! font-medium leading-7.5! mb-4">
                                    Introduction
                                </h2>

                                <div 
                                    className="blog-details-content"
                                    dangerouslySetInnerHTML={{ __html: getBodyText(page?.body) }}>
                                </div>                                
                            </div>    
                        </div>  

                         <div className="space-y-10">
                            <div className="rounded-10 border-[1.701px] border-white/10 bg-white/3 p-6">
                                <h3 className="text-white font-sans text-base! font-normal leading-6! mb-4">
                                    Categories
                                </h3>

                                <div className="flex flex-wrap gap-3">
                                    {
                                        categories.map((list, index) =>(
                                            <span
                                                key={`categories-list-${index}`}
                                                className="px-6 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/9 text-white font-sans text-xs font-normal leading-4.5">
                                                {list.title}
                                            </span>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="rounded-10 border-[1.701px] border-white/10 bg-white/3 p-6">  
                                <h3 className="text-white font-sans text-base! font-normal leading-6! mb-6">
                                    Let&apos;s Connect
                                </h3>

                                <div className="w-full black-form blog-form">
                                    <BlogForm />
                                </div>
                            </div>
                        </div>  
                    </div>
                </section>

                <section className="w-full pt-16 pb-24">
                    <div className="container mx-auto px-4">
                        <h2 className="text-white sm:text-left text-center font-sans text-[26px]! font-normal leading-6.75! uppercase mb-8">
                            RELATED BLOG
                        </h2>

                        <div className="w-full">
                            <BlogRelated
                                post={related}
                            />                           
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

