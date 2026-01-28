import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { PageSettingsType } from "@/features/application/types/sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { globalSettingsQuery } from "@/sanity/queries/pages";
import { toPlainText } from "next-sanity";
import { Suspense } from 'react';

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"]
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

/** 
 *  Fetch Global Settings
*/
async function getGlobalSettings(): Promise<PageSettingsType | null> {
  try {
    const { data } = await sanityFetch({
      query: globalSettingsQuery,
      stega: false,
    });
    return data ?? null;
  }
  catch (error) {
    console.error(`Sanity Fetch Error  : `, error);
    return null;
  }
}

/** Layout metadata defaults */
export async function generateMetadata(): Promise<Metadata> {
  const data = await getGlobalSettings();
  const seo = data?.seo;  
  const title = seo?.metaTitle || "Innovation City";
  const description = seo ? toPlainText(seo.metaDescription || []) : "Set up your business easily with endless possibilities in the world's first free zone focused on AI, Web3, Robotics, Gaming & Healthtech companies.";
  const ogImageUrl = seo?.openGraphImage?.asset?.url || "/images/Innovation-City.jpg";
  const keywords = seo?.keywords?.map((k: string) => k) || ["innovation", "web3", "robotics", "healthtech", "artificial intelligence", "company set up", "free zone", "business license"];    

  return{
      title,
      description,
      keywords,
      referrer: "strict-origin-when-cross-origin",
      icons: {
        icon: [
          { url: "/favicon.ico" },
          { url: "/icons/icon", type: "image/png", sizes: "32x32" },
        ],
        shortcut: "/favicon.ico",
        apple: [
          { url: "/icons/apple-icon", sizes: "180x180" },
        ],
      }, 
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        title,
        description,
        type: "website",
        url: seo?.openGraphUrl || "https://innovationcity.com",
        images: ogImageUrl ? [{ url: ogImageUrl }] : []        
      },
      twitter: {
          card: "summary_large_image",
          title,
          description,
          images: ogImageUrl ? [ogImageUrl] : [],
      },
      other: seo?.facebookAppId
        ? {
            "fb:app_id": seo.facebookAppId,
          }
        : undefined        
  } satisfies Metadata;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/nhg7tow.css" />
      </head>
      <body
        className={`${montserrat.variable} ${inter.variable} antialiased`}
      >       
      <Suspense fallback={
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 z-50">           
            <div className="text-center">             
              <p className="text-gray-600 text-sm!">
                Please wait while we prepare the page.
              </p>
            </div>            
            <div className="mt-6 border-4 border-gray-300 border-t-gray-800 rounded-full w-10 h-10 animate-spin"></div>
          </div>
        }
      >
        {children}
      </Suspense>        
      </body>
    </html>
  );
}
