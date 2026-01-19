import { cn } from "@/lib/utils";

interface PillTagProps extends React.HTMLAttributes<HTMLParagraphElement> {
    variant?: "light" | "dark" | "other";
}

export default function PillTag({ variant = "dark", className, children, ...props }: PillTagProps) {

    const variantClasses: Record<NonNullable<PillTagProps["variant"]>, string> = {
        light: "pill-tag-light leading-[normal]! text-black px-8",
        dark: "pill-tag border border-white/20 text-white px-6",
        other: "bg-[rgba(95,194,213,0.05)] border border-[#63C2D4] px-6 text-xs! text-[#63C2D4] px-4 py-1.5"
    };

    return (
        <p
            data-aos="fade-up"
            className={
                cn(
                    "font-sans w-fit uppercase text-base! font-normal rounded-[17.5px]! shadow-inner",
                    variantClasses[variant],
                    className
                )
            }
            {...props}
        >
            {children}
        </p>
    )
}