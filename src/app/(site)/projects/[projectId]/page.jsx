import { notFound } from 'next/navigation'
import { sanityFetch } from '@/lib/sanity'
import { projectBySlugQuery } from '@/lib/queries'
import ProjectDetail from '@/components/projects/ProjectDetail'

export const revalidate = 60

export default async function ProjectPage({ params }) {
  const { projectId } = params
  const project = await sanityFetch(projectBySlugQuery, { slug: projectId })

  if (!project) {
    notFound()
  }

  return <ProjectDetail project={project} />
}
