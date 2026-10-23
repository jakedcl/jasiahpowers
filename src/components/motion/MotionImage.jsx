'use client'

import { useState } from 'react'
import Image from 'next/image'
import sanityImageLoader from '@/lib/sanityImageLoader'

export default function MotionImage({
  className = '',
  onLoad,
  alt = '',
  loader,
  src,
  ...props
}) {
  const [loaded, setLoaded] = useState(false)

  const resolvedLoader =
    loader ??
    (typeof src === 'string' && src.startsWith('https://cdn.sanity.io/')
      ? sanityImageLoader
      : undefined)

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      {...(resolvedLoader ? { loader: resolvedLoader } : {})}
      className={`motion-img${loaded ? ' motion-img--loaded' : ''}${className ? ` ${className}` : ''}`}
      onLoad={(event) => {
        setLoaded(true)
        onLoad?.(event)
      }}
    />
  )
}
