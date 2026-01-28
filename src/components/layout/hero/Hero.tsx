"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HomeAboutType, HomeItems, HomeKeyWords, SectionHeroType } from "@/features/application/types/sanity";
import { getBodyText } from "@/sanity/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";
import PillTag from "@/components/ui/pill-tag";
import { ArrowRight } from "lucide-react";

export default function Hero({ data }: { data: SectionHeroType }) {
    const text = getBodyText(data?.itemHeader)
    const elementRef = useRef<HTMLHeadingElement>(null);
    const [typingStarted, setTypingStarted] = useState(false);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.matchMedia({
            "(min-width:1025px)": function () {
                ScrollTrigger.create({
                    trigger: ".second-fold-wrapper-outer",
                    start: "bottom bottom",
                    end: "bottom top",
                    pin: true,
                    pinSpacing: false,
                    markers: false
                })
            },

            "(max-width: 1024px)": function () {
                gsap.set("second-fold-wrapper-outer", { clearProps: "all" });
            }
        })

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        }
    }, []);

    useEffect(() => {
        let i = 0;

        function typeWriter() {
            if (elementRef.current && i < text.length) {
                elementRef.current.innerHTML = text.substring(0, i + 1);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        const currentElement = elementRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !typingStarted) {
                        setTypingStarted(true);
                        typeWriter();
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) observer.unobserve(currentElement);
        }

    }, [typingStarted, text]);

    const aboutItems: HomeAboutType[] = Array.isArray(data.about)
        ? data.about
        : data.about
            ? [data.about]
            : [];

    const keywords: HomeKeyWords[] = Array.isArray(data.keywords)
        ? data.keywords
        : data.keywords
            ? [data.keywords]
            : [];

    const listItems: HomeItems[] = Array.isArray(data?.items)
        ? data.items
        : data.items
            ? [data.items]
            : [];

    return (
        <div className="w-full">
            <section className="second-fold-wrapper-outer">
                <div id="about" className="section-space-top section-space-sub-bottom m-0 bg-[linear-gradient(180deg,#1F1F1F_0%,#030303_50%,#000_100%)] relative max-lg:text-center">
                    <div className="container mx-auto relative z-10">
                        {
                            aboutItems.map((a: HomeAboutType, index: number) => (
                                <div
                                    key={`about-type-${index}`}
                                    className="flex flex-wrap -mx-2 items-center [@media(max-width:991px)]:flex-col-reverse"
                                >
                                    <div className="w-full lg:w-1/2 px-2 h-80.5 max-lg:h-62.5 relative">
                                        <Image
                                            src={urlFor(a.image) || ""}
                                            alt={a.image?.alt || ""}
                                            fill
                                            className="w-full max-lg:mt-7.5 object-contain"
                                        />
                                    </div>

                                    <div className="lg:w-1/2 px-2">
                                        <PillTag className="mb-7! max-lg:mx-auto px-4">{a?.title || ""}</PillTag>
                                        <div dangerouslySetInnerHTML={{ __html: getBodyText(a?.header) || "" }}></div>
                                        <div className="about-section" dangerouslySetInnerHTML={{ __html: getBodyText(a?.content) || "" }}></div>
                                        <Link href={`#${a.ctaLink}`}>
                                            <Button type="button" className="text-base!">{a.ctaName || ""}</Button>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }

                        <div className="special-benfit-wrapper mt-10">
                            <PillTag className="mb-6.25! max-lg:mx-auto px-4">{data?.keywordstitle || ""}</PillTag>

                            <div className="row flex flex-wrap -mx-2">
                                {
                                    keywords.map((k: HomeKeyWords, index: number) => (
                                        <div
                                            key={`benefit-${index}`}
                                            className="col-xl-3 col-lg-4 col-6 lg:w-4/12 px-2 w-6/12"
                                        >
                                            <div className="flex items-center text-left [@media(max-width:575px)]:block [@media(max-width:575px)]:text-center">
                                                <div className="rounded-tl-[18px] rounded-br-none rounded-tr-[18px] rounded-bl-[18px] bg-[rgba(95,194,213,0.18)] w-15.75 h-15.75 flex flex-wrap items-center justify-center mr-3.75 [@media(max-width:575px)]:mb-5 [@media(max-width:575px)]:mr-auto [@media(max-width:575px)]:ml-auto">
                                                    <div className="max-h-8.5 h-14 w-14 relative">
                                                        <Image
                                                            src={urlFor(k?.image) || ""}
                                                            alt={k?.image?.alt || ""}
                                                            fill
                                                        />
                                                    </div>
                                                </div>

                                                <span className="flex-1 font-sans text-white text-base not-italic font-normal [@media(max-width:991px)]:font-normal leading-[normal]! block [@media(max-width:575px)]:text-sm">
                                                    {k?.content || ""}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section id="sectors" className="who-this-for-wrapper section-space-top section-space-bottom text-center bg-white relative">
                <div className="container mx-auto relative z-10">
                    <PillTag className="mx-auto mb-7.5 px-4" variant={'light'}>{data?.itemTitle || ""}</PillTag>
                    <div className="who-this-for-header mb-7.5" ref={elementRef || ""}></div>

                    <div className="services-main-wrapper max-w-299 m-auto [@media(max-width:991px)]:px-7.5 [@media(max-width:991px)]:py-0">
                        <div className="absolute w-92.5 h-64.25 z-10 flex flex-wrap align-center-animation items-center justify-center [@media(max-width:1200px)]:hidden">
                            <Image fill alt="" className="" src="/images/animation/round-animation.gif" />
                        </div>

                        <div className="flex flex-wrap -mx-2 -mb-6.25">
                            {
                                listItems.map((t: HomeItems, index: number) => {
                                    const img = (
                                        <Image
                                            fill
                                            alt={t?.image?.alt}
                                            src={urlFor(t?.image) || ""}
                                            className="object-cover"
                                        />
                                    );

                                    if (index === 0) {
                                        return (
                                            <div
                                                key={`items-${index}`}
                                                className="lg:w-3/12 px-2 sm:w-6/12 mb-6.25"
                                            >
                                                <div className="services-block group gaming pt-6.75 px-8.25 pb-3.75 min-h-89.25 text-left relative [@media(min-width:1025px)]:[transition:all_0.3s_ease_0s] [@media(max-width:1200px)]:rounded-[20px] [@media(max-width:1200px)]:bg-[linear-gradient(359deg,rgba(95,194,213,0.19)_0.89%,rgba(95,194,213,0.04)_99.28%)] [@media(max-width:1200px)]:backdrop-filter [@media(max-width:1200px)]:border [@media(max-width:1200px)]:border-[rgba(95,194,213,0.50)] [@media(max-width:1200px)]:text-center! [@media(max-width:1200px)]:px-6 [@media(max-width:1200px)]:py-9.5 [@media(max-width:1200px)]:min-h-73.75 [@media(max-width:1200px)]:h-full">
                                                    <div className="absolute left-0 top-0 w-full h-full [@media(max-width:1200px)]:hidden">
                                                        <Image fill alt="" className="w-full mb-0!" src="images/gradient/gradient-box.svg" />
                                                    </div>

                                                    <h3 className="text-custom font-sans text-25! not-italic font-bold leading-normal! mb-10 relative [@media(max-width:1200px)]:mb-6.25">
                                                        {t?.header || ""}
                                                    </h3>

                                                    <div className="w-20 h-20 relative transition-all duration-300 mb-8 group-hover:mb-6 [@media(max-width:1200px)]:ml-auto [@media(max-width:1200px)]:mr-auto">
                                                        {img}
                                                    </div>                                                    

                                                    <p className="text-black font-sans text-base! not-italic font-normal leading-[normal]! mb-0 relative">
                                                        {t?.content || ""}
                                                    </p>

                                                    <div className="w-11.75 h-11.75 mr-auto max-md:mx-auto">
                                                        <Button size={'icon-sm'} className="rounded-full w-11.75 h-11.75 mt-3 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                                            <ArrowRight size={4} />
                                                        </Button>
                                                    </div> 
                                                </div>
                                            </div>
                                        )
                                    }
                                    if (index === 1) {
                                        return (
                                            <div
                                                key={`items-${index}`}
                                                className="lg:w-6/12 px-2 sm:w-6/12 mb-6.25">
                                                <div className="services-block group robotics pt-6.75 px-8.25 pb-3.75 min-h-89.25 text-left relative [@media(min-width:1025px)]:[transition:all_0.3s_ease_0s] [@media(max-width:1200px)]:rounded-[20px] [@media(max-width:1200px)]:bg-[linear-gradient(359deg,rgba(95,194,213,0.19)_0.89%,rgba(95,194,213,0.04)_99.28%)] [@media(max-width:1200px)]:backdrop-filter [@media(max-width:1200px)]:border [@media(max-width:1200px)]:border-[rgba(95,194,213,0.50)] [@media(max-width:1200px)]:text-center! [@media(max-width:1200px)]:px-6 [@media(max-width:1200px)]:py-9.5 [@media(max-width:1200px)]:min-h-73.75 [@media(max-width:1200px)]:h-full">
                                                    <div className="absolute left-0 top-0 w-full h-full [@media(max-width:1200px)]:hidden">
                                                        <Image fill alt="" className="w-full mb-0!" src="images/gradient/gradient-box-center.svg" />
                                                    </div>

                                                    <h3 className="text-custom font-sans text-25! not-italic font-bold leading-normal mb-0! relative [@media(max-width:1200px)]:mb-6.25!">
                                                        {t?.header}
                                                    </h3>

                                                    <div className="flex items-end max-w-125 [@media(max-width:1200px)]:max-w-full [@media(max-width:1200px)]:flex-wrap [@media(max-width:1200px)]:flex-col-reverse [@media(max-width:1200px)]:justify-center [@media(max-width:1200px)]:text-center">
                                                        <p className="text-black font-sans text-base! not-italic font-normal leading-[100%] mb-0 relative">
                                                            {t?.content}                                                            
                                                        </p>                                                        

                                                        <div className="md:w-30 w-21.25 h-21.25 relative [@media(max-width:1200px)]:mb-6.25 [@media(max-width:1200px)]:ml-auto [@media(max-width:1200px)]:mr-auto">
                                                            {img}
                                                        </div>
                                                    </div>

                                                    <div className="w-11.75 h-11.75 mr-auto max-md:mx-auto">
                                                        <Button size={'icon-sm'} className="rounded-full w-11.75 h-11.75 mt-3 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                                            <ArrowRight size={4} />
                                                        </Button>
                                                    </div> 
                                                </div>
                                            </div>
                                        )
                                    }

                                    if (index === 2) {
                                        return (
                                            <div
                                                key={`items-${index}`}
                                                className="lg:w-3/12 sm:w-6/12 px-2 mb-6.25">
                                                <div className="services-block group healthcheck text-right max-lg:text-center pt-6.75 px-8.25 pb-3.75 min-h-89.25 relative [@media(min-width:1025px)]:[transition:all_0.3s_ease_0s] [@media(max-width:1200px)]:rounded-[20px] [@media(max-width:1200px)]:bg-[linear-gradient(359deg,rgba(95,194,213,0.19)_0.89%,rgba(95,194,213,0.04)_99.28%)] [@media(max-width:1200px)]:backdrop-filter [@media(max-width:1200px)]:border [@media(max-width:1200px)]:border-[solid] [@media(max-width:1200px)]:px-6 [@media(max-width:1200px)]:py-9.5 [@media(max-width:1200px)]:min-h-73.75 [@media(max-width:1200px)]:h-full">
                                                    <div className="absolute left-0 top-0 w-full h-full [@media(max-width:1200px)]:hidden">
                                                        <Image fill alt="" className="w-full mb-0!" src="images/gradient/gradient-box.svg" />
                                                    </div>

                                                    <h3 className="text-custom font-sans text-25! not-italic font-bold leading-normal mb-10 relative [@media(max-width:1200px)]:mb-6.25">
                                                        {t?.header}
                                                    </h3>

                                                    <div className="w-20 h-20 relative transition-all duration-300 mb-8 group-hover:mb-6 ml-auto [@media(max-width:1200px)]:ml-auto [@media(max-width:1200px)]:mr-auto">
                                                        {img}
                                                    </div>

                                                    <p className="text-black font-sans text-base! not-italic font-normal leading-[100%] mb-0 relative">
                                                        {t?.content}
                                                    </p>

                                                    <div className="w-11.75 h-11.75 ml-auto max-md:mx-auto">
                                                        <Button size={'icon-sm'} className="rounded-full w-11.75 h-11.75 mt-3 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                                            <ArrowRight size={4} />
                                                        </Button>
                                                    </div>    
                                                </div>
                                            </div>
                                        )
                                    }

                                    if (index === 3) {
                                        return (
                                            <div
                                                key={`items-${index}`}
                                                className="lg:w-6/12 w-full px-2 sm:w-6/12 mb-6.25">
                                                <div className="services-block group artificial-intelligence-div pt-6.75 px-8.25 pb-3.75 min-h-89.25 text-left relative [@media(min-width:1025px)]:[transition:all_0.3s_ease_0s] [@media(max-width:1200px)]:rounded-[20px] [@media(max-width:1200px)]:bg-[linear-gradient(359deg,rgba(95,194,213,0.19)_0.89%,rgba(95,194,213,0.04)_99.28%)] [@media(max-width:1200px)]:backdrop-filter [@media(max-width:1200px)]:border [@media(max-width:1200px)]:border-[solid] [@media(max-width:1200px)]:text-center! [@media(max-width:1200px)]:px-6 [@media(max-width:1200px)]:py-9.5 [@media(max-width:1200px)]:min-h-73.75 [@media(max-width:1200px)]:h-full">
                                                    <div className="absolute left-0 top-0 w-full h-full [@media(max-width:1200px)]:hidden">
                                                        <Image fill alt="" className="w-full mb-0!" src="images/gradient/gradient-box-btm-left.svg" />
                                                    </div>

                                                    <h3 className="text-custom font-sans text-25! not-italic font-bold leading-normal! mb-10 relative [@media(max-width:1200px)]:mb-6.25">
                                                        {t?.header}
                                                    </h3>

                                                    <div className="w-20 h-20 relative transition-all duration-300 mb-10.5 group-hover:mb-8 [@media(max-width:1200px)]:mb-6.25 [@media(max-width:1200px)]:ml-auto [@media(max-width:1200px)]:mr-auto">
                                                        {img}
                                                    </div>

                                                    <p className="text-black font-sans text-base! not-italic font-normal leading-[100%] mb-0 relative md:max-w-[80%] md:mr-auto">
                                                        {t?.content}
                                                    </p>

                                                    <div className="w-11.75 h-11.75 mr-auto max-md:mx-auto">
                                                        <Button size={'icon-sm'} className="rounded-full w-11.75 h-11.75 mt-3 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                                            <ArrowRight size={4} />
                                                        </Button>
                                                    </div> 
                                                </div>
                                            </div>
                                        )
                                    }

                                    if (index === 4) {
                                        return (
                                            <div
                                                key={`items-${index}`}
                                                className="lg:w-6/12 px-2 w-full sm:w-6/12 mb-6.25">
                                                <div className="services-block group web-div text-right max-lg:text-center pt-6.75 px-8.25 pb-3.75 min-h-89.25 relative [@media(min-width:1025px)]:[transition:all_0.3s_ease_0s] [@media(max-width:1200px)]:rounded-[20px] [@media(max-width:1200px)]:bg-[linear-gradient(359deg,rgba(95,194,213,0.19)_0.89%,rgba(95,194,213,0.04)_99.28%)] [@media(max-width:1200px)]:backdrop-filter [@media(max-width:1200px)]:border [@media(max-width:1200px)]:border-[solid] [@media(max-width:1200px)]:text-center! [@media(max-width:1200px)]:px-6 [@media(max-width:1200px)]:py-9.5 [@media(max-width:1200px)]:min-h-73.75 [@media(max-width:1200px)]:h-full">
                                                    <div className="absolute left-0 top-0 w-full h-full [@media(max-width:1200px)]:hidden">
                                                        <Image fill alt="" className="w-full mb-0!" src="images/gradient/gradient-box-btm-right.svg" />
                                                    </div>

                                                    <h3 className="text-custom font-sans text-25! not-italic font-bold leading-[normal]! mb-10 relative [@media(max-width:1200px)]:mb-6.25">
                                                        {t?.header}
                                                    </h3>

                                                    <div className="w-21.75 h-20 relative transition-all duration-300 mb-10.5 group-hover:mb-8 ml-auto [@media(max-width:1200px)]:mb-6.25 [@media(max-width:1200px)]:ml-auto [@media(max-width:1200px)]:mr-auto">
                                                        {img}
                                                    </div>

                                                    <p className="text-black font-sans text-base! not-italic font-normal leading-[100%] mb-0 relative md:max-w-[80%] md:ml-auto">
                                                        {t.content}
                                                    </p>

                                                    <div className="w-11.75 h-11.75 ml-auto max-md:mx-auto">
                                                        <Button size={'icon-sm'} className="rounded-full w-11.75 h-11.75 mt-3 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                                            <ArrowRight size={4} />
                                                        </Button>
                                                    </div> 
                                                </div>
                                            </div>
                                        )
                                    }
                                    return null;
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}