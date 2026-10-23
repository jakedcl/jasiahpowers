import { notFound } from 'next/navigation'
import { sanityFetch } from '@/lib/sanity'
import { projectBySlugQuery } from '@/lib/queries'
import ProjectDetail from '@/components/projects/ProjectDetail'
import { plainText } from '@/lib/text'

export const revalidate = 60

export async function generateMetadata(props) {
  const params = await props.params;
  const project = await sanityFetch(projectBySlugQuery, {
    slug: params.projectId,
  })
  if (!project?.name) return {}
  const description = project.bio?.trim() || plainText(project.description)
  return {
    title: project.name,
    description: description || undefined,
  }
}

export default async function ProjectPage(props) {
  const params = await props.params;
  const { projectId } = params
  const project = await sanityFetch(projectBySlugQuery, { slug: projectId })

  if (!project) {
    notFound()
  }

  return <ProjectDetail project={project} />
}
