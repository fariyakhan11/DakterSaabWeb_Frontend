import React from "react";
import './landing.css'
import Started from "../Started/started";
import Play from '../../images/playstore.png'
import '../../fonts/fonts.css'
function Landing(){


return(<div className="MAIN">
<div className="contrast">


<div className="Name">

<h1 style={{fontFamily:'Fraunces'}} className='slogan'> Search , find & book
</h1>
    <h4 className="wordCarousel" style={{fontFamily:'Preside'}}>
    <div >
        <ul className="flip">
        <li><h4  style={{color: '#427879',}}>Doctors</h4></li>
        <li><h4  style={{color: '#064C06',}}>Medicines</h4></li>    
        <li><h4  style={{color: '#D24849',}}>Blood Group</h4></li>
        
        </ul>
    </div>
    </h4>
<h1 style={{fontFamily:'Fraunces', paddingLeft:'6em'}} className='slogan'><n/> nearest <span style={{color:'rgb(30, 38, 110)', fontFamily:'Preside', fontSize:'1.5em'}}>YOU !</span> 
</h1>
<h1 style={{fontFamily:'Fraunces',fontSize:'0.7em',marginTop:'6em',color:'white',textShadow:'12px 4px 14px rgba(132, 137, 145, 0.849)',alignSelf:'center'}}>So what are you waiting for ? Download DakterSaab Now!</h1>
<button className="downloadbtn"><img alt="" src={Play} style={{width:'2.5em',height:'2.5em',marginRight:'1.5em'}}></img>Download DakterSaab App</button>
</div>

<Started/>

</div>


</div>
)

}
export default Landing;