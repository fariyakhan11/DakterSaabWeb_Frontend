import React from "react";
import './schedule.css';
import {BiEditAlt } from "react-icons/bi";
import { useState,useEffect } from "react";


function Scheduleenter({close}){
const handleinput=(e)=>{}
return(<>
<div className="grayareaschedule">
    <div id="scheduleenterdiv">
        <div><h1>Upload Schedule</h1><div id="closebtnschedule" onClick={()=>{close(true)}}><h1>+</h1></div></div>
        <div>
            <div id="sheetschedule">
                <h2>Add Data through sheet</h2>
                <button>Upload</button>
            </div>
            <div>
                <div id="hospitalbar">
                    <div className="actiivehospitaltab"><h2>Agha Khan</h2></div>
                    <div><h2>Mehmooda Clinic</h2></div>
                    <div id="morehosbtn"><h2>+</h2></div>
                </div>
                <div id="hospitalschedulearea">
                    
                    <div>
                        <h3>Monday</h3>
                        <input value='8:00 AM to 5:30 PM ' type="text" onChange={handleinput} name='monday' className="time"/>
                        <button>+</button>
                    </div>
                    <div>
                        <h3>Tuesday</h3>
                        <input value='10:00 AM to 6:30 PM  ' type="text" onChange={handleinput} name='monday' className="time"/>
                        <button>+</button>
                    </div>
                    <div>
                        <h3>Wednesday</h3>
                        <input value='' type="text" onChange={handleinput} name='monday' className="time"/>
                        <button>+</button>
                    </div>
                    <div>
                        <h3>Thursday</h3>
                        <input value='10:00 AM to 6:30 PM ' type="text" onChange={handleinput} name='monday' className="time"/>
                        <button>+</button>
                    </div>
                    <div>
                        <h3>Friday</h3>
                        <input value=' ' type="text" onChange={handleinput} name='monday' className="time"/>
                        <button>+</button>
                    </div>
                    <div>
                        <h3>Saturday</h3>
                        <input value='8:00 AM to 5:30 PM ' type="text" onChange={handleinput} name='monday' className="time"/>
                        <button>+</button>
                    </div>
                    <div>
                        <h3>Sunday</h3>
                        <input value='8:00 AM to 5:30 PM ' type="text" onChange={handleinput} name='sunday' className="time"/>
                        <button>+</button>
                    </div>
                </div>
                <button id="schedulemanual">Upload</button>
            </div>
        </div>
    </div>
</div>

</>)
}
export default Scheduleenter;