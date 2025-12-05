"use client";
import Image from "next/image";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useRef } from "react";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Page() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <main className="bg-black">
            <section className="relative w-full bg-[url('/aboutbgmob.jpg')] md:bg-[url('/bg-grd-banner.jpg')] bg-contain md:bg-cover bg-no-repeat with-overlay">
                <div className="container">
                    <div className="flex flex-col items-center justify-center text-center pt-[211px]" data-aos="fade-up">
                        <button data-aos="fade-up"
                            className="font-sans uppercase text-white text-[16px] font-normal border border-white/20 rounded-[17.5px] opacity-50 px-6 py-2 shadow-inner"                            >
                            NewsRoom
                        </button>

                        <div className="max-w-[900px] mx-auto">
                            <h2 data-aos="fade-up" className="mt-8 text-white text-center font-extrabold uppercase font-mono px-6">
                                Empowering Visionaries Inspiring Change
                            </h2>

                            <p data-aos="fade-up" className="mt-7 text-[#D5D5D5] text-[16px]! font-normal font-sans normal-case px-10 leading-[normal]!">
                                Stay informed and discover insights on business setup, licensing, and company formation in the UAE. Explore our blogs
                                for clear guidance to launch and grow your business at Innovation City.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative pt-[50px] pb-[461px] w-full px-[30px]" data-aos="fade-up">
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        slidesPerView={1}
                        spaceBetween={30}
                        loop
                        autoHeight
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            el: ".custom-pagination",
                            clickable: false,
                        }}
                        onBeforeInit={(swiper: any) => {
                            if (typeof swiper.params.navigation !== "boolean") {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                            }
                        }}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        breakpoints={{
                            768: { slidesPerView: 1 },
                            1024: { slidesPerView: 1 },
                            1200: { slidesPerView: 1 },
                        }}
                        className="mySwiper max-w-full mx-auto"
                    >
                        <SwiperSlide className="slide-custom">
                            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                                <div className="w-full h-full relative">
                                    <Image fill alt="" src="/blog-slider-image.png" className="rounded-2xl shadow-lg" />
                                </div>

                                <div className="w-full px-8 xl:px-12 py-20 flex flex-col gap-y-0 lg:gap-y-4">
                                    <h3 className="text-[16px]! leading-[normal]! font-light text-white mb-6 mt-7 lg:mt-0 lg:mb-0">14 May 2025</h3>
                                    <h2 className="text-white text-[18px]! xl:text-[22px]! leading-[normal]! font-semibold capitalize max-w-[380px]  mb-6 mt-0 lg:mt-0 lg:mb-0">RAK DAO partners with SuiHub MENA to capitalize on the UAE’s web3 growth momentum</h2>
                                    <p className="text-white text-[16px]! font-sans font-normal leading-[21px]! max-w-[500px] lg:mb-0 mb-7">
                                        Ras Al Khaimah, UAE – April 28th, 2025 – RAK Digital Assets Oasis (RAK DAO), the UAE’s pioneering Free Zone dedicated to digital assets and blockchain enterprises, today announced a strategic partnership with SuiHub MENA, the regional innovation ...
                                    </p>

                                    <h4 className="text-[12px]! leading-[normal]! font-normal font-sans text-white capitalize mb-10 lg:mb-0">BY m. elkhamisy</h4>
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide className="slide-custom">
                            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                                <div className="w-full h-full relative">
                                    <Image fill alt="" src="/blog-slider-image.png" className="rounded-2xl shadow-lg" />
                                </div>

                                <div className="w-full px-8 xl:px-12 py-20 flex flex-col gap-y-0 lg:gap-y-4">
                                    <h3 className="text-[16px]! leading-[normal]! font-light text-white mb-6 mt-7 lg:mt-0 lg:mb-0">14 May 2025</h3>
                                    <h2 className="text-white text-[18px]! xl:text-[22px]! leading-[normal]! font-semibold capitalize max-w-[380px] mb-6 mt-0 lg:mt-0 lg:mb-0">RAK DAO partners
                                        with SuiHub MENA to capitalize on the UAE’s web3 growth momentum</h2>
                                    <p className="text-white text-[16px]! font-sans font-normal leading-[21px]! max-w-[500px] lg:mb-0 mb-7">
                                        Ras Al Khaimah, UAE – April 28th, 2025 – RAK Digital Assets Oasis (RAK DAO), the UAE’s pioneering Free
                                        Zone dedicated to digital assets and blockchain enterprises, today announced a strategic partnership
                                        with SuiHub MENA, the regional innovation ...
                                    </p>

                                    <h4 className="text-[12px]! leading-[normal]! font-normal font-sans text-white capitalize mb-10 lg:mb-0">BY m. elkhamisy</h4>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>

                    {/* <div className="w-full flex items-center">
                        <button ref={prevRef} className="swiper-button-prev text-white">Prev</button>
                        <button ref={nextRef} className="swiper-button-next text-white">Next</button>
                    </div> */}

                </div>
            </section>

            <section className="w-full mt-[-380px] z-1 relative">
                <div className="container">
                    <div id="blogFilters" className="flex overflow-auto gap-3 xl:gap-4 whitespace-nowrap lg:whitespace-normal lg:flex-wrap mb-10" data-aos="fade-up">
                        <button
                            className="filter-btn  px-6 sm:px-4 xl:px-6  py-2 font-sans text-[14px] font-normal leading-[21px] normal-case
               rounded-[33554400px] border border-[rgba(255,255,255,0.20)]
               bg-[#5FC2D5]! text-black!"
                            data-filter="all">
                            All
                        </button>

                        <button className="filter-btn  px-6 sm:px-4 xl:px-6  py-2 font-sans text-[14px] font-normal leading-[21px] normal-case
                   text-white rounded-[33554400px]
                   border border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.05)]"
                            data-filter="Blog">
                            Blog
                        </button>

                        <button className="filter-btn  px-6 sm:px-4 xl:px-6  py-2 font-sans text-[14px] font-normal leading-[21px] normal-case
                   text-white rounded-[33554400px]
                   border border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.05)]"
                            data-filter="Press Release">
                            Press Release
                        </button>

                        <button className="filter-btn  px-6 sm:px-4 xl:px-6  py-2 font-sans text-[14px] font-normal leading-[21px] normal-case
                   text-white rounded-[33554400px]
                   border border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.05)]"
                            data-filter="Reports">
                            Reports
                        </button>

                        <button className="filter-btn  px-6 sm:px-4 xl:px-6  py-2 font-sans text-[14px] font-normal leading-[21px] normal-case
                   text-white rounded-[33554400px]
                   border border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.05)]"
                            data-filter="Business Setup">
                            Business Setup
                        </button>

                        <button className="filter-btn  px-6 sm:px-4 xl:px-6  py-2 font-sans text-[14px] font-normal leading-[21px] normal-case
                   text-white rounded-[33554400px]
                   border border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.05)]"
                            data-filter="Blockchain">
                            Blockchain
                        </button>

                        <button className="filter-btn  px-6 sm:px-4 xl:px-6  py-2 font-sans text-[14px] font-normal leading-[21px] normal-case
                   text-white rounded-[33554400px]
                   border border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.05)]"
                            data-filter="Technology">
                            Technology
                        </button>

                        <button className="filter-btn  px-6 sm:px-4 xl:px-6  py-2 font-sans text-[14px] font-normal leading-[21px] normal-case
                   text-white rounded-[33554400px]
                   border border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.05)]"
                            data-filter="Innovation">
                            Innovation
                        </button>

                        <button className="filter-btn  px-6 sm:px-4 xl:px-6  py-2 font-sans text-[14px] font-normal leading-[21px] normal-case
                   text-white rounded-[33554400px]
                   border border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.05)]"
                            data-filter="Web3">
                            Web3
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" data-aos="fade-up">
                        <div className="blog-card bg-[#0F0F0F] border border-[#1F1F1F] rounded-3xl overflow-hidden shadow-lg"
                            data-category="Technology,Business Setup">
                            <div className="relative w-full">
                                <div className="w-full h-[220px] relative">
                                    <Image fill alt="" src="/blog-img-3.png" />
                                </div>
                                
                                <div className="absolute top-4 left-4 flex gap-3">
                                    <span className="px-4 py-1 rounded-full bg-[rgba(27,26,26,0.7)] border border-[#333] text-white font-inter text-[14px] font-normal leading-normal">
                                        Technology
                                    </span>

                                    <span className="px-4 py-1 rounded-full bg-[rgba(27,26,26,0.7)] border border-[#333] text-white font-inter text-[14px] font-normal leading-normal">
                                        Business Setup
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="text-white font-sans text-[13px]! font-light leading-none! tracking-[0.13px] uppercase mb-2">
                                    14 May 2025
                                </p>

                                <h3 className="text-white font-sans text-[18px]! font-semibold leading-normal! mb-3">
                                    How to Get a Web3 or Tech License in the UAE with RAK DAO: A Complete Guide
                                </h3>

                                <p className="text-white font-sans text-[12px]! font-normal leading-[18px]! mb-6">
                                    As the UAE rapidly advances as a global tech and innovation hub...
                                </p>

                                <p className="text-white text-left font-sans text-[12px]! font-normal leading-none! capitalize">
                                    BY M. ElKhamisy
                                </p>
                            </div>
                        </div>

                        <div className="blog-card bg-[#0F0F0F] border border-[#1F1F1F] rounded-3xl overflow-hidden shadow-lg"
                            data-category="Blog,Blockchain,Technology">
                            <div className="relative w-full">
                                <div className="w-full h-[220px] relative">
                                    <Image fill alt="" src="/blog-img-3.png" />
                                </div>

                                <div className="absolute top-4 left-4 flex gap-3">
                                    <span className="px-4 py-1 rounded-full bg-[rgba(27,26,26,0.7)] border border-[#333] text-white font-inter text-[14px] font-normal leading-normal">
                                        Blog
                                    </span>

                                    <span className="px-4 py-1 rounded-full bg-[rgba(27,26,26,0.7)] border border-[#333] text-white font-inter text-[14px] font-normal leading-normal">
                                        Blockchain
                                    </span>

                                    <span className="px-4 py-1 rounded-full bg-[rgba(27,26,26,0.7)] border border-[#333] text-white font-inter text-[14px] font-normal leading-normal">
                                        Technology
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="text-white font-sans text-[13px]! font-light leading-none! tracking-[0.13px] uppercase mb-2">
                                    14 May 2025
                                </p>

                                <h3 className="text-white font-sans text-[18px]! font-semibold leading-normal! mb-3">
                                    Introduction to Stablecoins in Web3
                                </h3>

                                <p className="text-white font-sans text-[12px]! font-normal leading-[18px]! mb-6">
                                    Stablecoins, digital currencies pegged to stable assets...
                                </p>

                                <p className="text-white text-left font-sans text-[12px]! font-normal leading-normal! capitalize">
                                    BY M. ElKhamisy
                                </p>
                            </div>
                        </div>

                        <div className="blog-card bg-[#0F0F0F] border border-[#1F1F1F] rounded-3xl overflow-hidden shadow-lg"
                            data-category="Blog,Reports,Web3">
                            <div className="w-full relative">
                                <div className="w-full h-[220px] relative">
                                    <Image fill alt="" src="/blog-img-3.png" />
                                </div>

                                <div className="absolute top-4 left-4 flex gap-3">
                                    <span className="px-4 py-1 rounded-full bg-[rgba(27,26,26,0.7)] border border-[#333] text-white font-inter text-[14px] font-normal leading-normal">
                                        Blog
                                    </span>

                                    <span className="px-4 py-1 rounded-full bg-[rgba(27,26,26,0.7)] border border-[#333] text-white font-inter text-[14px] font-normal leading-normal">
                                        Reports
                                    </span>

                                    <span className="px-4 py-1 rounded-full bg-[rgba(27,26,26,0.7)] border border-[#333] text-white font-inter text-[14px] font-normal leading-normal">
                                        Web3
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="text-white font-sans text-[13px]! font-light leading-none! tracking-[0.13px] uppercase mb-2">
                                    14 May 2025
                                </p>

                                <h3 className="text-white font-sans text-[18px]! font-semibold leading-normal! mb-3">
                                    Web3 and Digital Assets: Beyond Hype and Token Prices
                                </h3>

                                <p className="text-white font-sans text-[12px]! font-normal leading-[18px]! mb-6">
                                    The past two years in crypto have been...
                                </p>

                                <p className="text-white text-left font-sans text-[12px]! font-normal leading-normal! capitalize">
                                    BY M. ElKhamisy
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex justify-center" data-aos="fade-up">
                        <button className="flex w-[200px] h-[50px] px-[49px] pt-[11px] pb-[15px] mb-[110px] mt-[50px]
    justify-center items-center shrink-0
    rounded-xl border border-[#5FC2D5]
    bg-[rgba(95,194,213,0.11)]
    text-[#5FC2D5] font-Arial text-[16px] font-normal leading-6">
                            Load More
                        </button>

                    </div>
                </div>
            </section>

            <section className="pb-[115px] bg-black relative [px-20px]">                                
                <div className="w-full">
                    <Image fill alt="" src="/form-box-blue-shadow.png"/>
                </div>

                <div className="container w-full flex justify-center" data-aos="fade-up">
                    <div className="max-w-[692px] lg:max-w-[792px] w-full py-[42px] md:px-[120px] px-5 rounded-3xl border border-[1.108px] border-[rgba(95,194,213,0.20)] form-box-bg md:bg-blog-banner-mob bg-cover bg-no-repeat with-overlay text-white relative z-10">
                        <h2 className="text-white font-sans text-[21px]! font-semibold leading-[29px]! mb-3.5 sm:text-left text-center">
                            Stay Updated
                        </h2>

                        <p className="text-white/80 font-sans text-[16px]! font-normal leading-6! max-w-2xl mb-[21px] sm:text-left text-center">
                            Join 10,000+ entrepreneurs receiving weekly insights on business
                            setup, Web3 innovation, and UAE opportunities.
                        </p>

                        <div className="mt-8 flex items-center gap-4 w-full border border-[1.108px] border-[rgba(95,194,213,0.30)] rounded-[16px] bg-black/40 px-4 py-[18px] sm:py-2">
                            <span className="text-white/40 text-xl">
                                <Mail />
                            </span>

                            <Input 
                                type="email" 
                                placeholder="Enter your email address"
                                className="flex-1 border-0 h-auto outline-none! pl-0 focus:outline-none! focus:shadow-none! focus-visible:shadow-none! bg-transparent text-white/50 placeholder-white/50 font-sans text-[14px] font-normal leading-none"
                            />

                            <Button type="button" className="px-6 text-xs!">Subscribe Now</Button>                      
                        </div>

                        <button className="px-3 md:px-6 py-3 rounded-[12px] bg-[#5FC2D5]
           text-black font-montserrat text-[14px] font-medium leading-[20px]
           transition block sm:hidden w-full mt-[10px] sm:mt-[0px]"
                        >
                            Subscribe Now
                        </button>

                        <div className="flex items-center sm:justify-center justify-start  gap-2 mt-4 text-white/50 
            font-montserrat text-[12px] font-normal leading-[18px] sm:text-center text-left">
                            <span>🔒 We respect your privacy. Unsubscribe anytime.</span>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    )
}