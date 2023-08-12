import React from "react";
import './schedule.css';

import { useState,useEffect } from "react";


function Scheduleenter({close,unformatted}){
    const [selectedschedule,setselectedschedule]=useState({name:'',address:'',fee:'',availability: [
        {day:"Monday",time:['']},
        {day:"Tuesday",time:['']},
        {day:"Wednesday",time:['']},
        {day:"Thursday",time:['']},
        {day:"Friday",time:['']},
        {day:"Saturday",time:['']},
        {day:"Sunday",time:['']}
    ]})
    const [editschedule,seteditschedule]=useState([])
    const [selectedindex,setselectedindex]=useState(0)


useEffect(() => {geteditschedule()
}, []);

useEffect(() => {console.log(editschedule)
}, [editschedule]);

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
                
                setselectedschedule({ name:json.schedule[0].name, address:json.schedule[0].address, fee:json.schedule[0].fee, availability: [
                    {day:"Monday",time:(json.schedule[0].availability.filter(a=>{a.day.toLowercase()==='monday'}))?(json.schedule[0].availability.filter(a=>{a.day.toLowercase()==='monday'})).time:['']},
                    {day:"Tuesday",time:(json.schedule[0].availability.filter(a=>{a.day.toLowercase()==='tuesday'}))?(json.schedule[0].availability.filter(a=>{a.day.toLowercase()==='tuesday'})).time:['']},
                    {day:"Wednesday",time:(json.schedule[0].availability.filter(a=>{a.day.toLowercase()==='wednesday'}))?(json.schedule[0].availability.filter(a=>{a.day.toLowercase()==='wednesday'})).time:['']},
                    {day:"Thursday",time:(json.schedule[0].availability.filter(a=>{a.day.toLowercase()==='thursday'}))?(json.schedule[0].availability.filter(a=>{a.day.toLowercase()==='thursday'})).time:['']},
                    {day:"Friday",time:(json.schedule[0].availability.filter(a=>{a.day.toLowercase()==='friday'}))?(json.schedule[0].availability.filter(a=>{a.day.toLowercase()==='friday'})).time:['']},
                    {day:"Saturday",time:(json.schedule[0].availability.filter(a=>{a.day.toLowercase()==='saturday'}))?(json.schedule[0].availability.filter(a=>{a.day.toLowercase()==='saturday'})).time:['']},
                    {day:"Sunday",time:(json.schedule[0].availability.filter(a=>{a.day.toLowercase()==='sunday'}))?(json.schedule[0].availability.filter(a=>{a.day.toLowercase()==='sunday'})).time:['']}
                ] });
                setselectedindex(0)
                } else {
                seteditschedule([{name:'Unnamed',address:'',fee:'',availability:[]}]);
                setselectedschedule({ name: 'Unnamed', address: '', fee: '', availability: [
                    {day:"Monday",time:['']},
                    {day:"Tuesday",time:['']},
                    {day:"Wednesday",time:['']},
                    {day:"Thursday",time:['']},
                    {day:"Friday",time:['']},
                    {day:"Saturday",time:['']},
                    {day:"Sunday",time:['']}
                ] });
                setselectedindex(0)
                
                
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

const hospitalinfochange = (e) => {
    setselectedschedule(prevSelectedSchedule => {
        const updatedSchedule = { ...prevSelectedSchedule }; // Make a shallow copy of the existing state
        if (e.target.name === 'hosnewname') {
            updatedSchedule.name = e.target.value;
        } else if (e.target.name === 'hosnewaddress') {
            updatedSchedule.address = e.target.value;
        } else if (e.target.name === 'hosnewfee') {
            updatedSchedule.fee = e.target.value;
        }
        return updatedSchedule; // Return the updated state
    });
}

const addtimevalue=(e)=>{}

const changehospital=(e)=>{
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
    
    setselectedindex(e.target.id)
    alert(e.target)
    document.getElementsByClassName('actiivehospitaltab')[0].classList.remove('actiivehospitaltab')
    e.target.classList.add('actiivehospitaltab')
}

const handleinput=(e)=>{
    var element=selectedschedule
    element.availability[element.availability.indexOf(element.availability.filter(a=>{a.day===e.target.name}))].time[e.target.id]=e.target.value
    setselectedschedule(element)
    var s=[...editschedule]
    s[selectedindex]=element
    seteditschedule(s)

}
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
                        <div className={index===0?"actiivehospitaltab":''} onClick={changehospital} id={index}><h2 id={index}>{i.name}</h2></div>

        </>)
})}

                    </div>
                    <div id="morehosbtn" onClick={addhospital}><h2>+</h2></div>
                </div>
                <button id="removehospital">Remove Hospital</button>
                <div className="hospitalenterinfo">
                    <div>
                    <h3>Name:</h3>
                    <input type="text" name="hosnewname" onChange={hospitalinfochange} value={selectedschedule.name} className="inputhospitalname"/>
                    </div>
                    <div>
                    <h3>Address:</h3>
                    <input type="text"  name="hosnewaddress" onChange={hospitalinfochange}  value={selectedschedule.address} className="inputhospitalname"/>
                    </div>
                    <div>
                    <h3>Fees:</h3>
                    <input type="number" name="hosnewfee" onChange={hospitalinfochange} value={selectedschedule.fee} className="inputhospitalname"/>
                    </div>
                    <div>
                    <h3>Timings</h3>
                    </div>
                </div>
{selectedschedule.availability&&
                <div id="hospitalschedulearea"> 
                    <div>
                        <h3>Monday</h3>
{selectedschedule.availability[0].time.map((i,ind)=>{
    return(
        <>
                        <input value={i} id={ind} type="text" onChange={handleinput} name='Monday' className="time"/>
        </>
    )
})
}
                        <button onClick={addtimevalue}>+</button>
                    </div>
                    <div>
                        <h3>Tuesday</h3>
{selectedschedule.availability[1].time.map((i,ind)=>{
    return(
        <>
                        <input value={i} id={ind} type="text" onChange={handleinput} name='Tuesday' className="time"/>
        </>
    )
})
}
                        <button onClick={addtimevalue}>+</button>
                    </div>
                    <div>
                        <h3>Wednesday</h3>
{selectedschedule.availability[2].time.map((i,ind)=>{
    return(
        <>
                        <input value={i} id={ind} type="text" onChange={handleinput} name='Wednesday' className="time"/>
        </>
    )
})
}
                        <button onClick={addtimevalue}>+</button>
                    </div>
                    <div>
                        <h3>Thursday</h3>
{selectedschedule.availability[3].time.map((i,ind)=>{
    return(
        <>
                        <input value={i} id={ind} type="text" onChange={handleinput} name='Thursday' className="time"/>
        </>
    )
})
}
                        <button onClick={addtimevalue}>+</button>
                    </div>
                    <div>
                        <h3>Friday</h3>
{selectedschedule.availability[4].time.map((i,ind)=>{
    return(
        <>
                        <input value={i} id={ind} type="text" onChange={handleinput} name='Friday' className="time"/>
        </>
    )
})
}
                        <button onClick={addtimevalue}>+</button>
                    </div>
                    <div>
                        <h3>Saturday</h3>
{selectedschedule.availability[5].time.map((i,ind)=>{
    return(
        <>
                        <input value={i} id={ind} type="text" onChange={handleinput} name='Saturday' className="time"/>
        </>
    )
})
}
                        <button onClick={addtimevalue}>+</button>
                    </div>
                    <div>
                        <h3>Sunday</h3>
{selectedschedule.availability[6].time.map((i,ind)=>{
    return(
        <>
                        <input value={i} id={ind} type="text" onChange={handleinput} name='Sunday' className="time"/>
        </>
    )
})
}
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