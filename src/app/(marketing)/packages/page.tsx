import PillTag from "@/components/ui/pill-tag";
import { getBodyText } from "@/sanity/lib/utils";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import { getSeoData } from "@/sanity/lib/seo";
import { getPageWithPackages } from "@/lib/data";
import PackagesDetails from "@/components/PackagesDetails";
import ContactForm from "@/components/ContactForm";
import NotFound from "@/app/not-found";

/**
 * Generate metadata for the page.
*/
export async function generateMetadata(): Promise<Metadata> {
    const slug = "packages";
    const template = "other";
    const seo  = await getSeoData(slug, template);

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
        const slug = "packages";
        const template = "other";
        const { page, packages } = await getPageWithPackages(slug, template);
        if (!page) return notFound();

        const data = page?.sections?.[0];
        const currency = 'AED';

        return (
            <main className="w-full">
                <section className="package-sec relative bg-[url('/images/gradient/bg-grd-banner.jpg')] max-md:bg-[url('/images/gradient/bg-grd-banner-mob.png')] bg-no-repeat bg-cover pt-37.5 pb-30 text-center overflow-hidden max-md:pt-32.5 max-md:pb-6.25">                
                    <div className="container mx-auto package-top-section">
                        {
                            data?.title && (
                                <PillTag className="mx-auto mb-7.5 max-md:mb-5">
                                    {data?.title}
                                </PillTag>
                            )
                        }

                        {
                            data?.header && (
                                <div 
                                    className="xl:px-44 [&_h2]:text-white [&_h2]:font-extrabold [&_h2]:font-mono [&_h2]:text-center [&_h2]:uppercase [&_h2]:mb-8 max-md:[&_h2]:text-35! max-md:[&_h2]:leading-8.75! max-md:[&_br]:hidden"
                                    dangerouslySetInnerHTML={{ __html: getBodyText(data?.header) }}
                                />
                            )
                        }
                    </div>

                    {
                        packages.length > 0 && (
                            <div className="w-full mt-8 max-md:mt-8">
                                <PackagesDetails 
                                    packages={packages}
                                    currency={currency}
                                />
                            </div>
                        )
                    }

                    {
                        data?.body && (
                            <div className="package-btn-text container">
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
        return <NotFound />;
    }
}