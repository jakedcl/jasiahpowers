import ZoomImage from '@/components/ZoomImage'
import Reveal from '@/components/motion/Reveal'
import { imageLqip, imageMeta, imageSrc, mosaicSizes } from '@/lib/image'

export default function PhotosGallery({ photos, description }) {
  const intro = description?.trim()
  const items = (photos || []).filter((photo) => photo?.image)

  if (!items.length) {
    return (
      <div className="plain-page">
        <Reveal>
          <h1 className="kicker">Photos</h1>
          <p>No photos in the gallery yet.</p>
        </Reveal>
      </div>
    )
  }

  return (
    <section className="photos-page">
      <Reveal>
        <h1 className="kicker">Photos</h1>
        {intro ? <p className="welcome">{intro}</p> : null}
      </Reveal>
      <div className="photos-mosaic">
        {items.map((photo, index) => {
          const meta = imageMeta(photo.image)
          const alt = photo.alt || photo.caption || 'Photo'
          return (
            <Reveal key={photo._key || index} className="photos-mosaic__item">
              <ZoomImage
                src={imageSrc(photo.image, 960)}
                fullSrc={imageSrc(photo.image, 2000)}
                lqip={imageLqip(photo.image)}
                alt={alt}
                caption={photo.caption || ''}
                width={meta.width}
                height={meta.height}
                sizes={mosaicSizes}
                priority={index < 6}
              />
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
