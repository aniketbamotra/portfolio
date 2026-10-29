import { useEffect, useState } from "react";
import immersiveBionic from "../../assets/images/immersive-bionic.webp";
import suncare from "../../assets/images/suncare.webp";
import purebet from "../../assets/images/purebet.webp";
import keploy from "../../assets/images/keploy.webp";
import gemx from "../../assets/images/gemx.webp";
import dcj from "../../assets/images/dcj.webp";
import compliancePlatform from "../../assets/case-studies/compliance-platform/cover.png";

// role and year are optional; when both are missing a project shows its domain.
// caseStudy marks a project whose url is a page on this site rather than an
// external link; summary is its one-line pitch for social cards.
// mobileImage is an optional 4:5 portrait image for phones; until one is set,
// the desktop screenshot is cropped to fit.
export const projects = [
  {
    title: "Compliance Platform",
    image: compliancePlatform,
    url: "/compliance-platform/",
    caseStudy: true,
    role: "Design Technologist",
    year: "2025",
    summary:
      "I designed and built the frontend of a compliance platform. It takes product safety certification for a large US retailer from email-and-Excel to an automated pipeline that handles 10,000–25,000 purchase orders a week.",
  },
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

export const metaFor = ({ caseStudy, role, year, url }) =>
  [caseStudy && "Case study", role, year].filter(Boolean).join(" · ") ||
  new URL(url).hostname.replace(/^www\./, "");

export const linkProps = (project) =>
  project.caseStudy
    ? {
        href: project.url,
        "aria-label": `${project.title}, ${metaFor(project)}`,
      }
    : {
        href: project.url,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": `${project.title}, ${metaFor(project)} (opens in a new tab)`,
      };

export const useMedia = (query) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );
  useEffect(() => {
    const list = window.matchMedia(query);
    const onChange = () => setMatches(list.matches);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, [query]);
  return matches;
};
