import React from "react";
import './schedule.css';

import { useState,useEffect } from "react";


function Scheduleenter({close}){
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
                const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                const selectedAvailability = {};

                // Iterate over each day of the week
                daysOfWeek.forEach(day => {
                const lowercaseDay = day.toLowerCase();
                const filteredAvailability = json.schedule[0].availability.filter(a => a.day.toLowerCase() === lowercaseDay);
                
                // Set the availability for the current day
                selectedAvailability[day] = filteredAvailability.length ? filteredAvailability[0].time : [''];
                });
                // Construct the selected schedule object with availability for each day
                setselectedschedule({
                    name: json.schedule[0].name,
                    address: json.schedule[0].address,
                    fee: json.schedule[0].fee,
                    availability: daysOfWeek.map(day => ({
                    day,
                    time: selectedAvailability[day],
                    })),
                });
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

useEffect(()=>{
    var s=[...editschedule]
    s[selectedindex]=selectedschedule
    seteditschedule(s)
},[selectedschedule])
//add more time divs for a day
const addtimevalue = (e) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dayIndex = days.indexOf(e.target.id);
  
    // Create a new array of the current availability
    const newAvailability = selectedschedule.availability.map((slot, index) => {
      if (index === dayIndex) {
        // Create a new object for the selected day with an additional empty time slot
        return {
          ...slot,
          time: [...slot.time, '']
        };
      } else {
        return slot;
      }
    });
  
    // Update the selectedschedule with the new availability
    const updatedSchedule = { ...selectedschedule, availability: newAvailability };
  
    // Update the state
    setselectedschedule(updatedSchedule);
};
  
// Helper function to get availability for a specific day
function getElementAvailability(element, day) {
    const filteredAvailability = element.availability.filter(a => a.day.toLowerCase() === day);
    return filteredAvailability.length ? filteredAvailability[0].time : [''];
}

//change the selected hospital
const changehospital=(e)=>{
 const element = editschedule[e.target.id];

setselectedschedule({
  name: element.name,
  address: element.address,
  fee: element.fee,
  availability: [
    { day: 'Monday', time: getElementAvailability(element, 'monday') },
    { day: 'Tuesday', time: getElementAvailability(element, 'tuesday') },
    { day: 'Wednesday', time: getElementAvailability(element, 'wednesday') },
    { day: 'Thursday', time: getElementAvailability(element, 'thursday') },
    { day: 'Friday', time: getElementAvailability(element, 'friday') },
    { day: 'Saturday', time: getElementAvailability(element, 'saturday') },
    { day: 'Sunday', time: getElementAvailability(element, 'sunday') },
  ],
});
    
    setselectedindex(e.target.id)   
}

//handle inputs for time
const handleinput = (e) => {
    const day = e.target.name;
    const index = selectedschedule.availability.findIndex(a => a.day === day);
  
    if (index !== -1) {
      const element = { ...selectedschedule };
      element.availability[index].time[e.target.id] = e.target.value;
      setselectedschedule(element);
    }
}


// Define a function to refine the editschedule array
const refineSchedule = () => {
  const refinedSchedule = editschedule.map((item) => {
    const refinedAvailability = item.availability
      .filter((slot) => slot.time.length > 0) // Remove slots with empty time
      .reduce((acc, slot) => {
        // Merge adjacent slots with a non-empty slot
        if (acc.length > 0 && slot.time.length > 0) {
          const prevSlot = acc[acc.length - 1];
          if (prevSlot.time.length === 1 && prevSlot.time[0] === '' && slot.time[0] !== '') {
            prevSlot.time[0] = slot.time[0];
          } else {
            acc.push(slot);
          }
        } else {
          acc.push(slot);
        }
        return acc;
      }, []);

    return { ...item, availability: refinedAvailability };
  });

  seteditschedule(refinedSchedule);
};

//function to submit the entered data
function submitscheduledata(){
    
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
                        <div className={i.name===selectedschedule.name?"actiivehospitaltab":''} onClick={changehospital} id={index}><h2 id={index}>{i.name}</h2></div>

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
                        <div className="timescrolldiv">
{selectedschedule.availability[0].time.map((i,ind)=>{
    return(
        <>
                        <input value={i} id={ind} type="text" onChange={handleinput} name='Monday' className="timediv"/>
        </>
    )
})
}
                        </div>
                        <button id='Monday' onClick={addtimevalue}>+</button>
                    </div>
                    <div>
                        <h3>Tuesday</h3>
                        <div className="timescrolldiv">
{selectedschedule.availability[1].time.map((i,ind)=>{
    return(
        <>
                        <input value={i} id={ind} type="text" onChange={handleinput} name='Tuesday' className="timediv"/>
        </>
    )
})
}
                        </div>
                        <button  id='Tuesday' onClick={addtimevalue}>+</button>
                    </div>
                    <div>
                        <h3>Wednesday</h3>
                        <div className="timescrolldiv">
{selectedschedule.availability[2].time.map((i,ind)=>{
    return(
        <>
                        <input value={i} id={ind} type="text" onChange={handleinput} name='Wednesday' className="timediv"/>
        </>
    )
})
}
                        </div>
                        <button id='Wednesday' onClick={addtimevalue}>+</button>
                    </div>   
                    <div>
                        <h3>Thursday</h3>
                        <div className="timescrolldiv">
{selectedschedule.availability[3].time.map((i,ind)=>{
    return(
        <>
                        <input value={i} id={ind} type="text" onChange={handleinput} name='Thursday' className="timediv"/>
        </>
    )
})
}
                        </div>
                        <button id='Thursday' onClick={addtimevalue}>+</button>
                    </div>
                    <div>
                        <h3>Friday</h3>
                        <div className="timescrolldiv">
{selectedschedule.availability[4].time.map((i,ind)=>{
    return(
        <>
                        <input value={i} id={ind} type="text" onChange={handleinput} name='Friday' className="timediv"/>
        </>
    )
})
}
                        </div>
                        <button id='Friday' onClick={addtimevalue}>+</button>
                    </div>
                    <div>
                        <h3>Saturday</h3>
                        <div className="timescrolldiv">
{selectedschedule.availability[5].time.map((i,ind)=>{
    return(
        <>
                        <input value={i} id={ind} type="text" onChange={handleinput} name='Saturday' className="timediv"/>
        </>
    )
})
}
                        </div>
                        <button id='Saturday' onClick={addtimevalue}>+</button>
                    </div>
                    <div>
                        <h3>Sunday</h3>
                        <div className="timescrolldiv">
{selectedschedule.availability[6].time.map((i,ind)=>{
    return(
        <>
                        <input value={i} id={ind} type="text" onChange={handleinput} name='Sunday' className="timediv"/>
        </>
    )
})
}
                        </div>
                        <button id='Sunday' onClick={addtimevalue}>+</button>
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