import { Bodoni_Moda } from 'next/font/google'
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

const introScript = `(function(){try{var path=location.pathname;if(path!=='/'&&path!=='')return;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;if(sessionStorage.getItem('jp-intro-seen'))return;document.documentElement.classList.add('intro-pending')}catch(e){}})()`

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={display.variable}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        {children}
      </body>
    </html>
  )
}
