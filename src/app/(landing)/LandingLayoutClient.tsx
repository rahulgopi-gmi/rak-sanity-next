"use client";

import { Toaster } from "react-hot-toast";
import { Fragment } from "react/jsx-runtime";

export default function LandingLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      {children}
      <Toaster 
          position="bottom-right"
          toastOptions={{
              style: {
                  background: "#333",
                  color: "#fff"
              }
          }}
      />            
  </Fragment>
  );
}
