"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { KeywordsType } from '@/features/application/types/sanity';
import { urlFor } from '@/sanity/lib/image';
import { getBodyText } from '@/sanity/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BlogSwiper({ keywords }: KeywordsType | any) {
    const prevRef = useRef(null);
    const nextRef = useRef(null); 
    const [swiperInstance, setSwiperInstance] = useState<any>(null);

    useEffect(() => {
        if (!swiperInstance) return;
        swiperInstance.params.navigation.prevEl = prevRef.current;
        swiperInstance.params.navigation.nextEl = nextRef.current;
        swiperInstance.navigation.destroy();
        swiperInstance.navigation.init();
        swiperInstance.navigation.update();
    }, [swiperInstance]);

    return(
        <div className="w-full">
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
                onSwiper={setSwiperInstance}
                className="mySwiper max-w-full mx-auto"
            >

                {
                    keywords.map((s: KeywordsType,i:number)=> (
                        <SwiperSlide className="slide-custom">
                            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                                <div className="w-full h-full relative">
                                    <Image fill alt={s?.icon.alt} src={urlFor(s?.icon).url()}  className="rounded-2xl shadow-lg" />
                                </div>

                                <div className="w-full px-8 xl:px-12 py-20 flex flex-col gap-y-0 lg:gap-y-4">
                                    <h3 className="text-[16px]! leading-[normal]! font-light text-white mb-6 mt-7 lg:mt-0 lg:mb-0">
                                        {s?.date}
                                    </h3>
                                    
                                    <h2 className="text-white text-[18px]! xl:text-[22px]! leading-[normal]! font-semibold capitalize max-w-[380px]  mb-6 mt-0 lg:mt-0 lg:mb-0">
                                        {s?.header}
                                    </h2>
                                    
                                    <p 
                                        dangerouslySetInnerHTML={{ __html: getBodyText(s?.body) }}
                                        className="text-white text-[16px]! font-sans font-normal leading-[21px]! max-w-[500px] lg:mb-0 mb-7"
                                    >                                        
                                    </p>

                                    <h4 className="text-[12px]! leading-[normal]! font-normal font-sans text-white capitalize mb-10 lg:mb-0">
                                        {s?.subtitle}
                                    </h4>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            <div className="w-full flex items-center gap-4 mt-6 justify-center">
                <Button type="button" ref={prevRef} className="swiper-button-prev swiper-btn-blog">
                    <ArrowLeft/>
                </Button>

                <Button type="button" ref={nextRef} className="swiper-button-next swiper-btn-blog">
                    <ArrowRight />
                </Button>
            </div>
            
        </div>
    )
}