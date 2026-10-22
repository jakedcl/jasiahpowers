'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { MOTION } from '@/lib/motion'

const SEEN = 'jp-intro-seen'
const HOLD_MS = 1000
const REVEAL_MS = MOTION.duration.slow
let introRun = 0

function shouldPlay() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    if (sessionStorage.getItem(SEEN)) return false
  } catch {
    return false
  }
  return true
}

function markSeen() {
  try {
    sessionStorage.setItem(SEEN, '1')
  } catch {
    /* private mode */
  }
}

export default function HomeIntro({ title }) {
  const overlayRef = useRef(null)
  const finished = useRef(false)

  useLayoutEffect(() => {
    if (!shouldPlay()) return
    document.documentElement.classList.add('intro-pending')
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const runId = ++introRun
    if (!root.classList.contains('intro-pending')) return

    const overlay = overlayRef.current
    let hold
    let revealEnd

    const finish = (fade) => {
      if (finished.current) return
      finished.current = true
      markSeen()
      window.clearTimeout(hold)
      window.clearTimeout(revealEnd)
      window.removeEventListener('click', skip)
      window.removeEventListener('wheel', skip)
      window.removeEventListener('touchmove', skip)
      window.removeEventListener('keydown', skip)
      if (fade) {
        root.classList.add('intro-reveal')
        revealEnd = window.setTimeout(() => {
          root.classList.remove('intro-pending', 'intro-reveal')
          if (overlay) overlay.hidden = true
        }, REVEAL_MS + 40)
      } else {
        root.classList.remove('intro-pending', 'intro-reveal')
        if (overlay) overlay.hidden = true
      }
    }

    const skip = () => finish(false)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish(false)
      return
    }

    hold = window.setTimeout(() => finish(true), HOLD_MS)
    window.addEventListener('click', skip)
    window.addEventListener('wheel', skip, { passive: true })
    window.addEventListener('touchmove', skip, { passive: true })
    window.addEventListener('keydown', skip)

    return () => {
      window.clearTimeout(hold)
      window.clearTimeout(revealEnd)
      window.removeEventListener('click', skip)
      window.removeEventListener('wheel', skip)
      window.removeEventListener('touchmove', skip)
      window.removeEventListener('keydown', skip)
      queueMicrotask(() => {
        if (introRun === runId && !finished.current) {
          root.classList.remove('intro-pending', 'intro-reveal')
        }
      })
    }
  }, [])

  return (
    <div className="intro" ref={overlayRef} aria-hidden="true">
      <div className="intro__lockup">
        {/* Plain img so the portrait is in the first HTML, before the image optimizer. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="intro__logo"
          src="/logo-mark.png"
          alt=""
          width={640}
          height={786}
        />
        <p className="intro__name wordmark__text">{title}</p>
      </div>
    </div>
  )
}
