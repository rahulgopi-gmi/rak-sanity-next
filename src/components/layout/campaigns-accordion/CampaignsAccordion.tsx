"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import { KeywordsType } from "@/features/application/types/sanity";
import { urlFor } from "@/sanity/lib/image";

type CampaignsAccordionProps = {
    data?: KeywordsType | KeywordsType[];
};

export default function CampaignsAccordion({ data }: CampaignsAccordionProps ) {    
    const items = Array.isArray(data) ? data : data ? [data] : [];
    const [active, setActive] = useState<string | any>("item-0");

    const handleValueChange = (value: string) => {
        setActive(value === active ? null : value);
    };

    return(
        <Accordion type="single" collapsible value={active} onValueChange={handleValueChange}>
            {
                items.map((items, index) => (
                    <AccordionItem key={`item-${items._key}`} value={`item-${index}`}>
                        {
                            (active === "item-"+ index) && (
                                <div className="lg:hidden w-full h-[250px] rounded-3xl overflow-hidden relative border border-white/20 mb-4 mt-8">
                                    <Image
                                        fill
                                        alt={items?.icon?.alt || ""}
                                        src={urlFor(items.icon).url()}
                                    />
                                </div>
                            )
                        }                        

                        <AccordionTrigger
                            className={`text-[24px]! font-mono! leading-7 font-bold ${active === "item-"+ index ? "text-white" : "text-white/60"
                                }`}
                        >{items.header}</AccordionTrigger>
                        <AccordionContent>                            
                            <p className="text-sm! leading-5! font-normal font-sans py-2 text-[#ffffffcc]">
                                {items.content}
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                ))
            }            
        </Accordion>
    )
}