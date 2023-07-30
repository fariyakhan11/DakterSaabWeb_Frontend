import React from "react";
import './sidenavbloodbank.css'
import BloodP from '../../images/blood1.png'
import {AiOutlineHome} from "react-icons/ai";
import {BiPurchaseTag,BiExpand,BiCollapse} from "react-icons/bi";
import { useState ,useEffect} from "react";
import {GrTransaction} from "react-icons/gr";
import {BsPeople} from "react-icons/bs";
import {MdOutlineBloodtype} from "react-icons/md";

function Sidenavbloodbank({msg }){
    const [expanded,setexpanded]=useState(true);
    
    useEffect(() => {
        sessionStorage.setItem('current_tab', 'Home');
        let elements=document.querySelectorAll('Home');
        elements.forEach(e => {
            e.classList.add('selectedtab');
        });
        msg({expanded:expanded,tab:sessionStorage.getItem('current_tab')})
    },[])

    useEffect(()=>{
        let select_tab="."+sessionStorage.getItem('current_tab')
        let sel=document.querySelectorAll(select_tab);
        sel.forEach(s => {
            s.classList.add('selectedtab');
        });
        msg({expanded:expanded,tab:sessionStorage.getItem('current_tab')})
    })

    const expandhandler=()=>{
        if(expanded){
            setexpanded(false)
            msg({expanded:false,tab:sessionStorage.getItem('current_tab')})

        }
        else{
            setexpanded(true)
            msg({expanded:true,tab:sessionStorage.getItem('current_tab')})
        }
    }

    const selectedtab=(e)=>{
        if(e.target.id){
            sessionStorage.setItem('current_tab', e.target.id);
            let active=document.querySelectorAll('.selectedtab');
            active.forEach(a=>{
                a.classList.remove('selectedtab');
            })
            
            let sel=document.querySelectorAll("."+sessionStorage.getItem('current_tab'));
            sel.forEach(s => {
                s.classList.add('selectedtab');
            });
            msg({expanded:expanded,tab:sessionStorage.getItem('current_tab')})
        }
    }
    
   
return(
<>
{expanded &&
<div id="sidenavcontainerbloodbank">
    <div className="organizationLogo">
        <img className="orglogo" src={BloodP}></img>
        <h3 className="orgname">{sessionStorage.getItem('org_name')}</h3>
        <p>{sessionStorage.getItem('phone')}</p>
        <p>{sessionStorage.getItem('org_address')}</p>
        <p>{sessionStorage.getItem('email')}</p>
    </div>
    
    <div className="tabscontainer">
        
        <div className="tabsdiv Home "  onClick={selectedtab} id="Home">
            <AiOutlineHome className="tabsicon" id="Home"/>
            <h4 className="tabsnamebloodbank" id="Home">Home</h4>
        </div>
        <div className="tabsdiv Transactions "  onClick={selectedtab} id="Transactions">
            <GrTransaction className="tabsicon" id="Transactions"/>
            <h4 className="tabsnamebloodbank" id="Transactions">Transactions</h4>
        </div>
        <div className="tabsdiv Blood" id="Blood" onClick={selectedtab}>
            <MdOutlineBloodtype className="tabsicon" id="Blood"/>
            <h4 className="tabsnamebloodbank" id="Blood">Blood Groups</h4>
        </div>
        <div className="tabsdiv Donor" id="Donor" onClick={selectedtab}>
            <BsPeople className="tabsicon" id="Donor"/>
            <h4 className="tabsnamebloodbank" id="Donor">Donors</h4>
        </div>

    </div>

<BiCollapse id="collapsebtn" onClick={expandhandler}/>
</div>
 }



{!expanded && 
<div id="sidecollapsedcontainerbloodbank">
<img className="orglogo" src={BloodP}></img>
<div className="tabsrow">
<div className="tabscollapsed Home " onClick={selectedtab} id="Home">
<AiOutlineHome className="tabsicon" id="Home"/>
</div>
<div className="tabscollapsed Transactions" onClick={selectedtab} id="Transactions">
<BiPurchaseTag className="tabsicon" id="Transactions"/>
</div>
<div className="tabscollapsed Blood" onClick={selectedtab} id="Blood">
 <MdOutlineBloodtype className="tabsicon" id="Blood"/>
</div>
<div className="tabscollapsed Donor" onClick={selectedtab} id="Donor">
 <BsPeople className="tabsicon" id="Donor"/>
</div>
</div>

<BiExpand id="expandbtn" onClick={expandhandler}/>
</div>
}



</>
)
}

export default Sidenavbloodbank;