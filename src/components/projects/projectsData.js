import { useEffect, useState } from "react";
import immersiveBionic from "../../assets/images/immersive-bionic.webp";
import suncare from "../../assets/images/suncare.webp";
import keploy from "../../assets/images/keploy.webp";
import gemx from "../../assets/images/gemx.webp";
import dcj from "../../assets/images/dcj.webp";
import compliancePlatform from "../../assets/case-studies/compliance-platform/cover.webp";
import psymatch from "../../assets/case-studies/psymatch/cover.webp";
import { drafts } from "../../case-studies/drafts";

// role and year are optional; when both are missing a project shows its domain.
// caseStudy marks a project whose url is a page on this site rather than an
// external link; summary is its one-line pitch for social cards.
// Case studies listed in src/case-studies/drafts.js only show in dev.
// mobileImage is an optional 4:5 portrait image for phones; until one is set,
// the desktop screenshot is cropped to fit.
const isDraft = ({ url }) => drafts.some((slug) => url === `/${slug}/`);

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
    title: "PsyMatch",
    image: psymatch,
    url: "/psymatch/",
    caseStudy: true,
    role: "Design, Workflow & Frontend Lead",
    summary:
      "A bilingual clinical intake platform that turns patient-completed diagnostic interviews into privacy-safe, AI-drafted clinical reports.",
  },
  {
    title: "Immersive Bionic",
    image: immersiveBionic,
    url: "/immersive-bionic/",
    caseStudy: true,
    role: "Designer & Developer",
    year: "2023",
    summary:
      "A VR prototype that lets upper-limb amputees try a myoelectric prosthetic arm, controlled by their own muscle signals, before they ever own one.",
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
    title: "Suncare Formulations",
    image: suncare,
    url: "https://www.suncareformulations.com/",
  },
  {
    title: "Demand Climate Justice",
    image: dcj,
    url: "https://demandclimatejustice.org/",
  },
].filter((project) => import.meta.env.DEV || !isDraft(project));

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
