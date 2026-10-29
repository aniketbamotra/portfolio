import "./comp.css";
import ExternalLinkIcon from "./ExternalLinkIcon";

const links = [
  {
    label: "LinkedIn",
    text: "Aniket Bamotra",
    href: "https://www.linkedin.com/in/aniket-bamotra-443089153/",
    external: true,
  },
  {
    label: "GitHub",
    text: "aniketbamotra",
    href: "https://github.com/aniketbamotra",
    external: true,
  },
  {
    label: "Mail",
    text: "aniketbamotra@gmail.com",
    href: "mailto:aniketbamotra@gmail.com",
    external: false,
  },
];

const Contact = () => {
  return (
    <section className="contact">
      <h2 className="font" id="contact-title">Get in touch!</h2>
      <ul className="contact-list">
        {links.map(({ label, text, href, external }) => (
          <li className="font" key={label}>
            {label}
            <span className="highlight">
              <a
                href={href}
                {...(external && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                {text}
                <ExternalLinkIcon />
              </a>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Contact;
