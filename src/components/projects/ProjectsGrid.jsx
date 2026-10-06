import Link from 'next/link'
import Image from 'next/image'
import { imageMeta, imageSrc, projectPath } from '@/lib/image'

export default function ProjectsGrid({ projects }) {
  if (!projects?.length) {
    return (
      <div className="plain-page">
        <h1 className="kicker">Projects</h1>
        <p>No projects yet.</p>
      </div>
    )
  }

  return (
    <section className="project-index">
      <h1 className="kicker">Projects</h1>
      <ul>
        {projects.map((project) => {
          const image = project.images?.[0]
          const meta = image ? imageMeta(image) : null
          return (
            <li key={project._id}>
              <Link
                href={projectPath(project)}
                className={image ? 'project-row' : 'project-row project-row--text'}
              >
                <h2>{project.name}</h2>
                {image ? (
                  <span className="project-row__media">
                    <Image
                      src={imageSrc(image, 1000)}
                      alt={image.alt || ''}
                      width={meta.width}
                      height={meta.height}
                      sizes="(max-width: 800px) 92vw, 420px"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </span>
                ) : null}
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
