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

export default function BlogSwiper({ post }: PostType | any) {
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
                    1200: { slidesPerView: 1, spaceBetween:0 },
                }}
                onSwiper={setSwiperInstance}
                className="mySwiper max-w-full mx-auto"
            >

                {
                    post.map((posts: PostType,i:number)=> (
                        <SwiperSlide className="slide-custom cursor-pointer">
                            <Link key={posts?._id} href={`blog/${posts?.slug}`}>
                                <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                                    <div className="w-full md:h-full h-[520px]! relative overflow-hidden group rounded-2xl">
                                        <Image 
                                            fill alt={posts?.mainImage.alt} 
                                            src={urlFor(posts?.mainImage).url()}  
                                            className="rounded-2xl shadow-lg transition-transform duration-500 ease-out group-hover:scale-110 object-cover" 
                                        />
                                        <div className="absolute top-2 left-2">
                                            {
                                                posts?.categories?.length ? (
                                                    posts?.categories.map((cat: CategoryType) => (
                                                        <span
                                                            key={cat._id}
                                                            className="px-4 py-1 rounded-full bg-[rgba(27,26,26,0.7)] border border-[#333] text-white font-sans text-[14px] font-normal leading-normal">
                                                            {cat.title}
                                                        </span>
                                                    ))
                                                )
                                                :
                                                null
                                            }
                                        </div>
                                    </div>

                                    <div className="w-full px-8 xl:px-12 max-md:pt-4 max-md:pb-10 py-20 flex flex-col gap-y-0 lg:gap-y-3">
                                        <h3 className="text-[16px]! font-sans leading-[100%]! font-light text-white mb-6 mt-7 lg:mt-0 lg:mb-0">
                                            {formatDate(posts?.publishedAt)}
                                        </h3>
                                        
                                        <h2 className="text-white font-sans text-[18px]! xl:text-[22px]! leading-[normal]! font-semibold capitalize max-w-[380px]  mb-6 mt-0 lg:mt-0 lg:mb-0">
                                            {posts?.title}
                                        </h2>
                                                                            
                                        <div
                                            className="blog-content-view line-clamp-3"
                                            dangerouslySetInnerHTML={{ __html: getBodyText(posts?.body) }}
                                        >
                                        </div>

                                        <h4 className="text-[12px]! leading-[100%]! font-normal font-sans text-white capitalize mb-0">
                                            {posts?.author?.name || 'Unknown Author'}
                                        </h4>
                                    </div>
                                </div>
                            </Link>                                
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