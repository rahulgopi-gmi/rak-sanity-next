"use client";

import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { Toaster } from "react-hot-toast";
import { PageSettingsType } from "@/features/application/types/sanity";

export default function MarketingLayoutClient({
  settings,
  children,
}: {
  settings: PageSettingsType;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header settings={settings} />
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <Footer settings={settings} />
    </>
  );
}
