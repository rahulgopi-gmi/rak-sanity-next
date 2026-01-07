"use client";
import { X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "./button";
import { createPortal } from "react-dom";

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
    const [mounted, setMounted] = useState(false);
    const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setMounted(true);
        setModalRoot(document.getElementById("modal-root"));
        // Prevent body scroll when modal is open
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    if (!mounted || !modalRoot) return null;

    return createPortal(
        <div
            className="fixed inset-0 w-full h-screen bg-black/60 backdrop-blur-sm flex justify-center items-center z-[9999]"
            onClick={onClose}
        >
            <div
                className="relative max-w-[695px] w-full bg-[linear-gradient(129deg,rgba(255,255,255,0.10)_8.15%,rgba(255,255,255,0.04)_93.89%)] text-white rounded-lg shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <Button
                    type="button"
                    variant="link"
                    className="absolute right-4 top-4 text-gray-300 hover:text-white"
                    onClick={onClose}
                >
                    <X size={30} />
                </Button>

                {/* Modal Content */}
                <div className="w-full p-6">{children}</div>
            </div>
        </div>,
        modalRoot
    );
}
