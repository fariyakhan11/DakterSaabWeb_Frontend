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


function Dashboardhospital(){
    const currentDate = new Date()
    const [expandedstate,setexpandedstate]=useState(false);
    const [selectedDate, setSelectedDate] = useState(currentDate);
    
    const [tab, settab]=useState('Home');

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
sessionStorage.setItem('org_name', 'ABC Hospital'); 
sessionStorage.setItem('org_address', 'R 143 sector 9 North Karachi, Karachi');
sessionStorage.setItem('email', 'abchospital@gmail.com'); 
sessionStorage.setItem('password','********')
sessionStorage.setItem('phone', '03232626589');  
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