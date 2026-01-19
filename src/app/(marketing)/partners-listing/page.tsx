import { PageDataType } from "@/features/application/types/sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { getPageBySlug } from "@/sanity/queries/pages";
import { notFound } from "next/navigation";
import PillTag from "@/components/ui/pill-tag";
import { getBodyText } from "@/sanity/lib/utils";
import CardItems from "@/components/layout/partner-listing/card-items/CardItems";


/** 
 *  Fetch Sanity Data
*/
const getData = async (slug: string, template:string): Promise<PageDataType | null> => {
    try {
        const { data: page } = await sanityFetch({
            query: getPageBySlug,
            params: {
                slug,
                template
            },
            stega: false,
        });
        return page ?? null;
    }
    catch (error) {
        console.error(`Sanity Fetch Error ${slug} : `, error);
        return null;
    }
};


/**
 * Page Component
*/
export default async function Page() {
    const slug = "partners-listing";
    const template = "other";
    const page = await getData(slug, template);
    if (!page) return notFound();
    
    const section = page?.sections?.[0];
    if (!section) return notFound();

    return(
        <main className="w-full h-full">
            <section className="relative w-full bg-black bg-cover max-md:bg-[url('/images/gradient/bg-grd-banner.jpg')] bg-[url('/images/gradient/bg-grd-banner.jpg')] bg-no-repeat">
                <div className="container max-auto" data-aos="fade-up" data-aos-delay="200">
                    <div className="mx-auto flex flex-col items-center justify-center text-center pt-37.5 max-md:pt-[135]">                       
                        <PillTag className="mx-auto mb-6.25 max-md:mb-5">
                            {section.title || ""}
                        </PillTag>

                        <div className="w-full flex gap-9 flex-col">                            
                            {
                                section.header && (
                                    <div className="contact-top-section-wd mx-auto font-mono uppercase font-extrabold text-white text-6xl text-center tracking-[0] leading-15" dangerouslySetInnerHTML={{ __html: getBodyText(section?.header) }}></div>
                                )
                            }
                            <p className="font-sans text-center justify-start text-neutral-300 text-base font-normal">{section.subheader || ""}</p>
                        </div>
                    </div>                    

                    <CardItems
                        list={section.keywordsitems ?? []}
                        filterOptions={(section.items ?? []).map((i) => ({
                            label: i.title!,
                            value: i.title!.toLowerCase().replace(/\s+/g, "-"),
                        }))}
                    />                                                                             
                </div>    
            </section>
        </main>
    )
}