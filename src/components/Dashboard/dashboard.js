import React from "react";
import './dashboard.css'
import Navbar from "../Navbar/navbar";
import Sidenav from "../Sidenav/sidenav"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";
import { FaBars  } from "react-icons/fa";
import { FiLogOut} from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import {MdSettings } from "react-icons/md";
import {GrHelp,GrNote} from "react-icons/gr";
import Medicines from "../Medicines/medicines";
import Notes from "../Notes/notes";
import { useEffect } from "react";



function Dashboard(){
    const currentDate = new Date()
    const [expandedstate,setexpandedstate]=useState(false)
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [showMenu, setShowMenu] = useState(false);
    const [tab, settab]=useState('Notes');

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



return(
<>
<Navbar/>
<div id="dashboardcontainer">

<Sidenav msg={handlestate} />

<div id="dashboardarea">
    <div className="secondnav">
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
          <li className="nav-item">
            
              <GrNote className="icon" onClick={()=>{settab('Notes')}}/>
            
          </li>
          <li className="nav-item">
           
              <GrHelp className="icon" onClick={()=>{settab('Help')}}/>
            
          </li>
          <li className="nav-item">
            
              <MdSettings className="icon" onClick={()=>{settab('Settings')}}/>
            
          </li>
          <li className="nav-item">
            
              <FiLogOut className="icon" onClick={()=>{settab('Logout')}}/>
            
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
                    <div className="summarytiles">
                        <h3 className="tilename">Total <br/> Medicines sold</h3>
                        <h2 className="tilevalue">288292</h2>
                    </div>
                    <div className="summarytiles">
                        <h3 className="tilename">Medicines sold today</h3>
                        <h2 className="tilevalue">4698</h2>
                    </div>
                    <div className="summarytiles">
                        <h3 className="tilename">Booked <br/>Medicines </h3>
                        <h2 className="tilevalue">288</h2>
                    </div>
                    <div className="summarytiles">
                        <h3 className="tilename">Today's <br/> Sales </h3>
                        <h2 className="tilevalue">RS 52808</h2>
                    </div>
                </div>
                <div className="performancegraph">
                </div>
            </div>
            <div className="subsec2">
                <div className="DateSelector">  
                    <h6>Date: </h6>
                    <DatePicker className="calendar-container"
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                    />
                </div>
                <hr/>
                <div className="sidepanel"></div>
                <h2 className="booktitlediv">Medicines booking</h2>
                <hr/>
                <div className="bookdiv"></div>
            </div>
        </div>
        <div className="section2">
            <div className="section2sub" style={{borderBottomLeftRadius:'2em'}}>
                <h2 className="booktitlediv">Popular Medicines</h2>
            </div>
            <div className="section2sub">
                <h2 className="booktitlediv">Low Stock</h2>
            </div>
            <div className="section2sub">
                <h2 className="booktitlediv">Last Transaction</h2>
            </div>
            <div className="section2sub" style={{borderBottomRightRadius:'2em'}}>
                <h2 className="booktitlediv">Notes</h2>
            </div>
        </div>
      </>
}


{(tab==='Medicines') && 
      <>
<Medicines/>
      </>
}



{(tab==='Transactions') && 
      <>
<h1>Transactions</h1>
      </>
}

{(tab==='Orders') && 
      <>
<h1>Orders</h1>
      </>
}

{(tab==='Notes') && 
      <>
<Notes/>
      </>

}



    </div>

</div>
</div>
</>
)
}

export default Dashboard;