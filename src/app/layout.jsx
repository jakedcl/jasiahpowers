import { Bodoni_Moda } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { sanityFetch } from '@/lib/sanity'
import { siteSettingsQuery } from '@/lib/queries'
import { FALLBACK_MUSIC, socialLinks } from '@/lib/site'
import './globals.css'

const display = Bodoni_Moda({
  subsets: ['latin'],
  weight: '500',
  style: 'normal',
  display: 'swap',
  variable: '--font-display',
})

export const metadata = {
  metadataBase: new URL('https://www.jasiahpowers.com'),
  title: {
    default: 'Jasiah Powers',
    template: '%s — Jasiah Powers',
  },
  description: 'Creative / photography portfolio',
  openGraph: {
    title: 'Jasiah Powers',
    description: 'Creative / photography portfolio',
    url: 'https://www.jasiahpowers.com',
    siteName: 'Jasiah Powers',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Jasiah Powers',
    description: 'Creative / photography portfolio',
  },
}

export const viewport = {
  themeColor: '#f2f2f0',
}

export const revalidate = 60

export default async function RootLayout({ children }) {
  let settings = null
  try {
    settings = await sanityFetch(siteSettingsQuery)
  } catch {
    settings = null
  }

  const title = settings?.title || 'Jasiah Powers'
  const musicLink = settings?.musicLink || FALLBACK_MUSIC

  return (
    <html lang="en" className={display.variable}>
      <body>
        <div className="site-shell">
          <Header title={title} musicLink={musicLink} />
          <main id="content" className="site-main">
            {children}
          </main>
          <Footer social={socialLinks(settings)} />
        </div>
      </body>
    </html>
  )
}
