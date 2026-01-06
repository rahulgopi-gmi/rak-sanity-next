"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../ui/button";
import { HeaderMenuChild, PageSettingsType } from "@/features/application/types/sanity";
import { urlFor } from "@/sanity/lib/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface HeaderProps {
  settings : PageSettingsType 
}

export default function Header({ settings }: HeaderProps) {
  const headerContentRef = useRef<HTMLDivElement>(null);
  const headerInnerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();  

  const menu = settings?.headerMenu || [];
  const logo = settings?.logo;
  const socials = settings?.socialLinks || [];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const headerContent = headerContentRef.current;
          const headerInner = headerInnerRef.current;
          if (!headerContent || !headerInner) return;

          const scrollY = window.scrollY || window.pageYOffset;
          const isMobile = window.matchMedia("(max-width: 768px)").matches;

          if (isMobile) {
            if (scrollY > 50) {
              headerContent.style.width = "100%";
              headerInner.style.paddingLeft = "1rem";
              headerInner.style.paddingRight = "1rem";

              headerContent.classList.remove(
                "rounded-bl-lg",
                "rounded-br-lg",
                "mx-auto"
              );
              headerContent.classList.add("border-rd-13");
            } else {
              headerInner.style.paddingLeft = "0";
              headerInner.style.paddingRight = "0";
              headerContent.classList.remove("border-rd-13");
            }
          } else {
            if (scrollY > 50) {
              headerContent.style.width = "94%";
              headerInner.style.paddingLeft = "3rem";
              headerInner.style.paddingRight = "3rem";

              headerContent.classList.add(
                "rounded-bl-lg",
                "rounded-br-lg",
                "mx-auto"
              );
            } else {
              headerContent.style.width = "100%";
              headerInner.style.paddingLeft = "0";
              headerInner.style.paddingRight = "0";
            }
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const handleHamberger = () => {
    setIsOpen(true);
  }

  const handleMenuClose = () => {
    setIsOpen(false);
  }

  return (
    <header className="fixed top-0 z-50 w-full flex items-center">
      <div ref={headerInnerRef} className="transition-all duration-300 w-full">
        <div ref={headerContentRef} className="bg-black/40 border backdrop-blur-lg border-white/10 px-4 lg:px-5 transition-all duration-500 ease-in-out max-md:py-4">
          <div className="container flex justify-between items-center">
            <div className="flex items-center space-x-12 relative w-full">
              <Link
                href="/"
                className="main-logo mr-0 relative h-10 w-32 lg:w-[240px] lg:h-14 py-4"
              >
                {
                  logo?.asset && (
                    <Image
                      src={urlFor(logo).url()}
                      fill
                      alt={logo.alt || "Innovation City Logo"}
                      className="transition-all duration-500 ease-in-out"
                    />
                  )
                }
              </Link>

              <ul className="hidden md:flex space-x-12 justify-start ml-12 max-lg:ml-6 max-lg:space-x-6 w-full">
                {
                  menu.map((item) => {
                    const slug = item.slug?.current || "";
                    const isContact = slug === "contact";
                    const isActive = pathname === `/${slug}`;

                    return (
                      <li key={item.label} className={`${item?.children ? 'group' : ''} py-5.5 flex items-center last:ml-auto relative`}>
                        {
                          isContact ? (                          
                            <Link href={`/${slug}`}>
                              <Button size="sm">GET STARTED</Button>
                            </Link>
                          ) 
                        : 
                          (                          
                            <Link
                              href={`/${slug}`}
                                className={`transition-all ease-in  font-sans text-md md:max-lg:text-sm! font-semibold`}
                            >
                                <span className={`${isActive ? 'text-primary' : 'text-white hover:text-primary'} w-full flex items-center gap-3`}>
                                {item.label}
                                {item?.children && <ChevronDown size={14}/>}
                              </span>
                              {
                                item?.children && 
                                <ul className="absolute px-3 py-4 top-full left-0 w-56 bg-black/50 border border-white/10 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                  {                                    
                                      item?.children.map((child: HeaderMenuChild) => (
                                        <li>
                                          <Link className="text-white hover:text-primary" href={`/${child.label}`}>{child.label}</Link>
                                        </li>
                                      ))                                    
                                  }                                  
                                </ul>
                              }
                            </Link>
                          )
                        }
                      </li>
                    );
                  })
                }
              </ul>
            </div>

            <div className="md:hidden flex items-center">
              <Button 
                type="button"
                variant={'link'}
                className="text-white w-6 h-6 px-0 relative cursor-pointer" 
                onClick={handleHamberger}
              >
                <Image src={"/hamburger-menu.svg"} fill alt="menu icon" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {
        isOpen &&
        (
          <div id="mobileMenu" className="flex flex-col h-screen items-center text-white pr-9 pl-9 pt-[100px] absolute w-full top-0 left-0 bg-mobile-menu">
            <Button 
              type="button" 
              onClick={handleMenuClose} 
              variant={'link'}
              className="absolute cursor-pointer px-0 top-9 right-9 text-white w-3.5 h-3.5"
            >
              <Image src="/close-icon.svg" fill alt="Close Menu" className="w-3 h-3" />
            </Button>

            {
              menu.map((item, index) => {
                const slug = item.slug?.current || "";
                const isContact = slug === "contact";
                const isLast = index+1 === menu.length - 1;
                const isActive = pathname === `/${slug}`;                              

                if (isContact) {
                  return (
                    <Link
                      key={item.label}
                      href={`/${slug}`}
                      className="md:block text-[16px]! mt-[110px] hover:bg-white transition text-black font-sans text-xs font-semibold uppercase px-6 py-3 my-4 rounded-lg bg-[rgb(var(--primary-color))] shadow-[0_0_14px_0_rgba(255,255,255,0.19)_inset] w-full text-center"
                    >
                      GET STARTED
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={`/${slug}`}
                    onClick={handleMenuClose}
                    className={`group relative font-sans text-sm font-semibold py-8 w-full text-left  ${!isLast ? "border-b border-[#DEDEDE]/15" : ""}`}
                  >
                    <span className={`relative z-50 flex items-center justify-between ${isActive ? 'text-primary' : 'text-white'}`}>
                      {item.label}
                      {item?.children && <ChevronDown size={14} />}
                    </span>
                    {
                      item?.children &&
                      <ul 
                        className="
                        absolute left-0 top-16 w-56 bg-black shadow-lg z-30
                        opacity-0
                        pointer-events-none
                        transition-all duration-300 ease-out
                        group-hover:opacity-100  
                        group-hover:mt-2 
                        group-hover:pointer-events-auto"
                      >
                        {
                          item?.children.map((child: HeaderMenuChild) => (
                            <li>
                              <Link className="text-white hover:text-primary" href={`/${child.label}`}>{child.label}</Link>
                            </li>
                          ))
                        }
                      </ul>
                    }
                  </Link>
                );
              })
            }

            <div className="flex gap-8 mt-6 items-center mx-auto">
              {
                socials.map((s,i)=> {
                  if (!s?.icon?.asset) return null; 

                  return(
                    <Link
                      key={s.platform || i}
                      href={s?.url || "#"} 
                      rel="noopener noreferrer" 
                      target="_blank" 
                      className="text-white mr-0 relative w-4 h-4"
                    >
                      <Image
                        src={urlFor(s?.icon).url()}
                        fill
                        alt={s?.platform || ""}
                      />
                    </Link>
                  )
                })
              }                          
            </div>
          </div>
        )
      }
    </header>
  );
}
