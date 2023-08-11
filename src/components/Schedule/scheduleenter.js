import React from "react";
import './schedule.css';
import {BiEditAlt } from "react-icons/bi";
import { useState,useEffect } from "react";


function Scheduleenter({close,unformatted}){
    const [selectedschedule,setselectedschedule]=useState('')
    const [editschedule,seteditschedule]=useState([])
const handleinput=(e)=>{}

useEffect(() => {geteditschedule()
}, []);

useEffect(() => {console.log(editschedule.find(s=>s.name===selectedschedule).availability)
}, [editschedule]);
function convertschedule(){}
function geteditschedule() {
    try {
        const params = sessionStorage.getItem('org_name') + '/' + sessionStorage.getItem('email');
        const api = 'http://localhost:5000/api/doctor/getscheduleedit/' + params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res=>res.json())
        .then(json=>{

            if (json.schedule) {
                seteditschedule(json.schedule);
                setselectedschedule(json.schedule[0].name);
                console.log(json.schedule);
            } else {
                seteditschedule([]);
            }
            if (json.error) {
                console.log(json.error);
            }

        })

    } catch (err) {
        console.log(err);
    }
}

const addhospital=()=>{
    
    seteditschedule([...editschedule,{name:'Unnamed',address:'',fee:'',availability:[]} ]);

}



const addtimevalue=(e)=>{}
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
                    <div id="hospitalbardiv1">
{editschedule.map((i,index)=>{
    
        return(<>
                        <div className={index===0?"actiivehospitaltab":''}><h2>{i.name}</h2></div>

        </>)
})}

                    </div>
                    <div id="morehosbtn" onClick={addhospital}><h2>+</h2></div>
                </div>
                <button id="removehospital">Remove Hospital</button>
                <div id="hospitalschedulearea">
                    
{
['Monday','Tuesday','Wednesday','Thursday',"Friday","Saturday","Sunday"].map((j,index)=>{
const sch=editschedule.find(s=>s.name===selectedschedule)
if(sch){
    sch.availability.map((i,ind)=>{return(<>

                    <div>
                        <h3>{i.day}</h3>
                        {i.time.map((t,ind)=>{return(<>
                            <input value={t} type="text" onChange={handleinput} name={i} id={ind} className="time"/>
                        </>)})}
                        
                        <button onClick={addtimevalue}>+</button>
                    </div>


</>)})}})}    
                    <div>
                        <h3>Tuesday</h3>
                        <input value='10:00 AM to 6:30 PM  ' type="text" onChange={handleinput} name='monday' className="time"/>
                        <button onClick={addtimevalue}>+</button>
                    </div>
                    <div>
                        <h3>Wednesday</h3>
                        <input value='' type="text" onChange={handleinput} name='monday' className="time"/>
                        <button onClick={addtimevalue}>+</button>
                    </div>
                    <div>
                        <h3>Thursday</h3>
                        <input value='10:00 AM to 6:30 PM ' type="text" onChange={handleinput} name='monday' className="time"/>
                        <button onClick={addtimevalue}>+</button>
                    </div>
                    <div>
                        <h3>Friday</h3>
                        <input value=' ' type="text" onChange={handleinput} name='monday' className="time"/>
                        <button onClick={addtimevalue}>+</button>
                    </div>
                    <div>
                        <h3>Saturday</h3>
                        <input value='8:00 AM to 5:30 PM ' type="text" onChange={handleinput} name='monday' className="time"/>
                        <button onClick={addtimevalue}>+</button>
                    </div>
                    <div>
                        <h3>Sunday</h3>
                        <input value='8:00 AM to 5:30 PM ' type="text" onChange={handleinput} name='sunday' className="time"/>
                        <button onClick={addtimevalue}>+</button>
                    </div>
                </div>
                <button id="schedulemanual">Submit</button>
            </div>
        </div>
    </div>
</div>

</>)
}
export default Scheduleenter;