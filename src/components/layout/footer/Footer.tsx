import { PageSettingsType } from "@/features/application/types/sanity";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";

interface HeaderProps {
  settings : PageSettingsType 
}

export default function Footer({ settings }: HeaderProps) {

    const socials = settings?.socialLinks || [];
    const footerMenu = settings?.footerMenu || [];    

    return(
        <footer
            className="bg-[#1F1F1F] text-center py-8 md:py-6 text-[rgba(255,255,255,0.53)] font-montserrat text-md font-normal leading-normal">
            <div className="container">
                <div className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-4 justify-center md:justify-between items-center lg:items-start">
                    <div className="inline-flex gap-6 order-1 md:order-2">

                        {
                            socials.map((s,i) =>{
                                if (!s?.icon?.asset) return null; 

                                return(
                                    <Link 
                                        key={s.platform || i}
                                        href={s?.url || "#"} 
                                        rel="noopener noreferrer" 
                                        target="_blank" 
                                        className="flex mr-0"
                                    >
                                        <div className="w-4 h-4 hover:opacity-50 cursor-pointer relative">
                                            <Image 
                                                src={urlFor(s?.icon).url()}
                                                fill
                                                alt={s?.platform || ""}
                                                className="object-contain"
                                            />
                                        </div>
                                    </Link>
                                )
                            })
                        }                        
                    </div>

                    <p className="order-2 md:order-1 font-montserrat text-sm! leading-normal block">
                        &copy; {new Date().getFullYear()} {settings?.siteName}. All Rights Reserved.
                    </p>

                    <div className="order-3 md:order-3 flex gap-3 items-center">
                        {
                            footerMenu.map((f,i)=>(
                                <Fragment key={f?.label || i}>
                                    <Link 
                                        href={f?.url || "#"} 
                                        target="_blank"
                                        className="hover:opacity-50 cursor-pointer no-underline text-[rgba(255,255,255,0.53)] font-montserrat text-[14px] font-normal leading-normal hover:text-[rgba(255,255,255,0.8)]"
                                    >
                                        {f?.label}
                                    </Link>
                                    <span className="last:hidden">|</span>
                                </Fragment>
                            ))
                        }                                                                
                    </div>
                </div>
            </div>
        </footer>
    )
}