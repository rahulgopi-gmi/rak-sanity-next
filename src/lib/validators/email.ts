const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeAndValidateEmail(email: string) {
    const normalizedEmail = email?.toLowerCase().trim();

    if (!normalizedEmail) {
        return { valid: false, error: "Email is required" };
    }

    if (!EMAIL_REGEX.test(normalizedEmail)) {
        return { valid: false, error: "Please provide a valid email address" };
    }

    return { valid: true, email: normalizedEmail };
}
