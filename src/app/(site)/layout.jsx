import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SiteLayout({ children }) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header />
        <main style={{ flex: '1 0 auto' }}>{children}</main>
      </div>
      <Footer />
    </div>
  )
}
