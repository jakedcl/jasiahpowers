import Link from 'next/link'
import ZoomImage from '@/components/ZoomImage'
import ProjectText from '@/components/projects/ProjectText'
import Reveal from '@/components/motion/Reveal'
import Stagger from '@/components/motion/Stagger'
import { gridSizes, imageLqip, imageMeta, imageSrc } from '@/lib/image'

export default function ProjectDetail({ project }) {
  if (!project) return null

  const images = (project.images || []).filter(Boolean)
  const summary = project.bio?.trim()

  return (
    <article className="detail">
      <Reveal>
        <p className="kicker">
          <Link className="motion-link" href="/projects">Projects</Link>
        </p>
        <h1>{project.name}</h1>
        {summary ? <p className="detail__dek">{summary}</p> : null}
      </Reveal>
      <Reveal delay={1}>
        <ProjectText value={project.description} />
      </Reveal>
      {images.length ? (
        <Stagger className="gallery">
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
        </Stagger>
      ) : (
        <Reveal>
          <p className="detail__empty">No images available</p>
        </Reveal>
      )}
    </article>
  )
}
