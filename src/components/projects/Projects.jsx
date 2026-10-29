import "../comp.css";
import "./projects.css";
import ProjectsStage from "./ProjectsStage";

const Projects = () => (
  <section className="project-container" id="project">
    <ProjectsStage
      heading={<h2 className="section-title font-b">Projects!</h2>}
    />
  </section>
);

export default Projects;
