export const revalidate = 3600

const DEFAULT_PLAYLIST_ID = 'PLNo5tM02yzAVMsvykDJfejRnaZ6Ut0eSQ'

async function fetchPlaylistItems() {
  const apiKey = process.env.YOUTUBE_API_KEY
  const playlistId =
    process.env.YOUTUBE_PLAYLIST_ID || DEFAULT_PLAYLIST_ID

  if (!apiKey) {
    return { error: 'missing_key', items: [] }
  }

  const url = new URL(
    'https://www.googleapis.com/youtube/v3/playlistItems'
  )
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
      <div
        style={{
          maxWidth: 640,
          margin: '0 auto',
          padding: '15vh 16px',
          textAlign: 'center',
        }}
      >
        <p>
          Video playlist is not configured. Set{' '}
          <code>YOUTUBE_API_KEY</code> (and optionally{' '}
          <code>YOUTUBE_PLAYLIST_ID</code>) in the environment.
        </p>
      </div>
    )
  }

  if (error === 'fetch_failed' || !items.length) {
    return (
      <div
        style={{
          maxWidth: 640,
          margin: '0 auto',
          padding: '15vh 16px',
          textAlign: 'center',
        }}
      >
        <p>Could not load videos right now.</p>
      </div>
    )
  }

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '15vh 16px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 16,
          justifyContent: 'center',
        }}
      >
        {items.map((video, index) => (
          <div
            key={video?.snippet?.resourceId?.videoId || index}
            style={{
              border: '3px solid rgb(243,232,232)',
              boxShadow: '0 0 11px 0 rgba(255, 157, 157, .35)',
              borderRadius: 5,
              backgroundColor: 'black',
              position: 'relative',
              width: '100%',
              paddingBottom: '56.25%',
              height: 0,
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
              title={video.snippet.title}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '99%',
                height: '98%',
                border: 0,
              }}
              allowFullScreen
            />
          </div>
        ))}
      </div>
    </div>
  )
}
