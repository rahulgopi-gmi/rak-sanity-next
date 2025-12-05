import { cn } from "@/lib/utils";

interface PillTagProps extends React.HTMLAttributes<HTMLParagraphElement> { }

export default function PillTag({ className, children, ...props }: PillTagProps) {
    return(
        <p 
            data-aos="fade-up" 
            className={
                cn(
                    "pill-tag font-sans w-fit uppercase text-white text-[16px] font-normal border border-white/20 rounded-[17.5px]  px-6 py-3 shadow-inner", 
                    className
                )
            }
            {...props}
        >
            {children}
        </p>
    )
}