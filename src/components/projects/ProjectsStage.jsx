import { useEffect, useRef, useState } from "react";
import ExternalLinkIcon from "../ExternalLinkIcon";
import { projects, metaFor, linkProps, useMedia } from "./projectsData";

// Must match the media query that pins .stage-track in projects.css.
const PIN_QUERY = "(min-width: 769px) and (min-height: 640px)";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// A quiet list of names beside one large screenshot. On wide screens the
// stage pins to the viewport and scrolling steps through each project before
// the page moves on; on short screens each name carries its own screenshot.
const ProjectsStage = ({ heading }) => {
  const [active, setActive] = useState(0);
  const pinned = useMedia(PIN_QUERY);
  const trackRef = useRef(null);

  // Scroll progress through the track picks the project on stage.
  useEffect(() => {
    if (!pinned) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const track = trackRef.current.getBoundingClientRect();
      const distance = track.height - window.innerHeight;
      const progress = Math.min(Math.max(-track.top / distance, 0), 0.9999);
      setActive(Math.floor(progress * projects.length));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pinned]);

  // Tabbing to a name scrolls the page to that project's stretch of the track.
  const onFocus = (i) => {
    if (!pinned || i === active) return;
    const track = trackRef.current;
    const distance = track.offsetHeight - window.innerHeight;
    const top = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + (distance * (i + 0.5)) / projects.length,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <div
      className="stage-track"
      ref={trackRef}
      style={{ "--count": projects.length }}
    >
      <div className="stage-pin">
        {heading}
        <div className="stage">
          <ul className="stage-list">
            {projects.map((project, i) => (
              <li key={project.url}>
                <a
                  {...linkProps(project)}
                  className="stage-link"
                  aria-current={pinned && i === active ? "true" : undefined}
                  onFocus={() => onFocus(i)}
                >
                  <span className="stage-title font">
                    <span className="sweep">{project.title}</span>
                  </span>
                  <span className="stage-meta highlight">{metaFor(project)}</span>
                  <img
                    src={project.image}
                    alt=""
                    className="stage-thumb"
                    width="1600"
                    height="900"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              </li>
            ))}
          </ul>

          <a
            {...linkProps(projects[active])}
            className="stage-screen"
            tabIndex={-1}
            aria-hidden="true"
          >
            {pinned &&
              projects.map(({ url, image }, i) => (
                <img
                  key={url}
                  src={image}
                  alt=""
                  width="1600"
                  height="900"
                  decoding="async"
                  className={i === active ? "is-active" : undefined}
                />
              ))}
            <span className="stage-caption highlight">
              {metaFor(projects[active])}
              <ExternalLinkIcon />
            </span>
          </a>
        </div>
        {pinned && (
          <div className="stage-progress" aria-hidden="true">
            <span style={{ scale: `${(active + 1) / projects.length} 1` }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsStage;
