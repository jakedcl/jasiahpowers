'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { contactHref } from '@/lib/site'

const NAV = [
  { href: '/projects', label: 'Projects' },
  { href: '/photos', label: 'Photos' },
  { href: '/prints', label: 'Prints' },
  { href: '/video', label: 'Video' },
]

export default function Header({ title, email, musicLink }) {
  const pathname = usePathname()

  return (
    <header className="site-header">
      <a className="skip" href="#content">
        Skip to content
      </a>
      <div className="site-header__bar">
        <Link href="/" className="wordmark">
          {title}
        </Link>
        <nav className="site-nav" aria-label="Primary">
          <div className="site-nav__group">
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
          <div className="site-nav__group">
            <a href={musicLink} target="_blank" rel="noopener noreferrer">
              Music
            </a>
            <a href={contactHref(email)}>Contact</a>
          </div>
        </nav>
      </div>
    </header>
  )
}
