"use server";

import { checkRateLimit } from "@/lib/rateLimit";
import { normalizeAndValidateEmail } from "@/lib/validators/email";
import { headers } from "next/headers";

export async function subscribe(email: string) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0] ??
      headersList.get("x-real-ip") ?? "unknown";

    // Rate limit
    if (!checkRateLimit(ip)) {
      return {
        success: false,
        error: "Too many requests. Please try again later.",
      };
    }

    // Email validation (moved out)
    const emailCheck = normalizeAndValidateEmail(email);

    if (!emailCheck.valid) {
      return { success: false, error: emailCheck.error };
    }

    // Mailchimp payload
    const data = {
      email_address: emailCheck.email,
      status: "subscribed",
      status_if_new: "subscribed",
    };

    const mailchimpServerPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
    const mailchimpAudienceId = process.env.MAILCHIMP_AUDIENCE_ID;
    const mailchimpKey = process.env.MAILCHIMP_API_KEY;

    const url = `https://${mailchimpServerPrefix}.api.mailchimp.com/3.0/lists/${mailchimpAudienceId}/members`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${mailchimpKey}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("[MAILCHIMP ERROR]", {
        status: res.status,
        title: result?.title,
        detail: result?.detail,
        email,
      });

      if (result.title === "Member Exists") {
        return { success: false, error: "This email is already subscribed." };
      }

      return { success: false, error: "Subscription failed. Please try again later." };
    }

    return { success: true };
  } catch (error) {
    console.error("[SUBSCRIBE API ERROR]", error);
    return { success: false, error: "Server error" };
  }
}
