import React from "react";
import "../../App.css";
import Cards from "../Cards";
import Footer from "../Footer";
import HeroSection from "../HeroSection";

function Home() {
  if (window.matchMedia("(max-width: 760px)").matches) {
    return (
      <>
        <div className="hero-container">
          <img src="images/homePageImage.png" className="home-image-mobile" />
        </div>
        <Cards />
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <HeroSection
          // title="Espacio Jam"
          // description="Bienvenido a Espacio Jam!"
          video="/videos/OswaldLogoLQ.mp4"
        />
        <Cards />
        <Footer />
      </>
    );
  }
}

export default Home;
