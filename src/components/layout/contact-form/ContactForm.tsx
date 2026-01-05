"use client";

import Link from "next/link";
import { Button } from "../../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Textarea } from "../../ui/textArea";
import { Spinner } from "../../ui/spinner";
import { Input } from "../../ui/input";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Error } from "@/components/ui/error";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { isValidPhoneNumber } from "react-phone-number-input";
import PillTag from "../pill-tag/PillTag";

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
    
    const [country, setCountry] = useState("ae"); 
    const [countryCode, setCountryCode] = useState("");
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
            .max(50, "Last Name cannot exceed 50 characters")
            .matches(/^[\p{L} ]+$/u, "Last Name can only contain letters and spaces")
            .required("Last Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        phone: Yup.string().required("Phone Number is required")
            .test(
                "valid-phone",
                "Invalid Phone Number for selected country",
                function (value) {
                    if (!value || !countryCode) return false;
                    const fullNumber = `+${countryCode} ${value}`;
                    return isValidPhoneNumber(fullNumber);
                }
            ),
        message: Yup.string()
            .max(1000, "Message cannot exceed 1000 characters"),
        enquiry_type: Yup.string().required("Enquiry Type is required")
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try{
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
                    setSubmitting(false);
                    resetForm();
                } 
                else {
                    toast.error("Error sending message");
                    setSubmitting(false);                
                }
            }
             catch (error) {
                console.error(error);
                toast.error("Something went wrong. Please try again.");
                setSubmitting(false);
            }    
        }
    });

    return (
        <div id="contact" className="contact-wrapper">
            <div className={formonly ? "container mx-auto" : ""}  data-aos="fade-up" data-aos-delay="200">
                <div className="row flex -mx-2 max-lg:flex-col">
                    {
                        formonly &&
                            <div className="w-full px-2 [@media(max-width:991px)]:text-center [@media(max-width:991px)]:pb-[18px]" data-aos="fade-up" data-aos-duration="2000">                                
                                <PillTag className="mb-[30px] max-lg:mx-auto" variant={'light'}>Get Started</PillTag>

                                <h2 className="font-extrabold uppercase text-black mb-8">
                                    Let’s start building the&nbsp;
                                    <span className="bg-linear-to-r from-[#81BCD2] via-[#7DB2CD] to-[#5752A3] bg-clip-text text-transparent">future</span>
                                </h2>

                                <h5 className="text-black font-sans text-base mt-12 text-[16px]! not-italic font-normal leading-[normal]">
                                    GIVE US A CALL
                                </h5>

                                <Link href="tel:+97172222325"
                                    className="text-black text-[21px] not-italic font-semibold leading-[100%] underline relative hover:text-[#5752A3] font-sans">
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
                                    className={`${formonly ? 'placeholder:text-[#484545]/60!' : 'text-[rgba(255,255,255,0.60)]!'}`}
                                    autoComplete="off"
                                />
                                
                                {
                                    formik.touched.first_name && formik.errors.first_name &&
                                    (<Error className="mt-1">{formik.errors.first_name}</Error>)
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
                                    className={`${formonly ? 'placeholder:text-[#484545]/60!' : 'text-[rgba(255,255,255,0.60)]!'}`}
                                    autoComplete="off"
                                />

                                {
                                    formik.touched.last_name && formik.errors.last_name &&
                                    (<Error className="mt-1">{formik.errors.last_name}</Error>)
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
                                    className={`${formonly ? 'placeholder:text-[#484545]/60!' : 'text-[rgba(255,255,255,0.60)]!'}`}
                                    autoComplete="off"
                                />

                                {
                                    formik.touched.email && formik.errors.email &&
                                    (<Error className="mt-1">{formik.errors.email}</Error>)
                                } 
                            </div>

                            <div className="w-full phone-section">
                                <div className="w-full flex gap-1">
                                    <div className="w-32">
                                        <PhoneInput
                                            country={country}
                                            enableSearch={true}
                                            value={countryCode.replace("+", "")}
                                            disableCountryCode={false}
                                            disableDropdown={false}
                                            inputClass={formonly ? "phone-input" : "phone-input-cs"}                   
                                            onChange={(_, countryData:any) => {
                                                setCountry(countryData?.countryCode);
                                                setCountryCode(countryData?.dialCode);
                                                formik.setFieldValue("phone", "");
                                            }}                                                
                                            containerStyle={{
                                                width: "100%"
                                            }}
                                            inputStyle={{
                                                width: "100%",
                                                height: "60px",
                                                background: "#c3c3c333",
                                                color: "white",
                                                borderRadius: "14px",
                                                border: "1px solid rgba(255,255,255,0.2)",
                                                paddingLeft: "50px",
                                                fontWeight: "500",
                                                fontSize: "16px",                                    
                                                lineHeight: "16px",
                                                pointerEvents: "none"
                                            }}
                                            buttonStyle={{
                                                background: "transparent",
                                                border: "0",
                                                borderRadius: "8px 0 0 8px",
                                                width: "70px"
                                            }}
                                            dropdownStyle={{
                                                background: "#111",
                                                color: "white"
                                            }}
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Input                                             
                                            type="tel" 
                                            placeholder="Enter Phone Number"
                                            value={formik.values.phone}
                                            onChange={(e) =>
                                                formik.setFieldValue(
                                                    "phone",
                                                    e.target.value.replace(/\D/g, "")
                                                )
                                            }
                                            autoComplete='off'                                            
                                            onBlur={() => formik.setFieldTouched("phone", true)}
                                        />                            
                                    </div>
                                </div>        

                                {
                                    formik.touched.phone && formik.errors.phone &&
                                    (<Error className="mt-1">{formik.errors.phone}</Error>)
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
                                    (<Error className="mt-1">{formik.errors.enquiry_type}</Error>)
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
                                    className={`${formonly ? 'placeholder:text-[#484545]/60!' : 'text-[rgba(255,255,255,0.60)]!'}`}
                                    autoComplete="off"
                                ></Textarea>
                               
                                {
                                    formik.touched.message && formik.errors.message &&
                                    (<Error className="mt-1">{formik.errors.message}</Error>)
                                } 
                            </div>                            

                            <div className={`w-full flex items-center gap-8 ${!formonly ? 'max-md:justify-center' : ''}`}>
                                <Button 
                                    type="submit" 
                                    disabled={formik.isSubmitting} 
                                    className={`uppercase text-base ${!formonly ? 'max-md:text-[12px]! max-md:h-[42px]!' : ''}`}
                                >
                                    {formonly ? 'Send Message' : 'Submit'}
                                </Button>
                                {
                                    formik.isSubmitting &&
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