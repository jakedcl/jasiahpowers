import HomeIntro from '@/components/HomeIntro'
import FeaturedReel from '@/components/projects/FeaturedReel'

export default function HomePage({ title, videoId, welcomeMessage, projects }) {
  const message = welcomeMessage?.trim()

  return (
    <div className="home">
      <HomeIntro title={title} />
      <h1 className="visually-hidden">{title}</h1>
      {message ? <p className="welcome">{message}</p> : null}
      <section className="reel-section">
        <p className="kicker">Featured work</p>
        {projects?.length ? (
          <FeaturedReel projects={projects} />
        ) : (
          <p className="detail__empty">No projects yet.</p>
        )}
      </section>
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
