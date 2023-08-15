import React from "react";
import './dashboarddoctor.css'
import Sidenavdoctor from "../Sidenav/sidenavdoctor"

import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";
import {GrHelp} from "react-icons/gr";
import Profiledoctor from "../Profile/profiledoctor";
import Appointments from "../Appointments/appointments";
import Schedule from "../Schedule/schedule";

import { useEffect } from "react";

import PatientsP from '../../images/waiting-room.png'

import PatientsT from '../../images/user.png'



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
    
    const [expandedstate,setexpandedstate]=useState(false);
    const [tab, settab]=useState('Home');
    const [appointment_list,setappointment_list]=useState([])
    const [schedule,setschedule]=useState([])
    const [Datenow,setDatenow]=useState()
    const[schedulehours,setschedulehours]=useState([])
    
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
    setworkinghours({
        labels,
        datasets: [
            {
              
              data: schedulehours,
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
},[schedulehours])


      
const [upcoming,setupcoming]=useState([])
function timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

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
                var formattedSchedule = [0,0,0,0,0,0,0];
                sch.forEach(s=>{
                    ['Monday','Tuesday','Wednesday','Thursday',"Friday",'Saturday',"Sunday"].forEach((dayt,index) =>{
                        s.availability.map((a)=>{
                            if(a.day===dayt){
                                a.time.forEach(timeslot=>{
                                    const [startTime, endTime] = timeslot.split('-')
                                    const startMinutes = timeToMinutes(startTime);
                                    const endMinutes = timeToMinutes(endTime);

                                    const timeDifferenceInMinutes = endMinutes - startMinutes;
                                    formattedSchedule[index]=formattedSchedule+(timeDifferenceInMinutes/60)
                                })

                            }})

                    })
                })
                setworkinghours({
                    labels,
                    datasets: [
                        {
                          
                          data: formattedSchedule,
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

                

            }
            else{
                var formattedSchedule = [0,0,0,0,0,0,0];
            }
          setschedulehours(formattedSchedule)
            
        }else{setschedulehours([0,0,0,0,0,0,0]);}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}

useEffect(()=>{

    if(!expandedstate){
        document.getElementById('dashboardarea').style.width='97%'
    }
    else{
        document.getElementById('dashboardarea').style.width='85%'
    }
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Filter appointments that have a time after the current time
    const upcomingAppointments = appointment_list.filter(appointment => {
        const [appointmentHour, appointmentMinute] = appointment.time.split(':');
        return (
            parseInt(appointmentHour, 10) > currentHour ||
            (parseInt(appointmentHour, 10) === currentHour && parseInt(appointmentMinute, 10) > currentMinute)
        );
    });
    setupcoming(upcomingAppointments.length)
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


useEffect(()=>{
    if(tab==='Home'){
    getappointments()
    geteditschedule()
    getschedule()
}
},[tab])

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
            var today=new Date()
            
            const app = json.appointment.filter(a => {
                const dateParts = a.date.split('-');
                const appointmentYear = parseInt(dateParts[0]);
                const appointmentMonth = parseInt(dateParts[1]);
                const appointmentDate = parseInt(dateParts[2]);
            
                return (
                    appointmentYear === today.getFullYear() &&
                    appointmentMonth === today.getMonth() + 1 && // Months are 0-based, so add 1
                    appointmentDate === today.getDate()+1
                );
            });
            setappointment_list(app)
            console.log(app)
            var clinic_and_appointment=[]
            const distinctClinicNames = [...new Set(app.map(appointment => appointment.clinicName))];
            distinctClinicNames.forEach((element,index)=>{
                var apps=json.appointment.filter(appo=>appo.clinicName===element)
                clinic_and_appointment.push(apps.length)
            })
            
            setappointmentweek({
                distinctClinicNames,
                datasets: clinic_and_appointment})

            
        }else{setappointment_list([])}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}


//get schedule for editing
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
            
            if (json.schedule.length) {
                
                
                const currentDayIndex =new Date().toLocaleDateString('en-US', { weekday: 'long' })
                var scharray=[]
                json.schedule.forEach(
                    s=>{s.availability.forEach(
                        d=>{if(d.day.toLowerCase()===currentDayIndex.toLowerCase()){
                            
                            d.time.forEach(t=>{
                                scharray.push({name:s.name,time:t})
                            })
                            
                        }})})
                
                setschedule(scharray);
               
                } else {
                setschedule([])
                
            } 
            if (json.error) {
                console.log(json.error);
            }

        })

    } catch (err) {
        console.log(err);
    }
}

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
                                <h2 className="tilevalue">{appointment_list.length?appointment_list.length:0}</h2>
                            </div>
                        </div>
                        <div className="summarytilesbloodbank">
                            <img src={PatientsP}></img>
                            <div>
                                <h3 className="tilename">Patients<br/>  in Waiting</h3>
                                <h2 className="tilevalue">{upcoming}</h2>
                            </div>
                        </div>                                
                                                      
                        
                    </div>
                    
                </div>
                <h2 className="booktitledivpharmacy">Schedule for today</h2>
                
                <div className="bookdiv11">
                    <div id="datedisplay"><h2>{Datenow}</h2></div>
                    <div id="scheduledashboard">
                        {schedule.length>0&&
                        <>{
                        schedule.map((i,index)=>{return(<>
                        <div>
                            <h1>{i.name}</h1>
                            <h3  style={{fontFamily:'Fraunces',fontSize:'0.8rem'}}>{i.time}</h3>
                        
                            
                        </div>
                        </>)})}
                        </>
                        }
                        {!schedule.length>0&&
                        <div><h1>No schedule entered for today</h1></div>
                        }
                     
                    </div>
                </div>

                <h2 className="booktitledivpharmacy">Today Appointments</h2>
                
                <div className="bookdiv4">

                    <div id='headpatient' className="patientinfo">
                        <h3>Patients Name</h3>
                        <h3>Venue</h3>
                        <h3>Time</h3>
                    </div>
                    <div id="contentinfopatient">

                    {appointment_list.map((i,index)=>{
                        return(<>
                        <div className="patientinfo patientcontent">
                        <h3>{i.patientName}</h3>
                        <h3>{i.clinicName}</h3>
                        
                        <h3>{i.time}</h3>
                    </div></>)
                    })}

                {
                    !appointment_list.length>0 &&<div className="patientinfo patientcontent">
                    <h3>No appointments for today</h3>
                    
                </div>
                }
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