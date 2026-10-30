import ArrowIcon from "../../ArrowIcon";
import { Frame, Overview, Section, Stats } from "../CaseStudy";
import CaseStudyNav from "../CaseStudyNav";
import { AiPipeline, BeforeAfter, CacheLayers, SystemFlow } from "./Diagrams";
import homeOverview from "../../../assets/case-studies/compliance-platform/01-home-overview.webp";
import workflowTracker from "../../../assets/case-studies/compliance-platform/02-workflow-tracker.webp";
import recordDetails from "../../../assets/case-studies/compliance-platform/03-record-details.webp";
import testReportValidation from "../../../assets/case-studies/compliance-platform/04-test-report-validation.webp";
import testReportsList from "../../../assets/case-studies/compliance-platform/05-test-reports-list.webp";
import cocList from "../../../assets/case-studies/compliance-platform/06-coc-list.webp";
import vendorProducts from "../../../assets/case-studies/compliance-platform/07-vendor-portal-products.webp";
import vendorUpload from "../../../assets/case-studies/compliance-platform/08-vendor-portal-upload.webp";
import vendorManufacturing from "../../../assets/case-studies/compliance-platform/09-vendor-portal-manufacturing.webp";

// Client work under NDA: never name the client, its systems or colleagues.

const overview = [
  {
    term: "Role",
    detail:
      "Design Technologist. I was the sole frontend engineer, owned workflow design for the internal portal, and built the vendor portal full-stack.",
  },
  {
    term: "Team",
    detail:
      "Me, 2 backend engineers, 2 QA engineers, 1 architect, 1 program owner",
  },
  { term: "Timeline", detail: "Oct 2025 – present (in production)" },
  {
    term: "Stack",
    detail:
      "React, Flowbite, Python, FastAPI, Azure (Cosmos DB, Table Storage, Blob Storage, WebJobs), Microsoft Foundry agents",
  },
  { term: "Client", detail: "A large US retailer (NDA), via frog" },
];

const stats = [
  { value: "10k–25k", text: "purchase orders processed every week" },
  { value: "<500", text: "need a human to look at them" },
  { value: "20–50×", text: "the volume the UI was originally scoped for" },
  { value: "2 portals", text: "built by 1 frontend engineer" },
];

// Short labels for the side index; ids match each Section below.
const index = [
  { id: "tldr", label: "TL;DR" },
  { id: "problem", label: "The problem" },
  { id: "principle", label: "The principle" },
  { id: "how-it-works", label: "How it works" },
  { id: "role", label: "My role" },
  { id: "internal-portal", label: "Internal portal" },
  { id: "vendor-portal", label: "Vendor portal" },
  { id: "scale", label: "Scaling up" },
  { id: "under-the-hood", label: "Under the hood" },
  { id: "outcome", label: "Outcome" },
  { id: "takeaways", label: "Takeaways" },
];

const tags = [
  "UX Engineering",
  "Workflow Design",
  "React",
  "Enterprise",
  "AI-assisted",
];

const steps = [
  [
    "Ingest.",
    "Vendor, buyer and product data comes in daily from the client’s enterprise data pipeline.",
  ],
  [
    "Track.",
    "A daily job selects products shipping in the next six weeks, the window in which certification has to be complete, and groups them by vendor.",
  ],
  [
    "Notify.",
    "Each vendor gets an automated email with a secure, expiring magic link. No accounts or passwords.",
  ],
  [
    "Upload.",
    "In the vendor portal, vendors see exactly which products need reports and upload test reports and manufacturing details.",
  ],
  [
    "Analyse.",
    "A processing job copies the submissions to the internal side, extracts the PDF text and runs it through a chain of specialised AI agents. One classifies the pages, then others extract product details, the executive summary and the individual test results.",
  ],
  [
    "Validate.",
    "Extracted tests are mapped to the approved CPSC standards, even when a lab words them differently. The product’s category, worked out from its HTS code and whether it’s a children’s product, decides which standards are required.",
  ],
  [
    "Certify.",
    "If every required standard is present and passed, a CoC is generated as a PDF automatically. If not, the record stays in the internal team’s queue.",
  ],
];

