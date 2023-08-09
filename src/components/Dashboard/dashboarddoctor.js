import React from "react";
import './dashboarddoctor.css'
import Sidenavdoctor from "../Sidenav/sidenavdoctor"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";
import { FaBars  } from "react-icons/fa";
import { FiLogOut} from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import {MdSettings } from "react-icons/md";
import {GrHelp,GrNote} from "react-icons/gr";
import Profiledoctor from "../Profile/profiledoctor";
import Appointments from "../Appointments/appointments";
import Schedule from "../Schedule/schedule";
import Notes from "../Notes/notes";
import { useEffect } from "react";
import Alert from "../Alert/alert";
import PatientsP from '../../images/waiting-room.png'
import PatientsPrev from '../../images/patient.png'
import PatientsT from '../../images/user.png'
import PatientsN from '../../images/doctor-visit.png'
import WorkHours from '../../images/working-time.png'
import PatientU from '../../images/examination.png'
import EventU from '../../images/calendar.png'

function Dashboarddoctor(){
    const currentDate = new Date()
    const [expandedstate,setexpandedstate]=useState(false);
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [showMenu, setShowMenu] = useState(false);
    const [tab, settab]=useState('Home');
    const [oldtab,setoldtab]=useState('');
    const [overlay,setoverlay]=useState(false)
    const [logoutalert,setlogoutalert]=useState(false)
    const [Datenow,setDatenow]=useState()
//navigate between tabs from the sidenav clicks and transitions
    const handlestate=(msg)=>{
        if(!overlay){
        settab(msg.tab)}
        
        setexpandedstate(msg.expanded)
    }

//handle dashboards display from the overlay tab nav clicks and transitions
    const handletopstates=(overtab)=>{

        if(!overtab){
        document.getElementById(tab).classList.remove('active-overlaypharmacy')
        settab(oldtab);
        setoldtab('');
        setoverlay(!overlay)
        }
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
const myArray = [
  { fees: 250, name: "Aga Khan",address:"National Stadium Rd, Aga Khan University Hospital, Karachi, Karachi City, Sindh" },
  { fees: 150, name: "Mehmooda Clinic" ,address:'R 56 sector 11 north nazimabad karachi , Karachi' },

];
const jsonString = JSON.stringify(myArray);
sessionStorage.setItem('org_name', 'Alishba Arshad'); 
sessionStorage.setItem('email', 'alishba@gmail.com'); 
sessionStorage.setItem('phone', '03313423501');  
sessionStorage.setItem('hospital',jsonString)
sessionStorage.setItem('password','********')
// Get the day information for each date
const options = { weekday: 'long' };

var DN=new Date();
DN=DN.getDate()+'/'+DN.getMonth()+'/'+DN.getFullYear()+" "+DN.toLocaleDateString('en-US', options)
setDatenow(DN) 
},[])

function openoverlaytab(e){
    
    if(e.target.id===tab||oldtab===''){
       setoverlay(!overlay)     
        if(!overlay){
            e.target.classList.add('active-overlaypharmacy')
            setoldtab(tab);
            settab(e.target.id);
        }else{
            e.target.classList.remove('active-overlaypharmacy')
            settab(oldtab);    
            setoldtab('');
        }
    }else{
        document.getElementById(tab).classList.remove('active-overlaypharmacy')
        settab(e.target.id)
        e.target.classList.add('active-overlaypharmacy')
    }
}

useEffect(()=>{
// Get the day information for each date
const options = { weekday: 'long' };

var DN=new Date();
DN=DN.getDate()+'/'+DN.getMonth()+'/'+DN.getFullYear()+" "+DN.toLocaleDateString('en-US', options)
setDatenow(DN) 
},[Date()])
return(

<>
{logoutalert&&
<Alert alert="Are you sure you want to logout?" />
}
<div id="dashboardcontainer">

<Sidenavdoctor msg={handlestate} />
<div id="dashboardarea">
    <div className="secondnavdoctor">
        <div className="admindiv">
        <BiUser  className="icon"  onClick={openoverlaytab} id="Profile"/>   
   
        <h2  className='adminname' onClick={openoverlaytab} id="Profile">Hi Alishba !</h2>
        </div>
        <div className="links">
        <button
          className="navbar-toggler"
          onClick={() => setShowMenu(!showMenu)}
        >
          <FaBars />
        </button>
        <ul className={showMenu ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item ">
            
              <GrNote className="icon " id="Notes" onClick={openoverlaytab}/>
            
          </li>
          <li className="nav-item">
           
              <GrHelp className="icon" id='Help' onClick={openoverlaytab}/>
            
          </li>

          <li className="nav-item">
            
              <FiLogOut className="icon" id='Logout' onClick={()=>{setlogoutalert(true)}}/>
            
          </li>
        </ul>
        </div>
    </div>
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
                    <div className="performancegraphsubdoctor">
                        <h3>Confirmed Diagnosis</h3>
                    </div>
                </div>
        <div className="section2doctor">
            <div className="section2subdoctor" >
                <h2 className="booktitledivpharmacy">Upcoming Patient</h2>
                <div id="upcomingpatient">
                    <div className="patientcominghead">
                        <img src={PatientU}></img>
                        <div>
                        <h4>Aliza Arshad</h4>
                        <h5>alizaarshad@gmail.com</h5>                            
                        </div>
                    </div>
                    <h4><span>Venue: </span>ABC Clinic</h4>
                    <h4><span>Time Slot: </span>9:00 AM</h4>
                </div>
            </div>
            <div className="section2subdoctor" >
                <h2 className="booktitledivpharmacy">Previous Patient</h2>
                <div id="prevpatient">
                    <div className="patientcominghead">
                        <img src={PatientsPrev}></img>
                        <div>
                        <h4>Aliza Arshad</h4>
                        <h5>alizaarshad@gmail.com</h5>                            
                        </div>
                    </div>
                    <h4><span>Venue: </span>ABC Clinic</h4>
                    <h4><span>Time Slot: </span>9:00 AM</h4>
                    <h4><span>Illness: </span>Fever , Runny Nose</h4>
                    <h4><span>Diagnosis: </span>Viral Flu</h4>
                </div>
            </div>



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


{(tab==='Notes') && 
<Notes overtab={handletopstates}/>

}
</div>
</div>
</div>
</>
)
}
export default Dashboarddoctor;