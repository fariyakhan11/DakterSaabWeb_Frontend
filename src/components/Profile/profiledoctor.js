import React from "react";
import './profiledoctor.css';

import { useState,useEffect } from "react";


function Profiledoctor(){

return(
<>
        <div id="Profiledoctordashboard">
            <div className="contentarea" >
                    <h3 className="contentareatitle">My Profile</h3>
                    <hr/>

                <div id="appointmentsdiv"></div>
            </div>
        </div>
</>
)
}
export default Profiledoctor;