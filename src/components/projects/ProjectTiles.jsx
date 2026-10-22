import Link from 'next/link'
import MotionImage from '@/components/motion/MotionImage'
import Stagger from '@/components/motion/Stagger'
import {
  gridSizes,
  imageAlt,
  imageLqip,
  imageMeta,
  imageSrc,
  projectPath,
} from '@/lib/image'

export default function ProjectTiles({ projects, priorityFirst = false }) {
  if (!projects?.length) return null

  return (
    <Stagger className="gallery">
      {projects.map((project, index) => {
        const image = project.images?.[0]
        const meta = image ? imageMeta(image) : null
        return (
          <Link key={project._id} href={projectPath(project)} className="tile">
            {image ? (
              <span
                className="tile__media motion-media"
                style={{ backgroundImage: `url(${imageLqip(image)})` }}
              >
                <MotionImage
                  src={imageSrc(image, 1200)}
                  alt={imageAlt(image.alt, project.name)}
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
            <span className="tile__copy">
              <span className="tile__name">{project.name}</span>
              {project.bio ? (
                <span className="tile__bio">{project.bio}</span>
              ) : null}
            </span>
          </Link>
        )
      })}
    </Stagger>
  )
}
