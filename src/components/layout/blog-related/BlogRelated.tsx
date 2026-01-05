"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CategoryType, KeywordsType, PostType } from '@/features/application/types/sanity';
import { urlFor } from '@/sanity/lib/image';
import { getBodyText } from '@/sanity/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/date';
import Link from 'next/link';
import BlogList from '../blog-list/BlogList';

export default function BlogRelated({ post }: PostType | any) {
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
                    1200: { slidesPerView: 3 },
                }}
                onSwiper={setSwiperInstance}
                className="mySwiper max-w-full mx-auto"
            >

                {
                    post.map((posts: PostType, index:number)=> (
                        <SwiperSlide className="slide-custom cursor-pointer h-full">
                            <BlogList
                                posts={posts}
                                key={index}
                            />
                        </SwiperSlide>                        
                    ))
                }
            </Swiper>

            {
                post.length > 1 && (
                    <div className="w-full flex items-center gap-4 mt-6 justify-center">
                        <Button type="button" ref={prevRef} className="swiper-button-prev swiper-btn-blog">
                            <svg width="19" height="13" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.6426 6.5L0.499721 6.5" stroke="#5FC2D5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M6.5 0.5L0.5 6.5L6.5 12.5" stroke="#5FC2D5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                        </Button>

                        <Button type="button" ref={nextRef} className="swiper-button-next swiper-btn-blog">                   
                            <svg width="19" height="13" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 6.5L17.6429 6.5" stroke="#5FC2D5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11.6426 0.5L17.6426 6.5L11.6426 12.5" stroke="#5FC2D5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </Button>
                    </div>
                )
            }            
        </div>
    )
}