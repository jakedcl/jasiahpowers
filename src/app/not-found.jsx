import Link from 'next/link'
import SiteFrame from '@/components/SiteFrame'

export default function NotFound() {
  return (
    <SiteFrame>
      <div className="plain-page">
        <h1>404</h1>
        <p>This page doesn&apos;t exist (yet).</p>
        <p>Maybe you made a typo or the page is old news.</p>
        <p>
          <Link className="send" href="/">
            Go to the Homepage
          </Link>
        </p>
      </div>
    </SiteFrame>
  )
}
