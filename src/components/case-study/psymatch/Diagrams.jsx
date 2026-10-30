import { Diagram } from "../CaseStudy";
import "./diagrams.css";

// Drawn in HTML like the other case study's diagrams, so labels are real text
// that reflows on narrow screens. The Mermaid source for each one is in
// mermaid/, for future edits.

const lanes = [
  {
    id: "clinic",
    title: "Admin staff · onboarding",
    steps: [
      ["Register patient"],
      ["Assign interviews", "one by one or from a set"],
    ],
  },
  {
    id: "patient",
    title: "Patient",
    steps: [
      ["Email invite", "set password"],
      ["Complete interviews", "EN / FR, narrated"],
      ["Thank you + next interview"],
    ],
  },
  {
    id: "reports",
    title: "Admin staff · reporting",
    steps: [
      ["Track progress on dashboard"],
      ["Review redaction profile"],
      ["Generate standard + AI-drafted reports"],
      ["Download PDF / Word", "for the therapist"],
    ],
  },
];

const Lane = ({ title, steps, loop, final, children }) => (
  <li
    className={`j-lane${loop ? " has-loop" : ""}${children ? " has-director" : ""}`}
  >
    <p className="j-title font-b">{title}</p>
    <ol className="j-steps">
      {steps.map(([name, note], i) => (
        <li className="d-step" key={name}>
          <div
            className={`d-node${final && i === steps.length - 1 ? " is-ink" : ""}`}
          >
            {name}
            {note && <span className="d-tag highlight">{note}</span>}
          </div>
        </li>
      ))}
    </ol>
    {loop && <span className="j-loop highlight">continue</span>}
    {children}
  </li>
);

export const Journey = () => (
  <Diagram
    className="j"
    caption="From clinic visit to therapist-ready report. Staff stay in control of every step that matters."
    summary="Admin staff register the patient and assign interviews, one by one or from a set. The clinic director shapes that assignment through reusable sets, interview order and consent content. The patient gets an email invite and sets a password, then completes interviews in English or French, narrated. Each finish leads to a thank-you screen and the next interview, and the patient can continue. Answers are saved live to the staff dashboard, where admin staff track progress, review the redaction profile, generate standard and AI-drafted reports, and download them as PDF or Word for the therapist."
  >
    <ol className="j-lanes" aria-hidden="true">
      <Lane {...lanes[0]}>
        {/* Feeds "Assign interviews" from below, dashed: it sets the
            options rather than taking a turn in the flow. */}
        <div className="j-director">
          <div className="d-node is-dashed">
            Clinic director
            <span className="d-tag highlight">
              sets, interview order, consent content
            </span>
          </div>
        </div>
      </Lane>
      <li className="j-link is-elbow">
        <span className="j-arrow" />
      </li>
      <Lane {...lanes[1]} loop />
      <li className="j-link is-elbow is-live">
        <span className="j-arrow" />
        <span className="j-link-label highlight">answers saved live</span>
      </li>
      <Lane {...lanes[2]} final />
    </ol>
  </Diagram>
);

const layerOne = [
  ["Pseudonyms for structured fields"],
  ["AWS Comprehend", "finds people & places", "is-ai"],
  ["Claude rewrites free text", null, "is-ai"],
  ["Automated leak checks"],
  ["Staff review & edit", null, "is-ink"],
];

