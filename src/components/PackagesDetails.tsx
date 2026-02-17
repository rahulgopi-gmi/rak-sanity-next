'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
import { PackageType } from '@/features/application/types/sanity';
import { Fragment } from 'react';
import Image from 'next/image';
import { formatPrice, normalizeArray } from '@/lib/helpers';
import { Card, CardContent } from './ui/card';

export default function PackagesDetails(
    { packages, view = false, currency }: 
    { packages?: PackageType[], view? :boolean, currency?: string }
) {            
    const packageItems: PackageType[] = normalizeArray(packages);
    const sortedPackageItems = [...packageItems].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    const handleCTA = (e: React.MouseEvent<HTMLAnchorElement>, id?:string) => {
        e.preventDefault();
        if (!id) return;
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.focus({ preventScroll: true });    
        history.replaceState(null, "", `#${id}`);
    }

    return (
        <Fragment>
            {
                view ?
                (
                    <div className="rounded-3xl package-compaigns-inner overflow-x-auto">
                        <div className="flex w-full">
                                {
                                    sortedPackageItems.map((p: PackageType) => {   
                                        if (!currency) return null;
                                        const [currencyName, currencySymbol] = currency.split(" ");
                                        const selectedPrice = p?.prices?.find(
                                            (item) => item.currency === currencyName);

                                        return(
                                            <Card
                                                key={p.title}
                                                className="p-7.5 bg-transparent border-0 relative sm:min-w-73.25 min-w-90 col-min-w"
                                            >
                                                <CardContent className="p-0">
                                                    <h2 className="text-white uppercase font-mono text-28! leading-6! font-bold tracking-05 mb-4">
                                                        {p?.title}
                                                    </h2>

                                                    <p className="text-white/80 font-sans text-sm! leading-5.25! font-normal tracking-014 mb-6 xl:min-h-max md:min-h-31.5 min-h-max">
                                                        {p?.content}
                                                    </p>

                                                    <p className="text-white font-sans text-sm! leading-6! font-normal tracking-014 mb-1">
                                                        {p?.label}
                                                    </p>

                                                    <p className="text-white font-mono md:text-30px! text-36! xl:leading-10 md:leading-9 leading-10 font-bold mb-8">                                                   
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
                                                                <div className="flex items-center gap-2.25 min-h-15.75">
                                                                    <div className="w-3.75 h-3.75 relative">
                                                                        <Image fill alt="tic icon" src="/images/icons/tick-icon.svg" />
                                                                    </div>
                                                                    
                                                                    <div className="w-full">
                                                                            <p className="text-white/80 font-sans text-sm! leading-5.25! font-normal tracking-014!">{f}</p>
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
                                                </CardContent>    
                                            </Card>
                                        )                                   
                                    })
                                }
                        </div>
                    </div>
                )
                :
                (
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
                                                        <Card className="swiper-slide-inner rounded-20 bg-transparent! border border-white/15 bg-[linear-gradient(129deg,rgba(255,255,255,0.19)_8.15%,rgba(255,255,255,0.04)_93.89%)] backdrop-blur-21 min-h-155! p-5.75 text-left max-w-71.75 max-md:max-w-full mx-auto sm:max-w-none sm:mx-0">
                                                            <CardContent className="p-0 w-full bg-transparent">
                                                                <h4 className="text-white text-base! font-sans font-normal uppercase mb-6.25">
                                                                    {p.title}
                                                                </h4>

                                                                <span className="text-white text-sm font-sans font-normal">
                                                                    {p.label}
                                                                </span>

                                                                {
                                                                    selectedPrice && (
                                                                        <h3 className="text-white text-35! font-semibold mt-px mb-4.25 font-sans">
                                                                            {selectedPrice.currency} {formatPrice(selectedPrice.price)}
                                                                        </h3>
                                                                    )
                                                                }
                                                            
                                                                {
                                                                    p.ctaLink && (
                                                                        <Link
                                                                            href={`#${p.ctaLink}`}
                                                                            onClick={(e) => handleCTA(e, p.ctaLink!)}
                                                                            className="signup-button border border-white/8 text-black text-sm font-sans bg-primary font-semibold uppercase h-11.25 rounded-lg shadow-[inset_0_0_14px_rgba(255,255,255,0.19)] flex justify-center items-center hover:bg-white transition mb-2">
                                                                            {p.ctaText}
                                                                        </Link>
                                                                    )
                                                                }                                                                

                                                                <h5 className="text-white/60 text-xs! font-normal capitalize text-center mb-4.5 font-sans">
                                                                    billed {p.billingCycle}
                                                                </h5>

                                                                <h6 className="border-t border-white/8 pt-3.75 text-white text-sm font-semibold mb-4.5 font-sans">
                                                                    {p.sectionTitle}
                                                                </h6>

                                                                <ul>
                                                                    {
                                                                        p.features.map((f, i: number) => (
                                                                            <li
                                                                                key={`features-${i}`}
                                                                                className="text-white text-sm leading-6 bg-[url('/images/icons/green-tick.svg')] bg-no-repeat bg-position-[0_6px] pl-5.5 font-sans font-normal"
                                                                            >
                                                                                {f}
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            </CardContent>    
                                                        </Card>
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
