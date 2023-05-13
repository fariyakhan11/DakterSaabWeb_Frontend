import React from "react";
import './sidenav.css'
import PharmP from '../../images/drugs1.png'
import {AiOutlineHome} from "react-icons/ai";
import {GiMedicines} from "react-icons/gi";
import {FiPackage} from "react-icons/fi";
import {BiPurchaseTag,BiExpand,BiCollapse} from "react-icons/bi";
import { useState ,useEffect} from "react";


function Sidenav({expandedmsg }){
    const [expanded,setexpanded]=useState(false);
    const [tabb,settab]=useState('Home');

    const expandhandler=()=>{
        if(expanded){
            setexpanded(false)
            expandedmsg(false)
        }
        else{
            setexpanded(true)
            expandedmsg(true)
        }
    }

    const activehandler=(e)=>{
        let active=document.getElementsByClassName('tabscollapsed')
        if(active){
            active.classList.remove('tabdiv-active')
        }
        if (!e.target.classList.contains("tabsicon")){e.target.classList.add('tabdiv-active')}
        else{e.target.parentNode.classList.add('tabdiv-active');}
        
    }    
return(
<>
{expanded &&
<div id="sidenavcontainer">
    <div className="organizationLogo">
        <img className="orglogo" src={PharmP}></img>
        <h3 className="orgname">ABC Pharma</h3>
        <p>03302777040</p>
        <p>R145 sector 7 North Karachi , Karachi</p>
        <p>abcpharma@gmail.com</p>
    </div>
    
    <div className="tabscontainer">
        <div className="tabsdiv"  onClick={()=>{settab('Home')}}>
            <AiOutlineHome className="tabsicon"/>
            <h4 className="tabsname">Home</h4>
        </div>
        <div className="tabsdiv"  onClick={()=>{settab('Transactions')}}>
            <BiPurchaseTag className="tabsicon"/>
            <h4 className="tabsname">Transactions</h4>
        </div>
        <div className="tabsdiv"  onClick={()=>{settab('Orders')}}>
            <FiPackage className="tabsicon"/>
            <h4 className="tabsname">Orders</h4>
        </div>
 
        <div className="tabsdiv"  onClick={()=>{settab('Medicine')}}>
            <GiMedicines className="tabsicon"/>
            <h4 className="tabsname">Medicines</h4>
        </div>
    </div>

<BiCollapse id="collapsebtn" onClick={expandhandler}/>
</div>
 }
{!expanded && 
<div id="sidecollapsedcontainer">
<img className="orglogo" src={PharmP}></img>
<div className="tabsrow">
<div className="tabscollapsed" onClick={activehandler}>
<AiOutlineHome className="tabsicon" />
</div>
<div className="tabscollapsed" onClick={activehandler}>
<BiPurchaseTag className="tabsicon"/>
</div>
<div className="tabscollapsed" onClick={activehandler}>
 <FiPackage className="tabsicon"/>
</div>
<div className="tabscollapsed" onClick={activehandler}>
<GiMedicines className="tabsicon"/>
</div>
</div>

<BiExpand id="expandbtn" onClick={expandhandler}/>
</div>
}



</>
)
}

export default Sidenav;