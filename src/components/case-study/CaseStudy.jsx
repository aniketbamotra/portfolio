import "./caseStudy.css";

// Building blocks shared by case study pages. Each sits on the page grid, on
// the same reading column as the prose around it.

export const Section = ({ id, title, children }) => (
  <section className="cs-section" aria-labelledby={id}>
    <h2 className="cs-h2 font-b" id={id}>
      {title}
    </h2>
    {children}
  </section>
);

// Label on the left, value on the right, ruled like the contact list.
export const Overview = ({ items }) => (
  <dl className="cs-overview cs-prose">
    {items.map(({ term, detail }) => (
      <div className="cs-overview-row" key={term}>
        <dt className="highlight">{term}</dt>
        <dd className="font">{detail}</dd>
      </div>
    ))}
  </dl>
);

export const Stats = ({ items, label }) => (
  <ul className="cs-stats" aria-label={label}>
    {items.map(({ value, text }) => (
      <li key={value}>
        <span className="cs-stat-value font-b">{value}</span>
        <span className="cs-stat-text highlight">{text}</span>
      </li>
    ))}
  </ul>
);

// A UI frame, imported from src/assets/case-studies/<study>/. Frames sit on
// the reading column, in line with the text they illustrate. All exports are
// 16:10 (1440×900, or 2880×1800 at 2x) unless width and height say otherwise.
// A frame whose file isn't exported yet shows a labelled placeholder in dev
// and nothing at all in a build, so a placeholder can never go live.
export const Frame = ({ src, alt, caption, file, width = 1440, height = 900 }) => {
  if (!src && !import.meta.env.DEV) return null;
  return (
    <figure className="cs-frame">
      {src ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div
          className="cs-frame-placeholder"
          role="img"
          aria-label={alt}
          style={{ aspectRatio: `${width} / ${height}` }}
        >
          <span className="highlight">{file}</span>
        </div>
      )}
      {caption && (
        <figcaption className="cs-caption highlight">{caption}</figcaption>
      )}
    </figure>
  );
};

// Just enough JavaScript highlighting for short excerpts: comments, strings,
// keywords and numbers. Everything else stays ink.
const TOKENS =
  /(\/\/.*)|('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`)|\b(const|let|var|function|return|if|else|null|true|false|require|new|await|async)\b|\b(\d+(?:\.\d+)?)\b/g;
const KINDS = ["comment", "string", "keyword", "number"];

const highlight = (source) => {
  const parts = [];
  let last = 0;
  for (const match of source.matchAll(TOKENS)) {
    if (match.index > last) parts.push(source.slice(last, match.index));
    const kind = KINDS[match.slice(1).findIndex(Boolean)];
    parts.push(
      <span className={`cs-code-${kind}`} key={match.index}>
        {match[0]}
      </span>
    );
    last = match.index + match[0].length;
  }
  parts.push(source.slice(last));
  return parts;
};

// A titled code excerpt. Long lines scroll inside the box, never the page.
export const Code = ({ title, caption, children }) => (
  <figure className="cs-frame cs-code">
    <p className="cs-code-title highlight">{title}</p>
    <pre tabIndex={0} aria-label={title}>
      <code>{highlight(children.trim())}</code>
    </pre>
    {caption && (
      <figcaption className="cs-caption highlight">{caption}</figcaption>
    )}
  </figure>
);

// A YouTube video, from the no-cookie domain and only loaded near the
// viewport. 16:9, on the reading column like frames.
export const Video = ({ id, title, caption }) => (
  <figure className="cs-frame">
    <div className="cs-video">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
    {caption && (
      <figcaption className="cs-caption highlight">{caption}</figcaption>
    )}
  </figure>
);

// Wrapper for the code-drawn diagrams, on the reading column like frames so
// text, figures and captions share one left edge. The drawing is real text, the caption
// says what it shows and the summary gives the gist to screen readers first.
export const Diagram = ({ caption, summary, className = "", children }) => (
  <figure className={`cs-diagram ${className}`}>
    <p className="sr-only">{summary}</p>
    {children}
    <figcaption className="cs-caption highlight">{caption}</figcaption>
  </figure>
);
