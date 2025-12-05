import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function BlogDetails({ params }: { params: { id: string } }) {
   // if (!blog) return notFound();

    return (
        <main className="bg-black w-full">
            <section className="relative w-full bg-[url('/aboutbgmob.jpg')] md:bg-[url('/aboutbgdesk.jpg')] md:bg-cover bg-no-repeat with-overlay pt-[211px] pb-[380px]">
                <div className="container">
                    <div className="text-white" data-aos="fade-up">
                        <div className="flex items-center gap-3">
                            <span className="text-white font-sans text-[14px] font-normal leading-[21px] tracking-[0.13px] uppercase">
                                14 MAY 2025
                            </span>

                            <span className="px-3 py-1 rounded-full bg-[rgba(27,26,26,0.70)] text-white font-sans text-[14px] font-normal leading-[21px]">
                                Press Release
                            </span>

                            <span className="px-3 py-1 rounded-full bg-[rgba(27,26,26,0.70)]  text-white font-sans text-[14px] font-normal leading-[21px]">
                                Web3
                            </span>
                        </div>

                        <h1 className="mt-6 text-white font-semibold text-[32px]! md:text-[45px]! leading-8! md:leading-[47px]! font-mono">
                            RAK DAO Partners With SuiHub MENA to Capitalize on the UAE's Web3 Growth Momentum
                        </h1>

                        <p className="mt-4 text-[rgba(255,255,255,0.60)] font-sans text-[14px]! font-normal leading-[21px]!">
                            By Innovation City Team
                        </p>

                        <div className="mt-8">
                            <div className="w-full h-[478px] relative">
                                <Image fill alt="" src="/blog-details-banner.png" className="rounded-xl w-full h-auto shadow-xl" />
                            </div>                            
                        </div>

                    </div>
                 </div>
            </section>

            <section className="text-white pt-0 mt-[-345px] md:mt-[-340px] pb-[30px] md:pb-[104px] relative z-10" data-aos="fade-up">
                <div className="container grid grid-cols-1 lg:grid-cols-[250px_1fr_350px] gap-6">
                    <div className="space-y-10">
                        <div className="rounded-[10px] border-[1.701px] border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] p-6">

                            <h3 className="text-white font-sans text-[16px]! font-normal leading-6! mb-4">
                                Contents
                            </h3>

                            <ul className="space-y-2">
                                <li>
                                    <Link href="" className="block px-4 py-2 rounded-lg bg-[#5FC2D5] text-black font-sans text-[14px] font-normal leading-[21px] cursor-pointer">
                                        Introduction
                                    </Link>
                                </li>

                                <li>
                                    <Link href="" className="block px-4 py-2 rounded-lg text-[rgba(255,255,255,0.70)] font-sans text-[14px] font-normal leading-[21px] hover:bg-white/5 cursor-pointer">
                                        Strategic Partnership Details
                                    </Link>
                                </li>

                                <li>
                                    <Link href="" className="block px-4 py-2 rounded-lg text-[rgba(255,255,255,0.70)] font-sans text-[14px] font-normal leading-[21px] hover:bg-white/5 cursor-pointer">
                                        Key Benefits
                                    </Link>
                                </li>

                                <li>
                                    <Link href="" className="block px-4 py-2 rounded-lg text-[rgba(255,255,255,0.70)] font-sans text-[14px] font-normal leading-[21px] hover:bg-white/5 cursor-pointer">
                                        Future Outlook
                                    </Link>
                                </li>

                                <li>
                                    <Link href="" className="block px-4 py-2 rounded-lg text-[rgba(255,255,255,0.70)] font-sans text-[14px] font-normal leading-[21px] hover:bg-white/5 cursor-pointer">
                                        Conclusion
                                    </Link>
                                </li>
                            </ul>
                        </div>  

                        <div className="rounded-[10px] border-[1.701px] border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] p-6">

                            <h3 className="text-white font-sans text-[16px]! font-normal leading-6! mb-4">
                                Stay Updated
                            </h3>

                            <p className="text-[rgba(255,255,255,0.70)] font-sans text-[14px]! font-normal leading-[21px]! mb-4">
                                Subscribe to our newsletter
                            </p>

                            <Input
                                type="email" 
                                placeholder="Your email"
                                className="h-[50px] rounded-[8px] border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.05)] focus:border-[#2ad3ff]"
                            />
                            
                            <Button type="button" size={'sm'} className="w-full mt-4">Subscribe</Button>                            

                        </div>       
                    </div>

                    <div className="lg:col-span-1 space-y-10 leading-relaxed">
                        <div className="w-full">
                            <h2 className="text-white font-sans text-[20px]! font-medium leading-[30px]! mb-4">
                                Introduction
                            </h2>

                            <p className="text-[rgba(255,255,255,0.80)] font-sans text-[16px]! font-normal leading-[26px]!">
                                Ras Al Khaimah, UAE – April 28th, 2025 – RAK Digital Assets Oasis (RAK DAO), the UAE’s pioneering Free Zone
                                dedicated to digital assets and blockchain enterprises, today announced a strategic partnership with SuiHub
                                MENA, the regional innovation hub for the Sui blockchain ecosystem.
                                <br /><br />
                                This collaboration marks a significant milestone in the UAE’s journey to become a global leader in Web3
                                technology and digital innovation. The partnership will focus on fostering blockchain development, supporting
                                startups, and creating a robust ecosystem for digital assets in the region.
                            </p>
                        </div>

                        <div className="w-full">
                            <h2 className="text-white font-sans text-[20px]! font-medium leading-[30px]! mb-4">
                                Strategic Partnership Details
                            </h2>

                            <p className="text-[rgba(255,255,255,0.80)] font-sans text-[16px]! font-normal leading-[26px]!">
                                The partnership between RAK DAO and SuiHub MENA will create a comprehensive support system for blockchain
                                companies looking to establish their presence in the UAE. This includes:
                            </p>

                            <ul className="list-none p-0 m-0 text-[rgba(255,255,255,0.80)] font-sans text-[16px]! font-normal leading-[26px]! mt-4 space-y-2">
                                <li>Access to world-class infrastructure and facilities</li>
                                <li>Regulatory support and licensing assistance</li>
                                <li>Networking opportunities with industry leaders</li>
                                <li>Technical resources and development support</li>
                                <li>Marketing and business development services</li>
                            </ul>
                        </div>

                        <div className="w-full">
                            <h2 className="text-white font-sans text-[20px]! font-medium leading-[30px]! mb-4">
                                Key Benefits
                            </h2>

                            <p className="text-[rgba(255,255,255,0.80)] font-sans text-[16px]! font-normal leading-[26px]!">
                                Companies joining this ecosystem will benefit from RAK DAO’s strategic location in the UAE, combined with
                                SuiHub MENA’s deep expertise in blockchain technology and ecosystem development. The partnership offers:
                                <br /><br />
                                Streamlined company formation processes, competitive pricing structures, and access to a growing network of
                                Web3 professionals and investors. Additionally, participants will have opportunities to collaborate with
                                government entities and academic institutions.
                            </p>
                        </div>

                        <div className="w-full">
                            <h2 className="text-white font-sans text-[20px]! font-medium leading-[30px]! mb-4">
                                Future Outlook
                            </h2>

                            <p className="text-[rgba(255,255,255,0.80)] font-sans text-[16px]! font-normal leading-[26px]!">
                                Looking ahead, this partnership is expected to attract hundreds of blockchain companies to the region, creating
                                thousands of jobs and establishing the UAE as a premier destination for Web3 innovation. The collaboration will
                                also support educational initiatives to develop local talent in blockchain technology.
                            </p>
                        </div>

                        <div className="w-full">
                            <h2 className="text-white font-sans text-[20px]! font-medium leading-[30px]! mb-4">
                                Conclusion
                            </h2>

                            <p className="text-[rgba(255,255,255,0.80)] font-sans text-[16px]! font-normal leading-[26px]!">
                                The RAK DAO and SuiHub MENA partnership represents a bold step forward in the UAE’s digital transformation
                                journey. By combining regulatory excellence with technical innovation, this collaboration sets a new standard
                                for Web3 ecosystem development in the Middle East and beyond.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-10">
                        <div className="rounded-[10px] border-[1.701px] border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] p-6">
                            <h3 className="text-white font-sans text-[16px]! font-normal leading-[24px]! mb-4">
                                Categories
                            </h3>

                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 rounded-[57078300px] border-[1.701px] border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.05)]
               text-white font-sans text-[12px] font-normal leading-[18px]">
                                    Business Setup
                                </span>

                                <span className="px-4 py-2 rounded-[57078300px] border-[1.701px] border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.05)] text-white font-sans text-[12px] font-normal leading-[18px]">
                                    Licensing
                                </span>

                                <span className="px-4 py-2 rounded-[57078300px] border-[1.701px] border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.05)] text-white font-sans text-[12px] font-normal leading-[18px]">
                                    Web3
                                </span>

                                <span className="px-4 py-2 rounded-[57078300px] border-[1.701px] border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.05)] text-white font-sans text-[12px] font-normal leading-[18px]">
                                    Blockchain
                                </span>

                                <span className="px-4 py-2 rounded-[57078300px] border-[1.701px] border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.05)] text-white font-sans text-[12px] font-normal leading-[18px]">
                                    Company Formation
                                </span>

                                <span className="px-4 py-2 rounded-[57078300px] border-[1.701px] border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.05)] text-white font-sans text-[12px] font-normal leading-[18px]">
                                    Innovation
                                </span>

                                <span className="px-4 py-2 rounded-[57078300px] border-[1.701px] border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.05)] text-white font-sans text-[12px] font-normal leading-[18px]">
                                    Technology
                                </span>

                                <span className="px-4 py-2 rounded-[57078300px] border-[1.701px] border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.05)] text-white font-sans text-[12px] font-normal leading-[18px]">
                                    Digital Assets
                                </span>
                            </div>
                        </div>

                        <div className="rounded-[10px] border-[1.701px] border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] p-6">                            
                            <h3 className="text-white font-sans text-[16px]! font-normal leading-[24px]! mb-6">
                                Let's Connect
                            </h3>

                            <form className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-white font-sans text-[14px] font-medium leading-[21px]">
                                        Name*
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-[8px] border-[1.701px] border-[rgba(255,255,255,0.20)] 
               bg-[rgba(255,255,255,0.05)] px-4 py-3
               text-white font-montserrat text-[14px] font-medium leading-[21px]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-white font-sans text-[14px] font-medium leading-[21px]">
                                        Email*
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full rounded-[8px] border-[1.701px] border-[rgba(255,255,255,0.20)] 
               bg-[rgba(255,255,255,0.05)] px-4 py-3
               text-white font-montserrat text-[14px] font-medium leading-[21px]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-white font-sans text-[14px] font-medium leading-[21px]">
                                        Mobile Number*
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-[8px] border-[1.701px] border-[rgba(255,255,255,0.20)] 
               bg-[rgba(255,255,255,0.05)] px-4 py-3
               text-white font-montserrat text-[14px] font-medium leading-[21px]"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-white font-sans text-[14px] font-medium leading-[21px]">
                                        Business Activity*
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-[8px] border-[1.701px] border-[rgba(255,255,255,0.20)] 
               bg-[rgba(255,255,255,0.05)] px-4 py-3
               text-white font-montserrat text-[14px] font-medium leading-[21px]"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-white font-sans text-[14px] font-medium leading-[21px]">
                                        How soon are you planning to start?*
                                    </label>
                                    <div className="relative w-full">
                                        <select
                                            className="w-full rounded-[8px] border-[1.701px] border-[rgba(255,255,255,0.20)] 
           bg-[rgba(255,255,255,0.05)] px-4 py-3
           text-[14px] font-montserrat font-normal leading-[20px]
           text-[rgba(113,113,130,1)]
           appearance-none"
  >
                                        <option>Select timeline</option>
                                        <option>Immediately</option>
                                        <option>1–3 Months</option>
                                        <option>3–6 Months</option>
                                        <option>More than 6 Months</option>
                                    </select>

                                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <g opacity="0.5">
                                                <path d="M3.99414 5.99023L7.98766 9.98376L11.9812 5.99023" stroke="#717182" stroke-width="1.33117" stroke-linecap="round" stroke-linejoin="round" />
                                            </g>
                                        </svg>
                                    </div>
                                </div>

                        </div>


                            <div className="rounded-[8px] border-[1.701px] border-[rgba(255,255,255,0.20)] bg-white p-4 flex items-center gap-3">
                                    <input type="checkbox" className="w-[18px] h-[18px]" />
                                    <span className="text-black text-[14px] font-sans font-medium leading-[21px]">I'm not a robot</span>
                        </div>

                        <button
                                    className="w-full rounded-[8px] bg-[#5FC2D5] 
         text-black font-sans text-[14px] font-medium leading-[20px] 
         py-3 transition"
                        >
                            Submit
                        </button>
                    </form>
                        </div>       
                    </div>
                </div>
            </section>
        </main>
    )
}