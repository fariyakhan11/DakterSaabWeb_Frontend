import React from "react";
import './schedule.css';
import {BiEditAlt } from "react-icons/bi";
import { useState,useEffect } from "react";
import Scheduleenter from "./scheduleenter";


function Schedule(){

    const [currentdates,setcurrentdates]=useState([])
    const [displayeddates,setdisplayeddates]=useState([])
    const [selected,setselected]=useState({date:'',month:'',year:''})
    const [close_add_view, set_add_view] = useState(true);
    const [schedule,setschedule]=useState([])
    
    const workplaceplaceno=['first','second','third','fourth','fifth']
    const [hospitals,sethospitals]=useState([])
    const [selectedworkplace,setselectedworkplace]=useState('')
      const months = [
        { name: "January", days: 31 },
        { name: "February", days: 28 },
        { name: "March", days: 31 },
        { name: "April", days: 30 },
        { name: "May", days: 31 },
        { name: "June", days: 30 },
        { name: "July", days: 31 },
        { name: "August", days: 31 },
        { name: "September", days: 30 },
        { name: "October", days: 31 },
        { name: "November", days: 30 },
        { name: "December", days: 31 }
      ];
function setdatesvalue(d){
    // Get today's date
const todaydate =d;
const threeDaysAfter =new Date(todaydate);
const twoDaysAfter=new Date(todaydate);
const oneDayAfter=new Date(todaydate);
const threeDaysBefore=new Date(todaydate);
const twoDaysBefore=new Date(todaydate);
const oneDayBefore = new Date(todaydate);

threeDaysAfter.setDate(todaydate.getDate() + 3);
twoDaysAfter.setDate(todaydate.getDate() + 2);
oneDayAfter.setDate(todaydate.getDate() + 1);
threeDaysBefore.setDate(todaydate.getDate() - 3);
twoDaysBefore.setDate(todaydate.getDate() - 2);
oneDayBefore.setDate(todaydate.getDate() - 1);

// Get the day information for each date
const options = { weekday: 'long' };

setcurrentdates([
    {date:threeDaysBefore.getDate()+' '+months[threeDaysAfter.getMonth()].name   ,day:threeDaysBefore.toLocaleDateString('en-US', options)},
    {date:twoDaysBefore.getDate()+' '+months[twoDaysBefore.getMonth()].name     ,day:twoDaysBefore.toLocaleDateString('en-US', options)},
    {date:oneDayBefore.getDate()+' '+months[oneDayBefore.getMonth()].name        ,day:oneDayBefore.toLocaleDateString('en-US', options)},
    {date:todaydate.getDate()+' '+ months[todaydate.getMonth()].name                     ,day:todaydate.toLocaleDateString('en-US', options)},
    {date:oneDayAfter.getDate()+' '+months[oneDayAfter.getMonth()].name         ,day:oneDayAfter.toLocaleDateString('en-US', options)},
    {date:twoDaysAfter.getDate()+' '+months[twoDaysAfter.getMonth()].name       ,day:twoDaysAfter.toLocaleDateString('en-US', options)},
    {date:threeDaysAfter.getDate()+' '+months[threeDaysAfter.getMonth()].name    ,day:threeDaysAfter.toLocaleDateString('en-US', options)}]
)
}

useEffect(()=>{setdisplayeddates(currentdates)},[currentdates])

useEffect(()=>{
    

    var today=new Date();
    
    generateyears();
    setselected({date:today.getDate(),month:months[today.getMonth()].name ,year:today.getFullYear()})
    getschedule()
},[])

useEffect(()=>{

    
    const dateDropdown = document.getElementById("dateDropdown");
    const monthDropdown = document.getElementById("monthDropdown");
    const yearDropdown = document.getElementById("yearDropdown");

    
    monthDropdown.value=selected.month;

    yearDropdown.value=selected.year;
    generatedays()
    dateDropdown.value=selected.date;
    const today = new Date(selected.year, months.findIndex(m => m.name === selected.month), selected.date);
    setdatesvalue(today);
},[selected])

function generatedays(){

    const dateDropdown = document.getElementById("dateDropdown");
//check its leapyear or not
    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };
    
    var date_options;
    for(var i =0;i<months.length;i++){
        if(months[i].name===selected.month){
            if(selected.month==='February'&&isLeapYear(selected.year)){
                date_options=29;
            }
            else{
            date_options= months[i].days}
        }
    }
    dateDropdown.innerHTML = "";
    for(var d=0;d<date_options;d++){
        const option = document.createElement("option");
        option.value = d +1;
        option.textContent = d+1;
        dateDropdown.appendChild(option)
    }
    
}

function generateyears(){
    const yearDropdown = document.getElementById("yearDropdown");
      for (let year = 1900; year <= 2100; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearDropdown.appendChild(option);
      }
}

const changehandler=(e)=>{
    if(e.target.id==="dateDropdown"){
       setselected((prev) => {
            return { ...prev, date: e.target.value };
        });
    }
    else if(e.target.id==="monthDropdown"){
        setselected((prev) => {
        return { ...prev, month: e.target.value };
        });
    }
    else{
        setselected((prev) => {
            return { ...prev, year: e.target.value };
            
        });
    }
    
}

//close the add view tab
const handle_add=(close)=>{
  set_add_view(close)
    getschedule()
}

