import BookingForm from '@/components/BookingForm'
import { sanityFetch } from '@/lib/sanity'
import { siteSettingsQuery } from '@/lib/queries'
import { FALLBACK_EMAIL, contactHref } from '@/lib/site'

export const metadata = {
  title: 'Contact',
}

export const revalidate = 60

export default async function ContactPage() {
  let settings = null
  try {
    settings = await sanityFetch(siteSettingsQuery)
  } catch {
    settings = null
  }
  const email = settings?.contactEmail || FALLBACK_EMAIL

  return (
    <div className="booking">
      <div>
        <h1>Contact</h1>
        <p>
          <a href={contactHref(email)}>{email}</a>
        </p>
      </div>
      <BookingForm email={email} />
    </div>
  )
}
