import { cn } from "@/lib/utils"

type ErrorProps = React.HTMLAttributes<HTMLParagraphElement>;

function Error({ className, children, ...props }: ErrorProps) {
    return(
        <p
            className={cn("text-sm! text-red-500 font-semibold font-sans", className)}
            {...props}
        >
            {children}
        </p>
    )
}

export { Error }