"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

type LabelSize = "sm" | "md" | "lg"

interface LabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {
  size?: LabelSize
}

function Label({
  className,
  size = "md",
  ...props
}: LabelProps) {
  const sizeStyles: Record<LabelSize, string> = {
    sm: "text-[14px] font-normal mb-3",
    md: "text-[16px] font-bold mb-5",
    lg: "text-[20px] font-normal mb-5",
  }

  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "text-[#F3F4F4] font-sans leading-normal block select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        sizeStyles[size],
        className
      )}
      {...props}
    />
  )
}

export { Label }
