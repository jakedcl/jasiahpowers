'use client'

import { useRef, useState } from 'react'
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
  const [opened, setOpened] = useState(false)

  const open = () => {
    setOpened(true)
    dialogRef.current?.showModal()
  }
  const close = () => dialogRef.current?.close()

  return (
    <>
      <button type="button" className="zoom" onClick={open}>
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
        <figure>
          {opened ? (
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
          ) : null}
          {caption ? <figcaption>{caption}</figcaption> : null}
        </figure>
      </dialog>
    </>
  )
}
