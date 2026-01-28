import { Button } from "@/components/ui/button";
import { FeatureItem } from "@/features/application/types/sanity";
import { getBodyText } from "@/sanity/lib/utils";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import { getSeoData } from "@/sanity/lib/seo";
import { getPageDataOnly } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";


/**
 * Generate metadata for the page.
*/
export async function generateMetadata(): Promise<Metadata> {
    const slug = "thankyou";
    const template = "other";
    const seo  = await getSeoData(slug, template);

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
        const slug = "thankyou";
        const template = "other";
        const data = await getPageDataOnly(slug, template);
        if (!data) return notFound();
        const section: FeatureItem | undefined = data.sections?.[0];
        if (!section) return notFound();

        return (
            <section className="bg-[url('/images/gradient/thank-you-desk-bg.png')] bg-no-repeat bg-top bg-black bg-cover max-lg:h-full min:h-screen py-20 relative">
                <div className="container mx-auto">
                    <div className="w-full flex justify-center">
                        <div className="m-auto flex justify-center text-center max-w-full w-full py-[50px]">
                            <div className="w-full h-[60px] relative">
                                <Link href="/">
                                    <Image fill alt="logo" src="/images/logo/thankyou-logo.svg" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-[620px] flex flex-col justify-center mx-auto text-center max-lg:px-4">
                        <i className="w-full flex justify-center thankyou-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="106" height="106" viewBox="0 0 106 106" fill="none">
                                <path
                                    d="M53.0006 97.1666C77.2923 97.1666 97.1673 77.2916 97.1673 53C97.1673 28.7083 77.2923 8.83331 53.0006 8.83331C28.709 8.83331 8.83398 28.7083 8.83398 53C8.83398 77.2916 28.709 97.1666 53.0006 97.1666Z"
                                    stroke="url(#paint0_linear_1173_940)" strokeWidth="3.75" strokeLinecap="round"
                                    strokeLinejoin="round" />
                                <path d="M34.2285 53L46.7277 65.4992L71.7702 40.501" stroke="url(#paint1_linear_1173_940)"
                                    strokeWidth="3.75" strokeLinecap="round" strokeLinejoin="round" />
                                <defs>
                                    <linearGradient id="paint0_linear_1173_940" x1="53.0006" y1="8.83331" x2="53.0006" y2="97.1666"
                                        gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#85D2DB" />
                                        <stop offset="1" stopColor="#625BA7" />
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_1173_940" x1="52.9993" y1="40.501" x2="52.9993" y2="65.4992"
                                        gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#85D2DB" />
                                        <stop offset="1" stopColor="#625BA7" />
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
        console.error("Page render failed:", error);
        return <div className="w-full h-screen flex items-center justify-center">
            <p className="text-sm! text-center">Something went wrong. Please try again later.</p>
        </div>;
    }   
}