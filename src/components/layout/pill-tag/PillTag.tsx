import { cn } from "@/lib/utils";

interface PillTagProps extends React.HTMLAttributes<HTMLParagraphElement> {
    variant?: "light" | "dark";
 }

export default function PillTag({ variant = "dark", className, children, ...props }: PillTagProps) {

    const variantClasses =
        variant === "light"
            ? "pill-tag-light leading-[normal]! text-black px-8"
            : "pill-tag border border-white/20 text-white px-6";

    return(
        <p 
            data-aos="fade-up" 
            className={
                cn(
                    "font-sans w-fit uppercase text-base! font-normal rounded-[17.5px]! shadow-inner",
                    variantClasses,
                    className
                )
            }
            {...props}
        >
            {children}
        </p>
    )
}