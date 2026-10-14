import HomePage from '@/components/HomePage'
import { sanityFetch } from '@/lib/sanity'
import { homePageQuery, projectsQuery, siteSettingsQuery } from '@/lib/queries'
import { youtubeId } from '@/lib/site'

export const revalidate = 60

export default async function Page() {
  const [home, allProjects, settings] = await Promise.all([
    sanityFetch(homePageQuery),
    sanityFetch(projectsQuery),
    sanityFetch(siteSettingsQuery),
  ])

  const picked = (home?.featuredProjects || []).filter((project) => project?._id)
  const projects = picked.length ? picked : allProjects || []

  return (
    <HomePage
      title={settings?.title || 'Jasiah Powers'}
      videoId={youtubeId(home?.featuredVideo?.videoId)}
      welcomeMessage={home?.welcomeMessage || ''}
      projects={projects}
    />
  )
}
