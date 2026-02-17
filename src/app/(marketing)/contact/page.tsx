import Image from "next/image";
import PillTag from "@/components/ui/pill-tag";
import { normalizeArray } from "@/lib/helpers";
import { urlFor } from "@/sanity/lib/image";
import { getBodyText } from "@/sanity/lib/utils";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";
import { notFound } from "next/navigation";
import { getSeoData } from "@/sanity/lib/seo";
import { getPageDataOnly } from "@/lib/data";
import ContactForm from "@/components/ContactForm";
import NotFound from "@/app/not-found";

/**
 * Generate metadata for the page.
*/
export async function generateMetadata(): Promise<Metadata> {
    const slug = "contact";
    const template = "other";
    const seo = await getSeoData(slug, template);

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
        const slug = "contact";
        const template = "other";
        const page = await getPageDataOnly(slug, template);
        if (!page) return notFound();

        const section = page?.sections?.[0];
        if (!section) return notFound();
        
        const keywords = normalizeArray(section?.keywords);

        return (
            <main className="w-full">
                <section className="relative w-full max-md:bg-[url('/images/gradient/bg-grd-banner.jpg')] bg-[url('/images/gradient/bg-grd-banner.jpg')] bg-cover bg-no-repeat">
                    <div className="flex flex-col items-center justify-center text-center pt-37.5">
                        <div className="container contact-section">
                            {
                                section.title && (
                                    <PillTag className="mx-auto mb-7.5 max-md:mb-5!">
                                        {section.title}
                                    </PillTag>
                                )
                            }

                            {
                                section.header && (
                                    <div className="contact-top-section-wd mx-auto" dangerouslySetInnerHTML={{ __html: getBodyText(section?.header) }}></div>
                                )
                            }
                        </div>
                    </div>

                    <div className="mt-7.5 w-full pb-37.5">
                        <div className="container">
                            <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <ul className="space-y-6 lg:max-w-106.75">
                                        {
                                            keywords.map((i, index: number) => (
                                                <li key={`keyword-${index}`} className="flex items-start">
                                                    <span className="mr-4 flex items-center justify-center bg-[rgba(95,194,213,0.18)] max-md:w-15.75 max-md:h-15.75 rounded-tl-[18px] rounded-tr-[18px] rounded-bl-[18px] rounded-br-none p-4">
                                                        <span className="inline-block w-5 h-5 max-md:w-8! max-md:h-8! relative">
                                                            {
                                                                i.icon && (
                                                                    <Image fill alt={i.icon.alt} src={urlFor(i.icon) || ""} />
                                                                )
                                                            }
                                                        </span>
                                                    </span>

                                                    <span className="border-b border-dotted border-white/20 pb-6">
                                                        <h4 className="text-white text-20! font-bold normal-case leading-normal font-sans">
                                                            {i.header || ""}
                                                        </h4>
                                                        <p className="text-lightgray text-base! font-normal normal-case leading-normal! font-sans mt-0">
                                                            {i.content || ""}
                                                        </p>
                                                    </span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>

                                <div className="contact-form py-12 md:py-12 px-4 md:px-9 border border-white/20 rounded-20 [background:linear-gradient(129deg,rgba(255,255,255,0.11)_8.15%,rgba(255,255,255,0.04)_93.89%)] backdrop-blur-[21.5px]">
                                    {
                                        section.subheader && (
                                            <h3 className="text-30! max-md:text-center leading-8.75! font-semibold text-white mb-4 font-mono">
                                                {section.subheader}
                                            </h3>
                                        )
                                    }

                                    <ContactForm formonly={false} />
                                </div>
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