"use client";

import Footer from "@/components/layout/footer/Footer";
import { PageSettingsType } from "@/features/application/types/sanity";
import { Toaster } from "react-hot-toast";
import { Fragment } from "react";

export default function LandingLayoutClient({
  settings,
  children,
}: {
  settings: PageSettingsType;
  children: React.ReactNode;
}) {
  return (
    <Fragment>      
        {children}      
      <Footer settings={settings}  />
      <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--toast-bg)",
              color: "var(--toast-text)",
            },
          }}
      />            
  </Fragment>
  );
}
