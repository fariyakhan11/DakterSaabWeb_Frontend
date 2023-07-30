import React from "react";
import './donor.css';
import { useState,useEffect } from "react";



function Adddonor({close}){




return(
<>
<div className="grayarea">
    <div id="addmed_container">
        <div id="topbarmedshospital">
            <h1>Add Doctors</h1>
            <div id="closebtn" onClick={()=>{close(true)}} ><h2>+</h2></div>
        </div>
        <div id="addmeds_area">
    
                

            
        </div>
    </div>

</div>

</>
)
}

export default Adddonor;