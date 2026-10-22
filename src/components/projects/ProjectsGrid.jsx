import ProjectTiles from '@/components/projects/ProjectTiles'
import Reveal from '@/components/motion/Reveal'

export default function ProjectsGrid({ projects }) {
  if (!projects?.length) {
    return (
      <div className="plain-page">
        <Reveal>
          <h1 className="kicker">Projects</h1>
          <p>No projects yet.</p>
        </Reveal>
      </div>
    )
  }

  return (
    <section className="project-index">
      <Reveal>
        <h1 className="kicker">Projects</h1>
      </Reveal>
      <ProjectTiles projects={projects} priorityFirst />
    </section>
  )
}
