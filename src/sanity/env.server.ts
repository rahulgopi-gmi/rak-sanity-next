import "server-only";

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}

/**
 * Centralized server environment variable handling
 * Ensures required variables exist at runtime
*/

export const apiVersionServer =
 process.env.SANITY_API_VERSION || '2025-11-25'

export const datasetServer = assertValue(
  process.env.SANITY_DATASET,
  'Missing environment variable: SANITY_DATASET or NEXT_PUBLIC_SANITY_DATASET'
)

export const projectIdServer = assertValue(
  process.env.SANITY_PROJECT_ID,
  'Missing environment variable: SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
    process.env.SANITY_API_TOKEN,
    'Missing environment variable: SANITY_API_TOKEN'
);