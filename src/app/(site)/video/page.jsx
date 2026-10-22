import { unstable_cache } from 'next/cache'
import VideoGrid from '@/components/video/VideoGrid'
import Reveal from '@/components/motion/Reveal'
import { sanityFetch } from '@/lib/sanity'
import { siteSettingsQuery } from '@/lib/queries'
import { DEFAULT_PLAYLIST_ID, playlistId } from '@/lib/site'

export const dynamic = 'force-dynamic'
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

function logFailure(label, details) {
  console.error(`[video] ${label}`, details)
}

async function resolvePlaylist() {
  let sanityRaw = ''
  try {
    const settings = await sanityFetch(siteSettingsQuery)
    sanityRaw = settings?.youtubePlaylist || ''
  } catch (err) {
    logFailure('Sanity site settings fetch failed', {
      name: err?.name,
      message: err?.message,
    })
  }

  const fromSanity = playlistId(sanityRaw)
  if (fromSanity) {
    return { playlistId: fromSanity, source: 'sanity', sanityRaw }
  }

  const envRaw = process.env.YOUTUBE_PLAYLIST_ID || ''
  const fromEnv = playlistId(envRaw)
  if (fromEnv) {
    return { playlistId: fromEnv, source: 'env', envRaw }
  }

  if (sanityRaw || envRaw) {
    logFailure('Could not parse playlist id from Sanity or env', {
      sanityRaw: sanityRaw || undefined,
      envRaw: envRaw || undefined,
    })
  }

  return { playlistId: DEFAULT_PLAYLIST_ID, source: 'default' }
}

async function fetchPlaylistItemsUncached(playlist, source) {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) {
    logFailure('Missing YOUTUBE_API_KEY', { playlistId: playlist, source })
    throw new Error('youtube_missing_api_key')
  }

  const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
  url.searchParams.set('part', 'snippet,status')
  url.searchParams.set('maxResults', '25')
  url.searchParams.set('playlistId', playlist)
  url.searchParams.set('key', apiKey)

  let res
  try {
    res = await fetch(url.toString(), { cache: 'no-store' })
  } catch (err) {
    logFailure('YouTube playlistItems fetch threw', {
      playlistId: playlist,
      source,
      name: err?.name,
      message: err?.message,
    })
    throw err
  }

  if (!res.ok) {
    const body = await res.json().catch((err) => {
      logFailure('YouTube error response JSON parse failed', {
        playlistId: playlist,
        source,
        status: res.status,
        name: err?.name,
        message: err?.message,
      })
      return {}
    })
    logFailure('YouTube playlistItems request failed', {
      status: res.status,
      playlistId: playlist,
      source,
      reason: body?.error?.errors?.[0]?.reason,
      message: body?.error?.message,
    })
    throw new Error('youtube_playlist_fetch_failed')
  }

  let data
  try {
    data = await res.json()
  } catch (err) {
    logFailure('YouTube success response JSON parse failed', {
      playlistId: playlist,
      source,
      name: err?.name,
      message: err?.message,
    })
    throw err
  }

  return (data.items || []).filter(isPublic)
}

async function fetchPlaylistItems() {
  const { playlistId: playlist, source } = await resolvePlaylist()

  if (!playlist) {
    logFailure('No playlist id after resolution', { source })
    return { error: 'fetch_failed', items: [] }
  }

  if (!process.env.YOUTUBE_API_KEY) {
    logFailure('Missing YOUTUBE_API_KEY', { playlistId: playlist, source })
    return { error: 'missing_key', items: [] }
  }

  try {
    const items = await unstable_cache(
      () => fetchPlaylistItemsUncached(playlist, source),
      ['youtube-playlist-items', playlist],
      { revalidate: 3600 },
    )()
    return { error: null, items }
  } catch (err) {
    if (err?.message === 'youtube_missing_api_key') {
      return { error: 'missing_key', items: [] }
    }
    logFailure('Playlist load failed', {
      playlistId: playlist,
      source,
      name: err?.name,
      message: err?.message,
    })
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
