import React from "react";
import './schedule.css';
import {BiEditAlt } from "react-icons/bi";
import { useState,useEffect } from "react";


function Scheduleenter({close}){
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
                    <div><h2>ABC Hospital</h2></div>
                    <div><h2>ABC Hospital</h2></div>
                    <div><h2>ABC Hospital</h2></div>
                    <div><h2>ABC Hospital</h2></div>
                    <div><h2>ABC Hospital</h2></div>
                    <div><h2>ABC Hospital</h2></div>
                    <div><h2>ABC Hospital</h2></div>
                    <div><h2>ABC Hospital</h2></div>
                    <div><h2>ABC Hospital</h2></div>
                    <div><h2>ABC Hospital</h2></div>
                </div>
            </div>
        </div>
    </div>
</div>

</>)
}
export default Scheduleenter;