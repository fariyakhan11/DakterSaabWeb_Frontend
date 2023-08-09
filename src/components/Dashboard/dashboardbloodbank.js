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
import Profilebloodbank from '../Profile/profilebloodbank'
import Donor from "../Donor/donor";

function Dashboardbloodbank(){
    const currentDate = new Date()
    const [expandedstate,setexpandedstate]=useState(false);
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [showMenu, setShowMenu] = useState(false);
    const [tab, settab]=useState('Home');
    const [oldtab,setoldtab]=useState('');
    const [overlay,setoverlay]=useState(false)
    const [logoutalert,setlogoutalert]=useState(false)
    const [last_transact,setlast_transact]=useState();

//dashboard content

    const [statistics,setstatistics]=useState({todayblood:'',weeksale:'',todaysale:'',popblood:''})
    const [donors,setdonors]=useState([{donorname:'',contact:'',group:'',lastdate:''}])
    const [bloodgroup_list,setbloodgroup_list]=useState([])

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

useEffect(()=>{
    if(tab==='Home'){
        fetchblood()
        fetchstats()
        fetchlasttransact()
    }

},[tab])

//fetch last stored transaction
function fetchlasttransact(){
    try{
        const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
        const api='http://localhost:5000/api/transactionandorder/getlasttransact/'+params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()) // get response, convert to json
        .then((json) => {
        if(json.transaction){
          setlast_transact(json.transaction);
        }else{setlast_transact();}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}

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

function fetchstats(){
try{
        const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
        const api='http://localhost:5000/api/bloodbank/stats/'+params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()) // get response, convert to json
        .then((json) => {

            setstatistics({todayblood:json.item_sold_today,weeksale:json.transac_amount_week,todaysale:json.transac_amount_today,popblood:(json.popular_blood!=''||json.popular_blood!=null)?json.popular_blood:'-'})
        
      });
    }catch(err){
      console.log(err)
    }
}

//fetch blood groups from the database
function fetchblood(){
    try{
        const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
        const api='http://localhost:5000/api/bloodbank/getblood/'+params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()) // get response, convert to json
        .then((json) => {
        if(json.bloodgroups){
          
          setbloodgroup_list(json.bloodgroups);
        }else{setbloodgroup_list([])}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
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
                                        <h2 className="tilevalue">{statistics.todayblood}</h2>
                                    </div>
                                </div>
                                <div className="summarytilesbloodbank">
                                    <img src={Profit}></img>
                                    <div>
                                        <h3 className="tilename">Today <br/> Sales(Rupees)</h3>
                                        <h2 className="tilevalue">{statistics.todaysale}</h2>
                                    </div>
                                </div>
                                <div className="summarytilesbloodbank">
                                    <img src={Week}></img>
                                    <div>
                                        <h3 className="tilename">This Week<br/> Sales(Rupees)</h3>
                                        <h2 className="tilevalue">{statistics.weeksale}</h2>
                                    </div>
                                </div> 
                                <div className="summarytilesbloodbank">
                                    <img src={BloodGroup}></img>
                                    <div>
                                        <h3 className="tilename">Popular<br/> Blood group</h3>
                                        <h2 className="tilevalue">{statistics.popblood}</h2>
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
{bloodgroup_list.map((i,ind)=>{return(<>
                                <div id="stockcontent">
                                    <h3>{i.AvailableBloodGroup}</h3>
                                    <h3>{i.quantity}</h3>
                                </div>

</>)})}
                            </div>
                        </div>
                        <div className="section2subbloodbank">
                            <h2 className="booktitledivbloodbank">Last Transaction</h2>
                            <div id="eventsdiv">

                                <h5>{last_transact.date}</h5>
                                <h3>{last_transact.buyer_name}</h3>
                                
                                <h4>Rs {last_transact.amount}</h4>
                                <div id="itemblooddiv">

                                    <div><h5>Item</h5><h5>Quantity</h5></div>
{last_transact.items.map((i,index)=>{return(<>
                                    <div><h5>{i.name}</h5><h5>{i.quantity}</h5></div>
</>)})}
           
                                </div>
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
{(tab==='Donor')&&
<Donor/>
}
{(tab==='Profile')&&
<Profilebloodbank/>
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