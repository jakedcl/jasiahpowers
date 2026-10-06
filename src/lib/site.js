export const FALLBACK_EMAIL = 'jasiahsteez@gmail.com'

export const FALLBACK_MUSIC =
  'https://music.apple.com/us/artist/steez%C3%B6/1850778759'

export const FALLBACK_VIDEO_ID = 'nRStNn8KVcA'

export const FALLBACK_SOCIAL = {
  instagram: 'https://www.instagram.com/jasiahpowers',
  twitter: 'https://www.twitter.com',
  youtube: 'https://www.youtube.com',
  tiktok: 'https://www.tiktok.com',
}

export function socialLinks(settings) {
  const fromCms = settings?.socialLinks || {}
  return {
    instagram: fromCms.instagram || FALLBACK_SOCIAL.instagram,
    twitter: fromCms.twitter || FALLBACK_SOCIAL.twitter,
    youtube: fromCms.youtube || FALLBACK_SOCIAL.youtube,
    tiktok: fromCms.tiktok || FALLBACK_SOCIAL.tiktok,
  }
}

export function contactHref(email) {
  const address = email || FALLBACK_EMAIL
  return `mailto:${address}?subject=Contact from Website&body=Hi Jasiah,`
}

export function youtubeId(value) {
  const id = (value || '').trim()
  return /^[\w-]{6,}$/.test(id) ? id : FALLBACK_VIDEO_ID
}
