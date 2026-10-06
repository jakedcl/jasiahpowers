import { urlFor } from '@/lib/sanity'

export function imageMeta(image) {
  const ref = image?.asset?._ref || ''
  const match = ref.match(/-(\d+)x(\d+)-/)
  if (!match) {
    return { width: 1200, height: 1800 }
  }
  return { width: Number(match[1]), height: Number(match[2]) }
}

export function imageSrc(image, width) {
  return urlFor(image).width(width).fit('max').auto('format').quality(80).url()
}

export function projectPath(project) {
  return `/projects/${project?.slug?.current || project?._id}`
}
