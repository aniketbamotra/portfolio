import ArrowIcon from "../../ArrowIcon";
import { Code, Frame, Overview, Section, Video } from "../CaseStudy";
import CaseStudyNav from "../CaseStudyNav";
import { SystemFlow } from "./Diagrams";
import myoelectricArm from "../../../assets/case-studies/immersive-bionic/myoelectric-arm.webp";
import hardware from "../../../assets/case-studies/immersive-bionic/hardware.webp";
import wearableConcept from "../../../assets/case-studies/immersive-bionic/wearable-concept.webp";

// Built during my final-semester internship at frog. Add no test results,
// numbers or participants beyond what's written here.

// Width and height are each file's own pixel size, as none of these is 16:10.
const shots = {
  "IMG-02": {
    src: myoelectricArm,
    width: 1774,
    height: 887,
    caption: "A myoelectric arm turns muscle signals into motor commands.",
    alt: "Illustration of a myoelectric prosthetic arm showing its internal wiring",
  },
  "IMG-03": {
    src: hardware,
    width: 2400,
    height: 1350,
    caption:
      "An EMG sensor reads muscle activity; an ESP32 processes it and sends it over Wi-Fi.",
    alt: "EMG sensor patch and ESP32 microcontroller board",
  },
  "IMG-06": {
    src: wearableConcept,
    width: 1752,
    height: 897,
    caption: "Wearable concept, developed with an industrial designer.",
    alt: "Renders of a two-pad wearable sensor band, shown alone and worn on an upper arm",
  },
};

// Excerpt of the relay server, as it ran in the prototype.
const serverCode = String.raw`
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let storedCloseData = null;

// The ESP32 posts here when it detects a "close" signal
app.post('/close', (req, res) => {
  storedCloseData = req.body;
  res.sendStatus(200);
});

// Unity polls here for the latest "close" reading
app.get('/close', (req, res) => {
  if (!storedCloseData) {
    return res.status(404).json({ message: 'Data not found' });
  }
  res.json(storedCloseData);

  // Reset to a default state so each signal is used only once
  storedCloseData = { ClosePositionRef: 2 };
});

app.listen(3000, () => console.log('Server running on port 3000'));
`;

const Shot = ({ id }) => <Frame {...shots[id]} />;

const overview = [
  { term: "Role", detail: "Designer & developer (solo)" },
  {
    term: "Context",
    detail: "Built during my final-semester internship at frog",
  },
  { term: "Year", detail: "2023" },
  { term: "Platform", detail: "VR (Unity, Meta Quest 2) + IoT wearable" },
  {
    term: "Stack",
    detail:
      "Unity, C#, Node.js, Express, REST, ESP32 (NodeMCU), EMG sensor (BioAmp Patchy)",
  },
];

// Short labels for the side index; ids match each Section below.
const index = [
  { id: "tldr", label: "TL;DR" },
  { id: "problem", label: "The problem" },
  { id: "myoelectric", label: "Why a myoelectric arm" },
  { id: "idea", label: "The idea" },
  { id: "how", label: "How it works" },
  { id: "wearable", label: "Designing the wearable" },
  { id: "proved", label: "What it proved" },
  { id: "next", label: "What I’d do next" },
  { id: "learned", label: "What I learned" },
];

const tags = ["Prototyping", "VR", "IoT", "Healthcare", "Design Engineering"];

