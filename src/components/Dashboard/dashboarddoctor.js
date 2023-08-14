import React from "react";
import './dashboarddoctor.css'
import Sidenavdoctor from "../Sidenav/sidenavdoctor"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";
import {GrHelp} from "react-icons/gr";
import Profiledoctor from "../Profile/profiledoctor";
import Appointments from "../Appointments/appointments";
import Schedule from "../Schedule/schedule";

import { useEffect } from "react";

import PatientsP from '../../images/waiting-room.png'

import PatientsT from '../../images/user.png'

import WorkHours from '../../images/working-time.png'


function Dashboarddoctor(){
    const currentDate = new Date()
    const [expandedstate,setexpandedstate]=useState(false);
    const [tab, settab]=useState('Home');
    
    const [Datenow,setDatenow]=useState()
//navigate between tabs from the sidenav clicks and transitions
    const handlestate=(msg)=>{
    
        settab(msg.tab)
        
        setexpandedstate(msg.expanded)
    }



useEffect(()=>{

    if(!expandedstate){
        document.getElementById('dashboardarea').style.width='97%'
    }
    else{
        document.getElementById('dashboardarea').style.width='85%'
    }
})

useEffect(()=>{




// Get the day information for each date
const options = { weekday: 'long' };

var DN=new Date();
DN=DN.getDate()+'/'+DN.getMonth()+'/'+DN.getFullYear()+" "+DN.toLocaleDateString('en-US', options)
setDatenow(DN) 
},[])



useEffect(()=>{
// Get the day information for each date
const options = { weekday: 'long' };

var DN=new Date();
DN=DN.getDate()+'/'+DN.getMonth()+'/'+DN.getFullYear()+" "+DN.toLocaleDateString('en-US', options)
setDatenow(DN) 
},[Date()])
return(

<>
<div id="dashboardcontainer">

<Sidenavdoctor msg={handlestate} />
<div id="dashboardarea">

        <div className="infoareadashboard">
{(tab==='Home') && 
      <>
        <div className="section1doctor">
            <div className="subsec1doctor">
                <div className="Summarybar">
                    <h4>Statistics</h4>
                    <div id="statisticsdiv">
                        <div className="summarytilesbloodbank">
                            <img src={PatientsT}></img>
                            <div>
                                <h3 className="tilename">Today <br/> Total Patients</h3>
                                <h2 className="tilevalue">292</h2>
                            </div>
                        </div>
                        <div className="summarytilesbloodbank">
                            <img src={PatientsP}></img>
                            <div>
                                <h3 className="tilename">Patients<br/>  in Waiting</h3>
                                <h2 className="tilevalue">92</h2>
                            </div>
                        </div>                                
                        <div className="summarytilesbloodbank">
                            <img src={WorkHours}></img>
                            <div>
                                <h3 className="tilename">Working<br/>Hours Left</h3>
                                <h2 className="tilevalue">92</h2>
                            </div>
                        </div>                                 
                        
                    </div>
                    
                </div>
                <div className="performancegraphdoctor">
                    <div className="performancegraphsubdoctor" ></div>

                </div>

            </div>
            <div className="subsec2pharmacy">

                
                <h2 className="booktitledivpharmacy">Upcoming Appointments</h2>
                
                <div className="bookdiv4">
                    <div id='headpatient' className="patientinfo">
                        <h3>Patients Name</h3>
                        <h3>Venue</h3>
                        <h3>Time</h3>
                    </div>
                    <div id="contentinfopatient">
                        <div className="patientinfo patientcontent">
                            <h3>Alishba Arshad</h3>
                            <h3>ABC Hospital</h3>
                            
                            <h3>14/09/2023 9:00PM</h3>
                        </div>
                        <div className="patientinfo patientcontent">
                            <h3>Alishba Arshad</h3>
                            <h3>ABC Hospital</h3>
                            
                            <h3>14/09/2023 9:00PM</h3>
                        </div>
                        <div className="patientinfo patientcontent">
                            <h3>Alishba Arshad</h3>
                            <h3>ABC Hospital</h3>
                            
                            <h3>14/09/2023 9:00PM</h3>
                        </div>

                    </div>
                </div>
                <h2 className="booktitledivpharmacy">Schedule for today</h2>
                
                <div className="bookdiv2">
                    <div id="datedisplay"><h2>{Datenow}</h2></div>
                    <div id="scheduledashboard">
                        <div>
                            <h1>10:00 AM - 3:00 AM</h1>
                            <h3> ABC Hospital</h3>
                        </div>
                        <div>
                            <h1>10:00 AM - 3:00 AM</h1>
                            <h3> ABC Hospital</h3>
                        </div>
                        <div>
                            <h1>10:00 AM - 3:00 AM</h1>
                            <h3> ABC Hospital</h3>
                        </div>
                        <div>
                            <h1>10:00 AM - 3:00 AM</h1>
                            <h3> ABC Hospital</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </>
}
{(tab==='Appointments')&&
<Appointments/>
}
{(tab==='Schedule')&&
<Schedule/>
}
{(tab==='Profile')&&
<Profiledoctor/>
}


</div>
</div>
</div>
</>
)
}
export default Dashboarddoctor;