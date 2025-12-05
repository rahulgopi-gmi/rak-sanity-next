"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../ui/button";

export default function Header() {
  const headerContentRef = useRef<HTMLDivElement>(null);
  const headerInnerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const headerContent = headerContentRef.current;
      const headerInner = headerInnerRef.current;
      if (!headerContent || !headerInner) return;

      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        if (window.scrollY > 50) {
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
        if (window.scrollY > 50) {
          headerContent.style.width = "95%";
          headerInner.style.paddingLeft = "2rem";
          headerInner.style.paddingRight = "2rem";

          headerContent.classList.add(
            "rounded-bl-lg",
            "rounded-br-lg",
            "mx-auto"
          );
        } else {
          headerContent.style.width = "100%";
          headerInner.style.paddingLeft = "0";
          headerInner.style.paddingRight = "0";

          headerContent.classList.add(
            "rounded-bl-lg",
            "rounded-br-lg",
            "mx-auto"
          );
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
                className="main-logo mr-0 relative h-10 w-32 lg:w-[300px] lg:h-14"
              >
                <Image
                  src={"/logo.svg"}
                  fill
                  alt="Innovation City Logo"
                  className="transition-all duration-500 ease-in-out"
                />
              </Link>

              <ul className="hidden md:flex space-x-12 justify-start ml-12 w-full">
                <li className="flex items-center">
                  <Link
                    href="/activities"
                    className="text-white font-sans text-md font-semibold"
                  >
                    Activities
                  </Link>
                </li>
                <li className="flex items-center">
                  <Link
                    href="/packages"
                    className="text-white font-sans text-md font-semibold"
                  >
                    Packages
                  </Link>
                </li>
                <li className="flex items-center">
                  <Link
                    href="/about"
                    className="text-white font-sans text-md font-semibold"
                  >
                    About Us
                  </Link>
                </li>
                <li className="ml-auto flex items-center">
                  <Link href={'/contact'}>
                    <Button size={"sm"}>GET STARTED</Button>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:hidden flex items-center">
              <Button type="button" className="text-white w-6 h-6 relative cursor-pointer" onClick={handleHamberger}>
                <Image src={"/hamberger-menu.svg"} fill alt="menu icon" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {
        isOpen &&
        (
          <div id="mobileMenu" className="flex flex-col h-screen items-center text-white pr-9 pl-9 pt-[122px] absolute w-full top-0 left-0 bg-mobile-menu">
            <Button type="button" onClick={handleMenuClose} className="absolute cursor-pointer top-9 right-9 text-white w-5 h-5">
              <Image src="./close-icon.svg" fill alt="Close Menu" className="w-5 h-5" />
            </Button>

            <Link href="/" className="text-white font-sans text-lg font-semibold py-8 border-b border-gray-700 w-full text-left">Activities</Link>
            <Link href="/" className="text-white font-sans text-lg font-semibold py-8 border-b border-gray-700 w-full text-left">Packages</Link>
            <Link href="/" className="text-white font-sans text-lg font-semibold py-8 w-full text-left">About Us</Link>

            <Link href="/" className="md:block hover:bg-white transition text-black font-sans text-lg font-semibold uppercase px-6 py-2 rounded-lg bg-[rgb(var(--primary-color))] shadow-[0_0_14px_0_rgba(255,255,255,0.19)_inset] mt-9 w-full text-center">
              Get Started
            </Link>

            <div className="flex space-x-6 mt-6 items-center">
              <Link href="https://x.com/InnovationCityX" rel="noopener noreferrer" target="_blank" className="text-white mr-0 relative w-5 h-5">
                <Image src="./twitter-icon.svg" fill alt="" />
              </Link>

              <Link href="https://www.facebook.com/rakinnovationcity/" rel="noopener noreferrer" target="_blank" className="text-white relative w-5 h-5">
                <Image src="./facebook-icon.svg" fill alt="" />
              </Link>

              <Link href="https://www.youtube.com/@Innovationcity_inc" rel="noopener noreferrer" target="_blank" className="text-white relative w-4 h-4">
                <Image src="./youtube-icon.svg" fill alt="" />
              </Link>

              <Link href="https://www.tiktok.com/@Innovationcity_inc" rel="noopener noreferrer" target="_blank" className="text-white relative w-4 h-4">
                <Image src="./music-icon.svg" fill alt="" />
              </Link>

              <Link href="https://t.me/Innovationcity" rel="noopener noreferrer" target="_blank" className="text-white relative w-4 h-4">
                <Image src="./telegram-icon.svg" fill alt="" />
              </Link>

              <Link href="https://www.linkedin.com/company/innovationcityinc/" rel="noopener noreferrer" target="_blank" className="text-white relative w-4 h-4">
                <Image src="./linkedin-icon.svg" fill alt="" />
              </Link>

              <Link href="https://www.instagram.com/innovationcity_inc/" rel="noopener noreferrer" target="_blank" className="text-white relative w-4 h-4">
                <Image src="./instagram-icon.svg" fill alt="" />
              </Link>
            </div>
          </div>
        )
      }
    </header>
  );
}
