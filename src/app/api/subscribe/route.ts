import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }
        
        const data = {
            email_address: email,
            status: "subscribed",
            status_if_new: "subscribed"
        };        

        const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY!;
        const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID!;
        const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX!;        

        const Url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;

        const res = await fetch(Url,
            {
                method: "POST",
                headers: {
                    Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        const result = await res.json();        

        if (!res.ok) {
            if (result.title === "Member Exists") {
                return NextResponse.json(
                    { error : "This email is already subscribed."},
                    { status: 400 }
                )
            }

            return NextResponse.json({ error: result.details || JSON.stringify(result) }, { status: res.status });
        }        

        return NextResponse.json({ success: true, message: "Subscribed successfully!" });

    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}