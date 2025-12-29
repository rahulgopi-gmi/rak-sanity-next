import { sanityFetch } from "@/sanity/lib/live";
import { KeywordsType, PageDataType } from "@/features/application/types/sanity";
import { Fragment, cache } from "react";
import { getPageBySlug, getPackages } from "@/sanity/queries/pages";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { getBodyText } from "@/sanity/lib/utils";
import CampaignsForm from "@/components/layout/campaigns-form/CampaignsForm";
import { normalizeArray } from "@/lib/helpers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CampaignsAccordion from "@/components/layout/campaigns-accordion/CampaignsAccordion";
import PackagesDetails from "@/components/layout/packages-details/PackagesDetails";

/** 
 *  Fetch Sanity Data
*/
async function getData(slug: string, template: string): Promise<{ page: PageDataType | null; packages: any[] }> {
    try {
        const [{ data: page }, { data: packages }] = await Promise.all([
            sanityFetch({
                query: getPageBySlug,
                params: {
                    slug,
                    template
                },
                stega: false,
            }),
            sanityFetch({
                query: getPackages,
                stega: false,
            }),
        ]);

        return { page: page ?? null, packages: packages ?? [] };
    } catch (error) {
        console.error(`Sanity Fetch Error ${slug} : `, error);
        return { page: null, packages: [] };
    }
}

