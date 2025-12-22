"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Fragment } from "react/jsx-runtime";
import { Mail } from "lucide-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Error } from "@/components/ui/error";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function BlogNewsLetter(props : { view : boolean}) {
    const { view } = props;
    const router = useRouter();

    const initialValues = {
        email: "",       
    }

    const validationSchema = Yup.object({            
        email: Yup.string().email("Invalid email").required("Email is required")            
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
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
        <Fragment>
        {
            view ?
            (
                <form onSubmit={formik.handleSubmit}>
                    <div className="mt-8 flex items-center gap-4 w-full border border-[rgba(95,194,213,0.30)] rounded-2xl bg-black/40 pl-4 pr-2  py-[18px] sm:py-2">
                        <span className="text-white/40 text-xl">
                            <Mail />
                        </span>

                        <Input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 border-0 h-auto outline-none! pl-0 focus:outline-none! focus:shadow-none! focus-visible:shadow-none! bg-transparent text-white/50 placeholder-white/50 font-sans text-[14px] font-normal leading-none"
                            name="email"
                            id="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {
                            formik.touched.email && formik.errors.email &&
                            (<Error className="mt-0">{formik.errors.email}</Error>)
                        } 

                        <Button type="submit" className="px-6 text-sm font-medium leading-5!" disabled={formik.isSubmitting}>
                            Subscribe Now
                            {
                                formik.isSubmitting && <Spinner className="text-black" />
                            }                            
                        </Button>
                    </div>
                </form>
            )
            :
            (
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        type="email"
                        placeholder="Your email"
                        className="h-[50px] text-white! px-3! rounded-[8px] border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.05)] focus:border-[#2ad3ff]"
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

                    <Button 
                        type="submit" 
                        size={'sm'} 
                                className="w-full mt-4 text-sm! font-medium leading-5" 
                        disabled={formik.isSubmitting}
                    >
                        Subscribe
                        {
                            formik.isSubmitting && <Spinner className="text-black" />
                        }
                    </Button>
                </form>                               
            )
        }
        </Fragment>
    )
}