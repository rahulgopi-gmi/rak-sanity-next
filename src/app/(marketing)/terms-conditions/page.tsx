import PillTag from "@/components/ui/pill-tag";
import Image from "next/image";
import styles from './styles.module.css'
import Link from "next/link";
import { Metadata } from "next";
import { getSeoData } from "@/sanity/lib/seo";
import { toPlainText } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { getPageDataOnly } from "@/lib/data";
import { notFound } from "next/navigation";

/**
 * Generate metadata for the page.
*/
export async function generateMetadata(): Promise<Metadata> {
    const slug = "privacy-policy";
    const template = "other";
    const seo  = await getSeoData(slug, template);

    if (!seo) return {};    

    const title = seo?.metaTitle;
    const description = seo.metaDescription?.length ? toPlainText(seo.metaDescription) : undefined;
    const ogImageUrl = urlFor(seo?.openGraphImage, { width: 1200, height: 630 });
    const keywords = seo?.keywords?.map((k: string) => k);

    return{
      title,
      description,
      keywords,
      referrer: "strict-origin-when-cross-origin",
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        title,
        description,
        type: "website",
        url: seo?.openGraphUrl,
        images: ogImageUrl ? [{ url: ogImageUrl }] : []        
      },
      twitter: {
          card: "summary_large_image",
          title,
          description,
          images: ogImageUrl ? [ogImageUrl] : [],
      },
      other: seo?.facebookAppId
        ? {
            "fb:app_id": seo.facebookAppId,
          }
        : undefined        
    } satisfies Metadata;
}

