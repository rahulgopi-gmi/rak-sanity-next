import MarketingLayoutClient from "./MarketingLayoutClient";
import NotFound from "../not-found";
import { getSettings } from "@/lib/data";

/**
 * Layout Component
*/
export default async function MarketingLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const settings = await getSettings();    

    if (!settings) {
        return <NotFound />
    }

    return (        
        <MarketingLayoutClient settings={settings}>
            {children}
        </MarketingLayoutClient>        
    );       
}
