import { Fragment } from "react/jsx-runtime";
import { Toaster } from "react-hot-toast";

export default function MarketingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
