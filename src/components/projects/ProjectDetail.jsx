import Link from 'next/link'
import ZoomImage from '@/components/ZoomImage'
import ProjectText from '@/components/projects/ProjectText'
import { gridSizes, imageLqip, imageMeta, imageSrc } from '@/lib/image'

export default function ProjectDetail({ project }) {
  if (!project) return null

  const images = (project.images || []).filter(Boolean)
  const summary = project.bio?.trim()

  return (
    <article className="detail">
      <p className="kicker">
        <Link href="/projects">Projects</Link>
      </p>
      <h1>{project.name}</h1>
      {summary ? <p className="detail__dek">{summary}</p> : null}
      <ProjectText value={project.description} />
      {images.length ? (
        <div className="gallery">
          {images.map((image, index) => {
            const meta = imageMeta(image)
            return (
              <ZoomImage
                key={image._key || image.asset?._ref || index}
                src={imageSrc(image, 1400)}
                fullSrc={imageSrc(image, 2000)}
                lqip={imageLqip(image)}
                alt={image.alt || `Preview of ${project.name}`}
                width={meta.width}
                height={meta.height}
                sizes={gridSizes}
                priority={index === 0}
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
