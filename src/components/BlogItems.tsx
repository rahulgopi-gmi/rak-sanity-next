"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { CategoryType, PostType } from "@/features/application/types/sanity";
import { useMemo, useState } from "react";
import BlogList from "./BlogList";

interface BlogItemsProps {
    posts: PostType[];
    categories?: CategoryType[];
    initialCount?: number;
    loadMoreCount?: number;
}

const DEFAULT_COUNT = 9;

export default function BlogItems(
    { posts, categories = [], initialCount = DEFAULT_COUNT , loadMoreCount = DEFAULT_COUNT }: BlogItemsProps) {          
    
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);    
    const [visibleCount, setVisibleCount] = useState<number>(initialCount);
    const [loading, setLoading] = useState<boolean>(false);
    

    const filteredPosts = useMemo(() => {
        if (selectedCategories.length === 0) return posts;

        return posts.filter((post) =>
            post.categories?.some((cat: CategoryType) =>
                selectedCategories.includes(cat._id)
            )
        );
    }, [posts, selectedCategories]);

    const handleLoadMore = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setVisibleCount((count) => Math.min(count + loadMoreCount, posts.length));
        }, 1000);        
    };

    const handleCategorySelect = (categoryId: string) => {
        setVisibleCount(initialCount); 
        if (categoryId === "all") {
            setSelectedCategories([]);
        }
        else {
            setSelectedCategories((prev) =>
                prev.includes(categoryId)
                    ? prev.filter((id) => id !== categoryId)
                    : [...prev, categoryId]
            );
        }
    }

    return(
        <div className="w-full">             
            {
                categories.length > 0 && (
                    <div className="categories-section flex overflow-auto gap-3 xl:gap-4 whitespace-nowrap lg:whitespace-normal lg:flex-wrap mb-6">
                        <Button 
                            type="button"
                            onClick={() => handleCategorySelect("all")}
                            variant={
                                selectedCategories.length === 0 ? 'default' : 'outline'
                            }
                            className="                                
                                categories-all-btn rounded-full! w-fit px-6! font-normal capitalize"                            
                            >
                            All
                        </Button>
                    
                        {
                            categories.map((category: CategoryType) => (
                                <Button
                                    key={category._id}
                                    type="button"
                                    variant={selectedCategories.includes(category._id) ? 'default' : 'outline'}
                                    onClick={() => handleCategorySelect(category._id)}
                                    className="rounded-full! w-fit px-6! font-normal capitalize categories-btn"
                                >
                                    {category.title}
                                </Button>
                            ))
                        }
                    </div>
                )
            }                           
                                    
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    filteredPosts.slice(0, visibleCount).map((post: PostType, index: number) => (
                        <BlogList
                            posts={post}
                            key={index}
                        />                        
                    ))
                }
            </div>  
            
            {               
                    loading ? (
                        <div className="flex justify-center items-center pt-20">
                            <Spinner />
                        </div>
                    )
                    :                    
                    visibleCount < posts.length && 
                    (
                        <div className="w-full flex justify-center pt-12">
                            <Button
                                type="button"
                                onClick={handleLoadMore}
                                className="blog-load-more rounded-[8px] w-44! h-12.5! font-arial font-normal border border-[#5FC2D5] bg-[rgba(95,194,213,0.11)] text-primary leading-6 tracking-[0] hover:text-white"
                            >
                                Load More
                            </Button>
                        </div>
                    )
            }
        </div>
    )
}