const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export function checkRateLimit(ip: string) {
    const now = Date.now();
    const windowTime = 60 * 1000;
    const maxRequests = 5;

    const record = rateLimitMap.get(ip) || { count: 0, timestamp: now };
    if (now - record.timestamp > windowTime) {
        record.count = 0;
        record.timestamp = now;
    }

    if (record.count >= maxRequests) return false;

    record.count += 1;
    rateLimitMap.set(ip, record);
    return true;
}