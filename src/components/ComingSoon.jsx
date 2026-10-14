import Link from 'next/link'

export default function ComingSoon() {
  return (
    <div className="plain-page">
      <p className="kicker">Prints</p>
      <h1>Coming Soon</h1>
      <p>Loading... Stay Tuned!</p>
      <p>
        <Link className="send" href="/">
          Go to the Homepage
        </Link>
      </p>
    </div>
  )
}
