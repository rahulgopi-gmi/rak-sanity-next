import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
    // Generate the pagination with ellipsis
    const generatePages = () => {
        const pages: (number | "...")[] = [];

        if (totalPages <= 5) {
            // Show all pages
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            // Always show first page
            pages.push(1);
            if (currentPage > 4) pages.push("...");
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++) pages.push(i);
            if (currentPage < totalPages - 3) pages.push("...");
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex items-center gap-2 justify-center mt-6">

            {/* Prev Button */}
            <button
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                className="px-3 py-2 rounded-lg text-[#5FC2D5] disabled:opacity-30 cursor-pointer"
                disabled={currentPage === 1}
            >
                <ChevronLeft size={18} />
            </button>

            {/* Page Numbers */}
            {generatePages().map((p, idx) =>
                p === "..." ? (
                    <div
                        key={idx}
                        className="px-4 py-2 rounded-lg bg-[#0E1A1F] text-[#5FC2D5]"
                    >
                        …
                    </div>
                ) : (
                    <button
                        key={p}
                        onClick={() => onPageChange(p as number)}
                            className={`px-4 py-2 rounded-lg border font-sans cursor-pointer text-sm border-transparent ${currentPage === p
                                ? "bg-[#5FC2D5] text-black"
                                : "bg-[#0E1A1F] text-[#5FC2D5] hover:bg-[#12282F]"
                            }`}
                    >
                        {p}
                    </button>
                )
            )}

            {/* Next Button */}
            <button
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                className="px-3 py-2 rounded-lg text-[#5FC2D5] disabled:opacity-30 cursor-pointer"
                disabled={currentPage === totalPages}
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );
}
