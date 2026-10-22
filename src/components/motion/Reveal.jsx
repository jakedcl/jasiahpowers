'use client'

import { staggerDelay } from '@/lib/motion'
import { useInViewOnce } from './useInViewOnce'

export default function Reveal({
  as = 'div',
  children,
  className = '',
  delay = 0,
  style,
  ...rest
}) {
  const { ref, visible } = useInViewOnce()
  const Tag = as
  const delayMs = typeof delay === 'number' ? delay : staggerDelay(delay)

  return (
    <Tag
      ref={ref}
      className={`motion-reveal${visible ? ' motion-reveal--visible' : ''}${className ? ` ${className}` : ''}`}
      style={{
        ...style,
        '--motion-delay': `${delayMs}ms`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
