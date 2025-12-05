"use client";

import Link from "next/link";
import { Button } from "../../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Textarea } from "../../ui/textArea";
import { Spinner } from "../../ui/spinner";
import { Input } from "../../ui/input";
import * as Yup from "yup"
import { useFormik } from "formik";
import { Error } from "@/components/ui/error";
import { useState } from "react";
import PhoneInput, { isPossiblePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
    formonly?: boolean;
};

export default function ContactForm({ formonly = true }: Props) {
    const searchParams = useSearchParams();

    const utm_source = searchParams.get("utm_source") || "";
    const utm_medium = searchParams.get("utm_medium") || "";
    const utm_campaign = searchParams.get("utm_campaign") || "";
    const utm_term = searchParams.get("utm_term") || "";
    const utm_content = searchParams.get("utm_content") || "";
    const referrer_name = searchParams.get("referrer_name") || "";
    const referrer_email = searchParams.get("referrer_email") || "";

    const [loader, setLoader] = useState<boolean>(false);
    const [value, setValue] = useState<any>();
    const router = useRouter();
    
    const initialValues = {
        first_name : "",
        last_name : "",
        email: "",
        phone: "",
        message: "",
        enquiry_type: ""
    }

    const validationSchema = Yup.object({
        first_name: Yup.string()
            .max(50, "First Name cannot exceed 50 characters")
            .matches(/^[\p{L} ]+$/u, "First Name can only contain letters and spaces")
            .required("First Name is required"),
        last_name: Yup.string()
            .max(50, "First Name cannot exceed 50 characters")
            .matches(/^[\p{L} ]+$/u, "First Name can only contain letters and spaces")
            .required("Last Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        phone: Yup.string().required("Phone is required"),
        message: Yup.string()
            .max(1000, "First Name cannot exceed 1000 characters")    
            .required("Message is required"),
        enquiry_type: Yup.string().required("Enquiry Type is required")
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            setLoader(true);
            const formDataWithUTM = {
                ...values,
                ...(utm_source && { utm_source }),
                ...(utm_medium && { utm_medium }),
                ...(utm_campaign && { utm_campaign }),
                ...(utm_term && { utm_term }),
                ...(utm_content && { utm_content }),
                ...(referrer_name && { referrer_name }),
                ...(referrer_email && { referrer_email }),
            };

            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formDataWithUTM),
            });            

            if (res.ok) {
                toast.success("Message sent successfully!");
                router.push('/thankyou');
                setLoader(false);
                resetForm();
            } 
            else {
                toast.error("Error sending message");
                setLoader(false);                
            }
        }
    });

    return (
        <div id="contact" className="contact-wrapper">
            <div className={formonly ? "container mx-auto" : ""}>
                <div className="row flex -mx-2">
                    {
                        formonly &&
                            <div className="w-full px-2 [@media(max-width:991px)]:text-center [@media(max-width:991px)]:pb-[18px]" data-aos="fade-up" data-aos-duration="2000">
                                <h4 className="rounded-[17.5px] border transition border-[#5FC2D5] text-black bg-[linear-gradient(0deg,rgba(255,255,255,0.11)_0%,rgba(95,194,213,0.23)_0.01%,rgba(95,194,213,0.01)_88.24%)] [box-shadow:0_0_14px_0_rgba(255,255,255,0.19)_inset] font-sans text-[16px]! not-italic font-normal! leading-[normal]! uppercase px-[25px] py-2 inline-block mb-[30px]">
                                    Get Started
                                </h4>

                                <h2 className="font-extrabold uppercase text-black mb-8">
                                    Let’s start building the&nbsp;
                                    <span className="bg-linear-to-r from-[#81BCD2] via-[#7DB2CD] to-[#5752A3] bg-clip-text text-transparent">future</span>
                                </h2>

                                <h5 className="text-black font-sans text-base mt-6 text-[16px]! not-italic font-normal leading-[normal]">
                                    GIVE US A CALL
                                </h5>

                                <Link href="tel:+97172222325"
                                    className="text-black text-[21px] not-italic font-medium leading-[normal] underline relative hover:text-[#5752A3]">
                                    +971 7 2222325
                                </Link>
                            </div>
                    }                    

                    <div className="w-full px-2 [@media(max-width:991px)]:w-full" data-aos="fade-up" data-aos-duration="2000">
                        <form 
                            className="form-section home-form space-y-6"
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="w-full">
                                <Input
                                    type="text"
                                    placeholder="First Name*"
                                    name="first_name"
                                    id="first_name"
                                    value={formik.values.first_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                
                                {
                                    formik.touched.first_name && formik.errors.first_name &&
                                    (<Error className="mt-3">{formik.errors.first_name}</Error>)
                                }                                
                                
                            </div>

                            <div className="w-full">
                                <Input
                                    type="text"
                                    placeholder="Last Name*"
                                    name="last_name"
                                    id="last_name"
                                    value={formik.values.last_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}

                                />

                                {
                                    formik.touched.last_name && formik.errors.last_name &&
                                    (<Error className="mt-3">{formik.errors.last_name}</Error>)
                                }  
                            </div>

                            <div className="w-full">
                                <Input
                                    type="email"
                                    placeholder="Email*"
                                    name="email"
                                    id="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                                {
                                    formik.touched.email && formik.errors.email &&
                                    (<Error className="mt-3">{formik.errors.email}</Error>)
                                } 
                            </div>

                            <div className="w-full phone-section">
                                <PhoneInput
                                    defaultCountry="AE"
                                    placeholder="Enter phone number"
                                    value={value}
                                    onChange={(e) => {                                        
                                        formik.setFieldValue("phone", e);
                                    }}
                                    error={value ? (isValidPhoneNumber(value) ? undefined : 'Invalid phone number') : 'Phone number required'}
                                    countryCallingCodeEditable={false}
                                />

                                {
                                    formik.touched.phone && formik.errors.phone &&
                                    (<Error className="mt-3">{formik.errors.phone}</Error>)
                                }
                            </div>

                            <div className="w-full select-wrapper-main">
                                <Select
                                    name="enquiry_type"
                                    onValueChange={(value)=>{                                      
                                        formik.setFieldValue("enquiry_type", value);
                                    }}                                    
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue                                             
                                            placeholder="Inquiry Type*"
                                        />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="Setting up at Innovation City">
                                            Setting up at Innovation City
                                        </SelectItem>

                                        <SelectItem value="Become a Referral Agent">
                                            Become a Referral Agent
                                        </SelectItem>

                                        <SelectItem value="Partnering with Innovation City">
                                            Partnering with Innovation City
                                        </SelectItem>

                                        <SelectItem value="General Enquiry">
                                            General Enquiry
                                        </SelectItem>

                                        <SelectItem value="Media Enquiries">
                                            Media Enquiries
                                        </SelectItem>

                                        <SelectItem value="Careers">
                                            Careers
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                {
                                    formik.touched.enquiry_type && formik.errors.enquiry_type &&
                                    (<Error className="mt-3">{formik.errors.enquiry_type}</Error>)
                                } 
                            </div>

                            <div className="w-full">
                                <Textarea 
                                    name="message" 
                                    id="message" 
                                    placeholder="Message"
                                    value={formik.values.message}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                ></Textarea>
                               
                                {
                                    formik.touched.message && formik.errors.message &&
                                    (<Error className="mt-3">{formik.errors.message}</Error>)
                                } 
                            </div>

                            <div id="formStatus" className="success-msg w-full mt-6"></div>

                            <div className="w-full flex items-center gap-8">
                                <Button type="submit" className="uppercase">Send Message</Button>

                                {
                                    loader &&
                                    (
                                        <div id="loader" className="w-[30px]">
                                            <Spinner />
                                        </div>
                                    )
                                }                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}