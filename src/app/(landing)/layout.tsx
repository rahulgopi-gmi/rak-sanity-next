import { sanityFetch } from "@/sanity/lib/live";
import LandingLayoutClient from "./LandingLayoutClient";
import { PageSettingsType } from "@/features/application/types/sanity";
import { globalSettingsQuery } from "@/sanity/queries/pages";
import NotFound from "../not-found";

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
        return <NotFound />
    }

    return (       
        <LandingLayoutClient settings={settings}>
            {children}
        </LandingLayoutClient>        
    );
}
