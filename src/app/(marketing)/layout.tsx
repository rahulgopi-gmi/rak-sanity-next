import { PageSettingsType } from "@/features/application/types/sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { globalSettingsQuery } from "@/sanity/queries/pages";
import MarketingLayoutClient from "./MarketingLayoutClient";

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
export default async function MarketingLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const settings = await getData();    

    if (!settings) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <p className="text-sm! text-center">Something went wrong. Please try again later.</p>
            </div>
        );
    }

    return (        
        <MarketingLayoutClient settings={settings}>
            {children}
        </MarketingLayoutClient>        
    );       
}
