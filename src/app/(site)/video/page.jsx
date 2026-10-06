export const revalidate = 3600

export const metadata = {
  title: 'Video',
}

const DEFAULT_PLAYLIST_ID = 'PLNo5tM02yzAVMsvykDJfejRnaZ6Ut0eSQ'

async function fetchPlaylistItems() {
  const apiKey = process.env.YOUTUBE_API_KEY
  const playlistId = process.env.YOUTUBE_PLAYLIST_ID || DEFAULT_PLAYLIST_ID

  if (!apiKey) {
    return { error: 'missing_key', items: [] }
  }

  const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
  url.searchParams.set('part', 'snippet')
  url.searchParams.set('maxResults', '25')
  url.searchParams.set('playlistId', playlistId)
  url.searchParams.set('key', apiKey)

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } })
  if (!res.ok) {
    return { error: 'fetch_failed', items: [] }
  }

  const data = await res.json()
  return { error: null, items: data.items || [] }
}

export default async function VideoPage() {
  const { error, items } = await fetchPlaylistItems()

  if (error === 'missing_key') {
    return (
      <div className="plain-page">
        <h1 className="kicker">Video</h1>
        <p>
          Video playlist is not configured. Set <code>YOUTUBE_API_KEY</code>{' '}
          (and optionally <code>YOUTUBE_PLAYLIST_ID</code>) in the environment.
        </p>
      </div>
    )
  }

  if (error === 'fetch_failed' || !items.length) {
    return (
      <div className="plain-page">
        <h1 className="kicker">Video</h1>
        <p>Could not load videos right now.</p>
      </div>
    )
  }

  return (
    <section className="video-page">
      <h1 className="kicker">Video</h1>
      <div className="video-grid">
        {items.map((video, index) => {
          const videoId = video?.snippet?.resourceId?.videoId
          const title = video?.snippet?.title || 'Video'
          return (
            <article
              className="video-card"
              key={videoId || index}
            >
              <div className="video-frame">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={title}
                  allowFullScreen
                />
              </div>
              <h2>{title}</h2>
            </article>
          )
        })}
      </div>
    </section>
  )
}
