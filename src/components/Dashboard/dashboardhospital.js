import React from "react";
import './dashboardhospital.css'
import Sidenavhospital from "../Sidenav/sidenavhospital"
import { useState } from "react";


import Newsandreports from '../NewsandReports/newsandreports';
import Department from '../Department/department';
import Doctors from '../Doctors/doctors';
import { useEffect } from "react";
import DocDuty from '../../images/doctor1.png'
import Complaints from '../../images/chat.png'
import Requests from '../../images/request.png'
import Profilehospital from "../Profile/profilehospital";
import { Chart as ChartJS, ArcElement,Title, Tooltip,    CategoryScale,
    LinearScale,    PointElement,
    LineElement,
    BarElement, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
  );

function Dashboardhospital(){

    const [expandedstate,setexpandedstate]=useState(false);

    const [doctor_total, setdoctor_total] = useState(0);
    const [doctor_on_duty, setdoctor_on_duty] = useState(0);
    const [doctorlist, setdoctorlist] = useState([]);
    const [tab, settab]=useState('Home');

    const [department_list,setdepartment_list]=useState([]);
    
    const [CNRlist,setCNRlist]=useState([]);
    const labelsweek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const dataforweekop = {
    labels: labelsweek, // Moved labels to the data object
    datasets: [
      {
        label: 'Week 1',
        data: [10, 79, 25, 25, 32, 1, 45],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Week 2',
        data: [4, 47, 23, 56, 5, 61, 15],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const optionsforweekop = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Patients over the week',
      },
    },
  };
    const labels = ['Neurology', 'Oncology', 'Gynecology', 'ENT', 'Cardiology', 'Pulmonology'];
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' ,
        },

    }}
    const[departmentop,setdepartmentop]=useState({
        labels,
        datasets: [
            {
              label: 'Doctors',
              data: [15, 2, 11, 7, 0, 3,2],
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Patients',
                data: [9, 18, 0, 0, 5, 10,4],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
              
          ],}
      )

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
    sessionStorage.setItem('org_name', 'Patel Hospital');
    sessionStorage.setItem('org_address', 'ST-18, Block 4 Gulshan-e-Iqbal, Karachi, Sindh, Pakistan');
},[])

useEffect(()=>{
    if(tab==='Home'){
        
        fetchdoctors()
   
        fetchdepartments()
        fetchforms()
    }
},[tab])

//fetch orders from the database
function fetchforms(){
    try{
        const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
        const api='http://localhost:5000/api/hospital/getforms/'+params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()) // get response, convert to json
        .then((json) => {
        if(json.forms){
            console.log(json.forms)
          setCNRlist(json.forms);
        
        }else{
            setCNRlist([])}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}



//fetch doctors from the database
function fetchdoctors(){
    try{
        const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
        const api='http://localhost:5000/api/hospital/getdoctors/'+params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()) // get response, convert to json
        .then((json) => {
        if(json.doctors){
        setdoctorlist(json.doctors)
          setdoctor_total(json.doctors.length)
        }else{setdoctor_total(0)}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}

function filternowdoctor(doctorsArray){
    const now = new Date();
const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
const currentTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

    const availableDoctors = doctorsArray.filter(doctor => {
    const availability = doctor.availability.find(slot => slot.day === currentDay);
    if (availability) {
        const [startHour, startMinute] = availability.time[0].split(':');
        const [currentHour, currentMinute] = currentTime.split(':');
        const startTimestamp = parseInt(startHour) * 60 + parseInt(startMinute);
        const currentTimestamp = parseInt(currentHour) * 60 + parseInt(currentMinute);

        return currentTimestamp >= startTimestamp;
    }
    return false;
});
    return availableDoctors
}

useEffect(()=>{
    const availableDoctors=filternowdoctor(doctorlist)
    console.log('Available Doctors:', availableDoctors.length);

    setdoctor_on_duty(availableDoctors)
},[doctorlist])

//fetch departments from the database
function fetchdepartments(){
    try{
        const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
        const api='http://localhost:5000/api/hospital/getdeptdetail/'+params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()) // get response, convert to json
        .then((json) => {
        if(json.department){
          setdepartment_list(json.department);
          
        }else{setdepartment_list([])}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}

return(

<>
<div id="dashboardcontainer">

<Sidenavhospital msg={handlestate} />
<div id="dashboardarea">

        <div className="infoareadashboard">
{(tab==='Home') && 
      <>
        <div className="section1">
            <div className="subsec1">

                <h2 className="booktitledivpharmacy">Departmental Overview</h2>
                <div className="performancegraphhospital">
                    <Bar options={options} data={departmentop} />
                </div>
                
                <div className="bookdiv7">
                    {department_list.map((d,dind)=>{
                        return(
                        <div className="depstatsdivtokens">
                            
                                <h1>{d.name+ ' Department'}</h1>
                                <div className="depstatsdivtokensdetails">
                                <div></div>
                                <div style={{display:'flex',flexDirection:'column'}}>
                        {doctor_on_duty.map((i,index)=>{return(<>

                        
                        {i.Department===d.name&&
                        <div>
                            <h2>{i.Name}</h2>
                            
                        </div>
                        }

                        </>)})}
                        {!doctor_on_duty.filter(f=>f.Department===d.name).length>0&&
                        <div>
                        <h2>No doctors on duty</h2>
                        
                    </div>
                        }
                        </div>
                        </div>
                    </div>
                        )})}

                  
                </div>
            </div>
            <div className="subsec2pharmacy">

                    <div id="docdutystats">
                        <div >
                            <img src={DocDuty}></img>
                            <div>
                                <h4 >Total Doctors </h4>
                                <h2 >{doctor_total}</h2>
                            </div>
                            <div>
                                <h4>Doctors on duty</h4>
                                <h2>{doctor_on_duty.length?doctor_on_duty.length:0}</h2>
                            </div>

                        </div>
                    </div>
                    <div id="doctorsonduty">
                        
                         <Line options={optionsforweekop} data={dataforweekop} className="linechart"/>;
                        
                    </div>
                
                <h2 className="booktitledivhospital"> Complaints News and Requests</h2>
                
                <div className="bookdiv12">
                    <div id="CNRstats">
                        
                    {CNRlist.map((i,index)=>{return(
                                        <div className={i.form_type=='Complaint'?"complaintstats":'requeststats'} id={index}  >
                                            <img src={i.form_type=='Complaint'?Complaints:Requests}id={index}></img>
                                            <div id={index}>
                                                <h3 id={index} >{i.form_type}</h3>
                                                <h2 id={index} >{i.form_title}</h2>
                                            </div>
                                            <div className="depnamestats" id={index}>
                                                <h4 id={index}>{i.form_department}</h4>
                                                <h4 id={index}>{i.form_date}</h4>
                                                <h4 id={index}>{i.entree_name}</h4>
                                            </div>
                                        </div>
)})} {
    CNRlist.length<1&&<>
    <h2 style={{textAlign:'center',width:'100%',fontFamily:'Fraunces',fontSize:'0.8rem',marginTop:'1rem'}}>No Forms to display</h2>
    </>
}

                    </div>

                </div>
            </div>
        </div>

      </>
}
{(tab==='Departments')&&
<Department/>
}
{(tab==='Profile')&&
<Profilehospital/>
}
{(tab==='Doctors')&&
<Doctors/>
}
{(tab==='News')&&
<Newsandreports/>
}

</div>

</div>
</div>
</>
)
}
export default Dashboardhospital;