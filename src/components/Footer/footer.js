import React from "react";
import './footer.css'
import LogoP from '../../images/logo.png'

function Footer(){
return(
<>
<div id="FooterContainer">
<div>
        <a href="/" className="logo">
          <img src={LogoP} style={{width:'2em',height:'2em'}}></img>
          <h1 style={{fontFamily:'Fraunces'}} className='title'> DakterSaab</h1>
        </a>
        <p>This project was made as an FYDP under the coordination of our supportive and knowledgeble supervisor Miss Asma Khan.<br/>We thank her for her constant guidance and unwavering patience throughout this journey</p>
</div>

</div>
</>
)
}

export default Footer;