import { Button } from "@/components/ui/button";
import { PageDataType } from "@/features/application/types/sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { getBodyText } from "@/sanity/lib/utils";
import { getPageBySlug } from "@/sanity/queries/pages";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
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
    const meta = await getData('thankyou');

    if (!meta?.seo) {
        return {
            title: "Thank you",
            description: "Thank you",
            openGraph: {
                title: "Thank you",
                description: "Thank you",
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
        const data = await getData('thankyou');
        if (!data) return notFound();
        const section = data.sections?.[0] as PageDataType;

        return (
            <section className="bg-[url('/thank-you-desk-bg.png')] bg-no-repeat bg-top bg-black bg-cover max-lg:h-full min:h-screen py-20 relative">
                <div className="container mx-auto">
                    <div className="w-full flex justify-center">
                        <div className="m-auto flex justify-center text-center max-w-full w-full py-[50px]">
                            <div className="w-full h-[60px] relative">
                                <Link href="/">
                                    <Image fill alt="logo" src="/thankyou-logo.svg" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-[620px] flex flex-col justify-center mx-auto text-center max-lg:px-4">
                        <i className="w-full flex justify-center thankyou-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="106" height="106" viewBox="0 0 106 106" fill="none">
                                <path
                                    d="M53.0006 97.1666C77.2923 97.1666 97.1673 77.2916 97.1673 53C97.1673 28.7083 77.2923 8.83331 53.0006 8.83331C28.709 8.83331 8.83398 28.7083 8.83398 53C8.83398 77.2916 28.709 97.1666 53.0006 97.1666Z"
                                    stroke="url(#paint0_linear_1173_940)" stroke-width="3.75" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M34.2285 53L46.7277 65.4992L71.7702 40.501" stroke="url(#paint1_linear_1173_940)"
                                    stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round" />
                                <defs>
                                    <linearGradient id="paint0_linear_1173_940" x1="53.0006" y1="8.83331" x2="53.0006" y2="97.1666"
                                        gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#85D2DB" />
                                        <stop offset="1" stop-color="#625BA7" />
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_1173_940" x1="52.9993" y1="40.501" x2="52.9993" y2="65.4992"
                                        gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#85D2DB" />
                                        <stop offset="1" stop-color="#625BA7" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </i>

                        <div className="w-full thankyou-section">
                            {
                                section?.header ?
                                    (<div dangerouslySetInnerHTML={{ __html: getBodyText(section?.header) }}></div>)
                                    :
                                    null
                            }  
                            {
                                section?.body ?
                                (<div dangerouslySetInnerHTML={{ __html: getBodyText(section?.body) }}></div>)
                                :
                                null
                            }        
                            <Link href="/" className="mt-6">
                                <Button type="button">Back to Home</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        )
    } 
    catch (error) {        
        toast.error("Page render failed");
        console.log("Page render failed");        
        return <p>Something went wrong. Please try again later.</p>;
    }    
}