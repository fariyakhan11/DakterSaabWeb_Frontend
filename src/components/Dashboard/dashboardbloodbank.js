import React from "react";
import './dashboardbloodbank.css'
import Sidenavbloodbank from "../Sidenav/sidenavbloodbank"
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";
import Blood from '../../images/blood.png'
import Profit from '../../images/profits.png'
import { FaBars  } from "react-icons/fa";
import { FiLogOut} from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import {MdSettings } from "react-icons/md";
import {GrHelp,GrNote} from "react-icons/gr";
import BloodGroup from '../../images/bloodgroup.png'
import Notes from "../Notes/notes";
import { useEffect } from "react";
import Transactions from "../Transactions/transactions";
import Bloodgroup from "../BloodGroup/bloodgroup";
import  Alert from '../Alert/alert';
import Week from '../../images/week.png';

function Dashboardbloodbank(){
    const currentDate = new Date()
    const [expandedstate,setexpandedstate]=useState(false);
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [showMenu, setShowMenu] = useState(false);
    const [tab, settab]=useState('Home');
    const [oldtab,setoldtab]=useState('');
    const [overlay,setoverlay]=useState(false)
    const [logoutalert,setlogoutalert]=useState(false)

//dashboard content

    const [statistics,setstatistics]=useState({TodayBloodUnit:0,PopularBloodGroup:'',TodaySales:''})
    const [donors,setdonors]=useState([{donorname:'',contact:'',group:'',lastdate:''}])
    const [stock,setstock]=useState({})
    const [events,setevents]=useState([{name:'',address:'',date:''}])

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
sessionStorage.setItem('org_name', 'ABC BloodBank'); 
sessionStorage.setItem('org_address', 'R 595 sector 8 North Karachi, Karachi');
sessionStorage.setItem('email', 'abcbank@gmail.com'); 
sessionStorage.setItem('phone', '03330249895');  
sessionStorage.setItem('password','********')
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

<Sidenavbloodbank msg={handlestate} />
    <div id="dashboardarea">
        <div className="secondnavbloodbank">
            <div className="admindiv">
            <BiUser  className="icon" onClick={openoverlaytab} id="Profile"/>   
    
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
                <div className="section1">
                    <div className="subsec1">
                        <div className="Summarybar">
                            <h4>Statistics</h4>
                            <div id="statisticsdiv">
                                <div className="summarytilesbloodbank">
                                    <img src={Blood}></img>
                                    <div>
                                        <h3 className="tilename">Today <br/> Blood units sold</h3>
                                        <h2 className="tilevalue">292</h2>
                                    </div>
                                </div>
                                <div className="summarytilesbloodbank">
                                    <img src={Profit}></img>
                                    <div>
                                        <h3 className="tilename">Today <br/> Sales(Rupees)</h3>
                                        <h2 className="tilevalue">20092</h2>
                                    </div>
                                </div>
                                <div className="summarytilesbloodbank">
                                    <img src={Week}></img>
                                    <div>
                                        <h3 className="tilename">This Week<br/> Sales(Rupees)</h3>
                                        <h2 className="tilevalue">8392030</h2>
                                    </div>
                                </div> 
                                <div className="summarytilesbloodbank">
                                    <img src={BloodGroup}></img>
                                    <div>
                                        <h3 className="tilename">Popular<br/> Blood group</h3>
                                        <h2 className="tilevalue">O+</h2>
                                    </div>
                                </div>                                    
                                
                            </div>
                            
                        </div>
                        <h2 className="performacetitle">Performance and Operations</h2>
                        <div className="performancegraphbloodbank">
                        </div>
                    </div>
                    <div className="subsec2bloodbank">
                        <h2 className="booktitledivbloodbank">Blood Donors</h2>

                        <div className="bookdiv">
                            <div id='headdonor' className="donorinfo">
                                <h3>Donor Name</h3>
                                <h3>Blood Group</h3>
                                <h3>Last Donated</h3>
                                <h3>Contact</h3>
                            </div>
                            <div id="contentinfodonor">
                                <div className="donorinfo donorcontent">
                                    <h3>Alishba Arshad</h3>
                                    <h3>O+</h3>
                                    <h3>14/09/2023</h3>
                                    <h3>03330249895</h3>
                                </div>
                                <div className="donorinfo donorcontent">
                                    <h3>Alishba Arshad</h3>
                                    <h3>O+</h3>
                                    <h3>14/09/2023</h3>
                                    <h3>03330249895</h3>
                                </div>
                            </div>
                        </div>
                        <div id='bottomcontentbloodbank'>
                        <div className="section2subbloodbank">
                            <h2 className="booktitledivbloodbank">Stock</h2>
                            <div id="stockdiv">
                                <div id="stockhead">
                                    <h3>Blood Group</h3>
                                    <h3>Quantity</h3>
                                </div>
                                <div id="stockcontent">
                                    <h3>A+</h3>
                                    <h3></h3>
                                </div>
                                <div id="stockcontent">
                                    <h3>B+</h3>
                                    <h3></h3>
                                </div>
                                <div id="stockcontent">
                                    <h3>O+</h3>
                                    <h3></h3>
                                </div>
                                <div id="stockcontent">
                                    <h3>AB+</h3>
                                    <h3></h3>
                                </div>
                                <div id="stockcontent">
                                    <h3>A-</h3>
                                    <h3></h3>
                                </div>
                                <div id="stockcontent">
                                    <h3>A-</h3>
                                    <h3></h3>
                                </div>
                                <div id="stockcontent">
                                    <h3>A-</h3>
                                    <h3></h3>
                                </div>
                                <div id="stockcontent">
                                    <h3>A-</h3>
                                    <h3></h3>
                                </div>
                            </div>
                        </div>
                        <div className="section2subbloodbank">
                            <h2 className="booktitledivbloodbank">Upcoming Events</h2>
                            <div id="eventsdiv">
                                <ul>
                                    <li>
                                        <div className="eventinfo">
                                            <h5>14/05/2020</h5>
                                            <h3>Asghari Medical Camp</h3>
                                            <h4>Sector 8 ground North Karachi ,Karachi</h4>
                                            
                                        </div>

                                    </li>
                                    <li>
                                        <div className="eventinfo">
                                            <h5>14/05/2020</h5>
                                            <h3>Asghari Medical Camp</h3>
                                            <h4>Sector 8 ground North Karachi ,Karachi</h4>
                                            
                                        </div>

                                    </li>
                                </ul>

                            </div>
                        </div>
                        </div>
                    </div>
                </div>

            </>
}
{(tab==='Transactions')&&
<Transactions stock="Blood Groups" class="blood"/>
}
{(tab==='Blood')&&
<Bloodgroup/>
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
export default Dashboardbloodbank;