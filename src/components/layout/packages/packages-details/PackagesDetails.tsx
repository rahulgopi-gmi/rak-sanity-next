'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
import { PackageType } from '@/features/application/types/sanity';
import { Fragment } from 'react/jsx-runtime';
import Image from 'next/image';
import { formatPrice, normalizeArray } from '@/lib/helpers';

export default function PackagesDetails(
    { packages, view = false, currency }: 
    { packages?: PackageType[], view? :boolean, currency?: string, data?:any }
) {        

    const packageItems: PackageType[] = normalizeArray(packages);
    const sortedPackageItems = [...packageItems].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return (
        <Fragment>
            {
                view ?
                (
                    <div className="rounded-3xl package-compaigns-inner overflow-x-auto" data-aos="fade-up">
                        <div className="flex w-full"  data-aos="fade-up" data-aos-delay="200">
                                {
                                    sortedPackageItems.map((p: PackageType) => {   
                                        if (!currency) return null;
                                        const [currencyName, currencySymbol] = currency.split(" ");
                                        const selectedPrice = p?.prices?.find(
                                            (item) => item.currency === currencyName);

                                        return(
                                            <div 
                                                key={p.title}
                                                className="p-[30px] relative sm:min-w-[293px] min-w-[360px] col-min-w">
                                                <h2 className="text-white uppercase font-mono text-[28px]! leading-6! font-bold tracking-[-0.56px] mb-4">
                                                    {p?.title}
                                                </h2>

                                                <p className="text-[#ffffffcc] font-sans text-[14px]! leading-[21px]! font-normal tracking-[0.14px] mb-6 xl:min-h-max md:min-h-[126px] min-h-max ">
                                                    {p?.content}
                                                </p>

                                                <p className="text-white font-sans text-[14px]! leading-6! font-normal tracking-[0.14px] mb-1">
                                                    {p?.label}
                                                </p>

                                                <p className="text-white font-mono xl:text-[36px]! md:text-[30px]! text-[36px]!  xl:leading-10 md:leading-9 leading-10 font-bold mb-8">                                                   
                                                    {!currencySymbol ? 'AED' : currencySymbol}
                                                    &nbsp;
                                                    {
                                                        selectedPrice &&
                                                        (
                                                            formatPrice(selectedPrice?.price)
                                                        )
                                                    }                                                  
                                                </p>

                                                <div className="h-px rbf mt-4 last:hidden"></div>

                                                <div className="space-y-3 pt-2 w-full">
                                                    {
                                                        p.features.map((f, i: number) => (
                                                        <div className="w-full" key={f}>
                                                            <div className="flex items-center gap-[9px] min-h-[63px]">
                                                                <div className="w-[15px] h-[15px] relative">
                                                                    <Image fill alt="tic icon" src="/images/icons/tick-icon.svg" />
                                                                </div>
                                                                
                                                                <div className="w-full">
                                                                    <p className="text-[#ffffffcc] font-sans text-[14px]! leading-[21px]! font-normal tracking-[0.14px]!">{f}</p>
                                                                </div>
                                                            </div>

                                                            {
                                                                i !== p.features.length - 1 && (
                                                                    <div className="h-px rbf mt-4"></div>
                                                                )
                                                            }
                                                        </div>
                                                        ))
                                                    }                                                                                            
                                                </div>
                                            </div>
                                        )                                   
                                    })
                                }
                        </div>
                    </div>
                )
                :
                (
                    <div className="package-sec text-center relative">
                        <div className="container mx-auto" data-aos="fade-up" data-aos-delay="200">
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
                                        1400: { slidesPerView: 4, spaceBetween: 15 },
                                    }}
                                    className="package-swiper max-w-full mx-auto"
                                >
                                    {
                                            sortedPackageItems.map((p: PackageType) => {
                                                if (!currency) return null;                                                
                                                const selectedPrice = p?.prices?.find(
                                                    (item) => item.currency === currency);

                                                return(
                                                    <SwiperSlide key={p.title}>
                                                        <div className="swiper-slide-inner rounded-[20px] border border-[rgba(255,255,255,0.14)] bg-[linear-gradient(129deg,rgba(255,255,255,0.19)_8.15%,rgba(255,255,255,0.04)_93.89%)] backdrop-blur-[21.5px] min-h-[560px] sm:min-h-[610px] p-[23px] text-left max-w-[287px] mx-auto sm:max-w-none sm:mx-0">
                                                            <h4 className="text-white text-[16px]! font-sans font-normal uppercase mb-[25px]">
                                                                {p.title}
                                                            </h4>

                                                            <span className="text-white text-[14px] font-sans font-normal">
                                                                {p.label}
                                                            </span>

                                                            {
                                                                selectedPrice && (
                                                                    <h3 className="text-white text-[35px]! font-semibold mt-px mb-[17px] font-sans">
                                                                        {selectedPrice.currency} {formatPrice(selectedPrice.price)}
                                                                    </h3>
                                                                )
                                                            }
                                                            

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
                                                                            className="text-white text-[14px] leading-6 bg-[url('/images/icons/green-tick.svg')] bg-no-repeat bg-position-[0_6px] pl-[22px] font-sans font-normal"
                                                                        >
                                                                            {f}
                                                                        </li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                    </SwiperSlide>
                                                )
                                            }
                                        )
                                    }
                                </Swiper>
                            </div>

                            <div className="swiper-pagination relative"></div>
                        </div>
                    </div>
                )
            }
        </Fragment>        
    );
}
