import ProjectTiles from '@/components/projects/ProjectTiles'

export default function ProjectsGrid({ projects }) {
  if (!projects?.length) {
    return (
      <div className="plain-page">
        <h1 className="kicker">Projects</h1>
        <p>No projects yet.</p>
      </div>
    )
  }

  return (
    <section className="project-index">
      <h1 className="kicker">Projects</h1>
      <ProjectTiles projects={projects} priorityFirst />
    </section>
  )
}
