'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function MotionImage({ className = '', onLoad, ...props }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <Image
      {...props}
      className={`motion-img${loaded ? ' motion-img--loaded' : ''}${className ? ` ${className}` : ''}`}
      onLoad={(event) => {
        setLoaded(true)
        onLoad?.(event)
      }}
    />
  )
}
