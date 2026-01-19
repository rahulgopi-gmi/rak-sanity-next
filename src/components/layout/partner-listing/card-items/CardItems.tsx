"use client";

import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { keywordsitems } from "@/features/application/types/sanity";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import PillTag from "@/components/ui/pill-tag";
import FilterDropdown from "../filter-dropdown/FilterDropdown";  // make sure this supports multi-select
import { FilterIcon, SearchIcon } from "lucide-react";

type Props = {
  list: keywordsitems[];
  filterOptions?: { label: string; value: string }[];
};

const ITEMS_PER_LOAD = 6;

export default function CardItems({ list, filterOptions }: Props) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const handleLoadMore = () => setVisibleCount((prev) => prev + ITEMS_PER_LOAD);

  const handleSearchChange = (text: string) => {
    setSearchText(text.toLowerCase());
    setVisibleCount(ITEMS_PER_LOAD);
  };

  const filteredList = useMemo(() => {
    return list.filter((item) => {
      const badgeSlug = item.badge?.toLowerCase().replace(/\s+/g, "-") || "";

      const matchesFilter =
        selectedFilters.length === 0 || 
        selectedFilters.includes(badgeSlug);

      const matchesSearch =
        !searchText ||
        item.title?.toLowerCase().includes(searchText) ||
        item.content?.toLowerCase().includes(searchText) ||
        item.badge?.toLowerCase().includes(searchText);

      return matchesFilter && matchesSearch;
    });
  }, [selectedFilters, searchText, list]);

  const visibleItems = filteredList.slice(0, visibleCount);

  return (
    <div className="w-full">      
      <div className="w-full flex gap-6 pt-12 flex-col md:flex-row">
        <div className="w-full max-w-249 h-12.5">
          <Card className="w-full h-full bg-[#ffffff17] py-0 border border-[#ffffff2e]">
            <CardContent className="p-0">
              <div className="w-full relative">
                <Input
                  type="text"
                  placeholder="Search for a Partner"
                  className="pl-12 h-12.5 pr-12 text-white text-sm! bg-transparent border-0"
                  onChange={(e) => handleSearchChange(e.target.value)}
                  value={searchText}
                />
                <SearchIcon className="text-[#A3A3A3] size-5 absolute left-4 max-md:right-8 top-6.5 -translate-y-1/2 pointer-events-none" />
              </div>
            </CardContent>
          </Card>
        </div>

        {filterOptions && (
          <div className="w-45 h-12.5">
            <Card className="w-full h-full bg-[#5fc2d5] rounded-lg shadow-[inset_0px_0px_14px_#fefefe30] border-0 py-0">
              <CardContent className="p-0 h-full">
                <FilterDropdown
                  buttonLabel="Filter"
                  buttonIcon={<FilterIcon size={16} />}
                  showHeader={true}
                  showClear={true}
                  items={filterOptions ?? []}
                  selectedValues={selectedFilters} 
                  onChange={(values) => {
                    setSelectedFilters(values);
                    setVisibleCount(ITEMS_PER_LOAD);
                  }}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>

        {
            visibleItems.length === 0 ? 
            (
                <div className="w-full text-center py-20 text-gray-400 text-sm font-semibold">
                    Not found matching your criteria.
                </div>
            ) 
            : 
            (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
                    {
                        visibleItems.map((re, index) => (
                            <Card
                                key={re.slug?.current ?? index}
                                className="w-full h-full rounded-[20px] border border-[#ffffff24] bg-[linear-gradient(129deg,rgba(255,255,255,0.11)_0%,rgba(255,255,255,0.04)_100%)] bg-transparent! backdrop-blur-sm"
                            >
                                <CardContent className="h-full w-full">
                                    <div className="w-full flex gap-3">
                                        <Avatar className="w-15.5 h-15.5 rounded-[10px]">
                                        <AvatarImage
                                            className="w-15 h-15 object-cover"
                                            alt={re.image?.alt ?? "Image"}
                                            src={urlFor(re.image) || ""}
                                        />
                                        <AvatarFallback className="w-15 h-15">
                                            <Image
                                            fill
                                            src={urlFor(re.image) || ""}
                                            alt={re.image?.alt ?? "Image"}
                                            />
                                        </AvatarFallback>
                                        </Avatar>

                                        <div className="w-full h-15.5 flex items-center">
                                        <h3 className="font-sans font-semibold text-white text-lg! tracking-[0] leading-[normal]">
                                            {re.title}
                                        </h3>
                                        </div>
                                    </div>

                                    {
                                        re.badge && (
                                            <div className="w-full pt-7.5">
                                                <PillTag className="capitalize" variant="other">
                                                    {re.badge}
                                                </PillTag>
                                            </div>
                                        )
                                    }

                                    <div className="w-full h-full pt-7">
                                        <p className="font-sans font-normal text-[#d5d5d5] text-base! tracking-[0]! leading-[normal]!">
                                        {re.content}
                                        </p>
                                        {re.slug?.current && (
                                        <div className="w-39.75 h-10.5 mt-5.5">
                                            <Link href={`/partners-listing/${re.slug.current}`}>
                                            <Button type="button" className="w-full h-full text-xs!">
                                                {re.ctaName ?? "Learn More"}
                                            </Button>
                                            </Link>
                                        </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    )}
                </div>
            )
        }

      {
        visibleCount < filteredList.length && (
            <div className="w-full flex justify-center py-12">
            <Button
                type="button"
                onClick={handleLoadMore}
                className="blog-load-more rounded-lg w-44! h-12.5! font-arial font-normal border border-[#5FC2D5] bg-[rgba(95,194,213,0.11)] text-[#5FC2D5] leading-6 tracking-[0] hover:text-white"
            >
                Load More
            </Button>
            </div>
        )
      }
    </div>
  );
}
