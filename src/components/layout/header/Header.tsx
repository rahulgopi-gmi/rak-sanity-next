"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../ui/button";
import { PageSettingsType } from "@/features/application/types/sanity";
import { urlFor } from "@/sanity/lib/image";
import { usePathname } from "next/navigation";

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
        <div ref={headerContentRef} className="bg-black/40 border backdrop-blur-lg border-white/10 px-4 lg:px-5 py-4 lg:py-4 transition-all duration-500 ease-in-out">
          <div className="container flex justify-between items-center">
            <div className="flex items-center space-x-12 relative w-full">
              <Link
                href="/"
                className="main-logo mr-0 relative h-10 w-32 lg:w-[240px] lg:h-14"
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

              <ul className="hidden md:flex space-x-12 justify-start ml-12 w-full">
                {
                  menu.map((item) => {
                    const slug = item.slug?.current || "";
                    const isContact = slug === "contact";
                    const isActive = pathname === `/${slug}`;

                    return (
                      <li key={item.label} className="flex items-center last:ml-auto ">
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
                                className={`${isActive ? 'text-primary' : 'text-white hover:text-primary'} transition-all ease-in  font-sans text-md md:max-lg:text-sm! font-semibold`}
                            >
                              {item.label}
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
                const isLast = index === menu.length - 1;

                if (isContact) {
                  return (
                    <Link
                      key={item.label}
                      href={`/${slug}`}
                      className="md:block hover:bg-white transition text-black font-sans text-xs font-semibold uppercase px-6 py-3 my-4 rounded-lg bg-[rgb(var(--primary-color))] shadow-[0_0_14px_0_rgba(255,255,255,0.19)_inset] mt-6 w-full text-center"
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
                    className={`text-white font-sans text-sm font-semibold py-8 w-full text-left ${!isLast ? "border-b border-[#374151]" : ""
                      }`}
                  >
                    {item.label}
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
