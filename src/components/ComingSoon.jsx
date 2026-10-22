import Link from 'next/link'
import Reveal from '@/components/motion/Reveal'

export default function ComingSoon() {
  return (
    <div className="plain-page">
      <Reveal>
        <p className="kicker">Prints</p>
        <h1>Coming Soon</h1>
        <p>Loading... Stay Tuned!</p>
        <p>
          <Link className="send motion-press" href="/">
            Go to the Homepage
          </Link>
        </p>
      </Reveal>
    </div>
  )
}
