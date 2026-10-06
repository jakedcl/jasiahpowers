import HomePage from '@/components/HomePage'
import { sanityFetch } from '@/lib/sanity'
import { homePageQuery, projectsQuery, siteSettingsQuery } from '@/lib/queries'
import { imageMeta, imageSrc, projectPath } from '@/lib/image'
import { youtubeId } from '@/lib/site'

export const revalidate = 60

export default async function Page() {
  const [home, projects, settings] = await Promise.all([
    sanityFetch(homePageQuery),
    sanityFetch(projectsQuery),
    sanityFetch(siteSettingsQuery),
  ])

  const project = (projects || []).find((item) => item?.images?.length) || null
  const image = project?.images?.[0]
  const meta = image ? imageMeta(image) : null

  return (
    <HomePage
      title={settings?.title || 'Jasiah Powers'}
      videoId={youtubeId(home?.featuredVideo?.videoId)}
      welcomeMessage={home?.welcomeMessage || ''}
      project={
        project
          ? {
              name: project.name,
              href: projectPath(project),
              image: image
                ? {
                    src: imageSrc(image, 1600),
                    alt: image.alt || project.name,
                    width: meta.width,
                    height: meta.height,
                  }
                : null,
            }
          : null
      }
    />
  )
}
