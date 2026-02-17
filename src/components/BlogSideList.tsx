"use client";

import { scrollToId, slugify } from "@/sanity/lib/utils";
import Link from "next/link";
import { useState, useEffect } from "react";

interface ListProps {
    type: string;
    text: string;
}

export default function BlogSideList({ list }: { list : ListProps[] }) {

    const [activeId, setActiveId] = useState<string>("introduction");

    const handleClick = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        setActiveId(id); 
        scrollToId(id, 110);
    }

    const getLinkClasses = (id: string) =>
        `block px-4 py-2 rounded-[4px] text-[14px] font-sans font-normal leading-[21px] cursor-pointer ${activeId === id ? "bg-primary hover:bg-primary/70 text-black" : "text-[rgba(255,255,255,0.70)] hover:bg-primary hover:text-black"
        }`;

    useEffect(() => {
        const sectionIds = ["introduction", ...list.map((item) => slugify(item.text))];

        const handleScroll = () => {
        let closestId = "introduction";
        let closestDistance = Infinity;

        for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (!el) continue;

            const distance = Math.abs(el.getBoundingClientRect().top - 120); // 120 = offset
            if (distance < closestDistance) {
            closestDistance = distance;
            closestId = id;
            }
        }

        setActiveId(closestId);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [list]);    

    return(
        <ul className="space-y-2">
            <li>
                <Link 
                    onClick={(e) => handleClick("introduction", e)} 
                    href={'#introduction'}
                    className={getLinkClasses("introduction")}
                >
                    Introduction
                </Link>
            </li>

            {
                list.map((items, index) => (
                    <li key={`list-${index}`}>
                        <Link
                            onClick={(e) => handleClick(slugify(items.text), e)}
                            href={`#${slugify(items.text)}`}
                            className={getLinkClasses(slugify(items.text))}
                        >
                            {items.text}
                        </Link>
                    </li>
                ))
            }  
        </ul>
    )
}