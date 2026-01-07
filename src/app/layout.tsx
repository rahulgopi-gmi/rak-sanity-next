import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { PageSettingsType } from "@/features/application/types/sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { globalSettingsQuery } from "@/sanity/queries/pages";
import { toPlainText } from "next-sanity";

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
async function getData(): Promise<PageSettingsType | null> {
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

export async function generateMetadata(): Promise<Metadata> {
  const data  = await getData();
  const seo = data?.seo;  
  const title = seo?.metaTitle || "Innovation City";
  const description = seo ? toPlainText(seo.metaDescription || []) : "Set up your business easily with endless possibilities in the world's first free zone focused on AI, Web3, Robotics, Gaming & Healthtech companies.";
  const ogImageUrl = seo?.openGraphImage?.asset?.url || "/images/Innovation-City.jpg";
  const keywords = seo?.keywords?.map((k: string) => k) || ["innovation", "web3", "robotics", "healthtech", "artificial intelligence", "company set up", "free zone", "business license"];    

  return{
      title,
      description,
      keywords,
      //referrer: "strict-origin-when-cross-origin",
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
        {children}
      </body>
    </html>
  );
}
