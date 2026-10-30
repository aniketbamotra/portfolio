import { useEffect, useState } from "react";
import immersiveBionic from "../../assets/images/immersive-bionic.webp";
import suncare from "../../assets/images/suncare.webp";
import keploy from "../../assets/images/keploy.webp";
import gemx from "../../assets/images/gemx.webp";
import dcj from "../../assets/images/dcj.webp";
import compliancePlatform from "../../assets/case-studies/compliance-platform/cover.webp";
import psymatch from "../../assets/case-studies/psymatch/cover.webp";
import compliancePlatformMobile from "../../assets/images/mobile-covers/compliance-platform.webp";
import psymatchMobile from "../../assets/images/mobile-covers/psymatch.webp";
import immersiveBionicMobile from "../../assets/images/mobile-covers/immersive-bionic.webp";
import keployMobile from "../../assets/images/mobile-covers/keploy.webp";
import gemxMobile from "../../assets/images/mobile-covers/gemx.webp";
import suncareMobile from "../../assets/images/mobile-covers/suncare.webp";
import dcjMobile from "../../assets/images/mobile-covers/dcj.webp";
import { drafts } from "../../case-studies/drafts";

// role and year are optional; when both are missing a project shows its domain.
// caseStudy marks a project whose url is a page on this site rather than an
// external link; summary is its one-line pitch for social cards.
// Case studies listed in src/case-studies/drafts.js only show in dev.
// mobileImage is an optional portrait image for phones, cropped to the deck's
// 4:5 frame (the covers in mobile-covers/ are 3:4); until one is set, the
// desktop screenshot is cropped to fit.
const isDraft = ({ url }) => drafts.some((slug) => url === `/${slug}/`);

export const projects = [
  {
    title: "Compliance Platform",
    image: compliancePlatform,
    mobileImage: compliancePlatformMobile,
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
    mobileImage: psymatchMobile,
    url: "/psymatch/",
    caseStudy: true,
    role: "Design, Workflow & Frontend Lead",
    summary:
      "A bilingual clinical intake platform that turns patient-completed diagnostic interviews into privacy-safe, AI-drafted clinical reports.",
  },
  {
    title: "Immersive Bionic",
    image: immersiveBionic,
    mobileImage: immersiveBionicMobile,
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
    mobileImage: keployMobile,
    url: "https://keploy.io/",
  },
  {
    title: "GEMx",
    image: gemx,
    mobileImage: gemxMobile,
    url: "https://gemx.ag/",
  },
  {
    title: "Suncare Formulations",
    image: suncare,
    mobileImage: suncareMobile,
    url: "https://www.suncareformulations.com/",
  },
  {
    title: "Demand Climate Justice",
    image: dcj,
    mobileImage: dcjMobile,
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
