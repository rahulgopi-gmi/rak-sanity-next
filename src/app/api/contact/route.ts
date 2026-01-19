import { NextResponse } from "next/server";

export async function POST(request: Request) {    
    try {
        const data = await request.json();
        if (!data) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_EXTERNAL_API}/submit-form`

        const externalResponse = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await externalResponse.json();

        if (!externalResponse.ok) {
            return NextResponse.json({ error: result.error || "External API failed" }, { status: 500 });
        }

        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        return NextResponse.json({ error: "Server error" + error }, { status: 500 });
    }
}
