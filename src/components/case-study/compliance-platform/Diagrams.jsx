import { Diagram } from "../CaseStudy";
import "./diagrams.css";

// The three diagrams are drawn in HTML so their labels are real, selectable
// text that reflows: lanes and pipelines turn vertical on narrow screens.

const before = [
  "Email vendor",
  "Wait / chase",
  "PDF arrives",
  "Manual review",
  "Excel",
];
const after = [
  "Auto-notify",
  "Vendor uploads",
  "AI analysis",
  "Auto-validate",
  "CoC generated",
];
const exception = ["Exception", "Human review", "Message vendor"];

export const BeforeAfter = () => (
  <Diagram
    className="d1"
    caption="From a loop of emails to a straight line with one exit for exceptions."
    summary="Before: email the vendor, wait and chase, a PDF arrives, someone reviews it by hand and logs it in Excel; any problem sends the process back to email and round again. After: vendors are notified automatically, upload their reports, AI analyses and validates them, and a CoC is generated. Only exceptions branch off to human review and a message to the vendor."
  >
    <div className="d1-lanes" aria-hidden="true">
      <div className="d1-lane d1-before">
        <p className="d1-lane-title font-b">Before</p>
        <div className="d1-grid">
          <ol className="d1-steps">
            {before.map((step) => (
              <li className="d-step" key={step}>
                <div className="d-node">{step}</div>
              </li>
            ))}
          </ol>
          <p className="d1-loop highlight">
            Any problem? Back to email, and round again.
          </p>
        </div>
      </div>

      <div className="d1-lane d1-after">
        <p className="d1-lane-title font-b">After</p>
        <div className="d1-grid">
          <ol className="d1-steps">
            {after.map((step, i) => (
              <li className="d-step" key={step}>
                <div
                  className={`d-node${i === after.length - 1 ? " is-ink" : ""}`}
                >
                  {step}
                </div>
              </li>
            ))}
          </ol>
          <ol className="d1-branch">
            {exception.map((step) => (
              <li className="d-step" key={step}>
                <div className="d-node is-dashed">{step}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  </Diagram>
);

const zones = [
  {
    title: "Data & scheduling",
    stages: [
      { n: 1, name: "Ingest", note: "Daily data feed" },
      { n: 2, name: "Track", note: "Six-week ship window" },
      { n: 3, name: "Notify", note: "Magic-link email" },
    ],
  },
  {
    title: "Vendor portal",
    mine: true,
    stages: [{ n: 4, name: "Upload", note: "Reports and mfg details" }],
  },
  {
    title: "Internal platform",
    stages: [
      { n: 5, name: "Analyse", note: "Chain of AI agents" },
      { n: 6, name: "Validate", note: "Mapped to CPSC standards" },
      { n: 7, name: "Certify", note: "CoC PDF or queue" },
    ],
  },
];

export const SystemFlow = () => (
  <Diagram
    className="d2"
    caption="Seven stages in three zones, ending in the internal portal's two lists. Highlighted: the parts I built."
    summary="Stages 1 to 3, data and scheduling: ingest, track, notify. Stage 4, the vendor portal: upload. Stages 5 to 7, the internal platform: analyse, validate, certify. Records that pass land in the CoC List; the rest land in the Workflow Tracker as exceptions. Built by me: the vendor portal and the internal portal UI where both outputs land."
  >
    <div aria-hidden="true">
      <ol className="d2-zones">
        {zones.map(({ title, mine, stages }) => (
          <li className="d2-zone d-step" key={title}>
            <div className={`d2-zone-box${mine ? " is-mine" : ""}`}>
              <p className="d2-zone-title highlight">{title}</p>
              <ol className="d2-stages">
                {stages.map(({ n, name, note }) => (
                  <li className="d2-stage d-step" key={name}>
                    <div className="d2-card">
                      <span className="d2-n highlight">{n}</span>
                      <span className="d2-name font-b">{name}</span>
                      <span className="d2-note">{note}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </li>
        ))}
        <li className="d2-zone d-step">
          <div className="d2-zone-box is-mine">
            <p className="d2-zone-title highlight">Internal portal UI</p>
            <ul className="d2-outputs">
              <li className="d2-card">
                <span className="d2-note highlight">Every standard passed</span>
                <span className="d2-name font-b">CoC List</span>
              </li>
              <li className="d2-card">
                <span className="d2-note highlight">Anything missing or failed</span>
                <span className="d2-name font-b">Workflow Tracker</span>
                <span className="d2-note">Exceptions only</span>
              </li>
            </ul>
          </div>
        </li>
      </ol>
      <p className="d-legend">
        <span className="d-swatch is-mine" />
        Built by me
      </p>
    </div>
  </Diagram>
);

const agents = ["Product details", "Executive summary", "Test results"];

export const AiPipeline = () => (
  <Diagram
    className="d3"
    caption="The AI reads the report; deterministic rules decide compliance."
    summary="A test report PDF goes through text extraction, then a page classifier agent labels each page. Three extractor agents then work in parallel on product details, the executive summary and the test results. Extracted tests are mapped to CPSC standards using the standards matrix, a deterministic compliance check works out the product category and its required standards, and a CoC PDF is generated. Every result is stored with the model's reasoning, a confidence score and page numbers."
  >
    <div className="d3-layout" aria-hidden="true">
      <ol className="d3-flow">
        <li className="d-step">
          <div className="d-node is-ink">Test report PDF</div>
        </li>
        <li className="d-step">
          <div className="d-node">Text extraction</div>
        </li>
        <li className="d-step">
          <div className="d-node is-ai">
            Page classifier
            <span className="d-tag highlight">AI agent</span>
          </div>
        </li>
        <li className="d-step d3-fan-step">
          <ul className="d3-fan">
            {agents.map((agent) => (
              <li className="d-node is-ai" key={agent}>
                {agent}
                <span className="d-tag highlight">AI agent</span>
              </li>
            ))}
          </ul>
        </li>
        <li className="d-step">
          <div className="d-node">
            Standards mapping
            <span className="d-tag highlight">CPSC matrix</span>
          </div>
        </li>
        <li className="d-step">
          <div className="d-node is-rule">
            Compliance check
            <span className="d-tag highlight">Category sets required standards</span>
          </div>
        </li>
        <li className="d-step">
          <div className="d-node is-ink">CoC PDF</div>
        </li>
      </ol>
      <div className="d3-side">
        <p className="d3-note">
          Every result stored with reasoning, confidence and page numbers.
        </p>
        <ul className="d-legend">
          <li>
            <span className="d-swatch is-ai" />
            AI agent, versioned on Microsoft Foundry
          </li>
          <li>
            <span className="d-swatch is-rule" />
            Deterministic rules
          </li>
        </ul>
      </div>
    </div>
  </Diagram>
);
