import PillTag from "@/components/ui/pill-tag";
import { PageDataType } from "@/features/application/types/sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { getPageBySlug } from "@/sanity/queries/pages";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/layout/contact/contact-form/ContactForm";

/** 
 *  Fetch Sanity Data
*/
const getData = async (slug: string, template: string): Promise<PageDataType | null> => {
    try {
        const { data } = await sanityFetch({
            query: getPageBySlug,
            params: {
                slug,
                template
            },
            stega: false,
        });
        return data ?? null;
    }
    catch (error) {
        console.error(`Sanity Fetch Error ${slug} : `, error);
        return null;
    }
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {      
    try{
        const { slug } = await params;
        const template = "other";
        //const data = await getData(slug, template);
        //if (!data) return notFound();

        return(
            <main className="w-full h-full">
                <div className="relative w-full bg-black bg-cover max-md:bg-[url('/images/gradient/bg-grd-banner.jpg')] bg-[url('/images/gradient/bg-grd-banner.jpg')] bg-no-repeat">
                    <div className="container max-auto" data-aos="fade-up" data-aos-delay="200">
                        <div className="mx-auto flex flex-col items-center justify-center text-center pt-37.5 max-md:pt-[135]">
                            <div className="w-[78px] h-[104px] relative">                                 
                                <Image
                                    src="/images/tencent.svg"
                                    alt=""
                                    fill
                                    className="object-cover aspect-[0.75]"
                                />
                            </div>

                            <h2 className="text-white font-mono font-extrabold mb-[11px] uppercase max-xl:leading-[44px]! text-center" data-aos="fade-up">Accelerate Your Web3 & <br /> Blockchain Journey with <br/> Tencent Cloud</h2>
                            <p className="text-[#BCBCBC] text-base font-normal leading-normal! mb-[19px] max-w-[791px] mx-auto text-center">Tencent Cloud as RAK DAO official strategies cloud partner, providing the special offer and training programs for company resident in RAK DAO</p>
                            
                            <PillTag className="capitalize" variant="other">
                                Regulatory Framework
                            </PillTag>
                        </div>
                    </div> 

                    <section className="w-full flex flex-col items-start gap-2.5 pt-12 pb-20 px-4 md:px-[120px]"> 
                        <div className="flex flex-col lg:flex-row items-start justify-center gap-6 w-full max-w-[1440px] mx-auto"> 
                            <div className="relative w-full lg:w-[476px] h-[410px] flex-shrink-0">
                                <Image
                                    src="/images/web.jpg"
                                    alt="Mask group"
                                    fill
                                    className="object-cover rounded-[20px]"
                                    sizes="(min-width: 1024px) 476px, 100vw"
                                />
                            </div>
                            
                            <div className="relative w-full lg:w-[678px] flex flex-col gap-6"> 
                                <h1 className="font-h-3 font-mono font-extrabold text-[#fefefe] text-[length:var(--h-3-font-size)]! tracking-[var(--h-3-letter-spacing)]! leading-[var(--h-3-line-height)]! [font-style:var(--h-3-font-style)]!"> Phasellus Hendrerit Aliquam ultricies </h1> 
                                <div className="font-p-regular font-normal font-sans text-[#d2d2d2] text-[length:var(--p-regular-font-size)]! tracking-[var(--p-regular-letter-spacing)]! leading-[var(--p-regular-line-height)]! [font-style:var(--p-regular-font-style)]!"> 
                                    <p className="mb-4"> Nulla finibus dui sit amet malesuada lobortis. Duis leo lacus, accumsan eu fringilla non, blandit et dui. Curabitur in elit tempor, vulputate ante et, porta mauris. In elementum arcu vitae quam scelerisque, vel bibendum elit aliquet. Curabitur elementum libero augue, in iaculis magna dignissim ut. </p> 
                                    <p className="mb-4"> Pellentesque elementum dui eu euismod rutrum. Aliquam malesuada luctus arcu eget scelerisque. Ut eu rhoncus mauris. Nullam in ligula sed ipsum convallis elementum. Donec venenatis accumsan turpis, ut mollis elit. Cras gravida neque sed justo tempus finibus non lacinia sem. Donec viverra vulputate dolor quis tempor. Etiam vel ante nisi. Sed sodales nulla dui. Quisque eleifend sed enim vel commodo. Praesent eleifend sem id tellus lacinia, at pharetra nisl pretium. Curabitur non leo in dolor finibus ullamcorper. </p> 
                                    <p> Aliquam lacinia nibh nisl, sit amet pretium metus vulputate sed. Sed vestibulum molestie tortor. Sed semper finibus mollis. Quisque mattis lobortis tellus eu egestas. Pellentesque egestas nisi nec ipsum hendrerit auctor. Phasellus fermentum ullamcorper risus vitae rutrum. </p> 
                                </div> 
                                
                                <div className="flex flex-col sm:flex-row items-center gap-5 mt-6">                                    
                                    <Button type="button">Visit Partner Website</Button>
                                    <Button type="button">Talk to us</Button>
                                </div> 
                            </div> 
                        </div>
                    </section>
                </div>

                <section className="w-full bg-black pt-10 pb-[120px]">
                    <div className="container">
                        <div className="flex flex-col items-center gap-6 w-full">
                            <PillTag className="capitalize">
                                HOW CAN WE ASSIST YOU?
                            </PillTag>

                            <h2 className="w-full font-h-3 font-extrabold font-mono text-[#fefefe] text-[length:var(--h-3-font-size)]! text-center tracking-[var(--h-3-letter-spacing)]! leading-[var(--h-3-line-height)]! [font-style:var(--h-3-font-style)]!">
                                Unlocking Blockchain <br />
                                Capabilities
                            </h2>

                            <div className="flex flex-col w-full max-w-[1200px] items-start gap-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                                    <Card className="flex bg-transparent! flex-col items-start gap-6 p-6 rounded-[20px] overflow-hidden border border-solid border-[#ffffff24] bg-[linear-gradient(129deg,rgba(255,255,255,0.11)_0%,rgba(255,255,255,0.04)_100%)]">
                                        <CardContent className="flex flex-col gap-6 p-0 w-full">
                                            <div className="flex items-center gap-5 w-full">
                                                <div className="flex items-center justify-center w-[63px] h-[63px] rounded-full relative">
                                                    <Image
                                                        src="/images/a1.svg"
                                                        alt=""
                                                        fill
                                                        className="mr-[20px]"
                                                    />
                                                </div>

                                                <h3 className="font-h6-large font-semibold font-sans text-[#fefefe]! text-[length:var(--h6-large-font-size)]! tracking-[var(--h6-large-letter-spacing)]! leading-[var(--h6-large-line-height)]! [font-style:var(--h6-large-font-style)]! whitespace-pre-line">
                                                    CLOUD<br />TECHNOLOGY
                                                </h3>
                                            </div>
                                            <p className="font-p-regular font-sans font-normal text-[#f0f1ed] text-[length:var(--p-regular-font-size)]! tracking-[var(--p-regular-letter-spacing)]! leading-[var(--p-regular-line-height)]! [font-style:var(--p-regular-font-style)]!">
                                                We provide industry leading cloud products and services, helping you improve user engagement, enhance compliance and security, and sustain underlying infrastructure.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card className="flex bg-transparent! flex-col items-start gap-6 p-6 rounded-[20px] overflow-hidden border border-solid border-[#ffffff24] bg-[linear-gradient(129deg,rgba(255,255,255,0.11)_0%,rgba(255,255,255,0.04)_100%)]">
                                        <CardContent className="flex flex-col gap-6 p-0 w-full">
                                            <div className="flex items-center gap-5 w-full">
                                                <div className="flex items-center justify-center w-[63px] h-[63px] rounded-full relative">
                                                    <Image
                                                        src="/images/a1.svg"
                                                        alt=""
                                                        fill
                                                        className="mr-[20px]"
                                                    />
                                                </div>

                                                <h3 className="font-h6-large font-semibold font-sans text-[#fefefe]! text-[length:var(--h6-large-font-size)]! tracking-[var(--h6-large-letter-spacing)]! leading-[var(--h6-large-line-height)]! [font-style:var(--h6-large-font-style)]! whitespace-pre-line">
                                                    CLOUD<br />TECHNOLOGY
                                                </h3>
                                            </div>
                                            <p className="font-p-regular font-sans font-normal text-[#f0f1ed] text-[length:var(--p-regular-font-size)]! tracking-[var(--p-regular-letter-spacing)]! leading-[var(--p-regular-line-height)]! [font-style:var(--p-regular-font-style)]!">
                                                We provide industry leading cloud products and services, helping you improve user engagement, enhance compliance and security, and sustain underlying infrastructure.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card className="flex bg-transparent! flex-col items-start gap-6 p-6 rounded-[20px] overflow-hidden border border-solid border-[#ffffff24] bg-[linear-gradient(129deg,rgba(255,255,255,0.11)_0%,rgba(255,255,255,0.04)_100%)]">
                                        <CardContent className="flex flex-col gap-6 p-0 w-full">
                                            <div className="flex items-center gap-5 w-full">
                                                <div className="flex items-center justify-center w-[63px] h-[63px] rounded-full relative">
                                                    <Image
                                                        src="/images/a1.svg"
                                                        alt=""
                                                        fill
                                                        className="mr-[20px]"
                                                    />
                                                </div>

                                                <h3 className="font-h6-large font-semibold font-sans text-[#fefefe]! text-[length:var(--h6-large-font-size)]! tracking-[var(--h6-large-letter-spacing)]! leading-[var(--h6-large-line-height)]! [font-style:var(--h6-large-font-style)]! whitespace-pre-line">
                                                    CLOUD<br />TECHNOLOGY
                                                </h3>
                                            </div>
                                            <p className="font-p-regular font-sans font-normal text-[#f0f1ed] text-[length:var(--p-regular-font-size)]! tracking-[var(--p-regular-letter-spacing)]! leading-[var(--p-regular-line-height)]! [font-style:var(--p-regular-font-style)]!">
                                                We provide industry leading cloud products and services, helping you improve user engagement, enhance compliance and security, and sustain underlying infrastructure.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>    
                    </div>    
                </section>

                <section className="bg-black pt-0 pb-[120px] px-0">
                    <div className="container mx-auto">
                        <div className="w-full flex flex-col items-center justify-center gap-10">
                            <div className="w-full max-w-[1172px] px-4">
                                <h2 className="font-h-4 font-semibold font-sans text-[#fefefe] text-[length:var(--h-4-font-size)]! tracking-[var(--h-4-letter-spacing)]! leading-[var(--h-4-line-height)]! [font-style:var(--h-4-font-style)]!">
                                    Alternate Service Providers
                                </h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4">
                                <Card className="bg-transparent! flex flex-col items-start gap-6 p-6 rounded-[20px] overflow-hidden border border-solid border-[#ffffff24] bg-[linear-gradient(129deg,rgba(255,255,255,0.11)_0%,rgba(255,255,255,0.04)_100%)]">
                                    <CardContent className="flex flex-col gap-6 p-0 w-full">
                                        <div className="flex items-center gap-5 w-full">
                                            <div className="flex w-[62px] h-[62px] items-center gap-2.5 p-px bg-[#ffffff3b] rounded-[14px] relative">
                                                <Image
                                                    src="/images/b1.svg"
                                                    alt="Service icon"
                                                    fill
                                                    className="w-[60px] h-[60px]"
                                                />
                                            </div>

                                            <h3 className="flex-1 text-lg! font-semibold leading-[normal]! font-semibold font-sans text-[#fefefe] text-[length:var(--h6-large-font-size)] tracking-[var(--h6-large-letter-spacing)] leading-[var(--h6-large-line-height)] [font-style:var(--h6-large-font-style)] whitespace-pre-line">
                                                CLOUD<br />TECHNOLOGY
                                            </h3>
                                        </div>

                                        <PillTag className="capitalize" variant="other">
                                            HOW CAN WE ASSIST YOU?
                                        </PillTag>

                                        <p className="w-full min-h-[100px] font-sans font-p-regular! font-normal text-[#f0f1ed] text-[length:var(--p-regular-font-size)]! tracking-[var(--p-regular-letter-spacing)]! leading-[var(--p-regular-line-height)]! [font-style:var(--p-regular-font-style)]!">
                                            We provide industry leading cloud products and services, helping you improve user engagement, enhance compliance and security, and sustain underlying infrastructure.
                                        </p>

                                        <Button type="button" className="w-fit px-9">LEARN MORE</Button>                                                                                
                                    </CardContent>
                                </Card>

                                <Card className="bg-transparent! flex flex-col items-start gap-6 p-6 rounded-[20px] overflow-hidden border border-solid border-[#ffffff24] bg-[linear-gradient(129deg,rgba(255,255,255,0.11)_0%,rgba(255,255,255,0.04)_100%)]">
                                    <CardContent className="flex flex-col gap-6 p-0 w-full">
                                        <div className="flex items-center gap-5 w-full">
                                            <div className="flex w-[62px] h-[62px] items-center gap-2.5 p-px bg-[#ffffff3b] rounded-[14px] relative">
                                                <Image
                                                    src="/images/b1.svg"
                                                    alt="Service icon"
                                                    fill
                                                    className="w-[60px] h-[60px]"
                                                />
                                            </div>

                                            <h3 className="flex-1 text-lg! font-semibold leading-[normal]! font-semibold font-sans text-[#fefefe] text-[length:var(--h6-large-font-size)] tracking-[var(--h6-large-letter-spacing)] leading-[var(--h6-large-line-height)] [font-style:var(--h6-large-font-style)] whitespace-pre-line">
                                                CLOUD<br />TECHNOLOGY
                                            </h3>
                                        </div>

                                        <PillTag className="capitalize" variant="other">
                                            HOW CAN WE ASSIST YOU?
                                        </PillTag>

                                        <p className="w-full min-h-[100px] font-sans font-p-regular! font-normal text-[#f0f1ed] text-[length:var(--p-regular-font-size)]! tracking-[var(--p-regular-letter-spacing)]! leading-[var(--p-regular-line-height)]! [font-style:var(--p-regular-font-style)]!">
                                            We provide industry leading cloud products and services, helping you improve user engagement, enhance compliance and security, and sustain underlying infrastructure.
                                        </p>

                                        <Button type="button" className="w-fit px-9">LEARN MORE</Button>
                                    </CardContent>
                                </Card>

                                <Card className="bg-transparent! flex flex-col items-start gap-6 p-6 rounded-[20px] overflow-hidden border border-solid border-[#ffffff24] bg-[linear-gradient(129deg,rgba(255,255,255,0.11)_0%,rgba(255,255,255,0.04)_100%)]">
                                    <CardContent className="flex flex-col gap-6 p-0 w-full">
                                        <div className="flex items-center gap-5 w-full">
                                            <div className="flex w-[62px] h-[62px] items-center gap-2.5 p-px bg-[#ffffff3b] rounded-[14px] relative">
                                                <Image
                                                    src="/images/b1.svg"
                                                    alt="Service icon"
                                                    fill
                                                    className="w-[60px] h-[60px]"
                                                />
                                            </div>

                                            <h3 className="flex-1 text-lg! font-semibold leading-[normal]! font-semibold font-sans text-[#fefefe] text-[length:var(--h6-large-font-size)] tracking-[var(--h6-large-letter-spacing)] leading-[var(--h6-large-line-height)] [font-style:var(--h6-large-font-style)] whitespace-pre-line">
                                                CLOUD<br />TECHNOLOGY
                                            </h3>
                                        </div>

                                        <PillTag className="capitalize" variant="other">
                                            HOW CAN WE ASSIST YOU?
                                        </PillTag>

                                        <p className="w-full min-h-[100px] font-sans font-p-regular! font-normal text-[#f0f1ed] text-[length:var(--p-regular-font-size)]! tracking-[var(--p-regular-letter-spacing)]! leading-[var(--p-regular-line-height)]! [font-style:var(--p-regular-font-style)]!">
                                            We provide industry leading cloud products and services, helping you improve user engagement, enhance compliance and security, and sustain underlying infrastructure.
                                        </p>

                                        <Button type="button" className="w-fit px-9">LEARN MORE</Button>                                                                                
                                    </CardContent>
                                </Card>
                            </div>
                        </div>    
                    </div>    
                </section>   

                <section className="w-full py-32">
                    <ContactForm />
                </section>         
            </main>
        )
    }
    catch(error){
        console.error("Page render failed:", error);
        return <div className="w-full h-screen flex items-center justify-center">
            <p className="text-sm! text-center">Something went wrong. Please try again later.</p>
        </div>;
    }
}