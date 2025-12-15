import * as React from "react"

import { cn } from "@/lib/utils"

type InputSize = "sm" | "md" | "lg"

interface InputProps extends React.ComponentProps<"input"> {
  variant?: InputSize;
}

function Input({ className, type, variant = "md", ...props }: InputProps) {

  const sizeClasses: Record<InputSize, string> = {
    sm: "h-[47px]! px-[15px]! text-[14px]! rounded-[8px] bg-[rgba(255,255,255,0.05)]",
    md: "h-[60px] px-[25px] text-[16px] rounded-[14px] bg-[rgba(195,195,195,0.20)]", // default
    lg: "h-[72px] px-[30px] text-[18px] bg-[rgba(195,195,195,0.20)]",
  }

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "border border-[#ffffff2e]  w-full py-[15px] text-black font-sans not-italic font-normal leading-[normal] *:focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          sizeClasses[variant],
          className
      )}
      {...props}
    />
  )
}

export { Input }
