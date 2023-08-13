import React from "react";
import './footer.css'
import LogoP from '../../images/logo.png'

function Footer() {
  return (
    <>
      <div id="FooterContainer">
        <div className="footerdiv">
          <a href="/" className="linkdiv">
            <img src={LogoP} className="footerlogo"></img>
            <p>Daktersaab</p>
          </a>
          <p>This project was made as an FYDP under the coordination of our supportive and knowledgeble supervisor Miss Asma Khan.<br />We thank her for her constant guidance and unwavering patience throughout this journey</p>
        </div>

      </div>
    </>
  )
}

export default Footer;