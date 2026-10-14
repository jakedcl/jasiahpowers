import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { imageLqip, imageMeta, imageSrc } from '@/lib/image'
import { parseYoutubeId } from '@/lib/site'

function paragraphs(text) {
  return String(text)
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)
}

function RichImage({ value }) {
  if (!value?.asset) return null
  const meta = imageMeta(value)
  return (
    <figure>
      <span
        className="prose__media"
        style={
          imageLqip(value)
            ? { backgroundImage: `url(${imageLqip(value)})` }
            : undefined
        }
      >
        <Image
          src={imageSrc(value, 1400)}
          alt={value.alt || ''}
          width={meta.width}
          height={meta.height}
          sizes="(max-width: 720px) 100vw, 640px"
          style={{ width: '100%', height: 'auto' }}
        />
      </span>
      {value.caption ? <figcaption>{value.caption}</figcaption> : null}
    </figure>
  )
}

function Youtube({ value }) {
  const id = parseYoutubeId(value?.url)
  if (!id) return null
  return (
    <div className="video-frame">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

const components = {
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || ''
      const external = /^https?:/i.test(href)
      return (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: RichImage,
    youtubeEmbed: Youtube,
  },
}

export default function ProjectText({ value }) {
  if (!value) return null
  if (typeof value === 'string') {
    const blocks = paragraphs(value)
    if (!blocks.length) return null
    return (
      <div className="prose">
        {blocks.map((block) => (
          <p key={block}>{block}</p>
        ))}
      </div>
    )
  }
  if (!Array.isArray(value) || !value.length) return null
  return (
    <div className="prose">
      <PortableText value={value} components={components} />
    </div>
  )
}
