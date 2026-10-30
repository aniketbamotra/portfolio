# Immersive Bionic frames

Frames for the case study, as WebP (quality 85). The page imports each one by
name, so renaming a file means updating its import in
`src/components/case-study/immersive-bionic/ImmersiveBionic.jsx`, along with
its width and height there (none of these is 16:10).

- `myoelectric-arm` — 1774×887
- `hardware` — 2400×1350
- `wearable-concept` — 1752×897

The cover is the project's original screenshot,
`src/assets/images/immersive-bionic.webp` (1600×900): projects listing card and
social share image, not shown on the page.

The page is a draft until `immersive-bionic` is removed from
`src/case-studies/drafts.js`. Remove the Behance fallback entry (`draftOf`) in
`src/components/projects/projectsData.js` at the same time.
