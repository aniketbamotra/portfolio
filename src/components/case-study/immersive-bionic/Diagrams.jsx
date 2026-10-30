import { Diagram } from "../CaseStudy";
import "./diagrams.css";

// Drawn in HTML like the other case studies' diagrams, so labels are real
// text that reflows: the flow runs down on phones and across once the figure
// has room. The Mermaid source is in mermaid/, for future edits. Hagrid has
// no arrow glyph, so the ESP32's "analog → digital" is spelled out here.

const stages = [
  { name: "Muscle sensor", notes: ["EMG"] },
  { name: "ESP32", notes: ["analog to digital", "process · normalise"] },
  { name: "Node.js server", notes: ["receive · relay", "REST API"], via: "Wi-Fi" },
  { name: "Unity VR app", notes: ["open / close", "virtual arm"] },
];

export const SystemFlow = () => (
  <Diagram
    className="sf"
    caption="A muscle signal travels from the sensor to the headset in four steps."
    summary="An EMG muscle sensor reads the muscle. An ESP32 converts the signal from analog to digital, processes and normalises it, and sends it over Wi-Fi to a Node.js server. The server receives and relays it through a REST API to the Unity VR app, which opens or closes the virtual arm."
  >
    <ol className="sf-steps" aria-hidden="true">
      {stages.map(({ name, notes, via }, i) => (
        <li className={`d-step${via ? " has-via" : ""}`} key={name}>
          {via && <span className="sf-via highlight">{via}</span>}
          <div className={`d-node${i === stages.length - 1 ? " is-ink" : ""}`}>
            {name}
            {notes.map((note) => (
              <span className="d-tag highlight" key={note}>
                {note}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ol>
  </Diagram>
);
