import { CategoryType, PostType } from "@/features/application/types/sanity";
import { formatDate } from "@/lib/date";
import { urlFor } from "@/sanity/lib/image";
import { getBodyText } from "@/sanity/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface BlogItemsProps {
    posts?: PostType;
}

export default function BlogList({ posts }: BlogItemsProps){
    return(        
        <Link key={posts?._id} href={`blog/${posts?.slug}`}>
            <div className="blog-card  h-full bg-[#0F0F0F] border border-[#1F1F1F] rounded-3xl overflow-hidden shadow-lg">
                <div className="relative w-full">
                    <div className="w-full h-[250px] relative">
                        <Image
                            fill
                            alt={posts?.mainImage?.alt || posts?.title}
                            src={urlFor(posts?.mainImage).url()}
                        />
                    </div>

                    <div className="absolute top-4 left-4 flex gap-3">
                        {
                            posts?.categories?.length ? (
                                posts?.categories.map((cat: CategoryType) => (
                                    <span
                                        key={cat._id}
                                        className="px-4 py-1 rounded-full bg-[rgba(27,26,26,0.7)] border border-[#333] text-white font-inter text-[14px] font-normal leading-normal">
                                        {cat.title}
                                    </span>
                                ))
                            )
                            :
                            null
                        }
                    </div>
                </div>

                <div className="p-6 w-full h-full">
                    <p className="text-white font-sans text-[13px]! font-light leading-none! tracking-[0.13px] uppercase mb-2">
                        {formatDate(posts?.publishedAt)}
                    </p>

                    <h3 className="text-white font-sans text-[18px]! capitalize font-semibold leading-normal! mb-3 line-clamp-1">
                        {posts?.title}
                    </h3>

                    <div
                        className="blog-content-view line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: getBodyText(posts?.body) }}
                    >
                    </div>

                    <p className="text-white mt-2 text-left font-sans text-[12px]! font-normal leading-none! capitalize">
                        BY {posts?.author?.name || 'Unknown Author'}
                    </p>
                </div>
            </div>
        </Link>
    )
}