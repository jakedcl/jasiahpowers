import Image from 'next/image'
import ProjectTiles from '@/components/projects/ProjectTiles'

export default function HomePage({ title, videoId, welcomeMessage, projects }) {
  const message = welcomeMessage?.trim()

  return (
    <div className="home">
      <div className="hero">
        <Image
          src="/logo-mark.png"
          alt=""
          width={640}
          height={786}
          priority
          className="hero__logo"
        />
        <h1>{title}</h1>
      </div>
      {message ? <p className="welcome">{message}</p> : null}
      {projects?.length ? <p className="kicker">Projects</p> : null}
      <ProjectTiles projects={projects} />
      <section className="home-video">
        <p className="kicker">Video</p>
        <div className="video-frame">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0`}
            title="YouTube video player"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  )
}
