import './globals.css'
import { siteFontVariables } from '@/lib/fonts'

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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={siteFontVariables}>
      <body>{children}</body>
    </html>
  )
}
