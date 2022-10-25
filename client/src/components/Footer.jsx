import React from "react";
import "./Style/Footer.css";

export default function Footer() {
  const logoLi =
    "https://e7.pngegg.com/pngimages/936/303/png-clipart-white-in-log-linkedin-icon-square-icons-logos-emojis-social-media-icons.png";
  return (
    <div>
      <footer className="foot">
        <a
          className="links"
          href="https://www.linkedin.com/in/francoselvarolo/"
          Target="_blank"
        >
         <b>My Linkdin</b> 
        </a>
        <a className="links" Target="_blank" href="mailto:fselvarolo28@gmail.com">
         <b>Fselvarolo@gmail.com</b> 
        </a>
        <a
          className="links"
          href="https://github.com/Fras28/AllCountries"
          Target="_blank"
        >
         <b>GitHub😺</b> 
        </a>
      </footer>
    </div>
  );
}
