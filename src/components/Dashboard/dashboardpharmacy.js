import React from "react";
import './dashboardpharmacy.css'
import Sidenavpharmacy from "../Sidenav/sidenavpharmacy"
import { useState } from "react";
import { FaBars  } from "react-icons/fa";
import { FiLogOut} from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import {MdSettings } from "react-icons/md";
import {GrHelp,GrNote} from "react-icons/gr";
import Medicines from "../Medicines/medicines";
import Notes from "../Notes/notes";
import { useEffect } from "react";
import Orders from "../Orders/orders";
import Transactions from "../Transactions/transactions";
import  Alert from '../Alert/alert';
import Profit from '../../images/profits.png'
import Med from '../../images/drugs1.png';
import MedP from '../../images/medicine.png';
import Week from '../../images/week.png';
import OrdersI from '../../images/order (1).png'
import OrdersP from '../../images/box.png'
import Trans from '../../images/card-payment.png'

function Dashboardpharmacy(){
    const currentDate = new Date()
    const [expandedstate,setexpandedstate]=useState(false)
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [showMenu, setShowMenu] = useState(false);
    const [tab, settab]=useState('Home');
    const [oldtab,setoldtab]=useState('');
    const [overlay,setoverlay]=useState(false);
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
sessionStorage.setItem('org_name', 'ABC Pharma'); 
sessionStorage.setItem('org_address', 'R 143 sector 9 North Karachi, Karachi');
sessionStorage.setItem('email', 'abcpharmacy@gmail.com'); 
sessionStorage.setItem('phone', '03232626789');  
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

<Sidenavpharmacy msg={handlestate} />

<div id="dashboardarea">
    <div className="secondnavpharmacy">
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
                                    <img src={Med}></img>
                                    <div>
                                        <h3 className="tilename">Today <br/> Medicines sold</h3>
                                        <h2 className="tilevalue">292</h2>
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
                                    <img src={Profit}></img>
                                    <div>
                                        <h3 className="tilename">Today <br/> Sales(Rupees)</h3>
                                        <h2 className="tilevalue">20092</h2>
                                    </div>
                                </div>
                                      
                                
                            </div>
                            <div id="statisticsdiv">
                                <div className="summarytilesbloodbank">
                                    <img src={OrdersI}></img>
                                    <div>
                                        <h3 className="tilename">Total <br/>Orders</h3>
                                        <h2 className="tilevalue">292</h2>
                                    </div>
                                </div>
                                <div className="summarytilesbloodbank">
                                    <img src={OrdersP}></img>
                                    <div>
                                        <h3 className="tilename">Orders <br/>Pending </h3>
                                        <h2 className="tilevalue">8392030</h2>
                                    </div>
                                </div> 
                                <div className="summarytilesbloodbank">
                                    <img src={MedP}></img>
                                    <div>
                                        <h3 className="tilename">Popular<br/> Medicine</h3>
                                        <h2 className="tilevalue">O+</h2>
                                    </div>
                                </div>
                                      
                                
                            </div>
                            
                        </div>
                <div className="performancegraphpharmacy">
                </div>
            </div>
            <div className="subsec2pharmacy">
                
                <h2 className="booktitledivpharmacy">Medicines booking</h2>
                <div id="colorcodeboxes"><div id="pendingbox"></div><h2>Pending</h2><div id="filledbox"></div><h2>Fulfilled</h2></div>                
                <div className="bookdiv2">

                    <div id='headpharmacy' className="pharmacyinfo">
                        <h3>Customer Name</h3>
                        <h3>Amount</h3>
                        <h3>Item</h3>
                        <h3>Quantity</h3>
                    </div>
                    <div id="contentinfopharmacy">
                        <div className="pharmacyinfo pharmacycontent">
                            <h3>Alishba Arshad</h3>
                            <h3>Rs 178</h3>
                            <h3>Panadol<br/>Augmentin</h3>
                            <h3>5 <br/>2</h3>
                        </div>
                        <div className="pharmacyinfo pharmacycontent">
                            <h3>Alishba Arshad</h3>
                            <h3>Rs 178</h3>
                            <h3>Panadol<br/>Augmentin</h3>
                            <h3>5 <br/>2</h3>
                        </div>
                    </div>

                </div>
                <h2 className="booktitledivpharmacy">Last Transaction</h2>
                <div className="bookdiv3">
                    <div>
                        <div>
                            <img src={Trans}></img>
                            <div>
                                <h2>Alishba Arshad</h2>
                                <h3>15/05/2023 12:20 PM</h3>
                                <h4>Rs 150</h4>
                            </div>
                        </div>
                        <div>
                            <div><h5>Panadol</h5><h5>3</h5></div>
                            <div><h5>Augmentin</h5><h5>2</h5></div>

                        </div>
                    </div>
                </div>
                <h2 className="booktitledivpharmacy">Low Inventory</h2>
                <div className="bookdiv5">
                    <div id='headinventory'>
                        <h3>Medicine Name</h3>
                        <h3>Quantity</h3>

                    </div>
                    <div id="inventorycontentdiv">
                        <div className="inventorycontent">
                            <h6>Panadol</h6>
                            <h6>3</h6>
                        </div>
                        <div className="inventorycontent">
                            <h6>Panadol</h6>
                            <h6>3</h6>
                        </div>
                        <div className="inventorycontent">
                            <h6>Panadol</h6>
                            <h6>3</h6>
                        </div>
                    </div>
                </div>
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
<Transactions stock="Medicine" class="pharmacy"/>
}

{(tab==='Orders') && 
<Orders></Orders>
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

export default Dashboardpharmacy;