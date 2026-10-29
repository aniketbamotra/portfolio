import "./comp.css";
import ExternalLinkIcon from "./ExternalLinkIcon";
import immersiveBionic from "../assets/images/immersive-bionic.webp";
import suncare from "../assets/images/suncare.webp";
import purebet from "../assets/images/purebet.webp";
import keploy from "../assets/images/keploy.webp";
import gemx from "../assets/images/gemx.webp";
import dcj from "../assets/images/dcj.webp";

const projects = [
  {
    title: "Immersive Bionic",
    image: immersiveBionic,
    url: "https://www.behance.net/gallery/174224683/Immersive-Bionic",
  },
  {
    title: "Suncare Formulations",
    image: suncare,
    url: "https://www.suncareformulations.com/",
  },
  {
    title: "Purebet",
    image: purebet,
    url: "https://www.purebet.io/",
  },
  {
    title: "Keploy",
    image: keploy,
    url: "https://keploy.io/",
  },
  {
    title: "GEMx",
    image: gemx,
    url: "https://gemx.ag/",
  },
  {
    title: "Demand Climate Justice",
    image: dcj,
    url: "https://demandclimatejustice.org/",
  },
];

const Projects = () => {
  return (
    <section className="project-container" id="project">
      <div className="projects-wrapper">
        <h2 className="font-b">Projects!</h2>
        <div className="project-items">
          {projects.map(({ title, image, url }) => (
            <article className="project-item" key={url}>
              <img
                src={image}
                alt={`Screenshot of the ${title} website`}
                className="project-image"
                width="1600"
                height="900"
                loading="lazy"
                decoding="async"
              />
              <div className="project-links">
                <h3 className="project-title font">{title}</h3>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="visit-project"
                  aria-label={`Visit ${title} (opens in a new tab)`}
                >
                  Visit Project
                  <ExternalLinkIcon />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
