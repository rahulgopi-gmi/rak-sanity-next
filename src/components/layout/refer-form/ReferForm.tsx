"use client";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Spinner } from "../../ui/spinner";
import { Input } from "../../ui/input";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { useState } from "react";
import * as Yup from "yup"
import { useFormik } from "formik";
import { Error } from "@/components/ui/error";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

export default function ReferForm() {
    const [value, setValue] = useState<any>();
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const utm_source = searchParams.get("utm_source") || "";
    const utm_medium = searchParams.get("utm_medium") || "";
    const utm_campaign = searchParams.get("utm_campaign") || "";
    const utm_term = searchParams.get("utm_term") || "";
    const utm_content = searchParams.get("utm_content") || "";
    const referrer_name_parms = searchParams.get("referrer_name") || "";
    const referrer_email_parms = searchParams.get("referrer_email") || "";

    const initialValues = {
        first_name : "",
        last_name : "",
        email: "",
        phone: "",
        referrer_name: "",
        referrer_phone: "",
        referrer_email: "",
        referrer_has_company_registered: false,
    }

    const validationSchema = Yup.object({
        first_name: Yup.string()
            .max(50, "First Name cannot exceed 50 characters")
            .matches(/^[\p{L} ]+$/u, "First Name can only contain letters and spaces")
            .required("First Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        phone: Yup.string().required("Phone is required")
        .transform(value => (value && !value.startsWith("+") ? `+${value}` : value))
                    .test("valid", "Phone number is invalid", value => isValidPhoneNumber(value || "")),
        referrer_name: Yup.string()
            .max(50, "First Name cannot exceed 50 characters")
            .matches(/^[\p{L} ]+$/u, "Referral Name can only contain letters and spaces")
            .required("Last Name is required"),
        referrer_phone: Yup.string().required("Referral Phone is required")
        .transform(value => (value && !value.startsWith("+") ? `+${value}` : value))
                    .test("valid", "Phone number is invalid", value => isValidPhoneNumber(value || "")),
        referrer_email: Yup.string().email("Invalid email").required("Referral Email is required"),
        referrer_has_company_registered: Yup.boolean()
            .required("Company Registered is required")
            .transform((value) => value === "yes"),
    });    

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const { 
                    referrer_name, 
                    referrer_email, 
                    referrer_phone, 
                    first_name,
                    phone,
                    email
                } = values;               

                let refFirst = "";
                let refLast = "";

                if (referrer_name?.trim()) {
                    const parts = referrer_name.trim().split(/\s+/);
                    refFirst = parts[0];
                    refLast = parts.slice(1).join(" ") || parts[0];
                }

                const formDataWithUTM = {
                    ...values,
                    first_name: refFirst,
                    last_name: refLast,
                    email: referrer_email,  
                    phone: referrer_phone,
                    referrer_name: first_name,
                    referrer_phone: phone,
                    referrer_email: email,
                    ...(utm_source && { utm_source }),
                    ...(utm_medium && { utm_medium }),
                    ...(utm_campaign && { utm_campaign }),
                    ...(utm_term && { utm_term }),
                    ...(utm_content && { utm_content }),
                    ...(referrer_name && { referrer_name_parms }),
                    ...(referrer_email && { referrer_email_parms }),
                }

                const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formDataWithUTM),
                });

                if (res.ok) {
                    toast.success("Message sent successfully!");
                    router.push('/thankyou');                    
                    resetForm();
                    setSubmitting(false);
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
            className="w-full"
        >
            <div className="w-full mb-7">
                <Label>Your Name</Label> 
                <Input 
                    type="text" 
                    placeholder="Your Name" 
                    name="first_name"
                    id="first_name"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="text-white!"
                />
                
                {
                    formik.touched.first_name && formik.errors.first_name &&
                    (<Error className="mt-3">{formik.errors.first_name}</Error>)
                }
            </div>

            <div className="w-full mb-7 refer-phone">
                <Label>Your Phone Number</Label>
                <PhoneInput
                    country="ae"                    
                    placeholder="Enter phone number"
                    value={value}
                    onChange={(phone) => {
                        setValue(phone);
                        formik.setFieldValue("phone", phone);
                    }}
                    onBlur={() => formik.setFieldTouched("phone", true)}           
                    enableSearch={true}
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
                        paddingLeft: "70px"
                    }}
                    buttonStyle={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "14px 0 0 14px",
                        width: "50px"
                    }}
                    dropdownStyle={{
                        background: "#111",
                        color: "white"
                    }}
                />                
                
                {
                    formik.touched.phone && formik.errors.phone &&
                    (<Error className="mt-3">{formik.errors.phone}</Error>)
                }
            </div>

            <div className="w-full mb-7">
                <Label>Your Email Address</Label> 
                <Input 
                    type="email" 
                    placeholder="Your Email Address" 
                    name="email"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="text-white!"
                />

                {
                    formik.touched.email && formik.errors.email &&
                    (<Error className="mt-3">{formik.errors.email}</Error>)
                } 

            </div>

            <div className="w-full mb-7 mt-6">
                <Label>Do you have a company registered in Innovation City?</Label>                
                <div className="w-full flex flex-row items-center gap-6">
                    <RadioGroup 
                        value={formik.values.referrer_has_company_registered ? "yes" : "no"}
                        onValueChange={(value: string) =>                        
                            formik.setFieldValue('referrer_has_company_registered', value === "yes")
                        }
                        className="w-full flex"
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <RadioGroupItem value="yes" id="yes" />
                            <Label htmlFor="yes" className="mb-0">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="no" />
                            <Label htmlFor="no" className="mb-0">No</Label>
                        </div>
                    </RadioGroup>
                </div>

                {
                    formik.touched.referrer_has_company_registered && formik.errors.referrer_has_company_registered &&
                    (<Error className="mt-3">{formik.errors.referrer_has_company_registered}</Error>)
                }
            </div>

            <div className="w-full mb-7 mt-2">
                <hr className="border-[#FFFFFF2E]" />
            </div>

            <div className="w-full mb-7">
                <p className="text-[#FFFFFF99] text-[16px]! font-medium font-sans leading-[normal]">Enter the details of the person you’re referring below:</p>
            </div>

            <div className="w-full mb-7">
                <Label>Referral Name</Label> 
                <Input 
                    type="text" 
                    placeholder="Referral Name" 
                    name="referrer_name"                     
                    id="referrer_name"
                    value={formik.values.referrer_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="text-white!"
                />
                
                {
                    formik.touched.referrer_name && formik.errors.referrer_name &&
                    (<Error className="mt-3">{formik.errors.referrer_name}</Error>)
                }
            </div>

            <div className="w-full mb-7 refer-phone">
                <Label>Referral Phone Number</Label>  
                <PhoneInput
                    country="ae"                    
                    placeholder="Enter phone number"
                    value={value}
                    onChange={(phone) => {
                        setValue(phone);
                        formik.setFieldValue("referrer_phone", phone);
                    }}
                    onBlur={() => formik.setFieldTouched("referrer_phone", true)}           
                    enableSearch={true}
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
                        paddingLeft: "70px"
                    }}
                    buttonStyle={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "14px 0 0 14px",
                        width: "50px"
                    }}
                    dropdownStyle={{
                        background: "#111",
                        color: "white"
                    }}
                />
                
                {
                    formik.touched.referrer_phone && formik.errors.referrer_phone &&
                    (<Error className="mt-3">{formik.errors.referrer_phone}</Error>)
                }
            </div>

            <div className="w-full mb-9">
                <Label>Referral Email Address</Label> 
                <Input 
                    type="email" 
                    placeholder="Referral Email Address" 
                    name="referrer_email"
                    value={formik.values.referrer_email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="text-white!" 
                />
                
                {
                    formik.touched.referrer_email && formik.errors.referrer_email &&
                    (<Error className="mt-3">{formik.errors.referrer_email}</Error>)
                }
            </div>

            <div className="w-full mb-8">
                <p className="text-[#FFFFFF99] text-[12px]! font-sans font-normal leading-[22.4px]!">
                    By submitting the form, you agree to the <Link href="https://freezone.innovationcity.com/rules-and-regulations/" target="_blank" className="text-[#5EBED3]">Terms and Conditions</Link> and <Link href="privacy-policy.html" className="text-[#5EBED3]">Privacy Policy</Link> of INC. You consent to INC collecting
                    your name, email address and phone number and contacting you either by the email address or phone number supplied.
                </p>
            </div>

            <div className="flex justify-center md:justify-start mt-4 gap-4">
                <Button type="submit" disabled={formik.isSubmitting}>Submit</Button>                

                {
                    formik.isSubmitting &&
                    (
                        <div id="loader" className="w-[30px] my-auto">
                            <Spinner />
                        </div>
                    )
                }
                
            </div>

            <div id="formStatus" className="success-msg w-full mt-6"></div>
        </form>
    )
}