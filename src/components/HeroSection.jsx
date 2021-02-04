import React from "react";
import "../App.css";
// import { Button } from "./Button";
import "./HeroSection.css";

function HeroSection(props) {
  
  return (
    <div className="hero-container">
      <video src={props.video} autoPlay loop muted />
      <div className="hero-text">
        <h1>{props.title}</h1>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

export default HeroSection;
