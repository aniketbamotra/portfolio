import ArrowIcon from "../../ArrowIcon";
import { Frame, Overview, Section, Stats } from "../CaseStudy";
import CaseStudyNav from "../CaseStudyNav";
import { Journey, PrivacyPipeline, ReportFamily } from "./Diagrams";
import patientQuestion from "../../../assets/case-studies/psymatch/patient-question.webp";
import patientHome from "../../../assets/case-studies/psymatch/patient-home.webp";
import thankYouNext from "../../../assets/case-studies/psymatch/thank-you-next.webp";
import adminDashboard from "../../../assets/case-studies/psymatch/admin-dashboard.webp";
import reportGeneration from "../../../assets/case-studies/psymatch/report-generation.webp";
import redactionReview from "../../../assets/case-studies/psymatch/redaction-review.webp";

// Independent project. Never name the clinic or a teammate (refer to them by
// role), show no timeline or dates, and add no security, infrastructure or
// hosting details beyond what's written here.

// Synthetic data only in every frame, never a real patient.
const shots = {
  "IMG-02": {
    src: patientQuestion,
    caption:
      "One question per screen, every question narrated in English or French.",
    alt: "Interview question with answer options and a speaker button",
  },
  "IMG-03": {
    src: patientHome,
    caption: "Patients see what’s assigned and pick up where they left off.",
    alt: "Patient home screen listing assigned interviews with progress",
  },
  "IMG-04": {
    src: thankYouNext,
    caption: "Every finish offers a next step, or permission to stop.",
    alt: "Thank-you screen offering the next interview or the option to stop",
  },
  "IMG-05": {
    src: adminDashboard,
    caption: "Staff track every patient’s progress as they answer.",
    alt: "Admin dashboard with patient cards and status labels",
  },
  "IMG-06": {
    src: reportGeneration,
    caption: "Report generation is always a deliberate staff action.",
    alt: "Report panel with generate button and format and language options",
  },
  "IMG-07": {
    src: redactionReview,
    caption: "Staff can review, edit and regenerate every redaction.",
    alt: "Redaction review listing original-to-pseudonym replacements",
  },
};

const Shot = ({ id }) => <Frame {...shots[id]} />;

const overview = [
  { term: "Role", detail: "Design, Workflow & Frontend Lead" },
  {
    term: "Team",
    detail:
      "Me (design, workflow & frontend), a backend & AI engineer, and an audio & localization engineer",
  },
  { term: "Context", detail: "Independent project" },
  {
    term: "Platform",
    detail:
      "Responsive web app for patients, clinic staff and clinic directors",
  },
  {
    term: "Stack",
    detail:
      "SvelteKit, Tailwind, MongoDB, Vercel, AWS Comprehend & Bedrock, Claude, Weblate",
  },
  {
    term: "Demo",
    detail: (
      <a
        href="https://psymatch-demo-ztwt.vercel.app/login"
        target="_blank"
        rel="noopener noreferrer"
      >
        psymatch-demo-ztwt.vercel.app
      </a>
    ),
  },
];

const stats = [
  { value: "~200", text: "patients have used PsyMatch so far" },
  { value: "4–6 hrs", text: "of clinician time saved per patient" },
  { value: "40+", text: "structured interviews, each narrated in English and French" },
  { value: "4 formats", text: "of AI-drafted report, in two languages" },
];

// Short labels for the side index; ids match each Section below.
const index = [
  { id: "tldr", label: "TL;DR" },
  { id: "problem", label: "The problem" },
  { id: "audience", label: "Who it’s for" },
  { id: "calm", label: "Designing for calm" },
  { id: "journey", label: "The journey" },
  { id: "reports", label: "Answers to reports" },
  { id: "privacy", label: "Privacy by design" },
  { id: "decisions", label: "Key decisions" },
  { id: "role", label: "My role" },
  { id: "outcome", label: "Outcome" },
  { id: "learned", label: "What I learned" },
  { id: "credits", label: "Credits" },
];

const tags = [
  "Healthcare",
  "Product Design",
  "AI",
  "Privacy",
  "Localization",
  "Design Engineering",
];

