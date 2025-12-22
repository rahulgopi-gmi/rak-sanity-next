import { sanityFetch } from "@/sanity/lib/live";
import LandingLayoutClient from "./LandingLayoutClient";
import { Suspense } from "react";
import { PageSettingsType } from "@/features/application/types/sanity";
import { globalSettingsQuery } from "@/sanity/queries/pages";

/** 
 *  Fetch Global Settings
*/
async function getData(): Promise<PageSettingsType | null>{
    try {
        const { data } = await sanityFetch({
            query: globalSettingsQuery,        
            stega: false,
        });
        return data ?? null;
    }
    catch (error){        
        console.error(`Sanity Fetch Error  : `, error);
        return null;
    }    
}

/**
 * Layout Component
*/
export default async function MarketingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const settings = await getData();

    if (!settings) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <p>Something went wrong. Please try again later.</p>
            </div>
        );
    }

    return (
        <Suspense fallback={null}>
            <LandingLayoutClient settings={settings}>
                {children}
            </LandingLayoutClient>
        </Suspense>
    );
}
