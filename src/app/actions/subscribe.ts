"use server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribe(email: string) {
  try {
    // Validate email parameter directly
    const normalizedEmail = email?.toLowerCase();

    if (!normalizedEmail || !EMAIL_REGEX.test(normalizedEmail)) {
      return { success: false, error: "Please provide a valid email address" };
    }

    // Mailchimp payload
    const data = {
      email_address: normalizedEmail,
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
