import Link from 'next/link'
import Image from 'next/image'

export default function HomePage({ title, videoId, welcomeMessage, project }) {
  const message = welcomeMessage?.trim()

  return (
    <div className="home">
      <div className="cover">
        {project?.image ? (
          <Link
            href={project.href}
            className="cover__photo"
            style={{
              width: `min(520px, 100%, calc((100svh - 220px) * ${project.image.width} / ${project.image.height}))`,
            }}
          >
            <div
              className="cover__frame"
              style={{
                aspectRatio: `${project.image.width} / ${project.image.height}`,
              }}
            >
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                priority
                sizes="(max-width: 700px) 100vw, 520px"
              />
            </div>
          </Link>
        ) : null}
        <div className="cover__line">
          <h1>{title}</h1>
          {project?.name ? (
            <Link href={project.href} className="cover__project">
              {project.name}
            </Link>
          ) : null}
        </div>
      </div>
      {message ? <p className="welcome">{message}</p> : null}
      <section className="home-video">
        <p className="kicker">Video</p>
        <div className="video-frame">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  )
}
