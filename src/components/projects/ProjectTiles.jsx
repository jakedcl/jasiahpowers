import Link from 'next/link'
import Image from 'next/image'
import { gridSizes, imageLqip, imageMeta, imageSrc, projectPath } from '@/lib/image'

export default function ProjectTiles({ projects, priorityFirst = false }) {
  if (!projects?.length) return null

  return (
    <div className="gallery">
      {projects.map((project, index) => {
        const image = project.images?.[0]
        const meta = image ? imageMeta(image) : null
        return (
          <Link key={project._id} href={projectPath(project)} className="tile">
            {image ? (
              <span
                className="tile__media"
                style={{ backgroundImage: `url(${imageLqip(image)})` }}
              >
                <Image
                  src={imageSrc(image, 1200)}
                  alt={image.alt || ''}
                  width={meta.width}
                  height={meta.height}
                  sizes={gridSizes}
                  priority={priorityFirst && index === 0}
                  style={{ width: '100%', height: 'auto' }}
                />
              </span>
            ) : (
              <span className="tile__fallback" />
            )}
            <span className="tile__name">{project.name}</span>
          </Link>
        )
      })}
    </div>
  )
}
