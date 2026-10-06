import HomePage from '@/components/HomePage'
import { sanityFetch } from '@/lib/sanity'
import { homePageQuery, projectsQuery, siteSettingsQuery } from '@/lib/queries'
import { youtubeId } from '@/lib/site'

export const revalidate = 60

export default async function Page() {
  const [home, projects, settings] = await Promise.all([
    sanityFetch(homePageQuery),
    sanityFetch(projectsQuery),
    sanityFetch(siteSettingsQuery),
  ])

  return (
    <HomePage
      title={settings?.title || 'Jasiah Powers'}
      videoId={youtubeId(home?.featuredVideo?.videoId)}
      welcomeMessage={home?.welcomeMessage || ''}
      projects={projects || []}
    />
  )
}
