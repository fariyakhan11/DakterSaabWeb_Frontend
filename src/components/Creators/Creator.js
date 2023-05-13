import React from "react";
import Insta from '../../images/instagram.png'
import LinkedIn from '../../images/linkedin.png'
import Gmail from '../../images/gmail.png'
import './creator.css'

function Creator(){
return(
<>
<div id="CreatorContainer">
<h2>Meet the Creators</h2>
<div className="creators">
<div className="creatordiv">
<img className="creatorPicture"></img>
<h3 className="creatorName">Alishba Arshad</h3>
<hr />
<div className="creatorContact">
<a><img src={Insta}></img></a>
<a><img src={Gmail}></img></a>
<a><img src={LinkedIn}></img></a>
</div>
</div>

<div className="creatordiv">
<img className="creatorPicture"></img>
<h3 className="creatorName">Zainab Khan</h3>
<hr />
<div className="creatorContact">
<a><img src={Insta}></img></a>
<a><img src={Gmail}></img></a>
<a><img src={LinkedIn}></img></a>
</div>
</div>

<div className="creatordiv">
<img className="creatorPicture"></img>
<h3 className="creatorName">Fariya Khan</h3>
<hr />
<div className="creatorContact">
<a><img src={Insta}></img></a>
<a><img src={Gmail}></img></a>
<a><img src={LinkedIn}></img></a>
</div>
</div>

<div className="creatordiv">
<img className="creatorPicture"></img>
<h3 className="creatorName">Fasih ur Rehman Ansari</h3>
<hr />
<div className="creatorContact">
<a><img src={Insta}></img></a>
<a><img src={Gmail}></img></a>
<a><img src={LinkedIn}></img></a>
</div>
</div>

</div>
</div>
</>
)
}

export default Creator;