const ImmersiveBionic = () => (
  <article className="cs-article font" id="top">
    <CaseStudyNav sections={index} />

    <div className="cs-hero cs-wide">
      <h1 className="cs-title">
        <span className="cs-title-name font-b">Immersive Bionic</span>
        <span className="cs-title-line font">
          A VR prototype that lets upper-limb amputees try a myoelectric
          prosthetic arm,{" "}
          <span className="cs-mark">controlled by their own muscle signals</span>
          , before they ever own one.
        </span>
      </h1>
      <ul className="cs-tags highlight" aria-label="Tags">
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </div>

    <Overview items={overview} />

    <Section id="tldr" title="TL;DR">
      <p className="cs-lede">
        Learning to use a myoelectric arm takes training, and many people who
        lose an arm don’t get enough of it. Immersive Bionic is a prototype
        that lets someone feel how a myoelectric prosthetic works before they
        commit to one.
      </p>
      <p>
        A sensor on their residual muscle reads the same electrical signals a
        real prosthetic would. Those signals drive a virtual arm in VR, so they
        can open and close a hand that isn’t there yet. I’d never worked with
        IoT, EMG sensors, microcontroller code or VR before this project, and
        learned each of them while building it.
      </p>
      <p>
        I designed and built it solo: the sensor rig, the microcontroller code,
        the server that relays signals, and the Unity VR app. I worked with an
        industrial designer on the wearable concept.
      </p>
      <Video
        id="H8ns_g6CrIo"
        title="Immersive Bionic demo: my muscle signal (left) controlling the virtual arm in VR (right)"
        caption="My muscle signal (left) controlling the virtual arm in VR (right)."
      />
    </Section>

    <Section id="problem" title="The problem">
      <p>
        During early research I came across a striking figure. Across 25 years
        of studies, about <strong>1 in 5</strong> people with an upper-limb
        difference stop using their prosthesis altogether. Research also points
        to training as one factor: people who don’t get prosthetic training
        from an experienced therapist struggle to control their device and are
        more likely to give up on it.
      </p>
      <p className="cs-aside">
        Source: Biddiss &amp; Chau (2007),{" "}
        <cite>
          “Upper limb prosthesis use and abandonment: a survey of the last 25
          years”
        </cite>
        , Prosthetics and Orthotics International.
      </p>
      <p>
        To understand why, I spoke with amputees, prosthetists and therapists,
        and watched how amputees use their prosthetics day to day. Five gaps
        stood out:
      </p>
      <ul className="cs-list">
        <li>
          <strong>Choosing blind.</strong> Patients pick a prosthetic based on
          recommendations and presentations, not experience.
        </li>
        <li>
          <strong>Technical overload.</strong> The details of how each device
          works can confuse rather than help.
        </li>
        <li>
          <strong>Few demos.</strong> There are limited chances to explore
          options hands-on.
        </li>
        <li>
          <strong>No trial.</strong> Most people can’t try a prosthetic before
          committing to one.
        </li>
        <li>
          <strong>Little guidance.</strong> Many learn to use their device
          without proper support.
        </li>
      </ul>
    </Section>

    <Section id="myoelectric" title="Why a myoelectric arm">
      <p>
        I focused on the myoelectric arm. Sensors on the user’s residual
        muscles pick up the electrical signals produced when they try to move
        the missing limb. Those signals are translated into commands that drive
        motors in the prosthetic hand.
      </p>
      <p>It was the right target for a prototype:</p>
      <ul className="cs-list">
        <li>
          <strong>Common.</strong> It’s one of the most widely used upper-limb
          prosthetics.
        </li>
        <li>
          <strong>Accessible.</strong> It sits at the more affordable end of
          powered prosthetics.
        </li>
        <li>
          <strong>Simple to model.</strong> The basic interaction is open and
          close, which made it possible to build a convincing first version.
        </li>
      </ul>
      <Shot id="IMG-02" />
    </Section>

    <Section id="idea" title="The idea">
      <p>
        An IoT sensor system combined with a VR app, so a patient can
        experience how a prosthetic works using their own muscles.
      </p>
      <p>
        The key design decision was to use{" "}
        <strong className="cs-mark">
          real muscle signals rather than VR controllers
        </strong>
        . Pressing a trigger would show someone what a prosthetic looks like.
        Flexing their own muscle shows them what controlling one <em>feels</em>{" "}
        like, and that’s the skill they’d need to learn.
      </p>
      <SystemFlow />
    </Section>

    <Section id="how" title="How it works">
      <h3 className="cs-h3 font-b">1. Reading the muscle</h3>
      <p>
        An EMG (electromyography) sensor sits on the residual muscle and reads
        its electrical activity. An ESP32 microcontroller converts the analog
        signal to digital, processes and normalises it, and sends it over
        Wi-Fi.
      </p>
      <Shot id="IMG-03" />

      <h3 className="cs-h3 font-b">2. Relaying the signal</h3>
      <p>
        A small Node.js server sits between the hardware and the headset. The
        ESP32 posts “open” and “close” readings to it. The server holds the
        latest one and hands it to the VR app when the app asks. After each
        read it resets to a default state, so one muscle signal moves the hand
        once. Keeping this layer separate meant the hardware and the VR app
        could be developed and tested independently.
      </p>
      <Code
        title="server.js (excerpt)"
        caption="The ESP32 posts a reading; Unity polls for it. The /open endpoints work the same way."
      >
        {serverCode}
      </Code>

      <h3 className="cs-h3 font-b">3. Moving the virtual arm</h3>
      <p>
        The VR app is built in Unity. It polls the server and feeds each
        reading into an animation blend tree that moves the virtual prosthetic
        hand between open and closed. When the user tenses their muscle, the
        hand in front of them closes.
      </p>
    </Section>

    <Section id="wearable" title="Designing the wearable">
      <p>
        Lab sensors with loose wires don’t feel like a product. I worked with
        an industrial designer to explore what the sensor could become: a soft,
        two-pad band worn on the upper arm, with the electronics in one pod and
        the electrode in the other.
      </p>
      <Shot id="IMG-06" />
    </Section>

    <Section id="proved" title="What it proved, and what it didn’t">
      <p>
        I tested the prototype with a small group of amputees. It showed the
        core loop works end to end: a real muscle signal, read by low-cost
        hardware, can drive a virtual prosthetic in real time and give someone
        a first-hand sense of myoelectric control.
      </p>
      <p>
        It’s deliberately limited. The hand only opens and closes, it uses a
        single sensor channel, and polling over REST adds latency.
      </p>
    </Section>

    <Section id="next" title="What I’d do next">
      <ul className="cs-list">
        <li>
          <strong>Stream, don’t poll.</strong> Move from REST polling to
          WebSockets or a direct connection to cut latency.
        </li>
        <li>
          <strong>More channels, more gestures.</strong> Add sensors to support
          grips and wrist movement, not just open and close.
        </li>
        <li>
          <strong>Guided training.</strong> Turn the sandbox into structured
          exercises, like picking up a cup, with progress a therapist could
          review.
        </li>
        <li>
          <strong>Keep testing with patients.</strong> Every new feature gets
          tested with people preparing for a prosthetic, and with the
          clinicians who train them, just as the first version was.
        </li>
      </ul>
    </Section>

    <Section id="learned" title="What I learned">
      <ul className="cs-list">
        <li>
          <strong>Four new fields, learned by building.</strong> I started with
          none of the stack. Along the way I learned how IoT systems fit
          together, how EMG sensors read muscle activity, how to program a
          microcontroller, and how to build a VR app in Unity. Having a real
          problem to solve was the fastest way to learn each one.
        </li>
        <li>
          <strong>The interaction is the product.</strong> The real problem was
          helping someone <em>feel</em> control. Choosing muscle signals over
          controllers is what made the prototype meaningful.
        </li>
        <li>
          <strong>Build the thinnest slice end to end.</strong> Getting one
          gesture working across hardware, server and VR taught me more than
          perfecting any one layer.
        </li>
        <li>
          <strong>Separate the layers.</strong> A small relay server between
          hardware and headset made each piece easy to test on its own.
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

export default ImmersiveBionic;