const PsyMatch = () => (
  <article className="cs-article font" id="top">
    <CaseStudyNav sections={index} />

    <div className="cs-hero cs-wide">
      <h1 className="cs-title">
        <span className="cs-title-name font-b">PsyMatch</span>
        <span className="cs-title-line font">
          A bilingual clinical intake platform that turns patient-completed
          diagnostic interviews into{" "}
          <span className="cs-mark">privacy-safe, AI-drafted clinical reports</span>
          .
        </span>
      </h1>
      <ul className="cs-tags highlight" aria-label="Tags">
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </div>

    <Overview items={overview} />
    <Stats items={stats} label="Outcomes" />

    <Section id="tldr" title="TL;DR">
      <p className="cs-lede">
        Mental-health clinics spend a large part of every new patient’s first
        visits on intake: long diagnostic interviews and the reports that
        follow. PsyMatch moves that work into a calm, bilingual web app that
        patients complete at their own pace.
      </p>
      <p>
        The clinic’s own scoring rules turn the answers into standard reports.
        An AI agent then drafts the full clinical report, but only after every
        identifying detail has been replaced with reversible tokens that never
        leave our servers.
      </p>
      <p>
        I led product and UX across the platform, from the patient’s first
        login to the reports a therapist reads. I also built much of the admin
        experience myself.
      </p>
    </Section>

    <Section id="problem" title="The problem">
      <p>
        Psychodiagnostic intake is thorough by necessity, and that makes it
        slow. A full intake can take several hours of clinician time per
        patient. A new patient can face dozens of structured interviews
        covering mood, anxiety, trauma, substance use, personality, and their
        life history. Someone then has to turn hundreds of answers into a
        coherent clinical picture.
      </p>
      <p>
        When clinics can’t staff that, intake gets cut short: a brief screen
        instead of a full workup, and clinician time spent transcribing rather
        than treating. The clinic we built PsyMatch with wanted to move that
        work out of appointment time without losing any of its rigour.
      </p>
      <p>The hard part was the constraints:</p>
      <ul className="cs-list">
        <li>
          <strong>The data is about as sensitive as data gets.</strong> Answers
          include self-harm history, trauma and substance use. Nothing
          identifying could reach an AI model.
        </li>
        <li>
          <strong>Clinicians stay in charge.</strong> AI could draft, but the
          clinic’s own rules had to decide what the answers mean, and staff had
          to approve every step.
        </li>
        <li>
          <strong>Patients aren’t all comfortable in English.</strong> The
          clinic serves English and French speakers, and wanted the questions
          themselves translated by people, not machines.
        </li>
        <li>
          <strong>The clinic has to own its content.</strong> Interview logic
          evolves with clinical practice, and the team needed to change it
          without waiting on developers.
        </li>
      </ul>
    </Section>

    <Section id="audience" title="Who it’s for">
      <ul className="cs-list">
        <li>
          <strong>Patients</strong> complete their assigned interviews from
          home, on any device, in English or French, with every question
          narrated.
        </li>
        <li>
          <strong>Admin staff</strong> onboard patients, assign interviews,
          track progress, review redactions and generate reports.
        </li>
        <li>
          <strong>Clinic directors</strong> get everything admins do, plus
          control over staff accounts, interview order and reusable interview
          sets, and the legal and consent content patients agree to.
        </li>
      </ul>
    </Section>

    <Section id="calm" title="Designing for calm">
      <p>
        A diagnostic interview asks people about the hardest parts of their
        lives, so the interface’s first job is to lower the temperature. The
        visual language uses soft, generously rounded shapes, a muted palette
        with a single calm green, lots of white space, and one question per
        screen. Each interview opens with a short “about this interview”
        introduction, so nobody starts cold.
      </p>
      <p>
        Questions slide in gently. The direction reverses when you go back, so
        it always feels like moving through a conversation, not filling in a
        form.
      </p>
      <Shot id="IMG-02" />
      <p>Three decisions mattered most for patients:</p>
      <ul className="cs-list">
        <li>
          <strong>Every question can be heard, in a real voice.</strong> Each
          question is narrated by a person, recorded in both languages.
          <ul className="cs-list">
            <li>
              Some questions are built from earlier answers. For example, a
              follow-up lists every symptom the patient just reported.
            </li>
            <li>
              For those, the narration is recorded in pieces and stitched
              together in the browser, so even generated questions are
              narrated seamlessly.
            </li>
          </ul>
        </li>
        <li>
          <strong>Nothing is ever lost.</strong> Every answer is saved to the
          server the moment it’s given. Patients can stop mid-interview, close
          the tab and pick up exactly where they left off on another device.
        </li>
        <li>
          <strong>There’s always a gentle next step.</strong> Finishing an
          interview leads to a thank-you screen that offers the next one, or
          permission to stop for today.
        </li>
      </ul>
      <Shot id="IMG-03" />
      <Shot id="IMG-04" />
    </Section>

    <Section id="journey" title="One journey, three roles">
      <Journey />
      <p>
        The patient’s journey is deliberately simple. Admins register them at
        the clinic, and an email invites them to set a password. They then work
        through the interviews assigned to them.
      </p>
      <p>
        Behind that simplicity, the admin side carries the operational weight.
        Staff assign interviews one by one or pick a reusable set, watch each
        patient’s progress update as they answer, and generate reports when
        they’re ready.{" "}
        <strong className="cs-mark">
          Report generation is always a deliberate staff action, never
          automatic.
        </strong>
      </p>
      <Shot id="IMG-05" />
    </Section>

    <Section id="reports" title="Turning answers into reports">
      <p>PsyMatch produces two kinds of report.</p>
      <p>
        <strong>Standard reports</strong> come from the clinic’s own diagnostic
        logic. Each interview has a rule set that builds variables from
        answers, combines them into diagnostic criteria, and resolves an
        outcome with its report sections. Rules can reference answers across
        interviews: a depression rule can look at answers from the mania
        interview. No AI is involved, and the result is the same every time.
      </p>
      <p>
        <strong>AI-drafted clinical reports</strong> build on top of those. An
        AI agent reads the standard reports from every completed interview and
        drafts a comprehensive clinical report. From that, it can derive:
      </p>
      <ul className="cs-list">
        <li>a concise version</li>
        <li>a referral letter</li>
        <li>a plain-language patient summary</li>
        <li>
          French versions of each, translated by the agent from the English
          report
        </li>
      </ul>
      <p>
        The derived formats are generated on demand from the comprehensive
        report rather than from scratch. That keeps them consistent with each
        other and avoids paying for documents nobody opens. Staff see each
        report’s state on a single button (not ready, ready, generating, done,
        or “regenerate suggested” when new answers have come in since the last
        draft).
      </p>
      <ReportFamily />
      <Shot id="IMG-06" />
    </Section>

    <Section id="privacy" title="Privacy by design">
      <p className="cs-statement">
        <span className="cs-mark">Nothing identifying reaches the AI.</span>{" "}
        Two layers make that possible.
      </p>
      <PrivacyPipeline />

      <h3 className="cs-h3 font-b">1. A reviewable redaction profile</h3>
      <p>
        When a patient’s biographical interview is complete, staff can generate
        a redaction profile.
      </p>
      <ul className="cs-list">
        <li>
          Structured fields are swapped for consistent pseudonyms, including
          names, phone numbers, addresses, doctors and family members.
        </li>
        <li>
          AWS Comprehend flags people, places and organizations in free-text
          answers.
        </li>
        <li>
          A small Claude model rewrites those passages, keeping the clinical
          detail (symptoms, medications, ages, durations) and removing anything
          that points to a person.
        </li>
        <li>Two more automated checks catch anything the model missed.</li>
      </ul>
      <p>
        Staff watch progress live, see the result, can edit any replacement by
        hand, and can regenerate it with a note explaining what to fix. Every
        version is kept.
      </p>
      <Shot id="IMG-07" />

      <h3 className="cs-h3 font-b">
        2. Reversible tokens with a fail-closed guard
      </h3>
      <p>
        Before any report request leaves our servers, every known identifier
        becomes an opaque token such as <code>⟦NAME_OF_PATIENT_…⟧</code>. Each
        token carries a role description, so the model can still write natural
        prose around it.
      </p>
      <p>
        The real values never leave the server. When a clinician downloads the
        report, the tokens are swapped back.{" "}
        <strong>
          If a single known identifier survives tokenization, the request is
          blocked outright.
        </strong>
      </p>
    </Section>

    <Section id="decisions" title="Key decisions">
      <h3 className="cs-h3 font-b">
        Clinical logic stays deterministic, and AI only drafts
      </h3>
      <p>
        We never let the model decide what a patient’s answers mean. The
        clinic’s rules do that, and the AI writes from their output. That keeps
        every report traceable to rules the clinicians wrote and can audit.
      </p>

      <h3 className="cs-h3 font-b">
        The AI reads exactly what the clinician reads
      </h3>
      <ul className="cs-list">
        <li>
          The agent doesn’t get its own reshaped version of the patient’s data.
          It receives only the same standard reports a clinician downloads,
          generated by the same code.
        </li>
        <li>
          Any second copy of the data, derived separately, can quietly drift
          from the document a clinician signs off on, and the model would have
          no way to notice.
        </li>
        <li>
          With one source of truth, the AI can’t see a different patient from
          the one the clinician sees.
        </li>
      </ul>

      <h3 className="cs-h3 font-b">
        The principal diagnosis is chosen in code, not by the model
      </h3>
      <p>
        When each report format asked the model to prioritize diagnoses, the
        same patient could come back led by ADHD in one document and depression
        in another. A fixed, clinically ordered rule now picks the principal
        concern once:
      </p>
      <ol className="cs-steps is-compact">
        <li>acute safety</li>
        <li>presenting concerns</li>
        <li>severity</li>
        <li>a fixed order</li>
      </ol>
      <p>Every document inherits that choice.</p>

      <h3 className="cs-h3 font-b">
        People translate the questions, and every question is narrated
      </h3>
      <p>
        The clinic felt that machine translation of deeply personal questions
        would erode trust, so we built for human translators.
      </p>
      <ul className="cs-list">
        <li>
          Interface text goes through a self-hosted Weblate instance, where
          translators work directly.
        </li>
        <li>
          Interview content is stored with English and French side by side.
        </li>
        <li>Every question has narration in both languages.</li>
      </ul>

      <h3 className="cs-h3 font-b">
        Status comes from the data, not from clicks
      </h3>
      <p>
        An interview is “complete” only when the saved answers say it is.
        Skipped questions are recorded explicitly, so “complete” always means
        the same thing to the dashboard, the report engine and the patient.
      </p>
    </Section>

    <Section id="role" title="My role">
      <p>
        I led <strong>design, workflow and frontend</strong>, which together
        cover how PsyMatch works for the people using it:
      </p>
      <ul className="cs-list">
        <li>
          <strong>Workflow.</strong> I defined the flows for all three roles,
          from onboarding and interview assignment to completion and report
          generation, and the rules that tie them together.
        </li>
        <li>
          <strong>Design.</strong> I shaped the patient experience: one
          question per screen, narration, save-as-you-go, and the thank-you and
          next-interview flow. I also designed the calm visual language
          described above.
        </li>
        <li>
          <strong>Frontend.</strong> I designed and built the admin dashboard:
          <ul className="cs-list">
            <li>patient cards and the patient details view</li>
            <li>progress tracking and report printing</li>
            <li>the report generation component</li>
            <li>reusable interview sets</li>
            <li>reordering interviews</li>
          </ul>
        </li>
        <li>
          <strong>Making the AI legible.</strong> I worked with engineering on
          how privacy and AI show up in the interface. The redaction review
          screen and the report generation states make an invisible pipeline
          legible to staff.
        </li>
      </ul>
      <p className="cs-aside">
        The rule engine, AI integration and privacy pipeline were built by the
        backend engineer, and audio and translation by the localization
        engineer.
      </p>
    </Section>

    <Section id="outcome" title="Outcome">
      <p>
        Around <strong>200 patients</strong> have used PsyMatch so far, and
        each intake saves the clinic{" "}
        <strong>four to six hours of clinician time</strong> per patient. It
        runs in production at a bilingual clinic and supports more than 40
        structured interviews, each narrated in English and French. It produces
        standard reports and AI-drafted reports in four formats and two
        languages, with a privacy pipeline that keeps identifying information
        away from AI models entirely.
      </p>
    </Section>

    <Section id="learned" title="What I learned">
      <ul className="cs-list">
        <li>
          <strong>
            In clinical AI, the interesting design work is about trust.
          </strong>{" "}
          Most of our best decisions limited what the model was allowed to
          decide.
        </li>
        <li>
          <strong>Make invisible systems visible.</strong> Redaction and report
          generation happen in the background, but staff needed to see, check
          and correct them. The status states, review screens and
          regenerate-with-a-note flow mattered as much as the pipeline itself.
        </li>
        <li>
          <strong>Calm is a feature.</strong> For someone answering questions
          about trauma at midnight, gentle motion, a narrated question and the
          freedom to stop matter.
        </li>
      </ul>
    </Section>

    <Section id="credits" title="Credits">
      <p>
        Design, workflow and frontend by me. Backend, AI engineering, audio and
        localization by my teammates.
      </p>
    </Section>

    <nav className="cs-next" aria-label="Case study">
      <a href="/#project" className="font-b">
        <span className="sweep">All projects</span>
        <ArrowIcon />
      </a>
    </nav>
  </article>
);

export default PsyMatch;
