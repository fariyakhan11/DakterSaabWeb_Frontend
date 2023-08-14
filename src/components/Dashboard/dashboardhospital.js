import React from "react";
import './dashboardhospital.css'
import Sidenavhospital from "../Sidenav/sidenavhospital"
import { useState } from "react";

import {GrHelp} from "react-icons/gr";
import Newsandreports from '../NewsandReports/newsandreports';
import Department from '../Department/department';
import Doctors from '../Doctors/doctors';
import { useEffect } from "react";
import DocDuty from '../../images/doctor1.png'
import Complaints from '../../images/chat.png'
import News from '../../images/newspaper.png'
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
    const currentDate = new Date()
    const [expandedstate,setexpandedstate]=useState(false);
    const [selectedDate, setSelectedDate] = useState(currentDate);
    
    const [tab, settab]=useState('Home');

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
    sessionStorage.setItem('org_name', 'Dow University Hospital');
    sessionStorage.setItem('org_address', 'Gulzar-e-Hijri Gulshan-e-Iqbal, Karachi, Sindh, Pakistan');
},[])
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
                    <div className="depstatsdivtokens">
                        <h1>ENT Department</h1>
                        <div className="depstatsdivtokensdetails">
                        <div></div>
                        <div>
                            <h2>Dr Raza Aftab</h2>
                            <h3><span>Current Token: </span> 4</h3>
                        </div>
                        </div>
                    </div>
                    <div className="depstatsdivtokens">
                        <h1>ENT Department</h1>
                        <div className="depstatsdivtokensdetails">
                        <div></div>
                        <div>
                            <h2>Dr Raza Aftab</h2>
                            <h3><span>Current Token: </span> 4</h3>
                        </div>
                        </div>
                    </div>
                    <div className="depstatsdivtokens">
                        <h1>ENT Department</h1>
                        <div className="depstatsdivtokensdetails">
                        <div></div>
                        <div>
                            <h2>Dr Raza Aftab</h2>
                            <h3><span>Current Token: </span> 4</h3>
                        </div>
                        </div>
                    </div>
                    <div className="depstatsdivtokens">
                        <h1>ENT Department</h1>
                        <div className="depstatsdivtokensdetails">
                        <div></div>
                        <div>
                            <h2>Dr Raza Aftab</h2>
                            <h3><span>Current Token: </span> 4</h3>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="subsec2pharmacy">

                    <div id="docdutystats">
                        <div >
                            <img src={DocDuty}></img>
                            <div>
                                <h4 >Total Doctors </h4>
                                <h2 >20</h2>
                            </div>
                            <div>
                                <h4>Doctors on duty</h4>
                                <h2>5</h2>
                            </div>

                        </div>
                    </div>
                    <div id="doctorsonduty">
                        
                         <Line options={optionsforweekop} data={dataforweekop} className="linechart"/>;
                        
                    </div>
                
                <h2 className="booktitledivhospital"> Complaints News and Requests</h2>
                
                <div className="bookdiv12">
                    <div id="CNRstats">
                        <div className="complaintstats">
                            <img src={Complaints}></img>
                            <div>
                                <h3 >Complaint</h3>
                                <h2 >Broken Roof </h2>
                            </div>
                            <div className="depnamestats">
                                <h4 >ENT Department</h4>
                                <h4 >12/5/2023 7:00PM</h4>
                            </div>
                        </div>
                        <div className="requeststats">
                            <img src={Requests}></img>
                            <div>
                                <h3 >Request</h3>
                                <h2 >Broken Roof </h2>
                            </div>
                            <div className="depnamestats">
                                <h4 >ENT Department</h4>
                                <h4 >12/5/2023 7:00PM</h4>
                            </div>
                        </div>
                        <div className="newstats">
                            <img src={News}></img>
                            <div>
                                <h3 >News</h3>
                                <h2 >Broken Roof </h2>
                            </div>
                            <div className="depnamestats">
                                <h4 >ENT Department</h4>
                                <h4 >12/5/2023 7:00PM</h4>
                            </div>
                        </div>
                        <div className="requeststats">
                            <img src={Requests}></img>
                            <div>
                                <h3 >Request</h3>
                                <h2 >Broken Roof </h2>
                            </div>
                            <div className="depnamestats">
                                <h4 >ENT Department</h4>
                                <h4 >12/5/2023 7:00PM</h4>
                            </div>
                        </div>
                        <div className="newstats">
                            <img src={News}></img>
                            <div>
                                <h3 >News</h3>
                                <h2 >Broken Roof </h2>
                            </div>
                            <div className="depnamestats">
                                <h4 >ENT Department</h4>
                                <h4 >12/5/2023 7:00PM</h4>
                            </div>
                        </div>
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