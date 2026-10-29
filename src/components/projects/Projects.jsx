import "../comp.css";
import "./projects.css";
import ProjectsStage from "./ProjectsStage";
import ProjectsDeck from "./ProjectsDeck";
import { useMedia } from "./projectsData";

// Must match the media query for .deck-track in projects.css.
const PHONE_QUERY = "(max-width: 768px)";

const Projects = () => {
  const phone = useMedia(PHONE_QUERY);
  const heading = <h2 className="section-title font-b">Projects!</h2>;

  return (
    <section className="project-container" id="project">
      {phone ? (
        <>
          {heading}
          <ProjectsDeck />
        </>
      ) : (
        <ProjectsStage heading={heading} />
      )}
    </section>
  );
};

export default Projects;
