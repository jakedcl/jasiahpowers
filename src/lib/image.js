import { urlFor } from '@/lib/sanity'

export function imageMeta(image) {
  const ref = image?.asset?._ref || ''
  const match = ref.match(/-(\d+)x(\d+)-/)
  if (!match) {
    return { width: 1200, height: 1800 }
  }
  return { width: Number(match[1]), height: Number(match[2]) }
}

export const gridSizes =
  '(max-width: 699px) 100vw, (max-width: 1099px) 50vw, 33vw'

export function imageSrc(image, width) {
  return urlFor(image).width(width).fit('max').auto('format').quality(75).url()
}

export function imageLqip(image) {
  return urlFor(image).width(24).fit('max').blur(20).auto('format').quality(20).url()
}

export function projectPath(project) {
  return `/projects/${project?.slug?.current || project?._id}`
}