/**
 * Page Component
*/
export default async function Page() {
    const slug = "privacy-policy";
    const template = "other";
    const data = await getPageDataOnly(slug, template);
    if (!data) return notFound();
    const section = data?.sections?.[0];   
    if (!section) return notFound();

    return(
        <main className="w-full">
            <div className="w-full h-100 relative hidden md:block bg-black">
                <Image fill alt="" src="/images/gradient/bg-grd-banner.jpg" className="object-cover" />

                <div className="absolute w-full z-10 top-40 h-full">                    
                    <PillTag className="mx-auto mb-5!">                        
                        Terms & Conditions
                    </PillTag>  

                    <div className="xl:px-20 [&_h2]:text-white [&_h2]:font-extrabold [&_h2]:font-mono [&_h2]:text-center [&_h2]:uppercase [&_h2]:mb-4 max-md:[&_h2]:text-35! max-md:[&_h2]:leading-8.75! max-md:[&_br]:hidden">
                        <h2>Understanding Our Agreement</h2>
                    </div>

                    <div className="w-full flex justify-center [&_p]:text-white [&_p]:font-sans [&_p]:text-center [&_p]:max-w-150 [&_p]:mb-4 [&_p]:leading-6! [&_p]:text-base!">
                        <p>Please review our terms and conditions carefully to understand your rights, responsibilities, and the guidelines that govern your use of our services</p>
                    </div>                    
                </div>
            </div>

            <div className={`w-full h-full ${styles.contentBg}`}>
                <div className="container">
                    <div className="W-full flex gap-24 py-20 max-md:flex-col max-md:gap-0">
                        <div className="w-[70%] max-md:w-full">
                            <p className="font-sans text-base! font-normal mb-6 text-gray-950">
                                Welcome to the Terms & Conditions page of RAK Digital Assets Oasis (RAK DAO). Here, you'll find our Terms & Conditions, in addition to RAK DAO Regulations, Privacy Policy governing our services, initiatives, products, and programs. Our aim is to offer clear guidelines for a seamless user experience.
                            </p>

                            <p className="font-sans text-base! font-normal mb-6 text-gray-950">
                                Each section below outlines specific terms and conditions for different aspects of our offerings. Quick access links are provided for your convenience.
                                By using our services, you agree to comply with the terms and conditions outlined here. We encourage you to review these regularly, as they may be updated to reflect changes in our services and policies.
                            </p>

                            <p className="font-sans text-base! font-normal mb-6 text-gray-950">
                                Should you have any questions or need clarification, our support team is here to help.

                                Thank you for choosing RAK DAO. We're dedicated to providing exceptional service and a secure, transparent environment for all your licensing needs.
                            </p>

                            <h2 id="refund-policy" className="font-sans text-22 font-semibold leading-normal mb-6 text-gray-950">Fee Refund Policy</h2>

                            <p className="font-sans text-base! font-normal mb-6 text-gray-950">
                                This Refund Policy (the “Policy”) pertains to the registration fees (“Fees”) paid by either the Registered Agent or Client (“Applicant”) before the completion of their registration process with Ras Al Khaimah Digital Assets Oasis (the “Authority”). The Authority understands that circumstances may arise that warrant a refund of the Fees, and the Authority has established this Policy to outline the conditions and procedures for such refunds. This Policy reflects the Authority’s commitment to providing clear guidelines for refunding the Fees paid by the Applicant in completion of their registration.
                            </p>

                            <p className="font-sans text-base! font-normal mb-6 text-gray-950">
                                <strong>1. Refund Circumstances:</strong> The Authority may approve refund of the Fee in the following events:
                            </p>

                            <ul className="pl-4 mb-6 flex gap-3 flex-col">
                                <li className="text-base font-normal text-gray-950 flex gap-2"><span>(1).</span> The activities undertaken by the Applicant falls under a regulated area.</li>
                                <li className="text-base font-normal text-gray-950 flex gap-2"><span>(2).</span> The Applicant applied for a “premium activity” and the activity has not been approved by the Authority.</li>
                            </ul>

                            <p className="font-sans text-base! font-normal mb-6 text-gray-950">
                                <strong>2. Deductions:</strong> The Authority may deduct certain fees or charges before processing a refund, depending on the circumstances. These deductions will be made in accordance with the terms outlined below. Refunded amounts will be equal the paid amount less a deduction fee of Two Thousand Five Hundred UAE Dirhams (AED2500) for each case outlined below.
                            </p>

                            <ul className="pl-4 mb-6 flex gap-3 flex-col">
                                <li className="text-base font-normal text-gray-950 flex gap-2"><span>2.1.</span> Conditions for applying deductions before processing refunds:</li>
                                <li className="text-base font-normal text-gray-950 flex gap-2"><span>(2).</span> A. Pre-approval rejection: If Applicant is rejected for immigration purposes the deduction will apply.
                                    B. Non-Disclosure of information: in cases where the Authority finds that essential information was not properly disclosed by the Applicant, misrepresented, or if the Applicant fails to submit the information requested by the Authority.
                                    C. Fraudulent activities (including falsification of information, intentional deception, or misrepresentation, lying on official documents or forging signatures) deductions will apply if the Applicant is found to be fraudulent or performing fraudulent activities or if misrepresentation is identified during the application process.
                                    D. Other conditions: The Authority may also consider other deductions on a case-by-case basis after informing the Applicant of such deductions and eligibility of any refunds.
                                </li>
                            </ul>

                            <p className="font-sans text-base! font-normal mb-6 text-gray-950">
                                <strong>2.2:</strong>  On exceptional cases, if the registration was not successful for reasons other than stated in Article 2.1, the Authority reserves the right to hold the Fees paid by the Registered Agent as a “deposit” and apply a deduction of Two Hundred and Fifty Dirhams (AED 250) for immigration charges. The remaining “deposit” amount can be used by Registered Agent to process future applications.
                            </p>

                            <p className="font-sans text-base! font-normal mb-6 text-gray-950">
                                <strong>Refund Request process :</strong>
                            </p>

                            <p className="font-sans text-base! font-normal mb-6 text-gray-950">                            
                                3.1 The Applicant shall fill up completely and sign the Refund Request Form and submit the same to: BD@rakdao.com together with the supporting documentation and details of the requested refund.                                                                                    
                            </p>

                            <p className="font-sans text-base! font-normal mb-6 text-gray-950">
                                3.2 The Authority reserves the right to require the Applicant additional requirement which is deem necessary under given circumstances.
                            </p>

                            <p className="font-sans text-base! font-normal mb-6 text-gray-950">
                                3.3 Request for refund shall not be entertained if the Applicant fails to present the supporting documentation mentioned in clause 3.1 and/or additional requirement under clause 3.2.
                            </p>

                            <p className="font-sans text-base! font-normal mb-6 text-gray-950">
                                3.4 From the submission of the Refund Request Form and its supporting documents, an evaluation/assessment shall be conducted by Compliance and Commercial and the result of which shall be forwarded to the management for final decision. The Authority’s decision is final and binding upon the Applicant.
                            </p>

                            <p className="font-sans text-base! font-normal mb-1 text-gray-950">
                                <strong>4. Refund Amount:</strong>
                            </p>

                            <p className="font-sans text-base! font-normal mb-6 text-gray-950">                            
                                The refund amount will be in AED currency and will be determined based on the specific circumstances of each case and any applicable deductions. No interest on the amount to be refunded will be paid.
                            </p>

                            <p className="font-sans text-base! font-normal mb-1 text-gray-950">
                                <strong>5. Refund Processing Time:</strong>
                            </p>

                            <p className="font-sans text-base! font-normal mb-6 text-gray-950">                            
                                Refund processing time may vary but typically takes up to twenty-one (21) working days from the date of approval by the Authority.
                            </p>

                            <p className="font-sans text-base! font-normal mb-1 text-gray-950">
                                <strong>6. Refund Authorization:</strong>
                            </p>

                            <p className="font-sans text-base! font-normal mb-6 text-gray-950">                            
                                Refunds will be reviewed and finally approved by the Head of Compliance and the Chief Commercial Officer.
                            </p>

                            <p className="font-sans text-base! font-normal mb-1 text-gray-950">
                                <strong>7. Non-Refundable Fees: </strong>
                            </p>

                            <p className="font-sans text-base! font-normal mb-6 text-gray-950">                           
                                Certain fees, such as application processing fees, consultation fees, any third-party fees (such as immigration, translation, courier, other administration fees) paid by the Registered Agent in connection with the application shall not be refunded in full or in part.
                            </p>

                            <p className="font-sans text-base! font-normal mb-1 text-gray-950">
                                <strong>8. Release of Refund:</strong>
                            </p>

                            <p className="font-sans text-base! font-normal mb-6 text-gray-950">                            
                                The Fees paid in respect of the Applicant will be refunded via one of the following methods as authorised by the Authority:
                            </p>
                        </div>

                        <div className="w-[30%] h-full max-md:w-full">
                            <div className="border border-primary bg-primary/50 p-4 rounded-10">
                                <h2 className="font-sans text-lg font-semibold leading-normal">QUICK ACCESS</h2>
                                <ul className="mt-6">
                                    <li className="text-xs font-normal text-black py-4 bg-primary px-3 rounded-sm"><Link href="#refund-policy">1. Fee Refund policy</Link></li>
                                    <li className="text-xs font-normal text-black py-4 px-3 rounded-sm"><Link href="">2. Client Referral Program</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}