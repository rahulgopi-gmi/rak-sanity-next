import { Metadata } from 'next'
import { toPlainText } from 'next-sanity'
import { urlFor } from '@/sanity/lib/image'
import { getSeoData } from '@/sanity/lib/seo'
import { PageData } from './page-data'

/**
 * Generate metadata for the page.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const template = 'campaigns'
  const seo = await getSeoData(slug, template)

  if (!seo) return {}

  const title = seo?.metaTitle
  const description = seo.metaDescription?.length ? toPlainText(seo.metaDescription) : undefined
  const ogImageUrl = urlFor(seo?.openGraphImage, { width: 1200, height: 630 })
  const keywords = seo?.keywords?.map((k: string) => k)

  return {
    title,
    description,
    keywords,
    referrer: 'strict-origin-when-cross-origin',
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: seo?.openGraphUrl,
      images: ogImageUrl ? [{ url: ogImageUrl }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
    other: seo?.facebookAppId
      ? {
          'fb:app_id': seo.facebookAppId,
        }
      : undefined,
  } satisfies Metadata
}

export default async function Page() {
    return (
      <main className="campaign-dark">      
        <PageData />
      </main>
    )  
}
