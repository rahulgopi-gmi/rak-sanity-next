import ContactForm from "@/components/layout/contact-form/ContactForm"
import PackagesDetails from "@/components/layout/packages-details/PackagesDetails"
import PillTag from "@/components/layout/pill-tag/PillTag";
import { PageDataType } from "@/features/application/types/sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { getBodyText } from "@/sanity/lib/utils";
import { getPackages, getPageBySlug } from "@/sanity/queries/pages";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";
import { notFound } from "next/navigation";
import { cache } from "react";

/** 
 * Fetch Sanity Data (cached)
*/
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
    const { page } = await getData('packages');

    const seo = page?.seo;
    const title = seo?.metaTitle || "Innovation City";
    const description = seo ? toPlainText(seo.metaDescription || []) : "Set up your business easily with endless possibilities in the world's first free zone focused on AI, Web3, Robotics, Gaming & Healthtech companies.";
    const ogImageUrl = seo?.openGraphImage?.asset?.url || "/images/Innovation-City.jpg";
    const keywords = seo?.keywords?.map((k: string) => k) || ["innovation", "web3", "robotics", "healthtech", "artificial intelligence", "company set up", "free zone", "business license"];

    return {
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
        const { page, packages } = await getData("packages");
        if (!page) return notFound();
        
        const data: PageDataType | undefined = page?.sections?.[0];

        return (
            <main className="w-full">
                <section className="package-sec relative bg-[url('/packagebg.jpg')] max-md:bg-[url('/packagebgmob.jpg')] bg-no-repeat bg-cover pt-[218px] pb-[120px] text-center overflow-hidden max-md:pt-[200] max-md:pb-[90]">
                    <div className="container mx-auto package-top-section">
                        {
                            data?.title && (
                                <PillTag className="mx-auto mb-[30px] max-md:mb-5">
                                    {data?.title}
                                </PillTag>
                            )
                        }

                        {
                            data?.header && (
                                <div dangerouslySetInnerHTML={{ __html: getBodyText(data?.header) }}></div>
                            )
                        }
                    </div>

                    {
                        packages.length > 0 && (
                            <div className="w-full mt-12">
                                <PackagesDetails packages={packages} />
                            </div>
                        )
                    }

                    {
                        data?.body && (
                            <div className="package-btn-text">
                                <div dangerouslySetInnerHTML={{ __html: getBodyText(data?.body) }}></div>
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
            <p className="text-sm! text-center">Something went wrong. Please try again later.</p>
        </div>;
    }
}