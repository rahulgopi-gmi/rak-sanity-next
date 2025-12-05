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
import toast from "react-hot-toast";


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
        toast.error(`Sanity Fetch Error ${slug}`);
        console.error(`Sanity Fetch Error ${slug}: `, error);
        return { page: null, packages: [] };
    }
}


/**
 * Generate metadata for the page.
*/
export async function generateMetadata(): Promise<Metadata> {
    const meta = await getData('packages') as PageDataType;

    if (!meta?.seo) {
        return {
            title: "Packages",
            description: "Packages page",
            openGraph: {
                title: "Packages",
                description: "Packages page",
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
        const { page, packages } = await getData("packages");
        if (!page) return notFound();        
        const section = page?.sections?.[0] as PageDataType;       

        return(
            <main className="w-full">
                <section className="package-sec relative bg-[url('/packagebg.jpg')] max-md:bg-[url('/packagebgmob.jpg')] bg-no-repeat bg-cover pt-[218px] pb-[120px] text-center overflow-hidden max-md:pt-[200] max-md:pb-[90]">
                    <div className="container mx-auto package-top-section">
                        <PillTag className="mx-auto mb-[30px] max-md:mb-5">
                            {section?.title}
                        </PillTag>
                        
                        <div dangerouslySetInnerHTML={{ __html: getBodyText(section?.header) }}></div>
                    </div>

                    <div className="w-full mt-12">
                        <PackagesDetails packages={packages} />
                    </div>

                    <div className="package-btn-text">                        
                        <div dangerouslySetInnerHTML={{ __html: getBodyText(section?.body) }}></div>                        
                    </div>
                    
                </section>

                <section className="wh-contact w-full section-space-top section-space-bottom bg-white">
                    <ContactForm />
                </section>
            </main>
        )
    }
    catch(error){
        toast.error("Page render failed");
        console.error("Page render failed:", error);
        return <p>Something went wrong. Please try again later.</p>;
    }
}