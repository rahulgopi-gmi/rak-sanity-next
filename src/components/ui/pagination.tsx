import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: Props) {
    const generatePages = () => {
        const pages: (number | "...")[] = [];

        // If total pages are small, show all
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }

        // Always show first page
        pages.push(1);

        // Left ellipsis
        if (currentPage > 4) {
            pages.push("...");
        }

        // Middle pages
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        // Right ellipsis
        if (currentPage < totalPages - 3) {
            pages.push("...");
        }

        // Always show last page
        pages.push(totalPages);

        // Remove duplicates just in case
        return [...new Set(pages)];
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            {/* Prev */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg text-[#5FC2D5] disabled:opacity-30"
            >
                <ChevronLeft size={18} />
            </button>

            {/* Pages */}
            {generatePages().map((page, idx) =>
                page === "..." ? (
                    <span
                        key={`dots-${idx}`}
                        className="px-4 py-2 rounded-lg bg-[#0E1A1F] text-[#5FC2D5] cursor-default"
                    >
                        …
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-4 py-2 rounded-lg text-sm font-sans border border-transparent
              ${currentPage === page
                                ? "bg-[#5FC2D5] text-black"
                                : "bg-[#0E1A1F] text-[#5FC2D5] hover:bg-[#12282F]"
                            }
            `}
                    >
                        {page}
                    </button>
                )
            )}

            {/* Next */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg text-[#5FC2D5] disabled:opacity-30"
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );
}
