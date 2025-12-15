import { Fragment } from "react/jsx-runtime";
import { Toaster } from "react-hot-toast";
import LandingLayoutClient from "./LandingLayoutClient";
import { Suspense } from "react";

export default function MarketingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Suspense fallback={null}>
            <LandingLayoutClient>
                {children}
            </LandingLayoutClient>
        </Suspense>
    );
}
