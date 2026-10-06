import { sanityFetch } from '@/lib/sanity'
import { projectsQuery } from '@/lib/queries'
import ProjectsGrid from '@/components/projects/ProjectsGrid'

export const revalidate = 60

export const metadata = {
  title: 'Projects',
}

export default async function ProjectsPage() {
  const projects = await sanityFetch(projectsQuery)
  return <ProjectsGrid projects={projects} />
}
