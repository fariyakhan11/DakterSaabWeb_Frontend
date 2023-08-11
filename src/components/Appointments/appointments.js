import React from "react";
import './appointments.css';
import {BiEditAlt } from "react-icons/bi";
import { useState,useEffect } from "react";


function Appointments(){
    const workplaceplaceno=['first','second','third','fourth','fifth']
    const workplaceplacenum=['firstdiv','seconddiv','thirddiv','fourthdiv','fifthdiv']
    
    const [selectedworkplace,setselectedworkplace]=useState('')
    const [hospitals,sethospitals]=useState([])
    const [schedule,setschedule]=useState([])
    const [before,setbefore]=useState('')
    const [after,setafter]=useState('')
    const [selected,setselected]=useState({date:'',month:'',year:''})
    const [appointmentlist,setappointmentlist]=useState([])
    const [displayed_appointmentlist,setdisplayed_appointmentlist]=useState([])
    
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

useEffect(()=>{

    
    const dateDropdown = document.getElementById("dateDropdown");
    const monthDropdown = document.getElementById("monthDropdown");
    const yearDropdown = document.getElementById("yearDropdown");

    
    monthDropdown.value=selected.month;

    yearDropdown.value=selected.year;
    generatedays()
    dateDropdown.value=selected.date;
    const today = new Date(
        selected.year,
        months.findIndex((m) => m.name === selected.month),
        selected.date
    );
    const oneDayBefore = new Date(today);
    oneDayBefore.setDate(today.getDate() - 1);
    setbefore(
        oneDayBefore.getDate() +
        ' ' +
        months[oneDayBefore.getMonth()].name +
        ' ' +
        oneDayBefore.getFullYear()
    );
    const oneDayAfter = new Date(today);

    oneDayAfter.setDate(today.getDate() + 1);
    setafter(
        oneDayAfter.getDate() +
        ' ' +
        months[oneDayAfter.getMonth()].name +
        ' ' +
        oneDayAfter.getFullYear()
    );

},[selected])

useEffect(()=>{
    
    var today=new Date();
    generateyears();
    setselected({date:today.getDate(),month:months[today.getMonth()].name ,year:today.getFullYear()})
    getschedule()
    getappointments()
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

useEffect(()=>{
    setdisplayed_appointmentlist(appointmentlist)
},[appointmentlist])

function getappointments(){
    try{
        const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('email')
        const api='http://localhost:5000/api/doctor/getappointments/'+params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()) // get response, convert to json
        .then((json) => {
        if(json.appointment){
            setappointmentlist(json.appointment)
        }else{setappointmentlist([])}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}

const filterworkplace=(e)=>{
    setselectedworkplace(e.target.value)
    
}

useEffect(()=>{
    
    if(selectedworkplace!=''){
        const d=document.getElementsByClassName('clinicapp')
        
        const dArray = Array.from(d);

        dArray.map((i) => {
            i.style.display = 'none';
            return null; // map function should return a value
        });
        const w=document.getElementsByClassName(workplaceplacenum[hospitals.indexOf(selectedworkplace)])
        const wArray = Array.from(w);

        wArray.map((i) => {
            i.style.display = 'block';
            return null; // map function should return a value
        });
    }
    else{
        const d=document.getElementsByClassName('clinicapp')
        const dArray = Array.from(d);
        dArray.map((i) => {
            i.style.display = 'block';
            return null; // map function should return a value
        });
    }
},[selectedworkplace])
return(
<>
        <div id="Appointmentsdashboard">
            <div className="contentarea" >
                    <h3 className="contentareatitle">My Appointments</h3>
                    <hr/>
                <div id="colorcodeapp">
                    <div id="filterbarappointment">
                            <div id="datechoose">
                                <h5>Select Date</h5>
                                <div id="selecteddatefilterapp">

                                    <select id="dateDropdown" onChange={changehandler}>

                                    </select>
                                    <select id="monthDropdown" onChange={changehandler}>
    {months.map((i,index)=>{return(
                                        <option value={i.name}>{i.name}</option>
    )})}

                                    </select>
                                    <select id="yearDropdown" onChange={changehandler}>

                                    </select>
                                </div>

                            </div>
                            <div id="datechoose">
                            <h5>Select Workplace</h5>
                                <div id="selectedworkfilterapp">

                                    
                                        <select id="monthDropdown" onClick={filterworkplace}>
                                        <option value=''>All</option>

        {hospitals.map((i,index)=>{return(
                                            <option id={i} value={i}>{i}</option>
        )})}

                                        </select>

                                </div>
                            </div>
                    </div>
                    <div id="colourcode1" className="colorcodediv">
                    { hospitals.map((i,index)=>{
                        return(<>
                        <div id={index} className="colorcodediv ">
                            <div id="colordiv" className={workplaceplaceno[index]}></div>
                            <h4 className="colorhead">{i}</h4>
                        </div>
</>)})
}              
                    </div>

                </div>
                <div id="appointmentsdiv">
                    <div id="appointmentsdivcontent">
                        <div className="appointmentsdivcontentcontainer">
                            <div className="contentapphead">
                                <h1>Date: {before}
                                    </h1>
                            </div>
                            <div className="contentappbody">
                                {displayed_appointmentlist
                                    .filter(a => {
                                        const dateParts = a.date.split('T')[0].split('-');
                                        const day = dateParts[2];
                                        const month = months[parseInt(dateParts[1]) - 1].name;
                                        const year = dateParts[0];
                                        return day + ' ' + month + ' ' + year === before;
                                    })
                                    .map((i, index) => {
                                        return (
                                        
                                                <div id="workplaceapp" className={workplaceplacenum[hospitals.indexOf(i.clinicName)]+' clinicapp'}>
                                                    <div>
                                                        <h1>Patient Name: </h1>
                                                        <h2>{i.patientName}</h2>
                                                    </div>
                                                    <div>
                                                        <h1>Time: </h1>
                                                        <h2>{i.time}</h2>
                                                    </div>
                                                    <div>
                                                        <h1>Clinic: </h1>
                                                        <h2>{i.clinicName}</h2>
                                                    </div>
                                                </div>
                                            
                                        );
                                    })}
                            </div>


                    
                        </div>
                        <div className="appointmentsdivcontentcontainer">
                            <div className="contentapphead">
                                <h1>Date: {"  "+selected.date+' '+selected.month+' '+selected.year}</h1>
                            </div>
                            <div className="contentappbody">
                                {displayed_appointmentlist
                                    .filter(a => {
                                        const dateParts = a.date.split('T')[0].split('-');
                                        const day = dateParts[2];
                                        const month = months[parseInt(dateParts[1]) - 1].name;
                                        const year = dateParts[0];
                                        return day + ' ' + month + ' ' + year === selected.date+' '+selected.month+" "+selected.year;
                                    })
                                    .map((i, index) => {
                                        return (
                                            
                                                <div id="workplaceapp" className={workplaceplacenum[hospitals.indexOf(i.clinicName)] +' clinicapp'}>
                                                    <div>
                                                        <h1>Patient Name: </h1>
                                                        <h2>{i.patientName}</h2>
                                                    </div>
                                                    <div>
                                                        <h1>Time: </h1>
                                                        <h2>{i.time}</h2>
                                                    </div>
                                                    <div>
                                                        <h1>Clinic: </h1>
                                                        <h2>{i.clinicName}</h2>
                                                    </div>
                                                </div>
                                            
                                        );
                                    })}
                            </div>
                        </div>
                        <div className="appointmentsdivcontentcontainer">
                            <div className="contentapphead">
                                <h1>Date: {after}</h1>
                            </div>
                            <div className="contentappbody">
                                {displayed_appointmentlist
                                    .filter(a => {
                                        const dateParts = a.date.split('T')[0].split('-');
                                        const day = dateParts[2];
                                        const month = months[parseInt(dateParts[1]) - 1].name;
                                        const year = dateParts[0];
                                        return day + ' ' + month + ' ' + year === after;
                                    })
                                    .map((i, index) => {
                                        return (
                                            
                                                <div id="workplaceapp" className={workplaceplacenum[hospitals.indexOf(i.clinicName)]+' clinicapp'}>
                                                    <div>
                                                        <h1>Patient Name: </h1>
                                                        <h2>{i.patientName}</h2>
                                                    </div>
                                                    <div>
                                                        <h1>Time: </h1>
                                                        <h2>{i.time}</h2>
                                                    </div>
                                                    <div>
                                                        <h1>Clinic: </h1>
                                                        <h2>{i.clinicName}</h2>
                                                    </div>
                                                </div>
                                            
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
</>
)
}
export default Appointments;