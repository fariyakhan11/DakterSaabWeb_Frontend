import React from "react";
import './schedule.css';
import {BiEditAlt } from "react-icons/bi";
import { useState,useEffect } from "react";


function Scheduleenter({close}){
    const [hospitals,sethospitals]=useState([])
    const [newhospitals,setnewhospitals]=useState([])
    const [schedule,setschedule]=useState([])
const handleinput=(e)=>{}

useEffect(()=>{
    getschedule()

},[])

useEffect(()=>{
    const distinctHospitalNames = [...new Set(schedule.flatMap(entry =>
        entry.availability.map(availabilityEntry => availabilityEntry.name)
    ))];
    sethospitals(distinctHospitalNames)
},[schedule])

function getschedule(){

    try{
        const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('email')
        const api='http://localhost:5000/api/doctor/getschedule/'+params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()) // get response, convert to json
        .then((json) => {
        if(json.schedule){
          setschedule(json.schedule)

        }else{setschedule([]);}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}
const addhospital=()=>{
    
    setnewhospitals([...newhospitals, '']);

}

useEffect(()=>{
    console.log('')
},[newhospitals])

const handleinputhospital=(e)=>{
    
      const updatedHospitals = [...newhospitals];
        updatedHospitals[e.target.id] = e.target.value;
        setnewhospitals(updatedHospitals);
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
{hospitals.map((i,index)=>{
    
        return(<>
                        <div className={index===0?"actiivehospitaltab":''}><h2>{i}</h2></div>

        </>)
})}
{newhospitals.map((i,index)=>{
        return(<>
                    
                        <input value={newhospitals[index]} type="text" onChange={handleinputhospital} name='hospitalname' className="inputhospitalname" id={index}/>
        </>)
})}
                    </div>
                    <div id="morehosbtn" onClick={addhospital}><h2>+</h2></div>
                </div>
                <button id="removehospital">Remove Hospital</button>
                <div id="hospitalschedulearea">
                    
                    <div>
                        <h3>Monday</h3>
                        <input value='8:00 AM to 5:30 PM ' type="text" onChange={handleinput} name='monday' className="time"/>
                        <button onClick={addtimevalue}>+</button>
                    </div>
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