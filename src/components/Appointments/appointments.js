import React from "react";
import './appointments.css';
import {BiEditAlt } from "react-icons/bi";
import { useState,useEffect } from "react";


function Appointments(){
    const workplaceplaceno=['first','second','third','fourth','fifth']
    const workplaceplacenum=['firstdiv','seconddiv','thirddiv','fourthdiv','fifthdiv']
    const [currentdates,setcurrentdates]=useState([])
    const [selected,setselected]=useState({date:'',month:'',year:''})
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

},[selected])

useEffect(()=>{
    setdatesvalue();
    var today=new Date();
    generateyears();
    setselected({date:today.getDate(),month:months[today.getMonth()].name ,year:today.getFullYear()})
},[])

function setdatesvalue(){
    // Get today's date
    const today = new Date();

    const oneDayAfter=new Date(today);

    const oneDayBefore = new Date(today);


    oneDayAfter.setDate(today.getDate() + 1);
  


    // Get the day information for each date
    const options = { weekday: 'long' };

    setcurrentdates([

        {date:oneDayBefore.getDate()+' '+months[oneDayBefore.getMonth()].name        ,day:oneDayBefore.toLocaleDateString('en-US', options)},
        {date:today.getDate()+' '+ months[today.getMonth()].name                     ,day:today.toLocaleDateString('en-US', options)},
        {date:oneDayAfter.getDate()+' '+months[oneDayAfter.getMonth()].name         ,day:oneDayAfter.toLocaleDateString('en-US', options)},
        ]
    )

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

                                    
                                        <select id="monthDropdown" onChange={changehandler}>
                                        <option value='All'>All</option>
        {months.map((i,index)=>{return(
                                            <option value={i.name}>{i.name}</option>
        )})}

                                        </select>

                                </div>
                            </div>
                    </div>
                    <div id="colourcode1" className="colorcodediv">
{ JSON.parse(sessionStorage.getItem('hospital')).map((i,index)=>{
                        return(<>
                        <div id={index} className="colorcodediv ">
                            <div id="colordiv" className={workplaceplaceno[index]}></div>
                            <h4 className="colorhead">{i.name}</h4>
                        </div>
</>)})
}               
                    </div>

                </div>
                <div id="appointmentsdiv">
                    <div id="appointmentsdivcontent">
                        <div className="appointmentsdivcontentcontainer">
                            <div className="contentapphead">
                                <h1>Date: 30/07/2023</h1>
                            </div>
                            <div className="contentappbody">
                                <div className="workplaceapp firstdiv">
                                    <div>   
                                        <h1>Patient Name: </h1>
                                        <h2>Alishba</h2>
                                    </div>
                                    <div>   
                                        <h1>Time: </h1>
                                        <h2>10:00AM</h2>
                                    </div>
                                    <div>   
                                        <h1>Clinic: </h1>
                                        <h2>Agha Khan</h2>
                                    </div>
                                </div>
                                <div className="workplaceapp firstdiv">
                                    <div>   
                                        <h1>Patient Name: </h1>
                                        <h2>Hania</h2>
                                    </div>
                                    <div>   
                                        <h1>Time: </h1>
                                        <h2>10:30AM</h2>
                                    </div>
                                    <div>   
                                        <h1>Clinic: </h1>
                                        <h2>Agha Khan</h2>
                                    </div>
                                </div>
                                <div className="workplaceapp firstdiv">
                                    <div>   
                                        <h1>Patient Name: </h1>
                                        <h2>Daniyal</h2>
                                    </div>
                                    <div>   
                                        <h1>Time: </h1>
                                        <h2>10:15AM</h2>
                                    </div>
                                    <div>   
                                        <h1>Clinic: </h1>
                                        <h2>Agha Khan</h2>
                                    </div>
                                </div>
                                <div className="workplaceapp seconddiv">
                                    <div>   
                                        <h1>Patient Name: </h1>
                                        <h2>Rohail</h2>
                                    </div>
                                    <div>   
                                        <h1>Time: </h1>
                                        <h2>12:00PM</h2>
                                    </div>
                                    <div>   
                                        <h1>Clinic: </h1>
                                        <h2>Mehmooda Clinic</h2>
                                    </div>
                                </div>
                                <div className="workplaceapp seconddiv">
                                    <div>   
                                        <h1>Patient Name: </h1>
                                        <h2>Dania</h2>
                                    </div>
                                    <div>   
                                        <h1>Time: </h1>
                                        <h2>12:30</h2>
                                    </div>
                                    <div>   
                                        <h1>Clinic: </h1>
                                        <h2>Mehmooda Clinic</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="appointmentsdivcontentcontainer">
                            <div className="contentapphead">
                                <h1>Date: 30/07/2023</h1>
                            </div>
                            <div className="contentappbody">
                                
                                <div className="workplaceapp seconddiv">
                                    <div>   
                                        <h1>Patient Name: </h1>
                                        <h2>Hammad</h2>
                                    </div>
                                    <div>   
                                        <h1>Time: </h1>
                                        <h2>2:15PM</h2>
                                    </div>
                                    <div>   
                                        <h1>Clinic: </h1>
                                        <h2>Mehmooda Clinic</h2>
                                    </div>
                                </div>
                                <div className="workplaceapp seconddiv">
                                    <div>   
                                        <h1>Patient Name: </h1>
                                        <h2>Zohaib</h2>
                                    </div>
                                    <div>   
                                        <h1>Time: </h1>
                                        <h2>3:00PM</h2>
                                    </div>
                                    <div>   
                                        <h1>Clinic: </h1>
                                        <h2>Mehmooda Clinic</h2>
                                    </div>
                                </div>
                                <div className="workplaceapp firstdiv">
                                    <div>   
                                        <h1>Patient Name: </h1>
                                        <h2>Sohaib</h2>
                                    </div>
                                    <div>   
                                        <h1>Time: </h1>
                                        <h2>5:00PM</h2>
                                    </div>
                                    <div>   
                                        <h1>Clinic: </h1>
                                        <h2>Agha Khan</h2>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="appointmentsdivcontentcontainer">
                            <div className="contentapphead">
                                <h1>Date: 30/07/2023</h1>
                            </div>
                            <div className="contentappbody">
                                
                                <div className="workplaceapp firstdiv">
                                    <div>   
                                        <h1>Patient Name: </h1>
                                        <h2>Alina</h2>
                                    </div>
                                    <div>   
                                        <h1>Time: </h1>
                                        <h2>7:00PM</h2>
                                    </div>
                                    <div>   
                                        <h1>Clinic: </h1>
                                        <h2>Agha Khan</h2>
                                    </div>
                                </div>
                                <div className="workplaceapp seconddiv">
                                    <div>   
                                        <h1>Patient Name: </h1>
                                        <h2>Rohail</h2>
                                    </div>
                                    <div>   
                                        <h1>Time: </h1>
                                        <h2>12:00PM</h2>
                                    </div>
                                    <div>   
                                        <h1>Clinic: </h1>
                                        <h2>Mehmooda Clinic</h2>
                                    </div>
                                </div>
                                
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