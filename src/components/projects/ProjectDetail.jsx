import Link from 'next/link'
import ZoomImage from '@/components/ZoomImage'
import { imageMeta, imageSrc } from '@/lib/image'

export default function ProjectDetail({ project }) {
  if (!project) return null

  const description = project.description?.trim()
  const images = (project.images || []).filter(Boolean)

  return (
    <article className="detail">
      <p className="kicker">
        <Link href="/projects">Projects</Link>
      </p>
      <h1>{project.name}</h1>
      {description ? (
        <p className="detail__description">{description}</p>
      ) : null}
      {images.length ? (
        <div className="detail__images">
          {images.map((image, index) => {
            const meta = imageMeta(image)
            return (
              <ZoomImage
                key={image._key || image.asset?._ref || index}
                src={imageSrc(image, 1600)}
                fullSrc={imageSrc(image, 2400)}
                alt={image.alt || `Preview of ${project.name}`}
                width={meta.width}
                height={meta.height}
                sizes="(max-width: 800px) 100vw, 760px"
              />
            )
          })}
        </div>
      ) : (
        <p className="detail__empty">No images available</p>
      )}
    </article>
  )
}
