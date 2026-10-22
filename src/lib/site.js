import { BOOKING_TYPES } from '@/lib/booking'

export const FALLBACK_EMAIL = 'jasiahsteez@gmail.com'

export const FALLBACK_MUSIC =
  'https://music.apple.com/us/artist/steez%C3%B6/1850778759'

export const FALLBACK_VIDEO_ID = 'nRStNn8KVcA'

export const DEFAULT_PLAYLIST_ID = 'PLNo5tM02yzAVMsvykDJfejRnaZ6Ut0eSQ'

export const FALLBACK_SOCIAL = {
  instagram: 'https://www.instagram.com/jasiahpowers',
}

const HOMEPAGE_HOSTS = new Set([
  'twitter.com',
  'www.twitter.com',
  'x.com',
  'www.x.com',
  'youtube.com',
  'www.youtube.com',
  'tiktok.com',
  'www.tiktok.com',
  'instagram.com',
  'www.instagram.com',
])

export function usableLink(url) {
  const raw = String(url || '').trim()
  if (!raw) return ''
  try {
    const parsed = new URL(raw)
    const path = parsed.pathname.replace(/\/+$/, '')
    if (HOMEPAGE_HOSTS.has(parsed.hostname) && !path) return ''
    return raw
  } catch {
    return ''
  }
}

export function socialLinks(settings) {
  const fromCms = settings?.socialLinks || {}
  return {
    instagram: usableLink(fromCms.instagram) || FALLBACK_SOCIAL.instagram,
    twitter: usableLink(fromCms.twitter),
    youtube: usableLink(fromCms.youtube),
    tiktok: usableLink(fromCms.tiktok),
  }
}

export function bookingTypes(settings) {
  const fromCms = (settings?.bookingTypes || [])
    .map((type) => String(type || '').trim())
    .filter(Boolean)
  return fromCms.length ? fromCms : BOOKING_TYPES
}

export function contactHref(email) {
  const address = email || FALLBACK_EMAIL
  return `mailto:${address}?subject=Contact from Website&body=Hi Jasiah,`
}

export function parseYoutubeId(value) {
  const raw = String(value || '').trim()
  if (!raw) return ''
  const match = raw.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/
  )
  if (match) return match[1]
  if (/^[\w-]{6,}$/.test(raw)) return raw
  return ''
}

export function youtubeId(value) {
  return parseYoutubeId(value) || FALLBACK_VIDEO_ID
}

export function playlistId(value) {
  const raw = String(value || '').trim()
  if (!raw) return ''

  try {
    const list = new URL(raw).searchParams.get('list')
    if (list && /^PL[\w-]+$/.test(list)) return list
  } catch {
    /* bare id or partial url */
  }

  const listParam = raw.match(/[?&]list=(PL[\w-]+)/i)
  if (listParam) return listParam[1]

  const bare = raw.split('&')[0].trim()
  if (/^PL[\w-]+$/.test(bare)) return bare
  if (/^[\w-]{8,}$/.test(bare)) return bare
  return ''
}
