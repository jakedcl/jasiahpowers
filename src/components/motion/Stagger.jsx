'use client'

import { Children } from 'react'
import { staggerDelay } from '@/lib/motion'
import Reveal from './Reveal'

export default function Stagger({ children, className = '', itemAs }) {
  const items = Children.toArray(children)

  return (
    <div className={className}>
      {items.map((child, index) => (
        <Reveal key={child.key ?? index} as={itemAs} delay={staggerDelay(index)}>
          {child}
        </Reveal>
      ))}
    </div>
  )
}
