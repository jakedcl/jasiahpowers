'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PageTransition({ children }) {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let inner
    const frame = requestAnimationFrame(() => {
      setVisible(false)
      inner = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
    })
    return () => {
      cancelAnimationFrame(frame)
      if (inner) cancelAnimationFrame(inner)
    }
  }, [pathname])

  return (
    <div
      className={`page-transition${visible ? ' page-transition--visible' : ''}`}
    >
      {children}
    </div>
  )
}
