import { useEffect, useRef, useState } from "react";

// How far down the viewport a heading has to pass before its section counts
// as the one being read.
const READ_LINE = 0.35;

const clamp01 = (n) => Math.min(Math.max(n, 0), 1);

// Reading progress plus an index of the sections. On wide screens the index
// sits in the left margin with the progress running down beside it; on
// narrower ones only a thin bar across the top remains. Both appear once the
// first section is reached and leave after the last.
const CaseStudyNav = ({ sections }) => {
  const [active, setActive] = useState(-1);
  const [shown, setShown] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const headings = sections.map(({ id }) => document.getElementById(id));
    const lastSection = headings[headings.length - 1].closest("section");
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const first = headings[0].getBoundingClientRect();
      const last = lastSection.getBoundingClientRect();
      // 0 when the first heading crosses the read line, 1 when the end of
      // the last section reaches the bottom of the screen.
      const start = first.top - vh * READ_LINE;
      const end = last.bottom - vh;
      navRef.current.style.setProperty(
        "--progress",
        clamp01(-start / (end - start))
      );
      setShown(first.top < vh * 0.6 && last.bottom > vh * 0.3);
      let current = -1;
      headings.forEach((heading, i) => {
        if (heading.getBoundingClientRect().top <= vh * READ_LINE) current = i;
      });
      setActive(current);
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
  }, [sections]);

  return (
    <div
      className={`cs-nav${shown ? " is-shown" : ""}`}
      ref={navRef}
    >
      <div className="cs-progress" aria-hidden="true">
        <span />
      </div>
      <nav className="cs-index" aria-label="On this page">
        <div className="cs-index-track" aria-hidden="true">
          <span />
        </div>
        <ol>
          {sections.map(({ id, label }, i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="font"
                aria-current={i === active ? "true" : undefined}
              >
                <span className="sweep">{label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default CaseStudyNav;
