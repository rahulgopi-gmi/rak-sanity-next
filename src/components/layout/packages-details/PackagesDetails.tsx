'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
import { PackageType } from '@/features/application/types/sanity';

export default function PackagesDetails({ packages }: { packages : any }) {    

    const packageItems: PackageType[] = Array.isArray(packages)
        ? packages
        : packages
            ? [packages]
            : [];

    return (
        <div className="package-sec text-center relative">
            <div className="container mx-auto">
                <div className='w-full'>
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        slidesPerView={1}
                        spaceBetween={30}
                        loop
                        autoHeight
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1200: { slidesPerView: 4 },
                        }}
                        className="mySwiper max-w-full mx-auto"
                    >
                        {
                            packageItems.map((p: PackageType, index: number) => ( 
                                <SwiperSlide key={p._id}>
                                    <div className="rounded-[20px] border border-[rgba(255,255,255,0.14)] bg-[linear-gradient(129deg,rgba(255,255,255,0.19)_8.15%,rgba(255,255,255,0.04)_93.89%)] backdrop-blur-[21.5px] min-h-[560px] sm:min-h-[660px] p-[23px] text-left max-w-[287px] mx-auto sm:max-w-none sm:mx-0">
                                        <h4 className="text-white text-[16px]! font-sans font-normal uppercase mb-[25px]">
                                            {p.title}
                                        </h4>

                                        <span className="text-white text-[14px] font-sans font-normal">
                                            {p.label}
                                        </span>

                                        <h3 className="text-white text-[35px]! font-semibold mt-px mb-[17px] font-sans">
                                            {p.currency} {p.price}
                                        </h3>

                                        <Link
                                            href={`#${p.ctaLink}`}
                                            className="signup-button border border-[rgba(255,255,255,0.08)] text-black text-[14px] font-sans bg-[#6FCCDD] font-semibold uppercase h-[45px] rounded-lg shadow-[inset_0_0_14px_rgba(255,255,255,0.19)] flex justify-center items-center hover:bg-white transition mb-2">
                                            {p.ctaText}
                                        </Link>

                                        <h5 className="text-[rgba(255,255,255,0.6)] text-[12px]! font-normal capitalize text-center mb-[18px] font-sans">
                                            billed {p.billingCycle}
                                        </h5>

                                        <h6 className="border-t border-[rgba(255,255,255,0.18)] pt-[15px] text-white text-[14px] font-semibold mb-[18px] font-sans">
                                            {p.sectionTitle}
                                        </h6>

                                        <ul className="">
                                            {
                                                p.features.map((f, i: number) => ( 
                                                    <li
                                                        key={`features-${i}`}
                                                        className="text-white text-[14px] leading-6 bg-[url('/green-tick.svg')] bg-no-repeat bg-position-[0_6px] pl-[22px] font-sans font-normal"
                                                    >
                                                        {f}
                                                    </li>
                                                ))
                                            }    
                                        </ul>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>

                <div className="swiper-pagination relative"></div>                
            </div>
        </div>
    );
}
