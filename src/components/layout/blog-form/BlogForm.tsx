"use client";

import { Button } from "@/components/ui/button";
import { Error } from "@/components/ui/error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { isValidPhoneNumber } from "react-phone-number-input";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";

export default function BlogForm() {
    const [value, setValue] = useState<any>();
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
        first_name: "",
        email: "",
        phone: "",
        business_activity: "",
        license_start: ""
    }

    const validationSchema = Yup.object({
        first_name: Yup.string()
            .max(50, "First Name cannot exceed 50 characters")
            .matches(/^[\p{L} ]+$/u, "First Name can only contain letters and spaces")
            .required("First Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        phone: Yup.string()
            .required("Phone is required")
            .transform(value => (value && !value.startsWith("+") ? `+${value}` : value))
            .test("valid", "Phone number is invalid", value => isValidPhoneNumber(value || "")),
        business_activity: Yup.string().required("Business Activity is required"),
        license_start: Yup.string().required("Planning Start is required")
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const { first_name } = values;            
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
        <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div className="space-y-2">                
                <Label size="sm" htmlFor="name" className="font-medium">Name*</Label>
                <Input 
                    type="text" 
                    variant={'sm'}
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

            <div className="space-y-2">               
                <Label size="sm" htmlFor="email" className="font-medium">Email*</Label>
                <Input
                    type="email"
                    variant={'sm'}
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

            <div className="space-y-2 blog-form-phone">                
                <Label size="sm" htmlFor="mobile number" className="font-medium">Mobile Number*</Label>
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
                        height: "47px",
                        background: "rgba(255,255,255,0.05)",
                        color: "white",
                        borderRadius: "8px",
                        border: "1px solid rgba(255,255,255,0.2)"
                    }}
                    buttonStyle={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.2)"
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

            <div className="space-y-2">               
                <Label size="sm" htmlFor="business activity" className="font-medium">Business Activity*</Label>
                <Input
                    type="text"
                    variant={'sm'}
                    name="business_activity"
                    id="business_activity"
                    value={formik.values.business_activity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="text-white!"
                />

                {
                    formik.touched.business_activity && formik.errors.business_activity &&
                    (<Error className="mt-3">{formik.errors.business_activity}</Error>)
                }
            </div>

            <div className="space-y-2">               
                <Label size="sm" htmlFor="" className="font-medium">How soon are you planning to start?*</Label>
                <div className="relative w-full">
                    <Select
                        name="license_start"
                        onValueChange={(value)=>{                                      
                            formik.setFieldValue("license_start", value);
                        }}                        
                    >
                        <SelectTrigger className="w-full text-white! text-sm! bg-[rgba(255,255,255,0.05)]! h-[47px]! rounded-[8px]!">
                            <SelectValue
                                placeholder="Select timeline*"
                            />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="Immediately">
                                Immediately
                            </SelectItem>

                            <SelectItem value="1–3 Months">
                                1–3 Months
                            </SelectItem>

                            <SelectItem value="3–6 Months">
                                3–6 Months
                            </SelectItem>

                            <SelectItem value="More than 6 Months">
                                More than 6 Months
                            </SelectItem>

                        </SelectContent>
                    </Select> 

                    {
                        formik.touched.license_start && formik.errors.license_start &&
                        (<Error className="mt-3">{formik.errors.license_start}</Error>)
                    }                   
                </div>
            </div>

            {/* <div className="rounded-[8px] border-[1.701px] border-[rgba(255,255,255,0.20)] bg-white p-4 flex items-center gap-3">
                <input type="checkbox" className="w-[18px] h-[18px]" />
                <span className="text-black text-[14px] font-sans font-medium leading-[21px]">I'm not a robot</span>
            </div> */}

            <div className="flex justify-center md:justify-start mt-8 gap-4">
                <Button type="submit" className="w-full font-medium! font-sans! text-sm! rounded-[8px] capitalize! h-[36px] leading-5! tracking-[0]" disabled={formik.isSubmitting}>
                    Submit
                    {
                        formik.isSubmitting &&
                        (
                            <div className="w-[30px] my-auto">
                                <Spinner className="text-black"/>
                            </div>
                        )
                    }
                </Button>               
            </div>    
           
        </form>
    )
}