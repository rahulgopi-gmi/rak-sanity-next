"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { isValidPhoneNumber } from "react-phone-number-input";
import { useFormik } from "formik";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Error } from "@/components/ui/error";
import { Spinner } from "@/components/ui/spinner";

type CampaignsFormTYPE = {
    mode?: string;
}

export default function CampaignsForm({ mode } : CampaignsFormTYPE){
    const [country, setCountry] = useState("ae"); 
    const [countryCode, setCountryCode] = useState(""); 

    const searchParams = useSearchParams();
    const router = useRouter();        
    
    const utm_source = searchParams.get("utm_source") || "";
    const utm_medium = searchParams.get("utm_medium") || "";
    const utm_campaign = searchParams.get("utm_campaign") || "";
    const utm_term = searchParams.get("utm_term") || "";
    const utm_content = searchParams.get("utm_content") || "";
    const referrer_name = searchParams.get("referrer_name") || "";
    const referrer_email = searchParams.get("referrer_email") || "";    

    const initialValues = {
        first_name : "",
        last_name : "",
        email: "",
        phone: "",
        business_activity: ""
    }

    const validationSchema = Yup.object({
        first_name: Yup.string()
            .max(50, "First Name cannot exceed 50 characters")
            .matches(/^[\p{L} ]+$/u, "First Name can only contain letters and spaces")
            .required("First Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        phone: Yup.string().required("Phone Number is required")
            .test(
                "valid-phone",
                "Invalid phone number for selected country",
                function (value) {
                    if (!value || !countryCode) return false;
                    const fullNumber = `+${countryCode} ${value}`;
                    return isValidPhoneNumber(fullNumber);
                }
            ),
        business_activity: Yup.string()
            .required("Business Activity is required")
            .max(50, "Business Activity cannot exceed 50 characters")
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const {  first_name } = values;

                let refFirst = "";
                let refLast = "";

                if (first_name?.trim()) {
                    const parts = first_name.trim().split(/\s+/);
                    refFirst = parts[0];
                    refLast = parts.slice(1).join(" ") || parts[0];
                }

                const formDataWithUTM = {
                    ...values,
                    first_name: refFirst,
                    last_name: refLast,                   
                    ...(utm_source && { utm_source }),
                    ...(utm_medium && { utm_medium }),
                    ...(utm_campaign && { utm_campaign }),
                    ...(utm_term && { utm_term }),
                    ...(utm_content && { utm_content }),
                    ...(referrer_name && { referrer_name }),
                    ...(referrer_email && { referrer_email }),
                }                

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

    return(
        <form 
            onSubmit={formik.handleSubmit} 
            className="flex justify-center lg:justify-end"
        >
            <div className="w-full max-w-[588px] mr-0 rounded-3xl form-bg p-8 shadow-xl py-14 sm:px-[38px] px-[30px]" data-aos="fade-up">
                <div className="mb-8 w-full">
                    <Label size="sm" className="font-semibold">Your Name</Label>
                    <Input
                        type="text"
                        placeholder="Your Name"
                        name="first_name"
                        id="first_name"
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-white/5 text-white"
                    />

                    {
                        formik.touched.first_name && formik.errors.first_name &&
                        (<Error className="mt-3">{formik.errors.first_name}</Error>)
                    }
                </div>

                <div className="mb-8 w-full campaigns-form-phone">
                    <Label size="sm" className="font-semibold">Your Phone Number</Label>
                    <div className="w-full flex gap-1">
                        <div className="w-32">
                            <PhoneInput
                                country={country}
                                enableSearch={true}
                                value={countryCode.replace("+", "")}
                                disableCountryCode={false}
                                disableDropdown={false}                    
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
                                    background: "rgba(255,255,255,0.05)",
                                    color: "white",
                                    borderRadius: "14px",
                                    border: "1px solid rgba(255,255,255,0.2)",
                                    paddingLeft: "50px",
                                    fontWeight: "400",
                                    fontSize: "16px",
                                    pointerEvents: "none"
                                }}
                                buttonStyle={{
                                    background: "transparent",
                                    border: "0",
                                    borderRadius: "14px 0 0 14px",
                                    width: "60px"
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
                                className="bg-white/5 text-white"
                                onBlur={() => formik.setFieldTouched("phone", true)}
                            />
                        </div>
                    </div>        

                    {
                        formik.touched.phone && formik.errors.phone &&
                        (<Error className="mt-3">{formik.errors.phone}</Error>)
                    }
                </div>

                <div className="mb-8 w-full">
                    <Label size="sm" className="font-semibold">Your Email Address</Label>
                    <Input
                        type="email" 
                        name="email"
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Your Email Address"
                        className="bg-white/5 text-white"
                    />   

                    {
                        formik.touched.email && formik.errors.email &&
                        (<Error className="mt-3">{formik.errors.email}</Error>)
                    }
                </div>
                                
                <div className="mb-8 w-full">
                    <Label size="sm" className="font-semibold">Business Activity</Label>
                    <Input
                        type="text"
                        name="business_activity"
                        value={formik.values.business_activity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Business Activity"
                        className="bg-white/5 text-white"
                    /> 

                    {
                        formik.touched.business_activity && formik.errors.business_activity &&
                        (<Error className="mt-3">{formik.errors.business_activity}</Error>)
                    }                        
                </div>

                <div className="mb-8 w-full bottom-text">
                    <p className="font-sans text-[12px]! font-normal leading-[22.4px]! mb-6">
                        By submitting the form, you agree to the&nbsp;
                        <Link href="https://freezone.innovationcity.com/rules-and-regulations/" target="_blank" className={`${mode === "dark" ? "hover:text-primary/80" : "hover:text-[#32a0b9]"} text-primary  inline-block font-montserrat text-[12px] font-normal leading-[22.4px] underline`}>
                            Terms and Conditions
                        </Link>&nbsp;
                        and&nbsp;
                        <Link href="/privacy-policy" className={` ${mode === "dark" ? "hover:text-primary/80" : "hover:text-[#32a0b9]"} text-primary inline-block font-sans text-[12px] font-normal leading-[22.4px]! underline`}>
                            Privacy Policy
                        </Link> 
                        of INC. You consent to INC collecting your name, email address, phone number
                        and contacting you either by the email address or phone number supplied.
                    </p>
                </div>
            
                <div className="flex justify-center max-md:justify-start items-center gap-5 md:justify-start mt-4">
                    <Button type="submit" disabled={formik.isSubmitting}>Submit</Button>        
                    {
                        formik.isSubmitting &&
                        (
                            <div id="loader" className="w-[30px]">
                                <Spinner />
                            </div>
                        )
                    } 
                </div>
            </div>    
        </form>
    )
}