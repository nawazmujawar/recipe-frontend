import React from "react";
import "./Footer.css";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__connect">
        connect with me
        <a href="https://www.linkedin.com/in/nawazmujawar/">
          <LinkedInIcon />
        </a>
        <a href="https://www.instagram.com/thisisnawazmujawar/">
          <InstagramIcon />
        </a>
        <a href="https://twitter.com/NawazMujawar7">
          <TwitterIcon />
        </a>
        <a href="https://github.com/nawazmujawar">
          <GitHubIcon />
        </a>
      </div>
      <p style={{ marginBottom: "10px", marginTop: "20px" }}>
        &#169; 2020 Made with <span>❤️</span> by Nawaz Mujawar
      </p>
    </footer>
  );
}

export default Footer;
