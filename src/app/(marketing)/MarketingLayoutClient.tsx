"use client";

import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { Toaster } from "react-hot-toast";
import { PageSettingsType } from "@/features/application/types/sanity";
import { Fragment } from "react/jsx-runtime";
import AOSProvider from "../AOSProvider";

export default function MarketingLayoutClient({
  settings,
  children,
}: {
  settings: PageSettingsType;
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <Header settings={settings} />
      <AOSProvider>
        {children}
      </AOSProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <div id="modal-root"></div>
      <Footer settings={settings} />
    </Fragment>
  );
}
