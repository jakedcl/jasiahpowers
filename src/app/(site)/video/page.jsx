import { sanityFetch } from '@/lib/sanity'
import { siteSettingsQuery } from '@/lib/queries'
import { DEFAULT_PLAYLIST_ID, playlistId } from '@/lib/site'

export const revalidate = 3600

export const metadata = {
  title: 'Video',
}

const BLOCKED_TITLES = new Set([
  'private video',
  'deleted video',
  'video unavailable',
])

function isPublic(item) {
  const title = (item?.snippet?.title || '').trim().toLowerCase()
  if (BLOCKED_TITLES.has(title)) return false
  const privacy = item?.status?.privacyStatus
  if (privacy && privacy !== 'public' && privacy !== 'unlisted') return false
  return Boolean(item?.snippet?.resourceId?.videoId)
}

async function fetchPlaylistItems() {
  const apiKey = process.env.YOUTUBE_API_KEY
  let fromSettings = ''
  try {
    const settings = await sanityFetch(siteSettingsQuery)
    fromSettings = playlistId(settings?.youtubePlaylist)
  } catch {
    fromSettings = ''
  }
  const playlist =
    fromSettings ||
    playlistId(process.env.YOUTUBE_PLAYLIST_ID) ||
    DEFAULT_PLAYLIST_ID

  if (!apiKey) {
    return { error: 'missing_key', items: [] }
  }

  const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
  url.searchParams.set('part', 'snippet,status')
  url.searchParams.set('maxResults', '25')
  url.searchParams.set('playlistId', playlist)
  url.searchParams.set('key', apiKey)

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } })
  if (!res.ok) {
    return { error: 'fetch_failed', items: [] }
  }

  const data = await res.json()
  const items = (data.items || []).filter(isPublic)
  return { error: null, items }
}

export default async function VideoPage() {
  const { error, items } = await fetchPlaylistItems()

  if (error === 'missing_key') {
    return (
      <div className="plain-page">
        <h1 className="kicker">Video</h1>
        <p>Video playlist is not configured.</p>
      </div>
    )
  }

  if (error === 'fetch_failed') {
    return (
      <div className="plain-page">
        <h1 className="kicker">Video</h1>
        <p>Could not load videos right now.</p>
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className="plain-page">
        <h1 className="kicker">Video</h1>
        <p>No public videos in this playlist.</p>
      </div>
    )
  }

  return (
    <section className="video-page">
      <h1 className="kicker">Video</h1>
      <div className="video-grid">
        {items.map((video, index) => {
          const videoId = video.snippet.resourceId.videoId
          const title = video.snippet.title || 'Video'
          return (
            <div className="video-frame" key={videoId}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                loading={index === 0 ? 'eager' : 'lazy'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