/**
 * Generate metadata for the page.
*/
export async function generateMetadata({ params }: { params: Promise<{ slug: string }>}): Promise<Metadata> {
    const { slug } = await params;
    const template = "campaigns";
    const { page } = await getData(slug, template);
    
    const seo = page?.seo;

    const title = seo?.metaTitle || "Innovation City";
    const description =
        seo ? toPlainText(seo.metaDescription)
            : "Set up your business easily with endless possibilities in the world's first free zone focused on AI, Web3, Robotics, Gaming & Healthtech companies.";
    const ogImageUrl = seo?.openGraphImage?.asset?.url || "/images/Innovation-City.jpg";
    const keywords = seo?.keywords?.map((k: string) => k) || ["innovation", "web3", "robotics", "healthtech", "artificial intelligence", "company set up", "free zone", "business license"];

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
    try{
        const { slug } = await params;
        const template = "campaigns";

        const {page, packages} = await getData(slug, template);
        if (!page) return notFound();

        const section = page.sections?.[0];
        if (!section) return notFound();

        const keywords: KeywordsType[] = normalizeArray(section?.keywords);
        const techkeywords: KeywordsType[] = normalizeArray(section.techkeywords);
        
        console.log(section, 'section');

        return(
            <main className={`${section?.mode === "dark"? "campaign-dark" : "campaign-light"  }`}>
                <section className="relative text-white">
                    <div className="w-full h-[556px] 2xl:h-[700px] relative hidden md:block">
                        {
                            section?.bannerdesktop && (
                                <Image 
                                    fill 
                                    alt={section?.bannerdesktop?.alt} 
                                    src={urlFor(section?.bannerdesktop).url()} 
                                    className="object-cover" 
                                />
                            )
                        }                        
                    </div>

                    <div className="w-full h-[827px] relative block md:hidden">
                        {
                            section?.bannermobile && (
                                <Image fill alt={section?.bannermobile?.alt} src={urlFor(section?.bannermobile).url()} className="object-cover" />
                            )
                        }                        
                    </div>

                    <div className="absolute top-0 left-0 w-full h-full pt-10">
                        <div className="container">
                            <div className="relative w-[225px] h-12 z-20">
                                {
                                    section?.logo && (
                                        <Image fill alt={section?.logo?.alt} src={urlFor(section?.logo).url()} />
                                    )
                                }                                
                            </div>
                        </div>

                        <div className="relative z-20 container sm:mt-5 mt-[85px] xl:mt-20 ls-heading-mt " data-aos="fade-up">
                            <p className="text-white/80 top-title sm:text-[28px]! text-[22px]! font-mono font-bold sm:leading-[30px] leading-[15px] tracking-[-0.56px] sm:mb-3 mb-[30px] ">
                                {section?.title}
                            </p>

                            <div className="campaigns-sub-top h-width max-w-[282px] sm:max-w-[278px] lg:max-w-[366px] xl:max-w-[607px]">
                                {
                                    section?.header && (
                                        <div dangerouslySetInnerHTML={{ __html: getBodyText(section?.header) }}></div>
                                    )
                                }                                
                                <div className="campaigns-sub-top-bdr w-full h-3 bg-[linear-gradient(90deg,#5EBED3_0%,#5752A3_100%)] lg:mt-2.5 lg:mb-10 sm:mt-3 mb-0 mt-6 lg:mb-[30px]"></div>
                            </div>

                            <div className="xl:max-w-full lg:max-w-[165px] sm:max-w-[110px] max-w-[181px] ">
                                <div className={`w-full relative`}>
                                    {
                                        section?.icon && (
                                            <Image                                                
                                                alt={section?.icon?.alt}
                                                src={urlFor(section?.icon).url()}
                                                className="object-cover"
                                                width={240}
                                                height={120}
                                                sizes="(max-width: 768px) 100vw, 50vw"                                                
                                            />
                                        )
                                    }                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full pt-10 pb-[75px] md:pb-0 md:pt-0">
                    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 sm:gap-6 gap-8">
                        <div className="space-y-10" data-aos="fade-up">
                            <ul className="space-y-8 keywords-left">
                                {
                                    keywords.map((k, index: number) => (
                                        <li
                                            key={k._key}
                                            className="flex items-center gap-6"
                                        >
                                            <div className="w-[60px] h-[60px] flex items-center justify-center bg-[#5FC2D5]/20 rounded-2xl rounded-br-none p-4">
                                                <div className="w-6 h-6 relative">
                                                    <Image fill alt={k?.icon?.alt} src={urlFor(k?.icon).url()} />
                                                </div>
                                            </div>

                                            <div className="w-full">
                                                <h4 className="font-sans text-[16px]! leading-7! font-bold tracking-[0.16px]">
                                                    {k?.header}
                                                </h4>

                                                <div className="campaigns-sub" dangerouslySetInnerHTML={{ __html: getBodyText(k?.body) }}></div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>

                            {
                                section?.body && (
                                    <div className="campaigns-sub" dangerouslySetInnerHTML={{ __html: getBodyText(section?.body) }}></div>
                                )
                            }
                            
                            <div className="campaigns-notify bg-[#0000000A] border-l-[3px] border-[#6FCCDD] rounded-r-xl p-6 max-w-[444px] !mb-5">
                                <p className="font-sans font-normal text-[16px]! leading-[28px]! tracking-[1%] text-[#101010]">
                                    If you’re interested in working at Innovation City,
                                    please&nbsp;
                                    <Link href="https://www.linkedin.com/company/innovationcityinc/jobs" className="font-sans font-semibold text-[16px] leading-[28px] tracking-[1%] underline decoration-black decoration-[1px]">
                                        apply here.
                                    </Link>
                                </p>
                            </div>
                        </div>

                        <div className="w-full" id="contact">
                            <CampaignsForm mode={section?.mode}/>
                        </div>
                    </div>
                </section>

                <section className="w-full tech-area md:mt-[120px] mt-0">
                    <div className="container">
                        <div className="flex flex-col sm:flex-row sm:items-end items-start sm:justify-between justify-start mb-12 gap-2" data-aos="fade-up">
                            {
                                section?.techHeader && (
                                    <div className="campaigns-ft-hdr" dangerouslySetInnerHTML={{ __html: getBodyText(section?.techHeader) }}></div>
                                )
                            }

                            {
                                section?.techCtaName && (
                                    <Link href={`#${section?.techCtaLink}`} className="sm:mt-0 mt-[24px]">
                                        <Button type="button" size={'sm'} className="uppercase">{section?.techCtaName}</Button>
                                    </Link>
                                )
                            }                            
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-aos="fade-up">
                            {
                                techkeywords[0] && (
                                    <div className="items-1 rounded-3xl relative">
                                        <div className="w-full relative">
                                            <Image
                                                width={1200}
                                                height={580}
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className="w-full h-auto"
                                                alt={techkeywords[0]?.icon?.alt || ""}
                                                src={urlFor(techkeywords[0].icon).url()}
                                            />
                                        </div>

                                        <div className="absolute w-full flex flex-col justify-center items-center sm-bottom-[72px] bottom-[42px]">
                                            <p className="mt-4 text-center [leading-trim:both] [text-edge:cap] font-mono sm:text-[28px]! text-[20px]! font-bold sm:leading-10! leading-[25px]! tracking-[-0.56px]!">
                                                {techkeywords[0]?.header}
                                            </p>

                                            <p className="text-white/80 [leading-trim:both] [text-edge:cap] font-mono sm:text-[20px]! text-[14px]! font-normal sm:leading-10! leading-[25px]! tracking-[-0.4px]">
                                                {techkeywords[0]?.title}
                                            </p>
                                        </div>
                                    </div>
                                )
                            }

                            <div className="grid grid-cols-2 gap-6">
                                {
                                    techkeywords[1] && (
                                        <div className="items-2 box-bg px-8 max-md:px-4 rt-padding lg:py-10 py-[34px]">
                                            <h3 className="max-w-[100px] max-md:max-w-full max-md:text-center font-mono font-bold xl:text-[28px]! text-[20px]! leading-8! tracking-[-0.56px] rt-box">
                                                {techkeywords[1]?.header}
                                            </h3>

                                            <div className="xl:mt-[60px] max-md:mx-auto md:mt-10 mt-[20px] w-[100px] h-[75px] relative">
                                                <Image
                                                    fill
                                                    alt={techkeywords[1]?.icon?.alt || ""}
                                                    src={urlFor(techkeywords[1].icon).url()}
                                                />
                                            </div>
                                        </div>
                                    )
                                }

                                {
                                    techkeywords[2] && (
                                        <div className="items-3 box-bg px-8 max-md:px-4 rt-padding py-10">
                                            <h3 className="font-mono font-bold max-md:text-center xl:text-[28px]! text-[20px]! leading-8! tracking-[-0.56px] rt-box">
                                                {techkeywords[2]?.header}
                                            </h3>

                                            <div className="xl:mt-[60px] max-md:mx-auto md:mt-10 mt-[20px] w-[100px] h-[75px] relative">
                                                <Image
                                                    fill
                                                    alt={techkeywords[2]?.icon?.alt || ""}
                                                    src={urlFor(techkeywords[2].icon).url()}
                                                />
                                            </div>
                                        </div>
                                    )
                                }

                                {
                                    techkeywords[3] && (
                                        <div className="col-span-2 bg-[#0A0A0F] rounded-3xl relative">
                                            <div className="w-full h-[250px] max-sm:h-[175px]">
                                                <Image
                                                    fill
                                                    alt={techkeywords[3]?.icon?.alt || ""}
                                                    src={urlFor(techkeywords[3].icon).url()}
                                                />
                                            </div>
                                            <div className="absolute bottom-0 lg:px-[32px] lg:py-[40px]  px-[24px] py-[30px]">
                                                <p className="mt-4 max-w-[175px] text-white font-mono font-bold xl:text-[28px]! xl:leading-[32px]! text-[20px]! leading-[24px]! tracking-[-0.56px]!">
                                                    {techkeywords[3]?.header}
                                                </p>

                                                <p className="text-white/80 [leading-trim:both] [text-edge:cap] ont-mono text-[20px]! font-normal leading-[32px]! tracking-[-0.4px]">
                                                    {techkeywords[3]?.title}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6" data-aos="fade-up">
                            {
                                techkeywords[4] && (
                                    <div className="items-5 rounded-3xl relative">
                                        <div className="w-full h-[250px] max-sm:h-[175px]">
                                            <Image
                                                fill
                                                alt={techkeywords[4]?.icon?.alt || ""}
                                                src={urlFor(techkeywords[4].icon).url()}
                                            />
                                        </div>

                                        <div className="absolute bottom-[40px] right-[32px]">
                                            <p className="text-white/80 text-right [leading-trim:both] [text-edge:cap] font-mono sm:text-[20px]! text-[16px]! font-normal sm:leading-[32px]! leading-[22px]! tracking-[-0.4px]!">
                                                {techkeywords[4]?.header}
                                            </p>

                                            <p className=" mt-0 md:max-w-[210px] text-white [leading-trim:both] [text-edge:cap] font-mono lg:text-[28px]! text-[20px]! font-bold lg:leading-[32px]! leading-[22px]! tracking-[-0.56px]! text-right">
                                                {techkeywords[4]?.title}
                                            </p>
                                        </div>
                                    </div>
                                )
                            }

                            {
                                techkeywords[5] && (
                                    <div className="items-6 rounded-3xl relative">
                                        <div className="w-full h-[250px] max-sm:h-[175px]">
                                            <Image
                                                fill
                                                alt={techkeywords[5]?.icon?.alt || ""}
                                                src={urlFor(techkeywords[5].icon).url()}
                                            />
                                        </div>

                                        <div className="absolute bottom-[40px] left-[32px]">
                                            <p className="mt-4 max-w-[150px] text-white [leading-trim:both] [text-edge:cap] font-mono lg:text-[28px]! text-[20px]! font-bold lg:leading-[32px]! leading-[24px]! tracking-[-0.56px]!">
                                                {techkeywords[5]?.header}
                                            </p>
                                        </div>
                                    </div >
                                )
                            }
                        </div>
                    </div>
                </section>

                <section className="campaign-package w-full mt-[120px]">
                    <div className="container">
                        <div className="flex flex-col sm:flex-row sm:items-end items-start sm:justify-between justify-start mb-12 gap-2" data-aos="fade-up">
                            {
                                section?.packageHeader && (
                                    <div className="campaigns-ft-hdr" dangerouslySetInnerHTML={{ __html: getBodyText(section?.packageHeader) }}></div>
                                )
                            }
                            
                            {
                                section?.packageCtaName && (
                                    <Link href={`#${section?.packageCtaLink}`}>
                                        <Button type="button" size={'sm'} className="uppercase sm:mt-0 mt-[24px]">{section?.packageCtaName}</Button>
                                    </Link>
                                )
                            }
                           
                        </div>

                        <div className="w-full">
                            <PackagesDetails 
                                packages={packages} 
                                view={true}
                                currency={section.currency}
                            />
                        </div>
                    </div>
                </section>

                <section className="w-full relative overflow-hidden">
                    {
                        section?.mode === "dark" ? (
                            <Fragment>
                                <div className="w-full h-[888px] absolute hidden md:block bottom-0">
                                    <Image fill alt="" src="/bg-bottom-wrapper.png" className="object-cover" />
                                </div>

                                <div className="w-full h-[234px] absolute bottom-0 block md:hidden">
                                    <Image fill alt="" src="/bg-bottom-wrapper-mob.png" className="object-cover" />
                                </div>
                            </Fragment>                           
                        )
                         :
                            <Fragment>
                                <div className="w-full h-[888px] absolute hidden md:block bottom-0">
                                    <Image fill alt="" src="/bg-bottom-wrapper-dollar.png" className="object-cover" />
                                </div>

                                <div className="w-full h-[234px] absolute bottom-0 block md:hidden">
                                    <Image fill alt="" src="/bg-bottom-wrapper-mob-dollar.png" className="object-cover" />
                                </div>
                            </Fragment>   
                    }
                    
                    <div className={`${section?.mode === "dark" ? "visible" : "hidden"} text-white sm:pt-[120px] pt-20 [--scroll-bar:0px] relative z-10`}>
                        <div className="container">
                            <div className="flex items-start justify-between gap-10" data-aos="fade-up">
                                <div className="lg:w-1/2 w-full">
                                    {
                                        section?.businessHeader && (
                                            <div className="campaigns-ft-hdr sm:max-w-full max-w-[320px] xl:mb-[64px] lg:mb-[34px] sm:mb-[64px] mb-[23px]" dangerouslySetInnerHTML={{ __html: getBodyText(section?.businessHeader) }}></div>
                                        )
                                    }                                    

                                    <div className="xl:space-y-5 lg:space-y-6 space-y-9 lg:max-w-[384px] max-w-full">
                                        <CampaignsAccordion data={section?.businesskeywords} />
                                    </div>
                                </div>

                                <div className="relative h-full mx-auto lg:w-3/5 lg:block hidden !mr-[calc(-50vw+50%+(var(--scroll-bar)/2))] xl:max-w-[100%] max-w-[55%] rounded-[24px] lg:rounded-tr-[0px] rounded-tr-[24px]  lg:rounded-br-[0px] rounded-br-[24px] overflow-hidden">
                                    {
                                        section?.businessImage && (
                                            <div className="w-full h-[560px]">
                                                <Image
                                                    fill
                                                    alt={section?.businessImage?.alt || ""}
                                                    src={urlFor(section?.businessImage).url()}                                                     
                                                />
                                            </div>    
                                        )
                                    }                                    
                                </div>
                            </div>
                        </div>
                    </div>                    

                    <div className="text-white  md:pt-[120px] md:pb-[120px] pt-[90px] pb-[90px] relative z-10" data-aos="fade-up">
                        <div className="container">
                            <div className="relative w-full">
                                <div className="w-full hidden md:block">                                    
                                    <Image
                                        width={1576}
                                        height={365}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="w-full h-auto"
                                        alt={section?.secondarydesktop?.alt || ""}
                                        src={urlFor(section?.secondarydesktop).url()}                                        
                                    />
                                </div>

                                <div className="w-full block md:hidden">
                                    <Image
                                        width={1576}
                                        height={365}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        alt={section?.secondarymobile?.alt || ""}
                                        src={urlFor(section?.secondarymobile).url()}
                                        className="object-contain"
                                    />
                                </div>                                                                

                                <div className="absolute z-10 launch-heading-top 2xl:top-[190px] xl:top-[92px] lg:left-[56px] sm:left-[20px] left-auto top-[63px] sm:px-[0px] px-[45px] sm:top-[30px] sm:text-left text-center launch-pd">
                                    <div className=" sm:block flex flex-col justify-center items-center m-auto">
                                        {
                                            section?.secondaryHeader && (
                                                <div className="campaigns-btn-hdr" dangerouslySetInnerHTML={{ __html: getBodyText(section?.secondaryHeader) }}></div>
                                            )
                                        }

                                        <p className="campaigns-btm-txt font-sans text-[16px]! font-normal leading-[28px]! mb-6 sm:text-left text-center">
                                            {section?.secondarycontent}
                                        </p>

                                        {
                                            section?.secondaryCtaName && (
                                                <Link href={`#${section?.secondaryCtaLink}`}>
                                                    <Button type="button" size={'sm'} className="uppercase">{section?.secondaryCtaName}</Button>
                                                </Link>
                                            )
                                        }                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
    catch(error){
        console.error("Page render failed:", error);
        return <div className="w-full h-screen flex items-center justify-center">
            <p className="text-sm! text-center">Something went wrong. Please try again later.</p>
        </div>;
    }    
}