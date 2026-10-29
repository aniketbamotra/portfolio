import { useEffect, useRef, useState } from "react";
import ExternalLinkIcon from "../ExternalLinkIcon";
import ArrowIcon from "../ArrowIcon";
import { projects, metaFor, linkProps } from "./projectsData";

// How far the covered image drifts up as the next one rises over it.
const DRIFT = 18;
// Share of each project's scroll spent holding still before the next rises.
const HOLD = 0.2;

const clamp01 = (n) => Math.min(Math.max(n, 0), 1);

// Phones: the deck pins once the first image and its caption are in view,
// then each scroll stretch raises the next image up over the current one
// while the caption below swaps in place. Movement tracks the finger.
const ProjectsDeck = () => {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const imageRefs = useRef([]);
  const progressRef = useRef(null);

  useEffect(() => {
    const drift = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : DRIFT;
    let frame = 0;
    const update = () => {
      frame = 0;
      const track = trackRef.current.getBoundingClientRect();
      const distance = track.height - window.innerHeight;
      const progress = clamp01(-track.top / distance);
      // p runs 0 → count - 1: the whole part is the image on top, the
      // fraction is how far the next one has risen over it. The extra HOLD
      // lets the last project rest before the section lets go.
      const last = projects.length - 1;
      const p = Math.min(progress * (last + HOLD), last);

      imageRefs.current.forEach((img, i) => {
        // How far image i has risen into the frame, after a short hold.
        const rise = i === 0 ? 1 : clamp01((p - (i - 1) - HOLD) / (1 - HOLD));
        // How far the image above it has covered it.
        const covered =
          i === last ? 0 : clamp01((p - i - HOLD) / (1 - HOLD));
        img.style.translate = `0 ${(1 - rise) * 100 - covered * drift}%`;
      });
      progressRef.current.style.scale = `${progress} 1`;

      const risen = Math.floor(p);
      const next = clamp01((p - risen - HOLD) / (1 - HOLD));
      setActive(Math.min(risen + (next > 0.5 ? 1 : 0), last));
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
  }, []);

  return (
    <>
      {/* The animated deck is for sight; screen readers get a plain list. */}
      <ul className="sr-only">
        {projects.map((project) => (
          <li key={project.url}>
            <a {...linkProps(project)}>{project.title}</a>
          </li>
        ))}
      </ul>

      <div
        className="deck-track"
        ref={trackRef}
        style={{ "--count": projects.length }}
        aria-hidden="true"
      >
        <div className="deck-pin">
          <div className="deck-card">
            <a
              {...linkProps(projects[active])}
              className="deck-frame"
              tabIndex={-1}
            >
              {projects.map((project, i) => (
                <img
                  key={project.url}
                  ref={(el) => {
                    imageRefs.current[i] = el;
                  }}
                  src={project.mobileImage ?? project.image}
                  alt=""
                  width="1200"
                  height="1500"
                  decoding="async"
                  style={{ zIndex: i }}
                />
              ))}
            </a>

            <div className="deck-captions">
              {projects.map((project, i) => (
                <a
                  key={project.url}
                  {...linkProps(project)}
                  className={`deck-caption${i === active ? " is-active" : ""}`}
                  tabIndex={-1}
                >
                  <span className="deck-title font">{project.title}</span>
                  <span className="deck-meta highlight">{metaFor(project)}</span>
                  {project.caseStudy ? <ArrowIcon /> : <ExternalLinkIcon />}
                </a>
              ))}
            </div>

            <div className="deck-progress">
              <span ref={progressRef} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsDeck;
