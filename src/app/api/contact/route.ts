import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(request: Request) {    
    try {
        const headersList = await headers();
        const ip = headersList.get("x-forwarded-for")?.split(",")[0] ??
            headersList.get("x-real-ip") ?? "unknown";
        
        // Rate limit
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later" },
                { status: 400 }
            );
        }

        const data = await request.json();
        if (!data) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }        

        const url = `${process.env.EXTERNAL_API}/submit-form`;

        const externalResponse = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });        

        if (!externalResponse.ok) {
            const errorBody = await externalResponse.text();
            
            console.error("External API error:", {
                status: externalResponse.status,
                body: errorBody,
            });

            return NextResponse.json(
                { error: "Server error. Please try again later." },
                { status: 500 }
            );
        }

        const result = await externalResponse.json();
        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error("Unhandled POST /submit-form error:", error);
        return NextResponse.json({ error: "Server error" + error }, { status: 500 });
    }
}
