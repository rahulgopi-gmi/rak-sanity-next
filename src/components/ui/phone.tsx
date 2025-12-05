"use client";

import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import { useEffect, useRef, useState } from "react";

export default function PhoneInput() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const itiRef = useRef<ReturnType<typeof intlTelInput> | null>(null);

    const [value, setValue] = useState("");
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [errorMsg, setErrorMsg] = useState("");

    const errorMap = [
        "Invalid number",
        "Invalid country code",
        "Too short",
        "Too long",
        "Invalid number",
    ];

    useEffect(() => {
        if (!inputRef.current) return;

        const iti = intlTelInput(inputRef.current, {
            initialCountry: "auto",
            geoIpLookup: (cb:any) => {
                fetch("https://ipapi.co/json")
                    .then((res) => res.json())
                    .then((data) => cb(data?.country_code || "us"))
                    .catch(() => cb("us"));
            },
            utilsScript:
                "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.19/build/js/utils.js",
        } as any);

        itiRef.current = iti;

        // Wait for utils
        iti.promise.then(() => {
            console.log("UTILS LOADED ✔");
            inputRef.current?.addEventListener("input", validate);
        });

        return () => {
            inputRef.current?.removeEventListener("input", validate);
            itiRef.current?.destroy();
        };
    }, []);

    const validate = () => {
        debugger
        const iti = itiRef.current;
        if (!iti) return;

        setValue(inputRef.current?.value || "");

        const number = iti.getNumber();


        // utils not ready → skip validation
        //if (iti.getValidationError() === -99) return;
       
        if (iti.isValidNumber()) {
            const code = iti.getValidationError();
            setIsValid(false);
            setErrorMsg(errorMap[code] || "Invalid number");
        } else {
            setIsValid(true);
            setErrorMsg("xxx");
        }
    };

    return (
        <>
            <input
                ref={inputRef}
                type="tel"
                className="w-full border p-2"
                value={inputRef.current?.value || ""}
            />

            {isValid && <p className="text-green-500 mt-1">✓ Valid number</p>}
            {!isValid && errorMsg && (
                <p className="text-red-500 mt-1">{errorMsg}</p>
            )}
        </>
    );
}
