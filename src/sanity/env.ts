/**
 * Centralized environment variable handling
 * Ensures required variables exist at runtime
*/

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }
  return v
}

/**
 * Centralized environment variable handling
 * Ensures required variables exist at runtime
*/
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-11-25'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
  process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  'Missing environment variable: NEXT_PUBLIC_SANITY_API_TOKEN'
)

/**
 * External API 
*/
export const externalApi = assertValue(
  process.env.NEXT_PUBLIC_EXTERNAL_API,
  'Missing environment variable: NEXT_PUBLIC_EXTERNAL_API'
)

/** 
 * Mailchimp 
 */
export const mailchimpKey = assertValue(
  process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY,
  'Missing environment variable: NEXT_PUBLIC_MAILCHIMP_API_KEY'
)

export const mailchimpAudienceId = assertValue(
  process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID,
  'Missing environment variable: NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID'
)

export const mailchimpServerPrefix = assertValue(
  process.env.NEXT_PUBLIC_MAILCHIMP_SERVER_PREFIX,
  'Missing environment variable: NEXT_PUBLIC_MAILCHIMP_SERVER_PREFIX'
)