'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'

const SEEN = 'jp-intro-seen'
const MOVE_MS = 800
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
    const logo = overlay?.querySelector('.intro__logo')
    const name = overlay?.querySelector('.intro__name')
    const targetLogo = document.querySelector('.wordmark__mark')
    const targetName = document.querySelector('.wordmark__text')

    let hold
    let safety

    const finish = (fade) => {
      if (finished.current) return
      finished.current = true
      markSeen()
      window.clearTimeout(hold)
      window.clearTimeout(safety)
      if (fade) root.classList.add('intro-reveal')
      else root.classList.remove('intro-pending')
      window.removeEventListener('click', skip)
      window.removeEventListener('wheel', skip)
      window.removeEventListener('touchmove', skip)
      window.removeEventListener('keydown', skip)
      if (!fade && overlay) overlay.hidden = true
      if (fade) {
        window.setTimeout(() => {
          root.classList.remove('intro-pending')
          if (overlay) overlay.hidden = true
        }, 460)
      }
    }

    const skip = () => finish(false)

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !logo ||
      !name ||
      !targetLogo ||
      !targetName
    ) {
      finish(false)
      return
    }

    const play = () => {
      if (finished.current) return
      const fromLogo = logo.getBoundingClientRect()
      const fromName = name.getBoundingClientRect()
      const toLogo = targetLogo.getBoundingClientRect()
      const toName = targetName.getBoundingClientRect()
      if (!fromLogo.width || !fromName.width || !toLogo.width || !toName.width) {
        finish(false)
        return
      }

      const fly = (el, from, to) => {
        const dx = to.left - from.left
        const dy = to.top - from.top
        const scale = to.width / from.width
        el.style.transformOrigin = 'top left'
        el.style.transition = `transform ${MOVE_MS}ms ease-out`
        el.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`
      }

      fly(logo, fromLogo, toLogo)
      fly(name, fromName, toName)
      name.addEventListener('transitionend', () => finish(true), { once: true })
      safety = window.setTimeout(() => finish(true), MOVE_MS + 200)
    }

    hold = window.setTimeout(play, 1000)
    window.addEventListener('click', skip)
    window.addEventListener('wheel', skip, { passive: true })
    window.addEventListener('touchmove', skip, { passive: true })
    window.addEventListener('keydown', skip)

    return () => {
      window.clearTimeout(hold)
      window.clearTimeout(safety)
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
      {/* Plain img so the portrait is in the first HTML, before the image optimizer. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="intro__logo"
        src="/logo-mark.png"
        alt=""
        width={640}
        height={786}
      />
      <p className="intro__name">{title}</p>
    </div>
  )
}
