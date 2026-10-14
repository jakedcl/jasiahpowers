'use client'

import dynamic from 'next/dynamic'

const NextStudio = dynamic(() => import('./NextStudioClient'), { ssr: false })

export default function Studio() {
  return (
    <div className="studio-root">
      <NextStudio />
    </div>
  )
}
