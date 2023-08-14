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

import { Chart as ChartJS, ArcElement,Title, Tooltip,    CategoryScale,
    LinearScale,
    BarElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { Bar } from 'react-chartjs-2';

  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ArcElement,
    Tooltip,
    Legend
  );



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

      const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' ,
          },

      }}
      const [workinghours,setworkinghours]=useState({
        labels,
        datasets: [
            {
              
              data: [15, 12, 7, 8, 10, 8,6],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
            
          ],
      })

      const[appointmentweek,setappointmentweek]=useState({
        labels,
        datasets: [
            {
              label: 'Component A',
              data: [15, 2, 11, 7, 0, 3,2],
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Component B',
                data: [9, 18, 0, 0, 5, 10,4],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
              {
                label: 'Component C',
                data: [15, 17, 9, 11, 0, 5,6],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
              },
          ],}
      )

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
DN=DN.getDate()+'/'+DN.getMonth()+1+'/'+DN.getFullYear()+" "+DN.toLocaleDateString('en-US', options)
setDatenow(DN) 
},[])



useEffect(()=>{
// Get the day information for each date
const options = { weekday: 'long' };

var DN=new Date();
DN=DN.getDate()+'/'+DN.getMonth()+1+'/'+DN.getFullYear()+" "+DN.toLocaleDateString('en-US', options)
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
                <h2 className="booktitledivpharmacy">Schedule for today</h2>
                
                <div className="bookdiv11">
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


            </div>
            <div className="subsec2doctor">
            <div className="performancegraphdoctor">
                    <h2 className="booktitledivpharmacy">Appointments of the week</h2>
                    <div className="performancegraphsubdoctor" style={{borderTopRightRadius:'2em'}} >
                    <Bar options={options} data={appointmentweek} />
                    </div>
                    
                </div>
                <div className="performancegraphdoctor">
                    <h2 className="booktitledivpharmacy">Working Hours of the week</h2>
                    <div className="performancegraphsubdoctor" style={{borderBottomRightRadius:'2em'}} >
                            <Doughnut data={workinghours} />
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