"use client";

import { scrollToId, slugify } from "@/sanity/lib/utils";
import Link from "next/link";
import { useState } from "react";

interface ListProps {
    type: string;
    text: any;
}

export default function BlogSideList({ list }: { list : ListProps[] }) {

    const [activeId, setActiveId] = useState<string>("introduction");

    const handleClick = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        setActiveId(id); 
        scrollToId(id, 110);
    }

    const getLinkClasses = (id: string) =>
        `block px-4 py-2 rounded-lg text-[14px] font-sans font-normal leading-[21px] cursor-pointer ${activeId === id ? "bg-primary hover:bg-primary/70 text-black" : "text-[rgba(255,255,255,0.70)] hover:bg-primary hover:text-black"
        }`;

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