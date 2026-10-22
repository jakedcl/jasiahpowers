'use client'

import Reveal from '@/components/motion/Reveal'
import Stagger from '@/components/motion/Stagger'

export default function VideoGrid({ items }) {
  return (
    <>
      <Reveal>
        <h1 className="kicker">Video</h1>
      </Reveal>
      <Stagger className="video-grid">
        {items.map((video, index) => {
          const videoId = video.snippet.resourceId.videoId
          const title = video.snippet.title || 'Video'
          return (
            <div className="video-frame" key={videoId}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                loading={index === 0 ? 'eager' : 'lazy'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )
        })}
      </Stagger>
    </>
  )
}
