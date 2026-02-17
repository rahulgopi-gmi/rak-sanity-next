"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Fragment, useTransition, useState } from "react";
import { Mail } from "lucide-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Error } from "@/components/ui/error";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";
import { subscribe } from "@/app/actions/subscribe";

export default function BlogNewsLetter(props : { view : boolean}) {
    const { view } = props;
    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState("");

    const initialValues = {
        email: "",       
    }

    const validationSchema = Yup.object({            
        email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email address is required")            
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            startTransition(async () => {
                try {
                    const result = await subscribe(values.email);
                    if (result.success) {
                        setStatus("Subscribed successfully!");
                        resetForm();
                    } 
                    else {                        
                        setStatus(result.error || "Subscription failed.")
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("Something went wrong. Please try again.");
                    setStatus("Something went wrong. Please try again.");
                }
                setSubmitting(false);
            });            
        }
    });        

    return(
        <Fragment>
        {
            view ?
            (
                <form onSubmit={formik.handleSubmit}>
                    <div className="mt-8 flex items-center [@media(min-width:300px)_and_(max-width:400px)]:flex-col gap-4 w-full border border-[rgba(95,194,213,0.30)] rounded-2xl bg-black/40 pl-4 pr-2  py-4.5 sm:py-2">
                        <div className="flex w-full items-center gap-4">
                            <span className="text-white/40 text-xl">
                                <Mail />
                            </span>

                            <Input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 border-0 h-auto outline-none! pl-1 py-0! focus:outline-none! focus:shadow-none! focus-visible:shadow-none! bg-transparent text-white/50 placeholder-white/50 font-sans text-[14px]! focus-visible:ring-0! font-normal leading-none"
                                name="email"
                                id="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                autoComplete="off"
                            />
                        </div>

                            <Button type="submit" className="px-6 capitalize rounded-[12px]! h-10! text-sm font-medium leading-5! [@media(min-width:300px)_and_(max-width:400px)]:w-full!" disabled={formik.isSubmitting}>
                                Subscribe Now
                                {
                                    (formik.isSubmitting || isPending) && <Spinner className="text-black" />
                                }                            
                        </Button>
                    </div>
                    {
                        formik.touched.email && formik.errors.email &&
                        (<Error className="mt-1">{formik.errors.email}</Error>)
                    } 
                    {
                        status && (
                            <Error className="mt-1">{status}</Error>                            
                        )
                    }
                </form>
            )
            :
            (
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        type="email"
                        placeholder="Your email"
                        className="h-12.5 text-white! px-3! text-sm! rounded-xl border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.05)] focus:border-[#2ad3ff]"
                        name="email"
                        id="email"
                        value={formik.values.email}
                        onChange={(e) => {
                            formik.setFieldValue("email", e.target.value);
                            setStatus("");
                        }}
                        onBlur={formik.handleBlur}
                    />

                    {
                        formik.touched.email && formik.errors.email &&
                        (<Error className="mt-3">{formik.errors.email}</Error>)
                    } 

                    <Button 
                        type="submit" 
                        size={'sm'} 
                        className="w-full mt-4 text-sm! font-medium! leading-5!" 
                        disabled={formik.isSubmitting}
                    >
                        Subscribe
                        {
                            (formik.isSubmitting || isPending) && <Spinner className="text-black" />
                        }
                    </Button>
                    {
                        status && (
                            <Error className="text-xs! mt-3">{status}</Error>                            
                        )
                    }
                </form>                               
            )
        }
        </Fragment>
    )
}