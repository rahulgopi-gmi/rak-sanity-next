"use client";
import { X } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./button";

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm border border-white/25 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="max-w-[695px] bg-[linear-gradient(129deg,rgba(255,255,255,0.10)_8.15%,rgba(255,255,255,0.04)_93.89%)] text-white rounded-lg w-full shadow-xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <Button
                    type="button"
                    className="absolute right-4 top-4 text-gray-300 hover:text-white"
                    onClick={onClose}
                    variant={'link'}
                >
                    <X size={30} />
                </Button>

                <div className="w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
