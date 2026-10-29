import "./comp.css";
import bioPhoto from "../assets/images/aniket.webp";

const Bio = () => {
  return (
    <section className="bio-container">
      <div className="bio-wrapper" id="bio">
        <div className="top-heading">
          <h1 className="font">
            I&apos;m a
            <span>
              <br />
            UX Engineer
            </span>
          </h1>
        </div>
        <img
          src={bioPhoto}
          alt="Portrait of Aniket Bamotra"
          className="bio-photo"
          width="1080"
          height="1323"
        />
        <p className="bio-body font">Hey there! <br />I&apos;m <span>Aniket </span><span>Bamotra,</span> infusing the tech cosmos with a burst of design flair! <br /><br />As a <span>CS</span><span> undergrad,</span> I&apos;m not just building <span>websites</span> – I&apos;m sculpting <span>interactive</span><span> masterpieces</span>.</p>
      </div>
    </section>
  );
};

export default Bio;
