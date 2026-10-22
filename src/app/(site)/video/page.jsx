import { unstable_cache } from 'next/cache'
import VideoGrid from '@/components/video/VideoGrid'
import Reveal from '@/components/motion/Reveal'
import { sanityFetch } from '@/lib/sanity'
import { siteSettingsQuery } from '@/lib/queries'
import { DEFAULT_PLAYLIST_ID, playlistId } from '@/lib/site'

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

async function fetchPlaylistItemsUncached(playlist, apiKey) {
  const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
  url.searchParams.set('part', 'snippet,status')
  url.searchParams.set('maxResults', '25')
  url.searchParams.set('playlistId', playlist)
  url.searchParams.set('key', apiKey)

  const res = await fetch(url.toString(), { cache: 'no-store' })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const reason = body?.error?.errors?.[0]?.reason
    const message = body?.error?.message
    console.error('YouTube playlistItems request failed', {
      status: res.status,
      playlistId: playlist,
      reason,
      message,
    })
    throw new Error('youtube_playlist_fetch_failed')
  }

  const data = await res.json()
  return (data.items || []).filter(isPublic)
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

  try {
    const items = await unstable_cache(
      () => fetchPlaylistItemsUncached(playlist, apiKey),
      ['youtube-playlist-items', playlist],
      { revalidate: 3600 },
    )()
    return { error: null, items }
  } catch {
    return { error: 'fetch_failed', items: [] }
  }
}

export default async function VideoPage() {
  const { error, items } = await fetchPlaylistItems()

  if (error === 'missing_key') {
    return (
      <div className="plain-page">
        <Reveal>
          <h1 className="kicker">Video</h1>
          <p>Video playlist is not configured.</p>
        </Reveal>
      </div>
    )
  }

  if (error === 'fetch_failed') {
    return (
      <div className="plain-page">
        <Reveal>
          <h1 className="kicker">Video</h1>
          <p>Could not load videos right now.</p>
        </Reveal>
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className="plain-page">
        <Reveal>
          <h1 className="kicker">Video</h1>
          <p>No public videos in this playlist.</p>
        </Reveal>
      </div>
    )
  }

  return (
    <section className="video-page">
      <VideoGrid items={items} />
    </section>
  )
}
