import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      {/* <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Join the Adventure newsletter to receive our best vacation deals
        </p>
        <p className="footer-subscription-text">
          You can unsubscribe at any time.
        </p>
        <div className="input-areas">
          <form>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              className="footer-input"
            />
            <Button buttonStyle="btn--outline">Subscribe</Button>
          </form>
        </div>
      </section> */}
      <section className="social-media">
        <div className="social-media-wrap">
          <small className="website-rights">© Espacio Jam 2021</small>
          <div className="social-icons">
            <a
              className="social-icon-link spotify"
              href="https://open.spotify.com/show/5Q6EbrrYjMqqR5dyWKMRr4?si=Mqv11wWMT7SeDGL-bdXwYA&nd=1"
              target="_blank"
              aria-label="Spotify"
            >
              <i className="fab fa-spotify"></i>
            </a>
            <a
              className="social-icon-link instagram"
              href="https://www.instagram.com/espacio_jam/"
              target="_blank"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            {/* <Link
              className="social-icon-link rss"
              to="/"
              target="_blank"
              aria-label="RSS"
            >
              <i className="fas fa-rss"></i>
            </Link> */}
            <a
              className="social-icon-link twitter"
              href="https://twitter.com/EspacioJam"
              target="_blank"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
