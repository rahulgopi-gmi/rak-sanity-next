import { cn } from "@/lib/utils";

interface PillTagProps extends React.HTMLAttributes<HTMLParagraphElement> {
    variant?: "light" | "dark";
 }

export default function PillTag({ variant = "dark", className, children, ...props }: PillTagProps) {

    const variantClasses =
        variant === "light"
            ? "border border-[#5FC2D5] leading-[1]! text-black bg-[linear-gradient(0deg,_rgba(255,_255,_255,_0.11)_0%,_rgba(95,_194,_213,_0.23)_0.01%,_rgba(95,_194,_213,_0.01)_88.24%)]! [box-shadow:0_0_14px_0_rgba(255,_255,_255,_0.19)_inset]! px-8 py-[8px]"
            : "pill-tag border border-white/20 text-white px-6 py-2";

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