import React from "react";
import "../App.css";
// import { Button } from "./Button";
import "./HeroSection.css";

function HeroSection(props) {
  return (
    <div className="hero-container">
      {/* <video src={props.video} autoPlay loop muted /> */}
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      {/* <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          GET STARTED
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
        >
          WATCH TRAILER <i className="far fa-play-circle" />
        </Button>
      </div> */}
    </div>
  );
}

export default HeroSection;
