import React from "react";
import "./comp.css";
import bioPhoto from "../assets/images/Aniket2.png";

const Bio = () => {
  return (
    <div className="bio-container">
      {/* <Helmet>
        <script src={withPrefix('anime.js')}></script>
      </Helmet> */}

      <div className="bio-wrapper" id="bio">
        <div className="top-heading">
          <h1 className="font">
            I'm a
            <span>
              <br />
            UX Engineer
            </span>
          </h1>
        </div>
        <img src={bioPhoto} alt="bio photo" className="bio-photo" />
        <p className="bio-body font">Hey there! <br />I'm <span>Aniket </span><span>Bamotra,</span> infusing the tech cosmos with a burst of design flair! <br /><br />As a <span>CS</span><span> undergrad,</span> I'm not just building <span>websites</span> – I'm sculpting <span>interactive</span><span> masterpieces</span>.</p>
      </div>
    </div>
  );
};

export default Bio;
