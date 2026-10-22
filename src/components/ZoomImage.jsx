'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import MotionImage from '@/components/motion/MotionImage'

export default function ZoomImage({
  src,
  fullSrc,
  lqip,
  alt,
  width,
  height,
  caption,
  sizes,
  priority = false,
}) {
  const dialogRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [phase, setPhase] = useState('closed')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const requestClose = useCallback(() => {
    const dialog = dialogRef.current
    if (!dialog || phase === 'closing') return
    setPhase('closing')
    window.setTimeout(() => {
      if (dialog.open) dialog.close()
      setOpen(false)
      setPhase('closed')
    }, 300)
  }, [phase])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!open || !dialog) return
    if (!dialog.open) dialog.showModal()
    const frame = requestAnimationFrame(() => setPhase('open'))
    const onClose = () => {
      setOpen(false)
      setPhase('closed')
    }
    dialog.addEventListener('close', onClose)
    return () => {
      cancelAnimationFrame(frame)
      dialog.removeEventListener('close', onClose)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        requestClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, requestClose])

  const phaseClass =
    phase === 'open'
      ? ' lightbox--open'
      : phase === 'closing'
        ? ' lightbox--closing'
        : ''

  const dialog = (
    <dialog
      ref={dialogRef}
      className={`lightbox${phaseClass}`}
      aria-label={alt || 'Expanded photo'}
      onClick={(event) => {
        if (event.target === event.currentTarget) requestClose()
      }}
      onCancel={(event) => {
        event.preventDefault()
        requestClose()
      }}
    >
      <button
        type="button"
        className="lightbox__close motion-press"
        onClick={requestClose}
      >
        Close
      </button>
      <figure
        className="lightbox__panel"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="lightbox__frame"
          style={{ '--lw': width, '--lh': height }}
        >
          <MotionImage
            src={fullSrc || src}
            alt=""
            fill
            sizes="92vw"
            className="lightbox__img"
          />
        </div>
        {caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
    </dialog>
  )

  return (
    <>
      <button
        type="button"
        className="zoom motion-press"
        onClick={() => setOpen(true)}
      >
        <span
          className="zoom__frame motion-media"
          style={lqip ? { backgroundImage: `url(${lqip})` } : undefined}
        >
          <MotionImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            priority={priority}
            style={{ width: '100%', height: 'auto' }}
          />
        </span>
      </button>
      {mounted && open ? createPortal(dialog, document.body) : null}
    </>
  )
}
