import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return(
        <footer
            className="bg-[#1F1F1F] text-center py-8 md:py-6 text-[rgba(255,255,255,0.53)] font-montserrat text-md font-normal leading-normal">
            <div className="container">
                <div className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-4 justify-center md:justify-between items-center lg:items-start">

                    <div className="inline-flex gap-6 order-1 md:order-2">
                        <Link href="https://x.com/InnovationCityX" rel="noopener noreferrer" target="_blank" className="flex mr-0">
                            <div className="w-4 h-4 hover:opacity-50 cursor-pointer relative">
                                <Image src="/twitter-icon.svg" fill className="object-contain" alt="Twitter" />
                            </div>
                        </Link>

                        <Link href="https://www.facebook.com/rakinnovationcity/" rel="noopener noreferrer" target="_blank" className="flex">
                            <div className="w-4 h-4 hover:opacity-50 cursor-pointer relative">
                                <Image src="/facebook-icon.svg" fill className="object-contain" alt="Facebook" />
                            </div>
                        </Link>

                        <Link href="https://www.youtube.com/@Innovationcity_inc" rel="noopener noreferrer" target="_blank" className="flex">
                            <div className="w-4 h-4 hover:opacity-50 cursor-pointer relative">
                                <Image src="/youtube-icon.svg" fill className="object-contain" alt="Youtube" />
                            </div>
                        </Link>

                        <Link href="https://www.tiktok.com/@Innovationcity_inc" rel="noopener noreferrer" target="_blank" className="flex">
                            <div className="w-4 h-4 hover:opacity-50 cursor-pointer relative">
                                <Image src="/music-icon.svg" fill className="object-contain" alt="Ticktok" />
                            </div>
                        </Link>

                        <Link href="https://t.me/Innovationcity" rel="noopener noreferrer" target="_blank" className="flex">
                            <div className="w-4 h-4 hover:opacity-50 cursor-pointer relative">
                                <Image src="/teligram-icon.svg" fill className="object-contain" alt="Telegram" />
                            </div>
                        </Link>

                        <Link href="https://www.linkedin.com/company/innovationcityinc/" rel="noopener noreferrer" target="_blank" className="flex">
                            <div className="w-4 h-4 hover:opacity-50 cursor-pointer relative">
                                <Image src="/linkedin-icon.svg" fill className="object-contain" alt="LinkedIn" />
                            </div>
                        </Link>

                        <Link href="https://www.instagram.com/innovationcity_inc/" rel="noopener noreferrer" target="_blank" className="flex">
                            <div className="w-4 h-4 hover:opacity-50 cursor-pointer relative">
                                <Image src="/instagram-icon.svg" fill className="object-contain" alt="Instagram" />
                            </div>
                        </Link>
                    </div>

                    <p className="order-2 md:order-1 font-montserrat text-[14px] leading-normal block">
                        &copy; 2025 Innovation City. All Rights Reserved.</p>

                    <div className="order-3 md:order-3 flex gap-3 items-center">
                        <a href="https://freezone.innovationcity.com/rules-and-regulations/" target="_blank"
                            className="hover:opacity-50 cursor-pointer no-underline text-[rgba(255,255,255,0.53)] font-montserrat text-[14px] font-normal leading-normal hover:text-[rgba(255,255,255,0.8)]">
                            Free Zone Policies
                        </a>
                        |
                        <a href="privacy-policy.html"
                            className="hover:opacity-50 cursor-pointer no-underline text-[rgba(255,255,255,0.53)] font-montserrat text-[14px] font-normal leading-normal hover:text-[rgba(255,255,255,0.8)]">
                            Privacy Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}