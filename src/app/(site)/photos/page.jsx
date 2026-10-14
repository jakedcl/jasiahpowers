import { sanityFetch } from '@/lib/sanity'
import { photoGalleryQuery } from '@/lib/queries'
import PhotosGallery from '@/components/photos/PhotosGallery'

export const revalidate = 60

export const metadata = {
  title: 'Photos',
}

export default async function PhotosPage() {
  const photoGallery = await sanityFetch(photoGalleryQuery)
  const photos = photoGallery?.photos || []

  return (
    <PhotosGallery
      photos={photos}
      description={photoGallery?.description}
    />
  )
}
