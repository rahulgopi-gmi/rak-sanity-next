"use client";

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useRef, useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';

export default function SwiperArea() {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);

    useEffect(() => {
        if (!swiperInstance) return;
        swiperInstance.navigation.destroy();
        swiperInstance.navigation.init();
        swiperInstance.navigation.update();
    }, [swiperInstance]);

    return(        
        <div className="w-full">
            <div className="w-full flex">
                <div className="w-full life-swiper-hdr">
                    <h2 className="text-[45px]! text-white font-mono font-extrabold leading-11.75!">
                        <span>Your Ideal Home</span> in the Emirates
                    </h2>
                </div>

                <div className="w-fit">                    
                    <div className="w-full flex items-center gap-4 justify-center">
                        <Button type="button" ref={prevRef} className="swiper-button-prev swiper-btn-blog">
                            <svg width="19" height="13" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.6426 6.5L0.499721 6.5" stroke="#5FC2D5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M6.5 0.5L0.5 6.5L6.5 12.5" stroke="#5FC2D5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </Button>
                        <Button type="button" ref={nextRef} className="swiper-button-next swiper-btn-blog">
                            <svg width="19" height="13" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 6.5L17.6429 6.5" stroke="#5FC2D5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11.6426 0.5L17.6426 6.5L11.6426 12.5" stroke="#5FC2D5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </Button>
                    </div>                    
                </div>
            </div>  

            <div className="w-full pt-10">
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    slidesPerView={1}
                    spaceBetween={20}
                    loop
                    autoHeight
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        el: ".custom-pagination",
                        clickable: false,
                    }}
                    onBeforeInit={(swiper: SwiperClass) => {
                        if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }
                    }}                
                    breakpoints={{
                        768: { slidesPerView: 1 },
                        1024: { slidesPerView: 1 },
                        1200: { slidesPerView: 3 },
                    }}
                    onSwiper={setSwiperInstance}
                    className="mySwiper max-w-full mx-auto"
                >
                    <SwiperSlide>
                        <div className="relative w-full max-w-sm h-122 flex items-end">                                                      
                            <Image
                                alt=""
                                fill
                                src="/images/slide-img.png"
                                className="object-cover rounded-[20px]"
                            />
                            <Card className="relative mx-3 mb-3 p-0! bg-[#0000008c] border-none rounded-[20px] backdrop-blur-[21.5px] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-[20px] before:[background:linear-gradient(180deg,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none"> 
                                <CardContent className="p-4.75"> 
                                    <div className="flex flex-col gap-3.25"> 
                                        <h2 className="font-h6-large! font-semibold text-[#fefefe] text-[length:var(--h6-large-font-size)]! tracking-[var(--h6-large-letter-spacing)]! leading-[var(--h6-large-line-height)]! [font-style:var(--h6-large-font-style)]">64 km long pristine <br /> coastline</h2> 
                                        <p className="font-normal font-mono text-[#fefefe] text-[length:var(--small-font-size)]! tracking-[var(--small-letter-spacing)]! leading-[var(--small-line-height)]! [font-style:var(--small-font-style)]"> Nam efficitur, erat vitae dictum bibendum, ligula est ullamcorper nibh. </p>
                                    </div> 
                                </CardContent> 
                            </Card>
                        </div>
                    </SwiperSlide> 
                    <SwiperSlide>
                        <div className="relative w-full max-w-sm h-122 flex items-end">
                            <Image
                                alt=""
                                fill
                                src="/images/slide-img.png"
                                className="object-cover rounded-[20px]"
                            />
                            <Card className="relative mx-3 mb-3 p-0! bg-[#0000008c] border-none rounded-[20px] backdrop-blur-[21.5px] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-[20px] before:[background:linear-gradient(180deg,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none">
                                <CardContent className="p-4.75">
                                    <div className="flex flex-col gap-3.25">
                                        <h2 className="font-h6-large! font-semibold text-[#fefefe] text-[length:var(--h6-large-font-size)]! tracking-[var(--h6-large-letter-spacing)]! leading-[var(--h6-large-line-height)]! [font-style:var(--h6-large-font-style)]"> 64 km long pristine <br /> coastline
                                        </h2>
                                        <p className="font-normal font-mono text-[#fefefe] text-[length:var(--small-font-size)]! tracking-[var(--small-letter-spacing)]! leading-[var(--small-line-height)]! [font-style:var(--small-font-style)]"> Nam efficitur, erat vitae dictum bibendum, ligula est ullamcorper nibh. </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </SwiperSlide> 
                    <SwiperSlide>
                        <div className="relative w-full max-w-sm h-122 flex items-end">
                            <Image
                                alt=""
                                fill
                                src="/images/slide-img.png"
                                className="object-cover rounded-[20px]"
                            />
                            <Card className="relative mx-3 mb-3 p-0! bg-[#0000008c] border-none rounded-[20px] backdrop-blur-[21.5px] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-[20px] before:[background:linear-gradient(180deg,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none">
                                <CardContent className="p-4.75">
                                    <div className="flex flex-col gap-3.25">
                                        <h2 className="font-h6-large! font-semibold text-[#fefefe] text-[length:var(--h6-large-font-size)]! tracking-[var(--h6-large-letter-spacing)]! leading-[var(--h6-large-line-height)]! [font-style:var(--h6-large-font-style)]"> 64 km long pristine <br /> coastline
                                        </h2>
                                        <p className="font-normal font-mono text-[#fefefe] text-[length:var(--small-font-size)]! tracking-[var(--small-letter-spacing)]! leading-[var(--small-line-height)]! [font-style:var(--small-font-style)]"> Nam efficitur, erat vitae dictum bibendum, ligula est ullamcorper nibh. </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </SwiperSlide> 
                    <SwiperSlide>
                        <div className="relative w-full max-w-sm h-122 flex items-end">                                                      
                            <Image
                                alt=""
                                fill
                                src="/images/slide-img.png"
                                className="object-cover rounded-[20px]"
                            />
                            <Card className="relative mx-3 mb-3 p-0! bg-[#0000008c] border-none rounded-[20px] backdrop-blur-[21.5px] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-[20px] before:[background:linear-gradient(180deg,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none"> 
                                <CardContent className="p-4.75"> 
                                    <div className="flex flex-col gap-3.25"> 
                                        <h2 className="font-h6-large! font-semibold text-[#fefefe] text-[length:var(--h6-large-font-size)]! tracking-[var(--h6-large-letter-spacing)]! leading-[var(--h6-large-line-height)]! [font-style:var(--h6-large-font-style)]"> 64 km long pristine <br /> coastline 
                                        </h2> 
                                        <p className="font-normal font-mono text-[#fefefe] text-[length:var(--small-font-size)]! tracking-[var(--small-letter-spacing)]! leading-[var(--small-line-height)]! [font-style:var(--small-font-style)]"> Nam efficitur, erat vitae dictum bibendum, ligula est ullamcorper nibh. </p>
                                    </div> 
                                </CardContent> 
                            </Card>
                        </div>
                    </SwiperSlide> 
                </Swiper>
            </div>
        </div>        
    )
}