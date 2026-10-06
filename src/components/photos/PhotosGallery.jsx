import ZoomImage from '@/components/ZoomImage'
import { imageMeta, imageSrc } from '@/lib/image'

export default function PhotosGallery({ photos, description }) {
  const intro = description?.trim()
  const items = (photos || []).filter((photo) => photo?.image)

  if (!items.length) {
    return (
      <div className="plain-page">
        <h1 className="kicker">Photos</h1>
        <p>No photos in the gallery yet.</p>
      </div>
    )
  }

  return (
    <section>
      <h1 className="kicker">Photos</h1>
      {intro ? <p className="welcome">{intro}</p> : null}
      <div className="gallery">
        {items.map((photo, index) => {
          const meta = imageMeta(photo.image)
          const alt = photo.alt || photo.caption || 'Photo'
          return (
            <ZoomImage
              key={photo._key || index}
              src={imageSrc(photo.image, 1200)}
              fullSrc={imageSrc(photo.image, 2400)}
              alt={alt}
              caption={photo.caption || ''}
              width={meta.width}
              height={meta.height}
              sizes="(max-width: 699px) 100vw, (max-width: 1099px) 50vw, 33vw"
            />
          )
        })}
      </div>
    </section>
  )
}