const pages = [
  [
    "Workflow Tracker",
    "Records that need a human: failed validations, missing reports, open vendor queries",
    "The team’s daily work queue",
  ],
  [
    "Test Reports",
    "Every report received and its processing status",
    "Lookup and audit",
  ],
  [
    "CoC List",
    "Products that passed and have a generated certificate",
    "The finished output",
  ],
];

const CompliancePlatform = () => (
  <article className="cs-article font" id="top">
    <CaseStudyNav sections={index} />

    <div className="cs-hero cs-wide">
      <h1 className="cs-title">
        <span className="cs-title-name font-b">Compliance Platform</span>
        <span className="cs-title-line font">
          From inbox chaos to an{" "}
          <span className="cs-mark">exception queue</span>
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
        Before a product can enter the US, the importer has to certify that it
        meets federal safety standards. For a large US retailer, that meant an
        internal team chasing thousands of vendors by email, reading
        test-report PDFs by hand, and tracking all of it in spreadsheets.
      </p>
      <p>
        We replaced that with two connected portals and an AI pipeline that
        reads test reports, checks them against the required standards, and
        generates the certificate automatically. I designed the workflow and
        built the frontend for both portals, plus the vendor portal’s backend.
        The internal team now only sees the exceptions: fewer than 500 records
        out of 10,000–25,000 purchase orders a week.
      </p>
    </Section>

    <Section id="problem" title="The problem: compliance by inbox">
      <p>
        Every imported product needs a{" "}
        <strong>Certificate of Conformity (CoC)</strong> backed by test reports
        from accredited labs, and it has to be in place before the product
        lands in the US. Before this project, the whole process ran on people:
      </p>
      <ul className="cs-list">
        <li>
          <strong>Chasing.</strong> Before each ship date, the internal team
          emailed every vendor about the products they were importing and the
          test reports they needed.
        </li>
        <li>
          <strong>Back-and-forth.</strong> Vendors replied with PDFs, sometimes
          the wrong ones and sometimes expired reports. Each problem meant
          another email thread.
        </li>
        <li>
          <strong>Reading.</strong> Someone opened every PDF and searched it
          for the right tests, checking each against the standards that
          product category required.
        </li>
        <li>
          <strong>Tracking.</strong> The status of thousands of products lived
          in Excel sheets.
        </li>
      </ul>
      <p>
        It was slow, error-prone and hard to audit. Worst of all, the team’s
        time went equally to the 95% of reports that were fine and the 5% that
        weren’t.
      </p>
      <BeforeAfter />
    </Section>

    <Section id="principle" title="The principle: humans only touch the exceptions">
      <p className="cs-statement">
        We designed the system around one idea:{" "}
        <strong className="cs-mark">
          if a report is complete and correct, no human should ever need to
          open it.
        </strong>
      </p>
      <p>
        Automation handles the expected path. The interface exists for the
        cases automation can’t resolve, and it has to make those fast to fix.
        That idea shaped both the backend pipeline and the information
        architecture of the internal portal.
      </p>
    </Section>

    <Section id="how-it-works" title="How it works, end to end">
      <SystemFlow />
      <ol className="cs-steps">
        {steps.map(([name, text]) => (
          <li key={name}>
            <span>
              <strong>{name}</strong> {text}
            </span>
          </li>
        ))}
      </ol>
    </Section>

    <Section id="role" title="My role">
      <p>
        I joined as a <strong>Design Technologist</strong> because the team
        needed someone to design the user workflow <em>and</em> build it. I was
        the only frontend engineer on the project.
      </p>
      <ul className="cs-list">
        <li>
          <strong>Internal portal.</strong> I designed the workflow and
          information architecture, built the full React frontend, and
          integrated the APIs.
        </li>
        <li>
          <strong>Vendor portal.</strong> I built it end to end: the React
          frontend and a Python/FastAPI backend. I wrote the backend spec-first
          from the internal platform’s API conventions, and used AI-assisted
          coding to get it built quickly and consistently.
        </li>
        <li>
          <strong>Performance.</strong> I re-engineered the frontend data layer
          when production volume grew far beyond the original scope (see{" "}
          <a href="#scale">When 500 became 10,000</a>).
        </li>
      </ul>
      <p className="cs-aside">
        The AI extraction pipeline, the standards-matching logic and the
        magic-link authentication were built by my backend and architecture
        colleagues. I describe them here because the UI only makes sense
        alongside them.
      </p>
    </Section>

    <Section id="internal-portal" title="Designing the internal portal">
      <Frame
        src={homeOverview}
        alt="Home — a count of records at each stage, with failures highlighted."
        caption="Home — a count of records at each stage, with failures highlighted."
      />
      <p>Three pages, one for each stage of a record’s life:</p>
      <table className="cs-table">
        <thead>
          <tr>
            <th scope="col">Page</th>
            <th scope="col">What’s on it</th>
            <th scope="col">Who it’s for</th>
          </tr>
        </thead>
        <tbody>
          {pages.map(([page, contents, audience]) => (
            <tr key={page}>
              <th scope="row" className="font-b">
                {page}
              </th>
              <td data-label="What’s on it">{contents}</td>
              <td data-label="Who it’s for" className="highlight">
                {audience}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Records move left to right without anyone touching them. If the AI
        pipeline passes a report, the record goes straight to the CoC List.{" "}
        <strong className="cs-mark">
          Only failures stay in the Workflow Tracker
        </strong>
        , so the team’s queue is the exceptions list and nothing else.
      </p>
      <Frame
        src={workflowTracker}
        alt="Workflow Tracker — the team’s queue contains only records that need a human."
        caption="Workflow Tracker — the team’s queue contains only records that need a human."
      />
      <Frame
        src={testReportsList}
        alt="Test Reports — every report received and its processing status."
        caption="Test Reports — every report received and its processing status."
      />
      <Frame
        src={cocList}
        alt="CoC List — certificates generated automatically for reports that pass."
        caption="CoC List — certificates generated automatically for reports that pass."
      />

      <h3 className="cs-h3 font-b">A detail panel built for fixing things</h3>
      <p>
        Clicking a record opens a detail panel instead of a new page, so
        reviewers keep their place in the queue and can work through records
        one after another.
      </p>
      <ul className="cs-list">
        <li>
          <strong>Context first.</strong> The first tab has the product, vendor
          and manufacturing details.
        </li>
        <li>
          <strong>Test reports tab.</strong> This tab has everything extracted
          from the reports. When a product has several test reports, a dropdown
          switches between them instead of stacking them into one long page.
        </li>
        <li>
          <strong>A validation rail.</strong> A side panel lists every check
          and whether it passed:
          <ul className="cs-checks">
            <li>
              Are all the required citations present for this product category?
            </li>
            <li>
              Do the manufacturer details on the report match what’s on record?
            </li>
            <li>
              Are the test report date and manufacturing date within one year
              of each other?
            </li>
          </ul>
          The rail turns “this report failed” into “this report failed{" "}
          <em>because…</em>”. That’s the difference between a quick fix and
          re-reading a 40-page PDF.
        </li>
      </ul>
      <Frame
        src={recordDetails}
        alt="Detail panel opens in place, so reviewers keep their position in the queue."
        caption="Detail panel opens in place, so reviewers keep their position in the queue."
      />
      <Frame
        src={testReportValidation}
        alt="Validation rail explains why a report failed: citations, manufacturer match, date window."
        caption={
          <>
            Validation rail explains <em>why</em> a report failed: citations,
            manufacturer match, date window.
          </>
        }
      />

      <h3 className="cs-h3 font-b">Replacing the email thread</h3>
      <p>
        When something is wrong, the reviewer writes a message on the record
        itself. The same message appears on that record in the vendor portal.
        The conversation stays attached to the product it’s about, instead of
        being scattered across inboxes. This removed most of the
        back-and-forth emails that used to slow the old process down.
      </p>
    </Section>

    <Section id="vendor-portal" title="Designing the vendor portal">
      <p>
        Vendors are external, occasional users with no training and no reason
        to learn a new tool. The portal is built around that:
      </p>
      <ul className="cs-list">
        <li>
          <strong>No sign-up.</strong> The link in the notification email takes
          vendors straight to their products. It’s a signed, expiring magic
          link, so there’s no password to forget.
        </li>
        <li>
          <strong>Only what’s needed.</strong> Vendors see the products that
          need certification, what’s required for each, and where to upload
          it.
        </li>
        <li>
          <strong>Feedback in the same place.</strong> Messages from the
          internal team appear on the product they’re about, so vendors know
          exactly what to fix and where.
        </li>
      </ul>
      <p>
        I built this portal full-stack: a React frontend and a FastAPI backend
        on Azure Table Storage. I designed the API to mirror the internal
        platform’s conventions, so the two portals could share data cleanly
        through the processing pipeline.
      </p>
      <Frame
        src={vendorProducts}
        alt="Vendor portal shows only the products that need certification."
        caption="Vendor portal shows only the products that need certification."
      />
      <Frame
        src={vendorUpload}
        alt="Uploading test reports, with the compliance team’s message on the same record."
        caption="Uploading test reports, with the compliance team’s message on the same record."
      />
      <Frame
        src={vendorManufacturing}
        alt="Manufacturing details, with the factory chosen from an approved list."
        caption="Manufacturing details, with the factory chosen from an approved list."
      />
    </Section>

    <Section id="scale" title="When 500 became 10,000">
      <p>
        We were told the client handled roughly{" "}
        <strong>100–500 reports a week</strong>, and I designed and built the
        UI for that.
      </p>
      <p>
        Then we launched. Vendors found the portal much faster than email and
        started uploading at a pace the old process could never have handled.{" "}
        <strong>Within one to two weeks we were past 10,000 reports a week</strong>,
        and the internal UI began to lag badly: slow list pages, slow detail
        panels, and filters that hung.
      </p>
      <p>
        I re-engineered the frontend data layer while the system was in
        production. Rather than adding a data-fetching library late in the
        project, I built a small caching layer suited to how reviewers actually
        move through the app:
      </p>
      <CacheLayers />
      <ul className="cs-list">
        <li>
          <strong>List pages render instantly, then refresh.</strong> Each list
          page (Workflow Tracker, Test Reports, CoC List) saves its results
          under a key made from its filters, sort and page. When you go back to
          a list, the saved results appear straight away with no spinner, while
          fresh data loads quietly in the background (stale-while-revalidate).
          Entries expire after 5 minutes and the cache keeps at most 50, so
          memory use stays small. A request counter makes sure a slow, older
          response can never overwrite a newer one.
        </li>
        <li>
          <strong>Reference data is fetched once.</strong> HTS codes, approved
          standards, exclusion codes and testing-lab summaries are loaded once
          per session. If several components ask for the same thing at the same
          moment, they share one request. A failed request is removed from the
          cache so the next call can retry. Admin-editable settings are
          deliberately left uncached so they’re never out of date.
        </li>
        <li>
          <strong>Record details load on demand.</strong> A record’s report
          details and citations are only fetched when the panel actually needs
          them, and a load that’s already running is reused instead of starting
          a second one. When a report is reprocessed, its cache is cleared and
          a version counter stops an earlier, still-running load from writing
          old data back.
        </li>
        <li>
          <strong>Lists remember where you were.</strong> Filters, sort and
          page number are saved for each table, so coming back from a record
          puts the reviewer exactly where they left off in a queue of
          thousands.
        </li>
        <li>
          <strong>Smaller API responses.</strong> List endpoints now return
          only the required fields instead of full documents. That made
          responses smaller and made filtering on Cosmos DB much faster.
        </li>
      </ul>
      <p>
        The platform now handles{" "}
        <strong>10,000–25,000 purchase orders a week</strong>, and the
        interface stays responsive.
      </p>
      <p className="cs-statement">
        <strong>Lesson:</strong>{" "}
        <span className="cs-mark">
          design for the volume the system will reach once it works
        </span>
        , not the volume the old process could manage. If a tool removes
        friction, usage grows.
      </p>
    </Section>

    <Section id="under-the-hood" title="Under the hood: making AI output trustworthy">
      <p className="cs-aside">
        Built by the backend team. Included because the UI depends on it.
      </p>
      <AiPipeline />
      <ul className="cs-list">
        <li>
          <strong>Specialised agents, not one big prompt.</strong> A classifier
          labels each page of the PDF: cover, product details, executive
          summary, test sections. Each extractor agent then only sees the pages
          relevant to its job. The instructions are versioned markdown, and
          reference data such as the approved standards list is filled in at
          runtime.
        </li>
        <li>
          <strong>Versioned and traceable.</strong> The pipeline runs on
          Microsoft Foundry agents. Changing a prompt creates a new agent
          version that can be rolled back. Every run produces a trace of
          inputs, outputs, tokens and timing.
        </li>
        <li>
          <strong>Evidence for every answer.</strong> Each extracted result is
          stored with the model’s reasoning, a confidence score and the page
          numbers it came from. If anyone asks “how do we know this passed?”,
          there’s a concrete answer.
        </li>
        <li>
          <strong>Rules where rules belong.</strong> Deciding which standards a
          product needs isn’t left to the LLM. A standards matrix maps HTS code
          + children’s-product flag → product category → required standards,
          including rules for when overlapping ASTM and CFR citations both get
          reported. The AI reads the report, and deterministic logic decides
          compliance.
        </li>
      </ul>
    </Section>

    <Section id="outcome" title="Outcome">
      <ul className="cs-list">
        <li>
          An end-to-end process that used to run on email and Excel is now
          automated, from identifying products to issuing the certificate.
        </li>
        <li>
          <strong>10,000–25,000 purchase orders a week</strong>, with{" "}
          <strong>fewer than 500</strong> needing human review.
        </li>
        <li>
          The internal team’s job changed from <em>reading every report</em>{" "}
          to <em>resolving exceptions</em>.
        </li>
        <li>Vendor communication happens on the record, not in inboxes.</li>
        <li>
          The system is auditable: every pass or fail can be traced back to a
          page in the source PDF.
        </li>
      </ul>
    </Section>

    <Section id="takeaways" title="What I’d take into the next project">
      <ul className="cs-list">
        <li>
          <strong>
            The best workflow UI is the one people rarely need to open.
          </strong>{" "}
          I designed the internal portal around the exceptions, not the full
          list.
        </li>
        <li>
          <strong>Explain the failure, not just the status.</strong> The
          validation rail did more to cut review time than any other screen.
        </li>
        <li>
          <strong>Design for success.</strong> A faster process creates more
          volume. Build the data layer with that in mind from day one.
        </li>
        <li>
          <strong>Being a design technologist on a team of engineers</strong>{" "}
          meant translating between workflow, interface and API in both
          directions. It’s also why we could change course quickly once
          production traffic arrived.
        </li>
      </ul>
    </Section>

    <nav className="cs-next" aria-label="Case study">
      <a href="/#project" className="font-b">
        <span className="sweep">All projects</span>
        <ArrowIcon />
      </a>
    </nav>
  </article>
);

export default CompliancePlatform;
