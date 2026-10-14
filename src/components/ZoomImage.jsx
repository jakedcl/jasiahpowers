'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!open || !dialog) return
    if (!dialog.open) dialog.showModal()
    const onClose = () => setOpen(false)
    dialog.addEventListener('close', onClose)
    return () => dialog.removeEventListener('close', onClose)
  }, [open])

  const close = () => dialogRef.current?.close()

  const dialog = (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={alt || 'Expanded photo'}
      onClick={(event) => {
        if (event.target === event.currentTarget) close()
      }}
    >
      <button type="button" className="lightbox__close" onClick={close}>
        Close
      </button>
      <figure
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="lightbox__frame"
          style={{ '--lw': width, '--lh': height }}
        >
          <Image
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
      <button type="button" className="zoom" onClick={() => setOpen(true)}>
        <span
          className="zoom__frame"
          style={lqip ? { backgroundImage: `url(${lqip})` } : undefined}
        >
          <Image
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