useEffect(()=>{
    const distinctHospitalNames = [...new Set(schedule.flatMap(entry =>
        entry.availability.map(availabilityEntry => availabilityEntry.name)
    ))];
    if(distinctHospitalNames[0]){
    sethospitals(distinctHospitalNames)}
    else{
        sethospitals([])
    }
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
            var sch=json.schedule
            
            if(sch.length){

                // Initialize an empty array to store the new formatted data
                var formattedSchedule = [];
                const findDay = (day) => {
                    return formattedSchedule.find(entry => entry.day === day);
                };

                // Iterate through each entry in the 'availability' array
                sch.forEach(entry => {
                    entry.availability.forEach(availabilityEntry => {
                        // Find or create a day entry in the formattedSchedule array
                        let dayEntry = findDay(availabilityEntry.day);
                        if (!dayEntry) {
                            dayEntry = { day: availabilityEntry.day, availability: [] };
                            formattedSchedule.push(dayEntry);
                        }


                        // Push the availability information into the day entry
                        dayEntry.availability.push({
                            name: entry.name,
                            time: availabilityEntry.time
                        });
                    });
                });

            }
            else{
                var formattedSchedule = [{day:'',availability:[{name:'',time:[]}]}];
            }
          setschedule(formattedSchedule)
            console.log(formattedSchedule)
        }else{setschedule([]);}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}

const openEdit=()=>{

    set_add_view(!close_add_view)
}


const filterworkplace=(e)=>{
    setselectedworkplace(e.target.id)
    document.getElementsByClassName('selectedworkplace')[0].classList.remove('selectedworkplace')
    e.target.classList.add('selectedworkplace')
}
useEffect(()=>{

    if(selectedworkplace!=''){
        const d=document.getElementsByClassName('daytimediv')
        
        const dArray = Array.from(d);

        dArray.map((i) => {
            i.style.display = 'none';
            return null; // map function should return a value
        });
        const w=document.getElementsByClassName(workplaceplaceno[hospitals.indexOf(selectedworkplace)])
        const wArray = Array.from(w);

        wArray.map((i) => {
            i.style.display = 'block';
            return null; // map function should return a value
        });
    }
    else{
        const d=document.getElementsByClassName('daytimediv')
        const dArray = Array.from(d);
        dArray.map((i) => {
            i.style.display = 'block';
            return null; // map function should return a value
        });
    }
},[selectedworkplace])

return(
<>
{!close_add_view &&
<Scheduleenter close={handle_add} />
}
        <div id="Scheduledashboard">
            <div className="contentarea" >
                    <h3 className="contentareatitle">My Schedule</h3>
                    <hr/>
                    <div id="colorcode">
{hospitals.map((i,index)=>{
                        return(<>
                        <div id={index} className="colorcodediv ">
                            <div id="colordiv" className={workplaceplaceno[index]}></div>
                            <h4 className="colorhead">{i}</h4>
                        </div>
</>)})
}
                    </div>
                <div id="schedulediv">
                    <div id="subschedulediv1">
                        <div id="datecol">
{displayeddates.map((i,index)=>{return(
                            <div id={index}><h4>{i.date}</h4><h3>{i.day}</h3></div>
)})}
                        </div>

                        <div id="dayschedulediv">
                            {displayeddates.map((i,index)=>{
                                
                                const dayschedule = schedule.find(s => s.day === i.day);

                                
                                if(dayschedule){
                                    return (
                                        <div className="schedule" id={index}>
                                            {dayschedule.availability.map((item, ind) => (
                                                <>
                                                    {item.time.map((element, d) => (
                                                        <h4 key={d} className={workplaceplaceno[hospitals.indexOf(item.name)]+ ' daytimediv'}>
                                                            {element}
                                                        </h4>
                                                    ))}
                                                </>
                                            ))}
                                        </div>
                                    );
                                }
                                else{
                                    return(<>

                                        <div className="schedule">

                                        </div>
                                    </>)
                                }

                            })}

                        </div>
                    </div>
                    <div id="subschedulediv2">
                        <div id="datechooser">
                            <h5>Selected Date</h5>
                            <div id="selecteddatefilter">

                                <select id="dateDropdown" onChange={changehandler}>

                                </select>
                                <select id="monthDropdown" onChange={changehandler}>
{months.map((i,index)=>{return(
                                    <option value={i.name} id={index}>{i.name}</option>
)})}

                                </select>
                                <select id="yearDropdown" onChange={changehandler}>

                                </select>
                            </div>
                        </div>
                        <div id="workingplaces">
                            <div id="workplacehead" className="divhead"><h3>Places I work</h3></div>
                            <div id="workplacecontent" className="divcontentarea">
                                <h4 className="selectedworkplace" id='' onClick={filterworkplace}>All</h4>
{ hospitals.map((i,index)=>{
                        return(<>
                                <h4 className={workplaceplaceno[index]} id={i} onClick={filterworkplace}>{i}</h4>
                                
                            </>)

})}


                            </div>
                        </div>

                        <div id="holidays">
                            <div id="holidayhead" className="divhead"></div>
                            <div id="holidaycontent" className="divcontentarea">
                                <button onClick={openEdit}>Import Schedule</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
</>
)
}
export default Schedule;