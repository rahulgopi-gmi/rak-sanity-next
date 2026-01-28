"use client";
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CategoryType, PostType } from '@/features/application/types/sanity';
import { urlFor } from '@/sanity/lib/image';
import { getBodyText } from '@/sanity/lib/utils';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/date';
import Link from 'next/link';

export default function BlogSwiper({ post }: { post: PostType[] }) {
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
                // navigation={{
                //     prevEl: prevRef.current,
                //     nextEl: nextRef.current,
                // }}
                onBeforeInit={(swiper: SwiperClass) => {
                    if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }
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
                    post.map((posts: PostType)=> (
                        <SwiperSlide key={posts?._id} className="slide-custom cursor-pointer">
                            <Link  href={`blog/${posts?.slug}`}>
                                <div className="grid grid-cols-1 lg:grid-cols-5 items-center">
                                    <div className="w-full col-span-3 md:h-full h-125! relative overflow-hidden group rounded-2xl">                                       
                                        {
                                            posts?.mainImage && (
                                                <Image
                                                    fill alt={posts?.mainImage.alt || ""}
                                                    src={urlFor(posts?.mainImage) || ""}
                                                    className="rounded-2xl shadow-lg transition-transform duration-500 ease-out group-hover:scale-110 object-cover"
                                                />
                                            )
                                        }
                                        
                                        <div className="absolute top-2 left-2">
                                            {
                                                posts?.categories?.length ? (
                                                    posts?.categories.map((cat: CategoryType) => (
                                                        <span
                                                            key={cat._id}
                                                            className="px-4 py-1 rounded-full bg-neutral-900/70 border border-gray-800 text-white font-sans text-sm font-normal leading-normal!">
                                                            {cat.title}
                                                        </span>
                                                    ))
                                                )
                                                :
                                                null
                                            }
                                        </div>
                                    </div>

                                    <div className="w-full col-span-2 px-8 xl:px-12 max-md:pt-4 max-md:pb-10 py-20 flex flex-col gap-y-0 lg:gap-y-3">
                                        <h3 className="text-base! font-sans leading-[100%]! font-light text-white mb-6 mt-7 lg:mt-0 lg:mb-0">
                                            {formatDate(posts?.publishedAt)}
                                        </h3>
                                        
                                        <h2 className="text-white font-sans text-lg! xl:text-22! leading-[normal]! font-semibold capitalize max-w-95 mb-6 mt-0 lg:mt-0 lg:mb-0">
                                            {posts?.title}
                                        </h2>
                                                                            
                                        <div
                                            className="blog-content-view line-clamp-3"
                                            dangerouslySetInnerHTML={{ __html: getBodyText(posts?.body) }}
                                        >
                                        </div>

                                        <h4 className="text-xs! leading-[100%]! font-normal font-sans text-white capitalize mb-0">
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
                                <path d="M17.6426 6.5L0.499721 6.5" stroke="#5FC2D5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M6.5 0.5L0.5 6.5L6.5 12.5" stroke="#5FC2D5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Button>

                        <Button type="button" ref={nextRef} className="swiper-button-next swiper-btn-blog">                   
                            <svg width="19" height="13" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 6.5L17.6429 6.5" stroke="#5FC2D5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M11.6426 0.5L17.6426 6.5L11.6426 12.5" stroke="#5FC2D5" strokeLinecap="round" stroke-linejoin="round" />
                            </svg>
                        </Button>
                    </div>
                )
            }            
        </div>
    )
}