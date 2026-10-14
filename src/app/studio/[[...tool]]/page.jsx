import { NextStudio } from 'next-sanity/studio'
import config from '../../../../studio/sanity.config'

export const dynamic = 'force-dynamic'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return (
    <div className="studio-root">
      <NextStudio config={config} />
    </div>
  )
}
