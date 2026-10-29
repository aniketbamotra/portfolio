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
// 1440×900.
export const Frame = ({ src, alt, caption }) => (
  <figure className="cs-frame">
    <img
      src={src}
      alt={alt}
      width="1440"
      height="900"
      loading="lazy"
      decoding="async"
    />
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
