'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { MOTION } from '@/lib/motion'

const SEEN = 'jp-intro-seen'
const HOLD_MS = 480
const MOVE_MS = MOTION.duration.intro
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

function clearFlyStyles(logo, name) {
  if (logo) {
    logo.style.transition = ''
    logo.style.transform = ''
    logo.style.transformOrigin = ''
    logo.style.willChange = ''
  }
  if (name) {
    name.style.transition = ''
    name.style.transform = ''
    name.style.transformOrigin = ''
    name.style.willChange = ''
  }
}

export default function HomeIntro({ title }) {
  const overlayRef = useRef(null)
  const finished = useRef(false)
  const flying = useRef(false)

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
    let resizeFrame

    const teardownListeners = () => {
      window.removeEventListener('click', skip)
      window.removeEventListener('wheel', skip)
      window.removeEventListener('touchmove', skip)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('resize', onResize)
    }

    const finish = (animated) => {
      if (finished.current) return
      finished.current = true
      flying.current = false
      markSeen()
      window.clearTimeout(hold)
      window.clearTimeout(safety)
      cancelAnimationFrame(resizeFrame)
      teardownListeners()
      clearFlyStyles(logo, name)
      root.classList.remove('intro-reveal')
      root.classList.remove('intro-pending')
      if (overlay) overlay.hidden = true
    }

    const skip = () => finish(false)

    const onResize = () => {
      if (!flying.current) return
      finish(false)
    }

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

    const fly = (el, from, to, scaleX, scaleY) => {
      const dx = to.left - from.left
      const dy = to.top - from.top
      el.style.transformOrigin = 'top left'
      el.style.willChange = 'transform'
      el.style.transition = `transform ${MOVE_MS}ms ${MOTION.easing.out}`
      const sx = scaleX ?? to.width / from.width
      const sy = scaleY ?? to.height / from.height
      if (Math.abs(sx - 1) < 0.02 && Math.abs(sy - 1) < 0.02) {
        el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
      } else {
        el.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${sx}, ${sy})`
      }
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

      flying.current = true
      root.classList.add('intro-reveal')
      fly(logo, fromLogo, toLogo)
      fly(name, fromName, toName, 1, 1)

      const onEnd = (event) => {
        if (event.propertyName !== 'transform') return
        if (event.target !== name) return
        name.removeEventListener('transitionend', onEnd)
        finish(true)
      }
      name.addEventListener('transitionend', onEnd)
      safety = window.setTimeout(() => {
        name.removeEventListener('transitionend', onEnd)
        finish(true)
      }, MOVE_MS + 120)
    }

    hold = window.setTimeout(() => {
      resizeFrame = requestAnimationFrame(() => {
        requestAnimationFrame(play)
      })
    }, HOLD_MS)

    window.addEventListener('click', skip)
    window.addEventListener('wheel', skip, { passive: true })
    window.addEventListener('touchmove', skip, { passive: true })
    window.addEventListener('keydown', skip)
    window.addEventListener('resize', onResize)

    return () => {
      window.clearTimeout(hold)
      window.clearTimeout(safety)
      cancelAnimationFrame(resizeFrame)
      teardownListeners()
      queueMicrotask(() => {
        if (introRun === runId && !finished.current) {
          clearFlyStyles(logo, name)
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
