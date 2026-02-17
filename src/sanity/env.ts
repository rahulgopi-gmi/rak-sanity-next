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
 process.env.SANITY_API_VERSION || process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-11-25'

export const dataset = assertValue(
  process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: SANITY_DATASET or NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID'
)
