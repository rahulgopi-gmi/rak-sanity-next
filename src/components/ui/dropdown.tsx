"use client"

import { useState, useRef, useEffect, ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "./checkbox"
import { X, XCircle } from "lucide-react" // For close icon (optional, or use your own icon)
import { Card } from "./card"

type DropdownItem = {
    label: string
    checkbox?: boolean
    checked?: boolean
    onChange?: (checked: boolean) => void
}

type DropdownProps = {
    buttonLabel: string
    buttonIcon?: ReactNode
    items: DropdownItem[]
    showHeader?: boolean
    onClose?: () => void // optional close callback
    showClear?: boolean
    onClear?: () => void
}

export default function FilterDropdown({
    buttonLabel,
    buttonIcon,
    items,
    showHeader = false,
    onClose,
    showClear = false,
    onClear,
}: DropdownProps) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
                onClose?.()
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [onClose])
    
    const anyChecked = items.some((item) => item.checkbox && item.checked)

    return (
        <div className="relative w-full h-full" ref={ref}>
            <Button
                type="button"
                className="w-full flex gap-2"
                onClick={() => setOpen(!open)}
            >
                {buttonIcon}
                {buttonLabel}
            </Button>

            {open && (
                <Card className="absolute right-0 mt-2 w-75 gap-0! rounded-lg bg-white shadow-lg border z-50">                   
                    {showHeader && (
                        <div className="flex items-center gap-3 justify-between px-4 py-0">
                            <h3 className="font-semibold font-mono text-[16px]! leading-[normal]! uppercase text-black!">{buttonLabel}</h3>
                            {
                                showClear && anyChecked && (
                                    <button
                                        onClick={() => {
                                            onClear?.()
                                        }}
                                        className="text-sm! mr-auto font-sans text-[#5fc2d5] tracking-[0] leading-[normal] underline"
                                        type="button"
                                    >
                                        Clear
                                    </button>
                                )
                            }
                            <div className="flex items-center gap-4">                                
                                {
                                    onClose && (
                                        <button
                                            onClick={() => {
                                                setOpen(false)
                                                onClose()
                                            }}
                                            aria-label="Close"
                                            className="text-gray-400 hover:text-gray-600"
                                            type="button"
                                        >
                                            <X size={18} />
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    )}

                    {/* Items */}
                    <ul className="py-2 text-sm text-gray-700 max-h-64 overflow-auto">
                        {items.map((item, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                            >
                                {item.checkbox && (
                                    <Checkbox
                                        checked={item.checked}
                                        onChange={(e) =>
                                            item.onChange?.((e.target as HTMLInputElement).checked)
                                        }
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                )}
                                <span
                                    className="flex-1"
                                    onClick={() => {
                                        if (item.checkbox) {
                                            item.onChange?.(!item.checked)
                                        }
                                    }}
                                >
                                    {item.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </Card>
            )}
        </div>
    )
}
