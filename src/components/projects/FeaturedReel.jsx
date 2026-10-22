import Link from 'next/link'
import MotionImage from '@/components/motion/MotionImage'
import { imageAlt, imageLqip, imageSrc, projectPath } from '@/lib/image'

function reelDuration(count) {
  if (count <= 3) return 40
  if (count <= 6) return 50
  return 60
}

function Cards({ projects, copy = false }) {
  return (
    <div className="reel__set" aria-hidden={copy || undefined} inert={copy ? '' : undefined}>
      {projects.map((project) => {
        const image = project.images?.[0]
        return (
          <Link
            key={copy ? `${project._id}-copy` : project._id}
            href={projectPath(project)}
            className="tile reel__card"
            tabIndex={copy ? -1 : undefined}
          >
            {image ? (
              <span
                className="reel__media motion-media"
                style={
                  imageLqip(image)
                    ? { backgroundImage: `url(${imageLqip(image)})` }
                    : undefined
                }
              >
                <MotionImage
                  src={imageSrc(image, 800)}
                  alt={imageAlt(image.alt, project.name)}
                  fill
                  sizes="(max-width: 699px) 220px, 340px"
                  loading="lazy"
                  style={{ objectFit: 'cover' }}
                />
              </span>
            ) : (
              <span className="tile__fallback reel__media" />
            )}
            <span className="tile__copy">
              <span className="tile__name">{project.name}</span>
              {project.bio ? <span className="tile__bio">{project.bio}</span> : null}
            </span>
          </Link>
        )
      })}
    </div>
  )
}

export default function FeaturedReel({ projects }) {
  if (!projects?.length) return null

  return (
    <div className="reel">
      <div
        className="reel__track"
        style={{ '--reel-duration': `${reelDuration(projects.length)}s` }}
      >
        <Cards projects={projects} />
        <Cards projects={projects} copy />
      </div>
    </div>
  )
}
