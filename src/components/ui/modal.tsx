"use client";

import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "./button";

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {    
    const modalRoot: HTMLElement | null =
        typeof document !== "undefined" ? document.getElementById("modal-root") : null;

    useEffect(() => {
        if (!modalRoot) return;        
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [modalRoot]);
    
    if (!modalRoot) return null;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape") onClose();
    };

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            onClick={onClose}
            onKeyDown={handleKeyDown}
        >
            <div
                className="relative w-full max-w-175 rounded-lg bg-[linear-gradient(129deg,rgba(255,255,255,0.10)_8.15%,rgba(255,255,255,0.04)_93.89%)] text-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") onClose();
                }}
            >                
                <Button
                    type="button"
                    variant="link"
                    className="absolute right-4 top-4 text-gray-300 hover:text-white"
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    <X size={30} />
                </Button>                
                <div className="w-full p-6">{children}</div>
            </div>
        </div>,
        modalRoot
    );
}
