import SwiperArea from "@/components/layout/life-in-rak/swiper-area/SwiperArea";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import PillTag from "@/components/ui/pill-tag";
import { Globe } from "lucide-react";
import Image from "next/image";

/**
 * Page Component
*/
export default async function Page() {
    return(
        <main className="w-full h-full">
            <div className="w-full h-full"> 
                <div className="hidden md:block w-full">
                    <AspectRatio ratio={2} className="hidden md:block w-full max-w-360 mx-auto relative">                     
                        <Image
                            alt=""
                            fill
                            src="/images/banner/life-rak-banner.png"
                            className=""
                        />
                    </AspectRatio> 
                </div>

                <div className="block md:hidden w-full h-164.5">
                    <AspectRatio ratio={2} className="block md:hidden w-full h-164.5 relative">
                        <Image
                            alt=""
                            fill
                            src="/images/banner/life-rak-mob.png"
                            className="object-cover"
                        />
                    </AspectRatio>
                </div>

                <div className="absolute top-28 w-full h-full z-10">
                     <h2 className="font-sans font-medium text-[#fefefe] text-[28px]! text-center tracking-[10.36px] leading-7.5!">LIFE IN</h2>
                    <h1 className="[text-shadow:0px_8px_4px_#00000040] font-h-1 font-extrabold text-[#fefefe] text-[length:var(--h-1-font-size)] text-center tracking-[var(--h-1-letter-spacing)] leading-[var(--h-1-line-height)] [font-style:var(--h-1-font-style)]"> RAS AL KHAIMAH </h1>
                </div>
            </div>

            <section className="bg-black bg-[url('/images/gradient/bg-grd-banner.jpg')] flex flex-col w-full min-h-130.5 items-start relative overflow-hidden">
                <div className="container mx-auto">
                    <div className="relative z-10 flex flex-row items-start gap-3.75 py-30 w-full"> 
                        <div className="flex flex-col items-start gap-6 w-full max-w-100"> 
                            <PillTag>Ras Al Khaimah</PillTag>
                            <h1 className="w-full font-extrabold"> 
                                <span className="block font-h-2 text-white text-[length:var(--h-2-font-size)] tracking-[var(--h-2-letter-spacing)] leading-[var(--h-2-line-height)] [font-style:var(--h-2-font-style)]"> THE UAE'S </span> 
                                <span className="block font-h-2 text-[length:var(--h-2-font-size)] tracking-[var(--h-2-letter-spacing)] leading-[var(--h-2-line-height)] [font-style:var(--h-2-font-style)]"> HIDDEN GEM </span> 
                            </h1> 
                            <p className="w-full font-h-5 font-[number:var(--h-5-font-weight)] text-[#d2d2d2] text-[length:var(--h-5-font-size)] tracking-[var(--h-5-letter-spacing)] leading-[var(--h-5-line-height)] [font-style:var(--h-5-font-style)]"> Nulla sed metus convallis diam blandit euismod eu id libero. In in{" "} <br /> interdum nisl. 
                            </p> 
                        </div> 
                        <div className="flex flex-col items-center justify-center w-full max-w-[792px] px-20 py-0"> 
                            <p className="w-full max-w-[602px] font-p-regular font-[number:var(--p-regular-font-weight)] text-[#d2d2d2] text-[length:var(--p-regular-font-size)] tracking-[var(--p-regular-letter-spacing)] leading-[var(--p-regular-line-height)] [font-style:var(--p-regular-font-style)]"> Aliquam et ipsum nec risus tincidunt tempor. Praesent blandit imperdiet dapibus. Nunc fermentum posuere dui, nec eleifend velit laoreet gravida. Nulla et est dolor. Maecenas imperdiet aliquam placerat. Proin semper semper ipsum et eleifend. In id elit nec tortor accumsan ultrices quis quis leo. Fusce non lobortis enim. Maecenas gravida leo quis tempor viverra. Suspendisse porta lorem in dolor congue consectetur. Mauris dictum sodales eros ut ornare. Sed mattis magna eget interdum sollicitudin. Sed metus ipsum, vehicula ac lorem a, scelerisque dapibus urna. <br /> <br /> Nulla sed metus convallis diam blandit euismod eu id libero. In in interdum nisl. Suspendisse tristique, diam vitae tempus ultrices, sem ex consectetur turpis, quis finibus risus nulla eu lorem. Sed at lorem aliquam, eleifend sapien ut, congue eros. In porta dui ac commodo facilisis. Vivamus imperdiet odio sed sapien fermentum commodo.</p> 
                        </div> 
                    </div>
                </div>    
            </section>

            <section className="w-full">
                <div className="hidden md:block w-full">
                    <AspectRatio ratio={2} className="hidden md:block w-full max-w-360 mx-auto relative">                     
                        <Image
                            alt=""
                            fill
                            src="/images/banner/life-rak-sub-img.png"
                            className=""
                        />
                    </AspectRatio> 
                </div>

                <div className="block md:hidden w-full h-164.5">
                    <AspectRatio ratio={2} className="block md:hidden w-full h-164.5 relative">
                        <Image
                            alt=""
                            fill
                            src="/images/banner/life-rak-sub-img-mob.png"
                            className="object-cover"
                        />
                    </AspectRatio>
                </div>
            </section>

            <section className="w-full bg-black py-18">
                <div className="container">
                    <SwiperArea/>                    
                </div>
            </section>            

            <section className="relative w-full h-168.75 flex items-end py-20"> 
                <div className="absolute inset-0 w-full h-full"> 
                    <div className="hidden md:block w-full">
                        <AspectRatio ratio={2} className="hidden md:block w-full max-w-360 mx-auto relative">
                            <Image
                                alt=""
                                fill
                                src="/images/banner/life-rak-bottom-banner.png"
                                className=""
                            />
                        </AspectRatio>
                    </div>

                    <div className="block md:hidden w-full h-164.5">
                        <AspectRatio ratio={2} className="block md:hidden w-full h-164.5 relative">
                            <Image
                                alt=""
                                fill
                                src="/images/banner/life-rak-bottom-banner-mob.png"
                                className="object-cover"
                            />
                        </AspectRatio>
                    </div>
                </div> 

                <div className="container">
                    <h1 className="relative font-mono max-w-243.5 font-h-2 font-extrabold text-white text-[length:var(--h-2-font-size)]! tracking-[var(--h-2-letter-spacing)]! leading-[var(--h-2-line-height)]! [font-style:var(--h-2-font-style)]!"> 
                        Where The Hajar Mountains <br /> Stand Sentinel Over Golden Deserts And Turquoise Coastlines. 
                    </h1> 
                </div>
            </section>

            <section className="w-full h-full bg-black bg-cover max-md:bg-[url('/images/gradient/bg-grd-banner.jpg')] bg-[url('/images/gradient/bg-grd-banner.jpg')] bg-no-repeat">
                <div className="container max-auto" data-aos="fade-up" data-aos-delay="200">
                    <div className="mx-auto flex flex-col items-center justify-center text-center pt-37.5 max-md:pt-[135]">
                        <PillTag className="mx-auto mb-6.25 max-md:mb-5">
                            Ras Al Khaimah
                        </PillTag>

                        <div className="w-full flex gap-9 flex-col">                            
                            <h2 className="font-extrabold font-mono text-white uppercase">
                                Where Business Thrives Without Limits
                            </h2>
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 pt-12 pb-37.5">
                        <Card className="w-full h-auto p-0 rounded-[20px] border border-[#ffffff24] backdrop-blur-[21.5px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(21.5px)_brightness(100%)] bg-[linear-gradient(129deg,rgba(255,255,255,0.11)_0%,rgba(255,255,255,0.04)_100%)]! bg-transparent!">
                            <CardContent className="flex flex-col gap-6 p-8"> 
                                <div className="w-10.5 h-10.5 flex items-center justify-center"> 
                                    <Globe className="w-full h-full text-[#5DD5E8]" strokeWidth={1.5} /> 
                                </div> 
                                <h2 className="font-h5-semibold font-[number:var(--h5-semibold-font-weight)]! text-[#fefefe] text-[length:var(--h5-semibold-font-size)]! tracking-[var(--h5-semibold-letter-spacing)]! leading-[var(--h5-semibold-line-height)]! [font-style:var(--h5-semibold-font-style)]!"> 100% Foreign Ownership </h2> 
                                <p className="font-p-regular font-[number:var(--p-regular-font-weight)]! text-[#a5a5a5] text-[length:var(--p-regular-font-size)]! tracking-[var(--p-regular-letter-spacing)] leading-[var(--p-regular-line-height)]! [font-style:var(--p-regular-font-style)]!"> Free zones and mainland options allowing full business ownership without local sponsorship requirements, attracting international entrepreneurs and companies. </p> 
                            </CardContent> 
                        </Card>

                        <Card className="w-full h-auto p-0 rounded-[20px] border border-[#ffffff24] backdrop-blur-[21.5px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(21.5px)_brightness(100%)] bg-[linear-gradient(129deg,rgba(255,255,255,0.11)_0%,rgba(255,255,255,0.04)_100%)]! bg-transparent!">
                            <CardContent className="flex flex-col gap-6 p-8">
                                <div className="w-10.5 h-10.5 flex items-center justify-center">
                                    <Globe className="w-full h-full text-[#5DD5E8]" strokeWidth={1.5} />
                                </div>
                                <h2 className="font-h5-semibold font-[number:var(--h5-semibold-font-weight)]! text-[#fefefe] text-[length:var(--h5-semibold-font-size)]! tracking-[var(--h5-semibold-letter-spacing)]! leading-[var(--h5-semibold-line-height)]! [font-style:var(--h5-semibold-font-style)]!"> 100% Foreign Ownership </h2>
                                <p className="font-p-regular font-[number:var(--p-regular-font-weight)]! text-[#a5a5a5] text-[length:var(--p-regular-font-size)]! tracking-[var(--p-regular-letter-spacing)] leading-[var(--p-regular-line-height)]! [font-style:var(--p-regular-font-style)]!"> Free zones and mainland options allowing full business ownership without local sponsorship requirements, attracting international entrepreneurs and companies. </p>
                            </CardContent>
                        </Card>

                        <Card className="w-full h-auto p-0 rounded-[20px] border border-[#ffffff24] backdrop-blur-[21.5px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(21.5px)_brightness(100%)] bg-[linear-gradient(129deg,rgba(255,255,255,0.11)_0%,rgba(255,255,255,0.04)_100%)]! bg-transparent!">
                            <CardContent className="flex flex-col gap-6 p-8"> 
                                <div className="w-10.5 h-10.5 flex items-center justify-center"> 
                                    <Globe className="w-full h-full text-[#5DD5E8]" strokeWidth={1.5} /> 
                                </div> 
                                <h2 className="font-h5-semibold font-[number:var(--h5-semibold-font-weight)]! text-[#fefefe] text-[length:var(--h5-semibold-font-size)]! tracking-[var(--h5-semibold-letter-spacing)]! leading-[var(--h5-semibold-line-height)]! [font-style:var(--h5-semibold-font-style)]!"> 100% Foreign Ownership </h2> 
                                <p className="font-p-regular font-[number:var(--p-regular-font-weight)]! text-[#a5a5a5] text-[length:var(--p-regular-font-size)]! tracking-[var(--p-regular-letter-spacing)] leading-[var(--p-regular-line-height)]! [font-style:var(--p-regular-font-style)]!"> Free zones and mainland options allowing full business ownership without local sponsorship requirements, attracting international entrepreneurs and companies. </p> 
                            </CardContent> 
                        </Card>

                        <Card className="w-full h-auto p-0 rounded-[20px] border border-[#ffffff24] backdrop-blur-[21.5px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(21.5px)_brightness(100%)] bg-[linear-gradient(129deg,rgba(255,255,255,0.11)_0%,rgba(255,255,255,0.04)_100%)]! bg-transparent!">
                            <CardContent className="flex flex-col gap-6 p-8">
                                <div className="w-10.5 h-10.5 flex items-center justify-center">
                                    <Globe className="w-full h-full text-[#5DD5E8]" strokeWidth={1.5} />
                                </div>
                                <h2 className="font-h5-semibold font-[number:var(--h5-semibold-font-weight)]! text-[#fefefe] text-[length:var(--h5-semibold-font-size)]! tracking-[var(--h5-semibold-letter-spacing)]! leading-[var(--h5-semibold-line-height)]! [font-style:var(--h5-semibold-font-style)]!"> 100% Foreign Ownership </h2>
                                <p className="font-p-regular font-[number:var(--p-regular-font-weight)]! text-[#a5a5a5] text-[length:var(--p-regular-font-size)]! tracking-[var(--p-regular-letter-spacing)] leading-[var(--p-regular-line-height)]! [font-style:var(--p-regular-font-style)]!"> Free zones and mainland options allowing full business ownership without local sponsorship requirements, attracting international entrepreneurs and companies. </p>
                            </CardContent>
                        </Card>
                    </div> 
                </div>    
            </section>
        </main>
    )
}