// Every image under src/assets/case-studies/<study>/, picked up at build time.
// Dropping a correctly named file in that folder is enough to replace its
// placeholder; nothing else needs editing.
const files = import.meta.glob(
  "../../assets/case-studies/*/*.{png,webp,jpg,jpeg}",
  { eager: true, import: "default" }
);

export const frameSrc = (study, name) => {
  const key = Object.keys(files).find((path) =>
    path.includes(`/case-studies/${study}/${name}.`)
  );
  return key ? files[key] : undefined;
};

// A neutral labelled image for slots that only accept an <img> src, such as
// the projects listing.
export const placeholderImage = (label, width, height) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">` +
      `<rect width="100%" height="100%" fill="#f5f3f6"/>` +
      `<rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" fill="none" stroke="#10001b" stroke-opacity=".12"/>` +
      `<text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Helvetica Neue, Arial, sans-serif" font-style="italic" font-size="${Math.round(width / 40)}" fill="#10001b" fill-opacity=".6">${label}</text>` +
      `</svg>`
  )}`;
