"use client";

import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { Toaster } from "react-hot-toast";
import { PageSettingsType } from "@/features/application/types/sanity";
import { Fragment } from "react";
import { FadeUp } from "@/components/layout/motion/FadeUp";
import { usePathname } from "next/navigation";

export default function MarketingLayoutClient({
  settings,
  children,
}: {
  settings: PageSettingsType;
  children: React.ReactNode;
}) {
  const pathname = usePathname();  
  return (
    <Fragment>
        <Header settings={settings} />
        <FadeUp key={pathname}>
            {children}        
        </FadeUp>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--toast-bg)",
              color: "var(--toast-text)",
            },
          }}
        />
        <div id="modal-root"></div>
        <Footer settings={settings} />
    </Fragment>
  );
}
