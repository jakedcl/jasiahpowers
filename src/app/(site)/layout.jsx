import SiteFrame from '@/components/SiteFrame'
import { urlFor, sanityFetch } from '@/lib/sanity'
import { siteSettingsQuery } from '@/lib/queries'

export async function generateMetadata() {
  let settings = null
  try {
    settings = await sanityFetch(siteSettingsQuery)
  } catch {
    settings = null
  }

  const description =
    settings?.seoDescription?.trim() || 'Creative / photography portfolio'
  const image = settings?.shareImage?.asset
    ? urlFor(settings.shareImage).width(1200).height(630).fit('crop').url()
    : null

  return {
    description,
    openGraph: {
      description,
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      description,
      images: image ? [image] : undefined,
    },
  }
}

export default function SiteLayout({ children }) {
  return <SiteFrame>{children}</SiteFrame>
}
