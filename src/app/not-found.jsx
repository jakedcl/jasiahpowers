import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="plain-page">
      <h1>404</h1>
      <p>This page doesn&apos;t exist (yet).</p>
      <p>Maybe you made a typo or the page is old news.</p>
      <p>Peace!</p>
      <p>
        <Link href="/">Go to the Homepage</Link>
      </p>
    </div>
  )
}
