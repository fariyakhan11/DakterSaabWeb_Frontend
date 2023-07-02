import React from "react";
import './dashboardhospital.css'
import Sidenavhospital from "../Sidenav/sidenavhospital"
import { useState } from "react";
import { FaBars  } from "react-icons/fa";
import { FiLogOut} from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import {MdSettings } from "react-icons/md";
import {GrHelp,GrNote} from "react-icons/gr";
import Newsandreports from '../NewsandReports/newsandreports';
import Department from '../Department/department';
import Doctors from '../Doctors/doctors';
import Notes from "../Notes/notes";
import { useEffect } from "react";
import Alert from "../Alert/alert";
import AdmitPatient from '../../images/hospitalisation.png'
import PatientsP from '../../images/waiting-room.png'
import DocDuty from '../../images/doctor1.png'
import PatientsT from '../../images/user.png'
import Complaints from '../../images/chat.png'
import News from '../../images/newspaper.png'
import Requests from '../../images/request.png'
import EventU from '../../images/calendar.png'


function Dashboardhospital(){
    const currentDate = new Date()
    const [expandedstate,setexpandedstate]=useState(false);
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [showMenu, setShowMenu] = useState(false);
    const [tab, settab]=useState('Home');
    const [oldtab,setoldtab]=useState('');
    const [overlay,setoverlay]=useState(false)
    const [logoutalert,setlogoutalert]=useState(false)
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
sessionStorage.setItem('org_name', 'ABC Hospital'); 
sessionStorage.setItem('org_address', 'R 143 sector 9 North Karachi, Karachi');
sessionStorage.setItem('email', 'abchospital@gmail.com'); 
sessionStorage.setItem('phone', '03232626589');  
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
return(

<>

{logoutalert&&
<Alert alert="Are you sure you want to logout?" />
}
<div id="dashboardcontainer">

<Sidenavhospital msg={handlestate} />
<div id="dashboardarea">
    <div className="secondnavhospital">
        <div className="admindiv">
        <BiUser  className="icon" />   
   
        <h2  className='adminname'>Hi Alishba !</h2>
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
            
              <MdSettings className="icon" id='Settings' onClick={openoverlaytab}/>
            
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
        <div className="section1">
            <div className="subsec1">
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
                            <img src={AdmitPatient}></img>
                            <div>
                                <h3 className="tilename">Admitted<br/>Patients</h3>
                                <h2 className="tilevalue">92</h2>
                            </div>
                        </div>                                 
                                
                        
                    </div>
                    
                </div>
                <h2 className="booktitledivpharmacy">Departmental Overview</h2>
                <div className="performancegraphhospital">

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

                
                <h2 className="booktitledivhospital"> Doctors on Duty</h2>
                
                
                    <div id="docdutystats">
                        <div >
                            <img src={DocDuty}></img>
                            <div>
                                <h4 >Total Doctors </h4>
                                <h2 >20</h2>
                            </div>
                            <div>
                                <h4>Senior Doctor</h4>
                                <h2>5</h2>
                            </div>
                            <div>
                                <h4>Surgeons</h4>
                                <h2>3</h2>
                            </div>
                        </div>
                    </div>
                    <div id="doctorsonduty">
                        <div className="dod">
                            
                        </div>
                    </div>
                
                <h2 className="booktitledivhospital"> Complaints News and Requests</h2>
                
                <div className="bookdiv6">
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
{(tab==='Doctors')&&
<Doctors/>
}
{(tab==='News')&&
<Newsandreports/>
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
export default Dashboardhospital;