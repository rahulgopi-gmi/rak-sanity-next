import { Card, CardContent } from "@/components/ui/card";
import PillTag from "@/components/ui/pill-tag";
import Image from "next/image";

/**
 * Page Component
*/
export default async function Page() {
    return(
        <main className="w-full h-full">
            <div className="relative w-full bg-black bg-cover max-md:bg-[url('/images/gradient/bg-grd-banner.jpg')] bg-[url('/images/gradient/bg-grd-banner.jpg')] bg-no-repeat">
                <div className="container max-auto" data-aos="fade-up" data-aos-delay="200">
                    <div className="mx-auto flex flex-col items-center justify-center text-center pt-37.5 max-md:pt-[135]">                       
                        <PillTag className="mx-auto mb-6.25 max-md:mb-5">
                            Our Team
                        </PillTag>
                        
                        <div className="w-full mx-auto max-w-[950px] flex gap-9 flex-col">                                                         
                            <div className="font-mono uppercase font-extrabold text-white text-6xl text-center tracking-[0] leading-15">
                                <h2>
                                    The Minds Powering the
                                    Free Zone Revolution
                                </h2>    
                            </div>  

                            <p className="font-sans text-center justify-start text-neutral-300 text-base font-normal">
                                Driven by innovation, our diverse team blends technology, strategy, and purpose to shape Innovation City into the world’s most intelligent business ecosystem.
                            </p>
                        </div>
                    </div>
                </div>

                <section className="w-full">
                    <div className="flex items-center gap-7 relative">
                        <div className="relative w-[486px] h-[828px]">
                            <div className="absolute top-[23px] left-[90px] w-[330px] h-[782px]">
                                <Image
                                    src="/images/ceo.png"
                                    alt=""
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <div className="flex w-[686px] h-[640px] items-end justify-end gap-2.5 px-[26px] py-[22px] relative">
                            <div className="flex flex-col w-[486px] items-start gap-[60px] relative">
                                <div className="gap-2.5 relative self-stretch w-full flex-[0_0_auto] flex flex-col items-start">
                                    <div className="gap-[30px] relative self-stretch w-full flex-[0_0_auto] flex flex-col items-start">
                                        <h1 className="relative font-mono self-stretch mt-[-1.00px] font-h-3 font-extrabold text-white text-[length:var(--h-3-font-size)]! tracking-[var(--h-3-letter-spacing)]! leading-[var(--h-3-line-height)]! [font-style:var(--h-3-font-style)]!">
                                            Message from the CEO
                                        </h1>

                                        <div className="relative w-[488px] h-[338.8px] mr-[-2.00px]">
                                            <p className="absolute font-sans h-[76.74%] top-0 left-[calc(50.00%_-_244px)] w-[486px] font-p-regular font-normal text-[#d5d5d5] text-[length:var(--p-regular-font-size)]! tracking-[var(--p-regular-letter-spacing)]! leading-[var(--p-regular-line-height)]! [font-style:var(--p-regular-font-style)]!">
                                                Donec a leo at felis mollis dapibus a in velit. Nunc in augue ut dui rhoncus dapibus id in
                                                tortor. Etiam eget condimentum quam. Sed in purus et metus tempor viverra. Donec mattis
                                                aliquet quam at auctor. Curabitur efficitur arcu sit amet sollicitudin congue. Suspendisse
                                                tincidunt ipsum elit, molestie vestibulum urna sodales et. Donec dictum eros sed dui
                                                sollicitudin, at placerat ipsum consequat. <br />
                                                <br />
                                                Curabitur sit amet ligula turpis. Praesent pretium, purus vel maximus tempus, augue lorem
                                                eleifend enim, nec placerat nisi purus sit amet risus. Nullam eget consequat lorem, ac
                                                ultrices eros. Pellentesque dolor tellus, vulputate sit amet iaculis ac, lobortis vel nisi.
                                            </p>

                                            <div className="absolute h-[14.26%] top-[85.74%] left-[calc(50%_-_244px)] w-[127px]">
                                                <div className="absolute top-7 left-[5px] w-[118px] h-[30px]">
                                                    <Image
                                                        src="/images/sign.png"
                                                        alt=""
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative w-[198px] h-[42px]">
                                    <div className="absolute w-[93.49%] h-full top-0 left-0">
                                        <p className="absolute font-sans w-[97.84%] h-[35.71%] top-[64.29%] left-0 font-x-small font-normal text-[#d5d5d5] text-[length:var(--x-small-font-size)]! tracking-[var(--x-small-letter-spacing)]! leading-[var(--x-small-line-height)] [font-style:var(--x-small-font-style)]!">
                                            Chief Executive Officer
                                        </p>
                                        
                                        <p className="w-[86.80%] font-sans h-[47.62%] top-0 left-0 font-p-semibold font-[number:var(--p-semibold-font-weight)] text-white text-[length:var(--p-semibold-font-size)] absolute tracking-[var(--p-semibold-letter-spacing)]! leading-[var(--p-semibold-line-height)]! [font-style:var(--p-semibold-font-style)]">
                                            OLIVER MICHAEL
                                        </p>
                                    </div>

                                    <div className="absolute w-[17.68%] h-[83.33%] top-[9.52%] left-[82.32%]">
                                        <Image
                                            src="/images/linkdin-icon.png"
                                            alt="Group"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </div>                                

                            <div className="w-[654px] h-[640px] gap-2.5 p-2.5 absolute top-0 left-0 flex flex-col items-start">
                                <Image
                                    src="/images/quotes.png"
                                    alt="Image"
                                    width={195}
                                    height={155}
                                    className="relative"
                                />
                            </div>

                        </div>
                    </div>
                </section>

                <section className="flex flex-col w-full items-center gap-6 py-20 bg-black">
                    <div className="container">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6">
                            <Card className="bg-transparent! p-0 relative w-full h-[409px] rounded-[20px] overflow-hidden border border-solid border-[#ffffff24] bg-[linear-gradient(129deg,rgba(255,255,255,0.11)_0%,rgba(255,255,255,0.04)_100%)]" > 
                                <CardContent className="p-0 h-full"> 
                                    <div className="relative w-full h-[311px] flex bg-[linear-gradient(49deg,rgba(0,0,0,1)_0%,rgba(14,55,63,1)_46%,rgba(40,112,126,0.71)_75%,rgba(95,194,213,0)_100%)]">
                                        <div className="w-full h-[311px] flex-1 relative">
                                            <Image
                                            src="/images/team-1.png"
                                            alt=""
                                            fill
                                            className="object-contain"
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full h-[98px] flex gap-[7px] justify-between bg-[linear-gradient(180deg,rgba(31,31,31,1)_0%,rgba(3,3,3,1)_50%,rgba(0,0,0,1)_100%)]">
                                        <div className="w-full p-6 relative flex gap-[7px] justify-between items-center bg-[linear-gradient(180deg,rgba(31,31,31,1)_0%,rgba(3,3,3,1)_50%,rgba(0,0,0,1)_100%)]">
                                            <div className="flex flex flex-col justify-center">
                                                <h3 className="font-sans font-semibold text-[#fefefe] text-base! tracking-[0]! leading-[normal]!">Oliver Michael</h3>
                                                <p className="font-sans font-normal text-[#d2d2d2] text-xs! tracking-[0]! leading-[normal]!">Chief executive officer</p>
                                            </div>

                                            <div className="absolute w-[17.68%] h-[83.33%] top-[9.52%] left-[82.32%]">
                                                <Image
                                                    src="/images/linkdin-icon.png"
                                                    alt="Group"
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="absolute bottom-0 w-full flex items-center justify-between">

                                    </div>  */}
                                </CardContent> 
                            </Card>
                        </div>
                    </div>    
                </section>                
            </div>
        </main>
    )
}