import React from "react";
import './schedule.css';
import {BiEditAlt } from "react-icons/bi";
import { useState,useEffect } from "react";


function Scheduleenter({close,unformatted}){
    const [selectedschedule,setselectedschedule]=useState({name:'',address:'',fee:'',availability:[{day:'',time:['']}]})
    const [selectedscheduleindex,setselectedscheduleindex]=useState(0)
    const [editschedule,seteditschedule]=useState([])
const handleinput=(e)=>{}

useEffect(() => {geteditschedule()
}, []);

useEffect(() => {console.log(editschedule)
}, [editschedule])

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
                setselectedschedule({name:json.schedule[0].name,address:json.schedule[0].address,fee:json.schedule[0].fee,availability:[
                    {day:'Monday',time:(json.schedule[0].availability.filter(a=>{a.day.toLowerCase()==='monday'}))?(json.schedule[0].availability.filter(a=>{a.day.toLowerCase()==='monday'})).time:['']},
                    {day:'Tuesday',time:(json.schedule[0].availability.filter(a=>{a.day.toLowerCase()==='tuesday'}))?(json.schedule[0].availability.filter(a=>{a.day.toLowerCase()==='tuesday'})).time:['']},
                    {day:'Wednesday',time:(json.schedule[0].availability.filter(a=>{a.day.toLowerCase()==='wednesday'}))?(json.schedule[0].availability.filter(a=>{a.day.toLowerCase()==='wednesday'})).time:['']},
                    {day:'Thursday',time:(json.schedule[0].availability.filter(a=>{a.day.toLowerCase()==='thursday'}))?(json.schedule[0].availability.filter(a=>{a.day.toLowerCase()==='thursday'})).time:['']},
                    {day:'Friday',time:(json.schedule[0].availability.filter(a=>{a.day.toLowerCase()==='friday'}))?(json.schedule[0].availability.filter(a=>{a.day.toLowerCase()==='friday'})).time:['']},
                    {day:'Saturday',time:(json.schedule[0].availability.filter(a=>{a.day.toLowerCase()==='saturday'}))?(json.schedule[0].availability.filter(a=>{a.day.toLowerCase()==='saturday'})).time:['']},
                    {day:'Sunday',time:(json.schedule[0].availability.filter(a=>{a.day.toLowerCase()==='sunday'}))?(json.schedule[0].availability.filter(a=>{a.day.toLowerCase()==='sunday'})).time:['']}
                
                ]});
                console.log(json.schedule);
            } else {
                seteditschedule([{name:'Unnamed',address:'',fee:'',availability:[]}]);
                setselectedschedule({name:'Unnamed',address:'',fee:'',availability:[
                    {day:'Monday',time:['']},
                    {day:'Tuesday',time:['']},
                    {day:'Wednesday',time:['']},
                    {day:'Thursday',time:['']},
                    {day:'Friday',time:['']},
                    {day:'Saturday',time:['']},
                    {day:'Sunday',time:['']},
                ]})
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

const changeselectedhospital=(e)=>{
    document.getElementsByClassName('actiivehospitaltab')[0].classList.remove('actiivehospitaltab')
    e.target.classList.add('actiivehospitaltab')
    setselectedscheduleindex(e.target.id)
    const element=editschedule[e.target.id]
    setselectedschedule({
        name:element.name,address:element.address,fee:element.fee,availability:[
            {day:'Monday',time:(element.availability.filter(a=>{a.day.toLowerCase()==='monday'}))?(element.availability.filter(a=>{a.day.toLowerCase()==='monday'})).time:['']},
            {day:'Tuesday',time:(element.availability.filter(a=>{a.day.toLowerCase()==='tuesday'}))?(element.availability.filter(a=>{a.day.toLowerCase()==='tuesday'})).time:['']},
            {day:'Wednesday',time:(element.availability.filter(a=>{a.day.toLowerCase()==='wednesday'}))?(element.availability.filter(a=>{a.day.toLowerCase()==='wednesday'})).time:['']},
            {day:'Thursday',time:(element.availability.filter(a=>{a.day.toLowerCase()==='thursday'}))?(element.availability.filter(a=>{a.day.toLowerCase()==='thursday'})).time:['']},
            {day:'Friday',time:(element.availability.filter(a=>{a.day.toLowerCase()==='friday'}))?(element.availability.filter(a=>{a.day.toLowerCase()==='friday'})).time:['']},
            {day:'Saturday',time:(element.availability.filter(a=>{a.day.toLowerCase()==='saturday'}))?(element.availability.filter(a=>{a.day.toLowerCase()==='saturday'})).time:['']},
            {day:'Sunday',time:(element.availability.filter(a=>{a.day.toLowerCase()==='sunday'}))?(element.availability.filter(a=>{a.day.toLowerCase()==='sunday'})).time:['']}
                
        ]
    })
    
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
                        <div className={index===0?"actiivehospitaltab":''} onClick={changeselectedhospital} id={index}><h2 id={index}>{i.name}</h2></div>

        </>)
})}

                    </div>
                    <div id="morehosbtn" onClick={addhospital}><h2>+</h2></div>
                </div>
                <button id="removehospital">Remove Hospital</button>
{editschedule&&selectedschedule&&
                <div id="hospitalschedulearea">
                    
                    <div>
                        <h3>Monday</h3>
                        <input value={()=>{return editschedule[0].name}} type="text" onChange={handleinput} name='monday' className="time"/>
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
}
                <button id="schedulemanual">Submit</button>
            </div>
        </div>
    </div>
</div>

</>)
}
export default Scheduleenter;