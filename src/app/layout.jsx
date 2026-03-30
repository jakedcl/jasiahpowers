import AppProviders from '@/components/AppProviders'
import './globals.css'

export const metadata = {
  title: 'Jasiah Powers',
  description: 'Creative / photography portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
