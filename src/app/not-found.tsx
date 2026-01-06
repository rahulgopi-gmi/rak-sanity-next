import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="text-center max-w-md">
                <h1 className="text-8xl font-extrabold text-gray-900">404</h1>
                <h2 className="mt-4 text-xl! font-semibold text-gray-800">
                    Page not found
                </h2>
                <p className="mt-4 mb-6 text-sm! text-gray-500">
                    Sorry, the page you’re looking for doesn’t exist or has been moved.
                </p>

                <Link href="/" className="">
                    <Button type="button">
                        Back to home
                    </Button>
                </Link>
            </div>
        </div>
    );
}
