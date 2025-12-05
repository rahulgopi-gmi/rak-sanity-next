"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HomeAboutType, HomeItems, HomeKeyWords, SectionType } from "@/features/application/types/sanity";
import { getBodyText } from "@/sanity/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import PillTag from "../pill-tag/PillTag";

export default function Hero({ data }: { data: SectionType }) {        
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

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) observer.unobserve(elementRef.current);
        }

    }, [typingStarted]);
   
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

    const listItems: HomeItems[] = Array.isArray(data.items)
        ? data.items
        : data.items
            ? [data.items]
            : [];

    return(
        <div className="w-full">                
            <section className="second-fold-wrapper-outer">
                <div id="about" className="second-fold-wrapper section-space-top section-space-sub-bottom m-0 bg-[linear-gradient(180deg,#1F1F1F_0%,#030303_50%,#000_100%)] relative [@media(max-width:992px)]:text-center">
                    <div className="container mx-auto relative z-10">
                        {
                            aboutItems.map((a: HomeAboutType, index: number) => (
                                <div
                                    key={a.key}
                                    className="flex flex-wrap -mx-2 items-center [@media(max-width:991px)]:flex-col-reverse"
                                >
                                    <div className="lg:w-5/12 px-2 h-[300px] max-lg:h-[200px] relative" data-aos="fade-up" data-aos-duration="2000">
                                        <Image
                                            src={urlFor(a.image).url()}
                                            alt={a.image?.alt || ""}
                                            fill
                                            className="w-full max-lg:mt-[30px] object-contain"
                                        />
                                    </div>

                                    <div className="lg:w-7/12 px-2" data-aos="fade-up" data-aos-duration="2000">                                                                                
                                        <div dangerouslySetInnerHTML={{ __html: getBodyText(a.header) }}></div>

                                        <p className="max-w-[510px] text-[#D5D5D5] font-sans text-[16px]! not-italic font-normal leading-normal! mb-[30px]">
                                            <div dangerouslySetInnerHTML={{ __html: getBodyText(a.content) }}></div>
                                        </p>

                                        <Link href={`#${a.ctaLink}`}
                                            className="rounded-lg bg-[#5FC2D5] [box-shadow:0_0_14px_0_rgba(255,255,255,0.19)_inset] text-black text-center font-sans text-[16px] not-italic font-semibold leading-normal uppercase px-8 py-[17px] hover:bg-white inline-block transition">
                                                {a.ctaName}
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }

                        <div className="special-benfit-wrapper mt-[75px]">
                            <PillTag className="mb-[30px]">{data?.keywordstitle}</PillTag>

                            <div className="row flex flex-wrap -mx-2">
                                {
                                    keywords.map((k: HomeKeyWords, index: number) => (
                                        <div
                                            key={`benefit-${k.key}`}
                                            className="col-xl-3 col-lg-4 col-6 lg:w-4/12 px-2 w-6/12" data-aos="fade-up" data-aos-duration="2000"
                                        >
                                            <div className="flex items-center text-left [@media(max-width:575px)]:block [@media(max-width:575px)]:text-center">
                                                <div className="rounded-tl-[18px] rounded-br-none rounded-tr-[18px] rounded-bl-[18px] bg-[rgba(95,194,213,0.18)] w-[63px] h-[63px] flex flex-wrap items-center justify-center mr-[15px] [@media(max-width:575px)]:mb-5 [@media(max-width:575px)]:mr-auto [@media(max-width:575px)]:ml-auto">
                                                    <div className="max-h-[34px] h-14 w-14 relative">
                                                        <Image
                                                            src={urlFor(k.image).url()}
                                                            alt={k.image?.alt || ""}
                                                            fill
                                                        />
                                                    </div>
                                                </div>

                                                <span className="flex-1 font-sans text-[#FFF] text-[16px] not-italic font-light [@media(max-width:991px)]:font-normal leading-[normal] block [@media(max-width:575px)]:text-[14px]">
                                                    {k.content}
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


            <section id="sectors" className="who-this-for-wrapper section-space-top section-space-bottom text-center bg-[#FFFFFF] relative">
                <div className="container mx-auto relative z-10">
                    <h4 className="border border-[#5FC2D5] bg-[linear-gradient(0deg,_rgba(255,_255,_255,_0.11)_0%,_rgba(95,_194,_213,_0.23)_0.01%,_rgba(95,_194,_213,_0.01)_88.24%)] [box-shadow:0_0_14px_0_rgba(255,_255,_255,_0.19)_inset] text-[#000000] rounded-[17.5px] font-sans text-[16px]! not-italic font-normal leading-[normal] uppercase px-[25px] py-[8px] inline-block mb-[30px]"
                        data-aos="fade-up" data-aos-duration="2000">{data.itemTitle}</h4>

                    <h2 data-aos="fade-up" data-aos-duration="2000" ref={elementRef}
                        className="font-semibold text-black text-center font-mono text-[45px]! mb-[58px] not-italic leading-[47px]! min-h-[142px] [@media(max-width:991px)]:text-[35px] [@media(max-width:991px)]:leading-[35px]">
                    </h2>

                    <div className="services-main-wrapper max-w-[1196px] m-auto [@media(max-width:991px)]:px-[30px] [@media(max-width:991px)]:py-[0]" data-aos="fade-up" data-aos-duration="2000">
                        <div className="absolute w-[370px] h-[257px] z-10 flex flex-wrap align-center-animation items-center justify-center [@media(max-width:1200px)]:hidden">
                            <Image fill alt="" className="" src="/round-animation.gif" />
                        </div>

                        <div className="flex flex-wrap -mx-2 -mb-[25px]">
                            {
                                listItems.map((t: HomeItems, index: number) => {
                                    const img = (
                                        <Image
                                            fill
                                            alt={t?.image?.alt || ""}
                                            src={urlFor(t.image).url()}
                                        />
                                    );

                                    if (index === 0){
                                        return(
                                            <div
                                                key={t.key}
                                                className="lg:w-3/12 px-2 sm:w-6/12 mb-[25px]"
                                            >
                                                <div className="services-block gaming rounded-[20px] pt-[27px] px-[33px] pb-[15px] min-h-[357px] text-left relative [@media(min-width:1025px)]:[transition:all_0.3s_ease_0s] [@media(max-width:1200px)]:rounded-[20px] [@media(max-width:1200px)]:bg-[linear-gradient(359deg,_rgba(95,_194,_213,_0.19)_0.89%,_rgba(95,_194,_213,_0.04)_99.28%)] [@media(max-width:1200px)]:backdrop-filter [@media(max-width:1200px)]:border-[1px] [@media(max-width:1200px)]:border-[rgba(95,194,213,0.50)] [@media(max-width:1200px)]:!text-center [@media(max-width:1200px)]:px-[24px] [@media(max-width:1200px)]:py-[38px] [@media(max-width:1200px)]:min-h-[295px] [@media(max-width:1200px)]:h-full" data-aos="fade-up" data-aos-duration="2000">
                                                    <div className="absolute left-0 top-0 w-full h-full [@media(max-width:1200px)]:hidden">
                                                        <Image fill alt="" className="w-full mb-0!" src="/gradeint-box.svg" />
                                                    </div>

                                                    <h3 className="text-[#5752A3] font-sans text-[25px]! not-italic font-bold leading-[normal] mb-10 relative [@media(max-width:1200px)]:mb-[25px]">
                                                        {t.header}
                                                    </h3>

                                                    <div className="w-20 h-20 relative mb-[42px] [@media(max-width:1200px)]:mb-[25px] [@media(max-width:1200px)]:ml-auto [@media(max-width:1200px)]:mr-auto">
                                                        {img}
                                                    </div>

                                                    <p className="text-black font-sans text-[16px] not-italic font-normal leading-[normal] mb-0 relative">Power
                                                        {t.content}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    }
                                    if (index === 1) {
                                        return(
                                            <div className="lg:w-6/12 px-2 sm:w-6/12 mb-[25px]">
                                                <div className="services-block robotics rounded-[20px] pt-[27px] px-[33px] pb-[15px] min-h-[357px] text-left relative [@media(min-width:1025px)]:[transition:all_0.3s_ease_0s] [@media(max-width:1200px)]:rounded-[20px] [@media(max-width:1200px)]:bg-[linear-gradient(359deg,_rgba(95,_194,_213,_0.19)_0.89%,_rgba(95,_194,_213,_0.04)_99.28%)] [@media(max-width:1200px)]:backdrop-filter [@media(max-width:1200px)]:border-[1px] [@media(max-width:1200px)]:border-[solid] [@media(max-width:1200px)]:border-[rgba(95,194,213,0.50)] [@media(max-width:1200px)]:!text-center [@media(max-width:1200px)]:px-[24px] [@media(max-width:1200px)]:py-[38px] [@media(max-width:1200px)]:min-h-[295px] [@media(max-width:1200px)]:h-full" data-aos="fade-up" data-aos-duration="2000">
                                                    <div className="absolute left-0 top-0 w-full h-full [@media(max-width:1200px)]:hidden">
                                                        <Image fill alt="" className="w-full mb-0!" src="/gradeint-box-center.svg" />
                                                    </div>

                                                    <h3 className="text-[#5752A3] font-sans text-[25px]! not-italic font-bold leading-[normal] mb-0! relative [@media(max-width:1200px)]:!mb-[25px]">
                                                        {t.header}
                                                    </h3>

                                                    <div className="flex items-end max-w-[500px] [@media(max-width:1200px)]:max-w-full [@media(max-width:1200px)]:flex-wrap [@media(max-width:1200px)]:flex-col-reverse [@media(max-width:1200px)]:justify-center [@media(max-width:1200px)]:text-center">
                                                        <p className="text-black font-sans text-[16px] not-italic font-normal leading-[normal] mb-0 relative">
                                                            {t.content}
                                                        </p>

                                                        <div className="w-20 h-20 relative [@media(max-width:1200px)]:mb-[25px] [@media(max-width:1200px)]:ml-auto [@media(max-width:1200px)]:mr-auto">
                                                           {img}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }

                                    if (index === 2) {
                                        return(
                                            <div className="lg:w-3/12 sm:w-6/12 px-2 mb-[25px]">
                                                <div className="services-block healthcheck text-right [@media(max-width:1200px)]:text-right rounded-[20px] pt-[27px] px-[33px] pb-[15px] min-h-[357px] text-left relative [@media(min-width:1025px)]:[transition:all_0.3s_ease_0s] [@media(max-width:1200px)]:rounded-[20px] [@media(max-width:1200px)]:bg-[linear-gradient(359deg,_rgba(95,_194,_213,_0.19)_0.89%,_rgba(95,_194,_213,_0.04)_99.28%)] [@media(max-width:1200px)]:backdrop-filter [@media(max-width:1200px)]:border-[1px] [@media(max-width:1200px)]:border-[solid] [@media(max-width:1200px)]:border-[rgba(95,194,213,0.50)] [@media(max-width:1200px)]:!text-center [@media(max-width:1200px)]:px-[24px] [@media(max-width:1200px)]:py-[38px] [@media(max-width:1200px)]:min-h-[295px] [@media(max-width:1200px)]:h-full" data-aos="fade-up" data-aos-duration="2000">
                                                    <div className="absolute left-0 top-0 w-full h-full [@media(max-width:1200px)]:hidden">
                                                        <Image fill alt="" className="w-full mb-0!" src="gradeint-box.svg" />
                                                    </div>

                                                    <h3 className="text-[#5752A3] font-sans text-[25px]! not-italic font-bold leading-[normal] mb-10 relative [@media(max-width:1200px)]:mb-[25px]">
                                                        {t.header}
                                                    </h3>

                                                    <div className="w-20 h-20 relative mb-[42px] ml-auto [@media(max-width:1200px)]:mb-[25px] [@media(max-width:1200px)]:ml-auto [@media(max-width:1200px)]:mr-auto">
                                                        {img}
                                                    </div>

                                                    <p className="text-black font-sans text-[16px] not-italic font-normal leading-[normal] mb-0 relative">Data
                                                        {t.content}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    }

                                    if (index === 3) {
                                        return(
                                            <div className="lg:w-6/12 w-full px-2 sm:w-6/12 mb-[25px]">
                                                <div className="services-block artificial-intelligence-div rounded-[20px] pt-[27px] px-[33px] pb-[15px] min-h-[357px] text-left relative [@media(min-width:1025px)]:[transition:all_0.3s_ease_0s] [@media(max-width:1200px)]:rounded-[20px] [@media(max-width:1200px)]:bg-[linear-gradient(359deg,_rgba(95,_194,_213,_0.19)_0.89%,_rgba(95,_194,_213,_0.04)_99.28%)] [@media(max-width:1200px)]:backdrop-filter [@media(max-width:1200px)]:border-[1px] [@media(max-width:1200px)]:border-[solid] [@media(max-width:1200px)]:border-[rgba(95,194,213,0.50)] [@media(max-width:1200px)]:!text-center [@media(max-width:1200px)]:px-[24px] [@media(max-width:1200px)]:py-[38px] [@media(max-width:1200px)]:min-h-[295px] [@media(max-width:1200px)]:h-full" data-aos="fade-up" data-aos-duration="2000">
                                                    <div className="absolute left-0 top-0 w-full h-full [@media(max-width:1200px)]:hidden">
                                                        <Image fill alt="" className="w-full mb-0!" src="/gradeint-box-btm-left.svg" />
                                                    </div>

                                                    <h3 className="text-[#5752A3] font-sans text-[25px]! not-italic font-bold leading-[normal] mb-10 relative [@media(max-width:1200px)]:mb-[25px]">
                                                        {t.header}
                                                    </h3>

                                                    <div className="w-20 h-20 relative mb-[42px] [@media(max-width:1200px)]:mb-[25px] [@media(max-width:1200px)]:ml-auto [@media(max-width:1200px)]:mr-auto">
                                                        {img}
                                                    </div>

                                                    <p className="text-black font-sans text-[16px] not-italic font-normal leading-[normal] mb-0 relative">
                                                        {t.content}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    }

                                    if (index === 4) {
                                        return(
                                            <div className="lg:w-6/12 px-2 w-full sm:w-6/12 mb-[25px]">
                                                <div className="services-block web-div text-right [@media(max-width:1200px)]:text-center rounded-[20px] pt-[27px] px-[33px] pb-[15px] min-h-[357px] text-left relative [@media(min-width:1025px)]:[transition:all_0.3s_ease_0s] [@media(max-width:1200px)]:rounded-[20px] [@media(max-width:1200px)]:bg-[linear-gradient(359deg,_rgba(95,_194,_213,_0.19)_0.89%,_rgba(95,_194,_213,_0.04)_99.28%)] [@media(max-width:1200px)]:backdrop-filter [@media(max-width:1200px)]:border-[1px] [@media(max-width:1200px)]:border-[solid] [@media(max-width:1200px)]:border-[rgba(95,194,213,0.50)] [@media(max-width:1200px)]:!text-center [@media(max-width:1200px)]:px-[24px] [@media(max-width:1200px)]:py-[38px] [@media(max-width:1200px)]:min-h-[295px] [@media(max-width:1200px)]:h-full" data-aos="fade-up" data-aos-duration="2000">
                                                    <div className="absolute left-0 top-0 w-full h-full [@media(max-width:1200px)]:hidden">
                                                        <Image fill alt="" className="w-full mb-0!" src="/gradeint-box-btm-right.svg" />
                                                    </div>

                                                    <h3 className="text-[#5752A3] font-sans text-[25px]! not-italic font-bold leading-[normal] mb-10 relative [@media(max-width:1200px)]:mb-[25px]">
                                                        {t.header}
                                                    </h3>

                                                    <div className="w-20 h-20 relative mb-[42px] ml-auto [@media(max-width:1200px)]:mb-[25px] [@media(max-width:1200px)]:ml-auto [@media(max-width:1200px)]:mr-auto">
                                                        {img}
                                                    </div>

                                                    <p className="text-black font-sans text-[16px] not-italic font-normal leading-[normal] mb-0 relative">
                                                        {t.content}
                                                    </p>
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