export const PrivacyPipeline = () => (
  <Diagram
    className="pv"
    caption="Two layers of protection: a human-reviewed redaction profile, then reversible tokens that never leave the server."
    summary="Patient answers go two ways. The clinic's rule engine turns them into standard reports. In parallel, layer 1 builds a reviewable redaction profile: pseudonyms for structured fields, AWS Comprehend finds people and places, Claude rewrites free text, automated leak checks run, and staff review and edit the result. Both feed layer 2, reversible tokens: identifiers are replaced with opaque tokens, and if any identifier is left the request is blocked. If none is left, the AI agent drafts the report, seeing tokens only, and the tokens are restored on download for the clinician."
  >
    <div className="pv-flow" aria-hidden="true">
      <div className="pv-source">
        <div className="d-node is-ink">Patient answers</div>
      </div>

      <div className="pv-split">
        <div className="pv-branch">
          <span className="pv-arrow" />
          <div className="d-node is-rule">
            Clinic’s rule engine
            <span className="d-tag highlight">standard reports</span>
          </div>
          <span className="pv-rail" />
        </div>
        <div className="pv-branch">
          <span className="pv-arrow" />
          <div className="d-node">Redaction profile</div>
          <span className="pv-arrow" />
          <div className="pv-zone">
            <p className="pv-zone-title highlight">
              Layer 1 · Reviewable redaction
            </p>
            <ol>
              {layerOne.map(([name, note, kind = ""]) => (
                <li className="d-step" key={name}>
                  <div className={`d-node ${kind}`}>
                    {name}
                    {note && <span className="d-tag highlight">{note}</span>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <span className="pv-rail" />
        </div>
      </div>

      {/* Rows are pinned: the zone's box sits behind rows 2 to 5. */}
      <div className="pv-tokens">
        <span className="pv-arrow" style={{ gridRow: 1 }} />
        <div className="pv-zone pv-zone-box" />
        <p className="pv-zone-title pv-tokens-title highlight">
          Layer 2 · Reversible tokens
        </p>
        <div className="d-node" style={{ gridRow: 3 }}>
          Replace identifiers with opaque tokens
        </div>
        <span className="pv-arrow" style={{ gridRow: 4 }} />
        <div className="d-node is-rule pv-check">Any identifier left?</div>
        <span className="pv-yes">
          <span className="pv-label highlight">yes</span>
        </span>
        <div className="d-node is-dashed pv-blocked">Blocked</div>
        <span className="pv-arrow pv-no" style={{ gridRow: 6 }}>
          <span className="pv-label highlight">no</span>
        </span>
        <div className="d-node is-ai" style={{ gridRow: 7 }}>
          AI agent drafts report
          <span className="d-tag highlight">sees tokens only</span>
        </div>
        <span className="pv-arrow" style={{ gridRow: 8 }} />
        <div className="d-node is-ink" style={{ gridRow: 9 }}>
          Tokens restored on download
          <span className="d-tag">for the clinician</span>
        </div>
      </div>

      <ul className="d-legend">
        <li>
          <span className="d-swatch is-ai" />
          AI model
        </li>
        <li>
          <span className="d-swatch" />
          Deterministic rules or checks
        </li>
      </ul>
    </div>
  </Diagram>
);

// Every format comes off the comprehensive English report, including its
// French translation; the derived English formats each translate in turn.
const formats = [
  ["condense", "Concise EN", "Concise FR"],
  ["letter", "Referral EN", "Referral FR"],
  ["summarize", "Patient summary EN", "Patient summary FR"],
  ["translate", "Comprehensive FR"],
];

export const ReportFamily = () => (
  <Diagram
    className="rf"
    caption="One comprehensive report is the source for every other format, generated on demand."
    summary="Standard reports from the clinic's rules feed the comprehensive English report. From it, a concise version is condensed, a referral letter is written, a patient summary is summarized, and a French comprehensive report is translated. The concise, referral and patient summary reports are each translated into French in turn."
  >
    <div className="rf-tree" aria-hidden="true">
      <div className="rf-row">
        <div className="d-node is-rule">
          Standard reports
          <span className="d-tag highlight">from clinic rules</span>
        </div>
      </div>
      <div className="rf-row rf-root">
        <div className="d-node is-ink">Comprehensive EN</div>
      </div>
      <ol>
        {formats.map(([verb, en, fr]) => (
          <li className="rf-row rf-branch" key={en}>
            <div className="rf-en">
              <span className="rf-verb highlight">{verb}</span>
              <div className="d-node">{en}</div>
            </div>
            {fr && (
              <>
                <span className="rf-translate">
                  <span className="highlight">translate</span>
                </span>
                <div className="d-node">{fr}</div>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  </Diagram>
);
